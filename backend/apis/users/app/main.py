from .src.routes import user
from .src.routes import team
from .config import app

@app.get("/")
def root():
    return{"message":"ok"}

app.include_router(user.router)
app.include_router(team.router)
