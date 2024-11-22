from sqlalchemy import ForeignKey, Integer
from sqlalchemy.orm import Mapped, mapped_column, relationship

from ..database import Base


class UsedPartModels(Base):
    __tablename__ = "used_parts"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    part_id: Mapped[int] = mapped_column(Integer, ForeignKey("parts.id"))
    quantity: Mapped[int] = mapped_column(Integer, nullable=False)
    cost: Mapped[float] = mapped_column(Integer, nullable=False)

    part = relationship("PartModels", back_populates="used_parts")