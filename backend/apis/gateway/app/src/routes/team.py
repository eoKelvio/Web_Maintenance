from fastapi import APIRouter, HTTPException
import httpx

router = APIRouter(prefix="/teams", tags=["Teams"])

# URL do microserviço de times
TEAM_SERVICE_URL = "http://users:9995/teams"
USER_SERVICE_URL = "http://users:9995/users"


@router.get("/", response_model=list[dict])
async def get_all_teams():
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{TEAM_SERVICE_URL}/")
    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail=response.text)
    return response.json()

@router.post("/")
async def create_team(data: dict):
    async with httpx.AsyncClient() as client:
        # Fazer o GET para buscar todos os times
        teamResponse = await client.get(f"{TEAM_SERVICE_URL}/")
        userResponse = await client.get(f"{USER_SERVICE_URL}/")
        
        if teamResponse.status_code == 200:
            teams = teamResponse.json()
            users = userResponse.json()
            # Verificar se o team name já existe no array de times
            for team in teams:
                if team.get("name") == data["name"]:
                    raise HTTPException(status_code=409, detail="Team name already exists")

            if userResponse.status_code == 200:
                for user in users:
                    if user.get("id") != data["leader_id"]:
                        raise HTTPException(status_code=409, detail="Leader ID does not exist")
        
        # Se o team name não existir, criar o time
        response = await client.post(f"{TEAM_SERVICE_URL}/", json=data)
        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail=response.text)
        
        return response.json()

@router.get("/{team_id}")
async def get_team(team_id: int):
    async with httpx.AsyncClient() as client:
        # Fazer a requisição diretamente ao endpoint de busca por ID
        response = await client.get(f"{TEAM_SERVICE_URL}/{team_id}")
        
        if response.status_code == 404:
            raise HTTPException(status_code=404, detail="Team ID not found")
        elif response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail=response.text)
        
        return response.json()


@router.put("/{team_id}")
async def update_team(team_id: int, data: dict):
    async with httpx.AsyncClient() as client:
        # Fazer o GET para buscar todos os times
        teamResponse = await client.get(f"{TEAM_SERVICE_URL}/")
        userResponse = await client.get(f"{USER_SERVICE_URL}/")
        
        if teamResponse.status_code == 200:
            teams = teamResponse.json()
            users = userResponse.json()
            # Verificar se o teamname já existe em outro time
            for team in teams:
                if team.get("name") == data["name"] and team.get("id") != team_id:
                    raise HTTPException(status_code=409, detail="Team name already exists")
                
                if userResponse.status_code == 200:
                    for user in users:
                        if user.get("id") != data["leader_id"]:
                            raise HTTPException(status_code=409, detail="Leader ID does not exist")
            
            # Agora, fazer o PUT para atualizar o time
            update_response = await client.put(f"{TEAM_SERVICE_URL}/{team_id}", json=data)
            if update_response.status_code != 200:
                raise HTTPException(status_code=update_response.status_code, detail=update_response.text)
            
            return update_response.json()

        raise HTTPException(status_code=response.status_code, detail=response.text)

@router.delete("/{team_id}")
async def delete_team(team_id: int):
    async with httpx.AsyncClient() as client:
        # Fazer o GET para buscar todos os times
        response = await client.get(f"{TEAM_SERVICE_URL}/")
        
        if response.status_code == 200:
            teams = response.json()
            
            # Procurar o time pelo ID
            team_exists = False
            for team in teams:
                if team.get("id") == team_id:
                    team_exists = True
                    break

            # Se o time com o ID fornecido não for encontrado, retorna um erro 404
            if not team_exists:
                raise HTTPException(status_code=404, detail="Team ID not found")
            
            # Agora, fazer o DELETE para excluir o time
            delete_response = await client.delete(f"{TEAM_SERVICE_URL}/{team_id}")
            if delete_response.status_code != 204:
                raise HTTPException(status_code=delete_response.status_code, detail=delete_response.text)
            
            return {"message": "Team deleted successfully"}
    
        raise HTTPException(status_code=response.status_code, detail=response.text)