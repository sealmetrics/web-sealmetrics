import type { Metadata } from "next";
import { JsonLd } from "@/components/ui/JsonLd";
import { articleSchema, breadcrumbSchema, faqPageSchema, speakableWebPageSchema } from "@/lib/schema";
import { getAlternates } from "@/lib/i18n/navigation";
import { PromptLibrarySignal } from "@/components/v4/PromptLibrarySignal";
import { MCP_PROMPTS_PUBLISHED, mcpPromptsEn as content } from "@/lib/content/mcp-prompts";
import "@/components/v4/problem-landing-signal.css";
import "@/components/v4/prompt-library-signal.css";
import "@/components/v4/signal-answer.css";
import { ogImage } from "@/lib/seo/og";

const URL = "/ai-analytics/prompts";
const TITLE = "MCP Prompts for Web Analytics — Sealmetrics";
const DESCRIPTION =
  "Twelve MCP prompts for Claude or ChatGPT, grouped by problem: GA4 gaps, campaign revenue, finance reconciliation and compliance audits on your own data.";
const SOCIAL =
  "Copy a prompt into an assistant connected to the Sealmetrics MCP server. Each lists the tools it calls and the question it cannot answer.";

export const metadata: Metadata = {
  // Literal on purpose: generate-og-images.mjs reads the card title from it.
  title: "MCP Prompts for Web Analytics — Sealmetrics",
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: SOCIAL,
    type: "article",
    images: [ogImage(`${URL}/`)],
    url: `https://sealmetrics.com${URL}/`,
    siteName: "Sealmetrics",
    locale: "en_US",
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
    languages: getAlternates("/ai-analytics/prompts"),
  },
};

export default function McpPromptsPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "AI analytics", url: "/ai-analytics" }, { name: "Prompt library", url: URL }])} />
      <JsonLd data={speakableWebPageSchema({ url: URL, name: TITLE })} />
      <JsonLd
        data={articleSchema({
          headline: "MCP prompts for web analytics, grouped by the problem they solve",
          description: DESCRIPTION,
          datePublished: MCP_PROMPTS_PUBLISHED,
          dateModified: MCP_PROMPTS_PUBLISHED,
          url: URL,
          category: "AI analytics",
          author: { name: "Rafa Jiménez", url: "/authors/rafa-jimenez", jobTitle: "Founder, Sealmetrics" },
        })}
      />
      <JsonLd data={faqPageSchema(content.faq, URL)} />
      <PromptLibrarySignal content={content} />
    </>
  );
}
