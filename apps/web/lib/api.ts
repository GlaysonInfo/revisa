import { CitizenListResponse, CitizenRecord, ExecutiveDashboard } from "./types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000/api/v1";

export async function getExecutiveDashboard(
  token: string,
): Promise<ExecutiveDashboard> {
  const response = await fetch(`${API_BASE_URL}/dashboards/executive`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Falha ao carregar dashboard");
  }

  return response.json();
}

export async function listCitizens(
  token: string,
  params?: { query?: string; neighborhood?: string },
): Promise<CitizenListResponse> {
  const search = new URLSearchParams();
  if (params?.query) search.set("query", params.query);
  if (params?.neighborhood) search.set("neighborhood", params.neighborhood);

  const response = await fetch(`${API_BASE_URL}/citizens?${search.toString()}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Falha ao carregar cadastros");
  }

  return response.json();
}

export async function getCitizen(token: string, citizenId: string): Promise<CitizenRecord> {
  const response = await fetch(`${API_BASE_URL}/citizens/${citizenId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Falha ao carregar cadastro");
  }

  return response.json();
}

export async function updateCitizen(token: string, citizenId: string, payload: CitizenRecord): Promise<CitizenRecord> {
  const response = await fetch(`${API_BASE_URL}/citizens/${citizenId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => null);
    throw new Error(data?.detail ?? "Falha ao atualizar cadastro");
  }

  return response.json();
}

export async function deleteCitizen(token: string, citizenId: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/citizens/${citizenId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const data = await response.json().catch(() => null);
    throw new Error(data?.detail ?? "Falha ao excluir cadastro");
  }
}
