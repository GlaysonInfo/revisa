from datetime import UTC, datetime

from sqlalchemy import DateTime, String
from sqlalchemy.orm import Mapped, mapped_column

from app.models.base import Base, TimestampMixin, UUIDMixin


class Activity(UUIDMixin, TimestampMixin, Base):
    __tablename__ = "activities"

    name: Mapped[str] = mapped_column(String(120))
    territory: Mapped[str] = mapped_column(String(120), default="")
    pole_name: Mapped[str] = mapped_column(String(120), default="")
    scheduled_for: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(UTC))
