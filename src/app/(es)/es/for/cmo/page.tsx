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
  title: "Analítica para CMOs — atribución defendible | Sealmetrics",
  description: getVerticalData("cmo", "es").lede.slice(0, 155) + "…",
  openGraph: {
    title: "Analítica para CMOs — atribución defendible | Sealmetrics",
    description: getVerticalData("cmo", "es").lede.slice(0, 155) + "…",
    type: "website",
    images: [ogImage("/es/for/cmo/")],
    url: "https://sealmetrics.com/es/for/cmo/",
    siteName: "Sealmetrics",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Analítica para CMOs — atribución defendible | Sealmetrics",
    description: getVerticalData("cmo", "es").lede.slice(0, 155) + "…",
    images: [ogImage("/es/for/cmo/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/es/for/cmo/",
    languages: getAlternatesEs("/for/cmo"),
  },
};

export default function Page() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Para CMOs" }]} locale="es" />
      <JsonLd data={breadcrumbSchema([{ name: "Para CMOs", url: "/es/for/cmo" }])} />
      <JsonLd data={verticalSoftwareApplicationSchema({ vertical: "CMOs", audienceType: "Chief Marketing Officer", description: "Sealmetrics — enterprise analytics for CMOs teams in the EU. Measurement without consent loss, designed for GDPR (self-assessed), last-click revenue attribution.", url: "/es/for/cmo" })} /><VerticalPageV3 data={getVerticalData("cmo", "es")} />
      <RelatedPagesV3
        locale="es"
        eyebrow="Explora también"
        titleEn="Related roles and industries"
        titleEs="Roles e industrias relacionadas"
        pages={[
        { href: "/es/for/cto", title: "For CTOs & engineering", desc: "Engineering side of the analytics decision." },
        { href: "/es/for/dpo", title: "For DPOs & legal", desc: "The compliance angle." },
        { href: "/es/for/ecommerce", title: "For eCommerce", desc: "The use case most CMOs start from." }
      ]}
      />
      <LogosStripEs />
      
    </>
  );
}
