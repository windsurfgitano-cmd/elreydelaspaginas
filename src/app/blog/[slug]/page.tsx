import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { posts } from "../posts";

interface Props {
  params: Promise<{ slug: string }>;
}

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
    alternates: {
      canonical: `https://www.elreydelaspaginas.com/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: ["El Rey de las Páginas"],
    },
  };
}

// Simple markdown-to-HTML renderer
function renderMarkdown(md: string): string {
  return md
    .replace(/^### (.+)$/gm, "<h3 class='text-xl font-bold text-white mt-8 mb-3'>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2 class='text-2xl font-bold text-white mt-10 mb-4'>$1</h2>")
    .replace(/^# (.+)$/gm, "<h1 class='text-3xl font-black text-white mt-4 mb-6'>$1</h1>")
    .replace(/\*\*(.+?)\*\*/g, "<strong class='text-white font-semibold'>$1</strong>")
    .replace(/\[(.+?)\]\((.+?)\)/g, "<a href='$2' class='text-gold hover:text-white underline' target='_blank' rel='noopener'>$1</a>")
    .replace(/^> (.+)$/gm, "<blockquote class='border-l-4 border-gold pl-4 italic text-white/70 my-4'>$1</blockquote>")
    .replace(/^❌ (.+)$/gm, "<p class='text-red-400 my-1'>❌ $1</p>")
    .replace(/^✅ (.+)$/gm, "<p class='text-green-400 my-1'>✅ $1</p>")
    .replace(/```[\w]*\n([\s\S]*?)```/gm, "<pre class='bg-black/60 border border-white/10 rounded-xl p-4 overflow-x-auto text-sm text-white/80 my-6 font-mono'><code>$1</code></pre>")
    .replace(/`(.+?)`/g, "<code class='bg-white/10 text-gold px-1.5 py-0.5 rounded text-sm font-mono'>$1</code>")
    .replace(/^\|(.+)\|$/gm, (match) => {
      const cells = match.split("|").filter(c => c.trim() && !c.match(/^[-\s]+$/));
      return "<tr>" + cells.map(c => `<td class='border border-white/10 px-4 py-2 text-sm text-white/80'>${c.trim()}</td>`).join("") + "</tr>";
    })
    .replace(/(<tr>.*<\/tr>\n?)+/gs, (match) => `<div class='overflow-x-auto my-6'><table class='w-full border-collapse'>${match}</table></div>`)
    .replace(/^- (.+)$/gm, "<li class='text-white/70 ml-4 list-disc'>$1</li>")
    .replace(/(<li.*<\/li>\n?)+/gs, (match) => `<ul class='space-y-1 my-4'>${match}</ul>`)
    .replace(/^\d+\. (.+)$/gm, "<li class='text-white/70 ml-4 list-decimal'>$1</li>")
    .replace(/\n\n/g, "</p><p class='text-white/70 leading-relaxed my-4'>")
    .replace(/^(?!<[a-z])(.+)$/gm, "<p class='text-white/70 leading-relaxed my-4'>$1</p>");
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const otherPosts = posts.filter((p) => p.slug !== slug).slice(0, 3);

  // JSON-LD Article
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: {
      "@type": "Organization",
      name: "El Rey de las Páginas",
      url: "https://www.elreydelaspaginas.com",
    },
    publisher: {
      "@type": "Organization",
      name: "El Rey de las Páginas",
      url: "https://www.elreydelaspaginas.com",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <main id="main-content" className="relative z-10 min-h-screen px-4 py-24">
        <div className="mx-auto max-w-3xl">
          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center gap-2 text-sm text-white/40">
            <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-white/60">{post.title.slice(0, 40)}…</span>
          </nav>

          {/* Post header */}
          <header className="mb-10">
            <span className="rounded-full bg-gold/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gold">
              {post.category}
            </span>
            <h1 className="mt-4 text-3xl font-black leading-tight text-white sm:text-4xl">
              {post.title}
            </h1>
            <p className="mt-3 text-white/40 text-sm">{post.date}</p>
            <p className="mt-4 text-lg text-white/60">{post.excerpt}</p>
          </header>

          {/* Post content */}
          <article
            className="prose-rey"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
          />

          {/* CTA */}
          <div className="mt-16 rounded-3xl border border-gold/20 bg-gold/5 p-8 text-center">
            <p className="text-lg font-bold text-white">¿Quieres aplicar esto en tu negocio?</p>
            <p className="mt-2 text-sm text-white/60">Cotización sin compromiso en 24h</p>
            <Link
              href="https://wa.me/56981734039?text=Vi%20el%20blog%20y%20quiero%20una%20asesor%C3%ADa"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-bold text-black hover:scale-105 transition-transform"
            >
              Hablar con el Rey →
            </Link>
          </div>

          {/* More posts */}
          {otherPosts.length > 0 && (
            <section className="mt-16">
              <h2 className="text-xl font-bold text-white mb-6">Más artículos</h2>
              <div className="grid gap-4 sm:grid-cols-3">
                {otherPosts.map((p) => (
                  <Link key={p.slug} href={`/blog/${p.slug}`} className="glass-card p-4 hover:border-gold/30 transition-colors">
                    <span className="text-xs text-gold uppercase tracking-wider">{p.category}</span>
                    <p className="mt-2 text-sm font-semibold text-white leading-tight">{p.title}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <div className="mt-10 text-center">
            <Link href="/blog" className="text-sm text-white/40 hover:text-white transition-colors">
              ← Ver todos los artículos
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
