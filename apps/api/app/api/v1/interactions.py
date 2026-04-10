from fastapi import APIRouter, Depends

from app.api.deps import get_current_user
from app.models.user import User

router = APIRouter(prefix="/interactions", tags=["interactions"])


@router.get("")
def list_interactions(current_user: User = Depends(get_current_user)) -> dict[str, object]:
    return {"items": [], "requested_by": current_user.email}
