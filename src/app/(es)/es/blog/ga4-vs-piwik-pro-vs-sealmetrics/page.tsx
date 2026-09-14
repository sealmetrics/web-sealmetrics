import type { Metadata } from "next";
import { postDates } from "@/lib/content/blog";
import { PostByline } from "@/components/ui/PostByline";
import Link from "next/link";
import { getAlternates } from "@/lib/i18n/navigation";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { FaqSection } from "@/components/ui/FaqSection";
import { articleSchema, breadcrumbSchema, faqPageSchema, speakableWebPageSchema } from "@/lib/schema";
import { CommercialModule } from "@/components/ui/CommercialModule";
import { ogImage } from "@/lib/seo/og";

/** Spanish edition of /blog/ga4-vs-piwik-pro-vs-sealmetrics; sources and dates listed there. */

const SLUG = "ga4-vs-piwik-pro-vs-sealmetrics";
const URL = `/es/blog/${SLUG}`;
const HEADLINE = "GA4 vs Piwik PRO vs Sealmetrics: cuál encaja en un equipo de marketing europeo";
const DESCRIPTION =
  "Tres arquitecturas, no tres versiones de una herramienta. Precio, identificadores, qué pasa sin consentimiento, atribución, retención y dónde gana cada una.";
const SOCIAL =
  "Una suite gratuita de Google, una suite de privacidad configurable y una capa de medición sin identificadores. Qué hace cada una cuando un visitante rechaza el banner y cuándo conviene.";

export const metadata: Metadata = {
  title: "GA4 vs Piwik PRO vs Sealmetrics: comparativa para la UE",
  description: DESCRIPTION,
  openGraph: {
    title: "GA4 vs Piwik PRO vs Sealmetrics",
    description: SOCIAL,
    type: "article",
    images: [ogImage(`/blog/${SLUG}/`)],
    url: `https://sealmetrics.com${URL}/`,
    siteName: "Sealmetrics",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "GA4 vs Piwik PRO vs Sealmetrics",
    description: SOCIAL,
    images: [ogImage(`/blog/${SLUG}/`)],
  },
  alternates: {
    canonical: `https://sealmetrics.com${URL}/`,
    languages: getAlternates(`/blog/${SLUG}`),
  },
};

const FAQ = [
  {
    question: "GA4 vs Piwik PRO vs Sealmetrics: ¿cuál es mejor para un eCommerce europeo?",
    answer:
      "Depende de la decisión para la que necesitas el dato. GA4 encaja en equipos que viven en Google Ads y aceptan un dato que depende del consentimiento. Piwik PRO encaja en equipos que quieren analítica, gestor de etiquetas, gestor de consentimiento y activación de un solo proveedor, con modos de privacidad configurables. Sealmetrics encaja en equipos cuya pregunta principal es qué canales y campañas producen ingresos, medidos en cada visita.",
  },
  {
    question: "¿Puede Piwik PRO medir visitantes sin consentimiento?",
    answer:
      "Piwik PRO documenta configuraciones anónimas para visitantes que no han dado su consentimiento. Su centro de ayuda también explica el coste: con las cookies de visitante y el hash de sesión desactivados, cada evento se trata como una sesión nueva y no se distinguen visitantes nuevos y recurrentes, y la atribución se estrecha a medida que se quitan identificadores. Que una configuración sea lícita sin consentimiento depende de tus ajustes y de tu autoridad.",
  },
  {
    question: "¿Cuánto cuestan GA4, Piwik PRO y Sealmetrics?",
    answer:
      "GA4 estándar es gratuito; Analytics 360 va con presupuesto a medida. El 14 de septiembre de 2026, Piwik PRO publicaba Business desde 36 € al mes y Enterprise desde 366 € al mes con facturación anual. Sealmetrics tiene un plan Agentic gratuito hasta 1M de eventos humanos al mes, Growth desde 499 € al mes y Scale desde 899 € al mes con facturación anual, y Enterprise a medida.",
  },
  {
    question: "¿Piwik PRO cumple el RGPD?",
    answer:
      "Piwik PRO se puede configurar para despliegues sensibles al RGPD, con centros de datos en la UE, enmascarado de IP, gestor de consentimiento y modos anónimos. El cumplimiento es una propiedad de tu configuración, no del producto: qué identificadores activas, qué recoges, tu base legal y los criterios de tu autoridad nacional. Lo mismo vale para GA4 y para Sealmetrics.",
  },
  {
    question: "¿Cuál de las tres tiene el script de seguimiento más ligero?",
    answer:
      "Medido el 27 de agosto de 2026, comprimido en gzip: el tracker de Sealmetrics pesa unos 1,1 KB, el ppms.js de Piwik PRO unos 26,8 KB y el gtag.js de GA4 unos 149 KB. El peso del script afecta al rendimiento de la página, no a lo que cada herramienta puede medir.",
  },
  {
    question: "¿Puedo usar Sealmetrics junto a GA4 o Piwik PRO?",
    answer:
      "Sí, y es la forma recomendada de evaluar. Mantén la configuración que realmente desplegarías, pon Sealmetrics a su lado durante un ciclo comercial completo, concilia las dos con tus pedidos reales y solo después compara canales. Muchos equipos mantienen GA4 para Google Ads y pasan las decisiones de presupuesto a la cifra conciliada.",
  },
];

const link =
  "text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors";
const dashList =
  "space-y-2 list-none pl-0 [&>li]:relative [&>li]:pl-6 [&>li]:before:content-['—'] [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:text-text-tertiary";
const h2 = "font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4";
const th = "text-left font-mono text-[11px] uppercase tracking-[0.08em] text-text-tertiary font-semibold py-2 pr-4 border-b border-warm-200 align-bottom";
const td = "py-2 pr-4 border-b border-warm-100 align-top";

const ROWS: [string, string, string, string][] = [
  ["Precio", "GA4 estándar gratuito; Analytics 360 con presupuesto a medida", "Business desde 36 €/mes; Enterprise desde 366 €/mes con facturación anual (publicado el 14 sep 2026)", "Agentic gratuito hasta 1M de eventos humanos; Growth 499 €/mes y Scale 899 €/mes con facturación anual; Enterprise a medida"],
  ["Alcance del producto", "Analítica, integrada con Google Ads y el stack de marketing de Google", "Analítica, gestor de etiquetas, gestor de consentimiento y activación de datos", "Analítica agregada: canales, campañas, conversiones, ingresos y embudos"],
  ["Identificadores", "Cookies first-party; User-ID opcional", "Configurables: cookies de visitante, un hash de sesión que dura 30 minutos desde el último evento, o ninguno", "Ninguno; un marcador de sesión efímero que no se guarda en el navegador"],
  ["Cuando un visitante rechaza el banner", "Modo básico: nada. Modo avanzado: pings sin cookies, con usuarios y sesiones modelados por encima de los umbrales de Google", "Depende de la configuración; con los dos identificadores desactivados, cada evento es una sesión nueva y no se reconoce a quien vuelve", "La misma medición que en cualquier otra visita; no se guarda nada en el dispositivo"],
  ["Atribución", "Basada en datos, último clic en pago y orgánico, último clic en canales de pago de Google", "Varios modelos con cookies de visitante; último clic solo con el hash de sesión", "Solo último clic dentro de la sesión"],
  ["Retención", "2 o 14 meses para exploraciones y embudos; hasta 50 meses en 360", "25 meses en Business; flexible en Enterprise", "24 meses"],
  ["Alojamiento", "Infraestructura de Google", "Nube pública en Alemania, Países Bajos, EE. UU., Suecia, Hong Kong o Emiratos (UAE North); nube privada en Enterprise", "Dublín, Irlanda"],
  ["Exportación de datos en bruto", "BigQuery: 1M de eventos al día en estándar, hasta 20.000 M en 360", "Acceso por API; revisa las opciones de exportación de tu plan", "Conector de BigQuery en Growth, Scale y Enterprise, cada hora o cada día"],
  ["Peso del tracker (gzip, medido el 27 ago 2026)", "~149 KB", "~26,8 KB", "~1,1 KB"],
  ["Servidor MCP para asistentes de IA", "Oficial, experimental y de solo lectura", "En beta, se ejecuta en local, consulta y configura", "Sí"],
];

export default function Ga4VsPiwikProVsSealmetricsPageEs() {
  const dates = postDates(SLUG, "es");

  return (
    <>
      <Breadcrumbs items={[{ label: "Blog", href: "/es/blog" }, { label: "GA4 vs Piwik PRO vs Sealmetrics" }]} locale="es" />
      <JsonLd
        data={articleSchema({
          headline: HEADLINE,
          description: DESCRIPTION,
          ...dates,
          url: URL,
          category: "Comparativas",
          author: { name: "Rafa Jiménez", url: "/es/authors/rafa-jimenez", jobTitle: "Founder, Sealmetrics" },
        })}
      />
      <JsonLd data={breadcrumbSchema([{ name: "Blog", url: "/es/blog" }, { name: "GA4 vs Piwik PRO vs Sealmetrics", url: URL }])} />
      <JsonLd data={faqPageSchema(FAQ, URL)} />
      <JsonLd data={speakableWebPageSchema({ url: URL, name: HEADLINE, selectors: [".key-takeaways", ".tldr"] })} />

      <article className="pt-12 pb-28 bg-white">
        <div className="max-w-[936px] mx-auto px-5 sm:px-8">
          <header className="mb-12">
            <span className="inline-block text-[0.75rem] font-medium tracking-[0.08em] uppercase text-text-tertiary mb-4">
              Comparativas
            </span>
            <h1 className="font-serif text-[2.5rem] font-medium text-text-primary leading-[1.2] mb-6">
              {HEADLINE}
            </h1>
            <PostByline {...dates} readTime="11 min de lectura" authorName="Rafa Jiménez" authorUrl="/es/authors/rafa-jimenez" locale="es" />
          </header>

          <p className="tldr mb-12 text-[1.15rem] leading-[1.7] text-text-secondary font-serif italic">
            GA4, Piwik PRO y Sealmetrics son tres arquitecturas distintas. GA4 es una
            suite gratuita de Google cuyo dato depende del consentimiento. Piwik PRO es
            una suite de pago con analítica, gestor de etiquetas, gestor de
            consentimiento y activación, en la que cada identificador que desactivas por
            privacidad se lleva informes. Sealmetrics es una capa de medición más
            estrecha y sin identificadores que atribuye los ingresos a último clic en cada
            visita. Elige por la decisión que necesitas tomar.
          </p>

          <div className="key-takeaways mb-12 p-6 bg-warm-white border border-warm-100 rounded-[4px]">
            <h2 className="font-serif text-[1rem] font-medium text-text-primary mb-3">Conclusiones clave</h2>
            <ul className={`text-[0.9rem] leading-[1.7] text-text-secondary ${dashList}`}>
              <li>GA4 es la opción por defecto de los equipos construidos alrededor de Google Ads. Sin consentimiento no mide nada en modo básico y modela usuarios y sesiones en modo avanzado, por encima de los umbrales de Google.</li>
              <li>Piwik PRO es la más amplia de las tres. Su privacidad es configurable, y su propia documentación es clara sobre el coste: con los dos identificadores desactivados, cada evento es una sesión nueva.</li>
              <li>Sealmetrics hace menos, a propósito: sin identificadores de usuario, sin gestor de etiquetas, sin gestor de consentimiento y solo con último clic. A cambio mide cada visita igual y se concilia con los pedidos.</li>
              <li>En la tienda Shopify de Incapto, GA4 con Consent Mode no registró el 29% de las visitas que Sealmetrics registró en los mismos 48 días.</li>
              <li>Evalúa con la configuración que realmente desplegarías, en paralelo y contra tus pedidos reales.</li>
            </ul>
          </div>

          <div className="space-y-6 text-[1.05rem] leading-[1.8] text-text-body">
            <p>
              Cuando un equipo de marketing europeo empieza a mirar más allá de GA4, la
              lista corta suele incluir Piwik PRO y, cada vez más, una opción sin cookies.
              Compararlas funcionalidad a funcionalidad es donde la evaluación se tuerce:
              los tres productos toman decisiones de arquitectura distintas, y esas
              decisiones marcan lo que cada uno puede reportar mucho antes que cualquier
              lista de funciones.
            </p>
            <p>
              Una declaración de interés: fabricamos una de las tres. La idea de este
              artículo es que te sirva aunque no nos elijas, así que cada dato de la
              competencia sale de la documentación del propio fabricante, lleva fecha y
              termina con los casos en que ese producto es la mejor opción. Las
              comparativas a dos entran más a fondo:{" "}
              <Link href="/es/vs-ga4" className={link}>Sealmetrics frente a GA4</Link> y{" "}
              <Link href="/es/vs/piwik-pro" className={link}>Sealmetrics frente a Piwik PRO</Link>.
            </p>

            <h2 className={h2}>La comparativa, lado a lado</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-[0.9rem] border-collapse min-w-[760px]">
                <thead>
                  <tr>
                    <th className={th}></th>
                    <th className={th}>GA4</th>
                    <th className={th}>Piwik PRO</th>
                    <th className={th}>Sealmetrics</th>
                  </tr>
                </thead>
                <tbody>
                  {ROWS.map(([label, ga4, piwik, seal]) => (
                    <tr key={label}>
                      <td className={`${td} font-semibold`}>{label}</td>
                      <td className={td}>{ga4}</td>
                      <td className={td}>{piwik}</td>
                      <td className={td}>{seal}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[0.9rem] text-text-tertiary">
              Datos de la competencia contrastados con la documentación de cada fabricante
              el 14 de septiembre de 2026; pesos de los trackers medidos el 27 de agosto de
              2026. Los fabricantes cambian planes y valores por defecto, así que vuelve a
              comprobarlos antes de firmar.
            </p>

            <h2 className={h2}>La fila que decide casi todas las evaluaciones: un visitante que dice que no</h2>
            <p>
              <strong>GA4</strong> delega la decisión en{" "}
              <Link href="/es/blog/consent-mode-measured-vs-modelled" className={link}>Consent Mode</Link>.
              En modo básico, un rechazo no envía nada. En modo avanzado, las etiquetas
              envían pings sin cookies y GA4 modela usuarios y sesiones, pero solo en
              propiedades por encima de 1.000 eventos denegados al día y 1.000 usuarios
              diarios con consentimiento, y ese dato modelado no llega a la exportación a
              BigQuery. En la{" "}
              <Link href="/es/case-studies/incapto" className={link}>tienda Shopify de Incapto</Link>,
              GA4 con Consent Mode no registró el 29% de las visitas ni el 45% de las
              páginas vistas en 48 días, y las campañas de pago pasaban del 62% del tráfico
              medido en cada visita al 50% en GA4.
            </p>
            <p>
              <strong>Piwik PRO</strong> te deja decidir cuánta identificación mantener. Con
              cookies de visitante, reconoce a quien vuelve y ofrece varios modelos de
              atribución. Solo con el hash de sesión, que dura 30 minutos desde el último
              evento, agrupa una visita y atribuye a último clic. Sin ninguno de los dos, su
              centro de ayuda indica que cada evento se trata como una sesión nueva, que no se
              puede reconocer a quien vuelve y que el dato pierde precisión. No hemos medido
              Piwik PRO en paralelo en la web de un cliente, así que no publicamos ningún
              porcentaje; prueba la configuración que desplegarías.
            </p>
            <p>
              <strong>Sealmetrics</strong> no tiene ese ajuste, porque no tiene ningún
              identificador que desactivar. No guarda nada en el dispositivo, agrupa una
              visita con un marcador efímero que no se guarda en el navegador y acredita cada
              conversión al origen de la sesión en la que ocurre. Al visitante que rechaza el
              banner se le mide igual que al que lo acepta. Que una analítica sin cookies
              quede exenta de consentimiento en tu mercado sigue dependiendo de tu
              configuración y de tu autoridad nacional.
            </p>

            <h2 className={h2}>Cuándo GA4 es la opción adecuada</h2>
            <ul className={dashList}>
              <li><strong>Google Ads es el centro de tu captación.</strong> Las audiencias, la importación de conversiones y las pujas son nativas, y GA4 es la vía que muchos equipos mantienen para ellas.</li>
              <li><strong>El presupuesto es ajustado.</strong> GA4 estándar no tiene coste de licencia, y su ecosistema de integraciones y de profesionales que lo conocen es el más grande.</li>
              <li><strong>Necesitas análisis por usuario sobre el tráfico que consiente.</strong> Cohortes, retención y rutas están disponibles donde los usuarios aceptan cookies.</li>
            </ul>

            <h2 className={h2}>Cuándo Piwik PRO es la opción adecuada</h2>
            <ul className={dashList}>
              <li><strong>Quieres un solo proveedor para toda la capa.</strong> Analítica, gestor de etiquetas, gestor de consentimiento y activación de datos en el mismo contrato.</li>
              <li><strong>Necesitas análisis por visitante con controles de privacidad.</strong> Con los identificadores activados y una base legal, ofrece continuidad del visitante y varios modelos de atribución, y eliges el equilibrio por web.</li>
              <li><strong>La ubicación del dato es un requisito de compras.</strong> Ofrece varias regiones de nube pública y, en Enterprise, nube privada.</li>
            </ul>

            <h2 className={h2}>Cuándo Sealmetrics es la opción adecuada</h2>
            <ul className={dashList}>
              <li><strong>La decisión es el presupuesto entre canales y campañas.</strong> Ingresos por canal, campaña y creatividad, acreditados en cada visita y contrastables con los pedidos.</li>
              <li><strong>No quieres gobernar una configuración de identificadores.</strong> No hay un modo de privacidad que elegir por web, porque no hay nada que identificar.</li>
              <li><strong>El peso de la página importa.</strong> El tracker pesa unos 1,1 KB comprimido.</li>
            </ul>

            <h2 className={h2}>Lo que Sealmetrics no hace</h2>
            <p>
              No tiene análisis por usuario, cohortes, informes de retención ni recorridos
              entre sesiones; ni atribución multi-touch o basada en datos; ni gestor de
              etiquetas, gestor de consentimiento o módulo de activación; y no envía
              conversiones a las plataformas publicitarias, así que GA4 o los píxeles de las
              plataformas siguen haciendo ese trabajo. Si alguna de esas cosas es el
              requisito principal, una de las otras dos encaja mejor. El razonamiento detrás
              de usar solo último clic está en{" "}
              <Link href="/es/blog/last-click-vs-modelled-attribution" className={link}>último clic frente a atribución modelada</Link>.
            </p>

            <h2 className={h2}>Cómo evaluar las tres sin fiarte de ningún fabricante</h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li><strong>Escribe las decisiones.</strong> El presupuesto entre canales, las pujas, el análisis de producto por usuario y la evidencia de cumplimiento necesitan herramientas distintas.</li>
              <li><strong>Configura cada candidata como la desplegarías.</strong> En Piwik PRO, eso significa el modo de identificadores que aprobaría tu equipo legal, no el más completo.</li>
              <li><strong>Pruébalas en la misma web y en las mismas semanas.</strong> Un ciclo comercial completo; la comparación de Incapto duró 48 días.</li>
              <li><strong>Concilia primero cada una con los pedidos reales.</strong> Una herramienta que no cuadra con el total de pedidos no sirve de referencia para los canales. El método está en{" "}<Link href="/es/use-cases/single-source-of-truth" className={link}>una sola cifra para marketing y finanzas</Link>.</li>
              <li><strong>Después compara el reparto por canal y el trabajo que costó.</strong> Qué informes sobrevivieron a tu configuración y cuánto gobierno necesita cada una.</li>
            </ol>
          </div>

          <CommercialModule
            locale="es"
            hook="¿Evaluando GA4, Piwik PRO y Sealmetrics? Pon Sealmetrics junto a la configuración que ya tienes y concilia las dos con tus pedidos."
          />

          <section className="mt-16 pt-10 border-t border-warm-100">
            <h2 className="text-[0.75rem] font-medium uppercase tracking-[0.06em] text-text-tertiary mb-5">
              Lecturas relacionadas
            </h2>
            <div className="space-y-4">
              <div>
                <Link href="/es/blog/consent-mode-measured-vs-modelled" className={`text-[0.95rem] ${link}`}>
                  Consent Mode: qué mide GA4 y qué modela
                </Link>
                <p className="text-[0.8rem] text-text-tertiary mt-1">9 min de lectura</p>
              </div>
              <div>
                <Link href="/es/blog/ga4-alternatives-enterprise" className={`text-[0.95rem] ${link}`}>
                  7 alternativas a GA4 para equipos de eCommerce en 2026
                </Link>
                <p className="text-[0.8rem] text-text-tertiary mt-1">Comparativas</p>
              </div>
              <div>
                <Link href="/es/blog/last-click-vs-modelled-attribution" className={`text-[0.95rem] ${link}`}>
                  Último clic frente a atribución modelada: en qué acierta cada una
                </Link>
                <p className="text-[0.8rem] text-text-tertiary mt-1">10 min de lectura</p>
              </div>
            </div>
          </section>

          <FaqSection items={FAQ} locale="es" heading="Preguntas sobre GA4, Piwik PRO y Sealmetrics" />
        </div>
      </article>
    </>
  );
}
