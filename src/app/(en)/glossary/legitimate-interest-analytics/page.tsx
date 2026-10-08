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
  title: "Legitimate Interest (Analytics) — Sealmetrics Glossary",
  description:
    "GDPR Art. 6(1)(f) allows processing on legitimate-interest grounds. Why it doesn't override ePrivacy consent rules, and when it applies to analytics.",
  openGraph: {
    title: "Legitimate Interest as a Basis for Analytics",
    description: "What legitimate interest covers and doesn't — the common confusion with ePrivacy and the cookie-consent rule.",
    type: "article",
    url: "https://sealmetrics.com/glossary/legitimate-interest-analytics/",
    siteName: "Sealmetrics",
    locale: "en_US",
    images: [ogImage("/glossary/legitimate-interest-analytics/")],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Legitimate Interest as a Basis for Analytics",
    description: "What legitimate interest covers and doesn't — the common confusion with ePrivacy and the cookie-consent rule.",
    images: [ogImage("/glossary/legitimate-interest-analytics/")],
  },
  alternates: { canonical: "https://sealmetrics.com/glossary/legitimate-interest-analytics/" },
};

export default function LegitimateInterestAnalyticsPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Glossary", href: "/glossary" }, { label: "Legitimate Interest (Analytics)" }]} />
      <JsonLd
        data={definedTermSchema({
          name: "Legitimate Interest (Analytics)",
          description:
            "GDPR Article 6(1)(f) lawful basis: processing personal data is permitted when a controller has a legitimate purpose that does not override the data subject's rights.",
          url: "/glossary/legitimate-interest-analytics",
          related: [
            { name: "GDPR Analytics Compliance", url: "/glossary/gdpr-analytics-compliance" },
            { name: "Consent Management Platform", url: "/glossary/consent-management-platform" },
            { name: "Cookieless Analytics", url: "/glossary/cookieless-analytics" },
            { name: "ePrivacy Directive", url: "/glossary/eprivacy-directive" },
          ],
        })}
      />
      <JsonLd data={breadcrumbSchema([{ name: "Glossary", url: "/glossary" }, { name: "Legitimate Interest (Analytics)", url: "/glossary/legitimate-interest-analytics" }])} />
      <article className="pt-12 pb-28 bg-white">
        <div className="max-w-[720px] mx-auto px-5 sm:px-8">
          <header className="mb-12">
            <span className="inline-block text-[0.75rem] font-medium tracking-[0.08em] uppercase text-text-tertiary mb-4">Definition</span>
            <h1 className="font-serif text-[2.5rem] font-medium text-text-primary leading-[1.2] mb-6">Legitimate Interest (Analytics)</h1>
          </header>
          <div className="space-y-6 text-[1.05rem] leading-[1.8] text-text-body">
            <div className="p-6 bg-warm-white border border-warm-100 rounded-[4px]">
              <p className="text-[1rem] text-text-primary font-medium">
                GDPR Article 6(1)(f) lawful basis: a controller may process personal data when it has a legitimate purpose, the processing is necessary for that purpose, and the data subject&rsquo;s rights and freedoms do not override the interest. Sometimes invoked as a basis for analytics — but with important caveats.
              </p>
            </div>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">The three-part test</h2>
            <p>To rely on Art. 6(1)(f), the controller must document a three-part test: a legitimate purpose (understanding website use), necessity (the processing achieves the purpose), and balancing (the data subject&rsquo;s rights do not override). The EDPB has accepted this reasoning for basic analytics provided the controller does not build per-user profiles, does not enable cross-site tracking, and stores no personal data beyond what is strictly needed for aggregate measurement.</p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">Why GDPR is not enough</h2>
            <p>The common mistake: assuming a Art. 6(1)(f) DPIA replaces the cookie banner. It does not. <Link href="/glossary/eprivacy-directive" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">ePrivacy Article 5(3)</Link> applies independently of GDPR&rsquo;s lawful basis. Storing a cookie or reading localStorage requires consent regardless of how the data is processed afterward. Legitimate interest unlocks GDPR; ePrivacy still requires the banner.</p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">When it does work</h2>
            <p>Art. 6(1)(f) becomes the right basis when paired with an architecture that does not trigger ePrivacy: no cookie, no localStorage, no device storage. Server-side aggregate measurement falls in this category — GDPR scope may or may not engage (if no personal data is processed, it does not), and ePrivacy explicitly does not. This is the legal foundation of <Link href="/consentless-analytics" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">consentless analytics</Link>: the analytics is designed to comply by architecture, not by paperwork.</p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">Authority guidance</h2>
            <p>The CNIL, German DSK, AEPD, Italian Garante and UK ICO have all published guidance accepting legitimate interest for analytics — provided the architecture meets the exemption criteria (no per-user identification, no cross-site tracking, aggregate reporting, EU-only processing). The convergence makes legitimate interest the cleaner-than-consent path for analytics that is built correctly.</p>
          </div>
          <CommercialModule hook="Sealmetrics stores nothing on the device and no data that identifies anyone, and its reports are always aggregated. See how that works on your own site." />

          <RelatedGlossaryTerms slug="legitimate-interest-analytics" />
          <div className="mt-10 pt-6 border-t border-warm-100">
            <p className="text-[0.85rem] text-text-tertiary">
              Learn more: <Link href="/blog/gdpr-analytics-without-consent" className="text-text-secondary no-underline border-b border-warm-200 pb-0.5 hover:text-text-primary transition-colors">GDPR Analytics Without Consent</Link>
            </p>
          </div>

          <div className="mt-12">
            <QuickAnswer>
              <p>
                Legitimate interest is the GDPR Art. 6(1)(f) lawful basis that lets a controller process personal data without consent when it has a documented legitimate purpose, the processing is necessary for that purpose, and the data subject&rsquo;s rights do not override the interest. For analytics, the EDPB has accepted this reasoning when the processing is aggregate, anonymous, and does not enable cross-site tracking or per-user profiling.
              </p>
              <p>
                The common mistake is to assume legitimate interest replaces the cookie banner. It does not. ePrivacy Article 5(3) requires consent for storage on or access to a terminal device regardless of GDPR&rsquo;s lawful basis. Legitimate interest only unlocks GDPR; the banner is still required for any analytics that uses cookies. The two rules combined produce a clean lawful path only when the architecture itself avoids cookies and identifiers — which is the basis on which the CNIL, DSK, AEPD, Garante and ICO have all written their analytics exemption guidance.
              </p>
            </QuickAnswer>
          </div>
        </div>
      </article>
    </>
  );
}
