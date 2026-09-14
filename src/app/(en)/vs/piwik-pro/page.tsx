import type { Metadata } from "next";
import Link from "next/link";
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
  title: "Sealmetrics vs Piwik PRO — privacy modes compared",
  description: "Compare Piwik PRO and Sealmetrics on identifiers, consent modes, attribution, EU hosting and the reporting trade-offs of anonymous analytics.",
  openGraph: {
    title: "Sealmetrics vs Piwik PRO — privacy modes compared",
    description: "Compare Piwik PRO and Sealmetrics on identifiers, consent modes, attribution, EU hosting and the reporting trade-offs of anonymous analytics.",
    type: "website",
    images: [ogImage("/vs/piwik-pro/")],
    url: "https://sealmetrics.com/vs/piwik-pro/",
    siteName: "Sealmetrics",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Sealmetrics vs Piwik PRO — privacy modes compared",
    description: "Compare Piwik PRO and Sealmetrics on identifiers, consent modes, attribution, EU hosting and the reporting trade-offs of anonymous analytics.",
    images: [ogImage("/vs/piwik-pro/")],
  },
  alternates: { canonical: "https://sealmetrics.com/vs/piwik-pro/", languages: getAlternates("/vs/piwik-pro") },
};

export default function Page() {
  return (
    <>
      <Breadcrumbs items={[{ label: "vs Piwik PRO" }]} />
      <JsonLd data={breadcrumbSchema([{ name: "vs Piwik PRO", url: "/vs/piwik-pro" }])} />
      <JsonLd data={comparisonPageSchema({
        name: "Sealmetrics vs Piwik PRO",
        description: "Side-by-side comparison of Sealmetrics and Piwik PRO across identifiers, consent modes, attribution, EU hosting and reporting trade-offs.",
        url: "/vs/piwik-pro",
        competitor: competitor("piwik-pro"),
        datePublished: "2026-04-15",
        dateModified: "2026-09-14",
        author: { name: "Rafa Jiménez", url: "/authors/rafa-jimenez" },
        criteria: [
          "Identifier and cookie configuration",
          "Consent and anonymous collection modes",
          "Reporting trade-offs without visitor identifiers",
          "Hosting locations and deployment models",
          "Product scope and operating model",
          "Attribution under each identifier mode",
          "Measured tracker performance",
        ],
      })} />
      <VsComparisonV3 data={getVsData("piwik-pro", "en")} dateModified="2026-09-14" />
      <RelatedPagesV3
        locale="en"
        eyebrow="Other comparisons"
        titleEn="See every Sealmetrics comparison"
        titleEs="Ver cada comparativa de Sealmetrics"
        pages={[
        { href: "/vs-ga4", title: "vs Google Analytics 4", desc: "The free default — and its EU blind spot." },
        { href: "/vs/ga360", title: "vs Google Analytics 360", desc: "Enterprise data without the six-figure invoice." },
        { href: "/vs/adobe-analytics", title: "vs Adobe Analytics", desc: "Enterprise power, zero overhead." }
      ]}
      />
      <LogosStrip />
      <section className="bg-warm-white border-t border-warm-100 py-12">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-8">
          <QuickAnswer>
            <p>
              Sealmetrics is cookieless, aggregate web analytics for EU teams that need
              campaign and revenue reporting without browser identifiers. Piwik PRO is a
              broader analytics suite with consent management, flexible hosting and up to
              seven attribution models when identifiers are enabled. Its own{" "}
              <Link href="https://help.piwik.pro/support/privacy/collect-data-in-a-privacy-friendly-way/">
                privacy documentation
              </Link>{" "}
              says teams can disable visitor cookies and the 30-minute session hash; in
              that configuration, however, precision falls, every event becomes a new
              session, and traffic-source and channel-attribution reports are unavailable.
              That is a reporting trade-off, not a universal quality verdict.
            </p>
            <p>
              Choose Piwik PRO when you need visitor-level analysis, its activation suite or
              deployment flexibility. Evaluate Sealmetrics when the priority is EU-hosted
              aggregate measurement in Dublin with last-click campaign and revenue
              reporting, without maintaining an identifier mode. Your implementation,
              purpose and jurisdiction still determine the legal basis; neither vendor
              choice alone guarantees GDPR compliance.
            </p>
          </QuickAnswer>
        </div>
      </section>
      
    </>
  );
}
