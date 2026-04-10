from sqlalchemy import Select, or_, select
from sqlalchemy.orm import Session

from app.core.exceptions import AppException
from app.models.citizen import Citizen
from app.schemas.citizen import CitizenCreate, CitizenUpdate
from app.services.territory_service import get_or_create_neighborhood, get_or_create_pole


def _normalize(value: str | None) -> str:
    return (value or "").strip().lower()


def _find_duplicate(
    db: Session,
    *,
    full_name: str,
    phone: str | None,
    email: str | None,
    exclude_id: str | None = None,
) -> Citizen | None:
    full_name_normalized = _normalize(full_name)
    phone_normalized = (phone or "").strip()
    email_normalized = _normalize(email)

    stmt: Select[tuple[Citizen]] = select(Citizen).where(Citizen.full_name.ilike(full_name_normalized))

    if exclude_id:
        stmt = stmt.where(Citizen.id != exclude_id)

    candidates = list(db.execute(stmt).scalars().all())
    for candidate in candidates:
        same_phone = bool(phone_normalized) and candidate.phone.strip() == phone_normalized
        same_email = bool(email_normalized) and _normalize(candidate.email) == email_normalized
        if same_phone or same_email:
            return candidate
    return None


def create_citizen(db: Session, payload: CitizenCreate, collaborator_name: str) -> Citizen:
    duplicate = _find_duplicate(
        db,
        full_name=payload.full_name,
        phone=payload.phone,
        email=payload.email,
    )
    if duplicate:
        raise AppException("Possivel cadastro duplicado encontrado", status_code=409)

    neighborhood_name = (payload.neighborhood or "").strip()
    pole_name = (payload.pole_name or "").strip()
    if neighborhood_name:
        get_or_create_neighborhood(db, neighborhood_name)
    if pole_name:
        get_or_create_pole(db, pole_name)

    citizen = Citizen(
        full_name=payload.full_name.strip(),
        phone=(payload.phone or "").strip(),
        email=(payload.email or "").strip(),
        neighborhood=(payload.neighborhood or "").strip(),
        pole_name=(payload.pole_name or "").strip(),
        address=(payload.address or "").strip(),
        reference_point=(payload.reference_point or "").strip(),
        notes=(payload.notes or "").strip(),
        collaborator_name=collaborator_name.strip(),
        registered_in_field=payload.registered_in_field,
        consent_given=payload.consent_given,
    )
    db.add(citizen)
    db.commit()
    db.refresh(citizen)
    return citizen


def list_recent_citizens(db: Session, limit: int = 50) -> list[Citizen]:
    stmt = select(Citizen).order_by(Citizen.created_at.desc()).limit(limit)
    return list(db.execute(stmt).scalars().all())


def list_citizens(
    db: Session,
    *,
    limit: int = 50,
    query: str | None = None,
    neighborhood: str | None = None,
) -> list[Citizen]:
    stmt: Select[tuple[Citizen]] = select(Citizen)

    if query:
        stmt = stmt.where(Citizen.full_name.ilike(f"%{query.strip()}%"))

    if neighborhood:
        stmt = stmt.where(Citizen.neighborhood.ilike(neighborhood.strip()))

    stmt = stmt.order_by(Citizen.created_at.desc()).limit(limit)
    return list(db.execute(stmt).scalars().all())


def get_citizen_by_id(db: Session, citizen_id: str) -> Citizen | None:
    return db.get(Citizen, citizen_id)


def update_citizen(db: Session, citizen: Citizen, payload: CitizenUpdate) -> Citizen:
    neighborhood_name = (payload.neighborhood or "").strip()
    pole_name = (payload.pole_name or "").strip()
    if neighborhood_name:
        get_or_create_neighborhood(db, neighborhood_name)
    if pole_name:
        get_or_create_pole(db, pole_name)

    citizen.full_name = payload.full_name.strip()
    citizen.phone = (payload.phone or "").strip()
    citizen.email = (payload.email or "").strip()
    citizen.neighborhood = (payload.neighborhood or "").strip()
    citizen.pole_name = (payload.pole_name or "").strip()
    citizen.address = (payload.address or "").strip()
    citizen.reference_point = (payload.reference_point or "").strip()
    citizen.notes = (payload.notes or "").strip()
    citizen.consent_given = payload.consent_given

    duplicate = _find_duplicate(
        db,
        full_name=citizen.full_name,
        phone=citizen.phone,
        email=citizen.email,
        exclude_id=citizen.id,
    )
    if duplicate:
        raise AppException("Possivel cadastro duplicado encontrado", status_code=409)

    db.add(citizen)
    db.commit()
    db.refresh(citizen)
    return citizen


def delete_citizen(db: Session, citizen: Citizen) -> None:
    db.delete(citizen)
    db.commit()
