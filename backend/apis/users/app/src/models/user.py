from sqlalchemy import ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from ..database import Base


class UserModels(Base):
    """
    Represents a user entity in the database.

    Attributes:
        id (int): The primary key of the user.
        name (str): The name of the user.
        username (str): The unique username of the user.
        password (str): The hashed password of the user.
        role (str): The role of the user (e.g., admin, team member).
        team_id (int): The ID of the team the user belongs to.
    """
    
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String, nullable=False)
    username: Mapped[str] = mapped_column(String, unique=True, nullable=False)
    password: Mapped[str] = mapped_column(String, nullable=False)
    role: Mapped[str] = mapped_column(String, nullable=False)
    team_id: Mapped[int] = mapped_column(Integer, nullable=True)