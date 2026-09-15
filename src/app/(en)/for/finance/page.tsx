import type { Metadata } from "next";
import { JsonLd } from "@/components/ui/JsonLd";
import { articleSchema, breadcrumbSchema, faqPageSchema, howToSchema, speakableWebPageSchema } from "@/lib/schema";
import { getAlternates } from "@/lib/i18n/navigation";
import { ProblemLandingSignal } from "@/components/v4/ProblemLandingSignal";
import { FINANCE_MODIFIED, FINANCE_PUBLISHED, financeEn as content } from "@/lib/content/problem-landings/finance";
import "@/components/v4/problem-landing-signal.css";
import "@/components/v4/signal-answer.css";
import { ogImage } from "@/lib/seo/og";

const URL = "/for/finance";
const TITLE = "Analytics for Finance: Leads by Channel — Sealmetrics";
const DESCRIPTION =
  "Cookieless analytics for banks, insurers and lenders: applications by channel, with the DPA, data inventory and security measures a vendor review asks for.";
const SOCIAL =
  "The form is submitted, the channel is not on record. Measure applications by channel without cookies, and review the vendor on documents first.";

export const metadata: Metadata = {
  // Literal on purpose: generate-og-images.mjs reads the card title from it.
  title: "Analytics for Finance: Leads by Channel — Sealmetrics",
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
    languages: getAlternates("/for/finance"),
  },
};

export default function FinancePage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "For teams", url: "/for" }, { name: "Finance", url: URL }])} />
      <JsonLd data={speakableWebPageSchema({ url: URL, name: TITLE })} />
      <JsonLd
        data={articleSchema({
          headline: "Analytics for financial services: applications by channel, reviewed on documents",
          description: DESCRIPTION,
          datePublished: FINANCE_PUBLISHED,
          dateModified: FINANCE_MODIFIED,
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
