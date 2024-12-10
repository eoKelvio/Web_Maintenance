from sqlalchemy import ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from ..database import Base


class UserModels(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String, nullable=False)
    username: Mapped[str] = mapped_column(String, unique=True, nullable=False)
    password: Mapped[str] = mapped_column(String, nullable=False)
    role: Mapped[str] = mapped_column(String, nullable=False)
    team_id: Mapped[int] = mapped_column(Integer, ForeignKey("teams.id"))

    # Relacionamento com o time ao qual o usuário pertence
    team: Mapped[str] = mapped_column(String, nullable=False)

    # Relacionamento com o time que o usuário lidera
    led_team: Mapped[str] = mapped_column(String, nullable=False)
