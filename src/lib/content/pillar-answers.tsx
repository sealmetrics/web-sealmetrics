import type { ReactNode } from "react";

/**
 * The answer-first passage for each commercial pillar.
 *
 * These four pages were the ones an answer engine had nothing to lift from:
 * `markdown-twin-without-summary` flagged them, and they are exactly the pages
 * the September GEO run found missing from queries about their own subject.
 *
 * Every claim here is already made elsewhere on the site. Nothing is new, and
 * nothing may be new — this is the passage most likely to be quoted out of
 * context, so it is the worst possible place to introduce an unverified figure.
 *
 * Each one closes on a limit or a plain fact rather than a call to action.
 * A CTA means nothing once the passage is quoted somewhere else, and
 * `markdown-twin-cta-leak` rejects one.
 */

type Locale = "en" | "es";

export const pillarAnswerLabel: Record<Locale, string> = {
  en: "Quick answer",
  es: "Respuesta rápida",
};

export const productAnswer: Record<Locale, ReactNode> = {
  en: (
    <p>
      Sealmetrics is a cookieless, consentless web analytics platform for
      eCommerce. It measures visits without cookies, identifiers or a consent
      banner, so the reported total covers visitors who accept and reject the
      banner alike, not only the share that accepted tracking — on a real Shopify store measured
      over 48 days, GA4 did not record 29% of visits, and once sampling,
      consent rejection and ad blockers compound in the EU worst case it can
      fall to about 13%. Revenue is attributed on last click across that
      data, without consent gaps, under one declared model your team can name and defend.
      Four layers run on the same defined inputs: collection, attribution, nine
      reporting surfaces, and activation through the REST API, the MCP server
      and BigQuery. Visitor data is processed and stored in Dublin only. What
      the platform does not do is equally definite: no per-user profiles, no
      cohorts, no session replay, no multi-touch attribution.
    </p>
  ),
  es: (
    <p>
      Sealmetrics es una plataforma de analítica web cookieless y sin
      consentimiento para eCommerce. Mide las visitas sin cookies, sin identificadores y sin
      banner, así que el total que reporta incluye a quien acepta y a quien
      rechaza el banner, no solo a la parte que aceptó ser medida — en una tienda Shopify real
      medida durante 48 días, GA4 no registró el 29% de las visitas, y en el
      peor escenario de la UE, sumando muestreo, rechazo de consentimiento y
      bloqueadores, puede quedarse en torno al 13%. Los ingresos se atribuyen a
      último clic sobre ese dato, sin huecos de consentimiento, bajo un modelo declarado que tu
      equipo puede nombrar y defender. Cuatro capas trabajan sobre las mismas
      entradas definidas: recogida, atribución, nueve superficies de reporting y
      activación por API REST, servidor MCP y BigQuery. El dato de visitante se
      procesa y almacena solo en Dublín. Lo que la plataforma no hace es igual
      de taxativo: sin perfiles por usuario, sin cohortes, sin session replay y
      sin atribución multi-touch.
    </p>
  ),
};

export const pricingAnswer: Record<Locale, ReactNode> = {
  en: (
    <p>
      Sealmetrics pricing is a fixed allowance, not a metered event bill. Four
      plans share one measurement architecture: the price moves with sustained
      human-event volume, governance and support, never with access to the
      underlying evidence. The Agentic tier is €0 for up to 1M human events in
      total and takes no card — an MCP-capable assistant can provision it from a
      chat. Growth is €499/month billed annually, €599 monthly, for 5M events;
      Scale is €899/month annually, €1,079 monthly, for 15M; Enterprise is a
      tailored annual contract. Every paid plan carries the same collection,
      attribution and activation layers, unlimited sites and users, 24-month
      retention, the REST API, MCP, BigQuery export and a DPA. There is no
      per-event overage invoice. One distinction worth stating plainly: the
      14-day trial takes a payment method, and the Agentic tier does not.
    </p>
  ),
  es: (
    <p>
      El precio de Sealmetrics es una asignación fija, no una factura por
      evento. Cuatro planes comparten una sola arquitectura de medición: el
      precio se mueve con el volumen sostenido de eventos humanos, la gobernanza
      y el soporte, nunca con el acceso a la evidencia. El plan Agentic cuesta
      €0 hasta 1M de eventos humanos en total y no pide tarjeta — un asistente
      compatible con MCP puede darlo de alta desde el chat. Growth son €499/mes
      facturados anualmente, €599 mensual, para 5M de eventos; Scale son
      €899/mes anual, €1.079 mensual, para 15M; Enterprise es un contrato anual
      a medida. Todos los planes de pago llevan las mismas capas de recogida,
      atribución y activación, sites y usuarios ilimitados, 24 meses de
      retención, API REST, MCP, exportación a BigQuery y DPA. No hay factura por
      exceso de eventos. Una distinción que conviene decir clara: la prueba de
      14 días sí pide método de pago; el plan Agentic no.
    </p>
  ),
};

export const securityAnswer: Record<Locale, ReactNode> = {
  en: (
    <p>
      Sealmetrics security starts before encryption: the safest visitor record
      is the one never created. No cookie is set, no identifier is stored on the
      device and no IP address is retained, so there is no personal data to
      secure, to breach or to hand over. What remains is aggregate, anonymous
      event data — encrypted in transit and at rest, isolated per account and
      deleted on a fixed retention schedule. Visitor data is processed and stored in
      Dublin, Ireland only, so no visitor-data transfer leaves the EU, GDPR
      Chapter V is never triggered for it, and there are no Standard Contractual
      Clauses or Transfer Impact Assessment to maintain on visitor data. A DPA and the TPSR package are included.
      The case rests on architecture rather than on a certificate, and that cuts
      both ways: Sealmetrics holds no ISO 27001 or SOC 2 certification today,
      which is worth knowing before a procurement review rather than after.
    </p>
  ),
  es: (
    <p>
      La seguridad de Sealmetrics empieza antes del cifrado: el registro de
      visitante más seguro es el que nunca se crea. No se escribe ninguna
      cookie, no se guarda ningún identificador en el dispositivo y no se
      retiene ninguna IP, así que no hay dato personal que proteger, que filtrar
      ni que entregar. Lo que queda es dato de evento agregado y anónimo —
      cifrado en tránsito y en reposo, aislado por cuenta y borrado según un
      calendario de retención fijo. El dato de visitante se trata y almacena
      solo en Dublín, Irlanda, así que ninguna transferencia de ese dato sale de
      la UE, el Capítulo V del RGPD nunca se activa para él y no hay Cláusulas
      Contractuales Tipo ni Transfer Impact Assessment que mantener sobre él. El DPA y el paquete TPSR van
      incluidos. El argumento se sostiene en la arquitectura y no en un
      certificado, y eso corta por los dos lados: Sealmetrics no tiene hoy
      certificación ISO 27001 ni SOC 2, y conviene saberlo antes de una revisión
      de compras y no después.
    </p>
  ),
};

export const howItWorksAnswer: Record<Locale, ReactNode> = {
  en: (
    <p>
      Sealmetrics works in four separable stages, each with a defined input, a
      visible output and a boundary your technical team can inspect. Collection
      is first-party and server-side: a script under 5 KB gzipped records the
      event, and no cookie, identifier or IP is stored on the way. Processing
      filters bot traffic and derives channel context from the URL and referrer
      alone. Attribution assigns revenue on last click across data without
      consent gaps, under one declared model rather than a blend nobody can
      reproduce. Activation moves that same evidence out through the REST API,
      the MCP server and BigQuery export. Keeping collection separate from
      interpretation is what makes a disagreement diagnosable — you can tell
      whether a number is wrong because events are missing, because a commercial
      definition changed, or because of the attribution model. Installation
      takes about 15 minutes, and the previous day is complete before 6 AM.
    </p>
  ),
  es: (
    <p>
      Sealmetrics funciona en cuatro etapas separables, cada una con una entrada
      definida, una salida visible y una frontera que tu equipo técnico puede
      inspeccionar. La recogida es first-party y server-side: un script de menos
      de 5 KB comprimido registra el evento, y por el camino no se guarda
      ninguna cookie, ningún identificador ni ninguna IP. El procesado filtra el
      tráfico de bots y deriva el contexto de canal solo a partir de la URL y el
      referrer. La atribución asigna los ingresos a último clic sobre el dato
      sin huecos de consentimiento, bajo un modelo declarado y no una mezcla que nadie puede
      reproducir. La activación saca esa misma evidencia por API REST, servidor
      MCP y exportación a BigQuery. Mantener separadas la recogida y la
      interpretación es lo que hace diagnosticable un desacuerdo: puedes saber
      si un número está mal porque faltan eventos, porque cambió una definición
      comercial o por el modelo de atribución. La instalación lleva unos 15
      minutos y el día anterior está completo antes de las 6 de la mañana.
    </p>
  ),
};

/**
 * The homepage.
 *
 * EN only, on purpose: `SignalHome` takes no locale because the Spanish home is
 * still on v3 (`HomeV3`), and it already carries a `QuickAnswer`. When the ES
 * home migrates to v4, this is where its copy goes.
 *
 * This is the entity definition an engine reaches for on "what is Sealmetrics",
 * so it stays close to the canonical wording in public/llms.txt rather than
 * inventing a second description of the same company.
 */
export const homeAnswer: ReactNode = (
  <p>
    Sealmetrics is a cookieless, consentless web analytics platform for
    eCommerce companies in the EU and UK. It records pageviews, events and
    conversions without setting a cookie, storing an identifier or asking for
    consent, so the number it reports includes visitors who reject the banner, not
    only the fraction that accepted tracking — on a real Shopify store measured over 48
    days, GA4 did not record 29% of visits, and in the compounded EU worst case
    of sampling, consent rejection and ad blockers it can fall to about 13%.
    Revenue is attributed on last click across that data, without consent
    gaps, and collection is first-party and server-side, processed and stored in
    Dublin only. It is built to be checked rather than believed: run it beside
    your current analytics and compare both totals against the revenue your
    backend recorded. What it is not is a per-user tool — no profiles, no
    cohorts, no session replay, no multi-touch attribution.
  </p>
);
