from sqlalchemy import ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from ..database import Base


class TeamModels(Base):
    """
    Represents a team entity in the database.

    Attributes:
        id (int): The primary key of the team.
        name (str): The name of the team.
        leader_id (int): The ID of the team leader.
    """
    
    __tablename__ = "teams"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String, nullable=False)
    leader_id: Mapped[int] = mapped_column(Integer, nullable=False)
