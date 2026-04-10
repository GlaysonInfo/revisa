"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { AppShell } from "../../../components/app-shell";
import { deleteCitizen, listCitizens } from "../../../lib/api";
import { canDeleteCitizen, canEditCitizen, type AccessRole } from "../../../lib/permissions";
import type { CitizenListItem } from "../../../lib/types";

function EditIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 17.25V20h2.75L17.8 8.94l-2.75-2.75L4 17.25Zm14.71-9.04a1.003 1.003 0 0 0 0-1.42l-1.5-1.5a1.003 1.003 0 0 0-1.42 0l-1.17 1.17 2.75 2.75 1.34-1Z" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 3h6l1 2h4v2H4V5h4l1-2Zm1 6h2v8h-2V9Zm4 0h2v8h-2V9ZM7 9h2v8H7V9Zm-1 12a2 2 0 0 1-2-2V8h16v11a2 2 0 0 1-2 2H6Z" />
    </svg>
  );
}

export default function CadastrosPage() {
  const [items, setItems] = useState<CitizenListItem[]>([]);
  const [query, setQuery] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [role, setRole] = useState<AccessRole>("viewer");
  const [token, setToken] = useState("");

  const neighborhoods = useMemo(
    () => [...new Set(items.map((item) => item.neighborhood).filter(Boolean))].sort((a, b) => a.localeCompare(b)),
    [items],
  );

  useEffect(() => {
    const storedToken = localStorage.getItem("revisa_token") ?? "";
    const storedRole = (localStorage.getItem("revisa_access_role") as AccessRole | null) ?? "viewer";

    setToken(storedToken);
    setRole(storedRole);

    if (!storedToken) {
      setMessage("Usuario nao autenticado.");
      setLoading(false);
      return;
    }

    loadCitizens(storedToken);
  }, []);

  async function loadCitizens(currentToken: string, params?: { query?: string; neighborhood?: string }) {
    setLoading(true);
    setMessage("");

    try {
      const response = await listCitizens(currentToken, params);
      setItems(response.items);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Falha ao carregar cadastros");
    } finally {
      setLoading(false);
    }
  }

  async function handleSearch(event: React.FormEvent) {
    event.preventDefault();
    if (!token) return;
    await loadCitizens(token, { query, neighborhood });
  }

  async function handleDelete(citizen: CitizenListItem) {
    if (!token || !canDeleteCitizen(role)) return;

    const confirmed = window.confirm(`Excluir o cadastro de ${citizen.full_name}? Esta acao nao pode ser desfeita.`);
    if (!confirmed) return;

    try {
      await deleteCitizen(token, citizen.id);
      setItems((current) => current.filter((item) => item.id !== citizen.id));
      setMessage(`Cadastro de ${citizen.full_name} excluido com sucesso.`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Falha ao excluir cadastro");
    }
  }

  return (
    <AppShell>
      <section className="admin-topbar admin-topbar--compact">
        <div>
          <p className="admin-topbar__eyebrow">Cadastros</p>
          <h1>Consulta de beneficiarios</h1>
          <p className="admin-topbar__lead">
            Busque, filtre e acompanhe a base cadastrada. Edicao para administradores e colaboradores. Exclusao
            reservada a administradores.
          </p>
        </div>
        <div className="admin-topbar__controls">
          <Link href="/dashboard/users/new" className="primary-button">
            Novo usuario
          </Link>
        </div>
      </section>

      <section className="panel cadastros-panel">
        <div className="panel__header panel__header--form">
          <div>
            <p className="panel__eyebrow">Base cadastral</p>
            <h3>Consulta e manutencao</h3>
          </div>
          <span className="panel__pill">{items.length} registros</span>
        </div>

        <form className="cadastros-filters" onSubmit={handleSearch}>
          <label>
            Buscar por nome
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Digite o nome" />
          </label>

          <label>
            Bairro
            <select value={neighborhood} onChange={(event) => setNeighborhood(event.target.value)}>
              <option value="">Todos os bairros</option>
              {neighborhoods.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>

          <div className="cadastros-filters__actions">
            <button type="submit" className="primary-button">
              Filtrar
            </button>
            <button
              type="button"
              className="ghost-button"
              onClick={() => {
                setQuery("");
                setNeighborhood("");
                if (token) {
                  void loadCitizens(token);
                }
              }}
            >
              Limpar
            </button>
          </div>
        </form>

        {message ? <p className="form-success">{message}</p> : null}

        <div className="cadastros-table-wrap">
          <table className="cadastros-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Telefone</th>
                <th>Bairro</th>
                <th>Polo</th>
                <th>Colaborador</th>
                <th>Acoes</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="cadastros-table__empty">
                    Carregando cadastros...
                  </td>
                </tr>
              ) : items.length ? (
                items.map((citizen) => (
                  <tr key={citizen.id}>
                    <td>{citizen.full_name}</td>
                    <td>{citizen.phone || "Nao informado"}</td>
                    <td>{citizen.neighborhood || "Nao informado"}</td>
                    <td>{citizen.pole_name || "Nao informado"}</td>
                    <td>{citizen.collaborator_name || "Equipe REVISA"}</td>
                    <td>
                      <div className="row-actions">
                        {canEditCitizen(role) ? (
                          <Link href={`/dashboard/cadastros/${citizen.id}`} className="icon-action" title="Editar cadastro">
                            <EditIcon />
                            <span>Editar</span>
                          </Link>
                        ) : null}

                        {canDeleteCitizen(role) ? (
                          <button
                            type="button"
                            className="icon-action icon-action--danger"
                            title="Excluir cadastro"
                            onClick={() => void handleDelete(citizen)}
                          >
                            <TrashIcon />
                            <span>Excluir</span>
                          </button>
                        ) : null}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="cadastros-table__empty">
                    Nenhum cadastro encontrado para os filtros informados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </AppShell>
  );
}
