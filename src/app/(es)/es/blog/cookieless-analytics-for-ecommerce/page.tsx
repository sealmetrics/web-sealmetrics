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

const SLUG = "cookieless-analytics-for-ecommerce";
const URL = `/es/blog/${SLUG}`;
const HEADLINE = "Cómo mide el eCommerce europeo sus ingresos sin esperar al banner de cookies";
const DESCRIPTION =
  "Cómo mide un eCommerce europeo visitas, pedidos e ingresos por canal sin cookies ni seguimiento de usuarios, y cómo lo contrasta con Shopify, WooCommerce o Magento.";
const SOCIAL =
  "Recuentos agregados y anónimos, atribuidos a último clic al canal de cada conversión y contrastados con los pedidos reales de la tienda. Sin cookies.";

export const metadata: Metadata = {
  title: "Analítica sin cookies para eCommerce: guía 2026",
  description:
    "Cómo mide un eCommerce europeo pedidos e ingresos por canal sin cookies ni seguimiento de usuarios, y cómo lo contrasta con Shopify, WooCommerce o Magento.",
  openGraph: {
    title: "Analítica sin cookies para eCommerce: guía 2026",
    description: SOCIAL,
    type: "article",
    images: [ogImage("/blog/cookieless-analytics-for-ecommerce/")],
    url: `https://sealmetrics.com${URL}/`,
    siteName: "Sealmetrics",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Analítica sin cookies para eCommerce: guía 2026",
    description: SOCIAL,
    images: [ogImage("/blog/cookieless-analytics-for-ecommerce/")],
  },
  alternates: {
    canonical: `https://sealmetrics.com${URL}/`,
    languages: getAlternates(`/blog/${SLUG}`),
  },
};

const FAQ = [
  {
    question: "¿Qué es la analítica sin cookies para eCommerce?",
    answer:
      "Es una forma de medir visitas, añadidos al carrito, inicios de checkout y compras sin cookies, sin almacenamiento en el dispositivo y sin identificadores personales. Cada conversión se atribuye a último clic al origen de la sesión en la que se produce, y los totales agregados se contrastan con los pedidos de Shopify, WooCommerce o Magento, sin seguir a ningún usuario.",
  },
  {
    question: "¿Sigue a cada cliente entre sesiones?",
    answer:
      "No. Sealmetrics no identifica visitantes, no une páginas vistas en recorridos individuales ni construye perfiles de comportamiento. La medición es agregada: recuentos por canal, campaña, página de llegada y país. Evitar los datos personales desde la arquitectura acorta la revisión legal, pero conviene confirmarla con tu DPO; Sealmetrics incluye un DPA y un paquete TPSR para esa revisión.",
  },
  {
    question: "¿Cómo atribuye ingresos sin recorridos de usuario?",
    answer:
      "Con último clic dentro de la sesión. La conversión se acredita al origen de la sesión en la que se dispara, es decir, a la entrada más reciente, y la sesión se cierra tras unas dos horas de inactividad. Los totales se agregan por canal: por ejemplo, 42 conversiones atribuidas a Google Ads esta semana. No hay modelo multi-touch, ni ventana de lookback, ni unión con visitas anteriores.",
  },
  {
    question: "¿Funciona con Shopify?",
    answer:
      "Sí, en cualquier plan de Shopify que permita app embeds: se conecta la app Sealmetrics Pixel y se activa el app embed del tema. La compra se confirma en servidor con el webhook orders/create de Shopify. En la medición en paralelo de Incapto, durante 48 días, Sealmetrics registró el 96% de los pedidos reales de la tienda online y el 97% de la facturación.",
  },
  {
    question: "¿Y si mi tienda está en WooCommerce o Magento?",
    answer:
      "WooCommerce tiene un plugin de WordPress que envía el funnel completo y la compra desde la página de confirmación del pedido. Magento 2.4+ y Adobe Commerce tienen un módulo con seguimiento de producto, carrito, checkout y compra. En cualquier otra plataforma se instala el tracker y se lanza la conversión en la página de confirmación.",
  },
  {
    question: "¿Tengo que dejar GA4?",
    answer:
      "No. La mayoría de equipos usan Sealmetrics junto a GA4 durante un ciclo comercial completo para comparar cifras; la comparación de Incapto duró 48 días. Después, muchos mantienen GA4 como vía de conversiones hacia Google Ads y usan Sealmetrics como referencia para las decisiones de ingresos por canal.",
  },
];

const link =
  "text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors";
const dashList =
  "space-y-2 list-none pl-0 [&>li]:relative [&>li]:pl-6 [&>li]:before:content-['—'] [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:text-text-tertiary";
const h2 = "font-serif text-[1.5rem] font-medium text-text-primary mt-10 mb-4";

export default function CookielessAnalyticsForEcommercePageEs() {
  const dates = postDates(SLUG, "es");

  return (
    <>
      <Breadcrumbs items={[{ label: "Blog", href: "/es/blog" }, { label: "Analítica sin cookies para eCommerce" }]} locale="es" />
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
      <JsonLd data={breadcrumbSchema([{ name: "Blog", url: "/es/blog" }, { name: "Analítica sin cookies para eCommerce", url: URL }])} />
      <JsonLd data={faqPageSchema(FAQ, URL)} />
      <JsonLd data={speakableWebPageSchema({ url: URL, name: HEADLINE, selectors: [".key-takeaways", ".tldr"] })} />

      <article className="pt-12 pb-28 bg-white">
        <div className="max-w-[936px] mx-auto px-5 sm:px-8">
          <header className="mb-12">
            <span className="inline-block text-[0.75rem] font-medium tracking-[0.08em] uppercase text-text-tertiary mb-4">
              eCommerce
            </span>
            <h1 className="font-serif text-[2.5rem] font-medium text-text-primary leading-[1.2] mb-6">
              {HEADLINE}
            </h1>
            <PostByline
              {...dates}
              readTime="10 min de lectura"
              authorName="Rafa Jiménez"
              authorUrl="/es/authors/rafa-jimenez"
              locale="es"
            />
          </header>

          <p className="tldr mb-12 text-[1.15rem] leading-[1.7] text-text-secondary font-serif italic">
            Un eCommerce europeo pierde a los visitantes que rechazan el banner de
            cookies y, con ellos, la foto por canal de la que depende su
            presupuesto. La analítica sin cookies cuenta visitas y pedidos sin
            guardar nada en el dispositivo, atribuye los ingresos a último clic por
            canal y se puede contrastar con los pedidos de la propia tienda: en la
            tienda Shopify de Incapto, GA4 no registró el 29% de las visitas y
            Sealmetrics registró el 96% de los pedidos reales.
          </p>

          <div className="key-takeaways mb-12 p-6 bg-warm-white border border-warm-100 rounded-[4px]">
            <h2 className="font-serif text-[1rem] font-medium text-text-primary mb-3">Conclusiones clave</h2>
            <ul className={`text-[0.9rem] leading-[1.7] text-text-secondary ${dashList}`}>
              <li>El rechazo del consentimiento, los ad-blockers y las restricciones de Safari se suman. Medido en una tienda Shopify real durante 48 días, GA4 no registró el 29% de las visitas ni el 45% de las páginas vistas; en el peor caso compuesto de nuestro modelo, GA4 se queda con un 13%.</li>
              <li>La analítica sin cookies cuenta eventos de forma anónima, sin identificadores ni seguimiento individual, y atribuye cada conversión a último clic por canal.</li>
              <li>Como no guarda ni lee nada en el dispositivo, la regla de ePrivacy sobre almacenamiento y acceso no tiene a qué aplicarse. Que tu analítica quede exenta de consentimiento depende de tu configuración y de los criterios de tu autoridad nacional.</li>
              <li>La prueba que importa es el backend: en la medición en paralelo de Incapto, Sealmetrics registró el 96% de los pedidos reales de Shopify y el 97% de la facturación.</li>
              <li>Se instala junto a GA4 y se compara durante un ciclo comercial completo, sin migración.</li>
            </ul>
          </div>

          <div className="space-y-6 text-[1.05rem] leading-[1.8] text-text-body">
            <p>
              Si llevas un eCommerce en Europa, conoces alguna versión de esta
              reunión. Meta Ads se atribuye 340 conversiones, GA4 enseña 120 y
              Shopify registró 180 pedidos. Finanzas pregunta cuál es la buena. La
              agencia defiende la de marketing. Tú no puedes defender ninguna, porque
              no cuadran entre sí, y la decisión se aplaza otra semana.
            </p>
            <p>
              No es un problema del eCommerce, sino de{" "}
              <Link href="/es/glossary/cookieless-analytics" className={link}>arquitectura de medición</Link>.
              Una analítica basada en cookies no ve a quien rechaza el banner ni a
              quien bloquea la etiqueta, así que los totales por canal que reporta no
              pueden cuadrar con el backend. La solución no es un banner más
              persuasivo ni un modelo de atribución más sofisticado: es dejar de
              depender de las cookies y dejar de intentar seguir a personas. La visión
              general está en la guía de{" "}
              <Link href="/es/cookieless-analytics" className={link}>analítica sin cookies</Link>;
              este artículo es su lectura para una tienda online.
            </p>

            <h2 className={h2}>Las tres capas de pérdida de datos en un eCommerce</h2>
            <p>
              La analítica de una tienda pierde eventos en tres etapas sucesivas, y el
              efecto es multiplicativo: cada capa se aplica sobre lo que dejó la
              anterior. Los porcentajes de este apartado son los supuestos de nuestro
              modelo del peor caso, no una medición de tu tienda.
            </p>
            <p>
              <strong>Capa 1: rechazo del consentimiento (55% en el modelo).</strong>{" "}
              Una parte grande de los visitantes europeos rechaza el banner, y esa
              parte cambia según el mercado y el diseño del banner. Si lo rechazan,
              GA4 no escribe su cookie y la visita no se mide. Para una marca que
              lleva tráfico de pago a una tienda Shopify, aquí es donde viven la
              mayoría de las conversiones invisibles.
            </p>
            <p>
              <strong>Capa 2: ad-blockers (40% de lo que queda, en el modelo).</strong>{" "}
              uBlock Origin, AdBlock Plus, Brave Shields o la protección reforzada de
              Firefox bloquean las peticiones a google-analytics.com. La etiqueta no
              se dispara y los añadidos al carrito no llegan. Sumado al rechazo del
              consentimiento, la pérdida se compone.
            </p>
            <p>
              <strong>Capa 3: restricciones del navegador.</strong> Incluso quien
              acepta las cookies no las conserva mucho tiempo.{" "}
              <Link href="/es/glossary/intelligent-tracking-prevention" className={link}>ITP</Link>,
              en Safari, limita a 7 días las cookies first-party que se escriben por
              JavaScript, y a 24 horas cuando la página llegó con parámetros de
              seguimiento en la URL. Una herramienta basada en cookies pierde el
              origen y una conversión posterior aparece como &ldquo;directo&rdquo;.
            </p>
            <p>
              En el peor caso compuesto del modelo, 100 visitas reales se quedan en
              unas 45 tras el consentimiento, 27 tras los ad-blockers y 13 tras las
              restricciones del navegador; las cuentas están en{" "}
              <Link href="/es/blog/why-ga4-shows-13pct-eu-traffic" className={link}>por qué GA4 puede ver solo el 13% de tu tráfico</Link>.
              Una tienda medida es menos extrema, pero igual de desigual: con las dos
              herramientas funcionando a la vez en la{" "}
              <Link href="/es/case-studies/incapto" className={link}>tienda Shopify de Incapto</Link>{" "}
              durante 48 días, GA4 no registró el 29% de las visitas, y las campañas
              de pago perdieron entre tres y cinco veces más tráfico que el directo.
            </p>

            <h2 className={h2}>Cómo lo resuelve la analítica sin cookies, sin seguir a nadie</h2>
            <p>
              La analítica sin cookies sustituye esa cascada por otra arquitectura.
              Conviene decir primero lo que <em>no</em> hace: no identifica
              visitantes, no une páginas vistas en recorridos individuales y no
              construye perfiles. Cuenta eventos, y nada más.
            </p>
            <p>
              <strong>1. Recogida first-party.</strong> Un script de seguimiento
              pequeño que, si quieres, se sirve desde un subdominio de tu propio
              dominio en lugar de un endpoint de terceros. Los ad-blockers trabajan
              sobre todo con listas de dominios de seguimiento conocidos, así que una
              petición first-party es mucho menos probable que se bloquee. Cada vista
              registra metadatos anónimos: referrer, UTM, página de llegada, país y
              tipo de dispositivo.
            </p>
            <p>
              <strong>2. Recuentos agregados y anónimos.</strong> Los eventos se
              agregan en servidor —vistas, conversiones, ingresos— por canal, campaña
              y página de llegada. En ningún momento una vista queda vinculada a una
              persona o a un dispositivo concreto: no hay identificador entre
              sesiones ni concepto de &ldquo;usuario recurrente&rdquo;.
            </p>
            <p>
              <strong>3. Último clic dentro de la sesión.</strong> La conversión se
              acredita al origen de la sesión en la que se dispara, y la sesión se
              cierra tras unas dos horas de inactividad. Si el visitante llegó desde
              Google Ads tres días antes, esa visita contó en el total de Google Ads,
              pero no se une a la conversión posterior. Cada sesión cuenta por sí
              misma y lo que se agrega son los totales por canal.
            </p>
            <p>
              <strong>4. Nada en el dispositivo que consentir.</strong> Como no se
              guarda ni se lee nada en el dispositivo del visitante, la regla de la
              Directiva ePrivacy sobre almacenamiento y acceso no tiene a qué
              aplicarse. Que tu configuración quede exenta de consentimiento depende
              de los criterios de tu autoridad; donde lo está, el hueco del rechazo
              desaparece porque no hay nada que rechazar.
            </p>

            <h2 className={h2}>Qué cambia para el equipo de eCommerce</h2>
            <ul className={dashList}>
              <li><strong>Los totales cuadran con el backend.</strong> En los 48 días de medición en paralelo de Incapto, Sealmetrics registró el 96% de los pedidos reales de Shopify y el 97% de la facturación, así que el reparto por canal que se construye encima es fiable.</li>
              <li><strong>Sin muestreo en Black Friday.</strong> Sealmetrics no muestrea a partir de umbrales de volumen, así que las decisiones del día pico se toman con recuentos reales.</li>
              <li><strong>Microconversiones visibles.</strong> Añadidos al carrito, inicios de checkout y envíos de formularios se cuentan en cada sesión que carga el tracker, no solo en las que aceptaron el banner.</li>
              <li><strong>Cifras que finanzas puede firmar.</strong> Una arquitectura sin datos personales ni identificadores y unos ingresos agregados que cuadran con el backend permiten cerrar el reparto por canal sin una reunión de tres horas. Es el mismo razonamiento que en{" "}<Link href="/es/use-cases/single-source-of-truth" className={link}>una sola cifra para marketing y finanzas</Link>.</li>
            </ul>

            <h2 className={h2}>A qué renuncias, a propósito</h2>
            <p>La medición agregada y anónima tiene contrapartidas, y conviene tenerlas claras:</p>
            <ul className={dashList}>
              <li><strong>Sin informes de recorrido por usuario.</strong> No verás &ldquo;el cliente X vio el anuncio, volvió tres veces y compró&rdquo;. Esos informes necesitan cookies e identificadores personales.</li>
              <li><strong>Sin atribución multi-touch.</strong> Solo último clic. Si tu modelo necesita repartir el mérito entre varios puntos de contacto de la misma persona, esta no es la herramienta.</li>
              <li><strong>Sin reconocer al visitante que vuelve.</strong> El sistema no sabe si una visita es la primera o la quinta. Para decidir presupuesto por canal casi nunca importa: lo que reparte la inversión es el ROAS agregado por canal.</li>
              <li><strong>Conciliación sobre totales.</strong> Los ID de pedido no se guardan, así que se comparan totales y canales con la tienda, nunca pedido a pedido.</li>
            </ul>
            <p>
              El intercambio es deliberado: se renuncia a la ilusión del detalle por
              usuario, que GA4 solo ofrece sobre la parte de tu tráfico que aceptó las
              cookies, a cambio de totales defendibles que no dependen del consentimiento.
            </p>

            <h2 className={h2}>Implantación: lo que de verdad lleva</h2>
            <p>En una tienda Shopify, WooCommerce o Magento estándar, los pasos son estos:</p>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Instala la integración de tu plataforma: la app y el app embed en <Link href="/es/platforms/shopify" className={link}>Shopify</Link>, el plugin de <Link href="/es/platforms/woocommerce" className={link}>WooCommerce</Link> o el módulo de Magento 2.4+. En cualquier otra plataforma, el tracker y una llamada de conversión en la página de confirmación.</li>
              <li>Comprueba los eventos del funnel y haz un pedido de prueba. En Shopify la compra llega en servidor por webhook; en WooCommerce y Magento se envía desde la página de confirmación del pedido.</li>
              <li>Mantén GA4 en paralelo durante un ciclo comercial completo. La comparación de Incapto duró 48 días.</li>
              <li>Compara la facturación agregada con el backend en el mismo periodo, zona horaria y moneda, dejando fuera los pedidos sin sesión web detrás, como los de tienda física, borradores o marketplaces.</li>
              <li>Solo entonces compara canales: el reparto por canal merece la pena leerlo cuando los totales ya cuadran con los pedidos.</li>
            </ol>
            <p>
              No hay migración. GA4 sigue funcionando para importar conversiones en
              Google Ads, y Sealmetrics pasa a ser la referencia para las decisiones
              por canal.
            </p>

            <h2 className={h2}>Para quién no es</h2>
            <p>
              El valor de la analítica sin cookies crece con el tamaño de las
              decisiones de reparto por canal. Si un hueco como el que se midió en
              Incapto —el 29% de las visitas sin registrar, y las campañas de pago
              infravaloradas entre tres y cinco veces más que el tráfico directo— no
              cambiaría adónde va tu presupuesto, cambiar de analítica aporta poco.
            </p>
            <p>
              Si tu equipo depende del análisis de recorridos por usuario o de modelos
              multi-touch, tampoco es un sustituto directo. Es otra categoría de
              medición —agregada, anónima y defendible—, y esa contrapartida es de
              diseño.
            </p>
          </div>

          <CommercialModule
            locale="es"
            hook="¿Meta dice 340, Shopify 180 y GA4 120? En la demo contrastamos tus cifras con los pedidos reales de tu tienda, en directo."
          />

          <section className="mt-16 pt-10 border-t border-warm-100">
            <h2 className="text-[0.75rem] font-medium uppercase tracking-[0.06em] text-text-tertiary mb-5">
              Lecturas relacionadas
            </h2>
            <div className="space-y-4">
              <div>
                <Link href="/es/blog/consentless-analytics-for-dtc" className={`text-[0.95rem] ${link}`}>
                  Cómo miden las marcas DTC los ingresos de paid media sin esperar al banner
                </Link>
                <p className="text-[0.8rem] text-text-tertiary mt-1">7 min de lectura</p>
              </div>
              <div>
                <Link href="/es/blog/why-ga4-shows-13pct-eu-traffic" className={`text-[0.95rem] ${link}`}>
                  Por qué GA4 puede ver solo el 13% de tu tráfico UE
                </Link>
                <p className="text-[0.8rem] text-text-tertiary mt-1">Calidad del dato</p>
              </div>
              <div>
                <Link href="/es/case-studies/incapto" className={`text-[0.95rem] ${link}`}>
                  Incapto: lo que GA4 no estaba enseñando
                </Link>
                <p className="text-[0.8rem] text-text-tertiary mt-1">Caso de éxito</p>
              </div>
            </div>
          </section>

          <FaqSection items={FAQ} locale="es" heading="Preguntas de los equipos de eCommerce" />
        </div>
      </article>
    </>
  );
}
