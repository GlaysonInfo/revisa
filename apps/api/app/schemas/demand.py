from pydantic import BaseModel


class DemandRead(BaseModel):
    id: str | None = None
    citizen_id: str
    category: str = ""
    description: str = ""
    status: str = "open"
