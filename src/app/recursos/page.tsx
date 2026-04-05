import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Recursos Gratuitos para Emprendedores | El Rey de las Páginas",
  description:
    "Descarga gratis: checklist para lanzar tu negocio digital en 7 días, guía de ventas por WhatsApp en Chile y plantilla de control de finanzas para emprendedores.",
  keywords: [
    "recursos emprendedores chile",
    "checklist negocio digital",
    "vender por whatsapp chile",
    "control finanzas emprendedor",
    "guía emprendimiento chile",
    "el rey de las páginas recursos",
  ],
  alternates: { canonical: "https://www.elreydelaspaginas.com/recursos" },
  openGraph: {
    title: "Recursos Gratuitos para Emprendedores | El Rey de las Páginas",
    description:
      "Guías, checklists y plantillas gratuitas para emprendedores chilenos. Descárgalos y empieza hoy.",
    url: "https://www.elreydelaspaginas.com/recursos",
    siteName: "El Rey de las Páginas",
    type: "website",
  },
};

const recursos = [
  {
    emoji: "✅",
    title: "Checklist: Lanza Tu Negocio Digital en 7 Días",
    description:
      "Paso a paso para pasar de la idea a un negocio funcionando en una semana. Sin rodeos, pura acción.",
    file: "/recursos/checklist-negocio-digital-7-dias.pdf",
    filename: "checklist-negocio-digital-7-dias.pdf",
  },
  {
    emoji: "💬",
    title: "Vende por WhatsApp en Chile: De 0 a 100 Clientes",
    description:
      "Scripts copy-paste, manejo de objeciones y un plan para conseguir tus primeros 100 clientes usando WhatsApp Business.",
    file: "/recursos/guia-whatsapp-ventas-chile.pdf",
    filename: "guia-whatsapp-ventas-chile.pdf",
  },
  {
    emoji: "💰",
    title: "Control de Finanzas para Emprendedores",
    description:
      "Plantilla de control de caja, fórmulas de pricing, KPIs financieros y un ejemplo real con números reales.",
    file: "/recursos/plantilla-control-finanzas.pdf",
    filename: "plantilla-control-finanzas.pdf",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Recursos Gratuitos para Emprendedores",
  description:
    "Guías, checklists y plantillas gratuitas para emprendedores chilenos.",
  url: "https://www.elreydelaspaginas.com/recursos",
  publisher: {
    "@type": "Organization",
    name: "El Rey de las Páginas",
    url: "https://www.elreydelaspaginas.com",
  },
  hasPart: recursos.map((r) => ({
    "@type": "DigitalDocument",
    name: r.title,
    description: r.description,
    url: `https://www.elreydelaspaginas.com${r.file}`,
    encodingFormat: "text/markdown",
    isAccessibleForFree: true,
    provider: {
      "@type": "Organization",
      name: "El Rey de las Páginas",
    },
  })),
};

export default function RecursosPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="mx-auto max-w-6xl px-4 py-20">
        {/* Header */}
        <section className="mb-16 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
            Recursos{" "}
            <span className="text-[#D4AF37]">Gratuitos</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-white/60">
            Guías prácticas, checklists y plantillas para emprendedores
            chilenos. Sin humo, sin relleno — pura acción.
          </p>
        </section>

        {/* Cards Grid */}
        <section className="mb-20 grid gap-8 md:grid-cols-3">
          {recursos.map((r) => (
            <article
              key={r.filename}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-md transition-all duration-300 hover:border-[#D4AF37]/40 hover:bg-white/[0.06] hover:shadow-[0_0_40px_rgba(212,175,55,0.08)]"
            >
              {/* Glow effect on hover */}
              <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: "radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(212,175,55,0.06), transparent 40%)" }} />

              <span className="mb-4 text-5xl">{r.emoji}</span>
              <h2 className="mb-3 text-xl font-semibold text-white">
                {r.title}
              </h2>
              <p className="mb-8 flex-1 text-sm leading-relaxed text-white/50">
                {r.description}
              </p>
              <a
                href={r.file}
                download={r.filename}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#D4AF37]/60 bg-[#D4AF37]/10 px-6 py-3 text-sm font-semibold text-[#D4AF37] transition-all duration-200 hover:bg-[#D4AF37] hover:text-black"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Descargar gratis
              </a>
            </article>
          ))}
        </section>

        {/* CTA Section */}
        <section className="rounded-2xl border border-[#D4AF37]/20 bg-gradient-to-br from-[#D4AF37]/5 to-transparent p-12 text-center backdrop-blur-md">
          <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">
            ¿Necesitas implementar todo esto?{" "}
            <span className="text-[#D4AF37]">Somos tu equipo.</span>
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-white/50">
            Desde tu primera landing page hasta una tienda online completa con
            pagos automáticos. En El Rey de las Páginas construimos soluciones
            web que generan resultados reales.
          </p>
          <Link
            href="https://wa.me/56993553554?text=Hola%2C%20vi%20los%20recursos%20y%20quiero%20saber%20más%20sobre%20sus%20servicios"
            className="inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-8 py-4 text-sm font-bold text-black transition hover:brightness-110"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 0 1-4.243-1.214l-.257-.157-2.857.857.857-2.857-.157-.257A8 8 0 1 1 12 20z" />
            </svg>
            Habla con nosotros
          </Link>
        </section>
      </main>
    </>
  );
}
