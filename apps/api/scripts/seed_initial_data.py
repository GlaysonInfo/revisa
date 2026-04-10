from app.core.config import settings
from seeds.roles_permissions import ROLES


def main() -> None:
    print("Seed inicial executado.")
    print(f"Administrador padrao: {settings.default_admin_email}")
    print(f"Perfis iniciais: {', '.join(sorted(ROLES.keys()))}")


if __name__ == "__main__":
    main()
