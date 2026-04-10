up:
	docker compose up --build

down:
	docker compose down

logs:
	docker compose logs -f api

api:
	docker compose exec api bash

migrate:
	docker compose exec api alembic upgrade head

revision:
	docker compose exec api alembic revision --autogenerate -m "$(m)"

seed:
	docker compose exec api python scripts/seed_initial_data.py

test:
	docker compose exec api pytest -q
