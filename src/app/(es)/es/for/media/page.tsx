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

const seoFaqs = [
  {
    question: "¿Qué es analítica sin cookies para medios y editores?",
    answer:
      "La analítica sin cookies para editores captura lectorazgo, engagement y datos del funnel de suscripción sin cookies, localStorage ni fingerprinting. Sobrevive a los ad-blockers (que afectan al 50–70% de las audiencias de medios) y opera first-party desde el dominio del editor.",
  },
  {
    question: "¿Cómo ayuda a los editores con alta presión de ad-blockers?",
    answer:
      "Las audiencias de medios tienen la mayor penetración de ad-blockers en la web abierta (50–70% en sitios de tecnología y noticias). La analítica sin cookies corre first-party desde el dominio del editor, así que los ad-blockers — que apuntan a endpoints de analítica de terceros como google-analytics.com — no la ven y no pueden bloquearla.",
  },
  {
    question: "¿Puede la analítica sin cookies medir conversión de suscripción?",
    answer:
      "Sí, a nivel de totales por canal. Se capturan conteos agregados en cada paso del embudo (landings de artículo, impresiones de paywall, eventos de suscripción), y cada evento de suscripción se atribuye last-click a la fuente registrada en esa pageview. Los ingresos vuelven vía REST API para atribuir el valor de suscripción al canal de adquisición sobre tráfico UE sin huecos de consentimiento. Nota: es atribución agregada por canal, no tracking de journey por suscriptor.",
  },
  {
    question: "¿La analítica sin cookies reemplaza Chartbeat o Parse.ly?",
    answer:
      "Categorías distintas. Chartbeat y Parse.ly son herramientas editoriales en tiempo real para redacciones. Sealmetrics cubre audiencia, atribución y funnels de suscripción. Muchos editores corren los dos: Chartbeat para la redacción, Sealmetrics para decisiones de marketing y suscripción.",
  },
];

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
            los visitantes usan ad-blockers. Sealmetrics opera como
            infraestructura first-party en el dominio del propio editor,
            invisible a los ad-blockers e independiente de la deprecation de
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
