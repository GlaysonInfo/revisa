export type GroupedCount = {
  name: string;
  total: number;
};

export type GovernanceMetric = {
  label: string;
  value: string;
  note: string;
};

export type DemandCard = {
  title: string;
  neighborhood: string;
  status: string;
};

export type TaskCard = {
  title: string;
  status: string;
  assigned_to: string;
};

export type PriorityItem = {
  title: string;
  note: string;
};

export type ActivityItem = {
  when: string;
  title: string;
  place: string;
};

export type ExecutiveDashboard = {
  total_citizens: number;
  active_poles: number;
  open_demands: number;
  open_tasks: number;
  activities_next_7d: number;
  by_neighborhood: GroupedCount[];
  by_collaborator: GroupedCount[];
  by_pole: GroupedCount[];
  governance_items: GovernanceMetric[];
  critical_demands: DemandCard[];
  open_tasks_list: TaskCard[];
  priorities: PriorityItem[];
  activities_schedule: ActivityItem[];
};

export type CitizenListItem = {
  id: string;
  full_name: string;
  phone: string;
  neighborhood: string;
  pole_name: string;
  collaborator_name: string;
};

export type CitizenListResponse = {
  items: CitizenListItem[];
  requested_by: string;
};

export type CitizenRecord = {
  id?: string;
  full_name: string;
  phone: string;
  email: string;
  neighborhood: string;
  pole_name: string;
  address: string;
  reference_point: string;
  notes: string;
  collaborator_name: string;
  registered_in_field: boolean;
  consent_given: boolean;
};
