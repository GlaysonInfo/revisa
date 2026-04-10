from app.core.config import settings


def main() -> None:
    print("Seed inicial executado.")
    print(f"Administrador padrao: {settings.default_admin_email}")


if __name__ == "__main__":
    main()
