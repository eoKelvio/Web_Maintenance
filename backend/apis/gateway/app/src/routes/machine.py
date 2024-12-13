from fastapi import APIRouter, HTTPException
import httpx

router = APIRouter(prefix="/machines", tags=["Machines"])

# URL do microserviço de máquinas
MACHINE_SERVICE_URL = "http://machines:9997/machines"

@router.get("/", response_model=list[dict])
async def get_all_machines():
    """
    Retrieve all machines from the machine microservice.

    Returns:
        list[dict]: A list of machines.

    Raises:
        HTTPException: If the machine microservice responds with an error.
    """

    async with httpx.AsyncClient() as client:
        response = await client.get(f"{MACHINE_SERVICE_URL}/")
    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail=response.text)
    return response.json()

@router.post("/")
async def create_machine(data: dict):
    """
    Create a new machine in the machine microservice.

    Args:
        data (dict): The machine data to create.

    Returns:
        dict: The created machine.

    Raises:
        HTTPException: If the machine name already exists or if the microservice responds with an error.
    """

    async with httpx.AsyncClient() as client:
        # Fazer o GET para buscar todas as máquinas
        machineResponse = await client.get(f"{MACHINE_SERVICE_URL}/")
        
        if machineResponse.status_code == 200:
            machines = machineResponse.json()
            # Verificar se o machine name já existe no array de máquinas
            for machine in machines:
                if machine.get("name") == data["name"]:
                    raise HTTPException(status_code=409, detail="Machine name already exists")
                
        # Se o machine name não existir, criar a máquina
        response = await client.post(f"{MACHINE_SERVICE_URL}/", json=data)
        if response.status_code != 201:
            raise HTTPException(status_code=response.status_code, detail=response.text)
        return response.json()
    
@router.get("/{machine_id}")
async def get_user(machine_id: int):
    """
    Retrieve a specific machine by ID from the machine microservice.

    Args:
        machine_id (int): The ID of the machine to retrieve.

    Returns:
        dict: The machine data.

    Raises:
        HTTPException: If the machine is not found or the microservice responds with an error.
    """

    async with httpx.AsyncClient() as client:

        response = await client.get(f"{MACHINE_SERVICE_URL}/{machine_id}")
        
        if response.status_code == 404:
            raise HTTPException(status_code=404, detail="machine ID not found")
        elif response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail=response.text)
        
        return response.json()
    
@router.put("/{machine_id}")
async def update_machine(machine_id: int, data: dict):
    """
    Update a specific machine by ID in the machine microservice.

    Args:
        machine_id (int): The ID of the machine to update.
        data (dict): The updated machine data.

    Returns:
        dict: The updated machine data.

    Raises:
        HTTPException: If the machine ID or name is invalid, or the microservice responds with an error.
    """
    async with httpx.AsyncClient() as client:
        # Verificar máquinas existentes
        machine_response = await client.get(f"{MACHINE_SERVICE_URL}/")
        if machine_response.status_code != 200:
            raise HTTPException(status_code=machine_response.status_code, detail="Error fetching machines")

        machines = machine_response.json()
        machine_ids = {machine["id"] for machine in machines}

        # Validar machine_id
        if data.get("machine_id") is not None and data["machine_id"] not in machine_ids:
            raise HTTPException(status_code=400, detail="Invalid machine_id")

        # Verificar máquinas existentes
        machine_response = await client.get(f"{MACHINE_SERVICE_URL}/")
        if machine_response.status_code == 200:
            machines = machine_response.json()
            for machine in machines:
                if machine.get("name") == data["name"] and machine.get("id") != machine_id:
                    raise HTTPException(status_code=409, detail="Machine name already exists")

        # Atualizar máquina
        response = await client.put(f"{MACHINE_SERVICE_URL}/{machine_id}", json=data)
        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail=response.text)

        return response.json()
    
@router.delete("/{machine_id}")
async def delete_user(machine_id: int):
    """
    Delete a specific machine by ID in the machine microservice.

    Args:
        machine_id (int): The ID of the machine to delete.

    Returns:
        dict: A message indicating the deletion status.

    Raises:
        HTTPException: If the machine is not found or the microservice responds with an error.
    """
    
    async with httpx.AsyncClient() as client:
        # Fazer o GET para buscar todos os usuários
        response = await client.get(f"{MACHINE_SERVICE_URL}/")
        
        if response.status_code == 200:
            users = response.json()
            
            # Procurar o usuário pelo ID
            user_exists = False
            for user in users:
                if user.get("id") == machine_id:
                    user_exists = True
                    break

            # Se o usuário com o ID fornecido não for encontrado, retorna um erro 404
            if not user_exists:
                raise HTTPException(status_code=404, detail="User ID not found")
            
            # Agora, fazer o DELETE para excluir o usuário
            delete_response = await client.delete(f"{MACHINE_SERVICE_URL}/{machine_id}")
            if delete_response.status_code != 204:
                raise HTTPException(status_code=delete_response.status_code, detail=delete_response.text)
            
            return {"message": "User deleted successfully"}
    
        raise HTTPException(status_code=response.status_code, detail=response.text)
