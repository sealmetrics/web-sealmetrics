"use client";

import { useMemo, useState } from "react";

type Locale = "en" | "es";

const COPY = {
  en: {
    masthead: "Sealmetrics · Consentless Analytics",
    vol: "Vol. 01 — The Blindness Calculator",
    diag: "A diagnostic for CMOs and founders",
    h1A: "Your Legacy Analytics is",
    lying: "lying",
    h1B: "— and it's costing you",
    realMoney: "real money.",
    intro: ["Enter your", "monthly", "numbers from GA4. We'll show you how many visits, orders and revenue you're missing every month — and why your conversion rate is, in reality, lower than you think."],
    inputLabel: "INPUT",
    yourCurrentNumbers: ["Your", "current", "numbers"],
    monthlyFiguresFrom: "Monthly figures from GA4",
    monthlyVisits: "Monthly visits (GA4)",
    monthlyVisitsHint: "What GA4 reports today, after the consent banner.",
    perMonth: "/ month",
    aov: "Average order value (AOV)",
    aovHint: "Average revenue per order.",
    cr: "Observed conversion rate",
    crHint: "The CR GA4 reports. Spoiler: it's inflated.",
    sealmetricsModel: "Sealmetrics model",
    modelRows: [
      { k: "Real visits vs GA4", v: "+55%" },
      { k: "Real conversions vs GA4", v: "+25%" },
      { k: "Consentless capture", v: "No consent loss" },
    ],
    blindnessCalc: "THE BLINDNESS CALCULATION",
    costOfBlindness: ["The cost of your", "blindness"],
    liveUpdate: "live update",
    metric: "Metric (monthly)",
    ga4Biased: "GA4 (biased)",
    sealReal: "Sealmetrics (real)",
    blindSpot: "Blind spot",
    rowVisits: "Monthly visits",
    rowOrders: "Total orders",
    rowRevenue: "Monthly revenue",
    crBlock: ["Conversion Rate", "— the inconvenient truth —"],
    ga4TellsYou: "GA4 tells you",
    reality: "Reality",
    delta: "Delta",
    verdict: "The verdict",
    blindOpening: "You're operating with a blind spot of",
    inMonthlyRevenue: "in monthly revenue and",
    ordersCantSee: "orders you can't see.",
    yearlyAside: ["That's", "a year you don't even know exists."],
    stopBleeding: <>Stop the bleeding. <em className="italic-accent">Start your 14-day trial.</em></>,
    startTrial: "Start 14-day trial",
    whyTitle: "Why this happens",
    whyBody: "GA4 depends on the consent banner. Consent-based tools lose 15–60% of European visitors — how much depends on sector, brand strength and traffic mix. Those visitors buy — but you never see them.",
    whatTitle: "What Sealmetrics does",
    whatBody: "Measures traffic without depending on consent: no cookies, no consent banner, designed for GDPR (self-assessed). You finally see what GA4 leaves behind.",
    payEyebrow: "The math gets uncomfortable",
    payTitle: ["How many sales does Sealmetrics need to", "pay for itself?"],
    plan: "Plan",
    salesBE: "Sales to break even",
    salesBESuffix: "orders / month",
    salesBEHint: "Recovered orders Sealmetrics needs to surface — at your AOV — to fully pay for itself.",
    pctBlind: "% of the blind spot",
    pctBlindSuffix: "of recovered orders",
    pctBlindHint: "A tiny fraction of the orders you're already missing. The rest is pure upside.",
    monthlyROI: "Monthly ROI",
    monthlyROISuffix: "return on Sealmetrics",
    monthlyROIHint: "For every €1 spent on Sealmetrics, this is the recovered revenue you gain visibility on.",
    paybackFootA: "With",
    paybackFootB: "recovered orders per day, Sealmetrics is already paying for itself.",
    paybackFootC: "days into the month, you're in profit.",
    primaryFootCta: "Stop the bleeding · start 14-day trial",
    secondaryFootCta: "Run the deep gap audit",
    auditHref: "/data-loss-calculator/",
    locale: "en-US",
  },
  es: {
    masthead: "Sealmetrics · Analítica sin consentimiento",
    vol: "Vol. 01 — La calculadora de ceguera",
    diag: "Un diagnóstico para CMOs y founders",
    h1A: "Tu analítica legacy te",
    lying: "miente",
    h1B: "— y te está costando",
    realMoney: "dinero real.",
    intro: ["Introduce tus números", "mensuales", "de GA4. Te mostramos cuántas visitas, pedidos e ingresos estás perdiendo cada mes — y por qué tu tasa de conversión es, en realidad, más baja de lo que crees."],
    inputLabel: "INPUT",
    yourCurrentNumbers: ["Tus números", "actuales", ""],
    monthlyFiguresFrom: "Cifras mensuales de GA4",
    monthlyVisits: "Visitas mensuales (GA4)",
    monthlyVisitsHint: "Lo que GA4 reporta hoy, tras el banner de consentimiento.",
    perMonth: "/ mes",
    aov: "Ticket medio (AOV)",
    aovHint: "Ingreso medio por pedido.",
    cr: "Tasa de conversión observada",
    crHint: "La CR que GA4 reporta. Spoiler: está inflada.",
    sealmetricsModel: "Modelo Sealmetrics",
    modelRows: [
      { k: "Visitas reales vs GA4", v: "+55%" },
      { k: "Conversiones reales vs GA4", v: "+25%" },
      { k: "Captura sin consentimiento", v: "Sin pérdida por consentimiento" },
    ],
    blindnessCalc: "EL CÁLCULO DE LA CEGUERA",
    costOfBlindness: ["El coste de tu", "ceguera"],
    liveUpdate: "actualización en vivo",
    metric: "Métrica (mensual)",
    ga4Biased: "GA4 (sesgado)",
    sealReal: "Sealmetrics (real)",
    blindSpot: "Punto ciego",
    rowVisits: "Visitas mensuales",
    rowOrders: "Pedidos totales",
    rowRevenue: "Ingresos mensuales",
    crBlock: ["Tasa de conversión", "— la verdad incómoda —"],
    ga4TellsYou: "GA4 te dice",
    reality: "Realidad",
    delta: "Delta",
    verdict: "El veredicto",
    blindOpening: "Estás operando con un punto ciego de",
    inMonthlyRevenue: "en ingresos mensuales y",
    ordersCantSee: "pedidos que no ves.",
    yearlyAside: ["Eso son", "al año que ni sabes que existen."],
    stopBleeding: <>Para la sangría. <em className="italic-accent">Empieza tu prueba de 14 días.</em></>,
    startTrial: "Prueba de 14 días",
    whyTitle: "Por qué pasa",
    whyBody: "GA4 depende del banner de consentimiento. Las herramientas que dependen de él pierden entre el 15% y el 60% de los visitantes europeos, según el sector, la fuerza de la marca y el mix de tráfico. Esos visitantes compran — pero tú no los ves nunca.",
    whatTitle: "Qué hace Sealmetrics",
    whatBody: "Mide el tráfico sin depender del consentimiento: sin cookies, sin banner, diseñada para el RGPD (autoevaluación). Por fin ves lo que GA4 deja atrás.",
    payEyebrow: "La matemática se pone incómoda",
    payTitle: ["¿Cuántas ventas necesita Sealmetrics para", "pagarse a sí mismo?"],
    plan: "Plan",
    salesBE: "Ventas para break-even",
    salesBESuffix: "pedidos / mes",
    salesBEHint: "Pedidos recuperados que Sealmetrics necesita aflorar — a tu AOV — para pagarse del todo.",
    pctBlind: "% del punto ciego",
    pctBlindSuffix: "de pedidos recuperados",
    pctBlindHint: "Una fracción mínima de los pedidos que ya estás perdiendo. El resto es upside puro.",
    monthlyROI: "ROI mensual",
    monthlyROISuffix: "retorno sobre Sealmetrics",
    monthlyROIHint: "Por cada €1 gastado en Sealmetrics, este es el ingreso recuperado del que ganas visibilidad.",
    paybackFootA: "Con",
    paybackFootB: "pedidos recuperados al día, Sealmetrics ya se paga solo.",
    paybackFootC: "días después de empezar el mes, estás en beneficio.",
    primaryFootCta: "Para la sangría · prueba de 14 días",
    secondaryFootCta: "Auditoría profunda del gap",
    auditHref: "/es/data-loss-calculator/",
    locale: "es-ES",
  },
} as const;

const fmtNumLocale = (n: number, l: string) =>
  new Intl.NumberFormat(l, { maximumFractionDigits: 0 }).format(Math.round(n));
const fmtEurLocale = (n: number, l: string) =>
  new Intl.NumberFormat(l, { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(Math.round(n));
const fmtPctLocale = (n: number, l: string, d = 2) =>
  new Intl.NumberFormat(l, { minimumFractionDigits: d, maximumFractionDigits: d }).format(n) + "%";

export function BlindnessCalculator({ locale = "en" }: { locale?: Locale }) {
  const c = COPY[locale];
  const fmtNum = (n: number) => fmtNumLocale(n, c.locale);
  const fmtEur = (n: number) => fmtEurLocale(n, c.locale);
  const fmtPct = (n: number, d = 2) => fmtPctLocale(n, c.locale, d);
  const [visits, setVisits] = useState(1_000_000);
  const [ticket, setTicket] = useState(87);
  const [crPct, setCrPct] = useState(0.8);
  const [planPrice, setPlanPrice] = useState(499);

  const calc = useMemo(() => {
    const ga4Visits = Math.max(0, visits);
    const ga4Orders = ga4Visits * (Math.max(0, crPct) / 100);
    const ga4Revenue = ga4Orders * Math.max(0, ticket);

    const sealVisits = ga4Visits * 1.55;
    const sealOrders = ga4Orders * 1.25;
    const sealRevenue = sealOrders * Math.max(0, ticket);

    const dVisits = sealVisits - ga4Visits;
    const dOrders = sealOrders - ga4Orders;
    const dRevenue = sealRevenue - ga4Revenue;

    const realCR = sealVisits > 0 ? (sealOrders / sealVisits) * 100 : 0;
    const dCR = realCR - crPct;
    const blindPct = sealRevenue > 0 ? (dRevenue / sealRevenue) * 100 : 0;

    const ordersToBreakEven = ticket > 0 ? planPrice / ticket : 0;
    const paybackPct = dOrders > 0 ? (ordersToBreakEven / dOrders) * 100 : 0;
    const monthlyROI = planPrice > 0 ? dRevenue / planPrice : 0;
    const ordersPerDay = dOrders / 30;
    const daysToPayback = ordersPerDay > 0 ? ordersToBreakEven / ordersPerDay : 0;

    return {
      ga4Visits, ga4Orders, ga4Revenue,
      sealVisits, sealOrders, sealRevenue,
      dVisits, dOrders, dRevenue,
      realCR, dCR, blindPct,
      ordersToBreakEven, paybackPct, monthlyROI, ordersPerDay, daysToPayback,
    };
  }, [visits, ticket, crPct, planPrice]);

  return (
    <section id="ga4-gap" className="bg-warm-50 border-t border-warm-100 py-24">
      <div className="max-w-[1180px] mx-auto px-5 sm:px-8">
        {/* Editorial masthead */}
        <header className="border-t-[3px] border-ink border-b border-ink py-3 flex justify-between items-baseline font-mono text-[11px] uppercase tracking-[0.12em]">
          <span className="font-bold text-ink">{c.masthead}</span>
          <span className="text-ink-soft hidden sm:inline">{c.vol}</span>
        </header>

        {/* Hero */}
        <div className="py-12 md:py-14 border-b border-warm-100">
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-red-alert font-semibold mb-4 flex items-center gap-3">
            <span className="inline-block w-7 h-px bg-red-alert" />
            {c.diag}
          </div>
          <h2
            className="font-semibold text-ink leading-[1.02] tracking-[-0.025em]"
            style={{ fontSize: "clamp(34px, 5.4vw, 64px)" }}
          >
            {c.h1A}{" "}
            <span className="relative inline-block">
              {c.lying}
              <span
                aria-hidden
                className="absolute left-[-2%] right-[-2%]"
                style={{
                  top: "52%",
                  height: 4,
                  background: "#B5423B",
                  transform: "rotate(-2deg)",
                }}
              />
            </span>
            <br />
            {c.h1B} <em className="italic-accent">{c.realMoney}</em>
          </h2>
          <p className="mt-6 text-[17px] md:text-[19px] leading-[1.55] text-ink-2 max-w-[680px]">
            {c.intro[0]} <b className="font-semibold text-ink">{c.intro[1]}</b> {c.intro[2]}
          </p>
        </div>

        {/* Calculator grid */}
        <div
          className="mt-12 grid min-w-0 md:grid-cols-[360px_1fr] border border-ink bg-warm-white"
          style={{ boxShadow: "8px 8px 0 #0E0E0C" }}
        >
          {/* INPUTS */}
          <aside className="min-w-0 bg-ink text-warm-white p-8 md:p-9 relative">
            <span className="absolute top-3 right-4 font-mono text-[10px] tracking-[0.2em] text-white/40">
              {c.inputLabel}
            </span>
            <h3
              className="font-semibold leading-[1.1] tracking-[-0.01em] text-white"
              style={{ fontSize: "26px" }}
            >
              {c.yourCurrentNumbers[0]} <em className="italic font-medium" style={{ color: "#E8B84B" }}>{c.yourCurrentNumbers[1]}</em> {c.yourCurrentNumbers[2]}
            </h3>
            <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-white/55 mt-1.5 mb-8">
              {c.monthlyFiguresFrom}
            </p>

            <CalcField
              label={c.monthlyVisits}
              hint={c.monthlyVisitsHint}
              value={visits}
              onChange={setVisits}
              suffix={c.perMonth}
              step={1000}
            />
            <CalcField
              label={c.aov}
              hint={c.aovHint}
              value={ticket}
              onChange={setTicket}
              prefix="€"
              step={1}
            />
            <CalcField
              label={c.cr}
              hint={c.crHint}
              value={crPct}
              onChange={setCrPct}
              suffix="%"
              step={0.01}
            />

            <div className="mt-9 pt-6 border-t border-dashed border-white/20">
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/55 mb-3.5">
                {c.sealmetricsModel}
              </div>
              {c.modelRows.map((row, i, arr) => (
                <div
                  key={row.k}
                  className={`flex justify-between items-baseline py-2.5 text-[13px] ${
                    i < arr.length - 1 ? "border-b border-dotted border-white/15" : ""
                  }`}
                >
                  <span className="text-white/70">{row.k}</span>
                  <span className="font-mono font-bold text-amber">{row.v}</span>
                </div>
              ))}
            </div>
          </aside>

          {/* OUTPUT */}
          <section className="min-w-0 p-8 md:p-10 bg-warm-white relative">
            <span className="absolute top-3 right-6 font-mono text-[10px] tracking-[0.2em] text-ink/40">
              {c.blindnessCalc}
            </span>

            <div className="flex items-baseline justify-between mb-7 pb-5 border-b-2 border-ink">
              <h3
                className="font-semibold text-ink leading-[1.1] tracking-[-0.01em]"
                style={{ fontSize: "28px" }}
              >
                {c.costOfBlindness[0]} <em className="italic-accent">{c.costOfBlindness[1]}</em>
              </h3>
              <span className="font-mono text-[11px] tracking-[0.1em] text-ink-soft hidden sm:inline">
                {c.liveUpdate}
              </span>
            </div>

            {/* Comparison table */}
            <div className="overflow-x-auto -mx-2">
              <table className="w-full border-collapse mb-7">
                <thead>
                  <tr>
                    <th className="text-left font-mono font-medium text-[10px] uppercase tracking-[0.16em] text-ink-soft pb-2.5 px-3 border-b border-ink">
                      {c.metric}
                    </th>
                    <th className="text-right font-mono font-medium text-[10px] uppercase tracking-[0.16em] text-ink-soft pb-2.5 px-3 border-b border-ink">
                      {c.ga4Biased}
                    </th>
                    <th className="text-right font-mono font-medium text-[10px] uppercase tracking-[0.16em] text-red-alert pb-2.5 px-3 border-b border-ink">
                      {c.sealReal}
                    </th>
                    <th className="text-right font-mono font-medium text-[10px] uppercase tracking-[0.16em] text-brand pb-2.5 px-3 border-b border-ink">
                      {c.blindSpot}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <CalcRow
                    label={c.rowVisits}
                    ga4={fmtNum(calc.ga4Visits)}
                    seal={fmtNum(calc.sealVisits)}
                    diff={"+" + fmtNum(calc.dVisits)}
                  />
                  <CalcRow
                    label={c.rowOrders}
                    ga4={fmtNum(calc.ga4Orders)}
                    seal={fmtNum(calc.sealOrders)}
                    diff={"+" + fmtNum(calc.dOrders)}
                  />
                  <CalcRow
                    label={c.rowRevenue}
                    ga4={fmtEur(calc.ga4Revenue)}
                    seal={fmtEur(calc.sealRevenue)}
                    diff={"+" + fmtEur(calc.dRevenue)}
                    headline
                  />
                </tbody>
              </table>
            </div>

            {/* CR truth */}
            <div className="bg-warm-100 border border-warm-200 px-5 md:px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-2 leading-[1.4]">
                {c.crBlock[0]}
                <br />
                <span className="text-ink-soft">{c.crBlock[1]}</span>
              </div>
              <div className="flex flex-wrap gap-x-7 gap-y-3 items-baseline">
                <div>
                  <div className="font-mono text-[9px] tracking-[0.18em] uppercase text-ink-soft">
                    {c.ga4TellsYou}
                  </div>
                  <div
                    className="font-semibold text-[20px] tabular-nums text-ink-soft"
                    style={{
                      textDecoration: "line-through",
                      textDecorationColor: "#B5423B",
                      textDecorationThickness: "1.5px",
                    }}
                  >
                    {fmtPct(crPct)}
                  </div>
                </div>
                <div>
                  <div className="font-mono text-[9px] tracking-[0.18em] uppercase text-ink-soft">
                    {c.reality}
                  </div>
                  <div className="font-semibold text-[20px] tabular-nums text-red-alert">
                    {fmtPct(calc.realCR)}
                  </div>
                </div>
                <div>
                  <div className="font-mono text-[9px] tracking-[0.18em] uppercase text-ink-soft">
                    {c.delta}
                  </div>
                  <div
                    className="font-semibold text-[20px] tabular-nums"
                    style={{ color: "#B5423B" }}
                  >
                    {(calc.dCR >= 0 ? "+" : "−") + fmtPct(Math.abs(calc.dCR))}
                  </div>
                </div>
              </div>
            </div>

            {/* Verdict */}
            <div
              className="mt-3 grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6 items-center px-6 py-6 border border-l-[6px]"
              style={{
                background: "rgba(232, 184, 75, 0.18)",
                borderColor: "#E8B84B",
                borderLeftColor: "#B5423B",
              }}
            >
              <div
                className="font-semibold tabular-nums leading-none text-red-alert"
                style={{ fontSize: "clamp(48px, 6vw, 72px)", letterSpacing: "-0.03em" }}
              >
                {new Intl.NumberFormat("en-US", { maximumFractionDigits: 1 }).format(calc.blindPct)}
                <span className="text-[0.5em] font-medium ml-1">%</span>
              </div>
              <div className="text-ink leading-[1.45]">
                <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-red-alert font-semibold mb-1.5">
                  {c.verdict}
                </div>
                <p className="text-[16.5px]">
                  {c.blindOpening}{" "}
                  <b className="font-semibold">{fmtEur(calc.dRevenue)}</b> {c.inMonthlyRevenue}{" "}
                  <b className="font-semibold">{fmtNum(calc.dOrders)}</b> {c.ordersCantSee}
                </p>
                <p className="text-[14px] text-ink-2 mt-1.5">
                  {c.yearlyAside[0]} <b className="font-semibold text-ink">{fmtEur(calc.dRevenue * 12)}</b> {c.yearlyAside[1]}
                </p>
              </div>
            </div>

            {/* Conversion block — CTA + email capture */}
            <CalcConversionBlock stopBleeding={c.stopBleeding} startTrial={c.startTrial} />

            {/* Footnote */}
            <div className="mt-9 pt-5 border-t border-warm-100 grid sm:grid-cols-2 gap-7 font-mono text-[11px] leading-[1.6] text-ink-soft">
              <div>
                <strong className="block text-ink uppercase tracking-[0.08em] text-[10px] mb-1.5">
                  {c.whyTitle}
                </strong>
                {c.whyBody}
              </div>
              <div>
                <strong className="block text-ink uppercase tracking-[0.08em] text-[10px] mb-1.5">
                  {c.whatTitle}
                </strong>
                {c.whatBody}
              </div>
            </div>
          </section>
        </div>

        {/* Payback block */}
        <div
          className="section-dark mt-12 border border-ink bg-ink text-warm-white overflow-hidden"
          style={{ boxShadow: "8px 8px 0 #E8B84B" }}
        >
          <div className="flex flex-wrap justify-between items-baseline gap-4 px-7 md:px-9 py-6 border-b border-dashed border-white/20">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-amber font-semibold mb-1.5">
                {c.payEyebrow}
              </div>
              <h3
                className="font-semibold leading-[1.1] tracking-[-0.01em] text-white"
                style={{ fontSize: "clamp(22px, 2.6vw, 32px)" }}
              >
                {c.payTitle[0]}{" "}
                <em className="italic font-medium" style={{ color: "#E8B84B" }}>
                  {c.payTitle[1]}
                </em>
              </h3>
            </div>
            <div className="flex items-baseline gap-2 bg-white/5 border border-white/15 px-4 py-2.5">
              <label htmlFor="plan-price" className="font-mono text-[10px] tracking-[0.14em] uppercase text-white/65">
                {c.plan}
              </label>
              <span className="font-mono text-[12px] text-white/55">€</span>
              <input
                id="plan-price"
                type="number"
                value={planPrice}
                min={0}
                step={1}
                onChange={(e) => setPlanPrice(parseFloat(e.target.value) || 0)}
                className="bg-transparent border-0 text-white font-semibold text-[22px] w-[90px] text-right tabular-nums outline-none focus:ring-0"
              />
              <span className="font-mono text-[12px] text-white/55">{c.perMonth}</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3">
            <PaybackCell
              label={c.salesBE}
              num={
                calc.ordersToBreakEven < 10
                  ? new Intl.NumberFormat(c.locale, { maximumFractionDigits: 1, minimumFractionDigits: 1 }).format(calc.ordersToBreakEven)
                  : fmtNum(Math.ceil(calc.ordersToBreakEven))
              }
              suffix={c.salesBESuffix}
              explain={c.salesBEHint}
              hero
            />
            <PaybackCell
              label={c.pctBlind}
              num={
                calc.paybackPct < 1
                  ? new Intl.NumberFormat(c.locale, { maximumFractionDigits: 2, minimumFractionDigits: 2 }).format(calc.paybackPct)
                  : new Intl.NumberFormat(c.locale, { maximumFractionDigits: 1 }).format(calc.paybackPct)
              }
              numSuffix="%"
              suffix={c.pctBlindSuffix}
              explain={c.pctBlindHint}
            />
            <PaybackCell
              label={c.monthlyROI}
              num={new Intl.NumberFormat(c.locale, { maximumFractionDigits: 0 }).format(Math.round(calc.monthlyROI))}
              numSuffix="×"
              suffix={c.monthlyROISuffix}
              explain={c.monthlyROIHint}
            />
          </div>

          <div
            className="px-7 md:px-9 py-4 font-mono text-[11.5px] leading-[1.55] tracking-[0.04em] text-warm-white"
            style={{ background: "rgba(232,184,75,0.12)", borderTop: "1px solid rgba(232,184,75,0.3)" }}
          >
            {c.paybackFootA}{" "}
            <strong className="text-amber font-bold">
              {calc.ordersPerDay < 10
                ? new Intl.NumberFormat(c.locale, { maximumFractionDigits: 1 }).format(calc.ordersPerDay)
                : fmtNum(Math.round(calc.ordersPerDay))}
            </strong>{" "}
            {c.paybackFootB}{" "}
            <strong className="text-amber font-bold">
              {calc.daysToPayback < 1
                ? "< 1"
                : new Intl.NumberFormat(c.locale, { maximumFractionDigits: 1 }).format(calc.daysToPayback)}
            </strong>{" "}
            {c.paybackFootC}
          </div>
        </div>

        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <a
            href="https://my.sealmetrics.com/register"
            className="inline-flex items-center gap-2 px-7 py-4 bg-ink text-white rounded-md text-[15px] font-semibold no-underline hover:bg-brand transition-colors"
          >
            {c.primaryFootCta} <span>→</span>
          </a>
          <a
            href={c.auditHref}
            className="inline-flex items-center gap-2 px-7 py-4 border border-warm-200 text-ink rounded-md text-[15px] font-semibold no-underline hover:bg-warm-50 transition-colors"
          >
            {c.secondaryFootCta}
          </a>
        </div>
      </div>
    </section>
  );
}

function CalcField({
  label,
  hint,
  value,
  onChange,
  suffix,
  prefix,
  step = 1,
}: {
  label: string;
  hint?: string;
  value: number;
  onChange: (v: number) => void;
  suffix?: string;
  prefix?: string;
  step?: number;
}) {
  return (
    <div className="mb-6">
      <label className="block font-mono text-[11px] tracking-[0.14em] uppercase text-white/85 mb-2">
        {label}
      </label>
      <div className="flex items-baseline border-b border-white/25 py-1.5 focus-within:border-amber transition-colors">
        {prefix && <span className="font-mono text-[12px] tracking-[0.1em] text-white/55 mr-2">{prefix}</span>}
        <input
          type="number"
          value={value}
          min={0}
          step={step}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          className="min-w-0 bg-transparent border-0 text-white font-semibold text-[28px] md:text-[32px] w-full outline-none tabular-nums"
          style={{ letterSpacing: "-0.01em" }}
        />
        {suffix && (
          <span className="font-mono text-[12px] tracking-[0.1em] text-white/55 ml-2 shrink-0">
            {suffix}
          </span>
        )}
      </div>
      {hint && <div className="text-[12px] text-white/50 mt-1.5 leading-[1.4]">{hint}</div>}
    </div>
  );
}

function CalcRow({
  label,
  ga4,
  seal,
  diff,
  headline = false,
}: {
  label: string;
  ga4: string;
  seal: string;
  diff: string;
  headline?: boolean;
}) {
  if (headline) {
    return (
      <tr>
        <td className="bg-ink text-warm-white/70 px-3 py-5 font-mono uppercase tracking-[0.06em] text-[12px] font-medium">
          {label}
        </td>
        <td
          className="bg-ink text-warm-white/40 px-3 py-5 text-right font-semibold tabular-nums text-[20px]"
          style={{
            textDecoration: "line-through",
            textDecorationColor: "#B5423B",
            textDecorationThickness: "1.5px",
            letterSpacing: "-0.01em",
          }}
        >
          {ga4}
        </td>
        <td
          className="bg-ink text-warm-white px-3 py-5 text-right font-semibold tabular-nums"
          style={{ fontSize: "30px", letterSpacing: "-0.015em" }}
        >
          {seal}
        </td>
        <td
          className="bg-ink px-3 py-5 text-right font-mono font-bold tabular-nums text-[16px]"
          style={{ color: "#4ADE80" }}
        >
          {diff}
        </td>
      </tr>
    );
  }
  return (
    <tr className="border-b border-warm-100 hover:bg-amber/5">
      <td className="px-3 py-3.5 font-mono uppercase tracking-[0.06em] text-[12px] font-medium text-ink-2">
        {label}
      </td>
      <td
        className="px-3 py-3.5 text-right font-semibold tabular-nums text-[18px] text-ink-soft"
        style={{
          textDecoration: "line-through",
          textDecorationColor: "#B5423B",
          textDecorationThickness: "1.5px",
          letterSpacing: "-0.01em",
        }}
      >
        {ga4}
      </td>
      <td
        className="px-3 py-3.5 text-right font-semibold tabular-nums text-[18px] text-ink"
        style={{ letterSpacing: "-0.01em" }}
      >
        {seal}
      </td>
      <td className="px-3 py-3.5 text-right font-mono font-bold tabular-nums text-[14px] text-brand">
        {diff}
      </td>
    </tr>
  );
}

function PaybackCell({
  label,
  num,
  numSuffix,
  suffix,
  explain,
  hero = false,
}: {
  label: string;
  num: string;
  numSuffix?: string;
  suffix: string;
  explain: string;
  hero?: boolean;
}) {
  return (
    <div className="px-7 md:px-9 py-7 border-b md:border-b-0 md:border-r border-dashed border-white/20 last:border-r-0 last:border-b-0">
      <div className="font-mono text-[10px] tracking-[0.16em] uppercase text-white/55 mb-3.5">
        {label}
      </div>
      <div
        className={`font-semibold leading-none tabular-nums mb-2 ${hero ? "text-amber" : "text-white"}`}
        style={{ fontSize: "clamp(36px, 5vw, 56px)", letterSpacing: "-0.025em" }}
      >
        {num}
        {numSuffix && (
          <span className="font-medium ml-0.5" style={{ fontSize: "0.5em", opacity: 0.6 }}>
            {numSuffix}
          </span>
        )}
      </div>
      <div className="font-mono text-[12px] tracking-[0.08em] text-white/55 mb-2.5">
        {suffix}
      </div>
      <p className="text-[13px] leading-[1.5] text-white/70 max-w-[280px]">{explain}</p>
    </div>
  );
}

function CalcConversionBlock({ stopBleeding, startTrial }: { stopBleeding: React.ReactNode; startTrial: string }) {
  return (
    <div
      className="mt-6 p-7 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-5"
      style={{
        background: "rgba(45,139,109,0.06)",
        borderColor: "rgba(45,139,109,0.25)",
      }}
    >
      <p className="text-[17px] font-semibold tracking-[-0.015em] text-ink leading-[1.3]">
        {stopBleeding}
      </p>
      <a
        href="https://my.sealmetrics.com/register"
        className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-ink text-white rounded-md text-[15px] font-semibold no-underline hover:bg-brand transition-colors shrink-0"
      >
        {startTrial} <span>→</span>
      </a>
    </div>
  );
}
