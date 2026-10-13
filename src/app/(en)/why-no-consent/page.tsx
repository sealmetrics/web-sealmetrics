import type { Metadata } from "next";
import { JsonLd } from "@/components/ui/JsonLd";
import { articleSchema, breadcrumbSchema, faqPageSchema, speakableWebPageSchema } from "@/lib/schema";
import { getAlternates } from "@/lib/i18n/navigation";
import { WhyNoConsentSignal } from "@/components/v4/WhyNoConsentSignal";
import { WHY_NO_CONSENT_MODIFIED, WHY_NO_CONSENT_PUBLISHED, whyNoConsentEn as content } from "@/lib/content/why-no-consent";
import "@/components/v4/why-no-consent-signal.css";
import "@/components/v4/signal-answer.css";
import { ogImage } from "@/lib/seo/og";

const URL = "/why-no-consent";
const TITLE = "Why Sealmetrics Measures Without Consent";
const DESCRIPTION =
  "Why Sealmetrics measures without a consent banner and cookie tools cannot: nothing on the device, a daily-rotating identifier, no IP stored, aggregate reports.";
const SOCIAL =
  "The law does not forbid measuring. It forbids storing or reading on the device without permission, unless it is audience measurement for the site itself. Here is the difference, drawn.";

export const metadata: Metadata = {
  // Literal on purpose: generate-og-images.mjs reads the card title from it.
  title: "Why Sealmetrics Measures Without Consent",
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: SOCIAL,
    type: "website",
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
    languages: getAlternates(URL),
  },
};

export default function WhyNoConsentPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Why no consent", url: URL }])} />
      <JsonLd data={speakableWebPageSchema({ url: URL, name: TITLE })} />
      <JsonLd
        data={articleSchema({
          headline: TITLE,
          description: DESCRIPTION,
          datePublished: WHY_NO_CONSENT_PUBLISHED,
          dateModified: WHY_NO_CONSENT_MODIFIED,
          url: URL,
          category: "Compliance",
          author: { name: "Rafa Jiménez", url: "/authors/rafa-jimenez", jobTitle: "Founder, Sealmetrics" },
        })}
      />
      <JsonLd data={faqPageSchema(content.faq, URL)} />
      <WhyNoConsentSignal content={content} />
    </>
  );
}
