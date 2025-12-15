import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ContestSignupPanel from "./ContestSignupPanel";

type SearchParams = Record<string, string | string[] | undefined>;

type LeadMeta = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  fbclid?: string;
  gclid?: string;
  ttclid?: string;
};

export const metadata: Metadata = {
  title: "Concurso Shopify 2.0 — El Rey de las Páginas",
  description:
    "Participa por una tienda Shopify 2.0 lista para vender. Completa el formulario y te contactamos si quedas preseleccionado/a.",
  openGraph: {
    title: "Concurso Shopify 2.0 — El Rey de las Páginas",
    description:
      "Participa por una tienda Shopify 2.0 lista para vender. Completa el formulario para postular.",
    url: "https://www.elreydelaspaginas.com/concurso-shopify",
    siteName: "El Rey de las Páginas",
    locale: "es_CL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Concurso Shopify 2.0 — El Rey de las Páginas",
    description:
      "Participa por una tienda Shopify 2.0 lista para vender. Completa el formulario para postular.",
  },
};

function firstString(value: string | string[] | undefined) {
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value[0];
  return undefined;
}

function pickMeta(searchParams: SearchParams): LeadMeta {
  return {
    utm_source: firstString(searchParams.utm_source),
    utm_medium: firstString(searchParams.utm_medium),
    utm_campaign: firstString(searchParams.utm_campaign),
    utm_content: firstString(searchParams.utm_content),
    utm_term: firstString(searchParams.utm_term),
    fbclid: firstString(searchParams.fbclid),
    gclid: firstString(searchParams.gclid),
    ttclid: firstString(searchParams.ttclid),
  };
}

export default function ConcursoShopifyPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const initialMeta = pickMeta(searchParams);

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-80">
          <div className="absolute -left-40 top-[-120px] h-[520px] w-[520px] rounded-full bg-[rgba(212,175,55,0.14)] blur-[80px]" />
          <div className="absolute -right-40 bottom-[-160px] h-[560px] w-[560px] rounded-full bg-[rgba(192,132,252,0.12)] blur-[90px]" />
        </div>

        <header className="relative mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-6">
          <Link href="/" className="inline-flex items-center gap-3">
            <Image
              src="/reylogo.png"
              alt="El Rey de las Páginas"
              width={36}
              height={36}
              className="h-9 w-9 rounded-xl border border-white/10 object-cover"
              priority
            />
            <span className="text-sm font-semibold tracking-tight">
              El Rey de las Páginas
            </span>
          </Link>
          <a
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white/90"
            href="https://wa.me/56981734039?text=Hablar%20con%20el%20Rey%20de%20las%20Paginas"
            target="_blank"
            rel="noreferrer"
          >
            Hablar con el Rey de las Paginas
          </a>
        </header>

        <section className="relative px-4 pb-16 pt-2">
          <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gold">
                Concurso · Shopify 2.0
              </p>
              <h1 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">
                Gana una tienda Shopify 2.0 lista para vender
              </h1>
              <p className="mt-5 text-base text-white/75">
                Ideal si vienes de IG/TikTok y quieres convertir tráfico en ventas.
                Postula con tu negocio y seleccionamos 1 ganador para construir una
                tienda completa (estructura + diseño + performance).
              </p>

              <div className="mt-8 grid gap-4 rounded-3xl border border-white/10 bg-white/5 p-6">
                <h2 className="text-lg font-semibold text-white">Incluye</h2>
                <ul className="space-y-2 text-sm text-white/70">
                  <li>Shopify 2.0 theme configurado y optimizado para mobile</li>
                  <li>Checkout y páginas clave (home, producto, colección, carrito)</li>
                  <li>Setup básico de analítica y eventos</li>
                  <li>Recomendaciones de contenido + oferta para escalar</li>
                </ul>
              </div>

              <div className="mt-8 grid gap-4 rounded-3xl border border-white/10 bg-white/5 p-6">
                <h2 className="text-lg font-semibold text-white">Cómo participar</h2>
                <ol className="space-y-2 text-sm text-white/70">
                  <li>1) Completa el formulario con tus datos</li>
                  <li>2) Deja tu usuario IG/TikTok para revisar tu contenido</li>
                  <li>3) Si quedas preseleccionado/a, te contactamos en 24h</li>
                </ol>
              </div>

              <p className="mt-8 text-xs text-white/55">
                Al participar aceptas que podamos contactarte para coordinar el
                proceso del concurso. No vendemos tus datos.
              </p>
            </div>

            <div className="glass-card h-fit p-6">
              <h2 className="text-xl font-semibold text-white">
                Diagnóstico IA + concurso
              </h2>
              <p className="mt-2 text-sm text-white/70">
                Haz el diagnóstico express (30s) y luego postula para que revisemos
                tu negocio.
              </p>

              <ContestSignupPanel initialMeta={initialMeta} />

              <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-4">
                <p className="text-sm font-semibold text-white">Contacto directo</p>
                <p className="mt-2 text-sm text-white/70">
                  +56981734039 · soporte@elreydelaspaginas.com
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
