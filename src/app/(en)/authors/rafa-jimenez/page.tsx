import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbSchema, personSchema } from "@/lib/schema";
import { getAlternates } from "@/lib/i18n/navigation";
import { TldrBlock } from "@/components/ui/TldrBlock";
import { FinalCtaSharedV3 } from "@/components/sections/v3/FinalCtaSharedV3";
import { ogImage } from "@/lib/seo/og";

export const metadata: Metadata = {
  title: "Rafa Jiménez — Founder & CEO of Sealmetrics",
  description:
    "20+ years in European eCommerce analytics. Founder of Sealmetrics, digital marketer, agency founder and analytics architect.",
  alternates: {
    canonical: "https://sealmetrics.com/authors/rafa-jimenez/",
    languages: getAlternates("/authors/rafa-jimenez"),
  },
  openGraph: {
    title: "Rafa Jiménez — Founder & CEO of Sealmetrics",
    description:
      "20+ years in European eCommerce analytics. Founder of Sealmetrics.",
    type: "profile",
    images: [ogImage("/authors/rafa-jimenez/")],
    url: "https://sealmetrics.com/authors/rafa-jimenez/",
    siteName: "Sealmetrics",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Rafa Jiménez — Founder & CEO of Sealmetrics",
    description: "20+ years in European eCommerce analytics. Founder of Sealmetrics.",
    images: [ogImage("/authors/rafa-jimenez/")],
  },
};

export default function Page() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Authors" }, { label: "Rafa Jiménez" }]} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Rafa Jiménez", url: "/authors/rafa-jimenez" },
        ])}
      />
      <JsonLd
        data={personSchema({
          name: "Rafa Jiménez",
          jobTitle: "Founder & CEO, Sealmetrics",
          description:
            "20+ years in European eCommerce analytics. Founder of Sealmetrics, a cookieless, first-party analytics platform hosted in Dublin. Former digital marketer, agency founder and advisor to European retail groups.",
          url: "/authors/rafa-jimenez",
          sameAs: [
            "https://www.linkedin.com/in/rafajimenez/",
            "https://sealmetrics.com/about",
          ],
          knowsAbout: [
            "Web Analytics",
            "Cookieless Tracking",
            "Revenue Attribution",
            "GDPR Compliance",
            "eCommerce Analytics",
            "Privacy-First Analytics",
            "Digital Marketing",
            "Server-Side Tracking",
            "European Data Protection Law",
            "MCP Protocol",
          ],
        })}
      />

      <section className="relative overflow-hidden bg-warm-white pt-28 md:pt-32 pb-16">
        <div className="max-w-[1000px] mx-auto px-5 sm:px-8">
          <span className="eyebrow mb-5" style={{ display: "inline-flex" }}>
            Author profile
          </span>
          <h1 className="h-display mt-5" style={{ maxWidth: "24ch" }}>
            Rafa Jiménez — <em>founder-led analytics for Europe.</em>
          </h1>
          <p className="text-ink-soft mt-8 max-w-[68ch] leading-[1.55]" style={{ fontSize: "clamp(17px, 1.4vw, 20px)" }}>
            Two decades in European eCommerce analytics. Founder &amp; CEO of Sealmetrics. Writes about GDPR-compliant attribution, cookieless infrastructure and why reconciling three sets of numbers is not a job.
          </p>
        </div>
      </section>

      <TldrBlock
        answer={
          <>Rafa Jiménez is the founder and CEO of <strong>Sealmetrics</strong>, a European cookieless web analytics platform hosted in Dublin. He spent 20+ years in European eCommerce — first as a digital marketer, then as an agency founder, then advising retail groups — before building Sealmetrics to solve the problem he kept seeing: teams making revenue decisions on data that GA4, the pixel and the CRM all reported differently.</>
        }
        bullets={[
          <>Founded Sealmetrics in 2024 to give European eCommerce teams a single, defensible source of truth.</>,
          <>Writes at the intersection of GDPR law, revenue attribution and analytics infrastructure.</>,
          <>Publishes educational content on the <Link href="/blog" className="text-brand hover:underline">Sealmetrics blog</Link> and <Link href="/glossary" className="text-brand hover:underline">glossary</Link>.</>,
        ]}
      />

      <section className="py-28 bg-white border-t border-warm-100">
        <div className="max-w-[900px] mx-auto px-5 sm:px-10">
          <span className="eyebrow mb-5" style={{ display: "inline-flex" }}>Background</span>
          <h2 className="h-section mt-5">20 years watching teams decide with <em>data they didn&apos;t trust.</em></h2>

          <div className="mt-10 space-y-6 text-[17px] leading-[1.7] text-ink-2">
            <p>
              Rafa&apos;s first roles were in digital marketing for European DTC brands, running paid acquisition across Google, Meta and affiliates. Every month, the meetings followed the same pattern: the GA4 number, the pixel number, the CRM number — three sets of figures, all different, all defended, none reconciled.
            </p>
            <p>
              After founding an agency and advising retail groups, the pattern became impossible to ignore. The problem wasn&apos;t the analysts. It was the architecture. Every tool optimised for its own reporting. Consent rejection hid between 15% and 60% of EU traffic, depending on sector, brand and traffic mix. Sub-processor chains stretched across three continents. Teams spent more time reconciling numbers than acting on them.
            </p>
            <p>
              Sealmetrics was built to replace reconciliation with a single neutral layer — first-party, cookieless, EU-hosted. Compliance-by-architecture, not by a banner layer bolted on afterwards.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-warm-50 border-t border-warm-100">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-10">
          <span className="eyebrow mb-5" style={{ display: "inline-flex" }}>Areas of expertise</span>
          <h2 className="h-section mt-5">What Rafa <em>writes and speaks about.</em></h2>
          <div className="grid md:grid-cols-2 gap-3 mt-10">
            {[
              { n: "Cookieless analytics", d: "First-party, anonymous event counting on the server side — no cookies, no identifiers, no per-user journeys." },
              { n: "Revenue attribution", d: "Last-click attribution on complete data — why modelled attribution breaks in Europe." },
              { n: "GDPR architecture", d: "How to design analytics that avoids personal-data collection by architecture rather than by consent layers." },
              { n: "eCommerce analytics", d: "What European DTC and retail teams actually need from an analytics stack." },
              { n: "Schrems II & data residency", d: "Why EU-hosted matters and how sub-processor chains compromise compliance." },
              { n: "AI-native analytics", d: "MCP servers, AI agent traffic measurement and LLM-ready data warehouses." },
            ].map((t) => (
              <article key={t.n} className="bg-white border border-warm-100 rounded-xl p-6">
                <h3 className="text-[17px] font-semibold text-ink tracking-[-0.015em]">{t.n}</h3>
                <p className="text-[13.5px] leading-[1.6] text-ink-soft mt-2">{t.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white border-t border-warm-100">
        <div className="max-w-[900px] mx-auto px-5 sm:px-10">
          <span className="eyebrow mb-5" style={{ display: "inline-flex" }}>Published on</span>
          <h2 className="h-section mt-5">Where to <em>read more.</em></h2>
          <ul className="mt-10 space-y-4 text-[16px] text-ink-2">
            <li>
              — <Link href="/blog" className="text-brand hover:underline">Sealmetrics blog</Link> — essays on attribution, compliance and European analytics
            </li>
            <li>
              — <Link href="/glossary" className="text-brand hover:underline">Sealmetrics glossary</Link> — technical definitions curated for EU eCommerce teams
            </li>
            <li>
              — <Link href="/case-studies" className="text-brand hover:underline">Customer case studies</Link> — how teams replaced or complemented GA4 with complete data
            </li>
            <li>
              — <a href="https://www.linkedin.com/in/rafajimenez/" className="text-brand hover:underline">LinkedIn</a> — 20+ years of eCommerce analytics discussion
            </li>
          </ul>
        </div>
      </section>

      <FinalCtaSharedV3
        locale="en"
        titleEn={<>Talk directly to <em className="italic font-medium" style={{ color: "#E8B84B", fontStyle: "italic" }}>the founder.</em></>}
        titleEs={<>Habla directamente con <em className="italic font-medium" style={{ color: "#E8B84B", fontStyle: "italic" }}>el founder.</em></>}
        ledeEn="30-minute walkthrough. Rafa personally runs every sales call."
        ledeEs="30 min de walkthrough. Rafa lleva personalmente cada llamada de ventas."
      />
    </>
  );
}
