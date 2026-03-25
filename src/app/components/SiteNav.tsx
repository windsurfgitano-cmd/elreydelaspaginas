"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { label: "Servicios", href: "/#services" },
  { label: "Casos", href: "/#portfolio" },
  { label: "Blog", href: "/blog" },
  { label: "Garantías", href: "/#guarantees" },
  { label: "Contacto", href: "/#contact" },
];

export default function SiteNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <header className="sticky top-0 z-30 border-b border-white/5 bg-black/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="text-sm font-semibold tracking-[0.3em] text-gold">
          EL REY
        </Link>

        {/* Nav desktop */}
        <nav className="hidden gap-6 text-xs uppercase tracking-[0.2em] text-white/70 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`transition hover:text-white ${
                pathname.startsWith("/blog") && item.href === "/blog"
                  ? "text-gold"
                  : ""
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Acciones */}
        <div className="flex items-center gap-3">
          {/* Botón volver — visible cuando no estás en home */}
          {!isHome && (
            <Link
              href="/"
              className="hidden items-center gap-1.5 rounded-full border border-white/20 px-3 py-1.5 text-xs text-white/60 transition hover:border-gold hover:text-gold sm:inline-flex"
            >
              ← Inicio
            </Link>
          )}
          <Link
            href="https://wa.me/56981734039?text=Hablar%20con%20el%20Rey%20de%20las%20Paginas"
            className="hidden rounded-full bg-gold px-4 py-2 text-xs font-semibold text-black sm:inline-flex"
          >
            WhatsApp
          </Link>
          <button
            type="button"
            className="rounded-full border border-white/30 p-2 text-white md:hidden"
            aria-label="Abrir menú"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <span className="sr-only">Toggle menu</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6H20M4 12H20M4 18H12"}
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Menú móvil */}
      {menuOpen && (
        <nav className="border-t border-white/10 bg-black/90 px-4 py-4 md:hidden">
          <div className="flex flex-col gap-4 text-xs uppercase tracking-[0.3em] text-white/80">
            {!isHome && (
              <Link
                href="/"
                className="text-gold"
                onClick={() => setMenuOpen(false)}
              >
                ← Volver al inicio
              </Link>
            )}
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition hover:text-white"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="https://wa.me/56981734039?text=Hablar%20con%20el%20Rey%20de%20las%20Paginas"
              className="rounded-full bg-gold px-4 py-2 text-center text-xs font-semibold text-black"
              onClick={() => setMenuOpen(false)}
            >
              WhatsApp
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
