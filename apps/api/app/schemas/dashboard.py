from pydantic import BaseModel


class GroupedCount(BaseModel):
    name: str
    total: int


class GovernanceMetric(BaseModel):
    label: str
    value: str
    note: str


class PriorityItem(BaseModel):
    title: str
    note: str


class DemandCard(BaseModel):
    title: str
    neighborhood: str
    status: str


class TaskCard(BaseModel):
    title: str
    status: str
    assigned_to: str


class ActivityItem(BaseModel):
    when: str
    title: str
    place: str


class DashboardSummary(BaseModel):
    total_citizens: int
    total_collaborators: int
    by_neighborhood: list[GroupedCount]
    by_collaborator: list[GroupedCount]
    requested_by: str


class ExecutiveDashboard(BaseModel):
    total_citizens: int
    active_poles: int
    open_demands: int
    open_tasks: int
    activities_next_7d: int
    by_neighborhood: list[GroupedCount]
    by_collaborator: list[GroupedCount]
    by_pole: list[GroupedCount]
    governance_items: list[GovernanceMetric]
    critical_demands: list[DemandCard]
    open_tasks_list: list[TaskCard]
    priorities: list[PriorityItem]
    activities_schedule: list[ActivityItem]
