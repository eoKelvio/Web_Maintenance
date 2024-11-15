from sqlalchemy import Integer, String, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from ..database import Base

class TeamModels(Base):
    __tablename__ = "teams"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String, nullable=False)
    leader_id: Mapped[int] = mapped_column(Integer, ForeignKey("users.id"))

    users: Mapped["UserModels"] = relationship("UserModels", back_populates="team", primaryjoin="TeamModels.id == UserModels.team_id") #type: ignore