import type { Metadata } from "next";
import { postDates } from "@/lib/content/blog";
import { PostByline } from "@/components/ui/PostByline";
import Link from "next/link";
import { getAlternatesEs } from "@/lib/i18n/navigation";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { QuickAnswer } from "@/components/ui/QuickAnswer";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";
import { CommercialModule } from "@/components/ui/CommercialModule";
import { ogImage } from "@/lib/seo/og";

export const metadata: Metadata = {
  title: "¿Matomo cumple el RGPD?",
  description:
    "Matomo puede funcionar sin banner en Francia bajo los criterios de la CNIL. Qué exige esa configuración, qué te cuesta en medición y dónde no aplica.",
  openGraph: {
    title: "¿Matomo cumple el RGPD?",
    description:
      "Sí, bajo seis condiciones acumulativas — y la exención es francesa, no europea. Lo que la configuración de exención te cuesta en medición.",
    type: "article",
    url: "https://sealmetrics.com/es/blog/is-matomo-gdpr-compliant/",
    siteName: "Sealmetrics",
    locale: "es_ES",
    images: [ogImage("/es/blog/is-matomo-gdpr-compliant/")],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "¿Matomo cumple el RGPD?",
    description:
      "Sí, bajo seis condiciones acumulativas — y la exención es francesa, no europea. Lo que la configuración de exención te cuesta en medición.",
    images: [ogImage("/es/blog/is-matomo-gdpr-compliant/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/es/blog/is-matomo-gdpr-compliant/",
    languages: getAlternatesEs("/blog/is-matomo-gdpr-compliant"),
  },
};

const linkCls =
  "text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors";

export default function Page() {
  const dates = postDates("is-matomo-gdpr-compliant", "es");

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Blog", href: "/es/blog" },
          { label: "¿Matomo cumple el RGPD?" },
        ]}
      />
      <JsonLd
        data={articleSchema({
          headline: "¿Matomo cumple el RGPD?",
          description:
            "Matomo puede operar sin banner de cookies bajo los criterios de exención de la CNIL, con las cookies todavía activadas. Qué exigen las seis condiciones, qué cuesta esa configuración en medición y por qué la exención no viaja a Alemania.",
          ...dates,
          url: "/es/blog/is-matomo-gdpr-compliant",
          category: "Regulación",
          author: {
            name: "Rafa Jiménez",
            url: "/es/authors/rafa-jimenez",
            jobTitle: "Fundador, Sealmetrics",
          },
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Blog", url: "/es/blog" },
          {
            name: "¿Matomo cumple el RGPD?",
            url: "/es/blog/is-matomo-gdpr-compliant",
          },
        ])}
      />

      <article className="pt-12 pb-28 bg-white">
        <div className="max-w-[936px] mx-auto px-5 sm:px-8">
          <header className="mb-12">
            <span className="inline-block text-[0.75rem] font-medium tracking-[0.08em] uppercase text-text-tertiary mb-4">
              Regulación
            </span>
            <h1 className="font-serif text-[2.5rem] font-medium text-text-primary leading-[1.2] mb-6">
              ¿Matomo cumple el RGPD?
            </h1>
            <PostByline
              {...dates}
              readTime="9 min de lectura"
              authorName="Rafa Jiménez"
              authorUrl="/es/authors/rafa-jimenez"
              locale="es"
            />
          </header>

          <QuickAnswer>
            Sí — y a diferencia de casi toda la analítica basada en cookies,
            Matomo puede operar sin banner de consentimiento con las cookies
            todavía activadas. La CNIL francesa publica criterios bajo los cuales
            la medición de audiencia queda exenta de consentimiento, y un Matomo
            bien configurado los cumple. Seis condiciones tienen que darse a la
            vez: la herramienta sirve solo para medir audiencia, el dato no se
            cruza con otros tratamientos, no se cede nada a terceros, las IP se
            anonimizan, la cookie no vive más de 13 meses y la retención no pasa
            de 25. Matomo incluye un modo de configuración CNIL en su propia
            interfaz. Dos cosas suelen faltar en esta respuesta. La primera: la
            exención es francesa. El §25 de la TDDDG alemana no reconoce nada
            equivalente, así que la misma configuración sigue necesitando banner
            allí. La segunda: esa configuración no es gratis — te cuesta el
            reconocimiento de visitante recurrente, la frecuencia de visita, la
            atribución de campaña multi-sesión y las cohortes, porque sin
            identificador duradero Matomo cae a un hash que caduca en unos 30
            minutos.
          </QuickAnswer>

          <div className="space-y-6 text-[1.05rem] leading-[1.8] text-text-body mt-12">
            <h2 className="font-serif text-[1.6rem] font-medium text-text-primary mt-12 mb-4">
              Son dos leyes, y Matomo activa las dos
            </h2>
            <p>
              «Cumple el RGPD» es la frase que usa todo el mundo, pero el RGPD por
              sí solo nunca decide si necesitas banner de cookies. Se aplican dos
              instrumentos de forma independiente, y confundirlos es de donde
              salen casi todas las respuestas malas de proveedor.
            </p>
            <p>
              La Directiva ePrivacy regula almacenar información en el
              dispositivo del visitante, o leerla de él. Su artículo 5(3) aplica
              sea o no personal el dato almacenado: un identificador puramente
              técnico también cuenta. El RGPD regula el tratamiento de datos
              personales, vengan de donde vengan. En su instalación por defecto,
              Matomo activa los dos: escribe cookies de primera parte y trata
              direcciones IP que son dato personal mientras no se truncan. Si
              quieres el detalle del test en dos partes, está en el{" "}
              <Link href="/es/glossary/gdpr-analytics-compliance" className={linkCls}>
                glosario de cumplimiento RGPD en analítica
              </Link>
              .
            </p>
            <p>
              Así que la forma honesta de la pregunta no es «¿cumple Matomo?»,
              sino «bajo qué configuración, en qué país y a costa de qué en los
              números».
            </p>

            <h2 className="font-serif text-[1.6rem] font-medium text-text-primary mt-12 mb-4">
              La vía CNIL: sin banner y con cookies puestas
            </h2>
            <p>
              Esta es la parte que sorprende, incluida mucha gente que vende
              contra Matomo. La exención francesa no te obliga a apagar las
              cookies. Te obliga a que esas cookies sean inofensivas de una forma
              concreta y enumerada. La CNIL publica criterios de medición de
              audiencia exenta de consentimiento desde 2020, y la actualización
              de julio de 2025 refrescó la auto-evaluación que hay detrás.
            </p>
            <p>
              Seis condiciones, y van juntas. La finalidad tiene que ser
              exclusivamente medir audiencia — nada de segmentación publicitaria,
              perfilado ni personalización de contenido. El dato no puede cruzarse
              con otros tratamientos. No puede cederse nada a terceros. Las IP se
              anonimizan. La cookie no vive más de 13 meses y el dato bruto no se
              retiene más de 25. Falla una y el consentimiento vuelve a ser
              obligatorio para todo el despliegue.
            </p>
            <p>
              En la práctica, configurar Matomo para esto significa desactivar el
              fingerprint de dispositivo, desactivar los perfiles de usuario,
              desactivar los plugins de Heatmaps y Session Recording, truncar los
              dos últimos octetos de la IP, anonimizar User ID y Order ID, y fijar
              las ventanas de retención de forma explícita. Matomo ofrece un modo
              de cumplimiento CNIL en la interfaz que aplica buena parte de eso, lo
              cual es más de lo que dan casi todos sus competidores.
            </p>
            <p>
              Un cambio estructural que conviene conocer: la CNIL retiró su lista
              publicada de soluciones exentas el 1 de enero de 2026. Los criterios
              siguen idénticos — lo que desapareció es el sello oficial. Ahora los
              proveedores se auto-evalúan contra los mismos requisitos, lo que
              traslada la carga de evidenciar la configuración a ti y a tu
              proveedor, en vez de a una insignia en la web del regulador.
            </p>

            <h2 className="font-serif text-[1.6rem] font-medium text-text-primary mt-12 mb-4">
              Qué te cuesta la configuración de exención
            </h2>
            <p>
              El cumplimiento es la parte que se discute. La factura en medición
              llega después.
            </p>
            <p>
              Con las cookies limitadas o desactivadas, Matomo identifica una
              visita mediante <code className="font-mono text-[0.9em]">config_id</code>, un
              hash de atributos de entorno. Y aquí hay que darle crédito: Matomo
              diseñó <code className="font-mono text-[0.9em]">config_id</code>{" "}
              deliberadamente para <em>no</em> ser permanente, <em>no</em>{" "}
              reconocer visitantes recurrentes y <em>no</em> permitir seguimiento
              entre sitios. Es un diseño genuinamente más protector que el
              fingerprinting con el que se le confunde a menudo. Pero la propiedad
              que lo hace defendible es la que lo deja corto de vista, y de forma
              bastante literal: la ventana por defecto ronda los 30 minutos, y 24
              horas como techo.
            </p>
            <p>
              Las consecuencias son concretas, no genéricas. Páginas vistas,
              eventos, descargas, outlinks y búsqueda interna pasan intactos. Lo
              que se degrada es el conteo de recurrentes, la frecuencia de visita,
              la atribución de campaña multi-sesión, el análisis de cohortes y los
              informes multicanal. Un visitante que llega por una campaña de pago
              por la mañana y convierte desde un email por la tarde son dos
              visitantes sin relación. Para un sitio de contenidos es un error de
              redondeo. Para un eCommerce con ciclo de compra reflexiva, es la
              diferencia entre saber qué canal genera ingresos y suponerlo. La{" "}
              <Link href="/es/glossary/cookieless-analytics" className={linkCls}>
                analítica sin cookies
              </Link>{" "}
              no tiene por qué implicar esta pérdida, pero en Matomo sí la implica.
            </p>
            <p>
              Este es el intercambio que la conversación de compliance se salta, y
              vale la pena ponerle una cifra en tu propio sitio antes de dar por
              hecho que es pequeña. Nuestra{" "}
              <Link href="/es/data-loss-calculator" className={linkCls}>
                calculadora de pérdida de datos
              </Link>{" "}
              modela la distancia entre el tráfico que recibes y el que tu
              configuración actual llega a atribuir.
            </p>

            <h2 className="font-serif text-[1.6rem] font-medium text-text-primary mt-12 mb-4">
              La exención es francesa, no europea
            </h2>
            <p>
              ePrivacy es una directiva, no un reglamento: cada estado miembro la
              traspuso a su derecho nacional y las versiones nacionales difieren.
              Este es el error más repetido en los claims de cumplimiento en
              analítica — proveedores y compradores tratan una respuesta francesa
              como si fuera europea.
            </p>
            <p>
              Alemania traspuso el artículo 5(3) como §25 de la TDDDG (la ley pasó
              a llamarse así en mayo de 2024; el número de artículo no cambió), y
              no reconoce ninguna excepción de medición de audiencia equivalente a
              la de la CNIL. Hace falta consentimiento para almacenar o leer
              cualquier cosa en el dispositivo que no sea estrictamente necesaria
              para un servicio que el usuario ha pedido, y la analítica no lo es.
              Un Matomo configurado exactamente según los criterios CNIL,
              desplegado en un sitio alemán, sigue necesitando banner. La DSK
              alemana sí acepta que las herramientas que no dejan nada en el
              dispositivo y no tratan dato personal quedan fuera del requisito —
              pero eso es otra arquitectura, no otra configuración.
            </p>
            <p>
              Si operas en varios mercados de la UE, la pregunta práctica es para
              cuál estás configurando, y si estás dispuesto a mantener posturas de
              consentimiento distintas por país.
            </p>

            <h2 className="font-serif text-[1.6rem] font-medium text-text-primary mt-12 mb-4">
              Qué cambiaría el Digital Omnibus
            </h2>
            <p>
              El 19 de noviembre de 2025 la Comisión Europea publicó la COM(2025)
              837, el Digital Omnibus. Tal como está redactada, sacaría las reglas
              sobre el equipo terminal de ePrivacy y las metería en el RGPD bajo un
              nuevo artículo 88a, eximiendo de consentimiento la medición de
              audiencia agregada, first-party y de uso propio del responsable en
              toda la Unión.
            </p>
            <p>
              Si se adopta en algo parecido a esa forma, un Matomo en configuración
              de exención encajaría en todas partes y no solo en Francia: la
              excepción francesa generalizada, no eliminada. Eso mejora de verdad la
              posición de Matomo, y fingir lo contrario sería deshonesto. Van dos
              matices con ello. Es una propuesta, no una norma: el Parlamento y el
              Consejo todavía tienen que acordar un texto, las enmiendas
              sustantivas son probables y la adopción realista es 2027–2028. Y no
              cambia nada del coste en medición de más arriba: una configuración
              exenta de consentimiento sigue sin poder reconocer a un visitante
              recurrente, sea cual sea el instrumento legal que la bendiga.
            </p>

            <h2 className="font-serif text-[1.6rem] font-medium text-text-primary mt-12 mb-4">
              La alternativa arquitectónica
            </h2>
            <p>
              Hay una segunda vía al mismo sitio, y es la que no depende de
              sostener una configuración correcta en el tiempo. Si una herramienta
              no escribe nada en el dispositivo ni lee nada de él, el artículo 5(3)
              no llega a activarse. Si no trata dato personal, la pregunta del
              consentimiento bajo RGPD tampoco se plantea. El cumplimiento deja de
              ser un ajuste que tu equipo tiene que mantener y demostrar, y pasa a
              ser una propiedad de cómo se recoge el dato.
            </p>
            <p>
              Esa es la base de la{" "}
              <Link href="/es/consentless-analytics" className={linkCls}>
                analítica sin consentimiento
              </Link>
              , y por eso el problema de cobertura no reaparece: no hay banner que
              rechazar ni configuración exenta contra la que cambiar features. Los
              límites son reales y conviene decirlos sin rodeos — sin análisis a
              nivel individual, sin costura entre sesiones, sin activación de
              audiencias, porque todo eso necesita exactamente los identificadores
              que no se están recogiendo. Si lo que buscas son las diferencias de
              producto y no las legales, la{" "}
              <Link href="/es/vs/matomo" className={linkCls}>
                comparativa cara a cara con Matomo
              </Link>{" "}
              cubre hosting, operación y paridad de informes.
            </p>

            <h2 className="font-serif text-[1.6rem] font-medium text-text-primary mt-12 mb-4">
              Entonces, ¿cumple?
            </h2>
            <p>
              Sí, con condiciones, y Matomo es de las herramientas mejor
              comportadas de su categoría. Es open source, es self-hosteable, no
              muestrea tus datos, publica su guía de configuración, y su enfoque de
              identificación de visitante es más protector que la norma del sector.
              Si tu sitio es de contenidos, tu mercado es Francia y la medición a
              nivel de sesión responde a tus preguntas, un Matomo en configuración
              de exención es una elección razonable.
            </p>
            <p>
              La pregunta que sobrevive a la del cumplimiento es qué te puede seguir
              contando esa configuración conforme. Una herramienta que es lícita en
              un estado miembro, necesita banner en otro, y no puede conectar una
              visita del martes con la compra de esa misma persona el jueves está
              respondiendo una pregunta más estrecha de la que la mayoría de equipos
              de eCommerce cree estar comprando. Eso no es un defecto de Matomo. Es
              el precio de llegar al cumplimiento por configuración en vez de por
              arquitectura.
            </p>
            <p className="text-[0.95rem] text-text-tertiary pt-4">
              Este artículo analiza cómo la tecnología interactúa con la norma; no
              es asesoramiento legal. La conclusión para tu despliegue concreto la
              firma tu DPO o tu asesoría.
            </p>
          </div>

          <CommercialModule
            locale="es"
            hook="Si la configuración conforme de Matomo es justo la que deja de reconocer visitantes recurrentes, el trato es medición a cambio de papeleo. Mira cómo se ve la medición sin banner y sin pérdida por consentimiento sobre tu propio tráfico."
          />

          <div className="mt-16 pt-10 border-t border-warm-100">
            <h3 className="font-serif text-[1.1rem] font-medium text-text-primary mb-4">
              Sigue leyendo
            </h3>
            <div className="space-y-3">
              <Link
                href="/es/blog/gdpr-eprivacy-analytics-legal-assessment"
                className="block text-[0.9rem] text-text-secondary no-underline hover:text-text-primary transition-colors"
              >
                ¿Tu analítica cumple de verdad el RGPD? Un análisis legal
              </Link>
              <Link
                href="/es/blog/gdpr-analytics-without-consent"
                className="block text-[0.9rem] text-text-secondary no-underline hover:text-text-primary transition-colors"
              >
                Analítica conforme con RGPD sin banners
              </Link>
              <Link
                href="/es/vs/matomo"
                className="block text-[0.9rem] text-text-secondary no-underline hover:text-text-primary transition-colors"
              >
                Sealmetrics vs Matomo
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
