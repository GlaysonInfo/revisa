from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1 import activities, auth, citizens, consents, dashboards, demands, interactions, leadership, poles, tasks
from app.core.config import settings
from app.core.database import init_db
from app.core.error_handlers import install_error_handlers
from app.core.logging import configure_logging
from app.core.metrics import install_metrics
from scripts.seed_demo_dashboard import ensure_demo_data

configure_logging()

app = FastAPI(
    title=settings.app_name,
    version=settings.app_version,
    openapi_url=f"{settings.api_v1_prefix}/openapi.json",
)

init_db()

if settings.demo_seed_on_start:
    ensure_demo_data(force_reset=settings.demo_seed_force_reset)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[origin.strip() for origin in settings.cors_origins.split(",") if origin.strip()],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

install_error_handlers(app)
install_metrics(app)

app.include_router(auth.router, prefix=settings.api_v1_prefix)
app.include_router(citizens.router, prefix=settings.api_v1_prefix)
app.include_router(poles.router, prefix=settings.api_v1_prefix)
app.include_router(demands.router, prefix=settings.api_v1_prefix)
app.include_router(tasks.router, prefix=settings.api_v1_prefix)
app.include_router(interactions.router, prefix=settings.api_v1_prefix)
app.include_router(consents.router, prefix=settings.api_v1_prefix)
app.include_router(activities.router, prefix=settings.api_v1_prefix)
app.include_router(leadership.router, prefix=settings.api_v1_prefix)
app.include_router(dashboards.router, prefix=settings.api_v1_prefix)


@app.get("/health", tags=["health"])
def healthcheck() -> dict[str, str]:
    return {"status": "ok", "service": settings.app_name}
