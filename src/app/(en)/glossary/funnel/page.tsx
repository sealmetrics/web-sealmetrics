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
  title: "What Is a Conversion Funnel? — Sealmetrics Glossary",
  description:
    "A funnel is an ordered sequence of steps toward a conversion, measured by drop-off. How funnel analysis works and why coverage decides whether to trust it.",
  openGraph: {
    title: "What Is a Conversion Funnel?",
    description: "An ordered sequence of steps toward a conversion, measured by drop-off — trustworthy only at full coverage.",
    type: "article",
    url: "https://sealmetrics.com/glossary/funnel/",
    siteName: "Sealmetrics",
    locale: "en_US",
    images: [ogImage("/glossary/funnel/")],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "What Is a Conversion Funnel?",
    description: "An ordered sequence of steps toward a conversion, measured by drop-off — trustworthy only at full coverage.",
    images: [ogImage("/glossary/funnel/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/glossary/funnel/",
    languages: getAlternates("/glossary/funnel"),
  },
};

export default function FunnelPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Glossary", href: "/glossary" }, { label: "Funnel" }]} />
      <JsonLd data={definedTermSchema({ name: "Funnel", description: "An ordered sequence of steps toward a conversion, measured by drop-off between the steps.", url: "/glossary/funnel", related: [{ name: "Event Tracking", url: "/glossary/event-tracking" }, { name: "Data Loss in Analytics", url: "/glossary/data-loss-in-analytics" }, { name: "Bounce Rate", url: "/glossary/bounce-rate" }, { name: "Cohort", url: "/glossary/cohort" }] })} />
      <JsonLd data={breadcrumbSchema([{ name: "Glossary", url: "/glossary" }, { name: "Funnel", url: "/glossary/funnel" }])} />
      <article className="pt-12 pb-28 bg-white">
        <div className="max-w-[720px] mx-auto px-5 sm:px-8">

        <header className="mb-12">
          <span className="inline-block text-[0.75rem] font-medium tracking-[0.08em] uppercase text-text-tertiary mb-4">Definition</span>
          <h1 className="font-serif text-[2.5rem] font-medium text-text-primary leading-[1.2] mb-6">Funnel</h1>
        </header>

        <div className="space-y-6 text-[1.05rem] leading-[1.8] text-text-body">
          <div className="p-6 bg-warm-white border border-warm-100 rounded-[4px]">
            <p className="text-[1rem] text-text-primary font-medium">
              An ordered sequence of steps toward a conversion — product page, cart, checkout, purchase — measured by the drop-off between them. The shape tells you where you lose buyers; the coverage decides whether the shape is true.
            </p>
          </div>

          <QuickAnswer>
            <p>
              A funnel is an ordered sequence of steps a visitor moves through on the way to a conversion, with a count at each step and a drop-off rate between steps. A typical eCommerce funnel runs product page → add to cart → checkout → purchase: if 10,000 sessions reach the product page and 400 end in purchase, the funnel shows exactly which transitions lost the other 9,600. Its diagnostic value depends entirely on coverage. In the EU, cookie-based analytics observes only the visitors who accepted the consent banner — in our experience with clients, between 40% and 60% of traffic doesn&rsquo;t accept cookies, before ad blockers remove more — so the funnel describes the consenting subset, whose behaviour differs by market and device from the customers you actually lost. A funnel counted without consent gaps, step by step in aggregate, describes your buyers instead of a biased sample.
            </p>
          </QuickAnswer>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">How funnel analysis works</h2>
          <p>
            Each funnel step is a countable event — a pageview of a URL, or an explicit action recorded through <Link href="/glossary/event-tracking" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">event tracking</Link>, like add-to-cart or begin-checkout. The report counts how much traffic reached each step within a period and computes the transition rate between consecutive steps. Reading it is subtraction: a healthy product-to-cart rate followed by a collapse at checkout points at the checkout, not at marketing. That precision is the whole appeal — a single conversion rate says you have a problem, a funnel says where.
          </p>
          <p>
            Funnels can be counted in two ways. Aggregate step counts compare totals at each stage over a period. Per-user path analysis instead follows identified individuals across sessions to establish that the same person completed each step in order. The second requires a persistent per-visitor identifier — which is exactly what consent rules gate. Sealmetrics measures funnels the first way: each step is an anonymous aggregate count on traffic measured without depending on consent, with no individual followed through the sequence.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">Why incomplete data bends the funnel</h2>
          <p>
            When analytics observes only consenting visitors, every funnel step is scaled down — but not uniformly. Consent acceptance varies by device, market and audience, and the missing majority does not behave like the visible minority. The result is a funnel with distorted transition rates: a checkout step can look weaker than it is simply because the segment most likely to buy is also the segment most likely to have rejected the banner or run an ad blocker. Teams then spend redesign cycles on a step that was never broken. This is the general problem of <Link href="/glossary/data-loss-in-analytics" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">data loss in analytics</Link> applied to the report where it does the most operational damage — the one that decides what gets rebuilt.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">What a funnel does not tell you</h2>
          <p>
            A funnel imposes a linear story on non-linear behaviour: real visitors skip steps, loop back, compare tabs and return days later, and an aggregate funnel compresses all of that into ordered totals. It cannot tell you why a step leaks — only that it does; the why needs qualitative work, testing, or session-level research tools built for that purpose. And step counts from different periods or segments are only comparable if measurement coverage was the same in both — which is precisely what consent-gated analytics cannot guarantee. See how Sealmetrics reports funnels on complete data on the <Link href="/product" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">product page</Link>.
          </p>
        </div>

        <CommercialModule hook="A funnel built on the consenting minority tells you where they drop off — not where your customers do. Count every step without consent gaps." />

        <RelatedGlossaryTerms slug="funnel" />

        <div className="mt-10 pt-6 border-t border-warm-100">
          <p className="text-[0.85rem] text-text-tertiary">
            Learn more: <Link href="/blog/what-is-data-loss-in-analytics" className="text-text-secondary no-underline border-b border-warm-200 pb-0.5 hover:text-text-primary transition-colors">What Is Data Loss in Analytics</Link> &middot; <Link href="/product" className="text-text-secondary no-underline border-b border-warm-200 pb-0.5 hover:text-text-primary transition-colors">Sealmetrics Product</Link>
          </p>
        </div>
      </div>
    </article>
    </>
  );
}
