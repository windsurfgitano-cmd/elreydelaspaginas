"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { label: "Servicios", href: "/#services" },
  { label: "Casos", href: "/#portfolio" },
  { label: "Blog", href: "/blog" },
  { label: "Recursos", href: "/recursos" },
  { label: "Garantías", href: "/#guarantees" },
  { label: "Contacto", href: "/#contact" },
];

export default function SiteNavClient() {
  const [open, setOpen] = useState(false);
  const path = usePathname();

  return (
    <header className="sticky top-0 z-30 border-b border-white/5 bg-black/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4">
        <Link href="/" className="text-sm font-semibold tracking-[0.3em] text-gold" onClick={() => setOpen(false)}>
          EL REY
        </Link>
        <nav className="hidden gap-6 text-xs uppercase tracking-[0.2em] text-white/70 md:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href}
              className={`transition hover:text-white ${path.startsWith("/blog") && l.href === "/blog" ? "text-gold" : ""}`}>
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          {path !== "/" && (
            <Link href="/" className="hidden items-center gap-1 rounded-full border border-white/20 px-3 py-1.5 text-xs text-white/60 transition hover:border-gold hover:text-gold sm:inline-flex">
              ← Inicio
            </Link>
          )}
          <Link href="https://wa.me/56981734039?text=Hablar%20con%20el%20Rey%20de%20las%20Paginas"
            className="hidden rounded-full bg-gold px-4 py-2 text-xs font-semibold text-black sm:inline-flex">
            WhatsApp
          </Link>
          <button type="button" onClick={() => setOpen(v => !v)}
            className="rounded-full border border-white/30 p-2 text-white md:hidden"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d={open ? "M6 18L18 6M6 6l12 12" : "M4 6H20M4 12H20M4 18H12"}
                stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-white/10 bg-black/90 px-4 py-4 md:hidden">
          <div className="flex flex-col gap-4 text-xs uppercase tracking-[0.3em] text-white/80">
            {path !== "/" && <Link href="/" className="text-gold" onClick={() => setOpen(false)}>← Inicio</Link>}
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="transition hover:text-white" onClick={() => setOpen(false)}>
                {l.label}
              </Link>
            ))}
            <Link href="https://wa.me/56981734039?text=Hablar%20con%20el%20Rey%20de%20las%20Paginas"
              className="rounded-full bg-gold px-4 py-2 text-center font-semibold text-black" onClick={() => setOpen(false)}>
              WhatsApp
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
