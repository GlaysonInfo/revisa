from pydantic import BaseModel


class LeadershipRead(BaseModel):
    id: str | None = None
    name: str
    region: str = ""
    level: str = ""
