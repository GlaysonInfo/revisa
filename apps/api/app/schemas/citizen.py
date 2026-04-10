from pydantic import BaseModel


class CitizenCreate(BaseModel):
    full_name: str
    phone: str | None = None
    email: str | None = None
    neighborhood: str | None = None
    pole_name: str | None = None
    address: str | None = None
    reference_point: str | None = None
    notes: str | None = None
    registered_in_field: bool = True
    consent_given: bool = False


class CitizenUpdate(BaseModel):
    full_name: str
    phone: str | None = None
    email: str | None = None
    neighborhood: str | None = None
    pole_name: str | None = None
    address: str | None = None
    reference_point: str | None = None
    notes: str | None = None
    consent_given: bool = False


class CitizenListItem(BaseModel):
    id: str
    full_name: str
    phone: str = ""
    neighborhood: str = ""
    pole_name: str = ""
    collaborator_name: str = ""


class CitizenRead(BaseModel):
    id: str | None = None
    full_name: str
    phone: str = ""
    email: str = ""
    neighborhood: str = ""
    pole_name: str = ""
    address: str = ""
    reference_point: str = ""
    notes: str = ""
    collaborator_name: str = ""
    registered_in_field: bool = True
    consent_given: bool = False


class CitizenListResponse(BaseModel):
    items: list[CitizenListItem]
    requested_by: str
