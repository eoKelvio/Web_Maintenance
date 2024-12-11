from sqlalchemy import Date, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from ..database import Base

class MaintenanceModels(Base):
    """
    Represents a maintenance record in the database.

    Attributes:
        id (int): Unique identifier for the maintenance record.
        machine_id (int): ID of the machine associated with the maintenance.
        date (Date): Date when the maintenance was performed.
        status (str): Status of the maintenance (e.g., completed, pending).
        description (str): Description of the maintenance activity.
        priority (str): Priority level of the maintenance (e.g., high, medium, low).
        team_id (int): ID of the team responsible for performing the maintenance.
    """
    
    __tablename__ = "maintenances"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    machine_id: Mapped[int] = mapped_column(Integer, nullable=False)
    date: Mapped[Date] = mapped_column(Date, nullable=False)
    status: Mapped[str] = mapped_column(String, nullable=False)
    description: Mapped[str] = mapped_column(String, nullable=False)
    priority: Mapped[str] = mapped_column(String, nullable=False)
    team_id: Mapped[int] = mapped_column(Integer, nullable=False)