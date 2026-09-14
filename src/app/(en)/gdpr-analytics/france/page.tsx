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
  title: "GDPR analytics in France — CNIL exemption explained",
  description:
    "How analytics runs lawfully in France without a cookie banner. CNIL exemption criteria, the 14-point self-assessment, and the Digital Omnibus impact.",
  openGraph: {
    title: "GDPR analytics in France — CNIL exemption explained",
    description:
      "The CNIL exemption for analytics: 5 criteria, 14 technical points, and the architectures that meet them by design.",
    type: "article",
    images: [ogImage("/gdpr-analytics/france/")],
    url: "https://sealmetrics.com/gdpr-analytics/france/",
    siteName: "Sealmetrics",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "GDPR analytics in France — CNIL exemption explained",
    description: "The CNIL exemption for analytics: 5 criteria, 14 technical points, and the architectures that meet them by design.",
    images: [ogImage("/gdpr-analytics/france/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/gdpr-analytics/france/",
    languages: getAlternates("/gdpr-analytics/france"),
  },
};

const criteria = [
  {
    n: "01",
    title: "Strictly limited purpose",
    cnil: "Measurement must serve only audience analytics — no marketing, no advertising, no profiling.",
    us: "Aggregate channel and conversion counts only. No identifier, no profile, no audience export to ad platforms.",
  },
  {
    n: "02",
    title: "No cross-site tracking",
    cnil: "The tool must not enable tracking the visitor across other websites.",
    us: "First-party server-side. The pixel can be served from a subdomain of your own domain. No third-party cookie, no cross-site identifier.",
  },
  {
    n: "03",
    title: "IP anonymisation or non-collection",
    cnil: "Last octet of IP addresses must be removed before processing (or IPs not collected at all).",
    us: "No IP address is ever stored — it has no column in any analytics database. The IP is used transiently in memory during request handling and then discarded. The CNIL requirement is met by exceeding it.",
  },
  {
    n: "04",
    title: "No merging with other personal data",
    cnil: "Analytics data must not be combined with personal data from other sources.",
    us: "There is no personal data to merge. Aggregate counts are isolated from any CRM, advertising or marketing identifier.",
  },
  {
    n: "05",
    title: "Aggregate-only reporting",
    cnil: "Reports must be aggregate. No individual-level data may be exposed.",
    us: "Every report is aggregate — by channel, campaign, landing page, country, device class. No per-visitor view exists in the product.",
  },
];

const faqs = [
  {
    q: "Does the CNIL exemption mean no cookie banner at all?",
    a: "It means no cookie banner is required for the analytics layer specifically. If your site also runs Google Ads pixels, Meta pixels, A/B testing tools or any tool that sets cookies, those tools still require consent. The banner scope shrinks to the tools that actually need it — often substantially. Many French eCommerce teams reduce the banner scope to one or two products instead of the catch-all banner.",
  },
  {
    q: "Is the CNIL exemption a 'workaround'?",
    a: "No. The CNIL has published explicit criteria for analytics exemption since 2020, reaffirmed in 2024 and aligned with the EDPB Opinion 5/2019. The exemption is the original carve-out the regulation contemplated for genuine audience measurement that does not enable tracking. Architectures that meet the criteria are not exploiting a loophole; they are using the regulation as written.",
  },
  {
    q: "How does the 2025 CNIL self-assessment tool work?",
    a: "In July 2025 the CNIL released an auto-évaluation covering 5 permitted objectives and 14 technical criteria. Operators document how their analytics implementation meets each requirement. We published our complete self-assessment in a public blog post — useful to copy patterns from or share with your DPO.",
  },
  {
    q: "What if my analytics is hosted in another EU country?",
    a: "The exemption applies as long as the processing happens in the EU (no third-country transfer). Sealmetrics processes exclusively in Dublin, Ireland — within scope of GDPR adequacy, no Schrems II transfer assessment required.",
  },
  {
    q: "Would the proposed Digital Omnibus change the CNIL position?",
    a: "Not adversely, and not yet at all — it is a proposal, not law. The Commission published COM(2025) 837 on 19 November 2025; Parliament and Council have still to agree a text, substantive amendments are likely, and adoption is realistically 2027–2028. As drafted it would move cookie rules into the GDPR under a new Article 88a and exempt first-party, aggregated audience measurement for the controller's own use — generalising the CNIL carve-out across the EU rather than removing it. Until then the CNIL criteria are what apply in France.",
  },
  {
    q: "What does the privacy policy still need to say?",
    a: "Transparency is required even when consent is not. The privacy policy must describe the analytics tool, its purpose, the data categories processed (channel, landing page, aggregate counts), the retention period, and the lawful basis (Art. 6(1)(f) legitimate interest, paired with the ePrivacy Art. 5(3) exemption). A privacy policy template is included in our TPSR package.",
  },
];

export default function GdprAnalyticsFrancePage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "GDPR analytics", href: "/gdpr-analytics" }, { label: "France" }]} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "GDPR analytics", url: "/gdpr-analytics" },
          { name: "France", url: "/gdpr-analytics/france" },
        ])}
      />
      <JsonLd
        data={speakableWebPageSchema({
          url: "/gdpr-analytics/france",
          name: "GDPR analytics in France — CNIL exemption explained",
        })}
      />
      <JsonLd
        data={articleSchema({
          headline:
            "GDPR analytics in France — how the CNIL exemption works in practice",
          description:
            "The CNIL exemption criteria for analytics, the 14-point self-assessment, the Digital Omnibus proposal, and the architectures that meet the criteria by design.",
          datePublished: DATE_PUBLISHED,
          dateModified: DATE_MODIFIED,
          url: "/gdpr-analytics/france",
          category: "Compliance",
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
            Country — France · CNIL
          </span>
          <h1 className="h-display mx-auto mt-5" style={{ maxWidth: "22ch" }}>
            Analytics in France.{" "}
            <em
              className="italic font-medium"
              style={{ color: "#E8B84B", fontStyle: "italic" }}
            >
              Without a cookie banner.
            </em>
          </h1>
          <p
            className="text-ink-soft mt-8 mx-auto max-w-[64ch] leading-[1.55]"
            style={{ fontSize: "clamp(17px, 1.4vw, 20px)" }}
          >
            The CNIL has published explicit exemption criteria for
            analytics since 2020. This is what the exemption requires,
            how the 2025 self-assessment tool works, and what the
            proposed Digital Omnibus would change.
          </p>
        </div>
      </section>

      <TldrBlock
        answer={
          <>
            The CNIL exemption allows web analytics to run on French
            sites without a cookie banner when the implementation meets
            five criteria: a strictly limited audience-measurement
            purpose, no cross-site tracking, anonymised or
            uncollected IPs, no merging with other personal data, and
            aggregate-only reporting. Sealmetrics meets each criterion
            by design — no identifier is generated, no cookie is set,
            no IP is collected, no cross-site data path exists. The
            architecture sits inside the exemption rather than
            depending on it.
          </>
        }
        bullets={[
          <><strong>5 CNIL criteria</strong> defined in 2020, reaffirmed 2024, aligned with EDPB Opinion 5/2019.</>,
          <><strong>14 technical points</strong> in the 2025 auto-évaluation tool — each documented publicly.</>,
          <><strong>No cookie banner</strong> required for the analytics layer; other tools (ad pixels) still need consent.</>,
          <><strong>Dublin processing</strong> keeps the implementation inside the GDPR adequacy zone — no Schrems II transfer.</>,
        ]}
      />

      {/* THE 5 CRITERIA */}
      <section className="py-20 bg-white border-t border-warm-100">
        <div className="max-w-[840px] mx-auto px-5 sm:px-8">
          <h2 className="h-section">The 5 CNIL criteria</h2>
          <p className="mt-6 text-[17px] leading-[1.75] text-ink-soft">
            The CNIL exemption is not vague. Five operational
            requirements define the boundary. An analytics tool either
            meets each one by design or it does not qualify.
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
                    <span className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink-soft font-semibold">CNIL requires</span>
                    <p className="mt-2 text-[14.5px] leading-[1.65] text-ink-soft">{c.cnil}</p>
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

      {/* THE 14-POINT SELF-ASSESSMENT */}
      <section className="py-20 bg-warm-white border-t border-warm-100">
        <div className="max-w-[840px] mx-auto px-5 sm:px-8">
          <h2 className="h-section">The 14-point self-assessment</h2>
          <p className="mt-6 text-[17px] leading-[1.75] text-ink-soft">
            In July 2025 the CNIL published an{" "}
            <a
              href="https://www.cnil.fr/fr/cookies-solutions-pour-les-outils-de-mesure-daudience"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand underline decoration-1 underline-offset-2"
            >
              auto-évaluation tool
            </a>{" "}
            translating the five high-level criteria into 14 concrete
            technical requirements covering data retention, IP
            anonymisation, cookie use, cross-site behaviour, exports
            and more. Each must be met for the exemption to apply.
          </p>
          <p className="mt-6 text-[17px] leading-[1.75] text-ink-soft">
            We published our complete answer to each of the 14 points
            in{" "}
            <Link
              href="/blog/cnil-self-assessment-published"
              className="text-brand underline decoration-1 underline-offset-2"
            >
              a public blog post
            </Link>{" "}
            — copy patterns directly into your DPO review, or send the
            link with our DPA and the TPSR package. Two examples of the
            shape:
          </p>

          <div className="mt-8 p-6 bg-white border border-warm-100 rounded-2xl text-[14.5px] space-y-3">
            <p className="text-ink-soft">
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-soft">CNIL:</span>{" "}
              Last octet of IP must be removed.
            </p>
            <p className="text-ink">
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-brand">Sealmetrics:</span>{" "}
              No IP address is ever stored — it is used transiently in memory
              during request handling and then discarded.
            </p>
            <hr className="border-warm-100" />
            <p className="text-ink-soft">
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-soft">CNIL:</span>{" "}
              Cookies must not exceed 13 months retention.
            </p>
            <p className="text-ink">
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-brand">Sealmetrics:</span>{" "}
              No persistent cookies are used.
            </p>
          </div>
        </div>
      </section>

      {/* WHAT CHANGED WITH THE OMNIBUS */}
      <section className="py-20 bg-white border-t border-warm-100">
        <div className="max-w-[840px] mx-auto px-5 sm:px-8">
          <h2 className="h-section">What the proposed Digital Omnibus would change</h2>
          <p className="mt-6 text-[17px] leading-[1.75] text-ink-soft">
            The EU Digital Omnibus (COM(2025) 837) was published by the
            Commission on 19 November 2025. It is a proposal, not law:
            Parliament and Council have still to agree a text, substantive
            amendments are likely, and adoption is realistically 2027&ndash;2028.
            Nothing below is in force. Three things in the draft matter for
            French operators:
          </p>

          <ul className="mt-8 space-y-4 text-[16px] leading-[1.7] text-ink-soft list-none pl-0">
            {[
              <><strong>Reject-all parity would become formal.</strong> Banner asymmetry (highlighting &ldquo;accept&rdquo; vs hiding &ldquo;reject&rdquo;) would be enforceable at EU level rather than through CNIL national action alone, raising the cost of running a defensible banner.</>,
              <><strong>Article 5(3) would move into the GDPR.</strong> A new Article 88a would carry the terminal-device rules, giving authorities explicit jurisdiction instead of the CNIL reaching for adjacent grounds.</>,
              <><strong>The exemption would widen, not close.</strong> First-party aggregated audience measurement for the controller&rsquo;s own use would be consent-exempt EU-wide — the French carve-out generalised. Cookie-based tools that meet the conditions would qualify too, so the differentiator shifts from the banner to what the exempt configuration costs you in measurement.</>,
            ].map((s, i) => (
              <li key={i} className="flex gap-3">
                <span className="text-brand" aria-hidden>—</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>

          <p className="mt-8 text-[16px] leading-[1.7] text-ink-soft">
            For the operator&rsquo;s view of what would change, see{" "}
            <Link
              href="/blog/eu-digital-omnibus-cookie-banners-analytics"
              className="text-brand underline decoration-1 underline-offset-2"
            >
              the marketer&rsquo;s guide to the Digital Omnibus
            </Link>
            .
          </p>
        </div>
      </section>

      {/* WHAT IT MEANS FOR YOUR FRENCH SITE */}
      <section className="py-20 bg-warm-white border-t border-warm-100">
        <div className="max-w-[840px] mx-auto px-5 sm:px-8">
          <h2 className="h-section">What it means for your French site</h2>
          <p className="mt-6 text-[17px] leading-[1.75] text-ink-soft">
            Three practical outcomes for an operator running a French
            site with Sealmetrics installed:
          </p>

          <div className="mt-10 space-y-6">
            <div>
              <h3 className="text-[17px] font-semibold text-ink mb-2">Banner scope shrinks (or disappears)</h3>
              <p className="text-[15.5px] leading-[1.7] text-ink-soft">
                If Sealmetrics is the only analytics layer and the only
                tools that set cookies are strictly-necessary (cart,
                session, fraud), no consent dialog is required. If you
                also run ad pixels or A/B testing tools, the banner
                shrinks to those specific consents.
              </p>
            </div>

            <div>
              <h3 className="text-[17px] font-semibold text-ink mb-2">Privacy policy still required</h3>
              <p className="text-[15.5px] leading-[1.7] text-ink-soft">
                Transparency obligations apply regardless of consent.
                The privacy policy must mention the analytics tool, its
                purpose, data categories, retention, and lawful basis.
                A template is included in our TPSR package.
              </p>
            </div>

            <div>
              <h3 className="text-[17px] font-semibold text-ink mb-2">100% of French traffic measured</h3>
              <p className="text-[15.5px] leading-[1.7] text-ink-soft">
                French rejection rates against standard banners run
                50–60%. With no banner gate, every visitor is counted on
                the same anonymous-aggregate basis — no Consent Mode
                modelling required to fill the gap.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AUTHORITY LINKS */}
      <section className="py-20 bg-white border-t border-warm-100">
        <div className="max-w-[840px] mx-auto px-5 sm:px-8">
          <h2 className="h-section">CNIL primary sources</h2>
          <ul className="mt-8 space-y-3 text-[15.5px] leading-[1.7] text-ink-soft list-none pl-0">
            <li className="flex gap-3">
              <span className="text-brand" aria-hidden>—</span>
              <a href="https://www.cnil.fr/en/cookies-and-other-tracking-devices-cnil-publishes-new-guidelines" target="_blank" rel="noopener noreferrer" className="text-brand underline decoration-1 underline-offset-2">
                CNIL — Cookies and other tracking devices: guidelines (English)
              </a>
            </li>
            <li className="flex gap-3">
              <span className="text-brand" aria-hidden>—</span>
              <a href="https://www.cnil.fr/fr/cookies-solutions-pour-les-outils-de-mesure-daudience" target="_blank" rel="noopener noreferrer" className="text-brand underline decoration-1 underline-offset-2">
                CNIL — Solutions for audience measurement tools (auto-évaluation, French)
              </a>
            </li>
            <li className="flex gap-3">
              <span className="text-brand" aria-hidden>—</span>
              <a href="https://www.edpb.europa.eu/our-work-tools/our-documents/opinion-board-art-64/opinion-52019-interplay-between-eprivacy_en" target="_blank" rel="noopener noreferrer" className="text-brand underline decoration-1 underline-offset-2">
                EDPB Opinion 5/2019 — referenced by CNIL guidance
              </a>
            </li>
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-warm-white border-t border-warm-100">
        <div className="max-w-[840px] mx-auto px-5 sm:px-8">
          <h2 className="h-section text-center">Common DPO questions</h2>
          <dl className="mt-12 divide-y divide-warm-100 border-y border-warm-100">
            {faqs.map((f) => (
              <div key={f.q} className="py-7">
                <dt className="text-[17px] font-semibold text-ink mb-3">{f.q}</dt>
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

      {/* RELATED */}
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
                The full legal framework — GDPR Art. 6, ePrivacy Art. 5(3), six EU authorities aligned.
              </p>
            </Link>

            <Link
              href="/blog/cnil-self-assessment-published"
              className="group block border border-warm-100 rounded-xl p-7 bg-warm-white no-underline transition-all hover:border-warm-200 hover:-translate-y-0.5"
            >
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">Blog</span>
              <h3 className="mt-3 text-[18px] font-semibold tracking-[-0.01em] text-ink leading-[1.3] group-hover:text-brand transition-colors">The CNIL self-assessment, published</h3>
              <p className="mt-3 text-[14.5px] leading-[1.6] text-ink-soft">
                All 14 technical criteria with Sealmetrics&rsquo; actual answers — copy directly into your DPO review.
              </p>
            </Link>

            <Link
              href="/blog/gdpr-analytics-without-consent"
              className="group block border border-warm-100 rounded-xl p-7 bg-warm-white no-underline transition-all hover:border-warm-200 hover:-translate-y-0.5"
            >
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">Blog</span>
              <h3 className="mt-3 text-[18px] font-semibold tracking-[-0.01em] text-ink leading-[1.3] group-hover:text-brand transition-colors">GDPR analytics without consent</h3>
              <p className="mt-3 text-[14.5px] leading-[1.6] text-ink-soft">
                The Art. 6 / Art. 5(3) reasoning that underpins the CNIL exemption — explained for marketers.
              </p>
            </Link>

            <Link
              href="/blog/eu-digital-omnibus-cookie-banners-analytics"
              className="group block border border-warm-100 rounded-xl p-7 bg-warm-white no-underline transition-all hover:border-warm-200 hover:-translate-y-0.5"
            >
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">Blog</span>
              <h3 className="mt-3 text-[18px] font-semibold tracking-[-0.01em] text-ink leading-[1.3] group-hover:text-brand transition-colors">EU Digital Omnibus — marketer guide</h3>
              <p className="mt-3 text-[14.5px] leading-[1.6] text-ink-soft">
                What changed in the 2026 enforcement framework and what to action this quarter.
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
        titleEn={
          <>
            One <em
              className="italic font-medium"
              style={{ color: "#E8B84B", fontStyle: "italic" }}
            >
              CNIL review
            </em>. Done.
          </>
        }
        titleEs={
          <>
            Una <em
              className="italic font-medium"
              style={{ color: "#E8B84B", fontStyle: "italic" }}
            >
              revisión CNIL
            </em>. Resuelta.
          </>
        }
        ledeEn="Book a walkthrough with the founder. Bring your DPO. We answer the 14 self-assessment points live and ship the DPA + TPSR package on the call."
        ledeEs="Reserva con el founder. Trae a tu DPO. Resolvemos los 14 puntos en directo y enviamos DPA + TPSR en la llamada."
      />
    </>
  );
}
