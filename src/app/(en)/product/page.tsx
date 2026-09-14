import type { Metadata } from "next";
import { JsonLd } from "@/components/ui/JsonLd";
import { softwareApplicationSchema, breadcrumbSchema, speakableWebPageSchema } from "@/lib/schema";
import { getAlternates } from "@/lib/i18n/navigation";
import { ProductSignal } from "@/components/v4/ProductSignal";
import "@/components/v4/product-signal.css";
import "@/components/v4/signal-answer.css";
import { ogImage } from "@/lib/seo/og";

export const metadata: Metadata = {
  title: "Product — Sealmetrics · Complete analytics, no compromises",
  description:
    "Consentless tracking, last-click revenue attribution, LENS AI, SuperAPI and MCP server — all on observed data without consent gaps. No sampling, no modelling.",
  openGraph: {
    title: "Product — Sealmetrics · Complete analytics, no compromises",
    description:
      "A full analytics stack for eCommerce teams. Consentless, observed server-side, EU-hosted. LENS AI + SuperAPI + MCP native.",
    type: "website",
    images: [ogImage("/product/")],
    url: "https://sealmetrics.com/product/",
    siteName: "Sealmetrics",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Product — Sealmetrics · Complete analytics, no compromises",
    description: "A full analytics stack for eCommerce teams. Consentless, observed server-side, EU-hosted. LENS AI + SuperAPI + MCP native.",
    images: [ogImage("/product/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/product/",
    languages: getAlternates("/product"),
  },
};

export default function ProductPage() {
  return (
    <>
      <JsonLd data={softwareApplicationSchema()} />
      <JsonLd data={breadcrumbSchema([{ name: "Product", url: "/product" }])} />
      <JsonLd data={speakableWebPageSchema({ url: "/product", name: "Product — Sealmetrics" })} />
      <ProductSignal locale="en" />
    </>
  );
}
