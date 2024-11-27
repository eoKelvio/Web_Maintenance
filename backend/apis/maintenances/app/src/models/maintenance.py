from sqlalchemy import Date, Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from ..database import Base

class MaintenanceModels(Base):
    __tablename__ = "maintenances"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    machine_id: Mapped[int] = mapped_column(Integer, nullable=False)
    date: Mapped[Date] = mapped_column(Date, nullable=False)
    status: Mapped[str] = mapped_column(String, nullable=False)
    description: Mapped[str] = mapped_column(String, nullable=False)
    priority: Mapped[str] = mapped_column(String, nullable=False)
    team_id: Mapped[int] = mapped_column(Integer, nullable=False)