from sqlalchemy import Boolean, String
from sqlalchemy.orm import Mapped, mapped_column

from app.models.base import Base, TimestampMixin, UUIDMixin


class AuthSession(UUIDMixin, TimestampMixin, Base):
    __tablename__ = "auth_sessions"

    user_id: Mapped[str] = mapped_column(String(36), index=True)
    refresh_token_hash: Mapped[str] = mapped_column(String(255), default="")
    is_revoked: Mapped[bool] = mapped_column(Boolean, default=False)
