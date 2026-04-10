from sqlalchemy import Boolean, String
from sqlalchemy.orm import Mapped, mapped_column

from app.models.base import Base, TimestampMixin, UUIDMixin


class Consent(UUIDMixin, TimestampMixin, Base):
    __tablename__ = "consents"

    citizen_id: Mapped[str] = mapped_column(String(36), index=True)
    accepted: Mapped[bool] = mapped_column(Boolean, default=False)
    version: Mapped[str] = mapped_column(String(30), default="1.0")
