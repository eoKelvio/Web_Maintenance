from pydantic import BaseModel, Field

class UserRequest(BaseModel):
    name: str
    username: str
    password: str
    role: str
    team_id: None | int = Field(default="null")


class UserResponse(BaseModel):
    id: int
    name: str
    username: str
    role: str
    team_id: None | int

class TeamRequest(BaseModel):
    name: str
    leader_id: int

class TeamResponse(BaseModel):
    id: int
    name: str
    leader_id: int