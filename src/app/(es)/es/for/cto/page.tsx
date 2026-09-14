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
  title: "Analítica para CTOs — arquitectura y setup | Sealmetrics",
  description: getVerticalData("cto", "es").lede.slice(0, 155) + "…",
  openGraph: {
    title: "Analítica para CTOs — arquitectura y setup | Sealmetrics",
    description: getVerticalData("cto", "es").lede.slice(0, 155) + "…",
    type: "website",
    images: [ogImage("/es/for/cto/")],
    url: "https://sealmetrics.com/es/for/cto/",
    siteName: "Sealmetrics",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Analítica para CTOs — arquitectura y setup | Sealmetrics",
    description: getVerticalData("cto", "es").lede.slice(0, 155) + "…",
    images: [ogImage("/es/for/cto/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/es/for/cto/",
    languages: getAlternatesEs("/for/cto"),
  },
};

export default function Page() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Para CTOs" }]} locale="es" />
      <JsonLd data={breadcrumbSchema([{ name: "Para CTOs", url: "/es/for/cto" }])} />
      <JsonLd data={verticalSoftwareApplicationSchema({ vertical: "CTOs", audienceType: "Chief Technology Officer", description: "Sealmetrics — enterprise analytics for CTOs teams in the EU. Measurement without consent loss, designed for GDPR (self-assessed), last-click revenue attribution.", url: "/es/for/cto" })} /><VerticalPageV3 data={getVerticalData("cto", "es")} />
      <RelatedPagesV3
        locale="es"
        eyebrow="Explora también"
        titleEn="Related roles and industries"
        titleEs="Roles e industrias relacionadas"
        pages={[
        { href: "/es/for/cmo", title: "For CMOs", desc: "The business-side buyer." },
        { href: "/es/for/dpo", title: "For DPOs & legal", desc: "The compliance review." },
        { href: "/es/for/saas", title: "For SaaS", desc: "Technical product-led analytics." }
      ]}
      />
      <LogosStripEs />
      
    </>
  );
}
