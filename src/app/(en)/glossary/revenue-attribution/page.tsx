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
  title: "What Is Revenue Attribution? — Sealmetrics Glossary",
  description:
    "Revenue attribution connects conversion events to marketing channels. Accuracy depends on the attribution model and how many events your analytics sees.",
  openGraph: {
    title: "What Is Revenue Attribution?",
    description: "Connecting revenue events to the marketing channels that drove them. Accuracy depends on observable data.",
    type: "article",
    url: "https://sealmetrics.com/glossary/revenue-attribution/",
    siteName: "Sealmetrics",
    locale: "en_US",
    images: [ogImage("/glossary/revenue-attribution/")],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "What Is Revenue Attribution?",
    description: "Connecting revenue events to the marketing channels that drove them. Accuracy depends on observable data.",
    images: [ogImage("/glossary/revenue-attribution/")],
  },
  alternates: { canonical: "https://sealmetrics.com/glossary/revenue-attribution/", languages: getAlternates("/glossary/revenue-attribution") },
};

export default function RevenueAttributionPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Glossary", href: "/glossary" }, { label: "Revenue Attribution" }]} />
      <JsonLd data={definedTermSchema({ name: "Revenue Attribution", description: "Connecting revenue events to the marketing channels that drove them.", url: "/glossary/revenue-attribution", related: [{ name: "Attribution Model", url: "/glossary/attribution-model" }, { name: "Multi-Touch Attribution", url: "/glossary/multi-touch-attribution" }, { name: "Event Tracking", url: "/glossary/event-tracking" }, { name: "Data Loss in Analytics", url: "/glossary/data-loss-in-analytics" }] })} />
      <JsonLd data={breadcrumbSchema([{ name: "Glossary", url: "/glossary" }, { name: "Revenue Attribution", url: "/glossary/revenue-attribution" }])} />
      <article className="pt-12 pb-28 bg-white">
        <div className="max-w-[720px] mx-auto px-5 sm:px-8">
        <header className="mb-12">
          <span className="inline-block text-[0.75rem] font-medium tracking-[0.08em] uppercase text-text-tertiary mb-4">Definition</span>
          <h1 className="font-serif text-[2.5rem] font-medium text-text-primary leading-[1.2] mb-6">Revenue Attribution</h1>
        </header>
        <div className="space-y-6 text-[1.05rem] leading-[1.8] text-text-body">
          <div className="p-6 bg-warm-white border border-warm-100 rounded-[4px]">
            <p className="text-[1rem] text-text-primary font-medium">
              The process of connecting revenue events (purchases, subscriptions) to the marketing channels and campaigns that drove them. Accuracy depends on how many events the analytics system actually observes.
            </p>
          </div>
          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">How does revenue attribution work?</h2>
          <p>Revenue attribution assigns conversion credit to a traffic source. Different <Link href="/glossary/attribution-model" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">attribution models</Link> assign that credit differently:</p>
          <ul className="space-y-2 list-none pl-0 [&>li]:relative [&>li]:pl-6 [&>li]:before:content-['—'] [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:text-text-tertiary">
            <li><strong>Last-click:</strong> the most recent source before the conversion gets full credit.</li>
            <li><strong>First-touch:</strong> the source recorded on the first observed pageview gets full credit.</li>
            <li><strong>Multi-touch (linear, time-decay, position-based):</strong> credit is split across observed touchpoints of the same identified user across sessions. Requires per-user tracking.</li>
          </ul>
          <p>Last-click and first-touch models work with aggregate, anonymous event data. Multi-touch models require the analytics system to identify a visitor across sessions — which, in Europe, usually requires cookies and consent.</p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">What does revenue attribution require to be accurate?</h2>
          <p>Revenue attribution is uniquely sensitive to <Link href="/glossary/data-loss-in-analytics" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">data loss</Link>. If your analytics miss pageviews to consent rejection, ad blockers and browser restrictions &mdash; 45% of pageviews on <Link href="/case-studies/incapto" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">Incapto&rsquo;s Shopify store over 48 days</Link> &mdash; what remains is what the attribution model operates on, so the channel totals it produces are biased by whatever demographic survived the filter. The typical result: direct traffic is inflated, top-of-funnel channels are undervalued, and budget allocation follows the bias.</p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">How does Sealmetrics handle revenue attribution?</h2>
          <p>Sealmetrics does <strong>last-click revenue attribution on observed events, without consent gaps</strong>. When a conversion event fires, it is credited to the source of the session in which it happened. Channel totals roll up by campaign, landing page and creative. There is no multi-touch model and no cross-session stitching — because there is no cookie, no personal identifier and no way to recognise a returning visitor. The trade-off is deliberate: aggregate channel totals that reconcile with your backend, in exchange for giving up per-user journey analysis.</p>

          <p>Because pageviews are captured through <Link href="/glossary/cookieless-analytics" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">cookieless analytics</Link> whether or not the banner is accepted, last-click attribution reflects observed traffic without consent gaps — not the cookie-accepting minority.</p>
        </div>
        <CommercialModule hook="See your revenue attributed last-click without consent gaps — not on the consented fraction." />

        <RelatedGlossaryTerms slug="revenue-attribution" />
        <div className="mt-10 pt-6 border-t border-warm-100">
          <p className="text-[0.85rem] text-text-tertiary">
            Learn more: <Link href="/blog/multi-touch-attribution-complete-data" className="text-text-secondary no-underline border-b border-warm-200 pb-0.5 hover:text-text-primary transition-colors">Why Multi-Touch Attribution Fails Without Complete Data</Link> &middot; <Link href="/product" className="text-text-secondary no-underline border-b border-warm-200 pb-0.5 hover:text-text-primary transition-colors">Sealmetrics Revenue Attribution</Link>
          </p>
        </div>
      </div>
    </article>
    </>
  );
}
