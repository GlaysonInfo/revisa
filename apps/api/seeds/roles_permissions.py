PERMISSIONS = [
    "user.read",
    "user.create",
    "user.update",
    "citizen.read",
    "citizen.create",
    "citizen.update",
    "consent.read",
    "consent.create",
    "interaction.read",
    "interaction.create",
    "demand.read",
    "demand.create",
    "task.read",
    "task.create",
    "leadership.read",
    "dashboard.executive.read",
]

ROLES = {
    "admin": PERMISSIONS,
    "coordinator": [
        "citizen.read",
        "citizen.create",
        "citizen.update",
        "interaction.read",
        "interaction.create",
        "demand.read",
        "demand.create",
        "task.read",
        "dashboard.executive.read",
    ],
}
