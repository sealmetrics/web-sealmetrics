"use client";

import Link from "next/link";
import { SignalAnswer } from "@/components/v4/SignalAnswer";
import { pricingAnswer, pillarAnswerLabel } from "@/lib/content/pillar-answers";
import { Fragment, useState } from "react";
import { PRICING, annualTotal, fmtPrice } from "@/lib/content/pricing";
import { pricingSignalFaqs } from "@/lib/content/pricing-signal";

type Locale = "en" | "es";
type Billing = "annual" | "monthly";

const comparison = [
  { category: ["Allowance", "Límite"], rows: [
    [["Human events / month", "Eventos humanos / mes"], "1M in total · free", "5M", "15M", "Unlimited"],
    [["Websites", "Webs"], "Unlimited", "Unlimited", "Unlimited", "Unlimited"],
    [["Users and accounts", "Usuarios y cuentas"], "Unlimited", "Unlimited", "Unlimited", "Unlimited"],
    [["Data retention", "Retención de datos"], "24 months", "24 months", "24 months", "24 months"],
  ]},
  { category: ["Analytics core", "Analítica core"], rows: [
    [["Aggregate cookieless measurement", "Medición agregada sin cookies"], true, true, true, true],
    [["Revenue attribution", "Atribución de ingresos"], true, true, true, true],
    [["Funnels and commercial events", "Embudos y eventos comerciales"], true, true, true, true],
    [["Full-resolution processing", "Procesamiento a resolución completa"], true, true, true, true],
    [["Recent-data availability", "Disponibilidad de dato reciente"], "Typically <2 min", "Typically <2 min", "Typically <2 min", "Typically <2 min"],
  ]},
  { category: ["Data and AI", "Datos e IA"], rows: [
    [["REST API and MCP server", "API REST y servidor MCP"], true, true, true, true],
    [["BigQuery export", "Export a BigQuery"], true, true, true, true],
    [["LENS with your own model key", "LENS con tu propia clave de modelo"], false, true, true, true],
    [["Managed Private AI", "Private AI gestionada"], false, "Add-on", "5M tokens", "Included"],
    [["Dedicated Private AI instance", "Instancia Private AI dedicada"], false, false, false, true],
    [["Webhooks", "Webhooks"], false, false, true, true],
  ]},
  { category: ["Governance and support", "Governance y soporte"], rows: [
    [["Audit logs", "Logs de auditoría"], false, false, true, true],
    [["Role-based access", "Acceso por roles"], "Basic", "Basic", "Advanced", "Full"],
    [["Isolated processing", "Procesamiento aislado"], false, false, false, true],
    [["Email support", "Soporte email"], false, true, true, true],
    [["Priority support", "Soporte prioritario"], false, false, true, true],
    [["Dedicated account manager", "Account manager dedicado"], false, false, false, true],
    [["Uptime SLA", "SLA de disponibilidad"], "—", "99%", "99.5%", "99.9%"],
  ]},
] as const;

const copy = {
  en: {
    home: "Home", breadcrumb: "Pricing", eyebrow: "Pricing · fixed plans · declared allowances",
    hero1: "Pay for the traffic", hero2: "that informs", heroOutline: "a human decision.",
    heroBody: "Four plans, one measurement architecture. The price changes with sustained human-event volume, governance and support — not with access to the basic evidence.",
    heroPrimary: "Compare the plans", heroSecondary: "Book a pricing review", heroMicro: "14-day trial · no per-event overage invoice · annual or monthly billing",
    boardTitle: "Annual plan map", boardRows: [["Agentic", "€0", "1M human events in total"], ["Growth", "€499/mo", "5M human events"], ["Scale", "€899/mo", "15M human events"], ["Enterprise", "Custom", "Unlimited"]],
    boardFoot: "Annual prices · paid upfront · two months equivalent saved",
    plansTag: "Choose a commercial boundary", plansTitle: <>The same evidence.<br /><em>A different operating envelope.</em></>,
    plansBody: "Start from observed monthly human events. Then choose the support, governance and managed-AI layer the team actually needs.",
    annual: "Annual", monthly: "Monthly", saving: "2 months equivalent saved", perMonth: "/mo", billedAnnually: "billed annually", custom: "Custom", free: "Free",
    plans: [
      { name:"Agentic", desc:"For an MCP-capable agent to provision and operate self-service analytics.", events:"1M human events in total", features:["Complete aggregate analytics", "MCP + API + BigQuery", "Unlimited sites and users", "Documentation-only support"], cta:"Set up with your agent", href:"https://my.sealmetrics.com/register", featured:false },
      { name:"Growth", desc:"For a team establishing a complete commercial baseline.", events:"5M human events / month", features:["LENS with your own model key", "Email support", "Full API and exports", "14-day trial"], cta:"Start 14-day trial", href:"https://my.sealmetrics.com/register", featured:false },
      { name:"Scale", desc:"For growing eCommerce teams with higher volume and governance needs.", events:"15M human events / month", features:["Managed Private AI · 5M tokens", "Webhooks and audit logs", "Priority support", "Guided onboarding"], cta:"Start 14-day trial", href:"https://my.sealmetrics.com/register", featured:true },
      { name:"Enterprise", desc:"For portfolio brands and regulated operating environments.", events:"Unlimited human events", features:["Exclusive Private AI instance", "Isolated processing", "99.9% SLA", "Dedicated account manager"], cta:"Book an enterprise review", href:"/demo/", featured:false },
    ],
    chosen: "Most chosen by eCommerce", includedTag:"Included from Growth", includedTitle:<>No capability tax<br /><em>on the core analytics.</em></>,
    includedBody:"Every paid plan starts with the collection, attribution and activation layers needed to reconcile revenue. Scale and Enterprise add operating controls, not a more accurate base dataset.",
    included:["Unlimited websites and users","Conversion and microconversion properties","24-month retention","Funnels and portfolio view","REST API, MCP and BigQuery","LENS with your own model key","DPA included","Dublin-hosted visitor data path"],
    trafficTag:"What consumes the allowance", trafficTitle:<>Humans count.<br /><em>Noise does not.</em></>, trafficBody:"The commercial meter is based on detected human events. Bot categories remain visible without consuming that allowance.",
    trafficHeaders:["Traffic type","Measured","Consumes allowance","Reporting"], trafficRows:[["Human interactions","Yes","Yes","Core reports"],["Traditional bots","Filtered","No","Traffic hygiene"],["Detected AI agents","Separately","No","Agent reporting"]],
    comparisonTag:"Full plan comparison", comparisonTitle:<>Keep pricing<br /><em>inspectable.</em></>, comparisonBody:"This is a real table. On smaller screens it scrolls horizontally without flattening features into disconnected text.",
    agentic:"Agentic", growth:"Growth", scale:"Scale", enterprise:"Enterprise", feature:"Capability", yes:"Included", no:"—",
    policyTag:"How the plan adapts", policyTitle:<>No surprise line item<br /><em>after a traffic spike.</em></>, policyBody:"Collection continues during an overage. The plan changes only when the higher volume is sustained under the published policy.",
    policy:[["80%","Usage notice","An informational email before the allowance is reached."],["100%","Dashboard signal","The account shows that the monthly allowance has been reached."],["2 months","Sustained overage","Growth can move to Scale at the next cycle after notice."],["Annual","Contract protection","Mid-year growth is reviewed at renewal, not invoiced as a variable event charge."]],
    faqTag:"Pricing questions", faqTitle:<>Direct answers.<br /><em>No fine print.</em></>, faqBody:"The commercial conditions buyers usually need before approving a plan.",
    finalTag:"Choose from evidence", finalTitle:<>See your own data first.<br /><em>Then choose the plan.</em></>, finalBody:"Run the current stack and Sealmetrics together, estimate the real human-event volume and select the operating envelope from observed traffic.", finalPrimary:"Book a pricing review", finalSecondary:"Review the product",
  },
  es: {
    home: "Inicio", breadcrumb: "Precios", eyebrow: "Precios · planes fijos · límites declarados",
    hero1: "Paga por el tráfico", hero2: "que informa", heroOutline: "una decisión humana.",
    heroBody: "Cuatro planes, una arquitectura de medición. El precio cambia con el volumen sostenido de eventos humanos, el governance y el soporte — no con el acceso a la evidencia básica.",
    heroPrimary: "Compara los planes", heroSecondary: "Reserva una revisión de precio", heroMicro: "14 días de prueba · sin factura variable por evento · anual o mensual",
    boardTitle: "Mapa de planes anuales", boardRows: [["Agentic", "0€", "1M eventos humanos en total"], ["Growth", "499€/mes", "5M eventos humanos"], ["Scale", "899€/mes", "15M eventos humanos"], ["Enterprise", "A medida", "Ilimitados"]],
    boardFoot: "Precios anuales · pago adelantado · ahorro equivalente a dos meses",
    plansTag: "Elige un límite comercial", plansTitle: <>La misma evidencia.<br /><em>Un entorno operativo distinto.</em></>,
    plansBody: "Empieza por los eventos humanos mensuales observados. Después elige el soporte, governance y capa de IA gestionada que el equipo necesita de verdad.",
    annual: "Anual", monthly: "Mensual", saving: "Ahorro equivalente a 2 meses", perMonth: "/mes", billedAnnually: "facturado anualmente", custom: "A medida", free: "Gratis",
    plans: [
      { name:"Agentic", desc:"Para que un agente compatible con MCP aprovisione y opere analítica self-service.", events:"1M eventos humanos en total", features:["Analítica agregada completa", "MCP + API + BigQuery", "Webs y usuarios ilimitados", "Soporte sólo por documentación"], cta:"Configura con tu agente", href:"https://my.sealmetrics.com/register", featured:false },
      { name:"Growth", desc:"Para un equipo que establece una base comercial completa.", events:"5M eventos humanos / mes", features:["LENS con tu propia clave de modelo", "Soporte email", "API completa y exports", "14 días de prueba"], cta:"Empieza 14 días de prueba", href:"https://my.sealmetrics.com/register", featured:false },
      { name:"Scale", desc:"Para equipos eCommerce en crecimiento con más volumen y governance.", events:"15M eventos humanos / mes", features:["Private AI gestionada · 5M tokens", "Webhooks y logs de auditoría", "Soporte prioritario", "Onboarding guiado"], cta:"Empieza 14 días de prueba", href:"https://my.sealmetrics.com/register", featured:true },
      { name:"Enterprise", desc:"Para portfolios de marcas y entornos operativos regulados.", events:"Eventos humanos ilimitados", features:["Instancia Private AI exclusiva", "Procesamiento aislado", "SLA 99,9%", "Account manager dedicado"], cta:"Reserva una revisión enterprise", href:"/es/demo/", featured:false },
    ],
    chosen: "El más elegido por eCommerce", includedTag:"Incluido desde Growth", includedTitle:<>Sin impuesto de capacidades<br /><em>sobre la analítica core.</em></>,
    includedBody:"Cada plan de pago comienza con las capas de captura, atribución y activación necesarias para conciliar ingresos. Scale y Enterprise añaden controles operativos, no un dataset base más preciso.",
    included:["Webs y usuarios ilimitados","Propiedades de conversión y microconversión","Retención de 24 meses","Embudos y vista de portfolio","API REST, MCP y BigQuery","LENS con tu propia clave de modelo","DPA incluido","Ruta del dato de visitante alojada en Dublín"],
    trafficTag:"Qué consume el límite", trafficTitle:<>Los humanos cuentan.<br /><em>El ruido no.</em></>, trafficBody:"El contador comercial se basa en eventos humanos detectados. Las categorías de bots siguen visibles sin consumir ese límite.",
    trafficHeaders:["Tipo de tráfico","Medición","Consume límite","Reporting"], trafficRows:[["Interacciones humanas","Sí","Sí","Informes core"],["Bots tradicionales","Filtrados","No","Higiene de tráfico"],["Agentes IA detectados","Por separado","No","Reporting de agentes"]],
    comparisonTag:"Comparación completa", comparisonTitle:<>Mantén el precio<br /><em>inspeccionable.</em></>, comparisonBody:"Esto es una tabla real. En pantallas pequeñas se desplaza horizontalmente sin convertir las capacidades en texto desconectado.",
    agentic:"Agentic", growth:"Growth", scale:"Scale", enterprise:"Enterprise", feature:"Capacidad", yes:"Incluido", no:"—",
    policyTag:"Cómo se adapta el plan", policyTitle:<>Sin una línea sorpresa<br /><em>tras un pico de tráfico.</em></>, policyBody:"La captura continúa durante un exceso. El plan sólo cambia cuando el volumen superior se mantiene bajo la política publicada.",
    policy:[["80%","Aviso de uso","Un email informativo antes de alcanzar el límite."],["100%","Señal en dashboard","La cuenta indica que se ha alcanzado el límite mensual."],["2 meses","Exceso sostenido","Growth puede pasar a Scale en el siguiente ciclo tras aviso."],["Anual","Protección de contrato","El crecimiento a mitad de año se revisa al renovar, no se factura como evento variable."]],
    faqTag:"Preguntas de precio", faqTitle:<>Respuestas directas.<br /><em>Sin letra pequeña.</em></>, faqBody:"Las condiciones comerciales que suelen necesitarse antes de aprobar un plan.",
    finalTag:"Elige desde la evidencia", finalTitle:<>Primero ve tus datos.<br /><em>Después elige plan.</em></>, finalBody:"Ejecuta el stack actual y Sealmetrics juntos, estima el volumen real de eventos humanos y elige el entorno operativo desde tráfico observado.", finalPrimary:"Reserva una revisión de precio", finalSecondary:"Revisa el producto",
  },
} as const;

function Arrow() { return <span aria-hidden="true">↗</span>; }

function planPrice(name: string, billing: Billing, locale: Locale) {
  if (name === "Agentic") return { price: locale === "es" ? "0€" : "€0", sub: copy[locale].free };
  if (name === "Enterprise") return { price: copy[locale].custom, sub: locale === "es" ? "Contrato anual personalizado" : "Tailored annual contract" };
  const plan = name === "Growth" ? PRICING.growth : PRICING.scale;
  const value = billing === "annual" ? plan.annual : plan.monthly;
  return { price: fmtPrice(value, locale), sub: billing === "annual" ? `${fmtPrice(annualTotal(plan.annual), locale)} · ${copy[locale].billedAnnually}` : copy[locale].monthly };
}

function Cell({ value, locale }: { value: string | boolean; locale: Locale }) {
  if (value === true) return <span className="sig-pricing-yes">{copy[locale].yes}</span>;
  if (value === false) return <span className="sig-pricing-no">{copy[locale].no}</span>;
  const translations: Record<string,string> = locale === "es" ? {"1M in total · free":"1M en total · gratis","Unlimited":"Ilimitados","24 months":"24 meses","Typically <2 min":"Normalmente <2 min","Add-on":"Add-on","Included":"Incluida","Basic":"Básico","Advanced":"Avanzado","Full":"Completo","Custom":"A medida"} : {};
  return <span>{translations[value] ?? value}</span>;
}

export function PricingSignal({ locale }: { locale: Locale }) {
  const [billing, setBilling] = useState<Billing>("annual");
  const t = copy[locale];
  const prefix = locale === "es" ? "/es" : "";

  return (
    <div className="sig-pricing-page">
      <section className="sig-pricing-hero">
        <div className="sig-pricing-hero-copy">
          <nav className="sig-pricing-breadcrumbs" aria-label="Breadcrumb"><Link href={`${prefix}/`}>{t.home}</Link><span>/</span><span>{t.breadcrumb}</span></nav>
          <p className="sig-pricing-eyebrow"><span>{t.eyebrow}</span></p>
          <h1>{t.hero1}<br />{t.hero2}<br /><em>{t.heroOutline}</em></h1>
          <p className="sig-pricing-hero-body">{t.heroBody}</p>
          <div data-md="skip" className="sig-pricing-actions"><a className="sig-pricing-button sig-pricing-button-acid" href="#plans">{t.heroPrimary} <Arrow /></a><Link className="sig-pricing-text-link" href={`${prefix}/demo/`}>{t.heroSecondary} →</Link></div>
          <p className="sig-pricing-micro">{t.heroMicro}</p>
        </div>
        <div className="sig-pricing-board"><div className="sig-pricing-module-top"><span>{t.boardTitle}</span><span>EUR · VAT EXCL.</span></div>{t.boardRows.map(([name,price,events])=><div key={name}><strong>{name}</strong><b>{price}</b><span>{events}</span></div>)}<p>{t.boardFoot}</p></div>
      </section>

      <SignalAnswer label={pillarAnswerLabel[locale]}>{pricingAnswer[locale]}</SignalAnswer>

      <section className="sig-pricing-plans" id="plans">
        <div className="sig-pricing-section-head"><div><p className="sig-pricing-tag">{t.plansTag}</p><h2>{t.plansTitle}</h2></div><p>{t.plansBody}</p></div>
        <div className="sig-pricing-billing" role="group" aria-label={locale === "es" ? "Periodo de facturación" : "Billing period"}><button type="button" aria-pressed={billing==="annual"} onClick={()=>setBilling("annual")}>{t.annual}<span>{t.saving}</span></button><button type="button" aria-pressed={billing==="monthly"} onClick={()=>setBilling("monthly")}>{t.monthly}</button></div>
        <div className="sig-pricing-plan-grid">{t.plans.map(plan=>{const shown=planPrice(plan.name,billing,locale);return <article className={plan.featured?"sig-pricing-plan-featured":""} key={plan.name}>{plan.featured&&<span className="sig-pricing-chosen">{t.chosen}</span>}<header><h3>{plan.name}</h3><p>{plan.desc}</p></header><div className="sig-pricing-price"><strong>{shown.price}</strong>{!(["Agentic","Enterprise"].includes(plan.name))&&<span>{t.perMonth}</span>}<small>{shown.sub}</small></div><b className="sig-pricing-events">{plan.events}</b><ul>{plan.features.map(f=><li key={f}>— {f}</li>)}</ul>{plan.href.startsWith("http")?<a data-md="skip" className="sig-pricing-plan-cta" href={plan.href}>{plan.cta} <Arrow /></a>:<Link data-md="skip" className="sig-pricing-plan-cta" href={plan.href}>{plan.cta} <Arrow /></Link>}</article>})}</div>
      </section>

      <section className="sig-pricing-included"><div className="sig-pricing-section-head"><div><p className="sig-pricing-tag sig-pricing-tag-light">{t.includedTag}</p><h2>{t.includedTitle}</h2></div><p>{t.includedBody}</p></div><div className="sig-pricing-included-grid">{t.included.map((item,i)=><div key={item}><span>0{i+1}</span><p>{item}</p></div>)}</div></section>

      <section className="sig-pricing-traffic"><div className="sig-pricing-section-head"><div><p className="sig-pricing-tag">{t.trafficTag}</p><h2>{t.trafficTitle}</h2></div><p>{t.trafficBody}</p></div><div className="sig-pricing-table-wrap"><table><thead><tr>{t.trafficHeaders.map(h=><th key={h}>{h}</th>)}</tr></thead><tbody>{t.trafficRows.map(row=><tr key={row[0]}>{row.map((cell,i)=>i===0?<th scope="row" key={`${row[0]}-${i}`}>{cell}</th>:<td key={`${row[0]}-${i}`}>{cell}</td>)}</tr>)}</tbody></table></div></section>

      <section className="sig-pricing-comparison"><div className="sig-pricing-section-head"><div><p className="sig-pricing-tag">{t.comparisonTag}</p><h2>{t.comparisonTitle}</h2></div><p>{t.comparisonBody}</p></div><div className="sig-pricing-table-label"><span>{locale === "es" ? "Matriz de capacidades" : "Capability matrix"}</span><span>{locale === "es" ? "Scale destacado como referencia" : "Scale highlighted as the reference"}</span></div><div className="sig-pricing-table-wrap sig-pricing-comparison-table"><table><thead><tr><th>{t.feature}<small>{locale === "es" ? "Qué cambia por plan" : "What changes by plan"}</small></th><th>{t.agentic}<small>{t.free}</small></th><th>{t.growth}<small>5M</small></th><th className="sig-pricing-reference">{t.scale}<small>{t.chosen}</small></th><th>{t.enterprise}<small>{locale === "es" ? "A medida" : "Custom"}</small></th></tr></thead><tbody>{comparison.map(section=><Fragment key={section.category[0]}><tr className="sig-pricing-category"><th colSpan={5}><span>{section.category[locale==="es"?1:0]}</span></th></tr>{section.rows.map(([label,a,g,s,e])=><tr key={label[0]}><th scope="row">{label[locale==="es"?1:0]}</th><td><Cell value={a} locale={locale}/></td><td><Cell value={g} locale={locale}/></td><td><Cell value={s} locale={locale}/></td><td><Cell value={e} locale={locale}/></td></tr>)}</Fragment>)}</tbody></table></div><p className="sig-pricing-table-note">{locale === "es" ? "Todos los planes conservan la misma arquitectura de medición. La diferencia es el límite operativo, la gobernanza, la IA gestionada y el soporte." : "Every plan keeps the same measurement architecture. The operating allowance, governance, managed AI and support are what change."}</p></section>

      <section className="sig-pricing-policy"><div className="sig-pricing-section-head"><div><p className="sig-pricing-tag sig-pricing-tag-light">{t.policyTag}</p><h2>{t.policyTitle}</h2></div><p>{t.policyBody}</p></div><div className="sig-pricing-policy-grid">{t.policy.map(([number,title,body])=><article key={number}><strong>{number}</strong><h3>{title}</h3><p>{body}</p></article>)}</div></section>

      <section className="sig-pricing-faq"><div className="sig-pricing-section-head"><div><p className="sig-pricing-tag">{t.faqTag}</p><h2>{t.faqTitle}</h2></div><p>{t.faqBody}</p></div><div className="sig-pricing-faq-list">{pricingSignalFaqs[locale].map(([q,a],i)=><details key={q}><summary><span>0{i+1}</span>{q}<b>+</b></summary><p>{a}</p></details>)}</div></section>

      <section className="sig-pricing-final"><p className="sig-pricing-tag">{t.finalTag}</p><h2>{t.finalTitle}</h2><p>{t.finalBody}</p><div data-md="skip" className="sig-pricing-actions"><Link className="sig-pricing-button sig-pricing-button-dark" href={`${prefix}/demo/`}>{t.finalPrimary} <Arrow /></Link><Link className="sig-pricing-text-link" href={`${prefix}/product/`}>{t.finalSecondary} →</Link></div></section>
    </div>
  );
}
