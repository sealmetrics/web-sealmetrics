import type { Metadata } from "next";
import { JsonLd } from "@/components/ui/JsonLd";
import { pricingSchema, breadcrumbSchema, softwareApplicationSchema, faqPageSchema } from "@/lib/schema";
import { getAlternates } from "@/lib/i18n/navigation";
import { PricingSignal } from "@/components/v4/PricingSignal";
import { pricingSignalFaqItems } from "@/lib/content/pricing-signal";
import "@/components/v4/pricing-signal.css";
import "@/components/v4/signal-answer.css";
import { ogImage } from "@/lib/seo/og";

export const metadata: Metadata = {
  title: "Sealmetrics Pricing — Pay for humans, not bots",
  description:
    "Free Agentic tier up to 1M events in total, set up from your AI assistant. Paid plans from €499/mo annual, every feature on every plan.",
  openGraph: {
    title: "Sealmetrics Pricing — Pay for humans, not bots",
    description:
      "Complete analytics from €499/mo. Every feature in every plan. AI agents free. 14-day trial.",
    type: "website",
    images: [ogImage("/pricing/")],
    url: "https://sealmetrics.com/pricing/",
    siteName: "Sealmetrics",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Sealmetrics Pricing — Pay for humans, not bots",
    description: "Complete analytics from €499/mo. Every feature in every plan. AI agents free. 14-day trial.",
    images: [ogImage("/pricing/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/pricing/",
    languages: getAlternates("/pricing"),
  },
};

export default function PricingPage() {
  return (
    <>
      <JsonLd data={pricingSchema([
        { name: "Agentic", price: "0", description: "1M human events in total · free · set up from your AI assistant" },
        { name: "Growth", price: "499", description: "5M human events/mo · annual billing" },
        { name: "Scale", price: "899", description: "15M human events/mo · annual billing" },
      ])} />
      <JsonLd data={softwareApplicationSchema()} />
      <JsonLd data={breadcrumbSchema([{ name: "Pricing", url: "/pricing" }])} />
      <JsonLd data={faqPageSchema(pricingSignalFaqItems.en, "/pricing")} />
      <PricingSignal locale="en" />
    </>
  );
}
