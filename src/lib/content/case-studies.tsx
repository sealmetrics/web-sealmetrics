export type CaseStudySlug = "palladium-hotel-group" | "dreamplace-hotels" | "incapto";
export type CaseStudyLocale = "en" | "es";

/**
 * Optional evidence blocks. Only the Incapto case ships them so far: its whole
 * argument is six side-by-side comparisons, and a prose-only version of that
 * argument is not inspectable. Each block renders as a square, hard-edged
 * chart in `CaseStudySignal` — acid for Sealmetrics, ink for GA4, amber for
 * "unknown origin" and red for traffic the compared tool never saw, per the
 * data-semantics rule in CLAUDE.md.
 */
export type EvidenceBlock =
  /** Two fill bars reconciling the analytics total against recorded orders. */
  | { kind: "reconcile"; number: string; title: ReactNode; caption: string; body: ReactNode; panels: readonly { value: string; percent: number; label: string }[] }
  /** GA4 vs Sealmetrics on one measure. `percent` is the bar width, not the value. */
  | { kind: "bars"; number: string; title: ReactNode; caption: string; body: ReactNode; rows: readonly { name: string; display: string; percent: number; tone: "ga4" | "seal" | "warn" }[] }
  /** Per-channel gap between the two tools, ranked. */
  | { kind: "channels"; number: string; title: ReactNode; caption: string; body: ReactNode; rows: readonly { name: string; display: string; percent: number; offset?: number }[] }
  /** 100%-stacked channel mix, one bar per view of the same period. */
  | { kind: "mix"; number: string; title: ReactNode; caption: string; body: ReactNode; note: string; bars: readonly { name: string; segments: readonly { key: string; percent: number; display: string }[] }[]; legend: readonly (readonly [string, string])[] };

type CaseStudyContent = {
  client: string;
  logo: string;
  person: string;
  role: string;
  companyUrl: string;
  title: string;
  description: string;
  socialTitle: string;
  eyebrow: string;
  hero: ReactNode;
  heroBody: string;
  meta: readonly (readonly [string, string])[];
  quote: string;
  /**
   * Optional: only present when the client has actually said a second thing on
   * the record. Never synthesise one — a case study quote is attributed to a
   * named person at a named company.
   */
  secondQuote?: string;
  metrics: readonly { value: string; label: string; note: string; numericValue: number }[];
  problemTitle: ReactNode;
  problemBody: readonly string[];
  methodTitle: ReactNode;
  methodBody: string;
  steps: readonly (readonly [string, string, string])[];
  resultTitle: ReactNode;
  resultBody: readonly string[];
  resultSignal: string;
  resultLabel: string;
  sourceLabel: string;
  sourceText: string;
  ctaTitle: ReactNode;
  ctaBody: string;
  ctaPrimary: string;
  ctaSecondary: string;
  /**
   * Publication date, author-set per case. It was hardcoded to 2026-04-15 in
   * the component, which is right for the two hotel cases but would have
   * claimed Incapto was published before the measurement window it reports
   * had even closed. It feeds articleSchema, statisticClaimSchema and
   * reviewSchema, so a wrong value is a freshness claim to search and AI
   * engines, not a cosmetic detail.
   */
  datePublished: string;
  /** Present only on cases whose argument is a measured comparison. */
  evidence?: readonly EvidenceBlock[];
  /** What the case does NOT prove. Kept explicit — see the GEO rules. */
  limits?: { tag: string; title: ReactNode; body: string };
  /**
   * Methodology small print. Carried verbatim from the source study, because
   * the caveats are what make the figures checkable: which periods can be
   * compared with which, why paid media is a range, what the reconciliation
   * excludes, and the explicit statement that this is not a 100% claim.
   */
  notes?: { tag: string; items: readonly ReactNode[] };
};

const palladium = {
  en: {
    client: "Palladium Hotel Group", logo: "/logos/clients/palladium-dark.svg", person: "Toni Andújar", role: "Digital & Direct Sales Director", companyUrl: "https://www.palladiumhotelgroup.com/",
    title: "Palladium Hotel Group · Single source of truth", description: "Palladium Hotel Group aligned brand, agencies and departments around neutral measurement after finding 40% of traffic without attribution.", socialTitle: "Palladium Hotel Group — A neutral source of truth", eyebrow: "Case study · Palladium Hotel Group",
    hero: <>One number that brand, agencies and departments <em>accept as valid.</em></>, heroBody: "Palladium Hotel Group uses Sealmetrics as a neutral measurement layer. The trigger was structural: 40% of inbound traffic had no source or medium in the previous stack.",
    meta: [["Sector", "Hospitality · eCommerce"], ["Primary use", "Cross-channel attribution"], ["Operating model", "Brand + agencies"], ["Decision metric", "Cost-per-Search"]],
    quote: "The data Sealmetrics delivers is agnostic, unbiased and neutral. There’s no black box.", secondQuote: "Today every player is happy. The data is neutral, there’s no black box, and everyone has accepted these numbers as the reference.",
    metrics: [{ value:"40%", label:"Inbound traffic without attribution", note:"The measurement gap that triggered the review.", numericValue:40 }, { value:"35%", label:"GA4 bookings without a channel", note:"Recorded conversions that could not support a channel decision.", numericValue:35 }, { value:"+165%", label:"Display Cost-per-Search improvement", note:"After changing the DV360 measurement and investment model.", numericValue:165 }],
    problemTitle: <>Volume was visible.<br /><em>Origin was not.</em></>, problemBody: ["Palladium could see aggregate platform activity, but the missing source and medium data made it impossible to compare partners, placements and audiences on equal terms.", "The problem was not a shortage of dashboards. It was that brand teams, departments and agencies entered the same meeting with different numbers and different incentives."],
    methodTitle: <>Turn attribution into<br /><em>an operating model.</em></>, methodBody: "On Display & Video 360, the team connected every observed visit to partner, placement and audience, then evaluated the mix against availability searches in the booking engine.",
    steps: [["01", "Attribute the inbound visit", "Resolve partner, placement and audience without depending on the advertising-platform report."], ["02", "Define Cost-per-Search", "Use an availability search as the qualified-intent signal closest to a booking decision."], ["03", "Compare the inventory", "Identify which combinations generate intent and which add only apparent volume."], ["04", "Rebalance the budget", "Move investment toward the mix that performs on the agreed commercial metric."]],
    resultTitle: <>Same budget.<br /><em>A decision everyone can inspect.</em></>, resultBody: ["The model improved Display Cost-per-Search by 165% after the team rebalanced partners, placements, audiences and strategies.", "More importantly, Sealmetrics became the shared reference. Agencies could still optimise their platforms, but the final discussion moved to one neutral measurement layer."], resultSignal:"+165%", resultLabel:"Display Cost-per-Search", datePublished:"2026-04-15", sourceLabel:"Published evidence", sourceText:"Palladium Hotel Group internal attribution and DV360 review · April 2026",
    ctaTitle: <>Run the same comparison<br /><em>on your own channels.</em></>, ctaBody:"Keep the current stack, measure the same traffic in parallel and compare both systems against the booking or CRM total.", ctaPrimary:"Book a measurement review", ctaSecondary:"Read the Dreamplace case",
  },
  es: {
    client: "Palladium Hotel Group", logo: "/logos/clients/palladium-dark.svg", person: "Toni Andújar", role: "Director Digital y Venta Directa", companyUrl: "https://www.palladiumhotelgroup.com/",
    title: "Palladium Hotel Group · Fuente única de verdad", description: "Palladium Hotel Group alineó marca, agencias y departamentos con una medición neutral tras detectar un 40% del tráfico sin atribución.", socialTitle: "Palladium Hotel Group — Una referencia neutral", eyebrow: "Caso de éxito · Palladium Hotel Group",
    hero: <>Un número que marca, agencias y departamentos <em>aceptan como válido.</em></>, heroBody: "Palladium Hotel Group utiliza Sealmetrics como capa neutral de medición. El detonante fue estructural: el 40% del tráfico entrante no tenía source o medium en el stack anterior.",
    meta: [["Sector", "Hotelería · eCommerce"], ["Uso principal", "Atribución multicanal"], ["Modelo operativo", "Marca + agencias"], ["Métrica de decisión", "Coste por Búsqueda"]],
    quote: "Los datos que da Sealmetrics son agnósticos, no están sesgados y son neutrales. No hay caja negra.", secondQuote: "Hoy todos los players están contentos. Los datos son neutrales, no hay caja negra y todos han aceptado estos valores como la referencia.",
    metrics: [{ value:"40%", label:"Tráfico entrante sin atribución", note:"El gap de medición que activó la revisión.", numericValue:40 }, { value:"35%", label:"Reservas de GA4 sin canal", note:"Conversiones que no sostenían una decisión de canal.", numericValue:35 }, { value:"+165%", label:"Mejora del Coste por Búsqueda", note:"Tras cambiar el modelo de medición e inversión en DV360.", numericValue:165 }],
    problemTitle: <>El volumen era visible.<br /><em>El origen no.</em></>, problemBody: ["Palladium veía actividad agregada en las plataformas, pero la ausencia de source y medium impedía comparar partners, soportes y audiencias con el mismo criterio.", "No faltaban dashboards. Marca, departamentos y agencias llegaban a la misma reunión con cifras distintas e incentivos distintos."],
    methodTitle: <>Convertir la atribución en<br /><em>un modelo operativo.</em></>, methodBody: "En Display & Video 360, el equipo conectó cada visita observada con partner, soporte y audiencia y evaluó el mix contra búsquedas de disponibilidad del motor de reservas.",
    steps: [["01", "Atribuir la visita", "Resolver partner, soporte y audiencia sin depender del informe de la plataforma publicitaria."], ["02", "Definir Coste por Búsqueda", "Usar la búsqueda de disponibilidad como señal de intención cualificada próxima a la reserva."], ["03", "Comparar el inventario", "Separar combinaciones que generan intención de las que sólo añaden volumen aparente."], ["04", "Reequilibrar presupuesto", "Mover inversión hacia el mix que rinde en la métrica comercial acordada."]],
    resultTitle: <>Mismo presupuesto.<br /><em>Una decisión inspeccionable.</em></>, resultBody: ["El modelo mejoró un 165% el Coste por Búsqueda de Display tras reequilibrar partners, soportes, audiencias y estrategias.", "Sealmetrics pasó a ser la referencia compartida. Las agencias mantienen la optimización en sus plataformas, pero la decisión final se contrasta en una capa neutral."], resultSignal:"+165%", resultLabel:"Coste por Búsqueda en Display", datePublished:"2026-04-15", sourceLabel:"Evidencia publicada", sourceText:"Revisión interna de atribución y DV360 de Palladium Hotel Group · abril de 2026",
    ctaTitle: <>Ejecuta la misma comparación<br /><em>en tus propios canales.</em></>, ctaBody:"Mantén el stack actual, mide el mismo tráfico en paralelo y compara ambos sistemas contra el total del motor de reservas o CRM.", ctaPrimary:"Reserva una revisión de medición", ctaSecondary:"Lee el caso Dreamplace",
  },
} as const satisfies Record<CaseStudyLocale, CaseStudyContent>;

const dreamplace = {
  en: {
    client:"Dreamplace Hotels", logo:"/logos/clients/dreamplace.svg", person:"Eduardo Martin", role:"Analytics & Campaigns", companyUrl:"https://www.dreamplacehotels.com/", title:"Dreamplace Hotels · Paid media on real data", description:"Dreamplace Hotels uses Sealmetrics to allocate paid-media budget with 15–20% more attributed sales and 30% more measured traffic than GA.", socialTitle:"Dreamplace Hotels — Paid media on real data", eyebrow:"Case study · Dreamplace Hotels",
    hero: <>Allocate paid media on the <em>real number</em>, not the platform report.</>, heroBody:"Dreamplace integrated Sealmetrics into its analysis process. The 15–20% sales-attribution gap with the previous tool is now large enough to change channel budgets.",
    meta:[["Sector","Hospitality · eCommerce"],["Using Sealmetrics","Almost 2 years"],["Primary use","Channel attribution"],["Initial focus","Meta + Google"]],
    quote:"What it gives us is what we’ve always needed: data as real as possible, as close to reality as possible.", secondQuote:"The value is in optimising budget and investment. You shift toward a channel or strategy you were not seeing before.",
    metrics:[{value:"15–20%",label:"More sales attributed",note:"Closing the gap to the hotel group’s CRM.",numericValue:17.5},{value:"+30%",label:"More traffic than Google Analytics",note:"The observed gap after consent-shaped loss.",numericValue:30},{value:"2",label:"Initial decision channels",note:"Meta and Google were the first budget surfaces.",numericValue:2}],
    problemTitle:<>Revenue was recorded.<br/><em>The channel picture was incomplete.</em></>,problemBody:["Dreamplace knew the booking total from its internal systems. The uncertainty sat between that total and the channel story produced by conventional analytics.","Because the missing share was not distributed evenly, the incomplete dataset could change which channel appeared efficient — and therefore where the next euro went."],
    methodTitle:<>Use the CRM total<br/><em>as the reconciliation point.</em></>,methodBody:"The team runs Sealmetrics as an independent measurement layer, compares attributed sales with the native CRM total and uses the remaining gap as a quality signal.",
    steps:[["01","Keep the source of truth","Use the hotel group’s recorded sales total as the baseline."],["02","Measure in parallel","Compare Sealmetrics with the existing tools over the same commercial period."],["03","Inspect by channel","Find where consent loss changes Meta and Google attribution most."],["04","Move the investment","Use the reconciled view to shift budget toward the channel or strategy the previous stack undercounted."]],
    resultTitle:<>Less debate about the total.<br/><em>More control over the mix.</em></>,resultBody:["Sealmetrics attributes 15–20% more sales than the previous tool and measures roughly 30% more traffic than Google Analytics.","That difference is used operationally: it changes channel analysis and budget allocation instead of remaining an abstract data-quality metric."],resultSignal:"15–20%",resultLabel:"additional sales attribution",datePublished:"2026-04-15", sourceLabel:"Published evidence",sourceText:"Dreamplace Hotels internal CRM and analytics comparison · April 2026",
    ctaTitle:<>Reconcile analytics<br/><em>against the revenue already recorded.</em></>,ctaBody:"Run both measurement layers together and locate the channel decisions that change when the missing traffic becomes visible.",ctaPrimary:"Book an attribution review",ctaSecondary:"Read the Incapto case",
  },
  es: {
    client:"Dreamplace Hotels", logo:"/logos/clients/dreamplace.svg", person:"Eduardo Martin", role:"Analítica y Campañas", companyUrl:"https://www.dreamplacehotels.com/", title:"Dreamplace Hotels · Paid media con dato real", description:"Dreamplace Hotels asigna paid media con Sealmetrics: 15–20% más ventas atribuidas y un 30% más tráfico medido que GA.", socialTitle:"Dreamplace Hotels — Paid media con dato real", eyebrow:"Caso de éxito · Dreamplace Hotels",
    hero:<>Asigna paid media con el <em>dato real</em>, no con el informe de la plataforma.</>,heroBody:"Dreamplace integró Sealmetrics en su proceso de análisis. El gap del 15–20% en atribución de venta frente a la herramienta anterior ya cambia presupuestos por canal.",
    meta:[["Sector","Hotelería · eCommerce"],["Usando Sealmetrics","Casi 2 años"],["Uso principal","Atribución por canal"],["Foco inicial","Meta + Google"]],
    quote:"Lo que nos aporta es lo que hemos necesitado siempre: el dato lo más real posible y lo más próximo a la realidad.",secondQuote:"El valor está en optimizar presupuesto e inversión. Derivas hacia un canal o estrategia que antes no estabas viendo.",
    metrics:[{value:"15–20%",label:"Más ventas atribuidas",note:"Cerrando el gap contra el CRM del grupo.",numericValue:17.5},{value:"+30%",label:"Más tráfico que Google Analytics",note:"El gap observado tras la pérdida por consentimiento.",numericValue:30},{value:"2",label:"Canales iniciales de decisión",note:"Meta y Google fueron las primeras superficies de presupuesto.",numericValue:2}],
    problemTitle:<>Los ingresos estaban registrados.<br/><em>La foto por canal estaba incompleta.</em></>,problemBody:["Dreamplace conocía el total de reservas desde sus sistemas internos. La incertidumbre estaba entre ese total y el relato por canal de la analítica convencional.","Como la parte ausente no se distribuye de forma uniforme, el dataset incompleto podía cambiar qué canal parecía eficiente y dónde se invertía el siguiente euro."],
    methodTitle:<>Usar el total del CRM<br/><em>como punto de conciliación.</em></>,methodBody:"El equipo ejecuta Sealmetrics como capa independiente, compara la venta atribuida con el total nativo del CRM y utiliza el gap restante como señal de calidad.",
    steps:[["01","Mantener la fuente de verdad","Usar el total de ventas registrado por el grupo como línea base."],["02","Medir en paralelo","Comparar Sealmetrics y las herramientas existentes durante el mismo periodo comercial."],["03","Inspeccionar por canal","Localizar dónde la pérdida por consentimiento altera más la atribución de Meta y Google."],["04","Mover la inversión","Usar la vista conciliada para asignar presupuesto al canal o estrategia inframedido por el stack anterior."]],
    resultTitle:<>Menos debate sobre el total.<br/><em>Más control sobre el mix.</em></>,resultBody:["Sealmetrics atribuye un 15–20% más de ventas que la herramienta anterior y mide aproximadamente un 30% más de tráfico que Google Analytics.","La diferencia se usa operativamente: cambia el análisis por canal y el reparto presupuestario en lugar de quedarse como métrica abstracta de calidad."],resultSignal:"15–20%",resultLabel:"atribución adicional de ventas",datePublished:"2026-04-15", sourceLabel:"Evidencia publicada",sourceText:"Comparación interna de CRM y analítica de Dreamplace Hotels · abril de 2026",
    ctaTitle:<>Concilia la analítica<br/><em>contra los ingresos ya registrados.</em></>,ctaBody:"Ejecuta ambas capas de medición juntas y localiza qué decisiones de canal cambian cuando aparece el tráfico ausente.",ctaPrimary:"Reserva una revisión de atribución",ctaSecondary:"Lee el caso Incapto",
  },
} as const satisfies Record<CaseStudyLocale, CaseStudyContent>;


const incapto = {
  en: {
    client:"Incapto", logo:"/logos/clients/incapto.svg", person:"Rosa Tomàs", role:"B2C Acquisition Manager", companyUrl:"https://incapto.com/", title:"Incapto · What GA4 was not showing", description:"Incapto ran GA4 and Sealmetrics side by side on Shopify for 48 days. GA4 missed 29% of visits, 45% of pageviews and 14% of traffic had no usable origin.", socialTitle:"Incapto — What GA4 was not showing", eyebrow:"Case study · Incapto",
    hero:<>GA4 was not measuring less. <em>It was measuring another business.</em></>,
    heroBody:"Same site, same days, two tools running at once on Incapto's Shopify store. First a reconciliation against real orders, then six differences — and the last one changes where the media budget goes.",
    meta:[["Sector","eCommerce · Specialty coffee"],["Platform","Shopify"],["Compared against","GA4 + Consent Mode"],["Measurement window","Jun–Aug 2026"]],
    quote:"Consent Mode left us with a structural blind spot: we knew there was traffic we were not seeing, but we had no way to size it.",
    metrics:[{value:"96%",label:"Of real Shopify orders recorded",note:"Reconciled against orders that actually happened, not modelled.",numericValue:96},{value:"29%",label:"Of real visits missing from GA4",note:"64,501 visits that appeared in no report.",numericValue:29},{value:"45%",label:"Of real pageviews missing from GA4",note:"212,422 pageviews, concentrated in the traffic it never saw.",numericValue:45}],
    problemTitle:<>The orders were real.<br/><em>The traffic behind them was not.</em></>,
    problemBody:["Incapto knew exactly how many orders its Shopify store had taken. What it could not establish was how much of the traffic that produced those orders was reaching its analytics — and Consent Mode makes that gap impossible to size from inside GA4, because the traffic that is not measured leaves no trace to count.","So the team stopped arguing about percentages and ran both tools on the same site for the same days. The first question was not which one measured more. It was which one could be checked against something that indisputably happened."],
    evidence:[
      { kind:"reconcile", number:"00", title:<>Before believing anything: <em>the numbers match the till.</em></>, caption:"Real orders and revenue from the Shopify online store · 14 Jun → 31 Jul 2026",
        panels:[{value:"96%",percent:95.71,label:"of real orders were recorded"},{value:"97%",percent:96.53,label:"of real revenue was recorded"}],
        body:<>Shopify orders happened. They are not estimated and not modelled. <strong>For every 100 real orders, Sealmetrics recorded 96.</strong> That is what makes it usable as the reference for everything that follows.</> },
      { kind:"bars", number:"01", title:<>GA4 was not seeing <em>29 of every 100 visits.</em></>, caption:"Visits · 14 Jun → 31 Jul 2026 (48 days)",
        rows:[{name:"GA4",display:"157,844",percent:71,tone:"ga4"},{name:"Sealmetrics",display:"222,345",percent:100,tone:"seal"}],
        body:<>More than 64,000 visits that appeared in no report. That is the equivalent of having analytics switched off for 14 of those 48 days.</> },
      { kind:"bars", number:"02", title:<>And it was not seeing <em>45 of every 100 pages.</em></>, caption:"Pageviews · 14 Jun → 31 Jul 2026",
        rows:[{name:"GA4",display:"256,005",percent:54.7,tone:"ga4"},{name:"Sealmetrics",display:"468,427",percent:100,tone:"seal"}],
        body:<>It is short 29 of every 100 visits, but 45 of every 100 pages. <strong>The missing visits are not ordinary visits.</strong></> },
      { kind:"bars", number:"03", title:<>The traffic it cannot see <em>is the traffic that browses most.</em></>, caption:"Average pages per visit · 14 Jun → 31 Jul 2026",
        rows:[{name:"Visits GA4 records",display:"1.6 pages",percent:48.5,tone:"ga4"},{name:"Visits GA4 misses",display:"3.3 pages",percent:100,tone:"seal"}],
        body:<>212,422 pageviews spread across the 64,501 visits GA4 did not record — <strong>twice the browsing depth</strong> of the visits it does record, measured as an aggregate ratio across the period.</> },
      { kind:"channels", number:"04", title:<>The loss is <em>not the same in every channel.</em></>, caption:"Extra traffic Sealmetrics sees, channel by channel · 28 Jul → 6 Aug 2026",
        rows:[{name:"Direct",display:"+11%",percent:8.3},{name:"Referral",display:"+24%",percent:18},{name:"Email",display:"+26%",percent:19.5},{name:"Paid campaigns",display:"+37 to +52%",percent:11.3,offset:27.8},{name:"Organic search",display:"+62%",percent:46.6},{name:"Affiliate",display:"+73%",percent:54.9},{name:"Organic social",display:"+133%",percent:100}],
        body:<>Channels carrying people who already know the brand barely move. The ones bringing new people in from an external click lose between three and twelve times more. <strong>This is not fixable by multiplying the reports by a correction factor.</strong></> },
      { kind:"bars", number:"05", title:<>And the <em>&ldquo;no idea where this came from&rdquo;</em> bucket disappears.</>, caption:"Visits with no origin you can decide on · 28 Jul → 6 Aug 2026",
        rows:[{name:"GA4",display:"14%",percent:100,tone:"warn"},{name:"Sealmetrics",display:"0.3%",percent:2.1,tone:"seal"}],
        body:<>In GA4 that is 14 of every 100 visits: nine assigned to no channel at all, and five more in residual channels that point at no actionable origin. In Sealmetrics it is 3 in every 1,000. <strong>These are visits that exist, but that you cannot decide anything with.</strong></> },
      { kind:"mix", number:"06", title:<>The result: <em>two different pictures of one business.</em></>, caption:"Where the traffic appears to come from · 28 Jul → 6 Aug 2026 · rounded",
        note:"And this is the GA4 bar put back on the real scale: the same channels, but calculated over the traffic Sealmetrics recorded, not just the traffic GA4 managed to see.",
        bars:[
          {name:"GA4",segments:[{key:"paid",percent:50,display:"50%"},{key:"direct",percent:18,display:"18%"},{key:"organic",percent:10,display:"10%"},{key:"other",percent:8,display:"8%"},{key:"unknown",percent:14,display:"14%"}]},
          {name:"Sealmetrics",segments:[{key:"paid",percent:62,display:"62%"},{key:"direct",percent:16,display:"16%"},{key:"organic",percent:13,display:"13%"},{key:"other",percent:9,display:"9%"},{key:"unknown",percent:0.3,display:""}]},
          {name:"GA4, on the real scale",segments:[{key:"paid",percent:41,display:"41%"},{key:"direct",percent:15,display:"15%"},{key:"organic",percent:8,display:"8%"},{key:"other",percent:6,display:"6%"},{key:"unknown",percent:11,display:"11%"},{key:"unmeasured",percent:19,display:"19%"}]}],
        legend:[["paid","Paid campaigns"],["direct","Direct"],["organic","Organic search"],["other","Email, social, affiliate, referral, AI"],["unknown","Unknown origin"],["unmeasured","Traffic GA4 never measures"]],
        body:<>For GA4, campaigns are half the business. For Sealmetrics, close to two thirds: <strong>12 points of difference exactly where the budget is spent</strong>. Direct is not growing — it loses less than everything else, which makes it look more important than it is. Put back on the real scale, the GA4 picture has a 19% hole in it; add the 11% with no known origin and <strong>close to a third of the real traffic supports no decision at all</strong>.</> },
    ],
    methodTitle:<>Reconcile against the till,<br/><em>then read the difference.</em></>,
    methodBody:"Nothing here depends on trusting one vendor over another. The method is to anchor both tools to a number that is not produced by either of them — the orders the store actually took — and then inspect where the two diverge.",
    steps:[["01","Take the real order total","Use the eCommerce platform's own orders for the period. Online store only: exclude subscriptions, physical retail and manual admin orders, which have no web visit behind them."],["02","Measure both tools in parallel","Leave the existing analytics in place and run the second measurement layer over the same days on the same site."],["03","Reconcile before comparing","Check each tool against the order total first. A tool that cannot match the till is not a reference for anything else."],["04","Break the gap down by channel","The loss is not uniform. Find which channels it concentrates in, because those are the ones whose budget is being decided on the wrong number."]],
    resultTitle:<>Same 48 days.<br/><em>A different investment case.</em></>,
    resultBody:["The reconciled view moves paid campaigns from 50% to 62% of measured traffic — a 12-point difference in the one line of the report that determines media allocation.","Incapto did not change its stack to get a nicer number. It changed the base the number is calculated on, and the channels that were being under-credited are the ones bringing new customers in."],
    resultSignal:"12 pts", resultLabel:"gap in paid-media share of traffic",
    limits:{ tag:"Before you ask", title:<>This is what was measured, <em>not what was earned.</em></>, body:"There is no ROI figure here, no incremental sales, no revenue attributed to Google Ads clicks. None of those appear because none of them were measured. What these six comparisons change is the base on which the investment decision is made — not the return it produced." },
    notes:{ tag:"Methodology", items:[
      <>Figures are rounded in the charts. Unrounded: <b>157,844 and 222,345 visits · 256,005 and 468,427 pageviews</b> in the June–July window; <b>40,426 GA4 sessions and 50,069 Sealmetrics entries</b> in the July–August window.</>,
      <>Points 00 to 03 cover 14 Jun → 31 Jul 2026 (48 days). Points 04 to 06 cover 28 Jul → 6 Aug 2026, after the channel-grouping adjustment Incapto made. <b>The two periods are not compared against each other.</b></>,
      <>Paid traffic is shown aggregated and as a range because GA4 groups part of the spend under <b>Cross-network</b>, which Sealmetrics splits between search and social. The lower bound assumes the calculation most favourable to GA4.</>,
      <>The Shopify reconciliation uses the Online Store channel only: recurring subscriptions, physical retail and manual admin orders are excluded, because none of them has a web visit behind it. Sealmetrics reconciles 95.71% of orders and 96.53% of revenue.</>,
      <>Sealmetrics and GA4 use different measurement methodologies. <b>This case does not claim that Sealmetrics measures 100% of traffic</b> — it reports what each tool recorded over the same days, against an order total neither of them produces.</>,
    ] },
    datePublished:"2026-09-02", sourceLabel:"Evidence", sourceText:"Incapto · Shopify, GA4 and Sealmetrics parallel measurement · June–August 2026",
    ctaTitle:<>You already have<br/><em>the two numbers this needs.</em></>,
    ctaBody:"Take the real orders from your eCommerce platform and the ones your analytics reports for the same period. If they do not match, the next question is no longer how much traffic you are missing — it is which channels you are missing it from.",
    ctaPrimary:"Book a measurement review", ctaSecondary:"Read the Palladium case",
  },
  es: {
    client:"Incapto", logo:"/logos/clients/incapto.svg", person:"Rosa Tomàs", role:"Acquisition Manager B2C", companyUrl:"https://incapto.com/", title:"Incapto · Lo que GA4 no estaba enseñando", description:"Incapto midió GA4 y Sealmetrics en paralelo sobre Shopify durante 48 días: GA4 no veía el 29% de las visitas, el 45% de las páginas ni el origen del 14%.", socialTitle:"Incapto — Lo que GA4 no estaba enseñando", eyebrow:"Caso de éxito · Incapto",
    hero:<>GA4 no medía menos. <em>Medía otro negocio.</em></>,
    heroBody:"Misma web, mismos días, dos herramientas midiendo a la vez sobre la tienda Shopify de Incapto. Primero una verificación contra las ventas reales, después seis diferencias — y la última cambia dónde va el presupuesto.",
    meta:[["Sector","eCommerce · Café de especialidad"],["Plataforma","Shopify"],["Comparado contra","GA4 + Consent Mode"],["Ventana de medición","jun–ago 2026"]],
    quote:"El Consent Mode nos dejaba un vacío estructural: sabíamos que había tráfico que no estábamos viendo, pero no teníamos forma de dimensionarlo.",
    metrics:[{value:"96%",label:"De los pedidos reales de Shopify registrados",note:"Conciliados contra pedidos que ocurrieron de verdad, no modelados.",numericValue:96},{value:"29%",label:"De las visitas reales que GA4 no veía",note:"64.501 visitas que no aparecían en ningún informe.",numericValue:29},{value:"45%",label:"De las páginas reales que GA4 no veía",note:"212.422 páginas vistas, concentradas en el tráfico que nunca registró.",numericValue:45}],
    problemTitle:<>Los pedidos eran reales.<br/><em>El tráfico detrás, no del todo.</em></>,
    problemBody:["Incapto sabía exactamente cuántos pedidos había hecho su tienda de Shopify. Lo que no podía establecer era cuánto del tráfico que producía esos pedidos llegaba a su analítica — y el Consent Mode hace que ese hueco sea imposible de dimensionar desde dentro de GA4, porque el tráfico que no se mide no deja rastro que contar.","Así que el equipo dejó de discutir porcentajes y puso las dos herramientas a medir la misma web los mismos días. La primera pregunta no era cuál medía más, sino cuál se podía contrastar contra algo que había ocurrido de forma indiscutible."],
    evidence:[
      { kind:"reconcile", number:"00", title:<>Antes de creerte nada: <em>los números cuadran con la caja.</em></>, caption:"Pedidos y facturación reales de la tienda online de Shopify · 14 jun → 31 jul 2026",
        panels:[{value:"96%",percent:95.71,label:"de los pedidos reales quedaron registrados"},{value:"97%",percent:96.53,label:"de la facturación real quedó registrada"}],
        body:<>Los pedidos de Shopify ocurrieron de verdad: no se estiman ni se modelan. <strong>De cada 100 pedidos reales, Sealmetrics registró 96.</strong> Eso es lo que permite usar sus números como referencia en todo lo que viene después.</> },
      { kind:"bars", number:"01", title:<>GA4 no veía <em>29 de cada 100 visitas.</em></>, caption:"Visitas · 14 jun → 31 jul 2026 (48 días)",
        rows:[{name:"GA4",display:"157.844",percent:71,tone:"ga4"},{name:"Sealmetrics",display:"222.345",percent:100,tone:"seal"}],
        body:<>Más de 64.000 visitas que no aparecían en ningún informe. Equivale a tener la analítica apagada 14 de esos 48 días.</> },
      { kind:"bars", number:"02", title:<>Tampoco veía <em>45 de cada 100 páginas.</em></>, caption:"Páginas vistas · 14 jun → 31 jul 2026",
        rows:[{name:"GA4",display:"256.005",percent:54.7,tone:"ga4"},{name:"Sealmetrics",display:"468.427",percent:100,tone:"seal"}],
        body:<>Le faltan 29 de cada 100 visitas, pero 45 de cada 100 páginas. <strong>Las visitas que faltan no son visitas normales.</strong></> },
      { kind:"bars", number:"03", title:<>El tráfico que no ve <em>es el que más navega.</em></>, caption:"Media de páginas por visita · 14 jun → 31 jul 2026",
        rows:[{name:"Visita que GA4 sí ve",display:"1,6 páginas",percent:48.5,tone:"ga4"},{name:"Visita que GA4 no ve",display:"3,3 páginas",percent:100,tone:"seal"}],
        body:<>212.422 páginas repartidas entre las 64.501 visitas que GA4 no registró: <strong>el doble de navegación</strong> que las visitas que sí registra, medido como ratio agregado del periodo.</> },
      { kind:"channels", number:"04", title:<>No se pierde <em>lo mismo en todos los canales.</em></>, caption:"Tráfico que ve Sealmetrics de más, canal por canal · 28 jul → 6 ago 2026",
        rows:[{name:"Directo",display:"+11%",percent:8.3},{name:"Referral",display:"+24%",percent:18},{name:"Email",display:"+26%",percent:19.5},{name:"Campañas de pago",display:"+37 a +52%",percent:11.3,offset:27.8},{name:"Buscador orgánico",display:"+62%",percent:46.6},{name:"Afiliación",display:"+73%",percent:54.9},{name:"Redes orgánicas",display:"+133%",percent:100}],
        body:<>Los canales de gente que ya te conoce apenas cambian. Los que traen gente nueva desde un clic externo pierden entre tres y doce veces más. <strong>No se arregla multiplicando los informes por un número.</strong></> },
      { kind:"bars", number:"05", title:<>Y el cajón de <em>&laquo;no sé de dónde viene&raquo;</em> desaparece.</>, caption:"Visitas sin un origen con el que se pueda decidir · 28 jul → 6 ago 2026",
        rows:[{name:"GA4",display:"14%",percent:100,tone:"warn"},{name:"Sealmetrics",display:"0,3%",percent:2.1,tone:"seal"}],
        body:<>En GA4 son 14 de cada 100: nueve sin asignar a ningún canal y otras cinco en canales residuales que no apuntan a ningún origen accionable. En Sealmetrics, 3 de cada 1.000. <strong>Son visitas que existen, pero con las que no se puede decidir nada.</strong></> },
      { kind:"mix", number:"06", title:<>Resultado: <em>dos fotos distintas del mismo negocio.</em></>, caption:"De dónde parece venir el tráfico · 28 jul → 6 ago 2026 · porcentajes redondeados",
        note:"Y esta es la barra de GA4 puesta a la escala real: los mismos canales, pero calculados sobre el tráfico que registró Sealmetrics, no sobre el que GA4 llegó a ver.",
        bars:[
          {name:"GA4",segments:[{key:"paid",percent:50,display:"50%"},{key:"direct",percent:18,display:"18%"},{key:"organic",percent:10,display:"10%"},{key:"other",percent:8,display:"8%"},{key:"unknown",percent:14,display:"14%"}]},
          {name:"Sealmetrics",segments:[{key:"paid",percent:62,display:"62%"},{key:"direct",percent:16,display:"16%"},{key:"organic",percent:13,display:"13%"},{key:"other",percent:9,display:"9%"},{key:"unknown",percent:0.3,display:""}]},
          {name:"GA4, a escala real",segments:[{key:"paid",percent:41,display:"41%"},{key:"direct",percent:15,display:"15%"},{key:"organic",percent:8,display:"8%"},{key:"other",percent:6,display:"6%"},{key:"unknown",percent:11,display:"11%"},{key:"unmeasured",percent:19,display:"19%"}]}],
        legend:[["paid","Campañas de pago"],["direct","Directo"],["organic","Buscador orgánico"],["other","Email, redes, afiliación, referral, IA"],["unknown","Origen desconocido"],["unmeasured","Tráfico que GA4 no llega a medir"]],
        body:<>Para GA4, las campañas son la mitad del negocio. Para Sealmetrics, casi dos tercios: <strong>12 puntos de diferencia justo donde se gasta el presupuesto</strong>. El directo no crece, es que pierde menos que el resto y por eso parece más importante de lo que es. Puesta a escala real, la foto de GA4 tiene un agujero del 19%; sumado al 11% sin origen conocido, <strong>casi un tercio del tráfico real no sirve para decidir nada</strong>.</> },
    ],
    methodTitle:<>Conciliar contra la caja<br/><em>y leer la diferencia.</em></>,
    methodBody:"Nada de esto depende de creer a un proveedor antes que a otro. El método es anclar las dos herramientas a un número que no produce ninguna de las dos — los pedidos que la tienda hizo de verdad — y después inspeccionar dónde divergen.",
    steps:[["01","Coger el total real de pedidos","Usar los pedidos de la propia plataforma de eCommerce en el periodo. Solo tienda online: se excluyen suscripciones, tienda física y pedidos manuales de administración, que no tienen visita web detrás."],["02","Medir las dos en paralelo","Dejar la analítica actual en su sitio y ejecutar la segunda capa de medición sobre los mismos días y la misma web."],["03","Conciliar antes de comparar","Contrastar cada herramienta contra el total de pedidos primero. Una herramienta que no cuadra con la caja no es referencia de nada más."],["04","Desglosar el gap por canal","La pérdida no es uniforme. Localizar en qué canales se concentra, porque son aquellos cuyo presupuesto se está decidiendo con el número equivocado."]],
    resultTitle:<>Los mismos 48 días.<br/><em>Otro caso de inversión.</em></>,
    resultBody:["La vista conciliada mueve las campañas de pago del 50% al 62% del tráfico medido: 12 puntos de diferencia en la única línea del informe que determina el reparto de medios.","Incapto no cambió su stack para obtener un número más bonito. Cambió la base sobre la que se calcula el número, y los canales que estaban infravalorados son precisamente los que traen clientes nuevos."],
    resultSignal:"12 pts", resultLabel:"de diferencia en el peso del paid media",
    limits:{ tag:"Antes de que lo preguntes", title:<>Esto es lo que se ha medido, <em>no lo que se ha ganado.</em></>, body:"Aquí no hay una cifra de ROI, ni ventas incrementales, ni ingresos atribuidos a los clics de Google Ads. Ninguna aparece porque ninguna se ha medido. Lo que cambia con estas seis comparaciones es la base sobre la que se decide la inversión, no el retorno que produjo." },
    notes:{ tag:"Metodología", items:[
      <>Cifras redondeadas en los gráficos. Sin redondear: <b>157.844 y 222.345 visitas · 256.005 y 468.427 páginas vistas</b> en la ventana de junio-julio; <b>40.426 sesiones en GA4 y 50.069 entradas en Sealmetrics</b> en la de julio-agosto.</>,
      <>Los puntos 00 a 03 cubren del 14 jun al 31 jul de 2026 (48 días). Los puntos 04 a 06, del 28 jul al 6 ago de 2026, tras el ajuste de agrupaciones de canal hecho por Incapto. <b>Los dos periodos no se comparan entre sí.</b></>,
      <>El tráfico de pago se presenta agregado y como rango porque GA4 agrupa parte de la inversión en <b>Cross-network</b>, que Sealmetrics reparte entre buscador y redes. El extremo inferior asume el cálculo más favorable para GA4.</>,
      <>La reconciliación con Shopify usa únicamente el canal Online Store: se excluyen suscripciones recurrentes, tienda física y pedidos manuales de administración, que no tienen visita web detrás. Sealmetrics reconcilia el 95,71% de los pedidos y el 96,53% de la facturación.</>,
      <>Sealmetrics y GA4 usan metodologías de medición diferentes. <b>Este caso no afirma que Sealmetrics mida el 100% del tráfico</b>: informa de lo que registró cada herramienta en los mismos días, contra un total de pedidos que no produce ninguna de las dos.</>,
    ] },
    datePublished:"2026-09-02", sourceLabel:"Evidencia", sourceText:"Incapto · medición en paralelo de Shopify, GA4 y Sealmetrics · junio–agosto de 2026",
    ctaTitle:<>Ya tienes<br/><em>los dos números que hacen falta.</em></>,
    ctaBody:"Coge los pedidos reales de tu plataforma de eCommerce y los que te cuenta tu analítica en el mismo periodo. Si no cuadran, la siguiente pregunta ya no es cuánto tráfico te falta, sino de qué canales te falta.",
    ctaPrimary:"Reserva una revisión de medición", ctaSecondary:"Lee el caso Palladium",
  },
} as const satisfies Record<CaseStudyLocale, CaseStudyContent>;

export const caseStudies = { "palladium-hotel-group": palladium, "dreamplace-hotels": dreamplace, "incapto": incapto } as const;

/**
 * Display order, and the cycle the "read the next case" link follows. Keep the
 * `ctaSecondary` label of each case pointing at whatever comes after it here.
 */
export const caseStudyOrder = ["palladium-hotel-group", "dreamplace-hotels", "incapto"] as const;
export function nextCaseStudy(slug: CaseStudySlug): CaseStudySlug {
  return caseStudyOrder[(caseStudyOrder.indexOf(slug) + 1) % caseStudyOrder.length];
}
export function getCaseStudy(slug: CaseStudySlug, locale: CaseStudyLocale): CaseStudyContent { return caseStudies[slug][locale]; }
import type { ReactNode } from "react";
