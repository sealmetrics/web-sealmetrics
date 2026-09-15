import type { Metadata } from "next";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbSchema, faqPageSchema, howToSchema, itemListSchema, speakableWebPageSchema } from "@/lib/schema";
import { getAlternates } from "@/lib/i18n/navigation";
import { ProblemLandingSignal } from "@/components/v4/ProblemLandingSignal";
import { gdprAnalyticsEn as content } from "@/lib/content/problem-landings/gdpr-analytics";
import "@/components/v4/problem-landing-signal.css";
import "@/components/v4/signal-answer.css";
import { ogImage } from "@/lib/seo/og";

const URL = "/gdpr-analytics";
const TITLE = "GDPR Analytics Without Cookies: Evidence for Your DPO";
const DESCRIPTION =
  "European analytics you can prove compliant: no cookies, no personal data stored, EU-hosted. The DPA, a review checklist and CNIL, DSK and AEPD analyses.";
const SOCIAL =
  "A banner or a badge will not survive a DPO review. What Sealmetrics collects, where it goes, for how long, and how it reads against each regulator.";

export const metadata: Metadata = {
  // Literal on purpose: generate-og-images.mjs reads the card title from it.
  title: "GDPR Analytics Without Cookies: Evidence for Your DPO",
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
    languages: getAlternates("/gdpr-analytics"),
  },
};

export default function GdprAnalyticsHub() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "GDPR analytics", url: URL }])} />
      <JsonLd data={speakableWebPageSchema({ url: URL, name: TITLE })} />
      <JsonLd
        data={itemListSchema({
          name: "GDPR analytics, regulator by regulator",
          description: "Analyses of how Sealmetrics is built against the published criteria of the CNIL, the DSK, the AEPD and the UK ICO.",
          url: URL,
          items: content.roles.items.map((item) => ({ name: item.link.label, url: `https://sealmetrics.com${item.link.href}` })),
        })}
      />
      <JsonLd data={faqPageSchema(content.faq, URL)} />
      <JsonLd data={howToSchema({ name: content.method.howToName, description: content.method.howToDescription, url: URL, steps: content.method.steps })} />
      <ProblemLandingSignal content={content} />
    </>
  );
}
