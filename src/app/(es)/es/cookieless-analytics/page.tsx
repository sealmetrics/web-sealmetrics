import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { TldrBlock } from "@/components/ui/TldrBlock";
import {
  articleSchema,
  breadcrumbSchema,
  speakableWebPageSchema,
} from "@/lib/schema";
import { getAlternatesEs } from "@/lib/i18n/navigation";
import { FinalCtaSharedV3 } from "@/components/sections/v3/FinalCtaSharedV3";
import { ogImage } from "@/lib/seo/og";

const PILLAR_DATE_PUBLISHED = "2026-05-29";
const PILLAR_DATE_MODIFIED = "2026-05-29";

export const metadata: Metadata = {
  title: "Analítica sin cookies, explicada — Sealmetrics",
  description:
    "Analítica sin cookies con recolección first-party server-side: mide el tráfico sin depender del consentimiento. Sin banners, sin muestreo.",
  openGraph: {
    title: "Analítica sin cookies, explicada",
    description:
      "Qué es, por qué fallan las cookies en 2026, qué se mide y dónde encaja en tu stack.",
    type: "article",
    images: [ogImage("/es/cookieless-analytics/")],
    locale: "es_ES",
    url: "https://sealmetrics.com/es/cookieless-analytics/",
    siteName: "Sealmetrics",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Analítica sin cookies, explicada",
    description: "Qué es, por qué fallan las cookies en 2026, qué se mide y dónde encaja en tu stack.",
    images: [ogImage("/es/cookieless-analytics/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/es/cookieless-analytics/",
    languages: getAlternatesEs("/cookieless-analytics"),
  },
};

const faqs = [
  {
    q: "¿La analítica sin cookies es legal bajo RGPD?",
    a: "Sí — y la vía legal es arquitectónica, no contractual. Como no se almacenan datos personales, identificadores ni cookies, el procesamiento queda fuera del ámbito material del RGPD y del requisito de consentimiento de ePrivacy. Los criterios de exención de la CNIL, la guía de la DSK alemana y la exención PECR del ICO británico describen la misma vía. Sealmetrics incluye DPA, procesamiento exclusivo en la UE (Dublín) y un paquete TPSR para revisión legal.",
  },
  {
    q: "¿Qué precisión tiene comparada con GA4?",
    a: "Captura más, no lo mismo. Las herramientas basadas en cookies pierden datos tres veces en Europa: 40–60% de visitantes rechazan el consentimiento, ~40% usan ad-blockers que eliminan el script, y Safari/Firefox limitan las cookies first-party a 7 días. La recolección cookieless server-side no se ve afectada por ninguno. Grupos hoteleros que corren ambas han medido un 30–40% más de tráfico y un 15–20% más de ingresos atribuidos contra su propio CRM.",
  },
  {
    q: "¿Puedo correrla junto a Google Analytics 4?",
    a: "Sí — lo recomendamos para los primeros 30 días. La mayoría de equipos mantienen GA4 para el import de conversiones de Google Ads y el legacy de BigQuery, y usan Sealmetrics como fuente de verdad para decisiones a nivel directivo. No hay migración. Un tag, corren en paralelo.",
  },
  {
    q: "¿Qué NO puede hacer la analítica sin cookies?",
    a: "No puede identificar a un visitante recurrente. No puede seguir a una persona individual entre páginas o sesiones. No construye perfiles de comportamiento por usuario. Si tu caso de uso requiere identificación a nivel de usuario (product analytics autenticado, triggers de CRM basados en navegación individual), necesitas otra categoría de herramienta — probablemente Mixpanel, Amplitude o un CDP. Sealmetrics cuenta eventos anónimamente y atribuye conversiones al canal que las generó, en agregado.",
  },
  {
    q: "¿Y el Consent Mode v2 de Google?",
    a: "Consent Mode es una capa de modelado: cuando los visitantes rechazan cookies, Google estima los datos que faltan estadísticamente. Sigue siendo basado en cookies. Los datos que ves en GA4 con Consent Mode son un modelo del 87% que no puedes medir. La analítica sin cookies es una capa de medición — los visitantes se cuentan acepten o no el banner, sin modelo. Responden preguntas distintas.",
  },
  {
    q: "¿Cuánto tarda la implementación?",
    a: "De 5 a 30 minutos para instalar el pixel first-party de 846 bytes, según la plataforma — cualquier CMS, SPA o setup headless. Primeros datos en la primera hora. Calibración completa en una semana. Side-by-side con GA4 desde el día uno — sin rip-and-replace.",
  },
];

export default function CookielessAnalyticsPillarEs() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Analítica sin cookies" }]} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Analítica sin cookies", url: "/es/cookieless-analytics" },
        ])}
      />
      <JsonLd
        data={speakableWebPageSchema({
          url: "/es/cookieless-analytics",
          name: "Analítica sin cookies — qué es y qué captura",
        })}
      />
      <JsonLd
        data={articleSchema({
          headline:
            "Analítica sin cookies, explicada — qué es, qué captura y qué no",
          description:
            "Guía definitiva de la analítica web sin cookies: arquitectura, precisión, base RGPD, y dónde encaja en un stack eCommerce.",
          datePublished: PILLAR_DATE_PUBLISHED,
          dateModified: PILLAR_DATE_MODIFIED,
          url: "/es/cookieless-analytics",
          category: "Analytics",
          author: {
            name: "Rafa Jiménez",
            url: "/es/authors/rafa-jimenez",
            jobTitle: "Founder, Sealmetrics",
          },
        })}
      />

      <section className="relative overflow-hidden bg-warm-white pt-28 md:pt-32 pb-12">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-8 text-center">
          <span className="eyebrow mb-5" style={{ display: "inline-flex", justifyContent: "center" }}>
            Pillar — Analítica sin cookies
          </span>
          <h1 className="h-display mx-auto mt-5" style={{ maxWidth: "22ch" }}>
            Analítica sin cookies.{" "}
            <em className="italic font-medium" style={{ color: "#E8B84B", fontStyle: "italic" }}>
              Datos completos, por arquitectura.
            </em>
          </h1>
          <p className="text-ink-soft mt-8 mx-auto max-w-[64ch] leading-[1.55]" style={{ fontSize: "clamp(17px, 1.4vw, 20px)" }}>
            En 2026, la analítica basada en cookies mide aproximadamente
            el 13% del tráfico europeo. El otro 87% se rechaza, se bloquea
            o se cae antes de que el tag dispare. Esta es una guía sobre
            la alternativa — qué es la analítica sin cookies, qué cuenta,
            qué deliberadamente no, y dónde encaja junto al resto de tu stack.
          </p>
        </div>
      </section>

      <TldrBlock
        answer={
          <>
            La analítica sin cookies es analítica web que captura
            páginas vistas, eventos y conversiones{" "}
            <strong>anónimamente, en el lado servidor</strong>, desde tu
            propio dominio — sin cookies, sin fingerprinting, sin
            identificadores personales. No pierde visitas por el rechazo
            del consentimiento porque no hay nada que los navegadores, banners o ad-blockers
            puedan bloquear, rechazar o expirar. El trade-off es honesto:
            mides canales y conversiones en agregado, no a personas
            individuales entre sesiones. Para un negocio eCommerce o
            media que toma decisiones de inversión sobre mix de tráfico,
            ese trade-off suele ser el correcto.
          </>
        }
        bullets={[
          <><strong>No pierde visitas</strong> por el rechazo del consentimiento — sin caída por ad-blocker, sin expiración de cookies a 7 días.</>,
          <><strong>Diseñada para el RGPD desde la arquitectura</strong> (autoevaluación) — sin cookies, sin datos personales, sin identificadores entre sesiones. Procesamiento sólo en la UE.</>,
          <><strong>Atribución de ingresos last-click</strong> a nivel de canal y campaña, sobre quienes aceptan y rechazan el banner por igual.</>,
          <><strong>Lo que no hace</strong> — identificar visitantes recurrentes, seguir individuos entre sesiones o construir perfiles por usuario. Si lo necesitas, usa un CDP.</>,
        ]}
      />

      <section className="py-20 bg-white border-t border-warm-100">
        <div className="max-w-[840px] mx-auto px-5 sm:px-8">
          <h2 className="h-section">Por qué la analítica basada en cookies falla en 2026</h2>
          <p className="mt-6 text-[17px] leading-[1.75] text-ink-soft">
            La cookie se diseñó en 1994 para continuidad de sesión —
            mantenerte logueado, guardar un carrito. Su uso para analítica
            fue una adaptación posterior que dependía de condiciones que
            ya no existen. Tres cambios estructurales han hecho de la
            cookie una primitiva de medición poco fiable en Europa, y se
            componen:
          </p>

          <div className="mt-10 space-y-8">
            <div>
              <h3 className="text-[18px] font-semibold text-ink mb-2">1. Rechazo de consentimiento — 40 a 60% de visitantes UE</h3>
              <p className="text-[16px] leading-[1.7] text-ink-soft">
                Desde que la guía CNIL/ICO de 2019 se endureció, se
                requiere un banner de consentimiento antes de instalar
                cualquier cookie no esencial. Las tasas reales de rechazo
                están entre el 40% (B2B) y el 60% (B2C consumer) en
                mercados europeos. Esos visitantes siguen en tu sitio,
                comprando, marchándose — pero invisibles para tu analítica.
              </p>
            </div>

            <div>
              <h3 className="text-[18px] font-semibold text-ink mb-2">2. Ad-blockers — ~40% de usuarios UE</h3>
              <p className="text-[16px] leading-[1.7] text-ink-soft">
                uBlock, AdBlock Plus y el navegador Brave incorporan
                listas de reglas que eliminan scripts de analítica
                third-party antes de que ejecuten. El visitante nunca
                aparece en tu propiedad de GA4 — no hay consentimiento
                que rechazar porque no hay petición. Esta pérdida es
                silenciosa. No se ve como un opt-in fallido; se ve
                como sesiones que faltan.
              </p>
            </div>

            <div>
              <h3 className="text-[18px] font-semibold text-ink mb-2">3. Safari ITP y Firefox ETP — límite de 7 días en cookies first-party</h3>
              <p className="text-[16px] leading-[1.7] text-ink-soft">
                Incluso cuando el visitante consiente, la Intelligent
                Tracking Prevention de Safari limita las cookies
                first-party de analítica a 7 días. Firefox hace lo mismo.
                Un usuario que navega el martes y convierte el jueves de
                la semana siguiente aparece como visitante nuevo. Las
                ventanas de atribución colapsan. La identificación de
                visitantes recurrentes deja de funcionar a escala.
              </p>
            </div>
          </div>

          <p className="mt-10 text-[17px] leading-[1.75] text-ink-soft">
            Suma esas pérdidas y normalmente te quedas con cerca del{" "}
            <Link href="/es/blog/why-ga4-shows-13pct-eu-traffic" className="text-brand underline decoration-1 underline-offset-2">
              13% del tráfico europeo visible
            </Link>{" "}
            en GA4. El resto se rechaza, se bloquea o expira antes de
            empezar la medición. La respuesta de Google — Consent Mode
            v2 — es modelar estadísticamente los datos que faltan. Es
            una estimación útil para algunas preguntas. No es una medición.
          </p>
        </div>
      </section>

      <section className="py-20 bg-warm-white border-t border-warm-100">
        <div className="max-w-[840px] mx-auto px-5 sm:px-8">
          <h2 className="h-section">Cómo funciona la analítica sin cookies</h2>
          <p className="mt-6 text-[17px] leading-[1.75] text-ink-soft">
            La arquitectura elimina la cookie como primitiva de tracking
            y la reemplaza por conteo anónimo de eventos first-party.
            Tres capas, un pipeline:
          </p>

          <ol className="mt-10 space-y-6 list-none pl-0">
            <li className="pl-12 relative">
              <span className="absolute left-0 top-0 font-mono text-[13px] font-semibold text-brand">01</span>
              <h3 className="text-[18px] font-semibold text-ink mb-2">Pixel first-party en tu propio dominio</h3>
              <p className="text-[16px] leading-[1.7] text-ink-soft">
                Un tag JavaScript pequeño (846 bytes en nuestro caso)
                envía cada pageview a{" "}
                <code className="font-mono text-[14px] bg-warm-100 px-1.5 py-0.5 rounded">pixel.tudominio.com</code>
                {" "}— un CNAME bajo tu propio dominio, no un host third-party.
                Como la petición sale desde el origen first-party, las
                listas de ad-block no la matchean. Como no se instala ni
                se lee cookie, no se requiere gate de consentimiento.
              </p>
            </li>

            <li className="pl-12 relative">
              <span className="absolute left-0 top-0 font-mono text-[13px] font-semibold text-brand">02</span>
              <h3 className="text-[18px] font-semibold text-ink mb-2">Conteo anónimo de eventos en el servidor</h3>
              <p className="text-[16px] leading-[1.7] text-ink-soft">
                El endpoint del pixel corre en Dublín y cuenta eventos
                a nivel de canal, campaña y landing page. No se crea
                identificador de usuario. No se almacena fingerprint de
                IP + User-Agent. El sistema sabe que llegaron 142
                pageviews desde Google CPC en una landing específica;
                no sabe que el visitante A y el visitante B eran la
                misma persona.
              </p>
            </li>

            <li className="pl-12 relative">
              <span className="absolute left-0 top-0 font-mono text-[13px] font-semibold text-brand">03</span>
              <h3 className="text-[18px] font-semibold text-ink mb-2">Atribución last-click y reporting agregado</h3>
              <p className="text-[16px] leading-[1.7] text-ink-soft">
                Cada evento de conversión se atribuye a la fuente de
                tráfico observada en la página donde ocurrió — last-click,
                siempre, sobre datos sin huecos de consentimiento. Los
                agregados fluyen a dashboards, a BigQuery, y a un MCP
                server para agentes de IA. El output es rendimiento de
                canal: qué fuentes generaron ingresos esta semana, y
                cuánto.
              </p>
            </li>
          </ol>

          <p className="mt-10 text-[17px] leading-[1.75] text-ink-soft">
            La arquitectura completa — pixel, pipeline, capa de reporting
            — está documentada en{" "}
            <Link href="/es/how-it-works" className="text-brand underline decoration-1 underline-offset-2">
              Cómo funciona
            </Link>
            . La entrada de glosario técnica vive en{" "}
            <Link href="/es/glossary/cookieless-analytics" className="text-brand underline decoration-1 underline-offset-2">
              analítica sin cookies
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="py-20 bg-white border-t border-warm-100">
        <div className="max-w-[1000px] mx-auto px-5 sm:px-8">
          <h2 className="h-section text-center">Qué mides — y qué no</h2>
          <p className="mt-6 text-[17px] leading-[1.75] text-ink-soft text-center max-w-[64ch] mx-auto">
            La honestidad importa. Quien te diga que la analítica sin
            cookies hace todo lo que hacía la basada en cookies está
            vendiendo, no informando.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            <div className="border border-warm-100 rounded-2xl p-7 bg-warm-white">
              <h3 className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-brand mb-4">Lo que captura</h3>
              <ul className="space-y-3 text-[15px] leading-[1.7] text-ink list-none pl-0">
                {[
                  "Pageviews, sesiones y eventos de conversión, sin pérdida por consentimiento.",
                  "Canal, campaña, source y medium para cada evento.",
                  "Atribución last-click de ingresos a nivel de canal.",
                  "Conteos de pasos de embudo — cuántos visitantes llegaron al paso 1, paso 2, paso 3.",
                  "Rendimiento por landing, distribución geográfica (a nivel país), tipo de dispositivo.",
                  "Eventos de conversión de Shopify, WooCommerce, Magento, PrestaShop y checkouts custom vía dataLayer.",
                ].map((s) => (
                  <li key={s} className="flex gap-3">
                    <span className="text-brand" aria-hidden>—</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-warm-100 rounded-2xl p-7 bg-warm-white">
              <h3 className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] mb-4" style={{ color: "#B5423B" }}>Lo que no</h3>
              <ul className="space-y-3 text-[15px] leading-[1.7] text-ink list-none pl-0">
                {[
                  "Identificar visitantes recurrentes entre sesiones.",
                  "Construir perfiles de comportamiento por usuario.",
                  "Reconstruir la ruta de un individuo por tu sitio.",
                  "Disparar acciones de CRM por usuario basadas en historial de navegación.",
                  "Reemplazar a un CDP para product analytics autenticado.",
                  "Generar audiencias de retargeting individuales (usa los pixels de Google/Meta para eso, en paralelo).",
                ].map((s) => (
                  <li key={s} className="flex gap-3">
                    <span style={{ color: "#B5423B" }} aria-hidden>—</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="mt-12 text-[17px] leading-[1.75] text-ink-soft max-w-[64ch] mx-auto text-center">
            Para un CMO defendiendo gasto de medios, un CFO conciliando
            ingresos por canal con la P&amp;L, o un eCommerce manager
            cuyas decisiones viven o mueren por el mix de tráfico, la
            columna izquierda es la respuesta. Para product analytics
            sobre una app autenticada, la columna derecha es la
            herramienta equivocada — combina con Mixpanel o Amplitude.
          </p>
        </div>
      </section>

      <section className="py-20 bg-warm-white border-t border-warm-100">
        <div className="max-w-[960px] mx-auto px-5 sm:px-8">
          <h2 className="h-section text-center">Lectura relacionada</h2>
          <p className="mt-6 text-[17px] leading-[1.75] text-ink-soft text-center max-w-[60ch] mx-auto">
            La arquitectura es la misma. La interpretación según tu
            modelo cambia.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-12">
            <Link
              href="/es/blog/cookieless-analytics-explained"
              className="group block border border-warm-100 rounded-xl p-7 bg-warm-white no-underline transition-all hover:border-warm-200 hover:-translate-y-0.5"
            >
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">Explicación</span>
              <h3 className="mt-3 text-[20px] font-semibold tracking-[-0.01em] text-ink leading-[1.25] group-hover:text-brand transition-colors">
                Analítica sin cookies, explicada
              </h3>
              <p className="mt-3 text-[15px] leading-[1.6] text-ink-soft">
                Cómo funciona la analítica web sin cookies, sin consentimiento y sin tracking por usuario.
              </p>
              <span className="inline-flex items-center gap-1.5 mt-5 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-brand">Leer →</span>
            </Link>

            <Link
              href="/es/consentless-analytics"
              className="group block border border-warm-100 rounded-xl p-7 bg-warm-white no-underline transition-all hover:border-warm-200 hover:-translate-y-0.5"
            >
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">Pillar legal</span>
              <h3 className="mt-3 text-[20px] font-semibold tracking-[-0.01em] text-ink leading-[1.25] group-hover:text-brand transition-colors">
                Analítica sin consentimiento
              </h3>
              <p className="mt-3 text-[15px] leading-[1.6] text-ink-soft">
                La ruta arquitectónica a la legalidad bajo RGPD y ePrivacy. Guía de autoridades por país.
              </p>
              <span className="inline-flex items-center gap-1.5 mt-5 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-brand">Leer pillar →</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white border-t border-warm-100">
        <div className="max-w-[840px] mx-auto px-5 sm:px-8">
          <h2 className="h-section text-center">Preguntas frecuentes</h2>
          <dl className="mt-12 divide-y divide-warm-100 border-y border-warm-100">
            {faqs.map((f) => (
              <div key={f.q} className="py-7">
                <dt className="text-[17px] font-semibold text-ink mb-3">{f.q}</dt>
                <dd data-speakable className="faq-answer text-[15.5px] leading-[1.7] text-ink-soft max-w-[68ch]">
                  {f.a}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <FinalCtaSharedV3
        locale="es"
        titleEn={<>See your <em className="italic font-medium" style={{ color: "#E8B84B", fontStyle: "italic" }}>complete data</em> in 30 minutes.</>}
        titleEs={<>Ve tus <em className="italic font-medium" style={{ color: "#E8B84B", fontStyle: "italic" }}>datos completos</em> en 30 minutos.</>}
        ledeEn="Book a walkthrough with the founder. We run the gap calculator on your real traffic."
        ledeEs="Reserva 30 min con el founder. Pasamos tu tráfico real por la calculadora y te enseñamos lo que GA4 no ve este mes."
      />
    </>
  );
}
