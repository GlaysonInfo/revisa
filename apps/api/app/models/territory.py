from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column

from app.models.base import Base, TimestampMixin, UUIDMixin


class Pole(UUIDMixin, TimestampMixin, Base):
    __tablename__ = "poles"

    name: Mapped[str] = mapped_column(String(120), unique=True)
    city: Mapped[str] = mapped_column(String(120), default="")


class Neighborhood(UUIDMixin, TimestampMixin, Base):
    __tablename__ = "neighborhoods"

    name: Mapped[str] = mapped_column(String(120), index=True)
    city: Mapped[str] = mapped_column(String(120), default="")
