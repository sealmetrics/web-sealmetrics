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

/** Spanish edition of /blog/meta-ads-conversions-vs-crm; sources listed there. */

const SLUG = "meta-ads-conversions-vs-crm";
const URL = `/es/blog/${SLUG}`;
const HEADLINE = "Conversiones de Meta Ads frente al CRM: por qué nunca cuadran y cómo conciliarlas";
const DESCRIPTION =
  "Meta cuenta las conversiones en las que sus anuncios pudieron influir; tu CRM, las que existen. Por qué difieren, qué significa cada hueco y un método semanal.";
const SOCIAL =
  "Mérito por visualización, conversiones modeladas, eventos duplicados y fechas distintas. Qué significa cada diferencia entre Meta y tu CRM y cómo conciliar sobre totales.";

export const metadata: Metadata = {
  title: "Conversiones de Meta Ads frente al CRM: por qué no cuadran",
  description: DESCRIPTION,
  openGraph: {
    title: "Conversiones de Meta Ads frente al CRM: por qué nunca cuadran",
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
    title: "Conversiones de Meta Ads frente al CRM: por qué nunca cuadran",
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
    question: "¿Por qué Meta Ads muestra más conversiones que mi CRM?",
    answer:
      "Porque Meta cuenta las conversiones en las que sus anuncios pudieron influir, dentro de la configuración de atribución de cada conjunto de anuncios, y eso puede incluir conversiones tras una visualización además de tras un clic, más conversiones modeladas que no puede observar. Otros canales reclaman algunos de esos mismos pedidos, y un píxel y una API de conversiones que envían el mismo evento sin un event_id compartido se cuentan dos veces.",
  },
  {
    question: "¿Por qué Meta muestra menos conversiones que mi CRM?",
    answer:
      "Normalmente porque parte de las conversiones nunca llega a Meta: el píxel espera al consentimiento y el visitante lo rechazó, un bloqueador lo detuvo, la API de conversiones no envía ese evento, o la conversión se produjo fuera de la web o por teléfono. El total del CRM incluye además clientes a los que ningún anuncio de Meta tocó.",
  },
  {
    question: "¿Puedo cruzar las conversiones de Meta Ads con registros concretos del CRM?",
    answer:
      "No de forma fiable desde el Administrador de anuncios, que reporta conversiones agregadas por campaña, conjunto de anuncios y anuncio. Concilia sobre totales y ratios semanales: conversiones que reporta Meta, conversiones medidas en tu web desde tráfico de Meta y el total del CRM, en el mismo periodo y zona horaria.",
  },
  {
    question: "¿La API de conversiones cierra la diferencia con el CRM?",
    answer:
      "Cierra la parte que causa el navegador: píxeles bloqueados o sujetos a consentimiento. No cambia lo que Meta se atribuye a sí misma, y añade un riesgo nuevo. Meta solo deduplica eventos del píxel y del servidor cuando los nombres coinciden y el eventID del píxel es igual al event_id del servidor, recibidos en 48 horas; si no, la misma compra cuenta dos veces.",
  },
  {
    question: "¿Qué configuración de atribución de Meta debo comparar con el CRM?",
    answer:
      "Compara más de una. Usa la opción del Administrador de anuncios para comparar configuraciones de atribución y mira el dato de solo clic junto a la configuración por defecto. El dato de solo clic es el más cercano a lo que tu web puede medir del tráfico de Meta; la diferencia con el de por defecto es el mérito que Meta se atribuye por visualizaciones e interacciones.",
  },
  {
    question: "¿Sealmetrics envía conversiones de vuelta a Meta?",
    answer:
      "No. Sealmetrics no envía conversiones a las plataformas publicitarias, así que el píxel o la API de conversiones de Meta siguen alimentando sus pujas. Sealmetrics mide, sin pérdida por consentimiento, las conversiones y los ingresos de las visitas que llegaron desde anuncios de Meta, identificadas por sus UTM, y ese total es el que pones junto al CRM.",
  },
];

const link =
  "text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors";
const dashList =
  "space-y-2 list-none pl-0 [&>li]:relative [&>li]:pl-6 [&>li]:before:content-['—'] [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:text-text-tertiary";
const h2 = "font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4";
const h3 = "font-serif text-[1.15rem] font-medium text-text-primary mt-8 mb-3";
const th = "text-left font-mono text-[11px] uppercase tracking-[0.08em] text-text-tertiary font-semibold py-2 pr-4 border-b border-warm-200 align-bottom";
const td = "py-2 pr-4 border-b border-warm-100 align-top";

export default function MetaAdsConversionsVsCrmPageEs() {
  const dates = postDates(SLUG, "es");

  return (
    <>
      <Breadcrumbs items={[{ label: "Blog", href: "/es/blog" }, { label: "Meta Ads frente al CRM" }]} locale="es" />
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
      <JsonLd data={breadcrumbSchema([{ name: "Blog", url: "/es/blog" }, { name: "Meta Ads frente al CRM", url: URL }])} />
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
            <PostByline {...dates} readTime="9 min de lectura" authorName="Rafa Jiménez" authorUrl="/es/authors/rafa-jimenez" locale="es" />
          </header>

          <p className="tldr mb-12 text-[1.15rem] leading-[1.7] text-text-secondary font-serif italic">
            Meta Ads y tu CRM no discrepan sobre la misma cifra. Meta cuenta las
            conversiones en las que sus anuncios pudieron influir, con su propia
            configuración de atribución y en parte modeladas; el CRM cuenta los leads y
            pedidos que existen. Se concilian sobre totales semanales con una tercera
            cifra en medio: las conversiones medidas en tu web desde tráfico de Meta, sin
            pérdida por consentimiento.
          </p>

          <div className="key-takeaways mb-12 p-6 bg-warm-white border border-warm-100 rounded-[4px]">
            <h2 className="font-serif text-[1rem] font-medium text-text-primary mb-3">Conclusiones clave</h2>
            <ul className={`text-[0.9rem] leading-[1.7] text-text-secondary ${dashList}`}>
              <li>Meta acredita conversiones a sus propios anuncios según la configuración de atribución de cada conjunto de anuncios, que puede incluir visualizaciones e interacciones además de clics, y rellena con modelado lo que no puede observar.</li>
              <li>El CRM cuenta registros: cada lead cualificado o pedido pagado, de todos los canales, en la fecha en que se creó.</li>
              <li>Los eventos duplicados entre píxel y API de conversiones inflan a menudo las cifras de Meta: solo se deduplican cuando coinciden el nombre del evento y el ID, en 48 horas.</li>
              <li>Cruzar fila a fila es el objetivo equivocado. Compara tres totales semanales —lo que reporta Meta, lo medido en tu web desde tráfico de Meta y el CRM— y lee los ratios.</li>
              <li>Dreamplace Hotels usa el total de su CRM como punto de conciliación y atribuye un 15–20% más de ventas que su herramienta anterior; Meta y Google fueron los primeros presupuestos que movió.</li>
            </ul>
          </div>

          <div className="space-y-6 text-[1.05rem] leading-[1.8] text-text-body">
            <p>
              La reunión va igual todos los meses. La agencia de paid social enseña el
              Administrador de anuncios con 412 compras. El CRM, o el sistema de pedidos
              de la tienda, muestra 1.180 pedidos en total, y nadie sabe decir cuántos
              vinieron de Meta. Finanzas pregunta si 412 es un tercio del negocio o una
              estimación generosa. Nadie en la sala puede responder, porque esas dos
              cifras nunca estuvieron pensadas para compararse directamente.
            </p>
            <p>
              Las cifras son ilustrativas, pero la estructura no. Es la misma
              conversación de{" "}
              <Link href="/es/use-cases/single-source-of-truth" className={link}>una sola cifra para marketing y finanzas</Link>:
              cada sistema cuenta algo distinto, y el desacuerdo solo termina cuando todos
              los equipos leen la misma cifra conciliada. Este artículo es la versión
              específica de Meta, con lo que suele significar cada diferencia y un método
              semanal para cerrar la discusión.
            </p>

            <h2 className={h2}>Qué está contando realmente cada sistema</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-[0.95rem] border-collapse min-w-[640px]">
                <thead>
                  <tr>
                    <th className={th}></th>
                    <th className={th}>Administrador de anuncios de Meta</th>
                    <th className={th}>Analítica web, sin pérdida por consentimiento</th>
                    <th className={th}>CRM o sistema de pedidos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className={`${td} font-semibold`}>Unidad</td><td className={td}>Eventos de conversión acreditados a un anuncio</td><td className={td}>Conversiones en sesiones que llegaron desde un anuncio de Meta</td><td className={td}>Registros de leads o pedidos</td></tr>
                  <tr><td className={`${td} font-semibold`}>Regla de mérito</td><td className={td}>La configuración de atribución del conjunto: clics y, según cuál sea, interacciones y visualizaciones</td><td className={td}>Último clic dentro de la sesión, a partir de las UTM de la página de llegada</td><td className={td}>Ninguna, o un campo de origen capturado al crear el registro</td></tr>
                  <tr><td className={`${td} font-semibold`}>Conversiones no observadas</td><td className={td}>En parte modeladas</td><td className={td}>No se cuentan</td><td className={td}>No aplica</td></tr>
                  <tr><td className={`${td} font-semibold`}>Otros canales</td><td className={td}>Invisibles; Google o el email pueden reclamar el mismo pedido</td><td className={td}>Cada sesión tiene un solo canal</td><td className={td}>Todos incluidos en el total</td></tr>
                  <tr><td className={`${td} font-semibold`}>Estado</td><td className={td}>El evento que se disparó</td><td className={td}>El evento que se disparó</td><td className={td}>Cualificado, pagado, cancelado, devuelto</td></tr>
                </tbody>
              </table>
            </div>
            <p>
              Leídas así, las cifras no tienen por qué cuadrar. Lo que sí cabe esperar es
              que las diferencias entre ellas sean estables y explicables. Cuando no lo
              son, algo ha cambiado.
            </p>

            <h2 className={h2}>Por qué Meta reporta más conversiones que el CRM</h2>

            <h3 className={h3}>1. Mérito por visualizaciones e interacciones</h3>
            <p>
              La configuración de atribución de un conjunto de anuncios puede acreditar
              una conversión a un anuncio que se vio o con el que se interactuó, no solo
              al que se pulsó. Son pedidos reales en tu CRM, pero nada en la visita que
              los produjo apunta a Meta. La opción del Administrador de anuncios para
              comparar configuraciones de atribución muestra cuánto del total reportado
              es solo clic.
            </p>

            <h3 className={h3}>2. Varios canales reclaman el mismo pedido</h3>
            <p>
              Un comprador que pulsa un anuncio de Meta el lunes, uno de Google Shopping
              el miércoles y una newsletter el viernes puede ser reclamado por las tres
              plataformas. Cada una lo reporta de buena fe dentro de su propia ventana. El
              CRM tiene un pedido. Si sumas los totales de las plataformas, superan los
              pedidos que entraron.
            </p>

            <h3 className={h3}>3. Conversiones modeladas</h3>
            <p>
              Cuando Meta no puede observar una conversión, por ejemplo de usuarios de iOS
              que desactivaron el seguimiento, estima una parte con modelado estadístico.
              Esas conversiones no tienen detrás un registro individual que puedas
              encontrar en el CRM.
            </p>

            <h3 className={h3}>4. El mismo evento enviado dos veces</h3>
            <p>
              Usar a la vez el píxel y la API de conversiones es habitual y útil, pero
              Meta solo elimina el duplicado cuando los dos eventos tienen el mismo nombre
              y el ID de evento del píxel es igual al event_id del servidor, recibidos en
              48 horas. Un ID ausente o distinto significa que una compra se cuenta dos
              veces. Es lo primero que hay que revisar cuando Meta da un salto repentino.
            </p>

            <h3 className={h3}>5. Definiciones distintas de conversión</h3>
            <p>
              Un evento Lead que se dispara al enviar un formulario no es un lead
              cualificado en el CRM, y un evento Purchase en una página de gracias que se
              puede recargar no es un pedido pagado. Los pedidos cancelados, devueltos,
              impagados o de prueba siguen en el flujo de eventos y desaparecen del CRM.
            </p>

            <h3 className={h3}>6. Fechas y zonas horarias distintas</h3>
            <p>
              Comprueba si tu informe del Administrador de anuncios sitúa una conversión en
              el día de la interacción con el anuncio o en el de la conversión, y en qué
              zona horaria funciona la cuenta publicitaria. El CRM usa la fecha de creación
              del registro, en su propia zona horaria. En el borde de un mes, el mismo
              pedido cae en periodos distintos.
            </p>

            <h2 className={h2}>Por qué Meta también puede reportar menos</h2>
            <ul className={dashList}>
              <li><strong>El píxel no se disparó.</strong> Un píxel sujeto a consentimiento no se ejecuta para quien rechaza el banner, y los bloqueadores lo detienen para otros. Sin API de conversiones, esas conversiones no llegan a Meta.</li>
              <li><strong>La conversión ocurrió en otro sitio.</strong> Los pedidos por teléfono, las visitas a tienda y los leads que cierra el equipo comercial no tienen un evento de navegador que Meta pueda recibir.</li>
              <li><strong>El CRM incluye a todos.</strong> Directo, orgánico, email y clientes a los que ningún anuncio tocó están en el total del CRM y en ningún informe de Meta.</li>
            </ul>

            <h2 className={h2}>Por qué cruzar fila a fila es el objetivo equivocado</h2>
            <p>
              El instinto es exportar las dos listas y unirlas pedido a pedido. El
              Administrador de anuncios no te da esa lista: reporta conversiones agregadas
              por campaña, conjunto de anuncios y anuncio. Construirla exigiría identificar
              personas entre sistemas, que es justo lo que restringen las normas de
              consentimiento, y aun así no te diría si el anuncio causó el pedido.
            </p>
            <p>
              Sealmetrics tampoco lo hace, por diseño: no identifica usuarios ni guarda IDs
              de pedido. Lo que aporta es la columna central de la tabla: conversiones e
              ingresos de las sesiones que llegaron desde anuncios de Meta, medidos en cada
              sesión haya aceptado o no el visitante el banner, y acreditados a último clic
              dentro de la sesión. Esa columna es la que convierte dos cifras incompatibles
              en tres comparables. Cómo se atribuyen esos ingresos se explica en{" "}
              <Link href="/es/glossary/revenue-attribution" className={link}>atribución de ingresos</Link>.
            </p>

            <h2 className={h2}>Un método de conciliación semanal</h2>
            <ol className="list-decimal pl-5 space-y-3">
              <li><strong>Define la conversión una sola vez.</strong> Decide qué cuenta el CRM —pedidos pagados o leads en una fase concreta— y haz que el evento de Meta se dispare en el equivalente más cercano.</li>
              <li><strong>Elimina los eventos duplicados.</strong> Si usas píxel y API de conversiones, envía el mismo nombre de evento y el mismo ID desde los dos, y revisa en el Administrador de eventos que no haya compras duplicadas.</li>
              <li><strong>Etiqueta todos los anuncios de Meta.</strong> Añade utm_source (facebook o instagram), utm_medium, utm_campaign y utm_content para el anuncio, de modo que cada visita desde Meta sea identificable en tu web sin cookies.</li>
              <li><strong>Construye tres columnas semanales.</strong> Conversiones que reporta Meta, con la configuración de atribución anotada y el dato de solo clic al lado; conversiones medidas en tu web desde tráfico de Meta; y el total del CRM, todo para la misma semana y zona horaria.</li>
              <li><strong>Contrasta primero el total de la web con el CRM.</strong> Si las conversiones que mides en tu web desde todos los canales no se acercan al total del CRM, arregla la medición antes de leer Meta. Una página de confirmación que no siempre carga suele ser la culpable.</li>
              <li><strong>Lee los ratios, no la diferencia.</strong> Un ratio estable entre lo que reporta Meta y lo medido en tu web es una calibración con la que se puede planificar. Un ratio que se mueve sin cambios en las campañas es una señal para investigar.</li>
            </ol>

            <h2 className={h2}>Qué suele significar cada diferencia</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-[0.95rem] border-collapse min-w-[600px]">
                <thead>
                  <tr>
                    <th className={th}>Lo que ves</th>
                    <th className={th}>Lectura más probable</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className={td}>Meta por defecto muy por encima de Meta solo clic; solo clic cerca de lo medido en la web</td><td className={td}>Meta se atribuye mérito por visualizaciones e interacciones. Es sano, pero no son ingresos visibles en una visita</td></tr>
                  <tr><td className={td}>Meta solo clic muy por encima de lo medido en la web</td><td className={td}>Eventos duplicados, o UTM perdidas en redirecciones que impiden reconocer las visitas de Meta</td></tr>
                  <tr><td className={td}>Total de la web muy por debajo del CRM</td><td className={td}>Hueco de medición: conversiones que no se disparan en la web, o ventas por teléfono y fuera de línea en el CRM</td></tr>
                  <tr><td className={td}>Meta muy por debajo de las conversiones de Meta medidas en la web</td><td className={td}>Píxel sujeto a consentimiento o bloqueado, sin API de conversiones</td></tr>
                  <tr><td className={td}>Ratio estable durante semanas y luego un salto</td><td className={td}>Un cambio de medición: nueva configuración de consentimiento, cambio de tema, un segundo píxel o una configuración de atribución</td></tr>
                </tbody>
              </table>
            </div>

            <h2 className={h2}>Cómo se ve en la práctica</h2>
            <p>
              <Link href="/es/case-studies/dreamplace-hotels" className={link}>Dreamplace Hotels</Link>{" "}
              usa Sealmetrics como capa de medición independiente, compara las ventas que
              atribuye con el total de su CRM y trata la diferencia restante como una señal
              de calidad. Sobre esa base atribuye un 15–20% más de ventas que su
              herramienta anterior, y Meta y Google fueron los primeros presupuestos que
              movió. La base importa especialmente en Meta: en la{" "}
              <Link href="/es/case-studies/incapto" className={link}>tienda Shopify de Incapto</Link>,
              Sealmetrics registró un 133% más de tráfico social orgánico y entre un 37% y
              un 52% más de tráfico de campañas de pago que GA4 en los mismos días, así que
              un canal social juzgado con una analítica con consentimiento parte de una
              cifra mucho menor que la que existe.
            </p>
            <p>
              Aplicado a la inversión, el mismo enfoque te da un ROAS por campaña con el
              que mover presupuesto; los pasos están en{" "}
              <Link href="/es/blog/measure-roas-after-cookie-consent" className={link}>cómo medir el ROAS después del consentimiento</Link>.
            </p>
          </div>

          <CommercialModule
            locale="es"
            hook="¿Meta dice una cifra y tu CRM otra? Medimos las conversiones del tráfico de Meta sin pérdida por consentimiento y las ponemos entre las dos, semana a semana."
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
            </div>
          </section>

          <FaqSection items={FAQ} locale="es" heading="Preguntas sobre Meta Ads y las cifras del CRM" />
        </div>
      </article>
    </>
  );
}
