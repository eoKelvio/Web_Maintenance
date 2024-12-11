from sqlalchemy import Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .database import Base


class PartModels(Base):
    """
    Represents a part in the inventory database.

    Attributes:
        id (int): Unique identifier for the part.
        name (str): Name of the part.
        quantity (int): Quantity of the part available in inventory.
        cost (float): Cost of the part.

    Relationships:
        used_parts: Relationship to `UsedPartModels` indicating parts used in maintenance.
    """
    
    __tablename__ = "parts"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String, nullable=False)
    quantity: Mapped[int] = mapped_column(Integer, nullable=False)
    cost: Mapped[float] = mapped_column(Integer, nullable=False)

    used_parts = relationship("UsedPartModels", back_populates="part")