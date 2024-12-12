from fastapi import APIRouter, HTTPException
import httpx

router = APIRouter(prefix="/maintenance", tags=["Maintenance"])

# URLs dos microserviços
MAINTENANCE_SERVICE_URL = "http://maintenances:9996/maintenance"
TEAM_SERVICE_URL = "http://users:9995/teams"

@router.get("/", response_model=list[dict])
async def get_all_maintenances():
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{MAINTENANCE_SERVICE_URL}/")
    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail=response.text)
    return response.json()

@router.post("/", response_model=dict)
async def create_maintenance(data: dict):
    async with httpx.AsyncClient() as client:
        response = await client.post(f"{MAINTENANCE_SERVICE_URL}/", json=data)
    if response.status_code != 201:
        raise HTTPException(status_code=response.status_code, detail=response.text)
    return response.json()

@router.get("/{maintenance_id}", response_model=dict)
async def get_maintenance(maintenance_id: int):
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{MAINTENANCE_SERVICE_URL}/{maintenance_id}")
    if response.status_code == 404:
        raise HTTPException(status_code=404, detail="Maintenance not found")
    elif response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail=response.text)
    return response.json()

@router.put("/{maintenance_id}", response_model=dict)
async def update_maintenance(maintenance_id: int, data: dict):
    async with httpx.AsyncClient() as client:
        response = await client.put(f"{MAINTENANCE_SERVICE_URL}/{maintenance_id}", json=data)
    if response.status_code == 404:
        raise HTTPException(status_code=404, detail="Maintenance not found")
    elif response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail=response.text)
    return response.json()

@router.delete("/{maintenance_id}", response_model=dict)
async def delete_maintenance(maintenance_id: int):
    async with httpx.AsyncClient() as client:
        response = await client.delete(f"{MAINTENANCE_SERVICE_URL}/{maintenance_id}")
    if response.status_code == 404:
        raise HTTPException(status_code=404, detail="Maintenance not found")
    elif response.status_code != 204:
        raise HTTPException(status_code=response.status_code, detail=response.text)
    return {"message": "Maintenance deleted"}

@router.get("/machine/{machineId}", response_model=list[dict])
async def get_maintenances_by_machine(machineId: int):
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{MAINTENANCE_SERVICE_URL}/machine/{machineId}")
    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail=response.text)
    return response.json()

@router.get("/team/{teamId}", response_model=list[dict])
async def get_maintenances_by_team(teamId: int):
    async with httpx.AsyncClient() as client:
        # Verificar existência do time
        team_response = await client.get(f"{TEAM_SERVICE_URL}/{teamId}")
        if team_response.status_code == 404:
            raise HTTPException(status_code=404, detail="Team not found")
        elif team_response.status_code != 200:
            raise HTTPException(status_code=team_response.status_code, detail=team_response.text)
        
        # Buscar manutenções relacionadas ao time
        maintenance_response = await client.get(f"{MAINTENANCE_SERVICE_URL}/team/{teamId}")
        if maintenance_response.status_code != 200:
            raise HTTPException(status_code=maintenance_response.status_code, detail=maintenance_response.text)
        
        return maintenance_response.json()
