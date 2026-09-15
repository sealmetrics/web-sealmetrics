import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { TldrBlock } from "@/components/ui/TldrBlock";
import {
  articleSchema,
  breadcrumbSchema,
  speakableWebPageSchema,
} from "@/lib/schema";
import { getAlternates } from "@/lib/i18n/navigation";
import { FinalCtaSharedV3 } from "@/components/sections/v3/FinalCtaSharedV3";
import { ogImage } from "@/lib/seo/og";

const PILLAR_DATE_PUBLISHED = "2026-05-28";
const PILLAR_DATE_MODIFIED = "2026-05-28";

export const metadata: Metadata = {
  title: "Consentless analytics — lawful measurement without banners",
  description:
    "Consentless analytics: the legal route to web measurement without cookie banners. GDPR, ePrivacy, CNIL exemption — what makes it lawful, by architecture.",
  openGraph: {
    title: "Consentless analytics — lawful by architecture",
    description:
      "How analytics can be lawful under GDPR and ePrivacy without a consent banner — the architectural path, the authority guidance, the limits.",
    type: "article",
    images: [ogImage("/consentless-analytics/")],
    url: "https://sealmetrics.com/consentless-analytics/",
    siteName: "Sealmetrics",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Consentless analytics — lawful by architecture",
    description: "How analytics can be lawful under GDPR and ePrivacy without a consent banner — the architectural path, the authority guidance, the limits.",
    images: [ogImage("/consentless-analytics/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/consentless-analytics/",
    languages: getAlternates("/consentless-analytics"),
  },
};

const faqs = [
  {
    q: "Is consentless analytics actually legal under GDPR?",
    a: "It depends on the actual processing and applicable rules. Review whether personal data is processed, whether information is stored on or read from a device, and whether an exemption applies. The CNIL describes a conditional exemption for audience measurement. The other official sources linked below should be reviewed on their own terms; they do not establish a uniform exemption or certify a product.",
  },
  {
    q: "What would the EU Digital Omnibus change?",
    a: (<>The Commission proposal <a href="https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=COM:2025:837:FIN" className="text-brand underline">COM(2025) 837</a> addresses changes to the digital legislative framework, including data protection and terminal-device rules. Check the legislative procedure and final text before changing a compliance decision. A proposal is not evidence that a particular analytics deployment qualifies for an exemption.</>),
  },
  {
    q: "Do I still need a cookie banner for other reasons?",
    a: "Possibly — for Google Ads pixels, Meta pixels, A/B testing tools or any third-party script that does set cookies. Sealmetrics removes the analytics-specific reason for the banner, not every reason. Many teams reduce the banner's scope (or eliminate it on pages without ad pixels) once analytics moves to a consentless layer.",
  },
  {
    q: "How does this differ from \"consent-light\" or \"privacy-friendly\" tools?",
    a: "Product labels are not enough to compare deployments. Check identifiers, purposes, data combination and reporting capabilities against the applicable requirements. Sealmetrics focuses on aggregate measurement; review its current documentation and your configuration before deciding whether consent is required.",
  },
  {
    q: "What about Schrems II and US transfers?",
    a: "Review the hosting location, sub-processors, remote access and actual data flows in the current DPA and TPSR package. Assess transfer requirements against that deployment; an EU hosting address alone does not settle every transfer question.",
  },
  {
    q: "Can the legal basis change if I add CRM or marketing tools later?",
    a: "Review the combined setup whenever tools, purposes or data flows change. Linking analytics to CRM data or adding advertising tags can change the processing that needs assessment. Recheck the conditions of any exemption and the consent requirements for each tool.",
  },
];

const authorities = [
  {
    country: "France",
    body: "CNIL",
    summary: (<> Review the CNIL guidance on audience measurement and the conditions for a consent exemption. <a href="https://www.cnil.fr/fr/node/677" className="text-brand underline">Official guidance</a>.</>),
  },
  {
    country: "Germany",
    body: "DSK / BfDI",
    summary: (<> Consult the DSK guidance for the rules applicable to the actual German deployment. <a href="https://www.datenschutzkonferenz-online.de/" className="text-brand underline">Official guidance</a>.</>),
  },
  {
    country: "Spain",
    body: "AEPD",
    summary: (<> Review the AEPD cookie guide and assess the purpose and configuration of measurement. <a href="https://www.aepd.es/guias/guia-cookies.pdf" className="text-brand underline">Official guidance</a>.</>),
  },
  {
    country: "Italy",
    body: "Garante",
    summary: (<> Consult the Garante guidance on cookies and other tracking technologies. <a href="https://www.garanteprivacy.it/temi/cookie" className="text-brand underline">Official guidance</a>.</>),
  },
  {
    country: "United Kingdom",
    body: "ICO (PECR)",
    summary: (<> Review the current ICO guidance on PECR and the conditions relevant to statistical measurement. <a href="https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guide-to-pecr/cookies-and-similar-technologies/" className="text-brand underline">Official guidance</a>.</>),
  },
  {
    country: "Netherlands",
    body: "Autoriteit Persoonsgegevens",
    summary: (<> Consult the Dutch authority guidance on cookies and analytics before assessing an exemption. <a href="https://www.autoriteitpersoonsgegevens.nl/en/themes/internet-telephone-apps/cookies" className="text-brand underline">Official guidance</a>.</>),
  },
];

export default function ConsentlessAnalyticsPillar() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Consentless analytics" }]} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Consentless analytics", url: "/consentless-analytics" },
        ])}
      />
      <JsonLd
        data={speakableWebPageSchema({
          url: "/consentless-analytics",
          name: "Consentless analytics — lawful web measurement without banners",
        })}
      />
      <JsonLd
        data={articleSchema({
          headline:
            "Consentless analytics — the legal route to web measurement without cookie banners",
          description:
            "How analytics can be lawful under GDPR and ePrivacy without a consent banner. The conditions to assess, official regulatory sources, and the compliance documentation.",
          datePublished: PILLAR_DATE_PUBLISHED,
          dateModified: PILLAR_DATE_MODIFIED,
          url: "/consentless-analytics",
          category: "Privacy",
          author: {
            name: "Rafa Jiménez",
            url: "/authors/rafa-jimenez",
            jobTitle: "Founder, Sealmetrics",
          },
        })}
      />

      {/* HERO */}
      <section className="relative overflow-hidden bg-warm-white pt-28 md:pt-32 pb-12">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-8 text-center">
          <span
            className="eyebrow mb-5"
            style={{ display: "inline-flex", justifyContent: "center" }}
          >
            Pillar — Consentless analytics
          </span>
          <h1
            className="h-display mx-auto mt-5"
            style={{ maxWidth: "24ch" }}
          >
            Analytics without consent banners.{" "}
            <em
              className="italic font-medium"
              style={{ color: "#E8B84B", fontStyle: "italic" }}
            >
              Lawful by architecture, not by paperwork.
            </em>
          </h1>
          <p
            className="text-ink-soft mt-8 mx-auto max-w-[64ch] leading-[1.55]"
            style={{ fontSize: "clamp(17px, 1.4vw, 20px)" }}
          >
            Consent requirements depend on the processing and the applicable
            rules. Review the technical configuration alongside official
            guidance to understand when measurement can operate without
            a consent dialog, and what conditions still apply.
          </p>
        </div>
      </section>

      <TldrBlock
        answer={
          <>
            Cookieless analytics and consent-exempt analytics describe
            different things. Some analytics configurations may qualify for
            a consent exemption, depending on their purpose and operation. Removing cookies alone does not establish
            whether a deployment needs consent: the data collected, tracking
            purposes, identifiers and applicable rules also matter. When
            evaluating Sealmetrics, review the actual
            implementation, data flows, hosting and reporting needs rather
            than relying on a cookieless label. Check the relevant
            regulator&apos;s conditions and the vendor&apos;s configuration
            guidance. Avoid treating either the absence of cookies or a
            product description as a blanket compliance guarantee.
          </>
        }
        bullets={[
          <>
            <strong>Personal data</strong> — assess every processing stage,
            including collection, before determining the applicable rules.
          </>,
          <>
            <strong>Device access</strong> — check storage and access practices
            as well as the conditions of any applicable exemption.
          </>,
          <>
            <strong>Local guidance</strong> needs a jurisdiction-specific review;
            do not assume that exemptions are identical across countries.
          </>,
          <>
            <strong>Data flows</strong> — review hosting, sub-processors and
            access arrangements when assessing transfer requirements.
          </>,
        ]}
      />

      <p className="max-w-[840px] mx-auto px-5 sm:px-8 mt-6 text-[14px] leading-[1.7] text-ink-soft text-center">
        Review the scope and conditions in the{" "}
        <a
          href="https://www.cnil.fr/fr/node/677"
          className="text-brand underline decoration-1 underline-offset-2"
        >
          CNIL&apos;s analytics exemption criteria
        </a>
        .
      </p>

      {/* WHY BANNERS FAILED */}
      <section className="py-20 bg-white border-t border-warm-100">
        <div className="max-w-[840px] mx-auto px-5 sm:px-8">
          <h2 className="h-section">Why cookie banners stopped working</h2>
          <p className="mt-6 text-[17px] leading-[1.75] text-ink-soft">
            Consent banners were never a measurement strategy — they were a
            compliance instrument bolted onto a measurement strategy that
            assumed everyone said yes. Three things broke that assumption,
            and one regulation in 2026 broke it further.
          </p>

          <div className="mt-10 space-y-8">
            <div>
              <h3 className="text-[18px] font-semibold text-ink mb-2">
                Rejection rates climbed past the break-even line
              </h3>
              <p className="text-[16px] leading-[1.7] text-ink-soft">
                When most European visitors said yes, cookie analytics could
                absorb the loss. Today consent-based tools lose 15–60% of EU
                visitors, depending on sector, brand strength and traffic mix — on one Shopify store measured over 48 days,
                GA4 did not record 29% of visits. Decisions made on what remains are decisions made on a
                self-selected sample — typically older, less mobile, less
                privacy-aware. The bias is silent and structural.
              </p>
            </div>

            <div>
              <h3 className="text-[18px] font-semibold text-ink mb-2">
                Review the consent interface as well as the analytics
              </h3>
              <p className="text-[16px] leading-[1.7] text-ink-soft">
                If other tools on the site require consent, review their interface
                and behavior separately. Check whether the choices shown to
                visitors match the tracking that actually occurs, using the
                relevant authority guidance linked below.
              </p>
            </div>

            <div>
              <h3 className="text-[18px] font-semibold text-ink mb-2">
                Measure the effect of your consent interface
              </h3>
              <p className="text-[16px] leading-[1.7] text-ink-soft">
                Check how your consent interface affects engagement on your own site.
                Compare page interaction and consent choices using a measurement
                method that respects those choices. Do not assume a universal
                abandonment rate or attribute every lost visit to the banner.
              </p>
            </div>

            <div>
              <h3 className="text-[18px] font-semibold text-ink mb-2">
                The Digital Omnibus would redraw the line
              </h3>
              <p className="text-[16px] leading-[1.7] text-ink-soft">
                The Commission&apos;s proposal of November 2025 would move
                the terminal-device rules into the GDPR and exempt
                first-party, aggregated audience measurement from consent.
                It is still a proposal — adoption is realistically
                2027&ndash;2028 — but the direction is clear. Read the
                practical implications in{" "}
                <Link
                  href="/blog/eu-digital-omnibus-cookie-banners-analytics"
                  className="text-brand underline decoration-1 underline-offset-2"
                >
                  the marketer&apos;s guide
                </Link>
                . Net effect: the legal cost of running cookie-based
                analytics rose; the legal cost of running consentless
                analytics is zero.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* THE LEGAL ROUTE */}
      <section className="py-20 bg-warm-white border-t border-warm-100">
        <div className="max-w-[840px] mx-auto px-5 sm:px-8">
          <h2 className="h-section">The architectural route to lawfulness</h2>
          <p className="mt-6 text-[17px] leading-[1.75] text-ink-soft">
            The exemption is not a clever interpretation; it is the original
            wording. Three regulatory anchors define the path, and a
            measurement system either sits inside them by design or it does
            not.
          </p>

          <div className="mt-10 space-y-6">
            <div className="border border-warm-100 rounded-2xl p-7 bg-white">
              <h3 className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-brand mb-2">
                Anchor 1
              </h3>
              <h4 className="text-[18px] font-semibold text-ink mb-3">
                GDPR Article 2 — material scope
              </h4>
              <p className="text-[16px] leading-[1.7] text-ink-soft">
                GDPR applies to &ldquo;the processing of personal
                data.&rdquo; Personal data is any information that relates
                to an identified or identifiable natural person. If a
                measurement system processes only aggregate counts — never
                an identifier, never a fingerprint, never a behavioural
                profile — the system does not process personal data. The
                Regulation does not apply to its measurement output. Assess the data processed at every stage, not only the final report.
              </p>
            </div>

            <div className="border border-warm-100 rounded-2xl p-7 bg-white">
              <h3 className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-brand mb-2">
                Anchor 2
              </h3>
              <h4 className="text-[18px] font-semibold text-ink mb-3">
                ePrivacy Article 5(3) — terminal-device storage
              </h4>
              <p className="text-[16px] leading-[1.7] text-ink-soft">
                ePrivacy requires consent before storing or accessing
                information on the user&apos;s terminal device. The classic
                example is a cookie. If the measurement system writes no
                cookie, reads no localStorage, and uses no device
                fingerprint, there is nothing on the terminal device to
                trigger Art. 5(3). No consent dialog is required for that
                processing path.
              </p>
            </div>

            <div className="border border-warm-100 rounded-2xl p-7 bg-white">
              <h3 className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-brand mb-2">
                Anchor 3
              </h3>
              <h4 className="text-[18px] font-semibold text-ink mb-3">
                The CNIL analytics exemption criteria
              </h4>
              <p className="text-[16px] leading-[1.7] text-ink-soft">
                The CNIL describes a conditional exemption for audience measurement.
                Its scope includes restrictions on purpose, combining data and
                use across sites, alongside other requirements. Review the
                complete <a href="https://www.cnil.fr/fr/node/677" className="text-brand underline">CNIL guidance</a>
                against the deployed configuration. A product label alone
                does not establish that every condition is met.
              </p>
            </div>
          </div>

          <p className="mt-10 text-[17px] leading-[1.75] text-ink-soft">
            The technical implementation — first-party server-side
            collection without identifiers — is documented at{" "}
            <Link
              href="/cookieless-analytics"
              className="text-brand underline decoration-1 underline-offset-2"
            >
              cookieless analytics
            </Link>
            . The architecture diagram and pipeline detail live at{" "}
            <Link
              href="/how-it-works"
              className="text-brand underline decoration-1 underline-offset-2"
            >
              How it works
            </Link>
            .
          </p>
        </div>
      </section>

      {/* COUNTRY AUTHORITIES */}
      <section className="py-20 bg-white border-t border-warm-100">
        <div className="max-w-[1000px] mx-auto px-5 sm:px-8">
          <h2 className="h-section text-center">
            Authority guidance, by country
          </h2>
          <p className="mt-6 text-[17px] leading-[1.75] text-ink-soft text-center max-w-[64ch] mx-auto">
                Consent rules and exemptions depend on the jurisdiction and the
                deployed configuration. The official sources below provide
                starting points for review; they are not product endorsements.
              </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
            {authorities.map((a) => (
              <div
                key={a.country}
                className="border border-warm-100 rounded-xl p-6 bg-warm-white"
              >
                <div className="flex items-baseline justify-between mb-3">
                  <h3 className="text-[16px] font-semibold text-ink">
                    {a.country}
                  </h3>
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-brand">
                    {a.body}
                  </span>
                </div>
                <p className="text-[14px] leading-[1.6] text-ink-soft">
                  {a.summary}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-12 text-[15px] leading-[1.7] text-ink-soft text-center max-w-[60ch] mx-auto">
            Country-specific deep-dives — including the CNIL
            self-assessment, the UK PECR exemption walkthrough, and the
            Digital Omnibus marketer guide — live on the{" "}
            <Link
              href="/blog"
              className="text-brand underline decoration-1 underline-offset-2"
            >
              blog
            </Link>
            .
          </p>
        </div>
      </section>

      {/* CONSENTLESS VS CONSENT-LIGHT */}
      <section className="py-20 bg-warm-white border-t border-warm-100">
        <div className="max-w-[840px] mx-auto px-5 sm:px-8">
          <h2 className="h-section">
            &ldquo;Consentless&rdquo; vs &ldquo;consent-light&rdquo; — the
            distinction that matters for DPOs
          </h2>
          <p className="mt-6 text-[17px] leading-[1.75] text-ink-soft">
            A common confusion: lightweight analytics tools that claim
            &ldquo;no cookie banner needed&rdquo; while still setting a
            first-party cookie or a randomised visitor ID. From a CMP-
            integration perspective the experience is similar. From a
            regulatory perspective the two are not in the same category.
          </p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-warm-100 rounded-2xl p-7 bg-white">
              <h3 className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] mb-3" style={{ color: "#B5423B" }}>
                Consent-light
              </h3>
              <ul className="space-y-2 text-[15px] leading-[1.6] text-ink list-none pl-0">
                {[
                  "Sets a first-party cookie or visitor ID (often randomised).",
                  "Justifies under &ldquo;legitimate interest&rdquo; — a position several authorities have rejected for cross-session tracking.",
                  "Stores the identifier on the terminal device → ePrivacy Art. 5(3) still triggers.",
                  "Argument depends on banner-free interpretation that authorities can challenge case-by-case.",
                ].map((s) => (
                  <li key={s} className="flex gap-3">
                    <span style={{ color: "#B5423B" }} aria-hidden>—</span>
                    <span dangerouslySetInnerHTML={{ __html: s }} />
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-warm-100 rounded-2xl p-7 bg-white">
              <h3 className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-brand mb-3">
                Consentless (Sealmetrics)
              </h3>
              <ul className="space-y-2 text-[15px] leading-[1.6] text-ink list-none pl-0">
                {[
                  "Sets no cookie, writes no localStorage, no visitor ID generated.",
                  "Review the collection and processing stages to establish whether personal data is involved.",
                  "Review terminal-device storage and access practices separately from reporting output.",
                  "Review the deployed configuration against the applicable local guidance and exemption conditions.",
                ].map((s) => (
                  <li key={s} className="flex gap-3">
                    <span className="text-brand" aria-hidden>—</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="mt-10 text-[15px] leading-[1.7] text-ink-soft">
            For a DPO reviewing vendor risk, the practical question is:
            does the tool&apos;s defence rely on regulatory interpretation,
            or on the absence of triggering conditions? Consentless
            architecture is the second answer.
          </p>
        </div>
      </section>

      {/* COMPLIANCE STACK */}
      <section className="py-20 bg-white border-t border-warm-100">
        <div className="max-w-[840px] mx-auto px-5 sm:px-8">
          <h2 className="h-section">What ships with the platform</h2>
          <p className="mt-6 text-[17px] leading-[1.75] text-ink-soft">
            The architectural exemption removes the consent burden. The
            following documentation supports the rest of a vendor review:
          </p>

          <div className="mt-10 space-y-5">
            {[
              {
                name: "DPA",
                detail:
                  "Data Processing Agreement, GDPR Art. 28 compliant, signed by Sealmetrics S.L. as processor. Pre-filled, ready to counter-sign.",
              },
              {
                name: "TPSR package",
                detail:
                  "Transfer, Privacy and Security Review document. Covers data flows, sub-processors (none outside the EU on visitor data), retention, encryption at rest and in transit, access controls, breach procedure.",
              },
              {
                name: "Sub-processor list",
                detail:
                  "Full list of sub-processors with their roles, jurisdictions and DPAs ships inside the TPSR package. All EU-only by policy.",
              },
              {
                name: "Hosting & residency",
                detail:
                  "Review the current hosting and sub-processor documentation, including jurisdictions and access arrangements, when assessing data residency and transfers.",
              },
              {
                name: "Retention",
                detail:
                  "Fixed and identical for every plan, enforced by automatic database TTLs: event-level technical log 1 day, hourly aggregates 90 days, daily aggregates and conversions 24 months. No raw individual-level data is stored beyond the millisecond-level aggregation window.",
              },
            ].map((row) => (
              <div
                key={row.name}
                className="flex gap-5 pb-5 border-b border-warm-100 last:border-0"
              >
                <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-brand whitespace-nowrap pt-1 min-w-[120px]">
                  {row.name}
                </span>
                <p className="text-[15px] leading-[1.7] text-ink">
                  {row.detail}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-10 text-[15px] leading-[1.7] text-ink-soft">
            Full security and architecture documentation lives at{" "}
            <Link
              href="/security"
              className="text-brand underline decoration-1 underline-offset-2"
            >
              Security
            </Link>
            . We are not currently certified to ISO 27001 or SOC 2 — the
            roadmap and the controls we already operate are documented in
            full.
          </p>
        </div>
      </section>

      {/* BY SECTOR */}
      <section className="py-20 bg-warm-white border-t border-warm-100">
        <div className="max-w-[960px] mx-auto px-5 sm:px-8">
          <h2 className="h-section text-center">
            Deep-dives by jurisdiction and scenario
          </h2>
          <p className="mt-6 text-[17px] leading-[1.75] text-ink-soft text-center max-w-[60ch] mx-auto">
            The legal pattern is portable. The friction points are local.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-12">
            {[
              {
                href: "/blog/gdpr-analytics-without-consent",
                tag: "GDPR",
                title: "GDPR analytics without consent",
                lede: "The full Art. 6 / Art. 5(3) reasoning, with worked examples from CNIL, DSK, AEPD enforcement files.",
              },
              {
                href: "/blog/cnil-self-assessment-published",
                tag: "France · CNIL",
                title: "The CNIL self-assessment, published",
                lede: "Walk through the five exemption criteria with Sealmetrics' actual answers, side by side.",
              },
              {
                href: "/blog/uk-pecr-analytics-exemption",
                tag: "UK · PECR",
                title: "UK PECR analytics exemption",
                lede: "Post-Brexit position. ICO guidance. DUAA 2025 walkthrough for a UK-only deployment.",
              },
              {
                href: "/blog/eu-digital-omnibus-cookie-banners-analytics",
                tag: "Digital Omnibus 2026",
                title: "The marketer's guide to the Digital Omnibus",
                lede: "What changed for banners, what changed for analytics, and what to action this quarter.",
              },
              {
                href: "/blog/consent-banner-impact-on-analytics",
                tag: "Measurement loss",
                title: "What consent banners cost your analytics data",
                lede: "Industry-by-industry rejection rates and the cost of decisions made on the survivor sample.",
              },
              {
                href: "/blog/eu-digital-omnibus-marketer-guide-2026",
                tag: "Compliance roadmap",
                title: "Digital Omnibus marketer roadmap",
                lede: "Quarter-by-quarter actions for marketing leaders in EU-regulated markets.",
              },
            ].map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="group block border border-warm-100 rounded-xl p-7 bg-white no-underline transition-all hover:border-warm-200 hover:-translate-y-0.5"
              >
                <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">
                  {s.tag}
                </span>
                <h3 className="mt-3 text-[18px] font-semibold tracking-[-0.01em] text-ink leading-[1.3] group-hover:text-brand transition-colors">
                  {s.title}
                </h3>
                <p className="mt-3 text-[14.5px] leading-[1.6] text-ink-soft">
                  {s.lede}
                </p>
                <span className="inline-flex items-center gap-1.5 mt-5 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-brand">
                  Read →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white border-t border-warm-100">
        <div className="max-w-[840px] mx-auto px-5 sm:px-8">
          <h2 className="h-section text-center">Common DPO questions</h2>
          <dl className="mt-12 divide-y divide-warm-100 border-y border-warm-100">
            {faqs.map((f) => (
              <div key={f.q} className="py-7">
                <dt className="text-[17px] font-semibold text-ink mb-3">
                  {f.q}
                </dt>
                <dd
                  data-speakable
                  className="faq-answer text-[15.5px] leading-[1.7] text-ink-soft max-w-[68ch]"
                >
                  {f.a}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <FinalCtaSharedV3
        locale="en"
        titleEn={
          <>
            One <em
              className="italic font-medium"
              style={{ color: "#E8B84B", fontStyle: "italic" }}
            >
              compliance review
            </em>. Done.
          </>
        }
        titleEs={
          <>
            Una <em
              className="italic font-medium"
              style={{ color: "#E8B84B", fontStyle: "italic" }}
            >
              revisión legal
            </em>. Resuelta.
          </>
        }
        ledeEn="Book a 30-minute walkthrough with the founder. Bring your DPO. We answer the architecture questions and hand over the DPA + TPSR package on the call."
        ledeEs="Reserva 30 min con el founder. Trae a tu DPO. Resolvemos las preguntas de arquitectura y te entregamos el DPA + TPSR en la llamada."
      />
    </>
  );
}
