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
  title: "Sealmetrics vs Plausible — simplicity vs attribution depth",
  description:
    "Plausible is excellent for lightweight, privacy-first traffic stats. Sealmetrics is the advanced alternative for marketers needing full UTM attribution and eCommerce data without consent banners.",
  openGraph: {
    title: "Sealmetrics vs Plausible — simplicity vs attribution depth",
    description:
      "Plausible excels at simplicity and ease of use. Sealmetrics is built for growth teams who need deep UTM attribution, eCommerce tracking, and full EU compliance without consent banners.",
    type: "website",
    images: [ogImage("/vs/plausible/")],
    url: "https://sealmetrics.com/vs/plausible/",
    siteName: "Sealmetrics",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Sealmetrics vs Plausible — simplicity vs attribution depth",
    description: "Plausible excels at simplicity and ease of use. Sealmetrics is built for growth teams who need deep UTM attribution, eCommerce tracking, and full EU compliance without consent banners.",
    images: [ogImage("/vs/plausible/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/vs/plausible/",
    languages: getAlternates("/vs/plausible"),
  },
};

export default function Page() {
  return (
    <>
      <Breadcrumbs items={[{ label: "vs Plausible" }]} />
      <JsonLd data={breadcrumbSchema([{ name: "vs Plausible", url: "/vs/plausible" }])} />
      <JsonLd
        data={comparisonPageSchema({
          name: "Sealmetrics vs Plausible",
          description:
            "Side-by-side comparison: Sealmetrics versus Plausible on privacy implementation, UTM attribution, eCommerce depth, ease of use, and compliance with EU ePrivacy and TDDDG standards.",
          url: "/vs/plausible",
          competitor: competitor("plausible"),
          datePublished: "2026-05-06",
          dateModified: "2026-08-27",
          author: { name: "Rafa Jiménez", url: "/authors/rafa-jimenez" },
          criteria: [
            "Privacy approach (cookieless vs. lightweight first-party pixel)",
            "UTM and campaign parameter retention",
            "eCommerce and conversion attribution depth",
            "Ease of use vs. analytical granularity",
            "Self-hosting options vs. fully managed enterprise service",
            "Compliance scope (Germany's TDDDG & EU ePrivacy)",
            "Pricing structure and scaling for high-volume eCommerce",
          ],
        })}
      />
      <section className="bg-warm-white border-t border-warm-100 py-12">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-8">
          <QuickAnswer>
            <p>
              Plausible is an industry leader for simple, lightweight, and privacy-first analytics. It is an excellent choice for small websites, bloggers, or developers who want a clean, intuitive dashboard and basic traffic metrics without the complexity of traditional tools. Because it is <a href="https://plausible.io/docs">open-source</a> (checked May 2026), it also offers a <a href="https://plausible.io/docs/self-hosting">self-hosting</a> option that provides high levels of data sovereignty for technical users.
            </p>
            <p>
              Sealmetrics is the strategic alternative for performance marketing and growth-driven companies that find simplicity to be a limitation. While Plausible excels at high-level traffic stats, it often lacks the deep UTM, campaign, and eCommerce attribution necessary to calculate true ROI. Sealmetrics provides full conversion and campaign visibility without requiring user consent, designed to comply with both France's CNIL criteria and Germany's TDDDG. We offer a fully managed, AI-ready platform designed to turn privacy compliance into a competitive advantage, rather than a data loss event.
            </p>
          </QuickAnswer>
        </div >
      </section>
      <VsComparisonV3 data={getVsData("plausible", "en")} dateModified="2026-08-27" />
      <RelatedPagesV3
        locale="en"
        eyebrow="Other comparisons"
        titleEn="See every Sealmetrics comparison"
        titleEs="Ver cada comparativa de Sealmetrics"
        pages={[
          { href: "/vs/matomo", title: "vs Matomo", desc: "Open-source heavyweight vs. Sealmetrics." },
          { href: "/vs-ga4", title: "vs Google Analytics 4", desc: "The free default — and its EU blind spot." },
          { href: "/vs/piwik-pro", title: "vs Piwik PRO", desc: "Enterprise-grade privacy analytics." },
        ]}
      />
      <LogosStrip />
    </>
  );
}
