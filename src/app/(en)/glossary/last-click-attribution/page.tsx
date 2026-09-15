import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { RelatedGlossaryTerms } from "@/components/ui/RelatedGlossaryTerms";
import { QuickAnswer } from "@/components/ui/QuickAnswer";
import { definedTermSchema, breadcrumbSchema } from "@/lib/schema";
import { CommercialModule } from "@/components/ui/CommercialModule";
import { ogImage } from "@/lib/seo/og";

export const metadata: Metadata = {
  title: "What Is Last-Click Attribution? — Sealmetrics Glossary",
  description:
    "Last-click attribution credits a conversion to the final touchpoint before it. How it differs from multi-touch and why Sealmetrics uses it without consent gaps.",
  openGraph: {
    title: "What Is Last-Click Attribution?",
    description: "Last-click attribution explained: how it differs from multi-touch, why it scales, and what it deliberately doesn't do.",
    type: "article",
    url: "https://sealmetrics.com/glossary/last-click-attribution/",
    siteName: "Sealmetrics",
    locale: "en_US",
    images: [ogImage("/glossary/last-click-attribution/")],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "What Is Last-Click Attribution?",
    description: "Last-click attribution explained: how it differs from multi-touch, why it scales, and what it deliberately doesn't do.",
    images: [ogImage("/glossary/last-click-attribution/")],
  },
  alternates: { canonical: "https://sealmetrics.com/glossary/last-click-attribution/" },
};

export default function LastClickAttributionPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Glossary", href: "/glossary" }, { label: "Last-Click Attribution" }]} />
      <JsonLd
        data={definedTermSchema({
          name: "Last-Click Attribution",
          description:
            "An attribution model where 100% of the conversion credit goes to the final marketing touchpoint observed before the conversion event.",
          url: "/glossary/last-click-attribution",
          related: [
            { name: "Attribution Model", url: "/glossary/attribution-model" },
            { name: "Revenue Attribution", url: "/glossary/revenue-attribution" },
            { name: "Attribution Window", url: "/glossary/attribution-window" },
            { name: "Multi-Touch Attribution", url: "/glossary/multi-touch-attribution" },
          ],
        })}
      />
      <JsonLd data={breadcrumbSchema([{ name: "Glossary", url: "/glossary" }, { name: "Last-Click Attribution", url: "/glossary/last-click-attribution" }])} />
      <article className="pt-12 pb-28 bg-white">
        <div className="max-w-[720px] mx-auto px-5 sm:px-8">
          <header className="mb-12">
            <span className="inline-block text-[0.75rem] font-medium tracking-[0.08em] uppercase text-text-tertiary mb-4">Definition</span>
            <h1 className="font-serif text-[2.5rem] font-medium text-text-primary leading-[1.2] mb-6">Last-Click Attribution</h1>
          </header>
          <div className="space-y-6 text-[1.05rem] leading-[1.8] text-text-body">
            <div className="p-6 bg-warm-white border border-warm-100 rounded-[4px]">
              <p className="text-[1rem] text-text-primary font-medium">
                An attribution model where 100% of the conversion credit goes to the final marketing touchpoint observed before the conversion event. Simple, deterministic, and the foundation of channel-level reporting.
              </p>
            </div>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">What it credits, and what it does not</h2>
            <p>If a visitor arrives via Google CPC, browses for five minutes and converts, last-click credits the conversion to Google CPC. If a visitor arrives via Facebook, leaves, returns via direct (or via a different source) and converts, last-click credits whichever source brought the visitor in last before the conversion. Earlier touchpoints — the email opened last week, the influencer post seen a month ago — receive no credit.</p>
            <p>This is deliberate. Last-click does not measure influence; it measures the source that closed the conversion. For media-mix decisions on a single channel at a time, that is usually the correct question.</p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">Last-click vs <Link href="/glossary/multi-touch-attribution" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">multi-touch</Link></h2>
            <p>Multi-touch attribution distributes credit across the chain of touchpoints — linear, time-decay or data-driven. To work, it requires per-user tracking: linking pageview A and pageview B to the same visitor across sessions. That requirement makes multi-touch unreachable for any architecture that does not track individuals. Sealmetrics counts events anonymously in aggregate, so multi-touch is not part of the product.</p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">Last-click on data without consent gaps</h2>
            <p>Cookie-based last-click attribution still loses data the moment the cookie disappears. Sealmetrics applies <strong>session-scoped</strong> last-click: the source of the session in which the conversion fires gets the credit, on every conversion recorded. No cookie required, no expiration risk, no &ldquo;direct&rdquo; bucket inflated by ITP. See the full pattern in the <Link href="/cookieless-analytics" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">cookieless analytics pillar</Link>.</p>
          </div>
          <CommercialModule hook="See last-click attribution running on your traffic — no consent gaps, no modelling." />

          <RelatedGlossaryTerms slug="last-click-attribution" />
          <div className="mt-10 pt-6 border-t border-warm-100">
            <p className="text-[0.85rem] text-text-tertiary">
              Learn more: <Link href="/complete-data" className="text-text-secondary no-underline border-b border-warm-200 pb-0.5 hover:text-text-primary transition-colors">Complete Data Pillar</Link> &middot; <Link href="/product" className="text-text-secondary no-underline border-b border-warm-200 pb-0.5 hover:text-text-primary transition-colors">Product</Link>
            </p>
          </div>

          <div className="mt-12">
            <QuickAnswer>
              <p>
                Last-click attribution is the attribution model that credits 100% of a conversion to the final marketing touchpoint observed before it. If the visitor arrives via Google CPC, browses, and converts in the same session, Google CPC gets the credit. If they leave and return via direct, direct gets the credit. Simple, deterministic, channel-level — the default reporting view of every analytics tool from GA Universal onward.
              </p>
              <p>
                The cost of simplicity is honesty about what it does not measure: it does not credit earlier touchpoints (emails, influencer posts, retargeting impressions) that influenced the decision before the closing visit. Multi-touch attribution models attempt that — but require per-user tracking across sessions, which collides with consent rejection, ad blockers and Safari ITP. Sealmetrics applies last-click at the event level on observed conversions without depending on consent, anonymously at channel scale, with no cookie required.
              </p>
            </QuickAnswer>
          </div>
        </div>
      </article>
    </>
  );
}
