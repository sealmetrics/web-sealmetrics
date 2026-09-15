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
  faqPageSchema,
} from "@/lib/schema";
import { getAlternates } from "@/lib/i18n/navigation";
import { ComparisonLinks } from "@/components/ui/ComparisonLinks";
import {
  Chip,
  ReqHeading,
  ReqIndex,
  TestBox,
  StatRow,
  ScoreBands,
  ScorePill,
  ScrollableTable,
} from "@/components/ui/RequirementBlocks";
import { CommercialModule } from "@/components/ui/CommercialModule";
import { ogImage } from "@/lib/seo/og";

export const metadata: Metadata = {
  title: "La mejor herramienta de analítica web: 12 requisitos",
  description: "No es una lista de proveedores. 12 requisitos de una analítica web — píxel, tiempo real, dato sin huecos de consentimiento, API, MCP — y cómo probarlos.",
  openGraph: {
    title: "La mejor herramienta de analítica web: los 12 requisitos",
    description:
      "La especificación que una plataforma tiene que cumplir antes de merecer ese nombre. Cada requisito con el fallo que previene y una prueba que puedes ejecutar en la demo.",
    type: "article",
    images: [ogImage("/es/blog/best-web-analytics-tool/")],
    url: "https://sealmetrics.com/es/blog/best-web-analytics-tool/",
    siteName: "Sealmetrics",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "La mejor herramienta de analítica web: los 12 requisitos",
    description: "La especificación que una plataforma tiene que cumplir antes de merecer ese nombre. Cada requisito con el fallo que previene y una prueba que puedes ejecutar en la demo.",
    images: [ogImage("/es/blog/best-web-analytics-tool/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/es/blog/best-web-analytics-tool/",
    languages: getAlternates("/blog/best-web-analytics-tool"),
  },
};

const requisitos = [
  {
    n: 1,
    id: "req-1",
    title: "Píxel ultraligero",
    bar: "Menos de 5 KB gzip en red, menos de 10 KB parseados, asíncrono, sin depender de tag manager",
    seal: "1,1 KB en red · 2,0 KB parseados. ~132× más ligero que gtag.js",
    score: 2,
  },
  {
    n: 2,
    id: "req-2",
    title: "Dato sin huecos de consentimiento",
    bar: "Cargas de página observadas sin depender del consentimiento, no bloqueadas, sin muestreo",
    seal: "Sin cookies por arquitectura. En una medición en paralelo de 48 días sobre Shopify, GA4 no vio el 29% de las visitas y Sealmetrics registró el 96% de los pedidos reales",
    score: 2,
  },
  {
    n: 3,
    id: "req-3",
    title: "Tiempo real en todos los dashboards",
    bar: "Ingesta por debajo del minuto, misma frescura en todo el reporting, aguanta en pico",
    seal: "Tiempo real en todos los dashboards y funnels. El compromiso contractual se enuncia aparte: datos completos antes de las 6 AM",
    score: 2,
  },
  {
    n: 4,
    id: "req-4",
    title: "Responde a cualquier pregunta de un analista",
    bar: "Dimensión × métrica arbitrarias, sin colapso de cardinalidad, sin muestreo, funnels retroactivos, filas en crudo",
    seal: "Propiedades personalizadas como dimensiones nativas, segmentos, funnels retroactivos, endpoints en crudo. Sin muestreo",
    score: 2,
  },
  {
    n: 5,
    id: "req-5",
    title: "Píxel flexible",
    bar: "Eventos y propiedades arbitrarios, valor en divisa, ingesta servidor, SPA, multidominio, reglas de canal editables",
    seal: "Eventos y propiedades personalizados, microconversiones como concepto nativo, endpoint HTTP para ingesta servidor y offline",
    score: 2,
  },
  {
    n: 6,
    id: "req-6",
    title: "API robusta",
    bar: "Cobertura completa del reporting, claves acotadas, filas en crudo, webhooks, exportación nativa a warehouse",
    seal: "API REST y streaming, endpoints de filas en crudo, webhooks con log de entregas, exportación nativa a BigQuery sin ETL",
    score: 2,
  },
  {
    n: 7,
    id: "req-7",
    title: "MCP",
    bar: "Servidor MCP alojado por el fabricante, credenciales de solo lectura acotadas, invocable por agentes",
    seal: "Servidor MCP alojado. Claude, ChatGPT o un copiloto interno se conecta una vez y consulta el dato directamente",
    score: 2,
  },
  {
    n: 8,
    id: "req-8",
    title: "IA auditable y privada",
    bar: "Detección de anomalías y previsión, siempre trazables a la consulta, BYOK o inferencia en tu jurisdicción",
    seal: "LENS AI en todos los planes con tu propia clave, o Private AI — modelo abierto alojado en París, sin clave",
    score: 2,
  },
  {
    n: 9,
    id: "req-9",
    title: "Atribución honesta",
    bar: "Modelo enunciado con claridad, aplicado de forma consistente, sin mezclar observado y modelado",
    seal: "Last-click a nivel de canal sobre conversiones sin huecos de consentimiento. Sin conversiones modeladas. Sin multi-touch, de forma permanente",
    score: 2,
  },
  {
    n: 10,
    id: "req-10",
    title: "Filtrado de bots visible",
    bar: "Excluidos de las métricas e inspeccionables",
    seal: "Reporting de tráfico bot y sesiones sospechosas — las exclusiones son visibles, no solo un ajuste",
    score: 2,
  },
  {
    n: 11,
    id: "req-11",
    title: "Cumplimiento por arquitectura",
    bar: "Sin datos personales, ubicación UE nombrada, DPA incluido, certificaciones verificables",
    seal: "Sin datos personales, alojado en la UE en Dublín, DPA en contrato estándar. Sin certificación ISO 27001 ni SOC 2",
    score: 1,
  },
  {
    n: 12,
    id: "req-12",
    title: "Propiedad del dato y precio previsible",
    bar: "Exportación en formato abierto bajo demanda, retención declarada, precio previsible, minutos de puesta en marcha",
    seal: "Exportación completa vía API y BigQuery, precio por plan en lugar de por consumo de eventos, puesta en marcha en minutos",
    score: 2,
  },
];

const faqs = [
  {
    question:
      "¿Cuál es el requisito más importante en una herramienta de analítica web?",
    answer:
      "La completitud del dato. Que la plataforma no pierda cargas de página por el consentimiento es el prerrequisito de todos los demás requisitos: dashboards perfectos en tiempo real sobre el 40% de la realidad son una ruta más rápida a una decisión equivocada, no una mejor. Puntúa la completitud primero, y si una plataforma no la cumple, para ahí.",
  },
  {
    question: "¿Cuánto debe pesar un píxel de analítica?",
    answer:
      "Menos de 5 KB gzip en red y menos de 10 KB de JavaScript parseado en el dispositivo. Como referencia, gtag.js de GA4 pesa unos 146 KB en red y unos 409 KB parseados. Las etiquetas pesadas fallan primero en 3G y en móvil, así que pierdes justo el tráfico cuya tasa de conversión es más frágil — y las sesiones que nunca dispararon no aparecen en el informe que te dice que las sesiones bajan.",
  },
  {
    question: "¿Qué significa realmente «tiempo real» en analítica web?",
    answer:
      "Latencia de ingesta por debajo del minuto y la misma frescura en todo el conjunto de informes: cada dimensión, filtro, funnel y segmento consultable sobre el dato de hoy, con carga de pico. La mayoría de plataformas incluye una vista en vivo recortada de usuarios activos y páginas top mientras todos los informes que usarías para decidir corren sobre datos de entre 4 y 24 horas.",
  },
  {
    question: "¿Por qué una plataforma de analítica necesita un servidor MCP?",
    answer:
      "Porque los analistas trabajan ya con asistentes de IA en el circuito. Sin un servidor Model Context Protocol, cada pregunta se convierte en un viaje manual: montar el informe, exportar el CSV, pegarlo en un chat y recibir una respuesta sobre una foto congelada que no se puede profundizar. Un servidor MCP permite que tu asistente consulte él mismo canales, campañas, funnels y conversiones, en vivo. Un chat dentro del dashboard del proveedor no es lo mismo.",
  },
  {
    question: "¿Es la atribución last-click peor que la multi-touch?",
    answer:
      "No cuando la alternativa es un modelo sofisticado aplicado sobre dato parcial. Last-click sobre conversiones sin huecos de consentimiento es un instrumento defendible. Un modelo multi-touch sobre el 40% de sesiones que aceptaron cookies es un relato sobre una muestra disfrazado de medición. Lo que importa es que la plataforma declare su modelo y nunca mezcle cifras observadas y modeladas en el mismo número.",
  },
];

const linkClass =
  "text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors";
const h2Class =
  "font-serif text-[1.5rem] font-medium text-text-primary mt-14 mb-5";
const strongClass = "font-semibold text-text-primary";

export default function MejorHerramientaAnaliticaWebPage() {
  const dates = postDates("best-web-analytics-tool", "es");

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Blog", href: "/es/blog" },
          { label: "La mejor herramienta de analítica web" },
        ]}
      />
      <JsonLd
        data={articleSchema({
          headline:
            "La mejor herramienta de analítica web: los 12 requisitos que de verdad deciden",
          description:
            "Los 12 requisitos técnicos que debe cumplir una plataforma de analítica web — peso del píxel, tiempo real, dato sin huecos de consentimiento, API, MCP — cada uno con el fallo que previene y una prueba.",
          ...dates,
          url: "/es/blog/best-web-analytics-tool",
          category: "Comparativas",
          author: {
            name: "Rafa Jiménez",
            url: "/authors/rafa-jimenez",
            jobTitle: "Founder, Sealmetrics",
          },
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Blog", url: "/es/blog" },
          {
            name: "La mejor herramienta de analítica web",
            url: "/es/blog/best-web-analytics-tool",
          },
        ])}
      />
      <JsonLd
        data={itemListSchema({
          name: "12 requisitos de la mejor herramienta de analítica web",
          description:
            "La especificación técnica que debe cumplir una plataforma de analítica web, del peso del píxel al soporte MCP.",
          url: "/es/blog/best-web-analytics-tool",
          items: requisitos.map((r) => ({
            name: r.title,
            position: r.n,
          })),
        })}
      />
      <JsonLd data={faqPageSchema(faqs, "/es/blog/best-web-analytics-tool")} />

      <article className="pt-12 pb-28 bg-white">
        <div className="max-w-[936px] mx-auto px-5 sm:px-8">
          <header className="mb-12">
            <span className="inline-block rounded-full bg-mint px-3 py-1 text-[0.7rem] font-medium tracking-[0.08em] uppercase text-[#1F5C48] mb-5">
              Comparativas
            </span>
            <h1 className="font-serif text-[2.5rem] font-medium text-text-primary leading-[1.2] mb-6">
              La mejor herramienta de analítica web: los 12 requisitos que de
              verdad deciden
            </h1>
            <PostByline
              {...dates}
              readTime="12 min de lectura"
              authorName="Rafa Jiménez"
              locale="es"
            />
          </header>

          <div className="mb-10 p-6 bg-warm-white border border-warm-100 rounded-[14px]">
            <h2 className="font-serif text-[1rem] font-medium text-text-primary mb-3">
              Claves
            </h2>
            <ul className="space-y-2 text-[0.9rem] leading-[1.7] text-text-secondary list-none pl-0 [&>li]:relative [&>li]:pl-6 [&>li]:before:content-['—'] [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:text-text-tertiary">
              <li>
                Las decisiones de compra en analítica fallan por los criterios,
                no por el proveedor. «Tiene dashboards» no es un requisito;
                «tiempo real» no lo es mientras no definas la latencia y el
                alcance.
              </li>
              <li>
                El requisito 2 — el dato sin huecos de consentimiento — no es uno de doce. Si falla,
                los otros once son decoración.
              </li>
              <li>
                La mayoría de plataformas falla en la tercera pregunta de un
                analista, nunca en la primera. Las causas son siempre
                preagregación, límites de cardinalidad y muestreo.
              </li>
              <li>
                Un servidor MCP ya es un requisito duro, no un extra. Un chat
                dentro del dashboard del proveedor es otra cosa.
              </li>
              <li>
                Cada requisito lleva una prueba que puedes ejecutar en la demo —
                no una afirmación que tengas que creerte.
              </li>
            </ul>
          </div>

          <div className="space-y-6 text-[1.05rem] leading-[1.8] text-text-body">
            <p>
              Casi todas las decisiones de compra en analítica se toman sobre
              una tabla comparativa que nadie verifica. Alguien monta un Excel,
              doce proveedores reciben su tick verde en «dashboards en tiempo
              real», y dieciocho meses después el equipo sigue exportando a una
              hoja de cálculo porque la plataforma no sabe responder a la
              tercera pregunta seguida.
            </p>

            <p>
              El problema no es que se elija mal el proveedor. Es que los
              criterios están mal formulados. «Tiene dashboards» no es un
              requisito. «Tiempo real» no es un requisito mientras no definas la
              latencia y el alcance. «Cumple RGPD» no es un requisito mientras
              no nombres la base legal.
            </p>

            <p>
              Así que esto no es una lista de herramientas. Es la especificación
              que una plataforma tiene que cumplir antes de merecer que la
              llames la mejor herramienta de analítica web para una empresa que
              invierte dinero real en adquisición. Doce requisitos, cada uno con
              el fallo que previene y una prueba que puedes ejecutar en la demo.
            </p>

            <ReqIndex
              label="Los 12 requisitos"
              items={requisitos.map((r) => ({
                n: r.n,
                id: r.id,
                title: r.title,
              }))}
            />

            <ReqHeading n={1} id="req-1">
              Un píxel ultraligero
            </ReqHeading>

            <div className="space-y-4">
              <Chip tone="risk">El fallo que previene</Chip>
              <p>
                Cada kilobyte de código de medición es un impuesto sobre las
                sesiones que más te interesa medir. Una etiqueta de 146 KB en
                una conexión 3G de un mercado regional no llega tarde: muchas
                veces no llega, porque el visitante ya ha rebotado. Pierdes
                primero el tráfico más lento, más móvil y más marginal, que es
                exactamente donde tu tasa de conversión es más frágil. Y la{" "}
                <Link
                  href="/es/glossary/data-loss-in-analytics"
                  className={linkClass}
                >
                  pérdida de datos
                </Link>{" "}
                es invisible: las sesiones que nunca dispararon no aparecen en
                el informe que te dice que las sesiones bajan.
              </p>
              <p>
                Después está el segundo coste. El código de medición que compite
                con tu propio JavaScript por el hilo principal degrada LCP e
                INP, y Core Web Vitals no es una métrica de vanidad en un
                eCommerce: mueve posiciones y mueve conversión. Estás pagando la
                medición dos veces — una en dato perdido, otra en ingresos
                perdidos.
              </p>
            </div>

            <StatRow
              items={[
                {
                  value: "146 KB",
                  label: "gtag.js de GA4 en red, comprimido",
                  tone: "risk",
                },
                {
                  value: "409 KB",
                  label: "JavaScript que GA4 parsea en el dispositivo",
                  tone: "risk",
                },
                {
                  value: "< 5 KB",
                  label: "El listón, gzip en red",
                  tone: "brand",
                },
                {
                  value: "< 10 KB",
                  label: "El listón, parseado en el dispositivo",
                  tone: "brand",
                },
              ]}
            />

            <div className="space-y-4">
              <Chip tone="req">El requisito</Chip>
              <p>
                Menos de 5 KB gzip en red, menos de 10 KB de JavaScript parseado
                en el dispositivo, asíncrono, no bloqueante y sin depender de un
                tag manager para funcionar. Launch + AppMeasurement de Adobe se
                mueve en el mismo rango que GA4. Lo{" "}
                <Link
                  href="/blog/we-measured-every-analytics-script"
                  className={linkClass}
                >
                  medimos script por script
                </Link>{" "}
                para comprobarlo. Una plataforma que necesita 100× más código
                que la alternativa está tomando una decisión de diseño, no
                cumpliendo una necesidad técnica.
              </p>
            </div>

            <TestBox label="La prueba">
              <p>
                Abre la web del propio proveedor, abre la pestaña de red, filtra
                por su dominio de píxel y lee tú mismo el tamaño transferido.
                Después pasa Lighthouse a una página demo con y sin la etiqueta,
                con throttling Slow 3G. Si el proveedor no sabe decirte de
                memoria cuánto pesa su script en gzip, es que nunca lo ha
                optimizado.
              </p>
            </TestBox>

            <ReqHeading n={2} id="req-2">
              Dato sin huecos de consentimiento
            </ReqHeading>

            <div className="space-y-4">
              <Chip tone="risk">El fallo que previene</Chip>
              <p>
                Este es el requisito que invalida a todos los demás. Una
                plataforma que te da el cuarenta por ciento de la realidad con
                dashboards perfectos es peor que una hoja de cálculo con el cien
                por cien, porque te da la confianza para actuar sobre una
                muestra que no es aleatoria.
              </p>
              <p>
                Se acumulan tres fugas distintas. Consentimiento: en mercados
                europeos,{" "}
                <Link
                  href="/es/blog/consent-banner-impact-on-analytics"
                  className={linkClass}
                >
                  tasas de rechazo de hasta el 60%
                </Link>{" "}
                son normales con un banner conforme, y al visitante que rechaza
                las herramientas dependientes de consentimiento no lo miden en
                absoluto. Bloqueadores y protección antitracking del navegador:
                en torno al 25% en audiencias técnicas, más en algunos sectores.
                Fallo de etiqueta: alrededor del 5% en móvil, y crece en redes
                lentas. Multiplica los supervivientes y estás reportando sobre
                una fracción — mientras tu CFO lo lee como si fuera el total.
                Sumadas en el peor escenario, es la aritmética por la que{" "}
                <Link
                  href="/es/blog/why-ga4-shows-13pct-eu-traffic"
                  className={linkClass}
                >
                  GA4 puede ver solo el 13% del tráfico UE
                </Link>
                . Medida en una tienda Shopify real durante 48 días, la brecha
                fue menor pero igual de decisiva:{" "}
                <Link href="/es/case-studies/incapto" className={linkClass}>
                  GA4 no registró el 29% de las visitas
                </Link>
                .
              </p>
            </div>

            <StatRow
              items={[
                {
                  value: "60%",
                  label: "Rechaza el consentimiento en mercados UE con banner conforme",
                  tone: "risk",
                },
                {
                  value: "25%",
                  label: "Bloqueado por adblockers y protección antitracking",
                  tone: "risk",
                },
                {
                  value: "5%",
                  label: "Fallos de etiqueta en móvil — más en redes lentas",
                  tone: "risk",
                },
                {
                  value: "~40%",
                  label: "Lo que llega de verdad al informe que tu CFO lee como el total",
                  tone: "risk",
                },
              ]}
            />

            <div className="space-y-4">
              <p>
                Lo peligroso no es el volumen perdido, es que la distorsión no
                se reparte igual. Las audiencias sensibles a la privacidad se
                concentran en canales y dispositivos concretos. El orgánico
                queda sistemáticamente infrarreportado. El paid queda
                sistemáticamente favorecido, porque las landings de pago son las
                que llevan los parámetros que sobreviven. Cada reasignación de
                presupuesto hecha sobre ese dato mueve dinero en la dirección
                del sesgo de medición.
              </p>
              <Chip tone="req">El requisito</Chip>
              <p>
                La plataforma no debe perder cargas de página porque el visitante
                no acepte nada, ni porque las listas
                de bloqueo la clasifiquen como tracker. Eso solo es posible si
                no almacena datos personales — porque si los almacenara, el
                consentimiento sería legalmente exigible y volverías al 40%.
                Completitud y privacidad son el mismo requisito enunciado dos
                veces, no un intercambio, y ese es el argumento entero de la{" "}
                <Link
                  href="/es/glossary/cookieless-analytics"
                  className={linkClass}
                >
                  analítica cookieless
                </Link>
                .
              </p>
            </div>

            <TestBox label="La prueba">
              <p>
                Corre el candidato en paralelo con tu setup actual durante 30
                días y compara ambos contra el único sistema que no tiene brecha
                de medición: tu CRM o tu base de pedidos. Cuenta los pedidos. La
                distancia entre plataforma y CRM es la única métrica de
                completitud que importa. En la única medición que hemos publicado
                con su método completo, sobre la tienda Shopify de Incapto,
                Sealmetrics registró el 96% de los pedidos reales y el 97% de la
                facturación. La{" "}
                <Link href="/es/data-loss-calculator" className={linkClass}>
                  calculadora de pérdida de datos
                </Link>{" "}
                te da el tamaño esperado de esa brecha antes de empezar.
              </p>
            </TestBox>

            <ReqHeading n={3} id="req-3">
              Tiempo real en todos los dashboards, no en un informe
            </ReqHeading>

            <div className="space-y-4">
              <Chip tone="risk">El fallo que previene</Chip>
              <p>
                Casi todas las plataformas incluyen algo llamado «Tiempo real».
                Casi ninguna significa lo que necesitas. Lo que sueles recibir
                es una vista en vivo recortada — usuarios activos, páginas top,
                quizá un mapa — mientras todos los informes que usarías de
                verdad para decidir corren sobre datos de entre 4 y 24 horas.
              </p>
              <p>
                Esa distinción cuesta dinero exactamente los días en que más
                importa. Un checkout roto en Black Friday, un parámetro de
                campaña que se pierde en una migración, una landing que devuelve
                404 después de un deploy: la ventana para arreglar cada uno de
                estos se mide en horas, y una plataforma que te enseña el daño
                mañana por la mañana ha convertido una incidencia en una
                pérdida.
              </p>
              <Chip tone="req">El requisito</Chip>
              <p>
                Latencia de ingesta por debajo del minuto y — la parte que
                siempre se salta — la misma frescura en todo el conjunto de
                informes. Cada dimensión, cada filtro, cada funnel, cada
                segmento consultable sobre el dato de hoy, con carga de pico, no
                solo las tres métricas del panel en vivo. El tiempo real que se
                degrada bajo tráfico no es tiempo real: es tiempo real hasta que
                lo necesitas.
              </p>
            </div>

            <TestBox label="La prueba">
              <p>
                En la demo, pide que abran un funnel segmentado filtrado por una
                propiedad personalizada, para hoy, y que lo refresquen mientras
                tú disparas una conversión en la web de prueba. Después pregunta
                qué pasó con esa misma consulta en el Black Friday de su cliente
                más grande. La segunda pregunta es la que separa arquitecturas.
              </p>
            </TestBox>

            <p>
              Un matiz honesto sobre el lenguaje comercial: los dashboards en
              tiempo real son una capacidad de producto, y un SLA contractual es
              otra cosa. Pregunta las dos cosas por separado, y desconfía de
              cualquiera que responda a la pregunta del SLA con una captura de
              pantalla.
            </p>

            <ReqHeading n={4} id="req-4">
              Responde a cualquier pregunta que pueda hacer un analista
            </ReqHeading>

            <div className="space-y-4">
              <Chip tone="risk">El fallo que previene</Chip>
              <p>
                Aquí es donde falla la mayoría de plataformas, y siempre falla
                en la tercera pregunta, nunca en la primera.
              </p>
              <p>
                Primera pregunta: ¿cómo fue la facturación la semana pasada?
                Todas responden. Segunda: pártela por canal. Casi todas
                responden. Tercera: dentro de paid social, para usuarios
                móviles, en las fichas de producto de una categoría concreta,
                comparando quienes vieron la guía de tallas contra quienes no. Y
                ya estás exportando a Excel — lo que significa que tu plataforma
                de analítica es una capa de reporting con botón de exportar, y
                el análisis de verdad ocurre en un sitio que nadie puede
                gobernar, compartir ni reproducir.
              </p>
              <p>
                Las causas técnicas son siempre las mismas: modelos de datos
                preagregados que solo soportan las combinaciones que alguien
                anticipó, límites de cardinalidad que meten tu cola larga en
                «(other)»,{" "}
                <Link href="/es/glossary/data-sampling" className={linkClass}>
                  muestreo
                </Link>{" "}
                por encima de cierto volumen de filas y un esquema fijo que no
                sabe llevar las dimensiones propias de tu negocio.
              </p>
              <Chip tone="req">El requisito</Chip>
              <p>
                Combinaciones arbitrarias de dimensión × métrica sin techo de
                preagregación. Sin colapso de cardinalidad en «(other)». Sin
                muestreo, nunca — la aproximación es aceptable en una
                herramienta de exploración e inaceptable en un sistema que firma
                presupuestos. Propiedades personalizadas como dimensiones de
                primera clase, no como etiquetas añadidas. Funnels definibles a
                posteriori, sobre datos históricos, sin haberlos declarado por
                adelantado. Y acceso a filas a resolución completa, para que el
                analista que necesite salir de la interfaz pueda hacerlo sin
                salir de la plataforma.
              </p>
            </div>

            <TestBox label="La prueba">
              <p>
                Lleva a la demo tu pregunta más difícil — la que hoy resuelves
                con una hoja de cálculo — y pide que la construyan en directo.
                No «¿esto se puede?», sino «hazlo ahora, delante de mí». Después
                pregunta qué ocurre cuando una dimensión tiene 50.000 valores
                distintos.
              </p>
            </TestBox>

            <ReqHeading n={5} id="req-5">
              Un píxel flexible para poder trackear todo
            </ReqHeading>

            <div className="space-y-4">
              <Chip tone="risk">El fallo que previene</Chip>
              <p>
                Los eventos estándar de eCommerce cubren la parte de tu negocio
                que se parece a todos los demás negocios. La medición que de
                verdad te diferencia siempre es a medida: el paso del
                configurador, la comprobación de disponibilidad, la calculadora
                de financiación, la solicitud de presupuesto B2B, la llamada que
                se cierra offline tres días después. Si la plataforma solo sabe
                medir lo que anticipó, tu techo de instrumentación lo fija el
                roadmap del proveedor.
              </p>
              <Chip tone="req">El requisito</Chip>
              <p>
                Eventos personalizados arbitrarios con propiedades arbitrarias.
                Microconversiones como concepto nativo, no como un apaño sobre
                pageviews. Valor en divisa asociable a cualquier evento. Ingesta
                cliente y{" "}
                <Link href="/es/glossary/server-side-tracking" className={linkClass}>
                  servidor
                </Link>{" "}
                mediante un endpoint HTTP documentado, para que los eventos que
                ocurren fuera del navegador — un webhook, un cambio de estado en
                el CRM, un resultado de call tracking — caigan en el mismo
                dataset que las páginas vistas. Soporte nativo de aplicaciones
                de una sola página y páginas vistas virtuales. Medición
                multidominio y de subdominios sin romper la atribución. Y reglas
                de clasificación de canales editables por ti, porque la
                definición de «afiliación» o «partner» cambia en cada negocio y
                una agrupación fija garantiza que acabarás discutiendo con tus
                propios informes.
              </p>
            </div>

            <TestBox label="La prueba">
              <p>
                Pide que instrumenten en la demo un evento específico de tu
                negocio, y cronométralo. El listón está en menos de diez minutos
                usando la documentación.
              </p>
            </TestBox>

            <ReqHeading n={6} id="req-6">
              Una API realmente robusta
            </ReqHeading>

            <div className="space-y-4">
              <Chip tone="risk">El fallo que previene</Chip>
              <p>
                Una plataforma de analítica cuyos datos solo se leen desde su
                propia interfaz es un silo, y los silos acaban siempre igual:
                alguien rehace a mano los números importantes en una
                diapositiva, divergen del origen, y el QBR se convierte en una
                discusión sobre quién tiene la cifra buena.
              </p>
              <Chip tone="req">El requisito</Chip>
              <p>
                Todo informe disponible en la interfaz tiene que ser accesible
                por API — sin pantallas privilegiadas. Autenticación documentada
                con claves de alcance limitado y revocables. Límites de rate
                publicados, para poder diseñar contra ellos en lugar de
                descubrirlos en producción. Paginación que funcione con
                volúmenes reales. Endpoints que devuelvan filas a resolución
                completa, no solo agregados. Webhooks para operativa orientada a
                eventos, de modo que una anomalía de conversión dispare algo en
                lugar de esperar a que alguien la vea. Y exportación nativa a un
                data warehouse — BigQuery, Snowflake o equivalente — sin que
                tengas que escribir y mantener un ETL.
              </p>
              <p>
                Un innegociable: la API y la interfaz tienen que devolver los
                mismos números. Parece obvio. Compruébalo igualmente, porque las
                diferencias de preagregación entre la capa de reporting y la de
                exportación son una sorpresa habitual y carísima.
              </p>
            </div>

            <TestBox label="La prueba">
              <p>
                Pide la documentación de la API antes de la demo, no después.
                Documentación pública y versionada que puedas leer sin llamada
                comercial es en sí misma la señal — un proveedor que tiene la
                documentación de su API detrás de un formulario tiene una API
                que no está lista para ser leída.
              </p>
            </TestBox>

            <ReqHeading n={7} id="req-7">
              MCP: la plataforma tiene que ser legible por agentes
            </ReqHeading>

            <div className="space-y-4">
              <Chip tone="risk">El fallo que previene</Chip>
              <p>
                La forma de hacer análisis cambió en los últimos dos años y la
                mayoría de plataformas no se ha enterado. Analistas y marketers
                trabajan ya con asistentes de IA en el circuito. Si tu
                plataforma no se puede consultar desde uno, cada pregunta se
                convierte en un viaje manual: abrir la interfaz, montar el
                informe, exportar el CSV, pegarlo en un chat, preguntar, y
                recibir una respuesta sobre una foto congelada que no se puede
                profundizar. Ese flujo no solo es lento. Es inauditable — el
                modelo responde sobre el fragmento que le pegaron, y nadie puede
                reproducirlo.
              </p>
              <Chip tone="req">El requisito</Chip>
              <p>
                Un servidor Model Context Protocol, alojado por el proveedor,
                que exponga los datos de la plataforma como herramientas que un
                agente puede invocar directamente. Esto es algo concreto, y
                conviene precisarlo, porque «AI-ready» es hoy la expresión más
                abusada del marketing de analítica. Un servidor MCP significa:
                tu asistente — Claude, ChatGPT, Cursor, un copiloto interno — se
                conecta una vez y a partir de ahí consulta él mismo canales,
                campañas, funnels, conversiones y propiedades personalizadas, en
                vivo, y repregunta sin que nadie vuelva a exportar nada. Esa es
                la diferencia entre un asistente y la{" "}
                <Link
                  href="/es/blog/self-service-analytics-lens-ai"
                  className={linkClass}
                >
                  analítica self-service de verdad
                </Link>
                .
              </p>
            </div>

            <div className="my-8 grid gap-3 sm:grid-cols-2">
              <div className="rounded-[12px] border border-warm-100 bg-white p-5">
                <Chip tone="req">Qué es MCP</Chip>
                <p className="mt-3 text-[0.92rem] leading-[1.7] text-text-secondary">
                  Un servidor al que conectas tu propio asistente, una vez. A
                  partir de ahí consulta él mismo canales, campañas, funnels y
                  conversiones, en vivo, y repregunta sin que nadie exporte
                  nada.
                </p>
              </div>
              <div className="rounded-[12px] border border-warm-100 bg-white p-5">
                <Chip tone="risk">Qué no es MCP</Chip>
                <p className="mt-3 text-[0.92rem] leading-[1.7] text-text-secondary">
                  Un chat dentro del dashboard del proveedor. Eso es una función
                  de su producto. MCP es acceso a tus datos desde donde ya
                  trabajas.
                </p>
              </div>
            </div>

            <p>
              Requisitos dentro del requisito: alcances de solo lectura por
              defecto, granularidad de clave por sitio, tokens revocables y
              traza de auditoría de lo consultado. Un servidor MCP sin
              credenciales acotadas es una vía de exfiltración de datos con buen
              marketing.
            </p>

            <TestBox label="La prueba">
              <p>
                Pide la URL del endpoint MCP y conéctala a tu propio asistente
                durante la prueba. Si existe, se tarda dos minutos.
              </p>
            </TestBox>

            <ReqHeading n={8} id="req-8">
              IA auditable, y que no exporte tus datos
            </ReqHeading>

            <div className="space-y-4">
              <Chip tone="risk">El fallo que previene</Chip>
              <p>
                Dos fallos opuestos. El primero es la caja negra: la plataforma
                te dice que un canal rinde mal, no puede enseñarte la consulta
                que hay debajo, y se te pide mover presupuesto bajo la palabra
                de un modelo. El segundo es la fuga: para darte ese insight, tus
                datos comerciales viajaron a una API de terceros en otra
                jurisdicción — una transferencia que quizá no está declarada en
                tu registro de actividades de tratamiento.
              </p>
              <Chip tone="req">El requisito</Chip>
              <p>
                <Link href="/es/ai-analytics" className={linkClass}>
                  IA que haga el trabajo para el que los analistas no tienen
                  tiempo
                </Link>{" "}
                — detección continua de anomalías en todas las dimensiones,
                previsión, identificación de los segmentos que se han movido — y
                que muestre siempre la consulta subyacente, para que cualquier
                afirmación sea verificable por una persona en la interfaz. Más
                una elección de despliegue: o bien traer tu propia clave, de
                modo que la inferencia corra contra un proveedor con el que ya
                tienes DPA, o bien un modelo alojado por el fabricante dentro de
                tu jurisdicción. Para una empresa europea, «inferencia alojada
                en UE» significa que el modelo se ejecuta en la UE, y es una
                pregunta distinta de dónde se almacenan tus datos analíticos.
                Pregunta las dos.
              </p>
            </div>

            <TestBox label="La prueba">
              <p>
                Pregunta dónde se ejecuta físicamente la inferencia, si tus
                datos pueden usarse para entrenar el modelo, y pide poder hacer
                clic desde cualquier insight generado por IA hasta el informe
                que lo produjo. Si ese clic no existe, el insight no es
                evidencia.
              </p>
            </TestBox>

            <ReqHeading n={9} id="req-9">
              Un modelo de atribución sobre el que sea honesta
            </ReqHeading>

            <div className="space-y-4">
              <Chip tone="risk">El fallo que previene</Chip>
              <p>
                La atribución es donde los fabricantes de analítica son menos
                honestos, y donde los compradores menos aprietan. Las
                plataformas que modelan, estiman o rellenan huecos en los datos
                de conversión producen cifras que parecen completas y son en
                parte sintéticas. Cuando esas cifras no cuadran con tu CRM — y
                no van a cuadrar — no puedes distinguir qué parte fue observada
                y qué parte inferida, así que no puedes depurar la discrepancia
                en absoluto.
              </p>
              <Chip tone="req">El requisito</Chip>
              <p>
                El{" "}
                <Link href="/es/glossary/attribution-model" className={linkClass}>
                  modelo de atribución
                </Link>{" "}
                tiene que estar enunciado con claridad, aplicarse de forma
                consistente y estar documentado. Si es{" "}
                <Link
                  href="/glossary/last-click-attribution"
                  className={linkClass}
                >
                  last-click
                </Link>
                , que diga last-click. Si hay conversiones modeladas, la
                plataforma debe etiquetar cuáles y revelar el método. Lo que
                ninguna plataforma debería hacer es mezclar en silencio dato
                observado y dato estimado en la misma cifra.
              </p>
            </div>

            <div className="my-8 rounded-[14px] border-l-2 border-quote bg-warm-white p-6">
              <p className="text-[1.02rem] leading-[1.75] text-text-body">
                Un modelo declarado, simple y completo gana a un modelo
                sofisticado aplicado sobre dato parcial — siempre. Last-click
                sobre conversiones sin huecos de consentimiento es un instrumento defendible.
                Un{" "}
                <Link
                  href="/es/glossary/multi-touch-attribution"
                  className={linkClass}
                >
                  modelo multi-touch
                </Link>{" "}
                sobre el 40% de sesiones que aceptaron cookies es un relato
                sobre una muestra, disfrazado de medición.
              </p>
            </div>

            <TestBox label="La prueba">
              <p>
                Pregunta: «¿qué números de este dashboard son observados y
                cuáles modelados?». Un proveedor que no responda al instante, o
                que lo describa como propietario, te está diciendo que la
                respuesta es incómoda.
              </p>
            </TestBox>

            <ReqHeading n={10} id="req-10">
              Filtrado de bots y tráfico inválido que puedas ver
            </ReqHeading>

            <div className="space-y-4">
              <Chip tone="risk">El fallo que previene</Chip>
              <p>
                El tráfico de bots ha crecido con fuerza con los rastreadores de
                IA, y no se reparte de forma uniforme: se concentra en páginas y
                fuentes concretas, así que no infla tus totales de forma
                inofensiva, sino que corrompe filas específicas. Sin filtrar,
                infla las sesiones de un canal, hunde su tasa de conversión, y
                acabas optimizando contra ruido.
              </p>
              <Chip tone="req">El requisito</Chip>
              <p>
                Exclusión automática de las métricas reportadas y — esta es la
                parte que suele faltar — visibilidad de qué se excluyó y por
                qué. Un filtrado que no puedes inspeccionar es indistinguible de
                un filtrado que no está ocurriendo.
              </p>
            </div>

            <TestBox label="La prueba">
              <p>Pide ver el informe de tráfico bot. No el ajuste. El informe.</p>
            </TestBox>

            <ReqHeading n={11} id="req-11">
              Cumplimiento por arquitectura, no por configuración
            </ReqHeading>

            <div className="space-y-4">
              <Chip tone="risk">El fallo que previene</Chip>
              <p>
                El riesgo de cumplimiento en analítica rara vez es una multa. Es
                el retraso de seis semanas mientras legal revisa una evaluación
                de impacto de transferencias, el banner de consentimiento que te
                cuesta el 60% de tus datos para satisfacer un requisito que creó
                la propia arquitectura, y la migración que tendrás que repetir
                en dos años cuando el terreno legal se mueva.
              </p>
              <Chip tone="req">El requisito</Chip>
              <p>
                Sin{" "}
                <Link
                  href="/glossary/personal-data-in-analytics"
                  className={linkClass}
                >
                  datos personales
                </Link>{" "}
                recogidos, sin cookies, sin fingerprinting de dispositivo, sin
                almacenamiento en cliente. Esto no es una versión más estricta
                del cumplimiento: es un mecanismo distinto. Una plataforma que
                no trata datos personales queda en buena medida fuera del ámbito
                material de la norma, en lugar de cumplir dentro de ella, y esa
                diferencia es la que elimina el banner y con él la pérdida del
                60%.
              </p>
              <p>
                Después, la capa operativa: datos alojados en tu jurisdicción
                con la ubicación concreta nombrada, DPA incluido en el contrato
                estándar en lugar de negociado, sin transferencias que exijan
                medidas suplementarias, y{" "}
                <Link href="/es/security" className={linkClass}>
                  documentación que tu DPO pueda leer
                </Link>{" "}
                sin una llamada.
              </p>
              <p>
                Y sé igual de escéptico en la otra dirección: verifica las
                certificaciones. ISO 27001 y SOC 2 son estados auditados, con
                certificado y con fecha. «Alineado con» no es «certificado».
                Pide el certificado.
              </p>
            </div>

            <TestBox label="La prueba">
              <p>
                Manda la documentación del proveedor a tu DPO antes de la
                evaluación técnica. Si no sobrevive a esa revisión, la
                comparativa de funcionalidades es un ejercicio académico.
              </p>
            </TestBox>

            <ReqHeading n={12} id="req-12">
              Tus datos siguen siendo tuyos, y el precio es previsible
            </ReqHeading>

            <div className="space-y-4">
              <Chip tone="risk">El fallo que previene</Chip>
              <p>
                Dos fallos lentos. Bloqueo: descubres en la renovación que tres
                años de histórico no pueden salir de la plataforma en formato
                usable, y la negociación termina antes de empezar. Y sorpresa en
                factura: el precio por consumo de eventos hace que tu mejor mes
                genere tu peor factura, y los equipos reaccionan racionalmente
                instrumentando menos — lo que limita en silencio el valor de
                todo el sistema.
              </p>
              <Chip tone="req">El requisito</Chip>
              <p>
                Exportación histórica completa en formato abierto, bajo demanda,
                sin abrir un ticket. Retención declarada, con política declarada
                sobre qué ocurre al terminar el contrato. Precio ligado a una
                métrica que controlas y puedes prever. Y un coste de puesta en
                marcha medido en minutos, porque una plataforma que exige una
                implantación de seis semanas ya ha encarecido la salida — y eso
                es un modelo de negocio, no una arquitectura.
              </p>
            </div>

            <TestBox label="La prueba">
              <p>
                Pregunta qué pasa con tus datos 30 días después de cancelar. La
                rapidez y la concreción de esa respuesta te dice cómo piensa el
                proveedor sobre la propiedad del dato.
              </p>
            </TestBox>
          </div>

          <ScoreBands
            eyebrow="Puntúa cada requisito 0, 1 o 2 — 24 posibles"
            title="Qué te dice de verdad el total"
            bands={[
              {
                range: "20–24",
                verdict: "Verdaderamente enterprise",
                detail:
                  "Poco frecuente. Revisa igualmente las dos puntuaciones más bajas antes de firmar.",
                tone: "req",
              },
              {
                range: "14–19",
                verdict: "Viable, con carencias conocidas",
                detail:
                  "Escribe las carencias en la decisión para que nadie se sorprenda en el mes cuatro.",
                tone: "test",
              },
              {
                range: "Menos de 14",
                verdict: "Capa de reporting, no plataforma",
                detail:
                  "Vale para un negocio de 50.000 € al año. No para uno que gasta 50.000 € al mes en adquisición.",
                tone: "risk",
              },
            ]}
          />

          <div className="max-w-[936px] mx-auto space-y-6 text-[1.05rem] leading-[1.8] text-text-body">
            <p>
              Dos cosas que conviene decir claras. El requisito 2 no es uno de
              doce — si falla, el resto es decoración: dashboards perfectos en
              tiempo real sobre el 40% de la realidad son una ruta más rápida a
              una decisión equivocada. Puntúalo primero, y si una plataforma no
              lo cumple, para ahí.
            </p>

            <p>
              Y la pregunta del precio está planteada al revés. La comparación
              no es 30.000 € al año contra 0 € de GA4. Es 30.000 € al año contra
              el coste de una sola reasignación de presupuesto equivocada tomada
              sobre datos incompletos — que para una empresa que invierte
              200.000 € al mes en adquisición es un error de redondeo frente a
              un solo trimestre de inversión mal dirigida. La herramienta no es
              el gasto. Las decisiones lo son.
            </p>

            <CommercialModule
              locale="es"
              hook="¿Cuántos de estos criterios supera tu herramienta actual? Trae la lista a una demo y puntúa a Sealmetrics en directo sobre tu propio caso."
            />

            <h2 className={h2Class}>
              Cómo puntúa Sealmetrics contra esta lista
            </h2>

            <div className="rounded-[14px] border-l-2 border-amber bg-amber-soft/30 p-5">
              <Chip tone="test">Aviso</Chip>
              <p className="mt-3 text-[0.95rem] leading-[1.75] text-text-body">
                Nosotros construimos una de estas plataformas, así que la
                checklist de arriba es opinionada. Codifica una tesis
                arquitectónica — que el dato observado completo gana al dato
                modelado, y que privacidad y completitud son el mismo requisito
                — que{" "}
                <Link href="/es/product" className={linkClass}>
                  Sealmetrics
                </Link>{" "}
                comparte. Un comprador cuya prioridad sea product analytics a
                nivel de usuario, session replay o modelado multi-touch debería
                reponderarla, y nosotros puntuaríamos peor. Aquí está el
                marcador igualmente, con el punto que perdemos.
              </p>
            </div>

            <ScrollableTable hint="Desliza para ver la puntuación">
              <table className="w-full min-w-[760px] text-[0.82rem]">
                <thead>
                  <tr className="border-b border-warm-200">
                    <th className="text-left py-3 pr-4 text-text-tertiary font-medium">
                      Requisito
                    </th>
                    <th className="text-left py-3 pr-4 text-text-tertiary font-medium">
                      El listón
                    </th>
                    <th className="text-left py-3 pr-4 text-text-tertiary font-medium">
                      Sealmetrics
                    </th>
                    <th className="text-left py-3 text-text-tertiary font-medium">
                      Puntos
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {requisitos.map((r) => (
                    <tr
                      key={r.n}
                      className="border-b border-warm-100 last:border-0"
                    >
                      <td className="py-4 pr-4 align-top text-text-primary font-medium">
                        <span className="font-mono text-[0.75rem] text-brand mr-1.5">
                          {String(r.n).padStart(2, "0")}
                        </span>
                        {r.title}
                      </td>
                      <td className="py-4 pr-4 align-top text-text-secondary">
                        {r.bar}
                      </td>
                      <td className="py-4 pr-4 align-top text-text-secondary">
                        {r.seal}
                      </td>
                      <td className="py-4 align-top">
                        <ScorePill score={r.score} />
                      </td>
                    </tr>
                  ))}
                  <tr className="border-t-2 border-warm-200">
                    <td
                      className="py-4 pr-4 text-text-primary font-medium"
                      colSpan={3}
                    >
                      Total
                    </td>
                    <td className="py-4 font-mono text-[0.95rem] text-text-primary font-semibold whitespace-nowrap">
                      23 / 24
                    </td>
                  </tr>
                </tbody>
              </table>
            </ScrollableTable>

            <div className="my-8 grid gap-3 sm:grid-cols-2">
              <div className="rounded-[14px] border border-warm-100 bg-white p-6">
                <Chip tone="test">Dónde se pierde el punto</Chip>
                <p className="mt-3 text-[0.95rem] leading-[1.7] text-text-body">
                  Requisito 11 — Sealmetrics no está certificado en ISO 27001 ni
                  SOC 2. Todo lo demás de esa fila se cumple: sin datos
                  personales, alojado en la UE en Dublín, DPA en el contrato
                  estándar, sin medidas suplementarias de transferencia. Pero un
                  certificado es un estado auditado con fecha, y no lo tenemos.
                  En procesos de compra que lo exigen es un bloqueo, y conviene
                  decirlo antes de la demo y no descubrirlo en el cuestionario
                  de seguridad.
                </p>
              </div>
              <div className="rounded-[14px] border border-warm-100 bg-white p-6">
                <Chip tone="risk">Lo que deliberadamente no hace</Chip>
                <p className="mt-3 text-[0.95rem] leading-[1.7] text-text-body">
                  Mide eventos en agregado — cuenta a nivel de canal, campaña,
                  landing, dispositivo y país, sin vincularlos a un individuo.
                  Ese es el mecanismo que hace posible el requisito 2, y también
                  es una limitación real.
                </p>
                <ul className="mt-4 flex list-none flex-wrap gap-2 p-0">
                  {[
                    "Sin análisis por usuario",
                    "Sin cohortes ni retención",
                    "Sin session replay",
                    "Sin mapas de calor",
                    "Sin multi-touch",
                  ].map((t) => (
                    <li
                      key={t}
                      className="rounded-full bg-pink-soft px-2.5 py-1 font-mono text-[0.68rem] uppercase tracking-[0.04em] text-[#8F332D]"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <p>
              Si eso es central en tu caso de uso, la respuesta honesta es que
              necesitas una plataforma de product analytics al lado, no en su
              lugar.{" "}
              <Link href="/es/how-it-works" className={linkClass}>
                Cómo funciona la medición
              </Link>{" "}
              detalla dónde está la frontera.
            </p>

            <h2 className={h2Class}>Preguntas frecuentes</h2>

            <div className="space-y-5">
              {faqs.map((faq) => (
                <div
                  key={faq.question}
                  className="rounded-[12px] border border-warm-100 bg-warm-white p-5"
                >
                  <p className={`${strongClass} text-[1rem]`}>{faq.question}</p>
                  <p className="mt-2 text-[0.95rem] leading-[1.75] text-text-secondary">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <CommercialModule
            locale="es"
            hook="¿Tu herramienta actual falla en captura, en cumplimiento o en profundidad de eCommerce? Ve en una demo cómo puntúa Sealmetrics sobre tu propio dominio: sin pérdida por consentimiento, sin banner y con last-click sobre lo observado."
          />

          <ComparisonLinks locale="es" />

          {/* Relacionados */}
          <div className="mt-16 pt-10 border-t border-warm-100">
            <h3 className="font-serif text-[1.1rem] font-medium text-text-primary mb-4">
              Artículos relacionados
            </h3>
            <div className="space-y-3">
              <Link
                href="/es/blog/ga4-alternatives-enterprise"
                className="block text-[0.9rem] text-text-secondary no-underline hover:text-text-primary transition-colors"
              >
                7 alternativas a GA4 para equipos de eCommerce en 2026
              </Link>
              <Link
                href="/es/blog/ga4-data-sampling-problem"
                className="block text-[0.9rem] text-text-secondary no-underline hover:text-text-primary transition-colors"
              >
                El problema del muestreo de datos en GA4
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
