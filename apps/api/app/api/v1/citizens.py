from fastapi import APIRouter, Depends, HTTPException, Query, status
from fastapi.responses import Response
from sqlalchemy.orm import Session

from app.api.deps import get_current_user, get_db
from app.models.user import User
from app.schemas.citizen import CitizenCreate, CitizenListItem, CitizenListResponse, CitizenRead, CitizenUpdate
from app.services.citizen_service import create_citizen as create_citizen_record
from app.services.citizen_service import (
    delete_citizen as remove_citizen,
    get_citizen_by_id,
    list_citizens as search_citizens,
    update_citizen as persist_citizen,
)

router = APIRouter(prefix="/citizens", tags=["citizens"])


@router.get("")
def list_citizens(
    query: str | None = Query(default=None),
    neighborhood: str | None = Query(default=None),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> CitizenListResponse:
    citizens = search_citizens(db, query=query, neighborhood=neighborhood)
    return CitizenListResponse(
        items=[
            CitizenListItem(
                id=citizen.id,
                full_name=citizen.full_name,
                phone=citizen.phone,
                neighborhood=citizen.neighborhood,
                pole_name=citizen.pole_name,
                collaborator_name=citizen.collaborator_name,
            )
            for citizen in citizens
        ],
        requested_by=current_user.email,
    )


@router.get("/{citizen_id}", response_model=CitizenRead)
def get_citizen(
    citizen_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> CitizenRead:
    citizen = get_citizen_by_id(db, citizen_id)
    if not citizen:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Citizen not found")

    return CitizenRead(
        id=citizen.id,
        full_name=citizen.full_name,
        phone=citizen.phone,
        email=citizen.email,
        neighborhood=citizen.neighborhood,
        pole_name=citizen.pole_name,
        address=citizen.address,
        reference_point=citizen.reference_point,
        notes=citizen.notes,
        collaborator_name=citizen.collaborator_name,
        registered_in_field=citizen.registered_in_field,
        consent_given=citizen.consent_given,
    )


@router.post("", response_model=CitizenRead, status_code=status.HTTP_201_CREATED)
def create_citizen(
    payload: CitizenCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> CitizenRead:
    collaborator_name = current_user.full_name if current_user.full_name else current_user.email
    citizen = create_citizen_record(db, payload, collaborator_name)
    return CitizenRead(
        id=citizen.id,
        full_name=citizen.full_name,
        phone=citizen.phone,
        email=citizen.email,
        neighborhood=citizen.neighborhood,
        pole_name=citizen.pole_name,
        address=citizen.address,
        reference_point=citizen.reference_point,
        notes=citizen.notes,
        collaborator_name=citizen.collaborator_name,
        registered_in_field=citizen.registered_in_field,
        consent_given=citizen.consent_given,
    )


@router.put("/{citizen_id}", response_model=CitizenRead)
def update_citizen(
    citizen_id: str,
    payload: CitizenUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> CitizenRead:
    citizen = get_citizen_by_id(db, citizen_id)
    if not citizen:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Citizen not found")

    updated = persist_citizen(db, citizen, payload)
    return CitizenRead(
        id=updated.id,
        full_name=updated.full_name,
        phone=updated.phone,
        email=updated.email,
        neighborhood=updated.neighborhood,
        pole_name=updated.pole_name,
        address=updated.address,
        reference_point=updated.reference_point,
        notes=updated.notes,
        collaborator_name=updated.collaborator_name,
        registered_in_field=updated.registered_in_field,
        consent_given=updated.consent_given,
    )


@router.delete("/{citizen_id}", status_code=status.HTTP_204_NO_CONTENT, response_class=Response)
def delete_citizen(
    citizen_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> Response:
    citizen = get_citizen_by_id(db, citizen_id)
    if not citizen:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Citizen not found")

    remove_citizen(db, citizen)
    return Response(status_code=status.HTTP_204_NO_CONTENT)
