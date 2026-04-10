"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { AppShell } from "../../../components/app-shell";
import { getExecutiveDashboard } from "../../../lib/api";
import type { ExecutiveDashboard } from "../../../lib/types";

export default function PolosPage() {
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
          <p className="admin-topbar__eyebrow">Polos</p>
          <h1>Cadastro e leitura territorial</h1>
          <p className="admin-topbar__lead">
            Visualize os polos ativos, acompanhe a distribuicao da base e abra o modulo territorial da operacao.
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
              <p className="panel__eyebrow">Polos ativos</p>
              <h3>Distribuicao atual</h3>
            </div>
            <span className="panel__pill">{data?.active_poles ?? 0} ativos</span>
          </div>

          <div className="stack-list">
            {(data?.by_pole ?? []).map((item) => (
              <div key={item.name} className="stack-row">
                <div>
                  <strong>{item.name}</strong>
                  <span>{item.total} cadastros vinculados</span>
                </div>
                <em>{item.total}</em>
              </div>
            ))}
          </div>
        </article>

        <article className="panel">
          <div className="panel__header">
            <div>
              <p className="panel__eyebrow">Gestao</p>
              <h3>Proximos passos do modulo</h3>
            </div>
          </div>

          <div className="timeline">
            <div className="timeline__item">
              <span>Polo Central</span>
              <strong>Empresas, parceiros, apoiadores e equipe administrativa</strong>
              <small>Vinculacao institucional</small>
            </div>
            <div className="timeline__item">
              <span>Polos de acao</span>
              <strong>Beneficiarios, atividades, triagem e acompanhamento</strong>
              <small>Operacao territorial</small>
            </div>
            <div className="timeline__item">
              <span>Proxima evolucao</span>
              <strong>Cadastro completo de polos com responsavel, endereco e cobertura</strong>
              <small>Em preparacao</small>
            </div>
          </div>
        </article>
      </section>
    </AppShell>
  );
}
