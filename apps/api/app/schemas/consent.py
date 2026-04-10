from pydantic import BaseModel


class ConsentRead(BaseModel):
    id: str | None = None
    citizen_id: str
    accepted: bool
    version: str
