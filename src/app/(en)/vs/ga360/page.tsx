import type { Metadata } from "next";
import { competitor } from "@/lib/content/competitors";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { QuickAnswer } from "@/components/ui/QuickAnswer";
import { breadcrumbSchema, comparisonPageSchema, quotationSchema } from "@/lib/schema";
import { getAlternates } from "@/lib/i18n/navigation";
import { LogosStrip } from "@/components/sections/v3/HomeV3";
import { VsComparisonV3 } from "@/components/sections/v3/VsComparisonV3";
import { RelatedPagesV3 } from "@/components/sections/v3/RelatedPagesV3";
import { getVsData } from "@/components/sections/v3/VsData";
import { ogImage } from "@/lib/seo/og";

export const metadata: Metadata = {
  title: "Sealmetrics vs GA360 — Enterprise data for less",
  description: "GA360 is quote-based from ~$50K/year and still loses 15–60% of EU visits to consent, by sector. Sealmetrics delivers complete data from €499/mo.",
  openGraph: {
    title: "Sealmetrics vs GA360 — Enterprise data for less",
    description: "GA360 is quote-based from ~$50K/year and still loses 15–60% of EU visits to consent, by sector. Sealmetrics delivers complete data from €499/mo.",
    type: "website",
    images: [ogImage("/vs/ga360/")],
    url: "https://sealmetrics.com/vs/ga360/",
    siteName: "Sealmetrics",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Sealmetrics vs GA360 — Enterprise data for less",
    description: "GA360 is quote-based from ~$50K/year and still loses 15–60% of EU visits to consent, by sector. Sealmetrics delivers complete data from €499/mo.",
    images: [ogImage("/vs/ga360/")],
  },
  alternates: { canonical: "https://sealmetrics.com/vs/ga360/", languages: getAlternates("/vs/ga360") },
};

export default function Page() {
  return (
    <>
      <Breadcrumbs items={[{ label: "vs GA360" }]} />
      <JsonLd data={breadcrumbSchema([{ name: "vs GA360", url: "/vs/ga360" }])} />
      <JsonLd data={comparisonPageSchema({
        name: "Sealmetrics vs Google Analytics 360",
        description: "Side-by-side comparison: Sealmetrics enterprise analytics versus Google Analytics 360 (GA360) on data completeness, EU compliance, pricing and AI readiness.",
        url: "/vs/ga360",
        competitor: competitor("ga360"),
        datePublished: "2026-04-15",
        dateModified: "2026-08-27",
        author: { name: "Rafa Jiménez", url: "/authors/rafa-jimenez" },
        criteria: [
          "Annual cost and contract length",
          "EU consent-rejection traffic loss",
          "Data residency and Schrems II posture",
          "BigQuery export sampling thresholds",
          "Implementation time and required specialists",
          "What an AI agent can read (full dataset vs post-consent subset)",
          "Real-time reporting latency",
        ],
      })} />
      <JsonLd data={quotationSchema({
        text: "The data Sealmetrics delivers is agnostic, unbiased and neutral. There's no black box.",
        spokenBy: "Toni Andújar",
        spokenByRole: "Digital & Direct Sales Director, Palladium Hotel Group",
        url: "/vs/ga360",
      })} />
      <VsComparisonV3 data={getVsData("ga360", "en")} dateModified="2026-08-27" />

      <RelatedPagesV3
        locale="en"
        eyebrow="Other comparisons"
        titleEn="See every Sealmetrics comparison"
        titleEs="Ver cada comparativa de Sealmetrics"
        pages={[
        { href: "/vs-ga4", title: "vs Google Analytics 4", desc: "The free default — and its EU blind spot." },
        { href: "/vs/adobe-analytics", title: "vs Adobe Analytics", desc: "Enterprise power, zero overhead." },
        { href: "/vs/piwik-pro", title: "vs Piwik PRO", desc: "EU hosting, no consent-driven loss." }
      ]}
      />
      <LogosStrip />
      <section className="bg-warm-white border-t border-warm-100 py-12">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-8">
          <QuickAnswer>
            <p>
              Google Analytics 360 (GA360) is the enterprise tier of Google Analytics. It is quote-based and scales with event volume — entry contracts start around $50,000/year and mid-market properties commonly land between $100,000 and $175,000 — on annual contracts, hosted in the United States, and requiring a cookie consent banner across the EU. Sealmetrics is an EU-hosted cookieless analytics platform that measures inbound traffic without consent dependency, attributes last-click on observed events, and starts at €499/month annually with no annual commit.
            </p>
            <p>
              The architectural differences matter for EU eCommerce: GA360 still loses 15–60% of EU traffic to consent rejection, depending on sector, brand strength and traffic mix (Consent Mode v2 reconstructs the gap with statistical modelling, not measurement), and US hosting requires Schrems II SCCs with quarterly DPIA review. Sealmetrics&rsquo; Dublin-only infrastructure, with no sub-processors outside the EU in the visitor data path, removes that compliance overhead entirely. Customers typically run both for 30 days, reconcile against their CRM, and migrate revenue decisions to Sealmetrics while keeping GA360 as a Google Ads conduit.
            </p>
          </QuickAnswer>
        </div>
      </section>
    </>
  );
}
