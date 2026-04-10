from uuid import uuid4

from fastapi.testclient import TestClient

from app.main import app
from app.services.auth_service import authenticate_user

client = TestClient(app)


def test_create_and_list_citizen() -> None:
    token = authenticate_user("admin@revisa.local", "Admin@12345").access_token
    headers = {"Authorization": f"Bearer {token}"}
    unique = uuid4().hex[:8]

    create_response = client.post(
        "/api/v1/citizens",
        headers=headers,
        json={
            "full_name": f"Maria do Carmo {unique}",
            "phone": f"6299{unique[:6]}",
            "email": f"maria.{unique}@example.com",
            "neighborhood": "Centro",
            "pole_name": "Polo Centro",
            "address": "Rua Principal, 100",
            "reference_point": "Perto da praca",
            "notes": "Prefere contato por WhatsApp",
            "registered_in_field": True,
            "consent_given": True,
        },
    )

    assert create_response.status_code == 201
    assert create_response.json()["full_name"] == f"Maria do Carmo {unique}"
    assert create_response.json()["neighborhood"] == "Centro"
    assert create_response.json()["pole_name"] == "Polo Centro"

    list_response = client.get("/api/v1/citizens", headers=headers)
    assert list_response.status_code == 200
    assert len(list_response.json()["items"]) >= 1


def test_filter_and_update_citizen() -> None:
    token = authenticate_user("admin@revisa.local", "Admin@12345").access_token
    headers = {"Authorization": f"Bearer {token}"}
    unique = uuid4().hex[:8]

    created = client.post(
        "/api/v1/citizens",
        headers=headers,
        json={
            "full_name": f"Joao Pereira {unique}",
            "phone": f"6288{unique[:6]}",
            "neighborhood": "Santa Luzia",
            "pole_name": "Polo Leste",
            "registered_in_field": True,
            "consent_given": True,
        },
    )
    assert created.status_code == 201
    citizen_id = created.json()["id"]

    filtered = client.get(f"/api/v1/citizens?query={unique}&neighborhood=Santa Luzia", headers=headers)
    assert filtered.status_code == 200
    assert any(item["id"] == citizen_id for item in filtered.json()["items"])

    updated = client.put(
        f"/api/v1/citizens/{citizen_id}",
        headers=headers,
        json={
            "full_name": f"Joao Pereira da Silva {unique}",
            "phone": f"6288{unique[:6]}",
            "email": f"joao.{unique}@example.com",
            "neighborhood": "Santa Luzia",
            "pole_name": "Polo Leste",
            "address": "Rua 12",
            "reference_point": "Mercado local",
            "notes": "Cadastro revisado no escritorio",
            "consent_given": True,
        },
    )
    assert updated.status_code == 200
    assert updated.json()["full_name"] == f"Joao Pereira da Silva {unique}"
    assert updated.json()["email"] == f"joao.{unique}@example.com"


def test_duplicate_citizen_is_blocked() -> None:
    token = authenticate_user("admin@revisa.local", "Admin@12345").access_token
    headers = {"Authorization": f"Bearer {token}"}
    unique = uuid4().hex[:8]

    payload = {
        "full_name": f"Ana Paula {unique}",
        "phone": f"6277{unique[:6]}",
        "email": f"ana.{unique}@example.com",
        "neighborhood": "Centro",
        "pole_name": "Polo Centro",
        "registered_in_field": True,
        "consent_given": True,
    }

    first = client.post("/api/v1/citizens", headers=headers, json=payload)
    assert first.status_code == 201

    second = client.post("/api/v1/citizens", headers=headers, json=payload)
    assert second.status_code == 409
