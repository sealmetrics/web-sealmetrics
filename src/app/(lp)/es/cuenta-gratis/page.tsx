import type { Metadata } from "next";
import { FreeAccountLanding } from "@/components/landing/FreeAccountLanding";
import { freeAccountLanding } from "@/lib/content/free-account-landing";
import { ogImage } from "@/lib/seo/og";

/* Landing de tráfico frío de pago (Google Ads, Meta Ads, LinkedIn Ads), Q4 2026.
   noindex/follow por decisión: lleva una oferta con fecha, no apunta a ninguna
   keyword orgánica y competiría con /es/cookieless-analytics y /es/pricing.
   Gemela de /free-account/. */
const t = freeAccountLanding.es;
export const metadata: Metadata = {
  title: t.title,
  description: t.description,
  robots: { index: false, follow: true },
  alternates: {
    canonical: `https://sealmetrics.com${t.route}`,
    languages: { en: `https://sealmetrics.com${t.otherRoute}`, es: `https://sealmetrics.com${t.route}`, "x-default": `https://sealmetrics.com${t.otherRoute}` },
  },
  openGraph: { title: t.title, description: t.description, url: `https://sealmetrics.com${t.route}`, siteName: "Sealmetrics", locale: "es_ES", type: "website", images: [ogImage(t.route)] },
  twitter: { card: "summary_large_image", title: t.title, description: t.description, site: "@sealmetrics", images: [ogImage(t.route)] },
};

export default function Page() { return <FreeAccountLanding locale="es" />; }
