from pydantic import BaseModel, Field


class UserRequest(BaseModel):
    """
    Schema for user creation or update requests.

    Attributes:
        name (str): The name of the user.
        username (str): The unique username of the user.
        password (str): The password of the user.
        role (str): The role of the user (e.g., admin, member).
        team_id (None | int): The ID of the team the user belongs to (optional).
    """

    name: str
    username: str
    password: str
    role: str
    team_id: None | int = Field(default="null")


class UserResponse(BaseModel):
    """
    Schema for user responses.

    Attributes:
        id (int): The primary key of the user.
        name (str): The name of the user.
        username (str): The unique username of the user.
        role (str): The role of the user (e.g., admin, member).
        team_id (None | int): The ID of the team the user belongs to (optional).
    """

    id: int
    name: str
    username: str
    role: str
    team_id: None | int


class TeamRequest(BaseModel):
    """
    Schema for team creation or update requests.

    Attributes:
        name (str): The name of the team.
        leader_id (int): The ID of the leader of the team.
    """

    name: str
    leader_id: int


class TeamResponse(BaseModel):
    """
    Schema for team responses.

    Attributes:
        id (int): The primary key of the team.
        name (str): The name of the team.
        leader_id (int): The ID of the leader of the team.
    """
    
    id: int
    name: str
    leader_id: int
