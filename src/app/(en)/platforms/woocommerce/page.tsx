import type { Metadata } from "next";
import { JsonLd } from "@/components/ui/JsonLd";
import { articleSchema, breadcrumbSchema, faqPageSchema, howToSchema, quotationSchema, speakableWebPageSchema } from "@/lib/schema";
import { getAlternates } from "@/lib/i18n/navigation";
import { ProblemLandingSignal } from "@/components/v4/ProblemLandingSignal";
import { WOOCOMMERCE_MODIFIED, WOOCOMMERCE_PUBLISHED, woocommerceEn as content } from "@/lib/content/problem-landings/woocommerce";
import "@/components/v4/problem-landing-signal.css";
import "@/components/v4/signal-answer.css";
import { ogImage } from "@/lib/seo/og";

const URL = "/platforms/woocommerce";
const TITLE = "WooCommerce Analytics Without Cookies — Sealmetrics";
const DESCRIPTION =
  "Cookieless WooCommerce analytics: a WordPress plugin that tracks the full funnel, content groups, brands and variations, with no cookie or customer data.";
const SOCIAL =
  "A consent-gated tag loses the shoppers who reject the banner. Install the Sealmetrics plugin and see the channels behind every WooCommerce order.";

export const metadata: Metadata = {
  // Literal on purpose: generate-og-images.mjs reads the card title from it.
  title: "WooCommerce Analytics Without Cookies — Sealmetrics",
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
    languages: getAlternates("/platforms/woocommerce"),
  },
};

export default function WooCommercePlatformPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Platforms", url: "/platforms" }, { name: "WooCommerce", url: URL }])} />
      <JsonLd data={speakableWebPageSchema({ url: URL, name: TITLE })} />
      <JsonLd
        data={articleSchema({
          headline: "WooCommerce analytics without cookies: install, events, reconciliation and limits",
          description: DESCRIPTION,
          datePublished: WOOCOMMERCE_PUBLISHED,
          dateModified: WOOCOMMERCE_MODIFIED,
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
