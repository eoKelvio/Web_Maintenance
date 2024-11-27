from sqlalchemy import ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from ..database import Base


class TeamModels(Base):
    __tablename__ = "teams"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String, nullable=False)
    leader_id: Mapped[int] = mapped_column(Integer, ForeignKey("users.id"), nullable=False)

    # Relacionamento com o líder do time
    leader: Mapped[str] = mapped_column(String, nullable=False)

    # Relacionamento com os membros do time
    user: Mapped[str] = mapped_column(String, nullable=False)
