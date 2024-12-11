from sqlalchemy import create_engine
from sqlalchemy.orm import Session, declarative_base, registry, sessionmaker

from ..config import DATABASE_URL

Base = declarative_base()
"""
Declarative base used for defining SQLAlchemy models.
"""

engine = create_engine(DATABASE_URL)
"""
SQLAlchemy engine connected to the database defined by `DATABASE_URL`.
"""

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
"""
Session factory configured for database connections.
"""

mapper_registry = registry()
"""
SQLAlchemy mapper registry used for advanced mapping configurations.
"""

def save_to_db(db: Session, model, data):
    """
    Save an object to the database.

    Args:
        db (Session): Active database session.
        model (Base): Model class representing the database table.
        data (dict): Data to be inserted into the database.

    Returns:
        object: Instance of the newly created model in the database.

    Raises:
        Exception: If an error occurs while saving to the database.
    """

    try:
        db_obj = model(**data)
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj
    except Exception as e:
        db.rollback()
        raise Exception(f"Error saving to database: {str(e)}")


def get_db():
    """
    Generate a database session instance.

    Yields:
        Session: Active database session.

    Closes:
        Closes the database connection after use.
    """
    
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
