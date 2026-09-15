import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbSchema, itemListSchema } from "@/lib/schema";
import { getAlternates } from "@/lib/i18n/navigation";
import { FinalCtaSharedV3 } from "@/components/sections/v3/FinalCtaSharedV3";
import { ogImage } from "@/lib/seo/og";

export const metadata: Metadata = {
  title: "Sealmetrics vs the alternatives — Complete comparisons",
  description: "Side-by-side comparisons against GA4, GA360, Adobe Analytics and Piwik PRO. Honest about trade-offs. Data-driven, no marketing spin.",
  openGraph: {
    title: "Sealmetrics vs the alternatives",
    description: "Feature-by-feature comparisons against every major analytics platform.",
    type: "website",
    images: [ogImage("/vs/")],
    url: "https://sealmetrics.com/vs/",
    siteName: "Sealmetrics",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Sealmetrics vs the alternatives",
    description: "Feature-by-feature comparisons against every major analytics platform.",
    images: [ogImage("/vs/")],
  },
  alternates: { canonical: "https://sealmetrics.com/vs/", languages: getAlternates("/vs") },
};

const comparisons = [
  { slug: "vs-ga4", name: "Google Analytics 4", stat: "15–60% of EU visits, by sector", tagline: "The free default everyone uses — and its structural blind spot in Europe." },
  { slug: "vs/ga360", name: "Google Analytics 360", stat: "~$50–175K/yr", tagline: "Enterprise price, enterprise contract, same cookie architecture as free GA4." },
  { slug: "vs/adobe-analytics", name: "Adobe Analytics", stat: "~$50–200K + specialists", tagline: "Enterprise depth, but 6-month implementation and Adobe-certified staff required." },
  { slug: "vs/piwik-pro", name: "Piwik PRO", stat: "Enterprise quote-only", tagline: "EU-hosted — but still cookie-based and consent-dependent." },
  { slug: "vs/matomo", name: "Matomo", stat: "Open-source + ops cost", tagline: "EU-friendly and open-source — but cookies-by-default and self-hosting eats the 'free' label." },
  { slug: "alternatives/google-analytics", name: "Google Analytics alternatives", stat: "The broader picture", tagline: "What to pick if you're post-GA4 — and why most \"alternatives\" are just cheaper clones." },
  { slug: "alternatives/adobe-analytics", name: "Adobe Analytics alternatives", stat: "Before you renew", tagline: "What replaces Adobe without a six-month implementation and a certified team to run it." },
];

export default function Page() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Comparisons" }]} />
      <JsonLd data={breadcrumbSchema([{ name: "Comparisons", url: "/vs" }])} />
      <JsonLd data={itemListSchema({
        name: "Sealmetrics analytics platform comparisons",
        description: "Side-by-side analysis of Sealmetrics vs Google Analytics 4, GA360, Adobe Analytics and Piwik PRO.",
        url: "/vs",
        items: comparisons.map((c) => ({ name: c.name, url: `/${c.slug}` })),
      })} />

      <section className="relative overflow-hidden bg-warm-white pt-28 md:pt-32 pb-16">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 text-center">
          <span className="eyebrow mb-5" style={{ display: "inline-flex", justifyContent: "center" }}>Comparisons</span>
          <h1 className="h-display mx-auto mt-5" style={{ maxWidth: "22ch" }}>
            Sealmetrics vs <em>the alternatives.</em>
          </h1>
          <p className="text-ink-soft mt-8 mx-auto max-w-[62ch] leading-[1.55]" style={{ fontSize: "clamp(17px, 1.4vw, 20px)" }}>
            Honest side-by-side comparisons. Acknowledges strengths. Direct about trade-offs. Uses real numbers on your own traffic — run both in parallel for 30 days and decide.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white border-t border-warm-100">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {comparisons.map((c) => (
              <Link
                key={c.slug}
                href={`/${c.slug}`}
                className="group block bg-white border border-warm-100 rounded-xl p-8 no-underline transition-all hover:border-warm-200 hover:-translate-y-0.5"
              >
                <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                  <h2 className="text-[22px] font-semibold tracking-[-0.015em] text-ink leading-[1.2] group-hover:text-brand transition-colors">
                    Sealmetrics vs {c.name}
                  </h2>
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em]" style={{ color: "#B5423B" }}>{c.stat}</span>
                </div>
                <p className="text-[15px] leading-[1.55] text-ink-soft">{c.tagline}</p>
                <span className="inline-flex items-center gap-1.5 mt-4 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-brand">
                  Read the comparison →
                </span>
              </Link>
            ))}
          </div>

          {/* Disambiguation. People searching "Searchmetrics vs Sealmetrics"
              are usually looking for two different companies, not a feature
              comparison — and that page had no inbound link at all. */}
          <p className="mt-10 text-[15px] leading-[1.6] text-ink-soft">
            Looking for Searchmetrics? It is a different company in a different
            category — SEO visibility software, not web analytics. We wrote{" "}
            <Link href="/searchmetrics-vs-sealmetrics/" className="underline">
              why the two get confused
            </Link>{" "}
            so you can tell quickly which one you actually need.
          </p>
        </div>
      </section>

      <FinalCtaSharedV3
        locale="en"
        titleEn={<>Run both for 30 days. <em className="italic font-medium" style={{ color: "#E8B84B", fontStyle: "italic" }}>Then decide.</em></>}
        titleEs={<>Corre los dos 30 días. <em className="italic font-medium" style={{ color: "#E8B84B", fontStyle: "italic" }}>Y entonces decide.</em></>}
        ledeEn="Install Sealmetrics alongside your current stack. Compare with your CRM. If the gap isn't real, you owe us nothing."
        ledeEs="Instala Sealmetrics junto a tu stack actual. Compara con tu CRM. Si el gap no es real, no nos debes nada."
      />
    </>
  );
}
