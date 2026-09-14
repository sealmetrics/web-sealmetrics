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

const DATE_PUBLISHED = "2026-08-27";
const DATE_MODIFIED = "2026-08-27";

export const metadata: Metadata = {
  title: "Analítica y RGPD en España — la guía de la AEPD",
  description:
    "Cómo medir en España sin banner de cookies: guía de cookies de la AEPD de 2024, art. 22.2 de la LSSI-CE y la exención por arquitectura.",
  openGraph: {
    title: "Analítica y RGPD en España — la guía de la AEPD",
    description:
      "Guía de cookies de la AEPD de 2024, art. 22.2 de la LSSI-CE y las condiciones para medir audiencia de forma anónima sin consentimiento.",
    type: "article",
    images: [ogImage("/es/gdpr-analytics/spain/")],
    url: "https://sealmetrics.com/es/gdpr-analytics/spain/",
    siteName: "Sealmetrics",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Analítica y RGPD en España — la guía de la AEPD",
    description:
      "Guía de cookies de la AEPD de 2024, art. 22.2 de la LSSI-CE y las condiciones para medir audiencia de forma anónima sin consentimiento.",
    images: [ogImage("/es/gdpr-analytics/spain/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/es/gdpr-analytics/spain/",
    languages: getAlternatesEs("/gdpr-analytics/spain"),
  },
};

const criteria = [
  {
    n: "01",
    title: "Medición agregada y anónima",
    requirement:
      "Guía de cookies de la AEPD de 2024: las herramientas usadas únicamente para medición de audiencia anónima, sin seguimiento entre sitios, no requieren consentimiento.",
    us: "Solo recuentos agregados de canal y conversión. Ningún identificador por visitante, ningún perfil, ningún comportamiento cruzado entre sitios. El criterio se cumple por diseño de la arquitectura, no por configuración.",
  },
  {
    n: "02",
    title: "Sin tratamiento de datos personales",
    requirement:
      "La AEPD se alinea con el Dictamen 5/2019 del EDPB: si el tratamiento no se refiere a una persona identificada o identificable, no entra en el ámbito material del RGPD.",
    us: "La IP no se almacena — se usa de forma transitoria en memoria y se descarta. No se guarda huella de User-Agent. No se genera identificador. Los eventos son agregados a nivel de canal desde que llegan al servidor.",
  },
  {
    n: "03",
    title: "Solo contexto de primera parte",
    requirement:
      "El art. 22.2 de la LSSI-CE regula el uso de cookies. La medición anónima que se mantiene en primera parte y no habilita seguimiento entre sitios queda fuera del requisito de consentimiento.",
    us: "El píxel corre sobre un CNAME bajo el dominio del propio cliente. Primera parte, del lado servidor. Sin identificador de tercera parte y sin ruta de datos entre sitios.",
  },
  {
    n: "04",
    title: "Residencia en la UE",
    requirement:
      "Las autoridades españolas insisten en el tratamiento exclusivamente en la UE para dejar fuera del análisis las transferencias y el problema Schrems II.",
    us: "Tratamiento exclusivamente en Dublín, Irlanda — dentro de la zona de adecuación del RGPD. No se produce transferencia a tercer país.",
  },
];

const faqs = [
  {
    q: "¿La exención de la AEPD significa que no hace falta ningún banner?",
    a: "Significa que no hace falta banner para la capa de analítica en concreto, siempre que esa analítica cumpla las condiciones: agregada, anónima, sin seguimiento entre sitios y sin datos personales. El resto de herramientas de tu web — píxeles de Google Ads, píxeles de Meta, plataformas de test A/B que escriben cookies — siguen necesitando consentimiento. Lo que hacen muchos eCommerce españoles es reducir el alcance del banner a esas herramientas concretas en lugar de mantener un banner que lo cubre todo.",
  },
  {
    q: "¿Qué dice exactamente la LSSI-CE sobre cookies?",
    a: "El artículo 22.2 de la Ley 34/2002 de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE) es la transposición española del art. 5(3) de ePrivacy. Exige consentimiento informado antes de almacenar información en el equipo terminal del usuario o acceder a ella. La AEPD ha ido publicando guías — la más reciente, la guía de cookies de 2024 — que describen cuándo aplica la excepción, y la medición de audiencia agregada está incluida de forma explícita.",
  },
  {
    q: "¿Sirve para webs del sector público español?",
    a: "Sí. La contratación pública en España suele exigir tratamiento limpio frente a Schrems II (sin transferencia a EE.UU.), un DPA firmado bajo el art. 28 del RGPD, y o bien consentimiento explícito o bien una exención. Sealmetrics cubre las tres cosas: tratamiento solo en la UE desde Dublín, un DPA precumplimentado y la exención por arquitectura bajo el art. 22.2 de la LSSI-CE. Varios operadores del sector público español lo usan por ese motivo. Conviene decir también lo que no tenemos: no estamos certificados en ISO 27001 ni SOC 2 a día de hoy, y documentamos por escrito los controles que sí operamos.",
  },
  {
    q: "¿Qué tiene que seguir diciendo la política de privacidad?",
    a: "La política de privacidad debe mencionar la herramienta de analítica, su finalidad, las categorías de datos tratadas (agregados a nivel de canal), el plazo de conservación y la base jurídica (interés legítimo del art. 6(1)(f), junto con la excepción del art. 22.2 de la LSSI-CE). La obligación de transparencia de los arts. 13 y 14 del RGPD aplica igual, se recoja consentimiento o no. En el paquete TPSR va una plantilla.",
  },
  {
    q: "¿La posición de la AEPD coincide con la de la CNIL?",
    a: "En la exención en sí, sí. Las dos autoridades aceptan la medición de audiencia agregada y anónima sin consentimiento siempre que la arquitectura cumpla condiciones concretas. La guía de la AEPD es menos prescriptiva que la autoevaluación de 14 puntos de la CNIL, pero converge en el mismo resultado: sin identificador en el dispositivo, sin seguimiento entre sitios, sin datos personales y con residencia en la UE. La diferencia práctica es que la CNIL mantiene una lista de soluciones exentas nominadas y la AEPD no.",
  },
  {
    q: "¿Cambiaría algo el Digital Omnibus europeo?",
    a: "De momento no ha cambiado nada: la COM(2025) 837 es una propuesta de la Comisión de 19 de noviembre de 2025, todavía en procedimiento legislativo ordinario, con adopción realista en 2027–2028 y enmiendas sustantivas probables. Tal y como está redactada, eximiría de consentimiento la medición de audiencia agregada y de primera parte para uso propio del responsable en toda la UE, mediante un nuevo artículo 88a del RGPD, que convivirá con la posición de la AEPD en lugar de sustituirla. Hasta que haya texto adoptado, lo que aplica en España es el art. 22.2 de la LSSI-CE y la guía de cookies de la AEPD.",
  },
  {
    q: "¿Y si mi herramienta actual solo desactiva las cookies?",
    a: "Desactivar la cookie no es lo mismo que dejar de leer el dispositivo. Varias herramientas sustituyen la cookie por un hash derivado de IP, sistema operativo, navegador e idioma para seguir reconociendo visitas, y las Directrices 2/2023 del EDPB sitúan esas técnicas sin cookie dentro del ámbito del art. 5(3) de ePrivacy igualmente. La pregunta que hay que hacerle a tu proveedor no es si usa cookies, sino si escribe o lee algo en el equipo del visitante. Si la respuesta es que sí, la excepción del art. 22.2 hay que argumentarla; si es que no, no llega a activarse.",
  },
];

export default function Page() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Analítica y RGPD", href: "/es/gdpr-analytics" },
          { label: "España" },
        ]}
        locale="es"
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Analítica y RGPD", url: "/es/gdpr-analytics" },
          { name: "España", url: "/es/gdpr-analytics/spain" },
        ])}
      />
      <JsonLd
        data={speakableWebPageSchema({
          url: "/es/gdpr-analytics/spain",
          name: "Analítica y RGPD en España — la guía de cookies de la AEPD",
        })}
      />
      <JsonLd
        data={articleSchema({
          headline:
            "Analítica y RGPD en España — la guía de cookies de la AEPD y la excepción del art. 22.2 de la LSSI-CE",
          description:
            "Cómo se mide en España sin banner de cookies bajo la guía de cookies de la AEPD de 2024 y el art. 22.2 de la LSSI-CE. Requisitos de arquitectura, postura para sector público y el efecto del Digital Omnibus.",
          datePublished: DATE_PUBLISHED,
          dateModified: DATE_MODIFIED,
          url: "/es/gdpr-analytics/spain",
          category: "Compliance",
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
            País — España · AEPD
          </span>
          <h1 className="h-display mx-auto mt-5" style={{ maxWidth: "22ch" }}>
            Analítica en España.{" "}
            <em className="italic font-medium" style={{ color: "#E8B84B", fontStyle: "italic" }}>
              Sin banner de cookies.
            </em>
          </h1>
          <p
            className="text-ink-soft mt-8 mx-auto max-w-[64ch] leading-[1.55]"
            style={{ fontSize: "clamp(17px, 1.4vw, 20px)" }}
          >
            La guía de cookies de la AEPD de 2024 deja la medición de audiencia
            anónima fuera de la obligación de consentimiento. Esto es lo que
            exige esa excepción, en qué coincide con la CNIL y la DSK, y qué
            cambiaría la propuesta de Digital Omnibus.
          </p>
        </div>
      </section>

      <TldrBlock
        answer={
          <>
            La normativa española de cookies se apoya en el art. 22.2 de la
            LSSI-CE (la transposición del art. 5(3) de ePrivacy) y la
            interpreta la guía de cookies de la AEPD de 2024. La AEPD deja
            expresamente fuera del requisito de consentimiento la medición de
            audiencia agregada y anónima siempre que se cumplan cuatro
            condiciones: informes solo agregados, sin datos personales,
            contexto de primera parte sin seguimiento entre sitios y
            residencia en la UE. Sealmetrics está construido para cumplir cada
            una por diseño — el mismo patrón de arquitectura que cubre la
            exención de la CNIL en Francia y la del §25 de la TDDDG en
            Alemania.
          </>
        }
        bullets={[
          <><strong>Guía de cookies de la AEPD (2024)</strong> — excepción explícita para la medición agregada y anónima.</>,
          <><strong>Art. 22.2 de la LSSI-CE</strong> — la transposición española de ePrivacy, en vigor desde 2009.</>,
          <><strong>Compatible con sector público</strong> — limpio frente a Schrems II, solo UE, DPA firmado y exención por arquitectura.</>,
          <><strong>~50% de rechazo</strong> en banners estándar — media del eCommerce B2C español.</>,
        ]}
      />

      <section className="py-20 bg-white border-t border-warm-100">
        <div className="max-w-[840px] mx-auto px-5 sm:px-8">
          <h2 className="h-section">Las 4 condiciones de la excepción de la AEPD</h2>
          <p className="mt-6 text-[17px] leading-[1.75] text-ink-soft">
            La guía de la AEPD es menos prescriptiva que la autoevaluación de
            14 puntos de la CNIL, pero las condiciones de fondo convergen.
            Cuatro requisitos de arquitectura:
          </p>

          <div className="mt-10 space-y-7">
            {criteria.map((c) => (
              <div key={c.n} className="border border-warm-100 rounded-2xl p-6 bg-warm-white">
                <div className="flex items-baseline gap-4 mb-3">
                  <span className="font-mono text-[13px] font-semibold text-brand">{c.n}</span>
                  <h3 className="text-[18px] font-semibold text-ink">{c.title}</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
                  <div>
                    <span className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink-soft font-semibold">
                      Requisito español
                    </span>
                    <p className="mt-2 text-[14.5px] leading-[1.65] text-ink-soft">{c.requirement}</p>
                  </div>
                  <div>
                    <span className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-brand font-semibold">
                      Sealmetrics
                    </span>
                    <p className="mt-2 text-[14.5px] leading-[1.65] text-ink">{c.us}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-warm-white border-t border-warm-100">
        <div className="max-w-[840px] mx-auto px-5 sm:px-8">
          <h2 className="h-section">Sector público y sectores regulados</h2>
          <p className="mt-6 text-[17px] leading-[1.75] text-ink-soft">
            La contratación pública española — administraciones públicas,
            universidades, hospitales, gobiernos autonómicos — aplica reglas
            más estrictas que un eCommerce comercial, y la exención por
            arquitectura encaja limpiamente con esos requisitos:
          </p>

          <ul className="mt-8 space-y-3 text-[16px] leading-[1.7] text-ink-soft list-none pl-0">
            {[
              "Limpio frente a Schrems II para el dato de visitante — tratado en Dublín; el único subencargado en EE. UU., Resend, envía emails de cuenta con CCT + DPF.",
              "DPA firmado bajo el art. 28 del RGPD, disponible precumplimentado para contrafirma.",
              "Paquete TPSR con flujos de datos, conservación, cifrado y control de accesos.",
              "Postura ENS / ISO documentada (no estamos certificados en ISO 27001 ni SOC 2 a día de hoy — la hoja de ruta y los controles que sí operamos están documentados por completo).",
              "Base jurídica del art. 6(1)(f) más la excepción del art. 22.2 de la LSSI-CE — sin banner para la capa de analítica.",
            ].map((s) => (
              <li key={s} className="flex gap-3">
                <span className="text-brand" aria-hidden>—</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-20 bg-white border-t border-warm-100">
        <div className="max-w-[840px] mx-auto px-5 sm:px-8">
          <h2 className="h-section">Fuentes primarias españolas</h2>
          <ul className="mt-8 space-y-3 text-[15.5px] leading-[1.7] text-ink-soft list-none pl-0">
            <li className="flex gap-3">
              <span className="text-brand" aria-hidden>—</span>
              <a
                href="https://www.aepd.es/guias/guia-cookies.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand underline decoration-1 underline-offset-2"
              >
                AEPD — Guía sobre el uso de cookies (2024, PDF)
              </a>
            </li>
            <li className="flex gap-3">
              <span className="text-brand" aria-hidden>—</span>
              <a
                href="https://www.boe.es/eli/es/l/2002/07/11/34/con"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand underline decoration-1 underline-offset-2"
              >
                LSSI-CE — Ley 34/2002, texto consolidado en el BOE
              </a>
            </li>
            <li className="flex gap-3">
              <span className="text-brand" aria-hidden>—</span>
              <a
                href="https://www.aepd.es/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand underline decoration-1 underline-offset-2"
              >
                AEPD — Agencia Española de Protección de Datos
              </a>
            </li>
          </ul>
        </div>
      </section>

      <section className="py-20 bg-warm-white border-t border-warm-100">
        <div className="max-w-[840px] mx-auto px-5 sm:px-8">
          <h2 className="h-section text-center">Preguntas frecuentes de DPO</h2>
          <dl className="mt-12 divide-y divide-warm-100 border-y border-warm-100">
            {faqs.map((f) => (
              <div key={f.q} className="py-7">
                <dt className="text-[17px] font-semibold text-ink mb-3">{f.q}</dt>
                <dd
                  data-speakable
                  className="faq-answer text-[15.5px] leading-[1.7] text-ink-soft max-w-[68ch]"
                >
                  {f.a}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="py-20 bg-white border-t border-warm-100">
        <div className="max-w-[960px] mx-auto px-5 sm:px-8">
          <h2 className="h-section text-center">Para seguir leyendo</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-12">
            <Link
              href="/es/consentless-analytics"
              className="group block border border-warm-100 rounded-xl p-7 bg-warm-white no-underline transition-all hover:border-warm-200 hover:-translate-y-0.5"
            >
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">Pilar</span>
              <h3 className="mt-3 text-[18px] font-semibold tracking-[-0.01em] text-ink leading-[1.3] group-hover:text-brand transition-colors">
                Analítica sin consentimiento
              </h3>
              <p className="mt-3 text-[14.5px] leading-[1.6] text-ink-soft">
                El marco jurídico completo — RGPD, ePrivacy y seis autoridades europeas alineadas.
              </p>
            </Link>
            <Link
              href="/es/blog/gdpr-analytics-spain-faq"
              className="group block border border-warm-100 rounded-xl p-7 bg-warm-white no-underline transition-all hover:border-warm-200 hover:-translate-y-0.5"
            >
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">Blog</span>
              <h3 className="mt-3 text-[18px] font-semibold tracking-[-0.01em] text-ink leading-[1.3] group-hover:text-brand transition-colors">
                FAQ España — 7 respuestas directas
              </h3>
              <p className="mt-3 text-[14.5px] leading-[1.6] text-ink-soft">
                Si hace falta banner, si GA4 es legal, multas de la LSSI — lo que preguntan las tiendas online.
              </p>
            </Link>
            <Link
              href="/es/reg-gap-analysis"
              className="group block border border-warm-100 rounded-xl p-7 bg-warm-white no-underline transition-all hover:border-warm-200 hover:-translate-y-0.5"
            >
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">Herramienta</span>
              <h3 className="mt-3 text-[18px] font-semibold tracking-[-0.01em] text-ink leading-[1.3] group-hover:text-brand transition-colors">
                Análisis de brecha regulatoria
              </h3>
              <p className="mt-3 text-[14.5px] leading-[1.6] text-ink-soft">
                Audita tu stack requisito a requisito y ve dónde deja de cumplir.
              </p>
            </Link>
            <Link
              href="/es/vs/matomo"
              className="group block border border-warm-100 rounded-xl p-7 bg-warm-white no-underline transition-all hover:border-warm-200 hover:-translate-y-0.5"
            >
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">Comparativa</span>
              <h3 className="mt-3 text-[18px] font-semibold tracking-[-0.01em] text-ink leading-[1.3] group-hover:text-brand transition-colors">
                Sealmetrics vs Matomo
              </h3>
              <p className="mt-3 text-[14.5px] leading-[1.6] text-ink-soft">
                Qué cuesta de verdad una configuración exenta: UTMs, eCommerce y dato a nivel de visita.
              </p>
            </Link>
            <Link
              href="/es/dpa"
              className="group block border border-warm-100 rounded-xl p-7 bg-warm-white no-underline transition-all hover:border-warm-200 hover:-translate-y-0.5"
            >
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">Legal</span>
              <h3 className="mt-3 text-[18px] font-semibold tracking-[-0.01em] text-ink leading-[1.3] group-hover:text-brand transition-colors">
                Contrato de encargo (DPA)
              </h3>
              <p className="mt-3 text-[14.5px] leading-[1.6] text-ink-soft">
                Términos del art. 28, garantías de medición de audiencia, tratamiento solo en la UE y subencargados.
              </p>
            </Link>
          </div>
        </div>
      </section>

      <FinalCtaSharedV3
        locale="es"
        titleEn={
          <>
            One{" "}
            <em className="italic font-medium" style={{ color: "#E8B84B", fontStyle: "italic" }}>
              AEPD review
            </em>
            . Resolved.
          </>
        }
        titleEs={
          <>
            Una{" "}
            <em className="italic font-medium" style={{ color: "#E8B84B", fontStyle: "italic" }}>
              revisión AEPD
            </em>
            . Resuelta.
          </>
        }
        ledeEn="Book with the founder. Bring your DPO. We walk through the AEPD conditions live and ship the DPA + TPSR on the call."
        ledeEs="Reserva con el founder. Trae a tu DPO. Resolvemos las condiciones de la AEPD en directo y enviamos DPA + TPSR en la llamada."
      />
    </>
  );
}
