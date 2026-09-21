import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbSchema, servicePageSchema } from "@/lib/schema";
import { getAlternatesEs } from "@/lib/i18n/navigation";
import { AuditForm } from "@/components/audit/AuditForm";
import { ogImage } from "@/lib/seo/og";

export const metadata: Metadata = {
  title: "Auditoría gratuita de medición — Sealmetrics",
  description:
    "Responde 7 preguntas en 3 minutos. Te enviamos un análisis personalizado del gap entre lo que mide GA4 y lo que realmente vende tu eCommerce.",
  alternates: {
    canonical: "https://sealmetrics.com/es/audit/",
    languages: getAlternatesEs("/audit"),
  },
  openGraph: {
    title: "Auditoría gratuita de medición — Sealmetrics",
    description:
      "Descubre cuánto revenue oculta tu analytics. Auditoría personalizada en 24h, escrita por una persona, sin secuencias automatizadas.",
    type: "website",
    images: [ogImage("/es/audit/")],
    locale: "es_ES",
    url: "https://sealmetrics.com/es/audit/",
    siteName: "Sealmetrics",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Auditoría gratuita de medición — Sealmetrics",
    description: "Descubre cuánto revenue oculta tu analytics. Auditoría personalizada en 24h, escrita por una persona, sin secuencias automatizadas.",
    images: [ogImage("/es/audit/")],
  },
};

export default function Page() {
  return (
    <>
      <Breadcrumbs
        items={[{ label: "Auditoría gratuita" }]}
        locale="es"
      />
      <JsonLd
        data={breadcrumbSchema(
          [{ name: "Auditoría gratuita", url: "/es/audit" }],
          "es"
        )}
      />
      <JsonLd
        data={servicePageSchema({
          name: "Auditoría gratuita de medición · Sealmetrics",
          description:
            "Auditoría personalizada del gap entre GA4 y los ingresos reales de tu backend. 7 preguntas, 3 minutos, informe humano en 24h.",
          url: "/es/audit",
          audience: "CMO, Head of Marketing, Director eCommerce",
        })}
      />

      <section className="relative overflow-hidden bg-warm-white pt-28 md:pt-32 pb-12">
        <div className="max-w-[760px] mx-auto px-5 sm:px-8">
          <span className="eyebrow mb-5">Auditoría gratuita de medición</span>
          <h1 className="h-display mt-5">
            Descubre cuánto revenue oculta <em>tu analytics.</em>
          </h1>
          <p
            className="text-ink-soft mt-7 leading-[1.55] max-w-[60ch]"
            style={{ fontSize: "clamp(17px, 1.4vw, 20px)" }}
          >
            Responde 7 preguntas y te enviamos un análisis personalizado del gap
            entre lo que mide GA4 y lo que realmente vende tu eCommerce. Escrito
            por una persona y entregado en 24h — sin secuencias automatizadas.
          </p>
          <p className="font-mono text-[12px] uppercase tracking-[0.1em] text-ink-soft font-semibold mt-6">
            3 minutos · sin instalar nada
          </p>
        </div>
      </section>

      {/* Copy editorial nativa, no traducción del inglés: la página tenía 101
          palabras visibles alrededor de un formulario. */}
      <section className="bg-paper border-t border-hairline py-16 md:py-20">
        <div className="max-w-[760px] mx-auto px-5 sm:px-8">
          <h2 className="text-[32px] md:text-[40px] font-[790] tracking-[-0.045em] leading-[0.95] text-ink">
            Qué recibes
          </h2>
          <p className="text-ink-soft mt-6 leading-[1.6] text-[17px] max-w-[62ch]">
            En Europa, GA4 solo cuenta a los visitantes que aceptan el banner y
            no lo bloquean. En la{" "}
            <Link href="/es/case-studies/incapto" className="underline">
              tienda Shopify de Incapto, medida durante 48 días
            </Link>
            , no registró el 29% de las visitas. Y en nuestra experiencia con
            clientes, de quienes aceptan las cookies, el 40% no lo hace en la
            primera página vista, así que llega sin la fuente de tráfico
            asociada.
            Cada decisión de inversión tomada sobre esa base se toma
            sobre una muestra que nadie eligió. La auditoría pone un número a tu
            versión concreta de ese gap antes de que instales nada.
          </p>
          <ul className="mt-8 space-y-4 text-[16px] leading-[1.6] text-ink-soft">
            <li className="flex gap-3">
              <span className="text-acid-ink shrink-0">—</span>
              <span>
                Una estimación del tráfico y los ingresos que tu configuración
                actual no atribuye, contrastada con las cifras de backend que nos
                facilites.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-acid-ink shrink-0">—</span>
              <span>
                Qué canal tuyo tiene más papeletas de estar infravalorado, y
                cuánto cuesta eso con tu inversión actual.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-acid-ink shrink-0">—</span>
              <span>
                Una lectura escrita de si tu montaje de consentimiento y píxeles
                está generando exposición legal además del gap de medición.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-acid-ink shrink-0">—</span>
              <span>
                Escrito por una persona en 24 horas. Sin secuencia de correos,
                sin scoring automático y sin llamada obligatoria para recibirlo.
              </span>
            </li>
          </ul>

          <h2 className="text-[32px] md:text-[40px] font-[790] tracking-[-0.045em] leading-[0.95] text-ink mt-16">
            Qué no es
          </h2>
          <p className="text-ink-soft mt-6 leading-[1.6] text-[17px] max-w-[62ch]">
            No es un escaneo técnico de tus etiquetas: para eso está la{" "}
            <Link href="/free-audit/" className="underline">
              auditoría gratuita de píxeles y RGPD
            </Link>
            , que rastrea tu web y te dice qué píxeles disparan antes del
            consentimiento, con un PDF de vuelta en dos o tres minutos. Tampoco
            es una demo de producto: si ya sabes que el gap es real y quieres ver
            la plataforma, reserva una{" "}
            <Link href="/es/demo/" className="underline">
              demo
            </Link>{" "}
            directamente. Y no es una reescritura de tu plan de medición — es una
            cifra, una causa y una lectura honesta de si esa cifra es lo bastante
            grande como para actuar.
          </p>
        </div>
      </section>

      <section className="bg-white border-t border-warm-100 py-16 md:py-20">
        <div className="max-w-[760px] mx-auto px-5 sm:px-8">
          <AuditForm locale="es" />
          <p className="text-center text-[13px] text-ink-soft mt-6">
            Tus datos se quedan en la UE. No compartimos los envíos con
            terceros.
          </p>
        </div>
      </section>
    </>
  );
}
