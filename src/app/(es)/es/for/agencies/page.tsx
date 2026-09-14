import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbSchema, verticalSoftwareApplicationSchema } from "@/lib/schema";
import { getAlternatesEs } from "@/lib/i18n/navigation";
import { LogosStripEs } from "@/components/sections/v3/HomeV3Es";
import { VerticalPageV3 } from "@/components/sections/v3/VerticalPageV3";
import { RelatedPagesV3 } from "@/components/sections/v3/RelatedPagesV3";
import { getVerticalData } from "@/components/sections/v3/VerticalsData";
import { ogImage } from "@/lib/seo/og";

export const metadata: Metadata = {
  title: "Analítica para agencias de marketing | Sealmetrics",
  description: getVerticalData("agencies", "es").lede.slice(0, 155) + "…",
  openGraph: {
    title: "Analítica para agencias de marketing | Sealmetrics",
    description: getVerticalData("agencies", "es").lede.slice(0, 155) + "…",
    type: "website",
    images: [ogImage("/es/for/agencies/")],
    url: "https://sealmetrics.com/es/for/agencies/",
    siteName: "Sealmetrics",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Analítica para agencias de marketing | Sealmetrics",
    description: getVerticalData("agencies", "es").lede.slice(0, 155) + "…",
    images: [ogImage("/es/for/agencies/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/es/for/agencies/",
    languages: getAlternatesEs("/for/agencies"),
  },
};

export default function Page() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Para agencias" }]} locale="es" />
      <JsonLd data={breadcrumbSchema([{ name: "Para agencias", url: "/es/for/agencies" }])} />
      <JsonLd data={verticalSoftwareApplicationSchema({ vertical: "agencies", audienceType: "Marketing agencies", description: "Sealmetrics — enterprise analytics for agencies teams in the EU. Measurement without consent loss, designed for GDPR (self-assessed), last-click revenue attribution.", url: "/es/for/agencies" })} /><VerticalPageV3 data={getVerticalData("agencies", "es")} />
      <RelatedPagesV3
        locale="es"
        eyebrow="Explora también"
        titleEn="Related roles and industries"
        titleEs="Roles e industrias relacionadas"
        pages={[
        { href: "/es/for/ecommerce", title: "For eCommerce", desc: "Most agency clients." },
        { href: "/es/for/hotels", title: "For hotels", desc: "Hospitality agency clients." },
        { href: "/es/for/media", title: "For media & publishers", desc: "Media-focused agencies." }
      ]}
      />
      <LogosStripEs />
      
    </>
  );
}
