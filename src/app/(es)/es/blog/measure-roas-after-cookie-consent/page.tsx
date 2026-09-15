import type { Metadata } from "next";
import { postDates } from "@/lib/content/blog";
import { PostByline } from "@/components/ui/PostByline";
import Link from "next/link";
import { getAlternates } from "@/lib/i18n/navigation";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { FaqSection } from "@/components/ui/FaqSection";
import { HowToSteps } from "@/components/ui/HowToSteps";
import { articleSchema, breadcrumbSchema, faqPageSchema, howToSchema, speakableWebPageSchema } from "@/lib/schema";
import { CommercialModule } from "@/components/ui/CommercialModule";
import { ogImage } from "@/lib/seo/og";
import { ROAS_FAQ_ES as FAQ, ROAS_STEPS_ES as STEPS } from "@/lib/content/roas-after-consent";

/** Spanish edition of /blog/measure-roas-after-cookie-consent; sources in roas-after-consent.ts. */

const SLUG = "measure-roas-after-cookie-consent";
const URL = `/es/blog/${SLUG}`;
const HEADLINE = "Cómo medir el ROAS después del consentimiento de cookies: un método en siete pasos";
const DESCRIPTION =
  "El consentimiento empuja el ROAS en dos direcciones: la analítica se queda corta y las plataformas modelan y se atribuyen. Siete pasos hacia un ROAS fiable.";
const SOCIAL =
  "Tu analítica se queda corta con los ingresos de pago y tus plataformas rellenan el hueco con modelado. Cómo llegar a un ROAS por campaña con el que mover presupuesto.";

export const metadata: Metadata = {
  title: "Cómo medir el ROAS tras el consentimiento: 7 pasos",
  description: DESCRIPTION,
  openGraph: {
    title: "Cómo medir el ROAS después del consentimiento de cookies",
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
    title: "Cómo medir el ROAS después del consentimiento de cookies",
    description: SOCIAL,
    images: [ogImage(`/blog/${SLUG}/`)],
  },
  alternates: {
    canonical: `https://sealmetrics.com${URL}/`,
    languages: getAlternates(`/blog/${SLUG}`),
  },
};

const link =
  "text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors";
const dashList =
  "space-y-2 list-none pl-0 [&>li]:relative [&>li]:pl-6 [&>li]:before:content-['—'] [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:text-text-tertiary";
const h2 = "font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4";
const th = "text-left font-mono text-[11px] uppercase tracking-[0.08em] text-text-tertiary font-semibold py-2 pr-4 border-b border-warm-200";
const td = "py-2 pr-4 border-b border-warm-100 tabular-nums";

export default function MeasureRoasAfterConsentPageEs() {
  const dates = postDates(SLUG, "es");

  return (
    <>
      <Breadcrumbs items={[{ label: "Blog", href: "/es/blog" }, { label: "Cómo medir el ROAS tras el consentimiento" }]} locale="es" />
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
      <JsonLd data={breadcrumbSchema([{ name: "Blog", url: "/es/blog" }, { name: "Cómo medir el ROAS tras el consentimiento", url: URL }])} />
      <JsonLd
        data={howToSchema({
          name: "Cómo medir el ROAS después del consentimiento de cookies",
          description: "Siete pasos para calcular un retorno de la inversión publicitaria por campaña que no dependa de quién aceptó el banner de cookies.",
          url: URL,
          steps: STEPS,
        })}
      />
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
            Para medir el ROAS después del consentimiento de cookies, calcúlalo dos
            veces: una con los ingresos que reporta cada plataforma publicitaria y
            otra con ingresos medidos sin pérdida por consentimiento y conciliados con tus pedidos
            reales, ambas divididas entre la misma inversión. Usa la cifra de la
            plataforma para pujar dentro de ella y la medida para mover presupuesto
            entre canales.
          </p>

          <div className="key-takeaways mb-12 p-6 bg-warm-white border border-warm-100 rounded-[4px]">
            <h2 className="font-serif text-[1rem] font-medium text-text-primary mb-3">Conclusiones clave</h2>
            <ul className={`text-[0.9rem] leading-[1.7] text-text-secondary ${dashList}`}>
              <li>El consentimiento distorsiona el ROAS en dos direcciones opuestas: la analítica con consentimiento se queda corta con los ingresos de pago, y las plataformas rellenan el hueco con conversiones modeladas y por visualización que acreditan a sus propios anuncios.</li>
              <li>La pérdida es desigual. En la tienda Shopify de Incapto, GA4 situaba las campañas de pago en el 50% del tráfico; medidas sin pérdida por consentimiento eran el 62%.</li>
              <li>Un ROAS defendible necesita tres cosas en el mismo periodo, zona horaria y moneda: clics etiquetados, ingresos conciliados con pedidos reales e inversión por campaña de cada plataforma.</li>
              <li>El ROAS a último clic por sesión es un suelo para las campañas de parte alta del embudo, no un veredicto. Pruébalas antes de recortarlas.</li>
              <li>Dreamplace Hotels movió presupuesto de Meta y Google cuando contrastó sus ventas medidas con el total del CRM.</li>
            </ul>
          </div>

          <div className="space-y-6 text-[1.05rem] leading-[1.8] text-text-body">
            <p>
              Pregunta a un equipo de eCommerce europeo por el ROAS de su mejor campaña
              y es fácil que te dé tres respuestas. Google Ads tiene una, Meta otra, y
              GA4 una tercera más baja que las dos. Ninguna miente. Cada una se mide
              sobre una base distinta y, desde que llegó el banner de cookies, esas
              bases se separan un poco más cada año.
            </p>
            <p>
              El ROAS son los ingresos atribuidos a una campaña divididos entre lo que
              costó. La inversión no se discute: la plataforma que te cobró la conoce al
              céntimo. Toda la discusión sobre el ROAS está en los ingresos: qué pedidos
              se cuentan y a qué campaña van. Esa es la parte que rompió el
              consentimiento, y la que tiene que arreglar la{" "}
              <Link href="/es/use-cases/revenue-attribution" className={link}>atribución de ingresos por campaña</Link>.
            </p>

            <h2 className={h2}>Por qué el consentimiento empuja el ROAS en dos direcciones a la vez</h2>
            <p>
              <strong>La analítica con consentimiento se queda corta.</strong> Una
              etiqueta de GA4 que espera al banner no registra al visitante que lo
              rechaza, y quienes aceptan en la segunda página pierden las UTM de la
              página de llegada. La pérdida no es proporcional entre canales. En la{" "}
              <Link href="/es/case-studies/incapto" className={link}>tienda Shopify de Incapto</Link>,
              Sealmetrics registró un 11% más de tráfico directo que GA4, pero entre un
              37% y un 52% más de tráfico de campañas de pago. Las campañas de pago eran
              el 50% del tráfico en GA4 y el 62% medido sin pérdida por consentimiento. Un ROAS de
              analítica construido sobre esa base hace que el paid media parezca peor de
              lo que es. Por qué las visitas perdidas acaban como directo se explica en{" "}
              <Link href="/es/blog/why-ga4-shows-direct-none" className={link}>por qué GA4 muestra tanto tráfico (direct) / (none)</Link>.
            </p>
            <p>
              <strong>Las plataformas rellenan el hueco, a su favor.</strong> Cuando un
              usuario no da su consentimiento, Consent Mode de Google hace que sus
              etiquetas dejen de leer y escribir cookies publicitarias, y Google Ads
              modela las conversiones que no puede observar. Esas conversiones modeladas
              aparecen en la columna Conversiones, y el modelado exige un mínimo de 700
              clics en anuncios en siete días por país y grupo de dominios. La
              configuración de atribución de Meta acredita conversiones tras una
              visualización, no solo tras un clic. Cada plataforma acredita las
              conversiones a sus propios anuncios con sus propias ventanas, así que un
              mismo pedido puede reclamarlo Google y también Meta, y la suma de
              conversiones reportadas por las plataformas puede superar los pedidos
              que realmente entraron.
            </p>
            <p>
              El resultado es un ROAS demasiado bajo en la analítica y generoso en las
              plataformas. Hacer la media no lo arregla. Lo arregla una cifra de
              ingresos medida sobre una base que no dependa del banner y contrastada
              con un total de pedidos que no produce ninguna herramienta.
            </p>

            <h2 className={h2}>Qué va en cada lado de la fórmula</h2>
            <ul className={dashList}>
              <li><strong>Inversión:</strong> coste de medios por campaña según la plataforma, en las mismas fechas, zona horaria y moneda que los ingresos. Los honorarios de agencia y la producción van en una visión de rentabilidad aparte, no en el ROAS.</li>
              <li><strong>Ingresos:</strong> el importe del pedido que registras en la compra, definido una sola vez —con o sin impuestos y envío— y aplicado igual a todos los canales. Decide si las devoluciones se descuentan antes de comparar periodos.</li>
              <li><strong>Regla de atribución:</strong> por escrito. Sealmetrics acredita cada compra al canal de la sesión en la que ocurre, a último clic; las plataformas usan sus propias ventanas y modelos. Dos ROAS con reglas distintas no son dos opiniones sobre la misma cifra. Más detalle en{" "}<Link href="/es/glossary/revenue-attribution" className={link}>atribución de ingresos</Link>.</li>
              <li><strong>Equilibrio:</strong> un ROAS solo significa algo junto al que necesitas. Con un margen bruto del 40%, el ROAS de equilibrio es 1 ÷ 0,40 = 2,5.</li>
            </ul>

            <h2 className={h2}>El método, paso a paso</h2>
          </div>

          <div className="mt-6 mb-12">
            <HowToSteps steps={STEPS} />
          </div>

          <div className="space-y-6 text-[1.05rem] leading-[1.8] text-text-body">
            <h2 className={h2}>Un ejemplo con números</h2>
            <p>
              Las cifras son ilustrativas, no de un cliente. Muestran la forma de la
              comparación del paso 6 en tres campañas con la misma inversión mensual.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-[0.95rem] border-collapse min-w-[560px]">
                <thead>
                  <tr>
                    <th className={th}>Campaña</th>
                    <th className={th}>Inversión</th>
                    <th className={th}>ROAS plataforma</th>
                    <th className={th}>ROAS medido</th>
                    <th className={th}>Lectura</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className={td}>Búsqueda de marca</td><td className={td}>10.000 €</td><td className={td}>9,1</td><td className={td}>8,7</td><td className={td}>Cerca: poco modelado y poca visualización</td></tr>
                  <tr><td className={td}>Prospección en redes</td><td className={td}>10.000 €</td><td className={td}>3,4</td><td className={td}>1,9</td><td className={td}>Bajo el equilibrio a último clic: probar antes de recortar</td></tr>
                  <tr><td className={td}>Búsqueda genérica</td><td className={td}>10.000 €</td><td className={td}>3,0</td><td className={td}>3,6</td><td className={td}>Infravalorada por la analítica con consentimiento</td></tr>
                </tbody>
              </table>
            </div>
            <p>
              Con un ROAS de equilibrio de 2,5, la visión de la plataforma financia las
              tres. La visión medida dice que la búsqueda genérica merece más de lo que
              recibe y que la prospección en redes necesita un test con grupo de control
              antes de que nadie decida que pierde dinero: el último clic es justo la
              regla que menos mérito le da.
            </p>

            <h2 className={h2}>Dónde también se equivoca el ROAS medido a último clic</h2>
            <p>
              Un ROAS medido es más completo que uno con consentimiento, pero no es toda
              la verdad sobre una campaña, y sería poco honesto presentarlo así:
            </p>
            <ul className={dashList}>
              <li><strong>Sin mérito por visualizaciones.</strong> Una campaña que funciona por ser vista, no pulsada —vídeo, display, buena parte de la prospección en redes— no recibe mérito por visualización.</li>
              <li><strong>Sin mérito por sesiones anteriores.</strong> Sealmetrics no identifica usuarios. Quien pulsa un anuncio el lunes y vuelve el viernes escribiendo tu dirección se acredita a directo.</li>
              <li><strong>Sin modelo multi-touch.</strong> No se reparte el mérito entre varios puntos de contacto de la misma persona, por diseño.</li>
              <li><strong>Solo lo que llega a la web.</strong> Las ventas en marketplaces, por teléfono o en tienda física no tienen sesión web que atribuir.</li>
            </ul>
            <p>
              Así que trata el ROAS medido a último clic como un suelo para las campañas
              de parte alta del embudo y como una cifra fiable para las que venden dentro
              de la sesión. Antes de recortar una campaña que parece floja a último clic,
              haz un test de incrementalidad: páusala en algunas zonas o para un grupo de
              control y mira si se mueven los ingresos medidos totales.
            </p>

            <h2 className={h2}>Qué muestran los casos publicados</h2>
            <p>
              <Link href="/es/case-studies/dreamplace-hotels" className={link}>Dreamplace Hotels</Link>{" "}
              compara las ventas que atribuye Sealmetrics con el total de su CRM y trata
              la diferencia restante como una señal de calidad. Sobre esa base atribuye
              un 15–20% más de ventas que su herramienta anterior, y Meta y Google fueron
              los primeros presupuestos que movió.{" "}
              <Link href="/es/case-studies/palladium-hotel-group" className={link}>Palladium Hotel Group</Link>{" "}
              fue más allá en display: reconstruyó su compra en Display &amp; Video 360
              sobre el Coste por Búsqueda, con las búsquedas de disponibilidad del motor
              de reservas como señal de intención, y el Coste por Búsqueda de Display
              mejoró un 165%. El caso de Incapto no reporta ningún ROI: solo la base
              sobre la que se calcula el ROAS, que llevó las campañas de pago de la mitad
              del tráfico a casi dos tercios.
            </p>
          </div>

          <CommercialModule
            locale="es"
            hook="¿Tres ROAS para una misma campaña? Medimos los ingresos sin pérdida por consentimiento, los conciliamos con tus pedidos y los ponemos junto al ROAS de tus plataformas."
          />

          <section className="mt-16 pt-10 border-t border-warm-100">
            <h2 className="text-[0.75rem] font-medium uppercase tracking-[0.06em] text-text-tertiary mb-5">
              Lecturas relacionadas
            </h2>
            <div className="space-y-4">
              <div>
                <Link href="/es/blog/why-ga4-shows-direct-none" className={`text-[0.95rem] ${link}`}>
                  Por qué GA4 muestra tanto tráfico (direct) / (none), y qué lo arregla
                </Link>
                <p className="text-[0.8rem] text-text-tertiary mt-1">9 min de lectura</p>
              </div>
              <div>
                <Link href="/es/blog/consentless-analytics-for-dtc" className={`text-[0.95rem] ${link}`}>
                  Cómo miden las marcas DTC los ingresos de paid media sin esperar al banner
                </Link>
                <p className="text-[0.8rem] text-text-tertiary mt-1">7 min de lectura</p>
              </div>
              <div>
                <Link href="/es/blog/consent-banner-impact-on-analytics" className={`text-[0.95rem] ${link}`}>
                  Cómo los banners de consentimiento destruyen tus datos
                </Link>
                <p className="text-[0.8rem] text-text-tertiary mt-1">6 min de lectura</p>
              </div>
            </div>
          </section>

          <FaqSection items={FAQ} locale="es" heading="Preguntas sobre el ROAS tras el consentimiento" />
        </div>
      </article>
    </>
  );
}
