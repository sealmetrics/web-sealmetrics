/**
 * Steps and FAQ for /blog/measure-roas-after-cookie-consent (EN + ES).
 *
 * Both arrays are plain strings on purpose: each feeds a schema (`howToSchema`,
 * `faqPageSchema`) and the visible component from the same value, so the
 * schema can never claim a step or an answer the reader cannot see.
 *
 * Sources (checked 14 Sep 2026):
 * - Google Ads Help, answer 10548233: with no consent, Consent Mode stops tags
 *   reading or writing ad cookies; modelled conversions appear in the
 *   Conversions column; threshold 700 ad clicks over 7 days per country and
 *   domain grouping.
 * - docs.sealmetrics.com reports/insights/how-to-track-google-ads-campaigns:
 *   UTMs and click IDs are read server-side from the landing URL; account-level
 *   ValueTrack template; redirects that strip parameters lose them for good.
 * - docs.sealmetrics.com reports/insights/how-to-track-social-ads-campaigns and
 *   web-analytics-prompts/google-ads, meta-ads: spend comes from the ad
 *   platforms (their MCP connectors), revenue and conversions from Sealmetrics,
 *   matched on UTM values. Sealmetrics does not import spend.
 * - Sealmetrics does not send conversions to ad platforms (product facts).
 * Figures: Incapto, Dreamplace, Palladium as published in case-studies.tsx.
 */

export const ROAS_STEPS_EN = [
  {
    name: "Separate the two jobs ROAS does",
    text: "Bidding inside one platform and allocating budget between channels are different decisions. Keep the platform's own ROAS for the first, because its algorithm optimises on it, and build a measured ROAS for the second.",
  },
  {
    name: "Tag every paid click at the source",
    text: "Add UTMs to every paid link: an account-level tracking template with ValueTrack parameters in Google Ads, and utm_source, utm_medium, utm_campaign and utm_content for the creative in Meta. Load a live ad URL and check the parameters survive every redirect to the landing page.",
  },
  {
    name: "Record revenue without waiting for consent",
    text: "Send each purchase with its value to a measurement layer that does not wait for the cookie banner, so consenting and non-consenting visitors are counted on the same base. The campaign comes from the UTMs of the landing page, not from a cookie.",
  },
  {
    name: "Reconcile revenue with your orders first",
    text: "Compare the measured revenue total with your store's own orders for the same period, timezone and currency, leaving out orders with no web session. Incapto's parallel run recorded 96% of real orders and 97% of revenue before any channel was read.",
  },
  {
    name: "Export spend per campaign from each platform",
    text: "Take media spend per campaign from Google Ads, Meta and any other platform for the same dates, timezone and currency. Use campaign names or IDs that match your utm_campaign values, so each cost line joins exactly one revenue line.",
  },
  {
    name: "Calculate both ROAS figures side by side",
    text: "For each campaign, divide platform-reported revenue by spend and measured revenue by the same spend. Add a column with the gap and one with your break-even ROAS, which is 1 divided by gross margin.",
  },
  {
    name: "Move budget on the measured figure, test before cutting",
    text: "Shift budget between channels on measured ROAS. Where a prospecting, video or display campaign falls below break-even on last click, run a holdout or geographic test before cutting it, because last click is the rule that gives it least credit.",
  },
];

export const ROAS_STEPS_ES = [
  {
    name: "Separa los dos trabajos del ROAS",
    text: "Pujar dentro de una plataforma y repartir presupuesto entre canales son decisiones distintas. Mantén el ROAS de la propia plataforma para lo primero, porque su algoritmo optimiza con él, y construye un ROAS medido para lo segundo.",
  },
  {
    name: "Etiqueta cada clic de pago en origen",
    text: "Añade UTM a todos los enlaces de pago: una plantilla de seguimiento a nivel de cuenta con parámetros ValueTrack en Google Ads, y utm_source, utm_medium, utm_campaign y utm_content para la creatividad en Meta. Abre la URL de un anuncio real y comprueba que los parámetros sobreviven a cada redirección hasta la página de llegada.",
  },
  {
    name: "Registra los ingresos sin esperar al consentimiento",
    text: "Envía cada compra con su importe a una capa de medición que no espere al banner de cookies, para que quienes aceptan y quienes no se cuenten sobre la misma base. La campaña sale de las UTM de la página de llegada, no de una cookie.",
  },
  {
    name: "Concilia primero los ingresos con tus pedidos",
    text: "Compara el total de ingresos medido con los pedidos de tu propia tienda en el mismo periodo, zona horaria y moneda, dejando fuera los pedidos sin sesión web. La medición en paralelo de Incapto registró el 96% de los pedidos reales y el 97% de la facturación antes de leer ningún canal.",
  },
  {
    name: "Exporta la inversión por campaña de cada plataforma",
    text: "Saca la inversión en medios por campaña de Google Ads, Meta y cualquier otra plataforma para las mismas fechas, zona horaria y moneda. Usa nombres o IDs de campaña que coincidan con tus valores de utm_campaign, para que cada línea de coste cruce con una sola línea de ingresos.",
  },
  {
    name: "Calcula los dos ROAS en paralelo",
    text: "En cada campaña, divide los ingresos que reporta la plataforma entre la inversión y los ingresos medidos entre esa misma inversión. Añade una columna con la diferencia y otra con tu ROAS de equilibrio, que es 1 dividido entre el margen bruto.",
  },
  {
    name: "Mueve presupuesto con el ROAS medido y prueba antes de recortar",
    text: "Reparte presupuesto entre canales con el ROAS medido. Si una campaña de prospección, vídeo o display queda por debajo del equilibrio a último clic, haz un test con grupo de control o por zonas antes de recortarla, porque el último clic es la regla que menos mérito le da.",
  },
];

export const ROAS_FAQ_EN = [
  {
    question: "How do you measure ROAS after cookie consent?",
    answer:
      "Calculate it twice with the same spend: once with the revenue each ad platform reports, and once with revenue measured independently of the banner, and reconciled with your real orders. Use the platform figure to bid inside that platform and the measured figure to allocate budget between channels.",
  },
  {
    question: "Why is my Google Ads ROAS higher than in GA4?",
    answer:
      "Because they are measured on different bases. GA4 behind a consent banner does not record visitors who reject it, and paid traffic loses more than direct. Google Ads models conversions from users who did not consent, once the account meets its threshold, and credits them to its own ads within its own attribution settings.",
  },
  {
    question: "Does Consent Mode fix ROAS?",
    answer:
      "It fills part of the gap inside Google's own reports with modelled conversions, which need at least 700 ad clicks over seven days per country and domain grouping. It does not restore the source of each lost visit in your analytics, and it does not settle how much credit Google should get compared with Meta or email.",
  },
  {
    question: "Should I trust the ROAS Meta reports?",
    answer:
      "Trust it for what it is: Meta's view of its own ads, including conversions after a view and modelled conversions where it cannot observe them. It is the right number for Meta's bidding. For deciding how much budget Meta gets against other channels, compare it with revenue measured on your site and reconciled with your orders.",
  },
  {
    question: "Can Sealmetrics calculate ROAS?",
    answer:
      "Sealmetrics measures revenue by channel, campaign and creative from the UTMs of each landing page; it does not import ad spend. Spend comes from the ad platforms and is joined to that revenue in a spreadsheet, in BigQuery through the Sealmetrics connector, or by an AI assistant connected to the Sealmetrics MCP server and the ad platform's own connector.",
  },
  {
    question: "Is last-click ROAS good enough to cut a campaign?",
    answer:
      "Not on its own for upper-funnel campaigns. Last click gives no credit for views or for earlier sessions, so video, display and prospecting look weaker than they are. It is reliable for campaigns that sell in the session. Before cutting one that looks weak, run a holdout or geographic test and watch total measured revenue.",
  },
];

export const ROAS_FAQ_ES = [
  {
    question: "¿Cómo se mide el ROAS después del consentimiento de cookies?",
    answer:
      "Calculándolo dos veces con la misma inversión: una con los ingresos que reporta cada plataforma publicitaria y otra con ingresos medidos sin depender del banner, y conciliados con tus pedidos reales. Usa la cifra de la plataforma para pujar dentro de ella y la cifra medida para repartir presupuesto entre canales.",
  },
  {
    question: "¿Por qué el ROAS de Google Ads es más alto que el de GA4?",
    answer:
      "Porque se miden sobre bases distintas. GA4 detrás de un banner no registra a quien lo rechaza, y el tráfico de pago pierde más que el directo. Google Ads modela las conversiones de usuarios que no dieron su consentimiento, cuando la cuenta alcanza su umbral, y las acredita a sus propios anuncios con su propia configuración de atribución.",
  },
  {
    question: "¿Consent Mode arregla el ROAS?",
    answer:
      "Rellena parte del hueco dentro de los informes de Google con conversiones modeladas, que exigen al menos 700 clics en anuncios en siete días por país y grupo de dominios. No restaura el origen de cada visita perdida en tu analítica, ni resuelve cuánto mérito corresponde a Google frente a Meta o al email.",
  },
  {
    question: "¿Me puedo fiar del ROAS que reporta Meta?",
    answer:
      "Para lo que es, sí: la visión de Meta sobre sus propios anuncios, que incluye conversiones después de una visualización y conversiones modeladas donde no puede observarlas. Es la cifra adecuada para las pujas de Meta. Para decidir cuánto presupuesto recibe Meta frente a otros canales, compárala con ingresos medidos en tu web y conciliados con tus pedidos.",
  },
  {
    question: "¿Sealmetrics calcula el ROAS?",
    answer:
      "Sealmetrics mide los ingresos por canal, campaña y creatividad a partir de las UTM de cada página de llegada; no importa la inversión publicitaria. La inversión sale de las plataformas y se cruza con esos ingresos en una hoja de cálculo, en BigQuery mediante el conector de Sealmetrics o con un asistente de IA conectado al servidor MCP de Sealmetrics y al conector de la propia plataforma.",
  },
  {
    question: "¿El ROAS a último clic basta para recortar una campaña?",
    answer:
      "No por sí solo en campañas de parte alta del embudo. El último clic no da mérito a las visualizaciones ni a sesiones anteriores, así que el vídeo, el display y la prospección parecen más débiles de lo que son. Es fiable en campañas que venden dentro de la sesión. Antes de recortar una que parece floja, haz un test con grupo de control o por zonas y mira los ingresos medidos totales.",
  },
];
