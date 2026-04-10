export type AccessRole = "administrator" | "collaborator" | "viewer";

export function inferAccessRole(email: string): AccessRole {
  const normalized = email.trim().toLowerCase();

  if (!normalized) {
    return "viewer";
  }

  if (normalized.includes("admin")) {
    return "administrator";
  }

  if (
    normalized.includes("campo") ||
    normalized.includes("colaborador") ||
    normalized.includes("coorden") ||
    normalized.includes("gabinete")
  ) {
    return "collaborator";
  }

  return "collaborator";
}

export function canEditCitizen(role: AccessRole): boolean {
  return role === "administrator" || role === "collaborator";
}

export function canDeleteCitizen(role: AccessRole): boolean {
  return role === "administrator";
}
