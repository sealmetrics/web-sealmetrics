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
  title: "What Is Event Tracking? — Sealmetrics Glossary",
  description:
    "Event tracking records specific user interactions beyond pageviews. Learn how GA4's event model works and why cookieless collection is more reliable.",
  openGraph: {
    title: "What Is Event Tracking?",
    description: "Event tracking records user interactions beyond pageviews. Learn about GA4's event model and cookieless alternatives.",
    type: "article",
    url: "https://sealmetrics.com/glossary/event-tracking/",
    siteName: "Sealmetrics",
    locale: "en_US",
    images: [ogImage("/glossary/event-tracking/")],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "What Is Event Tracking?",
    description: "Event tracking records user interactions beyond pageviews. Learn about GA4's event model and cookieless alternatives.",
    images: [ogImage("/glossary/event-tracking/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/glossary/event-tracking/",
    // The Spanish page points here; without the return link the hreflang
    // pair is one-sided and Google discards it.
    languages: getAlternates("/glossary/event-tracking"),
  },
};

export default function EventTrackingPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Glossary", href: "/glossary" }, { label: "Event Tracking" }]} />
      <JsonLd data={definedTermSchema({ name: "Event Tracking", description: "Recording specific user interactions on a website beyond pageviews, such as clicks, form submissions, and video plays.", url: "/glossary/event-tracking", related: [{ name: "Server-Side Tracking", url: "/glossary/server-side-tracking" }, { name: "Revenue Attribution", url: "/glossary/revenue-attribution" }, { name: "Attribution Model", url: "/glossary/attribution-model" }, { name: "Bounce Rate", url: "/glossary/bounce-rate" }] })} />
      <JsonLd data={breadcrumbSchema([{ name: "Glossary", url: "/glossary" }, { name: "Event Tracking", url: "/glossary/event-tracking" }])} />
      <article className="pt-12 pb-28 bg-white">
        <div className="max-w-[720px] mx-auto px-5 sm:px-8">

        <header className="mb-12">
          <span className="inline-block text-[0.75rem] font-medium tracking-[0.08em] uppercase text-text-tertiary mb-4">Definition</span>
          <h1 className="font-serif text-[2.5rem] font-medium text-text-primary leading-[1.2] mb-6">Event Tracking</h1>
        </header>

        <div className="space-y-6 text-[1.05rem] leading-[1.8] text-text-body">
          <div className="p-6 bg-warm-white border border-warm-100 rounded-[4px]">
            <p className="text-[1rem] text-text-primary font-medium">
              Recording specific user interactions on a website beyond pageviews &mdash; clicks, form submissions, scroll depth, video plays, file downloads, and custom actions. GA4 uses an entirely event-based data model where every interaction, including pageviews, is an event.
            </p>
          </div>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">What events are tracked</h2>
          <p>
            Events capture the actions that matter for business decisions. A pageview tells you someone arrived. Events tell you what they did:
          </p>
          <p>
            &mdash; <strong className="font-medium">Engagement events</strong> &mdash; scroll depth (25%, 50%, 75%, 100%), time on page, video start/complete, file downloads<br />
            &mdash; <strong className="font-medium">Conversion events</strong> &mdash; form submissions, purchases, add-to-cart, sign-ups, booking confirmations<br />
            &mdash; <strong className="font-medium">Navigation events</strong> &mdash; outbound clicks, internal link clicks, site search queries<br />
            &mdash; <strong className="font-medium">Custom events</strong> &mdash; any interaction specific to your product (filter applied, configurator used, calculator completed)
          </p>
          <p>
            GA4 automatically collects a set of enhanced measurement events (page_view, scroll, click, file_download, video_start, video_complete) without additional configuration. Custom events require either gtag.js calls or GTM triggers. Sealmetrics captures pageviews automatically — including SPA route changes — and business events through explicit calls, all via <Link href="/glossary/first-party-data-collection" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">first-party cookieless tracking</Link>, including interactions that third-party scripts miss.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">GA4 event model</h2>
          <p>
            GA4 replaced Universal Analytics&rsquo; session-based, hit-type model (pageview, event, social, transaction) with a unified event model. Every data point is an event with parameters. A purchase is an event. A pageview is an event. A session start is an event.
          </p>
          <p>
            This provides flexibility but introduces complexity. GA4 supports up to 500 distinct event names per property and 25 custom parameters per event. Events are categorized into 4 tiers:
          </p>
          <p>
            &mdash; <strong className="font-medium">Automatically collected</strong> &mdash; first_visit, session_start, user_engagement (no setup needed)<br />
            &mdash; <strong className="font-medium">Enhanced measurement</strong> &mdash; scroll, click, file_download, video_start (toggle on/off)<br />
            &mdash; <strong className="font-medium">Recommended</strong> &mdash; Google-defined names like purchase, add_to_cart, sign_up (manual setup)<br />
            &mdash; <strong className="font-medium">Custom</strong> &mdash; anything else you define (manual setup with custom parameters)
          </p>
          <p>
            The challenge: all of this depends on the client-side JavaScript executing successfully. If the GA4 script is blocked by an ad blocker &mdash; affecting <Link href="/glossary/ad-blocker-analytics-impact" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">a share of visitors that varies by audience</Link> &mdash; no events are captured at all. Zero pageviews, zero conversions, zero engagement data.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">Server-side vs client-side event tracking</h2>
          <p>
            Client-side event tracking relies on JavaScript running in the visitor&rsquo;s browser. This creates three failure points: ad blockers prevent the script from loading, <Link href="/glossary/consent-management-platform" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">consent banners</Link> prevent it from firing, and <Link href="/glossary/intelligent-tracking-prevention" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">browser restrictions</Link> limit cookie duration.
          </p>
          <p>
            Server-side event tracking moves data collection to the server layer. Events are captured as HTTP requests process through your infrastructure, before the response reaches the browser. There is no client-side script to block, no cookie to restrict, and no consent dependency for privacy-compliant analytics.
          </p>
          <p>
            <Link href="/glossary/first-party-data-collection" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">First-party</Link>, <Link href="/glossary/cookieless-analytics" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">cookieless</Link> event tracking captures interactions without consent gaps &mdash; providing the complete behavioral dataset that metrics like <Link href="/glossary/bounce-rate" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">bounce rate</Link>, engagement rate, and conversion rate depend on.
          </p>
        </div>

        <CommercialModule hook="See your key events — signups, carts, checkouts — counted without consent gaps, not just on the consented visits." />

        <RelatedGlossaryTerms slug="event-tracking" />

        <div className="mt-10 pt-6 border-t border-warm-100">
          <p className="text-[0.85rem] text-text-tertiary">
            Learn more: <Link href="/blog/cookieless-analytics-explained" className="text-text-secondary no-underline border-b border-warm-200 pb-0.5 hover:text-text-primary transition-colors">Cookieless Analytics Explained</Link> &middot; <Link href="/how-it-works" className="text-text-secondary no-underline border-b border-warm-200 pb-0.5 hover:text-text-primary transition-colors">How Sealmetrics Works</Link>
          </p>
        </div>
      </div>
    </article>
    </>
  );
}
