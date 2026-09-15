import type { Metadata } from "next";
import { JsonLd } from "@/components/ui/JsonLd";
import { articleSchema, breadcrumbSchema, faqPageSchema, speakableWebPageSchema } from "@/lib/schema";
import { getAlternatesEs } from "@/lib/i18n/navigation";
import { PromptLibrarySignal } from "@/components/v4/PromptLibrarySignal";
import { MCP_PROMPTS_PUBLISHED, mcpPromptsEs as content } from "@/lib/content/mcp-prompts";
import "@/components/v4/problem-landing-signal.css";
import "@/components/v4/prompt-library-signal.css";
import "@/components/v4/signal-answer.css";
import { ogImage } from "@/lib/seo/og";

const URL = "/es/ai-analytics/prompts";
const TITLE = "Prompts MCP para analítica web — Sealmetrics";
const DESCRIPTION =
  "Doce prompts MCP para Claude o ChatGPT, por problema: huecos de GA4, ingresos por campaña, conciliación con finanzas y auditorías de cumplimiento.";
const SOCIAL =
  "Copia un prompt en un asistente conectado al servidor MCP de Sealmetrics. Cada uno indica las herramientas que usa y la pregunta que no puede responder.";

export const metadata: Metadata = {
  // Literal on purpose: generate-og-images.mjs reads the card title from it.
  title: "Prompts MCP para analítica web — Sealmetrics",
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: SOCIAL,
    type: "article",
    images: [ogImage(`${URL}/`)],
    url: `https://sealmetrics.com${URL}/`,
    siteName: "Sealmetrics",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: TITLE,
    description: SOCIAL,
    images: [ogImage(`${URL}/`)],
  },
  alternates: {
    canonical: `https://sealmetrics.com${URL}/`,
    languages: getAlternatesEs("/ai-analytics/prompts"),
  },
};

export default function McpPromptsPageEs() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Analítica con IA", url: "/es/ai-analytics" }, { name: "Biblioteca de prompts", url: URL }])} />
      <JsonLd data={speakableWebPageSchema({ url: URL, name: TITLE })} />
      <JsonLd
        data={articleSchema({
          headline: "Prompts MCP para analítica web, agrupados por el problema que resuelven",
          description: DESCRIPTION,
          datePublished: MCP_PROMPTS_PUBLISHED,
          dateModified: MCP_PROMPTS_PUBLISHED,
          url: URL,
          category: "AI analytics",
          author: { name: "Rafa Jiménez", url: "/es/authors/rafa-jimenez", jobTitle: "Founder, Sealmetrics" },
        })}
      />
      <JsonLd data={faqPageSchema(content.faq, URL)} />
      <PromptLibrarySignal content={content} />
    </>
  );
}
