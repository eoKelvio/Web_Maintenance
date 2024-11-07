from .src.routes import login, machines, maintenance, storage, teams
from .config import app

@app.get("/")
def root():
    return{"message":"ok"}

app.include_router(login.router)
app.include_router(machines.router)
app.include_router(maintenance.router)
app.include_router(storage.router)
app.include_router(teams.router)
