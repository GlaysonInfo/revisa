from collections import Counter
from datetime import UTC, datetime, timedelta

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.activity import Activity
from app.models.citizen import Citizen
from app.models.demand import Demand
from app.models.task import Task
from app.models.user import User
from app.schemas.dashboard import (
    ActivityItem,
    DemandCard,
    ExecutiveDashboard,
    GovernanceMetric,
    GroupedCount,
    PriorityItem,
    TaskCard,
)


def _top_grouped(items: list[str], limit: int = 4) -> list[GroupedCount]:
    counter = Counter(item for item in items if item.strip())
    return [GroupedCount(name=name, total=total) for name, total in counter.most_common(limit)]


def _normalize_datetime(value: datetime | None) -> datetime | None:
    if value is None:
        return None
    if value.tzinfo is None:
        return value.replace(tzinfo=UTC)
    return value


def get_executive_dashboard(db: Session, _: str) -> ExecutiveDashboard:
    citizens = list(db.execute(select(Citizen)).scalars().all())
    users = list(db.execute(select(User)).scalars().all())
    demands = list(db.execute(select(Demand)).scalars().all())
    tasks = list(db.execute(select(Task)).scalars().all())
    activities = list(db.execute(select(Activity)).scalars().all())

    neighborhoods = [citizen.neighborhood for citizen in citizens]
    collaborators = [citizen.collaborator_name for citizen in citizens]
    poles = [citizen.pole_name for citizen in citizens]
    now = datetime.now(UTC)
    next_7_days = now + timedelta(days=7)

    active_users = [user for user in users if user.is_active]
    user_profiles = Counter(user.profile_type for user in active_users if user.profile_type.strip())
    consent_pending = sum(1 for citizen in citizens if not citizen.consent_given)
    high_priority_demands = [demand for demand in demands if demand.priority.lower() == "alta"]
    upcoming_activities = sorted(
        [
            activity
            for activity in activities
            if (scheduled_for := _normalize_datetime(activity.scheduled_for)) is not None
            and now <= scheduled_for <= next_7_days
        ],
        key=lambda activity: _normalize_datetime(activity.scheduled_for) or now,
    )
    open_demands = [
        demand
        for demand in demands
        if demand.status.lower() in {"open", "pending", "aguardando retorno", "triagem", "aberta", "pendente"}
    ]
    open_tasks = [task for task in tasks if task.status.lower() in {"pending", "open", "em andamento"}]

    profile_summary = ", ".join(f"{total} {name.lower()}" for name, total in user_profiles.most_common(3)) or "sem detalhamento"

    return ExecutiveDashboard(
        total_citizens=len(citizens),
        active_poles=len({pole.strip() for pole in poles if pole.strip()}),
        open_demands=len(open_demands),
        open_tasks=len(open_tasks),
        activities_next_7d=len(upcoming_activities),
        by_neighborhood=_top_grouped(neighborhoods),
        by_collaborator=_top_grouped(collaborators),
        by_pole=_top_grouped(poles),
        governance_items=[
            GovernanceMetric(label="Usuarios ativos", value=str(len(active_users)), note=profile_summary),
            GovernanceMetric(
                label="Consentimentos pendentes",
                value=str(consent_pending),
                note="beneficiarios ainda sem consentimento registrado",
            ),
            GovernanceMetric(
                label="Demandas prioritarias",
                value=str(len(high_priority_demands)),
                note="itens que exigem resposta mais imediata",
            ),
        ],
        critical_demands=[
            DemandCard(
                title=demand.title or demand.description,
                neighborhood=demand.neighborhood or demand.pole_name or "Sem referencia",
                status=demand.status,
            )
            for demand in high_priority_demands[:5]
        ],
        open_tasks_list=[
            TaskCard(title=task.title, status=task.status, assigned_to=task.assigned_to or "Equipe interna")
            for task in open_tasks[:5]
        ],
        priorities=[
            PriorityItem(title=demand.title or demand.description, note=demand.pole_name or demand.neighborhood or "REVISA")
            for demand in high_priority_demands[:3]
        ],
        activities_schedule=[
            ActivityItem(
                when=(_normalize_datetime(activity.scheduled_for) or now).astimezone(UTC).strftime("%d/%m %H:%M"),
                title=activity.name,
                place=activity.pole_name or activity.territory or "REVISA",
            )
            for activity in upcoming_activities[:7]
        ],
    )
