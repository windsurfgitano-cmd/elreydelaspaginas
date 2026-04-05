import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { posts } from "./posts";

export const metadata: Metadata = {
  title: "Blog — El Rey de las Páginas | Shopify, AI Commerce & Web Dev",
  description:
    "Artículos sobre Shopify, Agent Optimization, AI-Ready Store, e-commerce y desarrollo web premium en Chile y LATAM.",
  alternates: { canonical: "https://www.elreydelaspaginas.com/blog" },
};

const PLACEHOLDER = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80";

export default function BlogPage() {
  const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date));
  const [featured, ...rest] = sorted;

  return (
    <main id="main-content" className="relative z-10 min-h-screen px-4 py-24">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-12 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.4em] text-gold">
            Conocimiento que convierte
          </p>
          <h1 className="mt-4 text-4xl font-black text-white sm:text-5xl">Blog</h1>
          <p className="mt-4 text-white/50 max-w-xl mx-auto">
            Shopify · AI Commerce · Desarrollo Web · Marketing Digital en Chile
          </p>
        </div>

        {posts.length === 0 ? (
          <p className="text-center text-white/40 py-20">Próximamente — artículos en camino 🚀</p>
        ) : (
          <>
            {/* Featured post */}
            {featured && (
              <Link href={`/blog/${featured.slug}`} className="group mb-10 block">
                <article className="glass-card overflow-hidden transition-all hover:border-gold/30">
                  <div className="grid md:grid-cols-2">
                    {/* Imagen */}
                    <div className="relative h-56 w-full md:h-full min-h-[240px] overflow-hidden">
                      <Image
                        src={featured.image || PLACEHOLDER}
                        alt={featured.imageAlt || featured.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/60 hidden md:block" />
                    </div>
                    {/* Texto */}
                    <div className="flex flex-col justify-center gap-4 p-6 md:p-8">
                      <div className="flex items-center gap-3">
                        <span className="rounded-full bg-gold/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gold">
                          {featured.category}
                        </span>
                        <span className="text-xs text-white/40">{featured.date}</span>
                      </div>
                      <h2 className="text-2xl font-black text-white leading-tight group-hover:text-gold transition-colors">
                        {featured.title}
                      </h2>
                      <p className="text-sm text-white/60 line-clamp-3">{featured.excerpt}</p>
                      <span className="inline-flex items-center gap-1 text-sm font-semibold text-gold">
                        Leer artículo →
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            )}

            {/* Grid resto */}
            {rest.length > 0 && (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {rest.map((post) => (
                  <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                    <article className="glass-card flex flex-col overflow-hidden h-full transition-all hover:border-gold/30">
                      {/* Imagen card */}
                      <div className="relative h-48 w-full overflow-hidden flex-shrink-0">
                        <Image
                          src={post.image || PLACEHOLDER}
                          alt={post.imageAlt || post.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                        {/* Overlay con categoría */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <span className="absolute bottom-3 left-3 rounded-full bg-gold/90 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-black">
                          {post.category}
                        </span>
                      </div>
                      {/* Texto */}
                      <div className="flex flex-1 flex-col gap-3 p-5">
                        <p className="text-xs text-white/40">{post.date}</p>
                        <h3 className="text-base font-bold text-white leading-snug line-clamp-2 group-hover:text-gold transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-sm text-white/55 line-clamp-2 flex-1">{post.excerpt}</p>
                        <span className="text-xs font-semibold text-gold mt-auto">
                          Leer más →
                        </span>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}

        {/* CTA */}
        <div className="mt-16 rounded-3xl border border-gold/20 bg-gold/5 p-8 text-center">
          <p className="font-bold text-white">¿Quieres aplicar esto en tu negocio?</p>
          <p className="mt-2 text-sm text-white/50">Cotización sin compromiso en 24h</p>
          <Link
            href="https://wa.me/56993553554?text=Vi%20el%20blog%20y%20quiero%20una%20asesor%C3%ADa"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-bold text-black hover:scale-105 transition-transform"
          >
            Hablar con el Rey →
          </Link>
        </div>
      </div>
    </main>
  );
}
