"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { AppShell } from "../../../components/app-shell";
import { getExecutiveDashboard } from "../../../lib/api";
import type { ExecutiveDashboard } from "../../../lib/types";

export default function TarefasPage() {
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
          <p className="admin-topbar__eyebrow">Tarefas</p>
          <h1>Acompanhamento da equipe</h1>
          <p className="admin-topbar__lead">
            Consulte as tarefas em aberto e acompanhe a execucao da rotina administrativa e territorial.
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
            <p className="panel__eyebrow">Rotina ativa</p>
            <h3>Tarefas em andamento</h3>
          </div>
          <span className="panel__pill">{data?.open_tasks ?? 0} abertas</span>
        </div>

        <div className="stack-list">
          {(data?.open_tasks_list ?? []).map((item) => (
            <div key={`${item.title}-${item.assigned_to}`} className="stack-row">
              <div>
                <strong>{item.title}</strong>
                <span>{item.assigned_to}</span>
              </div>
              <em>{item.status}</em>
            </div>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
