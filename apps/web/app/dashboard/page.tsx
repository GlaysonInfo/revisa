"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { AppShell } from "../../components/app-shell";
import { StatCard } from "../../components/stat-card";
import { quickActions } from "../../lib/admin";
import type { ExecutiveDashboard } from "../../lib/types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000/api/v1";

export default function DashboardPage() {
  const [data, setData] = useState<ExecutiveDashboard | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("revisa_token");
    if (!token) {
      setError("Usuario nao autenticado.");
      return;
    }

    fetch(`${API_BASE_URL}/dashboards/executive`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Falha ao carregar dashboard");
        }
        return response.json();
      })
      .then(setData)
      .catch((err: Error) => setError(err.message));
  }, []);

  function handleLogout() {
    localStorage.removeItem("revisa_token");
    window.location.href = "/login";
  }

  const territoryRanking = data?.by_neighborhood ?? [];
  const collaboratorRanking = data?.by_collaborator ?? [];
  const poleRanking = data?.by_pole ?? [];
  const governanceItems = data?.governance_items ?? [];
  const criticalDemands = data?.critical_demands ?? [];
  const openTasks = data?.open_tasks_list ?? [];
  const priorities = data?.priorities ?? [];
  const agendaHighlights = data?.activities_schedule ?? [];

  return (
    <AppShell>
      <section className="admin-topbar">
        <div>
          <p className="admin-topbar__eyebrow">Painel administrativo</p>
          <h1>Visao geral da operacao REVISA</h1>
          <p className="admin-topbar__lead">
            Acompanhe base cadastrada, polos ativos, demandas, agenda e desempenho da equipe em um unico ambiente.
          </p>
        </div>
        <div className="admin-topbar__controls">
          <div className="admin-hero__status">
            <span className="admin-dot" />
            Sistema online
          </div>
          <button className="ghost-button" onClick={handleLogout}>
            Encerrar sessao
          </button>
        </div>
      </section>

      {error ? <p className="admin-error">{error}</p> : null}

      {data ? (
        <>
          <section className="admin-section">
            <div className="admin-section__header">
              <div>
                <p className="admin-section__eyebrow">Resumo operacional</p>
                <h2>Indicadores principais</h2>
              </div>
              <p className="admin-section__meta">Atualizacao em tempo real do ambiente local</p>
            </div>

            <div className="admin-stats">
              <StatCard
                title="Cadastros totais"
                value={data.total_citizens}
                tone="accent"
                hint="base consolidada"
                href="/dashboard/cadastros"
              />
              <StatCard
                title="Polos ativos"
                value={data.active_poles}
                hint="unidades com atividade registrada"
                href="/dashboard/polos"
              />
              <StatCard
                title="Demandas abertas"
                value={data.open_demands}
                tone="warning"
                hint="pendencias em analise"
                href="/dashboard/demandas"
              />
              <StatCard
                title="Tarefas abertas"
                value={data.open_tasks}
                hint="rotina em acompanhamento"
                href="/dashboard/tarefas"
              />
              <StatCard
                title="Atividades em 7 dias"
                value={data.activities_next_7d}
                hint="agenda recente da operacao"
                href="/dashboard/agenda"
              />
            </div>
          </section>

          <section className="admin-grid admin-grid--main">
            <article className="panel panel--spotlight">
              <div className="panel__header">
                <div>
                  <p className="panel__eyebrow">Territorio</p>
                  <h3>Bairros com mais cadastros</h3>
                </div>
                <span className="panel__pill">base territorial</span>
              </div>
              <div className="stack-list">
                {territoryRanking.map((item) => (
                  <div key={item.name} className="stack-row">
                    <div>
                      <strong>{item.name}</strong>
                      <span>{item.total} cadastros registrados</span>
                    </div>
                    <em>{item.total}</em>
                  </div>
                ))}
              </div>
            </article>

            <article className="panel">
              <div className="panel__header">
                <div>
                  <p className="panel__eyebrow">Equipe</p>
                  <h3>Equipe com mais registros</h3>
                </div>
                <span className="panel__pill">producao recente</span>
              </div>
              <div className="stack-list">
                {collaboratorRanking.map((item) => (
                  <div key={item.name} className="stack-row">
                    <div>
                      <strong>{item.name}</strong>
                      <span>{item.total} registros no periodo</span>
                    </div>
                    <em>{item.total}</em>
                  </div>
                ))}
              </div>
            </article>

            <article className="panel">
              <div className="panel__header">
                <div>
                  <p className="panel__eyebrow">Demandas</p>
                  <h3>Itens com prioridade</h3>
                </div>
                <span className="panel__pill panel__pill--danger">acompanhamento</span>
              </div>
              <div className="chip-list">
                {criticalDemands.map((item) => (
                  <div key={`${item.title}-${item.neighborhood}`} className="chip-card">
                    <strong>{item.title}</strong>
                    <span>{item.neighborhood}</span>
                    <small>{item.status}</small>
                  </div>
                ))}
              </div>
            </article>

            <article className="panel panel--map">
              <div className="panel__header">
                <div>
                  <p className="panel__eyebrow">Polos</p>
                  <h3>Distribuicao territorial</h3>
                </div>
                <span className="panel__pill">leitura sintetica</span>
              </div>
              <div className="mini-map">
                {poleRanking.slice(0, 4).map((item, index) => (
                  <div
                    key={item.name}
                    className={`mini-map__point mini-map__point--${["one", "two", "three", "four"][index]}`}
                  >
                    {item.name}
                  </div>
                ))}
              </div>
            </article>
          </section>

          <section className="admin-grid admin-grid--secondary">
            <article className="panel">
              <div className="panel__header">
                <div>
                  <p className="panel__eyebrow">Governanca</p>
                  <h3>Indicadores administrativos</h3>
                </div>
              </div>
              <div className="governance-list">
                {governanceItems.map((item) => (
                  <div key={item.label} className="governance-item">
                    <div>
                      <strong>{item.label}</strong>
                      <span>{item.note}</span>
                    </div>
                    <em>{item.value}</em>
                  </div>
                ))}
              </div>
            </article>

            <article className="panel">
              <div className="panel__header">
                <div>
                  <p className="panel__eyebrow">Prioridades</p>
                  <h3>Lista de atencao imediata</h3>
                </div>
              </div>
              <div className="timeline">
                {priorities.map((item) => (
                  <div key={`${item.title}-${item.note}`} className="timeline__item">
                    <span>{item.note}</span>
                    <strong>{item.title}</strong>
                    <small>Prioridade operacional</small>
                  </div>
                ))}
              </div>
            </article>

            <article className="panel">
              <div className="panel__header">
                <div>
                  <p className="panel__eyebrow">Atalhos</p>
                  <h3>Acoes frequentes</h3>
                </div>
              </div>
              <div className="action-grid">
                {quickActions.map((action) => (
                  <Link key={action.label} href={action.href} className="action-card">
                    {action.label}
                  </Link>
                ))}
              </div>
            </article>

            <article className="panel">
              <div className="panel__header">
                <div>
                  <p className="panel__eyebrow">Tarefas</p>
                  <h3>Acompanhamento da equipe</h3>
                </div>
              </div>
              <div className="stack-list">
                {openTasks.map((item) => (
                  <div key={`${item.title}-${item.assigned_to}`} className="stack-row">
                    <div>
                      <strong>{item.title}</strong>
                      <span>{item.assigned_to}</span>
                    </div>
                    <em>{item.status}</em>
                  </div>
                ))}
              </div>
            </article>

            <article className="panel">
              <div className="panel__header">
                <div>
                  <p className="panel__eyebrow">Agenda</p>
                  <h3>Proximas atividades</h3>
                </div>
              </div>
              <div className="timeline">
                {agendaHighlights.map((item) => (
                  <div key={`${item.when}-${item.title}`} className="timeline__item">
                    <span>{item.when}</span>
                    <strong>{item.title}</strong>
                    <small>{item.place}</small>
                  </div>
                ))}
              </div>
            </article>
          </section>
        </>
      ) : (
        <div className="panel">
          <h3>Carregando painel administrativo...</h3>
        </div>
      )}
    </AppShell>
  );
}
