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
  title: "What Is Multi-Touch Attribution? — Sealmetrics Glossary",
  description:
    "Multi-touch attribution splits conversion credit across visitor touchpoints. It requires per-user tracking; Sealmetrics uses last-click only.",
  openGraph: {
    title: "What Is Multi-Touch Attribution?",
    description: "An attribution model that requires per-user tracking. Sealmetrics does last-click only, at channel level.",
    type: "article",
    url: "https://sealmetrics.com/glossary/multi-touch-attribution/",
    siteName: "Sealmetrics",
    locale: "en_US",
    images: [ogImage("/glossary/multi-touch-attribution/")],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "What Is Multi-Touch Attribution?",
    description: "An attribution model that requires per-user tracking. Sealmetrics does last-click only, at channel level.",
    images: [ogImage("/glossary/multi-touch-attribution/")],
  },
  alternates: { canonical: "https://sealmetrics.com/glossary/multi-touch-attribution/", languages: getAlternates("/glossary/multi-touch-attribution") },
};

export default function MultiTouchAttributionPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Glossary", href: "/glossary" }, { label: "Multi-Touch Attribution" }]} />
      <JsonLd data={definedTermSchema({ name: "Multi-Touch Attribution", description: "An attribution model that distributes conversion credit across multiple touchpoints.", url: "/glossary/multi-touch-attribution", related: [{ name: "Attribution Model", url: "/glossary/attribution-model" }, { name: "Revenue Attribution", url: "/glossary/revenue-attribution" }, { name: "Event Tracking", url: "/glossary/event-tracking" }, { name: "Data Loss in Analytics", url: "/glossary/data-loss-in-analytics" }] })} />
      <JsonLd data={breadcrumbSchema([{ name: "Glossary", url: "/glossary" }, { name: "Multi-Touch Attribution", url: "/glossary/multi-touch-attribution" }])} />
      <article className="pt-12 pb-28 bg-white">
        <div className="max-w-[720px] mx-auto px-5 sm:px-8">
        <header className="mb-12">
          <span className="inline-block text-[0.75rem] font-medium tracking-[0.08em] uppercase text-text-tertiary mb-4">Definition</span>
          <h1 className="font-serif text-[2.5rem] font-medium text-text-primary leading-[1.2] mb-6">Multi-Touch Attribution</h1>
        </header>

        <div className="space-y-6 text-[1.05rem] leading-[1.8] text-text-body">
          <div className="p-6 bg-warm-white border border-warm-100 rounded-[4px]">
            <p className="text-[1rem] text-text-primary font-medium">
              An attribution model that splits conversion credit across multiple observed touchpoints of the same identified visitor, instead of giving all credit to the first or last interaction. It requires per-user tracking to link touchpoints across sessions.
            </p>
          </div>
          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">What are the common multi-touch attribution models?</h2>
          <p>Multi-touch attribution comes in several variants: linear (equal credit to all touchpoints), time-decay (more credit to recent touchpoints), position-based (40% first, 40% last, 20% middle), and data-driven (ML-determined weights). Each has trade-offs, but all share a fundamental requirement: visibility into every touchpoint of the same identified visitor — which means a persistent per-user identifier must exist.</p>
          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">Why does multi-touch attribution break with incomplete data?</h2>
          <p>Multi-touch attribution is only as accurate as the touchpoint data feeding it. When cookie-based analytics miss visitor interactions &mdash; 29% of visits on <Link href="/case-studies/incapto" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">Incapto&rsquo;s Shopify store over 48 days</Link> &mdash; due to <Link href="/glossary/consent-management-platform" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">consent rejection</Link>, ad blockers, and browser restrictions, the model distributes credit across a fragment of the observed data.</p>
          <p>This systematically undervalues top-of-funnel channels (organic, social, display) because first touches are most likely to be lost when cookies are not yet active.</p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">Why does Sealmetrics not implement multi-touch attribution?</h2>
          <p>Multi-touch attribution requires the analytics system to identify the same visitor across multiple sessions so the touchpoints can be linked. That identification requires a persistent per-user identifier — a cookie, a device fingerprint or another tracking mechanism that makes the analytics subject to GDPR consent rules.</p>
          <p>Sealmetrics is designed as anonymous, aggregate event measurement. No per-user identifier is ever created, so there is no basis for linking touchpoints of the same person across sessions. <Link href="/glossary/revenue-attribution" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">Attribution</Link> is last-click on the observed conversion event: whichever source was recorded on the pageview where the conversion fired gets credit. Channel totals roll up from those events.</p>
          <p>The trade-off is deliberate: you give up modelled credit-splitting across touchpoints, and in exchange you get aggregate channel totals with no consent dependency.</p>
        </div>
        <CommercialModule hook="We don't do multi-touch — deliberately. See what last-click on complete data tells you that models can't." />

        <RelatedGlossaryTerms slug="multi-touch-attribution" />
        <div className="mt-10 pt-6 border-t border-warm-100">
          <p className="text-[0.85rem] text-text-tertiary">
            Learn more: <Link href="/blog/multi-touch-attribution-complete-data" className="text-text-secondary no-underline border-b border-warm-200 pb-0.5 hover:text-text-primary transition-colors">Why Multi-Touch Attribution Fails Without Complete Data</Link> &middot; <Link href="/product" className="text-text-secondary no-underline border-b border-warm-200 pb-0.5 hover:text-text-primary transition-colors">Sealmetrics Product</Link>
          </p>
        </div>

        <div className="mt-12">
          <QuickAnswer>
            <p>
              Multi-touch attribution is an attribution model that splits conversion credit across multiple observed touchpoints of the same identified visitor — linear, time-decay, position-based, or data-driven weights — instead of giving all credit to the first or last interaction. It requires a persistent per-user identifier (a cookie, fingerprint or login) to link touchpoints across sessions, which subjects the analytics to GDPR consent rules under European law.
            </p>
            <p>
              When the underlying data is incomplete — and in the EU, cookie-based analytics loses traffic to consent rejection, ad blockers and browser restrictions, by an amount that depends on the site: 29% of visits on Incapto&rsquo;s Shopify store over 48 days — multi-touch attribution distributes credit across a biased fragment, systematically undervaluing top-of-funnel channels. Sealmetrics deliberately does not implement multi-touch attribution: by avoiding per-visitor identifiers entirely, it measures traffic without depending on consent and attributes each conversion last-click at channel level.
            </p>
          </QuickAnswer>
        </div>
      </div>
    </article>
    </>
  );
}
