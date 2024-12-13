from fastapi import APIRouter, HTTPException
import httpx

router = APIRouter(prefix="/maintenance", tags=["Maintenance"])

# URLs dos microserviços
MAINTENANCE_SERVICE_URL = "http://maintenances:9996/maintenance"
TEAM_SERVICE_URL = "http://users:9995/teams"

@router.get("/", response_model=list[dict])
async def get_all_maintenances():
    """
    Retrieve all maintenance records from the maintenance microservice.

    Returns:
        list[dict]: A list of maintenance records.

    Raises:
        HTTPException: If the maintenance microservice responds with an error.
    """

    async with httpx.AsyncClient() as client:
        response = await client.get(f"{MAINTENANCE_SERVICE_URL}/")
    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail=response.text)
    return response.json()

@router.post("/", response_model=dict)
async def create_maintenance(data: dict):
    """
    Create a new maintenance record in the maintenance microservice.

    Args:
        data (dict): The maintenance data to create.

    Returns:
        dict: The created maintenance record.

    Raises:
        HTTPException: If the maintenance microservice responds with an error.
    """

    async with httpx.AsyncClient() as client:
        response = await client.post(f"{MAINTENANCE_SERVICE_URL}/", json=data)
    if response.status_code != 201:
        raise HTTPException(status_code=response.status_code, detail=response.text)
    return response.json()

@router.get("/{maintenance_id}", response_model=dict)
async def get_maintenance(maintenance_id: int):
    """
    Retrieve a specific maintenance record by ID from the maintenance microservice.

    Args:
        maintenance_id (int): The ID of the maintenance record to retrieve.

    Returns:
        dict: The maintenance record.

    Raises:
        HTTPException: If the maintenance record is not found or the microservice responds with an error.
    """

    async with httpx.AsyncClient() as client:
        response = await client.get(f"{MAINTENANCE_SERVICE_URL}/{maintenance_id}")
    if response.status_code == 404:
        raise HTTPException(status_code=404, detail="Maintenance not found")
    elif response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail=response.text)
    return response.json()

@router.put("/{maintenance_id}", response_model=dict)
async def update_maintenance(maintenance_id: int, data: dict):
    """
    Update a specific maintenance record by ID in the maintenance microservice.

    Args:
        maintenance_id (int): The ID of the maintenance record to update.
        data (dict): The updated maintenance data.

    Returns:
        dict: The updated maintenance record.

    Raises:
        HTTPException: If the maintenance record is not found or the microservice responds with an error.
    """

    async with httpx.AsyncClient() as client:
        response = await client.put(f"{MAINTENANCE_SERVICE_URL}/{maintenance_id}", json=data)
    if response.status_code == 404:
        raise HTTPException(status_code=404, detail="Maintenance not found")
    elif response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail=response.text)
    return response.json()

@router.delete("/{maintenance_id}", response_model=dict)
async def delete_maintenance(maintenance_id: int):
    """
    Delete a specific maintenance record by ID in the maintenance microservice.

    Args:
        maintenance_id (int): The ID of the maintenance record to delete.

    Returns:
        dict: A message indicating the deletion status.

    Raises:
        HTTPException: If the maintenance record is not found or the microservice responds with an error.
    """
    async with httpx.AsyncClient() as client:
        response = await client.delete(f"{MAINTENANCE_SERVICE_URL}/{maintenance_id}")
    if response.status_code == 404:
        raise HTTPException(status_code=404, detail="Maintenance not found")
    elif response.status_code != 204:
        raise HTTPException(status_code=response.status_code, detail=response.text)
    return {"message": "Maintenance deleted"}

@router.get("/machine/{machineId}", response_model=list[dict])
async def get_maintenances_by_machine(machineId: int):
    """
    Retrieve all maintenance records for a specific machine from the maintenance microservice.

    Args:
        machineId (int): The ID of the machine.

    Returns:
        list[dict]: A list of maintenance records for the specified machine.

    Raises:
        HTTPException: If the maintenance microservice responds with an error.
    """

    async with httpx.AsyncClient() as client:
        response = await client.get(f"{MAINTENANCE_SERVICE_URL}/machine/{machineId}")
    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail=response.text)
    return response.json()

@router.get("/team/{teamId}", response_model=list[dict])
async def get_maintenances_by_team(teamId: int):
    """
    Retrieve all maintenance records associated with a specific team from the maintenance microservice.

    Args:
        teamId (int): The ID of the team.

    Returns:
        list[dict]: A list of maintenance records for the specified team.

    Raises:
        HTTPException: If the team does not exist or the microservice responds with an error.
    """
    
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
