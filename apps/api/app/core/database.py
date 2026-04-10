from sqlalchemy import create_engine, inspect, text
from sqlalchemy.orm import sessionmaker

from app.core.config import settings

connect_args = {"check_same_thread": False} if settings.database_url.startswith("sqlite") else {}

engine = create_engine(settings.database_url, future=True, connect_args=connect_args)
SessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False, future=True)


def init_db() -> None:
    from app import models  # noqa: F401
    from app.models.base import Base

    Base.metadata.create_all(bind=engine)
    _ensure_citizens_columns()
    _ensure_users_columns()
    _ensure_demands_columns()
    _ensure_tasks_columns()
    _ensure_activities_columns()


def _ensure_citizens_columns() -> None:
    inspector = inspect(engine)
    if "citizens" not in inspector.get_table_names():
        return

    existing_columns = {column["name"] for column in inspector.get_columns("citizens")}
    missing_columns = {
        "email": "ALTER TABLE citizens ADD COLUMN email VARCHAR(255) DEFAULT ''",
        "pole_name": "ALTER TABLE citizens ADD COLUMN pole_name VARCHAR(120) DEFAULT ''",
        "address": "ALTER TABLE citizens ADD COLUMN address VARCHAR(255) DEFAULT ''",
        "reference_point": "ALTER TABLE citizens ADD COLUMN reference_point VARCHAR(255) DEFAULT ''",
        "notes": "ALTER TABLE citizens ADD COLUMN notes TEXT DEFAULT ''",
        "registered_in_field": "ALTER TABLE citizens ADD COLUMN registered_in_field BOOLEAN DEFAULT 1",
        "consent_given": "ALTER TABLE citizens ADD COLUMN consent_given BOOLEAN DEFAULT 0",
    }

    with engine.begin() as connection:
        for column_name, ddl in missing_columns.items():
            if column_name not in existing_columns:
                connection.execute(text(ddl))


def _ensure_users_columns() -> None:
    inspector = inspect(engine)
    if "users" not in inspector.get_table_names():
        return

    existing_columns = {column["name"] for column in inspector.get_columns("users")}
    missing_columns = {
        "phone": "ALTER TABLE users ADD COLUMN phone VARCHAR(40) DEFAULT ''",
        "profile_type": "ALTER TABLE users ADD COLUMN profile_type VARCHAR(120) DEFAULT ''",
        "political_profile": "ALTER TABLE users ADD COLUMN political_profile VARCHAR(120) DEFAULT ''",
        "pole_name": "ALTER TABLE users ADD COLUMN pole_name VARCHAR(120) DEFAULT ''",
    }

    with engine.begin() as connection:
        for column_name, ddl in missing_columns.items():
            if column_name not in existing_columns:
                connection.execute(text(ddl))


def _ensure_demands_columns() -> None:
    inspector = inspect(engine)
    if "demands" not in inspector.get_table_names():
        return

    existing_columns = {column["name"] for column in inspector.get_columns("demands")}
    missing_columns = {
        "title": "ALTER TABLE demands ADD COLUMN title VARCHAR(255) DEFAULT ''",
        "neighborhood": "ALTER TABLE demands ADD COLUMN neighborhood VARCHAR(120) DEFAULT ''",
        "pole_name": "ALTER TABLE demands ADD COLUMN pole_name VARCHAR(120) DEFAULT ''",
        "priority": "ALTER TABLE demands ADD COLUMN priority VARCHAR(40) DEFAULT 'media'",
    }

    with engine.begin() as connection:
        for column_name, ddl in missing_columns.items():
            if column_name not in existing_columns:
                connection.execute(text(ddl))


def _ensure_tasks_columns() -> None:
    inspector = inspect(engine)
    if "tasks" not in inspector.get_table_names():
        return

    existing_columns = {column["name"] for column in inspector.get_columns("tasks")}
    missing_columns = {
        "pole_name": "ALTER TABLE tasks ADD COLUMN pole_name VARCHAR(120) DEFAULT ''",
        "priority": "ALTER TABLE tasks ADD COLUMN priority VARCHAR(40) DEFAULT 'media'",
    }

    with engine.begin() as connection:
        for column_name, ddl in missing_columns.items():
            if column_name not in existing_columns:
                connection.execute(text(ddl))


def _ensure_activities_columns() -> None:
    inspector = inspect(engine)
    if "activities" not in inspector.get_table_names():
        return

    existing_columns = {column["name"] for column in inspector.get_columns("activities")}
    missing_columns = {
        "pole_name": "ALTER TABLE activities ADD COLUMN pole_name VARCHAR(120) DEFAULT ''",
        "scheduled_for": "ALTER TABLE activities ADD COLUMN scheduled_for DATETIME",
    }

    with engine.begin() as connection:
        for column_name, ddl in missing_columns.items():
            if column_name not in existing_columns:
                connection.execute(text(ddl))
