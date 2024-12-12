from .config import app
from .src.routes import user, team, machine, part


@app.get("/")
def root():
    return {"message": "ok"}


app.include_router(user.router)
app.include_router(team.router)
app.include_router(machine.router)
app.include_router(part.router)
