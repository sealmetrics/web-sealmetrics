import type { Metadata } from "next";
import Link from "next/link";
import { Calculator } from "./Calculator";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { QuickAnswer } from "@/components/ui/QuickAnswer";
import { breadcrumbSchema, webApplicationSchema } from "@/lib/schema";
import { getAlternates } from "@/lib/i18n/navigation";
import { FinalCtaSharedV3 } from "@/components/sections/v3/FinalCtaSharedV3";
import { ogImage } from "@/lib/seo/og";

export const metadata: Metadata = {
  title: "Data Loss Calculator — Sealmetrics",
  description:
    "Estimate how much of your traffic and revenue GA4 would miss, from what we see across our clients: 40–60% of traffic doesn't accept cookies.",
  openGraph: {
    title: "Data Loss Calculator — Sealmetrics",
    description: "Estimate the revenue GA4 would not tie to its source, then measure your own.",
    type: "website",
    images: [ogImage("/data-loss-calculator/")],
    url: "https://sealmetrics.com/data-loss-calculator/",
    siteName: "Sealmetrics",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Data Loss Calculator — Sealmetrics",
    description: "Estimate the revenue GA4 would not tie to its source, then measure your own.",
    images: [ogImage("/data-loss-calculator/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/data-loss-calculator/",
    languages: getAlternates("/data-loss-calculator"),
  },
};

export default function Page() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Data Loss Calculator" }]} />
      <JsonLd data={breadcrumbSchema([{ name: "Data Loss Calculator", url: "/data-loss-calculator" }])} />
      <JsonLd data={webApplicationSchema({ name: "Data Loss Calculator", description: "Estimate how much traffic and revenue GA4 would miss, based on the consent rejection we see across our clients.", url: "/data-loss-calculator" })} />

      <section className="relative overflow-hidden bg-warm-white pt-28 md:pt-32 pb-10">
        <div className="max-w-[900px] mx-auto px-5 sm:px-8 text-center">
          <span className="eyebrow mb-5" style={{ display: "inline-flex", justifyContent: "center" }}>
            Data loss calculator
          </span>
          <h1 className="h-display mx-auto mt-5" style={{ maxWidth: "22ch" }}>
            How much revenue is <em>invisible</em> to your analytics?
          </h1>
          <p className="text-ink-soft mt-8 mx-auto max-w-[58ch] leading-[1.55]" style={{ fontSize: "clamp(16px, 1.3vw, 19px)" }}>
            In our experience with clients, between 40% and 60% of traffic doesn&rsquo;t accept cookies, and of those who do, 40% don&rsquo;t accept on the first pageview. Enter your numbers for an estimate of what GA4 would miss — then measure your own store to know.
          </p>
        </div>
      </section>

      <section className="pb-28 bg-warm-white">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
          <Calculator />
        </div>
      </section>

      <section className="bg-white border-t border-warm-100 py-12">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-8">
          <QuickAnswer>
            <p>
              Cookie-based analytics like{" "}
              <Link href="/vs-ga4">GA4</Link> only records visitors who accept the consent banner.
              This calculator uses the two figures we can stand behind, both from our experience with
              clients: between 40% and 60% of traffic doesn&rsquo;t accept cookies, and of those who
              do, 40% don&rsquo;t accept on the first pageview, the one that carries the traffic
              source. With those inputs, GA4 would credit 24–36% of visits to their real source; the
              rest it would see without their source or not see at all. Revenue is estimated assuming the conversion rate is the same
              for traffic GA4 sees and traffic it doesn&rsquo;t.{" "}
              <Link href="/glossary/ad-blocker-analytics-impact">Ad blockers</Link>, Safari&rsquo;s
              ITP and exits before a heavy tag fires cut further, but we have no figure for them, so
              they only count if you enter your own. This is{" "}
              <Link href="/glossary/data-loss-in-analytics">data loss in analytics</Link> as an
              estimate; on Incapto&rsquo;s Shopify store, measured over 48 days, GA4 did not record
              29% of visits.
            </p>
            <p>
              <Link href="/product">Sealmetrics</Link> measures the same traffic with a
              lightweight first-party server-side pixel — no cookies, no consent dependency, no
              sampling — and reconciles against your backend: at Incapto it recorded 95.7% of real
              orders. Enter your monthly visitors and revenue above for an estimate, then measure your
              own store.
            </p>
            <p>
              This calculator sizes what you are losing today. Once you know the
              gap, the{" "}
              <Link href="/growth-calculator/">growth calculator</Link> works the
              other way round: it projects what recovering that share of
              attributed revenue is worth against your current paid-media spend.
            </p>
          </QuickAnswer>
        </div>
      </section>

      <FinalCtaSharedV3
        locale="en"
        titleEn={<>See the gap on <em className="italic font-medium" style={{ color: "#E8B84B", fontStyle: "italic" }}>your actual traffic.</em></>}
        titleEs={<>Ve el gap sobre <em className="italic font-medium" style={{ color: "#E8B84B", fontStyle: "italic" }}>tu tráfico real.</em></>}
        ledeEn="30 minutes. We run your own site through Sealmetrics and compare with your current analytics — live."
        ledeEs="30 min. Pasamos tu web por Sealmetrics y comparamos con tu analítica actual — en directo."
      />
    </>
  );
}
