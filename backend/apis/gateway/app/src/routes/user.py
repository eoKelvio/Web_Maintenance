from fastapi import APIRouter, HTTPException
import httpx

router = APIRouter(prefix="/users", tags=["Users"])

# URL do microserviço de usuários
USER_SERVICE_URL = "http://users:9995/users"


@router.get("/", response_model=list[dict])
async def get_all_users():
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{USER_SERVICE_URL}/")
    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail=response.text)
    return response.json()

@router.post("/")
async def create_user(data: dict):
    async with httpx.AsyncClient() as client:
        # Fazer o GET para buscar todos os usuários
        response = await client.get(f"{USER_SERVICE_URL}/")
        
        if response.status_code == 200:
            users = response.json()
            # Verificar se o username já existe no array de usuários
            for user in users:
                if user.get("username") == data["username"]:
                    raise HTTPException(status_code=409, detail="Username already exists")
        
        # Se o username não existir, criar o usuário
        response = await client.post(f"{USER_SERVICE_URL}/", json=data)
        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail=response.text)
        
        return response.json()

@router.get("/{user_id}")
async def get_user(user_id: int):
    async with httpx.AsyncClient() as client:

        response = await client.get(f"{USER_SERVICE_URL}/{user_id}")
        
        if response.status_code == 404:
            raise HTTPException(status_code=404, detail="user ID not found")
        elif response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail=response.text)
        
        return response.json()


@router.put("/{user_id}")
async def update_user(user_id: int, data: dict):
    async with httpx.AsyncClient() as client:
        # Fazer o GET para buscar todos os usuários
        response = await client.get(f"{USER_SERVICE_URL}/")
        
        if response.status_code == 200:
            users = response.json()

            # Verificar se o username já existe em outro usuário
            for user in users:
                if user.get("username") == data["username"] and user.get("id") != user_id:
                    raise HTTPException(status_code=409, detail="Username already exists")
            
            # Agora, fazer o PUT para atualizar o usuário
            update_response = await client.put(f"{USER_SERVICE_URL}/{user_id}", json=data)
            if update_response.status_code != 200:
                raise HTTPException(status_code=update_response.status_code, detail=update_response.text)
            
            return update_response.json()

        raise HTTPException(status_code=response.status_code, detail=response.text)

@router.delete("/{user_id}")
async def delete_user(user_id: int):
    async with httpx.AsyncClient() as client:
        # Fazer o GET para buscar todos os usuários
        response = await client.get(f"{USER_SERVICE_URL}/")
        
        if response.status_code == 200:
            users = response.json()
            
            # Procurar o usuário pelo ID
            user_exists = False
            for user in users:
                if user.get("id") == user_id:
                    user_exists = True
                    break

            # Se o usuário com o ID fornecido não for encontrado, retorna um erro 404
            if not user_exists:
                raise HTTPException(status_code=404, detail="User ID not found")
            
            # Agora, fazer o DELETE para excluir o usuário
            delete_response = await client.delete(f"{USER_SERVICE_URL}/{user_id}")
            if delete_response.status_code != 204:
                raise HTTPException(status_code=delete_response.status_code, detail=delete_response.text)
            
            return {"message": "User deleted successfully"}
    
        raise HTTPException(status_code=response.status_code, detail=response.text)