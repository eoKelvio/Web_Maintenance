from fastapi import APIRouter, HTTPException
import httpx

router = APIRouter(prefix="/maintenances/{maintenance_id}/used_parts", tags=["Used Parts"])

# URL base do microserviço de manutenção
MAINTENANCE_SERVICE_URL = "http://maintenances:9996/maintenances"

@router.get("/", response_model=list[dict])
async def get_used_parts(maintenance_id: int):
    """
    Retrieve all used parts for a specific maintenance from the maintenance microservice.

    Args:
        maintenance_id (int): The ID of the maintenance.

    Returns:
        list[dict]: A list of used parts.

    Raises:
        HTTPException: If the maintenance microservice responds with an error.
    """

    async with httpx.AsyncClient() as client:
        response = await client.get(f"{MAINTENANCE_SERVICE_URL}/{maintenance_id}/used_parts/")
    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail=response.text)
    return response.json()

@router.post("/", response_model=dict)
async def create_used_part(maintenance_id: int, data: dict):
    """
    Create a new used part for a specific maintenance in the maintenance microservice.

    Args:
        maintenance_id (int): The ID of the maintenance.
        data (dict): The used part data to create.

    Returns:
        dict: The created used part.

    Raises:
        HTTPException: If the maintenance microservice responds with an error.
    """

    async with httpx.AsyncClient() as client:
        response = await client.post(f"{MAINTENANCE_SERVICE_URL}/{maintenance_id}/used_parts/", json=data)
    if response.status_code != 201:
        raise HTTPException(status_code=response.status_code, detail=response.text)
    return response.json()

@router.put("/{used_part_id}", response_model=dict)
async def update_used_part(maintenance_id: int, used_part_id: int, data: dict):
    """
    Update a specific used part for a maintenance in the maintenance microservice.

    Args:
        maintenance_id (int): The ID of the maintenance.
        used_part_id (int): The ID of the used part to update.
        data (dict): The updated used part data.

    Returns:
        dict: The updated used part.

    Raises:
        HTTPException: If the used part is not found or the microservice responds with an error.
    """

    async with httpx.AsyncClient() as client:
        response = await client.put(f"{MAINTENANCE_SERVICE_URL}/{maintenance_id}/used_parts/{used_part_id}/", json=data)
    if response.status_code == 404:
        raise HTTPException(status_code=404, detail="Used part not found")
    elif response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail=response.text)
    return response.json()

@router.delete("/{used_part_id}", response_model=dict)
async def delete_used_part(maintenance_id: int, used_part_id: int):
    """
    Delete a specific used part for a maintenance in the maintenance microservice.

    Args:
        maintenance_id (int): The ID of the maintenance.
        used_part_id (int): The ID of the used part to delete.

    Returns:
        dict: A message indicating the deletion status.

    Raises:
        HTTPException: If the used part is not found or the microservice responds with an error.
    """
    
    async with httpx.AsyncClient() as client:
        response = await client.delete(f"{MAINTENANCE_SERVICE_URL}/{maintenance_id}/used_parts/{used_part_id}/")
    if response.status_code == 404:
        raise HTTPException(status_code=404, detail="Used part not found")
    elif response.status_code != 204:
        raise HTTPException(status_code=response.status_code, detail=response.text)
    return {"message": "Used part deleted"}
