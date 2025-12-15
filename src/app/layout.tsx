import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { Suspense } from "react";
import "./globals.css";
import TrackingClient from "./TrackingClient";

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
  title: "El Rey de las Páginas — Digital Design & Web Experience",
  description:
    "Domina tu mercado con experiencias web premium: branding, contenido, automatización y tecnología lista para 2025.",
  openGraph: {
    title: "El Rey de las Páginas",
    description:
      "Landing premium, mobile-first y accesible para marcas que quieren ganarle a su competencia.",
    url: "https://www.elreydelaspaginas.com",
    siteName: "El Rey de las Páginas",
    locale: "es_CL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "El Rey de las Páginas",
    description:
      "Diseño, automatización y marketing listos para dominar 2025. Mobile first + WCAG.",
  },
  icons: {
    icon: "/reylogo.png",
    apple: "/reylogo.png",
  },
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

        <Suspense fallback={null}>
          <TrackingClient ga4MeasurementId={ga4MeasurementId} />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
