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

/** Spanish edition of /blog/server-side-tracking-gdpr; sources listed there. Tone per PR #186. */

const SLUG = "server-side-tracking-gdpr";
const URL = `/es/blog/${SLUG}`;
const HEADLINE = "Server-side tracking y RGPD: qué cambia y qué no";
const DESCRIPTION =
  "El server-side cambia dónde se procesan los datos, no si necesitas consentimiento o base legal. Qué dicen ePrivacy, el RGPD y la CNIL, y qué sí puede cambiar.";
const SOCIAL =
  "Un contenedor de servidor no es una exención de consentimiento. El artículo 5(3) de ePrivacy, las directrices del EDPB de 2024, las condiciones de la CNIL para un proxy y lo que el server-side sí mejora.";
const EDPB_URL =
  "https://www.edpb.europa.eu/system/files/2024-10/edpb_guidelines_202302_technical_scope_art_53_eprivacydirective_v2_en_0.pdf";
const CNIL_URL =
  "https://www.cnil.fr/fr/cookies-et-autres-traceurs/regles/google-analytics-et-transferts-de-donnees-comment-mettre-son-outil-de-mesure-daudience-en-conformite";

export const metadata: Metadata = {
  title: "Server-side tracking y RGPD: qué cambia y qué no",
  description: DESCRIPTION,
  openGraph: {
    title: "Server-side tracking y RGPD: qué cambia y qué no",
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
    title: "Server-side tracking y RGPD: qué cambia y qué no",
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
    question: "¿El server-side tracking hace que GA4 cumpla el RGPD?",
    answer:
      "No por sí solo. Un contenedor de servidor cambia dónde se procesan los datos y qué se reenvía, pero las preguntas legales siguen ahí: si algo se guarda en el dispositivo o se lee de él, si se tratan datos personales como direcciones IP o identificadores, con qué base legal, y si hay transferencias fuera de la UE. El server-side puede ayudar a responderlas bien; no las responde por el hecho de existir.",
  },
  {
    question: "¿El server-side tracking evita tener que pedir consentimiento de cookies?",
    answer:
      "No. El consentimiento del artículo 5(3) de la Directiva ePrivacy depende de guardar información en el dispositivo del usuario o acceder a ella, no de dónde se procesen después los datos. Una cookie que fija tu servidor sigue guardada en el dispositivo, y las directrices del EDPB de 2024 consideran acceso el JavaScript que ordena al navegador enviar información. Si se aplica una exención se valora caso por caso.",
  },
  {
    question: "¿El server-side tracking es sin cookies?",
    answer:
      "No necesariamente. Muchas implantaciones server-side mantienen una cookie first-party, a menudo fijada por el propio contenedor de servidor mediante una cabecera de respuesta HTTP para que dure más en navegadores que limitan las cookies escritas por JavaScript. Esa cookie sigue guardada en el dispositivo del visitante. Server-side y sin cookies son decisiones independientes.",
  },
  {
    question: "¿Qué dijo la CNIL sobre usar un proxy con Google Analytics?",
    answer:
      "En su guía de 2022 sobre medición de audiencia y transferencias de datos, la CNIL describió un servidor proxy que solo podía reducir el riesgo de transferencia con un conjunto de medidas: no transferir la dirección IP a los servidores de la herramienta, sustituir el identificador de usuario, eliminar los parámetros de las URL, suprimir el referrer externo, retratar los user agents, no recoger datos entre sitios y un alojamiento adecuado. Añadió que cambiar solo la configuración de la IP no basta.",
  },
  {
    question: "¿Se aplica ePrivacy si no se recogen datos personales?",
    answer:
      "Puede aplicarse. El EDPB, citando al Tribunal de Justicia en Planet49, afirma que la protección del artículo 5(3) se aplica a cualquier información guardada en el equipo terminal, sea o no dato personal. El RGPD es otra cuestión: se aplica cuando se tratan datos personales. Una configuración de analítica tiene que superar las dos pruebas, por eso quitar los datos personales no resuelve por sí solo la cuestión del consentimiento.",
  },
  {
    question: "¿Sealmetrics es server-side tracking?",
    answer:
      "En parte. Un pequeño script en el navegador envía cada hit a Sealmetrics, si quieres a través de un subdominio propio, y el procesamiento se hace en servidores en Dublín; en Shopify, las compras llegan en servidor por webhook. No instala cookies ni guarda nada en el dispositivo, y no conserva direcciones IP ni identificadores de usuario. Que esa configuración quede exenta de consentimiento en tu mercado depende de los criterios de tu autoridad nacional.",
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

export default function ServerSideTrackingGdprPageEs() {
  const dates = postDates(SLUG, "es");

  return (
    <>
      <Breadcrumbs items={[{ label: "Blog", href: "/es/blog" }, { label: "Server-side tracking y RGPD" }]} locale="es" />
      <JsonLd
        data={articleSchema({
          headline: HEADLINE,
          description: DESCRIPTION,
          ...dates,
          url: URL,
          category: "Regulación",
          author: { name: "Rafa Jiménez", url: "/es/authors/rafa-jimenez", jobTitle: "Founder, Sealmetrics" },
        })}
      />
      <JsonLd data={breadcrumbSchema([{ name: "Blog", url: "/es/blog" }, { name: "Server-side tracking y RGPD", url: URL }])} />
      <JsonLd data={faqPageSchema(FAQ, URL)} />
      <JsonLd data={speakableWebPageSchema({ url: URL, name: HEADLINE, selectors: [".key-takeaways", ".tldr"] })} />

      <article className="pt-12 pb-28 bg-white">
        <div className="max-w-[936px] mx-auto px-5 sm:px-8">
          <header className="mb-12">
            <span className="inline-block text-[0.75rem] font-medium tracking-[0.08em] uppercase text-text-tertiary mb-4">
              Regulación
            </span>
            <h1 className="font-serif text-[2.5rem] font-medium text-text-primary leading-[1.2] mb-6">
              {HEADLINE}
            </h1>
            <PostByline {...dates} readTime="10 min de lectura" authorName="Rafa Jiménez" authorUrl="/es/authors/rafa-jimenez" locale="es" />
          </header>

          <p className="tldr mb-12 text-[1.15rem] leading-[1.7] text-text-secondary font-serif italic">
            El server-side tracking cambia dónde se procesan los datos de analítica y qué
            se reenvía a los proveedores. No cambia si necesitas consentimiento o base
            legal. Si se sigue guardando o leyendo una cookie o un identificador en el
            dispositivo, se aplica la Directiva ePrivacy; si se tratan datos personales, se
            aplica el RGPD. Lo que el server-side sí puede cambiar es qué sale de tu
            control, dónde se procesa y cuánto sobrevive a los bloqueadores.
          </p>

          <div className="key-takeaways mb-12 p-6 bg-warm-white border border-warm-100 rounded-[4px]">
            <h2 className="font-serif text-[1rem] font-medium text-text-primary mb-3">Conclusiones clave</h2>
            <ul className={`text-[0.9rem] leading-[1.7] text-text-secondary ${dashList}`}>
              <li>El artículo 5(3) de ePrivacy trata de guardar información en el dispositivo o acceder a ella, sea o no dato personal. Llevar el procesamiento a un servidor no elimina ese paso.</li>
              <li>Las directrices del EDPB de 2024 consideran acceso el JavaScript que ordena al navegador enviar información, y cubren también píxeles, URL de seguimiento y seguimiento por IP. Que se aplique no significa automáticamente que haga falta consentimiento.</li>
              <li>Una cookie que fija tu contenedor de servidor sigue siendo una cookie en el dispositivo del visitante.</li>
              <li>El server-side ayuda cuando se usa para minimizar: las condiciones de la CNIL de 2022 para un proxy de Google Analytics quitan la IP, sustituyen los identificadores y eliminan los parámetros de URL y el referrer externo.</li>
              <li>Esas mismas condiciones eliminan los parámetros de campaña de los que depende la atribución. Cumplir con un proxy y atribuir campañas tiran en direcciones opuestas.</li>
            </ul>
          </div>

          <div className="space-y-6 text-[1.05rem] leading-[1.8] text-text-body">
            <p>
              El server-side tracking se suele vender a los equipos de marketing europeos
              como tres ventajas a la vez: los bloqueadores dejan de bloquear, los datos dejan
              de filtrarse a los proveedores y el problema del consentimiento desaparece. La
              primera es en gran parte cierta. La segunda solo lo es si lo configuras así. La
              tercera es un malentendido, y es la que suele acabar en la bandeja de entrada
              del DPO.
            </p>
            <p>
              Este artículo separa el cambio técnico de las preguntas legales. No es
              asesoramiento jurídico, y las conclusiones sobre una implantación real
              corresponden a tu DPO y a las guías de tu autoridad nacional. La prueba legal
              completa para la analítica está en{" "}
              <Link href="/es/blog/gdpr-eprivacy-analytics-legal-assessment" className={link}>nuestro análisis de RGPD y ePrivacy</Link>.
            </p>

            <h2 className={h2}>Qué es realmente el server-side tracking</h2>
            <p>
              En una implantación client-side, las etiquetas del navegador envían los datos
              directamente a cada proveedor. En una{" "}
              <Link href="/es/glossary/server-side-tracking" className={link}>server-side</Link>,
              el navegador envía los datos a un servidor que gestionas tú, normalmente en un
              subdominio de tu web, y ese servidor decide qué reenvía a cada proveedor. El
              etiquetado server-side de Google funciona así: un contenedor de servidor procesa
              los eventos que llegan y los dirige a servidores de recogida.
            </p>
            <p>
              Hay dos cosas que no cambian. Sigue habiendo código en el navegador que recoge y
              envía los datos. Y salvo que los elimines, los datos que llegan a tu servidor
              —dirección IP, user agent, cookies, parámetros de URL— son los mismos que antes
              iban directamente al proveedor.
            </p>

            <h2 className={h2}>Tres preguntas legales que un contenedor de servidor no responde</h2>

            <h3 className={h3}>1. ¿Se guarda algo en el dispositivo o se lee de él?</h3>
            <p>
              El artículo 5(3) de la Directiva ePrivacy exige consentimiento para guardar
              información en el dispositivo de un usuario, o acceder a la ya guardada, salvo que
              se aplique una exención. El EDPB, citando al Tribunal de Justicia en Planet49,
              afirma que esa protección se aplica a cualquier información guardada en el
              dispositivo, sea o no dato personal. Dónde se procesen después los datos es
              irrelevante para este paso.
            </p>
            <p>
              Las implantaciones server-side mantienen a menudo una cookie first-party, muchas
              veces fijada por el propio contenedor de servidor para que sobreviva a los límites
              de los navegadores con las cookies escritas por JavaScript. Sigue guardada en el
              dispositivo. Y en sus{" "}
              <a href={EDPB_URL} className={link} target="_blank" rel="noopener noreferrer">Directrices 2/2023</a>,
              adoptadas en su versión final en octubre de 2024, el EDPB va más allá: el
              JavaScript que ordena al navegador enviar peticiones asíncronas con la información
              buscada entra en el artículo 5(3), igual que los píxeles de seguimiento, las URL de
              seguimiento y, en algunos casos, el seguimiento basado solo en la dirección IP. Las
              mismas directrices recuerdan que su aplicación no implica sistemáticamente que haya
              que recoger consentimiento: las exenciones hay que valorarlas.
            </p>

            <h3 className={h3}>2. ¿Se tratan datos personales, y con qué base?</h3>
            <p>
              El RGPD se aplica siempre que se tratan datos personales, en tu servidor o en el de
              cualquiera. Las direcciones IP, los client IDs y los user IDs que llegan a un
              contenedor de servidor los tratas tú como responsable, y todo lo que reenvías
              convierte al proveedor en destinatario. Una arquitectura server-side necesita la
              misma base legal, los mismos registros y los mismos contratos que la client-side a
              la que sustituye.
            </p>

            <h3 className={h3}>3. ¿Salen datos de la UE?</h3>
            <p>
              Alojar el contenedor en la UE no cambia lo que pasa después. Si reenvía datos
              personales a un proveedor que los trata fuera de la UE, eso es una transferencia y
              necesita un mecanismo que la ampare. El server-side solo evita la transferencia si
              no reenvía nada personal, o si no reenvía a nadie fuera de la UE.
            </p>

            <h2 className={h2}>Lo que el server-side sí puede cambiar</h2>
            <p>
              Usado a propósito, un servidor intermedio es un buen sitio para minimizar. El
              ejemplo público más claro es la guía de la CNIL de 2022 sobre{" "}
              <a href={CNIL_URL} className={link} target="_blank" rel="noopener noreferrer">medición de audiencia y transferencias de datos</a>,
              que describía un proxy para Google Analytics capaz de reducir el riesgo de
              transferencia solo con un conjunto de medidas:
            </p>
            <ul className={dashList}>
              <li>No transferir la dirección IP del visitante a los servidores de la herramienta.</li>
              <li>Sustituir el identificador de usuario en el servidor proxy.</li>
              <li>Eliminar cualquier parámetro contenido en las URL recogidas.</li>
              <li>Suprimir el referrer externo y retratar los user agents.</li>
              <li>No recoger datos entre sitios y eliminar cualquier dato que permita reidentificar.</li>
              <li>Un alojamiento que evite transferencias a países sin una protección esencialmente equivalente.</li>
            </ul>
            <p>
              La CNIL añadió que cambiar solo la configuración de la IP en la herramienta no
              basta. Además de minimizar, el server-side puede llevar el procesamiento a una
              ubicación de la UE que elijas, reducir el número de scripts de terceros en tus
              páginas y hacer mucho menos probable el bloqueo cuando el endpoint es tu propio
              subdominio.
            </p>

            <h2 className={h2}>El coste en atribución de hacerlo bien</h2>
            <p>
              Relee la lista de la CNIL con ojos de marketing. Eliminar los parámetros de las URL
              quita las UTM y los click IDs sobre los que se construye cualquier informe de
              campañas. Suprimir el referrer externo quita la señal que distingue búsqueda, redes
              y referencias. Sustituir el identificador corta el historial que necesitan los
              modelos de atribución por usuario. Un proxy configurado con esas condiciones
              mantiene la herramienta funcionando y la deja con poco que decir sobre qué canales
              produjeron los ingresos.
            </p>
            <p>
              Ese es el verdadero equilibrio detrás del &ldquo;server-side para cumplir&rdquo;:
              cuantos más datos personales e identificadores quitas, menos sobrevive de la
              atribución por la que compraste la herramienta. Es la misma tensión, vista desde
              otro ángulo, que se explica en{" "}
              <Link href="/es/blog/consent-mode-measured-vs-modelled" className={link}>Consent Mode: qué mide GA4 y qué modela</Link>.
            </p>

            <h2 className={h2}>Cinco afirmaciones que conviene comprobar antes de aprobar un proyecto server-side</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-[0.95rem] border-collapse min-w-[600px]">
                <thead>
                  <tr>
                    <th className={th}>Afirmación</th>
                    <th className={th}>Qué comprobar</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className={td}>&ldquo;El server-side es sin cookies&rdquo;</td><td className={td}>Si el contenedor o las etiquetas siguen fijando o leyendo una cookie, incluida la que se fija con las cabeceras de respuesta del servidor</td></tr>
                  <tr><td className={td}>&ldquo;El server-side no necesita consentimiento&rdquo;</td><td className={td}>Qué se guarda en el dispositivo o se lee de él, y si se aplica una exención concreta según los criterios de tu autoridad</td></tr>
                  <tr><td className={td}>&ldquo;Recupera las conversiones que ocultaban los bloqueadores&rdquo;</td><td className={td}>Es un efecto técnico; no crea una base legal para medir a quien rechazó el consentimiento</td></tr>
                  <tr><td className={td}>&ldquo;Un subdominio propio lo convierte en dato first-party&rdquo;</td><td className={td}>El dominio es un detalle técnico; quién es responsable y quién recibe los datos no cambia</td></tr>
                  <tr><td className={td}>&ldquo;El server-side mantiene los datos en la UE&rdquo;</td><td className={td}>A qué proveedores reenvía el contenedor, qué campos reciben y dónde los tratan</td></tr>
                </tbody>
              </table>
            </div>

            <h2 className={h2}>Una lista de revisión para el DPO</h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li><strong>Dispositivo:</strong> enumera cada cookie, clave de almacenamiento y petición iniciada por script, incluidas las que fija o desencadena el servidor.</li>
              <li><strong>Datos de entrada:</strong> enumera los campos que llegan al servidor: IP, user agent, identificadores, URL completas, referrer.</li>
              <li><strong>Datos de salida:</strong> para cada proveedor, los campos que se reenvían tras el procesamiento, y si alguno identifica a una persona.</li>
              <li><strong>Ubicación:</strong> dónde se ejecuta el contenedor y dónde trata los datos cada destinatario.</li>
              <li><strong>Conservación:</strong> cuánto tiempo se guardan en el servidor los eventos en bruto y los registros.</li>
              <li><strong>Consentimiento:</strong> qué reglas de reenvío dependen del estado de consentimiento del visitante y cómo llega ese estado al servidor.</li>
            </ol>

            <h2 className={h2}>Dónde encaja Sealmetrics, y dónde no</h2>
            <p>
              Sealmetrics no es un contenedor de servidor para otros proveedores. Un pequeño
              script en el navegador envía cada hit a Sealmetrics, si quieres a través de un
              subdominio propio, y el procesamiento se hace en servidores en Dublín; en Shopify,
              las compras llegan en servidor por el webhook de la tienda. No instala cookies ni
              usa almacenamiento local o de sesión. No conserva direcciones IP —se usan solo en
              memoria— ni identificadores de usuario; un marcador de sesión vive en memoria unas
              dos horas; el país sale de la zona horaria del navegador; y las filas de eventos se
              borran al día. Los detalles están en{" "}
              <Link href="/es/gdpr-analytics" className={link}>demostrar cumplimiento</Link>.
            </p>
            <p>
              Como no reenvía nada a proveedores publicitarios, conserva las UTM y el referrer de
              la página de llegada, que es lo que necesita la atribución de campañas. Pero no se
              libra del análisis anterior. Según la lectura del EDPB, un script que envía
              información desde el navegador puede entrar en el artículo 5(3), así que la
              pregunta para cualquier herramienta de analítica —también la nuestra— es si se
              aplica una exención a esa configuración en tu mercado. Varias autoridades, entre
              ellas la CNIL, publican criterios para la medición de audiencia que puede usarse
              sin consentimiento; valorar si una implantación los cumple te corresponde a ti y a
              tu DPO. El concepto se explica en{" "}
              <Link href="/es/consentless-analytics" className={link}>analítica sin consentimiento</Link>.
            </p>
          </div>

          <CommercialModule
            locale="es"
            hook="¿Estudiando un proyecto server-side para cumplir? Mira cómo queda la atribución de campañas sin cookies, sin IPs guardadas y sin reenviar nada a proveedores publicitarios."
          />

          <section className="mt-16 pt-10 border-t border-warm-100">
            <h2 className="text-[0.75rem] font-medium uppercase tracking-[0.06em] text-text-tertiary mb-5">
              Lecturas relacionadas
            </h2>
            <div className="space-y-4">
              <div>
                <Link href="/es/blog/gdpr-eprivacy-analytics-legal-assessment" className={`text-[0.95rem] ${link}`}>
                  ¿Tu analítica cumple de verdad el RGPD? Un análisis legal
                </Link>
                <p className="text-[0.8rem] text-text-tertiary mt-1">9 min de lectura</p>
              </div>
              <div>
                <Link href="/es/blog/consent-mode-measured-vs-modelled" className={`text-[0.95rem] ${link}`}>
                  Consent Mode: qué mide GA4 y qué modela
                </Link>
                <p className="text-[0.8rem] text-text-tertiary mt-1">9 min de lectura</p>
              </div>
              <div>
                <Link href="/es/blog/ga4-vs-piwik-pro-vs-sealmetrics" className={`text-[0.95rem] ${link}`}>
                  GA4 vs Piwik PRO vs Sealmetrics: cuál encaja en un equipo de marketing europeo
                </Link>
                <p className="text-[0.8rem] text-text-tertiary mt-1">11 min de lectura</p>
              </div>
            </div>
          </section>

          <FaqSection items={FAQ} locale="es" heading="Preguntas sobre server-side tracking y RGPD" />
        </div>
      </article>
    </>
  );
}
