import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { Suspense } from "react";
import "./globals.css";
import TrackingClient from "./TrackingClient";
import SiteNav from "./components/SiteNav";
import SiteFooter from "./components/SiteFooter";

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

        <SiteNav />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
