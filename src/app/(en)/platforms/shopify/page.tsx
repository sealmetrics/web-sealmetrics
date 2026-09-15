import type { Metadata } from "next";
import { JsonLd } from "@/components/ui/JsonLd";
import { articleSchema, breadcrumbSchema, faqPageSchema, howToSchema, quotationSchema, speakableWebPageSchema } from "@/lib/schema";
import { getAlternates } from "@/lib/i18n/navigation";
import { ProblemLandingSignal } from "@/components/v4/ProblemLandingSignal";
import { SHOPIFY_MODIFIED, SHOPIFY_PUBLISHED, shopifyEn as content } from "@/lib/content/problem-landings/shopify";
import "@/components/v4/problem-landing-signal.css";
import "@/components/v4/signal-answer.css";
import { ogImage } from "@/lib/seo/og";

const URL = "/platforms/shopify";
const TITLE = "Shopify Analytics Without Cookies — Sealmetrics";
const DESCRIPTION =
  "Cookieless Shopify analytics: a Pixel app and theme embed, purchases confirmed by webhook, and a 48-day test that recorded 96% of real orders.";
const SOCIAL =
  "On Incapto's Shopify store, GA4 missed 29% of visits. Install Sealmetrics on any plan and see the channels behind every Shopify order.";

export const metadata: Metadata = {
  // Literal on purpose: generate-og-images.mjs reads the card title from it.
  title: "Shopify Analytics Without Cookies — Sealmetrics",
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
    languages: getAlternates("/platforms/shopify"),
  },
};

export default function ShopifyPlatformPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Platforms", url: "/platforms" }, { name: "Shopify", url: URL }])} />
      <JsonLd data={speakableWebPageSchema({ url: URL, name: TITLE })} />
      <JsonLd
        data={articleSchema({
          headline: "Shopify analytics without cookies: install, events, reconciliation and the Incapto measurement",
          description: DESCRIPTION,
          datePublished: SHOPIFY_PUBLISHED,
          dateModified: SHOPIFY_MODIFIED,
          url: URL,
          category: "Integration",
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
