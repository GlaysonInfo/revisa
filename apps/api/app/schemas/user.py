from pydantic import BaseModel, EmailStr


class UserRead(BaseModel):
    id: str | None = None
    email: EmailStr
    full_name: str
    is_active: bool = True
