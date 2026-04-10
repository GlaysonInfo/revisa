from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.api.deps import get_current_user, get_db
from app.models.user import User
from app.schemas.territory import (
    NeighborhoodCreate,
    NeighborhoodListResponse,
    NeighborhoodRead,
    PoleCreate,
    PoleListResponse,
    PoleRead,
)
from app.services.territory_service import create_neighborhood, create_pole, list_neighborhoods, list_poles

router = APIRouter(prefix="/poles", tags=["poles"])


@router.get("")
def get_poles(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> PoleListResponse:
    poles = list_poles(db)
    return PoleListResponse(
        items=[PoleRead(id=pole.id, name=pole.name, city=pole.city) for pole in poles],
        requested_by=current_user.email,
    )


@router.post("", response_model=PoleRead, status_code=status.HTTP_201_CREATED)
def create_pole_endpoint(
    payload: PoleCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> PoleRead:
    pole = create_pole(db, payload)
    return PoleRead(id=pole.id, name=pole.name, city=pole.city)


@router.get("/neighborhoods", response_model=NeighborhoodListResponse)
def get_neighborhoods(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> NeighborhoodListResponse:
    neighborhoods = list_neighborhoods(db)
    return NeighborhoodListResponse(
        items=[
            NeighborhoodRead(id=neighborhood.id, name=neighborhood.name, city=neighborhood.city)
            for neighborhood in neighborhoods
        ],
        requested_by=current_user.email,
    )


@router.post("/neighborhoods", response_model=NeighborhoodRead, status_code=status.HTTP_201_CREATED)
def create_neighborhood_endpoint(
    payload: NeighborhoodCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> NeighborhoodRead:
    neighborhood = create_neighborhood(db, payload)
    return NeighborhoodRead(id=neighborhood.id, name=neighborhood.name, city=neighborhood.city)
