from sqlalchemy import ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from ..database import Base


class TeamModels(Base):
    """
    Represents a team in the database.

    Attributes:
        id (int): Unique identifier for the team.
        name (str): Name of the team.
        leader_id (int): ID of the user who is the leader of the team.

    Relationships:
        leader (UserModels): Reference to the leader of the team.
        user (UserModels): List of users who are members of the team.
    """
    
    __tablename__ = "teams"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String, nullable=False)
    leader_id: Mapped[int] = mapped_column(Integer, ForeignKey("users.id"), nullable=False)

    # Relacionamento com o líder do time
    leader: Mapped["UserModels"] = relationship("UserModels", foreign_keys=[leader_id], back_populates="led_team")  # type: ignore

    # Relacionamento com os membros do time
    user: Mapped["UserModels"] = relationship("UserModels", foreign_keys="UserModels.team_id", back_populates="team")  # type: ignore
