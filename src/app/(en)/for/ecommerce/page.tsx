import type { Metadata } from "next";
import { JsonLd } from "@/components/ui/JsonLd";
import { articleSchema, breadcrumbSchema, faqPageSchema, howToSchema, quotationSchema, speakableWebPageSchema } from "@/lib/schema";
import { getAlternates } from "@/lib/i18n/navigation";
import { ProblemLandingSignal } from "@/components/v4/ProblemLandingSignal";
import { ECOMMERCE_MODIFIED, ECOMMERCE_PUBLISHED, ecommerceEn as content } from "@/lib/content/problem-landings/ecommerce";
import "@/components/v4/problem-landing-signal.css";
import "@/components/v4/signal-answer.css";
import { ogImage } from "@/lib/seo/og";

const URL = "/for/ecommerce";
const TITLE = "Analytics for eCommerce: Revenue by Channel — Sealmetrics";
const DESCRIPTION =
  "Cookieless analytics for eCommerce: revenue by channel, funnel and product, checked against your store's orders. Incapto: 96% of orders recorded.";
const SOCIAL =
  "Your store knows what sold, not who sold it. Read channels, the purchase funnel and products by channel without consent loss, reconciled with your orders.";

export const metadata: Metadata = {
  // Literal on purpose: generate-og-images.mjs reads the card title from it.
  title: "Analytics for eCommerce: Revenue by Channel — Sealmetrics",
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
    languages: getAlternates("/for/ecommerce"),
  },
};

export default function EcommercePage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "For teams", url: "/for" }, { name: "eCommerce", url: URL }])} />
      <JsonLd data={speakableWebPageSchema({ url: URL, name: TITLE })} />
      <JsonLd
        data={articleSchema({
          headline: "Analytics for eCommerce: revenue by channel, funnel and product, reconciled with the store",
          description: DESCRIPTION,
          datePublished: ECOMMERCE_PUBLISHED,
          dateModified: ECOMMERCE_MODIFIED,
          url: URL,
          category: "Industry",
          author: { name: "Rafa Jiménez", url: "/authors/rafa-jimenez", jobTitle: "Founder, Sealmetrics" },
        })}
      />
      <JsonLd data={faqPageSchema(content.faq, URL)} />
      <JsonLd data={howToSchema({ name: content.method.howToName, description: content.method.howToDescription, url: URL, steps: content.method.steps })} />
      {content.proof.quote && <JsonLd data={quotationSchema({ text: content.proof.quote.text, spokenBy: content.proof.quote.person, spokenByRole: content.proof.quote.role, url: URL })} />}
      <ProblemLandingSignal content={content} />
    </>
  );
}
