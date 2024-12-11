from sqlalchemy import ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from ..database import Base


class UserModels(Base):
    """
    Represents a user in the database.

    Attributes:
        id (int): Unique identifier for the user.
        name (str): Name of the user.
        username (str): Unique username of the user.
        password (str): Encrypted password of the user.
        role (str): Role of the user (e.g., admin, member).
        team_id (int): ID of the team the user belongs to.

    Relationships:
        team (TeamModels): The team to which the user belongs.
        led_team (TeamModels): The team led by the user.
    """
    
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String, nullable=False)
    username: Mapped[str] = mapped_column(String, unique=True, nullable=False)
    password: Mapped[str] = mapped_column(String, nullable=False)
    role: Mapped[str] = mapped_column(String, nullable=False)
    team_id: Mapped[int] = mapped_column(Integer, ForeignKey("teams.id"))

    # Relacionamento com o time ao qual o usuário pertence
    team: Mapped["TeamModels"] = relationship("TeamModels", foreign_keys=[team_id], back_populates="user")  # type: ignore

    # Relacionamento com o time que o usuário lidera
    led_team: Mapped["TeamModels"] = relationship("TeamModels", foreign_keys="TeamModels.leader_id", back_populates="leader")  # type: ignore
