import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SanityLive } from "@/sanity/lib/live";
import { siteUrl, siteName, keywordsBase } from "@/lib/seo";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Email Developer — Portfolio & Blog | MJML, Outlook, Dark Mode",
    template: "%s | Email Developer",
  },
  description:
    "Portfolio y blog de email development: MJML y HTML tabular responsive, VML para Outlook, dark mode, accesibilidad AA y deliverability. Casos reales + guías.",
  keywords: keywordsBase,
  authors: [{ name: "Email Developer", url: siteUrl }],
  creator: "Email Developer",
  publisher: "inbox.dev",
  alternates: {
    canonical: "/es",
    languages: { es: "/es", en: "/en" },
    types: { "application/rss+xml": "/rss.xml" },
  },
  openGraph: {
    title: siteName,
    description: "Emails que llegan, se ven bien y convierten. MJML, Outlook VML, dark mode y accesibilidad.",
    url: "/es",
    siteName,
    locale: "es_ES",
    alternateLocale: ["en_US"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: "Portfolio + blog de email development: casos reales y guías citables.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-paper text-ink">{children}<SanityLive /></body>
    </html>
  );
}
