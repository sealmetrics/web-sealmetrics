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
  title: "Analítica para finanzas — cumplimiento | Sealmetrics",
  description: getVerticalData("finance", "es").lede.slice(0, 155) + "…",
  openGraph: {
    title: "Analítica para finanzas — cumplimiento | Sealmetrics",
    description: getVerticalData("finance", "es").lede.slice(0, 155) + "…",
    type: "website",
    images: [ogImage("/es/for/finance/")],
    url: "https://sealmetrics.com/es/for/finance/",
    siteName: "Sealmetrics",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Analítica para finanzas — cumplimiento | Sealmetrics",
    description: getVerticalData("finance", "es").lede.slice(0, 155) + "…",
    images: [ogImage("/es/for/finance/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/es/for/finance/",
    languages: getAlternatesEs("/for/finance"),
  },
};

export default function Page() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Para finanzas" }]} locale="es" />
      <JsonLd data={breadcrumbSchema([{ name: "Para finanzas", url: "/es/for/finance" }])} />
      <JsonLd data={verticalSoftwareApplicationSchema({ vertical: "finance", audienceType: "Banca, seguros y wealth management", description: "Sealmetrics — enterprise analytics for finance teams in the EU. Measurement without consent loss, designed for GDPR (self-assessed), last-click revenue attribution.", url: "/es/for/finance" })} /><VerticalPageV3 data={getVerticalData("finance", "es")} />
      <RelatedPagesV3
        locale="es"
        eyebrow="Explora también"
        titleEn="Related roles and industries"
        titleEs="Roles e industrias relacionadas"
        pages={[
        { href: "/es/for/dpo", title: "For DPOs & legal", desc: "Compliance framework." },
        { href: "/es/for/healthcare", title: "For healthcare", desc: "Regulated peer industry." },
        { href: "/es/for/cto", title: "For CTOs & engineering", desc: "Technical implementation." }
      ]}
      />
      <LogosStripEs />
      
    </>
  );
}
