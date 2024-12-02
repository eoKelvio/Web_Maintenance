from .config import app
from .src.routes import user, team


@app.get("/")
def root():
    return {"message": "ok"}


app.include_router(user.router)
app.include_router(team.router)
