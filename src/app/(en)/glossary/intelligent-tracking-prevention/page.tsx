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
  title: "What Is Intelligent Tracking Prevention (ITP)?",
  description:
    "ITP is Safari's privacy feature that limits cookie lifespan and blocks cross-site tracking. It reduces first-party cookie life to 7 days or less.",
  openGraph: {
    title: "What Is Intelligent Tracking Prevention (ITP)?",
    description: "ITP is Safari's privacy feature that limits cookie lifespan. Learn how it affects analytics.",
    type: "article",
    url: "https://sealmetrics.com/glossary/intelligent-tracking-prevention/",
    siteName: "Sealmetrics",
    locale: "en_US",
    images: [ogImage("/glossary/intelligent-tracking-prevention/")],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "What Is Intelligent Tracking Prevention (ITP)?",
    description: "ITP is Safari's privacy feature that limits cookie lifespan. Learn how it affects analytics.",
    images: [ogImage("/glossary/intelligent-tracking-prevention/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/glossary/intelligent-tracking-prevention/",
    // The Spanish page points here; without the return link the hreflang
    // pair is one-sided and Google discards it.
    languages: getAlternates("/glossary/intelligent-tracking-prevention"),
  },
};

export default function ITPPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Glossary", href: "/glossary" }, { label: "Intelligent Tracking Prevention" }]} />
      <JsonLd data={definedTermSchema({ name: "Intelligent Tracking Prevention", description: "Apple Safari's privacy feature that limits cookie lifespan and cross-site tracking.", url: "/glossary/intelligent-tracking-prevention", related: [{ name: "Cookieless Analytics", url: "/glossary/cookieless-analytics" }, { name: "First-Party Data Collection", url: "/glossary/first-party-data-collection" }, { name: "Data Loss in Analytics", url: "/glossary/data-loss-in-analytics" }, { name: "Ad Blocker Impact on Analytics", url: "/glossary/ad-blocker-analytics-impact" }] })} />
      <JsonLd data={breadcrumbSchema([{ name: "Glossary", url: "/glossary" }, { name: "Intelligent Tracking Prevention", url: "/glossary/intelligent-tracking-prevention" }])} />
      <article className="pt-12 pb-28 bg-white">
        <div className="max-w-[720px] mx-auto px-5 sm:px-8">
        <header className="mb-12">
          <span className="inline-block text-[0.75rem] font-medium tracking-[0.08em] uppercase text-text-tertiary mb-4">Definition</span>
          <h1 className="font-serif text-[2.5rem] font-medium text-text-primary leading-[1.2] mb-6">Intelligent Tracking Prevention (ITP)</h1>
        </header>
        <div className="space-y-6 text-[1.05rem] leading-[1.8] text-text-body">
          <div className="p-6 bg-warm-white border border-warm-100 rounded-[4px]">
            <p className="text-[1rem] text-text-primary font-medium">
              Apple Safari&rsquo;s privacy feature that limits cookie lifespan and blocks cross-site tracking. ITP reduces first-party cookie life to 7 days (or 24 hours when set via JavaScript with tracking query parameters) and blocks all third-party cookies.
            </p>
          </div>
          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">Impact on analytics</h2>
          <p>Safari holds approximately 20% of European browser market share (higher on mobile). ITP means that any visitor who returns after 7 days appears as a &ldquo;new&rdquo; visitor in cookie-based analytics — inflating new user counts and fragmenting user journeys.</p>
          <p>For analytics that rely on cookies for session stitching and attribution, ITP makes accurate multi-visit tracking effectively impossible on Safari. Combined with Firefox&rsquo;s Enhanced Tracking Protection (ETP), more than 35% of browser traffic is subject to aggressive cookie restrictions.</p>
          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">Why first-party measurement is unaffected</h2>
          <p><Link href="/glossary/cookieless-analytics" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">Cookieless analytics</Link> does not store cookies on the visitor&rsquo;s device, so ITP and ETP have no effect on data collection. The <Link href="/glossary/first-party-data-collection" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">first-party cookieless</Link> approach keeps capturing sessions when ITP and ETP restrict cookies.</p>
        </div>
        <CommercialModule hook="ITP can't expire what was never stored. See your Safari traffic counted with no cookie to expire." />

        <RelatedGlossaryTerms slug="intelligent-tracking-prevention" />
        <div className="mt-10 pt-6 border-t border-warm-100">
          <p className="text-[0.85rem] text-text-tertiary">
            Learn more: <Link href="/blog/cookieless-analytics-explained" className="text-text-secondary no-underline border-b border-warm-200 pb-0.5 hover:text-text-primary transition-colors">Cookieless Analytics Explained</Link> &middot; <Link href="/how-it-works" className="text-text-secondary no-underline border-b border-warm-200 pb-0.5 hover:text-text-primary transition-colors">How Sealmetrics Works</Link>
          </p>
        </div>

        <div className="mt-12">
          <QuickAnswer>
            <p>
              Intelligent Tracking Prevention (ITP) is Apple Safari&rsquo;s machine-learning-driven privacy system that caps first-party analytics cookies at 7 days, drops third-party cookies entirely, and shortens cookie lifespan to 24 hours when the cookie is set via JavaScript on a page that arrived with a tracking query parameter. Firefox ships an equivalent feature called Enhanced Tracking Protection (ETP).
            </p>
            <p>
              For analytics that depend on cookies to recognise returning visitors or stitch multi-day attribution, ITP makes accurate measurement effectively impossible on the 20%+ of EU traffic that uses Safari. Cookieless first-party server-side collection sets no cookie, so ITP and ETP have no effect — visits are counted on the same anonymous-aggregate basis regardless of browser, regardless of how many days have passed.
            </p>
          </QuickAnswer>
        </div>
      </div>
    </article>
    </>
  );
}
