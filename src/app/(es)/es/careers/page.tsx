import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbSchema, faqPageSchema } from "@/lib/schema";
import { getAlternatesEs } from "@/lib/i18n/navigation";
import { CareersForm } from "@/components/forms/CareersForm";
import { ogImage } from "@/lib/seo/og";

export const metadata: Metadata = {
  title: "Trabaja con nosotros — Sealmetrics",
  description: "Candidatura con enlaces públicos: LinkedIn, GitHub, tu trabajo publicado. Sin CV ni formularios de datos personales. Elige equipo y enséñanos lo que has hecho.",
  openGraph: {
    title: "Trabaja con nosotros — Sealmetrics",
    description:
      "Candidatura con enlaces públicos — LinkedIn, GitHub, tu trabajo publicado. Sin subir CV, sin formularios de datos personales.",
    type: "website",
    images: [ogImage("/es/careers/")],
    url: "https://sealmetrics.com/es/careers/",
    siteName: "Sealmetrics",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Trabaja con nosotros — Sealmetrics",
    description: "Candidatura con enlaces públicos — LinkedIn, GitHub, tu trabajo publicado. Sin subir CV, sin formularios de datos personales.",
    images: [ogImage("/es/careers/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/es/careers/",
    languages: getAlternatesEs("/careers"),
  },
};

const TEAMS = [
  {
    name: "Ingeniería",
    desc: "El píxel de medición, el pipeline de ingesta y el dashboard. Una superficie pequeña que mide el tráfico de 2.000+ clientes sin depender del consentimiento — sin una sola cookie.",
  },
  {
    name: "Producto y Diseño",
    desc: "Convertir datos agregados y anónimos en decisiones que un CMO firma. Interfaces editoriales, datos densos, cero dark patterns.",
  },
  {
    name: "Growth y Marketing",
    desc: "Esta web, el blog, el SEO y el motor de demanda. Educamos antes de vender — el texto tiene que sostenerse solo.",
  },
  {
    name: "Ventas y Partnerships",
    desc: "Demos con CMOs y responsables de eCommerce de empresas europeas, más el canal de agencias. Consultivo, sin secuencias automáticas.",
  },
  {
    name: "Customer Success",
    desc: "Onboarding, instrumentación y que los clientes midan bien. Vivirás entre equipos de marketing y configuraciones de tags.",
  },
  {
    name: "Candidatura abierta",
    desc: "¿No ves tu disciplina? Si tu trabajo público justifica un rol que aún no hemos abierto, queremos verlo.",
  },
];

const SIGNALS = [
  {
    label: "LinkedIn",
    desc: "Trayectoria, alcance de lo que fue tuyo, cómo describes tus propios resultados. Los números concretos pesan más que los títulos.",
  },
  {
    label: "GitHub",
    desc: "Repos publicados, historial de commits en proyectos reales, cómo escribes issues y reviews. Los cuadrados verdes por sí solos no son señal.",
  },
  {
    label: "Escritura y charlas",
    desc: "Un artículo, una charla en una conferencia, un side project documentado. Cualquier cosa que muestre cómo piensas un problema en público.",
  },
  {
    label: "Trabajo con números",
    desc: "Una campaña, una migración, un lanzamiento — descritos con el resultado, no con adjetivos.",
  },
];

const FAQ = [
  {
    question: "¿Por qué no aceptáis CVs ni PDFs?",
    answer:
      "Sealmetrics no recoge datos personales de los visitantes de una web — esa disciplina se extiende a la contratación. Un CV cuenta lo que afirmas; el trabajo público muestra lo que haces. Además, reducimos al mínimo los datos personales que guardamos de cada candidato: los enlaces que decidiste compartir, nada más.",
  },
  {
    question: "¿Y si no tengo GitHub ni mucho trabajo público?",
    answer:
      "Con un enlace basta. Para la mayoría de roles no técnicos, un perfil de LinkedIn es una candidatura completa. GitHub importa en ingeniería, pero una charla, un portfolio o artículos publicados sirven para cualquier equipo.",
  },
  {
    question: "¿Cómo me contactaréis si hay encaje?",
    answer:
      "A través del perfil que compartiste — normalmente un mensaje de LinkedIn. No pedimos email ni teléfono en la candidatura, así que no podemos añadirte a ninguna lista. Si no hay encaje, tus enlaces simplemente no se conservan.",
  },
  {
    question: "¿Puedo ver el producto antes de presentarme?",
    answer:
      "Sí. La cuenta demo te da el dashboard real con datos reales anonimizados — mira /demo-access. Y la sección /open documenta en público cómo trabajamos.",
  },
];

export default function CareersPageEs() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Trabaja con nosotros" }]} locale="es" />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Trabaja con nosotros", url: "/es/careers" },
        ])}
      />
      <JsonLd data={faqPageSchema(FAQ, "/es/careers")} />

      {/* Hero */}
      <section className="bg-warm-white pt-24 md:pt-28 pb-16">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-8 text-center">
          <span className="eyebrow mb-5" style={{ display: "inline-flex" }}>
            Trabaja con nosotros
          </span>
          <h1 className="h-display mx-auto mt-5" style={{ maxWidth: "22ch" }}>
            Enséñanos tu trabajo, <em>no tu CV.</em>
          </h1>
          <p
            className="text-ink-soft mt-8 mx-auto max-w-[62ch] leading-[1.55]"
            style={{ fontSize: "clamp(17px, 1.4vw, 20px)" }}
          >
            Sin subir PDFs. Sin cartas de presentación. Sin formularios que
            piden tu dirección y tu historial salarial. Elige el equipo al que
            quieres unirte y comparte los enlaces públicos que hablan por ti —
            LinkedIn, GitHub, una charla, un portfolio.
          </p>
          <div className="mt-9">
            <a
              href="#apply"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-md text-[15px] font-semibold text-white bg-ink no-underline hover:bg-brand transition-colors"
            >
              Presentar candidatura con enlaces →
            </a>
          </div>
        </div>
      </section>

      {/* Why no CVs */}
      <section className="bg-white border-t border-warm-100 py-24">
        <div className="max-w-[900px] mx-auto px-5 sm:px-8">
          <span className="eyebrow mb-5" style={{ display: "inline-flex" }}>
            Por qué contratamos así
          </span>
          <h2 className="h-section mt-5" style={{ maxWidth: "26ch" }}>
            El funnel de contratación estándar recoge datos{" "}
            <em>que nunca necesitó.</em>
          </h2>
          <div className="mt-8 space-y-6 text-[17px] leading-[1.7] text-ink-2">
            <p>
              Una candidatura típica pide un PDF con tu dirección, tu foto y
              todo tu historial laboral — y lo guarda años en un ATS. La mayor
              parte de esos datos nunca influye en la decisión. Solo se queda
              ahí, como riesgo.
            </p>
            <p>
              Sealmetrics mide el tráfico de una web sin depender del consentimiento
              ni recoger datos personales — ese es todo el producto. Aplicar la lógica contraria
              a las personas que quieren construirlo con nosotros sería
              incoherente. Por eso la candidatura son tres campos de enlace
              opcionales y un selector de equipo. Los enlaces que compartes son
              la candidatura, y los evalúa una persona contra el equipo que
              elegiste.
            </p>
            <p>
              Si quieres saber con quién trabajarías antes de compartir nada,
              lee{" "}
              <Link href="/es/about" className="text-brand">
                quién está detrás de Sealmetrics
              </Link>{" "}
              u{" "}
              <Link href="/open" className="text-brand">
                Open — cómo trabajamos, documentado en público
              </Link>
              . Fundada en 2024, con sede en Barcelona y hosting en la UE, en
              Dublín.
            </p>
          </div>
        </div>
      </section>

      {/* Teams */}
      <section className="bg-warm-white border-t border-warm-100 py-24">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-8">
          <span className="eyebrow mb-5" style={{ display: "inline-flex" }}>
            Los equipos
          </span>
          <h2 className="h-section mt-5" style={{ maxWidth: "22ch" }}>
            Seis puertas de entrada. <em>Elige la tuya.</em>
          </h2>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {TEAMS.map((team) => (
              <div
                key={team.name}
                className="bg-white border border-warm-100 rounded-xl p-7"
              >
                <h3 className="text-[17px] font-semibold text-ink tracking-[-0.01em]">
                  {team.name}
                </h3>
                <p className="text-[14.5px] text-ink-soft leading-[1.6] mt-2.5">
                  {team.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What counts as signal */}
      <section className="bg-white border-t border-warm-100 py-24">
        <div className="max-w-[900px] mx-auto px-5 sm:px-8">
          <span className="eyebrow mb-5" style={{ display: "inline-flex" }}>
            Qué miramos
          </span>
          <h2 className="h-section mt-5" style={{ maxWidth: "24ch" }}>
            Cómo es un <em>enlace con señal</em>
          </h2>
          <div className="mt-10 flex flex-col gap-6">
            {SIGNALS.map((s) => (
              <div
                key={s.label}
                className="flex gap-5 pb-6 border-b border-warm-100 last:border-0 last:pb-0"
              >
                <span className="text-ink-soft select-none" aria-hidden>
                  —
                </span>
                <div>
                  <h3 className="text-[16px] font-semibold text-ink tracking-[-0.01em]">
                    {s.label}
                  </h3>
                  <p className="text-[15px] text-ink-soft leading-[1.6] mt-1">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Apply */}
      <section
        id="apply"
        className="bg-warm-white border-t border-warm-100 py-24"
      >
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-14 lg:gap-20 items-start">
            <div>
              <span className="eyebrow mb-5" style={{ display: "inline-flex" }}>
                Candidatura
              </span>
              <h2 className="h-section mt-5" style={{ maxWidth: "18ch" }}>
                Dos minutos. <em>Cero papeleo.</em>
              </h2>
              <div className="mt-9 flex flex-col gap-6">
                {[
                  {
                    n: "01",
                    t: "Elige tu equipo",
                    d: "Uno de los cinco equipos, o candidatura abierta si tu disciplina no está en la lista.",
                  },
                  {
                    n: "02",
                    t: "Comparte al menos un enlace público",
                    d: "LinkedIn, GitHub o cualquier otro enlace público. Sin PDFs, sin email, sin teléfono.",
                  },
                  {
                    n: "03",
                    t: "Revisamos y te contactamos por tu perfil",
                    d: "Una persona lee cada candidatura. Si hay encaje, el primer mensaje llega donde tú elegiste ser visible.",
                  },
                ].map((step) => (
                  <div key={step.n} className="flex gap-5">
                    <span className="font-mono text-[12px] font-semibold text-brand tracking-[0.08em] pt-1">
                      {step.n}
                    </span>
                    <div>
                      <h3 className="text-[16px] font-semibold text-ink tracking-[-0.01em]">
                        {step.t}
                      </h3>
                      <p className="text-[14.5px] text-ink-soft leading-[1.6] mt-1">
                        {step.d}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:sticky lg:top-24">
              <CareersForm locale="es" />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white border-t border-warm-100 py-24">
        <div className="max-w-[900px] mx-auto px-5 sm:px-8">
          <span className="eyebrow mb-5" style={{ display: "inline-flex" }}>
            Preguntas
          </span>
          <h2 className="h-section mt-5" style={{ maxWidth: "22ch" }}>
            Antes de que preguntes
          </h2>
          <div data-md="skip" className="mt-10 flex flex-col gap-8">
            {FAQ.map((item) => (
              <div
                key={item.question}
                className="pb-8 border-b border-warm-100 last:border-0 last:pb-0"
              >
                <h3 className="text-[17px] font-semibold text-ink tracking-[-0.01em]">
                  {item.question}
                </h3>
                <p className="text-[15px] text-ink-soft leading-[1.65] mt-2.5">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
          <p className="text-[15px] text-ink-soft leading-[1.65] mt-10">
            ¿Curiosidad por el producto? Accede al dashboard con la{" "}
            <Link href="/demo-access" className="text-brand">
              cuenta demo
            </Link>{" "}
            o{" "}
            <Link href="/es/demo" className="text-brand">
              reserva una demo
            </Link>{" "}
            y mira lo que construye tu futuro equipo.
          </p>
        </div>
      </section>
    </>
  );
}
