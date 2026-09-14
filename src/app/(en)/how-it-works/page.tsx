import type { Metadata } from "next";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbSchema, faqPageSchema, speakableWebPageSchema } from "@/lib/schema";
import { getAlternates } from "@/lib/i18n/navigation";
import { HowItWorksSignal, howItWorksFaqItems } from "@/components/v4/HowItWorksSignal";
import "@/components/v4/how-it-works-signal.css";
import "@/components/v4/signal-answer.css";
import { ogImage } from "@/lib/seo/og";

export const metadata: Metadata = {
  title: "How Sealmetrics Works — First-party, Cookieless, EU-hosted",
  description:
    "First-party 846-byte pixel. Anonymous server-side event counting. Dublin-hosted storage. Designed for GDPR from the architecture up, not by a compliance layer.",
  openGraph: {
    title: "How Sealmetrics Works — First-party, Cookieless, EU-hosted",
    description:
      "Three layers. One pipeline. How Sealmetrics counts your traffic anonymously, without depending on consent, cookies or user tracking.",
    type: "website",
    images: [ogImage("/how-it-works/")],
    url: "https://sealmetrics.com/how-it-works/",
    siteName: "Sealmetrics",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "How Sealmetrics Works — First-party, Cookieless, EU-hosted",
    description: "Three layers. One pipeline. How Sealmetrics counts your traffic anonymously, without depending on consent, cookies or user tracking.",
    images: [ogImage("/how-it-works/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/how-it-works/",
    languages: getAlternates("/how-it-works"),
  },
};

export default function HowItWorksPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "How it works", url: "/how-it-works" }])} />
      <JsonLd data={speakableWebPageSchema({ url: "/how-it-works", name: "How it works — Sealmetrics" })} />
      <JsonLd data={faqPageSchema(howItWorksFaqItems.en, "/how-it-works")} />
      <HowItWorksSignal locale="en" />
    </>
  );
}
