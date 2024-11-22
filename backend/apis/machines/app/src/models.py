from sqlalchemy import Date, ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .database import Base


class MachineModels(Base):
    __tablename__ = "machines"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String, nullable=False)
    type: Mapped[str] = mapped_column(String, nullable=False)
    local: Mapped[str] = mapped_column(String, nullable=False)
    fabrication_date: Mapped[Date] = mapped_column(Date, nullable=False)
    serial_number: Mapped[str] = mapped_column(String, nullable=False)