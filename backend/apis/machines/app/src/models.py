from sqlalchemy import Date, ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from .database import Base


class MachineModels(Base):
    """
    Represents a machine entity in the database.

    Attributes:
        id (int): The primary key of the machine.
        name (str): The name of the machine.
        type (str): The type/category of the machine.
        local (str): The location where the machine is situated.
        fabrication_date (Date): The manufacturing date of the machine.
        serial_number (str): The unique serial number of the machine.
    """
    
    __tablename__ = "machines"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String, nullable=False)
    type: Mapped[str] = mapped_column(String, nullable=False)
    local: Mapped[str] = mapped_column(String, nullable=False)
    fabrication_date: Mapped[Date] = mapped_column(Date, nullable=False)
    serial_number: Mapped[str] = mapped_column(String, nullable=False)