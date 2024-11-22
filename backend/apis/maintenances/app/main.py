from .config import app
from .src.routes import maintenance, used_part


@app.get("/")
def root():
    return {"message": "ok"}


app.include_router(maintenance.router)
app.include_router(used_part.router)