import type { Metadata } from "next";
import Link from "next/link";
import { posts } from "./posts";

export const metadata: Metadata = {
  title: "Blog — El Rey de las Páginas | Shopify, AI Commerce & Web Dev",
  description:
    "Artículos sobre Shopify, Agent Optimization, AI-Ready Store, e-commerce y desarrollo web premium en Chile y LATAM.",
  alternates: {
    canonical: "https://www.elreydelaspaginas.com/blog",
  },
};

export default function BlogPage() {
  return (
    <main id="main-content" className="relative z-10 min-h-screen px-4 py-24">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.4em] text-gold">
            Conocimiento accionable
          </p>
          <h1 className="mt-4 text-4xl font-black text-white sm:text-5xl">
            Blog
          </h1>
          <p className="mt-4 text-white/60">
            Shopify · AI Commerce · Desarrollo Web · Marketing Digital
          </p>
        </div>

        {/* Posts grid */}
        <div className="grid gap-8 md:grid-cols-2">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="glass-card flex flex-col gap-4 overflow-hidden p-6 transition-all hover:border-gold/30"
            >
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-gold/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gold">
                  {post.category}
                </span>
                <span className="text-xs text-white/40">{post.date}</span>
              </div>
              <h2 className="text-xl font-bold text-white leading-tight">
                {post.title}
              </h2>
              <p className="text-sm text-white/60 line-clamp-3">{post.excerpt}</p>
              <Link
                href={`/blog/${post.slug}`}
                className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-gold hover:text-white transition-colors"
              >
                Leer artículo →
              </Link>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 rounded-3xl border border-gold/20 bg-gold/5 p-8 text-center">
          <p className="font-bold text-white">¿Quieres aplicar esto en tu negocio?</p>
          <p className="mt-2 text-sm text-white/60">Cotización sin compromiso en 24h</p>
          <Link
            href="https://wa.me/56981734039?text=Vi%20el%20blog%20y%20quiero%20una%20asesor%C3%ADa"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-bold text-black hover:scale-105 transition-transform"
          >
            Hablar con el Rey →
          </Link>
        </div>
      </div>
    </main>
  );
}
