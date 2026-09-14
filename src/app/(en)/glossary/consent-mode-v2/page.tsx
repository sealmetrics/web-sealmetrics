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
  title: "What Is Google Consent Mode v2? — Sealmetrics Glossary",
  description:
    "Consent Mode v2 lets Google tags load without cookies when consent is rejected, then models the missing data statistically. A modelling layer, not measurement.",
  openGraph: {
    title: "What Is Google Consent Mode v2?",
    description: "How Consent Mode v2 actually works, what it estimates rather than measures, and when modelling stops being the right answer.",
    type: "article",
    url: "https://sealmetrics.com/glossary/consent-mode-v2/",
    siteName: "Sealmetrics",
    locale: "en_US",
    images: [ogImage("/glossary/consent-mode-v2/")],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "What Is Google Consent Mode v2?",
    description: "How Consent Mode v2 actually works, what it estimates rather than measures, and when modelling stops being the right answer.",
    images: [ogImage("/glossary/consent-mode-v2/")],
  },
  alternates: { canonical: "https://sealmetrics.com/glossary/consent-mode-v2/" },
};

export default function ConsentModeV2Page() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Glossary", href: "/glossary" }, { label: "Google Consent Mode v2" }]} />
      <JsonLd
        data={definedTermSchema({
          name: "Google Consent Mode v2",
          description:
            "Google's framework allowing Analytics and Ads tags to load without storing cookies when consent is rejected, then statistically modelling the missing data.",
          url: "/glossary/consent-mode-v2",
          related: [
            { name: "Consent Management Platform", url: "/glossary/consent-management-platform" },
            { name: "GDPR Analytics Compliance", url: "/glossary/gdpr-analytics-compliance" },
            { name: "Data Loss in Analytics", url: "/glossary/data-loss-in-analytics" },
            { name: "Cookieless Analytics", url: "/glossary/cookieless-analytics" },
          ],
        })}
      />
      <JsonLd data={breadcrumbSchema([{ name: "Glossary", url: "/glossary" }, { name: "Google Consent Mode v2", url: "/glossary/consent-mode-v2" }])} />
      <article className="pt-12 pb-28 bg-white">
        <div className="max-w-[720px] mx-auto px-5 sm:px-8">
          <header className="mb-12">
            <span className="inline-block text-[0.75rem] font-medium tracking-[0.08em] uppercase text-text-tertiary mb-4">Definition</span>
            <h1 className="font-serif text-[2.5rem] font-medium text-text-primary leading-[1.2] mb-6">Google Consent Mode v2</h1>
          </header>
          <div className="space-y-6 text-[1.05rem] leading-[1.8] text-text-body">
            <div className="p-6 bg-warm-white border border-warm-100 rounded-[4px]">
              <p className="text-[1rem] text-text-primary font-medium">
                Google&rsquo;s framework that allows Analytics and Ads tags to load without storing cookies when the visitor has rejected consent, then statistically models the missing data so that GA4 and Google Ads reports show estimated totals instead of only the consenting fraction.
              </p>
            </div>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">How it works</h2>
            <p>When a visitor rejects cookies, Consent Mode v2 prevents the analytics cookie from being written but still fires a &ldquo;cookieless ping&rdquo; — a request that records the event without any identifier. Google then aggregates the cookieless pings across many properties and uses a machine-learning model trained on the consenting visitors to estimate what the rejecting visitors probably did: how many sessions, how many conversions, by channel. The estimates appear in GA4 and Google Ads as if they were measured.</p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">Modelled, not measured</h2>
            <p>This is the important distinction. Consent Mode v2 fills the gap; it does not close it. The number you see in GA4 with Consent Mode enabled is the consenting 13–40% of EU visitors plus a statistical estimate of the rest. The estimate is useful when you need a ballpark — directionally correct for cross-channel comparisons in stable markets — and unreliable when you need exact reconciliation against CRM revenue, when a new channel mix breaks the training assumptions, or when you are auditing for compliance and the data subject asks &ldquo;was my visit measured?&rdquo;.</p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">When measurement is the right answer</h2>
            <p>For board-level revenue decisions, for CFO reconciliation, for the cost-of-customer calculations a serious finance team will defend — modelling is the wrong layer. <Link href="/glossary/cookieless-analytics" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">Cookieless analytics</Link> measures visitors who accept and reject the banner on the same anonymous-aggregate basis, with no model in between. See the architectural argument on the <Link href="/complete-data" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">complete data pillar</Link>.</p>
          </div>
          <CommercialModule hook="Consent Mode v2 models what it can't observe. Sealmetrics counts what actually happened — compare modelled against measured on your own traffic." />

          <RelatedGlossaryTerms slug="consent-mode-v2" />
          <div className="mt-10 pt-6 border-t border-warm-100">
            <p className="text-[0.85rem] text-text-tertiary">
              Learn more: <Link href="/blog/why-ga4-shows-13pct-eu-traffic" className="text-text-secondary no-underline border-b border-warm-200 pb-0.5 hover:text-text-primary transition-colors">Why GA4 Shows 13% of EU Traffic</Link>
            </p>
          </div>

          <div className="mt-12">
            <QuickAnswer>
              <p>
                Google Consent Mode v2 is the framework that allows Google Analytics 4 and Google Ads tags to keep working — partially — when a visitor rejects cookie consent. Instead of writing a cookie, the tag fires an anonymous &ldquo;cookieless ping&rdquo; that records the event without an identifier. Google then uses a machine-learning model to estimate what the non-consenting visitors probably did across sessions and conversions, and surfaces those estimates in the dashboard alongside the measured consenting visitors.
              </p>
              <p>
                The result is a modelled total, not a measured one. Useful for directional cross-channel comparisons; unreliable for revenue reconciliation against a CRM, for new-channel attribution where the training data is sparse, or for compliance audits where every individual data subject&rsquo;s visit must be accounted for. Cookieless first-party server-side measurement removes the model entirely — visitors are counted on the same anonymous-aggregate basis whether or not they accept the banner, with no estimation layer between the event and the number.
              </p>
            </QuickAnswer>
          </div>
        </div>
      </article>
    </>
  );
}
