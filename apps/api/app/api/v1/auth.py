from fastapi import APIRouter

from app.schemas.auth import LoginRequest, RefreshRequest, Token
from app.services.auth_service import authenticate_user, refresh_access_token

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/login", response_model=Token)
def login(payload: LoginRequest) -> Token:
    return authenticate_user(payload.email, payload.password)


@router.post("/refresh", response_model=Token)
def refresh(payload: RefreshRequest) -> Token:
    return refresh_access_token(payload.refresh_token)
