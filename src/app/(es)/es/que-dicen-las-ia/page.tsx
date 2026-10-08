import type { Metadata } from "next";
import { WhatAiSaysPage } from "@/components/brand-check/WhatAiSaysPage";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbSchema, webApplicationSchema } from "@/lib/schema";
import { getAlternates } from "@/lib/i18n/navigation";
import { ogImage } from "@/lib/seo/og";
import "@/components/v4/brand-monitoring-signal.css";
import "@/components/v4/brand-check.css";

const title = "Puntuación de visibilidad en IA de tu marca, gratis";
const description =
  "Escribe tu marca y lo que vende, y mira de 0 a 100 cuánto te conocen y te recomiendan los principales modelos de IA. Gratis y sin registro.";
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
            "Consulta gratuita que pregunta a todos los modelos del panel qué es una marca y, sin nombrarla, qué recomiendan a quien busca lo que vende; de memoria, salvo Perplexity, que busca en la web. Da una puntuación de 0 a 100 con su base y enseña cada respuesta, una clasificación automática y en qué coinciden y discrepan.",
          url: "/es/que-dicen-las-ia",
        })}
      />
      <WhatAiSaysPage locale="es" />
    </>
  );
}
