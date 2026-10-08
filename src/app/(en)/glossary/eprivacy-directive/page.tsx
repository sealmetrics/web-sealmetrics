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
  title: "What Is the ePrivacy Directive? — Sealmetrics Glossary",
  description:
    "Directive 2002/58/EC — the EU rule (Art. 5(3)) requiring consent before storing or reading information on a device. The legal basis for cookie banners.",
  openGraph: {
    title: "What Is the ePrivacy Directive?",
    description: "Article 5(3) explained, how it interacts with GDPR, and how architecture, not consent, can keep analytics exempt.",
    type: "article",
    url: "https://sealmetrics.com/glossary/eprivacy-directive/",
    siteName: "Sealmetrics",
    locale: "en_US",
    images: [ogImage("/glossary/eprivacy-directive/")],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "What Is the ePrivacy Directive?",
    description: "Article 5(3) explained, how it interacts with GDPR, and how architecture, not consent, can keep analytics exempt.",
    images: [ogImage("/glossary/eprivacy-directive/")],
  },
  alternates: { canonical: "https://sealmetrics.com/glossary/eprivacy-directive/" },
};

export default function EPrivacyDirectivePage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Glossary", href: "/glossary" }, { label: "ePrivacy Directive" }]} />
      <JsonLd
        data={definedTermSchema({
          name: "ePrivacy Directive",
          description:
            "EU Directive 2002/58/EC governing privacy in electronic communications, including the rule that consent is required before storing or accessing information on a user's terminal device.",
          url: "/glossary/eprivacy-directive",
          related: [
            { name: "GDPR Analytics Compliance", url: "/glossary/gdpr-analytics-compliance" },
            { name: "Consent Management Platform", url: "/glossary/consent-management-platform" },
            { name: "Cookieless Analytics", url: "/glossary/cookieless-analytics" },
            { name: "Analytics Data Residency", url: "/glossary/analytics-data-residency" },
          ],
        })}
      />
      <JsonLd data={breadcrumbSchema([{ name: "Glossary", url: "/glossary" }, { name: "ePrivacy Directive", url: "/glossary/eprivacy-directive" }])} />
      <article className="pt-12 pb-28 bg-white">
        <div className="max-w-[720px] mx-auto px-5 sm:px-8">
          <header className="mb-12">
            <span className="inline-block text-[0.75rem] font-medium tracking-[0.08em] uppercase text-text-tertiary mb-4">Definition</span>
            <h1 className="font-serif text-[2.5rem] font-medium text-text-primary leading-[1.2] mb-6">ePrivacy Directive</h1>
          </header>
          <div className="space-y-6 text-[1.05rem] leading-[1.8] text-text-body">
            <div className="p-6 bg-warm-white border border-warm-100 rounded-[4px]">
              <p className="text-[1rem] text-text-primary font-medium">
                EU Directive 2002/58/EC governing privacy and confidentiality in electronic communications. Article 5(3) — the rule that consent is required before storing or accessing information on a user&rsquo;s terminal device — is the legal basis for cookie consent banners.
              </p>
            </div>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">ePrivacy vs GDPR — different rules, often confused</h2>
            <p>ePrivacy and <Link href="/glossary/gdpr-analytics-compliance" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">GDPR</Link> are two separate frameworks that frequently apply to the same processing. GDPR governs &ldquo;the processing of personal data&rdquo; — any information relating to an identified or identifiable person. ePrivacy governs &ldquo;storage and access&rdquo; on a user&rsquo;s device, regardless of whether the data is personal. Analytics that sets a cookie engages both: the cookie is storage on the device (ePrivacy) and the data it carries is typically personal (GDPR).</p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">Article 5(3) — the consent rule</h2>
            <p>Art. 5(3) requires that the user has given consent &ldquo;having been provided with clear and comprehensive information&rdquo; before any information is stored on or accessed from their terminal device. The classic example is a cookie. The carve-outs are narrow: strictly necessary cookies (cart, session) and — in most member states&rsquo; interpretation — anonymous audience measurement that does not allow cross-site tracking. The CNIL, AEPD, DSK and ICO have all published explicit exemption criteria for the latter.</p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">Why cookieless analytics sits outside Art. 5(3)</h2>
            <p>Art. 5(3) triggers on storage of or access to terminal-device information. <Link href="/glossary/cookieless-analytics" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">Cookieless analytics</Link> writes no cookie and no localStorage and keeps no persistent identifier. What lets it run without consent is the audience-measurement exemption: statistics for the site's own audience only, no cross-site tracking, no reuse. The data path is first-party server-side, the events are aggregated, and the architecture meets the exemption criteria the authorities have published. See the full legal walk-through on the <Link href="/consentless-analytics" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">consentless analytics pillar</Link>.</p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">The ePrivacy Regulation that never arrived</h2>
            <p>The proposed ePrivacy Regulation (intended to replace the Directive) has been in draft since 2017 and has never been adopted. The Digital Omnibus (COM(2025) 837, proposed 19 November 2025) would take a different route — moving the terminal-device rules into the GDPR under a new Article 88a and exempting first-party, aggregated audience measurement for the controller&apos;s own use. It is also still only a proposal: Parliament and Council have yet to agree a text, and adoption is realistically 2027&ndash;2028. Until then Article 5(3) of the Directive, as transposed by each member state, is the rule that applies.</p>
          </div>
          <CommercialModule hook="ePrivacy is why the banners exist. Sealmetrics stores nothing on the device — see analytics that doesn't need the banner to measure." />

          <RelatedGlossaryTerms slug="eprivacy-directive" />
          <div className="mt-10 pt-6 border-t border-warm-100">
            <p className="text-[0.85rem] text-text-tertiary">
              Learn more: <Link href="/blog/eu-digital-omnibus-cookie-banners-analytics" className="text-text-secondary no-underline border-b border-warm-200 pb-0.5 hover:text-text-primary transition-colors">EU Digital Omnibus — Marketer Guide</Link>
            </p>
          </div>

          <div className="mt-12">
            <QuickAnswer>
              <p>
                The ePrivacy Directive (Directive 2002/58/EC) is the EU framework on privacy in electronic communications, distinct from but often co-applied with GDPR. Its Article 5(3) is the legal basis for cookie consent banners: storing or accessing information on a user&rsquo;s terminal device requires informed consent, except for strictly necessary functions and — per CNIL, AEPD, DSK and ICO guidance — anonymous audience measurement that does not enable cross-site tracking.
              </p>
              <p>
                For analytics, the consequence is binary: if the tool sets a cookie or stores any identifier on the device, ePrivacy Art. 5(3) triggers and a consent banner is required regardless of GDPR posture. If the tool writes nothing on the device — cookieless, no localStorage — keeps no persistent identifier and uses what it reads only for the site's own audience statistics, it fits the audience-measurement exemption and consent is not required. Sealmetrics is built to the second pattern: server-side, first-party, aggregate-only, with a session identifier that rotates daily.
              </p>
            </QuickAnswer>
          </div>
        </div>
      </article>
    </>
  );
}
