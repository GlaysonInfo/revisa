"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

import { PublicSiteChrome } from "../../components/public-site-chrome";

const categories = [
  "1 | Contato",
  "2 | Participante",
  "3 | Apoiador",
  "4 | Lideranca",
  "5 | Empresa Parceira",
];

export default function ParticipatePage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <PublicSiteChrome>
      <div className="inner-page">
        <header className="inner-page__header inner-page__hero">
          <p className="public-eyebrow">Participar da REVISA</p>
          <h1>Entrada para novos contatos, apoiadores, liderancas e parceiros.</h1>
          <p>
            O pre-cadastro organiza o primeiro contato e prepara a classificacao institucional de participantes,
            apoiadores, liderancas locais e empresas parceiras.
          </p>
          <div className="public-hero__cta">
            <Link href="/contato" className="secondary-button">
              Tirar duvidas
            </Link>
            <Link href="/login" className="primary-button">
              Acesso Restrito
            </Link>
          </div>
        </header>

        <section className="public-section public-section--two-col">
          <article className="public-panel">
            <div className="section-heading">
              <p className="public-eyebrow">Acesso rapido</p>
              <h2>Entrada por Google ou inscricao simples.</h2>
              <p>
                A autenticacao com Google pode ser conectada na proxima etapa. Por enquanto, a experiencia ja reserva
                esse espaco com clareza para o cliente visualizar o clique certo no lugar certo.
              </p>
            </div>
            <div className="public-action-list">
              <button type="button" className="action-tile action-tile--static">
                <strong>Continuar com Google</strong>
                <span>Fluxo visual reservado para autenticacao social e cadastro assistido.</span>
              </button>
            </div>
            <div className="tag-cloud" aria-label="Classificacoes iniciais do cadastro">
              {categories.map((category) => (
                <span key={category} className="tag-pill">
                  {category}
                </span>
              ))}
            </div>
          </article>

          <form className="public-form" onSubmit={handleSubmit}>
            <h2>Inscricao simples</h2>
            <div className="form-grid">
              <label>
                Nome
                <input type="text" placeholder="Seu nome completo" required />
              </label>
              <label>
                Email
                <input type="email" placeholder="voce@exemplo.com" required />
              </label>
              <label>
                Telefone
                <input type="text" placeholder="(31) 99999-9999" />
              </label>
              <label>
                Perfil de entrada
                <select defaultValue="2 | Participante">
                  {categories.map((category) => (
                    <option key={category}>{category}</option>
                  ))}
                </select>
              </label>
              <label className="form-grid__full">
                Como deseja contribuir
                <textarea
                  rows={5}
                  placeholder="Conte se deseja trabalhar conosco, apoiar uma frente local, doar, articular parceiros ou atuar como lideranca."
                />
              </label>
            </div>
            <div className="form-actions">
              <button type="submit" className="primary-button">
                Registrar interesse
              </button>
            </div>
            {submitted ? (
              <p className="form-success">
                Interesse registrado. Na proxima etapa, este fluxo pode alimentar diretamente o cadastro institucional
                da REVISA.
              </p>
            ) : null}
          </form>
        </section>
      </div>
    </PublicSiteChrome>
  );
}
