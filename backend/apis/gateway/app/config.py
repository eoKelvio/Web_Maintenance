from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Configurar os domínios permitidos
origins = [
    "http://localhost:3000",
    "http://localhost:8081",   # Origem do seu frontend
    "http://127.0.0.1:3000",  # Origem alternativa do frontend
    "http://10.109.3.145:8081",
    # Adicione outros domínios permitidos, se necessário
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Permitir estas origens
    allow_credentials=True,  # Permitir envio de cookies
    allow_methods=["*"],  # Permitir todos os métodos HTTP (GET, POST, etc.)
    allow_headers=["*"],  # Permitir todos os cabeçalhos
)