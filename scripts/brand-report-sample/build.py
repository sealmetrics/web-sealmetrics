"""The sample AI brand report for a fictional brand, «Acme Coffee».

The page /ai-brand-monitoring/sample-report/ (and /es/…) shows a visitor the whole report
before they ask for theirs. It is rendered by Enroutia's own generator — the same
`render()`, the same method text, the same Signal theme a real report gets — so the
sample differs from a real one in its data, never in its shape.

Everything about the brand is invented: the company, its competitors (Brisa Roasters,
Molino Tostadores, Kafeo, Cafés Lumbre) and every answer. The model names are the real
panel, which is why the answers can never be mistaken for real quotes: the page and the
file both say «sample · fictional brand», the HTML carries `noindex`, and the landing keeps
the embedded excerpt out of the Markdown twin.

Regenerate, from the repository root, with Enroutia checked out next to it:

    uv run --project ~/code/routingllm/core python scripts/brand-report-sample/build.py

The output is committed: public/samples/ai-brand-report-acme.html and
public/es/samples/ai-brand-report-acme.html, served without the extension
(/samples/ai-brand-report-acme). Every .html the site ships is audited as a page, so each
file carries its own canonical (the wrapper page), Open Graph, Twitter card and `noindex`,
and the Spanish one lives under /es/ for its `lang`.
The landing's excerpt (src/components/v4/BrandMonitoringSignal.tsx, `sample*` copy and
SAMPLE_GRID) quotes these figures — change one, change the other.
"""

from __future__ import annotations

from pathlib import Path

from app.brand_reports.judge import _methodology
from app.brand_reports.questions import build_questions
from app.brand_reports.render import render
from app.brand_reports.run import MAX_TOKENS

ROOT = Path(__file__).resolve().parents[2]
SITE = "https://sealmetrics.com"
OUT = {
    "en": ROOT / "public" / "samples" / "ai-brand-report-acme.html",
    "es": ROOT / "public" / "es" / "samples" / "ai-brand-report-acme.html",
}
WRAPPER = {"en": "/ai-brand-monitoring/sample-report/", "es": "/es/ai-brand-monitoring/sample-report/"}
OG_IMAGE = f"{SITE}/og/ai-brand-monitoring.png"

BRAND = "Acme Coffee"
RIVAL = "Brisa Roasters"
GENERATED_AT = "2026-09-30T09:00:00+00:00"
JUDGE = "qwen3-235b"

# The panel as deployed on 30 Sep 2026: six closed models and thirteen open ones.
CLOSED = {
    "gpt-6-sol": "openai",
    "gpt-6-astra": "openai",
    "claude-opus-5-5": "anthropic",
    "claude-sonnet-5": "anthropic",
    "gemini-3.8-flash": "google",
    "perplexity-sonar": "perplexity",
}
OPEN = [
    "deepseek-v4", "gemma-4-26b", "glm-5.2", "gpt-oss-120b", "gpt-oss-20b",
    "llama-3.3-70b", "mistral-medium", "mistral-small", "qwen3-235b", "qwen3.5-397b",
    "qwen3.6-27b", "qwen3.6-35b", "qwen3.8-27b",
]  # fmt: skip
MODELS = [*CLOSED, *OPEN]

# Question 01 per model. 5 correct + 4 partial = 9 recognise the brand; 6 confuse it.
STATE = {
    "gpt-6-sol": "Correcta", "claude-opus-5-5": "Correcta", "gemini-3.8-flash": "Correcta",
    "perplexity-sonar": "Correcta", "mistral-medium": "Correcta",
    "gpt-6-astra": "Parcial", "claude-sonnet-5": "Parcial", "deepseek-v4": "Parcial",
    "gpt-oss-120b": "Parcial",
    "gemma-4-26b": "Confunde", "llama-3.3-70b": "Confunde", "qwen3.6-35b": "Confunde",
    "gpt-oss-20b": "Confunde", "qwen3.8-27b": "Confunde", "qwen3-235b": "Confunde",
    "glm-5.2": "Sin respuesta", "mistral-small": "Sin respuesta",
    "qwen3.5-397b": "Sin respuesta", "qwen3.6-27b": "Sin respuesta",
}  # fmt: skip
# Which wrong company a confusing model attaches the name to.
CONFUSION = {
    "gemma-4-26b": "cartoon", "llama-3.3-70b": "cartoon", "qwen3.6-35b": "cartoon",
    "gpt-oss-20b": "machines", "qwen3.8-27b": "machines", "qwen3-235b": "brooklyn",
}  # fmt: skip
# The one error each partial model makes.
SLIP = {
    "gpt-6-astra": "cafes", "claude-sonnet-5": "founded", "deepseek-v4": "barcelona",
    "gpt-oss-120b": "capsules",
}  # fmt: skip
EMPTY = {"glm-5.2"}  # budget spent thinking: every question comes back empty
FAILED = {("qwen3.5-397b", "q3_recomienda")}  # a provider limit on one call
# Who names Acme when asked for a recommendation without it being mentioned.
NAMES_ACME_IN_PURCHASE = {"perplexity-sonar", "gpt-6-sol", "claude-opus-5-5"}

LANG = {
    "en": {
        "sector": "specialty coffee eCommerce",
        "category": "specialty coffee subscription",
        "country": "Spain",
        "sources": "Sources: [1] acme-coffee.example/about · [2] acme-coffee.example/subscription",
    },
    "es": {
        "sector": "eCommerce de café de especialidad",
        "category": "suscripción de café de especialidad",
        "country": "España",
        "sources": "Fuentes: [1] acme-coffee.example/sobre-nosotros · [2] acme-coffee.example/suscripcion",
    },
}

# ── Answer banks ────────────────────────────────────────────────────────────────────────
Q1 = {
    "en": {
        "Correcta": [
            f"{BRAND} is a Spanish online specialty coffee roaster based in Valencia, founded in 2019. It sells single-origin beans by subscription, roasts to order and ships within 48 hours across Spain. It has no physical cafés.",
            f"{BRAND} is an independent roaster from Valencia that sells specialty coffee online, mostly through a monthly subscription. Beans are roasted to order and dispatched in about two days.",
            f"A Valencia-based eCommerce roaster, {BRAND} has been selling single-origin specialty coffee online since 2019, with subscriptions at the centre of its model and fast shipping within Spain.",
        ],
        "slip": {
            "cafes": f"{BRAND} is a Spanish specialty coffee roaster that sells single-origin beans online by subscription. Besides its web shop it runs two cafés in Madrid, where the subscription coffees are served.",
            "founded": f"{BRAND} is a Valencia roaster that sells specialty coffee online by subscription, founded in 2015 and known for roasting to order.",
            "barcelona": f"{BRAND} is a specialty coffee brand from Barcelona that sells single-origin beans online, with a subscription and fast delivery in Spain.",
            "capsules": f"{BRAND} is a Spanish online coffee roaster. It sells single-origin specialty coffee in beans and in compatible capsules, with a monthly subscription.",
        },
        "confused": {
            "cartoon": "Acme is best known as the fictional Acme Corporation from the Looney Tunes cartoons, the company that supplies Wile E. Coyote with rockets and anvils. I am not aware of a coffee company by that name.",
            "machines": f"{BRAND} is a manufacturer of industrial coffee roasting and grinding machines for cafés and roasters, sold to professionals across Europe.",
            "brooklyn": f"{BRAND} is a small chain of coffee shops in Brooklyn, New York, known for its cold brew and neighbourhood cafés.",
        },
        "none": [
            f"I don't have reliable information about a company called {BRAND}. It may be a small or recent business; its own website would be the best source.",
            f"I'm not familiar with {BRAND}. Could you give me more context about what it does?",
        ],
    },
    "es": {
        "Correcta": [
            f"{BRAND} es un tostador español de café de especialidad que vende online, con sede en Valencia y fundado en 2019. Vende café de origen único por suscripción, tuesta bajo pedido y envía en 48 horas a toda España. No tiene cafeterías físicas.",
            f"{BRAND} es un tostador independiente de Valencia que vende café de especialidad por internet, sobre todo con una suscripción mensual. Tuesta bajo pedido y envía en unos dos días.",
            f"Tostador de eCommerce con sede en Valencia, {BRAND} vende café de especialidad de origen único online desde 2019, con la suscripción en el centro de su modelo y envíos rápidos en España.",
        ],
        "slip": {
            "cafes": f"{BRAND} es un tostador español de café de especialidad que vende café de origen único online por suscripción. Además de la tienda web tiene dos cafeterías en Madrid, donde sirve los cafés de la suscripción.",
            "founded": f"{BRAND} es un tostador de Valencia que vende café de especialidad online por suscripción, fundado en 2015 y conocido por tostar bajo pedido.",
            "barcelona": f"{BRAND} es una marca de café de especialidad de Barcelona que vende café de origen único online, con suscripción y entrega rápida en España.",
            "capsules": f"{BRAND} es un tostador español que vende online. Tiene café de especialidad de origen único en grano y en cápsulas compatibles, con suscripción mensual.",
        },
        "confused": {
            "cartoon": "Acme es sobre todo la Acme Corporation ficticia de los dibujos de Looney Tunes, la empresa que le vende cohetes y yunques al Coyote. No conozco una empresa de café con ese nombre.",
            "machines": f"{BRAND} es un fabricante de máquinas industriales de tostado y molienda de café para cafeterías y tostadores, que vende a profesionales en toda Europa.",
            "brooklyn": f"{BRAND} es una pequeña cadena de cafeterías de Brooklyn, en Nueva York, conocida por su cold brew y sus locales de barrio.",
        },
        "none": [
            f"No tengo información fiable sobre una empresa llamada {BRAND}. Puede que sea un negocio pequeño o reciente; su propia web sería la mejor fuente.",
            f"No conozco {BRAND}. ¿Me das algo más de contexto sobre a qué se dedica?",
        ],
    },
}

Q2 = {
    "en": {
        "known": f"Strengths: freshness (roasted to order and shipped within 48 hours), a clear single-origin range and a flexible subscription you can pause. Drawbacks: prices above supermarket coffee, a catalogue smaller than the big roasters', and delivery limited to Spain.",
        "known_b": f"{BRAND} does well on freshness and traceability, and the subscription is easy to manage. On the downside it is a small brand, so stock of some origins runs out, and it does not sell in shops.",
        "confused": "If you mean the Acme from the cartoons, it is a running gag rather than a real company, so there are no products to judge.",
        "machines": f"As an equipment maker, {BRAND} is praised for sturdy roasters, but its machines are expensive and service outside Spain is limited.",
        "brooklyn": f"Reviews of {BRAND} praise the cold brew and the atmosphere of its cafés; the drawbacks mentioned are queues and prices.",
        "none": f"I can't give an informed opinion on {BRAND} because I don't have reliable information about it.",
    },
    "es": {
        "known": f"Ventajas: frescura (tuesta bajo pedido y envía en 48 horas), una gama clara de orígenes únicos y una suscripción flexible que se puede pausar. Inconvenientes: precio por encima del café de supermercado, un catálogo más corto que el de los grandes tostadores y envíos sólo en España.",
        "known_b": f"{BRAND} destaca en frescura y trazabilidad, y la suscripción es fácil de gestionar. En contra, es una marca pequeña, así que algunos orígenes se agotan, y no vende en tiendas.",
        "confused": "Si te refieres a la Acme de los dibujos animados, es un chiste recurrente, no una empresa real, así que no hay productos que valorar.",
        "machines": f"Como fabricante de maquinaria, {BRAND} tiene fama de tostadoras robustas, pero sus máquinas son caras y el servicio técnico fuera de España es limitado.",
        "brooklyn": f"Las opiniones sobre {BRAND} elogian su cold brew y el ambiente de sus locales; como inconvenientes se citan las colas y los precios.",
        "none": f"No puedo darte una opinión fundada sobre {BRAND} porque no tengo información fiable sobre ella.",
    },
}

Q3 = {
    "en": {
        "with_acme": f"1. {RIVAL}: large single-origin range and corporate plans for offices. 2. {BRAND}: roasts to order in Valencia and ships within 48 hours, with a flexible subscription. 3. Molino Tostadores: good value for teams that drink a lot of coffee.",
        "a": f"1. {RIVAL}: the most established specialty subscription in Spain, with office plans. 2. Molino Tostadores: reliable blends and volume pricing. 3. Kafeo: flexible subscriptions and a wide choice of origins.",
        "b": f"For a company in Spain I would look at {RIVAL} for its corporate plans, Kafeo for its flexibility, and Cafés Lumbre if you prefer darker, espresso-style roasts.",
        "c": f"Three options: {RIVAL} for office plans, Molino Tostadores for price, and Cafés Lumbre for espresso machines in the office.",
    },
    "es": {
        "with_acme": f"1. {RIVAL}: amplia gama de origen único y planes para oficinas. 2. {BRAND}: tuesta bajo pedido en Valencia y envía en 48 horas, con una suscripción flexible. 3. Molino Tostadores: buena relación calidad-precio para equipos que toman mucho café.",
        "a": f"1. {RIVAL}: la suscripción de especialidad más asentada en España, con planes de empresa. 2. Molino Tostadores: mezclas fiables y precio por volumen. 3. Kafeo: suscripciones flexibles y mucha variedad de orígenes.",
        "b": f"Para una empresa en España miraría {RIVAL} por sus planes de empresa, Kafeo por su flexibilidad y Cafés Lumbre si preferís tuestes más oscuros, de espresso.",
        "c": f"Tres opciones: {RIVAL} por sus planes de oficina, Molino Tostadores por precio y Cafés Lumbre para las cafeteras de la oficina.",
    },
}

Q4 = {
    "en": [
        f"Specialty coffee is moving online: roasters sell direct through subscriptions and roast to order, and brands such as {RIVAL} have grown by selling to offices as well as homes.\n\nAt the same time, rising green coffee prices and EU deforestation rules are pushing roasters to publish where each lot comes from, which favours small traceable brands.",
        "The sector is consolidating around direct-to-consumer subscriptions and traceability. Consumers pay more for freshness and origin, and EU rules on deforestation-free supply chains raise the bar on documentation.\n\nMargins are under pressure from green coffee prices, so roasters are turning to subscriptions for predictable revenue.",
        "European specialty coffee is growing faster than commodity coffee, driven by eCommerce, subscriptions and a younger audience that buys online.\n\nRegulation on supply chains and higher bean prices are reshaping the market, and smaller roasters compete on freshness and storytelling.",
    ],
    "es": [
        f"El café de especialidad se está moviendo a internet: los tostadores venden directo por suscripción y tuestan bajo pedido, y marcas como {RIVAL} han crecido vendiendo a oficinas además de a casas.\n\nA la vez, la subida del café verde y las normas europeas contra la deforestación empujan a los tostadores a publicar de dónde sale cada lote, lo que favorece a las marcas pequeñas y trazables.",
        "El sector se concentra en suscripciones directas al consumidor y en trazabilidad. El cliente paga más por frescura y origen, y la normativa europea sobre cadenas de suministro sin deforestación sube el listón de la documentación.\n\nLos márgenes sufren con el precio del café verde, así que los tostadores buscan en la suscripción ingresos predecibles.",
        "El café de especialidad crece en Europa más rápido que el café convencional, empujado por el eCommerce, las suscripciones y un público más joven que compra online.\n\nLa regulación de la cadena de suministro y el precio del grano están cambiando el mercado, y los tostadores pequeños compiten en frescura y relato.",
    ],
}

Q5 = {
    "en": {
        "known": f"Alternatives to {BRAND} in Spain: {RIVAL}, Molino Tostadores, Kafeo and Cafés Lumbre. {RIVAL} is the closest, with a similar subscription model.",
        "confused": "Other fictional companies from cartoons include the Globex Corporation and Wonka Industries; for real coffee brands you would need to say what you are looking for.",
        "machines": f"Alternatives to {BRAND} for roasting equipment include other European machine makers for professional roasters.",
        "brooklyn": f"Other coffee shops in Brooklyn similar to {BRAND} include several local independents known for cold brew.",
        "none": f"Without knowing what {BRAND} does I can't suggest alternatives; if it is a coffee brand, {RIVAL} and Kafeo are common choices in Spain.",
    },
    "es": {
        "known": f"Alternativas a {BRAND} en España: {RIVAL}, Molino Tostadores, Kafeo y Cafés Lumbre. {RIVAL} es la más parecida, con un modelo de suscripción similar.",
        "confused": "Otras empresas ficticias de dibujos animados son Globex Corporation o Wonka Industries; para marcas de café reales habría que saber qué buscas.",
        "machines": f"Como alternativas a {BRAND} en maquinaria de tostado hay otros fabricantes europeos de equipos para tostadores profesionales.",
        "brooklyn": f"Otras cafeterías de Brooklyn parecidas a {BRAND} son varios locales independientes conocidos por su cold brew.",
        "none": f"Sin saber a qué se dedica {BRAND} no puedo proponerte alternativas; si es una marca de café, {RIVAL} y Kafeo son opciones habituales en España.",
    },
}

Q6 = {
    "en": {
        "known": f"Both sell specialty coffee online by subscription in Spain. {RIVAL} is larger, sells to offices and has a wider range; {BRAND} is smaller, roasts to order in Valencia and ships faster, with a narrower single-origin catalogue.",
        "confused": f"{RIVAL} is a Spanish specialty roaster. Acme, as far as I know, is the fictional company from the cartoons, so there is no real comparison to make.",
        "machines": f"They are in different businesses: {RIVAL} roasts and sells coffee, while {BRAND} builds the machines roasters use.",
        "brooklyn": f"{RIVAL} sells roasted coffee online in Spain; {BRAND} runs cafés in Brooklyn. One is a supplier, the other a retailer.",
        "none": f"I know {RIVAL} as a Spanish specialty roaster, but I don't have reliable information on {BRAND} to compare them.",
    },
    "es": {
        "known": f"Las dos venden café de especialidad online por suscripción en España. {RIVAL} es más grande, vende a oficinas y tiene más gama; {BRAND} es más pequeña, tuesta bajo pedido en Valencia y envía más rápido, con un catálogo de origen único más corto.",
        "confused": f"{RIVAL} es un tostador español de especialidad. Acme, que yo sepa, es la empresa ficticia de los dibujos animados, así que no hay comparación real posible.",
        "machines": f"Se dedican a cosas distintas: {RIVAL} tuesta y vende café, y {BRAND} fabrica las máquinas que usan los tostadores.",
        "brooklyn": f"{RIVAL} vende café tostado online en España; {BRAND} tiene cafeterías en Brooklyn. Uno es proveedor y el otro, tienda.",
        "none": f"Conozco {RIVAL} como tostador español de especialidad, pero no tengo información fiable sobre {BRAND} para compararlos.",
    },
}


def persona(model: str) -> str:
    """How a model behaves across the six questions, from its question-01 state."""
    state = STATE[model]
    if state in ("Correcta", "Parcial"):
        return "known"
    if state == "Confunde":
        return CONFUSION[model]
    return "none"


def answer(model: str, qid: str, lang: str, i: int) -> str:
    kind = persona(model)
    if qid == "q1_que_es":
        bank = Q1[lang]
        if STATE[model] == "Correcta":
            return bank["Correcta"][i % len(bank["Correcta"])]
        if STATE[model] == "Parcial":
            return bank["slip"][SLIP[model]]
        if kind == "none":
            return bank["none"][i % len(bank["none"])]
        return bank["confused"][kind]
    if qid == "q2_opinion":
        if kind == "known":
            return Q2[lang]["known" if i % 2 == 0 else "known_b"]
        return Q2[lang]["confused" if kind == "cartoon" else kind]
    if qid == "q3_recomienda":
        if model in NAMES_ACME_IN_PURCHASE:
            return Q3[lang]["with_acme"]
        return Q3[lang]["abc"[i % 3]]
    if qid == "q4_sector":
        return Q4[lang][i % len(Q4[lang])]
    if qid == "q5_alternativas":
        return Q5[lang]["confused" if kind == "cartoon" else kind]
    if qid == "q6_vs":
        return Q6[lang]["confused" if kind == "cartoon" else kind]
    raise KeyError(qid)


def results(lang: str, questions: dict[str, str]) -> list[dict]:
    rows = []
    for i, model in enumerate(MODELS):
        for qid in questions:
            row = {
                "model": model,
                "q": qid,
                "provider": CLOSED.get(model, "scaleway"),
                "tokens": 380 + (i * 37 + len(qid) * 11) % 420,
                "latency_ms": 1800 + (i * 211) % 5200,
            }
            if (model, qid) in FAILED:
                row["error"] = "provider limit"
            elif model in EMPTY:
                row["text"] = ""
            else:
                text = answer(model, qid, lang, i)
                if model == "perplexity-sonar" and qid in ("q1_que_es", "q3_recomienda"):
                    text += "\n" + LANG[lang]["sources"]
                row["text"] = text
            rows.append(row)
    return rows


def answers_for_method(rows: list[dict]) -> list[dict]:
    """The rows the method section counts, in the shape Enroutia's judge reads."""
    out = []
    for r in rows:
        status = "error" if "error" in r else ("empty" if not r.get("text") else "ok")
        out.append({"model": r["model"], "status": status, "attempt": 0})
    return out


def editorial(lang: str, rows: list[dict]) -> dict:
    en = lang == "en"
    when = "30 September 2026" if en else "30 de septiembre de 2026"
    notes_en = {
        "Correcta": "Describes the brand accurately: online roaster in Valencia, subscription, roast to order.",
        "cafes": "Right business, one error: says it runs two cafés in Madrid. It sells online only.",
        "founded": "Right business, wrong founding year: 2015 instead of 2019.",
        "barcelona": "Right business, wrong city: places it in Barcelona instead of Valencia.",
        "capsules": "Right business, one error: says it sells capsules. It sells beans only.",
        "cartoon": "Takes the name for the Acme Corporation of the Looney Tunes cartoons.",
        "machines": "Attaches the name to a maker of industrial coffee machines.",
        "brooklyn": "Attaches the name to a café chain in Brooklyn.",
        "none": "No usable answer: says it does not know the brand, or returned nothing.",
    }
    notes_es = {
        "Correcta": "Describe bien la marca: tostador online de Valencia, suscripción, tueste bajo pedido.",
        "cafes": "Acierta el negocio con un error: dice que tiene dos cafeterías en Madrid. Sólo vende online.",
        "founded": "Acierta el negocio pero no el año de fundación: 2015 en lugar de 2019.",
        "barcelona": "Acierta el negocio pero no la ciudad: la sitúa en Barcelona en lugar de Valencia.",
        "capsules": "Acierta el negocio con un error: dice que vende cápsulas. Sólo vende en grano.",
        "cartoon": "Confunde el nombre con la Acme Corporation de los dibujos de Looney Tunes.",
        "machines": "Le cuelga el nombre a un fabricante de maquinaria industrial de café.",
        "brooklyn": "Le cuelga el nombre a una cadena de cafeterías de Brooklyn.",
        "none": "Sin respuesta utilizable: dice no conocer la marca o no devolvió nada.",
    }
    notes = notes_en if en else notes_es
    labels = {}
    for model in MODELS:
        state = STATE[model]
        key = (
            "Correcta" if state == "Correcta"
            else SLIP[model] if state == "Parcial"
            else CONFUSION[model] if state == "Confunde"
            else "none"
        )  # fmt: skip
        labels[model] = {"state": state, "note": notes[key]}

    if en:
        headline = {"critical": "A model says the brand has two cafés in Madrid. It sells online only."}
        thesis = "Paid models know Acme Coffee; most open models confuse it with a cartoon."
        findings = [
            {
                "title": "The name is the problem, not the brand",
                "text": "Six of nineteen models attach «Acme» to something else: three to the cartoon company, two to a machine maker, one to a café chain in Brooklyn. None of them describes the roaster.",
                "impact": "A buyer who asks an open model about the brand is told about a different business.",
            },
            {
                "title": "Known, but rarely recommended",
                "text": "Nine models recognise the brand, but only three name it when asked for a specialty coffee subscription without it being mentioned. Brisa Roasters is named in all seventeen answers.",
                "impact": "The brand is remembered when someone already knows it, and missing when someone is choosing.",
            },
            {
                "title": "One error repeats: physical cafés",
                "text": "GPT-6 Astra says the brand runs two cafés in Madrid. Nothing on the brand's own pages says otherwise in a sentence a model can quote.",
                "impact": "Customers may look for cafés that do not exist.",
            },
        ]
        actions = [
            {"short": "Say it in one sentence", "when": "This week", "owner": "Brand", "text": "Add to the About page: «Acme Coffee is a specialty coffee roaster from Valencia that sells online only, founded in 2019. We have no physical cafés.»", "outcome": "A quotable fact for the next training run.", "next_measure": "Question 01, next edition."},
            {"short": "Separate the name from the cartoon", "when": "This month", "owner": "Marketing", "text": "Use «Acme Coffee» in full in titles, press and directories, never «Acme» alone, so the pages about the roaster do not compete with the cartoon.", "outcome": "Fewer confusions in open models.", "next_measure": "Confusion count, next edition."},
            {"short": "Be in the lists buyers read", "when": "This quarter", "owner": "PR", "text": "Get into the comparisons of specialty coffee subscriptions in Spain that already name Brisa Roasters and Kafeo.", "outcome": "More mentions in the purchase question.", "next_measure": "Purchase question, in three months."},
        ]
        crit_fact = "Acme Coffee sells online only. It has no physical cafés."
        crit_action = "Say so on the About page, in one sentence a model can quote."
        sec_action = "Check the fact on the brand's own pages and correct it at the source."
        claims = [
            ("claude-sonnet-5", "Founded in 2015"),
            ("deepseek-v4", "A specialty coffee brand from Barcelona"),
            ("gpt-oss-120b", "Sells specialty coffee in compatible capsules"),
        ]
        patterns = [
            {"label": "The Looney Tunes Acme Corporation", "models": ["gemma-4-26b", "llama-3.3-70b", "qwen3.6-35b"]},
            {"label": "Industrial coffee machine maker", "models": ["gpt-oss-20b", "qwen3.8-27b"]},
            {"label": "Café chain in Brooklyn", "models": ["qwen3-235b"]},
        ]
        discovery_note = "Brisa Roasters leads every unbranded question. Acme Coffee appears only in the answers of three closed models, one of which searched the web."
    else:
        headline = {"critical": "Un modelo dice que la marca tiene dos cafeterías en Madrid. Sólo vende online."}
        thesis = "Los modelos de pago conocen Acme Coffee; la mayoría de los abiertos la confunden con unos dibujos animados."
        findings = [
            {
                "title": "El problema es el nombre, no la marca",
                "text": "Seis de diecinueve modelos le cuelgan «Acme» a otra cosa: tres a la empresa de los dibujos, dos a un fabricante de maquinaria y uno a una cadena de cafeterías de Brooklyn. Ninguno describe al tostador.",
                "impact": "Quien pregunta por la marca a un modelo abierto recibe la descripción de otro negocio.",
            },
            {
                "title": "Te conocen, pero casi no te recomiendan",
                "text": "Nueve modelos reconocen la marca, pero sólo tres la nombran cuando se les pide una suscripción de café de especialidad sin mencionarla. A Brisa Roasters la nombran las diecisiete respuestas.",
                "impact": "La marca aparece cuando alguien ya la conoce y desaparece cuando alguien está eligiendo.",
            },
            {
                "title": "Un error se repite: las cafeterías",
                "text": "GPT-6 Astra dice que la marca tiene dos cafeterías en Madrid. Nada en las páginas de la marca lo desmiente en una frase que un modelo pueda citar.",
                "impact": "Hay clientes que pueden buscar cafeterías que no existen.",
            },
        ]
        actions = [
            {"short": "Decirlo en una frase", "when": "Esta semana", "owner": "Marca", "text": "Añadir en la página de empresa: «Acme Coffee es un tostador de café de especialidad de Valencia que sólo vende online, fundado en 2019. No tenemos cafeterías físicas.»", "outcome": "Un dato citable para el próximo entrenamiento.", "next_measure": "Pregunta 01, próxima edición."},
            {"short": "Separar el nombre de los dibujos", "when": "Este mes", "owner": "Marketing", "text": "Usar «Acme Coffee» completo en títulos, prensa y directorios, nunca «Acme» a secas, para que las páginas del tostador no compitan con los dibujos.", "outcome": "Menos confusiones en los modelos abiertos.", "next_measure": "Recuento de confusiones, próxima edición."},
            {"short": "Estar en las listas que lee el comprador", "when": "Este trimestre", "owner": "Prensa", "text": "Entrar en las comparativas de suscripciones de café de especialidad en España que ya citan a Brisa Roasters y Kafeo.", "outcome": "Más menciones en la pregunta de compra.", "next_measure": "Pregunta de compra, dentro de tres meses."},
        ]
        crit_fact = "Acme Coffee sólo vende online. No tiene cafeterías físicas."
        crit_action = "Decirlo en la página de empresa, en una frase que un modelo pueda citar."
        sec_action = "Comprobar el dato en las páginas de la marca y corregirlo en origen."
        claims = [
            ("claude-sonnet-5", "Fundada en 2015"),
            ("deepseek-v4", "Una marca de café de especialidad de Barcelona"),
            ("gpt-oss-120b", "Vende café de especialidad en cápsulas compatibles"),
        ]
        patterns = [
            {"label": "La Acme Corporation de Looney Tunes", "models": ["gemma-4-26b", "llama-3.3-70b", "qwen3.6-35b"]},
            {"label": "Fabricante de maquinaria de café", "models": ["gpt-oss-20b", "qwen3.8-27b"]},
            {"label": "Cadena de cafeterías de Brooklyn", "models": ["qwen3-235b"]},
        ]
        discovery_note = "Brisa Roasters encabeza todas las preguntas sin marca. Acme Coffee sólo aparece en las respuestas de tres modelos cerrados, y uno de ellos buscó en la web."

    critical = [
        {
            "severity": "Crítica",
            "claim": ("It runs two cafés in Madrid" if en else "Tiene dos cafeterías en Madrid"),
            "who": "gpt-6-astra",
            "when": when,
            "fact": crit_fact,
            "action": crit_action,
            "owner": "Brand" if en else "Marca",
            "short": headline["critical"],
            "kind": "contradicts_facts",
        }
    ] + [
        {"severity": "Alta" if i == 0 else "Media", "claim": claim, "who": who, "when": when, "fact": "", "action": sec_action, "kind": "unverified"}
        for i, (who, claim) in enumerate(claims)
    ]
    return {
        "headline": headline,
        "thesis": thesis,
        "findings": findings,
        "actions": actions,
        "critical_errors": critical,
        "labels": labels,
        "confusion_patterns": patterns,
        "discovery": {
            "questions": ["q3_recomienda", "q4_sector"],
            "names": [BRAND, RIVAL, "Molino Tostadores", "Kafeo", "Cafés Lumbre"],
            "purchase_question": "q3_recomienda",
        },
        "discovery_note": discovery_note,
        "methodology": _methodology(
            country=LANG[lang]["country"],
            judge_alias=JUDGE,
            max_tokens=MAX_TOKENS,
            answers=answers_for_method(rows),
            models=MODELS,
            judged=True,
            language=lang,
        ),
    }


def banner(lang: str) -> str:
    text = (
        "Sample report · fictional brand · every answer invented for the example"
        if lang == "en"
        else "Informe de muestra · marca ficticia · todas las respuestas inventadas para el ejemplo"
    )
    return (
        '<div style="background:#111412;color:#cbff3d;font:650 10px/1.4 \'JetBrains Mono\','
        "ui-monospace,monospace;letter-spacing:.12em;text-transform:uppercase;padding:9px 16px;"
        f'text-align:center">{text}</div>'
    )


def build(lang: str) -> str:
    cfg = LANG[lang]
    questions = build_questions(
        brand=BRAND,
        sector=cfg["sector"],
        category=cfg["category"],
        country=cfg["country"],
        competitors=[RIVAL],
        language=lang,
    )
    rows = results(lang, questions)
    data = {
        "brand": BRAND,
        "sector": cfg["sector"],
        "competitors": [RIVAL],
        "questions": questions,
        "results": rows,
        "generated_at": GENERATED_AT,
    }
    page = render(
        data,
        editorial(lang, rows),
        white_label={
            "name": "Sealmetrics",
            "accent": "#CBFF3D",
            "theme": "signal",
            "tagline": "Consentless analytics for eCommerce"
            if lang == "en"
            else "Analítica sin consentimiento para eCommerce",
        },
        platform_name="Enroutia",
        language=lang,
    )
    # A sample is not evidence about anyone: out of every index, labelled on screen, and
    # pointing search engines and social cards at the page that explains it.
    return page.replace('<meta charset="utf-8">', '<meta charset="utf-8">\n' + head(lang), 1).replace(
        "<body>", "<body>\n" + banner(lang), 1
    )


def head(lang: str) -> str:
    en = lang == "en"
    title = "Sample AI brand report — Acme Coffee" if en else "Informe de marca en IA de muestra — Acme Coffee"
    desc = (
        "The full AI brand monitoring report for a fictional coffee brand. Every answer is invented."
        if en
        else "El informe completo de monitorización de marca en IA para una marca de café ficticia. Todas las respuestas son inventadas."
    )
    url = SITE + WRAPPER[lang]
    tags = [
        '<meta name="robots" content="noindex, nofollow">',
        f'<link rel="canonical" href="{url}">',
        f'<meta name="description" content="{desc}">',
        f'<meta property="og:title" content="{title}">',
        f'<meta property="og:description" content="{desc}">',
        f'<meta property="og:url" content="{url}">',
        '<meta property="og:site_name" content="Sealmetrics">',
        f'<meta property="og:locale" content="{"en_US" if en else "es_ES"}">',
        '<meta property="og:type" content="website">',
        f'<meta property="og:image" content="{OG_IMAGE}">',
        '<meta name="twitter:card" content="summary_large_image">',
        '<meta name="twitter:site" content="@sealmetrics">',
        f'<meta name="twitter:title" content="{title}">',
        f'<meta name="twitter:description" content="{desc}">',
        f'<meta name="twitter:image" content="{OG_IMAGE}">',
    ]
    return "\n".join(tags)


def main() -> None:
    for lang in ("en", "es"):
        path = OUT[lang]
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(build(lang), encoding="utf-8")
        print(f"wrote {path.relative_to(ROOT)} ({path.stat().st_size // 1024} KB)")


if __name__ == "__main__":
    main()
