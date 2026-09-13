import type { Metadata } from "next";
import { RealityLanding } from "@/components/landing/RealityLanding";
import { realityLanding } from "@/lib/content/reality-landing";
import { ogImage } from "@/lib/seo/og";

const t = realityLanding.es;
// Campaign-specific destination, intentionally outside the organic index.
export const metadata: Metadata = {
  title: t.title,
  description: t.description,
  robots: { index: false, follow: true },
  alternates: {
    canonical: `https://sealmetrics.com${t.route}`,
    languages: { en: "https://sealmetrics.com/measure-reality/", es: "https://sealmetrics.com/es/mide-la-realidad/", "x-default": "https://sealmetrics.com/measure-reality/" },
  },
  openGraph: { title: t.title, description: t.description, url: `https://sealmetrics.com${t.route}`, siteName: "Sealmetrics", locale: "es_ES", type: "website", images: [ogImage(t.route)] },
  twitter: { card: "summary_large_image", title: t.title, description: t.description, site: "@sealmetrics", images: [ogImage(t.route)] },
};

export default function Page() { return <RealityLanding locale="es" />; }
