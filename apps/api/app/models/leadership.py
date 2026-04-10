from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column

from app.models.base import Base, TimestampMixin, UUIDMixin


class Leadership(UUIDMixin, TimestampMixin, Base):
    __tablename__ = "leadership"

    name: Mapped[str] = mapped_column(String(255))
    region: Mapped[str] = mapped_column(String(120), default="")
    level: Mapped[str] = mapped_column(String(80), default="")
