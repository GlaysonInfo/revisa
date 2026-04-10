from pydantic import BaseModel


class ActivityRead(BaseModel):
    id: str | None = None
    name: str
    territory: str = ""
