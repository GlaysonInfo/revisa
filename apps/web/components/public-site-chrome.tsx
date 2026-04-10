import Link from "next/link";
import { ReactNode } from "react";

import { BrandLockup } from "./brand-lockup";
import { PublicHeader } from "./public-header";

export function PublicSiteChrome({ children }: { children: ReactNode }) {
  return (
    <main className="app-shell">
      <div className="app-shell__inner public-home">
        <PublicHeader rootAnchors />

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
          href="https://wa.me/5531982673012"
          className="whatsapp-float"
          aria-label="Falar com a REVISA no WhatsApp"
        >
          WhatsApp
        </Link>
      </div>
    </main>
  );
}
