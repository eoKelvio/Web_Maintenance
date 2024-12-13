from sqlalchemy import create_engine
from sqlalchemy.orm import Session, declarative_base, registry, sessionmaker

from ..config import DATABASE_URL

Base = declarative_base()
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
mapper_registry = registry()


def save_to_db(db: Session, model, data):
    """
    Save a new object to the database.

    Args:
        db (Session): The database session instance.
        model (Base): The SQLAlchemy model class.
        data (dict): The data to initialize the model instance.

    Returns:
        object: The saved object with updated fields.

    Raises:
        Exception: If an error occurs while saving the object.
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
    Provide a database session to the caller.

    Yields:
        Session: An instance of the database session.

    Ensures:
        The session is properly closed after use.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
