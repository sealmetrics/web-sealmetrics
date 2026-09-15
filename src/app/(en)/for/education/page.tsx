import type { Metadata } from "next";
import { JsonLd } from "@/components/ui/JsonLd";
import { articleSchema, breadcrumbSchema, faqPageSchema, howToSchema, speakableWebPageSchema } from "@/lib/schema";
import { getAlternates } from "@/lib/i18n/navigation";
import { ProblemLandingSignal } from "@/components/v4/ProblemLandingSignal";
import { EDUCATION_MODIFIED, EDUCATION_PUBLISHED, educationEn as content } from "@/lib/content/problem-landings/education";
import "@/components/v4/problem-landing-signal.css";
import "@/components/v4/signal-answer.css";
import { ogImage } from "@/lib/seo/og";

const URL = "/for/education";
const TITLE = "Analytics for Education: Enquiries by Channel — Sealmetrics";
const DESCRIPTION =
  "Cookieless analytics for universities and EdTech: enquiries and applications by channel, in aggregate, with no age, name or email collected from any visitor.";
const SOCIAL =
  "Count enquiries, not the students behind them. Measure enquiries and applications by channel without cookies, on an audience that includes minors.";

export const metadata: Metadata = {
  // Literal on purpose: generate-og-images.mjs reads the card title from it.
  title: "Analytics for Education: Enquiries by Channel — Sealmetrics",
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
    languages: getAlternates("/for/education"),
  },
};

export default function EducationPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "For teams", url: "/for" }, { name: "Education", url: URL }])} />
      <JsonLd data={speakableWebPageSchema({ url: URL, name: TITLE })} />
      <JsonLd
        data={articleSchema({
          headline: "Analytics for education: enquiries and applications by channel, without personal data",
          description: DESCRIPTION,
          datePublished: EDUCATION_PUBLISHED,
          dateModified: EDUCATION_MODIFIED,
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
