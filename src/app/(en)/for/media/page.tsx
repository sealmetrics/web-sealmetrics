import type { Metadata } from "next";
import { JsonLd } from "@/components/ui/JsonLd";
import { articleSchema, breadcrumbSchema, faqPageSchema, howToSchema, speakableWebPageSchema } from "@/lib/schema";
import { getAlternates } from "@/lib/i18n/navigation";
import { ProblemLandingSignal } from "@/components/v4/ProblemLandingSignal";
import { MEDIA_MODIFIED, MEDIA_PUBLISHED, mediaEn as content } from "@/lib/content/problem-landings/media";
import "@/components/v4/problem-landing-signal.css";
import "@/components/v4/signal-answer.css";
import { ogImage } from "@/lib/seo/og";

const URL = "/for/media";
const TITLE = "Analytics for Media and Publishers — Sealmetrics";
const DESCRIPTION =
  "Cookieless analytics for publishers: sections, channels, newsletter and subscription sign-ups, served from your own subdomain to reduce ad-blocker loss.";
const SOCIAL =
  "The article was read; the report missed it. Count readers by section and channel without cookies, from your own subdomain, and see which visits sign up.";

export const metadata: Metadata = {
  // Literal on purpose: generate-og-images.mjs reads the card title from it.
  title: "Analytics for Media and Publishers — Sealmetrics",
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
    languages: getAlternates("/for/media"),
  },
};

export default function MediaPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "For teams", url: "/for" }, { name: "Media", url: URL }])} />
      <JsonLd data={speakableWebPageSchema({ url: URL, name: TITLE })} />
      <JsonLd
        data={articleSchema({
          headline: "Analytics for media and publishers: sections, channels and sign-ups, counted without cookies",
          description: DESCRIPTION,
          datePublished: MEDIA_PUBLISHED,
          dateModified: MEDIA_MODIFIED,
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
