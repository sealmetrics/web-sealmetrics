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
  title: "Analítica para eCommerce — atribución completa | Sealmetrics",
  description:
    "Analítica sin cookies para eCommerce: sin pérdida por consentimiento, atribución last-click, sin banner y alojado en Dublín. Desde 499 EUR/mes.",
  openGraph: {
    title: "Analítica para eCommerce — atribución completa | Sealmetrics",
    description:
      "Analítica sin consentimiento, diseñada para el RGPD, construida para eCommerce DTC y retail europeos. Sin huecos de consentimiento y cuadra con tu CRM de Shopify/Magento.",
    type: "website",
    images: [ogImage("/es/for/ecommerce/")],
    locale: "es_ES",
    url: "https://sealmetrics.com/es/for/ecommerce/",
    siteName: "Sealmetrics",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Analítica para eCommerce — atribución completa | Sealmetrics",
    description: "Analítica sin consentimiento, diseñada para el RGPD, construida para eCommerce DTC y retail europeos. Sin huecos de consentimiento y cuadra con tu CRM de Shopify/Magento.",
    images: [ogImage("/es/for/ecommerce/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/es/for/ecommerce/",
    languages: getAlternatesEs("/for/ecommerce"),
  },
};

const seoFaqs = [
  {
    question: "¿Qué es analítica sin cookies para eCommerce?",
    answer:
      "La analítica sin cookies para eCommerce captura visitas, add-to-carts, checkouts y compras sin usar cookies, localStorage ni fingerprinting. Evita la pérdida del 40–60% de tráfico UE causada por banners de consentimiento y cuadra los datos de backend de Shopify, WooCommerce o Magento con la atribución de marketing.",
  },
  {
    question: "¿Por qué importa la analítica sin cookies para eCommerce DTC en Europa?",
    answer:
      "Las marcas DTC europeas pierden entre el 40% y 60% del tráfico por rechazo de cookies, más ~25% por ad-blockers. El resultado: GA4 y el pixel de Meta muestran el 13–40% del tráfico real. La analítica sin cookies elimina esos gaps operando como infraestructura first-party server-side en el dominio del propio merchant.",
  },
  {
    question: "¿La analítica sin cookies para eCommerce necesita banner de consentimiento?",
    answer:
      "No. Como no se usan cookies, localStorage ni identificadores personales, no se requiere consentimiento bajo RGPD ni ePrivacy para la analítica. Puedes mantener el banner para pixels publicitarios; Sealmetrics opera de forma independiente.",
  },
  {
    question: "¿Puede la analítica sin cookies reemplazar GA4 para un equipo eCommerce?",
    answer:
      "Sí para decisiones de ingresos; normalmente no para import de conversiones a Google Ads. La mayoría de equipos eCommerce corren Sealmetrics junto a GA4 durante 30 días para comparar, luego toman decisiones con Sealmetrics y mantienen GA4 como conducto a Google Ads.",
  },
];

export default function Page() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Para eCommerce" }]} locale="es" />
      <JsonLd
        data={breadcrumbSchema(
          [{ name: "Para eCommerce", url: "/es/for/ecommerce" }],
          "es"
        )}
      />
      <JsonLd
        data={verticalSoftwareApplicationSchema({
          vertical: "eCommerce",
          audienceType: "Equipos eCommerce DTC y retail en Europa",
          description:
            "Analítica sin cookies para eCommerce: medición first-party que cuadra con backends de Shopify, WooCommerce y Magento sin banners de consentimiento. Diseñada para el RGPD desde la arquitectura (autoevaluación).",
          url: "/es/for/ecommerce",
        })}
      />

      <VerticalPageV3 data={getVerticalData("ecommerce", "es")} />

      <TldrBlock
        label="Analítica sin cookies para eCommerce"
        answer={
          <>
            La <strong>analítica sin cookies para eCommerce</strong> captura
            visitas, add-to-carts y compras sin cookies del navegador, banners de
            consentimiento ni gaps por ad-blockers — y cuadra esos números con
            tu backend de Shopify, WooCommerce o Magento. Sealmetrics es una
            implementación first-party, alojada en UE, construida específicamente
            para equipos eCommerce DTC y retail bajo RGPD.
          </>
        }
        bullets={[
          <>Captura el 40–60% de visitantes UE que GA4 pierde por rechazo de consentimiento.</>,
          <>Cuadra dentro del 15–20% de tus ingresos reales del CRM — defendible ante el comité.</>,
          <>Funciona nativamente con Shopify Plus, WooCommerce, Magento 2, PrestaShop y OpenCart.</>,
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
            href: "/es/for/hotels",
            title: "Para hoteles",
            desc: "eCommerce con atribución específica de reservas.",
          },
          {
            href: "/es/for/agencies",
            title: "Para agencias",
            desc: "Gestión de clientes eCommerce.",
          },
        ]}
      />
      <LogosStripEs />
    </>
  );
}
