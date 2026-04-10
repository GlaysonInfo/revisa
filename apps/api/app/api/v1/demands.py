from fastapi import APIRouter, Depends

from app.api.deps import get_current_user
from app.models.user import User

router = APIRouter(prefix="/demands", tags=["demands"])


@router.get("")
def list_demands(current_user: User = Depends(get_current_user)) -> dict[str, object]:
    return {"items": [], "requested_by": current_user.email}
