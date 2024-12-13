from sqlalchemy import Integer
from sqlalchemy.orm import Mapped, mapped_column

from ..database import Base

class UsedPartModels(Base):
    """
    Represents a used part record in the database.

    Attributes:
        id (int): The primary key of the used part record.
        maintenance_id (int): The ID of the associated maintenance record.
        part_id (int): The ID of the used part.
        quantity (int): The quantity of the part used in the maintenance.
    """
    
    __tablename__ = "used_parts"
    
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    maintenance_id: Mapped[int] = mapped_column(Integer, nullable=False)
    part_id: Mapped[int] = mapped_column(Integer, nullable=False)
    quantity: Mapped[int] = mapped_column(Integer, nullable=False)