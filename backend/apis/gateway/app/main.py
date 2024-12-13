from .config import app
from .src.routes import user, team, machine, maintenance, used_part, part


@app.get("/")
def root():
    return {"message": "ok"}


app.include_router(user.router)
app.include_router(team.router)
app.include_router(machine.router)
app.include_router(part.router)
app.include_router(maintenance.router)
app.include_router(used_part.router)
