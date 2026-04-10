from enum import StrEnum


class Permission(StrEnum):
    VIEW_DASHBOARD = "view:dashboard"
    MANAGE_CITIZENS = "manage:citizens"
    MANAGE_USERS = "manage:users"
