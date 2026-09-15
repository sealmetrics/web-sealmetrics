import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { ogImage } from "@/lib/seo/og";

const faqs = [
  {
    question: "When was Sealmetrics founded?",
    answer: "Sealmetrics was founded in 2024 by Rafa Jiménez, after two decades working in European eCommerce analytics. The goal: give European teams a single, defensible source of truth for revenue decisions, designed for GDPR from the architecture up (self-assessed).",
  },
  {
    question: "Where is Sealmetrics based?",
    answer: "Sealmetrics is headquartered in Spain (EU). All visitor data is processed on EU-owned infrastructure in Dublin, Ireland. The team is distributed across Spain and the broader EU.",
  },
  {
    question: "Who are Sealmetrics customers?",
    answer: "Sealmetrics serves 2,000+ European teams — hotels, DTC eCommerce, media publishers and public institutions. Typical customers are revenue-driven teams with 10M€+ in online revenue who cannot afford to have 15–60% of their EU traffic invisible to GA4 — the share depending on sector, brand strength and traffic mix.",
  },
  {
    question: "Is Sealmetrics funded or bootstrapped?",
    answer: "Sealmetrics is an independent, founder-led European company. The product is profitable in production and has been since early launch.",
  },
];
import { getAlternates } from "@/lib/i18n/navigation";
import { FinalCtaSharedV3 } from "@/components/sections/v3/FinalCtaSharedV3";
import { LogosStrip } from "@/components/sections/v3/HomeV3";
import { WhatIsV3 } from "@/components/sections/v3/WhatIsV3";

export const metadata: Metadata = {
  title: "About Sealmetrics — Founder-led analytics for Europe",
  description: "Founded after 20+ years watching European eCommerce teams make decisions with data they couldn't trust. EU-founded, EU-hosted, founder-led.",
  openGraph: {
    title: "About Sealmetrics — Founder-led analytics for Europe",
    description: "Founded after 20+ years watching European eCommerce teams make decisions with data they couldn't trust. EU-founded, EU-hosted, founder-led.",
    type: "website",
    images: [ogImage("/about/")],
    url: "https://sealmetrics.com/about/",
    siteName: "Sealmetrics",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "About Sealmetrics — Founder-led analytics for Europe",
    description: "Founded after 20+ years watching European eCommerce teams make decisions with data they couldn't trust. EU-founded, EU-hosted, founder-led.",
    images: [ogImage("/about/")],
  },
  alternates: { canonical: "https://sealmetrics.com/about/", languages: getAlternates("/about") },
};

export default function Page() {
  return (
    <>
      <Breadcrumbs items={[{ label: "About" }]} />
      <JsonLd data={breadcrumbSchema([{ name: "About", url: "/about" }])} />

      <section className="relative overflow-hidden bg-warm-white pt-28 md:pt-32 pb-16">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-8 text-center">
          <span className="eyebrow mb-5" style={{ display: "inline-flex", justifyContent: "center" }}>About Sealmetrics</span>
          <h1 className="h-display mx-auto mt-5" style={{ maxWidth: "22ch" }}>
            Built so European teams <em>could trust their own data again.</em>
          </h1>
          <p className="text-ink-soft mt-8 mx-auto max-w-[62ch] leading-[1.55]" style={{ fontSize: "clamp(17px, 1.4vw, 20px)" }}>
            Sealmetrics is an EU-founded, EU-hosted analytics platform serving 2,000+ customers across hotels, DTC eCommerce, media and public institutions.
          </p>
        </div>
      </section>

      <LogosStrip />
      <WhatIsV3 locale="en" muted />

      <section className="py-28 bg-warm-50 border-t border-warm-100">
        <div className="max-w-[900px] mx-auto px-5 sm:px-10">
          <span className="eyebrow mb-5" style={{ display: "inline-flex" }}>The founder</span>
          <h2 className="h-section mt-5" style={{ maxWidth: "22ch" }}>
            20 years watching teams decide with <em>data they didn't trust.</em>
          </h2>
          <div className="mt-10 space-y-6 text-[17px] leading-[1.7] text-ink-2">
            <p>
              Rafa Jiménez spent two decades in European eCommerce — first as a digital marketer, then as an agency founder, then advising retail groups. Every meeting followed the same pattern: the GA4 number, the pixel number, the CRM number. All different. All defended. None trusted.
            </p>
            <p>
              The problem was never the analysts. It was the architecture. Every tool optimised for its own reporting. Consent rejection hid between 15% and 60% of EU traffic, depending on sector, brand and traffic mix. Sub-processor chains stretched across three continents. Teams spent more time reconciling numbers than acting on them.
            </p>
            <p>
              Sealmetrics was built for the boardroom. A neutral layer brand, finance and agencies can all sign against. Hosted in Dublin. Zero cookies. Zero personal data. Full resolution. Built by a team that had lived through the problem for two decades — and decided to stop patching it.
            </p>
          </div>

          <div className="mt-10 p-8 bg-white border border-warm-100 rounded-xl flex gap-5 items-center">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center font-bold text-ink text-[22px] shrink-0"
              style={{ background: "linear-gradient(135deg,#2D8B6D,#E8B84B)", letterSpacing: "-0.02em" }}
            >
              RJ
            </div>
            <div>
              <div className="text-[17px] font-semibold text-ink">Rafa Jiménez</div>
              <div className="text-[13px] text-ink-soft">Founder & CEO · Sealmetrics</div>
              <div className="mt-2 flex gap-4 text-[13px]">
                <a href="https://www.linkedin.com/in/rafajimenez/" className="text-brand hover:underline">LinkedIn</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-28 bg-white border-t border-warm-100">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
          <div className="grid md:grid-cols-[1.1fr_1fr] gap-12 md:gap-16 items-end mb-12">
            <div>
              <span className="eyebrow mb-5">The numbers</span>
              <h2 className="h-section mt-5">What we've <em>proved so far.</em></h2>
            </div>
            <p className="text-[18px] leading-[1.55] text-ink-soft max-w-[54ch]">
              Not projections, not aspirations. What 2,000+ European teams use Sealmetrics for today.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { n: "2,000+", l: "Active accounts" },
              { n: "5+ yrs", l: "In production" },
              { n: "100%", l: "EU-hosted" },
              { n: "99.99%", l: "Uptime SLA" },
            ].map((s) => (
              <div key={s.l} className="bg-white border border-warm-100 rounded-xl p-6">
                <div className="font-semibold text-ink tracking-[-0.025em] leading-none tabular-nums" style={{ fontSize: "clamp(36px, 4vw, 52px)" }}>
                  {s.n}
                </div>
                <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-soft mt-3">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCtaSharedV3
        locale="en"
        titleEn={<>Talk directly to <em className="italic font-medium" style={{ color: "#E8B84B", fontStyle: "italic" }}>the founder.</em></>}
        titleEs={<>Habla directamente con <em className="italic font-medium" style={{ color: "#E8B84B", fontStyle: "italic" }}>el founder.</em></>}
        ledeEn="30-minute walkthrough. Rafa personally runs every sales call. When something breaks, you email him — not a support ticket."
        ledeEs="30 min de walkthrough. Rafa lleva personalmente cada llamada de ventas. Cuando algo falle, le escribes directamente — no a un ticket."
      />
    </>
  );
}
