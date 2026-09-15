import type { Metadata } from "next";
import Link from "next/link";
import { Calculator } from "./Calculator";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { QuickAnswer } from "@/components/ui/QuickAnswer";
import { breadcrumbSchema, webApplicationSchema, statisticClaimSchema } from "@/lib/schema";
import { getAlternates } from "@/lib/i18n/navigation";
import { FinalCtaSharedV3 } from "@/components/sections/v3/FinalCtaSharedV3";
import { ogImage } from "@/lib/seo/og";

export const metadata: Metadata = {
  title: "Data Loss Calculator — Sealmetrics",
  description:
    "Calculate how much revenue is invisible to your current analytics. Consent banners + ad blockers + browser restrictions hide the majority of your traffic.",
  openGraph: {
    title: "Data Loss Calculator — Sealmetrics",
    description: "See the exact revenue your analytics is missing.",
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
    description: "See the exact revenue your analytics is missing.",
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
      <JsonLd data={webApplicationSchema({ name: "Data Loss Calculator", description: "Calculate how much revenue is invisible to your current analytics setup.", url: "/data-loss-calculator" })} />
      <JsonLd data={statisticClaimSchema({
        text: "GA4 and Adobe Analytics load a heavy measurement tag that fires late in the page load, so roughly 15% of visitors leave before the analytics hit is sent — a loss additional to consent rejection, ad blockers and Safari ITP.",
        source: "Google/Deloitte page-speed research ('Milliseconds Make Millions')",
        sourceAuthor: "Google/Deloitte",
        sourceDate: "2020",
        url: "/data-loss-calculator",
        numericValue: 15,
        unit: "PERCENT",
      })} />

      <section className="relative overflow-hidden bg-warm-white pt-28 md:pt-32 pb-10">
        <div className="max-w-[900px] mx-auto px-5 sm:px-8 text-center">
          <span className="eyebrow mb-5" style={{ display: "inline-flex", justifyContent: "center" }}>
            Data loss calculator
          </span>
          <h1 className="h-display mx-auto mt-5" style={{ maxWidth: "22ch" }}>
            How much revenue is <em>invisible</em> to your analytics?
          </h1>
          <p className="text-ink-soft mt-8 mx-auto max-w-[58ch] leading-[1.55]" style={{ fontSize: "clamp(16px, 1.3vw, 19px)" }}>
            Cookie consent, ad blockers and browser restrictions hide the majority of your traffic. Enter your numbers — we show exactly what GA4 is missing, and what it costs you every month.
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
              <Link href="/vs-ga4">GA4</Link> lose a large share of European eCommerce traffic before
              it is ever counted. Four cuts stack: consent rejection removes 15–60% of visitors, depending on sector, brand strength and traffic mix,
              20–30% run{" "}
              <Link href="/glossary/ad-blocker-analytics-impact">ad blockers</Link>, Safari&rsquo;s
              ITP caps first-party cookies at 7 days, and GA4 and Adobe&rsquo;s heavy measurement
              tags load megabytes of JavaScript — so roughly 15% of visitors leave before the pixel
              even fires. For a German store these compound to about 19% GA4 visibility: four in five
              sales are invisible in the dashboard used to allocate paid-media budget. This is{" "}
              <Link href="/glossary/data-loss-in-analytics">data loss in analytics</Link> made
              concrete.
            </p>
            <p>
              <Link href="/product">Sealmetrics</Link> measures the same traffic with a
              lightweight first-party server-side pixel — no cookies, no consent dependency, no
              sampling — so revenue in the report matches Shopify. Enter your monthly visitors and
              revenue above to see the exact amount your current setup hides each month.
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
