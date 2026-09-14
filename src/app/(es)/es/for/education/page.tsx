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
  title: "Analítica para educación — embudos con RGPD | Sealmetrics",
  description: getVerticalData("education", "es").lede.slice(0, 155) + "…",
  openGraph: {
    title: "Analítica para educación — embudos con RGPD | Sealmetrics",
    description: getVerticalData("education", "es").lede.slice(0, 155) + "…",
    type: "website",
    images: [ogImage("/es/for/education/")],
    url: "https://sealmetrics.com/es/for/education/",
    siteName: "Sealmetrics",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Analítica para educación — embudos con RGPD | Sealmetrics",
    description: getVerticalData("education", "es").lede.slice(0, 155) + "…",
    images: [ogImage("/es/for/education/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/es/for/education/",
    languages: getAlternatesEs("/for/education"),
  },
};

export default function Page() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Para educación" }]} locale="es" />
      <JsonLd data={breadcrumbSchema([{ name: "Para educación", url: "/es/for/education" }])} />
      <JsonLd data={verticalSoftwareApplicationSchema({ vertical: "education", audienceType: "Educacion y formacion", description: "Sealmetrics — enterprise analytics for education teams in the EU. Measurement without consent loss, designed for GDPR (self-assessed), last-click revenue attribution.", url: "/es/for/education" })} /><VerticalPageV3 data={getVerticalData("education", "es")} />
      <RelatedPagesV3
        locale="es"
        eyebrow="Explora también"
        titleEn="Related roles and industries"
        titleEs="Roles e industrias relacionadas"
        pages={[
        { href: "/es/for/healthcare", title: "For healthcare", desc: "Minor-data compliance." },
        { href: "/es/for/dpo", title: "For DPOs & legal", desc: "Compliance framework." },
        { href: "/es/for/media", title: "For media & publishers", desc: "Academic media channels." }
      ]}
      />
      <LogosStripEs />
      
    </>
  );
}
