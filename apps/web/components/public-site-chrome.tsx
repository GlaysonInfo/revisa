import Link from "next/link";
import { ReactNode } from "react";

import { BrandLockup } from "./brand-lockup";

export function PublicSiteChrome({ children }: { children: ReactNode }) {
  return (
    <main className="app-shell">
      <div className="app-shell__inner public-home">
        <header className="public-header">
          <BrandLockup />
          <div className="public-header__right">
            <nav className="public-nav" aria-label="Navegacao principal">
              <Link href="/#inicio" className="nav-link">
                Inicio
              </Link>
              <Link href="/#a-revisa" className="nav-link">
                A REVISA
              </Link>
              <Link href="/#atuacao" className="nav-link">
                Atuacao
              </Link>
              <Link href="/#servicos" className="nav-link">
                Servicos
              </Link>
              <Link href="/#galeria" className="nav-link">
                Galeria
              </Link>
              <Link href="/participar" className="nav-link">
                Participar
              </Link>
              <Link href="/contato" className="nav-link">
                Contato
              </Link>
            </nav>
            <div className="public-header__actions">
              <Link href="/participar" className="primary-button">
                Participar
              </Link>
              <Link href="/login" className="secondary-button">
                Acesso Restrito
              </Link>
            </div>
          </div>
        </header>

        {children}

        <footer className="public-footer">
          <div className="public-footer__brand">
            <BrandLockup compact />
          </div>
          <div className="public-footer__meta">
            <p>REDE DE PROTECAO A VIDA E A SAUDE - REVISA</p>
            <p>CNPJ 14.452.770/0001-80</p>
            <p>Rua Urucuia, nº 352, Brasilia, Betim/MG</p>
          </div>
          <div className="public-footer__links">
            <Link href="/#inicio">Inicio</Link>
            <Link href="/contato">Contato</Link>
            <Link href="/login">Acesso restrito</Link>
          </div>
        </footer>

        <Link
          href="https://wa.me/5531999751882"
          className="whatsapp-float"
          aria-label="Falar com a REVISA no WhatsApp"
        >
          WhatsApp
        </Link>
      </div>
    </main>
  );
}
