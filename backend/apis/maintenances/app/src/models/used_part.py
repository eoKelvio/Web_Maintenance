from sqlalchemy import Integer
from sqlalchemy.orm import Mapped, mapped_column

from ..database import Base

class UsedPartModels(Base):
    __tablename__ = "used_parts"
    
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    maintenance_id: Mapped[int] = mapped_column(Integer, nullable=False)
    part_id: Mapped[int] = mapped_column(Integer, nullable=False)
    quantity: Mapped[int] = mapped_column(Integer, nullable=False)