import type { Metadata } from "next";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbSchema, faqPageSchema, howToSchema, quotationSchema, speakableWebPageSchema } from "@/lib/schema";
import { getAlternates } from "@/lib/i18n/navigation";
import { ProblemLandingSignal } from "@/components/v4/ProblemLandingSignal";
import { singleSourceOfTruthEn as content } from "@/lib/content/problem-landings/single-source-of-truth";
import "@/components/v4/problem-landing-signal.css";
import "@/components/v4/signal-answer.css";
import { ogImage } from "@/lib/seo/og";

const URL = "/use-cases/single-source-of-truth";

export const metadata: Metadata = {
  title: "Single Source of Truth for Marketing Data — Sealmetrics",
  description:
    "Why ad platforms, GA4, the CRM and finance report different numbers, and how to reconcile them to one total every team accepts. With measured cases.",
  openGraph: {
    title: "Single Source of Truth for Marketing Data — Sealmetrics",
    description:
      "Marketing, agency, analytics and finance read four different numbers. How to anchor them to the orders that happened, and what that does not fix.",
    type: "website",
    images: [ogImage(`${URL}/`)],
    url: `https://sealmetrics.com${URL}/`,
    siteName: "Sealmetrics",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Single Source of Truth for Marketing Data — Sealmetrics",
    description:
      "Marketing, agency, analytics and finance read four different numbers. How to anchor them to the orders that happened, and what that does not fix.",
    images: [ogImage(`${URL}/`)],
  },
  alternates: {
    canonical: `https://sealmetrics.com${URL}/`,
    languages: getAlternates(URL),
  },
};

export default function SingleSourceOfTruthPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Use cases", url: "/use-cases" }, { name: "Single source of truth", url: URL }])} />
      <JsonLd data={speakableWebPageSchema({ url: URL, name: "Single Source of Truth for Marketing Data — Sealmetrics" })} />
      <JsonLd data={faqPageSchema(content.faq, URL)} />
      <JsonLd data={howToSchema({ name: content.method.howToName, description: content.method.howToDescription, url: URL, steps: content.method.steps })} />
      <JsonLd data={quotationSchema({ text: content.proof.quote, spokenBy: content.proof.citePerson, spokenByRole: content.proof.citeRole, url: URL })} />
      <ProblemLandingSignal content={content} />
    </>
  );
}
