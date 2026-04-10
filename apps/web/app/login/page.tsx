"use client";

import Link from "next/link";
import { useState } from "react";

import { BrandLockup } from "../../components/brand-lockup";
import { PublicSiteChrome } from "../../components/public-site-chrome";
import { inferAccessRole } from "../../lib/permissions";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000/api/v1";

export default function LoginPage() {
  const [email, setEmail] = useState("admin@revisa.local");
  const [password, setPassword] = useState("Admin@12345");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("revisa_token", data.access_token);
        localStorage.setItem("revisa_user_email", email);
        localStorage.setItem("revisa_access_role", inferAccessRole(email));
        setMessage("Login realizado com sucesso.");
        window.location.href = "/dashboard";
        return;
      }

      setMessage(data.detail ?? "Falha no login");
    } catch {
      setMessage("Nao foi possivel conectar com a API em http://localhost:8000. Verifique se o backend esta rodando.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <PublicSiteChrome>
      <div className="login-page">
        <div className="login-page__card">
          <div className="login-page__hero">
            <BrandLockup compact />
            <div className="login-page__intro">
              <p className="public-eyebrow">Acesso Restrito</p>
              <h1>Entrar na operacao REVISA</h1>
              <p>
                Ambiente para colaboradores de campo, administradores, coordenadores de polo, gabinete e equipe
                administrativa.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="public-form">
            <div className="form-grid">
              <label>
                Email
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  autoComplete="username"
                />
              </label>
              <label>
                Senha
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Senha"
                  autoComplete="current-password"
                />
              </label>
            </div>
            <div className="form-actions">
              <button type="submit" className="primary-button" disabled={isSubmitting}>
                {isSubmitting ? "Entrando..." : "Entrar"}
              </button>
            </div>
            {message ? <p className="form-success">{message}</p> : null}
          </form>

          <div className="login-page__links">
            <Link href="/contato" className="back-link">
              Fale Conosco
            </Link>
            <Link href="/participar" className="nav-link">
              Quero participar da REVISA
            </Link>
          </div>
        </div>
      </div>
    </PublicSiteChrome>
  );
}
