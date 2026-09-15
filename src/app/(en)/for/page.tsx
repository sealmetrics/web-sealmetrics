import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbSchema, itemListSchema } from "@/lib/schema";
import { getAlternates } from "@/lib/i18n/navigation";
import { FinalCtaSharedV3 } from "@/components/sections/v3/FinalCtaSharedV3";
import { ogImage } from "@/lib/seo/og";

export const metadata: Metadata = {
  title: "Sealmetrics for every team — Roles, industries, verticals",
  description: "Dedicated pages for CMOs, CTOs, DPOs and 8 industry verticals. Honest about who this fits, with concrete outcomes for each.",
  openGraph: {
    title: "Sealmetrics for every team",
    description: "Dedicated pages for each role and industry.",
    type: "website",
    images: [ogImage("/for/")],
    url: "https://sealmetrics.com/for/",
    siteName: "Sealmetrics",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Sealmetrics for every team",
    description: "Dedicated pages for each role and industry.",
    images: [ogImage("/for/")],
  },
  alternates: { canonical: "https://sealmetrics.com/for/", languages: getAlternates("/for") },
};

const roles = [
  { slug: "cmo", name: "CMOs", tagline: "Defend your budget with numbers your CFO signs against." },
  { slug: "cto", name: "CTOs & engineering", tagline: "846-byte pixel. Zero maintenance. No server-side GTM gymnastics." },
  { slug: "dpo", name: "DPOs & legal", tagline: "Analytics designed for GDPR from the architecture up, not by a compliance layer." },
];

const industries = [
  { slug: "ecommerce", name: "eCommerce", tagline: "The analytics that match your Shopify CRM." },
  { slug: "hotels", name: "Hotels & travel", tagline: "Palladium found 35% of GA4 bookings with no channel. See yours." },
  { slug: "saas", name: "SaaS", tagline: "Trial, activation, upgrade — all first-party, all consent-independent." },
  { slug: "agencies", name: "Agencies", tagline: "One measured layer the client owns and your whole team can work in." },
  { slug: "media", name: "Media & publishers", tagline: "Analytics that hold up against ad-blockers. 50%+ audiences invisible to GA." },
  { slug: "finance", name: "Finance & banking", tagline: "Bank-grade compliance. 1-meeting vendor review." },
  { slug: "healthcare", name: "Healthcare", tagline: "No patient personal data in analytics. Portals measured in aggregate." },
  { slug: "education", name: "Education", tagline: "K-12 to universities. No student personal data collected." },
];

export default function Page() {
  const allItems = [...roles, ...industries].map((i) => ({ name: i.name, url: `/for/${i.slug}` }));
  return (
    <>
      <Breadcrumbs items={[{ label: "For" }]} />
      <JsonLd data={breadcrumbSchema([{ name: "For", url: "/for" }])} />
      <JsonLd data={itemListSchema({
        name: "Sealmetrics by role and industry",
        description: "Sealmetrics dedicated pages for CMOs, CTOs, DPOs and 8 industry verticals.",
        url: "/for",
        items: allItems,
      })} />

      <section className="relative overflow-hidden bg-warm-white pt-28 md:pt-32 pb-16">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 text-center">
          <span className="eyebrow mb-5" style={{ display: "inline-flex", justifyContent: "center" }}>For every team</span>
          <h1 className="h-display mx-auto mt-5" style={{ maxWidth: "22ch" }}>
            Sealmetrics for <em>your team.</em>
          </h1>
          <p className="text-ink-soft mt-8 mx-auto max-w-[62ch] leading-[1.55]" style={{ fontSize: "clamp(17px, 1.4vw, 20px)" }}>
            Specific pages for each role and industry. Concrete pains, measurable outcomes, honest about when we're not the fit.
          </p>
        </div>
      </section>

      <section className="py-20 bg-warm-50 border-t border-warm-100">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
          <h2 className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-ink-soft mb-6">By role</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {roles.map((r) => (
              <Link key={r.slug} href={`/for/${r.slug}`} className="group block bg-white border border-warm-100 rounded-xl p-6 no-underline transition-all hover:border-warm-200 hover:-translate-y-0.5">
                <h3 className="text-[19px] font-semibold tracking-[-0.015em] text-ink mb-2 group-hover:text-brand transition-colors">
                  For {r.name}
                </h3>
                <p className="text-[14px] leading-[1.55] text-ink-soft">{r.tagline}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white border-t border-warm-100">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
          <h2 className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-ink-soft mb-6">By industry</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {industries.map((i) => (
              <Link key={i.slug} href={`/for/${i.slug}`} className="group block bg-white border border-warm-100 rounded-xl p-6 no-underline transition-all hover:border-warm-200 hover:-translate-y-0.5">
                <h3 className="text-[17px] font-semibold tracking-[-0.015em] text-ink mb-2 group-hover:text-brand transition-colors">
                  For {i.name}
                </h3>
                <p className="text-[13.5px] leading-[1.55] text-ink-soft">{i.tagline}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FinalCtaSharedV3
        locale="en"
        titleEn={<>Not sure which fits? <em className="italic font-medium" style={{ color: "#E8B84B", fontStyle: "italic" }}>Let&apos;s talk.</em></>}
        titleEs={<>¿No sabes cuál encaja? <em className="italic font-medium" style={{ color: "#E8B84B", fontStyle: "italic" }}>Hablemos.</em></>}
        ledeEn="30-minute walkthrough with the founder. We'll run your site through Sealmetrics and show you the gap — tailored to your role and industry."
        ledeEs="30 min con el founder. Pasamos tu web por Sealmetrics y te enseñamos el gap — ajustado a tu rol e industria."
      />
    </>
  );
}
