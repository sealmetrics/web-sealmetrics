import type { Metadata } from "next";
import { JsonLd } from "@/components/ui/JsonLd";
import { articleSchema, breadcrumbSchema, faqPageSchema, howToSchema, quotationSchema, speakableWebPageSchema } from "@/lib/schema";
import { getAlternates } from "@/lib/i18n/navigation";
import { ProblemLandingSignal } from "@/components/v4/ProblemLandingSignal";
import { PRESTASHOP_PUBLISHED, prestashopEn as content } from "@/lib/content/problem-landings/prestashop";
import "@/components/v4/problem-landing-signal.css";
import "@/components/v4/signal-answer.css";
import { ogImage } from "@/lib/seo/og";

const URL = "/platforms/prestashop";
const TITLE = "PrestaShop Analytics Without Cookies — Sealmetrics";
const DESCRIPTION =
  "Cookieless PrestaShop analytics: a module for 1.7+ and 8.x that tracks product views, cart, checkout and purchases, with content groups and no cookies.";
const SOCIAL =
  "A consent-gated tag loses the shoppers who reject the banner. Install the Sealmetrics module and see the channels behind every PrestaShop order.";

export const metadata: Metadata = {
  // Literal on purpose: generate-og-images.mjs reads the card title from it.
  title: "PrestaShop Analytics Without Cookies — Sealmetrics",
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
    languages: getAlternates("/platforms/prestashop"),
  },
};

export default function PrestaShopPlatformPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Platforms", url: "/platforms" }, { name: "PrestaShop", url: URL }])} />
      <JsonLd data={speakableWebPageSchema({ url: URL, name: TITLE })} />
      <JsonLd
        data={articleSchema({
          headline: "PrestaShop analytics without cookies: install, events, reconciliation and limits",
          description: DESCRIPTION,
          datePublished: PRESTASHOP_PUBLISHED,
          dateModified: PRESTASHOP_PUBLISHED,
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
