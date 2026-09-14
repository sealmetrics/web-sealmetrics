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
  title: "Analítica para SaaS — PLG y trial-to-paid | Sealmetrics",
  description:
    "Analítica sin cookies para SaaS: medición product-led growth sin banners. Trackea conversión trial-to-paid y funnels self-serve sobre tráfico UE.",
  openGraph: {
    title: "Analítica para SaaS — PLG y trial-to-paid | Sealmetrics",
    description:
      "Analítica first-party para empresas SaaS europeas. Atribución trial-to-paid, tracking de funnel self-serve y métricas PLG — RGPD-safe, sin consentimiento.",
    type: "website",
    images: [ogImage("/es/for/saas/")],
    locale: "es_ES",
    url: "https://sealmetrics.com/es/for/saas/",
    siteName: "Sealmetrics",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Analítica para SaaS — PLG y trial-to-paid | Sealmetrics",
    description: "Analítica first-party para empresas SaaS europeas. Atribución trial-to-paid, tracking de funnel self-serve y métricas PLG — RGPD-safe, sin consentimiento.",
    images: [ogImage("/es/for/saas/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/es/for/saas/",
    languages: getAlternatesEs("/for/saas"),
  },
};

const seoFaqs = [
  {
    question: "¿Qué es analítica sin cookies para SaaS?",
    answer:
      "La analítica sin cookies para SaaS es un enfoque de medición para empresas PLG que captura tráfico de la web de marketing y del onboarding sin cookies, banners de consentimiento ni identificadores personales. Atribuye signups de trial, eventos de activación y conversiones trial-to-paid sobre el tráfico UE, sin huecos de consentimiento.",
  },
  {
    question: "¿Cómo trackea la analítica sin cookies los PQLs?",
    answer:
      "Sealmetrics cuenta visitas a la web de marketing y signups de trial de forma anónima con metadatos de canal; los eventos in-product llegan vía REST API una vez que el usuario está autenticado. Las definiciones de PQL se montan en el warehouse uniendo la atribución agregada de marketing con tu tabla autenticada de usuarios. Sealmetrics no trackea el journey del visitante en la web de marketing — el join a datos a nivel de usuario ocurre tras el signup, dentro de tu base de datos de producto.",
  },
  {
    question: "¿Funciona para funnels self-serve SaaS?",
    answer:
      "Sí. Los funnels self-serve están especialmente expuestos a la pérdida de datos por rechazo de consentimiento porque los visitantes UE a menudo navegan la web de marketing, se van, y vuelven por email o directo — todas rutas que se rompen bajo atribución con cookies de terceros. El tracking first-party sin cookies restaura ese journey.",
  },
  {
    question: "¿Los equipos SaaS pueden reemplazar Mixpanel o Amplitude con analítica sin cookies?",
    answer:
      "Parcialmente. Sealmetrics gestiona la atribución de web de marketing, conversión landing-to-trial y atribución de ingresos — todo como totales agregados por canal, sin tracking por usuario. Para analítica profunda de evento in-product dentro de la app autenticada (cohortes de retención, adopción de features, journeys a nivel de usuario), la mayoría de equipos SaaS mantienen Mixpanel o Amplitude y usan Sealmetrics para la capa anónima marketing-to-signup.",
  },
];

export default function Page() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Para SaaS" }]} locale="es" />
      <JsonLd
        data={breadcrumbSchema([{ name: "Para SaaS", url: "/es/for/saas" }], "es")}
      />
      <JsonLd
        data={verticalSoftwareApplicationSchema({
          vertical: "SaaS",
          audienceType: "Empresas SaaS y PLG europeas",
          description:
            "Analítica sin cookies para SaaS: atribución marketing-to-trial, tracking de funnel self-serve y medición de PQL sin cookies ni banners de consentimiento.",
          url: "/es/for/saas",
        })}
      />

      <VerticalPageV3 data={getVerticalData("saas", "es")} />

      <TldrBlock
        label="Analítica sin cookies para SaaS"
        answer={
          <>
            La <strong>analítica sin cookies para SaaS</strong> cuenta las
            visitas de la web de marketing y los eventos de trial-signup sin
            banners de consentimiento, cookies ni interferencia de ad-blockers —
            de forma anónima, a nivel de canal. Sealmetrics atribuye cada evento
            de trial-signup last-click a la fuente registrada en esa pageview
            y exporta los totales por canal a BigQuery para unirlos con los
            datos de producto para reporting PLG.
          </>
        }
        bullets={[
          <>Atribución de trial-signup sobre tráfico UE sin huecos de consentimiento (sin tracking por usuario).</>,
          <>Separación limpia entre analítica anónima de web de marketing y analítica autenticada de producto (Mixpanel, Amplitude).</>,
          <>Conector nativo a BigQuery — o la API REST a resolución completa — para unir datos agregados por canal con tus tablas autenticadas de usuarios.</>,
        ]}
      />

      <RelatedPagesV3
        locale="es"
        eyebrow="Explora también"
        titleEn="Related roles and industries"
        titleEs="Roles e industrias relacionadas"
        pages={[
          {
            href: "/glossary/cookieless-analytics",
            title: "Qué es la analítica sin cookies",
            desc: "Definición, cómo funciona, por qué importa.",
          },
          {
            href: "/es/for/cto",
            title: "Para CTOs e ingeniería",
            desc: "La perspectiva del comprador técnico.",
          },
          {
            href: "/es/for/cmo",
            title: "Para CMOs",
            desc: "La perspectiva del comprador de negocio.",
          },
        ]}
      />
      <LogosStripEs />
    </>
  );
}
