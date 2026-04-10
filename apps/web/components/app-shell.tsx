"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

import { BrandLockup } from "./brand-lockup";

const navigation = [
  { label: "Painel", href: "/dashboard" },
  { label: "Cadastros", href: "/dashboard/cadastros" },
  { label: "Polos", href: "/dashboard/polos" },
  { label: "Equipe", href: "#" },
  { label: "Demandas", href: "/dashboard/demandas" },
  { label: "Relatorios", href: "#" },
  { label: "Configuracoes", href: "#" },
];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <main className="app-shell">
      <div className="app-shell__inner admin-layout">
        <aside className="admin-sidebar">
          <div className="admin-sidebar__brand">
            <BrandLockup compact />
          </div>

          <nav className="admin-sidebar__nav" aria-label="Navegacao administrativa">
            {navigation.map((item) => {
              const isActive =
                item.href !== "#" &&
                (item.href === "/dashboard" ? pathname === item.href : pathname.startsWith(item.href));

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`admin-sidebar__link${isActive ? " admin-sidebar__link--active" : ""}${
                    item.href === "#" ? " admin-sidebar__link--muted" : ""
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="admin-sidebar__footer">
            <strong>REVISA Admin</strong>
            <span>Gestao territorial, acompanhamento e operacao interna.</span>
          </div>
        </aside>

        <div className="admin-content">{children}</div>
      </div>
    </main>
  );
}
