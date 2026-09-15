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
  title: "What Are UTM Parameters? — Sealmetrics Glossary",
  description:
    "UTM parameters are query-string tags that attribute visits to campaigns. The five tags, naming discipline, and why they work without cookies or consent.",
  openGraph: {
    title: "What Are UTM Parameters?",
    description: "The five query-string tags behind campaign attribution — and why they work without cookies or consent.",
    type: "article",
    url: "https://sealmetrics.com/glossary/utm-parameters/",
    siteName: "Sealmetrics",
    locale: "en_US",
    images: [ogImage("/glossary/utm-parameters/")],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "What Are UTM Parameters?",
    description: "The five query-string tags behind campaign attribution — and why they work without cookies or consent.",
    images: [ogImage("/glossary/utm-parameters/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/glossary/utm-parameters/",
    languages: getAlternates("/glossary/utm-parameters"),
  },
};

export default function UtmParametersPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Glossary", href: "/glossary" }, { label: "UTM Parameters" }]} />
      <JsonLd data={definedTermSchema({ name: "UTM Parameters", description: "Query-string tags appended to links so the destination site can attribute the visit to a source, medium and campaign.", url: "/glossary/utm-parameters", related: [{ name: "Last-Click Attribution", url: "/glossary/last-click-attribution" }, { name: "Attribution Model", url: "/glossary/attribution-model" }, { name: "Revenue Attribution", url: "/glossary/revenue-attribution" }, { name: "Data Loss in Analytics", url: "/glossary/data-loss-in-analytics" }] })} />
      <JsonLd data={breadcrumbSchema([{ name: "Glossary", url: "/glossary" }, { name: "UTM Parameters", url: "/glossary/utm-parameters" }])} />
      <article className="pt-12 pb-28 bg-white">
        <div className="max-w-[720px] mx-auto px-5 sm:px-8">

        <header className="mb-12">
          <span className="inline-block text-[0.75rem] font-medium tracking-[0.08em] uppercase text-text-tertiary mb-4">Definition</span>
          <h1 className="font-serif text-[2.5rem] font-medium text-text-primary leading-[1.2] mb-6">UTM Parameters</h1>
        </header>

        <div className="space-y-6 text-[1.05rem] leading-[1.8] text-text-body">
          <div className="p-6 bg-warm-white border border-warm-100 rounded-[4px]">
            <p className="text-[1rem] text-text-primary font-medium">
              Query-string tags — utm_source, utm_medium, utm_campaign, utm_term, utm_content — appended to a link so the destination site can attribute the visit. The values are whatever you type, so attribution quality depends entirely on naming discipline.
            </p>
          </div>

          <QuickAnswer>
            <p>
              UTM parameters are five standardised query-string tags appended to a URL so the destination&rsquo;s analytics can attribute the visit to a campaign: utm_source names the origin (google, newsletter), utm_medium the mechanism (cpc, email), utm_campaign the initiative, and utm_term and utm_content distinguish keywords and creative variants. The convention dates to Urchin Tracking Module, the software Google acquired to build Google Analytics, and every major analytics tool reads it. Because the tags travel inside the URL itself, reading them requires no cookie and no storage on the visitor&rsquo;s device — which makes UTM-based campaign attribution one of the few measurement mechanisms that keeps working at full coverage when consent rejection costs a tool 15–60% of EU visitors, depending on sector, brand strength and traffic mix. The tags are free-text, so their value depends entirely on consistent naming.
            </p>
          </QuickAnswer>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">The five tags and what each one answers</h2>
          <p>
            utm_source answers &ldquo;where did the click originate?&rdquo; (google, meta, newsletter). utm_medium answers &ldquo;through what mechanism?&rdquo; (cpc, email, organic-social). utm_campaign names the initiative (spring-sale-2026). utm_term carries the paid keyword, and utm_content separates variants of the same placement — two banners in one email, two creatives in one ad set. Source and medium are the load-bearing pair: they feed channel grouping, and a visit tagged with them lands cleanly in <Link href="/glossary/last-click-attribution" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">last-click attribution</Link> instead of the referrer-guessing fallback.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">Why naming discipline is the whole game</h2>
          <p>
            UTM values are not validated by anyone. &ldquo;Facebook&rdquo;, &ldquo;facebook&rdquo; and &ldquo;fb&rdquo; become three different sources; &ldquo;email&rdquo; and &ldquo;Email&rdquo; split one channel&rsquo;s revenue across two rows. The fix is organisational, not technical: one shared naming convention (lowercase, hyphens, an agreed vocabulary for source and medium), one link-building spreadsheet or tool, and the discipline to reject links that break the scheme. An untagged campaign link is worse than an inconsistent one — the visit falls back to referrer data, which browsers increasingly strip, and typically ends up inflating direct traffic where no budget decision can reach it.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">Why UTMs survive the cookieless era</h2>
          <p>
            Most attribution mechanisms depend on state stored in the browser — cookies, local storage, device identifiers — and all of that is consent-gated in the EU and actively restricted by Safari and Firefox. UTM parameters carry the attribution in the URL of the visit itself, so nothing needs to be stored or read back later. That is why they are the backbone of <Link href="/glossary/cookieless-analytics" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">cookieless analytics</Link>: Sealmetrics reads the UTM set on each pageview and attributes conversions last-click at channel level, without depending on consent or a consent banner — while a cookie-based tool applies the same tags to only the minority of traffic it is allowed to observe.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">What UTM parameters do not tell you</h2>
          <p>
            UTMs describe the click, not the person. They cannot connect this visit to an earlier one, credit an ad that was seen but not clicked, or follow a journey across devices — and within a session, they only describe how it started. They are also self-reported: a UTM says what you wrote on the link, not what the traffic actually was, so a mislabelled link lies with complete confidence. Treat them as the input to channel-level <Link href="/glossary/revenue-attribution" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">revenue attribution</Link>, not as a record of user behaviour.
          </p>
        </div>

        <CommercialModule hook="Your UTMs are only read on the visits your analytics is allowed to see. Sealmetrics doesn't lose them to consent rejection — no cookies, no consent banner." />

        <RelatedGlossaryTerms slug="utm-parameters" />

        <div className="mt-10 pt-6 border-t border-warm-100">
          <p className="text-[0.85rem] text-text-tertiary">
            Learn more: <Link href="/how-it-works" className="text-text-secondary no-underline border-b border-warm-200 pb-0.5 hover:text-text-primary transition-colors">How Sealmetrics Works</Link> &middot; <Link href="/product" className="text-text-secondary no-underline border-b border-warm-200 pb-0.5 hover:text-text-primary transition-colors">Sealmetrics Product</Link>
          </p>
        </div>
      </div>
    </article>
    </>
  );
}
