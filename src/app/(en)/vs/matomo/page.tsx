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
  title: "Sealmetrics vs Matomo — what the CNIL exemption costs",
  description:
    "Matomo can drop the banner in France under the CNIL criteria — at the cost of your UTMs, eCommerce tracking and visit-level data. Sealmetrics keeps all of it.",
  openGraph: {
    title: "Sealmetrics vs Matomo — what the CNIL exemption costs",
    description:
      "Matomo's consent-exempt configuration strips UTM parameters, turns eCommerce tracking off and only holds under France's CNIL criteria, not Germany's TDDDG.",
    type: "website",
    images: [ogImage("/vs/matomo/")],
    url: "https://sealmetrics.com/vs/matomo/",
    siteName: "Sealmetrics",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Sealmetrics vs Matomo — what the CNIL exemption costs",
    description: "Matomo's consent-exempt configuration strips UTM parameters, turns eCommerce tracking off and only holds under France's CNIL criteria, not Germany's TDDDG.",
    images: [ogImage("/vs/matomo/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/vs/matomo/",
    languages: getAlternates("/vs/matomo"),
  },
};

export default function Page() {
  return (
    <>
      <Breadcrumbs items={[{ label: "vs Matomo" }]} />
      <JsonLd data={breadcrumbSchema([{ name: "vs Matomo", url: "/vs/matomo" }])} />
      <JsonLd
        data={comparisonPageSchema({
          name: "Sealmetrics vs Matomo",
          description:
            "Side-by-side comparison: Sealmetrics versus Matomo on the consent-exempt configuration and what it costs (UTM parameters, eCommerce tracking, visit-level data), its geographic scope under the CNIL criteria and Germany's TDDDG §25, ePrivacy Art. 5(3) exposure, self-hosting cost and EU compliance.",
          url: "/vs/matomo",
          competitor: competitor("matomo"),
          datePublished: "2026-05-06",
          dateModified: "2026-08-27",
          author: { name: "Rafa Jiménez", url: "/authors/rafa-jimenez" },
          criteria: [
            "Consent exemption scope (CNIL criteria vs Germany's TDDDG §25)",
            "UTM and campaign parameters retained without consent",
            "eCommerce tracking available without consent",
            "Visit-level reports and raw export availability",
            "Identifier used when cookies are disabled (config_id vs none)",
            "ePrivacy Art. 5(3) exposure",
            "Self-hosting operational cost (TCO)",
            "Cloud pricing transparency at eCommerce volume",
          ],
        })}
      />
      <VsComparisonV3 data={getVsData("matomo", "en")} dateModified="2026-08-27" />
      <RelatedPagesV3
        locale="en"
        eyebrow="Other comparisons"
        titleEn="See every Sealmetrics comparison"
        titleEs="Ver cada comparativa de Sealmetrics"
        pages={[
          { href: "/vs/piwik-pro", title: "vs Piwik PRO", desc: "Commercial Matomo fork — same cookie origin." },
          { href: "/vs-ga4", title: "vs Google Analytics 4", desc: "The free default — and its EU blind spot." },
          { href: "/vs/ga360", title: "vs Google Analytics 360", desc: "Enterprise data without the six-figure invoice." },
        ]}
      />
      <LogosStrip />
      <section className="bg-warm-white border-t border-warm-100 py-12">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-8">
          <QuickAnswer>
            <p>
              Sealmetrics vs Matomo: Matomo is an open-source analytics platform that can run without a consent banner in France under the CNIL exemption criteria, with cookies still on and self-hosting carrying real operational cost. Sealmetrics is a fully managed, cookieless analytics platform that measures inbound traffic without a consent banner in every EU market and attributes each conversion last-click on observed events, EU-hosted in Dublin, from &euro;499/month billed annually.
            </p>
            <p>
              The trade-off is what the exemption costs. Matomo runs without a banner only under a consent-exempt configuration — permitted under the CNIL criteria in France, not under Germany&rsquo;s TDDDG &sect;25 — and that configuration strips UTM and campaign parameters, cuts referrers to the domain, disables visit-level reports and APIs and recommends turning eCommerce tracking off. Outside it, the banner loses every visitor who rejects, and you are still running the infrastructure. Sealmetrics measures without depending on consent, with a lightweight first-party pixel, nothing to self-host, and a modern AI-native stack — LENS AI and an MCP server — on top of complete data.
            </p>
          </QuickAnswer>
        </div>
      </section>
    </>
  );
}
