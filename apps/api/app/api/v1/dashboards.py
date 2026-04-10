from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.deps import get_current_user, get_db
from app.models.user import User
from app.schemas.dashboard import DashboardSummary, ExecutiveDashboard
from app.services.dashboard_service import get_executive_dashboard

router = APIRouter(prefix="/dashboards", tags=["dashboards"])


@router.get("/summary", response_model=DashboardSummary)
def summary(current_user: User = Depends(get_current_user)) -> DashboardSummary:
    return DashboardSummary(
        total_citizens=0,
        total_collaborators=0,
        by_neighborhood=[],
        by_collaborator=[],
        requested_by=current_user.email,
    )


@router.get("/executive", response_model=ExecutiveDashboard)
def executive(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> ExecutiveDashboard:
    return get_executive_dashboard(db, current_user.email)
