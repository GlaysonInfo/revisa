from datetime import UTC, datetime, timedelta
from typing import Any

import jwt
from passlib.context import CryptContext

from app.core.config import settings

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)


def _encode_token(subject: str, secret: str, expires_delta: timedelta, token_type: str) -> str:
    now = datetime.now(UTC)
    payload: dict[str, Any] = {
        "sub": subject,
        "type": token_type,
        "iat": now,
        "exp": now + expires_delta,
    }
    return jwt.encode(payload, secret, algorithm=settings.jwt_algorithm)


def create_access_token(subject: str) -> str:
    return _encode_token(
        subject,
        settings.jwt_secret_key,
        timedelta(minutes=settings.jwt_access_token_expire_minutes),
        "access",
    )


def create_refresh_token(subject: str) -> str:
    return _encode_token(
        subject,
        settings.jwt_refresh_secret_key,
        timedelta(days=settings.jwt_refresh_token_expire_days),
        "refresh",
    )


def decode_access_token(token: str) -> dict[str, Any] | None:
    try:
        return jwt.decode(token, settings.jwt_secret_key, algorithms=[settings.jwt_algorithm])
    except jwt.PyJWTError:
        return None


def decode_refresh_token(token: str) -> dict[str, Any] | None:
    try:
        return jwt.decode(token, settings.jwt_refresh_secret_key, algorithms=[settings.jwt_algorithm])
    except jwt.PyJWTError:
        return None
