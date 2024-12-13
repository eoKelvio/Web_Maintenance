from fastapi import APIRouter, HTTPException
import httpx

router = APIRouter(prefix="/parts", tags=["Parts"])

# URL do microserviço de partes
PART_SERVICE_URL = "http://parts:9998/parts"

@router.get("/", response_model=list[dict])
async def get_all_parts():
    """
    Retrieve all parts from the parts microservice.

    Returns:
        list[dict]: A list of parts.

    Raises:
        HTTPException: If the parts microservice responds with an error.
    """

    async with httpx.AsyncClient() as client:
        response = await client.get(f"{PART_SERVICE_URL}/")
    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail=response.text)
    return response.json()

@router.post("/")
async def create_part(data: dict):
    """
    Create a new part in the parts microservice.

    Args:
        data (dict): The part data to create.

    Returns:
        dict: The created part.

    Raises:
        HTTPException: If the part name already exists or if the microservice responds with an error.
    """

    async with httpx.AsyncClient() as client:
        # Fazer o GET para buscar todas as máquinas
        partResponse = await client.get(f"{PART_SERVICE_URL}/")
        
        if partResponse.status_code == 200:
            parts = partResponse.json()
            # Verificar se o part name já existe no array de máquinas
            for part in parts:
                if part.get("name") == data["name"]:
                    raise HTTPException(status_code=409, detail="part name already exists")
                
        # Se o part name não existir, criar a máquina
        response = await client.post(f"{PART_SERVICE_URL}/", json=data)
        if response.status_code != 201:
            raise HTTPException(status_code=response.status_code, detail=response.text)
        return response.json()
    
@router.get("/{part_id}")
async def get_part(part_id: int):
    """
    Retrieve a specific part by ID from the parts microservice.

    Args:
        part_id (int): The ID of the part to retrieve.

    Returns:
        dict: The part data.

    Raises:
        HTTPException: If the part is not found or the microservice responds with an error.
    """

    async with httpx.AsyncClient() as client:

        response = await client.get(f"{PART_SERVICE_URL}/{part_id}")
        
        if response.status_code == 404:
            raise HTTPException(status_code=404, detail="part ID not found")
        elif response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail=response.text)
        
        return response.json()
    
@router.put("/{part_id}")
async def update_part(part_id: int, data: dict):
    """
    Update a specific part by ID in the parts microservice.

    Args:
        part_id (int): The ID of the part to update.
        data (dict): The updated part data.

    Returns:
        dict: The updated part data.

    Raises:
        HTTPException: If the part ID or name is invalid, or the microservice responds with an error.
    """

    async with httpx.AsyncClient() as client:
        # Verificar máquinas existentes
        part_response = await client.get(f"{PART_SERVICE_URL}/")
        if part_response.status_code != 200:
            raise HTTPException(status_code=part_response.status_code, detail="Error fetching parts")

        parts = part_response.json()
        part_ids = {part["id"] for part in parts}

        # Validar part_id
        if data.get("part_id") is not None and data["part_id"] not in part_ids:
            raise HTTPException(status_code=400, detail="Invalid part_id")

        # Verificar máquinas existentes
        part_response = await client.get(f"{PART_SERVICE_URL}/")
        if part_response.status_code == 200:
            parts = part_response.json()
            for part in parts:
                if part.get("name") == data["name"] and part.get("id") != part_id:
                    raise HTTPException(status_code=409, detail="part name already exists")

        # Atualizar máquina
        response = await client.put(f"{PART_SERVICE_URL}/{part_id}", json=data)
        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail=response.text)

        return response.json()
    
@router.delete("/{part_id}")
async def delete_part(part_id: int):
    """
    Delete a specific part by ID in the parts microservice.

    Args:
        part_id (int): The ID of the part to delete.

    Returns:
        dict: A message indicating the deletion status.

    Raises:
        HTTPException: If the part is not found or the microservice responds with an error.
    """
    
    async with httpx.AsyncClient() as client:
        # Fazer o GET para buscar todos os usuários
        response = await client.get(f"{PART_SERVICE_URL}/")
        
        if response.status_code == 200:
            parts = response.json()
            
            # Procurar o usuário pelo ID
            part_exists = False
            for part in parts:
                if part.get("id") == part_id:
                    part_exists = True
                    break

            # Se o usuário com o ID fornecido não for encontrado, retorna um erro 404
            if not part_exists:
                raise HTTPException(status_code=404, detail="part ID not found")
            
            # Agora, fazer o DELETE para excluir o usuário
            delete_response = await client.delete(f"{PART_SERVICE_URL}/{part_id}")
            if delete_response.status_code != 204:
                raise HTTPException(status_code=delete_response.status_code, detail=delete_response.text)
            
            return {"message": "part deleted successfully"}
    
        raise HTTPException(status_code=response.status_code, detail=response.text)