from fastapi.testclient import TestClient

from app.main import app
from app.services.auth_service import authenticate_user

client = TestClient(app)


def test_create_and_list_poles_and_neighborhoods() -> None:
    token = authenticate_user("admin@revisa.local", "Admin@12345").access_token
    headers = {"Authorization": f"Bearer {token}"}

    pole_response = client.post(
        "/api/v1/poles",
        headers=headers,
        json={"name": "Polo Norte", "city": "Goiania"},
    )
    assert pole_response.status_code == 201

    neighborhood_response = client.post(
        "/api/v1/poles/neighborhoods",
        headers=headers,
        json={"name": "Vila Nova", "city": "Goiania"},
    )
    assert neighborhood_response.status_code == 201

    poles_list = client.get("/api/v1/poles", headers=headers)
    neighborhoods_list = client.get("/api/v1/poles/neighborhoods", headers=headers)

    assert poles_list.status_code == 200
    assert neighborhoods_list.status_code == 200
    assert any(item["name"] == "Polo Norte" for item in poles_list.json()["items"])
    assert any(item["name"] == "Vila Nova" for item in neighborhoods_list.json()["items"])
