import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { Suspense } from "react";
import Link from "next/link";
import "./globals.css";
import TrackingClient from "./TrackingClient";
import SiteNavClient from "./SiteNavClient";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.elreydelaspaginas.com"),
  title: "El Rey de las Páginas — Agencia Shopify & Web Premium Santiago",
  description:
    "Agencia web en Santiago: Shopify 2.0, AI-Ready Store, Agent Optimization (AO), branding y marketing digital. Experiencias que dominan el mercado 2026.",
  openGraph: {
    title: "El Rey de las Páginas — Agencia Shopify & Web Premium Santiago",
    description:
      "Shopify 2.0, AI-Ready Store y Agent Optimization. Domina tu mercado con experiencias web premium. Santiago, Chile.",
    url: "https://www.elreydelaspaginas.com",
    siteName: "El Rey de las Páginas",
    locale: "es_CL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "El Rey de las Páginas — Agencia Shopify & Web Premium",
    description:
      "Shopify 2.0, AI-Ready Store, AO y marketing. Mobile first + WCAG 2.2. Santiago, Chile.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: "https://www.elreydelaspaginas.com",
  },
  icons: {
    icon: "/reylogo.png",
    apple: "/reylogo.png",
  },
  keywords: [
    "agencia shopify santiago",
    "diseño web chile",
    "shopify 2.0 chile",
    "agent optimization chile",
    "ai ready store",
    "agencia ecommerce santiago",
    "desarrollo web premium chile",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const ga4MeasurementId = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;
  const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const tiktokPixelId = process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID;

  return (
    <html lang="es" data-theme="royal">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {ga4MeasurementId ? (
          <>
            <Script
              id="ga4-init"
              strategy="beforeInteractive"
            >{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${ga4MeasurementId}',{send_page_view:false});`}</Script>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${ga4MeasurementId}`}
              strategy="afterInteractive"
            />
          </>
        ) : null}

        {metaPixelId ? (
          <>
            <Script
              id="meta-pixel"
              strategy="beforeInteractive"
            >{`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${metaPixelId}');`}</Script>
            <noscript>
              <img
                height="1"
                width="1"
                style={{ display: "none" }}
                src={`https://www.facebook.com/tr?id=${metaPixelId}&ev=PageView&noscript=1`}
                alt=""
              />
            </noscript>
          </>
        ) : null}

        {tiktokPixelId ? (
          <Script
            id="tiktok-pixel"
            strategy="beforeInteractive"
          >{`!function(w,d,t){w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=['page','track','identify','instances','debug','on','off','once','ready','alias','group','enableCookie','disableCookie','holdConsent','revokeConsent','grantConsent'];ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))};};for(var i=0;i<ttq.methods.length;i++){ttq.setAndDefer(ttq,ttq.methods[i]);}ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++){ttq.setAndDefer(e,ttq.methods[n]);}return e;};ttq.load=function(e,n){var i='https://analytics.tiktok.com/i18n/pixel/events.js';ttq._i=ttq._i||{};ttq._i[e]=[];ttq._i[e]._u=i;ttq._t=ttq._t||{};ttq._t[e]=+new Date;ttq._o=ttq._o||{};ttq._o[e]=n||{};var o=d.createElement('script');o.type='text/javascript';o.async=!0;o.src=i+'?sdkid='+e+'&lib='+t;var a=d.getElementsByTagName('script')[0];a.parentNode.insertBefore(o,a);};ttq.load('${tiktokPixelId}');}(window,document,'ttq');`}</Script>
        ) : null}

        {/* Skip-to-content: visible solo al navegar con teclado */}
        <a href="#main-content" className="skip-link">
          Saltar al contenido principal
        </a>

        <Suspense fallback={null}>
          <TrackingClient ga4MeasurementId={ga4MeasurementId} />
        </Suspense>

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "LocalBusiness",
                  "@id": "https://www.elreydelaspaginas.com/#business",
                  name: "El Rey de las Páginas",
                  url: "https://www.elreydelaspaginas.com",
                  telephone: "+56981734039",
                  email: "soporte@elreydelaspaginas.com",
                  description:
                    "Agencia web en Santiago especializada en Shopify 2.0, AI-Ready Store, Agent Optimization (AO), branding y marketing digital premium.",
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "Santiago",
                    addressRegion: "Región Metropolitana",
                    addressCountry: "CL",
                  },
                  areaServed: ["CL", "LATAM"],
                  priceRange: "$$",
                  hasOfferCatalog: {
                    "@type": "OfferCatalog",
                    name: "Servicios Digitales Premium",
                    itemListElement: [
                      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Shopify 2.0" } },
                      { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI-Ready Store" } },
                      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Agent Optimization (AO)" } },
                      { "@type": "Offer", itemOffered: { "@type": "Service", name: "WooCommerce Pro" } },
                      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Apps PWA" } },
                      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Branding & Marca" } },
                      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Marketing Digital & RRSS" } },
                    ],
                  },
                  geo: {
                    "@type": "GeoCoordinates",
                    latitude: -33.4489,
                    longitude: -70.6693,
                  },
                  sameAs: [
                    "https://wa.me/56981734039",
                    "https://www.instagram.com/elreydelaspaginas",
                    "https://www.linkedin.com/company/elreydelaspaginas",
                    "https://www.tiktok.com/@elreydelaspaginas",
                  ],
                },
                {
                  "@type": "WebSite",
                  "@id": "https://www.elreydelaspaginas.com/#website",
                  url: "https://www.elreydelaspaginas.com",
                  name: "El Rey de las Páginas",
                  publisher: { "@id": "https://www.elreydelaspaginas.com/#business" },
                },
                {
                  "@type": "FAQPage",
                  mainEntity: [
                    {
                      "@type": "Question",
                      name: "¿Cuánto tarda un proyecto completo?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "Sprint inicial de 2 semanas para la landing/branding + 2 semanas para automatizaciones. Ajustamos según complejidad.",
                      },
                    },
                    {
                      "@type": "Question",
                      name: "¿Trabajan solo en Chile?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "No. Operamos remoto con marcas en LATAM, USA y Europa. Coordinamos horarios y facturación internacional.",
                      },
                    },
                    {
                      "@type": "Question",
                      name: "¿Cómo miden resultados?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "Implementamos GA4, Meta Pixel y dashboards (Looker/Databox) con KPIs acordados antes del kickoff.",
                      },
                    },
                  ],
                },
              ],
            }),
          }}
        />

        {/* Nav global — client component para useState/usePathname */}
        <SiteNavClient />

        {children}

        {/* Footer global */}
        <footer className="px-4 pb-32 md:pb-10">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 border-t border-white/10 pt-8 text-sm text-white/60">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex flex-col gap-1">
                <p className="font-semibold text-white">EL REY DE LAS PÁGINAS</p>
                <p>Santiago, Chile — Servicio remoto Chile &amp; LATAM</p>
                <p>Contacto: hola@elreydelaspaginas.com · +56981734039</p>
              </div>
              <div className="flex items-center gap-4">
                <a href="https://www.instagram.com/elreydelaspaginas" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/60 transition hover:border-gold hover:text-gold">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
                <a href="https://www.linkedin.com/company/elreydelaspaginas" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/60 transition hover:border-gold hover:text-gold">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
                <a href="https://www.tiktok.com/@elreydelaspaginas" target="_blank" rel="noopener noreferrer" aria-label="TikTok"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/60 transition hover:border-gold hover:text-gold">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
                </a>
              </div>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-white/30">© 2026 El Rey de las Páginas · Santiago, Chile</p>
              <div className="flex gap-4 text-xs text-white/30">
                <Link href="/blog" className="hover:text-white/60 transition-colors">Blog</Link>
                <Link href="/#services" className="hover:text-white/60 transition-colors">Servicios</Link>
                <Link href="/#contact" className="hover:text-white/60 transition-colors">Contacto</Link>
              </div>
            </div>
          </div>
        </footer>

        {/* WhatsApp flotante — todas las páginas */}
        <Link
          href="https://wa.me/56981734039?text=Hablar%20con%20el%20Rey%20de%20las%20Paginas"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-full bg-[#25D366] px-5 py-4 font-bold text-white shadow-[0_8px_30px_rgba(37,211,102,0.4)] transition-all duration-300 hover:scale-110 md:bottom-8 md:right-8"
          aria-label="Contactar por WhatsApp"
        >
          <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          <span className="hidden sm:inline">Hablemos</span>
        </Link>
      </body>
    </html>
  );
}
