import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbSchema, personSchema } from "@/lib/schema";
import { getAlternatesEs } from "@/lib/i18n/navigation";
import { TldrBlock } from "@/components/ui/TldrBlock";
import { FinalCtaSharedV3 } from "@/components/sections/v3/FinalCtaSharedV3";
import { ogImage } from "@/lib/seo/og";

export const metadata: Metadata = {
  title: "Rafa Jiménez — Founder & CEO de Sealmetrics",
  description:
    "20+ años en analítica eCommerce europea. Founder de Sealmetrics, marketer digital, fundador de agencia y arquitecto de analítica.",
  alternates: {
    canonical: "https://sealmetrics.com/es/authors/rafa-jimenez/",
    languages: getAlternatesEs("/authors/rafa-jimenez"),
  },
  openGraph: {
    title: "Rafa Jiménez — Founder & CEO de Sealmetrics",
    description: "20+ años en analítica eCommerce europea. Founder de Sealmetrics.",
    type: "profile",
    images: [ogImage("/es/authors/rafa-jimenez/")],
    locale: "es_ES",
    url: "https://sealmetrics.com/es/authors/rafa-jimenez/",
    siteName: "Sealmetrics",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Rafa Jiménez — Founder & CEO de Sealmetrics",
    description: "20+ años en analítica eCommerce europea. Founder de Sealmetrics.",
    images: [ogImage("/es/authors/rafa-jimenez/")],
  },
};

export default function Page() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Autores" }, { label: "Rafa Jiménez" }]} locale="es" />
      <JsonLd
        data={breadcrumbSchema(
          [
            { name: "Rafa Jiménez", url: "/es/authors/rafa-jimenez" },
          ],
          "es"
        )}
      />
      <JsonLd
        data={personSchema({
          name: "Rafa Jiménez",
          jobTitle: "Founder & CEO, Sealmetrics",
          description:
            "20+ años en analítica eCommerce europea. Founder de Sealmetrics, plataforma de analítica first-party sin cookies alojada en Dublín. Ex marketer digital, fundador de agencia y asesor de grupos retail europeos.",
          url: "/es/authors/rafa-jimenez",
          sameAs: [
            "https://www.linkedin.com/in/rafajimenez/",
            "https://sealmetrics.com/es/about",
          ],
          knowsAbout: [
            "Analítica Web",
            "Tracking sin cookies",
            "Atribución de ingresos",
            "Cumplimiento RGPD",
            "Analítica eCommerce",
            "Analítica privacy-first",
            "Marketing Digital",
            "Tracking server-side",
            "Derecho europeo de protección de datos",
            "Protocolo MCP",
          ],
        })}
      />

      <section className="relative overflow-hidden bg-warm-white pt-28 md:pt-32 pb-16">
        <div className="max-w-[1000px] mx-auto px-5 sm:px-8">
          <span className="eyebrow mb-5" style={{ display: "inline-flex" }}>
            Perfil de autor
          </span>
          <h1 className="h-display mt-5" style={{ maxWidth: "24ch" }}>
            Rafa Jiménez — <em>analítica founder-led para Europa.</em>
          </h1>
          <p className="text-ink-soft mt-8 max-w-[68ch] leading-[1.55]" style={{ fontSize: "clamp(17px, 1.4vw, 20px)" }}>
            Dos décadas en analítica eCommerce europea. Founder &amp; CEO de Sealmetrics. Escribe sobre atribución compatible con RGPD, infraestructura sin cookies y por qué cuadrar tres fuentes de datos no es un trabajo.
          </p>
        </div>
      </section>

      <TldrBlock
        label="En resumen"
        answer={
          <>Rafa Jiménez es founder y CEO de <strong>Sealmetrics</strong>, plataforma europea de analítica web sin cookies alojada en Dublín. Pasó 20+ años en eCommerce europeo — primero como marketer digital, luego fundador de agencia, luego asesorando grupos retail — antes de construir Sealmetrics para resolver el problema que seguía viendo: equipos tomando decisiones de ingresos sobre datos que GA4, el pixel y el CRM reportaban distinto.</>
        }
        bullets={[
          <>Fundó Sealmetrics en 2020 para dar a equipos eCommerce europeos una fuente única de verdad defendible.</>,
          <>Escribe en la intersección entre derecho RGPD, atribución de ingresos e infraestructura analítica.</>,
          <>Publica contenido en el <Link href="/es/blog" className="text-brand hover:underline">blog de Sealmetrics</Link> y el <Link href="/es/glossary" className="text-brand hover:underline">glosario</Link>.</>,
        ]}
      />

      <section className="py-28 bg-white border-t border-warm-100">
        <div className="max-w-[900px] mx-auto px-5 sm:px-10">
          <span className="eyebrow mb-5" style={{ display: "inline-flex" }}>Trayectoria</span>
          <h2 className="h-section mt-5">20 años viendo a equipos decidir con <em>datos en los que no confiaban.</em></h2>

          <div className="mt-10 space-y-6 text-[17px] leading-[1.7] text-ink-2">
            <p>
              Los primeros roles de Rafa fueron en marketing digital para marcas DTC europeas, gestionando adquisición pagada en Google, Meta y afiliados. Cada mes, las reuniones seguían el mismo patrón: el número de GA4, el del pixel, el del CRM — tres fuentes, todas distintas, todas defendidas, ninguna cuadrada.
            </p>
            <p>
              Tras fundar una agencia y asesorar grupos retail, el patrón se volvió imposible de ignorar. El problema no eran los analistas. Era la arquitectura. Cada herramienta optimizando para su propio reporting. El rechazo de consentimiento dejaba invisible una parte grande del tráfico: en nuestra experiencia con clientes, entre el 40% y el 60% no acepta cookies. Las cadenas de sub-procesadores se extendían por tres continentes. Los equipos pasaban más tiempo cuadrando que actuando.
            </p>
            <p>
              Sealmetrics se construyó para reemplazar la conciliación con una capa neutral única — first-party, sin cookies, alojada en UE. Compliance por arquitectura, no por una capa banner añadida después.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-warm-50 border-t border-warm-100">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-10">
          <span className="eyebrow mb-5" style={{ display: "inline-flex" }}>Áreas de experiencia</span>
          <h2 className="h-section mt-5">De lo que Rafa <em>escribe y habla.</em></h2>
          <div className="grid md:grid-cols-2 gap-3 mt-10">
            {[
              { n: "Analítica sin cookies", d: "Conteo de eventos anónimo server-side first-party — sin cookies, sin identificadores, sin journeys por usuario." },
              { n: "Atribución de ingresos", d: "Last-click sobre datos completos — por qué la atribución modelada se rompe en Europa." },
              { n: "Arquitectura RGPD", d: "Cómo diseñar analítica que evita la recolección de datos personales por arquitectura, no por capas de consentimiento." },
              { n: "Analítica eCommerce", d: "Lo que los equipos DTC y retail europeos realmente necesitan de un stack analítico." },
              { n: "Schrems II & residencia de datos", d: "Por qué UE-hosted importa y cómo las cadenas de sub-procesadores comprometen compliance." },
              { n: "Analítica AI-native", d: "MCP servers, medición de tráfico de agentes IA y data warehouses listos para LLMs." },
            ].map((t) => (
              <article key={t.n} className="bg-white border border-warm-100 rounded-xl p-6">
                <h3 className="text-[17px] font-semibold text-ink tracking-[-0.015em]">{t.n}</h3>
                <p className="text-[13.5px] leading-[1.6] text-ink-soft mt-2">{t.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white border-t border-warm-100">
        <div className="max-w-[900px] mx-auto px-5 sm:px-10">
          <span className="eyebrow mb-5" style={{ display: "inline-flex" }}>Publica en</span>
          <h2 className="h-section mt-5">Dónde <em>leer más.</em></h2>
          <ul className="mt-10 space-y-4 text-[16px] text-ink-2">
            <li>
              — <Link href="/es/blog" className="text-brand hover:underline">Blog de Sealmetrics</Link> — ensayos sobre atribución, compliance y analítica europea
            </li>
            <li>
              — <Link href="/es/glossary" className="text-brand hover:underline">Glosario de Sealmetrics</Link> — definiciones técnicas curadas para equipos eCommerce UE
            </li>
            <li>
              — <Link href="/es/case-studies" className="text-brand hover:underline">Casos de cliente</Link> — cómo los equipos reemplazaron o complementaron GA4
            </li>
            <li>
              — <a href="https://www.linkedin.com/in/rafajimenez/" className="text-brand hover:underline">LinkedIn</a> — 20+ años de discusión sobre analítica eCommerce
            </li>
          </ul>
        </div>
      </section>

      <FinalCtaSharedV3
        locale="es"
        titleEn={<>Talk directly to the founder.</>}
        titleEs={<>Habla directamente con <em className="italic font-medium" style={{ color: "#E8B84B", fontStyle: "italic" }}>el founder.</em></>}
        ledeEn="30-minute walkthrough."
        ledeEs="30 min de walkthrough. Rafa lleva personalmente cada llamada de ventas."
      />
    </>
  );
}
