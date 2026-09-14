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

/** Spanish edition of /blog/last-click-vs-modelled-attribution; sources listed there. */

const SLUG = "last-click-vs-modelled-attribution";
const URL = `/es/blog/${SLUG}`;
const HEADLINE = "Último clic frente a atribución modelada: en qué acierta cada una";
const DESCRIPTION =
  "La atribución basada en datos responde mejor pregunta en los recorridos que ve; el último clic, una más estrecha en cada sesión. Cuándo usar cada una.";
const SOCIAL =
  "Atribución basada en datos de GA4, modelos de las plataformas, marketing mix y tests de incrementalidad frente al último clic en cada sesión. Dónde falla cada uno y cómo combinarlos.";

export const metadata: Metadata = {
  title: "Último clic frente a atribución modelada",
  description: DESCRIPTION,
  openGraph: {
    title: "Último clic frente a atribución modelada: en qué acierta cada una",
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
    title: "Último clic frente a atribución modelada: en qué acierta cada una",
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
    question: "¿Qué diferencia hay entre la atribución a último clic y la basada en datos?",
    answer:
      "El último clic da todo el mérito de una conversión a una sola interacción, el último clic antes de ella. La atribución basada en datos usa aprendizaje automático sobre recorridos que convierten y que no convierten para estimar cuánto aportó cada interacción de clic, y reparte el mérito en consecuencia. La primera es una regla que se puede auditar; la segunda, un modelo en el que hay que confiar.",
  },
  {
    question: "¿Es mejor la atribución basada en datos que el último clic?",
    answer:
      "Responde a una pregunta mejor —cuánto aportó cada punto de contacto—, pero solo en los recorridos que puede observar, que necesitan un identificador persistente y, en Europa, consentimiento de cookies. El último clic responde a una pregunta más estrecha y puede funcionar en cada sesión. La basada en datos es mejor para pujar dentro de una plataforma; el último clic sobre datos completos suele ser más fiable para repartir presupuesto entre canales.",
  },
  {
    question: "¿Qué modelos de atribución sigue ofreciendo GA4?",
    answer:
      "Tres: basado en datos, último clic en canales de pago y orgánicos, y último clic en canales de pago de Google. Primer clic, lineal, deterioro temporal y basado en la posición se retiraron en noviembre de 2023. El último clic de GA4 ignora el tráfico directo, y cambiar el modelo de los informes se aplica tanto a los datos históricos como a los futuros.",
  },
  {
    question: "¿Por qué el último clic infravalora las campañas de parte alta del embudo?",
    answer:
      "Porque el vídeo, el display y la prospección en redes suelen actuar pronto, al verse o pulsarse días antes de la compra, y el último clic solo acredita la interacción que cierra la conversión. Su aportación es real pero invisible para la regla. Mídela con un test de incrementalidad o un marketing mix model en lugar de cambiar a un modelo que necesita seguimiento individual.",
  },
  {
    question: "¿La atribución multi-touch funciona sin cookies?",
    answer:
      "La multi-touch a nivel de usuario no: repartir el mérito entre las visitas de una persona exige reconocerla entre sesiones. Dos formas de medición modelada sí funcionan sin eso. Los marketing mix models usan inversión y resultados agregados a lo largo del tiempo, y los tests de incrementalidad comparan zonas o audiencias con y sin una campaña.",
  },
  {
    question: "¿Qué modelo de atribución usa Sealmetrics?",
    answer:
      "Último clic dentro de la sesión. Cada conversión se acredita al origen de la sesión en la que ocurre, la entrada más reciente, y una sesión se cierra tras unas dos horas de inactividad. No hay ventana de lookback entre sesiones ni modelo multi-touch, porque ambos exigirían un identificador persistente que Sealmetrics no crea. Las sesiones directas no se saltan: una conversión en una sesión directa se acredita a directo.",
  },
];

const link =
  "text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors";
const dashList =
  "space-y-2 list-none pl-0 [&>li]:relative [&>li]:pl-6 [&>li]:before:content-['—'] [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:text-text-tertiary";
const h2 = "font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4";
const th = "text-left font-mono text-[11px] uppercase tracking-[0.08em] text-text-tertiary font-semibold py-2 pr-4 border-b border-warm-200 align-bottom";
const td = "py-2 pr-4 border-b border-warm-100 align-top";

export default function LastClickVsModelledAttributionPageEs() {
  const dates = postDates(SLUG, "es");

  return (
    <>
      <Breadcrumbs items={[{ label: "Blog", href: "/es/blog" }, { label: "Último clic frente a atribución modelada" }]} locale="es" />
      <JsonLd
        data={articleSchema({
          headline: HEADLINE,
          description: DESCRIPTION,
          ...dates,
          url: URL,
          category: "Atribución",
          author: { name: "Rafa Jiménez", url: "/es/authors/rafa-jimenez", jobTitle: "Founder, Sealmetrics" },
        })}
      />
      <JsonLd data={breadcrumbSchema([{ name: "Blog", url: "/es/blog" }, { name: "Último clic frente a atribución modelada", url: URL }])} />
      <JsonLd data={faqPageSchema(FAQ, URL)} />
      <JsonLd data={speakableWebPageSchema({ url: URL, name: HEADLINE, selectors: [".key-takeaways", ".tldr"] })} />

      <article className="pt-12 pb-28 bg-white">
        <div className="max-w-[936px] mx-auto px-5 sm:px-8">
          <header className="mb-12">
            <span className="inline-block text-[0.75rem] font-medium tracking-[0.08em] uppercase text-text-tertiary mb-4">
              Atribución
            </span>
            <h1 className="font-serif text-[2.5rem] font-medium text-text-primary leading-[1.2] mb-6">
              {HEADLINE}
            </h1>
            <PostByline {...dates} readTime="10 min de lectura" authorName="Rafa Jiménez" authorUrl="/es/authors/rafa-jimenez" locale="es" />
          </header>

          <p className="tldr mb-12 text-[1.15rem] leading-[1.7] text-text-secondary font-serif italic">
            El último clic da una conversión al clic final antes de ella. La atribución
            modelada estima cuánto aportó cada punto de contacto. El modelo responde a la
            mejor pregunta, pero un modelo a nivel de usuario solo ve los recorridos que
            puede seguir, que en Europa son los de visitantes que aceptaron cookies. Usa
            los modelos de las plataformas para pujar, el último clic en cada sesión para
            repartir presupuesto, y experimentos o marketing mix models para valorar la
            parte alta del embudo.
          </p>

          <div className="key-takeaways mb-12 p-6 bg-warm-white border border-warm-100 rounded-[4px]">
            <h2 className="font-serif text-[1rem] font-medium text-text-primary mb-3">Conclusiones clave</h2>
            <ul className={`text-[0.9rem] leading-[1.7] text-text-secondary ${dashList}`}>
              <li>GA4 ofrece hoy tres modelos: basado en datos, último clic en canales de pago y orgánicos, y último clic en canales de pago de Google. Primer clic, lineal, deterioro temporal y basado en la posición desaparecieron en noviembre de 2023.</li>
              <li>La atribución basada en datos hace algo que el último clic no puede: acredita las asistencias comparando recorridos que convierten y que no. Es una ventaja real, no marketing.</li>
              <li>Su debilidad está en lo que la alimenta. Un modelo a nivel de usuario aprende de los recorridos que puede seguir, y seguir a una persona exige un identificador persistente y, en Europa, consentimiento.</li>
              <li>El último clic es estrecho pero auditable, igual para todos los canales y posible en cada sesión, así que sus totales se pueden conciliar con los pedidos reales.</li>
              <li>La parte alta del embudo se valora mejor con tests de incrementalidad y marketing mix models, que trabajan con datos agregados, que cambiando de modelo de atribución.</li>
            </ul>
          </div>

          <div className="space-y-6 text-[1.05rem] leading-[1.8] text-text-body">
            <p>
              El debate sobre atribución suele llegar en forma de veredicto: el último clic
              está obsoleto y la atribución basada en datos es la respuesta moderna. Es una
              crítica justa al último clic y una descripción incompleta de la atribución
              basada en datos. Las dos son herramientas con un trabajo concreto, y el error
              es usar cualquiera de ellas para una decisión para la que no está hecha.
            </p>
            <p>
              Tenemos un interés que declarar. Sealmetrics usa atribución a último clic y
              nada más, a propósito. Precisamente por eso este artículo empieza por lo que
              la atribución modelada hace mejor, y solo después pasa a dónde falla. Cómo se
              atribuyen los ingresos en Sealmetrics se resume en{" "}
              <Link href="/es/glossary/revenue-attribution" className={link}>atribución de ingresos</Link>.
            </p>

            <h2 className={h2}>Las familias de atribución que se usan hoy</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-[0.95rem] border-collapse min-w-[640px]">
                <thead>
                  <tr>
                    <th className={th}>Enfoque</th>
                    <th className={th}>Cómo reparte el mérito</th>
                    <th className={th}>Qué necesita</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className={`${td} font-semibold`}>Último clic (GA4)</td><td className={td}>Todo el mérito al último clic de pago u orgánico; el directo se ignora si hay un origen anterior</td><td className={td}>Un identificador de usuario para mirar más allá de las visitas directas</td></tr>
                  <tr><td className={`${td} font-semibold`}>Último clic por sesión (Sealmetrics)</td><td className={td}>Todo el mérito al origen de la sesión en la que ocurre la conversión, directo incluido</td><td className={td}>Nada más que las UTM o el referrer de la página de llegada</td></tr>
                  <tr><td className={`${td} font-semibold`}>Basada en datos (GA4, Google Ads)</td><td className={td}>Aprendizaje automático sobre recorridos que convierten y que no estima la aportación de cada interacción de clic</td><td className={td}>Recorridos de usuarios identificados a lo largo del tiempo</td></tr>
                  <tr><td className={`${td} font-semibold`}>La que reportan las plataformas (Meta, Google Ads)</td><td className={td}>Cada plataforma acredita sus propios anuncios con su propia configuración, visualizaciones incluidas en algunas</td><td className={td}>El grafo de identidad y los píxeles de la plataforma</td></tr>
                  <tr><td className={`${td} font-semibold`}>Marketing mix model</td><td className={td}>Modelo estadístico de los resultados frente a la inversión por canal a lo largo del tiempo</td><td className={td}>Un histórico largo de inversión y resultados agregados; sin datos de usuario</td></tr>
                  <tr><td className={`${td} font-semibold`}>Test de incrementalidad</td><td className={td}>Compara zonas o audiencias con y sin una campaña</td><td className={td}>Un experimento controlado; sin datos de usuario</td></tr>
                </tbody>
              </table>
            </div>

            <h2 className={h2}>En qué acierta la atribución modelada</h2>
            <ul className={dashList}>
              <li><strong>Acredita las asistencias.</strong> Google describe la atribución basada en datos como una comparación entre recorridos que convierten y que no, y entre lo que ocurrió y lo que podría haber ocurrido. Un canal que suele aparecer antes de las conversiones, sin cerrarlas, recibe mérito.</li>
              <li><strong>Usa más señal.</strong> El momento, el dispositivo, el número de interacciones, el orden de exposición y el formato del anuncio entran en el modelo, cuando el último clic usa un solo dato.</li>
              <li><strong>Es con lo que pujan las plataformas.</strong> Google Ads optimiza hacia las conversiones que acredita su modelo. Sustituir esa cifra dentro de la plataforma rara vez es buena idea.</li>
              <li><strong>Los modelos agregados llegan donde el seguimiento no.</strong> Un marketing mix model incluye medios offline y no necesita datos de usuario. Google publicó el suyo, Meridian, en código abierto y disponible para todos en 2025.</li>
            </ul>

            <h2 className={h2}>En qué acierta el último clic</h2>
            <ul className={dashList}>
              <li><strong>Es auditable.</strong> Cualquiera puede comprobar por qué una conversión se acreditó donde se acreditó, y obtener la misma respuesta mañana.</li>
              <li><strong>Es la misma regla para todos los canales.</strong> Un modelo de plataforma acredita sus propios anuncios; una única regla aplicada a todo el tráfico no toma partido entre Google, Meta y el email.</li>
              <li><strong>Es estable.</strong> GA4 advierte de que las conversiones pueden reatribuirse hasta siete días después de producirse, y cambiar el modelo de los informes reescribe el histórico. Una cifra basada en reglas no se mueve a posteriori.</li>
              <li><strong>Puede funcionar en cada sesión.</strong> El último clic por sesión no necesita identificador, así que no depende del consentimiento y sus totales se pueden conciliar con los pedidos que realmente entraron.</li>
            </ul>

            <h2 className={h2}>Dónde falla cada una</h2>
            <p>
              <strong>El último clic infravalora la parte alta del embudo.</strong> El vídeo,
              el display y la prospección en redes suelen actuar días antes de la compra. Un
              comprador que pulsa un anuncio de Meta el lunes y vuelve el viernes escribiendo
              tu dirección se acredita a directo. Nada en la regla ve el lunes.
            </p>
            <p>
              <strong>Los modelos a nivel de usuario aprenden de una muestra filtrada.</strong>{" "}
              Para repartir el mérito entre los puntos de contacto de una persona, el modelo
              tiene que reconocerla entre visitas, y eso exige una cookie o un inicio de
              sesión. En Europa, los recorridos que puede seguir son los de visitantes que
              aceptaron cookies, y la pérdida no es igual en todos los canales: en la{" "}
              <Link href="/es/case-studies/incapto" className={link}>tienda Shopify de Incapto</Link>,
              Sealmetrics registró un 11% más de tráfico directo que GA4, pero un 62% más
              desde búsqueda orgánica y un 133% más desde redes sociales orgánicas. Un modelo
              entrenado con esa muestra aprende el comportamiento de los canales que mejor
              sobreviven al consentimiento.
            </p>
            <p>
              <strong>Los modelos de las plataformas no son neutrales.</strong> Cada uno solo
              ve sus propios anuncios y los acredita, así que un mismo pedido puede reclamarse
              dos veces. Sirve para pujar y es un problema para comparar canales, como se
              explica con detalle en{" "}
              <Link href="/es/blog/meta-ads-conversions-vs-crm" className={link}>conversiones de Meta Ads frente al CRM</Link>.
            </p>
            <p>
              <strong>Los marketing mix models son lentos y gruesos.</strong> Necesitan un
              histórico largo y variado de inversión y resultados, trabajan por canal y
              semana en lugar de por campaña y día, y solo son tan buenos como los datos de
              resultados con los que se alimentan.
            </p>

            <h2 className={h2}>Elige por decisión, no por modelo</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-[0.95rem] border-collapse min-w-[560px]">
                <thead>
                  <tr>
                    <th className={th}>Decisión</th>
                    <th className={th}>Qué usar</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className={td}>Pujas y presupuestos dentro de Google Ads o Meta</td><td className={td}>La atribución de la propia plataforma; es lo que optimiza su algoritmo</td></tr>
                  <tr><td className={td}>Reparto semanal de presupuesto entre canales y campañas</td><td className={td}>Último clic en cada sesión, conciliado con los pedidos reales</td></tr>
                  <tr><td className={td}>Si una campaña de parte alta del embudo aporta ingresos</td><td className={td}>Un test de incrementalidad: una audiencia de control o zonas sin la campaña</td></tr>
                  <tr><td className={td}>Mix anual de canales, medios offline incluidos</td><td className={td}>Un marketing mix model sobre inversión y resultados agregados</td></tr>
                  <tr><td className={td}>La cifra que firma finanzas</td><td className={td}>Una cifra basada en reglas contrastada con el sistema de pedidos</td></tr>
                </tbody>
              </table>
            </div>
            <p>
              En la práctica, las capas trabajan juntas. El último clic sobre datos completos
              es la base diaria; los experimentos se hacen unas cuantas veces al año sobre las
              campañas cuyo valor no ve el último clic; un marketing mix model, donde exista el
              histórico, fija el marco anual; y las plataformas siguen pujando con sus
              modelos. Cómo cruzar el último clic con la inversión por campaña se explica en{" "}
              <Link href="/es/blog/measure-roas-after-cookie-consent" className={link}>cómo medir el ROAS después del consentimiento</Link>.
            </p>

            <h2 className={h2}>Valorar la parte alta del embudo sin cambiar la regla</h2>
            <p>
              Hay un camino intermedio que muestran los casos publicados. En lugar de pedir a
              una compra que acredite una campaña de display, se mide la campaña contra una
              conversión anterior que sí puede cerrar.{" "}
              <Link href="/es/case-studies/palladium-hotel-group" className={link}>Palladium Hotel Group</Link>{" "}
              reconstruyó su compra en Display &amp; Video 360 sobre el Coste por Búsqueda,
              con las búsquedas de disponibilidad del motor de reservas como señal de
              intención, y el Coste por Búsqueda de Display mejoró un 165%.{" "}
              <Link href="/es/case-studies/dreamplace-hotels" className={link}>Dreamplace Hotels</Link>{" "}
              concilia las ventas atribuidas con el total de su CRM y atribuye un 15–20% más
              de ventas que su herramienta anterior, que es lo que movió su presupuesto en
              Meta y Google.
            </p>

            <h2 className={h2}>Lo que Sealmetrics no hace</h2>
            <p>
              Sealmetrics acredita cada conversión al origen de la sesión en la que ocurre.
              No tiene modelo multi-touch, ni mérito por visualización, ni lookback entre
              sesiones, ni atribución basada en datos, porque cada una de esas cosas necesita
              un identificador persistente que no crea. Lo que sí puede aportar a la medición
              modelada son los datos de entrada: conversiones e ingresos agregados por canal y
              campaña, medidos en cada sesión y disponibles por API y con el conector de
              BigQuery para un marketing mix model o la lectura de un experimento. El modelo
              se describe en{" "}
              <Link href="/es/use-cases/revenue-attribution" className={link}>atribución de ingresos por campaña</Link>.
            </p>
          </div>

          <CommercialModule
            locale="es"
            hook="¿Atribución modelada sobre la parte que consiente, o último clic en cada sesión? Ve las dos sobre tu propio mix de canales, conciliadas con tus pedidos."
          />

          <section className="mt-16 pt-10 border-t border-warm-100">
            <h2 className="text-[0.75rem] font-medium uppercase tracking-[0.06em] text-text-tertiary mb-5">
              Lecturas relacionadas
            </h2>
            <div className="space-y-4">
              <div>
                <Link href="/es/blog/measure-roas-after-cookie-consent" className={`text-[0.95rem] ${link}`}>
                  Cómo medir el ROAS después del consentimiento de cookies: un método en siete pasos
                </Link>
                <p className="text-[0.8rem] text-text-tertiary mt-1">10 min de lectura</p>
              </div>
              <div>
                <Link href="/es/blog/meta-ads-conversions-vs-crm" className={`text-[0.95rem] ${link}`}>
                  Conversiones de Meta Ads frente al CRM: por qué nunca cuadran y cómo conciliarlas
                </Link>
                <p className="text-[0.8rem] text-text-tertiary mt-1">9 min de lectura</p>
              </div>
              <div>
                <Link href="/es/blog/consent-mode-measured-vs-modelled" className={`text-[0.95rem] ${link}`}>
                  Consent Mode: qué mide GA4 y qué modela
                </Link>
                <p className="text-[0.8rem] text-text-tertiary mt-1">9 min de lectura</p>
              </div>
            </div>
          </section>

          <FaqSection items={FAQ} locale="es" heading="Preguntas sobre último clic y atribución modelada" />
        </div>
      </article>
    </>
  );
}
