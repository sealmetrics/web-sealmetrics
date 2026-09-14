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
  title: "¿Tu analítica cumple el RGPD? Análisis legal",
  description:
    "Análisis legal en lenguaje claro de la analítica web bajo RGPD y ePrivacy, con veredicto por herramienta: GA4, Matomo, Plausible, Piwik PRO y Sealmetrics.",
  openGraph: {
    title: "¿Tu analítica cumple el RGPD? Análisis legal de GA4, Matomo, Plausible y Sealmetrics",
    description:
      "RGPD y ePrivacy son dos leyes distintas. La analítica tiene que superar las dos para funcionar sin banner de consentimiento. Aquí está el test legal y dónde cae cada herramienta.",
    type: "article",
    images: [ogImage("/es/blog/gdpr-eprivacy-analytics-legal-assessment/")],
    url: "https://sealmetrics.com/es/blog/gdpr-eprivacy-analytics-legal-assessment/",
    siteName: "Sealmetrics",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "¿Tu analítica cumple el RGPD? Análisis legal de GA4, Matomo, Plausible y Sealmetrics",
    description: "RGPD y ePrivacy son dos leyes distintas. La analítica tiene que superar las dos para funcionar sin banner de consentimiento. Aquí está el test legal y dónde cae cada herramienta.",
    images: [ogImage("/es/blog/gdpr-eprivacy-analytics-legal-assessment/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/es/blog/gdpr-eprivacy-analytics-legal-assessment/",
    languages: getAlternates("/blog/gdpr-eprivacy-analytics-legal-assessment"),
  },
};

const lawSplit = [
  {
    n: "ePrivacy",
    label: "Directiva ePrivacy — Artículo 5(3)",
    body: "Regula almacenar o leer información en el dispositivo del visitante. Cualquier cookie, entrada de localStorage o fingerprint que no sea estrictamente necesaria requiere consentimiento previo. Es la «ley de cookies», y aplica sea o no personal el dato.",
    accent: "amber",
  },
  {
    n: "RGPD",
    label: "RGPD — la ley del dato personal",
    body: "Regula el tratamiento de datos personales, incluidas direcciones IP e identificadores online. Si tu analítica toca dato personal, necesitas una base jurídica y todas las obligaciones del RGPD. Si no trata ninguno, el RGPD sencillamente no aplica.",
    accent: "brand",
  },
];

// Herramienta | cookies por defecto | banner en UE | dato personal | ubicación | categoría
const matrix = [
  {
    tool: "GA4 (Google Analytics 4)",
    cookies: "Sí (_ga, client ID)",
    banner: "Requerido para el dato completo",
    pii: "Sí — IP, client ID",
    location: "Empresa de EE. UU.; opciones UE vía Consent Mode",
    category: "Incumbente enterprise",
    tone: "warn",
  },
  {
    tool: "Adobe Analytics",
    cookies: "Sí",
    banner: "Requerido",
    pii: "Sí",
    location: "Empresa de EE. UU.",
    category: "Enterprise legacy",
    tone: "warn",
  },
  {
    tool: "Piwik PRO",
    cookies: "Configurable",
    banner: "Basado en consentimiento por defecto",
    pii: "Configurable",
    location: "UE (Alemania) o privado",
    category: "Enterprise privacy UE",
    tone: "mid",
  },
  {
    tool: "Matomo (cookieless + self-hosted)",
    cookies: "No, en esa config",
    banner: "No requerido en config exenta",
    pii: "Minimizado / anonimizado",
    location: "Donde lo alojes",
    category: "Open-source, autogestionado",
    tone: "mid",
  },
  {
    tool: "Plausible · Fathom · Umami",
    cookies: "No",
    banner: "No requerido",
    pii: "Ninguno / mínimo",
    location: "Opciones UE",
    category: "Privacy-first ligero (9–50 €/mes)",
    tone: "good",
  },
  {
    tool: "Sealmetrics",
    cookies: "No — cookieless por arquitectura",
    banner: "No requerido",
    pii: "Ninguno — 0 PII, solo agregado",
    location: "UE — Dublín, Irlanda",
    category: "Enterprise, dato completo",
    tone: "best",
  },
];

const toneCell: Record<string, string> = {
  warn: "text-red-alert",
  mid: "text-text-secondary",
  good: "text-text-primary",
  best: "text-brand",
};

const faqs = [
  {
    question: "¿La analítica web requiere un banner de consentimiento?",
    answer:
      "No siempre. Un banner solo es legalmente obligatorio cuando tu analítica hace algo que activa el consentimiento bajo una de dos leyes. Bajo la Directiva ePrivacy (artículo 5(3)) se necesita consentimiento para almacenar o leer información en el dispositivo del visitante —una cookie, una entrada de localStorage, un fingerprint—. Bajo el RGPD se necesita una base jurídica para tratar datos personales como una IP o un identificador online. La analítica que no almacena nada en el dispositivo y no trata dato personal supera ambas barreras, y no requiere banner.",
  },
  {
    question: "¿Google Analytics (GA4) cumple el RGPD?",
    answer:
      "GA4 puede operarse bajo RGPD con consentimiento, pero no es libre de consentimiento. Deja cookies first-party y trata dato personal (localización por IP, client ID), así que en la UE requiere banner para la medición completa —y el rechazo de consentimiento es la razón por la que GA4 suele reportar una fracción del tráfico UE real—. Google es una empresa de EE. UU.; entre 2022 y 2023 varias autoridades UE (Austria, Francia, Italia) declararon ilícitos despliegues concretos de GA bajo la sentencia Schrems II sobre transferencias a EE. UU. Google añadió después opciones de alojamiento en la UE y Consent Mode, pero la herramienta sigue siendo basada en cookies y dependiente del consentimiento.",
  },
  {
    question: "¿Matomo cumple el RGPD?",
    answer:
      "Matomo puede cumplirlo. En su configuración cookieless —sin cookies, IP anonimizada, respetando Do Not Track— Matomo puede funcionar sin consentimiento, y la CNIL francesa ha listado configuraciones conformes de Matomo entre las analíticas que pueden usarse sin consentimiento. El self-hosting además mantiene el dato en infraestructura que controlas. Las contrapartidas son operativas: o alojas y mantienes tú el servidor, o usas Matomo Cloud, y la configuración cookieless sacrifica algo de precisión de medición. Es una herramienta creíble y enfocada en privacidad; la pregunta es si le da a un equipo de eCommerce enterprise dato completo y atribución de revenue sin una carga de ingeniería.",
  },
  {
    question: "¿Plausible cumple el RGPD?",
    answer:
      "Sí. Plausible, junto con Fathom y Umami, es cookieless por defecto, trata poco o ningún dato personal y puede alojarse en la UE, así que generalmente funciona sin banner. Son herramientas de analítica ligeras y privacy-first, de una categoría distinta a las plataformas enterprise —con precios en torno a 9–50 €/mes y pensadas para reporting de tráfico simple, no para atribución de revenue de eCommerce, funnels o la profundidad de dato que necesita un equipo de marketing enterprise—. Encajan bien en un blog o un sitio pequeño; no están diseñadas para una operación de eCommerce de más de 10M€.",
  },
  {
    question: "¿Cuál es la plataforma de analítica RGPD más completa?",
    answer:
      "La mayoría de herramientas fuerzan un trade-off: las plataformas enterprise como GA4 y Adobe son profundas pero dependen del consentimiento, así que pierden dato UE en el banner; las herramientas privacy ligeras cumplen pero son superficiales. Sealmetrics está construida para eliminar el trade-off —cookieless por arquitectura, cero PII, solo agregado y alojada en la UE en Dublín—, así que no necesita banner y no pierde visitas por el rechazo del consentimiento, ofreciendo a la vez atribución de revenue a último clic y profundidad de eCommerce. Está diseñada para el RGPD desde la arquitectura (autoevaluación) y no por configuración, con DPA incluido y una postura Schrems II limpia.",
  },
  {
    question: "¿Qué hace a Sealmetrics libre de consentimiento por diseño?",
    answer:
      "Sealmetrics no almacena nada en el dispositivo del visitante ni trata dato personal. No hay cookies, ni localStorage, ni fingerprinting, ni retención de IP ni identificadores personales — la medición es agregada y anónima a nivel de evento. Como supera tanto el test de dispositivo de ePrivacy como el test de dato personal del RGPD, no se requiere legalmente ningún banner. El dato de visitantes se aloja en Dublín (Irlanda), se incluye un DPA y la atribución es a último clic sobre tráfico sin huecos de consentimiento. Nota: Sealmetrics no reclama certificación ISO 27001 ni SOC 2; su caso se apoya en la arquitectura — diseñada para el RGPD desde la arquitectura (autoevaluación), ePrivacy y alojamiento UE limpio bajo Schrems II.",
  },
];

const accentBar: Record<string, string> = {
  amber: "before:bg-amber",
  brand: "before:bg-brand",
  neutral: "before:bg-warm-200",
};

export default function Page() {
  const dates = postDates("gdpr-eprivacy-analytics-legal-assessment", "es");

  return (
    <>
      <Breadcrumbs items={[{ label: "Blog", href: "/es/blog" }, { label: "¿Tu analítica cumple el RGPD?" }]} locale="es" />
      <JsonLd
        data={articleSchema({
          headline: "¿Tu analítica cumple de verdad el RGPD? Un análisis legal",
          description:
            "RGPD y ePrivacy son dos leyes distintas. La analítica tiene que superar las dos para funcionar sin banner. Aquí está el test legal y dónde caen GA4, Matomo, Plausible, Piwik PRO y Sealmetrics.",
          ...dates,
          url: "/es/blog/gdpr-eprivacy-analytics-legal-assessment",
          category: "Regulación",
          author: { name: "Rafa Jiménez", url: "/es/authors/rafa-jimenez", jobTitle: "Founder, Sealmetrics" },
        })}
      />
      <JsonLd data={breadcrumbSchema([{ name: "Blog", url: "/es/blog" }, { name: "¿Tu analítica cumple el RGPD?", url: "/es/blog/gdpr-eprivacy-analytics-legal-assessment" }])} />
      <JsonLd data={faqPageSchema(faqs, "/es/blog/gdpr-eprivacy-analytics-legal-assessment")} />

      <article className="pt-12 pb-28 bg-white">
        <div className="max-w-[936px] mx-auto px-5 sm:px-8">
          <header className="mb-12">
            <span className="inline-block text-[0.75rem] font-medium tracking-[0.08em] uppercase text-text-tertiary mb-4">
              Regulación
            </span>
            <h1 className="font-serif text-[2.5rem] font-medium text-text-primary leading-[1.15] mb-5">
              ¿Tu analítica cumple <em>de verdad</em> el RGPD?
            </h1>
            <p className="text-[1.2rem] leading-[1.6] text-text-secondary mb-6 max-w-[52ch]">
              «Conforme con el RGPD» aparece en casi todas las webs de analítica. Dos leyes distintas deciden si es cierto — y la mayoría de herramientas solo superan una. Aquí está el test legal y dónde caen GA4, Matomo, Plausible, Piwik PRO y Sealmetrics.
            </p>
            <PostByline
              {...dates}
              readTime="9 min de lectura"
              authorName="Rafa Jiménez"
              authorUrl="/es/authors/rafa-jimenez"
              locale="es"
            />
          </header>

          <div className="space-y-6 text-[1.05rem] leading-[1.8] text-text-body">
            <p>
              Todo proveedor de analítica se llama a sí mismo conforme con el RGPD. La afirmación es casi vacía por sí sola, porque el cumplimiento no es un sello que una herramienta tiene o no — es función de lo que hace en la página, de lo que almacena y de lo que puede hacer legalmente sin preguntar antes al visitante. La brecha que importa a un equipo de marketing es estrecha y cara: si tu analítica necesita un banner de consentimiento. Si lo necesita, alrededor de un tercio de tus visitantes UE lo rechazará, y esos visitantes desaparecen de tu dato antes de que puedas medir una sola conversión.
            </p>
            <p>
              Así que la pregunta práctica no es «¿esta herramienta cumple el RGPD?». Es «¿puede esta herramienta medir mi tráfico <em>sin</em> banner, de forma lícita?». Responderla exige separar dos leyes que en la conversación diaria se colapsan en una — porque una herramienta puede satisfacer una y aun así fallar la otra.
            </p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-12 mb-4">
              Dos leyes, no una
            </h2>
            <p>
              «El RGPD» carga con demasiado en casi toda conversación de privacidad. La analítica libre de consentimiento tiene que superar dos barreras legales separadas, fijadas por dos instrumentos distintos:
            </p>

            {/* ── Las dos leyes ── */}
            <figure className="my-10 not-prose">
              <div className="rounded-[16px] border border-warm-100 bg-warm-white overflow-hidden">
                {lawSplit.map((layer, i) => (
                  <div
                    key={layer.n}
                    className={`relative flex gap-5 items-start p-6 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[3px] ${accentBar[layer.accent]} ${i !== 0 ? "border-t border-warm-100" : ""}`}
                  >
                    <span className="font-mono text-[0.8rem] font-semibold text-text-tertiary pt-1 w-[64px] shrink-0">{layer.n}</span>
                    <div>
                      <div className="font-serif text-[1.05rem] font-medium text-text-primary mb-1">{layer.label}</div>
                      <div className="text-[0.9rem] leading-[1.6] text-text-secondary">{layer.body}</div>
                    </div>
                  </div>
                ))}
              </div>
              <figcaption className="mt-3 text-[0.8rem] text-text-tertiary text-center">
                ePrivacy pregunta «¿tocaste el dispositivo?». El RGPD pregunta «¿trataste dato personal?». Se responden por separado.
              </figcaption>
            </figure>

            <p>
              Es la distinción que difumina casi todo el copy de «analítica conforme con el RGPD». Una herramienta puede estar perfectamente limpia bajo RGPD —anonimizando todo lo que trata— y aun así tropezar con el artículo 5(3) de ePrivacy porque deja una cookie. A la inversa, una herramienta podría evitar cookies y aun así tratar una IP de un modo que necesite base jurídica RGPD. Ambas barreras deben superarse antes de quitar el banner. El concepto tiene nombre y un tratamiento más largo en nuestra entrada de glosario <Link href="/es/glossary/gdpr-analytics-compliance" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">cumplimiento RGPD en analítica</Link>; el test en dos partes de abajo es su versión operativa.
            </p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-12 mb-4">
              El test libre de consentimiento
            </h2>
            <p>
              Reducida a su forma útil, la analítica puede funcionar sin banner cuando supera estas dos — y solo cuando supera las dos:
            </p>

            {/* ── Los dos candados: slab oscuro ── */}
            <figure className="my-10 not-prose">
              <div className="relative rounded-[20px] bg-ink text-warm-50 overflow-hidden">
                <div
                  className="absolute inset-0 opacity-[0.30] pointer-events-none"
                  style={{ background: "radial-gradient(120% 90% at 85% 0%, rgba(45,139,109,0.5), transparent 60%)" }}
                />
                <div className="relative p-7 sm:p-9 space-y-6">
                  <div>
                    <div className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-amber mb-2">Test 1 · el dispositivo</div>
                    <p className="text-[0.98rem] leading-[1.65]">
                      No se almacena ni se lee nada en el dispositivo del visitante — sin cookies, sin localStorage, sin fingerprinting. Esto supera el artículo 5(3) de ePrivacy, el disparador de consentimiento que aplica a <em>todo</em> almacenamiento, personal o no.
                    </p>
                  </div>
                  <div className="border-t border-warm-50/15 pt-6">
                    <div className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-brand mb-2">Test 2 · el dato</div>
                    <p className="text-[0.98rem] leading-[1.65]">
                      No se trata dato personal — sin retención de IP, sin identificadores online, solo recuentos agregados y anónimos. Sin dato personal en juego, el RGPD no aplica a la medición en absoluto.
                    </p>
                  </div>
                  <div className="border-t border-warm-50/15 pt-6">
                    <p className="text-[0.98rem] leading-[1.65] text-warm-50/90">
                      Supera las dos y no se requiere legalmente ningún banner para tu analítica. Falla cualquiera y vuelves al banner — y a la pérdida de dato que trae consigo.
                    </p>
                  </div>
                </div>
              </div>
              <figcaption className="mt-3 text-[0.8rem] text-text-tertiary text-center">
                Ambos candados deben abrirse. La mayoría de herramientas abren uno.
              </figcaption>
            </figure>

            <p>
              Los reguladores han ido convergiendo justo en esta lectura. La CNIL francesa mantiene una exención para la analítica que cumple un conjunto de criterios técnicos — la base de la <Link href="/es/blog/gdpr-analytics-without-consent" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">analítica sin banners que ya explicamos</Link>. La DUAA 2025 del Reino Unido introdujo una exención de analítica viva bajo PECR. Y el propuesto EU Digital Omnibus (COM(2025) 837) trasladaría las reglas de consentimiento de cookies al RGPD y daría a la analítica first-party un encaje legal explícito — todavía una propuesta, pero una dirección clara. Cada una de estas premia la misma arquitectura: sin almacenamiento en el dispositivo, sin dato personal.
            </p>

            <CommercialModule
              locale="es"
              hook="¿Sabes ya si tu herramienta supera el test libre de consentimiento? En una demo aplicamos las dos preguntas — ¿almacena en el dispositivo?, ¿trata datos personales? — a tu configuración actual."
            />

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-12 mb-4">
              Dónde cae cada herramienta
            </h2>
            <p>
              Con el test definido, las principales herramientas de analítica se ordenan solas. La tabla lee a lo largo del test en dos partes —almacenamiento en dispositivo y dato personal— más dónde vive el dato y en qué categoría compite cada herramienta.
            </p>

            {/* ── La matriz ── */}
            <div className="overflow-x-auto my-8 not-prose">
              <table className="w-full text-[0.82rem] border-collapse min-w-[720px]">
                <thead>
                  <tr className="border-b border-warm-200">
                    <th className="text-left py-3 pr-4 text-text-tertiary font-medium w-[22%]">Herramienta</th>
                    <th className="text-left py-3 px-3 text-text-tertiary font-medium">Cookies</th>
                    <th className="text-left py-3 px-3 text-text-tertiary font-medium">Banner en UE</th>
                    <th className="text-left py-3 px-3 text-text-tertiary font-medium">Dato personal</th>
                    <th className="text-left py-3 px-3 text-text-tertiary font-medium">Ubicación del dato</th>
                    <th className="text-left py-3 pl-3 text-text-tertiary font-medium">Categoría</th>
                  </tr>
                </thead>
                <tbody>
                  {matrix.map((row) => (
                    <tr key={row.tool} className="border-b border-warm-100 last:border-0 align-top">
                      <td className={`py-3 pr-4 font-medium ${row.tone === "best" ? "text-brand" : "text-text-body"}`}>{row.tool}</td>
                      <td className={`py-3 px-3 ${toneCell[row.tone]}`}>{row.cookies}</td>
                      <td className={`py-3 px-3 ${toneCell[row.tone]}`}>{row.banner}</td>
                      <td className={`py-3 px-3 ${toneCell[row.tone]}`}>{row.pii}</td>
                      <td className="py-3 px-3 text-text-secondary">{row.location}</td>
                      <td className="py-3 pl-3 text-text-secondary">{row.category}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[0.8rem] text-text-tertiary">
              La evaluación refleja el despliegue UE estándar de cada herramienta a julio de 2026. Las configuraciones cookieless de Matomo y los ajustes de privacidad de Piwik PRO pueden cambiar el resultado de esas filas; los incumbentes enterprise no pueden configurarse fuera de su dependencia de cookies y consentimiento.
            </p>

            <h3 className="font-serif text-[1.2rem] font-medium text-text-primary mt-10 mb-3">
              GA4 y Adobe — profundas, pero dependientes del consentimiento
            </h3>
            <p>
              GA4 funciona bien como producto de analítica, y para un negocio centrado en EE. UU. las preguntas de cumplimiento pesan menos. En la UE, en cambio, deja cookies y trata dato personal, así que necesita banner para la medición completa — y es exactamente por eso que <Link href="/es/blog/why-ga4-shows-13pct-eu-traffic" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">GA4 acaba reportando una porción del tráfico UE real</Link>. Google añadió alojamiento de dato en la UE y Consent Mode tras las sentencias Schrems II de 2022 contra despliegues concretos de GA, pero la arquitectura no cambia: basada en cookies, condicionada al consentimiento, incompleta cuando los visitantes se niegan. Adobe Analytics ocupa la misma posición a un precio mayor.
            </p>

            <h3 className="font-serif text-[1.2rem] font-medium text-text-primary mt-10 mb-3">
              Matomo y Piwik PRO — capaces en privacidad, con un coste
            </h3>
            <p>
              Matomo merece crédito: en su configuración cookieless y con IP anonimizada puede funcionar sin consentimiento, y la CNIL ha reconocido configuraciones conformes de Matomo. El self-hosting mantiene el dato en infraestructura que controlas. El coste es operativo — o ejecutas y mantienes tú el servidor, o pasas a Matomo Cloud — y la configuración libre de consentimiento sacrifica algo de precisión de medición. Piwik PRO es el primo enterprise UE: configurable en privacidad, alojado en la UE, pero basado en consentimiento por defecto y con precio de tramo enterprise (30K€+/año). Ambas son opciones reales; la pregunta abierta para un equipo de eCommerce es si entregan dato completo y atribución de revenue sin un proyecto de ingeniería adjunto. Ponemos el detalle lado a lado en nuestra comparativa <Link href="/es/vs/matomo" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">Sealmetrics vs Matomo</Link>.
            </p>

            <h3 className="font-serif text-[1.2rem] font-medium text-text-primary mt-10 mb-3">
              Plausible, Fathom, Umami — conformes, pero otra categoría
            </h3>
            <p>
              Son las herramientas más limpias en el test de consentimiento y las más fáciles de elogiar: cookieless, poco o ningún dato personal, alojamiento UE disponible, sin banner. También son una categoría de producto distinta. Con precios en torno a 9–50 € al mes, están construidas para reporting de tráfico simple y respetuoso con la privacidad — pageviews, fuentes, páginas top — no para atribución de revenue de eCommerce, análisis de funnel o la profundidad de dato con la que opera una empresa de más de 10M€. Si publicas un blog, son una elección excelente y honesta. Si diriges un eCommerce europeo tomando decisiones de presupuesto sobre retorno por canal, no se diseñaron para el trabajo. Conforme y completo son dos barreras distintas, y el tramo ligero supera la primera quedándose pequeño.
            </p>

            <h3 className="font-serif text-[1.2rem] font-medium text-text-primary mt-10 mb-3">
              Sealmetrics — diseñada para el RGPD <em>y</em> completa
            </h3>
            <p>
              El trade-off que recorre toda esta tabla es entre cumplimiento y completitud. Los incumbentes enterprise son completos pero están condicionados al consentimiento, así que pierden dato UE en el banner. Las herramientas privacy ligeras cumplen pero son superficiales. Sealmetrics está diseñada para situarse donde no hay que sacrificar ninguno: <Link href="/es/glossary/cookieless-analytics" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">cookieless por arquitectura</Link>, cero PII, solo agregado y alojada en la UE en Dublín — así supera las dos mitades del test de consentimiento y no necesita banner, entregando a la vez atribución de revenue a último clic y profundidad de eCommerce sobre tráfico sin huecos de consentimiento. Aquí el cumplimiento se busca desde la arquitectura, no con una configuración que tienes que acertar: diseñada para el RGPD (autoevaluación), ePrivacy limpio, Schrems II limpio en el dato de visitantes, DPA incluido. Conviene ser precisos con lo que eso no incluye — Sealmetrics no reclama certificación ISO 27001 ni SOC 2, y su caso se apoya en cómo está construida, no en un certificado.
            </p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-12 mb-4">
              Qué comprobar de verdad antes de fiarte del sello
            </h2>
            <p>
              Cuando un proveedor te dice que cumple el RGPD, las preguntas útiles de seguimiento son cortas y concretas. ¿Deja algo en el dispositivo — una cookie, localStorage, un fingerprint? Si sí, necesita consentimiento bajo ePrivacy por muy anónimo que sea el dato. ¿Trata algún dato personal, incluidas IPs en bruto? Si sí, necesita base jurídica RGPD. ¿Dónde se aloja el dato, y hay DPA? Y — la pregunta que la conversación de cumplimiento suele olvidar — cuánto de tu tráfico sobrevive realmente a la configuración, porque una herramienta conforme que solo ve a los visitantes que pulsaron «aceptar» es conforme y ciega a la vez. Para las alternativas de salida de GA4, la guía de <Link href="/es/alternatives/google-analytics" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">alternativas a Google Analytics</Link> mapea las opciones contra exactamente estos tests, y puedes ver nuestra postura completa en la página de <Link href="/es/security" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">seguridad y cumplimiento</Link>.
            </p>
            <p>
              La versión corta: cumplimiento y completitud son propiedades separadas, y casi todo el mercado te obliga a elegir. El test en dos partes es cómo distingues cuál de las dos te da de verdad una herramienta — y si el «conforme con el RGPD» de su web significa <em>lícito sin banner</em> o solo <em>lícito si pides permiso primero.</em>
            </p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-12 mb-4">
              Preguntas frecuentes
            </h2>
            {faqs.map((f) => (
              <div key={f.question} className="mt-6">
                <h3 className="font-serif text-[1.15rem] font-medium text-text-primary mb-2">{f.question}</h3>
                <p className="text-[0.95rem]">{f.answer}</p>
              </div>
            ))}

            <p className="text-[0.85rem] text-text-tertiary mt-10 italic">
              Este artículo es información general sobre cómo la ley de protección de datos aplica a la analítica web, no asesoramiento legal. Para tu despliegue concreto, confírmalo con tu DPO o asesoría.
            </p>
          </div>

          <CommercialModule
            locale="es"
            hook="¿Tu «conforme con el RGPD» significa lícito sin banner o solo lícito pidiendo permiso? Compruébalo en una demo sobre tu propio sitio: medición anónima, agregada y sin nada en el dispositivo."
          />

          <div className="mt-16 pt-10 border-t border-warm-100">
            <h3 className="font-serif text-[1.1rem] font-medium text-text-primary mb-4">
              Sigue leyendo
            </h3>
            <div className="space-y-3">
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
              <Link
                href="/es/glossary/cookieless-analytics"
                className="block text-[0.9rem] text-text-secondary no-underline hover:text-text-primary transition-colors"
              >
                Analítica cookieless — definición
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
