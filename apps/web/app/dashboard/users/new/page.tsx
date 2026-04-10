"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

import { AppShell } from "../../../../components/app-shell";

const accessProfiles = [
  "Administrador",
  "Beneficiario",
  "Empresa parceira",
  "Colaborador de campo",
  "Colaborador administrativo",
  "Coordenador de polo",
  "Lideranca local",
  "Vereador",
  "Apoiador",
];

const politicalProfiles = [
  "Administrativo",
  "Articulacao politica",
  "Base territorial",
  "Beneficiario do projeto",
  "Parceria institucional",
  "Lideranca comunitaria",
];

export default function NewUserPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <AppShell>
      <section className="admin-topbar">
        <div>
          <p className="admin-topbar__eyebrow">Cadastros</p>
          <h1>Novo usuario</h1>
          <p className="admin-topbar__lead">
            Cadastre administradores, beneficiarios, empresas parceiras, colaboradores, liderancas e outros perfis da
            operacao REVISA.
          </p>
        </div>
        <div className="admin-topbar__controls">
          <Link href="/dashboard" className="secondary-button">
            Voltar ao painel
          </Link>
        </div>
      </section>

      <section className="admin-section">
        <div className="admin-grid admin-grid--main">
          <form className="panel admin-form" onSubmit={handleSubmit}>
            <div className="panel__header">
              <div>
                <p className="panel__eyebrow">Cadastro administrativo</p>
                <h3>Dados principais</h3>
              </div>
              <span className="panel__pill">novo registro</span>
            </div>

            <div className="form-grid">
              <label>
                Nome completo
                <input type="text" placeholder="Nome da pessoa" required />
              </label>
              <label>
                Email
                <input type="email" placeholder="email@revisa.org.br" />
              </label>
              <label>
                Telefone
                <input type="text" placeholder="(31) 99999-9999" required />
              </label>
              <label>
                Bairro
                <input type="text" placeholder="Bairro de referencia" />
              </label>
              <label>
                Polo
                <input type="text" placeholder="Polo vinculado" />
              </label>
              <label>
                Tipo de cadastro
                <select defaultValue="Colaborador de campo">
                  {accessProfiles.map((profile) => (
                    <option key={profile}>{profile}</option>
                  ))}
                </select>
              </label>
              <label>
                Perfil politico
                <select defaultValue="Base territorial">
                  {politicalProfiles.map((profile) => (
                    <option key={profile}>{profile}</option>
                  ))}
                </select>
              </label>
              <label>
                Nivel de acesso
                <select defaultValue="Operacional">
                  <option>Operacional</option>
                  <option>Leitura</option>
                  <option>Gestao</option>
                  <option>Administracao total</option>
                </select>
              </label>
              <label className="form-grid__full">
                Observacoes
                <textarea rows={5} placeholder="Informacoes complementares, area de atuacao, indicacao politica ou observacoes internas." />
              </label>
            </div>

            <div className="form-actions">
              <button type="submit" className="primary-button">
                Salvar usuario
              </button>
            </div>

            {submitted ? (
              <p className="form-success">
                Cadastro administrativo registrado. O proximo passo pode ser integrar este formulario ao backend real.
              </p>
            ) : null}
          </form>

          <aside className="panel admin-side-panel">
            <div className="panel__header">
              <div>
                <p className="panel__eyebrow">Orientacoes</p>
                <h3>Como usar este cadastro</h3>
              </div>
            </div>

            <div className="bullet-stack">
              <div className="bullet-item">
                <span className="bullet-dot" />
                <p>Use este fluxo para qualquer pessoa vinculada a operacao, inclusive perfis politicos e parceiros.</p>
              </div>
              <div className="bullet-item">
                <span className="bullet-dot" />
                <p>O campo de perfil politico ajuda a separar base territorial, liderancas, articulacao e parceria.</p>
              </div>
              <div className="bullet-item">
                <span className="bullet-dot" />
                <p>O nivel de acesso prepara a regra futura de permissoes no backend.</p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </AppShell>
  );
}
