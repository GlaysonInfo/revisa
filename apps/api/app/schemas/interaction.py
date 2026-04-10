from pydantic import BaseModel


class InteractionRead(BaseModel):
    id: str | None = None
    citizen_id: str
    channel: str
    notes: str = ""
