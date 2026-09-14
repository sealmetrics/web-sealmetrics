import type { Metadata } from "next";
import { postDates } from "@/lib/content/blog";
import { PostByline } from "@/components/ui/PostByline";
import Link from "next/link";
import { getAlternates } from "@/lib/i18n/navigation";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";
import { CommercialModule } from "@/components/ui/CommercialModule";
import { ogImage } from "@/lib/seo/og";

export const metadata: Metadata = {
  title: "Analítica self-service con LENS AI",
  description:
    "Apuntar un LLM a tu dato es lo fácil. La infraestructura que hace fiables sus respuestas: dato cookieless completo más el MCP de Sealmetrics, como LENS AI.",
  openGraph: {
    title: "Qué hace falta para que la analítica self-service funcione de verdad",
    description:
      "Dato cookieless completo, un MCP semántico que el modelo no puede malinterpretar, un playbook de analista codificado y guardarraíles arquitectónicos. Cómo Sealmetrics lo integra como LENS AI.",
    type: "article",
    images: [ogImage("/es/blog/self-service-analytics-lens-ai/")],
    url: "https://sealmetrics.com/es/blog/self-service-analytics-lens-ai/",
    siteName: "Sealmetrics",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sealmetrics",
    title: "Qué hace falta para que la analítica self-service funcione de verdad",
    description: "Dato cookieless completo, un MCP semántico que el modelo no puede malinterpretar, un playbook de analista codificado y guardarraíles arquitectónicos. Cómo Sealmetrics lo integra como LENS AI.",
    images: [ogImage("/es/blog/self-service-analytics-lens-ai/")],
  },
  alternates: {
    canonical: "https://sealmetrics.com/es/blog/self-service-analytics-lens-ai/",
    languages: getAlternates("/blog/self-service-analytics-lens-ai"),
  },
};

const stack = [
  {
    n: "04",
    label: "La pregunta",
    body: "En lenguaje natural, de cualquiera — un CMO, un responsable de growth, un eCommerce manager. Sin SQL, sin rebuscar en dashboards.",
    accent: "amber",
  },
  {
    n: "03",
    label: "El playbook",
    body: "Elige el método: qué herramientas llamar, en qué orden, y cómo leer el resultado — la rutina que un analista senior ejecuta por instinto.",
    accent: "neutral",
  },
  {
    n: "02",
    label: "Herramientas semánticas (el MCP)",
    body: "Varias decenas de herramientas de solo lectura con nombre. Cada una mapea un concepto de negocio a una métrica canónica. Nada que malinterpretar.",
    accent: "neutral",
  },
  {
    n: "01",
    label: "Dato completo (los cimientos)",
    body: "Cookieless, first-party, sin pérdida por consentimiento, nunca muestreado. El input que hereda cada respuesta.",
    accent: "brand",
  },
];

const comparison = [
  {
    aspect: "Cómo responde",
    naive: "Escribe SQL contra tablas en bruto que no ha visto nunca",
    mcp: "Llama a una herramienta con nombre y contrato fijo y documentado",
  },
  {
    aspect: "Definiciones de métrica",
    naive: "Lo que el modelo infiera esta vez",
    mcp: "Una definición canónica por concepto, siempre la misma",
  },
  {
    aspect: "Respuestas plausibles pero falsas",
    naive: "Alto — una columna de staging parece una real",
    mcp: "Acotado por estructura — no hay columnas en bruto a su alcance",
  },
  {
    aspect: "Exposición de dato personal",
    naive: "Posible — las filas en bruto pueden llevar PII",
    mcp: "Imposible — cero PII por construcción, rechazado en la herramienta",
  },
  {
    aspect: "Atribución",
    naive: "Lo que el esquema codifique por casualidad",
    mcp: "Último clic, agregada, sin huecos de consentimiento",
  },
  {
    aspect: "Dónde corre la IA",
    naive: "Credenciales del warehouse entregadas a un modelo",
    mcp: "IA privada UE, tu propia clave, o MCP alojado",
  },
];

const faqs = [
  {
    question: "¿Qué es la analítica self-service con LENS AI?",
    answer:
      "Es la capacidad de que una persona no técnica —un CMO, un responsable de growth, un eCommerce manager— haga una pregunta en lenguaje natural y obtenga la respuesta directamente de su propia analítica, sin escribir SQL, sin rebuscar en dashboards y sin abrir un ticket a un analista. LENS AI es la marca paraguas de la IA de Sealmetrics; el MCP de Sealmetrics expone varias decenas de herramientas de solo lectura que un modelo como Claude, ChatGPT o Cursor llama en nombre del usuario para traer dato real y completo.",
  },
  {
    question: "¿Por qué apuntar un LLM a GA4 suele dar respuestas equivocadas?",
    answer:
      "Por dos motivos. Primero, el dato es incompleto: las herramientas basadas en cookies pierden la mayoría del tráfico UE tras el rechazo de consentimiento, los ad blockers y las restricciones de navegador, así que el modelo razona con seguridad sobre una fracción de la realidad. Segundo, un warehouse abierto obliga al modelo a adivinar cuál de cientos de campos representa un concepto de negocio como «revenue» o «conversiones», lo que produce números plausibles pero falsos. El dato completo más una superficie de herramientas acotada y con nombre eliminan ambos fallos.",
  },
  {
    question: "¿LENS AI reconstruye customer journeys o hace atribución multi-touch?",
    answer:
      "No. Sealmetrics mide eventos agregados y anónimos y atribuye el revenue a último clic, a nivel de evento. No identifica individuos, no cose pageviews en journeys por usuario y no ejecuta modelos multi-touch. El modelo solo puede responder lo que el dato agregado subyacente puede responder — que es precisamente lo que mantiene las respuestas honestas.",
  },
  {
    question: "¿Dónde corre la IA y sale mi dato de la UE?",
    answer:
      "Con LENS private AI, la inferencia corre sobre un modelo open-weight (gpt-oss-120b) alojado por Scaleway en París, y tu dato analítico permanece en Dublín — ambos en la UE. Tu dato nunca se comparte con terceros ni se usa para entrenar modelos de terceros. También puedes usar tu propia clave (Anthropic, OpenAI o Gemini) o conectar el MCP alojado en mcp.sealmetrics.com desde tu propio cliente.",
  },
  {
    question: "¿Esto sustituye a mi analista de datos?",
    answer:
      "Sustituye la cola que tiene delante tu analista — el flujo constante de «¿me sacas los números de X?». No sustituye el trabajo de criterio: diseño de experimentos, razonamiento causal y estrategia. El resultado realista es que el analista deja de ser el cuello de botella del reporting y dedica su tiempo a las preguntas que de verdad necesitan una persona.",
  },
];

const accentBar: Record<string, string> = {
  amber: "before:bg-amber",
  brand: "before:bg-brand",
  neutral: "before:bg-warm-200",
};

export default function Page() {
  const dates = postDates("self-service-analytics-lens-ai", "es");

  return (
    <>
      <Breadcrumbs items={[{ label: "Blog", href: "/es/blog" }, { label: "Analítica self-service con LENS AI" }]} locale="es" />
      <JsonLd
        data={articleSchema({
          headline: "Qué hace falta para que la analítica self-service funcione de verdad",
          description:
            "El dato cookieless completo más un MCP semántico permiten que cualquiera consulte su propia analítica en lenguaje natural, sin un analista en medio.",
          ...dates,
          url: "/es/blog/self-service-analytics-lens-ai",
          category: "IA y Analítica",
          author: { name: "Rafa Jiménez", url: "/es/authors/rafa-jimenez", jobTitle: "Founder, Sealmetrics" },
        })}
      />
      <JsonLd data={breadcrumbSchema([{ name: "Blog", url: "/es/blog" }, { name: "Analítica self-service con LENS AI", url: "/es/blog/self-service-analytics-lens-ai" }])} />

      <article className="pt-12 pb-28 bg-white">
        <div className="max-w-[936px] mx-auto px-5 sm:px-8">
          <header className="mb-12">
            <span className="inline-block text-[0.75rem] font-medium tracking-[0.08em] uppercase text-text-tertiary mb-4">
              IA y Analítica
            </span>
            <h1 className="font-serif text-[2.5rem] font-medium text-text-primary leading-[1.15] mb-5">
              Qué hace falta para que la analítica self-service <em>funcione de verdad</em>
            </h1>
            <p className="text-[1.2rem] leading-[1.6] text-text-secondary mb-6 max-w-[46ch]">
              Apuntar un LLM a tu dato es la parte fácil. Lo difícil es que sus respuestas sean fiables — y es la parte que Sealmetrics construyó primero, para luego integrarla como LENS AI.
            </p>
            <PostByline
              {...dates}
              readTime="10 min de lectura"
              authorName="Rafa Jiménez"
              authorUrl="/es/authors/rafa-jimenez"
              locale="es"
            />
          </header>

          <div className="space-y-6 text-[1.05rem] leading-[1.8] text-text-body">
            <p>
              Pregúntale a tu equipo de analítica por qué las ventas flojearon la semana pasada. Si la respuesta ya vive en un dashboard, la tienes en un minuto. Si no, tienes un ticket — y dos días de espera — porque las pocas personas que pueden consultar el warehouse con seguridad son las únicas que saben cuál de sus varias columnas de <em>revenue</em> es la que cuadra con finanzas.
            </p>
            <p>
              Ese es el problema del self-service, y ha resistido cada solución obvia. Bloquea el dato tras dashboards curados y ganas consistencia a cambio de cada pregunta que nadie anticipó. Abre el warehouse a todos y ganas cien definiciones contradictorias de la misma métrica. En ambos casos, la pregunta que no encaja en un gráfico existente acaba en una cola.
            </p>
            <p>
              Los modelos de lenguaje parecen la salida de emergencia: conectas uno, preguntas en lenguaje natural, obtienes respuesta. Para escribir código, ese instinto es más o menos correcto — ejecutas el resultado y funciona o no. La analítica no tiene esa red de seguridad. Un número sutilmente equivocado se parece exactamente a uno correcto. Apunta un modelo capaz a un warehouse en bruto y el resultado más probable no es insight; es <em>falsa precisión, segura de sí misma y bien formateada</em> — el peor tipo de error, porque a nadie se le ocurre comprobarlo.
            </p>
            <p>
              Así que la pregunta de verdad no es si un LLM puede responder preguntas de analítica. Es qué tiene que ser cierto debajo para que las respuestas merezcan confianza. Son cuatro cosas, y se apilan.
            </p>

            {/* ── Diagrama de arquitectura: el stack ── */}
            <figure className="my-10 not-prose">
              <div className="rounded-[16px] border border-warm-100 bg-warm-white overflow-hidden">
                {stack.map((layer, i) => (
                  <div
                    key={layer.n}
                    className={`relative flex gap-5 items-start p-6 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[3px] ${accentBar[layer.accent]} ${i !== 0 ? "border-t border-warm-100" : ""}`}
                  >
                    <span className="font-mono text-[0.85rem] font-semibold text-text-tertiary pt-0.5 tabular-nums">{layer.n}</span>
                    <div>
                      <div className="font-serif text-[1.05rem] font-medium text-text-primary mb-1">{layer.label}</div>
                      <div className="text-[0.9rem] leading-[1.6] text-text-secondary">{layer.body}</div>
                    </div>
                  </div>
                ))}
              </div>
              <figcaption className="mt-3 text-[0.8rem] text-text-tertiary text-center">
                Una pregunta baja por el stack; una respuesta trazable sube de vuelta. Falla cualquier capa y la respuesta vale solo lo que valga la más débil.
              </figcaption>
            </figure>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-12 mb-4">
              Capa 01 — Dato completo, o el resto no importa
            </h2>
            <p>
              La analítica self-service es un problema de calidad del dato antes que un problema de IA. Si tu capa de medición solo captura a los visitantes que aceptaron un banner, cada respuesta construida encima hereda ese sesgo — y ningún prompt arregla un dataset que nunca se recogió. Un modelo que razona sobre dato parcial no se equivoca por ser mal modelo; se equivoca porque razona sobre una fracción de la realidad y no tiene forma de saberlo.
            </p>
            <p>
              Sealmetrics empieza aquí. La <Link href="/es/glossary/cookieless-analytics" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">medición cookieless y first-party</Link> cuenta eventos de forma anónima en tu propio dominio: no hay cookies que rechazar, no hay endpoint de terceros que los ad blockers puedan atacar, no hay nada en el dispositivo que expire, y no hay muestreo por volumen. Cuando el modelo pregunta «¿cuántas conversiones de búsqueda de pago la semana pasada?», el número describe la totalidad de tu tráfico — no el resto que consintió. Si quieres la aritmética de cómo se erosiona la alternativa, repasamos por qué <Link href="/es/blog/why-ga4-shows-13pct-eu-traffic" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">GA4 acaba mostrando una porción diminuta del tráfico UE</Link>.
            </p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-12 mb-4">
              Capa 02 — Una superficie que el modelo no puede malinterpretar
            </h2>
            <p>
              El segundo modo de fallo —el modelo adivinando qué significa cada campo— se resuelve no dándole un warehouse sobre el que adivinar. El servidor MCP (Model Context Protocol) de Sealmetrics no le entrega al modelo un prompt de SQL. Expone varias decenas de herramientas de solo lectura con nombre, y cada una mapea un único concepto de negocio a una única métrica canónica con un contrato fijo: <code className="font-mono text-[0.85rem] bg-warm-50 px-1.5 py-0.5 rounded">get_overview</code> para los KPIs de cabecera, <code className="font-mono text-[0.85rem] bg-warm-50 px-1.5 py-0.5 rounded">get_channels</code> y <code className="font-mono text-[0.85rem] bg-warm-50 px-1.5 py-0.5 rounded">get_campaigns</code> para adquisición, <code className="font-mono text-[0.85rem] bg-warm-50 px-1.5 py-0.5 rounded">get_funnel</code> y <code className="font-mono text-[0.85rem] bg-warm-50 px-1.5 py-0.5 rounded">get_conversions</code> para resultados, <code className="font-mono text-[0.85rem] bg-warm-50 px-1.5 py-0.5 rounded">get_landing_pages</code> para el rendimiento de entrada.
            </p>
            <p>
              Cuando el modelo quiere revenue por país, hay una herramienta para eso y una definición detrás. No puede sumar por accidente una columna de staging, porque no hay ninguna a su alcance — solo la métrica que tu equipo acordó de verdad. Esta es la misma idea que un buen equipo de dato implementa internamente como capa semántica: forzar cada pregunta a pasar por un pequeño conjunto de definiciones gobernadas antes de tocar el dato en bruto. La diferencia es que aquí viene de fábrica. El contrato de la herramienta <em>es</em> el guardarraíl — no lo construyes ni lo mantienes.
            </p>

            {/* ── Tabla comparativa ── */}
            <div className="overflow-x-auto my-8 not-prose">
              <table className="w-full text-[0.85rem] border-collapse">
                <thead>
                  <tr className="border-b border-warm-200">
                    <th className="text-left py-3 pr-6 text-text-tertiary font-medium w-[26%]"> </th>
                    <th className="text-left py-3 px-4 text-text-secondary font-medium">LLM + warehouse en bruto</th>
                    <th className="text-left py-3 pl-4 text-brand font-medium">MCP de Sealmetrics</th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((row) => (
                    <tr key={row.aspect} className="border-b border-warm-100 last:border-0 align-top">
                      <td className="py-3 pr-6 text-text-body font-medium">{row.aspect}</td>
                      <td className="py-3 px-4 text-text-secondary">{row.naive}</td>
                      <td className="py-3 pl-4 text-text-primary">{row.mcp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <CommercialModule
              locale="es"
              hook="¿Tu equipo espera días por informes que en el fondo son tres consultas? En una demo ves a LENS responder esas preguntas sobre tu propio tráfico, sin tocar SQL."
            />

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-12 mb-4">
              Capa 03 — El flujo de un analista senior, codificado
            </h2>
            <p>
              Nombrar las métricas es la mitad del trabajo. La otra mitad es saber qué hacer con ellas — la secuencia que un buen analista ejecuta casi sin pensar cuando alguien pregunta «¿por qué han caído las ventas?». Sealmetrics codifica esa secuencia como un playbook de marketing que el modelo invoca por su cuenta. Haz una pregunta de diagnóstico y no improvisa; trae el playbook, que le entrega un <em>método</em> en lugar de una respuesta: empieza por el overview contra el periodo anterior, descompón por canal, aísla las campañas y landing pages que se movieron, separa el tráfico de la tasa de conversión, y solo entonces forma un diagnóstico con una lista de acciones priorizada. Después ejecuta ese método llamando a las herramientas de dato en orden.
            </p>

            {/* ── Transcripción real: slab oscuro ── */}
            <figure className="my-10 not-prose">
              <div className="relative rounded-[20px] bg-ink text-warm-50 overflow-hidden">
                <div
                  className="absolute inset-0 opacity-[0.30] pointer-events-none"
                  style={{ background: "radial-gradient(120% 90% at 85% 0%, rgba(45,139,109,0.5), transparent 60%)" }}
                />
                <div className="relative p-7 sm:p-9">
                  <div className="flex items-center gap-2 mb-6">
                    <span className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-warm-50/50">eCommerce · una pregunta real, de principio a fin</span>
                  </div>

                  <p className="text-[0.95rem] leading-[1.6] mb-6">
                    <span className="font-mono text-[0.7rem] uppercase tracking-[0.1em] text-amber mr-2">Tú</span>
                    «Las ventas pintan flojas esta semana frente a la anterior. ¿Qué ha pasado?»
                  </p>

                  <div className="font-mono text-[0.8rem] leading-[1.9] text-warm-50/85 space-y-1 border-l border-warm-50/15 pl-4 mb-6">
                    <div><span className="text-brand">→ get_overview</span> · this_week vs previous <span className="text-warm-50/45">— entradas planas, conversiones a la baja</span></div>
                    <div><span className="text-brand">→ get_channels</span> <span className="text-warm-50/45">— búsqueda de pago estable; el directo cae</span></div>
                    <div><span className="text-brand">→ get_landing_pages</span> <span className="text-warm-50/45">— una página de checkout pierde un tercio de conversión</span></div>
                    <div><span className="text-brand">→ get_conversions</span> <span className="text-warm-50/45">— la pérdida de revenue se concentra en una categoría</span></div>
                  </div>

                  <p className="text-[0.95rem] leading-[1.65]">
                    <span className="font-mono text-[0.7rem] uppercase tracking-[0.1em] text-brand mr-2">LENS AI</span>
                    El tráfico aguantó — esto es un problema de conversión, no de adquisición. Está aislado en tu página de checkout, donde la tasa cayó con fuerza a mitad de semana y arrastró las conversiones de directo mientras la búsqueda de pago no se vio afectada. Ese patrón apunta a algo en la página (una regresión del checkout o una rotura de stock), no a tu inversión en medios. Empieza por ahí; el presupuesto no es la causa.
                  </p>
                </div>
              </div>
              <figcaption className="mt-3 text-[0.8rem] text-text-tertiary text-center">
                Ejemplo ilustrativo. Las llamadas a herramientas y su orden son reales; los movimientos son representativos. No se escribió SQL, no se abrió ningún dashboard, no se interrumpió a ningún analista.
              </figcaption>
            </figure>

            <p>
              El método viaja a cualquier vertical — solo cambia el vocabulario. Aquí está el mismo bucle para un grupo hotelero que pregunta por reservas directas en lugar de conversión de checkout:
            </p>

            {/* ── Transcripción real: hoteles (slab oscuro) ── */}
            <figure className="my-10 not-prose">
              <div className="relative rounded-[20px] bg-ink text-warm-50 overflow-hidden">
                <div
                  className="absolute inset-0 opacity-[0.30] pointer-events-none"
                  style={{ background: "radial-gradient(120% 90% at 85% 0%, rgba(232,184,75,0.4), transparent 60%)" }}
                />
                <div className="relative p-7 sm:p-9">
                  <div className="flex items-center gap-2 mb-6">
                    <span className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-warm-50/50">Hoteles · el mismo bucle, reservas directas</span>
                  </div>

                  <p className="text-[0.95rem] leading-[1.6] mb-6">
                    <span className="font-mono text-[0.7rem] uppercase tracking-[0.1em] text-amber mr-2">Tú</span>
                    «Las reservas directas caen semana contra semana. ¿Es de canales o del sitio?»
                  </p>

                  <div className="font-mono text-[0.8rem] leading-[1.9] text-warm-50/85 space-y-1 border-l border-warm-50/15 pl-4 mb-6">
                    <div><span className="text-brand">→ get_overview</span> · this_week vs previous <span className="text-warm-50/45">— sesiones estables, reservas a la baja</span></div>
                    <div><span className="text-brand">→ get_channels</span> <span className="text-warm-50/45">— metabuscadores y paid aguantan; el directo cae</span></div>
                    <div><span className="text-brand">→ get_landing_pages</span> <span className="text-warm-50/45">— el motor de reservas de un hotel pierde conversión</span></div>
                    <div><span className="text-brand">→ get_conversions</span> <span className="text-warm-50/45">— la pérdida de revenue se concentra en ese hotel</span></div>
                  </div>

                  <p className="text-[0.95rem] leading-[1.65]">
                    <span className="font-mono text-[0.7rem] uppercase tracking-[0.1em] text-brand mr-2">LENS AI</span>
                    La demanda aguantó — metabuscadores y paid están estables, así que no es un problema de adquisición. La caída se concentra en la página de reservas de un hotel, donde la tasa de conversión cayó a mitad de semana mientras el resto del portfolio se mantuvo. Eso apunta a algo en el flujo de reservas de ese hotel — disponibilidad de tarifas, inventario o un paso roto —, no a tu mix de canales. Empieza por ese motor de reservas.
                  </p>
                </div>
              </div>
              <figcaption className="mt-3 text-[0.8rem] text-text-tertiary text-center">
                Ilustrativo. Mismo método, un portfolio hotelero midiendo reservas directas — atribuidas a último clic, en agregado, sin journey por huésped.
              </figcaption>
            </figure>

            <p>
              El output se lee como el primer pase de un analista junior — porque siguió el checklist de un analista senior. Eso es lo que se automatiza: no el criterio del analista, sino la capa de recuperación y primer diagnóstico que consumía la mayor parte de su semana. Es el mismo cambio que los equipos ven en toda la stack a medida que <Link href="/blog/ai-agent-traffic-analytics" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">los agentes de IA entran en el flujo de analítica</Link>.
            </p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-12 mb-4">
              Capa 04 — Por qué las respuestas se mantienen honestas
            </h2>
            <p>
              El self-service es peligroso cuando deja que la gente genere números de aspecto autoritario que nadie puede defender. Cuatro cosas lo mantienen con los pies en la tierra, y las cuatro son estructurales, no una promesa:
            </p>
            <ul className="space-y-2 list-none pl-0 [&>li]:relative [&>li]:pl-6 [&>li]:before:content-['—'] [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:text-text-tertiary">
              <li><strong>Cero PII por construcción.</strong> Las herramientas a nivel de evento validan contra el dato personal y lo rechazan. El modelo no puede sacar a una persona porque nunca se almacenó una persona.</li>
              <li><strong>Medición solo agregada.</strong> No hay journeys por usuario, no hay identificadores entre sesiones, no hay modelos multi-touch — así que el modelo no puede fabricar uno. Solo responde lo que las cuentas agregadas y anónimas pueden responder.</li>
              <li><strong>Una definición por concepto.</strong> Como cada herramienta lleva una única métrica canónica, dos personas que preguntan lo mismo con palabras distintas obtienen el mismo número. La consistencia la impone la superficie, no la disciplina.</li>
              <li><strong>Procedencia que puedes rastrear.</strong> Cada respuesta se resuelve a una herramienta con nombre sobre un periodo explícito en la zona horaria de tu cuenta — así que siempre puedes ver qué métrica la produjo, y la atribución es a <Link href="/es/glossary/revenue-attribution" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">último clic, a nivel de evento</Link>.</li>
            </ul>
            <p>
              Y el modelo corre donde tu equipo de compliance quiere. Con <Link href="/es/product" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">LENS private AI</Link>, la inferencia corre sobre un modelo open-weight (gpt-oss-120b) alojado por Scaleway en París mientras tu dato analítico permanece en Dublín — ambos UE, nunca compartido, nunca usado para entrenar modelos de terceros. ¿Prefieres tu propia stack? Usa tu clave de Anthropic, OpenAI o Gemini, o conecta el MCP alojado en <code className="font-mono text-[0.85rem] bg-warm-50 px-1.5 py-0.5 rounded">mcp.sealmetrics.com</code> desde cualquier cliente compatible. La base de dato es idéntica en ambos casos; solo estás eligiendo el algoritmo.
            </p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-12 mb-4">
              Lo que no sustituye — a propósito
            </h2>
            <p>
              Conviene ser preciso con el límite. LENS AI automatiza la cola de reporting: las preguntas de «sácame los números», «por qué se ha movido esto», «qué tal fue la campaña» que forman el grueso de las peticiones que le entran a un analista. No diseña tus experimentos, no razona sobre causalidad más allá de lo que el dato soporta, ni fija estrategia — ese criterio sigue siendo humano, y liberar tiempo para él es justamente el objetivo.
            </p>
            <p>
              Tampoco reconstruirá un customer journey ni repartirá crédito entre puntos de contacto, porque Sealmetrics no recoge el dato por usuario que esos informes requieren. Si tu modelo del mundo depende de coser el recorrido de una persona entre sesiones, esta es la herramienta equivocada, y lo decimos con honestidad. Lo que obtienes en cambio es una foto agregada, completa y defendible que un no-analista puede interrogar directamente.
            </p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-12 mb-4">
              Cómo empezar
            </h2>
            <p>
              El arranque más ligero posible es la demo abierta de LENS en <code className="font-mono text-[0.85rem] bg-warm-50 px-1.5 py-0.5 rounded">lens-lite.sealmetrics.com</code>, que ejecuta todo el bucle self-service sobre datos de ejemplo — pídele mejorar el ROAS, encontrar crecimiento o recortar desperdicio, y observa cómo recorre el método. Cuando tengas dato real, conecta el MCP en <code className="font-mono text-[0.85rem] bg-warm-50 px-1.5 py-0.5 rounded">mcp.sealmetrics.com</code> desde Claude, ChatGPT, Cursor o Claude Code; el mismo servidor puede incluso dar de alta un sitio nuevo desde el chat, de modo que la herramienta que responde tus preguntas es también la que te configura. La base de medición está cubierta de principio a fin en la página de <Link href="/es/how-it-works" className="text-text-primary no-underline border-b border-warm-200 pb-0.5 hover:border-text-primary transition-colors">cómo funciona</Link>.
            </p>
            <p>
              La conclusión es simple, y es el hilo conductor de las cuatro capas: la analítica self-service no empieza por el modelo. Empieza por un dato lo bastante completo para confiar en él y una superficie lo bastante acotada para que el modelo no pueda malinterpretarla. Acierta en eso — como hace Sealmetrics — y la cola del analista se responde casi sola.
            </p>

            <h2 className="font-serif text-[1.5rem] font-medium text-text-primary mt-12 mb-4">
              Preguntas que hacen los equipos
            </h2>
            {faqs.map((f) => (
              <div key={f.question} className="mt-6">
                <h3 className="font-serif text-[1.15rem] font-medium text-text-primary mb-2">{f.question}</h3>
                <p className="text-[0.95rem]">{f.answer}</p>
              </div>
            ))}
          </div>

          <CommercialModule
            locale="es"
            hook="¿Cuántas preguntas de «sácame los números» encola tu analista cada semana? Trae tres a una demo y ve a LENS resolverlas sobre tu dato real, con los datos del día listos antes de las 6 AM."
          />

          <div className="mt-16 pt-10 border-t border-warm-100">
            <h3 className="font-serif text-[1.1rem] font-medium text-text-primary mb-4">
              Sigue leyendo
            </h3>
            <div className="space-y-3">
              <Link
                href="/es/product"
                className="block text-[0.9rem] text-text-secondary no-underline hover:text-text-primary transition-colors"
              >
                Producto Sealmetrics y LENS AI
              </Link>
              <Link
                href="/es/how-it-works"
                className="block text-[0.9rem] text-text-secondary no-underline hover:text-text-primary transition-colors"
              >
                Cómo funciona Sealmetrics
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
