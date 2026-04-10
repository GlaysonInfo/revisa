from fastapi import HTTPException, status

from app.core.config import settings
from app.core.exceptions import BusinessRuleError
from app.core.security import create_access_token, create_refresh_token, decode_refresh_token
from app.schemas.auth import Token


def authenticate_user(username: str, password: str) -> Token:
    if username != settings.default_admin_email or password != settings.default_admin_password:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect email or password")
    return Token(
        access_token=create_access_token(subject=username),
        refresh_token=create_refresh_token(subject=username),
    )


def refresh_access_token(refresh_token: str) -> Token:
    payload = decode_refresh_token(refresh_token)
    if not payload or payload.get("sub") is None:
        raise BusinessRuleError("Invalid refresh token")
    subject = str(payload["sub"])
    return Token(
        access_token=create_access_token(subject=subject),
        refresh_token=create_refresh_token(subject=subject),
    )
