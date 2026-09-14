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

/** Spanish edition of /blog/consent-mode-measured-vs-modelled; sources listed there. */

const SLUG = "consent-mode-measured-vs-modelled";
const URL = `/es/blog/${SLUG}`;
const HEADLINE = "Consent Mode: qué mide GA4 y qué modela";
const DESCRIPTION =
  "Sin consentimiento, Consent Mode envía pings sin cookies y GA4 estima usuarios y sesiones por encima de un umbral. Qué es medido y qué es modelado.";
const SOCIAL =
  "Modo básico y avanzado, pings sin cookies, umbrales del modelado de comportamiento, Blended frente a Observed y el dato modelado que nunca llega a BigQuery.";

export const metadata: Metadata = {
  title: "Consent Mode: qué mide GA4 y qué modela",
  description: DESCRIPTION,
  openGraph: {
    title: "Consent Mode: qué mide GA4 y qué modela",
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
    title: "Consent Mode: qué mide GA4 y qué modela",
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
    question: "¿Qué mide Google Consent Mode cuando se deniega el consentimiento?",
    answer:
      "Depende de la implantación. En el modo básico, nada: las etiquetas de Google no se ejecutan hasta que el visitante interactúa con el banner, y un rechazo no envía ningún dato. En el modo avanzado, las etiquetas cargan con el consentimiento denegado y envían pings sin cookies con la hora, el user agent, el referrer, el estado del consentimiento y cualquier identificador de clic en anuncios que haya en la URL, sin leer ni escribir cookies.",
  },
  {
    question: "¿Qué diferencia hay entre el modo básico y el avanzado de Consent Mode?",
    answer:
      "El modo básico bloquea las etiquetas de Google hasta que el visitante da su consentimiento, así que un rechazo no deja rastro y Google solo puede aplicar un modelo de conversión general. El modo avanzado carga las etiquetas antes del banner con el consentimiento denegado y envía pings sin cookies, que es lo que permite el modelado de conversiones específico del anunciante en Google Ads y el modelado de comportamiento en GA4.",
  },
  {
    question: "¿Cuánto de mi GA4 es dato modelado?",
    answer:
      "Compara el mismo informe con las identidades de informes Blended y Observed en la administración de GA4. Blended añade modelado cuando no hay identificador disponible; Observed solo usa IDs de usuario y de dispositivo. Cambiar de una a otra solo afecta a cómo se muestran los informes, no a lo que se recoge, así que la diferencia entre ambas es la parte modelada.",
  },
  {
    question: "¿El dato modelado de Consent Mode llega a BigQuery?",
    answer:
      "No. Google incluye la exportación de datos, también la de BigQuery, entre las funciones que no admiten dato modelado, junto con las audiencias, el explorador de usuarios, los segmentos con secuencias, los informes de retención y las métricas predictivas. Un almacén de datos construido sobre la exportación muestra, por tanto, menos usuarios que la interfaz de GA4 en Blended.",
  },
  {
    question: "¿Consent Mode recupera los orígenes del tráfico y el ROAS?",
    answer:
      "No visita a visita. El modelado de comportamiento de GA4 estima usuarios, sesiones y usuarios nuevos de quienes rechazaron las cookies de analítica, y Google Ads modela conversiones en su propia columna de Conversiones. Ninguno de los dos convierte una visita sin consentimiento en una sesión observada con su propio origen en tu analítica.",
  },
  {
    question: "¿Basta con Consent Mode para cumplir el RGPD?",
    answer:
      "No por sí solo. Consent Mode traslada a las etiquetas de Google lo que el visitante eligió en tu banner; no decide si tienes base legal ni si hace falta banner. El modo avanzado, además, envía pings antes del consentimiento, algo que conviene revisar con tu DPO según los criterios de tu autoridad nacional.",
  },
];

const link =
  "text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors";
const dashList =
  "space-y-2 list-none pl-0 [&>li]:relative [&>li]:pl-6 [&>li]:before:content-['—'] [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:text-text-tertiary";
const h2 = "font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4";
const th = "text-left font-mono text-[11px] uppercase tracking-[0.08em] text-text-tertiary font-semibold py-2 pr-4 border-b border-warm-200 align-bottom";
const td = "py-2 pr-4 border-b border-warm-100 align-top";

export default function ConsentModeMeasuredVsModelledPageEs() {
  const dates = postDates(SLUG, "es");

  return (
    <>
      <Breadcrumbs items={[{ label: "Blog", href: "/es/blog" }, { label: "Consent Mode: medido y modelado" }]} locale="es" />
      <JsonLd
        data={articleSchema({
          headline: HEADLINE,
          description: DESCRIPTION,
          ...dates,
          url: URL,
          category: "Calidad del dato",
          author: { name: "Rafa Jiménez", url: "/es/authors/rafa-jimenez", jobTitle: "Founder, Sealmetrics" },
        })}
      />
      <JsonLd data={breadcrumbSchema([{ name: "Blog", url: "/es/blog" }, { name: "Consent Mode: medido y modelado", url: URL }])} />
      <JsonLd data={faqPageSchema(FAQ, URL)} />
      <JsonLd data={speakableWebPageSchema({ url: URL, name: HEADLINE, selectors: [".key-takeaways", ".tldr"] })} />

      <article className="pt-12 pb-28 bg-white">
        <div className="max-w-[936px] mx-auto px-5 sm:px-8">
          <header className="mb-12">
            <span className="inline-block text-[0.75rem] font-medium tracking-[0.08em] uppercase text-text-tertiary mb-4">
              Calidad del dato
            </span>
            <h1 className="font-serif text-[2.5rem] font-medium text-text-primary leading-[1.2] mb-6">
              {HEADLINE}
            </h1>
            <PostByline {...dates} readTime="9 min de lectura" authorName="Rafa Jiménez" authorUrl="/es/authors/rafa-jimenez" locale="es" />
          </header>

          <p className="tldr mb-12 text-[1.15rem] leading-[1.7] text-text-secondary font-serif italic">
            Con Consent Mode, GA4 mide a los visitantes que aceptan las cookies de
            analítica. Para quienes las rechazan, el modo avanzado envía pings sin
            cookies, y GA4 estima sus usuarios, sesiones y usuarios nuevos con modelado
            de comportamiento cuando la propiedad supera los umbrales de Google. Esas
            estimaciones aparecen en los informes Blended, no en la exportación a
            BigQuery, y no devuelven el origen de cada visita.
          </p>

          <div className="key-takeaways mb-12 p-6 bg-warm-white border border-warm-100 rounded-[4px]">
            <h2 className="font-serif text-[1rem] font-medium text-text-primary mb-3">Conclusiones clave</h2>
            <ul className={`text-[0.9rem] leading-[1.7] text-text-secondary ${dashList}`}>
              <li>El modo básico no envía nada a Google si se rechaza el consentimiento. El avanzado envía pings sin cookies: hora, user agent, referrer, estado del consentimiento e identificadores de clic en anuncios.</li>
              <li>GA4 solo modela usuarios, sesiones y usuarios nuevos por encima de un umbral: 1.000 eventos al día con el almacenamiento de analítica denegado durante 7 días y 1.000 usuarios diarios con él concedido durante 7 de los 28 días anteriores.</li>
              <li>El dato modelado se ve con la identidad de informes Blended y no está en la exportación a BigQuery, las audiencias, los informes de retención ni los segmentos con secuencias.</li>
              <li>Google Ads modela las conversiones por separado, en su propia columna de Conversiones, por encima de 700 clics en anuncios en siete días por país y grupo de dominios.</li>
              <li>El modelado estima totales. No devuelve a cada visita sin consentimiento su canal, que es lo que necesitan las decisiones de presupuesto.</li>
            </ul>
          </div>

          <div className="space-y-6 text-[1.05rem] leading-[1.8] text-text-body">
            <p>
              Se suele describir Consent Mode como lo que &ldquo;recupera&rdquo; el dato
              que se lleva el banner de cookies. La descripción es verdad a medias, y la
              mitad que no lo es sale cara. Consent Mode es una forma de que tu banner le
              diga a las etiquetas de Google lo que eligió el visitante. Qué pasa con los
              visitantes que dijeron que no depende de cómo esté implantado, de cuánto
              tráfico tengas y de qué informe estés mirando.
            </p>
            <p>
              El equipo de Incapto lo describió con precisión: &ldquo;El Consent Mode
              nos dejaba un vacío estructural: sabíamos que había tráfico que no
              estábamos viendo, pero no teníamos forma de dimensionarlo&rdquo;. Cuando
              pusieron GA4 con Consent Mode junto a Sealmetrics en su{" "}
              <Link href="/es/case-studies/incapto" className={link}>tienda Shopify</Link>{" "}
              durante 48 días, GA4 no registró el 29% de las visitas ni el 45% de las
              páginas vistas. Este artículo explica qué parte de ese hueco puede estimar
              Consent Mode y qué parte no.
            </p>

            <h2 className={h2}>Las cuatro señales y las dos implantaciones</h2>
            <p>
              Consent Mode maneja cuatro tipos de consentimiento: <code>ad_storage</code>{" "}
              y <code>analytics_storage</code> para las cookies e identificadores de
              dispositivo de publicidad y de analítica, y <code>ad_user_data</code> y{" "}
              <code>ad_personalization</code> para enviar datos de usuario a Google con
              fines publicitarios y para los anuncios personalizados. Estos dos últimos son
              los que añadió la versión 2. Los fija el banner, tu{" "}
              <Link href="/es/glossary/consent-management-platform" className={link}>plataforma de gestión del consentimiento</Link>,
              y los leen las etiquetas de Google.
            </p>
            <p>Cómo se comportan las etiquetas depende de la implantación:</p>
            <div className="overflow-x-auto">
              <table className="w-full text-[0.95rem] border-collapse min-w-[620px]">
                <thead>
                  <tr>
                    <th className={th}></th>
                    <th className={th}>Modo básico</th>
                    <th className={th}>Modo avanzado</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className={`${td} font-semibold`}>Antes de que el visitante responda</td><td className={td}>Las etiquetas de Google no se ejecutan; no se envía nada</td><td className={td}>Las etiquetas cargan con el consentimiento denegado por defecto</td></tr>
                  <tr><td className={`${td} font-semibold`}>El visitante acepta</td><td className={td}>Las etiquetas funcionan con cookies desde ese momento</td><td className={td}>Las etiquetas pasan a usar cookies</td></tr>
                  <tr><td className={`${td} font-semibold`}>El visitante rechaza</td><td className={td}>No se envía nada, ni siquiera el estado del consentimiento</td><td className={td}>Pings sin cookies: hora, user agent, referrer, estado del consentimiento e identificadores de clic en la URL</td></tr>
                  <tr><td className={`${td} font-semibold`}>Modelado que permite</td><td className={td}>Un modelo de conversión general</td><td className={td}>Modelado de conversiones específico del anunciante; modelado de comportamiento en GA4 si es elegible</td></tr>
                </tbody>
              </table>
            </div>

            <h2 className={h2}>Qué se mide</h2>
            <p>
              Con los visitantes que aceptan las cookies de analítica, GA4 funciona como
              siempre: usuarios, sesiones, eventos, orígenes y conversiones, observados.
              Con quienes rechazan, una implantación básica no observa nada. Una avanzada
              observa que hubo un hit, con su hora, navegador, referrer y estado del
              consentimiento, pero sin cookie no hay identificador que una un hit con el
              siguiente, así que esos pings no se pueden montar en usuarios y sesiones como
              los hits con consentimiento.
            </p>
            <p>
              Hay además un efecto de calendario que afecta a los dos modos. Un visitante
              que acepta en la segunda página ya ha dejado atrás la página de llegada que
              llevaba los parámetros de campaña, que es uno de los motivos por los que
              incluso el tráfico con consentimiento acaba en{" "}
              <Link href="/es/blog/why-ga4-shows-direct-none" className={link}>(direct) / (none)</Link>.
            </p>

            <h2 className={h2}>Qué se modela, y solo por encima de un umbral</h2>
            <p>
              El modelado de comportamiento de GA4 usa aprendizaje automático para estimar
              el comportamiento de los visitantes que rechazaron las cookies de analítica a
              partir del de visitantes parecidos que las aceptaron. Exige una implantación
              avanzada en todas las páginas y una propiedad que recoja al menos 1.000
              eventos al día con el almacenamiento de analítica denegado durante al menos 7
              días, y al menos 1.000 usuarios diarios con él concedido durante al menos 7 de
              los 28 días anteriores. Google advierte que cumplir esos requisitos no
              garantiza la elegibilidad.
            </p>
            <ul className={dashList}>
              <li><strong>Qué estima:</strong> usuarios, sesiones y usuarios nuevos, mezclados con el dato observado en los informes estándar.</li>
              <li><strong>Qué no toca:</strong> los recuentos de eventos como page_view y session_start en las exploraciones estándar.</li>
              <li><strong>Dónde no existe:</strong> la exportación a BigQuery y otras exportaciones de datos, las audiencias, el explorador de usuarios, los segmentos con secuencias, los informes de retención y las métricas predictivas.</li>
            </ul>
            <p>
              Google Ads hace su propio modelado. Cuando un visitante no da su
              consentimiento, las conversiones modeladas aparecen en la columna
              Conversiones y en los informes que se basan en ella, siempre que la cuenta
              alcance 700 clics en anuncios en siete días por país y grupo de dominios. Es la
              cifra con la que se puja, y es la estimación de Google sobre la contribución de
              Google. Cómo encaja frente a los ingresos medidos se explica en{" "}
              <Link href="/es/blog/measure-roas-after-cookie-consent" className={link}>cómo medir el ROAS después del consentimiento</Link>.
            </p>

            <h2 className={h2}>Cómo ver cuánto de tu GA4 es modelado</h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li><strong>Comprueba la implantación.</strong> Con Tag Assistant, carga una página con el consentimiento denegado. Si no sale ninguna petición de Google Analytics del navegador, usas el modo básico y no se modela nada a partir de pings.</li>
              <li><strong>Cambia la identidad de informes.</strong> En la administración de GA4, compara el mismo informe en Blended y en Observed. Blended añade modelado; Observed no. El cambio solo afecta a los informes, no a los datos recogidos.</li>
              <li><strong>Lee la diferencia por métrica.</strong> Usuarios y sesiones se mueven; las páginas vistas en las exploraciones no. Una gran diferencia en usuarios sin diferencia en páginas vistas es el modelado trabajando.</li>
              <li><strong>Compara con la exportación a BigQuery.</strong> La exportación solo contiene dato observado. Si tu almacén de datos y la interfaz de GA4 no coinciden en usuarios, este suele ser el motivo.</li>
              <li><strong>Concilia con los pedidos.</strong> Ni Blended ni Observed te dicen cuántas visitas hubo de verdad. Tus pedidos reales son el único total que no produce ninguna herramienta de analítica; el método está en{" "}<Link href="/es/use-cases/single-source-of-truth" className={link}>una sola cifra para marketing y finanzas</Link>.</li>
            </ol>

            <h2 className={h2}>Para qué sirve el dato modelado, y para qué no</h2>
            <p>
              Los usuarios y sesiones modelados son una forma razonable de que una línea de
              tendencia no se hunda cuando cambia la tasa de consentimiento, y las
              conversiones modeladas ayudan a pujar en Google Ads. No sustituyen a la
              medición en tres situaciones que importan a quien gestiona un presupuesto:
            </p>
            <ul className={dashList}>
              <li><strong>Decisiones por canal.</strong> La documentación de Google describe usuarios, sesiones y usuarios nuevos estimados. No describe devolver a cada visita sin consentimiento su propio origen, y la pérdida no es igual en todos los canales: en Incapto, Sealmetrics registró un 11% más de tráfico directo que GA4, pero entre un 37% y un 52% más desde campañas de pago y un 133% más desde redes sociales orgánicas.</li>
              <li><strong>Todo lo que depende de la exportación.</strong> Los cuadros de mando de BI, la ciencia de datos y los modelos de finanzas construidos sobre BigQuery solo ven dato observado.</li>
              <li><strong>Webs por debajo del umbral.</strong> Una propiedad que nunca alcanza los requisitos no recibe modelado de comportamiento: solo la parte con consentimiento.</li>
            </ul>

            <h2 className={h2}>La alternativa: medir sin necesitar consentimiento</h2>
            <p>
              La otra forma de cerrar el hueco es dejar de depender de las cookies de
              analítica. Sealmetrics no guarda nada en el dispositivo del visitante y lee el
              origen de cada página de llegada a partir de sus UTM o su referrer, así que
              cada visita y cada conversión se observa con su canal en lugar de estimarse. No
              se modela nada, y las mismas cifras están en el dashboard, la API y la
              exportación. La arquitectura se explica en{" "}
              <Link href="/es/complete-data" className={link}>datos completos</Link>.
            </p>
            <p>
              Tiene sus propios límites, y son los inversos de los de Consent Mode.
              Sealmetrics no identifica usuarios, así que no hay informes de retención,
              cohortes ni recorridos entre sesiones que estimar u observar. Los bloqueadores
              pueden seguir deteniendo el tracker salvo que se sirva desde un subdominio de
              tu propio dominio. Y que una analítica sin cookies quede exenta de
              consentimiento en tu mercado depende de tu configuración y de los criterios de
              tu autoridad nacional.
            </p>
          </div>

          <CommercialModule
            locale="es"
            hook="¿Cuánto de tu GA4 es modelado y cuánto falta? Ponemos Sealmetrics junto a GA4 con Consent Mode y conciliamos los dos con tus pedidos."
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
                <Link href="/es/blog/consent-banner-impact-on-analytics" className={`text-[0.95rem] ${link}`}>
                  Cómo los banners de consentimiento destruyen tus datos
                </Link>
                <p className="text-[0.8rem] text-text-tertiary mt-1">6 min de lectura</p>
              </div>
              <div>
                <Link href="/es/blog/measure-roas-after-cookie-consent" className={`text-[0.95rem] ${link}`}>
                  Cómo medir el ROAS después del consentimiento de cookies: un método en siete pasos
                </Link>
                <p className="text-[0.8rem] text-text-tertiary mt-1">10 min de lectura</p>
              </div>
            </div>
          </section>

          <FaqSection items={FAQ} locale="es" heading="Preguntas sobre el dato de Consent Mode" />
        </div>
      </article>
    </>
  );
}
