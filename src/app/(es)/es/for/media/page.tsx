import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { TldrBlock } from "@/components/ui/TldrBlock";
import {
  breadcrumbSchema,
  verticalSoftwareApplicationSchema,
} from "@/lib/schema";
import { getAlternatesEs } from "@/lib/i18n/navigation";
import { LogosStripEs } from "@/components/sections/v3/HomeV3Es";
import { VerticalPageV3 } from "@/components/sections/v3/VerticalPageV3";
import { RelatedPagesV3 } from "@/components/sections/v3/RelatedPagesV3";
import { getVerticalData } from "@/components/sections/v3/VerticalsData";
import { ogImage } from "@/lib/seo/og";

export const metadata: Metadata = {
  title: "Analítica para medios y editores | Sealmetrics",
  description:
    "Analítica sin cookies para editores: captura lectores que ad blockers esconden a GA4. Audiencia, engagement y atribución first-party en la UE.",
  openGraph: {
    title: "Analítica para medios y editores | Sealmetrics",
    description:
      "Analítica sin consentimiento construida para medios europeos. Medición de audiencia, funnels de suscripción y atribución de ingresos publicitarios sin cookies.",
    type: "website",
    images: [ogImage("/es/for/media/")],
    locale: "es_ES",
    url: "https://sealmetrics.com/es/for/media/",
    siteName: "Sealmetrics",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Analítica para medios y editores | Sealmetrics",
    description: "Analítica sin consentimiento construida para medios europeos. Medición de audiencia, funnels de suscripción y atribución de ingresos publicitarios sin cookies.",
    images: [ogImage("/es/for/media/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/es/for/media/",
    languages: getAlternatesEs("/for/media"),
  },
};

export default function Page() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Para medios" }]} locale="es" />
      <JsonLd
        data={breadcrumbSchema([{ name: "Para medios", url: "/es/for/media" }], "es")}
      />
      <JsonLd
        data={verticalSoftwareApplicationSchema({
          vertical: "Medios y editores",
          audienceType: "Empresas de medios europeas, editores y redacciones digitales",
          description:
            "Analítica sin cookies para medios y editores: medición de audiencia, funnels de suscripción y atribución de ingresos publicitarios sobre infraestructura first-party, resistente a ad-blockers.",
          url: "/es/for/media",
        })}
      />

      <VerticalPageV3 data={getVerticalData("media", "es")} />

      <TldrBlock
        label="Analítica sin cookies para medios y editores"
        answer={
          <>
            La <strong>analítica sin cookies para medios y editores</strong>{" "}
            captura lectorazgo, funnels de suscripción y atribución de ingresos
            publicitarios sin cookies — crítico para sitios donde el 50–70% de
            los visitantes usan ad-blockers. Servido desde un subdominio del
            propio editor, Sealmetrics esquiva las listas third-party con las
            que trabajan los ad-blockers y no depende de la retirada de las
            cookies de terceros.
          </>
        }
        bullets={[
          <>Recupera el 50–70% de lectores que los ad-blockers ocultan a GA4 en sitios de tech y noticias.</>,
          <>Conteos por paso del funnel por canal: landings de artículo, impresiones de paywall, eventos de suscripción — cada suscripción atribuida last-click a nivel de canal.</>,
          <>La arquitectura first-party sobrevive a Safari ITP, Firefox ETP y Brave Shield.</>,
        ]}
      />

      <RelatedPagesV3
        locale="es"
        eyebrow="Explora también"
        titleEn="Related roles and industries"
        titleEs="Roles e industrias relacionadas"
        pages={[
          {
            href: "/es/glossary/ad-blocker-analytics-impact",
            title: "Impacto de ad-blockers en analítica",
            desc: "Cómo afectan los ad-blockers a la medición en sitios de medios.",
          },
          {
            href: "/glossary/cookieless-analytics",
            title: "Qué es la analítica sin cookies",
            desc: "Definición, cómo funciona, por qué importa.",
          },
          {
            href: "/es/for/ecommerce",
            title: "Para eCommerce",
            desc: "Marcas editoriales con foco comercial.",
          },
        ]}
      />
      <LogosStripEs />
    </>
  );
}
