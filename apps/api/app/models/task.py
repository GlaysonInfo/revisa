from sqlalchemy import String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.models.base import Base, TimestampMixin, UUIDMixin


class Task(UUIDMixin, TimestampMixin, Base):
    __tablename__ = "tasks"

    title: Mapped[str] = mapped_column(String(255))
    assigned_to: Mapped[str] = mapped_column(String(255), default="")
    description: Mapped[str] = mapped_column(Text, default="")
    pole_name: Mapped[str] = mapped_column(String(120), default="")
    priority: Mapped[str] = mapped_column(String(40), default="media")
    status: Mapped[str] = mapped_column(String(40), default="pending")
