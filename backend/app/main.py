from .config import app

@app.get("/")
def root():
    return{"message":"ok"}