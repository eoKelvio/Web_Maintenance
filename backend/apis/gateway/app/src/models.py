from sqlalchemy import Date, ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .database import Base


class MachineModels(Base):
    """
    Model representing machine authentication details.

    Attributes:
        username (str): The username used for authentication.
        password (str): The password associated with the username.
    """
    
    __tablename__ = "auths"

    username: Mapped[str] = mapped_column(String, primary_key=True)
    password: Mapped[str] = mapped_column(String, nullable=False)