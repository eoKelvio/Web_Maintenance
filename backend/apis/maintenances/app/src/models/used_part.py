from sqlalchemy import Integer
from sqlalchemy.orm import Mapped, mapped_column

from ..database import Base

class UsedPartModels(Base):
    """
    Represents a record of a part used during maintenance in the database.

    Attributes:
        id (int): Unique identifier for the used part record.
        maintenance_id (int): ID of the maintenance associated with the used part.
        part_id (int): ID of the part used.
        quantity (int): Quantity of the part used.
    """
    
    __tablename__ = "used_parts"
    
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    maintenance_id: Mapped[int] = mapped_column(Integer, nullable=False)
    part_id: Mapped[int] = mapped_column(Integer, nullable=False)
    quantity: Mapped[int] = mapped_column(Integer, nullable=False)