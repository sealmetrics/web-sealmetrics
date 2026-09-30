import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { LegalPage } from "@/components/legal/LegalPage";
import { breadcrumbSchema } from "@/lib/schema";
import { ogImage } from "@/lib/seo/og";

export const metadata: Metadata = {
  title: "Política de Privacidad — Sealmetrics",
  description:
    "Política de privacidad de Sealmetrics (v4.0): qué datos tratamos, con qué base, cuánto tiempo los conservamos y cómo ejercer tus derechos.",
  openGraph: {
    title: "Política de Privacidad — Sealmetrics",
    description:
      "Qué datos trata Sealmetrics, con qué base, cuánto tiempo los conserva y cómo ejercer tus derechos.",
    url: "https://sealmetrics.com/es/privacy/",
    siteName: "Sealmetrics",
    type: "website",
    locale: "es_ES",
    images: [ogImage("/es/privacy/")],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Política de Privacidad — Sealmetrics",
    description:
      "Qué datos trata Sealmetrics, con qué base, cuánto tiempo los conserva y cómo ejercer tus derechos.",
    images: [ogImage("/es/privacy/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/es/privacy/",
    languages: { en: "https://sealmetrics.com/privacy/" },
  },
};

/** The text is `src/lib/content/legal/privacy.es.md`, synced from sealmetrics2 by
 * `scripts/sync-legal.mjs` — edit it there, not here. */
export default function PrivacyPageEs() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Política de Privacidad" }]} locale="es" />
      <JsonLd data={breadcrumbSchema([{ name: "Política de Privacidad", url: "/es/privacy" }], "es")} />
      <LegalPage doc="privacy" locale="es" title="Política de Privacidad" alternate="/privacy/" />
    </>
  );
}
