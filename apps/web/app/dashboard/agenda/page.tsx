"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { AppShell } from "../../../components/app-shell";
import { getExecutiveDashboard } from "../../../lib/api";
import type { ExecutiveDashboard } from "../../../lib/types";

export default function AgendaPage() {
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
          <p className="admin-topbar__eyebrow">Agenda</p>
          <h1>Atividades previstas para os proximos 7 dias</h1>
          <p className="admin-topbar__lead">
            Agenda recente da operacao com foco em mutiroes, encontros, oficinas e atividades territoriais.
          </p>
        </div>
        <div className="admin-topbar__controls">
          <Link href="/dashboard" className="ghost-button">
            Voltar ao painel
          </Link>
        </div>
      </section>

      {error ? <p className="admin-error">{error}</p> : null}

      <section className="panel">
        <div className="panel__header">
          <div>
            <p className="panel__eyebrow">Agenda operacional</p>
            <h3>Programacao imediata</h3>
          </div>
          <span className="panel__pill">{data?.activities_next_7d ?? 0} atividades</span>
        </div>

        <div className="timeline">
          {(data?.activities_schedule ?? []).map((item) => (
            <div key={`${item.when}-${item.title}`} className="timeline__item">
              <span>{item.when}</span>
              <strong>{item.title}</strong>
              <small>{item.place}</small>
            </div>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
