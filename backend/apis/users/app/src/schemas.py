from pydantic import BaseModel, Field


class UserRequest(BaseModel):
    """
    Schema for incoming user data used in API requests.

    Attributes:
        name (str): Name of the user.
        username (str): Unique username of the user.
        password (str): Password of the user.
        role (str): Role of the user (e.g., admin, member).
        team_id (int | None): ID of the team the user belongs to, or null if not assigned.
    """

    name: str
    username: str
    password: str
    role: str
    team_id: None | int = Field(default="null")


class UserResponse(BaseModel):
    """
    Schema for user data used in API responses.

    Attributes:
        id (int): Unique identifier for the user.
        name (str): Name of the user.
        username (str): Unique username of the user.
        role (str): Role of the user (e.g., admin, member).
        team_id (int | None): ID of the team the user belongs to, or null if not assigned.
    """

    id: int
    name: str
    username: str
    role: str
    team_id: None | int


class TeamRequest(BaseModel):
    """
    Schema for incoming team data used in API requests.

    Attributes:
        name (str): Name of the team.
        leader_id (int): ID of the user who leads the team.
    """

    name: str
    leader_id: int


class TeamResponse(BaseModel):
    """
    Schema for team data used in API responses.

    Attributes:
        id (int): Unique identifier for the team.
        name (str): Name of the team.
        leader_id (int): ID of the user who leads the team.
    """
    
    id: int
    name: str
    leader_id: int
