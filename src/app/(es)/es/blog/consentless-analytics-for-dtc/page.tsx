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

const SLUG = "consentless-analytics-for-dtc";
const URL = `/es/blog/${SLUG}`;
const HEADLINE = "Cómo miden las marcas DTC los ingresos de paid media sin esperar al banner";
const DESCRIPTION =
  "Qué es la analítica sin consentimiento, en qué se diferencia de la analítica sin cookies, cómo convive con los píxeles publicitarios y qué revisa un DPO.";
const SOCIAL =
  "Sin cookies y sin seguir a nadie: totales por canal medidos en cada visita, no solo en las que aceptaron el banner. Qué es y cómo encaja en un stack DTC.";

export const metadata: Metadata = {
  title: "Analítica sin consentimiento para marcas DTC: guía 2026",
  description: DESCRIPTION,
  openGraph: {
    title: "Analítica sin consentimiento para marcas DTC: guía 2026",
    description: SOCIAL,
    type: "article",
    images: [ogImage("/blog/consentless-analytics-for-dtc/")],
    url: `https://sealmetrics.com${URL}/`,
    siteName: "Sealmetrics",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Analítica sin consentimiento para marcas DTC: guía 2026",
    description: SOCIAL,
    images: [ogImage("/blog/consentless-analytics-for-dtc/")],
  },
  alternates: {
    canonical: `https://sealmetrics.com${URL}/`,
    languages: getAlternates(`/blog/${SLUG}`),
  },
};

const FAQ = [
  {
    question: "¿Qué es la analítica sin consentimiento?",
    answer:
      "Es una medición web diseñada para no activar el requisito de consentimiento: no guarda información en el dispositivo del visitante, no la lee y no recoge identificadores personales. Sin cookies, sin localStorage, sin fingerprinting y sin seguimiento individual. Cuenta eventos de forma anónima y atribuye cada conversión a último clic por canal. Queda fuera de la regla de almacenamiento y acceso de la Directiva ePrivacy; si necesita consentimiento o no depende después de los criterios de tu autoridad nacional.",
  },
  {
    question: "¿Sin consentimiento es lo mismo que sin cookies?",
    answer:
      "Están muy relacionados, pero no son lo mismo. Sin cookies significa, literalmente, que no usa cookies. Sin consentimiento es un estándar más estricto: sin cookies, sin localStorage, sin fingerprinting y sin identificadores personales, de modo que la regla de almacenamiento y acceso no tiene a qué aplicarse. Toda analítica sin consentimiento es sin cookies; no toda analítica sin cookies es sin consentimiento.",
  },
  {
    question: "¿La analítica sin consentimiento sigue a visitantes concretos?",
    answer:
      "No, y esa es la idea. Cuenta eventos de forma agregada —por canal, campaña, página de llegada y país— sin vincular ninguno a una persona o a un dispositivo. No hay perfil por visitante, ni reconocimiento del que vuelve, ni identificador entre sesiones.",
  },
  {
    question: "¿Por qué importa a las marcas DTC en Europa?",
    answer:
      "Una marca DTC vende directamente al consumidor con paid media como motor, y sus decisiones de presupuesto dependen de atribuir la inversión a ingresos. Quien rechaza el banner desaparece de la analítica con consentimiento, así que el ROAS se calcula solo sobre quienes aceptaron. En la tienda Shopify de Incapto, GA4 situaba las campañas de pago en el 50% del tráfico; medidas en cada visita eran el 62%.",
  },
  {
    question: "¿Es legal según el RGPD?",
    answer:
      "Puede serlo, si está bien implantada. El RGPD regula el tratamiento de datos personales; si no se recogen datos personales ni se guarda o lee ningún identificador en el dispositivo, la arquitectura evita las obligaciones asociadas a esos datos. Es algo que tu DPO debe confirmar sobre la implantación concreta; Sealmetrics incluye un DPA y un paquete TPSR para esa revisión.",
  },
  {
    question: "¿Puedo usarla junto a los píxeles publicitarios?",
    answer:
      "Sí. Los píxeles de Meta, TikTok o el remarketing de Google Ads siguen necesitando consentimiento, porque usan datos personales para personalizar anuncios. La analítica sin consentimiento funciona de forma independiente como capa neutral de medición, y los píxeles siguen bajo tu plataforma de consentimiento. Sealmetrics no envía conversiones a las plataformas publicitarias, así que las pujas siguen apoyándose en esos píxeles.",
  },
];

const link =
  "text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors";
const dashList =
  "space-y-2 list-none pl-0 [&>li]:relative [&>li]:pl-6 [&>li]:before:content-['—'] [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:text-text-tertiary";
const h2 = "font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4";

export default function ConsentlessAnalyticsForDtcPageEs() {
  const dates = postDates(SLUG, "es");

  return (
    <>
      <Breadcrumbs items={[{ label: "Blog", href: "/es/blog" }, { label: "Analítica sin consentimiento para DTC" }]} locale="es" />
      <JsonLd
        data={articleSchema({
          headline: HEADLINE,
          description: DESCRIPTION,
          ...dates,
          url: URL,
          category: "eCommerce",
          author: { name: "Rafa Jiménez", url: "/es/authors/rafa-jimenez", jobTitle: "Founder, Sealmetrics" },
        })}
      />
      <JsonLd data={breadcrumbSchema([{ name: "Blog", url: "/es/blog" }, { name: "Analítica sin consentimiento para DTC", url: URL }])} />
      <JsonLd data={faqPageSchema(FAQ, URL)} />
      <JsonLd data={speakableWebPageSchema({ url: URL, name: HEADLINE, selectors: [".key-takeaways", ".tldr"] })} />

      <article className="pt-12 pb-28 bg-white">
        <div className="max-w-[936px] mx-auto px-5 sm:px-8">
          <header className="mb-12">
            <span className="inline-block text-[0.75rem] font-medium tracking-[0.08em] uppercase text-text-tertiary mb-4">
              DTC
            </span>
            <h1 className="font-serif text-[2.5rem] font-medium text-text-primary leading-[1.2] mb-6">
              {HEADLINE}
            </h1>
            <PostByline
              {...dates}
              readTime="7 min de lectura"
              authorName="Rafa Jiménez"
              authorUrl="/es/authors/rafa-jimenez"
              locale="es"
            />
          </header>

          <p className="tldr mb-12 text-[1.15rem] leading-[1.7] text-text-secondary font-serif italic">
            Una marca DTC decide su presupuesto con el ROAS de sus campañas, y ese
            ROAS se calcula sobre las conversiones que su analítica llega a ver. Si
            la analítica espera al banner, solo ve a quienes aceptaron. La analítica
            sin consentimiento no guarda ni lee nada en el dispositivo, no sigue a
            nadie y mide cada visita, así que el reparto por canal deja de depender
            de lo que cada visitante pulsó en el banner.
          </p>

          <div className="key-takeaways mb-12 p-6 bg-warm-white border border-warm-100 rounded-[4px]">
            <h2 className="font-serif text-[1rem] font-medium text-text-primary mb-3">Conclusiones clave</h2>
            <ul className={`text-[0.9rem] leading-[1.7] text-text-secondary ${dashList}`}>
              <li>Analítica sin consentimiento significa sin cookies, sin localStorage, sin fingerprinting, sin identificadores personales y sin seguimiento individual. Ese diseño es el que permite medir sin consentimiento allí donde se cumplen los criterios de exención de tu autoridad.</li>
              <li>Para una marca DTC, cierra el hueco que el rechazo del banner abre en el ROAS por canal: en la tienda Shopify de Incapto, GA4 no registró el 29% de las visitas.</li>
              <li>Convive con los píxeles publicitarios de Meta y Google Ads, que siguen necesitando consentimiento; la analítica no.</li>
              <li>Los totales se contrastan con el backend: en los 48 días de medición en paralelo de Incapto, Sealmetrics registró el 96% de los pedidos reales y el 97% de la facturación.</li>
              <li>La posición legal depende de los detalles de la implantación; un despliegue enterprise debe ir acompañado de un DPA y un paquete TPSR.</li>
            </ul>
          </div>

          <div className="space-y-6 text-[1.05rem] leading-[1.8] text-text-body">
            <p>
              El problema de medición de una marca DTC europea es muy concreto: el
              paid media es el motor de crecimiento, y su ROAS se mide contra las
              conversiones que el sistema observa. Quien rechaza el banner nunca llega
              a ser observable para una analítica con consentimiento, y parte de
              quienes lo aceptan se vuelve a perder por ad-blockers e ITP. La pérdida,
              además, no es pareja: en la{" "}
              <Link href="/es/case-studies/incapto" className={link}>tienda Shopify de Incapto</Link>,
              GA4 registró entre un 37% y un 52% menos tráfico de campañas de pago que
              Sealmetrics, frente a un 11% menos de tráfico directo.
            </p>
            <p>
              &ldquo;Sin consentimiento&rdquo; —consentless, en el sector— es el
              nombre de la solución. No es un término jurídico, sino una forma de
              describir una arquitectura diseñada para no activar el requisito de
              consentimiento. No es &ldquo;pedimos consentimiento y respetamos la
              respuesta&rdquo;, porque eso sigue dependiendo del banner: es no
              necesitarlo, porque no se guarda ni se lee nada en el dispositivo y
              nunca existe un identificador personal. El análisis legal, con los
              criterios de cada autoridad, está en la guía de{" "}
              <Link href="/es/consentless-analytics" className={link}>analítica sin consentimiento</Link>;
              la arquitectura, en la de{" "}
              <Link href="/es/cookieless-analytics" className={link}>analítica sin cookies</Link>.
            </p>

            <h2 className={h2}>Sin consentimiento no significa &ldquo;seguido de forma anónima&rdquo;. Significa no seguido.</h2>
            <p>
              Es el punto que más se malinterpreta en marketing. La analítica sin
              consentimiento no anonimiza a un usuario al que sigue: no sigue a ningún
              usuario. No hay identificador, ni cookie, ni clave en localStorage, ni
              huella del navegador, ni ID anonimizado. Se cuentan vistas, se cuentan
              conversiones y cada evento lleva los metadatos del canal: referrer, UTM
              y página de llegada. Ese es todo el modelo de datos.
            </p>
            <p>
              La consecuencia importa: nunca verás un informe que diga &ldquo;este
              cliente visitó la tienda tres veces antes de comprar&rdquo;, porque el
              sistema no lo sabe. Sabe que el canal A trajo X visitas, Y conversiones
              y Z euros esta semana. Y eso es lo que llega a un director financiero.
            </p>

            <h2 className={h2}>En qué se diferencia de la analítica sin cookies</h2>
            <p>
              Los dos términos se solapan, pero no son sinónimos. Sin cookies
              significa que no se usan cookies. Sin consentimiento es un estándar más
              exigente: sin cookies, sin localStorage, sin sessionStorage, sin
              IndexedDB, sin fingerprinting y sin ningún identificador persistente que
              active la regla de almacenamiento y acceso de la Directiva ePrivacy.
            </p>
            <p>
              Algunas herramientas &ldquo;sin cookies&rdquo; siguen usando
              localStorage o la huella del dispositivo y, técnicamente, siguen
              necesitando consentimiento. Las que son de verdad sin consentimiento no
              usan ninguna de esas técnicas. Las dos opciones son mejores que una
              analítica con cookies, pero solo una arquitectura que no guarda ni lee
              nada en el dispositivo saca de la ecuación esa regla; si hace falta
              consentimiento o no depende después de los criterios de tu autoridad.
            </p>

            <h2 className={h2}>Cómo encaja en un stack DTC</h2>
            <p>Un stack DTC europeo con analítica sin consentimiento suele quedar así:</p>
            <ul className={dashList}>
              <li><strong>Shopify, WooCommerce o Magento con analítica sin consentimiento.</strong> La analítica cuenta eventos en cada visita que carga la página, antes del banner e independientemente de lo que se elija en él, sin crear nunca un identificador. Los detalles de instalación están en <Link href="/es/platforms/shopify" className={link}>Sealmetrics para Shopify</Link>.</li>
              <li><strong>Píxeles de Meta y Google Ads detrás del banner.</strong> Siguen necesitando consentimiento, porque usan datos personales para personalizar anuncios. Sealmetrics no envía conversiones a las plataformas, así que las pujas siguen funcionando con esos píxeles.</li>
              <li><strong>Plataforma de email o CRM.</strong> Funciona con el alta explícita en la lista; el seguimiento en la web que añada tiene su propio requisito de consentimiento.</li>
              <li><strong>BigQuery para modelos de marketing mix agregados.</strong> Alimentado con los totales por canal a través del conector de BigQuery, disponible desde el plan Growth.</li>
            </ul>
            <p>
              El efecto neto es que el ROAS agregado por canal se mide en cada visita,
              no solo en las que aceptaron el banner. En Incapto, eso llevó las
              campañas de pago del 50% del tráfico en GA4 al 62% medido en cada visita:
              el tipo de diferencia que decide si un presupuesto de paid media se
              aprueba o hay que defenderlo. Cómo se leen esos ingresos por campaña y
              creatividad se explica en{" "}
              <Link href="/es/use-cases/revenue-attribution" className={link}>atribución de ingresos por campaña</Link>.
            </p>

            <h2 className={h2}>Qué revisa el DPO</h2>
            <p>La revisión habitual de una analítica sin consentimiento comprueba seis puntos:</p>
            <ol className="list-decimal pl-5 space-y-2">
              <li>¿La herramienta guarda algo en el dispositivo? Tiene que ser que no.</li>
              <li>¿Lee algo del dispositivo más allá de las cabeceras HTTP estándar? Tiene que ser que no.</li>
              <li>¿Guarda direcciones IP, IDs de dispositivo o cualquier identificador que vincule vistas entre sesiones? Tiene que ser que no. Un marcador de sesión efímero, en memoria, que caduca con la inactividad es otra cosa: pregunta cómo se calcula y cuánto dura.</li>
              <li>¿Dónde se tratan y se almacenan los datos? Para una marca europea, en la UE; los datos de visitantes de Sealmetrics se alojan en Dublín.</li>
              <li>¿Hay un DPA firmado con el proveedor? Debe haberlo; Sealmetrics lo incluye.</li>
              <li>¿Hay un paquete TPSR (Third-Party Security Review) disponible? Debe haberlo para una compra enterprise.</li>
            </ol>
            <p>
              La documentación que suele pedir un DPO, reunida en un sitio, está en{" "}
              <Link href="/es/gdpr-analytics" className={link}>demostrar cumplimiento</Link>.
            </p>

            <h2 className={h2}>Lo que la analítica sin consentimiento no arregla</h2>
            <p>Es una capa de medición del sitio web. No sustituye:</p>
            <ul className={dashList}>
              <li><strong>Los píxeles publicitarios</strong>, que siguen haciendo falta para optimizar en Meta, TikTok o Google Ads, y siguen necesitando consentimiento.</li>
              <li><strong>El CRM y el seguimiento del email</strong>, que tienen su propia base de consentimiento: el alta explícita de un usuario identificado.</li>
              <li><strong>Las plataformas de datos de clientes (CDP)</strong>, que trabajan con usuarios autenticados, con otra base legal y otro modelo de datos.</li>
            </ul>
            <p>
              Piensa en ella como el sustituto de GA4 para la atribución agregada por
              canal, no como el sustituto del resto del stack de marketing.
            </p>
          </div>

          <CommercialModule
            locale="es"
            hook="Sin consentimiento significa que el banner deja de decidir lo que ve tu dashboard. Mide tu funnel DTC en cada visita, también en las de quien rechaza el banner."
          />

          <section className="mt-16 pt-10 border-t border-warm-100">
            <h2 className="text-[0.75rem] font-medium uppercase tracking-[0.06em] text-text-tertiary mb-5">
              Lecturas relacionadas
            </h2>
            <div className="space-y-4">
              <div>
                <Link href="/es/blog/cookieless-analytics-for-ecommerce" className={`text-[0.95rem] ${link}`}>
                  Cómo mide el eCommerce europeo sus ingresos sin esperar al banner de cookies
                </Link>
                <p className="text-[0.8rem] text-text-tertiary mt-1">10 min de lectura</p>
              </div>
              <div>
                <Link href="/es/blog/gdpr-analytics-without-consent" className={`text-[0.95rem] ${link}`}>
                  Analítica conforme con RGPD sin banners de consentimiento
                </Link>
                <p className="text-[0.8rem] text-text-tertiary mt-1">Regulación</p>
              </div>
              <div>
                <Link href="/es/blog/consent-banner-impact-on-analytics" className={`text-[0.95rem] ${link}`}>
                  Cómo los banners de consentimiento destruyen tus datos
                </Link>
                <p className="text-[0.8rem] text-text-tertiary mt-1">6 min de lectura</p>
              </div>
            </div>
          </section>

          <FaqSection items={FAQ} locale="es" heading="Preguntas de los equipos DTC" />
        </div>
      </article>
    </>
  );
}
