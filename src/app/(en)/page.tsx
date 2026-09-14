import type { Metadata } from "next";
import { JsonLd } from "@/components/ui/JsonLd";
import { SignalHome, signalHomeFaqs } from "@/components/v4/SignalHome";
import "@/components/v4/signal-home.css";
import "@/components/v4/signal-answer.css";
import {
  softwareApplicationSchema,
  statisticClaimSchema,
  quotationSchema,
  speakableWebPageSchema,
  faqPageSchema,
} from "@/lib/schema";
import { getAlternates } from "@/lib/i18n/navigation";
import { ogImage } from "@/lib/seo/og";

export const metadata: Metadata = {
  title: "Sealmetrics — Consentless analytics for eCommerce",
  description:
    "Consentless analytics for eCommerce. Measure traffic without consent gaps — no cookies, no models. Recover the sales GA4 can't see. EU-hosted in Dublin.",
  openGraph: {
    title: "Sealmetrics — Consentless analytics for eCommerce",
    description:
      "Measure traffic without consent gaps. No cookies. No models. Present board-ready numbers that match Shopify. EU-hosted in Dublin.",
    type: "website",
    images: [ogImage("/")],
    url: "https://sealmetrics.com/",
    siteName: "Sealmetrics",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Sealmetrics — Consentless analytics for eCommerce",
    description: "Measure traffic without consent gaps. No cookies. No models. Present board-ready numbers that match Shopify. EU-hosted in Dublin.",
    images: [ogImage("/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/",
    languages: getAlternates("/"),
  },
};

export default function Home() {
  return (
    <>
      <JsonLd data={softwareApplicationSchema()} />
      <JsonLd data={faqPageSchema(signalHomeFaqs, "/")} />
      <JsonLd data={speakableWebPageSchema({ url: "/", name: "Sealmetrics — complete data for eCommerce" })} />
      <JsonLd data={statisticClaimSchema({
        text: "40% of inbound traffic had no source/medium attribution in the previous measurement stack.",
        source: "Palladium Hotel Group internal audit on traffic attribution",
        sourceAuthor: "Palladium Hotel Group",
        sourceDate: "2026-04-15",
        url: "/",
        numericValue: 40,
        unit: "PERCENT",
      })} />
      <JsonLd data={statisticClaimSchema({
        text: "35% of bookings recorded in GA4 could not be assigned to the channel that generated them.",
        source: "Palladium Hotel Group bookings attribution gap",
        sourceAuthor: "Palladium Hotel Group",
        sourceDate: "2026-04-15",
        url: "/",
        numericValue: 35,
        unit: "PERCENT",
      })} />
      <JsonLd data={statisticClaimSchema({
        text: "+165% improvement in Cost-per-Search on Display after applying a Sealmetrics-based measurement model on DV360.",
        source: "Palladium Hotel Group DV360 efficiency improvement",
        sourceAuthor: "Palladium Hotel Group",
        sourceDate: "2026-04-15",
        url: "/",
        numericValue: 165,
        unit: "PERCENT",
      })} />
      <JsonLd data={quotationSchema({
        text: "The data Sealmetrics delivers is agnostic, unbiased and neutral. There's no black box.",
        spokenBy: "Toni Andújar",
        spokenByRole: "Digital & Direct Sales Director, Palladium Hotel Group",
        url: "/",
      })} />
      <JsonLd data={quotationSchema({
        text: "It's no longer a tool that sits next to the process. It's the tool that gives us the real data — and the one we make decisions with.",
        spokenBy: "Eduardo Martin",
        spokenByRole: "Analytics & Campaigns, Dreamplace Hotels",
        url: "/",
      })} />
      <SignalHome />
    </>
  );
}
