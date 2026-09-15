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
  title: "What Is Server-Side Tracking? — Sealmetrics Glossary",
  description:
    "Server-side tracking processes analytics events on the server rather than in the browser, avoiding ad blocker blocking and client-side limitations.",
  openGraph: {
    title: "What Is Server-Side Tracking?",
    description: "Server-side tracking processes analytics on the server, avoiding ad blockers and client-side limitations.",
    type: "article",
    url: "https://sealmetrics.com/glossary/server-side-tracking/",
    siteName: "Sealmetrics",
    locale: "en_US",
    images: [ogImage("/glossary/server-side-tracking/")],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "What Is Server-Side Tracking?",
    description: "Server-side tracking processes analytics on the server, avoiding ad blockers and client-side limitations.",
    images: [ogImage("/glossary/server-side-tracking/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/glossary/server-side-tracking/",
    // The Spanish page points here; without the return link the hreflang
    // pair is one-sided and Google discards it.
    languages: getAlternates("/glossary/server-side-tracking"),
  },
};

export default function ServerSideTrackingPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Glossary", href: "/glossary" }, { label: "Server-Side Tracking" }]} />
      <JsonLd data={definedTermSchema({ name: "Server-Side Tracking", description: "Data collection method where events are processed on the server rather than the browser.", url: "/glossary/server-side-tracking", related: [{ name: "First-Party Data Collection", url: "/glossary/first-party-data-collection" }, { name: "Cookieless Analytics", url: "/glossary/cookieless-analytics" }, { name: "Ad Blocker Impact on Analytics", url: "/glossary/ad-blocker-analytics-impact" }, { name: "Event Tracking", url: "/glossary/event-tracking" }] })} />
      <JsonLd data={breadcrumbSchema([{ name: "Glossary", url: "/glossary" }, { name: "Server-Side Tracking", url: "/glossary/server-side-tracking" }])} />
      <article className="pt-12 pb-28 bg-white">
        <div className="max-w-[720px] mx-auto px-5 sm:px-8">
        <header className="mb-12">
          <span className="inline-block text-[0.75rem] font-medium tracking-[0.08em] uppercase text-text-tertiary mb-4">Definition</span>
          <h1 className="font-serif text-[2.5rem] font-medium text-text-primary leading-[1.2] mb-6">Server-Side Tracking</h1>
        </header>
        <div className="space-y-6 text-[1.05rem] leading-[1.8] text-text-body">
          <div className="p-6 bg-warm-white border border-warm-100 rounded-[4px]">
            <p className="text-[1rem] text-text-primary font-medium">
              Data collection method where analytics events are processed on the server rather than in the browser. Avoids client-side blocking by ad blockers and browser privacy features.
            </p>
          </div>
          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">Client-side vs. server-side</h2>
          <p>Traditional analytics (GA4, Adobe) rely on client-side JavaScript to capture events. The script runs in the visitor&rsquo;s browser, collects data, and sends it to an external analytics server. This approach is vulnerable to ad blockers (which block the script or the outgoing request) and browser privacy features (which restrict cookie storage).</p>
          <p>Server-side tracking moves the processing to your server. A minimal script captures behavioral signals and sends them to your own domain, where server-side logic processes, enriches, and stores the data. The server handles session management, event processing, and data forwarding — none of which can be blocked by client-side tools.</p>
          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">Combined with first-party collection</h2>
          <p>Server-side tracking is most effective when combined with <Link href="/glossary/first-party-data-collection" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">first-party data collection</Link>. When the entire data path is first-party (your domain) and server-side (your server), the analytics infrastructure avoids the third-party lists blocking tools use and third-party cookie restrictions in browsers.</p>
        </div>
        <CommercialModule hook="Sealmetrics counts events server-side over your own first-party path. See what reaches the server when nothing blocks the way." />

        <RelatedGlossaryTerms slug="server-side-tracking" />
        <div className="mt-10 pt-6 border-t border-warm-100">
          <p className="text-[0.85rem] text-text-tertiary">
            Learn more: <Link href="/how-it-works" className="text-text-secondary no-underline border-b border-warm-200 pb-0.5 hover:text-text-primary transition-colors">How Sealmetrics Works</Link> &middot; <Link href="/blog/cookieless-analytics-explained" className="text-text-secondary no-underline border-b border-warm-200 pb-0.5 hover:text-text-primary transition-colors">Cookieless Analytics Explained</Link>
          </p>
        </div>

        <div className="mt-12">
          <QuickAnswer>
            <p>
              Server-side tracking processes analytics events on a server you control instead of inside the visitor&rsquo;s browser. A minimal client-side hook (or a server-to-server beacon for backend events like Shopify orders) ships the raw signal to your own endpoint; processing, enrichment and storage happen server-side. Because the request never leaves the first-party origin and no script is exposed to ad-blocker rule lists, the data path is resilient to ~40% client-side data loss caused by uBlock, Brave and the analytics block-lists shipped with iOS Safari content blockers.
            </p>
            <p>
              Server-side does not automatically mean &ldquo;cookieless.&rdquo; A server-side tracker can still set a first-party cookie or generate a visitor ID — at which point it triggers ePrivacy Art. 5(3) and requires consent. Sealmetrics is server-side AND cookieless: events are counted in aggregate with no per-visitor identifier, which is what makes the architecture both resilient and consent-free.
            </p>
          </QuickAnswer>
        </div>
      </div>
    </article>
    </>
  );
}
