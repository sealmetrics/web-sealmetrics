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

/** Spanish edition of /blog/why-ga4-shows-direct-none; sources listed there. */

const SLUG = "why-ga4-shows-direct-none";
const URL = `/es/blog/${SLUG}`;
const HEADLINE = "Por qué GA4 muestra tanto tráfico (direct) / (none), y qué lo arregla";
const DESCRIPTION =
  "(direct) / (none) en GA4 es un síntoma, no un canal. Las seis causas, cómo diagnosticarlas en tu propiedad y lo que arreglar la etiqueta no puede recuperar.";
const SOCIAL =
  "En GA4, una sesión directa significa que no encontró origen ni para la sesión ni para el usuario. Por qué pasa y por qué arreglar la etiqueta solo recupera una parte.";

export const metadata: Metadata = {
  title: "Por qué GA4 muestra tráfico (direct) / (none) y cómo arreglarlo",
  description: DESCRIPTION,
  openGraph: {
    title: "Por qué GA4 muestra tanto tráfico (direct) / (none)",
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
    title: "Por qué GA4 muestra tanto tráfico (direct) / (none)",
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
    question: "¿Por qué GA4 muestra tanto tráfico (direct) / (none)?",
    answer:
      "Porque una sesión solo acaba en (direct) / (none) cuando GA4 no tiene origen para ella ni un origen de pago u orgánico anterior para ese usuario. Pasa cuando el referrer y las UTM se pierden antes de que la etiqueta los lea —consentimiento dado después de la página de llegada, redirecciones, apps y clientes de correo— o cuando GA4 no reconoce al usuario porque la cookie se rechazó, se borró o caducó.",
  },
  {
    question: "¿Qué diferencia hay entre Direct y Unassigned en GA4?",
    answer:
      "Direct es un canal con una regla: source (direct) y medium (not set) o (none), es decir, GA4 no recibió referrer ni datos de campaña. Unassigned significa que no encajó ninguna regla de canal, normalmente porque el source es (not set) tras perderse el evento session_start, o porque source y medium tienen valores propios que ninguna regla reconoce.",
  },
  {
    question: "¿Consent Mode genera tráfico direct / none en GA4?",
    answer:
      "Puede hacerlo de dos formas. Si el consentimiento se da en la segunda página, la página de llegada que llevaba el referrer y las UTM ya ha pasado. Y Google documenta que fijar el consentimiento con el comando default en lugar de update, o enviar eventos denegados después de que se concediera, puede perder session_start, que aparece como (not set) y Unassigned.",
  },
  {
    question: "¿Cuánto tráfico de GA4 suele ser directo o sin asignar?",
    answer:
      "Depende de cada web, así que mide la tuya. Dos referencias publicadas: en la tienda Shopify de Incapto, el 14% de las visitas de GA4 no tenía un origen útil para decidir presupuesto, frente al 0,3% en Sealmetrics en los mismos días; en Palladium Hotel Group, el 35% de las reservas que registraba GA4 no tenía canal.",
  },
  {
    question: "¿Las UTM arreglan el tráfico directo en GA4?",
    answer:
      "Arreglan la parte que viene de enlaces sin etiquetar: el email, las apps, los códigos QR y los acortadores llegan sin referrer, y una UTM le da a GA4 un origen igualmente. No arreglan la visita que GA4 nunca registra porque se rechazó el consentimiento, ni la página de llegada cuyas UTM ya no están cuando se da el consentimiento.",
  },
  {
    question: "¿La analítica sin cookies también tiene tráfico directo?",
    answer:
      "Sí. Sealmetrics clasifica una visita como directa cuando no hay UTM y el referrer está vacío, así que la pérdida de referrer por redirecciones, apps o una Referrer-Policy estricta sigue generando tráfico directo. Lo que cambia es que el origen se lee en cada página de llegada sin depender del consentimiento, y las visitas que se reanudan pasada la ventana de sesión de dos horas se etiquetan como tráfico reincorporado, no como directo.",
  },
];

const link =
  "text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors";
const dashList =
  "space-y-2 list-none pl-0 [&>li]:relative [&>li]:pl-6 [&>li]:before:content-['—'] [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:text-text-tertiary";
const h2 = "font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4";
const h3 = "font-serif text-[1.15rem] font-medium text-text-primary mt-8 mb-3";

export default function WhyGa4ShowsDirectNonePageEs() {
  const dates = postDates(SLUG, "es");

  return (
    <>
      <Breadcrumbs items={[{ label: "Blog", href: "/es/blog" }, { label: "Por qué GA4 muestra (direct) / (none)" }]} locale="es" />
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
      <JsonLd data={breadcrumbSchema([{ name: "Blog", url: "/es/blog" }, { name: "Por qué GA4 muestra (direct) / (none)", url: URL }])} />
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
            En GA4, una sesión solo acaba en (direct) / (none) cuando GA4 no
            encontró origen para esa sesión ni un origen de pago u orgánico anterior
            para ese usuario. Por eso un tráfico directo alto casi nunca es gente
            escribiendo tu dirección: es el referrer o las UTM perdidos antes de que
            la etiqueta pudiera leerlos, o un visitante al que GA4 no reconoce porque
            la cookie se rechazó, se borró o caducó.
          </p>

          <div className="key-takeaways mb-12 p-6 bg-warm-white border border-warm-100 rounded-[4px]">
            <h2 className="font-serif text-[1rem] font-medium text-text-primary mb-3">Conclusiones clave</h2>
            <ul className={`text-[0.9rem] leading-[1.7] text-text-secondary ${dashList}`}>
              <li>GA4 asigna a una sesión directa el origen de pago u orgánico anterior del usuario cuando lo tiene. Lo que se queda en (direct) / (none) no tenía origen ninguno, ni de sesión ni de usuario.</li>
              <li>Unassigned es otro cajón: no encajó ninguna regla de canal, a menudo porque se perdió session_start y el source es (not set).</li>
              <li>Seis causas explican casi todo: consentimiento dado después de la página de llegada, un usuario que GA4 no reconoce, un session_start perdido, redirecciones, enlaces sin referrer y saltos entre dominios.</li>
              <li>En la tienda Shopify de Incapto, el 14% de las visitas de GA4 no tenía un origen útil, frente al 0,3% en Sealmetrics; en Palladium Hotel Group, el 35% de las reservas de GA4 no tenía canal.</li>
              <li>Los arreglos de etiqueta y las UTM recuperan la parte técnica. No recuperan las visitas ni los orígenes que dependen del consentimiento.</li>
            </ul>
          </div>

          <div className="space-y-6 text-[1.05rem] leading-[1.8] text-text-body">
            <p>
              Todos los equipos de marketing han tenido esta conversación. Directo es
              el segundo o tercer canal de GA4, crece cuando hay campañas activas y
              nadie se cree que miles de personas hayan escrito la URL de memoria. La
              explicación de siempre, &ldquo;notoriedad de marca&rdquo;, suena
              razonable y no resuelve nada, porque un canal con el que no se puede
              decidir nada sigue ocupando espacio en todos los informes.
            </p>
            <p>
              El tamaño del problema se puede medir. En la{" "}
              <Link href="/es/case-studies/incapto" className={link}>tienda Shopify de Incapto</Link>,
              14 de cada 100 visitas registradas por GA4 no tenían un origen con el
              que decidir presupuesto: nueve sin canal asignado y cinco más en canales
              residuales. En los mismos días, Sealmetrics dejó sin origen 3 de cada
              1.000. En{" "}
              <Link href="/es/case-studies/palladium-hotel-group" className={link}>Palladium Hotel Group</Link>,
              el 40% del tráfico entrante no tenía source ni medium en el stack
              anterior, y el 35% de las reservas que registraba GA4 no tenía canal. De
              ese hueco parte el argumento de los{" "}
              <Link href="/es/complete-data" className={link}>datos completos</Link>;
              este artículo explica de dónde sale.
            </p>

            <h2 className={h2}>Qué significan de verdad (direct) / (none) y Unassigned en GA4</h2>
            <p>
              La agrupación de canales por defecto de GA4 define Directo con una regla,
              no con una opinión: el source es exactamente <code>(direct)</code> y el
              medium es <code>(not set)</code> o <code>(none)</code>. Dicho de otro modo,
              GA4 no recibió ni referrer ni parámetros de campaña para esa sesión.
              Unassigned es lo que usa GA4 cuando no encaja ninguna regla de canal.
            </p>
            <p>
              El detalle que casi todos pasan por alto es cómo rellena GA4 las
              dimensiones de origen a nivel de sesión. Para el ámbito de sesión y de
              usuario usa el modelo de último clic en canales de pago y orgánicos, y
              una sesión que empieza con una entrada directa hereda los valores de
              campaña que GA4 ya tiene de ese usuario. Un visitante conocido que llegó
              la primera vez desde Google Ads y vuelve escribiendo tu dirección aparece
              en Google Ads, no en Directo.
            </p>
            <p>
              Así que lo que se queda en (direct) / (none) es el tráfico del que GA4
              no tenía nada: ni origen de la sesión ni origen anterior del usuario. Por
              eso el directo es un síntoma. Mide las visitas cuyo origen se perdió, más
              una parte menor de visitas realmente escritas o desde marcadores.
            </p>

            <h2 className={h2}>Las seis causas, en el orden en que suelen pesar</h2>

            <h3 className={h3}>1. El consentimiento llega después de la página de llegada</h3>
            <p>
              Una etiqueta que espera al consentimiento no se ejecuta en la página de
              llegada si el visitante acepta el banner en la segunda página. Para
              entonces, la página que llevaba el referrer y las UTM ya ha pasado: el
              referrer de la segunda página es tu propia web y su URL ya no tiene los
              parámetros de campaña. La sesión empieza sin origen y, si el visitante es
              nuevo para GA4, tampoco tiene uno anterior que heredar.
            </p>

            <h3 className={h3}>2. GA4 no reconoce al visitante</h3>
            <p>
              La herencia del apartado anterior solo funciona con un usuario que GA4 ya
              conoce a través de su cookie first-party. Un visitante que rechazó las
              cookies en una visita anterior, las borró o volvió después de que Safari
              limitara a 7 días una cookie escrita por JavaScript —a 24 horas si la
              página llegó con parámetros de seguimiento— parece nuevo. Su visita de
              vuelta no tiene origen que heredar, así que se convierte en directa.
            </p>

            <h3 className={h3}>3. Se pierde el evento session_start</h3>
            <p>
              Google documenta varios errores de implantación que hacen perder
              session_start, y con él el origen de la sesión, que pasa a aparecer como
              (not set) y Unassigned: la etiqueta de Google disparándose después de
              otros eventos de la página, eventos personalizados enviados antes del
              comando config, usar el comando de consentimiento <code>default</code>{" "}
              donde hace falta <code>update</code>, o enviar eventos denegados después
              de que el visitante diera su consentimiento. Los prefijos de cookie
              distintos en la misma web y un linker entre dominios que se inicializa
              tarde parten la identidad del mismo modo.
            </p>

            <h3 className={h3}>4. Redirecciones y políticas de referrer que lo eliminan</h3>
            <p>
              Las redirecciones de servidor, las de JavaScript y meta-refresh, los
              saltos de HTTPS a HTTP y las cabeceras <code>Referrer-Policy</code>{" "}
              estrictas pueden quitar el referrer antes de que cargue tu página. Los
              acortadores de enlaces y algunas redes de contenido nativo encadenan
              varias redirecciones. La visita llega con el referrer vacío y, sin UTM, no
              queda nada que clasificar.
            </p>

            <h3 className={h3}>5. Enlaces que nunca envían referrer</h3>
            <p>
              Los clientes de correo, las apps de mensajería y los navegadores
              integrados de las redes sociales abren a menudo los enlaces sin referrer.
              Los enlaces sin etiquetar desde esos sitios, los códigos QR y los PDF son
              indistinguibles de una visita escrita. Es la única causa que una política
              de UTM arregla casi por completo.
            </p>

            <h3 className={h3}>6. Saltos entre dominios</h3>
            <p>
              Un checkout, un motor de reservas o una pasarela de pago en otro dominio
              rompen la sesión salvo que esté configurada la medición entre dominios y
              la cookie sobreviva en los dos lados. Cuando el visitante vuelve de una
              página de pago, la vuelta se registra como referral de la pasarela o, si
              el referrer se pierde, como directa.
            </p>

            <h2 className={h2}>Cómo diagnosticarlo en tu propiedad de GA4</h2>
            <p>Con una hora y estas comprobaciones sabrás qué causas tienes:</p>
            <ol className="list-decimal pl-5 space-y-2">
              <li><strong>Separa Directo de Unassigned.</strong> En Adquisición de tráfico, mira las dos filas. Un Unassigned alto con source (not set) apunta a la causa 3, no a tráfico de marca.</li>
              <li><strong>Revisa la página de destino (not set).</strong> Google indica que aparece cuando una sesión no tiene evento page_view. Si es alto, hay eventos disparándose antes o sin la vista de página.</li>
              <li><strong>Divide el directo por navegador y dispositivo.</strong> Un directo concentrado en Safari y móvil apunta a las causas 1 y 2; un directo plano entre navegadores apunta a redirecciones o enlaces sin etiquetar.</li>
              <li><strong>Sigue un enlace etiquetado de principio a fin.</strong> Abre una URL con UTM en un navegador limpio, rechaza el banner en la página de llegada, acéptalo en la segunda y mira en DebugView qué origen registra GA4.</li>
              <li><strong>Inspecciona el referrer a través de tus redirecciones.</strong> En la pestaña de red del navegador, comprueba que el referrer y las UTM sobreviven a cada salto desde el anuncio o el email hasta la página final.</li>
              <li><strong>Compara con una cifra que no produzca ninguna de las dos herramientas.</strong> Concilia GA4 con tus pedidos o reservas reales antes de leer canales. El método está en{" "}<Link href="/es/use-cases/single-source-of-truth" className={link}>una sola cifra para marketing y finanzas</Link>.</li>
            </ol>

            <h2 className={h2}>Lo que recupera arreglar la etiqueta, y lo que no</h2>
            <p>
              Las causas 3 a 6 son técnicas y tienen arreglo dentro de GA4: el orden de
              las etiquetas, <code>update</code> en lugar de <code>default</code> para el
              consentimiento, un único prefijo de cookie, un linker que se inicialice
              pronto, menos redirecciones y UTM en todos los enlaces que controlas.
              Hazlo: reduce tanto el directo como el Unassigned.
            </p>
            <p>
              Las causas 1 y 2 no son fallos. Son lo que la medición basada en
              consentimiento está diseñada para hacer: un visitante que no ha aceptado
              no tiene cookie, y un visitante sin cookie no tiene historial. Ninguna
              configuración le da a GA4 el origen de una visita que no se le permitió
              medir, y el modelado de Consent Mode estima totales, no restaura el
              origen de cada visita. Además, la pérdida es desigual: en Incapto,
              Sealmetrics registró un 11% más de tráfico directo que GA4, pero entre un
              37% y un 52% más desde campañas de pago y un 133% más desde redes sociales
              orgánicas. El directo parece más grande de lo que es justamente porque
              pierde menos que todo lo demás.
            </p>

            <h2 className={h2}>Cómo trata las mismas visitas una medición sin cookies</h2>
            <p>
              Una herramienta sin cookies no depende del consentimiento para leer la
              página de llegada, así que las causas 1 y 2 dejan de generar tráfico
              directo. Sealmetrics lee el origen de cada página de llegada —primero las
              UTM, después un referrer reconocido como un buscador o una red social y,
              por último, cualquier otro referrer— y solo registra directo cuando no hay
              UTM y el referrer está vacío. Las visitas que se reanudan pasada la
              ventana de sesión de dos horas se etiquetan como tráfico reincorporado en
              lugar de sumarse al directo, y las pasarelas de pago o los motores de
              reservas registrados como passthrough referrers conservan el origen
              cuando el visitante vuelve.
            </p>
            <p>
              No hace desaparecer las causas 4 a 6. Una redirección que elimina el
              referrer, o un enlace sin etiquetar abierto desde una app de correo, sigue
              llegando sin nada que clasificar, y Sealmetrics lo registra como directo.
              La higiene de UTM y redirecciones del apartado anterior sirve para
              cualquier herramienta. Y como Sealmetrics no identifica usuarios, no
              puede dar a un visitante que vuelve el origen de una visita anterior: cada
              conversión se acredita al canal de la sesión en la que ocurre. Cómo se
              refleja eso en los informes de campaña se explica en{" "}
              <Link href="/es/use-cases/revenue-attribution" className={link}>atribución de ingresos por campaña</Link>.
            </p>
          </div>

          <CommercialModule
            locale="es"
            hook="¿Cuánto de tu tráfico directo en GA4 es realmente directo? Medimos con las dos herramientas en paralelo y te enseñamos, canal a canal, dónde se perdió el origen."
          />

          <section className="mt-16 pt-10 border-t border-warm-100">
            <h2 className="text-[0.75rem] font-medium uppercase tracking-[0.06em] text-text-tertiary mb-5">
              Lecturas relacionadas
            </h2>
            <div className="space-y-4">
              <div>
                <Link href="/es/blog/why-ga4-misses-traffic" className={`text-[0.95rem] ${link}`}>
                  Por qué GA4 no ve parte de tu tráfico
                </Link>
                <p className="text-[0.8rem] text-text-tertiary mt-1">Calidad del dato</p>
              </div>
              <div>
                <Link href="/es/blog/consent-banner-impact-on-analytics" className={`text-[0.95rem] ${link}`}>
                  Cómo los banners de consentimiento destruyen tus datos
                </Link>
                <p className="text-[0.8rem] text-text-tertiary mt-1">6 min de lectura</p>
              </div>
              <div>
                <Link href="/es/blog/cookieless-analytics-for-ecommerce" className={`text-[0.95rem] ${link}`}>
                  Cómo mide el eCommerce europeo sus ingresos sin esperar al banner de cookies
                </Link>
                <p className="text-[0.8rem] text-text-tertiary mt-1">10 min de lectura</p>
              </div>
            </div>
          </section>

          <FaqSection items={FAQ} locale="es" heading="Preguntas sobre el tráfico directo en GA4" />
        </div>
      </article>
    </>
  );
}
