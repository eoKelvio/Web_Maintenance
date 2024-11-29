from .config import app
from .src.routes import user


@app.get("/")
def root():
    return {"message": "ok"}


app.include_router(user.router)
