from sqlalchemy import String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.models.base import Base, TimestampMixin, UUIDMixin


class Interaction(UUIDMixin, TimestampMixin, Base):
    __tablename__ = "interactions"

    citizen_id: Mapped[str] = mapped_column(String(36), index=True)
    channel: Mapped[str] = mapped_column(String(50), default="in_loco")
    notes: Mapped[str] = mapped_column(Text, default="")
