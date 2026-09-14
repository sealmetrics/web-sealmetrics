import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbSchema, verticalSoftwareApplicationSchema } from "@/lib/schema";
import { getAlternates } from "@/lib/i18n/navigation";
import { LogosStrip } from "@/components/sections/v3/HomeV3";
import { VerticalPageV3 } from "@/components/sections/v3/VerticalPageV3";
import { RelatedPagesV3 } from "@/components/sections/v3/RelatedPagesV3";
import { getVerticalData } from "@/components/sections/v3/VerticalsData";
import { ogImage } from "@/lib/seo/og";

export const metadata: Metadata = {
  title: "Analytics for Finance — Compliance | Sealmetrics",
  description: getVerticalData("finance", "en").lede.slice(0, 155) + "…",
  openGraph: {
    title: "Analytics for Finance — Compliance | Sealmetrics",
    description: getVerticalData("finance", "en").lede.slice(0, 155) + "…",
    type: "website",
    images: [ogImage("/for/finance/")],
    url: "https://sealmetrics.com/for/finance/",
    siteName: "Sealmetrics",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Analytics for Finance — Compliance | Sealmetrics",
    description: getVerticalData("finance", "en").lede.slice(0, 155) + "…",
    images: [ogImage("/for/finance/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/for/finance/",
    languages: getAlternates("/for/finance"),
  },
};

export default function Page() {
  return (
    <>
      <Breadcrumbs items={[{ label: "For Finance" }]} />
      <JsonLd data={breadcrumbSchema([{ name: "For Finance", url: "/for/finance" }])} />
      <JsonLd data={verticalSoftwareApplicationSchema({ vertical: "finance", audienceType: "Banking, insurance and wealth management", description: "Sealmetrics — enterprise analytics for finance teams in the EU. Measurement without consent loss, designed for GDPR (self-assessed), last-click revenue attribution.", url: "/for/finance" })} /><VerticalPageV3 data={getVerticalData("finance", "en")} />
      <RelatedPagesV3
        locale="en"
        eyebrow="Also explore"
        titleEn="Related roles and industries"
        titleEs="Roles e industrias relacionadas"
        pages={[
        { href: "/for/dpo", title: "For DPOs & legal", desc: "Compliance framework." },
        { href: "/for/healthcare", title: "For healthcare", desc: "Regulated peer industry." },
        { href: "/for/cto", title: "For CTOs & engineering", desc: "Technical implementation." }
      ]}
      />
      <LogosStrip />
      
    </>
  );
}
