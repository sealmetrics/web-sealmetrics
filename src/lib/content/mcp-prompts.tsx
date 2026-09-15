import Link from "next/link";
import type { ReactNode } from "react";

/**
 * /ai-analytics/prompts — Phase 7 of CONTENT-PLAN-PROBLEM-POSITIONING.md.
 *
 * A prompt library organised by the four buyer problems (A–D), not by feature.
 * It is the web-side companion of docs.sealmetrics.com/web-analytics-prompts:
 * docs keeps the full catalogue with stable SEAL-xxx IDs; this page keeps a
 * short, checked set per problem and says what each prompt cannot answer.
 *
 * Every prompt was written against the tool list in
 * docs.sealmetrics.com/integrations/mcp-server (checked 15 Sep 2026): tool
 * names, the `period` and `compare` parameters, raw events capped at 31 days,
 * channel-rule write tools that only create drafts. Nothing here relies on a
 * capability that is not live or not documented: no bot or AI-agent share, no
 * returning visitors, no user journeys, no utm_content breakdown tool.
 *
 * Prompts that need another MCP (Google Analytics, Google Ads, Meta Ads) say
 * so, and never name a specific third-party server as official.
 *
 * The prompt text is plain on purpose: it is what a reader copies, and what an
 * answer engine quotes. Keep placeholders in {braces}.
 */

export const MCP_PROMPTS_PUBLISHED = "2026-09-15";

export type PromptItem = {
  title: string;
  when: string;
  prompt: string;
  tools: string;
  limit: string;
};

export type PromptGroup = {
  id: string;
  tag: string;
  title: ReactNode;
  body: ReactNode;
  items: PromptItem[];
};

export type PromptLibraryContent = {
  breadcrumbs: { label: string; href?: string }[];
  eyebrow: string;
  h1: ReactNode;
  heroBody: string;
  heroPrimary: { label: string; href: string };
  heroSecondary: { label: string; href: string };
  heroMicro: string;
  module: { title: string; status: string; rows: [string, string][]; foot: string };
  answerLabel: string;
  answer: ReactNode;
  use: { tag: string; title: ReactNode; body: ReactNode; steps: { name: string; text: string }[] };
  labels: { when: string; tools: string; limit: string };
  groups: PromptGroup[];
  limits: { tag: string; title: ReactNode; body: ReactNode; items: [string, string][] };
  faqTag: string;
  faqTitle: ReactNode;
  faq: { question: string; answer: string }[];
  final: { tag: string; title: ReactNode; body: string; primary: { label: string; href: string }; secondary: { label: string; href: string } };
};

const link = "sig-problem-inline";

export const mcpPromptsEn: PromptLibraryContent = {
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "AI analytics", href: "/ai-analytics/" },
    { label: "Prompt library" },
  ],
  eyebrow: "AI analytics · MCP prompt library",
  h1: <>Twelve prompts.<br />Four problems.<br /><em>Your own data.</em></>,
  heroBody:
    "Copy a prompt into Claude, ChatGPT or any assistant connected to the Sealmetrics MCP server and get the answer from your own analytics, measured without consent loss. Each prompt is grouped by the problem it solves, lists the tools it calls and says what it cannot answer.",
  heroPrimary: { label: "Browse the prompts", href: "#problem-a" },
  heroSecondary: { label: "Read the MCP reference", href: "/docs/mcp/" },
  heroMicro: "Remote MCP endpoint · read-only analytics tools · every plan, Agentic included · data hosted in Dublin",
  module: {
    title: "Prompt library · by problem",
    status: "12 prompts",
    rows: [
      ["A · GA4 does not reflect reality", "3 prompts"],
      ["B · Which campaigns work", "3 prompts"],
      ["C · Marketing and finance disagree", "4 prompts"],
      ["D · Proving compliance", "2 prompts"],
    ],
    foot: "Two prompts also need an ad-platform MCP · one needs a Google Analytics MCP",
  },

  answerLabel: "Quick answer",
  answer: (
    <p>
      An MCP prompt for web analytics is a plain-language instruction that an AI
      assistant answers by calling the tools of an analytics server, so the
      figures come from your data rather than from the model. Connected to the
      Sealmetrics MCP server, Claude, ChatGPT, Cursor or Codex can read traffic,
      channels, campaigns, conversions, revenue, funnels, product line items and
      custom properties for any site the account can access, over periods such
      as 30d, last_month or last_quarter, with comparison against the previous
      period or year. This library holds twelve prompts, grouped by four
      problems: GA4 not reflecting reality, not knowing which campaigns work,
      marketing and finance disagreeing, and proving compliance. Each lists the
      tools it uses and the question it cannot answer. The data is aggregate and{" "}
      <Link className={link} href="/glossary/last-click-attribution/">last click</Link>{" "}
      per session, so no prompt can return a customer journey or an individual
      visitor.
    </p>
  ),

  use: {
    tag: "Before the first prompt",
    title: <>Connect once.<br /><em>Then ask.</em></>,
    body: (
      <>
        Setup takes one URL and is described step by step on{" "}
        <Link className={link} href="/ai-analytics/">AI analytics</Link>. Three
        habits make the answers reliable.
      </>
    ),
    steps: [
      { name: "Name the site", text: "If the account has several sites, say which one, or ask the assistant to list your sites first. Every query targets one site." },
      { name: "Fill the placeholders", text: "Replace values in {braces} with your own: an order total, a currency, a break-even ROAS. The prompt tells the assistant not to invent them." },
      { name: "Ask for the method with the answer", text: "Keep the lines that ask the assistant to state periods, timezone and attribution. A number without its definition is the one that starts the next argument." },
    ],
  },

  labels: { when: "When to use it", tools: "Tools it calls", limit: "What it cannot tell you" },

  groups: [
    {
      id: "problem-a",
      tag: "Problem A",
      title: <>GA4 does not<br /><em>reflect reality.</em></>,
      body: (
        <>
          Size the gap, find where untraceable traffic comes from and check the
          measured total against the store. The argument behind these prompts is on{" "}
          <Link className={link} href="/complete-data/">complete data</Link>.
        </>
      ),
      items: [
        {
          title: "How much traffic is GA4 missing, by channel?",
          when: "After at least 30 days with both tools on the site. Needs a Google Analytics MCP connection as well.",
          prompt: `Using the Sealmetrics MCP and my Google Analytics MCP connection, compare last month on my site.

1. From Sealmetrics, get entrances by channel.
2. From GA4, get sessions by default channel group for the same dates.
3. Build a table: channel, Sealmetrics entrances, GA4 sessions, difference and % difference.
4. Sort by the absolute difference, largest first.

Before the table, state the site's timezone in Sealmetrics and check that the GA4 property uses the same one. After the table, note that entrances and sessions are defined differently, so the differences should be read channel by channel, not as an exact total.`,
          tools: "get_site, get_channels, plus the Google Analytics MCP",
          limit: "Which individual visits GA4 missed. It compares totals by channel.",
        },
        {
          title: "Where does traffic with no usable origin come from?",
          when: "When Direct or Unassigned is large enough to change a budget decision.",
          prompt: `Using the Sealmetrics MCP for my site, for the last 30 days:

1. Show entrances by channel and how many fall in Direct and Unassigned.
2. List the 20 landing pages that receive most Direct entrances, with conversions.
3. List the top referrer domains and flag any that look like payment gateways, booking engines, login pages or my own domains.
4. Test the 20 most frequent source/medium pairs against the channel rules and show which ones land in Unassigned.

Finish with three likely causes, ranked, and what to check first for each.`,
          tools: "get_channels, get_landing_pages, get_top_referrers, get_traffic_sources, test_channel_rules",
          limit: "The source of a visit that arrived with no UTM, click ID or referrer. That information never reached any tool.",
        },
        {
          title: "Does the measured total match the store's orders?",
          when: "Before trusting any channel figure, and again after a tracking change.",
          prompt: `These are my store's online orders for last month, from the store admin: {orders} orders and {revenue} {currency}, excluding point-of-sale, manual and subscription-renewal orders.

Using the Sealmetrics MCP for my site:
1. Get the site's timezone and currency.
2. Get purchase conversions and revenue for last month.
3. Calculate the percentage of orders and of revenue that Sealmetrics recorded.
4. List what could explain the difference: timezone, currency, taxes and shipping inside the purchase value, orders with no web visit, and test orders.

Report the numbers as they are; do not adjust them.`,
          tools: "get_site, get_conversions",
          limit: "A match order by order. Sealmetrics does not store order IDs, so the check is on totals.",
        },
      ],
    },
    {
      id: "problem-b",
      tag: "Problem B",
      title: <>Which campaigns<br /><em>actually work?</em></>,
      body: (
        <>
          Rank campaigns by revenue, join them with spend and find the funnel step
          each one loses. The attribution rules are set out in{" "}
          <Link className={link} href="/use-cases/revenue-attribution/">revenue attribution</Link>.
        </>
      ),
      items: [
        {
          title: "Which campaigns bring revenue, not just entrances?",
          when: "Every month, before the media plan is reviewed.",
          prompt: `Using the Sealmetrics MCP for my site, compare the last 30 days with the previous 30.

1. List every campaign (utm_campaign) with at least 200 entrances: source, medium, entrances, purchases, revenue, conversion rate and revenue per entrance, with the change against the previous period.
2. Split the list into three groups: revenue growing, revenue falling, and entrances with no purchases.
3. For the campaigns with entrances and no purchases, show their add_to_cart and begin_checkout microconversions, so I can tell a landing problem from a checkout problem.

State under the table that revenue is credited to the last click of each session.`,
          tools: "get_campaigns, get_microconversion_details",
          limit: "Return on spend. Sealmetrics does not import cost; the next prompt joins it.",
        },
        {
          title: "What is the measured ROAS of each Google Ads campaign?",
          when: "When Google Ads reports a ROAS the rest of the business does not recognise. Needs a Google Ads MCP connection.",
          prompt: `Using the Sealmetrics MCP and my Google Ads MCP connection, for last month:

1. From Google Ads, get cost per campaign with campaign ID and name, and the ROAS Google Ads reports.
2. From Sealmetrics, get purchases and revenue per utm_campaign. Our tracking template sends the campaign ID in utm_campaign.
3. Join both on campaign ID and calculate measured ROAS as Sealmetrics revenue divided by cost, next to the reported ROAS.
4. Flag campaigns with a measured ROAS below {break_even_roas}.

List any campaign that appears in only one of the two sources. Do not guess a match.`,
          tools: "get_campaigns, plus the Google Ads MCP",
          limit: "Credit for views or earlier sessions. On last click, prospecting and video look weaker; test before cutting them.",
        },
        {
          title: "Where does each campaign lose shoppers in the funnel?",
          when: "When a campaign brings traffic that does not buy, and you need to know where it stops.",
          prompt: `Using the Sealmetrics MCP for my site, for the last 30 days:

1. Show the purchase funnel with the conversion and drop-off rate at each step.
2. For the ten campaigns with most entrances, show entrances, product views (view_item or view_product), add_to_cart, begin_checkout and purchases, with the rate between each step.
3. Mark the step where each campaign drops furthest below the site average.

End with the two campaigns where fixing one step would add most purchases, and name the step.`,
          tools: "get_funnel, get_campaigns, get_microconversion_details",
          limit: "The path of a single shopper. The funnel counts events per step over the period.",
        },
      ],
    },
    {
      id: "problem-c",
      tag: "Problem C",
      title: <>Marketing and finance<br /><em>have different numbers.</em></>,
      body: (
        <>
          Reconcile with the ledger, explain the ad platforms&apos; figures and check
          the rules before anyone reads the report. The method is on{" "}
          <Link className={link} href="/use-cases/single-source-of-truth/">single source of truth</Link>.
        </>
      ),
      items: [
        {
          title: "Revenue check before the finance meeting",
          when: "At month close, when three revenue figures are about to meet in one room.",
          prompt: `I need to reconcile last month's online revenue with finance.

Finance booked {net_revenue} {currency}, net of {refunds} {currency} in refunds. The store admin shows {gross_revenue} {currency} gross.

Using the Sealmetrics MCP for my site:
1. Get purchases and revenue for last month, and the site's currency and timezone.
2. Show the three figures side by side: measured, store gross and finance net.
3. Explain each gap with the definitions involved: refunds and cancellations, taxes and shipping, orders with no web visit, and the date each system uses.
4. Write a two-sentence summary I can read out in the meeting.`,
          tools: "get_site, get_conversions",
          limit: "Revenue recognition. Finance still closes the books; this explains the distance between the figures.",
        },
        {
          title: "Board summary with the method stated",
          when: "Quarterly, when the numbers leave the marketing team.",
          prompt: `Using the Sealmetrics MCP for my site, prepare a one-page summary of last quarter compared with the same quarter last year.

Include entrances, purchases, revenue and conversion rate; revenue by channel with each channel's share; the five campaigns and the three countries with most revenue.

Close with a short "How this was measured" note: visits counted without cookies, revenue credited to the last click of each session, no modelled or estimated data. Do not describe customer journeys or individual behaviour.`,
          tools: "get_overview, get_channels, get_campaigns, get_countries",
          limit: "More than 24 months of history. Data is kept for 24 months, so year-on-year needs a full year recorded.",
        },
        {
          title: "Why Meta Ads Manager reports more than we measure",
          when: "When Meta's purchase value and measured revenue are far apart. Needs a Meta Ads MCP connection.",
          prompt: `Using the Sealmetrics MCP and my Meta Ads MCP connection, for the last 30 days:

1. From Meta, get purchases and purchase value per campaign, and the attribution setting they are reported with.
2. From Sealmetrics, get purchases and revenue per utm_campaign where utm_source is facebook or instagram. Our URL parameters send the campaign name in utm_campaign.
3. Match campaigns by name and show both figures and the ratio between them.
4. Explain the gap in plain language: attribution window, view-through conversions, modelled conversions and sales claimed by more than one platform.

Do not call either figure wrong. Tell me which to use for bidding inside Meta and which for budget between channels.`,
          tools: "get_campaigns, plus the Meta Ads MCP",
          limit: "Which sale Meta and Google both claimed. Sealmetrics credits each recorded order to one last click, with no link to the platforms' records.",
        },
        {
          title: "Check the channel rules before the report goes out",
          when: "Before a monthly or quarterly report, or after an agency changes its tagging.",
          prompt: `Using the Sealmetrics MCP for my site:

1. List the custom channel rules with their priority, and mark which are live and which are drafts.
2. Get the 30 source/medium pairs with most entrances in the last 30 days.
3. Test each pair against the rules and show the channel it lands in.
4. Flag pairs that land in Unassigned, or in a channel that does not fit the source.

Propose any fix as a draft rule only, and remind me that publishing happens in the dashboard and affects future traffic only.`,
          tools: "list_channel_rules, get_traffic_sources, get_traffic_mediums, test_channel_rules",
          limit: "Traffic already received. A rule change reclassifies new visits, never history.",
        },
      ],
    },
    {
      id: "problem-d",
      tag: "Problem D",
      title: <>I have to prove<br /><em>compliance.</em></>,
      body: (
        <>
          The analytics itself sets no cookies, but a site can still send personal
          data to it by mistake. These two audits find it. The regulatory context is
          on{" "}
          <Link className={link} href="/gdpr-analytics/">GDPR analytics</Link>.
        </>
      ),
      items: [
        {
          title: "Is there personal data in our custom properties?",
          when: "Before a DPO review, and after developers add new events.",
          prompt: `Using the Sealmetrics MCP for my site, audit the custom properties we send.

1. List every property key on conversions and on microconversions.
2. For each key, get its most frequent values.
3. Flag any key or value that looks like personal data: email addresses, names, phone numbers, postal addresses, customer IDs, order IDs, IP addresses or free text typed by users.
4. For each flag, name the event that sends it and suggest what to send instead, such as a category or a range.

Output a table a DPO can review. Mask any value that looks like personal data instead of printing it.`,
          tools: "list_property_keys, get_property_values",
          limit: "The site's other tags, pixels or consent banner. It audits only what reaches Sealmetrics.",
        },
        {
          title: "Are campaign parameters leaking personal data?",
          when: "When email or CRM tools build your links, which is where identifiers usually slip in.",
          prompt: `Using the Sealmetrics MCP for my site, for the last 90 days, check the values of utm_source, utm_medium, utm_campaign and utm_term, and the paths of the landing pages with most entrances.

Flag any value that contains an email address, a name, a phone number, a customer or subscriber ID, or a token that looks like one.

For each flag, show the parameter, a masked example, the entrances affected and the tool that most likely added it, and suggest how to stop it at the source.`,
          tools: "get_traffic_sources, get_traffic_mediums, get_campaigns, get_terms, get_landing_pages",
          limit: "Traffic already recorded. Fixing the link stops new values; it does not change what was received.",
        },
      ],
    },
  ],

  limits: {
    tag: "Prompts that will not work",
    title: <>Some questions<br /><em>have no data behind them.</em></>,
    body: "A well-behaved assistant should say so rather than improvise. If it answers any of these with numbers, check which tool it called.",
    items: [
      ["\"Show me the journey of the customers who bought\"", "There are no journeys. Visits are not linked across sessions and no visitor has an identifier."],
      ["\"How many returning customers did we get?\"", "A returning visit is a new visit. Repeat customers belong in the store or the CRM."],
      ["\"Which companies or people visited the pricing page?\"", "No IP address is stored and no visitor is identified."],
      ["\"Send these conversions to Google Ads\"", "The MCP reads analytics. Sealmetrics sends no conversions to ad platforms."],
      ["\"Publish the new channel rules\"", "Channel-rule tools create drafts only. Publishing is a human action in the dashboard."],
      ["\"Give me every raw purchase event of the last quarter\"", "Raw event tools cover up to 31 days per request; use aggregated tools or the BigQuery connector for longer periods."],
    ],
  },

  faqTag: "Questions about the prompts",
  faqTitle: <>Before you paste<br /><em>the first one.</em></>,
  faq: [
    { question: "Which AI assistants can run these prompts?", answer: "Any client that supports a remote MCP server: Claude.ai, Claude Desktop, Claude Code, ChatGPT, Cursor, Codex and VS Code with Copilot, among others. The endpoint is https://mcp.sealmetrics.com/mcp, and a local npx server with an API key is the alternative." },
    { question: "Do I need to name the MCP tools in the prompt?", answer: "No. The assistant chooses the tools from the question. The tool names on this page show what each prompt relies on, which helps when an answer looks wrong and you want to check what was called." },
    { question: "Can the assistant change my data or settings?", answer: "No. The analytics tools only read. Where channel-rule tools are available, they work on drafts only: the MCP can never change or publish a live rule, which stays a human action in the dashboard." },
    { question: "Do these prompts work on the free Agentic plan?", answer: "Yes. The REST API and the MCP server are included on every plan, the free Agentic tier among them. Prompts that also use Google Analytics, Google Ads or Meta Ads need a connection to those platforms as well." },
    { question: "Where does the data go when the assistant answers?", answer: "The tool results go to the assistant you connected and are processed under that provider's terms. Sealmetrics returns aggregate data with no visitor identifiers. Teams that need the model inside the EU can use LENS with Private AI, which runs on EU-hosted inference." },
    { question: "Is there a longer prompt library?", answer: "Yes. docs.sealmetrics.com keeps a catalogue of prompts in sixteen categories, each with a stable ID, including hotels, product properties, forecasting and combinations with Google Ads, Meta Ads and Search Console. This page keeps a short, checked set organised by problem." },
    { question: "How accurate are the answers?", answer: "The tools return the same data as the dashboard: visits counted without cookies and revenue credited to the last click of each session. The assistant can still misread a question or join two sources badly, which is why the prompts ask it to state periods, timezone and matching rules." },
  ],

  final: {
    tag: "Start asking",
    title: <>Connect the assistant.<br /><em>Paste prompt A1.</em></>,
    body: "The Agentic tier is free up to 1M human events in total and includes the MCP server. Connect it from AI analytics, then run the first prompt against your own site.",
    primary: { label: "Connect an AI assistant", href: "/ai-analytics/" },
    secondary: { label: "See pricing", href: "/pricing/" },
  },
};

export const mcpPromptsEs: PromptLibraryContent = {
  breadcrumbs: [
    { label: "Inicio", href: "/es/" },
    { label: "Analítica con IA", href: "/es/ai-analytics/" },
    { label: "Biblioteca de prompts" },
  ],
  eyebrow: "Analítica con IA · biblioteca de prompts MCP",
  h1: <>Doce prompts.<br />Cuatro problemas.<br /><em>Tus propios datos.</em></>,
  heroBody:
    "Copia un prompt en Claude, ChatGPT o cualquier asistente conectado al servidor MCP de Sealmetrics y obtén la respuesta de tu propia analítica, medida sin pérdida por consentimiento. Cada prompt está agrupado por el problema que resuelve, indica las herramientas que usa y dice qué no puede responder.",
  heroPrimary: { label: "Ver los prompts", href: "#problem-a" },
  heroSecondary: { label: "Leer la referencia del MCP", href: "/docs/mcp/" },
  heroMicro: "Endpoint MCP remoto · herramientas de analítica de solo lectura · todos los planes, también Agentic · datos alojados en Dublín",
  module: {
    title: "Biblioteca de prompts · por problema",
    status: "12 prompts",
    rows: [
      ["A · GA4 no refleja la realidad", "3 prompts"],
      ["B · Qué campañas funcionan", "3 prompts"],
      ["C · Marketing y Finanzas no cuadran", "4 prompts"],
      ["D · Demostrar cumplimiento", "2 prompts"],
    ],
    foot: "Dos prompts necesitan además el MCP de una plataforma publicitaria · uno, el de Google Analytics",
  },

  answerLabel: "Respuesta rápida",
  answer: (
    <p>
      Un prompt MCP de analítica web es una instrucción en lenguaje natural que un
      asistente de IA responde llamando a las herramientas de un servidor de
      analítica, así que las cifras salen de tus datos y no del modelo. Conectados
      al servidor MCP de Sealmetrics, Claude, ChatGPT, Cursor o Codex pueden leer
      tráfico, canales, campañas, conversiones, ingresos, embudos, líneas de pedido
      y propiedades personalizadas de cualquier sitio al que tenga acceso la
      cuenta, en periodos como 30d, last_month o last_quarter y comparados con el
      periodo o el año anterior. Esta biblioteca reúne doce prompts agrupados en
      cuatro problemas: GA4 no refleja la realidad, no saber qué campañas
      funcionan, marketing y finanzas con cifras distintas y demostrar
      cumplimiento. Cada uno indica las herramientas que usa y la pregunta que no
      puede responder. Los datos son agregados y a último clic por sesión, así que
      ningún prompt puede devolver un recorrido de cliente ni un visitante
      concreto.
    </p>
  ),

  use: {
    tag: "Antes del primer prompt",
    title: <>Conecta una vez.<br /><em>Después pregunta.</em></>,
    body: (
      <>
        La configuración es una URL y está explicada paso a paso en{" "}
        <Link className={link} href="/es/ai-analytics/">analítica con IA</Link>.
        Tres costumbres hacen fiables las respuestas.
      </>
    ),
    steps: [
      { name: "Di qué sitio", text: "Si la cuenta tiene varios sitios, indica cuál, o pide al asistente que liste tus sitios primero. Cada consulta se dirige a un sitio." },
      { name: "Rellena los marcadores", text: "Sustituye los valores entre {llaves} por los tuyos: un total de pedidos, una moneda, un ROAS de equilibrio. El prompt le pide al asistente que no se los invente." },
      { name: "Pide el método junto a la respuesta", text: "Mantén las líneas que piden indicar periodos, zona horaria y atribución. Una cifra sin su definición es la que abre la siguiente discusión." },
    ],
  },

  labels: { when: "Cuándo usarlo", tools: "Herramientas que usa", limit: "Lo que no puede decirte" },

  groups: [
    {
      id: "problem-a",
      tag: "Problema A",
      title: <>GA4 no refleja<br /><em>la realidad.</em></>,
      body: (
        <>
          Mide el hueco, encuentra de dónde viene el tráfico sin origen y contrasta el
          total medido con la tienda. El razonamiento detrás de estos prompts está en{" "}
          <Link className={link} href="/es/complete-data/">datos completos</Link>.
        </>
      ),
      items: [
        {
          title: "¿Cuánto tráfico pierde GA4, por canal?",
          when: "Tras al menos 30 días con las dos herramientas en la web. Necesita además una conexión MCP con Google Analytics.",
          prompt: `Con el MCP de Sealmetrics y mi conexión MCP de Google Analytics, compara el mes pasado en mi web.

1. De Sealmetrics, obtén las entradas por canal.
2. De GA4, obtén las sesiones por grupo de canales predeterminado en las mismas fechas.
3. Construye una tabla: canal, entradas en Sealmetrics, sesiones en GA4, diferencia y % de diferencia.
4. Ordénala por la diferencia absoluta, de mayor a menor.

Antes de la tabla, indica la zona horaria del sitio en Sealmetrics y comprueba que la propiedad de GA4 usa la misma. Después de la tabla, aclara que entradas y sesiones se definen de forma distinta, así que las diferencias deben leerse canal a canal y no como un total exacto.`,
          tools: "get_site, get_channels y el MCP de Google Analytics",
          limit: "Qué visitas concretas no registró GA4. Compara totales por canal.",
        },
        {
          title: "¿De dónde viene el tráfico sin origen utilizable?",
          when: "Cuando Direct o Unassigned pesan lo suficiente como para cambiar una decisión de presupuesto.",
          prompt: `Con el MCP de Sealmetrics para mi web, en los últimos 30 días:

1. Muestra las entradas por canal y cuántas caen en Direct y en Unassigned.
2. Lista las 20 páginas de llegada que reciben más entradas directas, con sus conversiones.
3. Lista los principales dominios de referencia y señala los que parezcan pasarelas de pago, motores de reservas, páginas de login o dominios propios.
4. Prueba los 20 pares source/medium más frecuentes contra las reglas de canal e indica cuáles acaban en Unassigned.

Termina con tres causas probables, ordenadas, y qué comprobar primero en cada una.`,
          tools: "get_channels, get_landing_pages, get_top_referrers, get_traffic_sources, test_channel_rules",
          limit: "El origen de una visita que llegó sin UTM, sin identificador de clic y sin referrer. Esa información no llegó a ninguna herramienta.",
        },
        {
          title: "¿Cuadra el total medido con los pedidos de la tienda?",
          when: "Antes de fiarte de ninguna cifra por canal, y de nuevo tras cualquier cambio en el etiquetado.",
          prompt: `Estos son los pedidos online de mi tienda del mes pasado, sacados del admin: {pedidos} pedidos y {ingresos} {moneda}, sin pedidos de tienda física, manuales ni renovaciones de suscripción.

Con el MCP de Sealmetrics para mi web:
1. Obtén la zona horaria y la moneda del sitio.
2. Obtén las conversiones de compra y los ingresos del mes pasado.
3. Calcula el porcentaje de pedidos y de ingresos que registró Sealmetrics.
4. Enumera lo que podría explicar la diferencia: zona horaria, moneda, impuestos y envío dentro del importe de compra, pedidos sin visita web y pedidos de prueba.

Informa de las cifras tal como salen; no las ajustes.`,
          tools: "get_site, get_conversions",
          limit: "Una comparación pedido a pedido. Sealmetrics no guarda IDs de pedido, así que la comprobación es por totales.",
        },
      ],
    },
    {
      id: "problem-b",
      tag: "Problema B",
      title: <>¿Qué campañas<br /><em>funcionan de verdad?</em></>,
      body: (
        <>
          Ordena campañas por ingresos, crúzalas con la inversión y encuentra el paso
          del embudo que pierde cada una. Las reglas de atribución están en{" "}
          <Link className={link} href="/es/use-cases/revenue-attribution/">atribución de ingresos</Link>.
        </>
      ),
      items: [
        {
          title: "¿Qué campañas traen ingresos y no solo entradas?",
          when: "Cada mes, antes de revisar el plan de medios.",
          prompt: `Con el MCP de Sealmetrics para mi web, compara los últimos 30 días con los 30 anteriores.

1. Lista todas las campañas (utm_campaign) con al menos 200 entradas: source, medium, entradas, compras, ingresos, tasa de conversión e ingresos por entrada, con la variación frente al periodo anterior.
2. Divide la lista en tres grupos: ingresos al alza, ingresos a la baja y entradas sin compras.
3. Para las campañas con entradas y sin compras, muestra sus microconversiones add_to_cart y begin_checkout, para distinguir un problema de página de llegada de uno de checkout.

Indica bajo la tabla que los ingresos se atribuyen al último clic de cada sesión.`,
          tools: "get_campaigns, get_microconversion_details",
          limit: "El retorno sobre la inversión. Sealmetrics no importa costes; el siguiente prompt los cruza.",
        },
        {
          title: "¿Cuál es el ROAS medido de cada campaña de Google Ads?",
          when: "Cuando Google Ads reporta un ROAS que el resto del negocio no reconoce. Necesita una conexión MCP con Google Ads.",
          prompt: `Con el MCP de Sealmetrics y mi conexión MCP de Google Ads, para el mes pasado:

1. De Google Ads, obtén el coste por campaña con su ID y su nombre, y el ROAS que reporta Google Ads.
2. De Sealmetrics, obtén compras e ingresos por utm_campaign. Nuestra plantilla de seguimiento envía el ID de campaña en utm_campaign.
3. Cruza ambos por ID de campaña y calcula el ROAS medido como ingresos de Sealmetrics entre coste, junto al ROAS reportado.
4. Señala las campañas con un ROAS medido por debajo de {roas_equilibrio}.

Enumera las campañas que aparezcan solo en una de las dos fuentes. No supongas coincidencias.`,
          tools: "get_campaigns y el MCP de Google Ads",
          limit: "El mérito de visualizaciones o sesiones anteriores. A último clic, la prospección y el vídeo parecen más débiles; haz un test antes de recortarlos.",
        },
        {
          title: "¿Dónde pierde compradores cada campaña en el embudo?",
          when: "Cuando una campaña trae tráfico que no compra y necesitas saber dónde se para.",
          prompt: `Con el MCP de Sealmetrics para mi web, en los últimos 30 días:

1. Muestra el embudo de compra con la tasa de conversión y de abandono de cada paso.
2. Para las diez campañas con más entradas, muestra entradas, vistas de producto (view_item o view_product), add_to_cart, begin_checkout y compras, con la tasa entre cada paso.
3. Marca el paso en el que cada campaña queda más por debajo de la media del sitio.

Termina con las dos campañas en las que arreglar un paso añadiría más compras, y di qué paso.`,
          tools: "get_funnel, get_campaigns, get_microconversion_details",
          limit: "El recorrido de un comprador concreto. El embudo cuenta eventos por paso en el periodo.",
        },
      ],
    },
    {
      id: "problem-c",
      tag: "Problema C",
      title: <>Marketing y Finanzas<br /><em>tienen cifras distintas.</em></>,
      body: (
        <>
          Concilia con la contabilidad, explica las cifras de las plataformas y revisa
          las reglas antes de que nadie lea el informe. El método está en{" "}
          <Link className={link} href="/es/use-cases/single-source-of-truth/">fuente única de verdad</Link>.
        </>
      ),
      items: [
        {
          title: "Revisión de ingresos antes de la reunión con finanzas",
          when: "Al cierre de mes, cuando tres cifras de ingresos van a coincidir en la misma sala.",
          prompt: `Necesito conciliar los ingresos online del mes pasado con finanzas.

Finanzas registró {ingresos_netos} {moneda}, netos de {devoluciones} {moneda} en devoluciones. El admin de la tienda muestra {ingresos_brutos} {moneda} brutos.

Con el MCP de Sealmetrics para mi web:
1. Obtén compras e ingresos del mes pasado, y la moneda y la zona horaria del sitio.
2. Muestra las tres cifras juntas: medida, bruto de la tienda y neto de finanzas.
3. Explica cada diferencia con las definiciones que intervienen: devoluciones y cancelaciones, impuestos y envío, pedidos sin visita web y la fecha que usa cada sistema.
4. Escribe un resumen de dos frases que pueda leer en la reunión.`,
          tools: "get_site, get_conversions",
          limit: "El reconocimiento de ingresos. Finanzas sigue cerrando la contabilidad; esto explica la distancia entre las cifras.",
        },
        {
          title: "Resumen para dirección con el método explicado",
          when: "Cada trimestre, cuando las cifras salen del equipo de marketing.",
          prompt: `Con el MCP de Sealmetrics para mi web, prepara un resumen de una página del último trimestre comparado con el mismo trimestre del año anterior.

Incluye entradas, compras, ingresos y tasa de conversión; ingresos por canal con la cuota de cada canal; las cinco campañas y los tres países con más ingresos.

Cierra con una nota breve de "Cómo se ha medido": visitas contadas sin cookies, ingresos atribuidos al último clic de cada sesión y sin datos modelados ni estimados. No describas recorridos de clientes ni comportamientos individuales.`,
          tools: "get_overview, get_channels, get_campaigns, get_countries",
          limit: "Más de 24 meses de histórico. Los datos se conservan 24 meses, así que la comparación interanual necesita un año completo registrado.",
        },
        {
          title: "Por qué Meta Ads Manager reporta más de lo que medimos",
          when: "Cuando el valor de compra de Meta y los ingresos medidos están muy lejos. Necesita una conexión MCP con Meta Ads.",
          prompt: `Con el MCP de Sealmetrics y mi conexión MCP de Meta Ads, en los últimos 30 días:

1. De Meta, obtén compras y valor de compra por campaña, y la configuración de atribución con la que se reportan.
2. De Sealmetrics, obtén compras e ingresos por utm_campaign cuando utm_source sea facebook o instagram. Nuestros parámetros de URL envían el nombre de la campaña en utm_campaign.
3. Empareja campañas por nombre y muestra las dos cifras y la proporción entre ellas.
4. Explica la diferencia en lenguaje claro: ventana de atribución, conversiones view-through, conversiones modeladas y ventas que reclama más de una plataforma.

No califiques ninguna cifra de errónea. Dime cuál usar para pujar dentro de Meta y cuál para repartir presupuesto entre canales.`,
          tools: "get_campaigns y el MCP de Meta Ads",
          limit: "Qué venta reclamaron a la vez Meta y Google. Sealmetrics atribuye cada pedido registrado a un último clic, sin enlace con los registros de las plataformas.",
        },
        {
          title: "Revisa las reglas de canal antes de enviar el informe",
          when: "Antes de un informe mensual o trimestral, o cuando una agencia cambia su etiquetado.",
          prompt: `Con el MCP de Sealmetrics para mi web:

1. Lista las reglas de canal propias con su prioridad y marca cuáles están publicadas y cuáles son borradores.
2. Obtén los 30 pares source/medium con más entradas de los últimos 30 días.
3. Prueba cada par contra las reglas y muestra el canal en el que acaba.
4. Señala los pares que acaban en Unassigned o en un canal que no encaja con la fuente.

Propón cualquier corrección solo como regla en borrador, y recuérdame que publicarla se hace en el panel y afecta solo al tráfico futuro.`,
          tools: "list_channel_rules, get_traffic_sources, get_traffic_mediums, test_channel_rules",
          limit: "El tráfico ya recibido. Un cambio de regla reclasifica las visitas nuevas, nunca el histórico.",
        },
      ],
    },
    {
      id: "problem-d",
      tag: "Problema D",
      title: <>Tengo que demostrar<br /><em>cumplimiento.</em></>,
      body: (
        <>
          La analítica en sí no instala cookies, pero una web puede enviarle datos
          personales por error. Estas dos auditorías los encuentran. El contexto
          regulatorio está en{" "}
          <Link className={link} href="/es/gdpr-analytics/">analítica y RGPD</Link>.
        </>
      ),
      items: [
        {
          title: "¿Hay datos personales en nuestras propiedades personalizadas?",
          when: "Antes de una revisión del DPO, y cuando desarrollo añade eventos nuevos.",
          prompt: `Con el MCP de Sealmetrics para mi web, audita las propiedades personalizadas que enviamos.

1. Lista todas las claves de propiedad de conversiones y de microconversiones.
2. Para cada clave, obtén sus valores más frecuentes.
3. Señala cualquier clave o valor que parezca un dato personal: direcciones de email, nombres, teléfonos, direcciones postales, IDs de cliente, IDs de pedido, direcciones IP o texto libre escrito por usuarios.
4. Para cada caso, indica qué evento lo envía y propón qué enviar en su lugar, como una categoría o un rango.

Entrega una tabla que pueda revisar un DPO. Enmascara cualquier valor que parezca un dato personal en lugar de mostrarlo.`,
          tools: "list_property_keys, get_property_values",
          limit: "Las demás etiquetas, píxeles o el banner de la web. Audita solo lo que llega a Sealmetrics.",
        },
        {
          title: "¿Filtran datos personales los parámetros de campaña?",
          when: "Cuando herramientas de email o de CRM construyen tus enlaces, que es por donde suelen colarse identificadores.",
          prompt: `Con el MCP de Sealmetrics para mi web, en los últimos 90 días, revisa los valores de utm_source, utm_medium, utm_campaign y utm_term, y las rutas de las páginas de llegada con más entradas.

Señala cualquier valor que contenga una dirección de email, un nombre, un teléfono, un ID de cliente o de suscriptor, o un token que lo parezca.

Para cada caso, muestra el parámetro, un ejemplo enmascarado, las entradas afectadas y la herramienta que probablemente lo añadió, y propón cómo cortarlo en origen.`,
          tools: "get_traffic_sources, get_traffic_mediums, get_campaigns, get_terms, get_landing_pages",
          limit: "El tráfico ya registrado. Corregir el enlace evita valores nuevos; no cambia lo que ya se recibió.",
        },
      ],
    },
  ],

  limits: {
    tag: "Prompts que no van a funcionar",
    title: <>Algunas preguntas<br /><em>no tienen datos detrás.</em></>,
    body: "Un asistente bien planteado debería decirlo en lugar de improvisar. Si responde a alguna de estas con cifras, revisa qué herramienta ha llamado.",
    items: [
      ["\"Enséñame el recorrido de los clientes que compraron\"", "No hay recorridos. Las visitas no se unen entre sesiones y ningún visitante tiene identificador."],
      ["\"¿Cuántos clientes recurrentes hemos tenido?\"", "Una visita que vuelve es una visita nueva. Los clientes recurrentes están en la tienda o en el CRM."],
      ["\"¿Qué empresas o personas visitaron la página de precios?\"", "No se guarda la IP ni se identifica a ningún visitante."],
      ["\"Envía estas conversiones a Google Ads\"", "El MCP lee analítica. Sealmetrics no envía conversiones a las plataformas publicitarias."],
      ["\"Publica las nuevas reglas de canal\"", "Las herramientas de reglas solo crean borradores. Publicar es una acción humana en el panel."],
      ["\"Dame todos los eventos de compra en bruto del último trimestre\"", "Las herramientas de eventos en bruto cubren hasta 31 días por petición; para periodos más largos, usa las herramientas agregadas o el conector de BigQuery."],
    ],
  },

  faqTag: "Preguntas sobre los prompts",
  faqTitle: <>Antes de pegar<br /><em>el primero.</em></>,
  faq: [
    { question: "¿Qué asistentes de IA pueden ejecutar estos prompts?", answer: "Cualquier cliente que admita un servidor MCP remoto: Claude.ai, Claude Desktop, Claude Code, ChatGPT, Cursor, Codex y VS Code con Copilot, entre otros. El endpoint es https://mcp.sealmetrics.com/mcp, y la alternativa es un servidor local con npx y una clave de API." },
    { question: "¿Hay que nombrar las herramientas MCP en el prompt?", answer: "No. El asistente elige las herramientas a partir de la pregunta. Los nombres de herramienta de esta página indican en qué se apoya cada prompt, algo útil cuando una respuesta parece rara y quieres comprobar qué se llamó." },
    { question: "¿Puede el asistente cambiar mis datos o mi configuración?", answer: "No. Las herramientas de analítica solo leen. Donde hay herramientas de reglas de canal, trabajan solo con borradores: el MCP nunca puede cambiar ni publicar una regla activa, que sigue siendo una acción humana en el panel." },
    { question: "¿Funcionan estos prompts en el plan gratuito Agentic?", answer: "Sí. La API REST y el servidor MCP están incluidos en todos los planes, también en el Agentic gratuito. Los prompts que usan además Google Analytics, Google Ads o Meta Ads necesitan también una conexión con esas plataformas." },
    { question: "¿A dónde van los datos cuando responde el asistente?", answer: "Los resultados de las herramientas van al asistente que hayas conectado y se tratan según las condiciones de ese proveedor. Sealmetrics devuelve datos agregados sin identificadores de visitante. Los equipos que necesitan el modelo dentro de la UE pueden usar LENS con Private AI, que funciona con inferencia alojada en la UE." },
    { question: "¿Hay una biblioteca de prompts más amplia?", answer: "Sí. docs.sealmetrics.com mantiene un catálogo de prompts en dieciséis categorías, cada uno con un ID estable, que incluye hoteles, propiedades de producto, previsiones y combinaciones con Google Ads, Meta Ads y Search Console. Esta página reúne una selección breve y revisada, organizada por problema." },
    { question: "¿Qué precisión tienen las respuestas?", answer: "Las herramientas devuelven los mismos datos que el panel: visitas contadas sin cookies e ingresos atribuidos al último clic de cada sesión. El asistente puede aun así malinterpretar una pregunta o cruzar mal dos fuentes, y por eso los prompts le piden indicar periodos, zona horaria y reglas de emparejamiento." },
  ],

  final: {
    tag: "Empieza a preguntar",
    title: <>Conecta el asistente.<br /><em>Pega el prompt A1.</em></>,
    body: "El plan Agentic es gratuito hasta 1M de eventos humanos en total e incluye el servidor MCP. Conéctalo desde analítica con IA y ejecuta el primer prompt sobre tu propia web.",
    primary: { label: "Conectar un asistente de IA", href: "/es/ai-analytics/" },
    secondary: { label: "Ver precios", href: "/es/pricing/" },
  },
};
