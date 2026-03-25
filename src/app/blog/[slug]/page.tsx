import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { posts } from "../posts";

interface Props { params: Promise<{ slug: string }>; }

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: `${post.title} — El Rey de las Páginas`,
    description: post.excerpt,
    alternates: { canonical: `https://www.elreydelaspaginas.com/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      images: post.image ? [{ url: post.image, alt: post.imageAlt || post.title }] : [],
    },
  };
}

function renderMarkdown(md: string): string {
  return md
    .replace(/^### (.+)$/gm, "<h3 class='text-xl font-bold text-white mt-8 mb-3'>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2 class='text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2'>$1</h2>")
    .replace(/^# (.+)$/gm, "<h1 class='text-3xl font-black text-white mt-4 mb-6'>$1</h1>")
    .replace(/\*\*(.+?)\*\*/g, "<strong class='text-white font-semibold'>$1</strong>")
    .replace(/\[(.+?)\]\((.+?)\)/g, "<a href='$2' class='text-gold underline underline-offset-2 hover:text-white transition-colors' target='_blank' rel='noopener'>$1</a>")
    .replace(/^> (.+)$/gm, "<blockquote class='border-l-4 border-gold pl-4 italic text-white/70 my-4 bg-white/5 py-2 pr-4 rounded-r-lg'>$1</blockquote>")
    .replace(/```[\w]*\n([\s\S]*?)```/gm, "<pre class='bg-black/60 border border-white/10 rounded-xl p-4 overflow-x-auto text-sm text-white/80 my-6 font-mono'><code>$1</code></pre>")
    .replace(/`(.+?)`/g, "<code class='bg-white/10 text-gold px-1.5 py-0.5 rounded text-sm font-mono'>$1</code>")
    .replace(/^\| ?(.*?) ?\|$/gm, (match) => {
      const cells = match.split("|").filter((c, i, a) => i > 0 && i < a.length - 1);
      const isSep = cells.every(c => /^[-:\s]+$/.test(c));
      if (isSep) return "";
      return "<tr>" + cells.map(c => `<td class='border border-white/10 px-4 py-2 text-sm text-white/75'>${c.trim()}</td>`).join("") + "</tr>";
    })
    .replace(/(<tr>[\s\S]*?<\/tr>[\n\r]*)+/g, m => `<div class='overflow-x-auto my-6'><table class='w-full border-collapse'>${m}</table></div>`)
    .replace(/^[-*] (.+)$/gm, "<li class='text-white/70 ml-5 list-disc my-1'>$1</li>")
    .replace(/(<li[\s\S]*?<\/li>\n?)+/g, m => `<ul class='space-y-1 my-4'>${m}</ul>`)
    .replace(/^\d+\. (.+)$/gm, "<li class='text-white/70 ml-5 list-decimal my-1'>$1</li>")
    .replace(/\n\n+/g, "</p><p class='text-white/65 leading-relaxed my-4'>")
    .replace(/^(?!<)(.+)/gm, (m) => m.trim() ? `<p class='text-white/65 leading-relaxed my-4'>${m}</p>` : "");
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const related = posts.filter((p) => p.slug !== slug && p.category === post.category).slice(0, 3);
  const others  = posts.filter((p) => p.slug !== slug).slice(0, 3 - related.length);
  const suggestions = [...related, ...others].slice(0, 3);

  const PLACEHOLDER = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80";

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: post.title,
        description: post.excerpt,
        image: post.image || PLACEHOLDER,
        datePublished: post.date,
        author: { "@type": "Organization", name: "El Rey de las Páginas", url: "https://www.elreydelaspaginas.com" },
        publisher: { "@type": "Organization", name: "El Rey de las Páginas", url: "https://www.elreydelaspaginas.com" },
      }) }} />

      <main id="main-content" className="relative z-10 min-h-screen">

        {/* Hero imagen full-width */}
        <div className="relative h-[45vh] min-h-[280px] w-full overflow-hidden">
          <Image
            src={post.image || PLACEHOLDER}
            alt={post.imageAlt || post.title}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          {/* Gradiente oscuro para legibilidad */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black" />
          {/* Breadcrumb sobre imagen */}
          <div className="absolute bottom-6 left-0 right-0 px-4">
            <div className="mx-auto max-w-3xl">
              <nav className="flex items-center gap-2 text-xs text-white/60 mb-3">
                <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
                <span>/</span>
                <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
                <span>/</span>
                <span className="text-white/40 truncate max-w-[200px]">{post.title.slice(0,35)}…</span>
              </nav>
              <span className="rounded-full bg-gold px-3 py-1 text-xs font-bold uppercase tracking-wider text-black">
                {post.category}
              </span>
            </div>
          </div>
        </div>

        {/* Contenido */}
        <div className="px-4 py-10">
          <div className="mx-auto max-w-3xl">

            {/* Título y meta */}
            <header className="mb-8">
              <h1 className="text-3xl font-black leading-tight text-white sm:text-4xl">
                {post.title}
              </h1>
              <div className="mt-4 flex items-center gap-4 text-sm text-white/40">
                <span>{post.date}</span>
                <span>·</span>
                <span>El Rey de las Páginas</span>
              </div>
              <p className="mt-4 text-lg text-white/60 border-l-4 border-gold pl-4">
                {post.excerpt}
              </p>
            </header>

            {/* Cuerpo del artículo */}
            <article
              className="prose-rey"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
            />

            {/* CTA post-artículo */}
            <div className="mt-14 rounded-3xl border border-gold/25 bg-gold/5 p-8 text-center">
              <p className="text-lg font-bold text-white">¿Quieres aplicar esto en tu negocio?</p>
              <p className="mt-2 text-sm text-white/50">Nuestro equipo en Santiago lo implementa por ti</p>
              <Link
                href="https://wa.me/56981734039?text=Vi%20el%20blog%20y%20quiero%20una%20asesor%C3%ADa"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-bold text-black hover:scale-105 transition-transform shadow-[0_0_30px_rgba(212,175,55,0.35)]"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Hablar con el Rey →
              </Link>
            </div>

            {/* Artículos relacionados */}
            {suggestions.length > 0 && (
              <section className="mt-14">
                <h2 className="text-xl font-bold text-white mb-6">Más artículos</h2>
                <div className="grid gap-4 sm:grid-cols-3">
                  {suggestions.map((p) => (
                    <Link key={p.slug} href={`/blog/${p.slug}`} className="group block">
                      <div className="glass-card overflow-hidden hover:border-gold/30 transition-colors">
                        <div className="relative h-32 w-full overflow-hidden">
                          <Image
                            src={p.image || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=70"}
                            alt={p.imageAlt || p.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 640px) 100vw, 33vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                          <span className="absolute bottom-2 left-2 text-[10px] font-bold uppercase tracking-wider text-gold">
                            {p.category}
                          </span>
                        </div>
                        <div className="p-3">
                          <p className="text-xs font-semibold text-white/80 leading-snug line-clamp-2 group-hover:text-gold transition-colors">
                            {p.title}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            <div className="mt-10 text-center">
              <Link href="/blog" className="text-sm text-white/35 hover:text-white transition-colors">
                ← Ver todos los artículos
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
