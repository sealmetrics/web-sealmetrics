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
  title: "Analítica sin consentimiento — medición legal, sin banners",
  description:
    "Analítica sin consentimiento: la vía legal a la medición web sin banner. RGPD, ePrivacy, exención CNIL — qué la hace lícita, por arquitectura.",
  openGraph: {
    title: "Analítica sin consentimiento — legal por arquitectura",
    description:
      "Cómo la analítica puede ser lícita bajo RGPD y ePrivacy sin banner de consentimiento. La ruta arquitectónica, la guía de autoridades, los límites.",
    type: "article",
    images: [ogImage("/es/consentless-analytics/")],
    locale: "es_ES",
    url: "https://sealmetrics.com/es/consentless-analytics/",
    siteName: "Sealmetrics",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Analítica sin consentimiento — legal por arquitectura",
    description: "Cómo la analítica puede ser lícita bajo RGPD y ePrivacy sin banner de consentimiento. La ruta arquitectónica, la guía de autoridades, los límites.",
    images: [ogImage("/es/consentless-analytics/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/es/consentless-analytics/",
    languages: getAlternatesEs("/consentless-analytics"),
  },
};

const faqs = [
  {
    q: "¿La analítica sin consentimiento es realmente legal bajo RGPD?",
    a: "Sí, cuando la arquitectura cumple los criterios de exención. El RGPD aplica al tratamiento de datos personales. El Art. 5(3) de ePrivacy regula el almacenamiento/acceso a información del dispositivo. Si un sistema de medición no almacena cookie, no establece identificador y no procesa datos personales, ambas normas quedan satisfechas sin diálogo de consentimiento. La CNIL ha publicado criterios explícitos para analítica; la DSK alemana, la AEPD, el Garante italiano, el ICO británico y la AP holandesa han emitido guía alineada. Esto no es un workaround — es la carve-out original que contemplaron las normas.",
  },
  {
    q: "¿Qué cambiaría el Digital Omnibus UE?",
    a: "Todavía nada: es una propuesta de la Comisión (COM(2025) 837, de 19 de noviembre de 2025), en procedimiento legislativo ordinario, con enmiendas sustantivas probables y adopción realista en 2027–2028. Tal como está redactada trasladaría las reglas sobre el equipo terminal al RGPD mediante un nuevo artículo 88a y eximiría de consentimiento la medición de audiencia agregada, first-party y de uso propio del responsable. Si sale adelante en esa forma, el banner deja de ser la línea divisoria y la pregunta pasa a ser qué te cuesta en medición una configuración de exención. La arquitectura sin consentimiento no se ve afectada en ningún caso — no hay banner que diseñar ni consentimiento que registrar.",
  },
  {
    q: "¿Sigo necesitando un banner por otras razones?",
    a: "Posiblemente — para pixels de Google Ads, Meta, herramientas A/B o cualquier script third-party que sí instale cookies. Sealmetrics elimina la razón específica de analítica para el banner, no todas las razones. Muchos equipos reducen el alcance del banner (o lo eliminan en páginas sin ad-pixels) cuando la analítica se mueve a una capa sin consentimiento.",
  },
  {
    q: "¿En qué se diferencia de herramientas «consent-light» o «privacy-friendly»?",
    a: "La mayoría de herramientas lightweight todavía instalan una cookie first-party o un ID de visitante aleatorio — son consent-light, no consentless. La exención CNIL es específica: sin identificador, sin enlace entre sesiones, sin profiling. Sealmetrics está construido para esa vara. El trade-off es honesto — sin identificación de visitantes recurrentes — y es la decisión de diseño deliberada que produce la exención legal.",
  },
  {
    q: "¿Y Schrems II y las transferencias a EE.UU.?",
    a: "El procesamiento es exclusivamente en Dublín, Irlanda, sobre infraestructura europea. No hay sub-procesadores estadounidenses en la ruta de datos. No se requiere evaluación de impacto de transferencia Schrems II porque no hay transferencia. El DPA, las SCCs (donde sean necesarias para servicios auxiliares) y el paquete TPSR están disponibles para revisión legal.",
  },
  {
    q: "¿Cambia la base legal si añado CRM o marketing tools después?",
    a: "La base legal de la capa de analítica no cambia. Lo que cambia es la superficie general: si añades una herramienta que sí almacena cookies o procesa datos personales, esa herramienta trae su propio requisito de consentimiento. El estatus de Sealmetrics lo determina su propia arquitectura, no las otras herramientas que corran junto a ella.",
  },
];

const authorities = [
  {
    country: "Francia",
    body: "CNIL",
    summary:
      "Publicó criterios explícitos de exención de analítica en 2020, reafirmados en 2024: sin identificador por usuario, sin tracking entre sesiones, reporting agregado, procesamiento UE-only. Sealmetrics cumple cada criterio.",
  },
  {
    country: "Alemania",
    body: "DSK / BfDI",
    summary:
      "Guía de la Datenschutzkonferenz: las herramientas de analítica sin cookies y sin fingerprinting no requieren consentimiento bajo §25 TDDDG. Alineada con la posición CNIL.",
  },
  {
    country: "España",
    body: "AEPD",
    summary:
      "Guía sobre el uso de cookies (2024): excluye explícitamente la medición agregada anónima de la obligación de consentimiento. Alineada con la Opinión EDPB 5/2019.",
  },
  {
    country: "Italia",
    body: "Garante",
    summary:
      "Tras la decisión sobre Google Analytics de 2022: las herramientas que anonimizan en la recolección y alojan en la UE no disparan las mismas restricciones. El procesamiento en Dublín y el diseño cero-identificador de Sealmetrics encajan en la exención.",
  },
  {
    country: "Reino Unido",
    body: "ICO (PECR)",
    summary:
      "La Sección 99 de la Data (Use and Access) Act 2025 modifica la Regulación 6 de PECR para permitir almacenar o acceder a información en el dispositivo del usuario sin consentimiento cuando la única finalidad es compilar estadísticas. En vigor desde el 5 de febrero de 2026.",
  },
  {
    country: "Países Bajos",
    body: "Autoriteit Persoonsgegevens",
    summary:
      "La guía de la AP sigue la posición EDPB: la analítica privacy-friendly — sin cookies, sin identificadores, procesamiento UE — está exenta del requisito de consentimiento.",
  },
];

export default function ConsentlessAnalyticsPillarEs() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Analítica sin consentimiento" }]} />
      <JsonLd data={breadcrumbSchema([{ name: "Analítica sin consentimiento", url: "/es/consentless-analytics" }])} />
      <JsonLd
        data={speakableWebPageSchema({
          url: "/es/consentless-analytics",
          name: "Analítica sin consentimiento — medición legal, sin banners",
        })}
      />
      <JsonLd
        data={articleSchema({
          headline: "Analítica sin consentimiento — la vía legal a la medición web sin banner",
          description:
            "Cómo la analítica puede ser lícita bajo RGPD y ePrivacy sin banner de consentimiento. La exención arquitectónica, la guía de seis autoridades europeas y el stack de compliance.",
          datePublished: PILLAR_DATE_PUBLISHED,
          dateModified: PILLAR_DATE_MODIFIED,
          url: "/es/consentless-analytics",
          category: "Privacy",
          author: { name: "Rafa Jiménez", url: "/es/authors/rafa-jimenez", jobTitle: "Founder, Sealmetrics" },
        })}
      />

      <section className="relative overflow-hidden bg-warm-white pt-28 md:pt-32 pb-12">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-8 text-center">
          <span className="eyebrow mb-5" style={{ display: "inline-flex", justifyContent: "center" }}>
            Pillar — Analítica sin consentimiento
          </span>
          <h1 className="h-display mx-auto mt-5" style={{ maxWidth: "24ch" }}>
            Analítica sin banners.{" "}
            <em className="italic font-medium" style={{ color: "#E8B84B", fontStyle: "italic" }}>
              Legal por arquitectura, no por papeleo.
            </em>
          </h1>
          <p className="text-ink-soft mt-8 mx-auto max-w-[64ch] leading-[1.55]" style={{ fontSize: "clamp(17px, 1.4vw, 20px)" }}>
            La vía legal a la medición web sin diálogo de cookies no es
            un workaround — es la exención que el RGPD y ePrivacy
            contemplaron desde el día uno. Seis autoridades europeas de
            protección de datos han descrito qué requiere la exención.
            Esto es cómo se ve en la práctica, y dónde están los límites.
          </p>
        </div>
      </section>

      <TldrBlock
        answer={
          <>
            La analítica sin consentimiento es medición web que no
            requiere banner porque no instala cookie, no almacena
            identificador personal y no crea perfil por usuario. La base
            legal es arquitectónica: sin datos personales procesados, el
            ámbito material del RGPD no aplica; sin almacenamiento en
            dispositivo, no se dispara el requisito de consentimiento
            del Art. 5(3) ePrivacy. La CNIL, la DSK alemana, la AEPD,
            el Garante, el ICO y la AP han publicado guía de exención
            alineada. El trade-off es concreto: sólo medición agregada
            y anónima — sin identificación de visitantes recurrentes,
            sin tracking entre sesiones.
          </>
        }
        bullets={[
          <><strong>Art. 6 RGPD</strong> — sin datos personales procesados, no se requiere selección de base legal.</>,
          <><strong>Art. 5(3) ePrivacy</strong> — sin almacenamiento o acceso al dispositivo, no se requiere diálogo de consentimiento.</>,
          <><strong>Seis autoridades UE</strong> han publicado guía explícita de exención (CNIL, DSK, AEPD, Garante, ICO, AP).</>,
          <><strong>Procesamiento sólo en UE</strong> en Dublín, Irlanda — la evaluación Schrems II es irrelevante porque no hay transferencia.</>,
        ]}
      />

      <section className="py-20 bg-white border-t border-warm-100">
        <div className="max-w-[840px] mx-auto px-5 sm:px-8">
          <h2 className="h-section">Por qué los banners de cookies dejaron de funcionar</h2>
          <p className="mt-6 text-[17px] leading-[1.75] text-ink-soft">
            Los banners de consentimiento nunca fueron una estrategia de
            medición — fueron un instrumento de compliance pegado encima
            de una estrategia de medición que asumía que todos decían
            que sí. Tres cosas rompieron esa asunción, y una regulación
            de 2026 la rompió aún más.
          </p>

          <div className="mt-10 space-y-8">
            <div>
              <h3 className="text-[18px] font-semibold text-ink mb-2">Las tasas de rechazo superaron la línea de break-even</h3>
              <p className="text-[16px] leading-[1.7] text-ink-soft">
                Cuando el visitante europeo medio decía sí el 80% del
                tiempo, la analítica de cookies absorbía la pérdida del
                20%. Hoy la media de marcas consumer está entre 40% y
                60% de rechazo. Las decisiones sobre el 40% restante
                son decisiones sobre una muestra auto-seleccionada —
                típicamente mayor, menos móvil, menos consciente de
                privacidad. El sesgo es silencioso y estructural.
              </p>
            </div>

            <div>
              <h3 className="text-[18px] font-semibold text-ink mb-2">El enforcement de dark-patterns cerró el agujero</h3>
              <p className="text-[16px] leading-[1.7] text-ink-soft">
                La CNIL multó a Google y Amazon por diseño asimétrico
                de banner en 2023. El Garante italiano siguió, y los
                reguladores nacionales de la UE tratan ya un botón de
                «rechazar» escondido como infracción por sí misma: debe
                ser tan prominente como «aceptar», sin casillas
                pre-marcadas, sin copy manipulador. La ventana breve en
                la que el diseño inteligente de banner elevaba las tasas
                de aceptación está cerrada.
              </p>
            </div>

            <div>
              <h3 className="text-[18px] font-semibold text-ink mb-2">La fatiga de banner es ahora un coste UX documentado</h3>
              <p className="text-[16px] leading-[1.7] text-ink-soft">
                Un estudio de la Universidad de Amsterdam de 2025 midió
                una caída del 14% en el engagement de primera página
                cuando el banner era la primera interacción. Para un
                eCommerce con paid acquisition a €5–30 CPC, el coste de
                abandono sólo por el banner ya excede el valor de los
                datos analíticos que lo gating.
              </p>
            </div>

            <div>
              <h3 className="text-[18px] font-semibold text-ink mb-2">El Digital Omnibus redibujaría la línea</h3>
              <p className="text-[16px] leading-[1.7] text-ink-soft">
                La propuesta de la Comisión de noviembre de 2025
                trasladaría las reglas sobre el equipo terminal al RGPD
                y eximiría de consentimiento la medición de audiencia
                agregada y first-party. Sigue siendo una propuesta
                &mdash; adopción realista en 2027&ndash;2028 &mdash;
                pero la dirección es clara. Lee las implicaciones
                prácticas en{" "}
                <Link
                  href="/es/blog/consent-banner-impact-on-analytics"
                  className="text-brand underline decoration-1 underline-offset-2"
                >
                  el impacto del banner sobre tu analítica
                </Link>
                . Efecto neto: el coste legal de correr analítica
                basada en cookies subió; el coste legal de correr
                analítica sin consentimiento es cero.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-warm-white border-t border-warm-100">
        <div className="max-w-[840px] mx-auto px-5 sm:px-8">
          <h2 className="h-section">La ruta arquitectónica a la legalidad</h2>
          <p className="mt-6 text-[17px] leading-[1.75] text-ink-soft">
            La exención no es una interpretación inteligente; es la
            redacción original. Tres anclajes regulatorios definen la
            vía, y un sistema de medición o vive dentro de ellos por
            diseño o no.
          </p>

          <div className="mt-10 space-y-6">
            <div className="border border-warm-100 rounded-2xl p-7 bg-white">
              <h3 className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-brand mb-2">Anclaje 1</h3>
              <h4 className="text-[18px] font-semibold text-ink mb-3">Art. 2 RGPD — ámbito material</h4>
              <p className="text-[16px] leading-[1.7] text-ink-soft">
                El RGPD aplica al «tratamiento de datos personales». Dato
                personal es cualquier información que se refiere a una
                persona física identificada o identificable. Si un
                sistema de medición procesa sólo conteos agregados —
                nunca un identificador, nunca un fingerprint, nunca un
                perfil de comportamiento — el sistema no procesa datos
                personales. El reglamento no aplica al output de
                medición. El EDPB confirmó este razonamiento en la
                Opinión 5/2019.
              </p>
            </div>

            <div className="border border-warm-100 rounded-2xl p-7 bg-white">
              <h3 className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-brand mb-2">Anclaje 2</h3>
              <h4 className="text-[18px] font-semibold text-ink mb-3">Art. 5(3) ePrivacy — almacenamiento en dispositivo</h4>
              <p className="text-[16px] leading-[1.7] text-ink-soft">
                ePrivacy exige consentimiento antes de almacenar o acceder
                a información en el dispositivo del usuario. El ejemplo
                clásico es una cookie. Si el sistema de medición no
                escribe cookie, no lee localStorage y no usa fingerprint,
                no hay nada en el dispositivo que dispare el Art. 5(3).
                No se requiere diálogo de consentimiento para esa ruta
                de procesamiento.
              </p>
            </div>

            <div className="border border-warm-100 rounded-2xl p-7 bg-white">
              <h3 className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-brand mb-2">Anclaje 3</h3>
              <h4 className="text-[18px] font-semibold text-ink mb-3">Los criterios de exención de la CNIL</h4>
              <p className="text-[16px] leading-[1.7] text-ink-soft">
                La CNIL publicó cinco criterios concretos que un sistema
                de analítica debe cumplir para calificar para la
                exención: propósito estrictamente limitado, sin tracking
                entre sitios, IPs anonimizadas o no almacenadas, sin
                combinación con datos personales de otras fuentes, y
                reporting sólo agregado. Sealmetrics cumple cada criterio
                por diseño — no por configuración. Otras autoridades se
                han alineado en torno a los mismos cinco puntos.
              </p>
            </div>
          </div>

          <p className="mt-10 text-[17px] leading-[1.75] text-ink-soft">
            La implementación técnica — recolección first-party server-side sin identificadores — está documentada en{" "}
            <Link href="/es/cookieless-analytics" className="text-brand underline decoration-1 underline-offset-2">
              analítica sin cookies
            </Link>
            . El diagrama de arquitectura y el detalle del pipeline viven en{" "}
            <Link href="/es/how-it-works" className="text-brand underline decoration-1 underline-offset-2">
              Cómo funciona
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="py-20 bg-white border-t border-warm-100">
        <div className="max-w-[1000px] mx-auto px-5 sm:px-8">
          <h2 className="h-section text-center">Guía de autoridades, por país</h2>
          <p className="mt-6 text-[17px] leading-[1.75] text-ink-soft text-center max-w-[64ch] mx-auto">
            Seis autoridades europeas de protección de datos han
            publicado guía explícita de exención para analítica que
            cumple los criterios arquitectónicos. La redacción cambia;
            la conclusión converge.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
            {authorities.map((a) => (
              <div key={a.country} className="border border-warm-100 rounded-xl p-6 bg-warm-white">
                <div className="flex items-baseline justify-between mb-3">
                  <h3 className="text-[16px] font-semibold text-ink">{a.country}</h3>
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-brand">{a.body}</span>
                </div>
                <p className="text-[14px] leading-[1.6] text-ink-soft">{a.summary}</p>
              </div>
            ))}
          </div>

          <p className="mt-12 text-[15px] leading-[1.7] text-ink-soft text-center max-w-[60ch] mx-auto">
            Las páginas dedicadas por país (
            <code className="font-mono text-[13px] bg-warm-100 px-1.5 py-0.5 rounded">/es/gdpr-analytics/france</code>,
            <code className="font-mono text-[13px] bg-warm-100 px-1.5 py-0.5 rounded ml-1">/spain</code>,
            <code className="font-mono text-[13px] bg-warm-100 px-1.5 py-0.5 rounded ml-1">/germany</code>) son
            parte del roadmap de contenido para Q3 2026.
          </p>
        </div>
      </section>

      <section className="py-20 bg-warm-white border-t border-warm-100">
        <div className="max-w-[840px] mx-auto px-5 sm:px-8">
          <h2 className="h-section">«Sin consentimiento» vs «consent-light» — la distinción que importa para DPOs</h2>
          <p className="mt-6 text-[17px] leading-[1.75] text-ink-soft">
            Confusión común: herramientas de analítica ligera que dicen
            «no banner needed» mientras siguen instalando una cookie
            first-party o un ID de visitante aleatorio. Desde la
            perspectiva de integración con CMP la experiencia es
            parecida. Desde la perspectiva regulatoria, no son la misma
            categoría.
          </p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-warm-100 rounded-2xl p-7 bg-white">
              <h3 className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] mb-3" style={{ color: "#B5423B" }}>Consent-light</h3>
              <ul className="space-y-2 text-[15px] leading-[1.6] text-ink list-none pl-0">
                {[
                  "Instala una cookie first-party o ID de visitante (a menudo aleatorio).",
                  "Se justifica bajo «interés legítimo» — postura que varias autoridades han rechazado para tracking entre sesiones.",
                  "Almacena el identificador en el dispositivo → el Art. 5(3) ePrivacy se sigue disparando.",
                  "El argumento depende de una interpretación banner-free que las autoridades pueden cuestionar caso por caso.",
                ].map((s) => (
                  <li key={s} className="flex gap-3">
                    <span style={{ color: "#B5423B" }} aria-hidden>—</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-warm-100 rounded-2xl p-7 bg-white">
              <h3 className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-brand mb-3">Sin consentimiento (Sealmetrics)</h3>
              <ul className="space-y-2 text-[15px] leading-[1.6] text-ink list-none pl-0">
                {[
                  "No instala cookie, no escribe localStorage, no genera ID de visitante.",
                  "El ámbito material RGPD no se activa — no se procesan datos personales.",
                  "El Art. 5(3) ePrivacy no se dispara — nada se almacena en el dispositivo.",
                  "Alineado con los criterios de exención CNIL, la guía AEPD, la posición DSK, las declaraciones de AP y ICO.",
                ].map((s) => (
                  <li key={s} className="flex gap-3">
                    <span className="text-brand" aria-hidden>—</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="mt-10 text-[15px] leading-[1.7] text-ink-soft">
            Para un DPO evaluando riesgo de vendor, la pregunta práctica
            es: ¿la defensa de la herramienta depende de interpretación
            regulatoria, o de la ausencia de condiciones disparadoras?
            La arquitectura sin consentimiento es la segunda respuesta.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white border-t border-warm-100">
        <div className="max-w-[840px] mx-auto px-5 sm:px-8">
          <h2 className="h-section">Qué viene con la plataforma</h2>
          <p className="mt-6 text-[17px] leading-[1.75] text-ink-soft">
            La exención arquitectónica elimina la carga del consentimiento.
            La siguiente documentación cubre el resto de una revisión de
            vendor:
          </p>

          <div className="mt-10 space-y-5">
            {[
              { name: "DPA", detail: "Data Processing Agreement, Art. 28 RGPD compliant, firmado por Sealmetrics S.L. como encargado. Pre-rellenado, listo para contraseñar." },
              { name: "Paquete TPSR", detail: "Documento de revisión de transferencia, privacidad y seguridad. Cubre flujos de datos, sub-procesadores (ninguno fuera de la UE sobre dato de visitante), retención, cifrado en reposo y en tránsito, control de accesos y procedimiento de brecha." },
              { name: "Lista de sub-procesadores", detail: "Lista completa de sub-procesadores con sus roles, jurisdicciones y DPAs se incluye en el paquete TPSR. UE-only por política." },
              { name: "Hosting y residencia", detail: "Todo el procesamiento en Dublín, Irlanda, sobre infraestructura europea. Sin sub-procesadores estadounidenses en la ruta de datos analíticos. Evaluación de transferencia Schrems II innecesaria — no hay transferencia." },
              { name: "Retención", detail: "Fija e idéntica para todos los planes, aplicada por TTL automático de base de datos: log técnico a nivel de evento 1 día, agregados horarios 90 días, agregados diarios y conversiones 24 meses. No se almacenan datos crudos a nivel individual más allá de la ventana de agregación al milisegundo." },
            ].map((row) => (
              <div key={row.name} className="flex gap-5 pb-5 border-b border-warm-100 last:border-0">
                <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-brand whitespace-nowrap pt-1 min-w-[120px]">{row.name}</span>
                <p className="text-[15px] leading-[1.7] text-ink">{row.detail}</p>
              </div>
            ))}
          </div>

          <p className="mt-10 text-[15px] leading-[1.7] text-ink-soft">
            La documentación completa de seguridad y arquitectura vive en{" "}
            <Link href="/es/security" className="text-brand underline decoration-1 underline-offset-2">Seguridad</Link>
            . Actualmente no estamos certificados en ISO 27001 ni SOC 2
            — el roadmap y los controles que ya operamos están
            documentados completos.
          </p>
        </div>
      </section>

      <section className="py-20 bg-warm-white border-t border-warm-100">
        <div className="max-w-[960px] mx-auto px-5 sm:px-8">
          <h2 className="h-section text-center">Lectura relacionada</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-12">
            <Link
              href="/es/blog/gdpr-analytics-without-consent"
              className="group block border border-warm-100 rounded-xl p-7 bg-white no-underline transition-all hover:border-warm-200 hover:-translate-y-0.5"
            >
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">RGPD</span>
              <h3 className="mt-3 text-[18px] font-semibold tracking-[-0.01em] text-ink leading-[1.3] group-hover:text-brand transition-colors">Analítica RGPD sin consentimiento</h3>
              <p className="mt-3 text-[14.5px] leading-[1.6] text-ink-soft">
                El razonamiento completo Art. 6 / Art. 5(3) con ejemplos de la CNIL, DSK y AEPD.
              </p>
              <span className="inline-flex items-center gap-1.5 mt-5 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-brand">Leer →</span>
            </Link>

            <Link
              href="/es/blog/consent-banner-impact-on-analytics"
              className="group block border border-warm-100 rounded-xl p-7 bg-white no-underline transition-all hover:border-warm-200 hover:-translate-y-0.5"
            >
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">Pérdida de medición</span>
              <h3 className="mt-3 text-[18px] font-semibold tracking-[-0.01em] text-ink leading-[1.3] group-hover:text-brand transition-colors">Lo que los banners de consentimiento le cuestan a tu dato</h3>
              <p className="mt-3 text-[14.5px] leading-[1.6] text-ink-soft">
                Tasas de rechazo por industria y el coste de las decisiones sobre la muestra superviviente.
              </p>
              <span className="inline-flex items-center gap-1.5 mt-5 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-brand">Leer →</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white border-t border-warm-100">
        <div className="max-w-[840px] mx-auto px-5 sm:px-8">
          <h2 className="h-section text-center">Preguntas frecuentes de DPOs</h2>
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
        titleEn={<>One <em className="italic font-medium" style={{ color: "#E8B84B", fontStyle: "italic" }}>compliance review</em>. Done.</>}
        titleEs={<>Una <em className="italic font-medium" style={{ color: "#E8B84B", fontStyle: "italic" }}>revisión legal</em>. Resuelta.</>}
        ledeEn="Book a 30-minute walkthrough with the founder. Bring your DPO."
        ledeEs="Reserva 30 min con el founder. Trae a tu DPO. Resolvemos las preguntas de arquitectura y te entregamos el DPA + TPSR en la llamada."
      />
    </>
  );
}
