from enum import StrEnum


class Scope(StrEnum):
    GLOBAL = "global"
    TERRITORY = "territory"
    NEIGHBORHOOD = "neighborhood"
    COLLABORATOR = "collaborator"
