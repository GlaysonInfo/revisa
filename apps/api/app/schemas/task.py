from pydantic import BaseModel


class TaskRead(BaseModel):
    id: str | None = None
    title: str
    assigned_to: str = ""
    description: str = ""
    status: str = "pending"
