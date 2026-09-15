import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { RelatedGlossaryTerms } from "@/components/ui/RelatedGlossaryTerms";
import { FaqSection } from "@/components/ui/FaqSection";
import { definedTermSchema, breadcrumbSchema, faqPageSchema } from "@/lib/schema";
import { getAlternatesEs } from "@/lib/i18n/navigation";
import { CommercialModule } from "@/components/ui/CommercialModule";
import { ogImage } from "@/lib/seo/og";

/** Spanish edition of /glossary/consent-mode-v2; sources listed there. */

const URL = "/es/glossary/consent-mode-v2";
const SOCIAL =
  "Los cuatro tipos de consentimiento, modo básico y avanzado, qué modelan GA4 y Google Ads, por qué importa en el EEE y qué no recupera.";

export const metadata: Metadata = {
  title: "¿Qué es Google Consent Mode v2? — Glosario",
  description:
    "Consent Mode v2 traslada a las etiquetas de Google lo que eligió el visitante. Qué envían los modos básico y avanzado, qué modela Google y qué no recupera.",
  openGraph: {
    title: "¿Qué es Google Consent Mode v2?",
    description: SOCIAL,
    type: "article",
    url: "https://sealmetrics.com/es/glossary/consent-mode-v2/",
    siteName: "Sealmetrics",
    locale: "es_ES",
    images: [ogImage("/es/glossary/consent-mode-v2/")],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "¿Qué es Google Consent Mode v2?",
    description: SOCIAL,
    images: [ogImage("/es/glossary/consent-mode-v2/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/es/glossary/consent-mode-v2/",
    languages: getAlternatesEs("/glossary/consent-mode-v2"),
  },
};

const FAQ = [
  {
    question: "¿Qué diferencia hay entre Consent Mode v1 y v2?",
    answer:
      "La versión 2 añade dos tipos de consentimiento, ad_user_data y ad_personalization, a los originales ad_storage y analytics_storage. Google los introdujo para el tráfico del Espacio Económico Europeo al reforzar la aplicación de su política de consentimiento de usuarios de la UE: indican si el visitante aceptó que sus datos se envíen a Google con fines publicitarios y si aceptó anuncios personalizados.",
  },
  {
    question: "¿Es obligatorio Consent Mode v2?",
    answer:
      "No como ley en sí misma. Es un requisito de Google: para seguir usando sus etiquetas para medición, personalización de anuncios y remarketing con visitantes del EEE, el anunciante tiene que recoger el consentimiento y enviar a Google las señales correspondientes, y la página de verificación de Google incluye también Reino Unido y Suiza. Consent Mode es el mecanismo de Google para enviarlas.",
  },
  {
    question: "¿Consent Mode v2 recupera los datos que se pierden con el rechazo de cookies?",
    answer:
      "En parte, y como estimación. El modo avanzado envía pings sin cookies cuando se deniega el consentimiento, GA4 modela usuarios, sesiones y usuarios nuevos cuando la propiedad cumple los umbrales de Google, y Google Ads modela conversiones por encima de 700 clics en anuncios en siete días por país y grupo de dominios. Nada de eso convierte una visita rechazada en una sesión observada con su propio origen.",
  },
  {
    question: "¿El dato modelado de Consent Mode llega a BigQuery?",
    answer:
      "No. Google incluye la exportación de datos, también la de BigQuery, entre las funciones sin dato modelado, junto con las audiencias, el explorador de usuarios, los segmentos con secuencias, los informes de retención y las métricas predictivas. Un almacén de datos construido sobre la exportación suele mostrar menos usuarios que GA4 en Blended.",
  },
  {
    question: "¿Consent Mode v2 hace que la analítica cumpla el RGPD?",
    answer:
      "No por sí solo. Consent Mode traslada a las etiquetas de Google lo que el visitante eligió en tu banner; no decide si tienes base legal ni si hace falta banner. El modo avanzado, además, envía pings mientras el consentimiento está denegado, también antes de que el visitante responda, algo que conviene revisar con tu DPO según los criterios de tu autoridad nacional.",
  },
  {
    question: "¿Sealmetrics usa Consent Mode v2?",
    answer:
      "No. Sealmetrics no instala cookies ni guarda nada en el dispositivo del visitante, así que no hay almacenamiento que un tipo de consentimiento pueda activar o bloquear. Si inviertes en Google Ads, sus etiquetas siguen necesitando Consent Mode; Sealmetrics funciona a su lado y no envía conversiones a plataformas publicitarias. Que una implantación sin cookies quede exenta de consentimiento depende de su configuración y de los criterios de tu autoridad nacional.",
  },
];

const link =
  "text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors";
const h2 = "font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4";
const dashList =
  "space-y-2 list-none pl-0 [&>li]:relative [&>li]:pl-6 [&>li]:before:content-['—'] [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:text-text-tertiary";
const th =
  "text-left font-mono text-[11px] uppercase tracking-[0.08em] text-text-tertiary font-semibold py-2 pr-4 border-b border-warm-200 align-bottom";
const td = "py-2 pr-4 border-b border-warm-100 align-top";

export default function ConsentModeV2PageEs() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Glosario", href: "/es/glossary" }, { label: "Google Consent Mode v2" }]} locale="es" />
      <JsonLd
        data={definedTermSchema({
          name: "Google Consent Mode v2",
          description:
            "La API de Google que traslada a las etiquetas de Google Analytics y Google Ads lo que eligió el visitante mediante cuatro tipos de consentimiento: ad_storage, analytics_storage, ad_user_data y ad_personalization. Con el consentimiento denegado, las etiquetas no envían nada (modo básico) o envían pings sin cookies (modo avanzado), y Google modela parte de lo que falta.",
          url: URL,
          related: [
            { name: "Plataforma de gestión del consentimiento", url: "/es/glossary/consent-management-platform" },
            { name: "Cumplimiento RGPD en analítica", url: "/es/glossary/gdpr-analytics-compliance" },
            { name: "Pérdida de datos en analítica", url: "/es/glossary/data-loss-in-analytics" },
            { name: "Analítica sin cookies", url: "/es/glossary/cookieless-analytics" },
          ],
        })}
      />
      <JsonLd data={breadcrumbSchema([{ name: "Glosario", url: "/es/glossary" }, { name: "Google Consent Mode v2", url: URL }])} />
      <JsonLd data={faqPageSchema(FAQ, URL)} />

      <article className="pt-12 pb-28 bg-white">
        <div className="max-w-[720px] mx-auto px-5 sm:px-8">
          <header className="mb-12">
            <span className="inline-block text-[0.75rem] font-medium tracking-[0.08em] uppercase text-text-tertiary mb-4">Definición</span>
            <h1 className="font-serif text-[2.5rem] font-medium text-text-primary leading-[1.2] mb-6">Google Consent Mode v2</h1>
          </header>

          <div className="space-y-6 text-[1.05rem] leading-[1.8] text-text-body">
            <div className="p-6 bg-warm-white border border-warm-100">
              <p data-speakable className="text-[1rem] text-text-primary font-medium">
                Google Consent Mode v2 es la API con la que el banner de consentimiento de una web comunica a las etiquetas de Google Analytics y Google Ads lo que eligió el visitante, mediante cuatro tipos de consentimiento. Si el consentimiento se deniega, las etiquetas no envían nada en el modo básico o envían pings sin cookies en el avanzado, y Google modela parte de lo que falta.
              </p>
            </div>

            <p>
              Consent Mode no es un banner de consentimiento ni una base legal. Es la capa de señales que hay entre ambos: tu{" "}
              <Link href="/es/glossary/consent-management-platform" className={link}>plataforma de gestión del consentimiento</Link>{" "}
              recoge la elección, Consent Mode se la pasa a las etiquetas de Google y las etiquetas ajustan lo que guardan y lo que envían. Qué pasa con quienes dicen que no depende de la implantación, del tráfico de la web y del informe que se mire.
            </p>

            <h2 className={h2}>¿Cuáles son los cuatro parámetros de consentimiento?</h2>
            <p>Google define cuatro tipos de consentimiento. Cada uno está concedido o denegado, y en el modo avanzado los valores por defecto suelen fijarse en denegado hasta que el visitante responde:</p>
            <ul className={dashList}>
              <li><code>ad_storage</code> — almacenamiento, como cookies o identificadores de dispositivo, relacionado con publicidad.</li>
              <li><code>analytics_storage</code> — almacenamiento, como cookies o identificadores de dispositivo, relacionado con analítica; por ejemplo, la duración de la visita.</li>
              <li><code>ad_user_data</code> — si se pueden enviar datos del usuario a Google con fines de publicidad online.</li>
              <li><code>ad_personalization</code> — si hay consentimiento para la publicidad personalizada.</li>
            </ul>
            <p>
              Los dos primeros regulan qué puede guardar la etiqueta en el dispositivo. Los dos últimos son los que añadió la versión 2, y regulan qué puede hacer Google con los datos una vez los tiene. Por eso una configuración que gestiona bien las cookies de analítica puede seguir sin las dos señales publicitarias.
            </p>

            <h2 className={h2}>Modo básico y modo avanzado</h2>
            <p>Los mismos cuatro parámetros dan dos flujos de datos distintos según cuándo cargan las etiquetas de Google:</p>
            <div className="overflow-x-auto">
              <table className="w-full text-[0.95rem] border-collapse min-w-[560px]">
                <thead>
                  <tr>
                    <th className={th}></th>
                    <th className={th}>Modo básico</th>
                    <th className={th}>Modo avanzado</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className={`${td} font-semibold`}>Antes de que el visitante responda</td><td className={td}>Las etiquetas están bloqueadas; no se envía nada</td><td className={td}>Las etiquetas cargan con el consentimiento denegado</td></tr>
                  <tr><td className={`${td} font-semibold`}>El visitante rechaza</td><td className={td}>No llega nada a Google, ni siquiera el estado del consentimiento</td><td className={td}>Pings sin cookies: hora, user agent, referrer, estado del consentimiento e identificadores de clic en anuncios</td></tr>
                  <tr><td className={`${td} font-semibold`}>Modelado disponible</td><td className={td}>Un modelo de conversión general</td><td className={td}>Modelado de conversiones específico del anunciante; modelado de comportamiento en GA4 si la propiedad es elegible</td></tr>
                </tbody>
              </table>
            </div>
            <p>
              El modo avanzado da a Google más material para modelar y, a cambio, envía datos con el consentimiento denegado, también antes de que el visitante responda. Si ese equilibrio es aceptable lo decide tu DPO, no la etiqueta.
            </p>

            <h2 className={h2}>¿Qué se mide y qué se modela?</h2>
            <p>
              <strong>Lo medido:</strong> los visitantes que conceden <code>analytics_storage</code> se observan como siempre, con usuarios, sesiones, eventos, orígenes y conversiones. De quienes rechazan, el modo básico no observa nada. El avanzado registra que hubo un hit, pero sin cookie no hay identificador que lo una con el siguiente, así que esos pings no se pueden montar en usuarios y sesiones como los hits con consentimiento.
            </p>
            <p>
              <strong>Lo modelado:</strong> el modelado de comportamiento de GA4 estima usuarios, sesiones y usuarios nuevos de quienes rechazaron, a partir del comportamiento de visitantes parecidos que aceptaron. Exige el modo avanzado en todas las páginas y una propiedad con al menos 1.000 eventos diarios con el almacenamiento de analítica denegado durante 7 días, y al menos 1.000 usuarios diarios con él concedido durante 7 de los 28 días anteriores; Google advierte que cumplir esos requisitos no garantiza la elegibilidad. Las estimaciones aparecen con la identidad de informes Blended, no con Observed. Google Ads modela las conversiones por su cuenta, en la columna Conversiones, cuando la cuenta alcanza 700 clics en anuncios en siete días por país y grupo de dominios.
            </p>
            <p>
              Cómo leer la parte modelada de tu propia propiedad, métrica a métrica, se explica en{" "}
              <Link href="/es/blog/consent-mode-measured-vs-modelled" className={link}>Consent Mode: qué mide GA4 y qué modela</Link>.
            </p>

            <h2 className={h2}>Por qué Consent Mode v2 importa para Google Ads en el EEE</h2>
            <p>
              La Ley de Mercados Digitales (DMA) regula a Google como guardián de acceso; lo que le llega al anunciante es la política de consentimiento de usuarios de la UE de Google. Al presentar sus cambios para cumplir la DMA, en marzo de 2024, Google anunció mejoras en sus productos publicitarios para que los anunciantes comuniquen el consentimiento conforme a esa política. La ayuda de Google Ads es explícita: para seguir usando sus etiquetas para medición, personalización de anuncios y remarketing con usuarios del Espacio Económico Europeo, el anunciante tiene que recoger el consentimiento y compartir las señales con Google. La página de Google para verificar esas señales cita el EEE, Reino Unido y Suiza como regiones donde se exige consentimiento.
            </p>
            <p>
              En la práctica, Consent Mode v2 es el peaje para que la medición, la personalización y el remarketing de Google Ads sigan funcionando con tráfico europeo. No dice nada sobre cuánto de ese tráfico verá tu analítica.
            </p>

            <h2 className={h2}>Lo que Consent Mode v2 no recupera</h2>
            <ul className={dashList}>
              <li><strong>El origen de cada visita rechazada.</strong> El modelado estima totales; no devuelve a una visita sin consentimiento su propio canal en tus informes.</li>
              <li><strong>El dato modelado fuera de la interfaz.</strong> La exportación a BigQuery y otras exportaciones, las audiencias, el explorador de usuarios, los segmentos con secuencias, los informes de retención y las métricas predictivas no contienen dato modelado.</li>
              <li><strong>Nada por debajo del umbral.</strong> Una propiedad que nunca cumple los requisitos no recibe modelado de comportamiento: solo ve la parte con consentimiento.</li>
              <li><strong>Una base legal.</strong> Consent Mode transmite una elección; no convierte en lícito el tratamiento que hay detrás. Esa evaluación corresponde al <Link href="/es/glossary/gdpr-analytics-compliance" className={link}>cumplimiento del RGPD en analítica</Link> y a la <Link href="/glossary/eprivacy-directive" className={link}>Directiva ePrivacy</Link>.</li>
            </ul>
            <p>
              Incapto, una tienda en Shopify con GA4 y Consent Mode, es un ejemplo medido de ese hueco. Rosa Tomàs, su Acquisition Manager B2C, lo resumió así: &ldquo;El Consent Mode nos dejaba un vacío estructural: sabíamos que había tráfico que no estábamos viendo, pero no teníamos forma de dimensionarlo&rdquo;. Cuando el equipo puso Sealmetrics junto a GA4 durante 48 días, GA4 no registró el 29% de las visitas. En una ventana posterior de diez días, el 14% de las visitas de GA4 no tenía un origen utilizable, frente al 0,3% en Sealmetrics. Los detalles están en el{" "}
              <Link href="/es/case-studies/incapto" className={link}>caso de Incapto</Link>, y el contexto general, en{" "}
              <Link href="/es/glossary/data-loss-in-analytics" className={link}>pérdida de datos en analítica</Link>.
            </p>

            <h2 className={h2}>En qué se diferencia la medición sin cookies</h2>
            <p>
              La <Link href="/es/glossary/cookieless-analytics" className={link}>analítica sin cookies</Link> elimina esa dependencia en lugar de modelar a su alrededor. Sealmetrics no usa Consent Mode: no instala cookies ni guarda nada en el dispositivo del visitante, así que no hay almacenamiento que un tipo de consentimiento pueda conceder o denegar. Lee el origen de cada página de llegada a partir de sus UTM o su referrer, de modo que las visitas que registra llevan su canal en lugar de una estimación. La arquitectura se explica en{" "}
              <Link href="/es/complete-data" className={link}>datos completos</Link>.
            </p>
            <p>
              Los límites van en sentido contrario. Sealmetrics no identifica a nadie, así que no hay informes de retención por usuario, cohortes ni recorridos entre sesiones. No envía conversiones a Google Ads, así que no sustituye a Consent Mode para pujar. Los bloqueadores pueden seguir deteniendo el tracker salvo que se sirva desde un subdominio de tu propio dominio. Y que una implantación sin cookies quede exenta de consentimiento depende de su configuración y de los criterios de tu autoridad nacional. Si esa evaluación concluye que lo está, el error habitual está en Google Tag Manager: una etiqueta de Sealmetrics que se queda detrás de una condición de consentimiento solo registra a quienes aceptan, y la{" "}
              <a href="https://docs.sealmetrics.com/troubleshooting/gtm-consent-mode-blocking" className={link}>documentación de Sealmetrics</a>{" "}
              lo señala como la causa más frecuente de dato ausente.
            </p>
          </div>

          <CommercialModule
            locale="es"
            hook="Consent Mode le dice a Google lo que eligió el visitante. Ponemos Sealmetrics junto a GA4 con Consent Mode y te enseñamos cuánto de tu tráfico está medido, modelado o ausente."
          />

          <FaqSection items={FAQ} locale="es" heading="Preguntas sobre Consent Mode v2" />

          <RelatedGlossaryTerms slug="consent-mode-v2" locale="es" />
        </div>
      </article>
    </>
  );
}
