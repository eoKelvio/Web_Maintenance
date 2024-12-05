from sqlalchemy import Date, ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .database import Base


class MachineModels(Base):
    """
    Represents a machine model in the database.

    Attributes:
        id (int): Unique identifier for the machine.
        name (str): Name of the machine.
        type (str): Type of the machine (e.g., industrial, agricultural).
        local (str): Location where the machine is installed or used.
        fabrication_date (Date): Date when the machine was fabricated.
        serial_number (str): Serial number of the machine for identification purposes.
    """
    
    __tablename__ = "machines"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String, nullable=False)
    type: Mapped[str] = mapped_column(String, nullable=False)
    local: Mapped[str] = mapped_column(String, nullable=False)
    fabrication_date: Mapped[Date] = mapped_column(Date, nullable=False)
    serial_number: Mapped[str] = mapped_column(String, nullable=False)