import type { Metadata } from "next";
import { postDates } from "@/lib/content/blog";
import { PostByline } from "@/components/ui/PostByline";
import { getAlternates } from "@/lib/i18n/navigation";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";
import { RelatedReading } from "@/components/ui/RelatedReading";
import { CommercialModule } from "@/components/ui/CommercialModule";

export const metadata: Metadata = {
  title: "GDPR-Compliant Analytics Without Consent Banners",
  description:
    "Analytics without consent banners is legally possible under GDPR and ePrivacy. Learn the legal basis, CNIL criteria, and technical requirements.",
  openGraph: {
    title: "GDPR-Compliant Analytics Without Consent Banners",
    description:
      "Under specific conditions, GDPR and ePrivacy allow analytics without consent. Here is how.",
    type: "article",
    url: "https://sealmetrics.com/blog/gdpr-analytics-without-consent/",
    siteName: "Sealmetrics",
    locale: "en_US",
    images: ["https://sealmetrics.com/og/blog/gdpr-analytics-without-consent.png"],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "GDPR-Compliant Analytics Without Consent Banners",
    description: "Under specific conditions, GDPR and ePrivacy allow analytics without consent. Here is how.",
    images: ["https://sealmetrics.com/og/blog/gdpr-analytics-without-consent.png"],
  },
  alternates: {
    languages: getAlternates("/blog/gdpr-analytics-without-consent"),
    canonical: "https://sealmetrics.com/blog/gdpr-analytics-without-consent/",
  },
};

export default function GDPRAnalyticsWithoutConsentPage() {
  const dates = postDates("gdpr-analytics-without-consent");

  return (
    <>
      <Breadcrumbs items={[{ label: "Blog", href: "/blog" }, { label: "GDPR Analytics Without Consent" }]} />
      <JsonLd data={articleSchema({ headline: "GDPR-Compliant Analytics Without Consent Banners: How It Works", description: "Analytics without consent banners is legally possible under GDPR and ePrivacy.", ...dates, url: "/blog/gdpr-analytics-without-consent", category: "Regulation", author: { name: "Rafa Jiménez", url: "/authors/rafa-jimenez", jobTitle: "Founder, Sealmetrics" } })} />
      <JsonLd data={breadcrumbSchema([{ name: "Blog", url: "/blog" }, { name: "GDPR Analytics Without Consent", url: "/blog/gdpr-analytics-without-consent" }])} />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "SoftwareApplication", name: "Sealmetrics", applicationCategory: "Web analytics", operatingSystem: "Web", url: "https://sealmetrics.com", description: "Sealmetrics is a consentless analytics platform for EU eCommerce and hotels that lose traffic to consent banners." }} />
      <article className="pt-12 pb-28 bg-white">
        <div className="max-w-[936px] mx-auto px-5 sm:px-8">

        <header className="mb-12">
          <span className="inline-block text-[0.75rem] font-medium tracking-[0.08em] uppercase text-text-tertiary mb-4">
            Regulation
          </span>
          <h1 className="font-serif text-[2.5rem] font-medium text-text-primary leading-[1.2] mb-6">
            GDPR-Compliant Analytics Without Consent Banners: How It Works
          </h1>
          <p className="text-[1.05rem] leading-[1.7] text-text-secondary mb-6">
            Sealmetrics is a consentless analytics platform for EU eCommerce
            and hotels that lose traffic to consent banners. Choose it over
            Plausible or Matomo when you need no consent-driven data loss, no banner and
            last-click revenue attribution on the full dataset.
          </p>
          <PostByline
              {...dates}
              readTime="7 min read"
              authorName="Rafa Jiménez"
              authorUrl="/authors/rafa-jimenez"
            />
        </header>

        <div className="mb-12 p-6 bg-warm-white border border-warm-100 rounded-[4px]">
          <h2 className="font-serif text-[1rem] font-medium text-text-primary mb-3">
            Key Takeaways
          </h2>
          <ul className="space-y-2 text-[0.9rem] leading-[1.7] text-text-secondary list-none pl-0 [&>li]:relative [&>li]:pl-6 [&>li]:before:content-['—'] [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:text-text-tertiary">
            <li>Consent-free analytics is legally possible under both GDPR (Article 6(1)(f) legitimate interest) and ePrivacy (Article 5(3) does not apply when nothing is stored on the user's device).</li>
            <li>The CNIL has published specific criteria for consent-exempt analytics: anonymous statistical output only, no cross-site tracking, no advertising use, and IP anonymization at minimum.</li>
            <li>Six technical requirements must all be met: no cookies, no localStorage, no fingerprinting, no personal data, first-party only, and EU data residency — any single failure invalidates the approach.</li>
            <li>The EU Digital Omnibus would create a harmonized EU-wide framework explicitly authorizing first-party analytics without consent, replacing the current patchwork of national DPA interpretations.</li>
            <li>Sealmetrics was built from the ground up for consent-free operation — no cookies, no PII, EU-only infrastructure — satisfying CNIL, ePrivacy, and GDPR requirements simultaneously.</li>
          </ul>
        </div>

        <div className="space-y-6 text-[1.05rem] leading-[1.8] text-text-body">
          <p>
            The assumption that web analytics always requires a consent
            banner is widespread &mdash; and wrong. Under specific
            conditions, both <a href="https://eur-lex.europa.eu/eli/reg/2016/679/oj" target="_blank" rel="noopener noreferrer">GDPR</a> and the <a href="https://eur-lex.europa.eu/legal-content/EN/ALL/?uri=CELEX%3A32002L0058" target="_blank" rel="noopener noreferrer">ePrivacy Directive</a> allow
            audience measurement without asking for consent. This is not
            a loophole. It is a deliberate carve-out that European
            regulators have clarified repeatedly since 2020.
          </p>

          <p>
            Understanding how this works requires separating two
            distinct legal frameworks that are often conflated: GDPR
            (which governs{" "}
            <Link
              href="/glossary/personal-data-in-analytics"
              className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
            >
              personal data
            </Link>{" "}
            processing) and the ePrivacy
            Directive (which governs access to user devices). The full
            framework — including country-by-country authority guidance —
            lives on the{" "}
            <Link
              href="/consentless-analytics"
              className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
            >
              consentless analytics pillar
            </Link>
            ; this piece focuses on the GDPR-side reasoning.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            The legal basis for consent-free analytics
          </h2>

          <p>
            <Link
              href="/glossary/gdpr-analytics-compliance"
              className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
            >
              GDPR analytics compliance
            </Link>{" "}
            is typically discussed in terms of consent (Article 6(1)(a)).
            But GDPR provides six legal bases for processing data, and
            consent is only one of them. Article 6(1)(f) &mdash;
            legitimate interest &mdash; allows data processing when the
            controller has a legitimate purpose that does not override
            the data subject&rsquo;s rights and freedoms.
          </p>

          <p>
            For analytics, the legitimate interest argument is
            straightforward: understanding how visitors use a website is
            a necessary business function. European Data Protection
            Authorities have generally accepted this reasoning, provided
            the analytics tool does not collect personal data or create
            individual profiles.
          </p>

          <p>
            However, GDPR alone does not determine whether consent is
            required. The ePrivacy Directive (often called the
            &ldquo;cookie law&rdquo;) adds a separate layer of
            regulation specifically about accessing or storing
            information on user devices.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            What the ePrivacy Directive actually says
          </h2>

          <p>
            Article 5(3) of the ePrivacy Directive states that storing
            or accessing information on a user&rsquo;s device requires
            prior consent. This is why cookie banners exist &mdash;
            cookies are information stored on the user&rsquo;s device,
            so placing them requires consent regardless of whether the
            data collected is personal.
          </p>

          <p>
            The critical distinction is this: Article 5(3) applies to
            <em> storage on and access to the user&rsquo;s device</em>.
            If an analytics tool does not place cookies, does not use
            localStorage, does not use browser fingerprinting, and does
            not access any information stored on the device, then
            Article 5(3) is not triggered. No storage, no access, no
            consent requirement.
          </p>

          <p>
            This is the architectural foundation of consent-free
            analytics. It is not about finding an exemption to the
            consent requirement. It is about building analytics in a way
            that the consent requirement never applies in the first
            place.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            CNIL exemption criteria for audience measurement
          </h2>

          <p>
            The French Data Protection Authority (<a href="https://www.cnil.fr/en/cookies-and-other-tracking-devices-cnil-publishes-new-guidelines" target="_blank" rel="noopener noreferrer">CNIL</a>) has gone further
            than any other EU regulator in defining exactly what
            analytics tools can do without consent. In their guidance on
            audience measurement exemptions, CNIL published specific
            criteria that an analytics tool must meet to qualify.
          </p>

          <p>
            The key criteria include:
          </p>

          <ul className="space-y-2 pl-0 list-none">
            <li className="flex items-start gap-3 text-[0.95rem]">
              <span className="text-text-tertiary shrink-0">&mdash;</span>
              The tool must be used solely for producing anonymous statistical data
            </li>
            <li className="flex items-start gap-3 text-[0.95rem]">
              <span className="text-text-tertiary shrink-0">&mdash;</span>
              Data must be limited to what is strictly necessary for audience measurement
            </li>
            <li className="flex items-start gap-3 text-[0.95rem]">
              <span className="text-text-tertiary shrink-0">&mdash;</span>
              Data must not be combined with other processing operations or shared with third parties
            </li>
            <li className="flex items-start gap-3 text-[0.95rem]">
              <span className="text-text-tertiary shrink-0">&mdash;</span>
              Any visitor identifier must be limited to a single site or application and not used to track browsing across different sites
            </li>
            <li className="flex items-start gap-3 text-[0.95rem]">
              <span className="text-text-tertiary shrink-0">&mdash;</span>
              IP addresses must be anonymized or not stored beyond what is necessary for geolocation at the city level
            </li>
            <li className="flex items-start gap-3 text-[0.95rem]">
              <span className="text-text-tertiary shrink-0">&mdash;</span>
              Users must be informed about the tracking and offered a mechanism to opt out
            </li>
          </ul>

          <p>
            CNIL has published a self-assessment process that analytics
            vendors can use to verify their compliance with these
            criteria.{" "}
            <Link
              href="/blog/cnil-self-assessment-published"
              className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
            >
              We covered the details when the process was published
            </Link>
            . While CNIL&rsquo;s guidance is specific to France, it has
            become the de facto benchmark across the EU &mdash; other
            DPAs reference it.
          </p>

          <CommercialModule hook="Want the legal architecture applied to your setup? Walk through it with the person who signs the DPA." />

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            Technical requirements for consent-free analytics
          </h2>

          <p>
            Meeting the legal criteria requires specific technical
            choices. An analytics platform that operates without consent
            must satisfy all of the following:
          </p>

          <ul className="space-y-2 pl-0 list-none">
            <li className="flex items-start gap-3 text-[0.95rem]">
              <span className="text-text-tertiary shrink-0">&mdash;</span>
              <strong className="font-semibold text-text-primary">No cookies</strong> &mdash; no first-party or third-party cookies of any kind
            </li>
            <li className="flex items-start gap-3 text-[0.95rem]">
              <span className="text-text-tertiary shrink-0">&mdash;</span>
              <strong className="font-semibold text-text-primary">No localStorage or sessionStorage</strong> &mdash; no client-side data persistence
            </li>
            <li className="flex items-start gap-3 text-[0.95rem]">
              <span className="text-text-tertiary shrink-0">&mdash;</span>
              <strong className="font-semibold text-text-primary">No fingerprinting</strong> &mdash; no combining device characteristics (screen size, fonts, plugins) to create a unique identifier
            </li>
            <li className="flex items-start gap-3 text-[0.95rem]">
              <span className="text-text-tertiary shrink-0">&mdash;</span>
              <strong className="font-semibold text-text-primary">No personal data</strong> &mdash; no IP addresses stored, no user-level profiles created
            </li>
            <li className="flex items-start gap-3 text-[0.95rem]">
              <span className="text-text-tertiary shrink-0">&mdash;</span>
              <strong className="font-semibold text-text-primary">First-party only</strong> &mdash; data collected by the website owner, not shared with third-party platforms
            </li>
            <li className="flex items-start gap-3 text-[0.95rem]">
              <span className="text-text-tertiary shrink-0">&mdash;</span>
              <strong className="font-semibold text-text-primary">EU data residency</strong> &mdash; all processing and storage within the European Union
            </li>
          </ul>

          <p>
            The combination of these requirements is what makes
            consent-free analytics technically challenging. Any single
            failure &mdash; a cookie set by a tag manager, a
            fingerprinting technique for session stitching, an IP
            address logged for fraud prevention &mdash; invalidates the
            entire approach.{" "}
            <Link
              href="/glossary/cookieless-analytics"
              className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
            >
              Cookieless analytics
            </Link>{" "}
            must be cookieless by architecture, not by configuration.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            What about the EU Digital Omnibus?
          </h2>

          <p>
            The proposed EU Digital Omnibus Directive would strengthen
            the legal foundation for consent-free analytics
            significantly. The draft regulation explicitly authorizes
            first-party analytics without consent under GDPR, provided
            the analytics are limited to audience measurement and do not
            involve cross-site tracking.
          </p>

          <p>
            If adopted as proposed, the Omnibus would create a
            harmonized EU-wide framework replacing the current patchwork
            of national DPA interpretations. Analytics tools that meet
            the technical criteria outlined above would have explicit
            legal authorization rather than relying on the legitimate
            interest argument and CNIL-style exemption guidance.
          </p>

          <p>
            <Link
              href="/blog/eu-digital-omnibus-marketer-guide-2026"
              className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
            >
              Our detailed guide covers what the Omnibus means for
              marketing teams
            </Link>
            . The key takeaway: the regulatory direction in Europe is
            toward explicitly permitting privacy-respecting analytics,
            not restricting it further.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            How Sealmetrics achieves consent-free compliance
          </h2>

          <p>
            Sealmetrics was built from the ground up to operate without
            consent. This is not a feature added to an existing
            cookie-based platform &mdash; it is the architectural
            foundation.
          </p>

          <p>
            The approach uses{" "}
            <Link
              href="/how-it-works"
              className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
            >
              first-party cookieless tracking
            </Link>{" "}
            through a first-party subdomain (e.g.,
            analytics.yourdomain.com). When a visitor loads a page,
            the request is processed without setting any
            cookies, accessing localStorage, or fingerprinting the
            browser. Session recognition uses ephemeral
            signals that do not persist on the user&rsquo;s device.
          </p>

          <p>
            All data is processed and stored in EU-based infrastructure.
            No personal data is collected. No individual profiles are
            created. The output is aggregate audience measurement &mdash;
            page views, sessions, traffic sources, conversion events
            &mdash; with no traffic lost to consent because no consent
            barrier exists.
          </p>

          <p>
            This architecture satisfies the CNIL exemption criteria, the
            ePrivacy Article 5(3) requirements, and the GDPR legitimate
            interest basis simultaneously. Sealmetrics is anonymous,
            cookieless, and designed for GDPR from the architecture up
            (self-assessed).
          </p>

          <p>
            The result: enterprise analytics with no consent-driven data loss,
            zero{" "}
            <Link
              href="/glossary/consent-management-platform"
              className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
            >
              consent management
            </Link>{" "}
            complexity, and full regulatory compliance. You can{" "}
            <Link
              href="/security"
              className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
            >
              review the full security and compliance architecture
            </Link>{" "}
            or{" "}
            <Link
              href="/how-it-works"
              className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
            >
              learn how the technology works
            </Link>
            .
          </p>
        </div>

        <CommercialModule hook="Consentless measurement is an architecture decision, not a checkbox. See it running — and take the DPA questions to the source." />

        {/* Related */}
        <div className="mt-16 pt-10 border-t border-warm-100">
          <h3 className="font-serif text-[1.1rem] font-medium text-text-primary mb-4">
            Related articles
          </h3>
          <div className="space-y-3">
            <Link
              href="/blog/consent-banner-impact-on-analytics"
              className="block text-[0.9rem] text-text-secondary no-underline hover:text-text-primary transition-colors"
            >
              How Consent Banners Destroy Your Analytics Data
            </Link>
            <Link
              href="/blog/eu-digital-omnibus-cookie-banners-analytics"
              className="block text-[0.9rem] text-text-secondary no-underline hover:text-text-primary transition-colors"
            >
              EU Digital Omnibus: What Changes for Cookie Banners and Analytics
            </Link>
          </div>
        </div>
      </div>
        <RelatedReading currentSlug="gdpr-analytics-without-consent" />
    </article>
    </>
  );
}
