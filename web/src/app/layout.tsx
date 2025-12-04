import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
  return (
    <html lang="es" data-theme="royal">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
