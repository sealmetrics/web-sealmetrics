import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { RelatedGlossaryTerms } from "@/components/ui/RelatedGlossaryTerms";
import { definedTermSchema, breadcrumbSchema } from "@/lib/schema";
import { getAlternates } from "@/lib/i18n/navigation";
import { CommercialModule } from "@/components/ui/CommercialModule";
import { ogImage } from "@/lib/seo/og";

export const metadata: Metadata = {
  title: "Data Sampling in Analytics: What It Is & Why It Skews Data",
  description:
    "See how data sampling in cookie-based analytics tools affects reporting — and how full-resolution tracking records every session, no estimates.",
  openGraph: {
    title: "What Is Data Sampling in Analytics?",
    description: "Data sampling analyzes a subset of data and extrapolates. Learn how it affects reporting in cookie-based analytics tools.",
    type: "article",
    url: "https://sealmetrics.com/glossary/data-sampling/",
    siteName: "Sealmetrics",
    locale: "en_US",
    images: [ogImage("/glossary/data-sampling/")],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "What Is Data Sampling in Analytics?",
    description: "Data sampling analyzes a subset of data and extrapolates. Learn how it affects reporting in cookie-based analytics tools.",
    images: [ogImage("/glossary/data-sampling/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/glossary/data-sampling/",
    // The Spanish page points here; without the return link the hreflang
    // pair is one-sided and Google discards it.
    languages: getAlternates("/glossary/data-sampling"),
  },
};

export default function DataSamplingPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Glossary", href: "/glossary" }, { label: "Data Sampling" }]} />
      <JsonLd data={definedTermSchema({ name: "Data Sampling", description: "A technique where analytics tools analyze a subset of data and extrapolate results.", url: "/glossary/data-sampling", related: [{ name: "Data Loss in Analytics", url: "/glossary/data-loss-in-analytics" }, { name: "Event Tracking", url: "/glossary/event-tracking" }, { name: "Bounce Rate", url: "/glossary/bounce-rate" }, { name: "Revenue Attribution", url: "/glossary/revenue-attribution" }] })} />
      <JsonLd data={breadcrumbSchema([{ name: "Glossary", url: "/glossary" }, { name: "Data Sampling", url: "/glossary/data-sampling" }])} />
      <article className="pt-12 pb-28 bg-white">
        <div className="max-w-[720px] mx-auto px-5 sm:px-8">

        <header className="mb-12">
          <span className="inline-block text-[0.75rem] font-medium tracking-[0.08em] uppercase text-text-tertiary mb-4">Definition</span>
          <h1 className="font-serif text-[2.5rem] font-medium text-text-primary leading-[1.2] mb-6">Data Sampling</h1>
        </header>

        <div className="space-y-6 text-[1.05rem] leading-[1.8] text-text-body">
          <div className="p-6 bg-warm-white border border-warm-100 rounded-[4px]">
            <p className="text-[1rem] text-text-primary font-medium">
              A technique where analytics tools analyze a subset of data and extrapolate results to the full dataset. Introduces estimation error that grows with the degree of sampling applied.
            </p>
          </div>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">How sampling works in cookie-based analytics tools</h2>
          <p>
            When you create exploration reports in cookie-based analytics tools that query large volumes of data, the platform may analyze only a portion of events and use statistical methods to estimate the full result. Free tiers typically have lower sampling thresholds than paid enterprise tiers, meaning sampling activates sooner for most businesses.
          </p>
          <p>
            Some tools indicate when sampling is active through a visual indicator in exploration reports. Standard reports often use a different methodology that combines observed and modeled data, sometimes without clearly flagging it to the user.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">Why it matters</h2>
          <p>
            For high-level trends, sampling may be acceptable. For specific analyses — campaign performance by segment, conversion path analysis, <Link href="/glossary/revenue-attribution" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">revenue attribution</Link> by creative — the margin of error can lead to wrong conclusions and misallocated budgets.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">The alternative: full-resolution analytics</h2>
          <p>
            <Link href="/glossary/cookieless-analytics" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">Cookieless analytics</Link> platforms like Sealmetrics record every session individually with no sampling applied. When you see 72,847 visitors, that number represents 72,847 actual sessions — not a statistical estimate.
          </p>
        </div>

        <CommercialModule hook="Sealmetrics never samples — every report is computed on every session, not a statistical estimate. See your own reports at full resolution." />

        <RelatedGlossaryTerms slug="data-sampling" />

        <div className="mt-10 pt-6 border-t border-warm-100">
          <p className="text-[0.85rem] text-text-tertiary">
            Learn more: <Link href="/blog/ga4-data-sampling-problem" className="text-text-secondary no-underline border-b border-warm-200 pb-0.5 hover:text-text-primary transition-colors">Why Sampling Distorts Your Traffic Numbers</Link> &middot; <Link href="/product" className="text-text-secondary no-underline border-b border-warm-200 pb-0.5 hover:text-text-primary transition-colors">Sealmetrics Product</Link>
          </p>
        </div>
      </div>
    </article>
    </>
  );
}
