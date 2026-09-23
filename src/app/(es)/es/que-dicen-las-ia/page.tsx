import type { Metadata } from "next";
import { WhatAiSaysPage } from "@/components/brand-check/WhatAiSaysPage";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbSchema, webApplicationSchema } from "@/lib/schema";
import { getAlternates } from "@/lib/i18n/navigation";
import { ogImage } from "@/lib/seo/og";
import "@/components/v4/brand-monitoring-signal.css";
import "@/components/v4/brand-check.css";

const title = "¿Qué dicen las IA de tu marca? Compruébalo gratis";
const description =
  "Escribe una empresa o una marca y lee qué dicen de ella los principales modelos de IA, respuesta a respuesta: en qué coinciden y en qué no. Gratis.";
const url = "https://sealmetrics.com/es/que-dicen-las-ia/";

// The Spanish card has its own artwork (public/og/que-dicen-las-ia.png, rendered by
// scripts/generate-og-images.mjs), so ogImage() resolves it from the Spanish slug.
export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    images: [ogImage("/es/que-dicen-las-ia/")],
    url,
    siteName: "Sealmetrics",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title,
    description,
    images: [ogImage("/es/que-dicen-las-ia/")],
  },
  alternates: { canonical: url, languages: getAlternates("/que-dicen-las-ia") },
};

export default function PaginaQueDicenLasIa() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Qué dicen las IA", url: "/es/que-dicen-las-ia" }])} />
      <JsonLd
        data={webApplicationSchema({
          name: "¿Qué dicen las IA de…?",
          description:
            "Consulta gratuita que hace dos preguntas fijas sobre una empresa o una marca a todos los modelos del panel, de memoria (salvo Perplexity, que busca en la web), y enseña cada respuesta, una clasificación automática y en qué coinciden y discrepan.",
          url: "/es/que-dicen-las-ia",
        })}
      />
      <WhatAiSaysPage locale="es" />
    </>
  );
}
