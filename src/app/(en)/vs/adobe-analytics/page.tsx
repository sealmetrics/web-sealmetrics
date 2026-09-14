import type { Metadata } from "next";
import { competitor } from "@/lib/content/competitors";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbSchema, comparisonPageSchema } from "@/lib/schema";
import { getAlternates } from "@/lib/i18n/navigation";
import { LogosStrip } from "@/components/sections/v3/HomeV3";
import { QuickAnswer } from "@/components/ui/QuickAnswer";
import { VsComparisonV3 } from "@/components/sections/v3/VsComparisonV3";
import { RelatedPagesV3 } from "@/components/sections/v3/RelatedPagesV3";
import { getVsData } from "@/components/sections/v3/VsData";
import { ogImage } from "@/lib/seo/og";

export const metadata: Metadata = {
  title: "Sealmetrics vs Adobe Analytics — Enterprise alternative",
  description: "Adobe Analytics runs ~$50K-200K+ a year and requires specialists. Sealmetrics delivers complete data without consultants.",
  openGraph: {
    title: "Sealmetrics vs Adobe Analytics — Enterprise alternative",
    description: "Adobe Analytics runs ~$50K-200K+ a year and requires specialists. Sealmetrics delivers complete data without consultants.",
    type: "website",
    images: [ogImage("/vs/adobe-analytics/")],
    url: "https://sealmetrics.com/vs/adobe-analytics/",
    siteName: "Sealmetrics",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Sealmetrics vs Adobe Analytics — Enterprise alternative",
    description: "Adobe Analytics runs ~$50K-200K+ a year and requires specialists. Sealmetrics delivers complete data without consultants.",
    images: [ogImage("/vs/adobe-analytics/")],
  },
  alternates: { canonical: "https://sealmetrics.com/vs/adobe-analytics/", languages: getAlternates("/vs/adobe-analytics") },
};

export default function Page() {
  return (
    <>
      <Breadcrumbs items={[{ label: "vs Adobe Analytics" }]} />
      <JsonLd data={breadcrumbSchema([{ name: "vs Adobe Analytics", url: "/vs/adobe-analytics" }])} />
      <JsonLd data={comparisonPageSchema({
        name: "Sealmetrics vs Adobe Analytics",
        description: "Side-by-side comparison: Sealmetrics enterprise analytics versus Adobe Analytics on data completeness, EU compliance, pricing and implementation time.",
        url: "/vs/adobe-analytics",
        competitor: competitor("adobe-analytics"),
        datePublished: "2026-04-15",
        dateModified: "2026-08-27",
        author: { name: "Rafa Jiménez", url: "/authors/rafa-jimenez" },
        criteria: [
          "Annual licence cost and implementation fees",
          "Time to first decision-ready report",
          "Required specialist headcount",
          "EU consent-rejection traffic loss",
          "Cookie-based AppMeasurement architecture",
          "What an AI agent can read (full dataset vs post-consent subset)",
          "BigQuery export inclusion",
        ],
      })} />
      <VsComparisonV3 data={getVsData("adobe-analytics", "en")} dateModified="2026-08-27" />
      <RelatedPagesV3
        locale="en"
        eyebrow="Other comparisons"
        titleEn="See every Sealmetrics comparison"
        titleEs="Ver cada comparativa de Sealmetrics"
        pages={[
        { href: "/vs-ga4", title: "vs Google Analytics 4", desc: "The free default — and its EU blind spot." },
        { href: "/vs/ga360", title: "vs Google Analytics 360", desc: "Enterprise data without the six-figure invoice." },
        { href: "/vs/piwik-pro", title: "vs Piwik PRO", desc: "EU hosting, no consent-driven loss." },
        { href: "/alternatives/adobe-analytics", title: "Adobe Analytics alternatives", desc: "The wider field, before you renew." }
      ]}
      />
      <LogosStrip />
      <section className="bg-warm-white border-t border-warm-100 py-12">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-8">
          <QuickAnswer>
            <p>
              Sealmetrics vs Adobe Analytics: Adobe Analytics is an enterprise analytics suite on unpublished annual contracts that run from roughly $50,000/year for Select to $200,000+ for Ultimate, with a heavy implementation, US/hybrid hosting and a cookie consent banner across the EU. Sealmetrics is an EU-hosted cookieless analytics platform that measures inbound traffic without consent dependency and attributes each conversion last-click on observed events — from &euro;499/month billed annually, no annual commit.
            </p>
            <p>
              For EU eCommerce the difference is completeness and compliance. Adobe still loses 40&ndash;60% of EU traffic to consent rejection and carries Schrems II overhead through US data flows, on top of months of implementation. Sealmetrics installs with one pixel, runs side by side from day one, and its Dublin-only infrastructure with zero non-EU sub-processors removes the transfer review. Teams keep Adobe for deep custom analysis where they need it and use Sealmetrics as the complete, board-ready revenue number.
            </p>
          </QuickAnswer>
        </div>
      </section>
      
    </>
  );
}
