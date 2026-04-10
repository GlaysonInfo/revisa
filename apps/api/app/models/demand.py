from sqlalchemy import String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.models.base import Base, TimestampMixin, UUIDMixin


class Demand(UUIDMixin, TimestampMixin, Base):
    __tablename__ = "demands"

    title: Mapped[str] = mapped_column(String(255), default="")
    citizen_id: Mapped[str] = mapped_column(String(36), index=True)
    category: Mapped[str] = mapped_column(String(80), default="")
    description: Mapped[str] = mapped_column(Text, default="")
    neighborhood: Mapped[str] = mapped_column(String(120), default="")
    pole_name: Mapped[str] = mapped_column(String(120), default="")
    priority: Mapped[str] = mapped_column(String(40), default="media")
    status: Mapped[str] = mapped_column(String(40), default="open")
