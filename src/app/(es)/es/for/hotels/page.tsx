import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { TldrBlock } from "@/components/ui/TldrBlock";
import {
  breadcrumbSchema,
  verticalSoftwareApplicationSchema,
} from "@/lib/schema";
import { getAlternatesEs } from "@/lib/i18n/navigation";
import Link from "next/link";
import { LogosStripEs } from "@/components/sections/v3/HomeV3Es";
import { Picture } from "@/components/ui/Picture";
import { VerticalPageV3 } from "@/components/sections/v3/VerticalPageV3";
import { RelatedPagesV3 } from "@/components/sections/v3/RelatedPagesV3";
import { getVerticalData } from "@/components/sections/v3/VerticalsData";
import { ogImage } from "@/lib/seo/og";

export const metadata: Metadata = {
  title: "Analítica para hoteles — venta directa | Sealmetrics",
  description:
    "Analítica sin cookies para hoteles, contrastable con el PMS. Palladium: 35% de reservas de GA4 sin canal. Dreamplace: 15–20% más ventas atribuidas.",
  openGraph: {
    title: "Analítica para hoteles — venta directa | Sealmetrics",
    description:
      "Analítica first-party sin consentimiento para grupos hoteleros. Reconcilia reservas directas con tu PMS y atribuye ingresos de meta-search sin cajas negras de OTAs.",
    type: "website",
    images: [ogImage("/es/for/hotels/")],
    locale: "es_ES",
    url: "https://sealmetrics.com/es/for/hotels/",
    siteName: "Sealmetrics",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Analítica para hoteles — venta directa | Sealmetrics",
    description: "Analítica first-party sin consentimiento para grupos hoteleros. Reconcilia reservas directas con tu PMS y atribuye ingresos de meta-search sin cajas negras de OTAs.",
    images: [ogImage("/es/for/hotels/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/es/for/hotels/",
    languages: getAlternatesEs("/for/hotels"),
  },
};

export default function Page() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Para hoteles" }]} locale="es" />
      <JsonLd
        data={breadcrumbSchema(
          [{ name: "Para hoteles", url: "/es/for/hotels" }],
          "es"
        )}
      />
      <JsonLd
        data={verticalSoftwareApplicationSchema({
          vertical: "Hoteles",
          audienceType: "Grupos hoteleros y marcas de viaje europeas",
          description:
            "Analítica sin cookies para hoteles y viaje: atribución de reservas directas cuadrada con el PMS, consolidación multi-propiedad y tracking de touchpoints de meta-search sin cookies.",
          url: "/es/for/hotels",
        })}
      />

      <VerticalPageV3
        data={getVerticalData("hotels", "es")}
        featured={
          <section className="bg-warm-white border-t border-warm-100 py-24">
            <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
              <div className="grid md:grid-cols-[1.1fr_1fr] gap-12 md:gap-16 items-end mb-14">
            <div>
              <span className="eyebrow mb-5">Casos de estudio · hoteles</span>
              <h2 className="h-section mt-5">
                Dos grupos hoteleros. <em>Mismo hallazgo: la foto por canal estaba incompleta.</em>
              </h2>
            </div>
            <p className="text-[18px] leading-[1.55] text-ink-soft max-w-[54ch]">
              Palladium Hotel Group y Dreamplace Hotels pasaron Sealmetrics junto a su stack actual. Los dos descubrieron un gap estructural: un 40% del tráfico entrante sin origen en Palladium y aproximadamente un 30% más de tráfico que Google Analytics en Dreamplace. Los dos toman ya las decisiones de paid media sobre esa foto completa, no sobre lo que cada plataforma se reporta a sí misma.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {/* Palladium card */}
            <article className="bg-white border border-warm-100 rounded-2xl p-8 md:p-10 flex flex-col gap-6">
              <div className="h-12 flex items-center">
                <Picture
                  src="/logos/clients/palladium-dark.svg"
                  alt="Palladium Hotel Group"
                  width={200}
                  height={48}
                  className="h-10 w-auto object-contain"
                />
              </div>
              <header className="flex items-baseline justify-between flex-wrap gap-3 pb-5 border-b border-warm-100">
                <span className="text-[18px] font-semibold text-ink tracking-[-0.015em]">
                  Palladium Hotel Group
                </span>
                <span className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-ink-soft font-semibold">
                  Hoteles · España · ~5 marcas
                </span>
              </header>

              <blockquote
                className="border-l-[3px] pl-5 italic"
                style={{ borderColor: "#2E5C8A" }}
              >
                <p className="text-[18.5px] leading-[1.4] tracking-[-0.01em] font-medium text-ink">
                  &ldquo;El dato que entrega Sealmetrics es agnóstico, sin sesgo y neutral. No hay caja negra.&rdquo;
                </p>
                <cite className="block mt-3 not-italic font-mono text-[11px] uppercase tracking-[0.1em] text-ink-soft font-semibold">
                  Toni Andújar · Digital &amp; Direct Sales Director
                </cite>
              </blockquote>

              <ul className="grid grid-cols-3 gap-4 pt-5 border-t border-warm-100">
                {[
                  { n: "40%", l: "Tráfico sin atribución antes" },
                  { n: "35%", l: "Reservas sin atribuir en GA4" },
                  { n: "+165%", l: "Mejora Display CPS (DV360)" },
                ].map((s) => (
                  <li key={s.l}>
                    <div className="text-[24px] font-semibold tracking-[-0.025em] text-ink leading-none tabular-nums">
                      {s.n}
                    </div>
                    <div className="text-[12.5px] text-ink-soft mt-2 leading-[1.4]">
                      {s.l}
                    </div>
                  </li>
                ))}
              </ul>

              <Link
                href="/es/case-studies/palladium-hotel-group"
                className="inline-flex items-center gap-1.5 mt-2 text-[14.5px] font-semibold text-ink no-underline border-b border-warm-200 hover:border-ink self-start"
              >
                Leer el caso Palladium <span>→</span>
              </Link>
            </article>

            {/* Dreamplace card */}
            <article className="bg-white border border-warm-100 rounded-2xl p-8 md:p-10 flex flex-col gap-6">
              <div className="h-12 flex items-center">
                <Picture
                  src="/logos/clients/dreamplace.svg"
                  alt="Dreamplace Hotels"
                  width={200}
                  height={48}
                  className="h-10 w-auto object-contain"
                />
              </div>
              <header className="flex items-baseline justify-between flex-wrap gap-3 pb-5 border-b border-warm-100">
                <span className="text-[18px] font-semibold text-ink tracking-[-0.015em]">
                  Dreamplace Hotels
                </span>
                <span className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-ink-soft font-semibold">
                  Hoteles · España · ~2 años
                </span>
              </header>

              <blockquote
                className="border-l-[3px] pl-5 italic"
                style={{ borderColor: "#2E5C8A" }}
              >
                <p className="text-[18.5px] leading-[1.4] tracking-[-0.01em] font-medium text-ink">
                  &ldquo;Lo que nos aporta es lo que hemos necesitado siempre: el dato lo más real posible y lo más próximo a la realidad.&rdquo;
                </p>
                <cite className="block mt-3 not-italic font-mono text-[11px] uppercase tracking-[0.1em] text-ink-soft font-semibold">
                  Eduardo Martin · Analítica y Campañas · Dreamplace
                </cite>
              </blockquote>

              <ul className="grid grid-cols-3 gap-4 pt-5 border-t border-warm-100">
                {[
                  { n: "+30%", l: "Más tráfico vs Google Analytics" },
                  { n: "15–20%", l: "Más ventas atribuidas (vs herramienta anterior)" },
                  { n: "Meta + Google", l: "Primeros canales decidiendo con Sealmetrics" },
                ].map((s) => (
                  <li key={s.l}>
                    <div className="text-[24px] font-semibold tracking-[-0.025em] text-ink leading-none tabular-nums">
                      {s.n}
                    </div>
                    <div className="text-[12.5px] text-ink-soft mt-2 leading-[1.4]">
                      {s.l}
                    </div>
                  </li>
                ))}
              </ul>

              <Link
                href="/es/case-studies/dreamplace-hotels"
                className="inline-flex items-center gap-1.5 mt-2 text-[14.5px] font-semibold text-ink no-underline border-b border-warm-200 hover:border-ink self-start"
              >
                Leer el caso Dreamplace <span>→</span>
              </Link>
            </article>
          </div>

              <p className="mt-10 text-center text-[15px] text-ink-soft">
                Tamaños distintos. Stacks distintos. Mismo diagnóstico: el dato incompleto estaba dirigiendo las decisiones de presupuesto hasta que Sealmetrics lo sustituyó por el número real.
              </p>
            </div>
          </section>
        }
      />

      <TldrBlock
        label="Analítica sin cookies para hoteles"
        answer={
          <>
            La <strong>analítica sin cookies para hoteles</strong> permite a los
            grupos hoteleros cuadrar los totales agregados de reservas directas
            con el PMS sin cookies, banners de consentimiento ni gaps de
            ad-blockers. Sealmetrics cuenta de forma anónima cada landing de
            meta-search, cada visita móvil Safari y cada evento de reserva —
            cada reserva atribuida last-click a nivel de canal y consolidada
            entre propiedades para reporting de ingresos de portfolio.
          </>
        }
        bullets={[
          <>Palladium Hotel Group: el 35% de las reservas que registraba GA4 no tenía canal.</>,
          <>Totales agregados por canal para meta-search (Google Hotel Ads, Trivago) sin dependencia de cajas negras de OTAs.</>,
          <>Sin plugin de PMS: las conversiones del motor de reservas llegan como eventos estándar, y la API REST y los webhooks permiten cuadrarlas con Mews, Cloudbeds, Opera o cualquier otro PMS.</>,
          <>Sin tracking de journey por huésped — solo conteos agregados, defendibles bajo RGPD.</>,
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
            href: "/es/for/ecommerce",
            title: "Para eCommerce",
            desc: "Shopify, Magento y atribución de checkout DTC.",
          },
          {
            href: "/es/for/media",
            title: "Para medios",
            desc: "Audiencias con alto uso de ad-blockers.",
          },
        ]}
      />
      <LogosStripEs />
    </>
  );
}
