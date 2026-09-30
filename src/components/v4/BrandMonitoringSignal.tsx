import Link from "next/link";
import { BrandReportForm } from "@/components/forms/BrandReportForm";
import { FaqSection } from "@/components/ui/FaqSection";
import { Picture } from "@/components/ui/Picture";
import { CLIENT_LOGOS } from "@/components/sections/v3/ClientLogos";

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
        "No, and the difference matters. Eighteen of the nineteen models answer from training, with web search switched off. It is the layer underneath: when a model has no source at hand, or when a tool calls the API without search, this is the answer it falls back on. What a user sees in ChatGPT with browsing is a different measurement. The one exception is Perplexity Sonar, which always searches before it answers: it is in the report because that is what people who ask Perplexity see, and its answer arrives with the sources it cited.",
    },
    {
      question: "Does the report include ChatGPT, Claude, Gemini and Perplexity?",
      answer:
        "Yes. GPT-6 Sol and GPT-6 Astra from OpenAI, the company behind ChatGPT, Claude Opus 5.5 and Claude Sonnet 5 from Anthropic, and Gemini 3.8 Flash from Google are called through the API with web search switched off, so the report shows what each one holds in memory, not what its app would find by searching that day. Sonar, from Perplexity, is the exception: it searches the web before it answers, so its answer is what Perplexity finds that day, with its sources listed underneath.",
    },
    {
      question: "Which models answer the questions?",
      answer:
        "Nineteen: thirteen open models served from European infrastructure, plus GPT-6 Sol, GPT-6 Astra, Claude Sonnet 5, Claude Opus 5.5, Gemini 3.8 Flash and Perplexity Sonar. Each one gets the same six questions, one run each, at the same output budget. The report names every model beside its answer.",
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
        "It is used to send you the report, and it is kept as a record of the request for up to 24 months. It is added to a mailing list only if you tick the box for occasional emails, and you can unsubscribe from any of them in one click. Neither Enroutia, which generates the report, nor the AI models ever see it: they receive the brand, the sector and the competitors, nothing else. To access or erase what we hold, write to privacy@sealmetrics.com.",
    },
    {
      question: "Can I ask about a company that is not mine?",
      answer:
        "Yes for a company, a product or a competitor. No for a person: the report is about organisations, and asking nineteen models what they believe about a named individual is a different problem with a different answer.",
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
        "No, y la diferencia importa. Dieciocho de los diecinueve modelos contestan con lo que saben de su entrenamiento, con la búsqueda web apagada. Es la capa de debajo: cuando un modelo no tiene una fuente a mano, o cuando una automatización llama a la API sin búsqueda, ésta es la respuesta a la que recurre. Lo que ve un usuario en ChatGPT navegando es otra medición. La única excepción es Sonar, de Perplexity, que siempre busca antes de contestar: está en el informe porque es lo que ve quien le pregunta a Perplexity, y su respuesta llega con las fuentes que citó.",
    },
    {
      question: "¿El informe incluye ChatGPT, Claude, Gemini y Perplexity?",
      answer:
        "Sí. A GPT-6 Sol y GPT-6 Astra, de OpenAI, la empresa detrás de ChatGPT; a Claude Opus 5.5 y Claude Sonnet 5, de Anthropic, y a Gemini 3.8 Flash, de Google, se les llama por la API con la búsqueda web apagada, así que el informe enseña lo que cada uno tiene en la memoria, no lo que su app encontraría buscando ese día. Sonar, de Perplexity, es la excepción: busca en la web antes de contestar, así que su respuesta es lo que Perplexity encuentra ese día, con sus fuentes debajo.",
    },
    {
      question: "¿Qué modelos contestan?",
      answer:
        "Diecinueve: trece modelos abiertos servidos desde infraestructura europea, más GPT-6 Sol, GPT-6 Astra, Claude Sonnet 5, Claude Opus 5.5, Gemini 3.8 Flash y Sonar de Perplexity. Todos reciben las mismas seis preguntas, una ejecución cada uno y el mismo presupuesto de respuesta. El informe nombra cada modelo junto a lo que dijo.",
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
        "Enviarte el informe, y guardarlo como registro de la solicitud durante un máximo de 24 meses. Sólo entra en una lista de correo si marcas la casilla de envíos ocasionales, y de cualquiera de ellos te das de baja en un clic. Ni Enroutia, que genera el informe, ni los modelos de IA lo ven nunca: reciben la marca, el sector y los competidores, nada más. Para acceder a lo que guardamos o borrarlo, escribe a privacy@sealmetrics.com.",
    },
    {
      question: "¿Puedo preguntar por una empresa que no es la mía?",
      answer:
        "Sí para una empresa, un producto o un competidor. No para una persona: el informe es de organizaciones, y preguntar a diecinueve modelos qué creen sobre alguien con nombre y apellidos es otro problema con otra respuesta.",
    },
    {
      question: "¿Cada cuánto cambia la respuesta?",
      answer:
        "Cada vez que un modelo saca versión, y despacio entre medias. Una marca que publica una página de empresa citable y consigue que sus datos lleguen a las fuentes con las que se entrenan los modelos puede salir distinta en la siguiente edición. Para eso se mide.",
    },
  ],
} as const;

type SampleState = "correct" | "partial" | "confused" | "none";

// One square per model for question 01 of the sample, in the alphabetical model order of
// the full sample report (scripts/brand-report-sample/build.py, `STATE`). The mix is what
// the headline figures count — five correct and four partial make "9 / 19", six confused
// make "6 / 19" — so change one and the other, and the generated report, move together.
const SAMPLE_GRID: SampleState[] = [
  "correct", "partial", "partial", "correct", "confused", "none", "partial",
  "correct", "partial", "confused", "confused", "correct", "none",
  "correct", "confused", "none", "none", "confused", "confused",
];
const SAMPLE_LEGEND: SampleState[] = ["correct", "partial", "confused", "none"];

const copy = {
  en: {
    home: "Home",
    breadcrumb: "AI brand monitoring",
    eyebrow: "Free AI brand benchmark · no account",
    h1: (
      <>
        What do AIs know
        <br />
        <em>about your brand?</em>
      </>
    ),
    heroBody:
      "Your buyers ask ChatGPT, Claude, Gemini or Perplexity before they reach you. We ask nineteen models six questions about your company and send you every answer, word for word, with the errors marked. The questions are the same for every brand, so the report is a benchmark: you can set yourself against your competitors, and against your own next edition.",
    modelsLabel: "Who answers",
    models: [
      ["GPT-6 Sol", "OpenAI · ChatGPT"],
      ["GPT-6 Astra", "OpenAI · ChatGPT"],
      ["Claude Opus 5.5", "Anthropic · Claude"],
      ["Claude Sonnet 5", "Anthropic · Claude"],
      ["Gemini 3.8 Flash", "Google · Gemini"],
      ["Sonar", "Perplexity · searches the web"],
      ["+ 13 open models", "Served from EU infrastructure"],
    ],
    modelsNote:
      "Called through the API with web search off, so you read what each model remembers. Sonar is the exception: Perplexity searches before it answers, and the report lists its sources.",
    sampleTag: "What you get back",
    sampleTitle: (
      <>
        A sample report,
        <br />
        <em>before you ask for yours.</em>
      </>
    ),
    sampleBody:
      "An invented coffee brand run through the same six questions. The layout, the four states and the closing correction are the real report's; the brand, its competitors and the answers are made up, so no company is on display without having asked. The full sample report is one click away.",
    sampleBar: ["Sample · fictional brand", "Acme Coffee · specialty coffee eCommerce"],
    sampleStats: [
      ["9 / 19", "described the brand correctly or with one error"],
      ["3 / 17", "named it when asked for a brand like it, without being prompted"],
      ["6 / 19", "confused it with another company"],
    ],
    sampleGridLabel: "Question 01 · Who you are · one square per model",
    sampleStates: {
      correct: "Correct",
      partial: "Partial",
      confused: "Confuses it",
      none: "No usable answer",
    },
    sampleQuotes: [
      {
        model: "GPT-6 Sol",
        vendor: "OpenAI · ChatGPT",
        question: "01 · Who you are",
        state: "correct",
        text: "Acme Coffee is a Spanish online specialty coffee roaster based in Valencia, founded in 2019. It sells single-origin beans by subscription, roasts to order and ships within 48 hours across Spain.",
        note: "",
      },
      {
        model: "GPT-6 Astra",
        vendor: "OpenAI · ChatGPT",
        question: "01 · Who you are",
        state: "partial",
        text: "Acme Coffee is a Spanish specialty coffee roaster that sells single-origin beans online by subscription. Besides its web shop it runs two cafés in Madrid.",
        note: "One error: the brand sells online only and has no cafés.",
      },
      {
        model: "Open model · EU-served",
        vendor: "One of thirteen",
        question: "01 · Who you are",
        state: "confused",
        text: "Acme is best known as the fictional Acme Corporation from the Looney Tunes cartoons. I am not aware of a coffee company by that name.",
        note: "Takes the name for a cartoon company. Three open models do.",
      },
    ],
    sampleFixLabel: "Correction worth making at the source",
    sampleFix:
      "Say on the About page, in one sentence a model can quote, that Acme Coffee sells online only and has no physical cafés — and use the name in full, never «Acme» alone, so the pages about the roaster stop competing with the cartoon.",
    sampleFoot: "The full report · six questions · nineteen models · 114 answers kept whole",
    sampleCta: "Request yours",
    sampleFull: "See the full sample report",
    clientsTag: "Built by Sealmetrics",
    clientsBody:
      "The report is free. It comes from the team behind Sealmetrics, the cookieless analytics these companies use to measure what their marketing brings in.",
    formTitle: "Request your report",
    formFoot: "Six questions · nineteen models · about five minutes",
    ownTag: "We ran it on ourselves first, with fifteen models",
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
      "Not what ChatGPT, Claude or Gemini answer with search on. That is a live search result, not model memory, and it moves for different reasons. The one search answer in the report is Perplexity's, and it is labelled as one.",
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
    eyebrow: "Benchmark gratuito de marca en IA · sin cuenta",
    h1: (
      <>
        ¿Qué saben las IA
        <br />
        <em>de tu marca?</em>
      </>
    ),
    heroBody:
      "Quien te compra le pregunta a ChatGPT, Claude, Gemini o Perplexity antes de llegar a ti. Hacemos seis preguntas sobre tu empresa a diecinueve modelos y te mandamos cada respuesta, palabra por palabra, con los errores marcados. Las preguntas son las mismas para todas las marcas, así que el informe es un benchmark: te puedes comparar con tus competidores y con tu próxima edición.",
    modelsLabel: "Quién contesta",
    models: [
      ["GPT-6 Sol", "OpenAI · ChatGPT"],
      ["GPT-6 Astra", "OpenAI · ChatGPT"],
      ["Claude Opus 5.5", "Anthropic · Claude"],
      ["Claude Sonnet 5", "Anthropic · Claude"],
      ["Gemini 3.8 Flash", "Google · Gemini"],
      ["Sonar", "Perplexity · busca en la web"],
      ["+ 13 modelos abiertos", "Servidos desde infraestructura europea"],
    ],
    modelsNote:
      "Por la API y con la búsqueda web apagada, así que lees lo que cada modelo recuerda. Sonar es la excepción: Perplexity busca antes de contestar, y el informe lista sus fuentes.",
    sampleTag: "Lo que recibes",
    sampleTitle: (
      <>
        Un informe de muestra,
        <br />
        <em>antes de pedir el tuyo.</em>
      </>
    ),
    sampleBody:
      "Una marca de café inventada, pasada por las mismas seis preguntas. La estructura, los cuatro estados y la corrección final son los del informe real; la marca, sus competidores y las respuestas son inventados, para no exponer a ninguna empresa que no lo haya pedido. El informe de muestra completo está a un clic.",
    sampleBar: ["Muestra · marca ficticia", "Acme Coffee · eCommerce de café de especialidad"],
    sampleStats: [
      ["9 / 19", "describen la marca bien o con un solo error"],
      ["3 / 17", "la nombran al pedir una marca como ella, sin que nadie la mencione"],
      ["6 / 19", "la confunden con otra empresa"],
    ],
    sampleGridLabel: "Pregunta 01 · Quién eres · un cuadro por modelo",
    sampleStates: {
      correct: "Correcta",
      partial: "Parcial",
      confused: "La confunde",
      none: "Sin respuesta utilizable",
    },
    sampleQuotes: [
      {
        model: "GPT-6 Sol",
        vendor: "OpenAI · ChatGPT",
        question: "01 · Quién eres",
        state: "correct",
        text: "Acme Coffee es un tostador español de café de especialidad que vende online, con sede en Valencia y fundado en 2019. Vende café de origen único por suscripción, tuesta bajo pedido y envía en 48 horas a toda España.",
        note: "",
      },
      {
        model: "GPT-6 Astra",
        vendor: "OpenAI · ChatGPT",
        question: "01 · Quién eres",
        state: "partial",
        text: "Acme Coffee es un tostador español de café de especialidad que vende café de origen único online por suscripción. Además de la tienda web tiene dos cafeterías en Madrid.",
        note: "Un error: la marca sólo vende online y no tiene cafeterías.",
      },
      {
        model: "Modelo abierto · servido en la UE",
        vendor: "Uno de trece",
        question: "01 · Quién eres",
        state: "confused",
        text: "Acme es sobre todo la Acme Corporation ficticia de los dibujos de Looney Tunes. No conozco una empresa de café con ese nombre.",
        note: "Confunde el nombre con una empresa de dibujos animados. Lo hacen tres modelos abiertos.",
      },
    ],
    sampleFixLabel: "Corrección que merece la pena hacer en origen",
    sampleFix:
      "Decir en la página de empresa, en una frase que un modelo pueda citar, que Acme Coffee sólo vende online y no tiene cafeterías físicas, y usar siempre el nombre completo, nunca «Acme» a secas, para que las páginas del tostador dejen de competir con los dibujos.",
    sampleFoot: "El informe completo · seis preguntas · diecinueve modelos · 114 respuestas enteras",
    sampleCta: "Pide el tuyo",
    sampleFull: "Ver el informe de muestra completo",
    clientsTag: "Lo hace Sealmetrics",
    clientsBody:
      "El informe es gratis. Lo hace el equipo de Sealmetrics, la analítica sin cookies con la que estas empresas miden lo que les trae su marketing.",
    formTitle: "Pide tu informe",
    formFoot: "Seis preguntas · diecinueve modelos · unos cinco minutos",
    ownTag: "Empezamos por nosotros, con quince modelos",
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
      "No es lo que contestan ChatGPT, Claude o Gemini con la búsqueda activada. Eso es un resultado de búsqueda en vivo, no la memoria del modelo, y se mueve por otros motivos. La única respuesta de búsqueda del informe es la de Perplexity, y va marcada como tal.",
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
        <div className="sig-brand-hero-copy">
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
          <div className="sig-brand-models">
            <p className="sig-brand-tag">{t.modelsLabel}</p>
            <ul className="sig-brand-models-list">
              {t.models.map(([name, vendor]) => (
                <li key={name}>
                  <strong>{name}</strong>
                  <span>{vendor}</span>
                </li>
              ))}
            </ul>
            <p className="sig-brand-models-note">{t.modelsNote}</p>
          </div>
        </div>

        {/* The form sits in the hero, in a card of its own width: the request is the
            page's one job, and a four-across row stretched to 1320px read as a
            spreadsheet, not a question. */}
        <div id="request" className="sig-brand-request sig-brand-hero-form" aria-label={t.formTitle}>
          <div className="sig-brand-module-top">
            <span>{t.formTitle}</span>
            <span>{t.formFoot}</span>
          </div>
          <BrandReportForm locale={locale} />
        </div>
      </section>

      <section className="sig-brand-sample" aria-labelledby="sample-report-title">
        <div className="sig-brand-section-head">
          <div>
            <p className="sig-brand-tag">{t.sampleTag}</p>
            <h2 id="sample-report-title">{t.sampleTitle}</h2>
          </div>
          <p>{t.sampleBody}</p>
        </div>
        {/* The sample's brand and answers are invented. Kept out of the Markdown twin so an
            answer engine cannot lift a made-up quote and attribute it to a real model. */}
        <figure data-md="skip" className="sig-brand-report">
          <div className="sig-brand-module-top">
            <span>{t.sampleBar[0]}</span>
            <span>{t.sampleBar[1]}</span>
          </div>
          <div className="sig-brand-report-stats">
            {t.sampleStats.map(([figure, label]) => (
              <p key={label}>
                <strong>{figure}</strong>
                <span>{label}</span>
              </p>
            ))}
          </div>
          <div className="sig-brand-report-grid">
            <p className="sig-brand-report-label">{t.sampleGridLabel}</p>
            <ol aria-label={t.sampleGridLabel}>
              {SAMPLE_GRID.map((state, i) => (
                <li
                  key={i}
                  className={`is-${state}`}
                  role="img"
                  aria-label={t.sampleStates[state]}
                  title={t.sampleStates[state]}
                />
              ))}
            </ol>
            <ul className="sig-brand-report-legend">
              {SAMPLE_LEGEND.map((state) => (
                <li key={state} className={`is-${state}`}>
                  {t.sampleStates[state]}
                </li>
              ))}
            </ul>
          </div>
          <div className="sig-brand-report-quotes">
            {t.sampleQuotes.map((quote) => (
              <article key={quote.model + quote.question}>
                <div className="sig-brand-report-quote-top">
                  <span>{quote.question}</span>
                  <span className={`sig-brand-report-state is-${quote.state}`}>
                    {t.sampleStates[quote.state]}
                  </span>
                </div>
                <p className="sig-brand-report-model">
                  <strong>{quote.model}</strong> <span>{quote.vendor}</span>
                </p>
                <blockquote>{quote.text}</blockquote>
                {quote.note ? <p className="sig-brand-report-note">{quote.note}</p> : null}
              </article>
            ))}
          </div>
          <div className="sig-brand-report-fix">
            <p className="sig-brand-report-label">{t.sampleFixLabel}</p>
            <p>{t.sampleFix}</p>
          </div>
          <figcaption>
            <span>{t.sampleFoot}</span>
            <span className="sig-brand-report-actions">
              <Link href={`${prefix}/ai-brand-monitoring/sample-report/`} className="sig-brand-report-full">
                {t.sampleFull}
              </Link>
              <a href="#request" className="sig-brand-report-cta">
                {t.sampleCta} <Arrow />
              </a>
            </span>
          </figcaption>
        </figure>
      </section>

      <section className="sig-brand-clients" aria-label={t.clientsTag}>
        <div className="sig-brand-clients-head">
          <p className="sig-brand-tag">{t.clientsTag}</p>
          <p>{t.clientsBody}</p>
        </div>
        <div className="sig-brand-client-logos">
          {CLIENT_LOGOS.map((logo) => (
            <div className="sig-brand-client-logo" key={logo.alt}>
              <Picture src={logo.src} alt={logo.alt} width={220} height={logo.h ?? 40} />
            </div>
          ))}
        </div>
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
        {/* Sector studies are Spanish only for now, so the link exists only on the ES page. */}
        {locale === "es" ? (
          <p className="sig-brand-case-link">
            <Link className="sig-brand-text-link" href="/es/ai-brand-monitoring/hoteles-mallorca/">
              Estudio: qué hoteles de Mallorca recomiendan las IA <Arrow />
            </Link>
          </p>
        ) : null}
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
