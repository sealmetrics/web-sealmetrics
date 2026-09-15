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
  title: "Datos completos — analítica sin pérdida por consentimiento",
  description:
    "Datos completos: analítica web que mide el tráfico sin depender del consentimiento. Sin muestreo, sin modelado. Decisiones para CMOs y CFOs.",
  openGraph: {
    title: "Datos completos — analítica sin pérdida por consentimiento",
    description:
      "Por qué la analítica incompleta produce decisiones equivocadas, qué significan los datos completos arquitectónicamente y los números que cambian.",
    type: "article",
    images: [ogImage("/es/complete-data/")],
    locale: "es_ES",
    url: "https://sealmetrics.com/es/complete-data/",
    siteName: "Sealmetrics",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Datos completos — analítica sin pérdida por consentimiento",
    description: "Por qué la analítica incompleta produce decisiones equivocadas, qué significan los datos completos arquitectónicamente y los números que cambian.",
    images: [ogImage("/es/complete-data/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/es/complete-data/",
    languages: getAlternatesEs("/complete-data"),
  },
};

const faqs = [
  {
    q: "¿Qué significa «datos completos», exactamente?",
    a: "Visitantes contados acepten o no el banner. Conversiones atribuidas sobre ese mismo dato. Sin gate de consentimiento, mucha menos pérdida por ad-blocker, sin expiración de cookies en Safari a 7 días, sin modelado estadístico para rellenar huecos. El número que ves en el dashboard es el número que ocurrió. Operacionalmente significa pageviews y eventos que no se pierden por el rechazo del consentimiento, y atribución de ingresos last-click aplicada a cada conversión observada — no al 13% que dio consentimiento.",
  },
  {
    q: "¿No lo está resolviendo ya el Consent Mode v2 de GA4?",
    a: "Consent Mode es una capa de modelado. Cuando los visitantes rechazan cookies, Google estima lo que probablemente hicieron basándose en los que sí dieron consentimiento. Ese modelo es útil cuando necesitas un orden de magnitud; no es una medición. Para un CMO defendiendo €2M anuales de gasto en medios, la pregunta es si quieres tomar decisiones sobre un modelo del 87% que no puedes ver, o sobre lo que de verdad se midió, sin depender del consentimiento. Datos completos es la segunda respuesta.",
  },
  {
    q: "¿Qué cambia operacionalmente cuando hago el switch?",
    a: "Tres cosas, inmediatamente. Primero, el mix de canales cambia — típicamente orgánico, email y directo ganan cuota a costa de paid (porque esos canales estaban menos afectados por el consentimiento, no porque fueran peores). Segundo, las ventanas de atribución se extienden — las conversiones recurrentes dejan de clasificarse mal como nuevas. Tercero, la conversación en el review de marketing cambia: dejas de debatir los datos y empiezas a debatir la decisión.",
  },
  {
    q: "¿Cómo sé si mis datos eran realmente incompletos?",
    a: "Corre la calculadora de gap sobre tu tráfico real. Comparamos lo que GA4 reporta contra lo que tu CRM, los pedidos de Shopify o los registros del PMS muestran. El gap suele ser de 25–45% para marcas consumer B2C, 15–25% para B2B. Si el gap está por debajo del 10%, probablemente no necesitas cambiar. La mayoría de equipos descubren que el gap es mucho mayor de lo que asumían.",
  },
  {
    q: "¿«Datos completos» significa que Sealmetrics ignora la privacidad?",
    a: "Lo contrario. Los datos completos son posibles porque la arquitectura es sin consentimiento por diseño — sin cookies, sin identificadores, sin datos personales. La privacidad es la restricción que obliga a que la medición sea agregada; la medición agregada es lo que hace lícito medir sin diálogo de consentimiento. Son la misma decisión arquitectónica, vistas desde ángulos distintos.",
  },
  {
    q: "¿Dónde se almacenan estos datos?",
    a: "Exclusivamente en Dublín, Irlanda, sobre infraestructura europea. Sin transferencia a Estados Unidos. El dashboard, el export a BigQuery, la API y el MCP server beben del mismo dataset residente en la UE.",
  },
];

export default function CompleteDataPillarEs() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Datos completos" }]} />
      <JsonLd data={breadcrumbSchema([{ name: "Datos completos", url: "/es/complete-data" }])} />
      <JsonLd
        data={speakableWebPageSchema({
          url: "/es/complete-data",
          name: "Datos completos — analítica sin pérdida por consentimiento",
        })}
      />
      <JsonLd
        data={articleSchema({
          headline: "Datos completos — por qué la analítica incompleta produce decisiones equivocadas y qué requiere medir sin depender del consentimiento",
          description:
            "El argumento de categoría para la analítica sin cookies, sin consentimiento y alojada en la UE que no pierde visitas por el rechazo del consentimiento — y las decisiones que cambia para CMOs y CFOs.",
          datePublished: PILLAR_DATE_PUBLISHED,
          dateModified: PILLAR_DATE_MODIFIED,
          url: "/es/complete-data",
          category: "Strategy",
          author: { name: "Rafa Jiménez", url: "/es/authors/rafa-jimenez", jobTitle: "Founder, Sealmetrics" },
        })}
      />

      <section className="relative overflow-hidden bg-warm-white pt-28 md:pt-32 pb-12">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-8 text-center">
          <span className="eyebrow mb-5" style={{ display: "inline-flex", justifyContent: "center" }}>
            Pillar — Datos completos
          </span>
          <h1 className="h-display mx-auto mt-5" style={{ maxWidth: "22ch" }}>
            <em className="italic font-medium" style={{ color: "#E8B84B", fontStyle: "italic" }}>Datos completos.</em>{" "}
            Decisiones que puedes defender.
          </h1>
          <p className="text-ink-soft mt-8 mx-auto max-w-[62ch] leading-[1.55]" style={{ fontSize: "clamp(17px, 1.4vw, 20px)" }}>
            La línea más cara de tu plan de medios es la decisión que
            tomaste sobre analítica incompleta. En Europa, esa decisión
            se tomó sobre aproximadamente el 13% de tu tráfico real.
            Este es el argumento para arreglarlo — y los números que
            cambian cuando lo haces.
          </p>
        </div>
      </section>

      <TldrBlock
        answer={
          <>
            Los datos completos son analítica web donde el número en el
            dashboard equivale al número que ocurrió. Sin gate de
            consentimiento perdiendo 40–60% de visitantes, sin
            ad-blockers eliminando el script en otro 40%, sin ITP de
            Safari truncando atribución a 7 días, sin modelo estadístico
            rellenando el hueco. Es el output de una decisión
            arquitectónica deliberada — sin cookies, sin consentimiento,
            first-party, sólo UE — que cambia tracking individual por
            medición agregada que incluye a quienes rechazan el banner.
            Para un negocio eCommerce o
            media tomando decisiones de inversión sobre mix de tráfico,
            ese cambio es casi siempre el correcto.
          </>
        }
        bullets={[
          <><strong>Pageviews sin pérdida por consentimiento</strong> — sin script-block, sin expiración.</>,
          <><strong>Atribución de ingresos last-click</strong> aplicada a quienes aceptan y a quienes rechazan el banner, no solo al 13% que dio consentimiento.</>,
          <><strong>Sin modelado</strong> — medición, no estimación.</>,
          <><strong>Sólo UE</strong> — procesamiento en Dublín, Irlanda.</>,
        ]}
      />

      <section className="py-20 bg-white border-t border-warm-100">
        <div className="max-w-[840px] mx-auto px-5 sm:px-8">
          <h2 className="h-section">Qué cuesta realmente la analítica incompleta</h2>
          <p className="mt-6 text-[17px] leading-[1.75] text-ink-soft">
            El riesgo de una analítica mala no es que tu dashboard esté
            equivocado. El riesgo es que tus decisiones estén
            equivocadas, de maneras que se componen a lo largo de un
            año fiscal. Tres modos de fallo aparecen en cada review de
            CMO que hacemos con clientes nuevos.
          </p>

          <div className="mt-10 space-y-8">
            <div>
              <h3 className="text-[18px] font-semibold text-ink mb-2">Mala asignación de gasto en paid</h3>
              <p className="text-[16px] leading-[1.7] text-ink-soft">
                Los canales que consienten a tasas más altas (audiencias
                mayores, tráfico B2B, búsqueda branded) lucen mejor de
                lo que son. Los canales que consienten a tasas más bajas
                (paid social, vídeo, audiencias jóvenes) lucen peor.
                El presupuesto sigue al informe. A lo largo de cuatro
                trimestres, un gap del 30% en tasas de consentimiento
                entre canales distorsiona el plan de medios entero —
                sin que nadie note que la distorsión está en la
                medición, no en el mercado.
              </p>
            </div>

            <div>
              <h3 className="text-[18px] font-semibold text-ink mb-2">Ganadores equivocados declarados</h3>
              <p className="text-[16px] leading-[1.7] text-ink-soft">
                Los resultados de tests A/B se inclinan hacia la
                variante que sirvió a una audiencia más consenciente.
                Los proyectos de CRO optimizan hacia la muestra
                superviviente. Clientes de grupos hoteleros corriendo
                ambas herramientas han medido +30% más reservas
                atribuidas a directo — no porque directo mejorara, sino
                porque directo era el canal que GA4 sistemáticamente
                infra-contaba.
              </p>
            </div>

            <div>
              <h3 className="text-[18px] font-semibold text-ink mb-2">Informes de board que no cuadran</h3>
              <p className="text-[16px] leading-[1.7] text-ink-soft">
                El informe de marketing dice €X. El CRM dice €Y.
                Finanzas dice €Z. La conversación de conciliación se
                come horas de cada revisión trimestral. Cuando la
                medición es completa, el número de marketing cuadra con
                el del CRM a unos pocos puntos porcentuales, y la
                conversación pasa de «qué número es el correcto» a
                «qué hacemos al respecto».
              </p>
            </div>
          </div>

          <div className="mt-12 p-7 bg-warm-white border border-warm-100 rounded-2xl">
            <div className="flex items-baseline gap-3 mb-3">
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">Corre tu gap</span>
              <span className="h-px flex-1 bg-warm-100" />
            </div>
            <p className="text-[16px] leading-[1.7] text-ink">
              La mayoría de equipos infravaloran su gap a la mitad. La{" "}
              <Link href="/es/data-loss-calculator" className="text-brand underline decoration-1 underline-offset-2">
                calculadora de pérdida de datos
              </Link>{" "}
              compara lo que GA4 reporta contra los pedidos de tu CRM o
              Shopify, por canal. Menos de cinco minutos; las decisiones
              del primer trimestre se aclaran inmediatamente.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-warm-white border-t border-warm-100">
        <div className="max-w-[840px] mx-auto px-5 sm:px-8">
          <h2 className="h-section">Qué significa «datos completos», específicamente</h2>
          <p className="mt-6 text-[17px] leading-[1.75] text-ink-soft">
            La palabra «completos» está haciendo trabajo real aquí, no
            trabajo de marketing. Cuatro garantías operacionales:
          </p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              {
                num: "01",
                title: "Visitantes contados, con banner o sin él",
                body: "Sin gate de consentimiento, mucha menos pérdida por ad-blocker, sin expiración de cookies. En modo first-party la recolección corre desde tu propio dominio, así que las listas de terceros que usan navegadores y bloqueadores no la detectan.",
              },
              {
                num: "02",
                title: "Conversiones atribuidas sin huecos de consentimiento",
                body: "Atribución de ingresos last-click aplicada a las conversiones sin huecos de consentimiento, no solo al 13% que dio consentimiento. El canal que de hecho generó la conversión recibe el crédito — por datos, no por modelo.",
              },
              {
                num: "03",
                title: "Sin relleno estadístico",
                body: "Sin imputación tipo consent-mode, sin gap-fill por machine-learning, sin «conversiones modeladas». Si el número está en el dashboard, el evento ocurrió. Si el evento no ocurrió, el número no está.",
              },
              {
                num: "04",
                title: "Sin trade-off de vigilancia",
                body: "La captura completa es posible porque la arquitectura es anónima. Sin identificador por visitante, sin perfil, sin enlace entre sesiones. Conteos agregados a nivel de canal. El lado compliance es el pillar de analítica sin consentimiento.",
              },
            ].map((c) => (
              <div key={c.num} className="border border-warm-100 rounded-2xl p-6 bg-white">
                <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">{c.num}</span>
                <h3 className="mt-3 text-[18px] font-semibold tracking-[-0.01em] text-ink leading-[1.3]">{c.title}</h3>
                <p className="mt-3 text-[15px] leading-[1.65] text-ink-soft">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white border-t border-warm-100">
        <div className="max-w-[840px] mx-auto px-5 sm:px-8">
          <h2 className="h-section">De dónde viene esto, arquitectónicamente</h2>
          <p className="mt-6 text-[17px] leading-[1.75] text-ink-soft">
            Los datos completos son el resultado. Se sostienen sobre dos
            decisiones previas que tiran en dirección opuesta a la
            analítica convencional — y por eso funcionan.
          </p>

          <div className="mt-10 space-y-6">
            <div className="flex gap-6">
              <span className="font-mono text-[13px] font-semibold text-brand pt-1 min-w-[100px]">Decisión 1</span>
              <div>
                <h3 className="text-[17px] font-semibold text-ink mb-2">Sin cookies — en ningún sitio</h3>
                <p className="text-[15px] leading-[1.7] text-ink-soft">
                  Sin la cookie, los ad-blockers no tienen nada que
                  bloquear, los navegadores no tienen nada que expirar,
                  y la ITP de Safari no tiene nada que truncar. La
                  pérdida del 87% desaparece porque los vectores de
                  pérdida ya no existen. Arquitectura completa en{" "}
                  <Link href="/es/cookieless-analytics" className="text-brand underline decoration-1 underline-offset-2">
                    analítica sin cookies
                  </Link>
                  .
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <span className="font-mono text-[13px] font-semibold text-brand pt-1 min-w-[100px]">Decisión 2</span>
              <div>
                <h3 className="text-[17px] font-semibold text-ink mb-2">Sin identificadores personales — en ningún sitio</h3>
                <p className="text-[15px] leading-[1.7] text-ink-soft">
                  Sin identificadores, el ámbito material del RGPD no
                  se activa y el banner de consentimiento deja de ser
                  necesario. Sin banner, la pérdida del 40–60% por
                  rechazo desaparece. Recorrido legal completo en{" "}
                  <Link href="/es/consentless-analytics" className="text-brand underline decoration-1 underline-offset-2">
                    analítica sin consentimiento
                  </Link>
                  .
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <span className="font-mono text-[13px] font-semibold text-brand pt-1 min-w-[100px]">Resultado</span>
              <div>
                <h3 className="text-[17px] font-semibold text-ink mb-2">Datos completos</h3>
                <p className="text-[15px] leading-[1.7] text-ink-soft">
                  Ambos vectores de pérdida eliminados. Lo que queda es
                  medición agregada y anónima de quienes aceptan y rechazan
                  el banner por igual,
                  atribuida last-click a nivel de canal. El diagrama del
                  pipeline está en{" "}
                  <Link href="/es/how-it-works" className="text-brand underline decoration-1 underline-offset-2">
                    Cómo funciona
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>

          <p className="mt-10 text-[16px] leading-[1.7] text-ink-soft italic">
            El trade-off es real: sin identificación de visitantes
            recurrentes, sin recorridos individuales entre sesiones, sin
            perfiles por usuario. Para un CMO optimizando mix de canales
            y un CFO conciliando ingresos con la P&amp;L, el trade-off
            es favorable. Para un equipo de producto construyendo
            dashboards de retención por cohorte, no — usa otra categoría
            de herramienta.
          </p>
        </div>
      </section>

      <section className="py-20 bg-warm-white border-t border-warm-100">
        <div className="max-w-[960px] mx-auto px-5 sm:px-8">
          <h2 className="h-section text-center">El argumento, en formato largo</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-12">
            <Link
              href="/es/blog/why-ga4-shows-13pct-eu-traffic"
              className="group block border border-warm-100 rounded-xl p-7 bg-white no-underline transition-all hover:border-warm-200 hover:-translate-y-0.5"
            >
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">El número del 13%</span>
              <h3 className="mt-3 text-[18px] font-semibold tracking-[-0.01em] text-ink leading-[1.3] group-hover:text-brand transition-colors">Por qué GA4 te muestra el 13% de tu tráfico europeo</h3>
              <p className="mt-3 text-[14.5px] leading-[1.6] text-ink-soft">
                La aritmética de consentimiento + ad-block + Safari ITP, con tasas de rechazo por sector.
              </p>
              <span className="inline-flex items-center gap-1.5 mt-5 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-brand">Leer →</span>
            </Link>

            <Link
              href="/es/blog/ga4-data-sampling-problem"
              className="group block border border-warm-100 rounded-xl p-7 bg-white no-underline transition-all hover:border-warm-200 hover:-translate-y-0.5"
            >
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">Muestreo</span>
              <h3 className="mt-3 text-[18px] font-semibold tracking-[-0.01em] text-ink leading-[1.3] group-hover:text-brand transition-colors">El problema de muestreo de datos en GA4</h3>
              <p className="mt-3 text-[14.5px] leading-[1.6] text-ink-soft">
                Qué umbrales activan el muestreo, cómo se ve el informe muestreado y por qué la advertencia está enterrada.
              </p>
              <span className="inline-flex items-center gap-1.5 mt-5 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-brand">Leer →</span>
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
        titleEn={<>See <em className="italic font-medium" style={{ color: "#E8B84B", fontStyle: "italic" }}>your</em> gap, on your real traffic.</>}
        titleEs={<>Mira <em className="italic font-medium" style={{ color: "#E8B84B", fontStyle: "italic" }}>tu</em> gap real, sobre tu tráfico.</>}
        ledeEn="Book a 30-minute walkthrough with the founder."
        ledeEs="Reserva 30 min con el founder. Corremos la calculadora sobre tu site y la reconciliamos con tu CRM en directo."
      />
    </>
  );
}
