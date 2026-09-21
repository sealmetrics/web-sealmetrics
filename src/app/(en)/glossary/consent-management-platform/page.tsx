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
  title: "What Is a Consent Management Platform (CMP)?",
  description:
    "A CMP shows the cookie consent banner and stores choices. In our experience with clients, 40–60% of traffic rejects cookies, and analytics never sees it.",
  openGraph: {
    title: "What Is a Consent Management Platform (CMP)?",
    description: "A CMP shows the cookie consent banner and stores choices. In our experience with clients, 40–60% of traffic doesn't accept cookies.",
    type: "article",
    url: "https://sealmetrics.com/glossary/consent-management-platform/",
    siteName: "Sealmetrics",
    locale: "en_US",
    images: [ogImage("/glossary/consent-management-platform/")],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "What Is a Consent Management Platform (CMP)?",
    description: "A CMP shows the cookie consent banner and stores choices. In our experience with clients, 40–60% of traffic doesn't accept cookies.",
    images: [ogImage("/glossary/consent-management-platform/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/glossary/consent-management-platform/",
    // The Spanish page points here; without the return link the hreflang
    // pair is one-sided and Google discards it.
    languages: getAlternates("/glossary/consent-management-platform"),
  },
};

export default function ConsentManagementPlatformPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Glossary", href: "/glossary" }, { label: "Consent Management Platform" }]} />
      <JsonLd data={definedTermSchema({ name: "Consent Management Platform", description: "Software that manages cookie consent banners and user privacy preferences.", url: "/glossary/consent-management-platform", related: [{ name: "GDPR Analytics Compliance", url: "/glossary/gdpr-analytics-compliance" }, { name: "Cookieless Analytics", url: "/glossary/cookieless-analytics" }, { name: "Data Loss in Analytics", url: "/glossary/data-loss-in-analytics" }, { name: "Analytics Data Residency", url: "/glossary/analytics-data-residency" }] })} />
      <JsonLd data={breadcrumbSchema([{ name: "Glossary", url: "/glossary" }, { name: "Consent Management Platform", url: "/glossary/consent-management-platform" }])} />
      <article className="pt-12 pb-28 bg-white">
        <div className="max-w-[720px] mx-auto px-5 sm:px-8">
        <header className="mb-12">
          <span className="inline-block text-[0.75rem] font-medium tracking-[0.08em] uppercase text-text-tertiary mb-4">Definition</span>
          <h1 className="font-serif text-[2.5rem] font-medium text-text-primary leading-[1.2] mb-6">Consent Management Platform (CMP)</h1>
        </header>
        <div className="space-y-6 text-[1.05rem] leading-[1.8] text-text-body">
          <div className="p-6 bg-warm-white border border-warm-100 rounded-[4px]">
            <p className="text-[1rem] text-text-primary font-medium">
              Software that displays cookie consent banners and manages user preferences. Required under GDPR and ePrivacy Directive for websites that use cookies or collect personal data through analytics.
            </p>
          </div>
          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">The analytics cost of consent</h2>
          <p>CMPs are legally necessary for cookie-based analytics, but they create a fundamental measurement problem: visitors who reject cookies become invisible to analytics. In our experience with clients, between 40% and 60% of traffic doesn&rsquo;t accept cookies, and of those who do, 40% don&rsquo;t accept on the first pageview.</p>
          <p>This creates a systematic bias in your data. Your analytics over-represent the cookie-accepting segment and entirely miss the privacy-conscious segment, which often includes higher-value visitors.</p>
          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">The alternative</h2>
          <p><Link href="/glossary/cookieless-analytics" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">Cookieless analytics</Link> does not require a CMP for its operation because it does not use cookies or collect personal data. This eliminates the consent rejection data loss vector entirely while maintaining full <Link href="/glossary/gdpr-analytics-compliance" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">GDPR compliance</Link>.</p>
        </div>
        <CommercialModule hook="A CMP decides what your analytics sees. Sealmetrics stores nothing on the device, so nothing needs asking — see your numbers without a consent gate in front." />

        <RelatedGlossaryTerms slug="consent-management-platform" />
        <div className="mt-10 pt-6 border-t border-warm-100">
          <p className="text-[0.85rem] text-text-tertiary">
            Learn more: <Link href="/blog/consent-banner-impact-on-analytics" className="text-text-secondary no-underline border-b border-warm-200 pb-0.5 hover:text-text-primary transition-colors">How Consent Banners Destroy Your Analytics Data</Link> &middot; <Link href="/security" className="text-text-secondary no-underline border-b border-warm-200 pb-0.5 hover:text-text-primary transition-colors">Security & Privacy Architecture</Link>
          </p>
        </div>

        <div className="mt-12">
          <QuickAnswer>
            <p>
              A Consent Management Platform (CMP) is software that displays a cookie banner, captures the visitor&rsquo;s consent decision, and signals downstream tools (analytics, ad pixels, A/B testing) whether they may store cookies or read terminal-device information. Required under GDPR Art. 7 and ePrivacy Art. 5(3) for any tool that uses cookies, localStorage, or fingerprinting. What that costs analytics varies by site: in our experience with clients, between 40% and 60% of traffic doesn&rsquo;t accept cookies.
            </p>
            <p>
              The practical consequence: cookie-based analytics measure only the consenting fraction of visitors, creating a self-selected sample that biases every channel and conversion-rate decision built on it. Consentless architecture — no cookies, no identifiers, no terminal-device storage — sits outside the Art. 5(3) trigger and the GDPR material scope, so the CMP is not required for the analytics layer. Other tools (Meta pixel, Google Ads pixel) still need the banner if they remain in the stack.
            </p>
          </QuickAnswer>
        </div>
      </div>
    </article>
    </>
  );
}
