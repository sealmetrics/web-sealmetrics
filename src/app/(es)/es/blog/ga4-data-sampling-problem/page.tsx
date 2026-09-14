import type { Metadata } from "next";
import { postDates } from "@/lib/content/blog";
import { PostByline } from "@/components/ui/PostByline";
import { getAlternates } from "@/lib/i18n/navigation";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";
import { CommercialModule } from "@/components/ui/CommercialModule";

export const metadata: Metadata = {
  title: "Muestreo de datos en GA4: por qué tus números están mal",
  description:
    "GA4 aplica muestreo cuando el tráfico supera ciertos umbrales. Cómo funciona, por qué importa y qué puedes hacer al respecto.",
  openGraph: {
    title: "Muestreo de datos en GA4: por qué tus números de tráfico están mal",
    description:
      "GA4 aplica muestreo de datos a volúmenes altos. Aquí está el impacto en tus datos y decisiones.",
    type: "article",
    url: "https://sealmetrics.com/es/blog/ga4-data-sampling-problem/",
    siteName: "Sealmetrics",
    locale: "es_ES",
    images: ["https://sealmetrics.com/og/blog/ga4-data-sampling-problem.png"],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Muestreo de datos en GA4: por qué tus números de tráfico están mal",
    description: "GA4 aplica muestreo de datos a volúmenes altos. Aquí está el impacto en tus datos y decisiones.",
    images: ["https://sealmetrics.com/og/blog/ga4-data-sampling-problem.png"],
  },
  alternates: {
    languages: getAlternates("/blog/ga4-data-sampling-problem"),
    canonical: "https://sealmetrics.com/es/blog/ga4-data-sampling-problem/",
  },
};

export default function GA4DataSamplingPageEs() {
  const dates = postDates("ga4-data-sampling-problem", "es");

  return (
    <>
      <Breadcrumbs items={[{ label: "Blog", href: "/es/blog" }, { label: "Muestreo de datos en GA4" }]} locale="es" />
      <JsonLd data={articleSchema({ headline: "Muestreo de datos en GA4: por qué tus números de tráfico están mal", description: "GA4 aplica muestreo de datos que distorsiona tu analítica.", ...dates, url: "/es/blog/ga4-data-sampling-problem", category: "Calidad del dato", author: { name: "Rafa Jiménez", url: "/es/authors/rafa-jimenez", jobTitle: "Founder, Sealmetrics" } })} />
      <JsonLd data={breadcrumbSchema([{ name: "Blog", url: "/es/blog" }, { name: "Muestreo de datos en GA4", url: "/es/blog/ga4-data-sampling-problem" }])} />
      <article className="pt-12 pb-28 bg-white">
        <div className="max-w-[936px] mx-auto px-5 sm:px-8">

        <header className="mb-12">
          <span className="inline-block text-[0.75rem] font-medium tracking-[0.08em] uppercase text-text-tertiary mb-4">
            Calidad del dato
          </span>
          <h1 className="font-serif text-[2.5rem] font-medium text-text-primary leading-[1.2] mb-6">
            Muestreo de datos en GA4: por qué tus números de tráfico están mal
          </h1>
          <PostByline
              {...dates}
              readTime="7 min de lectura"
              authorName="Rafa Jiménez"
              authorUrl="/es/authors/rafa-jimenez"
              locale="es"
            />
        </header>

        <div className="mb-12 p-6 bg-warm-white border border-warm-100 rounded-[4px]">
          <h2 className="font-serif text-[1rem] font-medium text-text-primary mb-3">
            Conclusiones clave
          </h2>
          <ul className="space-y-2 text-[0.9rem] leading-[1.7] text-text-secondary list-none pl-0 [&>li]:relative [&>li]:pl-6 [&>li]:before:content-['—'] [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:text-text-tertiary">
            <li>GA4 aplica muestreo en los reports de Exploración cuando los datos superan los umbrales internos — la versión gratis tiene umbrales más bajos que GA360.</li>
            <li>El dato muestreado puede invertir los rankings de campañas: la Campaña A con 342 conversiones reales puede estimarse en 310 mientras que la Campaña B con 298 aparece como 320.</li>
            <li>Antes incluso de empezar el muestreo, GA4 ya ha perdido parte del tráfico UE por rechazo de consentimiento, ad blockers y restricciones de navegador — el 29% de las visitas en una tienda Shopify real medida durante 48 días, y hasta el 87% en el peor escenario. Estás decidiendo sobre una estimación de una fracción.</li>
            <li>La analítica cookieless captura cada sesión sin muestreo — cuando ves 72.847 visitantes, son 72.847 sesiones reales, no una proyección.</li>
          </ul>
        </div>

        <div className="space-y-6 text-[1.05rem] leading-[1.8] text-text-body">
          <p>
            Si tu sitio web recibe tráfico significativo, GA4 no te está mostrando
            todo. Te está mostrando una estimación estadística basada en una
            muestra. Esto se llama{" "}
            <Link
              href="/es/glossary/data-sampling"
              className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
            >
              muestreo de datos
            </Link>
            , y es uno de los aspectos peor entendidos de Google Analytics.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            ¿Qué es el muestreo en GA4?
          </h2>

          <p>
            El muestreo ocurre cuando GA4 analiza un subconjunto de tus datos y
            extrapola los resultados para representar el dataset completo. En lugar de procesar cada evento, GA4 toma una muestra estadística y aplica modelos matemáticos para estimar cómo sería la foto completa.
          </p>

          <p>
            En GA4, el{" "}
            <a href="https://support.google.com/analytics/answer/13331684" target="_blank" rel="noopener noreferrer">muestreo se dispara</a>{" "}
            cuando creas reports de exploración que superan ciertos umbrales de datos. Google no
            comunica públicamente los umbrales exactos, pero el icono de muestreo aparece en tus
            reports cuando está activo. La versión gratis de GA4 tiene umbrales más bajos
            que GA360, lo que significa que el muestreo se activa antes para la mayoría de los negocios.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            Por qué el muestreo importa al decidir
          </h2>

          <p>
            El muestreo introduce un margen de error. Para tendencias de tráfico de alto nivel,
            puede ser aceptable. Pero para análisis específicos —
            performance de campaña por segmento, análisis de conversion path, atribución de revenue
            por creatividad — incluso márgenes pequeños se acumulan en
            conclusiones poco fiables.
          </p>

          <p>Considera este escenario:</p>

          <div className="p-6 bg-warm-white border border-warm-100 rounded-[4px] text-[0.9rem] my-6">
            <p className="mb-3">
              Tu data real muestra que la Campaña A generó 342 conversiones y
              la Campaña B 298. Tras el muestreo, GA4 estima la Campaña A
              en 310 y la B en 320. Aumentas presupuesto de la B.
            </p>
            <p className="text-text-tertiary">
              La decisión se tomó sobre datos muestreados. La realidad era
              la contraria.
            </p>
          </div>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            El muestreo es solo parte del problema
          </h2>

          <p>
            El muestreo reduce la precisión del dato que sí tienes. Pero el problema mayor
            es el dato que ni siquiera recoges. Antes de empezar el muestreo, GA4 ya ha perdido visitantes por{" "}
            <Link
              href="/es/blog/consent-banner-impact-on-analytics"
              className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
            >
              rechazo en banners de consentimiento
            </Link>
            , ad blockers y restricciones de cookies del navegador.
          </p>

          <p>
            Cuánto se pierde depende de cada web. En una tienda Shopify real donde GA4 con Consent Mode y Sealmetrics funcionaron en paralelo durante 48 días,{" "}
            <Link href="/es/case-studies/incapto" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">GA4 no registró el 29% de las visitas ni el 45% de las páginas vistas</Link>
            ; en el peor escenario, con todas las pérdidas sumadas, puede ver solo el 13% del tráfico real. Después, el muestreo degrada aún más la precisión de lo que queda. Estás decidiendo sobre una estimación de una fracción.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            La alternativa: analítica a resolución completa
          </h2>

          <p>
            Las plataformas de{" "}
            <Link
              href="/es/glossary/cookieless-analytics"
              className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
            >
              analítica cookieless
            </Link>{" "}
            como Sealmetrics tienen un enfoque fundamentalmente distinto.
            Al recoger datos por métodos cookieless first-party, cada sesión se captura independientemente del estado del banner, del ad blocker o de las restricciones del navegador. Y como el volumen de datos
            se gestiona a nivel de infraestructura, no hace falta muestreo
            estadístico.
          </p>

          <p>
            Cuando ves 72.847 visitantes en Sealmetrics, ese número representa
            72.847 sesiones reales. No una muestra. No una estimación. No una
            proyección a partir del subconjunto que aceptó cookies.
          </p>

          <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
            Qué puedes hacer
          </h2>

          <p>
            Si usas GA4, revisa tus reports de exploración por el indicador de
            muestreo. Si lo ves, tu dato es aproximado. Para reports estándar, GA4
            usa datos modelados (Google los llama &ldquo;blended data&rdquo;), lo que introduce su propia capa de estimación.
          </p>

          <p>
            La forma más fiable de entender el gap es correr una herramienta de analítica
            completa en paralelo a GA4 y comparar los números. Puedes{" "}
            <Link
              href="/es/data-loss-calculator"
              className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
            >
              estimar tu pérdida de datos aquí
            </Link>{" "}
            o{" "}
            <Link
              href="/es/how-it-works"
              className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
            >
              ver cómo funciona la analítica cookieless
            </Link>
            .
          </p>
        </div>

        <CommercialModule
          locale="es"
          hook="¿Tus informes de GA4 llevan el aviso de muestreo? Ve tus propios datos a resolución completa en una demo: Sealmetrics calcula sobre el 100% de los eventos, nunca sobre una muestra."
        />

        <div className="mt-16 pt-10 border-t border-warm-100">
          <h3 className="font-serif text-[1.1rem] font-medium text-text-primary mb-4">
            Artículos relacionados
          </h3>
          <div className="space-y-3">
            <Link
              href="/es/blog/consent-banner-impact-on-analytics"
              className="block text-[0.9rem] text-text-secondary no-underline hover:text-text-primary transition-colors"
            >
              Cómo los banners de consentimiento destruyen tus datos de analítica
            </Link>
            <Link
              href="/es/blog/cookieless-analytics-explained"
              className="block text-[0.9rem] text-text-secondary no-underline hover:text-text-primary transition-colors"
            >
              Analítica cookieless explicada: cómo medir sin cookies
            </Link>
          </div>
        </div>
      </div>
    </article>
    </>
  );
}
