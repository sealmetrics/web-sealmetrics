import type { Metadata } from "next";
import { BrandReportLanding } from "@/components/landing/BrandReportLanding";
import { ogImage } from "@/lib/seo/og";
import "@/components/v4/brand-monitoring-signal.css";
import "@/components/landing/brand-report-landing.css";

/* Landing de Meta Ads para el informe de marca en IA, v2. noindex/follow: es la
   versión corta de /es/ai-brand-monitoring/, que sigue siendo la página orgánica,
   y no debe competir con ella. */
const route = "/es/analiza-tu-marca-en-ia/";
const title = "Analiza lo que dicen las IA de tu marca";
const description =
  "19 modelos de IA, entre ellos ChatGPT, Claude, Gemini y Perplexity, contestan seis preguntas sobre tu empresa. Informe gratuito en tu correo.";

export const metadata: Metadata = {
  title,
  description,
  robots: { index: false, follow: true },
  alternates: { canonical: `https://sealmetrics.com${route}` },
  openGraph: {
    title,
    description,
    url: `https://sealmetrics.com${route}`,
    siteName: "Sealmetrics",
    locale: "es_ES",
    type: "website",
    images: [ogImage(route)],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    site: "@sealmetrics",
    images: [ogImage(route)],
  },
};

export default function Page() {
  return <BrandReportLanding />;
}
