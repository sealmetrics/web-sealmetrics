import type { Metadata } from "next";
import { postDates } from "@/lib/content/blog";
import { PostByline } from "@/components/ui/PostByline";
import Link from "next/link";
import { getAlternates } from "@/lib/i18n/navigation";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { articleSchema, breadcrumbSchema, faqPageSchema } from "@/lib/schema";
import { CommercialModule } from "@/components/ui/CommercialModule";
import { ogImage } from "@/lib/seo/og";

export const metadata: Metadata = {
  title: "Analítica RGPD en España: FAQ para tiendas online",
  description:
    "Siete preguntas frecuentes sobre analítica RGPD en tiendas online españolas: AEPD, banners de cookies, GA4, sanciones LSSI y cómo medir sin cookies.",
  openGraph: {
    title: "Analítica RGPD en España: las 7 preguntas que hacen las tiendas online",
    description:
      "¿Necesita tu tienda online un banner de cookies para la analítica? ¿Es legal GA4 en España? ¿Qué permite la AEPD? Respuestas directas, una por pregunta.",
    type: "article",
    images: [ogImage("/es/blog/gdpr-analytics-spain-faq/")],
    url: "https://sealmetrics.com/es/blog/gdpr-analytics-spain-faq/",
    siteName: "Sealmetrics",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Analítica RGPD en España: las 7 preguntas que hacen las tiendas online",
    description: "¿Necesita tu tienda online un banner de cookies para la analítica? ¿Es legal GA4 en España? ¿Qué permite la AEPD? Respuestas directas, una por pregunta.",
    images: [ogImage("/es/blog/gdpr-analytics-spain-faq/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/es/blog/gdpr-analytics-spain-faq/",
    languages: getAlternates("/blog/gdpr-analytics-spain-faq"),
  },
};

const faqs = [
  {
    question: "¿Necesita mi tienda online un banner de cookies para la analítica?",
    answer:
      "No — si la herramienta de analítica no coloca cookies y no trata datos personales. El banner solo es legalmente obligatorio cuando la medición almacena algo en el dispositivo (una cookie, localStorage) o trata datos personales como la dirección IP. La guía de cookies de la AEPD exime la medición de audiencia anónima y agregada sin seguimiento entre sitios. Con analítica cookieless como Sealmetrics no se requiere banner para medir; si además usas cookies de marketing, esas siguen necesitando su propio consentimiento.",
  },
  {
    question: "¿Qué dice la AEPD sobre las cookies de analítica?",
    answer:
      "La AEPD (guía de cookies, actualizada en 2024) considera que las cookies de analítica requieren consentimiento previo, con una exención práctica: las herramientas que hacen medición de audiencia anónima y agregada — sin cruzar datos entre sitios ni identificar al visitante — pueden operar sin consentimiento. Rechazar debe ser tan fácil como aceptar, y los muros de cookies no son válidos. La base legal está en el artículo 22.2 de la LSSI-CE, la transposición española de la Directiva ePrivacy.",
  },
  {
    question: "¿Es legal usar Google Analytics 4 en España?",
    answer:
      "Sí, con consentimiento. GA4 coloca cookies y trata datos personales (client ID, localización por IP), así que requiere banner y consentimiento previo bajo la LSSI-CE y el RGPD. La consecuencia práctica: entre el 35% y el 55% de los visitantes rechaza el banner, y si a eso se suman ad blockers y restricciones de navegador, en el peor escenario GA4 puede quedarse en torno al 13% del tráfico UE real. En una tienda Shopify real medida durante 48 días, GA4 con Consent Mode no registró el 29% de las visitas. Legal con consentimiento, sí; completo, no.",
  },
  {
    question: "¿Qué analítica RGPD puede usar un pequeño negocio?",
    answer:
      "Depende de lo que decidas con el dato. Para una web pequeña sin inversión publicitaria, una herramienta ligera privacy-first (Plausible, Fathom, Umami — desde unos 9 €/mes) cumple y es suficiente. Cuando inviertes en campañas y asignas presupuesto con el dato — típicamente a partir de unos miles de euros al mes en ads — el 40-60% de tráfico que pierde una herramienta con banner cuesta más que la propia analítica: ahí una plataforma cookieless con atribución de revenue como Sealmetrics (desde 599 €/mes) se paga sola.",
  },
  {
    question: "¿Puedo medir conversiones y campañas sin cookies?",
    answer:
      "Sí. La medición cookieless cuenta eventos de forma anónima y agregada — visitas, conversiones, revenue por canal y campaña — sin almacenar nada en el dispositivo ni identificar al visitante. La atribución se calcula a último clic sobre tráfico sin huecos de consentimiento. Lo que no hace, por diseño: reconstruir el recorrido individual de un usuario ni atribución multi-touch, que requieren identificadores personales.",
  },
  {
    question: "¿Qué sanciones hay por usar cookies de analítica sin consentimiento en España?",
    answer:
      "Las infracciones de cookies se sancionan bajo la LSSI-CE: las leves hasta 30.000 € y las graves de 30.001 € a 150.000 €. La AEPD las aplica con regularidad, y no solo a grandes empresas — los motivos más comunes son banners sin opción real de rechazo, cookies colocadas antes del consentimiento y muros de cookies. Si además hay tratamiento ilícito de datos personales, se suman las sanciones del RGPD, con techos muy superiores.",
  },
  {
    question: "¿Cuánto tráfico pierdo si mi analítica depende de un banner?",
    answer:
      "Entre el 35% y el 55% de los visitantes UE rechaza el banner, los ad blockers afectan a más del 40% de los usuarios y los navegadores restringen las cookies. Sumadas en el peor escenario, esas pérdidas pueden dejar a GA4 viendo en torno al 13% del tráfico UE real. Medido en una tienda Shopify real durante 48 días, GA4 no registró el 29% de las visitas ni el 45% de las páginas vistas, y las mayores pérdidas se concentraron en redes sociales orgánicas, afiliación y búsqueda orgánica. Para una tienda online eso significa atribución de campañas y tasas de conversión calculadas sobre una fracción de la realidad. Puedes cuantificar tu caso con la calculadora de pérdida de datos de Sealmetrics.",
  },
];

export default function GdprAnalyticsSpainFaqEsPage() {
  const dates = postDates("gdpr-analytics-spain-faq", "es");

  return (
    <>
      <Breadcrumbs items={[{ label: "Blog", href: "/es/blog" }, { label: "Analítica RGPD en España: FAQ" }]} locale="es" />
      <JsonLd
        data={articleSchema({
          headline: "Analítica RGPD en España: las 7 preguntas que hacen las tiendas online",
          description:
            "AEPD, banners de cookies, legalidad de GA4, sanciones LSSI y cómo medir sin cookies — respuestas directas para tiendas online que operan en España.",
          ...dates,
          url: "/es/blog/gdpr-analytics-spain-faq",
          category: "Regulación",
          author: { name: "Rafa Jiménez", url: "/es/authors/rafa-jimenez", jobTitle: "Founder, Sealmetrics" },
        })}
      />
      <JsonLd data={breadcrumbSchema([{ name: "Blog", url: "/es/blog" }, { name: "Analítica RGPD en España: FAQ", url: "/es/blog/gdpr-analytics-spain-faq" }])} />
      <JsonLd data={faqPageSchema(faqs, "/es/blog/gdpr-analytics-spain-faq")} />

      <article className="pt-12 pb-28 bg-white">
        <div className="max-w-[936px] mx-auto px-5 sm:px-8">
          <header className="mb-12">
            <span className="inline-block text-[0.75rem] font-medium tracking-[0.08em] uppercase text-text-tertiary mb-4">
              Regulación
            </span>
            <h1 className="font-serif text-[2.5rem] font-medium text-text-primary leading-[1.15] mb-5">
              Analítica RGPD en España: las 7 preguntas que las tiendas online <em>hacen de verdad</em>
            </h1>
            <p className="text-[1.2rem] leading-[1.6] text-text-secondary mb-6 max-w-[52ch]">
              Una tienda online española vive entre dos costes: la sanción de la AEPD si las cookies están mal, y perder de un tercio a la mitad de su dato si el banner está bien. Estas son las siete preguntas que hacen quienes la operan — respondidas en directo, una a una.
            </p>
            <PostByline
              {...dates}
              readTime="5 min de lectura"
              authorName="Rafa Jiménez"
              authorUrl="/es/authors/rafa-jimenez"
              locale="es"
            />
          </header>

          <div className="space-y-6 text-[1.05rem] leading-[1.8] text-text-body">
            <p>
              Cada respuesta de abajo es autocontenida — el formato es deliberado, porque estas son las preguntas literales que un responsable de tienda escribe en un buscador o le hace a un asistente de IA. Para el razonamiento legal completo detrás de las respuestas cortas, la pieza compañera es nuestro <Link href="/es/blog/gdpr-eprivacy-analytics-legal-assessment" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">análisis legal de RGPD y ePrivacy</Link>; para los criterios específicos de España en profundidad, la guía <Link href="/gdpr-analytics/spain" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">GDPR analytics in Spain — la guía AEPD explicada</Link> (en inglés).
            </p>

            {faqs.map((f, i) => (
              <div key={f.question}>
                <h2 className="font-serif text-[1.4rem] font-medium text-text-primary mt-10 mb-3">
                  {i + 1}. {f.question}
                </h2>
                <p>{f.answer}</p>
              </div>
            ))}

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-12 mb-4">
              El patrón detrás de las siete respuestas
            </h2>
            <p>
              Todas las respuestas se reducen al mismo test en dos partes: ¿la herramienta almacena algo en el dispositivo del visitante? y ¿trata datos personales? Falla cualquiera de las dos y necesitas banner — con la pérdida del 40-60% del dato que trae consigo. Supera las dos, como hace la medición anónima y agregada bajo la guía de la AEPD, y no se requiere banner para la analítica. Si quieres auditar tu stack actual contra todos los requisitos — no solo los españoles — recorre el <Link href="/es/reg-gap-analysis" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">análisis de brechas regulatorias</Link>, y cuantifica lo que te cuesta el banner con la <Link href="/es/data-loss-calculator" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">calculadora de pérdida de datos</Link>.
            </p>

            <p className="text-[0.85rem] text-text-tertiary mt-10 italic">
              Información general sobre cómo las normas españolas y de la UE aplican a la analítica web, no asesoramiento legal. Confirma tu configuración concreta con tu DPO o asesoría.
            </p>
          </div>

          <CommercialModule
            locale="es"
            hook="¿Tu caso no encaja del todo en estas siete respuestas? Tráelo a una demo y ve cómo mediría tu tienda sin banner: dato anónimo y agregado, alojado en la UE."
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
                Analítica conforme con RGPD sin banners de consentimiento
              </Link>
              <Link
                href="/es/reg-gap-analysis"
                className="block text-[0.9rem] text-text-secondary no-underline hover:text-text-primary transition-colors"
              >
                Análisis de brechas regulatorias — auditoría requisito a requisito
              </Link>
              <Link
                href="/es/glossary/gdpr-analytics-compliance"
                className="block text-[0.9rem] text-text-secondary no-underline hover:text-text-primary transition-colors"
              >
                Cumplimiento RGPD en analítica — definición
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
