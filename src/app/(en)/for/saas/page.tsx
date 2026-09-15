import type { Metadata } from "next";
import { JsonLd } from "@/components/ui/JsonLd";
import { articleSchema, breadcrumbSchema, faqPageSchema, howToSchema, speakableWebPageSchema } from "@/lib/schema";
import { getAlternates } from "@/lib/i18n/navigation";
import { ProblemLandingSignal } from "@/components/v4/ProblemLandingSignal";
import { SAAS_MODIFIED, SAAS_PUBLISHED, saasEn as content } from "@/lib/content/problem-landings/saas";
import "@/components/v4/problem-landing-signal.css";
import "@/components/v4/signal-answer.css";
import { ogImage } from "@/lib/seo/og";

const URL = "/for/saas";
const TITLE = "Analytics for SaaS: Sign-ups by Channel — Sealmetrics";
const DESCRIPTION =
  "Cookieless analytics for self-serve SaaS: sign-ups, form steps and plans by channel and campaign. Last click per session, no user-level tracking.";
const SOCIAL =
  "The trial started; its channel was not recorded. Measure sign-ups, form steps and plans by campaign without consent loss, and see where the account begins.";

export const metadata: Metadata = {
  // Literal on purpose: generate-og-images.mjs reads the card title from it.
  title: "Analytics for SaaS: Sign-ups by Channel — Sealmetrics",
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
    languages: getAlternates("/for/saas"),
  },
};

export default function SaasPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "For teams", url: "/for" }, { name: "SaaS", url: URL }])} />
      <JsonLd data={speakableWebPageSchema({ url: URL, name: TITLE })} />
      <JsonLd
        data={articleSchema({
          headline: "Analytics for SaaS: sign-ups, form steps and plans by channel, measured without cookies",
          description: DESCRIPTION,
          datePublished: SAAS_PUBLISHED,
          dateModified: SAAS_MODIFIED,
          url: URL,
          category: "Industry",
          author: { name: "Rafa Jiménez", url: "/authors/rafa-jimenez", jobTitle: "Founder, Sealmetrics" },
        })}
      />
      <JsonLd data={faqPageSchema(content.faq, URL)} />
      <JsonLd data={howToSchema({ name: content.method.howToName, description: content.method.howToDescription, url: URL, steps: content.method.steps })} />
      <ProblemLandingSignal content={content} />
    </>
  );
}
