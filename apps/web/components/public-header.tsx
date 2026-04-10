"use client";

import Link from "next/link";
import { useState } from "react";

import { BrandLockup } from "./brand-lockup";

type PublicHeaderProps = {
  rootAnchors?: boolean;
};

const whatsappNumber = "5531982673012";

export function PublicHeader({ rootAnchors = false }: PublicHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const sectionPrefix = rootAnchors ? "/#" : "#";
  const navLinks = [
    { href: `${sectionPrefix}inicio`, label: "Inicio" },
    { href: `${sectionPrefix}a-revisa`, label: "A REVISA" },
    { href: `${sectionPrefix}atuacao`, label: "Atuacao" },
    { href: `${sectionPrefix}servicos`, label: "Servicos" },
    { href: `${sectionPrefix}galeria`, label: "Galeria" },
    { href: "/participar", label: "Participar" },
    { href: rootAnchors ? "/contato" : `${sectionPrefix}contato`, label: "Contato" },
  ];

  function handleCloseMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="public-header">
      <BrandLockup />
      <button
        type="button"
        className="public-header__menu-toggle"
        aria-expanded={menuOpen}
        aria-controls="public-navigation"
        aria-label={menuOpen ? "Fechar navegacao" : "Abrir navegacao"}
        onClick={() => setMenuOpen((current) => !current)}
      >
        <span />
        <span />
        <span />
      </button>
      <div className={`public-header__right${menuOpen ? " public-header__right--open" : ""}`}>
        <nav id="public-navigation" className="public-nav" aria-label="Navegacao principal">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="nav-link" onClick={handleCloseMenu}>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="public-header__actions">
          <Link href="/participar" className="primary-button" onClick={handleCloseMenu}>
            Participar
          </Link>
          <Link href="/login" className="secondary-button" onClick={handleCloseMenu}>
            Acesso Restrito
          </Link>
        </div>
      </div>
      <Link
        href={`https://wa.me/${whatsappNumber}`}
        className="whatsapp-float"
        aria-label="Falar com a REVISA no WhatsApp"
      >
        WhatsApp
      </Link>
    </header>
  );
}
