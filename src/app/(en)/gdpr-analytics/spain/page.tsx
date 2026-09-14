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
  title: "GDPR analytics in Spain — AEPD cookies guide explained",
  description:
    "How analytics runs lawfully in Spain without a cookie banner. AEPD 2024 cookies guide, LSSI-CE Art. 22.2, and the architectural exemption.",
  openGraph: {
    title: "GDPR analytics in Spain — AEPD cookies guide explained",
    description:
      "AEPD 2024 cookies guide, LSSI-CE Art. 22.2, and the conditions for anonymous audience measurement without consent.",
    type: "article",
    images: [ogImage("/gdpr-analytics/spain/")],
    url: "https://sealmetrics.com/gdpr-analytics/spain/",
    siteName: "Sealmetrics",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "GDPR analytics in Spain — AEPD cookies guide explained",
    description: "AEPD 2024 cookies guide, LSSI-CE Art. 22.2, and the conditions for anonymous audience measurement without consent.",
    images: [ogImage("/gdpr-analytics/spain/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/gdpr-analytics/spain/",
    languages: getAlternates("/gdpr-analytics/spain"),
  },
};

const criteria = [
  {
    n: "01",
    title: "Anonymous aggregate measurement",
    requirement: "AEPD 2024 cookies guide: tools used only for anonymous audience measurement, with no cross-site tracking, do not require consent.",
    us: "Aggregate channel and conversion counts only. No identifier per visitor, no profile, no cross-site behaviour tracked. The criterion is met by architectural design.",
  },
  {
    n: "02",
    title: "No personal data processed",
    requirement: "AEPD aligns with the EDPB Opinion 5/2019: if the processing does not relate to an identified or identifiable person, GDPR material scope does not apply.",
    us: "No IP address stored — used transiently in memory, then discarded. No User-Agent fingerprint stored. No identifier generated. The events are channel-level aggregates from the moment they hit the server.",
  },
  {
    n: "03",
    title: "First-party context only",
    requirement: "LSSI-CE Art. 22.2 governs cookie use. Anonymous measurement that stays first-party and does not enable cross-site tracking falls outside the consent requirement.",
    us: "Pixel runs on a CNAME under the customer's own domain. First-party server-side. No third-party identifier, no cross-site data path.",
  },
  {
    n: "04",
    title: "EU residency",
    requirement: "Spanish authorities emphasise EU-only processing to keep Schrems II transfer concerns out of the analysis.",
    us: "Processing exclusively in Dublin, Ireland — within the GDPR adequacy zone. No third-country transfer occurs.",
  },
];

const faqs = [
  {
    q: "Does the AEPD exemption mean no cookie banner at all?",
    a: "It means no cookie banner is required for the analytics layer specifically, provided the analytics meets the conditions: aggregate, anonymous, no cross-site tracking, no personal data. Other tools on your site (Google Ads pixels, Meta pixels, A/B testing platforms that set cookies) still require consent. Many Spanish eCommerce teams reduce the banner scope to those specific tools instead of running a catch-all banner.",
  },
  {
    q: "What does the LSSI-CE say about cookies?",
    a: "Article 22.2 of the Ley de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE, 2002 with later amendments) is the Spanish implementation of ePrivacy Art. 5(3). It requires informed consent before storing or accessing information on the user's terminal device. The AEPD has issued guidance (most recently the 2024 cookies guide) describing when the exemption applies — and aggregate audience measurement is explicitly included.",
  },
  {
    q: "Would the proposed Digital Omnibus change the AEPD position?",
    a: "Nothing has changed yet: COM(2025) 837 is a Commission proposal of 19 November 2025, still in the ordinary legislative procedure, with adoption realistically 2027–2028. As drafted it would exempt first-party, aggregated audience measurement for the controller's own use across the EU under a new GDPR Article 88a, which sits alongside the AEPD position rather than displacing it. Until a text is adopted, LSSI-CE Art. 22.2 and the AEPD 2024 guide are what apply in Spain.",
  },
  {
    q: "Is Sealmetrics suitable for Spanish public-sector sites?",
    a: "Yes. Public-sector procurement in Spain typically requires Schrems II clean processing (no US transfer), a signed DPA under GDPR Art. 28, and either explicit consent or an exemption. Sealmetrics ships all three: EU-only processing in Dublin, a pre-filled DPA, and the architectural exemption under LSSI-CE 22.2. Several Spanish public-sector operators run Sealmetrics for that reason.",
  },
  {
    q: "What does the privacy policy still need to say?",
    a: "The privacy policy must mention the analytics tool, its purpose, the data categories processed (channel-level aggregates), the retention period, and the lawful basis (Art. 6(1)(f) legitimate interest, paired with the LSSI-CE 22.2 exemption). The transparency obligation under GDPR Art. 13/14 applies regardless of whether consent is collected. A template is included in our TPSR package.",
  },
  {
    q: "Does the AEPD position align with the CNIL?",
    a: "Yes, on the exemption itself. Both authorities accept anonymous aggregate audience measurement without consent provided the architecture meets specific conditions. The AEPD guide is less prescriptive than the CNIL's 14-point self-assessment but converges on the same outcome: no identifier on the device, no cross-site tracking, no personal data, EU residency.",
  },
];

export default function GdprAnalyticsSpainPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "GDPR analytics", href: "/gdpr-analytics" }, { label: "Spain" }]} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "GDPR analytics", url: "/gdpr-analytics" },
          { name: "Spain", url: "/gdpr-analytics/spain" },
        ])}
      />
      <JsonLd
        data={speakableWebPageSchema({
          url: "/gdpr-analytics/spain",
          name: "GDPR analytics in Spain — AEPD cookies guide explained",
        })}
      />
      <JsonLd
        data={articleSchema({
          headline:
            "GDPR analytics in Spain — the AEPD 2024 cookies guide and the LSSI-CE Art. 22.2 exemption",
          description:
            "How analytics runs lawfully in Spain without a cookie banner under the AEPD 2024 guide and LSSI-CE Art. 22.2. Architectural requirements, public-sector posture, and the Digital Omnibus proposal.",
          datePublished: DATE_PUBLISHED,
          dateModified: DATE_MODIFIED,
          url: "/gdpr-analytics/spain",
          category: "Compliance",
          author: { name: "Rafa Jiménez", url: "/authors/rafa-jimenez", jobTitle: "Founder, Sealmetrics" },
        })}
      />

      <section className="relative overflow-hidden bg-warm-white pt-28 md:pt-32 pb-12">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-8 text-center">
          <span className="eyebrow mb-5" style={{ display: "inline-flex", justifyContent: "center" }}>
            Country — Spain · AEPD
          </span>
          <h1 className="h-display mx-auto mt-5" style={{ maxWidth: "22ch" }}>
            Analítica en España.{" "}
            <em className="italic font-medium" style={{ color: "#E8B84B", fontStyle: "italic" }}>
              Sin banner de cookies.
            </em>
          </h1>
          <p className="text-ink-soft mt-8 mx-auto max-w-[64ch] leading-[1.55]" style={{ fontSize: "clamp(17px, 1.4vw, 20px)" }}>
            The AEPD 2024 cookies guide carves out anonymous audience
            measurement from the consent obligation. This is what the
            carve-out requires, how it aligns with the CNIL and DSK
            positions, and what the Digital Omnibus proposal would change.
          </p>
        </div>
      </section>

      <TldrBlock
        answer={
          <>
            Spanish cookie law sits on top of LSSI-CE Art. 22.2 (the
            domestic implementation of ePrivacy Art. 5(3)) and is
            interpreted by the AEPD&rsquo;s 2024 cookies guide. The
            AEPD explicitly excludes anonymous aggregate audience
            measurement from the consent requirement provided four
            conditions hold: aggregate-only reporting, no personal
            data, first-party context with no cross-site tracking,
            and EU residency. Sealmetrics is built to meet each
            condition by design — same architectural pattern that
            covers the CNIL exemption in France and the §25 TDDDG
            exemption in Germany.
          </>
        }
        bullets={[
          <><strong>AEPD 2024 cookies guide</strong> — explicit carve-out for anonymous aggregate measurement.</>,
          <><strong>LSSI-CE Art. 22.2</strong> — the Spanish ePrivacy implementation, in force since 2009.</>,
          <><strong>Public-sector compatible</strong> — Schrems II clean, EU-only, signed DPA, architectural exemption.</>,
          <><strong>~50% rejection rate</strong> on standard banners — average for Spanish B2C eCommerce.</>,
        ]}
      />

      <section className="py-20 bg-white border-t border-warm-100">
        <div className="max-w-[840px] mx-auto px-5 sm:px-8">
          <h2 className="h-section">The 4 conditions of the AEPD exemption</h2>
          <p className="mt-6 text-[17px] leading-[1.75] text-ink-soft">
            The AEPD guide is less prescriptive than the CNIL&rsquo;s
            14-point self-assessment, but the substantive conditions
            converge. Four architectural requirements:
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
                    <span className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink-soft font-semibold">Spanish requirement</span>
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
          <h2 className="h-section">Public-sector and regulated industries</h2>
          <p className="mt-6 text-[17px] leading-[1.75] text-ink-soft">
            Spanish public-sector procurement (administraciones
            públicas, universities, hospitals, regional governments)
            applies stricter rules than commercial eCommerce — and the
            architectural exemption fits the procurement requirements
            cleanly:
          </p>

          <ul className="mt-8 space-y-3 text-[16px] leading-[1.7] text-ink-soft list-none pl-0">
            {[
              "Schrems II clean for visitor data — processed in Dublin; the only US sub-processor, Resend, sends account emails under SCCs + DPF.",
              "Signed DPA under GDPR Art. 28, available pre-filled for counter-signature.",
              "TPSR package covering data flows, retention, encryption and access control.",
              "ENS / ISO posture documented (we are not currently ISO 27001 or SOC 2 certified — the roadmap and controls operated today are documented in full).",
              "Lawful basis under Art. 6(1)(f) plus LSSI-CE 22.2 exemption — no consent banner required for the analytics layer.",
            ].map((s) => (
              <li key={s} className="flex gap-3">
                <span className="text-brand" aria-hidden>—</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-20 bg-white border-t border-warm-100">
        <div className="max-w-[840px] mx-auto px-5 sm:px-8">
          <h2 className="h-section">Spanish primary sources</h2>
          <ul className="mt-8 space-y-3 text-[15.5px] leading-[1.7] text-ink-soft list-none pl-0">
            <li className="flex gap-3">
              <span className="text-brand" aria-hidden>—</span>
              <a href="https://www.aepd.es/guias/guia-cookies.pdf" target="_blank" rel="noopener noreferrer" className="text-brand underline decoration-1 underline-offset-2">
                AEPD — Guía sobre el uso de cookies (2024, PDF, Spanish)
              </a>
            </li>
            <li className="flex gap-3">
              <span className="text-brand" aria-hidden>—</span>
              <a href="https://www.boe.es/eli/es/l/2002/07/11/34/con" target="_blank" rel="noopener noreferrer" className="text-brand underline decoration-1 underline-offset-2">
                LSSI-CE — Ley 34/2002 (BOE, official Spanish text)
              </a>
            </li>
            <li className="flex gap-3">
              <span className="text-brand" aria-hidden>—</span>
              <a href="https://www.aepd.es/en" target="_blank" rel="noopener noreferrer" className="text-brand underline decoration-1 underline-offset-2">
                AEPD — Spanish Data Protection Agency (English)
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-12">
            <Link href="/consentless-analytics" className="group block border border-warm-100 rounded-xl p-7 bg-warm-white no-underline transition-all hover:border-warm-200 hover:-translate-y-0.5">
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">Pillar</span>
              <h3 className="mt-3 text-[18px] font-semibold tracking-[-0.01em] text-ink leading-[1.3] group-hover:text-brand transition-colors">Consentless analytics</h3>
              <p className="mt-3 text-[14.5px] leading-[1.6] text-ink-soft">
                The full legal framework — GDPR + ePrivacy + 6 EU authorities aligned.
              </p>
            </Link>
            <Link href="/gdpr-analytics/france" className="group block border border-warm-100 rounded-xl p-7 bg-warm-white no-underline transition-all hover:border-warm-200 hover:-translate-y-0.5">
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">Country</span>
              <h3 className="mt-3 text-[18px] font-semibold tracking-[-0.01em] text-ink leading-[1.3] group-hover:text-brand transition-colors">France — CNIL exemption</h3>
              <p className="mt-3 text-[14.5px] leading-[1.6] text-ink-soft">
                The 5 CNIL criteria and the 14-point self-assessment.
              </p>
            </Link>
            <Link href="/gdpr-analytics/germany" className="group block border border-warm-100 rounded-xl p-7 bg-warm-white no-underline transition-all hover:border-warm-200 hover:-translate-y-0.5">
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">Country</span>
              <h3 className="mt-3 text-[18px] font-semibold tracking-[-0.01em] text-ink leading-[1.3] group-hover:text-brand transition-colors">Germany — §25 TDDDG</h3>
              <p className="mt-3 text-[14.5px] leading-[1.6] text-ink-soft">
                The DSK orientation paper and the architectural exemption.
              </p>
            </Link>
            <Link href="/reg-gap-analysis" className="group block border border-warm-100 rounded-xl p-7 bg-warm-white no-underline transition-all hover:border-warm-200 hover:-translate-y-0.5">
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">Tool</span>
              <h3 className="mt-3 text-[18px] font-semibold tracking-[-0.01em] text-ink leading-[1.3] group-hover:text-brand transition-colors">Regulatory gap analysis</h3>
              <p className="mt-3 text-[14.5px] leading-[1.6] text-ink-soft">
                Audit your stack requirement by requirement — and see where it falls out of compliance.
              </p>
            </Link>
            <Link href="/blog/gdpr-analytics-spain-faq" className="group block border border-warm-100 rounded-xl p-7 bg-warm-white no-underline transition-all hover:border-warm-200 hover:-translate-y-0.5">
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">Blog</span>
              <h3 className="mt-3 text-[18px] font-semibold tracking-[-0.01em] text-ink leading-[1.3] group-hover:text-brand transition-colors">Spain FAQ — 7 direct answers</h3>
              <p className="mt-3 text-[14.5px] leading-[1.6] text-ink-soft">
                Banner necessity, GA4 legality, LSSI fines — the questions online stores ask, also in Spanish.
              </p>
            </Link>
          </div>
        </div>
      </section>

      <FinalCtaSharedV3
        locale="en"
        titleEn={<>One <em className="italic font-medium" style={{ color: "#E8B84B", fontStyle: "italic" }}>AEPD review</em>. Resuelta.</>}
        titleEs={<>Una <em className="italic font-medium" style={{ color: "#E8B84B", fontStyle: "italic" }}>revisión AEPD</em>. Resuelta.</>}
        ledeEn="Book with the founder. Bring your DPO. We walk through the AEPD conditions live and ship the DPA + TPSR on the call."
        ledeEs="Reserva con el founder. Trae a tu DPO. Resolvemos las condiciones AEPD en directo y enviamos DPA + TPSR en la llamada."
      />
    </>
  );
}
