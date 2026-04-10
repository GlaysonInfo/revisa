"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { AppShell } from "../../../../components/app-shell";
import { getCitizen, updateCitizen } from "../../../../lib/api";
import { canEditCitizen, type AccessRole } from "../../../../lib/permissions";
import type { CitizenRecord } from "../../../../lib/types";

const emptyForm: CitizenRecord = {
  full_name: "",
  phone: "",
  email: "",
  neighborhood: "",
  pole_name: "",
  address: "",
  reference_point: "",
  notes: "",
  collaborator_name: "",
  registered_in_field: true,
  consent_given: false,
};

export default function EditCitizenPage({ params }: { params: { citizenId: string } }) {
  const [form, setForm] = useState<CitizenRecord>(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [token, setToken] = useState("");
  const [role, setRole] = useState<AccessRole>("viewer");

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

    if (!canEditCitizen(storedRole)) {
      setMessage("Seu perfil nao possui permissao para editar cadastros.");
      setLoading(false);
      return;
    }

    void loadCitizen(storedToken);
  }, [params.citizenId]);

  async function loadCitizen(currentToken: string) {
    setLoading(true);
    setMessage("");

    try {
      const data = await getCitizen(currentToken, params.citizenId);
      setForm(data);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Falha ao carregar cadastro");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!token || !canEditCitizen(role)) return;

    setSaving(true);
    setMessage("");

    try {
      const updated = await updateCitizen(token, params.citizenId, form);
      setForm(updated);
      setMessage("Cadastro atualizado com sucesso.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Falha ao atualizar cadastro");
    } finally {
      setSaving(false);
    }
  }

  function updateField<K extends keyof CitizenRecord>(field: K, value: CitizenRecord[K]) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  return (
    <AppShell>
      <section className="admin-topbar admin-topbar--compact">
        <div>
          <p className="admin-topbar__eyebrow">Cadastros</p>
          <h1>Editar cadastro</h1>
          <p className="admin-topbar__lead">Atualize dados de contato, polo, bairro e observacoes do beneficiario.</p>
        </div>
        <div className="admin-topbar__controls">
          <Link href="/dashboard/cadastros" className="ghost-button">
            Voltar para consulta
          </Link>
        </div>
      </section>

      <section className="panel cadastros-form-panel">
        {loading ? (
          <p>Carregando cadastro...</p>
        ) : !canEditCitizen(role) ? (
          <p className="admin-error">{message || "Acesso restrito."}</p>
        ) : (
          <form className="public-form cadastros-form" onSubmit={handleSubmit}>
            <div className="form-grid">
              <label>
                Nome completo
                <input value={form.full_name} onChange={(event) => updateField("full_name", event.target.value)} required />
              </label>

              <label>
                Telefone
                <input value={form.phone} onChange={(event) => updateField("phone", event.target.value)} />
              </label>

              <label>
                Email
                <input value={form.email} onChange={(event) => updateField("email", event.target.value)} />
              </label>

              <label>
                Bairro
                <input value={form.neighborhood} onChange={(event) => updateField("neighborhood", event.target.value)} />
              </label>

              <label>
                Polo
                <input value={form.pole_name} onChange={(event) => updateField("pole_name", event.target.value)} />
              </label>

              <label>
                Ponto de referencia
                <input
                  value={form.reference_point}
                  onChange={(event) => updateField("reference_point", event.target.value)}
                />
              </label>
            </div>

            <label>
              Endereco
              <input value={form.address} onChange={(event) => updateField("address", event.target.value)} />
            </label>

            <label>
              Observacoes
              <textarea value={form.notes} onChange={(event) => updateField("notes", event.target.value)} rows={5} />
            </label>

            <label className="checkbox-field">
              <input
                type="checkbox"
                checked={form.consent_given}
                onChange={(event) => updateField("consent_given", event.target.checked)}
              />
              Consentimento registrado
            </label>

            <div className="form-actions">
              <button type="submit" className="primary-button" disabled={saving}>
                {saving ? "Salvando..." : "Salvar alteracoes"}
              </button>
              <Link href="/dashboard/cadastros" className="ghost-button">
                Cancelar
              </Link>
            </div>

            {message ? <p className="form-success">{message}</p> : null}
          </form>
        )}
      </section>
    </AppShell>
  );
}
