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
  title: "GDPR Analytics Compliance — Sealmetrics Glossary",
  description:
    "What GDPR requires from web analytics: lawful basis, data minimization, purpose limitation, and consent for cookie-based tracking.",
  openGraph: {
    title: "GDPR Analytics Compliance",
    description: "What GDPR requires from web analytics: lawful basis, data minimization, and consent for cookies.",
    type: "article",
    url: "https://sealmetrics.com/glossary/gdpr-analytics-compliance/",
    siteName: "Sealmetrics",
    locale: "en_US",
    images: [ogImage("/glossary/gdpr-analytics-compliance/")],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "GDPR Analytics Compliance",
    description: "What GDPR requires from web analytics: lawful basis, data minimization, and consent for cookies.",
    images: [ogImage("/glossary/gdpr-analytics-compliance/")],
  },
  alternates: { canonical: "https://sealmetrics.com/glossary/gdpr-analytics-compliance/", languages: getAlternates("/glossary/gdpr-analytics-compliance") },
};

export default function GDPRCompliancePage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Glossary", href: "/glossary" }, { label: "GDPR Analytics Compliance" }]} />
      <JsonLd data={definedTermSchema({ name: "GDPR Analytics Compliance", description: "Meeting GDPR requirements for web analytics data collection and processing.", url: "/glossary/gdpr-analytics-compliance", related: [{ name: "Consent Management Platform (CMP)", url: "/glossary/consent-management-platform" }, { name: "Analytics Data Residency", url: "/glossary/analytics-data-residency" }, { name: "Cookieless Analytics", url: "/glossary/cookieless-analytics" }, { name: "First-Party Data Collection", url: "/glossary/first-party-data-collection" }] })} />
      <JsonLd data={breadcrumbSchema([{ name: "Glossary", url: "/glossary" }, { name: "GDPR Analytics Compliance", url: "/glossary/gdpr-analytics-compliance" }])} />
      <article className="pt-12 pb-28 bg-white">
        <div className="max-w-[720px] mx-auto px-5 sm:px-8">
        <header className="mb-12">
          <span className="inline-block text-[0.75rem] font-medium tracking-[0.08em] uppercase text-text-tertiary mb-4">Definition</span>
          <h1 className="font-serif text-[2.5rem] font-medium text-text-primary leading-[1.2] mb-6">GDPR Analytics Compliance</h1>
        </header>

        <div className="space-y-6 text-[1.05rem] leading-[1.8] text-text-body">
          <div className="p-6 bg-warm-white border border-warm-100 rounded-[4px]">
            <p className="text-[1rem] text-text-primary font-medium">
              Meeting GDPR requirements for web analytics: lawful basis for processing, data minimization, purpose limitation, and — if using cookies — valid consent collection before tracking.
            </p>
          </div>
          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">What does GDPR require from web analytics?</h2>
          <p>The General Data Protection Regulation (GDPR) applies to any processing of personal data of EU residents. For web analytics, the key requirements are:</p>
          <ul className="space-y-2 pl-0 list-none">
            {[
              "Lawful basis — typically consent (Article 6(1)(a)) for cookie-based tracking, or legitimate interest for non-personal data collection",
              "Data minimization — collect only what is necessary for the stated purpose",
              "Purpose limitation — use the data only for the declared analytics purpose",
              "Storage limitation — define and enforce data retention periods",
              "Data subject rights — facilitate access, rectification, erasure requests",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-[0.95rem]">
                <span className="text-text-tertiary shrink-0">&mdash;</span>
                {item}
              </li>
            ))}
          </ul>
          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">What does the ePrivacy Directive add?</h2>
          <p>Beyond GDPR, the ePrivacy Directive (Article 5(3)) requires consent before accessing or storing information on a user&rsquo;s device — which includes setting cookies. This is why <Link href="/glossary/consent-management-platform" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">consent management platforms</Link> are required for cookie-based analytics.</p>
          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">How does cookieless analytics achieve compliance by architecture?</h2>
          <p><Link href="/glossary/cookieless-analytics" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">Cookieless analytics</Link> approaches compliance differently. By collecting no personal data and storing nothing on the visitor&rsquo;s device, the consent requirement under ePrivacy does not apply, and GDPR obligations are minimal. This is consistent with guidance from CNIL (France), DSK (Germany), and other EU data protection authorities on audience measurement exemptions.</p>
        </div>
        <CommercialModule hook="Designed for GDPR from the architecture up (self-assessed), not by banner. See how Sealmetrics measures visits without consent gaps or personal data." />

        <RelatedGlossaryTerms slug="gdpr-analytics-compliance" />
        <div className="mt-10 pt-6 border-t border-warm-100">
          <p className="text-[0.85rem] text-text-tertiary">
            Learn more: <Link href="/security" className="text-text-secondary no-underline border-b border-warm-200 pb-0.5 hover:text-text-primary transition-colors">Security & Privacy Architecture</Link> &middot; <Link href="/blog/gdpr-analytics-without-consent" className="text-text-secondary no-underline border-b border-warm-200 pb-0.5 hover:text-text-primary transition-colors">GDPR Analytics Without Consent</Link>
          </p>
        </div>

        <div className="mt-12">
          <QuickAnswer>
            <p>
              GDPR analytics compliance is the practice of meeting the EU&rsquo;s General Data Protection Regulation requirements when measuring website traffic — lawful basis for processing, data minimisation, purpose limitation, storage limitation, and where cookies are involved, valid consent collected before any tracking begins. The ePrivacy Directive (Article 5(3)) adds a second layer: consent is required before reading or storing information on a user&rsquo;s device, which covers cookies, localStorage, fingerprinting and similar mechanisms.
            </p>
            <p>
              Two architectural paths satisfy these obligations. Cookie-based analytics (GA4, Adobe Analytics, Piwik PRO) require a Consent Management Platform; visitors who reject the banner are excluded from measurement, which costs these tools 15–60% of EU traffic depending on sector, brand strength and traffic mix. Cookieless analytics avoids the trigger entirely: with no personal data collected and no identifier stored on the device, neither GDPR&rsquo;s lawful-basis requirement nor ePrivacy&rsquo;s consent requirement is engaged. CNIL&rsquo;s 2020 audience-measurement deliberation explicitly supports this approach when properly implemented.
            </p>
          </QuickAnswer>
        </div>
      </div>
    </article>
    </>
  );
}
