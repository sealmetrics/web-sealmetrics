import { MCP_ENDPOINT } from "@/lib/content/mcp-setup";
import { AGENTIC_EXTENSION, AGENTIC_GUIDE } from "@/lib/content/reality-landing";

/**
 * Cold paid-traffic landing (Google Ads, Meta Ads, LinkedIn Ads), Q4 2026.
 * EN: /free-account/ · ES: /es/cuenta-gratis/. Both noindex/follow.
 *
 * One primary conversion: the visitor opens the free Agentic account from
 * Claude with the prompt below. One secondary conversion: a Growth or Scale
 * plan signed before Black Friday, which carries the Enterprise SLA through
 * the Christmas campaign.
 *
 * Every figure here is a published client figure (src/lib/content/case-studies.tsx)
 * or a measured tracker figure (docs.sealmetrics.com/guides/tracker-performance-report).
 * The free allowance is cumulative, never monthly (docs.sealmetrics.com/api/provision).
 */

export { MCP_ENDPOINT, AGENTIC_EXTENSION, AGENTIC_GUIDE };
/** Account creation from the chat needs the Agentic package (local MCP), not the
 *  remote connector: verified 15 Sep 2026, mcp.sealmetrics.com answers 401 without a
 *  Sealmetrics login and the plugin README says the OAuth connector cannot reach the
 *  provisioning tools. Claude Desktop installs it as sealmetrics.mcpb; Codex runs it
 *  with npx (docs.sealmetrics.com/integrations/agentic-package). */
export const AGENTIC_CODEX_CONFIG = `[mcp_servers.sealmetrics]
command = "npx"
args = ["-y", "@sealmetrics/mcp"]`;
export const MCP_GUIDE = "https://docs.sealmetrics.com/integrations/mcp-server";
/** Assistant onboarding, verified 15 Sep 2026. Claude Code and Codex install the
 *  seal-copilot plugin (tools + the 15 analysis skills); Claude web/desktop adds the
 *  MCP endpoint as a custom connector from Settings. Cursor is not supported yet. */
export const CLAUDE_CODE_PLUGIN_PROMPT = { en: "install the sealmetrics/seal-copilot plugin", es: "instala el plugin sealmetrics/seal-copilot" } as const;
export const CLAUDE_CODE_PLUGIN_COMMANDS = ["/plugin marketplace add sealmetrics/seal-copilot", "/plugin install seal-copilot@sealmetrics"];
export const CLAUDE_CODE_MCP_COMMAND = "/mcp";
export const CLAUDE_CODE_INSTALL_PLUGIN = "/plugin install seal-install@sealmetrics";
/* Codex flow: not tested end to end as of 15 Sep 2026 — internal review pending
   before this block is treated as verified. */
export const CODEX_COMMANDS = ["codex plugin marketplace add sealmetrics/seal-copilot", "codex plugin add seal-copilot@sealmetrics", "codex mcp login sealmetrics"];
/** Flip to true the day the Sealmetrics connector is published in the OpenAI directory. */
export const CHATGPT_CONNECTOR_LIVE = false;
export const REGISTER_URL = "https://my.sealmetrics.com/register";

/** Commercial window of the Black Friday offer. Change here, nowhere else. */
export const FREE_ACCOUNT_PROMO = {
  signBy: "2026-11-27",
  slaUntil: "2027-01-06",
  plans: ["Growth", "Scale"],
} as const;

/** Extra traffic Sealmetrics recorded vs GA4, channel by channel · Incapto, 28 Jul → 6 Aug 2026.
 *  `percent` scales the bar against organic social (+133%). Paid is a range. */
export const CHANNEL_LOSS = [
  { key: "direct", display: "+11%", percent: 8.3 },
  { key: "referral", display: "+24%", percent: 18 },
  { key: "email", display: "+26%", percent: 19.5 },
  { key: "paid", display: "+37 to +52%", percent: 39.1, rangeFrom: 27.8, paid: true },
  { key: "search", display: "+62%", percent: 46.6 },
  { key: "affiliate", display: "+73%", percent: 54.9 },
  { key: "social", display: "+133%", percent: 100 },
] as const;

export type FreeAccountLocale = "en" | "es";

export interface AssistantStep { text: string; code?: string[] }
export interface AssistantGuide { name: string; badge: string; intro?: string; steps: AssistantStep[]; notes?: AssistantStep[] }

export interface FreeAccountCopy {
  route: string; otherRoute: string; otherLanguage: string;
  title: string; description: string;
  nav: { evidence: string; offer: string; start: string; onPage: string };
  cta: string; eyebrow: string; h1Start: string; h1End: string; lead: string;
  stats: { value: string; label: string; note: string }[];
  free: string; noCard: string; ready: string; promise: string[];
  chart: { tag: string; title: string; subtitle: string; foot: string; meaning: string; channels: Record<string, string>; paidDisplay: string };
  trust: string;
  challenge: { tag: string; body: string; sign: string };
  evidence: { tag: string; start: string; end: string; body: string; orders: string; revenue: string; reconcile: string; period: string; visits: string; moreVisits: string; visitsBody: string; proofLink: string; note: string;
    dreamMetric: string; dreamLabel: string; dreamBody: string; palladiumMetric: string; palladiumLabel: string; palladiumBody: string; clientLink: string;
    storiesTag: string; stories: { title: string; slug: "palladium-hotel-group" | "incapto" }[] };
  attribution: { tag: string; start: string; end: string; body: string; items: [string, string][]; boundary: string };
  promo: { tag: string; start: string; end: string; body: string; terms: string[]; priceLine: string; cta: string; secondary: string; note: string; deadlineLabel: string; deadline: string; untilLabel: string; until: string; datesTag: string; dates: { date: string; label: string; body: string }[]; line: string };
  offer: { tag: string; start: string; end: string; body: string; included: string[]; price: string; allowance: string; priceLabel: string; eventNote: string; note: string; package: string;
    stackTag: string; stack: { item: string; detail: string; value: string }[]; totalLabel: string; totalNote: string;
    reasonTag: string; reasonTitle: string; reasonBody: string; guaranteeTag: string; guaranteeTitle: string; guaranteeBody: string };
  method: { tag: string; start: string; end: string; source: string };
  steps: { tag: string; start: string; end: string; intro: string; items: [string, string][]; downloadLabel: string; codexLabel: string; codexNote: string;
    pathsTitle: string; paths: [string, string][]; promptLabel: string; prompt: string; copy: string; copied: string; copyError: string; otherAssistant: string; guide: string; verify: string };
  onboarding: { tag: string; start: string; end: string; intro: string; optionalLabel: string; assistants: AssistantGuide[]; chatgptLive: AssistantGuide; verifyLabel: string; verify: string; verifyQuestion: string; copy: string; copied: string };
  letter: { tag: string; paragraphs: string[]; sign: string; role: string };
  faqTitle: string; faqs: { question: string; answer: string }[];
  final: { tag: string; start: string; end: string; body: string; line: string; demo: string };
  footer: string; privacy: string; terms: string; company: string;
}

const en: FreeAccountCopy = {
  route: "/free-account/", otherRoute: "/es/cuenta-gratis/", otherLanguage: "ES",
  title: "GA4 misses part of your traffic. Compare free | Sealmetrics",
  description: "GA4 behind a consent banner missed 29% of visits at Incapto. Open a free Sealmetrics account, 1M events, no card, and compare on your site before Black Friday.",
  nav: { evidence: "The evidence", offer: "Black Friday", start: "Start free", onPage: "On this page" },
  cta: "Open my free account",
  eyebrow: "The Black Friday Truth Test · 1,000,000 events · €0",
  h1Start: "You pay for every click.", h1End: "You decide on half.",
  lead: "In our experience with clients, between 40% and 60% of traffic doesn't accept cookies, and of those who do, 40% don't accept on the first pageview. Here is the deal for CMOs and eCommerce managers. Run Sealmetrics next to GA4 on your own site, and reconcile both against the orders your store actually took. You will know which channels are selling for real before Black Friday. Claude installs it, there is no card, and you keep GA4. At Incapto, GA4 missed 29% of visits; at Palladium, 35% of GA4 bookings had no channel.",
  stats: [
    { value: "+41%", label: "more visits than GA4 recorded", note: "Incapto · Shopify · 48 days" },
    { value: "+52%", label: "more paid-campaign traffic", note: "Incapto · top of a +37 to +52% range" },
    { value: "35%", label: "of bookings GA4 filed under no channel", note: "Palladium Hotel Group" },
    { value: "+15–20%", label: "more sales attributed", note: "Dreamplace Hotels · vs previous tool" },
  ],
  free: "The first million events are on us", noCard: "No credit card", ready: "Live on your site in 5 to 30 minutes",
  promise: ["No card", "Claude installs it in 5 to 30 minutes", "Keep GA4 running", "Comparison ready before Black Friday"],
  chart: {
    tag: "INCAPTO / GA4 VS SEALMETRICS", title: "The channels that lose most are the ones you pay for.",
    subtitle: "Extra traffic Sealmetrics recorded, channel by channel", foot: "28 JUL — 06 AUG 2026 · SAME SITE, SAME DAYS",
    meaning: "Direct barely moves. Paid, search, affiliate and social lose three to twelve times more. No correction factor fixes a loss that is uneven.",
    channels: { direct: "Direct", referral: "Referral", email: "Email", paid: "Paid campaigns", search: "Organic search", affiliate: "Affiliate", social: "Organic social" },
    paidDisplay: "+37 to +52%",
  },
  trust: "TEAMS ALREADY MEASURING WITH SEALMETRICS",
  challenge: {
    tag: "THE QUESTION",
    body: "Explain to me how you make your campaigns profitable when part of your traffic never reaches your report, and part of the sales you do see are filed under the wrong channel, or under none.",
    sign: "Rafa Jiménez · Founder, Sealmetrics",
  },
  evidence: {
    tag: "01 / THE EVIDENCE · INCAPTO", start: "The orders were real.", end: "GA4 saw 71% of the visits behind them.",
    body: "Incapto ran GA4 and Sealmetrics side by side on its Shopify store for 48 days. First it reconciled Sealmetrics against real orders. Then it compared the two tools.",
    orders: "of real Shopify orders recorded", revenue: "of real revenue recorded", reconcile: "SEALMETRICS VS SHOPIFY · ONLINE STORE", period: "14 JUN — 31 JUL 2026",
    visits: "Visits recorded over the same 48 days", moreVisits: "visits GA4 never saw",
    visitsBody: "GA4 recorded 29% fewer visits than Sealmetrics, and 45% fewer pageviews: the visits it misses browse twice as deep as the ones it records.",
    proofLink: "Read the full Incapto case",
    note: "Reconciliation covers Shopify Online Store only, excluding subscriptions, physical retail and manual orders. Sealmetrics reconciles 95.71% of orders and 96.53% of revenue. The visit window and the channel window are analysed separately. These are measurement differences, not incremental sales.",
    dreamMetric: "15–20%", dreamLabel: "more sales attributed than with its previous tool",
    dreamBody: "Dreamplace checks Sealmetrics against its CRM and uses the gap to move budget between Meta and Google.",
    palladiumMetric: "35%", palladiumLabel: "of GA4 bookings had no channel",
    palladiumBody: "Palladium found 40% of inbound traffic without source or medium and rebuilt its Display decisions on a neutral measurement layer. Display Cost-per-Search improved 165%.",
    clientLink: "Read the case",
    storiesTag: "TWO THINGS OUR CLIENTS FOUND",
    stories: [
      { title: "How Palladium improved Display Cost-per-Search by 165%", slug: "palladium-hotel-group" },
      { title: "How Incapto found that its best-converting traffic was the traffic that accepted cookies least", slug: "incapto" },
    ],
  },
  attribution: {
    tag: "02 / THE SALES YOU ALREADY MADE", start: "Every sale you record,", end: "filed under the channel that closed it.",
    body: "Sealmetrics attributes each conversion to the traffic source of the session in which it fires, last click, on the complete dataset rather than on the visitors who accepted a banner. No Cross-network bucket that hides part of your paid spend, and no unknown-origin line you cannot decide on: at Incapto that line was 14% of visits in GA4 and 0.3% in Sealmetrics.",
    items: [
      ["Revenue by channel, campaign and landing page", "The report that decides your media budget, calculated on the traffic that actually arrived."],
      ["The whole funnel, in aggregate counts", "Visit, product, cart, checkout, purchase: step counts by channel, so you see where each channel's buyers drop."],
      ["Fresh data, Black Friday included", "Hits usually reach your reports in under two minutes, with no sampling, and each day is complete before 6 AM. You adjust during the campaign, not the week after."],
    ],
    boundary: "Measurement is aggregate and anonymous: no visitor identifiers, no cross-device journeys, no multi-touch model. Last click on complete data, and a number you can reconcile against your orders.",
  },
  promo: {
    tag: "04 / THE DATES THAT MATTER", start: "Sign now.", end: "Run peak season on the Enterprise SLA.",
    body: "Fresh, unsampled reports are not the offer, they are the product. The offer is the guarantee behind it. Contract a Growth or Scale plan before Black Friday and your account carries the SLA we give Enterprise accounts through the whole Christmas campaign, at your plan's price.",
    terms: [
      "Sign a Growth or Scale plan before 27 November 2026",
      "Enterprise SLA on your account until 6 January 2027",
      "99.9% availability commitment with service credits",
      "Priority support during the campaign",
      "Hits in your reports usually within two minutes, no sampling",
      "Day complete before 6 AM, every day of the campaign",
    ],
    priceLine: "Growth from €499/month · Scale from €899/month · billed annually · The first million events are on us with the Agentic account",
    cta: "See plans and sign", secondary: "Talk to us before signing",
    note: "Applies to plans signed in that window and is honoured for the full campaign. Report freshness and unsampled data are product capabilities on every plan, Agentic included; the SLA is the contractual layer on top.",
    deadlineLabel: "SIGN BEFORE", deadline: "27 NOV 2026", untilLabel: "ENTERPRISE SLA UNTIL", until: "6 JAN 2027",
    datesTag: "THREE DATES",
    dates: [
      { date: "13 NOV 2026", label: "Install by", body: "Two weeks of your own data before Black Friday. Install later and you compare on less." },
      { date: "27 NOV 2026", label: "Sign by", body: "Black Friday. Last day to get the Enterprise SLA on a Growth or Scale plan." },
      { date: "6 JAN 2027", label: "SLA runs until", body: "The end of the Christmas campaign, every day of it covered." },
    ],
    line: "Today's events cannot be measured tomorrow. Every day without the pixel is a day of Black Friday data you will never get back.",
  },
  offer: {
    tag: "03 / THE OFFER", start: "The first million events", end: "are on us.",
    body: "You have one million events to see the reality of your business. What you were looking at until now was something else. Open the Agentic account: the full measurement architecture, no card, nothing to cancel. Run it next to GA4 or Matomo, reconcile both against your orders, and see which channels you have been under-crediting.",
    included: ["Complete aggregate analytics, cookieless", "Revenue attribution by channel, campaign and landing page", "MCP, API and BigQuery connector", "Unlimited sites and users", "EU-hosted in Dublin, DPA included"],
    price: "€0", allowance: "THE FIRST 1,000,000 EVENTS, ON US", priceLabel: "NO CREDIT CARD · NOTHING TO CANCEL", package: "AGENTIC ACCOUNT",
    eventNote: "An event is a recorded interaction: a pageview, a click, a purchase. One visit generates several. A million events is enough to run a real comparison.",
    note: "Self-service, documentation support. Requires an MCP-capable assistant; its subscription is not included.",
    stackTag: "WHAT YOU GET, LINE BY LINE",
    stack: [
      { item: "Cookieless measurement, 1,000,000 events in total", detail: "The same measurement engine as the paid plans, with one million events over the life of the account instead of Growth's five million a month. Visits, conversions and revenue, including the visitors who reject a banner.", value: "€0" },
      { item: "Revenue attribution by channel, campaign and landing page", detail: "Last click on the complete dataset. The report that decides your media budget.", value: "Included" },
      { item: "Installation done by your AI assistant", detail: "Claude creates the account, generates the pixels and can push them to GitHub or GTM. A developer's afternoon you do not spend.", value: "Included" },
      { item: "Bonus 1 · The Incapto reconciliation method", detail: "The four steps Incapto used to check both tools against the till. On this page, below.", value: "Bonus" },
      { item: "Bonus 2 · 15 ready-made analyses in your assistant", detail: "Weekly health check, drop diagnosis, opportunity scan, funnel analysis and setup audit, with the free plugin.", value: "Bonus" },
      { item: "Bonus 3 · MCP, API and BigQuery connector", detail: "Your data leaves whenever you want it to, into the tool you already use.", value: "Bonus" },
      { item: "Black Friday bonus · Enterprise SLA through Christmas", detail: "Sign a Growth or Scale plan before 27 November and your account carries the Enterprise SLA until 6 January, at your plan's price.", value: "If you sign" },
    ],
    totalLabel: "YOUR PRICE", totalNote: "No card. Nothing to cancel. The only thing you spend is the few minutes the installation takes.",
    reasonTag: "WHY WE GIVE THE FIRST MILLION AWAY", reasonTitle: "Because the reconciliation sells better than we do.",
    reasonBody: "Our published clients started the same way: Incapto checked Sealmetrics against its Shopify orders, Dreamplace against its CRM, Palladium against GA4. We would rather you see the gap on your site than read about it on ours. If there is no gap, you owe us nothing and you will have learnt that your analytics is fine.",
    guaranteeTag: "THE GUARANTEE", guaranteeTitle: "Your till is the guarantee.",
    guaranteeBody: "Sealmetrics reconciles against orders your store actually took, not against our word. At Incapto that was 96% of orders and 97% of revenue. If you do not see more traffic and more sales with a channel than in GA4, you have not paid a cent and there is nothing to cancel.",
  },
  method: { tag: "BONUS 1 · THE INCAPTO METHOD", start: "Reconcile against the till,", end: "then read the difference.", source: "INCAPTO · SHOPIFY, GA4 AND SEALMETRICS · JUNE–AUGUST 2026" },
  steps: {
    tag: "05 / START FROM CLAUDE", start: "Three sentences to Claude.", end: "Then the pixels are yours.",
    intro: "No form, no dashboard, no sales call. Install the Sealmetrics extension in Claude Desktop and tell it what you want: it creates the account, provisions your site and generates the pixels. No card and no existing account needed.",
    items: [
      ["Install the Sealmetrics extension in Claude Desktop", "Download sealmetrics.mcpb. In Claude Desktop open Settings, then Extensions, drag the file in and click Install. Leave the “Sealmetrics API key” field empty."],
      ["Tell it to create your account", "Paste the prompt with your domain. Claude shows you the terms and asks you to accept them, asks for your email, then provisions the account and the site. A link to set your password arrives by email."],
      ["Tell it to generate your pixels", "It returns the tracking code for your site. Ask for the purchase conversion too. From here it is up to you."],
    ],
    downloadLabel: "Download the Claude Desktop extension", codexLabel: "CODEX · ~/.codex/config.toml", codexNote: "Codex and other MCP clients run the same package locally.",
    pathsTitle: "From here it is up to you",
    paths: [
      ["Push them to your site through GitHub", "If Claude has access to your repository, ask it to open the pull request with the pixels in place."],
      ["Add them to GTM through a GTM MCP", "If you run a Google Tag Manager MCP, ask Claude to create the tags and publish the container."],
      ["Copy and paste into GTM yourself", "Create a Custom HTML tag on All Pages. The pixel stores and reads nothing on the device; whether it can fire without your consent trigger depends on your configuration and your national authority's criteria, so confirm it with whoever owns privacy."],
    ],
    promptLabel: "COPY, ADD YOUR DOMAIN AND SEND TO CLAUDE",
    prompt: "Create my free Sealmetrics account for [your domain], provision the site, generate the tracking pixels for pageviews and purchases, and tell me how to install them.",
    copy: "Copy prompt", copied: "Prompt copied", copyError: "Select the prompt and copy it manually.",
    otherAssistant: "Creating the account from Codex or another MCP client?", guide: "Read the Agentic package guide",
    verify: "Once the pixels are live, ask Claude: “Confirm Sealmetrics is receiving visits from [your domain].”",
  },
  onboarding: {
    tag: "06 / WHAT'S NEXT", start: "Next: measure your traffic", end: "with your AI assistant.",
    intro: "Once the account exists, connect Sealmetrics to the assistant you already use by following only these steps, with no configuration files to touch. Ordered from easiest to hardest.",
    optionalLabel: "Optional",
    assistants: [
      { name: "Claude Code (terminal, desktop or IDE)", badge: "EASIEST · INSTALLS FROM THE CHAT",
        steps: [
          { text: "Option A: paste this into the chat.", code: [CLAUDE_CODE_PLUGIN_PROMPT.en] },
          { text: "Option B: type these two commands into the text box.", code: CLAUDE_CODE_PLUGIN_COMMANDS },
          { text: "Either way, then type /mcp, choose “sealmetrics” and sign in with your Sealmetrics account in the browser. There is no token to copy. If it does not appear, restart Claude Code.", code: [CLAUDE_CODE_MCP_COMMAND] },
        ],
        notes: [
          { text: "Install the plugin, not only the MCP URL: the plugin also brings the 15 analysis skills. With the URL alone you get the tools but not the methodology." },
          { text: "Optional, to install tracking on a site from scratch. It needs the SEALMETRICS_API_KEY environment variable.", code: [CLAUDE_CODE_INSTALL_PLUGIN] },
        ] },
      { name: "Codex", badge: "FROM THE PLUGIN README",
        steps: [
          { text: "Run these three commands, taken from the seal-copilot README.", code: CODEX_COMMANDS },
        ],
        notes: [
          { text: "This flow is documented by the plugin but we have not yet run it end to end on Codex. If a step fails, the Agentic package guide has the manual configuration." },
        ] },
      { name: "Claude web and Claude desktop (claude.ai, desktop app, Cowork)", badge: "FROM SETTINGS, NOT FROM THE CHAT",
        steps: [
          { text: "Open Customize, then Connectors, press “+” and choose Add custom connector." },
          { text: "Paste this URL.", code: [MCP_ENDPOINT] },
          { text: "Sign in with your Sealmetrics account." },
        ],
        notes: [
          { text: "On the Free plan only one custom connector is allowed." },
          { text: "On Team and Enterprise an Owner has to add it first from the organisation settings; after that each member connects." },
          { text: "Asking Claude in the chat does not work here: it cannot add connectors." },
        ] },
      { name: "ChatGPT", badge: "COMING SOON",
        intro: "We are awaiting approval in the OpenAI directory. Once it is published, searching for “Sealmetrics” and pressing Connect will be enough.",
        steps: [] },
    ],
    chatgptLive: { name: "ChatGPT", badge: "FROM THE CONNECTOR DIRECTORY",
      steps: [{ text: "Search for “Sealmetrics” in the connector directory and press Connect." }, { text: "Sign in with your Sealmetrics account." }] },
    verifyLabel: "HOW TO KNOW IT WORKS", verify: "Ask your assistant this question. It must answer with your real data.", verifyQuestion: "How did my traffic do this week?", copy: "Copy", copied: "Copied",
  },
  letter: {
    tag: "A NOTE FROM THE FOUNDER",
    paragraphs: [
      "If you have read this far and still have not opened the account, I know you are not going to buy Sealmetrics today. Fine. But I have to tell you: Sealmetrics is a cannon.",
      "Our pixel is 132 times lighter than GA4's and 155 times lighter than Adobe's. That is why it records visits the heavy scripts drop before they fire (on a European media site, 25% more pageviews than Adobe, with Adobe firing without a consent gate), why it records the sales that happen with no banner in the way, and why it assigns each one to the channel that closed it.",
      "There is a free package. Try it. You lose nothing. Compare. One: tell Claude to install the MCP. Two: tell it to create your account. Three: tell it to generate your pixels. From there it is up to you: have it push them to your site through GitHub, have it add them to GTM if you run a GTM MCP, or copy and paste them into GTM yourself and decide with your privacy lead whether the tag waits for the banner.",
    ],
    sign: "Rafa Jiménez", role: "Founder, Sealmetrics",
  },
  faqTitle: "Clear before you start.",
  faqs: [
    { question: "Is it really free, with no card?", answer: "Yes. We gift you the first million events: the Agentic account is free up to one million events in total over the life of the account, with no credit card and nothing to cancel. You need an MCP-capable assistant such as Claude; its subscription is separate." },
    { question: "What is an event?", answer: "A recorded interaction on your site: a pageview, a click on something you track, an add-to-cart, a purchase. One visit generates several events. The allowance is counted in human events, the same unit as the paid plans. For a mid-sized store that is weeks of measurement, enough to reconcile against your orders and read the difference by channel." },
    { question: "Do I have to remove GA4 or Matomo?", answer: "No. Keep it and run Sealmetrics in parallel on the same site for the same days. Then reconcile both against the orders in your store or CRM. That reconciliation, not our word, is the comparison." },
    { question: "Does the pixel need consent?", answer: "It writes nothing to and reads nothing from the device: no cookies, no local storage, no fingerprint. ePrivacy Article 5(3) is about storing or accessing information on the device, which is why many deployments can run without a consent banner; whether yours can depends on its configuration and on your national authority's criteria. Sealmetrics is designed for GDPR from the architecture up, self-assessed, not certified, with visitor data processed in Dublin and a DPA on every plan." },
    { question: "What exactly is the Black Friday offer?", answer: "Contract a Growth or Scale plan before 27 November 2026 and your account carries the Enterprise SLA, 99.9% availability with service credits and priority support, until 6 January 2027, at your plan's price. Fresh, unsampled reports are part of the product on every plan; the offer is the contractual guarantee on top." },
    { question: "What happens when I reach one million events?", answer: "You choose a plan. Growth starts at €499 a month billed annually with 5 million events a month. Nothing is charged without you choosing a plan, because there is no card on file." },
    { question: "Does it work with Shopify, WooCommerce, Magento or GTM?", answer: "Yes. Shopify and WordPress take about 5 minutes, custom or headless builds up to 30. Through GTM, a Custom HTML tag on All Pages; whether it fires without your consent trigger depends on your configuration and your national authority's criteria. Claude can generate the code for your platform." },
    { question: "Is this multi-touch attribution?", answer: "No, and it never will be. Sealmetrics is aggregate, anonymous measurement: it attributes each conversion last click to the source of the session in which it fires, on the complete dataset. No visitor identifiers, no cross-device journeys." },
  ],
  final: {
    tag: "THE NEXT COMPARISON IS YOURS", start: "Measure in parallel.", end: "One number to reconcile.",
    body: "Incapto, Dreamplace and Palladium ran the test. Open the free account today and you will have the comparison before Black Friday, and the Enterprise SLA through Christmas if you sign.",
    line: "Investing on the visitors who clicked Accept has a cost too.", demo: "Prefer to talk first? Book a demo",
  },
  footer: "Cookieless analytics. Complete data. Decisions you can reconcile.", privacy: "Privacy", terms: "Terms", company: "Sealmetrics · Esfera Marketing SL · Barcelona",
};

const es: FreeAccountCopy = {
  route: "/es/cuenta-gratis/", otherRoute: "/free-account/", otherLanguage: "EN",
  title: "A GA4 se le escapa tráfico. Compara gratis | Sealmetrics",
  description: "GA4 tras el banner no vio el 29% de las visitas de Incapto. Abre tu cuenta gratis de Sealmetrics, 1M de eventos sin tarjeta, y compara antes del Black Friday.",
  nav: { evidence: "La prueba", offer: "Black Friday", start: "Empieza gratis", onPage: "En esta página" },
  cta: "Abrir mi cuenta gratis",
  eyebrow: "La Prueba de la Verdad del Black Friday · 1.000.000 de eventos · 0 €",
  h1Start: "Pagas por todos los clics.", h1End: "Decides con la mitad.",
  lead: "En nuestra experiencia con clientes, entre el 40% y el 60% del tráfico no acepta cookies, y de quienes las aceptan, el 40% no lo hace en la primera página vista. Este es el trato para CMOs y eCommerce managers. Mide con Sealmetrics en paralelo a GA4 en tu propia web, y concilia las dos contra los pedidos que de verdad hizo tu tienda. Sabrás qué canales están vendiendo de verdad antes del Black Friday. Lo instala Claude, no hay tarjeta y te quedas con GA4. En Incapto, GA4 no vio el 29% de las visitas; en Palladium, el 35% de las reservas de GA4 no tenía canal.",
  stats: [
    { value: "+41%", label: "más visitas de las que registró GA4", note: "Incapto · Shopify · 48 días" },
    { value: "+52%", label: "más tráfico de campañas de pago", note: "Incapto · techo de un rango de +37 a +52%" },
    { value: "35%", label: "de las reservas de GA4 sin canal", note: "Palladium Hotel Group" },
    { value: "+15–20%", label: "más ventas atribuidas", note: "Dreamplace Hotels · frente a su herramienta anterior" },
  ],
  free: "Te regalamos el primer millón de eventos", noCard: "Sin tarjeta", ready: "En tu web en 5 a 30 minutos",
  promise: ["Sin tarjeta", "Claude lo instala en 5 a 30 minutos", "Te quedas con GA4", "Comparación lista antes del Black Friday"],
  chart: {
    tag: "INCAPTO / GA4 FRENTE A SEALMETRICS", title: "Los canales que más pierden son los que pagas.",
    subtitle: "Tráfico extra que registró Sealmetrics, canal a canal", foot: "28 JUL — 06 AGO 2026 · MISMA WEB, MISMOS DÍAS",
    meaning: "Directo apenas se mueve. Pago, búsqueda, afiliación y social pierden entre tres y doce veces más. Ningún factor de corrección arregla una pérdida desigual.",
    channels: { direct: "Directo", referral: "Referral", email: "Email", paid: "Campañas de pago", search: "Búsqueda orgánica", affiliate: "Afiliación", social: "Redes orgánicas" },
    paidDisplay: "+37 a +52%",
  },
  trust: "EQUIPOS QUE YA MIDEN CON SEALMETRICS",
  challenge: {
    tag: "LA PREGUNTA",
    body: "Explícame cómo puedes hacer que tus campañas sean rentables si parte de tu tráfico no llega a tu informe, y parte de las ventas que sí ves están en el canal equivocado, o en ninguno.",
    sign: "Rafa Jiménez · Fundador de Sealmetrics",
  },
  evidence: {
    tag: "01 / LA PRUEBA · INCAPTO", start: "Los pedidos eran reales.", end: "GA4 veía el 71% de las visitas que había detrás.",
    body: "Incapto midió GA4 y Sealmetrics en paralelo en su Shopify durante 48 días. Primero concilió Sealmetrics contra los pedidos reales. Después comparó las dos herramientas.",
    orders: "de los pedidos reales de Shopify registrados", revenue: "de la facturación real registrada", reconcile: "SEALMETRICS FRENTE A SHOPIFY · ONLINE STORE", period: "14 JUN — 31 JUL 2026",
    visits: "Visitas registradas en los mismos 48 días", moreVisits: "visitas que GA4 nunca vio",
    visitsBody: "GA4 registró un 29% menos de visitas que Sealmetrics y un 45% menos de páginas vistas: las visitas que no ve navegan el doble de profundo que las que sí ve.",
    proofLink: "Lee el caso Incapto completo",
    note: "La conciliación incluye sólo Shopify Online Store; excluye suscripciones, tienda física y pedidos manuales. Sealmetrics concilia el 95,71% de los pedidos y el 96,53% de la facturación. La ventana de visitas y la de canales se analizan por separado. Son diferencias de medición, no ventas incrementales.",
    dreamMetric: "15–20%", dreamLabel: "más ventas atribuidas que con su herramienta anterior",
    dreamBody: "Dreamplace contrasta Sealmetrics con su CRM y usa la diferencia para mover presupuesto entre Meta y Google.",
    palladiumMetric: "35%", palladiumLabel: "de las reservas de GA4 no tenían canal",
    palladiumBody: "Palladium detectó un 40% del tráfico entrante sin source ni medium y reconstruyó sus decisiones de Display sobre una capa de medición neutral. El Coste por Búsqueda de Display mejoró un 165%.",
    clientLink: "Ver el caso",
    storiesTag: "DOS COSAS QUE DESCUBRIERON NUESTROS CLIENTES",
    stories: [
      { title: "Cómo Palladium mejoró un 165% su coste por búsqueda en Display", slug: "palladium-hotel-group" },
      { title: "Cómo Incapto detectó que el tráfico que más convertía era el que menos cookies aceptaba", slug: "incapto" },
    ],
  },
  attribution: {
    tag: "02 / LAS VENTAS QUE YA HACES", start: "Cada venta que registras,", end: "asignada al canal que la cerró.",
    body: "Sealmetrics atribuye cada conversión a la fuente de tráfico de la sesión en la que ocurre, último clic, sobre el conjunto completo de datos y no sobre los visitantes que aceptaron un banner. Sin cajón Cross-network que esconda parte de tu inversión de pago y sin una línea de origen desconocido sobre la que no puedes decidir: en Incapto esa línea era el 14% de las visitas en GA4 y el 0,3% en Sealmetrics.",
    items: [
      ["Ingresos por canal, campaña y landing", "El informe que decide tu presupuesto de medios, calculado sobre el tráfico que de verdad llegó."],
      ["Todo el embudo, en recuentos agregados", "Visita, producto, carrito, checkout, compra: recuentos por paso y por canal, para ver dónde se caen los compradores de cada canal."],
      ["Dato fresco, Black Friday incluido", "Los hits suelen llegar a tus informes en menos de dos minutos, sin muestreo, y cada día está completo antes de las 6 de la mañana. Ajustas durante la campaña, no a la semana siguiente."],
    ],
    boundary: "La medición es agregada y anónima: sin identificadores de visitante, sin recorridos entre dispositivos, sin modelo multi-touch. Último clic sobre datos completos, y un número que puedes conciliar contra tus pedidos.",
  },
  promo: {
    tag: "04 / LAS FECHAS QUE MANDAN", start: "Contrata ahora.", end: "Pasa la campaña con el SLA de Enterprise.",
    body: "Los informes frescos y sin muestreo no son la oferta, son el producto. La oferta es la garantía que hay detrás. Contrata un plan Growth o Scale antes del Black Friday y tu cuenta lleva el SLA que damos a las cuentas Enterprise durante toda la campaña de Navidad, al precio de tu plan.",
    terms: [
      "Contrata Growth o Scale antes del 27 de noviembre de 2026",
      "SLA de Enterprise en tu cuenta hasta el 6 de enero de 2027",
      "Compromiso de disponibilidad del 99,9% con créditos de servicio",
      "Soporte prioritario durante la campaña",
      "Hits en tus informes normalmente en menos de dos minutos, sin muestreo",
      "Día completo antes de las 6 de la mañana, cada día de campaña",
    ],
    priceLine: "Growth desde 499 €/mes · Scale desde 899 €/mes · facturación anual · El primer millón de eventos, regalado con la cuenta Agentic",
    cta: "Ver planes y contratar", secondary: "Hablarlo antes de firmar",
    note: "Aplica a planes contratados en esa ventana y se mantiene toda la campaña. La frescura de los informes y el dato sin muestreo son capacidades del producto en todos los planes, Agentic incluido; el SLA es la capa contractual que va encima.",
    deadlineLabel: "CONTRATA ANTES DEL", deadline: "27 NOV 2026", untilLabel: "SLA DE ENTERPRISE HASTA EL", until: "6 ENE 2027",
    datesTag: "TRES FECHAS",
    dates: [
      { date: "13 NOV 2026", label: "Instala antes del", body: "Dos semanas de datos propios antes del Black Friday. Si instalas más tarde, comparas con menos." },
      { date: "27 NOV 2026", label: "Contrata antes del", body: "Black Friday. Último día para llevar el SLA de Enterprise en un plan Growth o Scale." },
      { date: "6 ENE 2027", label: "El SLA dura hasta el", body: "El final de la campaña de Navidad, con todos sus días cubiertos." },
    ],
    line: "Los eventos de hoy no se pueden medir mañana. Cada día sin el píxel es un día de datos del Black Friday que no vas a recuperar.",
  },
  offer: {
    tag: "03 / LA OFERTA", start: "Te regalamos", end: "el primer millón de eventos.",
    body: "Tienes un millón de eventos para ver la realidad de tu negocio. Lo que veías hasta ahora era otra cosa. Abre la cuenta Agentic: la arquitectura de medición completa, sin tarjeta y sin nada que cancelar. Mídela junto a GA4 o Matomo, concilia las dos contra tus pedidos y mira qué canales llevas tiempo infravalorando.",
    included: ["Analítica agregada completa, sin cookies", "Atribución de ingresos por canal, campaña y landing", "MCP, API y conector BigQuery", "Webs y usuarios ilimitados", "Alojado en la UE, en Dublín, con DPA incluido"],
    price: "0 €", allowance: "EL PRIMER 1.000.000 DE EVENTOS, REGALADO", priceLabel: "SIN TARJETA · NADA QUE CANCELAR", package: "CUENTA AGENTIC",
    eventNote: "Un evento es una interacción registrada: una página vista, un clic, una compra. Una visita genera varios. Un millón de eventos da para una comparación real.",
    note: "Uso autónomo, soporte por documentación. Requiere un asistente compatible con MCP; su suscripción no está incluida.",
    stackTag: "LO QUE TE LLEVAS, LÍNEA A LÍNEA",
    stack: [
      { item: "Medición sin cookies, 1.000.000 de eventos en total", detail: "El mismo motor de medición que los planes de pago, con un millón de eventos para toda la vida de la cuenta en lugar de los cinco millones al mes de Growth. Visitas, conversiones e ingresos, también de quien rechaza el banner.", value: "0 €" },
      { item: "Atribución de ingresos por canal, campaña y landing", detail: "Último clic sobre el conjunto completo de datos. El informe que decide tu presupuesto de medios.", value: "Incluido" },
      { item: "Instalación hecha por tu asistente de IA", detail: "Claude crea la cuenta, genera los píxeles y puede subirlos a GitHub o a GTM. Una tarde de tu desarrollador que no gastas.", value: "Incluido" },
      { item: "Bonus 1 · El método de conciliación de Incapto", detail: "Los cuatro pasos que siguió Incapto para contrastar las dos herramientas con la caja. En esta misma página, más abajo.", value: "Bonus" },
      { item: "Bonus 2 · 15 análisis listos en tu asistente", detail: "Chequeo semanal, diagnóstico de caídas, búsqueda de oportunidades, análisis de embudo y auditoría de instalación, con el plugin gratuito.", value: "Bonus" },
      { item: "Bonus 3 · MCP, API y conector BigQuery", detail: "Tus datos salen cuando tú quieras, a la herramienta que ya usas.", value: "Bonus" },
      { item: "Bonus Black Friday · SLA de Enterprise durante la Navidad", detail: "Contrata Growth o Scale antes del 27 de noviembre y tu cuenta lleva el SLA de Enterprise hasta el 6 de enero, al precio de tu plan.", value: "Si contratas" },
    ],
    totalLabel: "TU PRECIO", totalNote: "Sin tarjeta. Nada que cancelar. Lo único que gastas son los minutos que lleva la instalación.",
    reasonTag: "POR QUÉ REGALAMOS EL PRIMER MILLÓN", reasonTitle: "Porque la conciliación vende mejor que nosotros.",
    reasonBody: "Nuestros clientes publicados empezaron igual: Incapto contrastó Sealmetrics con sus pedidos de Shopify, Dreamplace con su CRM y Palladium con GA4. Preferimos que veas el hueco en tu web a que lo leas en la nuestra. Si no hay hueco, no nos debes nada y habrás comprobado que tu analítica está bien.",
    guaranteeTag: "LA GARANTÍA", guaranteeTitle: "Tu caja es la garantía.",
    guaranteeBody: "Sealmetrics se concilia contra los pedidos que de verdad hizo tu tienda, no contra nuestra palabra. En Incapto fueron el 96% de los pedidos y el 97% de la facturación. Si no ves más tráfico y más ventas con canal que en GA4, no has pagado un céntimo y no hay nada que cancelar.",
  },
  method: { tag: "BONUS 1 · EL MÉTODO INCAPTO", start: "Concilia contra la caja.", end: "Después lee la diferencia.", source: "INCAPTO · SHOPIFY, GA4 Y SEALMETRICS · JUNIO–AGOSTO DE 2026" },
  steps: {
    tag: "05 / EMPIEZA DESDE CLAUDE", start: "Tres frases a Claude.", end: "Y los píxeles son tuyos.",
    intro: "Sin formulario, sin dashboard, sin llamada comercial. Instala la extensión de Sealmetrics en Claude Desktop y dile lo que quieres: crea la cuenta, da de alta tu web y genera los píxeles. Sin tarjeta y sin cuenta previa.",
    items: [
      ["Instala la extensión de Sealmetrics en Claude Desktop", "Descarga sealmetrics.mcpb. En Claude Desktop abre Ajustes, luego Extensiones, arrastra el archivo y pulsa Instalar. Deja vacío el campo «Sealmetrics API key»."],
      ["Dile que te cree la cuenta", "Pega el prompt con tu dominio. Claude te enseña las condiciones y te pide aceptarlas, te pide el email y después da de alta la cuenta y la web. Te llega por email un enlace para poner la contraseña."],
      ["Dile que te genere los píxeles", "Te devuelve el código de medición de tu web. Pídele también la conversión de compra. A partir de aquí depende de ti."],
    ],
    downloadLabel: "Descargar la extensión para Claude Desktop", codexLabel: "CODEX · ~/.codex/config.toml", codexNote: "Codex y otros clientes MCP ejecutan el mismo paquete en local.",
    pathsTitle: "A partir de aquí depende de ti",
    paths: [
      ["Que los suba a tu web por GitHub", "Si Claude tiene acceso a tu repositorio, pídele que abra el pull request con los píxeles puestos."],
      ["Que los añada a GTM con un MCP de GTM", "Si usas un MCP de Google Tag Manager, pídele que cree las etiquetas y publique el contenedor."],
      ["Copia y pega en tu GTM", "Crea una etiqueta HTML personalizado en All Pages. El píxel no guarda ni lee nada en el dispositivo; que pueda dispararse sin tu disparador de consentimiento depende de la configuración y del criterio de tu autoridad nacional, así que confírmalo con quien lleve la privacidad."],
    ],
    promptLabel: "COPIA, PON TU DOMINIO Y ENVÍASELO A CLAUDE",
    prompt: "Crea mi cuenta gratuita de Sealmetrics para [tu dominio], da de alta la web, genera los píxeles de medición de páginas vistas y compras, y dime cómo instalarlos.",
    copy: "Copiar prompt", copied: "Prompt copiado", copyError: "Selecciona el prompt y cópialo a mano.",
    otherAssistant: "¿Creas la cuenta desde Codex u otro cliente MCP?", guide: "Ver la guía del Agentic Package",
    verify: "Con los píxeles puestos, pídele a Claude: «Confirma que Sealmetrics está recibiendo visitas de [tu dominio]».",
  },
  onboarding: {
    tag: "06 / CÓMO SEGUIR", start: "Cómo seguir: mide tu tráfico", end: "con tu asistente de IA.",
    intro: "Con la cuenta ya creada, conecta Sealmetrics al asistente que ya usas siguiendo sólo estos pasos, sin tocar archivos de configuración. De más fácil a más difícil.",
    optionalLabel: "Opcional",
    assistants: [
      { name: "Claude Code (terminal, escritorio o IDE)", badge: "LO MÁS FÁCIL · SE INSTALA DESDE EL CHAT",
        steps: [
          { text: "Opción A: pega esto en el chat.", code: [CLAUDE_CODE_PLUGIN_PROMPT.es] },
          { text: "Opción B: escribe estos dos comandos en el cuadro de texto.", code: CLAUDE_CODE_PLUGIN_COMMANDS },
          { text: "En los dos casos, escribe /mcp, elige «sealmetrics» y entra con tu cuenta de Sealmetrics en el navegador. No hay ningún token que copiar. Si no aparece, reinicia Claude Code.", code: [CLAUDE_CODE_MCP_COMMAND] },
        ],
        notes: [
          { text: "Instala el plugin y no sólo la URL del MCP: el plugin trae además las 15 skills de análisis. Sólo con la URL tienes las herramientas, pero no la metodología." },
          { text: "Opcional, para instalar el tracking en una web desde cero. Necesita la variable de entorno SEALMETRICS_API_KEY.", code: [CLAUDE_CODE_INSTALL_PLUGIN] },
        ] },
      { name: "Codex", badge: "SEGÚN EL README DEL PLUGIN",
        steps: [
          { text: "Ejecuta estos tres comandos, tomados del README de seal-copilot.", code: CODEX_COMMANDS },
        ],
        notes: [
          { text: "El plugin documenta este flujo, pero todavía no lo hemos probado de principio a fin en Codex. Si falla algún paso, la guía del Agentic Package tiene la configuración manual." },
        ] },
      { name: "Claude web y Claude escritorio (claude.ai, app de escritorio, Cowork)", badge: "DESDE AJUSTES, NO DESDE EL CHAT",
        steps: [
          { text: "Abre Customize, luego Connectors, pulsa «+» y elige Add custom connector." },
          { text: "Pega esta URL.", code: [MCP_ENDPOINT] },
          { text: "Entra con tu cuenta de Sealmetrics." },
        ],
        notes: [
          { text: "En el plan Free sólo se permite un conector personalizado." },
          { text: "En Team y Enterprise primero tiene que añadirlo un Owner desde la configuración de la organización; después cada miembro se conecta." },
          { text: "Pedírselo a Claude en el chat no sirve: ahí no puede añadir conectores." },
        ] },
      { name: "ChatGPT", badge: "PRÓXIMAMENTE",
        intro: "Estamos pendientes de aprobación en el directorio de OpenAI. Cuando esté publicado bastará con buscar «Sealmetrics» y pulsar Conectar.",
        steps: [] },
    ],
    chatgptLive: { name: "ChatGPT", badge: "DESDE EL DIRECTORIO DE CONECTORES",
      steps: [{ text: "Busca «Sealmetrics» en el directorio de conectores y pulsa Conectar." }, { text: "Entra con tu cuenta de Sealmetrics." }] },
    verifyLabel: "CÓMO SABER QUE FUNCIONA", verify: "Hazle esta pregunta a tu asistente. Debe responder con tus datos reales.", verifyQuestion: "¿Cómo ha ido mi tráfico esta semana?", copy: "Copiar", copied: "Copiado",
  },
  letter: {
    tag: "UNA NOTA DEL FUNDADOR",
    paragraphs: [
      "Mira, sé que si has llegado hasta aquí leyendo y aún no has abierto la cuenta, no me vas a contratar Sealmetrics hoy. Vale. Pero he de decirte que Sealmetrics es un cañón.",
      "Nuestro píxel pesa 132 veces menos que el de GA4 y 155 veces menos que el de Adobe. Por eso recoge visitas que los scripts pesados pierden antes de dispararse (en un medio europeo registró un 25% más de páginas vistas que Adobe, con Adobe disparando sin puerta de consentimiento), registra las ventas que ocurren sin un banner por medio y asigna cada una al canal que la cerró.",
      "Tienes un paquete gratis. Pruébalo, no pierdes nada, compara. Uno: dile a Claude que te instale el MCP. Dos: dile que te cree la cuenta. Tres: que te genere los píxeles. Desde aquí depende de ti: que te los suba a tu web por GitHub, que te los añada en GTM si tienes un MCP de GTM, o copia y pega en tu GTM y decide con quien lleve la privacidad si la etiqueta espera al banner.",
    ],
    sign: "Rafa Jiménez", role: "Fundador de Sealmetrics",
  },
  faqTitle: "Antes de empezar, claro.",
  faqs: [
    { question: "¿Es gratis de verdad y sin tarjeta?", answer: "Sí. Te regalamos el primer millón de eventos: la cuenta Agentic es gratuita hasta un millón de eventos en total durante toda la vida de la cuenta, sin tarjeta y sin nada que cancelar. Necesitas un asistente compatible con MCP, como Claude; su suscripción va aparte." },
    { question: "¿Qué es un evento?", answer: "Una interacción registrada en tu web: una página vista, un clic en algo que midas, un añadir al carrito, una compra. Una visita genera varios eventos. El cupo se cuenta en eventos humanos, la misma unidad que los planes de pago. Para una tienda mediana son semanas de medición, suficiente para conciliar contra tus pedidos y leer la diferencia por canal." },
    { question: "¿Tengo que quitar GA4 o Matomo?", answer: "No. Mantenlo y mide con Sealmetrics en paralelo en la misma web y los mismos días. Después concilia las dos contra los pedidos de tu tienda o tu CRM. Esa conciliación, y no nuestra palabra, es la comparación." },
    { question: "¿El píxel necesita consentimiento?", answer: "No escribe ni lee nada en el dispositivo: ni cookies, ni almacenamiento local, ni huella digital. El artículo 5.3 de la ePrivacy se refiere a guardar o acceder a información en el dispositivo, y por eso muchos despliegues pueden funcionar sin banner; que el tuyo pueda depende de su configuración y del criterio de tu autoridad nacional. Sealmetrics está diseñado para el RGPD desde la arquitectura, autoevaluado y no certificado, con los datos de visitantes procesados en Dublín y un DPA en todos los planes." },
    { question: "¿En qué consiste exactamente la oferta de Black Friday?", answer: "Contrata un plan Growth o Scale antes del 27 de noviembre de 2026 y tu cuenta lleva el SLA de Enterprise, disponibilidad del 99,9% con créditos de servicio y soporte prioritario, hasta el 6 de enero de 2027, al precio de tu plan. Los informes frescos y sin muestreo forman parte del producto en todos los planes; la oferta es la garantía contractual que va encima." },
    { question: "¿Qué pasa cuando llego al millón de eventos?", answer: "Eliges un plan. Growth empieza en 499 € al mes con facturación anual y 5 millones de eventos al mes. No se te cobra nada sin que elijas un plan, porque no hay ninguna tarjeta registrada." },
    { question: "¿Funciona con Shopify, WooCommerce, Magento o GTM?", answer: "Sí. Shopify y WordPress llevan unos 5 minutos; un desarrollo a medida o headless, hasta 30. En GTM, una etiqueta HTML personalizado en All Pages; que se dispare sin tu disparador de consentimiento depende de la configuración y del criterio de tu autoridad nacional. Claude puede generar el código para tu plataforma." },
    { question: "¿Esto es atribución multi-touch?", answer: "No, y nunca lo será. Sealmetrics es medición agregada y anónima: atribuye cada conversión por último clic a la fuente de la sesión en la que ocurre, sobre el conjunto completo de datos. Sin identificadores de visitante ni recorridos entre dispositivos." },
  ],
  final: {
    tag: "LA SIGUIENTE COMPARACIÓN ES LA TUYA", start: "Mide en paralelo.", end: "Un número que conciliar.",
    body: "Incapto, Dreamplace y Palladium ya hicieron la prueba. Abre la cuenta gratis hoy y tendrás la comparación antes del Black Friday, y el SLA de Enterprise durante la Navidad si contratas.",
    line: "Invertir sobre los visitantes que pulsaron Aceptar también tiene un coste.", demo: "¿Prefieres hablarlo antes? Reserva una demo",
  },
  footer: "Analítica sin cookies. Datos completos. Decisiones que puedes conciliar.", privacy: "Privacidad", terms: "Términos", company: "Sealmetrics · Esfera Marketing SL · Barcelona",
};

export const freeAccountLanding: Record<FreeAccountLocale, FreeAccountCopy> = { en, es };
