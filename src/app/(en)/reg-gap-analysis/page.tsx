import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { TldrBlock } from "@/components/ui/TldrBlock";
import { breadcrumbSchema, faqPageSchema } from "@/lib/schema";
import { getAlternates } from "@/lib/i18n/navigation";
import { LogosStrip } from "@/components/sections/v3/HomeV3";
import { FaqAccordionV3 } from "@/components/sections/v3/FaqAccordionV3";
import { FinalCtaSharedV3 } from "@/components/sections/v3/FinalCtaSharedV3";
import { ogImage } from "@/lib/seo/og";

export const metadata: Metadata = {
  title: "Regulatory Gap Analysis for Web Analytics | GDPR",
  description:
    "A requirement-by-requirement gap analysis of web analytics under GDPR, ePrivacy, AEPD and UK PECR — where stacks fall out of compliance and how to fix it.",
  openGraph: {
    title: "Regulatory Gap Analysis for Web Analytics — GDPR, ePrivacy, AEPD",
    description:
      "Map your analytics stack against every requirement it has to meet, find the gaps, and see how a cookieless architecture closes them.",
    type: "website",
    images: [ogImage("/reg-gap-analysis/")],
    url: "https://sealmetrics.com/reg-gap-analysis/",
    siteName: "Sealmetrics",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Regulatory Gap Analysis for Web Analytics",
    description: "Where your analytics stack falls out of compliance — requirement by requirement.",
    images: [ogImage("/reg-gap-analysis/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/reg-gap-analysis/",
    languages: getAlternates("/reg-gap-analysis"),
  },
  keywords: [
    "regulatory gap analysis analytics",
    "analytics compliance audit",
    "gdpr gap analysis",
    "eprivacy compliance analytics",
    "aepd analytics",
    "pecr analytics exemption",
    "gdpr compliant analytics",
    "analytics data protection assessment",
  ],
};

const requirements = [
  {
    reg: "ePrivacy · Art 5(3)",
    title: "Consent for device storage",
    demand: "Any non-essential cookie, localStorage entry or fingerprint needs prior consent before it is set.",
    gap: "GA4 and Adobe set cookies, so a consent banner is mandatory — and roughly a third of EU visitors decline it.",
    close: "No cookies, no localStorage, no fingerprinting — nothing is stored on the device, so no consent is triggered.",
  },
  {
    reg: "GDPR · Art 6",
    title: "Lawful basis for personal data",
    demand: "Processing an IP address or online identifier needs a valid lawful basis — consent or a defensible legitimate interest.",
    gap: "Cookie-based tools lean on consent that is often withheld, or a legitimate interest that regulators increasingly contest.",
    close: "Measurement processes no personal data at all, so there is no basis to establish — GDPR does not apply to it.",
  },
  {
    reg: "GDPR · Art 5(1)(c)",
    title: "Data minimisation",
    demand: "Collect only the data necessary for the purpose — no more.",
    gap: "Client IDs, device graphs and behavioural profiles collect far more than measurement requires.",
    close: "Aggregate, anonymous events only — the minimum needed to count what happened, nothing that identifies a person.",
  },
  {
    reg: "GDPR · Chapter V",
    title: "International data transfers (Schrems II)",
    demand: "Personal data may not be transferred to a third country without adequate protection.",
    gap: "GA4 and Adobe are US processors; specific deployments were ruled unlawful by EU regulators over US transfers.",
    close: "Hosted end-to-end in Dublin, Ireland. No transfer to the US, no reliance on contested transfer mechanisms.",
  },
  {
    reg: "GDPR · Art 15 & 17",
    title: "Data subject rights (access, erasure)",
    demand: "Individuals can request access to, and erasure of, their personal data.",
    gap: "Per-user analytics data creates a standing obligation to locate, disclose and delete it on request.",
    close: "No personal data is stored, so there is nothing to disclose or erase — the obligation never arises for measurement.",
  },
  {
    reg: "AEPD · cookie guidance",
    title: "Valid consent UX (Spain)",
    demand: "Rejecting must be as easy as accepting, with no cookie walls and granular, unbundled choices.",
    gap: "Dark-pattern banners that nudge acceptance are a frequent source of AEPD complaints and fines.",
    close: "With no cookies in scope for measurement, there is no banner to design, and no dark pattern to defend.",
  },
  {
    reg: "GDPR · Art 28",
    title: "Processor terms & DPA",
    demand: "A data processing agreement must be in place with every processor handling personal data.",
    gap: "Analytics, tag managers and CMPs form a patchwork of processors, each needing its own signed DPA.",
    close: "One EU processor, one DPA included as standard — a materially smaller processor surface to govern.",
  },
  {
    reg: "UK · PECR / DUAA 2025",
    title: "Analytics consent exemption",
    demand: "Analytics can run without consent in the UK only if it meets the DUAA 2025 / PECR exemption criteria.",
    gap: "Cookie-based, cross-site or personal-data analytics does not qualify for the exemption.",
    close: "Cookieless, first-party, no personal data — the profile the exemption was written for. See our PECR self-assessment.",
  },
];

const scoreQuestions = [
  "Does your analytics set any cookie, or store anything on the visitor's device?",
  "Do you show a consent banner in order to measure traffic?",
  "Does your tool process IP addresses or persistent identifiers?",
  "Is your analytics data processed in the US, or by a US-headquartered company?",
  "Would fulfilling an erasure request for analytics data be difficult?",
  "Do you lose EU visitors from your reporting when they reject the banner?",
];

const faqs = [
  {
    q: "What is a regulatory gap analysis for web analytics?",
    a: "A regulatory gap analysis is a structured audit that maps your current analytics setup against every legal requirement it has to meet — under GDPR, the ePrivacy Directive, national guidance such as Spain's AEPD, and the UK's PECR/DUAA regime — and identifies each point where the setup falls short. For analytics specifically, the recurring gaps are: cookies that trigger consent under ePrivacy, personal data (IP, identifiers) that needs a lawful basis under GDPR, US data transfers that raise Schrems II problems, and consent-banner UX that regulators penalise. The output is a list of gaps and the change that closes each one.",
  },
  {
    q: "Which regulations should an analytics compliance audit cover?",
    a: "At minimum: the ePrivacy Directive (Article 5(3), the consent trigger for device storage); the GDPR (lawful basis, data minimisation, international transfers, and data-subject rights); national supervisory-authority guidance where you operate — for Spain, the AEPD's cookie guidance; and, for UK traffic, PECR as amended by the Data (Use and Access) Act 2025. Cookie-based analytics typically has to clear all of these; cookieless, first-party analytics that processes no personal data clears most of them by architecture.",
  },
  {
    q: "Does GA4 pass a GDPR and ePrivacy gap analysis?",
    a: "Not without a consent banner. GA4 sets cookies (triggering ePrivacy Article 5(3)) and processes personal data such as IP-derived location and a client ID (engaging GDPR), and Google is a US company, which raised Schrems II transfer questions that led several EU regulators to rule specific GA deployments unlawful in 2022. Google has since added EU data options and Consent Mode, but the architecture remains cookie-based and consent-dependent — so in an EU gap analysis it shows open gaps on device storage, lawful basis, and transfers.",
  },
  {
    q: "How does Sealmetrics close the common analytics compliance gaps?",
    a: "By architecture rather than configuration. Sealmetrics is cookieless and stores nothing on the device (closing the ePrivacy gap), processes zero personal data as aggregate anonymous events (closing the lawful-basis, minimisation and data-subject-rights gaps), and is hosted end-to-end in Dublin, Ireland (closing the international-transfer gap). A DPA is included, and attribution is last-click on traffic without consent gaps. Note Sealmetrics does not claim ISO 27001 or SOC 2 certification — the compliance case rests on how it is built: designed for GDPR (self-assessed), ePrivacy-clean, Schrems II-clean.",
  },
  {
    q: "Can analytics run without a consent banner after a gap analysis?",
    a: "Yes, when the analysis confirms two things: nothing is stored on or read from the visitor's device (clearing ePrivacy Article 5(3)), and no personal data is processed (so GDPR does not apply to the measurement). Regulators have converged on this reading — France's CNIL maintains an analytics exemption, and the UK's DUAA 2025 introduced one under PECR. A tool that meets both conditions can measure lawfully with no banner and, as a result, without the EU data loss a banner causes.",
  },
];

export default function RegGapAnalysisPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Regulatory Gap Analysis" }]} />
      <JsonLd data={breadcrumbSchema([{ name: "Regulatory Gap Analysis", url: "/reg-gap-analysis" }])} />
      <JsonLd data={faqPageSchema(faqs.map((f) => ({ question: f.q, answer: f.a })), "/reg-gap-analysis")} />

      {/* HERO */}
      <section className="bg-warm-white border-b border-warm-100">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-10 pt-20 pb-24 md:pt-28 md:pb-32">
          <div className="max-w-[920px]">
            <span className="eyebrow mb-6 block">Regulatory gap analysis</span>
            <h1
              className="font-semibold leading-[1.05] tracking-[-0.035em] text-ink"
              style={{ fontSize: "clamp(44px, 6.4vw, 88px)" }}
            >
              Find where your analytics{" "}
              <em className="italic font-medium" style={{ color: "#2D8B6D", fontStyle: "italic" }}>
                falls out of compliance.
              </em>
            </h1>
            <p className="mt-8 text-[19px] leading-[1.6] text-ink-soft max-w-[68ch]">
              &ldquo;GDPR-compliant&rdquo; is a claim, not an audit. A gap analysis maps your analytics stack
              against every requirement it actually has to meet — ePrivacy, GDPR, the Spanish AEPD, UK PECR —
              and shows exactly where it falls short. Below is the framework, requirement by requirement, and
              how a cookieless architecture closes each gap.
            </p>
            <div data-md="skip" className="mt-10 flex flex-col sm:flex-row gap-3 flex-wrap">
              <Link
                href="/audit"
                className="inline-flex items-center justify-center bg-ink text-white px-8 py-4 rounded-md text-[15px] font-semibold no-underline hover:brightness-110"
              >
                Get a free measurement audit →
              </Link>
              <Link
                href="/demo"
                className="inline-flex items-center justify-center border border-warm-200 text-ink px-8 py-4 rounded-md text-[15px] font-semibold no-underline hover:bg-warm-50"
              >
                Book a Demo
              </Link>
            </div>
            <p className="font-mono text-[11px] text-ink-soft uppercase tracking-[0.12em] mt-8">
              GDPR · ePrivacy · AEPD · UK PECR
            </p>
          </div>
        </div>
      </section>

      <TldrBlock
        answer={
          <>
            A regulatory gap analysis maps analytics against <strong>ePrivacy</strong>,{" "}
            <strong>GDPR</strong>, <strong>AEPD</strong> and <strong>UK PECR</strong> to find where it
            falls short. Cookie-based tools open gaps on device storage, lawful basis, transfers and
            data-subject rights. A <strong>cookieless, zero-PII, EU-hosted</strong> architecture closes
            them by design.
          </>
        }
        bullets={[
          <>The recurring gaps: cookies (ePrivacy), personal data (GDPR), US transfers (Schrems II), banner UX (AEPD).</>,
          <>Cookieless + zero personal data + EU hosting in Dublin clears most requirements structurally.</>,
          <>Read the legal reasoning in our <Link href="/blog/gdpr-eprivacy-analytics-legal-assessment" className="text-brand no-underline border-b border-warm-200 hover:border-brand">GDPR &amp; ePrivacy legal assessment</Link>.</>,
        ]}
      />

      <LogosStrip />

      {/* REQUIREMENTS MATRIX */}
      <section className="py-24 border-t border-warm-100 bg-white">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
          <div className="max-w-[760px] mb-16">
            <span className="eyebrow mb-5 block">The framework</span>
            <h2
              className="font-semibold leading-[1.1] tracking-[-0.03em] text-ink"
              style={{ fontSize: "clamp(36px, 4.4vw, 60px)" }}
            >
              Eight requirements,{" "}
              <em className="italic font-medium" style={{ color: "#2D8B6D", fontStyle: "italic" }}>
                one honest audit.
              </em>
            </h2>
            <p className="mt-6 text-[17px] leading-[1.6] text-ink-soft">
              For each requirement: what the law demands, where a typical GA4 or Adobe stack opens a gap,
              and the architectural change that closes it. This is the compliance layer behind{" "}
              <Link href="/glossary/gdpr-analytics-compliance" className="text-brand no-underline border-b border-warm-200 hover:border-brand">
                GDPR-compliant analytics
              </Link>
              .
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {requirements.map((r) => (
              <div key={r.title} className="rounded-2xl border border-warm-100 bg-warm-50 p-7">
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] font-semibold text-brand">
                  {r.reg}
                </span>
                <h3 className="mt-3 text-[21px] font-semibold text-ink leading-[1.2]">{r.title}</h3>
                <p className="mt-3 text-[14px] leading-[1.6] text-ink-soft">{r.demand}</p>
                <div className="mt-5 pt-5 border-t border-warm-100 space-y-3">
                  <div className="flex gap-3 text-[14px] leading-[1.5]">
                    <span className="font-mono text-[10px] uppercase tracking-[0.1em] font-semibold text-red-alert pt-0.5 w-[52px] shrink-0">
                      Gap
                    </span>
                    <span className="text-ink-soft">{r.gap}</span>
                  </div>
                  <div className="flex gap-3 text-[14px] leading-[1.5]">
                    <span className="font-mono text-[10px] uppercase tracking-[0.1em] font-semibold text-brand pt-0.5 w-[52px] shrink-0">
                      Closed
                    </span>
                    <span className="text-ink font-medium">{r.close}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SELF-ASSESSMENT */}
      <section className="py-24 border-t border-warm-100 bg-warm-50">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-10 grid md:grid-cols-[1fr_1.1fr] gap-16 items-start">
          <div>
            <span className="eyebrow mb-5 block">Score your stack</span>
            <h2
              className="font-semibold leading-[1.1] tracking-[-0.03em] text-ink"
              style={{ fontSize: "clamp(32px, 3.8vw, 48px)" }}
            >
              A two-minute self-assessment.
            </h2>
            <p className="mt-6 text-[17px] leading-[1.6] text-ink-soft">
              Answer these six questions about your current analytics. Every <strong>&ldquo;yes&rdquo;</strong>{" "}
              is an open gap against one of the requirements above.
            </p>
            <div className="mt-8 rounded-xl border border-warm-200 bg-white p-6">
              <p className="text-[14px] leading-[1.6] text-ink-soft">
                <strong className="text-ink">0 gaps</strong> — none of these six common gaps is open in your measurement.{" "}
                <br />
                <strong className="text-ink">1–2 gaps</strong> — configuration risk; worth a formal review.{" "}
                <br />
                <strong className="text-ink">3+ gaps</strong> — you are relying on consent and losing EU data
                to it. A cookieless architecture closes the set at once.
              </p>
            </div>
            <div className="mt-8">
              <Link
                href="/audit"
                className="inline-flex items-center justify-center bg-ink text-white px-7 py-3.5 rounded-md text-[14px] font-semibold no-underline hover:brightness-110"
              >
                Get a free measurement audit →
              </Link>
            </div>
          </div>
          <ol className="space-y-4">
            {scoreQuestions.map((q, i) => (
              <li key={q} className="flex gap-4 rounded-xl border border-warm-100 bg-white p-5">
                <span className="font-mono text-[13px] font-semibold text-brand pt-0.5 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[15px] leading-[1.5] text-ink">{q}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CONTEXT / LINKS */}
      <section className="py-24 border-t border-warm-100 bg-white">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-10">
          <div className="max-w-[760px]">
            <span className="eyebrow mb-5 block">From analysis to evidence</span>
            <h2
              className="font-semibold leading-[1.1] tracking-[-0.03em] text-ink"
              style={{ fontSize: "clamp(32px, 3.8vw, 48px)" }}
            >
              A gap analysis is only useful if you can prove the close.
            </h2>
            <p className="mt-6 text-[17px] leading-[1.6] text-ink-soft">
              Closing a gap on paper is one thing; producing the documentation a DPO or regulator will accept
              is another. We publish the evidence: the{" "}
              <Link href="/blog/cnil-self-assessment-published" className="text-brand no-underline border-b border-warm-200 hover:border-brand">
                CNIL self-assessment
              </Link>{" "}
              showing how the architecture meets France&apos;s technical criteria, the{" "}
              <Link href="/security" className="text-brand no-underline border-b border-warm-200 hover:border-brand">
                security &amp; compliance
              </Link>{" "}
              posture (EU hosting in Dublin, Schrems II, the TPSR package), the DPA included as standard, and
              the underlying{" "}
              <Link href="/cookieless-analytics" className="text-brand no-underline border-b border-warm-200 hover:border-brand">
                cookieless architecture
              </Link>{" "}
              that makes the gaps close by design rather than by configuration.
            </p>
          </div>
        </div>
      </section>

      <FaqAccordionV3
        locale="en"
        items={faqs}
        titleEn={
          <>
            The <em>questions</em> a compliance review raises.
          </>
        }
        ledeEn="Honest answers about analytics gap analysis, which regulations to cover, and what it takes to measure lawfully without a consent banner."
      />

      <FinalCtaSharedV3
        locale="en"
        titleEn={
          <>
            Stop assuming compliance.{" "}
            <em className="italic font-medium" style={{ color: "#E8B84B", fontStyle: "italic" }}>
              Analyse the gaps.
            </em>
          </>
        }
        titleEs={
          <>
            Deja de asumir que cumples.{" "}
            <em className="italic font-medium" style={{ color: "#E8B84B", fontStyle: "italic" }}>
              Analiza las brechas.
            </em>
          </>
        }
        ledeEn="Run Sealmetrics alongside your current analytics for 30 days. See the gaps close and the EU data you were losing come back. If the gap isn't real, you owe us nothing."
        ledeEs="Corre Sealmetrics junto a tu analítica actual durante 30 días. Verás cerrarse las brechas y volver el dato UE que perdías. Si la brecha no es real, no nos debes nada."
        primaryTextEn="Get a free audit →"
        primaryTextEs="Consigue una auditoría gratis →"
      />
    </>
  );
}
