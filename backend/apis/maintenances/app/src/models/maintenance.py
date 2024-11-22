from sqlalchemy import Date, ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from ..database import Base

class MaintenanceModels(Base):
    __tablename__ = "maintenances"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    machine_id: Mapped[int] = mapped_column(Integer, ForeignKey("machines.id"), nullable=False)
    date: Mapped[Date] = mapped_column(Date, nullable=False)
    status: Mapped[str] = mapped_column(String, nullable=False)
    description: Mapped[str] = mapped_column(String, nullable=False)
    priority: Mapped[str] = mapped_column(String, nullable=False)
    team_id: Mapped[int] = mapped_column(Integer, ForeignKey("teams.id"), nullable=False)
    used_parts = relationship("UsedPartModels", back_populates="maintenance")

    machine: Mapped["MachineModels"] = relationship("MachineModels", foreign_keys=[machine_id], back_populates="maintenance") #type: ignore
    team: Mapped["TeamModels"] = relationship("TeamModels", foreign_keys=[team_id], back_populates="maintenance") #type: ignore