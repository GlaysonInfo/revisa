from functools import lru_cache
from pathlib import Path

from pydantic import Field, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict

PROJECT_ROOT = Path(__file__).resolve().parents[4]


class Settings(BaseSettings):
    app_name: str = "REVISA Platform API"
    app_version: str = "2.0.0"
    environment: str = Field(default="development")
    debug: bool = Field(default=True)
    api_v1_prefix: str = "/api/v1"

    database_url: str = "sqlite:///./revisa.db"
    jwt_secret_key: str = "change_this_access_secret"
    jwt_refresh_secret_key: str = "change_this_refresh_secret"
    jwt_algorithm: str = "HS256"
    jwt_access_token_expire_minutes: int = 30
    jwt_refresh_token_expire_days: int = 7

    cors_origins: str = "*"
    redis_url: str = "redis://localhost:6379/0"
    rate_limit_requests: int = 120
    rate_limit_window_seconds: int = 60
    log_level: str = "INFO"
    default_admin_email: str = "admin@revisa.local"
    default_admin_password: str = "Admin@12345"
    demo_seed_on_start: bool = False
    demo_seed_force_reset: bool = False

    model_config = SettingsConfigDict(env_file=PROJECT_ROOT / ".env", env_file_encoding="utf-8", extra="ignore")

    @field_validator("database_url", mode="before")
    @classmethod
    def normalize_database_url(cls, value: str) -> str:
        if isinstance(value, str) and value.startswith("sqlite:///./"):
            sqlite_path = (PROJECT_ROOT / value.removeprefix("sqlite:///./")).resolve()
            return f"sqlite:///{sqlite_path.as_posix()}"
        return value


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
