from fastapi import FastAPI
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    database_url: str

    class Config:
        env_file = None
        extra = "ignore"


settings = Settings()

DATABASE_URL = settings.database_url

app = FastAPI()
