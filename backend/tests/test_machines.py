from fastapi.testclient import TestClient
from ..apis.machines.app.main import app
import uuid

client = TestClient(app)

def test_get_all_machines(client):
    """
    Test the GET /machines/ endpoint.

    This test verifies that the API correctly retrieves all machines in the system.
    It asserts:
    - The response status code is 200.
    - The response data is a list.
    """
    response = client.get("http://localhost:9998/machines/")
    print(response.text)
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_create_machine(client):
    """
    Test the POST /machines/ endpoint.

    This test ensures that a machine can be successfully created.
    It verifies:
    - The response status code is 200.
    - The returned machine data matches the payload sent in the request.
    """
    payload = {
        "name": "Machine 1",
        "type": "Industrial",
        "local": "Warehouse A",
        "fabrication_date": "2024-01-01",
        "serial_number": "SN12345678"
    }
    response = client.post("http://localhost:9998/machines/", json=payload)
    print(response.text)
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "Machine 1"
    assert data["type"] == "Industrial"
    assert data["local"] == "Warehouse A"
    assert data["fabrication_date"] == "2024-01-01"
    assert data["serial_number"] == "SN12345678"

def test_get_machine_by_id(client):
    """
    Test the GET /machines/{id}/ endpoint.

    This test checks that a specific machine can be retrieved by its ID.
    It asserts:
    - The response status code is 200.
    - The machine's data matches the expected values for the given ID.
    """
    response = client.get(f"http://localhost:9998/machines/1/")
    print(response.text)
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == 1
    assert data["name"] == "Machine 1"
    assert data["type"] == "Industrial"
    assert data["local"] == "Warehouse A"
    assert data["fabrication_date"] == "2024-01-01"
    assert data["serial_number"] == "SN12345678"

def test_update_machine(client):
    """
    Test the PUT /machines/{id}/ endpoint.

    This test ensures that the details of an existing machine can be updated.
    It verifies:
    - The response status code is 200.
    - The updated machine data matches the payload sent in the request.
    """
    payload_update = {
        "name": "Machine 1 Updated",
        "type": "Commercial",
        "local": "Warehouse B",
        "fabrication_date": "2023-12-31",
        "serial_number": "SN12345678"
    }
    update_response = client.put(f"http://localhost:9998/machines/1/", json=payload_update)
    print(update_response.text)
    assert update_response.status_code == 200
    updated_data = update_response.json()
    assert updated_data["name"] == "Machine 1 Updated"
    assert updated_data["type"] == "Commercial"
    assert updated_data["local"] == "Warehouse B"
    assert updated_data["fabrication_date"] == "2023-12-31"
    assert updated_data["serial_number"] == "SN12345678"

def test_delete_machine(client):
    """
    Test the DELETE /machines/{id}/ endpoint.

    This test ensures that a machine can be deleted.
    It verifies:
    - The response status code is 200 when the machine is deleted.
    - A subsequent GET request for the same machine ID returns a 404 status code, indicating the machine was deleted.
    """
    delete_response = client.delete(f"http://localhost:9998/machines/1/")
    print(delete_response.text)
    assert delete_response.status_code == 200

    get_response = client.get(f"http://localhost:9998/machines/1/")
    assert get_response.status_code == 404
