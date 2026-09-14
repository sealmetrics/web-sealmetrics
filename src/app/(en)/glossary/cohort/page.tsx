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
  title: "What Is Cohort Analysis? — Sealmetrics Glossary",
  description:
    "A cohort is a group sharing a starting characteristic, tracked over time. How cohort analysis works, what it needs, and where Sealmetrics draws the line.",
  openGraph: {
    title: "What Is Cohort Analysis?",
    description: "Groups sharing a starting point, compared over time — and what per-user cohort tracking requires that anonymous measurement refuses.",
    type: "article",
    url: "https://sealmetrics.com/glossary/cohort/",
    siteName: "Sealmetrics",
    locale: "en_US",
    images: [ogImage("/glossary/cohort/")],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "What Is Cohort Analysis?",
    description: "Groups sharing a starting point, compared over time — and what per-user cohort tracking requires that anonymous measurement refuses.",
    images: [ogImage("/glossary/cohort/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/glossary/cohort/",
    languages: getAlternates("/glossary/cohort"),
  },
};

export default function CohortPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Glossary", href: "/glossary" }, { label: "Cohort" }]} />
      <JsonLd data={definedTermSchema({ name: "Cohort", description: "A group sharing a starting characteristic, tracked over time to compare behaviour between groups.", url: "/glossary/cohort", related: [{ name: "Funnel", url: "/glossary/funnel" }, { name: "Customer Lifetime Value (LTV)", url: "/glossary/customer-lifetime-value" }, { name: "Multi-Touch Attribution", url: "/glossary/multi-touch-attribution" }, { name: "Data Loss in Analytics", url: "/glossary/data-loss-in-analytics" }] })} />
      <JsonLd data={breadcrumbSchema([{ name: "Glossary", url: "/glossary" }, { name: "Cohort", url: "/glossary/cohort" }])} />
      <article className="pt-12 pb-28 bg-white">
        <div className="max-w-[720px] mx-auto px-5 sm:px-8">

        <header className="mb-12">
          <span className="inline-block text-[0.75rem] font-medium tracking-[0.08em] uppercase text-text-tertiary mb-4">Definition</span>
          <h1 className="font-serif text-[2.5rem] font-medium text-text-primary leading-[1.2] mb-6">Cohort</h1>
        </header>

        <div className="space-y-6 text-[1.05rem] leading-[1.8] text-text-body">
          <div className="p-6 bg-warm-white border border-warm-100 rounded-[4px]">
            <p className="text-[1rem] text-text-primary font-medium">
              A group sharing a starting characteristic — usually first visit or first purchase in the same period — tracked over time to compare behaviour between groups rather than across a whole audience.
            </p>
          </div>

          <QuickAnswer>
            <p>
              A cohort is a group of customers or visitors who share a starting point — most commonly the week or month of their first purchase — whose later behaviour is tracked as a group. Cohort analysis compares those groups over time: do customers acquired in March retain, reorder or spend better than customers acquired in January? Averaged across everyone, such changes cancel out; broken into cohorts, they become visible, which is why the technique anchors retention and lifetime value work. Behavioural cohort tracking has a strict requirement: recognising the same individual across months, which in a browser means a persistent per-user identifier subject to EU consent rules. Purchase cohorts avoid this — they are built from order data, where the identity already exists. Sealmetrics keeps no per-user identifier, so it measures aggregates and leaves cohort-building to the order database.
            </p>
          </QuickAnswer>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">How cohort analysis works</h2>
          <p>
            The classic output is a retention grid: rows are acquisition periods, columns are periods since acquisition, cells show what share of each cohort was still active — or how much it had spent — after one month, two months, three. Read down a column and you see whether newer cohorts behave better than older ones; that single view answers questions a blended average cannot, like whether last quarter&rsquo;s discount campaign bought customers who reorder or customers who churn. The same structure feeds <Link href="/glossary/customer-lifetime-value" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">customer lifetime value</Link>: LTV is only trustworthy when computed per cohort, because a blended figure mixes loyal 2023 customers with untested ones acquired last month.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">What per-user cohorts require</h2>
          <p>
            To place a visitor in a cohort and find them again months later, an analytics tool must recognise the same individual across sessions — a persistent identifier stored in the browser or derived from the device. That is per-user tracking, with everything it implies in the EU: consent under ePrivacy, GDPR obligations, and coverage limited to whoever accepted the banner. It is the same requirement that underpins <Link href="/glossary/multi-touch-attribution" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">multi-touch attribution</Link>, and it fails the same way: with 40-60% of EU visitors rejecting consent, browser-based cohorts are built from the consenting minority, and their retention curves describe that minority only.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">What Sealmetrics does and does not do</h2>
          <p>
            Sealmetrics does not build per-user cohorts, deliberately. Its architecture is anonymous, aggregate event measurement: no persistent visitor identifier is ever created, so there is no mechanism for recognising an individual across sessions — the precondition for behavioural cohort tracking. What it provides instead is aggregate comparison over time on traffic measured without depending on consent: acquisition, conversions and revenue by channel and period, segmentable and unbiased by consent status. For purchase-based cohorts — the kind most retention and LTV work actually uses — the natural home is your order database, where customer identity already persists lawfully; Sealmetrics&rsquo; role is supplying the complete channel-level acquisition data those cohorts are joined against. If per-user behavioural cohorts inside the analytics tool are a hard requirement, Sealmetrics is the wrong tool for that job, and it is designed to be.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">What cohort analysis does not tell you</h2>
          <p>
            Cohorts show that groups differ, not why — attributing a retention gap to the campaign, the season or the product mix requires controlled testing. Small cohorts produce noisy curves that invite overreading, and cohorts built on incomplete browser data inherit its bias: a retention change can reflect a shift in who accepts consent banners rather than in who stays a customer.
          </p>
        </div>

        <CommercialModule hook="We don't do per-user cohorts — deliberately. See what aggregate trends without consent gaps catch that a consented sample misses." />

        <RelatedGlossaryTerms slug="cohort" />

        <div className="mt-10 pt-6 border-t border-warm-100">
          <p className="text-[0.85rem] text-text-tertiary">
            Learn more: <Link href="/blog/multi-touch-attribution-complete-data" className="text-text-secondary no-underline border-b border-warm-200 pb-0.5 hover:text-text-primary transition-colors">Why Multi-Touch Attribution Fails Without Complete Data</Link> &middot; <Link href="/product" className="text-text-secondary no-underline border-b border-warm-200 pb-0.5 hover:text-text-primary transition-colors">Sealmetrics Product</Link>
          </p>
        </div>
      </div>
    </article>
    </>
  );
}
