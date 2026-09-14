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
  title: "What Is an Attribution Window? — Sealmetrics Glossary",
  description:
    "The attribution window is the period after a touchpoint during which a conversion is credited to it. Default values, EU implications and the ITP collapse.",
  openGraph: {
    title: "What Is an Attribution Window?",
    description: "Default attribution windows by channel, why they collapse under Safari ITP, and the cookieless alternative.",
    type: "article",
    url: "https://sealmetrics.com/glossary/attribution-window/",
    siteName: "Sealmetrics",
    locale: "en_US",
    images: [ogImage("/glossary/attribution-window/")],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "What Is an Attribution Window?",
    description: "Default attribution windows by channel, why they collapse under Safari ITP, and the cookieless alternative.",
    images: [ogImage("/glossary/attribution-window/")],
  },
  alternates: { canonical: "https://sealmetrics.com/glossary/attribution-window/" },
};

export default function AttributionWindowPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Glossary", href: "/glossary" }, { label: "Attribution Window" }]} />
      <JsonLd
        data={definedTermSchema({
          name: "Attribution Window",
          description:
            "The time period after a marketing touchpoint during which a subsequent conversion is credited to that touchpoint.",
          url: "/glossary/attribution-window",
          related: [
            { name: "Attribution Model", url: "/glossary/attribution-model" },
            { name: "Last-Click Attribution", url: "/glossary/last-click-attribution" },
            { name: "Multi-Touch Attribution", url: "/glossary/multi-touch-attribution" },
            { name: "Intelligent Tracking Prevention (ITP)", url: "/glossary/intelligent-tracking-prevention" },
          ],
        })}
      />
      <JsonLd data={breadcrumbSchema([{ name: "Glossary", url: "/glossary" }, { name: "Attribution Window", url: "/glossary/attribution-window" }])} />
      <article className="pt-12 pb-28 bg-white">
        <div className="max-w-[720px] mx-auto px-5 sm:px-8">
          <header className="mb-12">
            <span className="inline-block text-[0.75rem] font-medium tracking-[0.08em] uppercase text-text-tertiary mb-4">Definition</span>
            <h1 className="font-serif text-[2.5rem] font-medium text-text-primary leading-[1.2] mb-6">Attribution Window</h1>
          </header>
          <div className="space-y-6 text-[1.05rem] leading-[1.8] text-text-body">
            <div className="p-6 bg-warm-white border border-warm-100 rounded-[4px]">
              <p className="text-[1rem] text-text-primary font-medium">
                The time period after a marketing touchpoint during which a subsequent conversion is credited to that touchpoint. Outside the window, the touchpoint receives no credit.
              </p>
            </div>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">Default windows by channel</h2>
            <p>Every channel ships an opinionated default. Google Ads attribution windows default to 30 days for clicks and 1 day for view-through. Meta Ads defaults to 7 days click + 1 day view. GA4 defaults vary by attribution model — 30 days for paid search and social, 90 days for organic. These defaults are configuration choices, not facts; the &ldquo;real&rdquo; window depends on your customer&rsquo;s actual decision cycle.</p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">Why the window collapses on Safari</h2>
            <p>Cookie-based attribution windows assume the cookie that recorded the original touchpoint survives until the conversion. <Link href="/glossary/intelligent-tracking-prevention" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">Safari ITP</Link> caps first-party analytics cookies at 7 days. Any window longer than that is fictional on Safari: the conversion fires after the cookie is gone, the channel attribution defaults to &ldquo;direct&rdquo;, and your dashboard under-counts the original source. Firefox ETP applies the same cap.</p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">Last-click on observed events</h2>
            <p>Sealmetrics applies <Link href="/glossary/last-click-attribution" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">last-click</Link> scoped to the session: each conversion is attributed to the source of the session in which it happened, not to a touchpoint days earlier. There is no window to collapse and no cookie to expire. This produces a different number than a 30-day window — typically simpler and closer to the channel that actually drove the action.</p>
          </div>
          <CommercialModule hook="An attribution window only works on data you actually captured. See last-click attribution running on 100% of your traffic." />

          <RelatedGlossaryTerms slug="attribution-window" />
          <div className="mt-10 pt-6 border-t border-warm-100">
            <p className="text-[0.85rem] text-text-tertiary">
              Learn more: <Link href="/complete-data" className="text-text-secondary no-underline border-b border-warm-200 pb-0.5 hover:text-text-primary transition-colors">Complete Data Pillar</Link> &middot; <Link href="/vs-ga4" className="text-text-secondary no-underline border-b border-warm-200 pb-0.5 hover:text-text-primary transition-colors">Sealmetrics vs GA4</Link>
            </p>
          </div>

          <div className="mt-12">
            <QuickAnswer>
              <p>
                An attribution window is the configurable period — typically 1 to 90 days — during which a conversion gets credited to a prior marketing touchpoint. Google Ads default is 30 days click / 1 day view; Meta is 7 days click / 1 day view; GA4 varies 30 to 90 days by model. Windows are configuration choices, not facts: the &ldquo;right&rdquo; length depends on the buyer&rsquo;s actual decision cycle and on whether the tracking technology can survive that long.
              </p>
              <p>
                On Safari (20%+ of EU mobile traffic), Intelligent Tracking Prevention caps first-party analytics cookies at 7 days, so any longer window collapses in practice — the cookie disappears and the original channel attribution defaults to &ldquo;direct&rdquo;. Cookieless first-party server-side measurement removes the dependency entirely: each conversion is attributed last-click to the channel observed on the page load where it happened, with no cookie to expire and no window to misrepresent.
              </p>
            </QuickAnswer>
          </div>
        </div>
      </article>
    </>
  );
}
