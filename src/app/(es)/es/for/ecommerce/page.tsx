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
          <>Cuenta las visitas que pierde la analítica con consentimiento: en Incapto, GA4 no registró el 29% de las visitas en 48 días sobre Shopify.</>,
          <>Contrastable con tu backend: Sealmetrics registró el 96% de los pedidos reales de la tienda online de Incapto y el 97% de la facturación.</>,
          <>Módulos nativos para Shopify (cualquier plan), WooCommerce, Magento 2, PrestaShop y OpenCart.</>,
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
