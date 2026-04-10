"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { AppShell } from "../../../components/app-shell";
import { getExecutiveDashboard } from "../../../lib/api";
import type { ExecutiveDashboard } from "../../../lib/types";

export default function DemandasPage() {
  const [data, setData] = useState<ExecutiveDashboard | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("revisa_token");
    if (!token) {
      setError("Usuario nao autenticado.");
      return;
    }

    getExecutiveDashboard(token).then(setData).catch((err: Error) => setError(err.message));
  }, []);

  return (
    <AppShell>
      <section className="admin-topbar admin-topbar--compact">
        <div>
          <p className="admin-topbar__eyebrow">Demandas</p>
          <h1>Acompanhamento de demandas abertas</h1>
          <p className="admin-topbar__lead">
            Veja as ocorrencias com prioridade, acompanhe triagem e organize o retorno da equipe.
          </p>
        </div>
        <div className="admin-topbar__controls">
          <Link href="/dashboard" className="ghost-button">
            Voltar ao painel
          </Link>
        </div>
      </section>

      {error ? <p className="admin-error">{error}</p> : null}

      <section className="admin-grid admin-grid--secondary">
        <article className="panel">
          <div className="panel__header">
            <div>
              <p className="panel__eyebrow">Itens criticos</p>
              <h3>Demandas priorizadas</h3>
            </div>
            <span className="panel__pill panel__pill--danger">{data?.open_demands ?? 0} abertas</span>
          </div>

          <div className="chip-list">
            {(data?.critical_demands ?? []).map((item) => (
              <div key={`${item.title}-${item.neighborhood}`} className="chip-card">
                <strong>{item.title}</strong>
                <span>{item.neighborhood}</span>
                <small>{item.status}</small>
              </div>
            ))}
          </div>
        </article>

        <article className="panel">
          <div className="panel__header">
            <div>
              <p className="panel__eyebrow">Lista imediata</p>
              <h3>Prioridades operacionais</h3>
            </div>
          </div>

          <div className="timeline">
            {(data?.priorities ?? []).map((item) => (
              <div key={`${item.title}-${item.note}`} className="timeline__item">
                <span>{item.note}</span>
                <strong>{item.title}</strong>
                <small>Atencao imediata</small>
              </div>
            ))}
          </div>
        </article>
      </section>
    </AppShell>
  );
}
