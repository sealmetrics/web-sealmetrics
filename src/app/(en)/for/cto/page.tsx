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
  title: "Analytics for CTOs — Architecture & Setup | Sealmetrics",
  description: getVerticalData("cto", "en").lede.slice(0, 155) + "…",
  openGraph: {
    title: "Analytics for CTOs — Architecture & Setup | Sealmetrics",
    description: getVerticalData("cto", "en").lede.slice(0, 155) + "…",
    type: "website",
    images: [ogImage("/for/cto/")],
    url: "https://sealmetrics.com/for/cto/",
    siteName: "Sealmetrics",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Analytics for CTOs — Architecture & Setup | Sealmetrics",
    description: getVerticalData("cto", "en").lede.slice(0, 155) + "…",
    images: [ogImage("/for/cto/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/for/cto/",
    languages: getAlternates("/for/cto"),
  },
};

export default function Page() {
  return (
    <>
      <Breadcrumbs items={[{ label: "For CTOs" }]} />
      <JsonLd data={breadcrumbSchema([{ name: "For CTOs", url: "/for/cto" }])} />
      <JsonLd data={verticalSoftwareApplicationSchema({ vertical: "CTOs", audienceType: "Chief Technology Officer", description: "Sealmetrics — enterprise analytics for CTOs teams in the EU. Measurement without consent loss, designed for GDPR (self-assessed), last-click revenue attribution.", url: "/for/cto" })} /><VerticalPageV3 data={getVerticalData("cto", "en")} />
      <RelatedPagesV3
        locale="en"
        eyebrow="Also explore"
        titleEn="Related roles and industries"
        titleEs="Roles e industrias relacionadas"
        pages={[
        { href: "/for/cmo", title: "For CMOs", desc: "The business-side buyer." },
        { href: "/for/dpo", title: "For DPOs & legal", desc: "The compliance review." },
        { href: "/for/saas", title: "For SaaS", desc: "Technical product-led analytics." }
      ]}
      />
      <LogosStrip />
      
    </>
  );
}
