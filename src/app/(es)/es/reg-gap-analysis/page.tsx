import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { TldrBlock } from "@/components/ui/TldrBlock";
import { breadcrumbSchema, faqPageSchema } from "@/lib/schema";
import { getAlternates } from "@/lib/i18n/navigation";
import { LogosStripEs } from "@/components/sections/v3/HomeV3Es";
import { FaqAccordionV3 } from "@/components/sections/v3/FaqAccordionV3";
import { FinalCtaSharedV3 } from "@/components/sections/v3/FinalCtaSharedV3";
import { ogImage } from "@/lib/seo/og";

export const metadata: Metadata = {
  title: "Análisis de brechas RGPD para la analítica web",
  description:
    "Análisis de brechas de la analítica web bajo RGPD, ePrivacy, AEPD y PECR — dónde fallan los stacks habituales y cómo cerrar cada brecha.",
  openGraph: {
    title: "Análisis de brechas regulatorias para la analítica web — RGPD, ePrivacy, AEPD",
    description:
      "Mapea tu stack de analítica contra cada requisito que debe cumplir, encuentra las brechas y ve cómo una arquitectura cookieless las cierra.",
    type: "website",
    images: [ogImage("/es/reg-gap-analysis/")],
    url: "https://sealmetrics.com/es/reg-gap-analysis/",
    siteName: "Sealmetrics",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Análisis de brechas RGPD para la analítica web",
    description: "Dónde tu stack de analítica se sale del cumplimiento — requisito a requisito.",
    images: [ogImage("/es/reg-gap-analysis/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/es/reg-gap-analysis/",
    languages: getAlternates("/reg-gap-analysis"),
  },
  keywords: [
    "análisis de brechas analítica",
    "auditoría de cumplimiento analítica",
    "análisis de brechas rgpd",
    "cumplimiento eprivacy analítica",
    "aepd analítica",
    "exención pecr analítica",
    "analítica conforme rgpd",
    "evaluación protección de datos analítica",
  ],
};

const requirements = [
  {
    reg: "ePrivacy · Art. 5(3)",
    title: "Consentimiento para el almacenamiento en el dispositivo",
    demand: "Cualquier cookie, entrada de localStorage o fingerprint no esencial necesita consentimiento previo antes de colocarse.",
    gap: "GA4 y Adobe dejan cookies, así que el banner es obligatorio — y en torno a un tercio de los visitantes UE lo rechaza.",
    close: "Sin cookies, sin localStorage, sin fingerprinting — no se almacena nada en el dispositivo, así que no se activa el consentimiento.",
  },
  {
    reg: "RGPD · Art. 6",
    title: "Base jurídica para el dato personal",
    demand: "Tratar una IP o un identificador online necesita una base jurídica válida — consentimiento o un interés legítimo defendible.",
    gap: "Las herramientas basadas en cookies se apoyan en un consentimiento que a menudo se retira, o en un interés legítimo cada vez más cuestionado.",
    close: "La medición no trata dato personal alguno, así que no hay base que establecer — el RGPD no aplica a ella.",
  },
  {
    reg: "RGPD · Art. 5(1)(c)",
    title: "Minimización de datos",
    demand: "Recoger solo el dato necesario para la finalidad — ni uno más.",
    gap: "Los client IDs, los grafos de dispositivo y los perfiles de comportamiento recogen mucho más de lo que la medición requiere.",
    close: "Solo eventos agregados y anónimos — lo mínimo para contar qué pasó, nada que identifique a una persona.",
  },
  {
    reg: "RGPD · Capítulo V",
    title: "Transferencias internacionales (Schrems II)",
    demand: "El dato personal no puede transferirse a un tercer país sin protección adecuada.",
    gap: "GA4 y Adobe son encargados de EE. UU.; autoridades UE declararon ilícitos despliegues concretos por las transferencias a EE. UU.",
    close: "Alojado de extremo a extremo en Dublín (Irlanda). Sin transferencia a EE. UU. ni mecanismos de transferencia cuestionados.",
  },
  {
    reg: "RGPD · Art. 15 y 17",
    title: "Derechos del interesado (acceso, supresión)",
    demand: "Las personas pueden solicitar acceso a su dato personal y su supresión.",
    gap: "El dato analítico por usuario crea una obligación permanente de localizarlo, comunicarlo y borrarlo a petición.",
    close: "No se almacena dato personal, así que no hay nada que comunicar ni borrar — la obligación no llega a surgir en la medición.",
  },
  {
    reg: "AEPD · guía de cookies",
    title: "UX de consentimiento válido (España)",
    demand: "Rechazar debe ser tan fácil como aceptar, sin muros de cookies y con opciones granulares y desagregadas.",
    gap: "Los banners con dark patterns que empujan a aceptar son una fuente frecuente de reclamaciones y sanciones de la AEPD.",
    close: "Sin cookies en el alcance de la medición, no hay banner que diseñar ni dark pattern que defender.",
  },
  {
    reg: "RGPD · Art. 28",
    title: "Términos de encargado y DPA",
    demand: "Debe existir un contrato de encargo de tratamiento con cada encargado que trate dato personal.",
    gap: "Analítica, gestor de etiquetas y CMP forman un mosaico de encargados, cada uno con su DPA firmado.",
    close: "Un solo encargado UE, un DPA incluido de serie — una superficie de encargados sensiblemente menor que gobernar.",
  },
  {
    reg: "Reino Unido · PECR / DUAA 2025",
    title: "Exención de consentimiento para analítica",
    demand: "La analítica solo puede funcionar sin consentimiento en Reino Unido si cumple los criterios de la exención DUAA 2025 / PECR.",
    gap: "La analítica basada en cookies, entre sitios o con dato personal no cumple los criterios de la exención.",
    close: "Cookieless, first-party, sin dato personal — el perfil para el que se escribió la exención. Ver nuestro autoinforme PECR.",
  },
];

const scoreQuestions = [
  "¿Tu analítica deja alguna cookie o almacena algo en el dispositivo del visitante?",
  "¿Muestras un banner de consentimiento para poder medir el tráfico?",
  "¿Tu herramienta trata direcciones IP o identificadores persistentes?",
  "¿Tu dato analítico se trata en EE. UU., o por una empresa con sede en EE. UU.?",
  "¿Sería difícil atender una solicitud de supresión del dato analítico?",
  "¿Pierdes visitantes UE de tus informes cuando rechazan el banner?",
];

const faqs = [
  {
    q: "¿Qué es un análisis de brechas regulatorias para la analítica web?",
    a: "Un análisis de brechas es una auditoría estructurada que mapea tu configuración de analítica actual contra cada requisito legal que debe cumplir —bajo RGPD, la Directiva ePrivacy, la guía nacional como la de la AEPD en España, y el régimen PECR/DUAA del Reino Unido— e identifica cada punto donde la configuración se queda corta. Para la analítica en concreto, las brechas recurrentes son: cookies que activan el consentimiento bajo ePrivacy, dato personal (IP, identificadores) que necesita base jurídica bajo RGPD, transferencias a EE. UU. que plantean problemas de Schrems II, y una UX de banner que los reguladores sancionan. El resultado es una lista de brechas y el cambio que cierra cada una.",
  },
  {
    q: "¿Qué regulaciones debe cubrir una auditoría de cumplimiento de analítica?",
    a: "Como mínimo: la Directiva ePrivacy (artículo 5(3), el disparador de consentimiento para el almacenamiento en el dispositivo); el RGPD (base jurídica, minimización de datos, transferencias internacionales y derechos del interesado); la guía de la autoridad de control donde operes —para España, la guía de cookies de la AEPD—; y, para tráfico del Reino Unido, PECR modificada por la Data (Use and Access) Act 2025. La analítica basada en cookies suele tener que superar todas; la analítica cookieless y first-party que no trata dato personal supera la mayoría por arquitectura.",
  },
  {
    q: "¿GA4 pasa un análisis de brechas RGPD y ePrivacy?",
    a: "No sin un banner de consentimiento. GA4 deja cookies (activando el artículo 5(3) de ePrivacy) y trata dato personal como la localización por IP y un client ID (activando el RGPD), y Google es una empresa de EE. UU., lo que planteó preguntas de transferencia Schrems II que llevaron a varias autoridades UE a declarar ilícitos despliegues concretos de GA en 2022. Google añadió después opciones de dato en la UE y Consent Mode, pero la arquitectura sigue siendo basada en cookies y dependiente del consentimiento — así que en un análisis de brechas UE muestra brechas abiertas en almacenamiento en el dispositivo, base jurídica y transferencias.",
  },
  {
    q: "¿Cómo cierra Sealmetrics las brechas de cumplimiento habituales de la analítica?",
    a: "Por arquitectura y no por configuración. Sealmetrics es cookieless y no almacena nada en el dispositivo (cierra la brecha ePrivacy), trata cero dato personal como eventos agregados y anónimos (cierra las brechas de base jurídica, minimización y derechos del interesado), y está alojado de extremo a extremo en Dublín (Irlanda) (cierra la brecha de transferencia internacional). Se incluye un DPA, y la atribución es a último clic sobre tráfico sin huecos de consentimiento. Nota: Sealmetrics no reclama certificación ISO 27001 ni SOC 2 — el caso de cumplimiento se apoya en cómo está construido: diseñado para el RGPD (autoevaluación), ePrivacy limpio, Schrems II limpio.",
  },
  {
    q: "¿Puede la analítica funcionar sin banner tras un análisis de brechas?",
    a: "Sí, cuando el análisis confirma dos cosas: que no se almacena ni se lee nada en el dispositivo del visitante (superando el artículo 5(3) de ePrivacy), y que no se trata dato personal (así que el RGPD no aplica a la medición). Los reguladores han convergido en esta lectura — la CNIL francesa mantiene una exención de analítica, y la DUAA 2025 del Reino Unido introdujo otra bajo PECR. Una herramienta que cumple ambas condiciones puede medir de forma lícita sin banner y, como consecuencia, sin la pérdida de dato UE que un banner provoca.",
  },
];

export default function RegGapAnalysisEsPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Análisis de brechas regulatorias" }]} locale="es" />
      <JsonLd data={breadcrumbSchema([{ name: "Análisis de brechas regulatorias", url: "/es/reg-gap-analysis" }])} />
      <JsonLd data={faqPageSchema(faqs.map((f) => ({ question: f.q, answer: f.a })), "/es/reg-gap-analysis")} />

      {/* HERO */}
      <section className="bg-warm-white border-b border-warm-100">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-10 pt-20 pb-24 md:pt-28 md:pb-32">
          <div className="max-w-[920px]">
            <span className="eyebrow mb-6 block">Análisis de brechas regulatorias</span>
            <h1
              className="font-semibold leading-[1.05] tracking-[-0.035em] text-ink"
              style={{ fontSize: "clamp(44px, 6.4vw, 88px)" }}
            >
              Encuentra dónde tu analítica{" "}
              <em className="italic font-medium" style={{ color: "#2D8B6D", fontStyle: "italic" }}>
                se sale del cumplimiento.
              </em>
            </h1>
            <p className="mt-8 text-[19px] leading-[1.6] text-ink-soft max-w-[68ch]">
              «Conforme con el RGPD» es una afirmación, no una auditoría. Un análisis de brechas mapea tu
              stack de analítica contra cada requisito que realmente debe cumplir —ePrivacy, RGPD, la AEPD
              española, PECR del Reino Unido— y muestra exactamente dónde se queda corto. Abajo está el
              marco, requisito a requisito, y cómo una arquitectura cookieless cierra cada brecha.
            </p>
            <div data-md="skip" className="mt-10 flex flex-col sm:flex-row gap-3 flex-wrap">
              <Link
                href="/es/audit"
                className="inline-flex items-center justify-center bg-ink text-white px-8 py-4 rounded-md text-[15px] font-semibold no-underline hover:brightness-110"
              >
                Consigue una auditoría gratis →
              </Link>
              <Link
                href="/es/demo"
                className="inline-flex items-center justify-center border border-warm-200 text-ink px-8 py-4 rounded-md text-[15px] font-semibold no-underline hover:bg-warm-50"
              >
                Reserva una demo
              </Link>
            </div>
            <p className="font-mono text-[11px] text-ink-soft uppercase tracking-[0.12em] mt-8">
              RGPD · ePrivacy · AEPD · PECR (Reino Unido)
            </p>
          </div>
        </div>
      </section>

      <TldrBlock
        label="En breve"
        answer={
          <>
            Un análisis de brechas regulatorias mapea la analítica contra <strong>ePrivacy</strong>,{" "}
            <strong>RGPD</strong>, <strong>AEPD</strong> y <strong>PECR</strong> para encontrar dónde se
            queda corta. Las herramientas basadas en cookies abren brechas en almacenamiento en el
            dispositivo, base jurídica, transferencias y derechos del interesado. Una arquitectura{" "}
            <strong>cookieless, cero PII y alojada en la UE</strong> las cierra por diseño.
          </>
        }
        bullets={[
          <>Las brechas recurrentes: cookies (ePrivacy), dato personal (RGPD), transferencias a EE. UU. (Schrems II), UX de banner (AEPD).</>,
          <>Cookieless + cero dato personal + alojamiento UE en Dublín supera la mayoría de requisitos de forma estructural.</>,
          <>Lee el razonamiento legal en nuestro <Link href="/es/blog/gdpr-eprivacy-analytics-legal-assessment" className="text-brand no-underline border-b border-warm-200 hover:border-brand">análisis legal de RGPD y ePrivacy</Link>.</>,
        ]}
      />

      <LogosStripEs />

      {/* MATRIZ DE REQUISITOS */}
      <section className="py-24 border-t border-warm-100 bg-white">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
          <div className="max-w-[760px] mb-16">
            <span className="eyebrow mb-5 block">El marco</span>
            <h2
              className="font-semibold leading-[1.1] tracking-[-0.03em] text-ink"
              style={{ fontSize: "clamp(36px, 4.4vw, 60px)" }}
            >
              Ocho requisitos,{" "}
              <em className="italic font-medium" style={{ color: "#2D8B6D", fontStyle: "italic" }}>
                una auditoría honesta.
              </em>
            </h2>
            <p className="mt-6 text-[17px] leading-[1.6] text-ink-soft">
              Para cada requisito: qué exige la ley, dónde abre una brecha un stack típico de GA4 o Adobe, y
              el cambio de arquitectura que la cierra. Es la capa de cumplimiento detrás de la{" "}
              <Link href="/es/glossary/gdpr-analytics-compliance" className="text-brand no-underline border-b border-warm-200 hover:border-brand">
                analítica conforme con el RGPD
              </Link>
              .
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {requirements.map((r) => (
              <div key={r.title} className="rounded-2xl border border-warm-100 bg-warm-50 p-7">
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] font-semibold text-brand">
                  {r.reg}
                </span>
                <h3 className="mt-3 text-[21px] font-semibold text-ink leading-[1.2]">{r.title}</h3>
                <p className="mt-3 text-[14px] leading-[1.6] text-ink-soft">{r.demand}</p>
                <div className="mt-5 pt-5 border-t border-warm-100 space-y-3">
                  <div className="flex gap-3 text-[14px] leading-[1.5]">
                    <span className="font-mono text-[10px] uppercase tracking-[0.1em] font-semibold text-red-alert pt-0.5 w-[62px] shrink-0">
                      Brecha
                    </span>
                    <span className="text-ink-soft">{r.gap}</span>
                  </div>
                  <div className="flex gap-3 text-[14px] leading-[1.5]">
                    <span className="font-mono text-[10px] uppercase tracking-[0.1em] font-semibold text-brand pt-0.5 w-[62px] shrink-0">
                      Cerrada
                    </span>
                    <span className="text-ink font-medium">{r.close}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AUTOEVALUACIÓN */}
      <section className="py-24 border-t border-warm-100 bg-warm-50">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-10 grid md:grid-cols-[1fr_1.1fr] gap-16 items-start">
          <div>
            <span className="eyebrow mb-5 block">Puntúa tu stack</span>
            <h2
              className="font-semibold leading-[1.1] tracking-[-0.03em] text-ink"
              style={{ fontSize: "clamp(32px, 3.8vw, 48px)" }}
            >
              Una autoevaluación de dos minutos.
            </h2>
            <p className="mt-6 text-[17px] leading-[1.6] text-ink-soft">
              Responde estas seis preguntas sobre tu analítica actual. Cada <strong>«sí»</strong> es una
              brecha abierta contra uno de los requisitos de arriba.
            </p>
            <div className="mt-8 rounded-xl border border-warm-200 bg-white p-6">
              <p className="text-[14px] leading-[1.6] text-ink-soft">
                <strong className="text-ink">0 brechas</strong> — ninguna de estas seis brechas habituales está abierta en tu medición.{" "}
                <br />
                <strong className="text-ink">1–2 brechas</strong> — riesgo de configuración; conviene una
                revisión formal. <br />
                <strong className="text-ink">3+ brechas</strong> — dependes del consentimiento y pierdes
                dato UE por él. Una arquitectura cookieless cierra el conjunto de golpe.
              </p>
            </div>
            <div className="mt-8">
              <Link
                href="/es/audit"
                className="inline-flex items-center justify-center bg-ink text-white px-7 py-3.5 rounded-md text-[14px] font-semibold no-underline hover:brightness-110"
              >
                Consigue una auditoría gratis →
              </Link>
            </div>
          </div>
          <ol className="space-y-4">
            {scoreQuestions.map((q, i) => (
              <li key={q} className="flex gap-4 rounded-xl border border-warm-100 bg-white p-5">
                <span className="font-mono text-[13px] font-semibold text-brand pt-0.5 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[15px] leading-[1.5] text-ink">{q}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CONTEXTO / ENLACES */}
      <section className="py-24 border-t border-warm-100 bg-white">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-10">
          <div className="max-w-[760px]">
            <span className="eyebrow mb-5 block">Del análisis a la evidencia</span>
            <h2
              className="font-semibold leading-[1.1] tracking-[-0.03em] text-ink"
              style={{ fontSize: "clamp(32px, 3.8vw, 48px)" }}
            >
              Un análisis de brechas solo sirve si puedes probar el cierre.
            </h2>
            <p className="mt-6 text-[17px] leading-[1.6] text-ink-soft">
              Cerrar una brecha sobre el papel es una cosa; producir la documentación que un DPO o un
              regulador aceptará es otra. Nosotros publicamos la evidencia: la postura de{" "}
              <Link href="/es/security" className="text-brand no-underline border-b border-warm-200 hover:border-brand">
                seguridad y cumplimiento
              </Link>{" "}
              (alojamiento UE en Dublín, Schrems II, el paquete TPSR), el razonamiento en el{" "}
              <Link href="/es/blog/gdpr-analytics-without-consent" className="text-brand no-underline border-b border-warm-200 hover:border-brand">
                análisis de analítica sin banners
              </Link>
              , y la comparativa frente a{" "}
              <Link href="/es/vs/matomo" className="text-brand no-underline border-b border-warm-200 hover:border-brand">
                Matomo
              </Link>{" "}
              y las{" "}
              <Link href="/es/alternatives/google-analytics" className="text-brand no-underline border-b border-warm-200 hover:border-brand">
                alternativas a Google Analytics
              </Link>{" "}
              — donde las brechas se cierran por diseño y no por configuración.
            </p>
          </div>
        </div>
      </section>

      <FaqAccordionV3
        locale="es"
        items={faqs}
        titleEs={
          <>
            Las <em>preguntas</em> que plantea una revisión de cumplimiento.
          </>
        }
        ledeEs="Respuestas honestas sobre el análisis de brechas de analítica, qué regulaciones cubrir y qué hace falta para medir de forma lícita sin banner de consentimiento."
      />

      <FinalCtaSharedV3
        locale="es"
        titleEn={
          <>
            Stop assuming compliance.{" "}
            <em className="italic font-medium" style={{ color: "#E8B84B", fontStyle: "italic" }}>
              Analyse the gaps.
            </em>
          </>
        }
        titleEs={
          <>
            Deja de asumir que cumples.{" "}
            <em className="italic font-medium" style={{ color: "#E8B84B", fontStyle: "italic" }}>
              Analiza las brechas.
            </em>
          </>
        }
        ledeEn="Run Sealmetrics alongside your current analytics for 30 days. See the gaps close and the EU data you were losing come back."
        ledeEs="Corre Sealmetrics junto a tu analítica actual durante 30 días. Verás cerrarse las brechas y volver el dato UE que perdías. Si la brecha no es real, no nos debes nada."
        primaryTextEn="Get a free audit →"
        primaryTextEs="Consigue una auditoría gratis →"
      />
    </>
  );
}
