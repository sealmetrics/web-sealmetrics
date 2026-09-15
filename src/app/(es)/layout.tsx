import type { Metadata, Viewport } from "next";
import { SharedLayout } from "@/components/layout/SharedLayout";
import { ogImage } from "@/lib/seo/og";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAFAF7" },
    { media: "(prefers-color-scheme: dark)", color: "#0E0E0C" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://sealmetrics.com"),
  title: "Sealmetrics — Analítica Completa para eCommerce",
  description:
    "Analítica web que no pierde visitas por el rechazo del consentimiento. Sin cookies, sin banners de consentimiento. Datos completos desde 499 EUR/mes.",
  openGraph: {
    title: "Sealmetrics — Analítica Completa para eCommerce",
    description:
      "GA4 no registró el 29% de las visitas en una tienda Shopify medida. Sealmetrics mide sin cookies, sin muros de consentimiento y sin muestreo.",
    url: "https://sealmetrics.com/es",
    siteName: "Sealmetrics",
    type: "website",
    locale: "es_ES",
    images: [
      {
        url: ogImage("/es/"),
        width: 1200,
        height: 630,
        alt: "Sealmetrics — Analítica Completa para eCommerce",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Sealmetrics — Analítica Completa para eCommerce",
    description:
      "GA4 no registró el 29% de las visitas en una tienda Shopify medida. Sealmetrics mide sin cookies y sin muros de consentimiento.",
    images: [ogImage("/es/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/es/",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.avif", type: "image/avif" },
      { url: "/favicon.webp", type: "image/webp" },
      { url: "/favicon.ico", sizes: "32x32", type: "image/x-icon" },
    ],
    apple: [
      { url: "/favicon.webp", sizes: "180x180", type: "image/webp" },
    ],
    shortcut: "/favicon.svg",
  },
  manifest: "/manifest.webmanifest",
};

export default function RootLayoutEs({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SharedLayout locale="es">
      {children}
    </SharedLayout>
  );
}
