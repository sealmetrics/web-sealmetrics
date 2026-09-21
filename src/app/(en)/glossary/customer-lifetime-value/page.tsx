import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { RelatedGlossaryTerms } from "@/components/ui/RelatedGlossaryTerms";
import { QuickAnswer } from "@/components/ui/QuickAnswer";
import { definedTermSchema, breadcrumbSchema } from "@/lib/schema";
import { getAlternates } from "@/lib/i18n/navigation";
import { CommercialModule } from "@/components/ui/CommercialModule";
import { ogImage } from "@/lib/seo/og";

export const metadata: Metadata = {
  title: "Customer Lifetime Value (LTV) — Sealmetrics Glossary",
  description:
    "LTV is the expected total margin from a customer relationship. How it is calculated, why it belongs in order data, and how biased acquisition data skews it.",
  openGraph: {
    title: "What Is Customer Lifetime Value (LTV)?",
    description: "The expected total margin from a customer relationship — and why it is calculated from order data, not web analytics.",
    type: "article",
    url: "https://sealmetrics.com/glossary/customer-lifetime-value/",
    siteName: "Sealmetrics",
    locale: "en_US",
    images: [ogImage("/glossary/customer-lifetime-value/")],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "What Is Customer Lifetime Value (LTV)?",
    description: "The expected total margin from a customer relationship — and why it is calculated from order data, not web analytics.",
    images: [ogImage("/glossary/customer-lifetime-value/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/glossary/customer-lifetime-value/",
    languages: getAlternates("/glossary/customer-lifetime-value"),
  },
};

export default function CustomerLifetimeValuePage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Glossary", href: "/glossary" }, { label: "Customer Lifetime Value (LTV)" }]} />
      <JsonLd data={definedTermSchema({ name: "Customer Lifetime Value (LTV)", description: "The expected total margin from a customer relationship over its full duration.", url: "/glossary/customer-lifetime-value", related: [{ name: "Return on Ad Spend (ROAS)", url: "/glossary/return-on-ad-spend" }, { name: "Revenue Attribution", url: "/glossary/revenue-attribution" }, { name: "Cohort", url: "/glossary/cohort" }, { name: "Data Loss in Analytics", url: "/glossary/data-loss-in-analytics" }] })} />
      <JsonLd data={breadcrumbSchema([{ name: "Glossary", url: "/glossary" }, { name: "Customer Lifetime Value (LTV)", url: "/glossary/customer-lifetime-value" }])} />
      <article className="pt-12 pb-28 bg-white">
        <div className="max-w-[720px] mx-auto px-5 sm:px-8">

        <header className="mb-12">
          <span className="inline-block text-[0.75rem] font-medium tracking-[0.08em] uppercase text-text-tertiary mb-4">Definition</span>
          <h1 className="font-serif text-[2.5rem] font-medium text-text-primary leading-[1.2] mb-6">Customer Lifetime Value (LTV)</h1>
        </header>

        <div className="space-y-6 text-[1.05rem] leading-[1.8] text-text-body">
          <div className="p-6 bg-warm-white border border-warm-100 rounded-[4px]">
            <p className="text-[1rem] text-text-primary font-medium">
              The expected total margin a customer generates over the full duration of the relationship, not just the first order. The metric that decides how much you can afford to pay for acquisition.
            </p>
          </div>

          <QuickAnswer>
            <p>
              Customer lifetime value (LTV) is the total margin a business expects from a customer relationship over its whole duration. A common retail formula is average order value × purchase frequency × gross margin × expected customer lifespan; subscription businesses divide margin per period by churn. LTV matters because it sets the ceiling on acquisition cost: a customer worth €300 over three years justifies spend that a €60 first order never would. It is properly calculated from order and CRM data, where a customer identity persists across years — not from web analytics, where cookie identifiers are deleted, blocked or expired within days. Web analytics contributes the acquisition side of the equation: which channels the orders came from. That input is only reliable when it covers 100% of orders, not the consenting fraction.
            </p>
          </QuickAnswer>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">How LTV is calculated</h2>
          <p>
            The classic eCommerce version multiplies average order value by purchase frequency per year, gross margin, and expected years of relationship. A customer averaging €80 per order, 2.5 orders a year, at 40% margin, retained for 3 years, is worth €240. Subscription businesses use margin per period divided by churn rate. Sophisticated teams compute it per <Link href="/glossary/cohort" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">cohort</Link> — customers acquired in the same period, tracked together in the order database — because LTV averaged across all customers hides whether recent acquisition is getting better or worse.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">Why LTV lives in order data, not web analytics</h2>
          <p>
            LTV needs an identity that survives years: the same customer recognised across every purchase. Order systems have one — an email address or account. Browser-based analytics does not: cookies are capped at days in Safari, never set at all for visitors who reject consent (in our experience with clients, between 40% and 60% of traffic), and never shared across devices. Any &ldquo;LTV&rdquo; a web analytics tool reports is really per-browser value over a cookie&rsquo;s lifespan, which systematically undercounts. This is a structural limit, not a vendor flaw — and it is why Sealmetrics, which measures anonymously and keeps no per-user identifier at all, does not claim to compute LTV. The order database owns the metric.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">Where analytics data still distorts LTV decisions</h2>
          <p>
            The operative question behind LTV is LTV by acquisition channel: which sources bring customers who reorder, so acquisition budget can follow them. The lifetime margin comes from order data, but the channel label comes from analytics — and if that analytics only observed the consenting minority, the join is biased before it starts. Orders whose acquisition source went unmeasured land in a misleading &ldquo;direct&rdquo; bucket, and channel-level LTV inherits the distortion. <Link href="/glossary/revenue-attribution" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">Revenue attribution</Link> without consent gaps — last-click, at channel level — gives the LTV model an acquisition input that reflects all customers, not the measurable ones.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">What LTV does not tell you</h2>
          <p>
            LTV is a projection, not a fact: it extrapolates future behaviour from past cohorts, and a pricing change, product shift or churn spike invalidates the history it rests on. It also says nothing on its own about how much profit acquisition generates — that requires pairing it with acquisition cost per channel. And a high average LTV can mask a wide spread where a small group of loyal customers subsidises many one-time buyers.
          </p>
        </div>

        <CommercialModule hook="LTV by channel is only as good as the channel data under it. Feed the model acquisition sources without consent gaps, not the consenting minority." />

        <RelatedGlossaryTerms slug="customer-lifetime-value" />

        <div className="mt-10 pt-6 border-t border-warm-100">
          <p className="text-[0.85rem] text-text-tertiary">
            Learn more: <Link href="/blog/cookieless-analytics-for-ecommerce" className="text-text-secondary no-underline border-b border-warm-200 pb-0.5 hover:text-text-primary transition-colors">Cookieless Analytics for eCommerce</Link> &middot; <Link href="/product" className="text-text-secondary no-underline border-b border-warm-200 pb-0.5 hover:text-text-primary transition-colors">Sealmetrics Product</Link>
          </p>
        </div>
      </div>
    </article>
    </>
  );
}
