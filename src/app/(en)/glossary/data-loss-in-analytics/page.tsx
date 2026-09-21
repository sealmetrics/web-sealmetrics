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
  title: "What Is Data Loss in Analytics? — Sealmetrics Glossary",
  description:
    "Data loss in analytics is the gap between real traffic and what tools report. It varies by store and channel: at Incapto, GA4 missed 29% of visits.",
  openGraph: {
    title: "What Is Data Loss in Analytics?",
    description: "The gap between real traffic and what analytics tools report. It varies by store and channel; at Incapto, GA4 missed 29% of visits over 48 days.",
    type: "article",
    url: "https://sealmetrics.com/glossary/data-loss-in-analytics/",
    siteName: "Sealmetrics",
    locale: "en_US",
    images: [ogImage("/glossary/data-loss-in-analytics/")],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "What Is Data Loss in Analytics?",
    description: "The gap between real traffic and what analytics tools report. It varies by store and channel; at Incapto, GA4 missed 29% of visits over 48 days.",
    images: [ogImage("/glossary/data-loss-in-analytics/")],
  },
  alternates: { canonical: "https://sealmetrics.com/glossary/data-loss-in-analytics/", languages: getAlternates("/glossary/data-loss-in-analytics") },
};

export default function DataLossPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Glossary", href: "/glossary" }, { label: "Data Loss in Analytics" }]} />
      <JsonLd data={definedTermSchema({ name: "Data Loss in Analytics", description: "The gap between actual website traffic and what analytics tools report.", url: "/glossary/data-loss-in-analytics", related: [{ name: "Ad Blocker Impact on Analytics", url: "/glossary/ad-blocker-analytics-impact" }, { name: "Consent Management Platform (CMP)", url: "/glossary/consent-management-platform" }, { name: "Intelligent Tracking Prevention (ITP)", url: "/glossary/intelligent-tracking-prevention" }, { name: "Data Sampling", url: "/glossary/data-sampling" }, { name: "Cookieless Analytics", url: "/glossary/cookieless-analytics" }] })} />
      <JsonLd data={breadcrumbSchema([{ name: "Glossary", url: "/glossary" }, { name: "Data Loss in Analytics", url: "/glossary/data-loss-in-analytics" }])} />
      <article className="pt-12 pb-28 bg-white">
        <div className="max-w-[720px] mx-auto px-5 sm:px-8">
        <header className="mb-12">
          <span className="inline-block text-[0.75rem] font-medium tracking-[0.08em] uppercase text-text-tertiary mb-4">Definition</span>
          <h1 className="font-serif text-[2.5rem] font-medium text-text-primary leading-[1.2] mb-6">Data Loss in Analytics</h1>
        </header>
        <div className="space-y-6 text-[1.05rem] leading-[1.8] text-text-body">
          <div className="p-6 bg-warm-white border border-warm-100 rounded-[4px]">
            <p className="text-[1rem] text-text-primary font-medium">
              The gap between actual website traffic and what analytics tools report. Caused by consent rejection, ad blockers, browser restrictions, and data sampling. How much depends on the store and the channel; at Incapto, GA4 missed 29% of visits over 48 days.
            </p>
          </div>
          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">Where does data loss come from in cookie-based analytics?</h2>
          <p>Data loss in web analytics is not caused by a single factor. It is a cascade where each loss acts on what the previous one left:</p>
          <div className="p-6 bg-warm-white border border-warm-100 rounded-[4px] my-6 text-[0.9rem] space-y-3">
            <div className="flex justify-between gap-4"><span className="text-text-secondary">Consent banner rejection</span><span className="font-mono text-text-primary text-right">40&ndash;60% of traffic*</span></div>
            <div className="flex justify-between gap-4"><span className="text-text-secondary">Consent given after the landing page (source lost)</span><span className="font-mono text-text-primary text-right">40% of those who accept*</span></div>
            <div className="flex justify-between gap-4"><span className="text-text-secondary">Ad blocker blocking</span><span className="font-mono text-text-primary text-right">Varies by audience</span></div>
            <div className="flex justify-between gap-4"><span className="text-text-secondary"><Link href="/glossary/intelligent-tracking-prevention" className="text-text-primary no-underline border-b border-warm-200 pb-0.5">ITP</Link> / ETP cookie limits</span><span className="font-mono text-text-primary text-right">Breaks returning sessions</span></div>
            <div className="flex justify-between gap-4"><span className="text-text-secondary"><Link href="/glossary/data-sampling" className="text-text-primary no-underline border-b border-warm-200 pb-0.5">Data sampling</Link></span><span className="font-mono text-text-primary text-right">Large explorations</span></div>
            <div className="flex justify-between gap-4 border-t border-warm-100 pt-3"><span className="text-text-primary font-medium">Total gap on your site</span><span className="font-mono text-red-alert font-medium text-right">Measure it</span></div>
            <p className="text-[0.8rem] text-text-tertiary pt-1">* In our experience with clients. Where a site lands depends on sector, brand strength, traffic mix and banner design.</p>
          </div>
          <p>There is no universal figure for the total: GA4 doesn&rsquo;t see part of your traffic, and how much depends on the store and the channel. When Incapto ran GA4 and Sealmetrics side by side on its Shopify store for 48 days, GA4 did not record 29% of visits and 45% of pageviews, and the loss was uneven by channel &mdash; see the <Link href="/case-studies/incapto" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">Incapto case study</Link>.</p>
          <p>Use the <Link href="/data-loss-calculator" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">data loss calculator</Link> to see the specific numbers for your traffic and region.</p>
          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">What is the business impact of analytics data loss?</h2>
          <p>Data loss is not just a measurement problem. It directly affects <Link href="/glossary/revenue-attribution" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">revenue attribution</Link>, campaign optimization, and board reporting. When your analytics show 10,000 visitors but 14,000 actually visited, every decision built on that data is compromised.</p>
        </div>
        <CommercialModule hook="Between consent rejection and ad blockers, GA4 doesn't see part of your visits. Measure your own gap against a count that doesn't depend on consent." />

        <RelatedGlossaryTerms slug="data-loss-in-analytics" />
        <div className="mt-10 pt-6 border-t border-warm-100">
          <p className="text-[0.85rem] text-text-tertiary">
            Learn more: <Link href="/how-it-works" className="text-text-secondary no-underline border-b border-warm-200 pb-0.5 hover:text-text-primary transition-colors">How Sealmetrics Works</Link> &middot; <Link href="/data-loss-calculator" className="text-text-secondary no-underline border-b border-warm-200 pb-0.5 hover:text-text-primary transition-colors">Calculate Your Data Loss</Link> &middot; <Link href="/blog/what-is-data-loss-in-analytics" className="text-text-secondary no-underline border-b border-warm-200 pb-0.5 hover:text-text-primary transition-colors">What Is Data Loss in Analytics?</Link>
          </p>
        </div>
      </div>
    </article>
    </>
  );
}
