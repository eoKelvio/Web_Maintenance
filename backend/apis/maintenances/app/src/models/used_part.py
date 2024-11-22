from sqlalchemy import ForeignKey, Integer
from sqlalchemy.orm import Mapped, mapped_column, relationship

from ..database import Base

class UsedPartModels(Base):
    __tablename__ = "used_parts"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    maintenance_id: Mapped[int] = mapped_column(Integer, ForeignKey("maintenances.id"), nullable=False)
    part_id: Mapped[int] = mapped_column(Integer, ForeignKey("parts.id"), nullable=False)
    quantity: Mapped[int] = mapped_column(Integer, nullable=False)
    maintenance: Mapped["MaintenanceModels"] = relationship("MaintenanceModels", foreign_keys=[maintenance_id], back_populates="used_parts") #type: ignore
    part: Mapped["PartModels"] = relationship("PartModels", foreign_keys=[part_id], back_populates="used_parts") #type: ignore