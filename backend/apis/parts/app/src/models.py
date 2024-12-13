from sqlalchemy import Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from .database import Base


class PartModels(Base):
    """
    Represents a part entity in the database.

    Attributes:
        id (int): The primary key of the part.
        name (str): The name of the part.
        quantity (int): The available quantity of the part.
        cost (float): The cost of the part.
    """
    
    __tablename__ = "parts"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String, nullable=False)
    quantity: Mapped[int] = mapped_column(Integer, nullable=False)
    cost: Mapped[float] = mapped_column(Integer, nullable=False)