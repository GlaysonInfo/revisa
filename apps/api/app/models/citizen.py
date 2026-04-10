from sqlalchemy import Boolean, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.models.base import Base, TimestampMixin, UUIDMixin


class Citizen(UUIDMixin, TimestampMixin, Base):
    __tablename__ = "citizens"

    full_name: Mapped[str] = mapped_column(String(255), index=True)
    phone: Mapped[str] = mapped_column(String(40), default="")
    email: Mapped[str] = mapped_column(String(255), default="")
    neighborhood: Mapped[str] = mapped_column(String(120), default="")
    pole_name: Mapped[str] = mapped_column(String(120), default="")
    address: Mapped[str] = mapped_column(String(255), default="")
    reference_point: Mapped[str] = mapped_column(String(255), default="")
    notes: Mapped[str] = mapped_column(Text, default="")
    collaborator_name: Mapped[str] = mapped_column(String(255), default="")
    registered_in_field: Mapped[bool] = mapped_column(Boolean, default=True)
    consent_given: Mapped[bool] = mapped_column(Boolean, default=False)
