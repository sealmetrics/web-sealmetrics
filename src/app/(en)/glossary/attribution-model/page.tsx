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
  title: "What Is an Attribution Model? — Sealmetrics Glossary",
  description:
    "Attribution models determine how conversion credit is split across touchpoints. Compare first-touch, last-touch, linear, and data-driven models.",
  openGraph: {
    title: "What Is an Attribution Model?",
    description: "Attribution models determine how conversion credit is split across marketing touchpoints.",
    type: "article",
    url: "https://sealmetrics.com/glossary/attribution-model/",
    siteName: "Sealmetrics",
    locale: "en_US",
    images: [ogImage("/glossary/attribution-model/")],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "What Is an Attribution Model?",
    description: "Attribution models determine how conversion credit is split across marketing touchpoints.",
    images: [ogImage("/glossary/attribution-model/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/glossary/attribution-model/",
    // The Spanish page points here; without the return link the hreflang
    // pair is one-sided and Google discards it.
    languages: getAlternates("/glossary/attribution-model"),
  },
};

export default function AttributionModelPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Glossary", href: "/glossary" }, { label: "Attribution Model" }]} />
      <JsonLd data={definedTermSchema({ name: "Attribution Model", description: "Rules that determine how conversion credit is distributed across marketing touchpoints in a customer journey.", url: "/glossary/attribution-model", related: [{ name: "Multi-Touch Attribution", url: "/glossary/multi-touch-attribution" }, { name: "Revenue Attribution", url: "/glossary/revenue-attribution" }, { name: "Event Tracking", url: "/glossary/event-tracking" }, { name: "Data Loss in Analytics", url: "/glossary/data-loss-in-analytics" }] })} />
      <JsonLd data={breadcrumbSchema([{ name: "Glossary", url: "/glossary" }, { name: "Attribution Model", url: "/glossary/attribution-model" }])} />
      <article className="pt-12 pb-28 bg-white">
        <div className="max-w-[720px] mx-auto px-5 sm:px-8">

        <header className="mb-12">
          <span className="inline-block text-[0.75rem] font-medium tracking-[0.08em] uppercase text-text-tertiary mb-4">Definition</span>
          <h1 className="font-serif text-[2.5rem] font-medium text-text-primary leading-[1.2] mb-6">Attribution Model</h1>
        </header>

        <div className="space-y-6 text-[1.05rem] leading-[1.8] text-text-body">
          <div className="p-6 bg-warm-white border border-warm-100 rounded-[4px]">
            <p className="text-[1rem] text-text-primary font-medium">
              A set of rules that determines how conversion credit is distributed across the touchpoints in a customer journey. Common models include first-touch, last-touch, linear, time-decay, and data-driven attribution.
            </p>
          </div>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">Types of attribution models</h2>
          <p>
            Every conversion has a path &mdash; a sequence of interactions (ad clicks, organic searches, email opens, direct visits) that led to the final action. Attribution models define how to assign value across that path:
          </p>
          <p>
            &mdash; <strong className="font-medium">First-touch</strong> assigns 100% of credit to the first interaction. Useful for measuring awareness channels, but ignores everything that happened after discovery.<br />
            &mdash; <strong className="font-medium">Last-touch</strong> assigns 100% to the final interaction before conversion. GA4 defaults to this for most reports. It overstates bottom-funnel channels like branded search and retargeting.<br />
            &mdash; <strong className="font-medium">Linear</strong> splits credit equally across all touchpoints. Simple and fair, but assumes every interaction has equal influence &mdash; which is rarely true.<br />
            &mdash; <strong className="font-medium">Time-decay</strong> gives more credit to touchpoints closer to conversion. Reasonable for short sales cycles, less useful for B2B journeys spanning weeks or months.<br />
            &mdash; <strong className="font-medium">Data-driven</strong> uses machine learning to calculate each touchpoint&rsquo;s actual contribution based on conversion probability. Google removed all other models from GA4 in late 2023, making data-driven the default.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">Why attribution needs complete data</h2>
          <p>
            Every attribution model &mdash; from the simplest last-touch to the most sophisticated data-driven &mdash; depends on seeing the full journey. When <Link href="/glossary/data-loss-in-analytics" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">analytics data loss</Link> removes 40&ndash;87% of touchpoints, the model works on a fragment of reality.
          </p>
          <p>
            Consider a customer who first discovers your brand through an organic search (blocked by an ad blocker), later clicks a display ad (tracked), and finally converts through a branded search (tracked). A last-touch model credits branded search. A data-driven model credits display. Neither knows the organic visit existed. The channel that actually introduced the customer gets zero credit &mdash; and zero budget in the next planning cycle.
          </p>
          <p>
            <Link href="/glossary/multi-touch-attribution" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">Multi-touch attribution</Link> needs more than complete data &mdash; it needs a persistent identifier linking the same visitor&rsquo;s touchpoints across sessions, which is exactly the cookie dependency that causes the data loss above. <Link href="/glossary/cookieless-analytics" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">Cookieless analytics</Link> closes a different gap: it captures every touchpoint within a session without that identifier, which is why models built on it &mdash; like <Link href="/glossary/last-click-attribution" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">last-click</Link> &mdash; run on data without consent gaps instead of a consent-biased subset.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">Attribution model comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-[0.92rem] leading-[1.6] border-collapse">
              <thead>
                <tr className="border-b border-warm-200">
                  <th className="text-left font-medium text-text-primary py-3 pr-4">Model</th>
                  <th className="text-left font-medium text-text-primary py-3 pr-4">Credit Distribution</th>
                  <th className="text-left font-medium text-text-primary py-3">Best For</th>
                </tr>
              </thead>
              <tbody className="text-text-body">
                <tr className="border-b border-warm-100">
                  <td className="py-3 pr-4">First-touch</td>
                  <td className="py-3 pr-4">100% to first interaction</td>
                  <td className="py-3">Awareness measurement</td>
                </tr>
                <tr className="border-b border-warm-100">
                  <td className="py-3 pr-4">Last-touch</td>
                  <td className="py-3 pr-4">100% to last interaction</td>
                  <td className="py-3">Direct-response campaigns</td>
                </tr>
                <tr className="border-b border-warm-100">
                  <td className="py-3 pr-4">Linear</td>
                  <td className="py-3 pr-4">Equal across all touchpoints</td>
                  <td className="py-3">Long, multi-channel journeys</td>
                </tr>
                <tr className="border-b border-warm-100">
                  <td className="py-3 pr-4">Time-decay</td>
                  <td className="py-3 pr-4">Weighted toward conversion</td>
                  <td className="py-3">Short sales cycles</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4">Data-driven</td>
                  <td className="py-3 pr-4">ML-calculated per touchpoint</td>
                  <td className="py-3">High-volume, complete data</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-[0.9rem] text-text-tertiary mt-3">
            Note: GA4 deprecated all models except data-driven and last-click in November 2023. Data-driven attribution requires sufficient conversion volume and &mdash; critically &mdash; complete data to produce reliable results.
          </p>
        </div>

        <CommercialModule hook="Sealmetrics runs one model — last-click on your traffic, without consent gaps. See what a single, complete model tells you that blended data can't." />

        <RelatedGlossaryTerms slug="attribution-model" />

        <div className="mt-10 pt-6 border-t border-warm-100">
          <p className="text-[0.85rem] text-text-tertiary">
            Learn more: <Link href="/blog/multi-touch-attribution-complete-data" className="text-text-secondary no-underline border-b border-warm-200 pb-0.5 hover:text-text-primary transition-colors">Multi-Touch Attribution with Complete Data</Link> &middot; <Link href="/product" className="text-text-secondary no-underline border-b border-warm-200 pb-0.5 hover:text-text-primary transition-colors">Sealmetrics Product</Link>
          </p>
        </div>
      </div>
    </article>
    </>
  );
}
