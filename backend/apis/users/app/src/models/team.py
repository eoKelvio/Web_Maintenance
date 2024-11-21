from sqlalchemy import Integer, String, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from ..database import Base

class TeamModels(Base):
    __tablename__ = "teams"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String, nullable=False)
    leader_id: Mapped[int] = mapped_column(Integer, ForeignKey("users.id"), nullable=False)

    # Relacionamento com o líder do time
    leader: Mapped["UserModels"] = relationship("UserModels", foreign_keys=[leader_id], back_populates="led_team")  # type: ignore
    
    # Relacionamento com os membros do time
    user: Mapped["UserModels"] = relationship("UserModels", foreign_keys="UserModels.team_id", back_populates="team")  # type: ignore