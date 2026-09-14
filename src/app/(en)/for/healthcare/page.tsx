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
  title: "Analytics for Healthcare — Privacy-First | Sealmetrics",
  description: getVerticalData("healthcare", "en").lede.slice(0, 155) + "…",
  openGraph: {
    title: "Analytics for Healthcare — Privacy-First | Sealmetrics",
    description: getVerticalData("healthcare", "en").lede.slice(0, 155) + "…",
    type: "website",
    images: [ogImage("/for/healthcare/")],
    url: "https://sealmetrics.com/for/healthcare/",
    siteName: "Sealmetrics",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Analytics for Healthcare — Privacy-First | Sealmetrics",
    description: getVerticalData("healthcare", "en").lede.slice(0, 155) + "…",
    images: [ogImage("/for/healthcare/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/for/healthcare/",
    languages: getAlternates("/for/healthcare"),
  },
};

export default function Page() {
  return (
    <>
      <Breadcrumbs items={[{ label: "For Healthcare" }]} />
      <JsonLd data={breadcrumbSchema([{ name: "For Healthcare", url: "/for/healthcare" }])} />
      <JsonLd data={verticalSoftwareApplicationSchema({ vertical: "healthcare", audienceType: "Healthcare and life sciences", description: "Sealmetrics — enterprise analytics for healthcare teams in the EU. Measurement without consent loss, designed for GDPR (self-assessed), last-click revenue attribution.", url: "/for/healthcare" })} /><VerticalPageV3 data={getVerticalData("healthcare", "en")} />
      <RelatedPagesV3
        locale="en"
        eyebrow="Also explore"
        titleEn="Related roles and industries"
        titleEs="Roles e industrias relacionadas"
        pages={[
        { href: "/for/dpo", title: "For DPOs & legal", desc: "Compliance framework." },
        { href: "/for/finance", title: "For finance & banking", desc: "Regulated peer industry." },
        { href: "/for/education", title: "For education", desc: "Youth-data adjacent rules." }
      ]}
      />
      <LogosStrip />
      
    </>
  );
}
