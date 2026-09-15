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

const SLUG = "cookieless-analytics-for-hotels";
const URL = `/es/blog/${SLUG}`;
const HEADLINE = "Cómo cuadran los grupos hoteleros la venta directa con el PMS en 2026";
const DESCRIPTION =
  "Cómo mide un grupo hotelero la venta directa por canal sin cookies, sin seguir a huéspedes y sin perder el origen en el motor de reservas, y cómo la contrasta con el PMS.";

export const metadata: Metadata = {
  title: "Analítica sin cookies para hoteles: guía 2026",
  description:
    "Cómo mide un grupo hotelero la venta directa por canal sin cookies y sin seguir a huéspedes, y cómo la contrasta con el total del PMS o del CRM.",
  openGraph: {
    title: "Analítica sin cookies para hoteles: guía 2026",
    description:
      "Atribución agregada a último clic de la venta directa, sin cookies ni seguimiento de huéspedes, contrastada con el total del PMS, sea cual sea tu PMS.",
    type: "article",
    images: [ogImage("/blog/cookieless-analytics-for-hotels/")],
    url: `https://sealmetrics.com${URL}/`,
    siteName: "Sealmetrics",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Analítica sin cookies para hoteles: guía 2026",
    description:
      "Atribución agregada a último clic de la venta directa, sin cookies ni seguimiento de huéspedes, contrastada con el total del PMS, sea cual sea tu PMS.",
    images: [ogImage("/blog/cookieless-analytics-for-hotels/")],
  },
  alternates: {
    canonical: `https://sealmetrics.com${URL}/`,
    languages: getAlternates(`/blog/${SLUG}`),
  },
};

const FAQ = [
  {
    question: "¿Qué es la analítica sin cookies para hoteles?",
    answer:
      "Es una forma de medir la web de venta directa de un hotel —llegadas, búsquedas de disponibilidad y reservas confirmadas— sin cookies, sin almacenamiento en el dispositivo del huésped y sin identificadores personales. Cada reserva se atribuye a último clic al origen de la sesión en la que ocurre, y los totales agregados por canal se contrastan con el PMS o el CRM.",
  },
  {
    question: "¿La analítica sin cookies sigue a cada huésped entre visitas?",
    answer:
      "No. Sealmetrics no identifica personas, no une visitas en recorridos por huésped y no construye perfiles. La medición es agregada: recuentos por canal, campaña, página de llegada, país y dispositivo. Esa renuncia es la que mantiene la analítica fuera del terreno de los datos personales.",
  },
  {
    question: "¿Cuánta atribución de reservas pierde un hotel con GA4?",
    answer:
      "Depende de cada web, así que mide la tuya contra el PMS. Como referencia publicada: en Palladium Hotel Group, el 35% de las reservas que registraba GA4 no tenía canal y el 40% del tráfico entrante no tenía source ni medium; Dreamplace Hotels mide aproximadamente un 30% más de tráfico con Sealmetrics que con Google Analytics.",
  },
  {
    question: "¿Funciona con Mews, Cloudbeds u Opera?",
    answer:
      "No hay un plugin específico para ningún PMS. La reserva se envía como evento de conversión estándar desde la página de confirmación, con su importe, su moneda y las propiedades que quieras, y los totales se contrastan con Mews, Cloudbeds, Opera o cualquier otro PMS desde los informes, la API REST o la exportación a BigQuery.",
  },
  {
    question: "¿Qué pasa si el motor de reservas está en otro dominio?",
    answer:
      "Si el motor está en un subdominio de tu web, se instala el tracker en sus páginas y la reserva queda en la misma sesión. Si está en el dominio del proveedor, ese dominio se registra como passthrough referrer a través de la API de Sealmetrics para que el huésped que vuelve dentro de la sesión conserve el origen, y la reserva se registra en una página de confirmación de tu dominio.",
  },
  {
    question: "¿Puede un grupo con varios hoteles ver los totales de todo el portfolio?",
    answer:
      "Sí. Cada hotel o marca es un sitio dentro de una misma organización, un usuario puede abrirlos todos y los miembros pueden limitarse a los sitios que tengan asignados. Todos los planes incluyen webs ilimitadas y una vista de portfolio. Los passthrough referrers, eso sí, se registran por cuenta.",
  },
];

const link =
  "text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors";
const dashList =
  "space-y-2 list-none pl-0 [&>li]:relative [&>li]:pl-6 [&>li]:before:content-['—'] [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:text-text-tertiary";

export default function CookielessAnalyticsForHotelsPageEs() {
  const dates = postDates(SLUG, "es");

  return (
    <>
      <Breadcrumbs items={[{ label: "Blog", href: "/es/blog" }, { label: "Analítica sin cookies para hoteles" }]} locale="es" />
      <JsonLd
        data={articleSchema({
          headline: HEADLINE,
          description: DESCRIPTION,
          ...dates,
          url: URL,
          category: "Hoteles",
          author: { name: "Rafa Jiménez", url: "/es/authors/rafa-jimenez", jobTitle: "Founder, Sealmetrics" },
        })}
      />
      <JsonLd data={breadcrumbSchema([{ name: "Blog", url: "/es/blog" }, { name: "Analítica sin cookies para hoteles", url: URL }])} />
      <JsonLd data={faqPageSchema(FAQ, URL)} />
      <JsonLd data={speakableWebPageSchema({ url: URL, name: HEADLINE, selectors: [".key-takeaways", ".tldr"] })} />

      <article className="pt-12 pb-28 bg-white">
        <div className="max-w-[936px] mx-auto px-5 sm:px-8">
          <header className="mb-12">
            <span className="inline-block text-[0.75rem] font-medium tracking-[0.08em] uppercase text-text-tertiary mb-4">
              Hoteles
            </span>
            <h1 className="font-serif text-[2.5rem] font-medium text-text-primary leading-[1.2] mb-6">
              {HEADLINE}
            </h1>
            <PostByline
              {...dates}
              readTime="9 min de lectura"
              authorName="Rafa Jiménez"
              authorUrl="/es/authors/rafa-jimenez"
              locale="es"
            />
          </header>

          <p className="tldr mb-12 text-[1.15rem] leading-[1.7] text-text-secondary font-serif italic">
            Un grupo hotelero sabe cuántas reservas directas ha vendido. Lo que no
            sabe es de qué canal vino una parte grande de ellas: en Palladium Hotel
            Group, el 35% de las reservas que registraba GA4. La salida no es otra
            regla de agrupación de canales, sino medir sin depender de cookies y
            contrastar los totales por canal con el PMS.
          </p>

          <div className="key-takeaways mb-12 p-6 bg-warm-white border border-warm-100 rounded-[4px]">
            <h2 className="font-serif text-[1rem] font-medium text-text-primary mb-3">Conclusiones clave</h2>
            <ul className={`text-[0.9rem] leading-[1.7] text-text-secondary ${dashList}`}>
              <li>Con GA4, los grupos hoteleros pierden el canal de una parte relevante de la venta directa: en Palladium Hotel Group, el 35% de las reservas registradas no tenía canal.</li>
              <li>El origen se pierde en tres puntos: el rechazo del consentimiento, la caducidad de cookies que impone Safari y el salto al motor de reservas o a la pasarela de pago.</li>
              <li>La analítica sin cookies cuenta las reservas de forma anónima, sin identificar huéspedes, y atribuye cada una a último clic al origen de la sesión en la que ocurre.</li>
              <li>Los totales por canal se contrastan con el PMS o el CRM, sea cual sea, porque la reserva llega como un evento de conversión estándar.</li>
              <li>Las reservas hechas en la web de una OTA no pasan por tu web y quedan fuera de la medición; su fuente sigue siendo la extranet de la OTA.</li>
            </ul>
          </div>

          <div className="space-y-6 text-[1.05rem] leading-[1.8] text-text-body">
            <p>
              Los directores de venta directa conviven con una versión muy concreta
              del problema de la analítica. El PMS sabe exactamente cuántas reservas
              entraron por la web propia; la analítica no sabe de dónde vino una buena
              parte de ellas. En{" "}
              <Link href="/es/case-studies/palladium-hotel-group" className={link}>Palladium Hotel Group</Link>,
              el 40% del tráfico entrante no tenía source ni medium en el stack
              anterior, y el 35% de las reservas que registraba GA4 no podía
              asignarse al canal que las generó. No era un fallo del marketing, sino
              de la arquitectura de medición.
            </p>
            <p>
              Ese hueco es presupuesto que no se puede defender. En{" "}
              <Link href="/es/case-studies/dreamplace-hotels" className={link}>Dreamplace Hotels</Link>,
              Sealmetrics mide aproximadamente un 30% más de tráfico que Google
              Analytics y atribuye un 15–20% más de ventas que la herramienta
              anterior: una diferencia suficiente para cambiar a qué canal va el
              siguiente euro. El argumento de arquitectura completo está en la guía
              de{" "}
              <Link href="/es/cookieless-analytics" className={link}>analítica sin cookies</Link>;
              aquí nos centramos en cómo se aplica a una web de reservas y en cómo se
              cuadra con el PMS.
            </p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
              Por qué una reserva de hotel pierde el origen más que una compra online
            </h2>
            <p>
              El recorrido de una reserva está especialmente expuesto a los fallos de
              la medición basada en cookies. Por cuatro motivos:
            </p>
            <p>
              <strong>1. El consentimiento se decide en el móvil.</strong> Buena
              parte de las reservas se deciden en el teléfono, donde el banner ocupa
              la pantalla en la primera interacción. El huésped que lo rechaza sigue
              navegando y puede reservar, pero una analítica que espera al
              consentimiento no registra ni su visita ni el clic que lo trajo.
            </p>
            <p>
              <strong>2. Safari recorta la vida de las cookies.</strong>{" "}
              <Link href="/es/glossary/intelligent-tracking-prevention" className={link}>ITP</Link>{" "}
              limita a 7 días las cookies first-party que se escriben por JavaScript,
              y a 24 horas cuando la página llegó con parámetros de seguimiento en la
              URL, que es justo como llega un clic de campaña. Si la reserva se hace
              después, el identificador que guardaba el origen ya no existe.
            </p>
            <p>
              <strong>3. El motor de reservas y la pasarela están fuera.</strong> Muchos
              motores viven en el dominio del proveedor, y el pago pasa por una
              pasarela y por 3-D Secure. Para que GA4 no pierda la sesión en ese salto
              hay que configurar la medición entre dominios y que la cookie sobreviva
              en los dos lados; si el huésped rechazó las cookies, no hay nada que
              pasar, y la vuelta se registra como un referral de la pasarela.
            </p>
            <p>
              <strong>4. La decisión tarda.</strong> Entre la primera búsqueda y la
              reserva pasan días o semanas, con visitas desde metabuscadores,
              campañas y la propia marca. Conviene ser honesto: la analítica sin
              cookies no resuelve esto recordando la primera visita. Acredita la
              sesión que reserva. Lo que cambia es que ve esa sesión, haya aceptado o
              no el huésped el banner.
            </p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
              Cómo cuenta reservas la analítica sin cookies, sin seguir a nadie
            </h2>
            <p>
              Hay que empezar por lo que <em>no</em> hace, porque la arquitectura
              cambia detalle por huésped por totales por canal que se pueden defender:
            </p>
            <ul className={dashList}>
              <li>No identifica a huéspedes concretos.</li>
              <li>No une páginas vistas en recorridos individuales.</li>
              <li>No reconoce al huésped que vuelve.</li>
              <li>No sabe que la llegada desde un metabuscador y la reserva posterior son de la misma persona.</li>
              <li>No acredita visitas anteriores: la reserva va al origen de la sesión en la que ocurre.</li>
            </ul>
            <p>Lo que sí hace:</p>
            <ul className={dashList}>
              <li>Cuenta llegadas por origen: metabuscadores, búsqueda de pago, orgánico, redes, email y directo.</li>
              <li>Cuenta reservas por origen, acreditadas a la sesión en la que se confirman.</li>
              <li>Suma el importe de cada reserva en ingresos agregados por canal y campaña.</li>
              <li>Conserva el origen cuando el huésped vuelve del motor de reservas o de una pasarela registrados como passthrough referrers.</li>
              <li>Permite leer las reservas por las propiedades que envíes con ellas, como fecha de entrada, noches, tipo de habitación u hotel.</li>
            </ul>
            <p>
              El intercambio es deliberado. Se renuncia al &ldquo;recorrido completo
              del huésped&rdquo;, que GA4 solo ofrece en la fracción de reservas cuyo
              huésped aceptó las cookies, a cambio de totales por canal medidos en
              cada sesión.
            </p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
              El patrón de conciliación con el PMS
            </h2>
            <p>La configuración habitual en un grupo hotelero tiene cinco pasos:</p>
            <ol className="list-decimal pl-5 space-y-2">
              <li><strong>Tracker en todas las páginas</strong>, incluida la de confirmación. Servirlo desde un subdominio propio es opcional y hace mucho menos probable que lo bloqueen.</li>
              <li><strong>El motor de reservas dentro de la sesión.</strong> Si está en un subdominio, se etiquetan sus páginas; si está en el dominio del proveedor, se registra como passthrough referrer por API.</li>
              <li><strong>Las pasarelas de pago registradas.</strong> Las principales se reconocen con una lista incorporada; cualquier otra, o un dominio de 3-D Secure, se registra igual.</li>
              <li><strong>Búsqueda y reserva como eventos.</strong> Una microconversión en la búsqueda de disponibilidad y una conversión en la confirmación, con importe, moneda y propiedades de la reserva. No hace falta un plugin de PMS: el contrato de eventos es el mismo con cualquier motor.</li>
              <li><strong>Revisión con el PMS.</strong> Reservas e ingresos por canal frente al total del PMS o del CRM, durante un ciclo de reservas completo, con GA4 todavía activo.</li>
            </ol>
            <p>
              Cada paso, con lo que se pierde en él y lo que hay que configurar, está
              detallado en{" "}
              <Link href="/es/for/hotels" className={link}>Sealmetrics para hoteles</Link>.
            </p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
              Qué entra en la comparación y qué se queda fuera
            </h2>
            <p>
              La conciliación solo es justa si se compara lo mismo. El PMS registra
              todo lo que vende el hotel; la web solo ve lo que se reserva en ella.
            </p>
            <ul className={dashList}>
              <li><strong>Entra:</strong> reservas confirmadas en la web propia y en su motor de reservas, en la misma zona horaria y la misma moneda.</li>
              <li><strong>Fuera:</strong> reservas de OTA, teléfono, call center, grupos, eventos y mostrador, que no tienen una visita web detrás.</li>
              <li><strong>Fuera:</strong> cancelaciones, reservas de prueba y reservas pendientes de pago que el PMS todavía cuenta.</li>
              <li><strong>Sobre totales:</strong> los localizadores de reserva no se guardan, así que se comparan totales y canales, nunca reserva a reserva.</li>
            </ul>
            <p>
              Si el motor está en el dominio del proveedor y nunca devuelve al huésped
              a una página tuya, la reserva no puede registrarse en el navegador. Es
              lo primero que hay que resolver con el proveedor, antes de interpretar
              cualquier diferencia.
            </p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
              Qué esperar: lo que midieron Palladium y Dreamplace
            </h2>
            <p>
              Dreamplace Hotels usa el total de su CRM como punto de conciliación y
              trata la diferencia restante como una señal de calidad del dato. Sobre
              esa base, Sealmetrics atribuye un 15–20% más de ventas que su
              herramienta anterior, y esa visión conciliada es la que movió primero
              su presupuesto en Meta y Google.
            </p>
            <p>
              Palladium fue un paso más allá con el display. Reconstruyó su compra en
              Display &amp; Video 360 sobre el Coste por Búsqueda, con la búsqueda de
              disponibilidad en el motor de reservas como señal de intención, y ese
              coste mejoró un 165%. La búsqueda de disponibilidad es, en un hotel, la
              microconversión que más cerca está de la reserva.
            </p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4">
              ¿Y el banner de consentimiento?
            </h2>
            <p>
              Hay un efecto de segundo orden. Cuando la configuración cumple los
              criterios de exención del regulador, una web de hotel con analítica sin
              cookies puede no necesitar banner para la analítica. Si además los
              píxeles publicitarios pasan a pedir consentimiento más tarde, o se
              retiran, el banner puede salir de la primera interacción en móvil.
              Valóralo con tu DPO: cada píxel mantiene su propio requisito de
              consentimiento, y la exención depende de tu configuración y de los
              criterios de tu autoridad nacional. Lo explicamos en{" "}
              <Link href="/es/gdpr-analytics" className={link}>analítica y RGPD</Link>.
            </p>
          </div>

          <CommercialModule
            locale="es"
            hook="¿Qué parte de tu venta directa no tiene canal hoy? Contrastamos tus reservas con el PMS y te enseñamos el hueco, canal a canal."
          />

          <section className="mt-16 pt-10 border-t border-warm-100">
            <h2 className="text-[0.75rem] font-medium uppercase tracking-[0.06em] text-text-tertiary mb-5">
              Lecturas relacionadas
            </h2>
            <div className="space-y-4">
              <div>
                <Link href="/es/blog/cookieless-analytics-explained" className={`text-[0.95rem] ${link}`}>
                  Analítica cookieless explicada: cómo medir sin cookies
                </Link>
                <p className="text-[0.8rem] text-text-tertiary mt-1">8 min de lectura</p>
              </div>
              <div>
                <Link href="/es/blog/consent-banner-impact-on-analytics" className={`text-[0.95rem] ${link}`}>
                  Cómo los banners de consentimiento destruyen tus datos
                </Link>
                <p className="text-[0.8rem] text-text-tertiary mt-1">6 min de lectura</p>
              </div>
              <div>
                <Link href="/es/case-studies/dreamplace-hotels" className={`text-[0.95rem] ${link}`}>
                  Dreamplace Hotels: paid media con dato real
                </Link>
                <p className="text-[0.8rem] text-text-tertiary mt-1">Caso de éxito</p>
              </div>
            </div>
          </section>

          <FaqSection items={FAQ} locale="es" />
        </div>
      </article>
    </>
  );
}
