from pydantic import BaseModel


class PoleCreate(BaseModel):
    name: str
    city: str = ""


class PoleRead(BaseModel):
    id: str | None = None
    name: str
    city: str = ""


class NeighborhoodCreate(BaseModel):
    name: str
    city: str = ""


class NeighborhoodRead(BaseModel):
    id: str | None = None
    name: str
    city: str = ""


class PoleListResponse(BaseModel):
    items: list[PoleRead]
    requested_by: str


class NeighborhoodListResponse(BaseModel):
    items: list[NeighborhoodRead]
    requested_by: str
