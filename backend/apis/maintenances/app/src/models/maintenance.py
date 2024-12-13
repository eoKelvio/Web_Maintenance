from sqlalchemy import Date, Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from ..database import Base

class MaintenanceModels(Base):
    """
    Represents a maintenance entity in the database.

    Attributes:
        id (int): The primary key of the maintenance record.
        machine_id (int): The ID of the associated machine.
        date (Date): The date of the maintenance activity.
        status (str): The status of the maintenance (e.g., completed, pending).
        description (str): A detailed description of the maintenance.
        priority (str): The priority level of the maintenance (e.g., high, medium, low).
        team_id (int): The ID of the team responsible for the maintenance.
    """
    
    __tablename__ = "maintenances"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    machine_id: Mapped[int] = mapped_column(Integer, nullable=False)
    date: Mapped[Date] = mapped_column(Date, nullable=False)
    status: Mapped[str] = mapped_column(String, nullable=False)
    description: Mapped[str] = mapped_column(String, nullable=False)
    priority: Mapped[str] = mapped_column(String, nullable=False)
    team_id: Mapped[int] = mapped_column(Integer, nullable=False)