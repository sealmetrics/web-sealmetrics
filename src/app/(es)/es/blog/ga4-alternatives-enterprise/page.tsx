import type { Metadata } from "next";
import { postDates } from "@/lib/content/blog";
import { PostByline } from "@/components/ui/PostByline";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import {
  articleSchema,
  breadcrumbSchema,
  itemListSchema,
} from "@/lib/schema";
import { getAlternates } from "@/lib/i18n/navigation";
import { CommercialModule } from "@/components/ui/CommercialModule";
import { ogImage } from "@/lib/seo/og";

export const metadata: Metadata = {
  title: "7 alternativas a GA4 para equipos de eCommerce en 2026",
  description:
    "Compara 7 alternativas a GA4 para eCommerce: precio, tasa de captura de dato, cumplimiento UE y features de eCommerce. De GA360 a plataformas cookieless.",
  openGraph: {
    title: "7 alternativas a GA4 para equipos de eCommerce en 2026",
    description:
      "En una tienda medida, GA4 no registró el 29% de las visitas. Compara 7 alternativas por completitud del dato, precio y features.",
    type: "article",
    images: [ogImage("/es/blog/ga4-alternatives-enterprise/")],
    url: "https://sealmetrics.com/es/blog/ga4-alternatives-enterprise/",
    siteName: "Sealmetrics",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "7 alternativas a GA4 para equipos de eCommerce en 2026",
    description: "En una tienda medida, GA4 no registró el 29% de las visitas. Compara 7 alternativas por completitud del dato, precio y features.",
    images: [ogImage("/es/blog/ga4-alternatives-enterprise/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/es/blog/ga4-alternatives-enterprise/",
    languages: getAlternates("/blog/ga4-alternatives-enterprise"),
  },
};

const alternatives = [
  {
    name: "Google Analytics 360 (GA360)",
    url: "https://marketingplatform.google.com/about/analytics-360/",
    pricing: "Por presupuesto, ~50–175K$+/año",
    dataCompleteness: "Depende del consentimiento",
    chooseIf:
      "Tienes un presupuesto de analítica de seis cifras, tu equipo vive en Data Studio y las tasas de consentimiento en tus mercados superan el 70%.",
  },
  {
    name: "Adobe Analytics",
    url: "https://business.adobe.com/products/analytics/adobe-analytics.html",
    pricing: "$100.000+/año",
    dataCompleteness: "Depende del consentimiento",
    chooseIf:
      "Ya usas Adobe Experience Cloud y tienes analistas dedicados de Adobe que saben exprimir Analysis Workspace.",
  },
  {
    name: "Sealmetrics",
    url: "https://sealmetrics.com",
    pricing: "Desde 499 €/mes con facturación anual (5.988 €/año)",
    dataCompleteness: "Sin pérdida por consentimiento",
    chooseIf:
      "Necesitas dato UE sin huecos de consentimiento, atribución de revenue a último clic precisa y analítica enterprise sin precios de seis cifras.",
  },
  {
    name: "Piwik PRO",
    url: "https://piwikpro.com/",
    pricing: "Desde ~30.000 €/año",
    dataCompleteness: "Depende del consentimiento",
    chooseIf:
      "La soberanía del dato es innegociable, operas en administración pública o finanzas y la recogida basada en cookies es aceptable.",
  },
  {
    name: "Matomo",
    url: "https://matomo.org/",
    pricing: "Gratis (self-hosted) / Desde 23 €/mes (cloud)",
    dataCompleteness: "Depende del consentimiento por defecto (modo cookieless configurable)",
    chooseIf:
      "Tienes capacidad de DevOps, quieres transparencia open-source y puedes asumir las contrapartidas del modo cookieless de Matomo.",
  },
  {
    name: "Amplitude",
    url: "https://amplitude.com/",
    pricing: "Desde ~$50.000/año (enterprise)",
    dataCompleteness: "Variable (depende de cookies)",
    chooseIf:
      "Tu necesidad principal es la analítica de producto —adopción de features, análisis de journey de usuario— y el tráfico web lo cubre otra herramienta.",
  },
  {
    name: "Mixpanel",
    url: "https://mixpanel.com/",
    pricing: "Plan gratuito / Desde ~$25.000/año (enterprise)",
    dataCompleteness: "Variable (depende de cookies)",
    chooseIf:
      "Necesitas analítica de producto basada en eventos con menos barrera de entrada que Amplitude y un plan gratuito generoso.",
  },
];

export default function GA4AlternativesEnterpriseEsPage() {
  const dates = postDates("ga4-alternatives-enterprise", "es");

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Blog", href: "/es/blog" },
          { label: "Alternativas a GA4 para eCommerce" },
        ]}
        locale="es"
      />
      <JsonLd
        data={articleSchema({
          headline: "7 alternativas a GA4 para equipos de eCommerce en 2026",
          description:
            "Compara 7 alternativas a GA4 para eCommerce en precio, captura de dato, cumplimiento UE y features.",
          ...dates,
          url: "/es/blog/ga4-alternatives-enterprise",
          category: "Comparativas",
          author: {
            name: "Rafa Jiménez",
            url: "/es/authors/rafa-jimenez",
            jobTitle: "Founder, Sealmetrics",
          },
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Blog", url: "/es/blog" },
          { name: "Alternativas a GA4 para eCommerce", url: "/es/blog/ga4-alternatives-enterprise" },
        ])}
      />
      <JsonLd
        data={itemListSchema({
          name: "Alternativas a GA4 para equipos de eCommerce 2026",
          description:
            "7 alternativas a GA4 comparadas por completitud del dato, precio, cumplimiento UE y features de eCommerce.",
          url: "/es/blog/ga4-alternatives-enterprise",
          items: alternatives.map((a, i) => ({
            name: a.name,
            url: a.url,
            position: i + 1,
          })),
        })}
      />
      <article className="pt-12 pb-28 bg-white">
        <div className="max-w-[936px] mx-auto px-5 sm:px-8">
          <header className="mb-12">
            <span className="inline-block text-[0.75rem] font-medium tracking-[0.08em] uppercase text-text-tertiary mb-4">
              Comparativas
            </span>
            <h1 className="font-serif text-[2.5rem] font-medium text-text-primary leading-[1.2] mb-6">
              7 alternativas a GA4 para equipos de eCommerce en 2026
            </h1>
            <PostByline
              {...dates}
              readTime="10 min de lectura"
              authorName="Rafa Jiménez"
              authorUrl="/es/authors/rafa-jimenez"
              locale="es"
            />
          </header>

          <div className="mb-12 p-6 bg-warm-white border border-warm-100 rounded-[4px]">
            <h2 className="font-serif text-[1rem] font-medium text-text-primary mb-3">
              Puntos clave
            </h2>
            <ul className="space-y-2 text-[0.9rem] leading-[1.7] text-text-secondary list-none pl-0 [&>li]:relative [&>li]:pl-6 [&>li]:before:content-['—'] [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:text-text-tertiary">
              <li>
                GA4 depende del consentimiento, así que no ve parte de tu
                tráfico: el rechazo del banner, los ad blockers y las
                restricciones del navegador se llevan cada uno una parte, y
                cuánto depende de la tienda y del canal. En la tienda Shopify de
                Incapto, medida durante 48 días,{" "}
                <Link href="/es/case-studies/incapto" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">GA4 no registró el 29% de las visitas</Link>
                . La atribución de revenue construida sobre ese dato es
                estructuralmente incompleta.
              </li>
              <li>
                Las alternativas enterprise se dividen en dos categorías: las
                plataformas dependientes de cookies (GA360, Adobe, Piwik PRO) que
                mejoran a GA4 pero siguen sin ver a quien rechaza el consentimiento, y las
                plataformas cookieless (Sealmetrics) que no pierden tráfico por el consentimiento.
              </li>
              <li>
                Amplitude y Mixpanel son herramientas de analítica de producto, no
                sustitutos de analítica web. Destacan en el comportamiento in-app
                pero no miden métricas web tradicionales como fuentes de tráfico o
                atribución de campañas.
              </li>
              <li>
                La brecha de coste total entre plataformas es de 25x o más. GA360
                cuesta seis cifras al año y sigue dependiendo del consentimiento. Sealmetrics
                cuesta {"€"}5.988/año y no pierde dato por consentimiento. La comparación
                relevante es el coste por dato preciso.
              </li>
            </ul>
          </div>

          <div className="space-y-6 text-[1.05rem] leading-[1.8] text-text-body">
            <p>
              GA4 funciona bien para webs pequeñas y medianas con necesidades de
              reporting modestas. Es gratis, está bien documentado y profundamente
              integrado con Google Ads. Pero para equipos de eCommerce que
              gestionan atribución de revenue, optimización de campañas y
              asignación de presupuesto en mercados europeos, GA4 crea un conjunto
              específico de problemas que ninguna configuración resuelve.
            </p>

            <p>
              El problema de fondo es estructural. GA4 depende de cookies. Las
              cookies requieren{" "}
              <Link
                href="/es/glossary/consent-management-platform"
                className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
              >
                consentimiento
              </Link>
              . En la UE, en nuestra experiencia con clientes, entre el 40% y el 60% del tráfico no acepta cookies. Antes de
              que el{" "}
              <Link
                href="/es/glossary/data-sampling"
                className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
              >
                muestreo de datos
              </Link>{" "}
              y los ad blockers entren siquiera en escena, GA4 ya ha perdido a los
              visitantes que rechazan el banner. Para eCommerce, eso significa que la
              atribución de revenue, las tasas de conversión y{" "}
              <Link
                href="/es/glossary/data-loss-in-analytics"
                className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
              >
                toda métrica derivada
              </Link>{" "}
              se construyen sobre una fracción de la realidad.
            </p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
              Comparativa rápida
            </h2>

            <div className="overflow-x-auto my-6">
              <table className="w-full text-[0.8rem]">
                <thead>
                  <tr className="border-b border-warm-200">
                    <th className="text-left py-3 pr-4 text-text-tertiary font-medium">
                      Plataforma
                    </th>
                    <th className="text-left py-3 pr-4 text-text-tertiary font-medium">
                      Precio
                    </th>
                    <th className="text-left py-3 pr-4 text-text-tertiary font-medium">
                      Captura de dato UE
                    </th>
                    <th className="text-left py-3 pr-4 text-text-tertiary font-medium">
                      Elige si
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {alternatives.map((alt) => (
                    <tr
                      key={alt.name}
                      className="border-b border-warm-100 last:border-0"
                    >
                      <td className="py-3 pr-4 text-text-body font-medium">
                        {alt.name}
                      </td>
                      <td className="py-3 pr-4 text-text-body font-mono text-[0.75rem]">
                        {alt.pricing}
                      </td>
                      <td className="py-3 pr-4 text-text-body font-mono text-[0.75rem]">
                        {alt.dataCompleteness}
                      </td>
                      <td className="py-3 pr-4 text-text-secondary">
                        {alt.chooseIf.split(".")[0]}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Alternativas individuales */}
            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
              1. Google Analytics 360
            </h2>

            <p>
              <a
                href="https://marketingplatform.google.com/about/analytics-360/"
                target="_blank"
                rel="noopener noreferrer"
              >
                GA360
              </a>{" "}
              es el tramo enterprise de Google Analytics. Aborda las limitaciones
              más visibles de GA4: umbrales de muestreo más altos, export nativo a
              BigQuery, SLAs garantizados y un account manager dedicado. Para
              organizaciones muy invertidas en Google Ads y Data Studio, GA360
              ofrece una integración que ningún competidor iguala.
            </p>

            <div className="my-5 p-5 bg-warm-white border border-warm-100 rounded-[4px] text-[0.85rem]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <span className="text-text-tertiary text-[0.75rem] uppercase tracking-[0.04em]">
                    Precio:
                  </span>{" "}
                  <span className="font-mono text-text-primary">
                    ~50–175K$+/año
                  </span>
                </div>
                <div>
                  <span className="text-text-tertiary text-[0.75rem] uppercase tracking-[0.04em]">
                    Captura UE:
                  </span>{" "}
                  <span className="font-mono text-text-primary">Depende del consentimiento</span>
                </div>
                <div>
                  <span className="text-text-tertiary text-[0.75rem] uppercase tracking-[0.04em]">
                    Cumplimiento UE:
                  </span>{" "}
                  <span className="text-text-primary">
                    Procesamiento en EE. UU., DPA requerido
                  </span>
                </div>
                <div>
                  <span className="text-text-tertiary text-[0.75rem] uppercase tracking-[0.04em]">
                    eCommerce:
                  </span>{" "}
                  <span className="text-text-primary">
                    Enhanced eCommerce, BigQuery
                  </span>
                </div>
              </div>
            </div>

            <p>
              La limitación de fondo persiste: GA360 depende de cookies. En el
              eCommerce europeo, eso significa que el hueco por consentimiento se
              mantiene sin importar el gasto. A seis cifras al año, la pregunta es
              si tu presupuesto produce dato completo o mejores estimaciones.
            </p>

            <p>
              <strong className="font-semibold text-text-primary">
                Elige si:
              </strong>{" "}
              {alternatives[0].chooseIf}
            </p>

            <p>
              <Link
                href="/es/vs/ga360"
                className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
              >
                Comparativa completa Sealmetrics vs GA360
              </Link>
            </p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
              2. Adobe Analytics
            </h2>

            <p>
              <a
                href="https://business.adobe.com/products/analytics/adobe-analytics.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                Adobe Analytics
              </a>{" "}
              ofrece las capacidades de segmentación más profundas del mercado.
              Analysis Workspace está hecho a medida para el reporting enterprise, y
              la integración entre productos de Adobe Experience Cloud crea una capa
              unificada de inteligencia de marketing.
            </p>

            <div className="my-5 p-5 bg-warm-white border border-warm-100 rounded-[4px] text-[0.85rem]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <span className="text-text-tertiary text-[0.75rem] uppercase tracking-[0.04em]">
                    Precio:
                  </span>{" "}
                  <span className="font-mono text-text-primary">
                    $100.000+/año
                  </span>
                </div>
                <div>
                  <span className="text-text-tertiary text-[0.75rem] uppercase tracking-[0.04em]">
                    Captura UE:
                  </span>{" "}
                  <span className="font-mono text-text-primary">Depende del consentimiento</span>
                </div>
                <div>
                  <span className="text-text-tertiary text-[0.75rem] uppercase tracking-[0.04em]">
                    Cumplimiento UE:
                  </span>{" "}
                  <span className="text-text-primary">
                    Configurable, requiere revisión legal
                  </span>
                </div>
                <div>
                  <span className="text-text-tertiary text-[0.75rem] uppercase tracking-[0.04em]">
                    eCommerce:
                  </span>{" "}
                  <span className="text-text-primary">
                    Segmentación avanzada, métricas calculadas
                  </span>
                </div>
              </div>
            </div>

            <p>
              Las contrapartidas son significativas. La implementación lleva de 3 a
              6 meses con consultores especializados. El precio arranca por encima
              de 50K$ y escala con las server calls. Y como toda plataforma
              dependiente de cookies, Adobe se enfrenta a la misma brecha por
              consentimiento en la UE.
            </p>

            <p>
              <strong className="font-semibold text-text-primary">
                Elige si:
              </strong>{" "}
              {alternatives[1].chooseIf}
            </p>

            <p>
              <Link
                href="/es/vs/adobe-analytics"
                className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
              >
                Comparativa completa Sealmetrics vs Adobe Analytics
              </Link>
            </p>

            <CommercialModule
              locale="es"
              hook="¿Comparando alternativas sobre folletos de proveedor? Ve la siguiente de esta lista — Sealmetrics — corriendo sobre tu propio tráfico en una demo."
            />

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
              3. Sealmetrics
            </h2>

            <p>
              <Link
                href="/es/product"
                className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
              >
                Sealmetrics
              </Link>{" "}
              toma un enfoque de arquitectura fundamentalmente distinto. En lugar de
              recoger dato con cookies de navegador y luego mitigar la pérdida por
              consentimiento, Sealmetrics usa{" "}
              <Link
                href="/es/glossary/cookieless-analytics"
                className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
              >
                analítica cookieless
              </Link>{" "}
              para medir el tráfico sin depender del consentimiento. No se colocan cookies. No se recoge
              dato personal. No se requiere banner de consentimiento.
            </p>

            <div className="my-5 p-5 bg-warm-white border border-warm-100 rounded-[4px] text-[0.85rem]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <span className="text-text-tertiary text-[0.75rem] uppercase tracking-[0.04em]">
                    Precio:
                  </span>{" "}
                  <span className="font-mono text-text-primary">
                    Desde {"€"}499/mes con facturación anual ({"€"}5.988/año)
                  </span>
                </div>
                <div>
                  <span className="text-text-tertiary text-[0.75rem] uppercase tracking-[0.04em]">
                    Captura UE:
                  </span>{" "}
                  <span className="font-mono text-text-primary">Sin pérdida por consentimiento</span>
                </div>
                <div>
                  <span className="text-text-tertiary text-[0.75rem] uppercase tracking-[0.04em]">
                    Cumplimiento UE:
                  </span>{" "}
                  <span className="text-text-primary">
                    Por diseño — sin PII, solo UE
                  </span>
                </div>
                <div>
                  <span className="text-text-tertiary text-[0.75rem] uppercase tracking-[0.04em]">
                    eCommerce:
                  </span>{" "}
                  <span className="text-text-primary">
                    Atribución de revenue, LENS AI, analítica de agentes (en desarrollo)
                  </span>
                </div>
              </div>
            </div>

            <p>
              Para empresas de eCommerce UE que priorizan la completitud del dato,
              Sealmetrics ofrece capacidades enterprise a una fracción del precio
              enterprise heredado. La atribución de revenue a último clic se
              construye sobre dato completo — no sobre estimaciones de una fracción
              consentida. LENS AI responde preguntas sobre tu analítica en
              lenguaje natural, ancladas en tu dato completo. La analítica de agentes, en desarrollo, separará el
              tráfico de bots de IA de los visitantes humanos. El dato se procesa y
              almacena exclusivamente en la UE.
            </p>

            <p>
              La plataforma es más nueva que Google o Adobe, con un ecosistema más
              pequeño y sin integración nativa con Google Ads (hay export de dato
              disponible). Para equipos cuya necesidad principal es la medición
              precisa del rendimiento de eCommerce UE, la contrapartida favorece la
              completitud.
            </p>

            <p>
              <strong className="font-semibold text-text-primary">
                Elige si:
              </strong>{" "}
              {alternatives[2].chooseIf}
            </p>

            <p>
              <Link
                href="/es/how-it-works"
                className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
              >
                Cómo funciona Sealmetrics
              </Link>{" "}
              /{" "}
              <Link
                href="/es/for/ecommerce"
                className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
              >
                Sealmetrics para eCommerce
              </Link>
            </p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
              4. Piwik PRO
            </h2>

            <p>
              <a
                href="https://piwikpro.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Piwik PRO
              </a>{" "}
              es la alternativa UE-nativa más fuerte para sectores regulados.
              Construida en Polonia con alojamiento de dato solo en la UE, combina
              analítica con un tag manager y un gestor de consentimiento
              integrados. Para administración pública, finanzas y sanidad, la
              postura de cumplimiento de Piwik PRO es un diferenciador real.
            </p>

            <div className="my-5 p-5 bg-warm-white border border-warm-100 rounded-[4px] text-[0.85rem]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <span className="text-text-tertiary text-[0.75rem] uppercase tracking-[0.04em]">
                    Precio:
                  </span>{" "}
                  <span className="font-mono text-text-primary">
                    Desde ~{"€"}30.000/año
                  </span>
                </div>
                <div>
                  <span className="text-text-tertiary text-[0.75rem] uppercase tracking-[0.04em]">
                    Captura UE:
                  </span>{" "}
                  <span className="font-mono text-text-primary">Depende del consentimiento</span>
                </div>
                <div>
                  <span className="text-text-tertiary text-[0.75rem] uppercase tracking-[0.04em]">
                    Cumplimiento UE:
                  </span>{" "}
                  <span className="text-text-primary">
                    Alojamiento solo UE, gestor de consentimiento incluido
                  </span>
                </div>
                <div>
                  <span className="text-text-tertiary text-[0.75rem] uppercase tracking-[0.04em]">
                    eCommerce:
                  </span>{" "}
                  <span className="text-text-primary">
                    Tracking estándar, sin muestreo
                  </span>
                </div>
              </div>
            </div>

            <p>
              Piwik PRO sigue dependiendo de cookies. Pese a su posicionamiento
              privacy-first, la plataforma requiere consentimiento para el tracking.
              En mercados UE, eso significa que quien rechaza el consentimiento
              permanece invisible. Las features con IA son limitadas. El precio
              enterprise arranca en torno a {"€"}30.000 al año.
            </p>

            <p>
              <strong className="font-semibold text-text-primary">
                Elige si:
              </strong>{" "}
              {alternatives[3].chooseIf}
            </p>

            <p>
              <Link
                href="/es/vs/piwik-pro"
                className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
              >
                Comparativa completa Sealmetrics vs Piwik PRO
              </Link>
            </p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
              5. Matomo
            </h2>

            <p>
              <a
                href="https://matomo.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Matomo
              </a>{" "}
              es la opción open-source con vía de self-hosting. Para organizaciones
              que quieren que el dato nunca salga de su infraestructura, Matomo da
              esa garantía. Hay un modo cookieless disponible, pero sacrifica el
              tracking a nivel de visitante y el análisis entre sesiones.
            </p>

            <div className="my-5 p-5 bg-warm-white border border-warm-100 rounded-[4px] text-[0.85rem]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <span className="text-text-tertiary text-[0.75rem] uppercase tracking-[0.04em]">
                    Precio:
                  </span>{" "}
                  <span className="font-mono text-text-primary">
                    Gratis / Desde {"€"}23/mes
                  </span>
                </div>
                <div>
                  <span className="text-text-tertiary text-[0.75rem] uppercase tracking-[0.04em]">
                    Captura UE:
                  </span>{" "}
                  <span className="font-mono text-text-primary">
                    Depende del consentimiento por defecto
                  </span>
                </div>
                <div>
                  <span className="text-text-tertiary text-[0.75rem] uppercase tracking-[0.04em]">
                    Cumplimiento UE:
                  </span>{" "}
                  <span className="text-text-primary">
                    Propiedad total si es self-hosted
                  </span>
                </div>
                <div>
                  <span className="text-text-tertiary text-[0.75rem] uppercase tracking-[0.04em]">
                    eCommerce:
                  </span>{" "}
                  <span className="text-text-primary">
                    Plugin de eCommerce, objetivos, funnels
                  </span>
                </div>
              </div>
            </div>

            <p>
              El self-hosting requiere recursos de DevOps para mantenimiento,
              escalado y seguridad. El rendimiento puede degradarse con altos
              volúmenes de tráfico. Las features enterprise de eCommerce requieren
              plugins de pago. Para equipos con capacidad técnica, Matomo ofrece una
              base flexible.
            </p>

            <p>
              <strong className="font-semibold text-text-primary">
                Elige si:
              </strong>{" "}
              {alternatives[4].chooseIf}
            </p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
              6. Amplitude
            </h2>

            <p>
              <a
                href="https://amplitude.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Amplitude
              </a>{" "}
              es una plataforma de analítica de producto — no un sustituto de
              analítica web. Destaca en el análisis de cohortes de comportamiento,
              el seguimiento de adopción de features y la medición de retención. Su
              plataforma de experimentación está entre las más fuertes disponibles.
            </p>

            <div className="my-5 p-5 bg-warm-white border border-warm-100 rounded-[4px] text-[0.85rem]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <span className="text-text-tertiary text-[0.75rem] uppercase tracking-[0.04em]">
                    Precio:
                  </span>{" "}
                  <span className="font-mono text-text-primary">
                    Desde ~$50.000/año
                  </span>
                </div>
                <div>
                  <span className="text-text-tertiary text-[0.75rem] uppercase tracking-[0.04em]">
                    Captura UE:
                  </span>{" "}
                  <span className="font-mono text-text-primary">Variable</span>
                </div>
                <div>
                  <span className="text-text-tertiary text-[0.75rem] uppercase tracking-[0.04em]">
                    Cumplimiento UE:
                  </span>{" "}
                  <span className="text-text-primary">
                    DPA estándar, alojamiento EE. UU./UE
                  </span>
                </div>
                <div>
                  <span className="text-text-tertiary text-[0.75rem] uppercase tracking-[0.04em]">
                    eCommerce:
                  </span>{" "}
                  <span className="text-text-primary">
                    Analítica de producto, no analítica web
                  </span>
                </div>
              </div>
            </div>

            <p>
              Para equipos de producto que miden cómo interactúan los usuarios con
              las features del software, Amplitude ofrece capacidades que GA4 no
              iguala. Pero no sustituye a la analítica web para atribución de
              marketing, análisis de fuentes de tráfico o medición de campañas.
            </p>

            <p>
              <strong className="font-semibold text-text-primary">
                Elige si:
              </strong>{" "}
              {alternatives[5].chooseIf}
            </p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
              7. Mixpanel
            </h2>

            <p>
              <a
                href="https://mixpanel.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Mixpanel
              </a>{" "}
              es una plataforma de analítica basada en eventos con una interfaz
              intuitiva que los equipos no técnicos pueden usar con eficacia. El
              análisis de funnels, los informes de retención y la visualización de
              flujos están bien diseñados. Hay residencia de dato en la UE
              disponible.
            </p>

            <div className="my-5 p-5 bg-warm-white border border-warm-100 rounded-[4px] text-[0.85rem]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <span className="text-text-tertiary text-[0.75rem] uppercase tracking-[0.04em]">
                    Precio:
                  </span>{" "}
                  <span className="font-mono text-text-primary">
                    Gratis / Desde ~$25.000/año
                  </span>
                </div>
                <div>
                  <span className="text-text-tertiary text-[0.75rem] uppercase tracking-[0.04em]">
                    Captura UE:
                  </span>{" "}
                  <span className="font-mono text-text-primary">Variable</span>
                </div>
                <div>
                  <span className="text-text-tertiary text-[0.75rem] uppercase tracking-[0.04em]">
                    Cumplimiento UE:
                  </span>{" "}
                  <span className="text-text-primary">
                    Opción de residencia UE
                  </span>
                </div>
                <div>
                  <span className="text-text-tertiary text-[0.75rem] uppercase tracking-[0.04em]">
                    eCommerce:
                  </span>{" "}
                  <span className="text-text-primary">
                    Basado en eventos, funnels, retención
                  </span>
                </div>
              </div>
            </div>

            <p>
              Como Amplitude, Mixpanel es analítica de producto. El modelo basado en
              eventos requiere una planificación cuidadosa de la implementación. El
              precio enterprise crece con los usuarios trackeados. Ideal para
              equipos que necesitan análisis basado en eventos con un umbral de
              complejidad menor.
            </p>

            <p>
              <strong className="font-semibold text-text-primary">
                Elige si:
              </strong>{" "}
              {alternatives[6].chooseIf}
            </p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
              Cómo elegir la alternativa correcta
            </h2>

            <p>
              La decisión para los equipos de eCommerce se reduce a tres preguntas.
            </p>

            <p>
              <strong className="font-semibold text-text-primary">
                ¿Cuánto de tu revenue depende del tráfico UE?
              </strong>{" "}
              Si la mayoría de tus clientes son europeos, las plataformas
              dependientes de cookies atribuirán mal de forma estructural
              el revenue de las visitas que pierden por rechazo del consentimiento. Esto afecta al cálculo del ROI de campañas, a la
              asignación de presupuesto y al reporting de dirección. Solo las
              plataformas cookieless evitan esta brecha por completo.
            </p>

            <p>
              <strong className="font-semibold text-text-primary">
                ¿Necesitas analítica web o analítica de producto?
              </strong>{" "}
              Amplitude y Mixpanel miden el comportamiento in-app. GA360, Adobe,
              Piwik PRO, Matomo y Sealmetrics miden el tráfico web. Usar una para el
              propósito de la otra genera una fricción que la configuración no
              resuelve.
            </p>

            <p>
              <strong className="font-semibold text-text-primary">
                ¿Cuál es tu tolerancia de coste total?
              </strong>{" "}
              Incluye la cuota de plataforma más la implementación, los consultores
              necesarios y el coste implícito de la mala atribución de revenue por
              dato incompleto. Usa la{" "}
              <Link
                href="/es/data-loss-calculator"
                className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors"
              >
                calculadora de pérdida de dato
              </Link>{" "}
              para cuantificar cuánto le cuesta el dato incompleto a tu operación de
              eCommerce.
            </p>

            <p>
              El mercado ha cambiado. Dato completo, cumplimiento UE y análisis con
              IA ya no requieren presupuestos anuales de seis cifras. La pregunta es
              si tu inversión en analítica produce dato completo y fiable — o paga
              una prima por estimaciones.
            </p>
          </div>

          <CommercialModule
            locale="es"
            hook="¿Migrando de GA4 este trimestre? Compara tus números de GA4 con Sealmetrics, sin pérdida por consentimiento, sobre tu propio tráfico en una demo — 499 €/mes frente a los seis dígitos de GA360 o Adobe."
          />

          {/* Relacionados */}
          <div className="mt-16 pt-10 border-t border-warm-100">
            <h3 className="font-serif text-[1.1rem] font-medium text-text-primary mb-4">
              Artículos relacionados
            </h3>
            <div className="space-y-3">
              <Link
                href="/blog/best-enterprise-analytics-platforms"
                className="block text-[0.9rem] text-text-secondary no-underline hover:text-text-primary transition-colors"
              >
                8 mejores plataformas de analítica enterprise en 2026
              </Link>
              <Link
                href="/es/blog/why-ga4-misses-traffic"
                className="block text-[0.9rem] text-text-secondary no-underline hover:text-text-primary transition-colors"
              >
                Por qué GA4 no ve parte de tu tráfico
              </Link>
              <Link
                href="/es/blog/cookieless-analytics-explained"
                className="block text-[0.9rem] text-text-secondary no-underline hover:text-text-primary transition-colors"
              >
                Analítica cookieless explicada: cómo medir sin cookies
              </Link>
              <Link
                href="/es/alternatives/google-analytics"
                className="block text-[0.9rem] text-text-secondary no-underline hover:text-text-primary transition-colors"
              >
                Alternativas a Google Analytics: 8 herramientas comparadas
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
