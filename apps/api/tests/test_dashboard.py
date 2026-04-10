from fastapi.testclient import TestClient

from app.main import app
from app.services.auth_service import authenticate_user

client = TestClient(app)


def test_executive_dashboard_uses_real_citizen_data() -> None:
    token = authenticate_user("admin@revisa.local", "Admin@12345").access_token
    headers = {"Authorization": f"Bearer {token}"}

    client.post(
        "/api/v1/citizens",
        headers=headers,
        json={
            "full_name": "Carlos Alberto",
            "phone": "62970000001",
            "neighborhood": "Centro",
            "pole_name": "Polo Centro",
            "registered_in_field": True,
            "consent_given": True,
        },
    )
    client.post(
        "/api/v1/citizens",
        headers=headers,
        json={
            "full_name": "Fernanda Lima",
            "phone": "62970000002",
            "neighborhood": "Centro",
            "pole_name": "Polo Centro",
            "registered_in_field": True,
            "consent_given": True,
        },
    )

    response = client.get("/api/v1/dashboards/executive", headers=headers)
    assert response.status_code == 200
    payload = response.json()
    assert payload["total_citizens"] >= 2
    assert any(item["name"] == "Centro" for item in payload["by_neighborhood"])
    assert any(item["name"] == "Polo Centro" for item in payload["by_pole"])
