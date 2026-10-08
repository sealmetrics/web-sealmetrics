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

const DATE_PUBLISHED = "2026-05-29";
const DATE_MODIFIED = "2026-05-29";

export const metadata: Metadata = {
  title: "GDPR analytics in Germany — §25 TDDDG and the DSK position",
  description:
    "How analytics runs lawfully in Germany under §25 TDDDG. The DSK orientation paper, BfDI guidance, and the architectural exemption.",
  openGraph: {
    title: "GDPR analytics in Germany — §25 TDDDG and the DSK position",
    description:
      "The §25 TDDDG rule, the DSK orientation paper, and how cookieless architectures meet the exemption by design.",
    type: "article",
    images: [ogImage("/gdpr-analytics/germany/")],
    url: "https://sealmetrics.com/gdpr-analytics/germany/",
    siteName: "Sealmetrics",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "GDPR analytics in Germany — §25 TDDDG and the DSK position",
    description: "The §25 TDDDG rule, the DSK orientation paper, and how cookieless architectures meet the exemption by design.",
    images: [ogImage("/gdpr-analytics/germany/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/gdpr-analytics/germany/",
    languages: getAlternates("/gdpr-analytics/germany"),
  },
};

const criteria = [
  {
    n: "01",
    title: "No terminal-device storage",
    requirement: "§25 TDDDG requires consent before storing or accessing information on the user's terminal device — cookies, localStorage, fingerprinting.",
    us: "No cookie is set and no localStorage is written: nothing is stored on the device. The session identifier is ephemeral and rotates daily, and measurement is limited to the site's own audience statistics.",
  },
  {
    n: "02",
    title: "No personal-data processing",
    requirement: "DSK orientation paper: if no personal data is processed, GDPR's material scope does not apply.",
    us: "Aggregate channel counts only. No IP address stored, no persistent identifier created, no per-visitor profile. Nothing relating to an identifiable person.",
  },
  {
    n: "03",
    title: "No cross-site or fingerprinting",
    requirement: "BfDI guidance: tools that enable cross-site tracking or device fingerprinting cannot rely on the exemption.",
    us: "First-party server-side. Pixel runs on a CNAME under the customer's own domain. No third-party identifier, no fingerprint of IP + User-Agent stored. The session identifier is specific to each site and rotates daily, so it cannot be linked across sites or across days.",
  },
  {
    n: "04",
    title: "EU-only processing",
    requirement: "DSK and BfDI positions emphasise EU residency to avoid Schrems II transfer concerns layered on top of TDDDG questions.",
    us: "Processing exclusively in Dublin, Ireland — within the GDPR adequacy zone. No transfer impact assessment required because no transfer occurs.",
  },
];

const faqs = [
  {
    q: "Does the §25 TDDDG exemption apply to all analytics?",
    a: "No. The exemption requires that the analytics is strictly necessary for the operation of the service, OR meets the conditions for anonymous audience measurement — no terminal-device storage, no cross-site tracking, no personal data, EU processing. Cookie-based analytics with a visitor ID does not qualify; Sealmetrics' aggregate cookieless architecture does.",
  },
  {
    q: "What is the DSK orientation paper?",
    a: "The Datenschutzkonferenz — the conference of all German federal and state data protection authorities — publishes joint guidance. The 2022 orientation paper on telemedia consent specifies when §25 TDDDG requires consent and when it does not. The conditions for the exemption align with the EDPB Opinion 5/2019 and the CNIL guidance: aggregate, anonymous, EU-hosted, no identifier on the device.",
  },
  {
    q: "Does the BfDI agree with the state authorities?",
    a: "Generally yes, on the exemption itself. The BfDI handles federal-level matters; state DPAs (LDI NRW, LfD Bayern, etc.) handle most enforcement. The 2024 BfDI activity report reaffirmed the analytics exemption framing consistent with the DSK position. State authorities can take stronger positions on individual cases — the LfD Bayern is historically the most assertive — but the underlying legal frame is harmonised.",
  },
  {
    q: "What about Google Analytics on a German site?",
    a: "Google Analytics still requires consent under §25 TDDDG because it sets cookies and processes personal data through Google infrastructure (transfer to the US). The Garante Italian ban on GA4 in 2022 was followed by similar concerns from German authorities. Consent Mode v2 reduces the cookie load but does not change the fundamental processing nature. Sealmetrics operates outside that framework entirely.",
  },
  {
    q: "Do I still need a Datenschutzerklärung?",
    a: "Yes. The privacy policy (Datenschutzerklärung) is required under GDPR Art. 13/14 regardless of consent mechanism. It must mention the analytics tool, its purpose, data categories (channel-level aggregates only), retention period (24 months for Sealmetrics, fixed and non-configurable), and the lawful basis (Art. 6(1)(f) legitimate interest, paired with the §25 TDDDG exemption). A template ships with the TPSR package.",
  },
  {
    q: "What's the position on the proposed Digital Omnibus?",
    a: "It is a proposal, not law: COM(2025) 837, published 19 November 2025, still in the ordinary legislative procedure and realistically 2027–2028 before adoption, with substantive amendments likely. As drafted it would move the terminal-device rules into the GDPR under a new Article 88a and exempt first-party, aggregated audience measurement for the controller's own use — which would be a genuine change for Germany, where §25 TDDDG recognises no analytics carve-out today. Until a text is adopted, §25 TDDDG and the DSK orientation paper are what apply.",
  },
];

export default function GdprAnalyticsGermanyPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "GDPR analytics", href: "/gdpr-analytics" }, { label: "Germany" }]} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "GDPR analytics", url: "/gdpr-analytics" },
          { name: "Germany", url: "/gdpr-analytics/germany" },
        ])}
      />
      <JsonLd
        data={speakableWebPageSchema({
          url: "/gdpr-analytics/germany",
          name: "GDPR analytics in Germany — §25 TDDDG and the DSK position",
        })}
      />
      <JsonLd
        data={articleSchema({
          headline:
            "GDPR analytics in Germany — §25 TDDDG, the DSK orientation paper, and the exemption that survives",
          description:
            "How analytics runs lawfully in Germany without a cookie banner under §25 TDDDG and the DSK position. Architectural requirements, BfDI guidance, and the Digital Omnibus proposal.",
          datePublished: DATE_PUBLISHED,
          dateModified: DATE_MODIFIED,
          url: "/gdpr-analytics/germany",
          category: "Compliance",
          author: { name: "Rafa Jiménez", url: "/authors/rafa-jimenez", jobTitle: "Founder, Sealmetrics" },
        })}
      />

      <section className="relative overflow-hidden bg-warm-white pt-28 md:pt-32 pb-12">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-8 text-center">
          <span className="eyebrow mb-5" style={{ display: "inline-flex", justifyContent: "center" }}>
            Country — Germany · DSK · BfDI
          </span>
          <h1 className="h-display mx-auto mt-5" style={{ maxWidth: "22ch" }}>
            Analytics in Germany.{" "}
            <em className="italic font-medium" style={{ color: "#E8B84B", fontStyle: "italic" }}>
              Without an Einwilligungsbanner.
            </em>
          </h1>
          <p className="text-ink-soft mt-8 mx-auto max-w-[64ch] leading-[1.55]" style={{ fontSize: "clamp(17px, 1.4vw, 20px)" }}>
            §25 TDDDG governs cookie consent in Germany. The DSK
            orientation paper and BfDI guidance carve out anonymous
            audience measurement. This is what the carve-out requires
            and where the limits are.
          </p>
        </div>
      </section>

      <TldrBlock
        answer={
          <>
            German analytics law is governed by §25 TDDDG — the
            domestic implementation of ePrivacy Art. 5(3). Consent
            is required before storing or accessing information on
            the user&rsquo;s terminal device. The Datenschutzkonferenz
            (DSK) orientation paper and BfDI guidance both confirm an
            exemption for anonymous audience measurement that meets
            four conditions: no terminal-device storage, no personal
            data, no cross-site tracking, EU-only processing. German
            rejection rates against standard cookie banners run
            60–70% — the highest in Europe — so the exemption matters
            more here than anywhere else.
          </>
        }
        bullets={[
          <><strong>§25 TDDDG</strong> — Germany&rsquo;s ePrivacy implementation, in force since December 2021.</>,
          <><strong>DSK orientation paper</strong> on telemedia consent describes when the exemption applies.</>,
          <><strong>60–70% rejection rate</strong> on standard banners — the highest in Europe.</>,
          <><strong>State authorities harmonised</strong> — BfDI federal, LDI NRW / LfD Bayern at state level.</>,
        ]}
      />

      <section className="py-20 bg-white border-t border-warm-100">
        <div className="max-w-[840px] mx-auto px-5 sm:px-8">
          <h2 className="h-section">The 4 conditions of the §25 TDDDG exemption</h2>
          <p className="mt-6 text-[17px] leading-[1.75] text-ink-soft">
            §25 TDDDG sets the rule; the DSK paper and BfDI guidance
            set the exemption boundary. Four conditions, each
            architectural rather than procedural — they describe how
            the tool is built, not what notice is shown.
          </p>

          <div className="mt-10 space-y-7">
            {criteria.map((c) => (
              <div key={c.n} className="border border-warm-100 rounded-2xl p-6 bg-warm-white">
                <div className="flex items-baseline gap-4 mb-3">
                  <span className="font-mono text-[13px] font-semibold text-brand">{c.n}</span>
                  <h3 className="text-[18px] font-semibold text-ink">{c.title}</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
                  <div>
                    <span className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink-soft font-semibold">German requirement</span>
                    <p className="mt-2 text-[14.5px] leading-[1.65] text-ink-soft">{c.requirement}</p>
                  </div>
                  <div>
                    <span className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-brand font-semibold">Sealmetrics</span>
                    <p className="mt-2 text-[14.5px] leading-[1.65] text-ink">{c.us}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-warm-white border-t border-warm-100">
        <div className="max-w-[840px] mx-auto px-5 sm:px-8">
          <h2 className="h-section">Why this matters more in Germany</h2>
          <p className="mt-6 text-[17px] leading-[1.75] text-ink-soft">
            Germany consistently posts the highest cookie-rejection
            rates in Europe. The cultural baseline of privacy
            consciousness, the early hardening of §25 TDDDG (December
            2021, ahead of most other EU implementations), and
            assertive state-level enforcement combine to produce a
            measurement landscape where banner-dependent analytics is
            structurally weaker than elsewhere.
          </p>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="border border-warm-100 rounded-2xl p-6 bg-white">
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">Rejection rate</span>
              <p className="mt-3 text-[28px] font-semibold tracking-[-0.02em] text-ink leading-none">60–70%</p>
              <p className="mt-3 text-[14px] leading-[1.6] text-ink-soft">
                Consumer B2C average for standard banners. B2B and
                privacy-aware audiences push higher. Cookie-based
                analytics measure the consenting minority only.
              </p>
            </div>
            <div className="border border-warm-100 rounded-2xl p-6 bg-white">
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">Enforcement intensity</span>
              <p className="mt-3 text-[28px] font-semibold tracking-[-0.02em] text-ink leading-none">16 DPAs</p>
              <p className="mt-3 text-[14px] leading-[1.6] text-ink-soft">
                Federal BfDI plus 16 state DPAs. Each has Art. 5(3) /
                §25 TDDDG jurisdiction. LfD Bayern and LDI NRW are
                historically the most active enforcers.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white border-t border-warm-100">
        <div className="max-w-[840px] mx-auto px-5 sm:px-8">
          <h2 className="h-section">German primary sources</h2>
          <ul className="mt-8 space-y-3 text-[15.5px] leading-[1.7] text-ink-soft list-none pl-0">
            <li className="flex gap-3">
              <span className="text-brand" aria-hidden>—</span>
              <a href="https://www.gesetze-im-internet.de/ttdsg/__25.html" target="_blank" rel="noopener noreferrer" className="text-brand underline decoration-1 underline-offset-2">
                §25 TDDDG — Gesetze im Internet (official German text)
              </a>
            </li>
            <li className="flex gap-3">
              <span className="text-brand" aria-hidden>—</span>
              <a href="https://www.datenschutzkonferenz-online.de/" target="_blank" rel="noopener noreferrer" className="text-brand underline decoration-1 underline-offset-2">
                Datenschutzkonferenz (DSK) — orientation papers
              </a>
            </li>
            <li className="flex gap-3">
              <span className="text-brand" aria-hidden>—</span>
              <a href="https://www.bfdi.bund.de/EN/Home/home_node.html" target="_blank" rel="noopener noreferrer" className="text-brand underline decoration-1 underline-offset-2">
                BfDI — Federal Commissioner for Data Protection (English)
              </a>
            </li>
          </ul>
        </div>
      </section>

      <section className="py-20 bg-warm-white border-t border-warm-100">
        <div className="max-w-[840px] mx-auto px-5 sm:px-8">
          <h2 className="h-section text-center">Common DPO questions</h2>
          <dl className="mt-12 divide-y divide-warm-100 border-y border-warm-100">
            {faqs.map((f) => (
              <div key={f.q} className="py-7">
                <dt className="text-[17px] font-semibold text-ink mb-3">{f.q}</dt>
                <dd data-speakable className="faq-answer text-[15.5px] leading-[1.7] text-ink-soft max-w-[68ch]">
                  {f.a}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="py-20 bg-white border-t border-warm-100">
        <div className="max-w-[960px] mx-auto px-5 sm:px-8">
          <h2 className="h-section text-center">Related reading</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-12">
            <Link
              href="/consentless-analytics"
              className="group block border border-warm-100 rounded-xl p-7 bg-warm-white no-underline transition-all hover:border-warm-200 hover:-translate-y-0.5"
            >
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">Pillar</span>
              <h3 className="mt-3 text-[18px] font-semibold tracking-[-0.01em] text-ink leading-[1.3] group-hover:text-brand transition-colors">Consentless analytics</h3>
              <p className="mt-3 text-[14.5px] leading-[1.6] text-ink-soft">
                The full legal framework — GDPR + ePrivacy + 6 EU authorities aligned.
              </p>
            </Link>
            <Link
              href="/gdpr-analytics/france"
              className="group block border border-warm-100 rounded-xl p-7 bg-warm-white no-underline transition-all hover:border-warm-200 hover:-translate-y-0.5"
            >
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">Country</span>
              <h3 className="mt-3 text-[18px] font-semibold tracking-[-0.01em] text-ink leading-[1.3] group-hover:text-brand transition-colors">France — CNIL exemption</h3>
              <p className="mt-3 text-[14.5px] leading-[1.6] text-ink-soft">
                The 5 CNIL criteria and the 14-point self-assessment.
              </p>
            </Link>
            <Link
              href="/blog/gdpr-analytics-without-consent"
              className="group block border border-warm-100 rounded-xl p-7 bg-warm-white no-underline transition-all hover:border-warm-200 hover:-translate-y-0.5"
            >
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">Blog</span>
              <h3 className="mt-3 text-[18px] font-semibold tracking-[-0.01em] text-ink leading-[1.3] group-hover:text-brand transition-colors">GDPR analytics without consent</h3>
              <p className="mt-3 text-[14.5px] leading-[1.6] text-ink-soft">
                The Art. 6 / Art. 5(3) reasoning — equally relevant for §25 TDDDG.
              </p>
            </Link>
            <Link
              href="/blog/consent-banner-impact-on-analytics"
              className="group block border border-warm-100 rounded-xl p-7 bg-warm-white no-underline transition-all hover:border-warm-200 hover:-translate-y-0.5"
            >
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">Blog</span>
              <h3 className="mt-3 text-[18px] font-semibold tracking-[-0.01em] text-ink leading-[1.3] group-hover:text-brand transition-colors">Banner impact on analytics data</h3>
              <p className="mt-3 text-[14.5px] leading-[1.6] text-ink-soft">
                Rejection rates by country — Germany at the top of the table.
              </p>
            </Link>
            <Link
              href="/reg-gap-analysis"
              className="group block border border-warm-100 rounded-xl p-7 bg-warm-white no-underline transition-all hover:border-warm-200 hover:-translate-y-0.5"
            >
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">Tool</span>
              <h3 className="mt-3 text-[18px] font-semibold tracking-[-0.01em] text-ink leading-[1.3] group-hover:text-brand transition-colors">Regulatory gap analysis</h3>
              <p className="mt-3 text-[14.5px] leading-[1.6] text-ink-soft">
                Audit your stack requirement by requirement — and see where it falls out of compliance.
              </p>
            </Link>
          </div>
        </div>
      </section>

      <FinalCtaSharedV3
        locale="en"
        titleEn={<>One <em className="italic font-medium" style={{ color: "#E8B84B", fontStyle: "italic" }}>DSK review</em>. Done.</>}
        titleEs={<>Una <em className="italic font-medium" style={{ color: "#E8B84B", fontStyle: "italic" }}>revisión DSK</em>. Resuelta.</>}
        ledeEn="Book with the founder. Bring your DPO. We walk through the §25 TDDDG criteria live and ship the DPA + TPSR on the call."
        ledeEs="Reserva con el founder. Trae a tu DPO. Resolvemos §25 TDDDG en directo y enviamos DPA + TPSR en la llamada."
      />
    </>
  );
}
