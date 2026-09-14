import Link from "next/link";
import { BrandReportForm } from "@/components/forms/BrandReportForm";
import { FaqSection } from "@/components/ui/FaqSection";

type Locale = "en" | "es";

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export const brandMonitoringFaq = {
  en: [
    {
      question: "Is this the same as tracking what ChatGPT says with search enabled?",
      answer:
        "No, and the difference matters. This measures what a model knows from training, with web search switched off. It is the layer underneath: when a model has no source at hand, or when a tool calls the API without search, this is the answer it falls back on. What a user sees in ChatGPT with browsing is a different measurement.",
    },
    {
      question: "Which models answer the questions?",
      answer:
        "Fifteen: twelve open models served from European infrastructure, plus GPT-5.6, Claude Sonnet 5 and Claude Opus 5. Each one gets the same six questions, one run each, at the same output budget. The report names every model beside its answer.",
    },
    {
      question: "Who decides whether a model got my company right?",
      answer:
        "A model does, and the report says so on the page. It reads the six answers for each model and assigns one of four states: correct, partial, confuses it with someone else, or no usable answer. Nothing in the report is a human verdict, and none of it is presented as one.",
    },
    {
      question: "What does the report cost?",
      answer:
        "Nothing. It runs on Enroutia, the model routing platform behind it, and the inference is paid for by Sealmetrics. There is no card, no trial and no account to open.",
    },
    {
      question: "What happens to the email address I give you?",
      answer:
        "It is used to send you the report, and it is kept as a record of the request for up to 24 months. It is added to a mailing list only if you tick the box for occasional emails, and you can unsubscribe from any of them in one click. The AI models never see it: they receive the brand, the sector and the competitors, nothing else. To access or erase what we hold, write to privacy@sealmetrics.com.",
    },
    {
      question: "Can I ask about a company that is not mine?",
      answer:
        "Yes for a company, a product or a competitor. No for a person: the report is about organisations, and asking fifteen models what they believe about a named individual is a different problem with a different answer.",
    },
    {
      question: "How often does the answer change?",
      answer:
        "Every time a model ships a new version, and slowly in between. A brand that publishes a citable company page and gets its facts into the sources models train on can look different in the next edition. That is the point of measuring it.",
    },
  ],
  es: [
    {
      question: "¿Es lo mismo que ver qué dice ChatGPT con búsqueda activada?",
      answer:
        "No, y la diferencia importa. Esto mide lo que el modelo sabe de su entrenamiento, con la búsqueda web apagada. Es la capa de debajo: cuando un modelo no tiene una fuente a mano, o cuando una automatización llama a la API sin búsqueda, ésta es la respuesta a la que recurre. Lo que ve un usuario en ChatGPT navegando es otra medición.",
    },
    {
      question: "¿Qué modelos contestan?",
      answer:
        "Quince: doce modelos abiertos servidos desde infraestructura europea, más GPT-5.6, Claude Sonnet 5 y Claude Opus 5. Todos reciben las mismas seis preguntas, una ejecución cada uno y el mismo presupuesto de respuesta. El informe nombra cada modelo junto a lo que dijo.",
    },
    {
      question: "¿Quién decide si un modelo acierta con mi empresa?",
      answer:
        "Lo decide un modelo, y el informe lo dice en la propia página. Lee las seis respuestas de cada modelo y le asigna uno de cuatro estados: correcta, parcial, confunde la empresa, o sin respuesta utilizable. Nada del informe es un veredicto humano, y nada se presenta como tal.",
    },
    {
      question: "¿Qué cuesta el informe?",
      answer:
        "Nada. Corre sobre Enroutia, la plataforma de enrutado de modelos que hay detrás, y la inferencia la paga Sealmetrics. No hay tarjeta, ni prueba gratuita, ni cuenta que abrir.",
    },
    {
      question: "¿Qué hacéis con el correo que os doy?",
      answer:
        "Enviarte el informe, y guardarlo como registro de la solicitud durante un máximo de 24 meses. Sólo entra en una lista de correo si marcas la casilla de envíos ocasionales, y de cualquiera de ellos te das de baja en un clic. Los modelos de IA nunca lo ven: reciben la marca, el sector y los competidores, nada más. Para acceder a lo que guardamos o borrarlo, escribe a privacy@sealmetrics.com.",
    },
    {
      question: "¿Puedo preguntar por una empresa que no es la mía?",
      answer:
        "Sí para una empresa, un producto o un competidor. No para una persona: el informe es de organizaciones, y preguntar a quince modelos qué creen sobre alguien con nombre y apellidos es otro problema con otra respuesta.",
    },
    {
      question: "¿Cada cuánto cambia la respuesta?",
      answer:
        "Cada vez que un modelo saca versión, y despacio entre medias. Una marca que publica una página de empresa citable y consigue que sus datos lleguen a las fuentes con las que se entrenan los modelos puede salir distinta en la siguiente edición. Para eso se mide.",
    },
  ],
} as const;

const copy = {
  en: {
    home: "Home",
    breadcrumb: "AI brand monitoring",
    eyebrow: "Free report · no account",
    h1: (
      <>
        Ask fifteen models
        <br />
        <em>what they know about you.</em>
      </>
    ),
    heroBody:
      "Buyers no longer start at a search box. They ask a model, and the model answers from memory. This report asks fifteen of them six questions about your company and sends you what they actually said, quote by quote.",
    formTitle: "Request your report",
    formFoot: "Six questions · fifteen models · about five minutes",
    ownTag: "We ran it on ourselves first",
    ownTitle: (
      <>
        Five of fifteen models
        <br />
        <em>knew who we were.</em>
      </>
    ),
    ownBody:
      "Sealmetrics is a company with customers, a decade of history and a name that ten of those models attached to somebody else — industrial seals, water metering, call tracking. Not one of the eleven that answered a purchase question recommended us. We publish the numbers because the report is only worth something if it is allowed to say this.",
    ownStats: [
      ["5 / 15", "described the company correctly or with one error"],
      ["0 / 11", "recommended it when asked for a tool like ours, without naming anyone"],
      ["2", "factual errors serious enough to correct at the source"],
    ],
    measuresTag: "What the six questions ask",
    measuresTitle: (
      <>
        The answers a buyer gets
        <br />
        <em>before they reach you.</em>
      </>
    ),
    measuresBody:
      "Each question maps to a moment in a real conversation. The report keeps every answer whole, so you read what the model said rather than a score standing in for it.",
    measures: [
      ["01", "Who you are", "What the model says your company does, in its own words."],
      ["02", "What it praises and criticises", "The advantages and objections it repeats without being prompted."],
      ["03", "Who it recommends", "Ask for a tool like yours without naming anyone. See who it names."],
      ["04", "How it reads your sector", "The trends and shifts it believes are happening in your category."],
      ["05", "Your alternatives", "Who it puts in your place when someone asks for another option."],
      ["06", "You against a competitor", "How it frames the difference when the two names are side by side."],
    ],
    limitsTag: "What it does not measure",
    limitsTitle: (
      <>
        Stated plainly,
        <br />
        <em>so the number means something.</em>
      </>
    ),
    limits: [
      "Not what ChatGPT answers with browsing on. That is a live search result, not model memory, and it moves for different reasons.",
      "Not a visibility score. Every figure in the report carries its denominator — five of fifteen, zero of eleven — because a score with no denominator is a number nobody can check.",
      "Not a ranking against competitors. It counts how often each name appears in the answers you get, in one run, and says so.",
      "Not a person. The report covers companies, products and brands.",
    ],
    afterTag: "What you do with it",
    afterTitle: (
      <>
        The errors are the part
        <br />
        <em>you can actually fix.</em>
      </>
    ),
    afterBody:
      "A model that confuses your company with another one is reading the sources that exist. The report ends with the corrections worth making at the source, in the order that changes the next edition.",
    afterLinkLabel: "How Sealmetrics measures what search sends you",
    faqTag: "Questions before you ask for one",
    finalTitle: (
      <>
        It takes five minutes
        <br />
        <em>and one email.</em>
      </>
    ),
    finalBody:
      "You will get the report as a page you can open, keep and forward. If it says nothing is wrong, that is also an answer worth having in writing.",
    finalCta: "Book a demo",
    finalSecondary: "See what Sealmetrics measures",
  },
  es: {
    home: "Inicio",
    breadcrumb: "Monitorización de marca en IA",
    eyebrow: "Informe gratuito · sin cuenta",
    h1: (
      <>
        Pregunta a quince modelos
        <br />
        <em>qué saben de ti.</em>
      </>
    ),
    heroBody:
      "Quien te compra ya no empieza en un buscador. Le pregunta a un modelo, y el modelo contesta de memoria. Este informe hace seis preguntas sobre tu empresa a quince de ellos y te manda lo que dijeron, cita a cita.",
    formTitle: "Pide tu informe",
    formFoot: "Seis preguntas · quince modelos · unos cinco minutos",
    ownTag: "Empezamos por nosotros",
    ownTitle: (
      <>
        Cinco de quince modelos
        <br />
        <em>sabían quiénes éramos.</em>
      </>
    ),
    ownBody:
      "Sealmetrics es una empresa con clientes, con una década detrás y con un nombre que diez de esos modelos le colgaron a otro: sellado industrial, medición de agua, seguimiento de llamadas. Ninguno de los once que contestaron a una pregunta de compra nos recomendó. Publicamos los números porque el informe sólo vale algo si se le permite decir esto.",
    ownStats: [
      ["5 / 15", "describen la empresa bien o con un solo error"],
      ["0 / 11", "la recomiendan al pedir una herramienta como la nuestra, sin nombrar a nadie"],
      ["2", "errores de hecho lo bastante graves como para corregirlos en origen"],
    ],
    measuresTag: "Qué preguntan las seis preguntas",
    measuresTitle: (
      <>
        Las respuestas que recibe
        <br />
        <em>antes de llegar a ti.</em>
      </>
    ),
    measuresBody:
      "Cada pregunta corresponde a un momento de una conversación real. El informe conserva cada respuesta entera, así que lees lo que dijo el modelo y no una puntuación que lo sustituya.",
    measures: [
      ["01", "Quién eres", "Qué dice el modelo que hace tu empresa, con sus propias palabras."],
      ["02", "Qué valora y qué critica", "Las ventajas y las pegas que repite sin que nadie se lo pida."],
      ["03", "A quién recomienda", "Pide una herramienta como la tuya sin nombrar a nadie. Mira a quién nombra."],
      ["04", "Cómo lee tu sector", "Las tendencias y los cambios que cree que están pasando en tu categoría."],
      ["05", "Tus alternativas", "A quién pone en tu lugar cuando alguien pide otra opción."],
      ["06", "Tú frente a un competidor", "Cómo cuenta la diferencia con los dos nombres uno al lado del otro."],
    ],
    limitsTag: "Qué no mide",
    limitsTitle: (
      <>
        Dicho claro,
        <br />
        <em>para que la cifra signifique algo.</em>
      </>
    ),
    limits: [
      "No es lo que contesta ChatGPT con la búsqueda activada. Eso es un resultado de búsqueda en vivo, no la memoria del modelo, y se mueve por otros motivos.",
      "No es una puntuación de visibilidad. Cada cifra del informe lleva su denominador —cinco de quince, cero de once— porque una puntuación sin denominador es un número que nadie puede comprobar.",
      "No es un ranking contra tus competidores. Cuenta cuántas veces aparece cada nombre en las respuestas que salieron, en una ejecución, y lo dice.",
      "No es una persona. El informe es de empresas, productos y marcas.",
    ],
    afterTag: "Qué haces con él",
    afterTitle: (
      <>
        Los errores son la parte
        <br />
        <em>que sí puedes arreglar.</em>
      </>
    ),
    afterBody:
      "Un modelo que confunde tu empresa con otra está leyendo las fuentes que existen. El informe termina con las correcciones que merece la pena hacer en origen, en el orden que cambia la siguiente edición.",
    afterLinkLabel: "Cómo mide Sealmetrics lo que te manda la búsqueda",
    faqTag: "Preguntas antes de pedirlo",
    finalTitle: (
      <>
        Cuesta cinco minutos
        <br />
        <em>y un correo.</em>
      </>
    ),
    finalBody:
      "Recibirás el informe como una página que puedes abrir, guardar y reenviar. Si dice que no hay nada mal, ésa también es una respuesta que conviene tener por escrito.",
    finalCta: "Pide una demo",
    finalSecondary: "Mira qué mide Sealmetrics",
  },
} as const;

export function BrandMonitoringSignal({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const prefix = locale === "es" ? "/es" : "";
  return (
    <main className="sig-brand-page">
      <section className="sig-brand-hero">
        <nav className="sig-brand-breadcrumbs" aria-label="Breadcrumb">
          <Link href={`${prefix}/`}>{t.home}</Link>
          <span>/</span>
          <span>{t.breadcrumb}</span>
        </nav>
        <p className="sig-brand-eyebrow">
          <span>{t.eyebrow}</span>
        </p>
        <h1>{t.h1}</h1>
        <p className="sig-brand-hero-body">{t.heroBody}</p>
      </section>

      <section className="sig-brand-request" aria-label={t.formTitle}>
        <div className="sig-brand-module-top">
          <span>{t.formTitle}</span>
          <span>{t.formFoot}</span>
        </div>
        <BrandReportForm locale={locale} />
      </section>

      <section className="sig-brand-own">
        <div className="sig-brand-section-head">
          <div>
            <p className="sig-brand-tag">{t.ownTag}</p>
            <h2>{t.ownTitle}</h2>
          </div>
          <p>{t.ownBody}</p>
        </div>
        <div className="sig-brand-stat-grid">
          {t.ownStats.map(([figure, label]) => (
            <article key={figure}>
              <strong>{figure}</strong>
              <p>{label}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="sig-brand-measures">
        <div className="sig-brand-section-head">
          <div>
            <p className="sig-brand-tag sig-brand-tag-light">{t.measuresTag}</p>
            <h2>{t.measuresTitle}</h2>
          </div>
          <p>{t.measuresBody}</p>
        </div>
        <div className="sig-brand-measure-grid">
          {t.measures.map(([number, title, body]) => (
            <article key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="sig-brand-limits">
        <div className="sig-brand-section-head">
          <div>
            <p className="sig-brand-tag">{t.limitsTag}</p>
            <h2>{t.limitsTitle}</h2>
          </div>
        </div>
        <ul className="sig-brand-limit-list">
          {t.limits.map((limit) => (
            <li key={limit}>{limit}</li>
          ))}
        </ul>
      </section>

      <section className="sig-brand-after">
        <div className="sig-brand-section-head">
          <div>
            <p className="sig-brand-tag sig-brand-tag-light">{t.afterTag}</p>
            <h2>{t.afterTitle}</h2>
          </div>
          <p>
            {t.afterBody}{" "}
            <Link className="sig-brand-text-link" href={`${prefix}/ai-analytics/`}>
              {t.afterLinkLabel} <Arrow />
            </Link>
          </p>
        </div>
      </section>

      <section className="sig-brand-faq">
        <p className="sig-brand-tag">{t.faqTag}</p>
        <FaqSection items={brandMonitoringFaq[locale].map((item) => ({ ...item }))} locale={locale} />
      </section>

      <section className="sig-brand-final">
        <h2>{t.finalTitle}</h2>
        <p>{t.finalBody}</p>
        <div data-md="skip" className="sig-brand-actions">
          <Link className="sig-brand-button" href={`${prefix}/demo/`}>
            {t.finalCta}
            <Arrow />
          </Link>
          <Link className="sig-brand-text-link" href={`${prefix}/product/`}>
            {t.finalSecondary} <Arrow />
          </Link>
        </div>
      </section>
    </main>
  );
}
