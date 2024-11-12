from pydantic import BaseModel
from typing import Optional

class UserBase(BaseModel):
    name: str
    username: str
    password: str
    role: str
    team_id: int

class UserCreate(UserBase):
    pass

class UserUpdate(UserBase):
    name: Optional[str]
    username: Optional[str]
    password: Optional[str]
    role: Optional[str]
    team_id: Optional[int]

class User(UserBase):
    id: int

    class Config:
        orm_mode = True