import Link from "next/link";
import type { VsData } from "./VsComparisonV3";

type Locale = "en" | "es";
export type VsKey = "ga360" | "adobe-analytics" | "piwik-pro" | "matomo" | "google-analytics";

export function getVsData(key: VsKey, locale: Locale): VsData {
  const data: Record<VsKey, Record<Locale, Omit<VsData, "locale">>> = {
    ga360: {
      en: {
        competitor: "GA360",
        techReportHref: "https://docs.sealmetrics.com/guides/tracker-performance-report",
        hook: "GA360 is quote-based and scales with event volume — entry contracts around $50K/yr, mid-market typically $100–175K. Whatever you pay, the cookie and consent architecture is the same as free GA4.",
        eyebrow: "vs Google Analytics 360",
        h1: <>Enterprise data <em>without the six-figure invoice.</em></>,
        lede: "GA360 costs tens to hundreds of thousands per year and still loses the same 40–60% of EU traffic that free GA4 loses — because the collection architecture is identical. Sealmetrics is complete data, EU-hosted, from €499/mo.",
        tldr: {
          answer: (
            <>
              GA360 is Google&rsquo;s enterprise tier of Analytics:
              SLAs, dedicated support, custom retention, sampling
              relief on BigQuery — wrapped in a quote-based annual
              commit that scales with event volume:{" "}
              <strong>from around $50K/year</strong> at the entry tier,
              typically <strong>$100–175K</strong> for mid-market
              properties. Underneath, the collection architecture is
              identical to free GA4: cookie-based, consent-required,
              US-hosted. In the EU, GA360 loses the same{" "}
              <strong>40–60% of traffic</strong> to consent rejection
              and ad blockers that free GA4 loses — premium price,
              premium incomplete data. Sealmetrics replaces the
              measurement layer for a published{" "}
              <strong>€10,788/year</strong> at Scale — a fraction of
              any GA360 contract — measures in aggregate without depending on consent and
              keeps everything in Dublin.
            </>
          ),
          bullets: [
            <>GA360: premium support &amp; sampling relief, same collection layer as free GA4.</>,
            <>Sealmetrics: full capture, EU-only processing, published pricing against a quote-only contract.</>,
            <>Most teams keep GA360 only for Google Ads conversion import, run Sealmetrics for revenue decisions.</>,
          ],
        },
        caseStudy: {
          eyebrow: "Switched from a Google-Analytics stack",
          title: <>How Palladium Hotel Group recovered <em className="italic-accent">40% of unattributed traffic</em>.</>,
          quote: "The data Sealmetrics delivers is agnostic, unbiased and neutral. There's no black box.",
          quoteAuthor: "Toni Andújar · Digital & Direct Sales Director · Palladium Hotel Group",
          body: "Palladium ran Sealmetrics alongside their existing GA-tier stack. The audit surfaced 40% of inbound traffic with no source/medium attribution, 35% of bookings unassigned to a channel in GA4, and a +165% Cost-per-Search improvement on Display once the Sealmetrics measurement model drove DV360 decisions. They kept GA4 as the Google Ads conduit and made revenue decisions on Sealmetrics.",
          href: "/case-studies/palladium-hotel-group",
          linkLabel: "Read the full Palladium case study",
        },
        gapStats: [
          { n: "$50–175K+", label: "Annual cost", detail: "Quote-based, scales with event volume. Billed annually upfront." },
          { n: "40–60%", label: "Still cookie-dependent", detail: "Same consent rejection loss as free GA4." },
          { n: "US-hosted", label: "Schrems II exposure", detail: "EU data transfers to Google infrastructure." },
          { n: "12 months", label: "Minimum contract", detail: "Annual lock-in. Negotiation via Google sales." },
        ],
        comparison: [
          { category: "Pricing", block: "commercial", rows: [
            { feature: "Starting price", them: "Quote-based · from ~$50,000/yr, scales with events", us: "€499/mo · published · no annual commit" },
            { feature: "Billing model", them: "Enterprise sales negotiation", us: "Self-serve · transparent pricing" },
            { feature: "Contract length", them: "12-month minimum", us: "Monthly or annual (2 months free)" },
          ]},
          { category: "Data capture", block: "technical", rows: [
            { feature: "Cookie-dependent", them: "Yes", us: "No · cookieless by design" },
            { feature: "Consent required", them: "Yes · 40–60% reject in EU", us: "No · not reduced by consent" },
            { feature: "Sampling", them: "Above thresholds", us: "Zero sampling" },
          ]},
          { category: "Infrastructure", block: "technical", rows: [
            { feature: "Data residency", them: "US · Google infra", us: "EU · Dublin, Ireland" },
            { feature: "Schrems II", them: "Exposed", us: "Clean" },
            { feature: "BigQuery export", them: "Included · raised daily export limit over free GA4", us: "Full resolution · no limits" },
          ]},
          { category: "AI & modern stack", block: "reporting", rows: [
            { feature: "MCP server", them: "Official server · experimental, read-only", us: "Native · managed · read and act" },
            { feature: "What the agent can read", them: "Post-consent subset", us: "Events without consent gaps" },
            { feature: "Report latency", them: "Realtime report is core · standard reports lag 24–48 h", us: "< 2 minutes · all plans" },
          ]},
          { category: "Tracker performance (measured)", block: "technical", rows: [
            { feature: "Script weight on the wire (gzip)", them: "~146 KB · same gtag.js as free GA4", us: "1.1 KB · ~132× lighter" },
            { feature: "JavaScript parsed on the device", them: "~409 KB", us: "2.0 KB" },
            { feature: "Pageview hit secured", them: "~0.5–0.7 s best case · only after consent", us: "~0.1–0.3 s · sendBeacon from the head" },
          ]},
          { category: "Where GA360 is the better choice", block: "commercial", rows: [
            { feature: "Google Ads and DV360", them: "Native bidding signals and conversion import", us: "Via BigQuery export — not a bidding source" },
            { feature: "Audiences and remarketing", them: "Its real strength", us: "Not a remarketing tool — no personal identifiers by design" },
            { feature: "Ecosystem and hiring", them: "Every analyst already knows the interface", us: "New interface · founder-led onboarding" },
          ]},
          { category: "Customer success", block: "commercial", rows: [
            { feature: "Onboarding", them: "Google sales + certified partners", us: "Founder-led · 15-minute install" },
            { feature: "Support", them: "Enterprise SLAs · via resellers", us: "Direct support on every plan" },
          ]},
          { category: "Reporting parity", block: "reporting", rows: [
            { feature: "Standard reports", them: "Same GA4 interface · 24–48 h processing lag", us: "Decision-ready defaults · real-time" },
            { feature: "Custom analysis", them: "Explorations · sampling relief only in BigQuery", us: "Segments + property breakdowns · unsampled" },
            { feature: "Audiences & remarketing", them: "Yes · its real strength", us: "Not a remarketing tool — no personal identifiers by design" },
          ]},
        ],
        faqs: [
          { q: "Isn't GA360 more accurate than free GA4?", a: "Only on certain dimensions. GA360 removes sampling thresholds on BigQuery export and adds some advanced features, but uses the same cookie + consent architecture. Your 40–60% consent rejection loss is identical. Premium GA4 = premium incomplete data." },
          { q: "What about GA360's enterprise features?", a: "GA360 adds SLAs, dedicated support and custom data retention. Sealmetrics Enterprise includes the same — plus isolated processing, custom DPA and a dedicated account manager. At a fraction of the cost." },
          { q: "Can we migrate gradually from GA360?", a: "Yes. Run both in parallel. Most customers keep GA360 for Google Ads integration during the transition and move strategic reporting to Sealmetrics. Usually takes 60–90 days to fully decommission GA360." },
          { q: "Is there a way to compare costs directly?", a: "Yes, and it depends where your event volume lands, because GA360 is quote-based. A typical large eCommerce at 15M events/month sits at GA360's entry tier — around $50K/yr against Sealmetrics Scale at €10,788/yr, roughly 75–80% cheaper. Mid-market GA360 contracts commonly land between $100K and $175K, where the gap widens past 90%. Google does not publish a self-serve price, so get your own quote and compare it against our published tiers rather than against our estimate." },
        ],
        ctaTitle: <>Get enterprise data. <em className="italic font-medium" style={{ color: "#E8B84B", fontStyle: "italic" }}>Skip the six-figure invoice.</em></>,
        ctaLede: "30-minute walkthrough with the founder. We'll show your GA360 numbers next to Sealmetrics on your own traffic — you see the gap and the savings.",
      },
      es: {
        competitor: "GA360",
        techReportHref: "https://docs.sealmetrics.com/guides/tracker-performance-report",
        hook: "GA360 va por presupuesto y escala con el volumen de eventos — contratos de entrada sobre 50.000$/año, mid-market normalmente 100–175K$. Pagues lo que pagues, la arquitectura de cookies y consentimiento es la de GA4 gratis.",
        eyebrow: "vs Google Analytics 360",
        h1: <>Datos enterprise <em>sin la factura de seis cifras.</em></>,
        lede: "GA360 cuesta entre decenas y cientos de miles al año y sigue perdiendo el mismo 40–60% del tráfico UE que GA4 gratis — porque la capa de recolección es idéntica. Sealmetrics es dato completo, alojado en UE, desde €499/mes.",
        tldr: {
          answer: (
            <>
              GA360 es el tier enterprise de Google Analytics: SLAs,
              soporte dedicado, retención custom, alivio de muestreo
              en BigQuery — todo envuelto en un compromiso anual por
              presupuesto que escala con el volumen de eventos:{" "}
              <strong>desde unos 50.000$/año</strong> en el tier de
              entrada, normalmente <strong>100–175K$</strong> en
              propiedades mid-market. Debajo, la capa de
              recolección es idéntica a la de GA4 gratuito:
              basada en cookies, requiere consentimiento, alojada en
              EE.UU. En la UE, GA360 pierde el mismo{" "}
              <strong>40–60% de tráfico</strong> que GA4 gratis por
              rechazo de consentimiento y ad-blockers — precio premium,
              datos premium incompletos. Sealmetrics reemplaza la capa
              de medición por <strong>10.788€/año</strong> publicados
              en Scale — una fracción de cualquier contrato GA360 —,
              mide en agregado sin depender del consentimiento y mantiene todo en
              Dublín.
            </>
          ),
          bullets: [
            <>GA360: soporte premium y alivio de muestreo, misma capa de recolección que GA4 gratis.</>,
            <>Sealmetrics: captura completa, procesamiento solo en UE, precio publicado frente a un contrato solo por presupuesto.</>,
            <>La mayoría de equipos mantienen GA360 solo para el import de conversiones de Google Ads y deciden sobre Sealmetrics.</>,
          ],
        },
        caseStudy: {
          eyebrow: "Migró desde un stack Google-Analytics",
          title: <>Cómo Palladium Hotel Group recuperó <em className="italic-accent">el 40% de tráfico no atribuido</em>.</>,
          quote: "Los datos que entrega Sealmetrics son agnósticos, sin sesgo y neutrales. No hay caja negra.",
          quoteAuthor: "Toni Andújar · Digital & Direct Sales Director · Palladium Hotel Group",
          body: "Palladium corrió Sealmetrics junto a su stack GA-tier existente. La auditoría reveló un 40% del tráfico entrante sin atribución source/medium, un 35% de reservas sin canal asignado en GA4 y una mejora del +165% en Cost-per-Search en Display una vez el modelo de medición de Sealmetrics dirigió las decisiones de DV360. Mantuvieron GA4 como conducto a Google Ads y tomaron las decisiones de ingresos sobre Sealmetrics.",
          href: "/es/case-studies/palladium-hotel-group",
          linkLabel: "Leer el case study completo de Palladium",
        },
        gapStats: [
          { n: "50–175K$+", label: "Coste anual", detail: "Por presupuesto, escala con el volumen de eventos. Pagado anualmente por adelantado." },
          { n: "40–60%", label: "Sigue con cookies", detail: "Misma pérdida por rechazo de consentimiento que GA4." },
          { n: "US-hosted", label: "Exposición Schrems II", detail: "Transferencias UE a infra Google." },
          { n: "12 meses", label: "Contrato mínimo", detail: "Lock-in anual. Negociación vía Google sales." },
        ],
        comparison: [
          { category: "Precio", block: "commercial", rows: [
            { feature: "Precio de entrada", them: "Por presupuesto · desde ~50.000$/año, escala con eventos", us: "€499/mes · publicado · sin compromiso anual" },
            { feature: "Modelo facturación", them: "Negociación enterprise sales", us: "Self-serve · precio transparente" },
            { feature: "Duración contrato", them: "Mínimo 12 meses", us: "Mensual o anual (2 meses gratis)" },
          ]},
          { category: "Captura de datos", block: "technical", rows: [
            { feature: "Depende de cookies", them: "Sí", us: "No · sin cookies por diseño" },
            { feature: "Consentimiento", them: "Sí · 40–60% rechaza en UE", us: "No · sin pérdida por consentimiento" },
            { feature: "Muestreo", them: "Sobre umbrales", us: "Cero muestreo" },
          ]},
          { category: "Infraestructura", block: "technical", rows: [
            { feature: "Residencia de datos", them: "US · infra Google", us: "UE · Dublín, Irlanda" },
            { feature: "Schrems II", them: "Expuesto", us: "Limpio" },
            { feature: "Export BigQuery", them: "Incluido · límite diario de export más alto que GA4 gratis", us: "Resolución completa · sin límites" },
          ]},
          { category: "IA y stack moderno", block: "reporting", rows: [
            { feature: "MCP server", them: "Servidor oficial · experimental, solo lectura", us: "Nativo · gestionado · lee y actúa" },
            { feature: "Qué puede leer el agente", them: "Subconjunto post-consentimiento", us: "Eventos sin huecos de consentimiento" },
            { feature: "Latencia de informes", them: "El informe Realtime es core · los estándar tardan 24–48 h", us: "< 2 minutos · todos los planes" },
          ]},
          { category: "Rendimiento del tracker (medido)", block: "technical", rows: [
            { feature: "Peso del script en red (gzip)", them: "~146 KB · el mismo gtag.js que GA4 gratis", us: "1,1 KB · ~132× más ligero" },
            { feature: "JavaScript parseado en el dispositivo", them: "~409 KB", us: "2,0 KB" },
            { feature: "Pageview asegurado", them: "~0,5–0,7 s mejor caso · solo tras consentimiento", us: "~0,1–0,3 s · sendBeacon desde el head" },
          ]},
          { category: "Dónde GA360 es la mejor opción", block: "commercial", rows: [
            { feature: "Google Ads y DV360", them: "Señales de puja e import de conversiones nativos", us: "Vía export BigQuery — no es fuente de puja" },
            { feature: "Audiencias y remarketing", them: "Su verdadera fortaleza", us: "No es herramienta de remarketing — sin identificadores personales por diseño" },
            { feature: "Ecosistema y contratación", them: "Cualquier analista ya conoce la interfaz", us: "Interfaz nueva · onboarding con el founder" },
          ]},
          { category: "Customer success", block: "commercial", rows: [
            { feature: "Onboarding", them: "Google sales + partners certificados", us: "Liderado por el founder · instalación en 15 min" },
            { feature: "Soporte", them: "SLAs enterprise · vía resellers", us: "Soporte directo en todos los planes" },
          ]},
          { category: "Paridad de reporting", block: "reporting", rows: [
            { feature: "Informes estándar", them: "Misma interfaz GA4 · 24–48 h de retraso", us: "Listos por defecto · tiempo real" },
            { feature: "Análisis custom", them: "Explorations · alivio de muestreo solo en BigQuery", us: "Segmentos + breakdowns por propiedad · sin muestreo" },
            { feature: "Audiencias y remarketing", them: "Sí · su verdadera fortaleza", us: "No es una herramienta de remarketing — sin identificadores personales por diseño" },
          ]},
        ],
        faqs: [
          { q: "¿No es GA360 más preciso que GA4?", a: "Solo en ciertas dimensiones. GA360 quita umbrales de muestreo en export BigQuery y añade features avanzadas, pero usa la misma arquitectura cookies + consentimiento. Tu 40–60% de pérdida por consentimiento es idéntico. GA4 premium = datos premium incompletos." },
          { q: "¿Y las features enterprise de GA360?", a: "GA360 añade SLAs, soporte dedicado y retención custom. Sealmetrics Enterprise incluye lo mismo — más procesamiento aislado, DPA custom y account manager dedicado. A una fracción del coste." },
          { q: "¿Podemos migrar gradualmente desde GA360?", a: "Sí. Corre ambos en paralelo. La mayoría de clientes mantienen GA360 para integración Google Ads durante la transición y mueven el reporting estratégico a Sealmetrics. Suele tardar 60–90 días retirar GA360 del todo." },
          { q: "¿Hay forma de comparar costes directamente?", a: "Sí, y depende de dónde caiga tu volumen de eventos, porque GA360 va por presupuesto. Un eCommerce grande típico con 15M eventos/mes está en el tier de entrada de GA360 — unos 50K$/año frente a los 10.788€/año de Sealmetrics Scale, un 75–80% más barato. Los contratos GA360 mid-market suelen quedar entre 100K$ y 175K$, donde la diferencia pasa del 90%. Google no publica precio self-serve, así que pide tu presupuesto y compáralo con nuestros tiers publicados en vez de con nuestra estimación." },
        ],
        ctaTitle: <>Consigue dato enterprise. <em className="italic font-medium" style={{ color: "#E8B84B", fontStyle: "italic" }}>Sáltate la factura de seis cifras.</em></>,
        ctaLede: "Walkthrough de 30 min con el founder. Te enseñamos tus números de GA360 junto a Sealmetrics sobre tu propio tráfico — ves el gap y el ahorro.",
      },
    },
    "adobe-analytics": {
      en: {
        competitor: "Adobe Analytics",
        techReportHref: "https://docs.sealmetrics.com/guides/tracker-performance-adobe-analytics",
        hook: "Adobe Analytics is powerful for enterprise reporting but requires specialists, enterprise contracts and the same consent-dependent data capture. In 2026, power tools working on incomplete data are a liability.",
        eyebrow: "vs Adobe Analytics",
        h1: <>Enterprise power. <em>Zero enterprise overhead.</em></>,
        lede: "Adobe Analytics delivers depth at the cost of complexity: dedicated analysts, implementation consultants and unpublished annual contracts that run from around $50K to $200K+. Sealmetrics delivers complete data with no specialists required — from €499/mo.",
        tldr: {
          answer: (
            <>
              Adobe Analytics is a powerful enterprise reporting suite —
              segmentation depth, calculated metrics, Customer Journey
              Analytics stitching. Three frictions show up in every
              vendor review: an unpublished base licence that runs from
              around <strong>$50K/year</strong> for Select to{" "}
              <strong>$200K+</strong> for Ultimate, a{" "}
              <strong>3–6 month</strong> implementation billed separately
              at $20–100K, and a dedicated
              Adobe-certified analyst on staff. Under all of it, the
              AppMeasurement collection layer is still cookie-based and
              consent-gated — the EU traffic gap is unchanged. Sealmetrics
              replaces the measurement layer (complete capture, EU-only,
              from €499/mo) and lets Adobe do what it does best on
              complete data instead of incomplete.
            </>
          ),
          bullets: [
            <>Adobe: deep segmentation and CJA stitching for enterprise reporting.</>,
            <>Sealmetrics: complete EU data capture, no consultants, decision-ready in week one.</>,
            <>Run both — Adobe for analyst-driven deep dives, Sealmetrics for the board number that reconciles.</>,
          ],
        },
        caseStudy: {
          eyebrow: "Switched from a GA-tier enterprise stack",
          title: <>How Palladium Hotel Group made <em className="italic-accent">enterprise reporting unnecessary</em>.</>,
          quote: "The data Sealmetrics delivers is agnostic, unbiased and neutral. There's no black box.",
          quoteAuthor: "Toni Andújar · Digital & Direct Sales Director · Palladium Hotel Group",
          body: "Palladium ran Sealmetrics alongside their enterprise GA-tier stack. The audit surfaced 40% of inbound traffic with no source/medium attribution, 35% of bookings unassigned to a channel, and a +165% Cost-per-Search improvement on Display once the Sealmetrics measurement model drove DV360 decisions. They kept their existing reporting tools for deep dives and moved revenue decisions to Sealmetrics.",
          href: "/case-studies/palladium-hotel-group",
          linkLabel: "Read the full Palladium case study",
        },
        gapStats: [
          { n: "$50–200K+", label: "Annual cost", detail: "Unpublished, by tier and volume. Plus $20–100K implementation consulting." },
          { n: "3–6 months", label: "Implementation", detail: "Typical time to first value." },
          { n: "+25%", label: "Measured traffic gap", detail: "30-day parallel run on a European media site. Losses beyond consent: blockers + a ~3 s hit window." },
          { n: "40–60%", label: "Still consent-gated", detail: "Cookie-dependent capture. Same EU gap as GA." },
        ],
        comparison: [
          { category: "Pricing & time to value", block: "commercial", rows: [
            { feature: "Starting price", them: "Unpublished · Select from ~$50,000/yr + implementation fees", us: "€499/mo · published · no hidden fees" },
            { feature: "Implementation time", them: "3–6 months typical", us: "1 week to decision-ready" },
            { feature: "Required specialists", them: "Adobe-certified analyst on team", us: "Self-serve · founder onboarding" },
          ]},
          { category: "Data capture", block: "technical", rows: [
            { feature: "Cookie-dependent", them: "Yes · AppMeasurement library", us: "No · first-party server-side" },
            { feature: "EU consent rejection handling", them: "Banner-dependent", us: "Not applicable (no cookies)" },
            { feature: "Sampling", them: "No sampling on standard reporting · large Workspace queries can be estimated", us: "Zero sampling" },
          ]},
          { category: "Tracker performance (measured)", block: "technical", rows: [
            { feature: "Script weight on the wire (gzip)", them: "~170 KB · Launch + AppMeasurement", us: "1.1 KB · ~155× lighter" },
            { feature: "JavaScript parsed on the device", them: "~730 KB", us: "2.0 KB" },
            { feature: "Pageview hit secured", them: "~3.0 s · field-measured on a dual-vendor site", us: "~0.1–0.3 s · sendBeacon from the head" },
            { feature: "Hit transport", them: "Image GET · canceled if the visitor leaves early", us: "sendBeacon · survives page close" },
          ]},
          { category: "Infrastructure", block: "technical", rows: [
            { feature: "Data residency", them: "Configurable but complex", us: "EU-only · Dublin" },
            { feature: "Schrems II", them: "Requires separate legal review", us: "Clean by architecture" },
          ]},
          { category: "Modern stack", block: "reporting", rows: [
            { feature: "MCP / AI-native", them: "Official MCP servers for Adobe Analytics and CJA", us: "Native · managed · all plans" },
            { feature: "What the agent can read", them: "Post-consent subset", us: "Events without consent gaps" },
            { feature: "Warehouse export", them: "Data Feeds / Data Warehouse · CJA for cross-channel", us: "Native BigQuery export · included in all plans" },
          ]},
          { category: "Where Adobe is the better choice", block: "commercial", rows: [
            { feature: "Segmentation depth", them: "The deepest in the category · Analysis Workspace", us: "Segments + property breakdowns · deep dives via BigQuery" },
            { feature: "Experience Cloud orchestration", them: "Target, Campaign, AEM in one stack", us: "Analytics only — not a marketing suite" },
            { feature: "Cross-channel stitching", them: "Customer Journey Analytics", us: "Not attempted — aggregate event measurement by design" },
          ]},
          { category: "Customer success", block: "commercial", rows: [
            { feature: "Onboarding", them: "Implementation partners · consultant-led", us: "Founder-led · 15-minute install" },
            { feature: "Support", them: "Tiered enterprise support plans", us: "Direct support on every plan" },
            { feature: "Account management", them: "Enterprise account teams", us: "Dedicated manager on Enterprise" },
          ]},
          { category: "Reporting parity", block: "reporting", rows: [
            { feature: "Prebuilt marketing reports", them: "Analysis Workspace — you build everything", us: "Channels, campaigns, funnels, pages — ready by default" },
            { feature: "Deep segmentation", them: "Its real strength · analyst-driven", us: "Segments + property breakdowns · deep dives via BigQuery" },
            { feature: "Calculated metrics", them: "Yes · in Workspace", us: "Via BigQuery export + MCP" },
            { feature: "Report freshness", them: "Minutes to hours depending on report type", us: "Real-time · under 2 minutes" },
            { feature: "Audience activation / remarketing", them: "Experience Cloud integration", us: "Not a remarketing tool — no personal identifiers by design" },
          ]},
        ],
        faqs: [
          { q: "Adobe has far more features. Are you comparing apples to apples?", a: "For most eCommerce teams, Adobe Analytics' depth is unused. The 80% of features you need — channel attribution, funnel analysis, campaign reporting, BigQuery export — Sealmetrics covers with complete data and no specialists. If you genuinely need Adobe's segmentation depth, Customer Journey Analytics is where it happens; we'd recommend keeping it and adding Sealmetrics for complete data capture." },
          { q: "Can Sealmetrics coexist with Adobe Experience Cloud?", a: "Yes. Sealmetrics operates independently. Many enterprise customers run both — Adobe for deep segmentation, Sealmetrics for complete data capture and the truth number shared across agencies and finance." },
          { q: "What about Customer Journey Analytics?", a: "CJA is Adobe's newer tool for cross-channel stitching. It still depends on the same AppMeasurement collection layer — same consent rejection loss. Sealmetrics provides complete capture; your CJA does more interesting analytics on complete data instead of incomplete." },
          { q: "How much more traffic does Sealmetrics actually measure vs Adobe?", a: "In a 30-day parallel run on a European media site (June 2026), Sealmetrics measured +25% pageviews over Adobe Analytics — a stable ratio across the whole month, with Adobe firing without a consent gate. The gap comes from losses beyond consent: privacy filter lists blocking Adobe's collection endpoints, a pageview that fires ~3 seconds into the load (field-measured — any visit that bounces earlier never existed for Adobe), and an image-GET transport that is canceled when the visitor leaves. Where Adobe sits behind a consent banner, the gap grows further." },
          { q: "How hard is migration?", a: "No migration. Both tools run in parallel. Decide per use case where each serves best. Most teams move acquisition + attribution reporting to Sealmetrics and keep Adobe for enterprise segmentation and email orchestration." },
        ],
        ctaTitle: <>Skip the <em className="italic font-medium" style={{ color: "#E8B84B", fontStyle: "italic" }}>6-month implementation.</em></>,
        ctaLede: "30 minutes with the founder. Sealmetrics installed in 15 minutes. Decision-ready in week one. No consultants, no specialists, no six-figure invoice.",
      },
      es: {
        competitor: "Adobe Analytics",
        techReportHref: "https://docs.sealmetrics.com/guides/tracker-performance-adobe-analytics",
        hook: "Adobe Analytics es potente para reporting enterprise pero requiere especialistas, contratos enterprise y la misma captura de datos dependiente del consentimiento. En 2026, herramientas potentes sobre datos incompletos son una liability.",
        eyebrow: "vs Adobe Analytics",
        h1: <>Potencia enterprise. <em>Cero overhead enterprise.</em></>,
        lede: "Adobe Analytics da profundidad a coste de complejidad: analistas dedicados, consultores de implementación y contratos anuales no publicados que van de unos 50K$ a 200K$+. Sealmetrics da dato completo sin especialistas — desde €499/mes.",
        tldr: {
          answer: (
            <>
              Adobe Analytics es una suite potente de reporting
              enterprise — profundidad de segmentación, métricas
              calculadas, stitching cross-canal de Customer Journey
              Analytics. Tres fricciones aparecen en cada revisión de
              vendor: una licencia base no publicada que va de unos{" "}
              <strong>50K$/año</strong> en Select a{" "}
              <strong>200K$+</strong> en Ultimate, una implementación de{" "}
              <strong>3–6 meses</strong> facturada aparte a 20–100K$, y un analista
              certificado en Adobe en plantilla. Debajo de todo, la capa
              de recolección AppMeasurement sigue siendo basada en
              cookies y dependiente de consentimiento — el gap UE no
              cambia. Sealmetrics reemplaza la capa de medición (captura
              completa, sólo UE, desde €499/mes) y deja que Adobe haga
              lo que mejor hace sobre dato completo en lugar de
              incompleto.
            </>
          ),
          bullets: [
            <>Adobe: segmentación profunda y stitching CJA para reporting enterprise.</>,
            <>Sealmetrics: captura UE completa, sin consultores, listo para decidir en semana uno.</>,
            <>Corre ambos — Adobe para deep dives liderados por analista, Sealmetrics para el número del board que cuadra.</>,
          ],
        },
        caseStudy: {
          eyebrow: "Migró desde un stack enterprise tipo GA",
          title: <>Cómo Palladium Hotel Group hizo <em className="italic-accent">innecesario el reporting enterprise</em>.</>,
          quote: "Los datos que entrega Sealmetrics son agnósticos, sin sesgo y neutrales. No hay caja negra.",
          quoteAuthor: "Toni Andújar · Digital & Direct Sales Director · Palladium Hotel Group",
          body: "Palladium corrió Sealmetrics junto a su stack enterprise GA-tier. La auditoría reveló un 40% del tráfico entrante sin atribución source/medium, un 35% de reservas sin canal asignado y una mejora del +165% en Cost-per-Search en Display una vez el modelo de medición de Sealmetrics dirigió las decisiones de DV360. Mantuvieron sus herramientas existentes para deep dives y movieron las decisiones de ingresos a Sealmetrics.",
          href: "/es/case-studies/palladium-hotel-group",
          linkLabel: "Leer el case study completo de Palladium",
        },
        gapStats: [
          { n: "50–200K$+", label: "Coste anual", detail: "No publicado, por tier y volumen. Más 20–100K$ de consultoría de implementación." },
          { n: "3–6 meses", label: "Implementación", detail: "Tiempo típico al primer valor." },
          { n: "+25%", label: "Gap de tráfico medido", detail: "30 días en paralelo en un medio europeo. Pérdidas más allá del consentimiento: blockers + ventana de hit de ~3 s." },
          { n: "40–60%", label: "Sigue con consentimiento", detail: "Captura dependiente de cookies. Mismo gap UE que GA." },
        ],
        comparison: [
          { category: "Precio y tiempo al valor", block: "commercial", rows: [
            { feature: "Precio de entrada", them: "No publicado · Select desde ~50.000$/año + fees implementación", us: "€499/mes · publicado · sin fees ocultos" },
            { feature: "Tiempo implementación", them: "3–6 meses típicamente", us: "1 semana a decisiones" },
            { feature: "Especialistas requeridos", them: "Analista certificado Adobe", us: "Self-serve · onboarding founder" },
          ]},
          { category: "Captura de datos", block: "technical", rows: [
            { feature: "Depende de cookies", them: "Sí · librería AppMeasurement", us: "No · first-party server-side" },
            { feature: "Manejo rechazo UE", them: "Dependiente de banner", us: "No aplica (sin cookies)" },
            { feature: "Muestreo", them: "Sin muestreo en reporting estándar · consultas grandes en Workspace pueden estimarse", us: "Cero muestreo" },
          ]},
          { category: "Rendimiento del tracker (medido)", block: "technical", rows: [
            { feature: "Peso del script en red (gzip)", them: "~170 KB · Launch + AppMeasurement", us: "1,1 KB · ~155× más ligero" },
            { feature: "JavaScript parseado en el dispositivo", them: "~730 KB", us: "2,0 KB" },
            { feature: "Pageview asegurado", them: "~3,0 s · medido en campo en un sitio dual-vendor", us: "~0,1–0,3 s · sendBeacon desde el head" },
            { feature: "Transporte del hit", them: "Image GET · se cancela si el visitante se va", us: "sendBeacon · sobrevive al cierre" },
          ]},
          { category: "Infraestructura", block: "technical", rows: [
            { feature: "Residencia", them: "Configurable pero compleja", us: "Solo UE · Dublín" },
            { feature: "Schrems II", them: "Requiere revisión legal aparte", us: "Limpio por arquitectura" },
          ]},
          { category: "Stack moderno", block: "reporting", rows: [
            { feature: "MCP / IA nativa", them: "Servidores MCP oficiales para Adobe Analytics y CJA", us: "Nativo · gestionado · todos los planes" },
            { feature: "Qué puede leer el agente", them: "Subconjunto post-consentimiento", us: "Eventos sin huecos de consentimiento" },
            { feature: "Export a warehouse", them: "Data Feeds / Data Warehouse · CJA para cross-canal", us: "Export BigQuery nativo · incluido en todos los planes" },
          ]},
          { category: "Dónde Adobe es la mejor opción", block: "commercial", rows: [
            { feature: "Profundidad de segmentación", them: "La mayor de la categoría · Analysis Workspace", us: "Segmentos + breakdowns por propiedad · deep dives vía BigQuery" },
            { feature: "Orquestación Experience Cloud", them: "Target, Campaign y AEM en un stack", us: "Solo analítica — no es una suite de marketing" },
            { feature: "Stitching cross-canal", them: "Customer Journey Analytics", us: "No se intenta — medición agregada de eventos por diseño" },
          ]},
          { category: "Customer success", block: "commercial", rows: [
            { feature: "Onboarding", them: "Partners de implementación · liderado por consultores", us: "Liderado por el founder · instalación en 15 min" },
            { feature: "Soporte", them: "Planes de soporte enterprise por tiers", us: "Soporte directo en todos los planes" },
            { feature: "Account management", them: "Equipos de cuenta enterprise", us: "Manager dedicado en Enterprise" },
          ]},
          { category: "Paridad de reporting", block: "reporting", rows: [
            { feature: "Informes de marketing listos", them: "Analysis Workspace — lo construyes todo tú", us: "Canales, campañas, funnels, páginas — listos por defecto" },
            { feature: "Segmentación profunda", them: "Su verdadera fortaleza · liderada por analista", us: "Segmentos + breakdowns por propiedad · deep dives vía BigQuery" },
            { feature: "Métricas calculadas", them: "Sí · en Workspace", us: "Vía export BigQuery + MCP" },
            { feature: "Frescura del informe", them: "De minutos a horas según el tipo de informe", us: "Tiempo real · menos de 2 minutos" },
            { feature: "Activación de audiencias / remarketing", them: "Integración Experience Cloud", us: "No es una herramienta de remarketing — sin identificadores personales por diseño" },
          ]},
        ],
        faqs: [
          { q: "Adobe tiene muchas más features. ¿Comparación justa?", a: "Para la mayoría de equipos eCommerce, la profundidad de Adobe no se usa. El 80% de lo que necesitas — atribución canal, análisis funnel, reporting campaña, export BigQuery — Sealmetrics lo cubre con datos completos y sin especialistas. Si realmente necesitas la profundidad de segmentación de Adobe, Customer Journey Analytics es donde ocurre; recomendamos mantenerlo y añadir Sealmetrics para la captura completa." },
          { q: "¿Puede coexistir con Adobe Experience Cloud?", a: "Sí. Sealmetrics opera independientemente. Muchos clientes enterprise corren ambos — Adobe para segmentación profunda, Sealmetrics para captura completa y el número verdad compartido con agencias y finanzas." },
          { q: "¿Y Customer Journey Analytics?", a: "CJA es la herramienta más reciente de Adobe para stitching cross-canal. Sigue dependiendo de la misma capa AppMeasurement — misma pérdida por consentimiento. Sealmetrics aporta captura completa; tu CJA hace analítica más interesante sobre datos completos en lugar de incompletos." },
          { q: "¿Cuánto tráfico más mide realmente Sealmetrics vs Adobe?", a: "En 30 días corriendo en paralelo en un medio europeo (junio 2026), Sealmetrics midió un +25% de pageviews sobre Adobe Analytics — con ratio estable todo el mes y con Adobe disparando sin consent-gate. El gap viene de pérdidas más allá del consentimiento: listas de privacidad que bloquean los endpoints de recogida de Adobe, un pageview que dispara a ~3 segundos de la carga (medido en campo — toda visita que rebota antes nunca existió para Adobe) y un transporte image-GET que se cancela cuando el visitante se va. Donde Adobe va detrás de un banner de consentimiento, el gap crece aún más." },
          { q: "¿Qué tan difícil es migrar?", a: "Sin migración. Ambas corren en paralelo. Decides caso a caso dónde encaja cada una. La mayoría mueve reporting de adquisición + atribución a Sealmetrics y mantienen Adobe para segmentación enterprise y orquestación email." },
        ],
        ctaTitle: <>Sáltate la <em className="italic font-medium" style={{ color: "#E8B84B", fontStyle: "italic" }}>implementación de 6 meses.</em></>,
        ctaLede: "30 min con el founder. Sealmetrics instalado en 15 min. Listo para decidir en semana uno. Sin consultores, sin especialistas, sin factura de seis cifras.",
      },
    },
    "piwik-pro": {
      en: {
        competitor: "Piwik PRO",
        techReportHref: "https://docs.sealmetrics.com/guides/tracker-performance-report#matomo-and-piwik-pro",
        techReportLabel: "Read the full technical report (script weight, measured) →",
        hook: "Piwik PRO offers a configurable privacy spectrum: visitor cookies, a 30-minute session hash, or neither. Sealmetrics uses a fixed aggregate model without browser identifiers. The useful comparison is what each configuration can report.",
        eyebrow: "vs Piwik PRO",
        h1: <>Two privacy architectures. <em>Different trade-offs.</em></>,
        lede: "Piwik PRO is a broad suite that lets teams configure identifiers, consent and anonymous collection. Sealmetrics takes a narrower aggregate path: no browser identifiers and last-click campaign and revenue reporting. Compare configuration, reporting depth and governance — not hosting alone.",
        tldr: {
          answer: (
            <>
              Piwik PRO combines analytics, consent management, Tag
              Manager and activation features. It can use visitor
              cookies, a 30-minute session hash, or no identifier at all.
              Piwik PRO documents a clear trade-off: with both identifiers
              disabled, each event becomes a new session and traffic-source
              and channel-attribution reports are unavailable. Sealmetrics
              uses an aggregate, identifier-free model and focuses on
              last-click campaign and revenue reporting. The choice is
              between a configurable suite and a narrower operating model,
              not compliant versus non-compliant analytics.
            </>
          ),
          bullets: [
            <>Piwik PRO: configurable identifiers, consent tooling and broader product scope.</>,
            <>Sealmetrics: aggregate collection without browser identifiers, hosted in Dublin.</>,
            <>Validate the legal basis and reporting trade-offs for your actual implementation.</>,
          ],
        },
        caseStudy: {
          eyebrow: "Switched from a cookie-based EU analytics stack",
          title: <>How Dreamplace Hotels traded <em className="italic-accent">configuration for clarity</em>.</>,
          quote: "What it gives us is what we've always needed: data as real as possible, as close to reality as possible.",
          quoteAuthor: "Eduardo Martin · Analytics & Campaigns · Dreamplace Hotels",
          body: "Dreamplace moved off a cookie-based EU analytics stack to Sealmetrics. Aggregate channel revenue began reconciling with the PMS within the first week. The reporting conversation shifted from \"which number is real\" to which channels actually drove the bookings — the original purpose of analytics, restored.",
          href: "/case-studies/dreamplace-hotels",
          linkLabel: "Read the full Dreamplace case study",
        },
        gapStats: [
          { n: "3 modes", label: "Identifier choices", detail: "Visitor cookies, a 30-minute session hash, or neither." },
          { n: "7 models", label: "Attribution with identifiers", detail: "Piwik PRO lists seven attribution models in its richest identifier mode." },
          { n: "1 event", label: "Privacy-maximized sessions", detail: "With cookies and the session hash off, each event is treated as a new session." },
          { n: "Dublin", label: "Sealmetrics hosting", detail: "Sealmetrics processes analytics data in Ireland using a fixed aggregate model." },
        ],
        comparison: [
          { category: "Operating model", block: "commercial", rows: [
            { feature: "Product scope", them: "Analytics + consent management + Tag Manager + activation", us: "Aggregate analytics focused on campaign and revenue decisions" },
            { feature: "Privacy posture", them: "Configurable per site and jurisdiction", us: "Fixed identifier-free collection model" },
            { feature: "Implementation decision", them: "Choose identifiers, consent behavior and hosting", us: "Define observed events and reporting needs" },
          ]},
          { category: "Data capture", block: "technical", rows: [
            { feature: "Visitor cookies", them: "Optional", us: "Not used" },
            { feature: "Session hash", them: "Optional · 30-minute lifetime", us: "Not used" },
            { feature: "Consent handling", them: "Built-in or third-party; behavior depends on configuration", us: "No browser identifiers; legal assessment still depends on purpose and implementation" },
          ]},
          { category: "Infrastructure", block: "technical", rows: [
            { feature: "Data residency", them: "Multiple public and private cloud locations, including EU options", us: "Dublin, Ireland" },
            { feature: "Deployment flexibility", them: "Public cloud and private cloud options", us: "Managed EU-hosted service" },
          ]},
          { category: "Attribution and reporting", block: "reporting", rows: [
            { feature: "With visitor cookies + session hash", them: "Seven listed attribution models and visitor continuity", us: "Not applicable — no visitor identifiers" },
            { feature: "With session hash only", them: "Session recognition and last-click attribution", us: "Last-click on observed aggregate events" },
            { feature: "With neither identifier", them: "Each event is a new session; no traffic-source or channel-attribution report", us: "Campaign and revenue reporting remains part of the aggregate model" },
          ]},
          { category: "Tracker performance (measured)", block: "technical", rows: [
            { feature: "Script weight on the wire (gzip)", them: "~26 KB · ppms.js", us: "1.1 KB · ~24× lighter" },
            { feature: "JavaScript parsed on the device", them: "~67 KB", us: "2.0 KB" },
          ]},
          { category: "Where Piwik PRO is the better choice", block: "commercial", rows: [
            { feature: "Product scope", them: "Analytics + CDP + Tag Manager in one contract", us: "Analytics only — pair with Segment or Rudderstack for CDP" },
            { feature: "Visitor-level analysis", them: "Available when identifiers are enabled and the implementation has a legal basis", us: "Not offered — aggregate event measurement by design" },
            { feature: "Regulated-sector track record", them: "HIPAA options, public-sector deployments", us: "EU-hosted · DPA and TPSR · no sector certification" },
          ]},
          { category: "Customer success", block: "commercial", rows: [
            { feature: "Onboarding", them: "Guided on enterprise contracts", us: "Founder-led · 15-minute install" },
            { feature: "Support", them: "Tiered · SLAs on enterprise", us: "Direct support on every plan" },
          ]},
          { category: "Reporting parity", block: "reporting", rows: [
            { feature: "Prebuilt reports", them: "Full classic reporting UI · mature", us: "Decision-ready defaults · channels, funnels, pages" },
            { feature: "Reporting without identifiers", them: "Documented loss of session continuity, traffic sources and channel attribution", us: "Aggregate reporting without visitor-level profiles" },
            { feature: "Custom analysis", them: "Segments + custom reports", us: "Segments + property breakdowns · BigQuery for deep dives" },
          ]},
        ],
        faqs: [
          { q: "Piwik PRO is also privacy-focused. Why is Sealmetrics different?", a: "Piwik PRO gives administrators a spectrum of modes: visitor cookies, a 30-minute session hash, or no identifiers. Sealmetrics uses one aggregate, identifier-free model. Piwik PRO offers more configuration and broader product scope; Sealmetrics removes that configuration choice and focuses on campaign and revenue reporting." },
          { q: "Can Piwik PRO work without consent?", a: "Piwik PRO documents anonymous configurations, including one with visitor cookies and session hashes disabled. It also says this reduces precision, treats every event as a new session and removes traffic-source and channel-attribution reporting. Whether a consent-free implementation is lawful depends on its purpose, fields, settings and jurisdiction; review it with your privacy team." },
          { q: "What about Piwik PRO's activation features?", a: "That broader scope is a real Piwik PRO advantage. Choose it if you want analytics, consent management, Tag Manager and activation capabilities under one vendor. Sealmetrics is narrower: aggregate measurement and decision workflows for marketing teams." },
          { q: "Can I evaluate both products safely?", a: "Yes. Run both side by side using the Piwik PRO privacy configuration you would actually deploy. Compare observed events, session and attribution availability, campaign and revenue reports, governance work and support. Do not infer the result from vendor-wide capture percentages." },
        ],
        ctaTitle: <>Compare the configuration <em className="italic font-medium" style={{ color: "#E8B84B", fontStyle: "italic" }}>you would actually run.</em></>,
        ctaLede: "Run Sealmetrics and Piwik PRO side by side. Compare observed events, attribution, reporting depth and governance under the same traffic.",
      },
      es: {
        competitor: "Piwik PRO",
        techReportHref: "https://docs.sealmetrics.com/guides/tracker-performance-report#matomo-and-piwik-pro",
        techReportLabel: "Lee el informe técnico completo (peso del script, medido) →",
        hook: "Piwik PRO ofrece varias configuraciones de privacidad: cookies de visitante, un hash de sesión de 30 minutos o ninguno. Sealmetrics utiliza un modelo agregado fijo sin identificadores del navegador. La comparación útil es qué puede reportar cada configuración.",
        eyebrow: "vs Piwik PRO",
        h1: <>Dos arquitecturas de privacidad. <em>Distintos compromisos.</em></>,
        lede: "Piwik PRO es una suite amplia que permite configurar identificadores, consentimiento y recogida anónima. Sealmetrics sigue un camino agregado más estrecho: sin identificadores del navegador y con reporting last-click de campañas e ingresos. Compara configuración, profundidad y gobierno — no solo el hosting.",
        tldr: {
          answer: (
            <>
              Piwik PRO combina analítica, gestión de consentimiento,
              Tag Manager y activación. Puede usar cookies de visitante,
              un hash de sesión de 30 minutos o ningún identificador.
              Piwik PRO documenta el compromiso: con ambos identificadores
              desactivados, cada evento se convierte en una sesión nueva
              y desaparecen los informes de fuente y atribución de canal.
              Sealmetrics usa un modelo agregado sin identificadores y se
              centra en reporting last-click de campañas e ingresos. La
              elección es entre una suite configurable y un modelo más
              estrecho, no entre analítica conforme y no conforme.
            </>
          ),
          bullets: [
            <>Piwik PRO: identificadores configurables, gestión de consentimiento y mayor alcance.</>,
            <>Sealmetrics: recogida agregada sin identificadores del navegador, alojada en Dublín.</>,
            <>Valida la base legal y los límites del reporting de tu implementación real.</>,
          ],
        },
        caseStudy: {
          eyebrow: "Migró desde un stack EU basado en cookies",
          title: <>Cómo Dreamplace Hotels cambió <em className="italic-accent">configuración por claridad</em>.</>,
          quote: "Lo que nos aporta es lo que hemos necesitado siempre: el dato lo más real posible y lo más próximo a la realidad.",
          quoteAuthor: "Eduardo Martin · Analytics & Campaigns · Dreamplace Hotels",
          body: "Dreamplace migró desde un stack EU basado en cookies a Sealmetrics. Los ingresos agregados por canal empezaron a cuadrar con el PMS en la primera semana. La conversación de reporting pasó de \"qué número es real\" a qué canales realmente generaron las reservas — el propósito original de la analítica, restaurado.",
          href: "/es/case-studies/dreamplace-hotels",
          linkLabel: "Leer el case study completo de Dreamplace",
        },
        gapStats: [
          { n: "3 modos", label: "Opciones de identificador", detail: "Cookies, hash de sesión de 30 minutos o ninguno." },
          { n: "7 modelos", label: "Atribución con identificadores", detail: "Piwik PRO enumera siete modelos en su configuración con más identificadores." },
          { n: "1 evento", label: "Sesiones con máxima privacidad", detail: "Sin cookies ni hash, cada evento se trata como una sesión nueva." },
          { n: "Dublín", label: "Hosting Sealmetrics", detail: "Sealmetrics procesa el dato en Irlanda con un modelo agregado fijo." },
        ],
        comparison: [
          { category: "Modelo operativo", block: "commercial", rows: [
            { feature: "Alcance", them: "Analítica + consentimiento + Tag Manager + activación", us: "Analítica agregada para decisiones de campañas e ingresos" },
            { feature: "Privacidad", them: "Configurable por sitio y jurisdicción", us: "Recogida fija sin identificadores" },
            { feature: "Decisión de implementación", them: "Elegir identificadores, consentimiento y hosting", us: "Definir eventos observados y reporting" },
          ]},
          { category: "Captura de datos", block: "technical", rows: [
            { feature: "Cookies de visitante", them: "Opcionales", us: "No se usan" },
            { feature: "Hash de sesión", them: "Opcional · duración de 30 minutos", us: "No se usa" },
            { feature: "Consentimiento", them: "Integrado o externo; depende de la configuración", us: "Sin identificadores del navegador; la valoración legal depende de finalidad e implementación" },
          ]},
          { category: "Infraestructura", block: "technical", rows: [
            { feature: "Residencia", them: "Varias ubicaciones públicas y privadas, incluidas opciones UE", us: "Dublín, Irlanda" },
            { feature: "Flexibilidad de despliegue", them: "Cloud pública y privada", us: "Servicio gestionado alojado en la UE" },
          ]},
          { category: "Atribución y reporting", block: "reporting", rows: [
            { feature: "Con cookies + hash", them: "Siete modelos enumerados y continuidad de visitante", us: "No aplica — no hay identificadores de visitante" },
            { feature: "Solo con hash", them: "Reconocimiento de sesión y atribución last-click", us: "Last-click sobre eventos agregados observados" },
            { feature: "Sin identificadores", them: "Cada evento es una sesión; sin informes de fuente ni atribución de canal", us: "El reporting agregado de campañas e ingresos forma parte del modelo" },
          ]},
          { category: "Rendimiento del tracker (medido)", block: "technical", rows: [
            { feature: "Peso del script en red (gzip)", them: "~26 KB · ppms.js", us: "1,1 KB · ~24× más ligero" },
            { feature: "JavaScript parseado en el dispositivo", them: "~67 KB", us: "2,0 KB" },
          ]},
          { category: "Dónde Piwik PRO es la mejor opción", block: "commercial", rows: [
            { feature: "Alcance de producto", them: "Analytics + CDP + Tag Manager en un contrato", us: "Solo analítica — combina con Segment o Rudderstack para CDP" },
            { feature: "Análisis a nivel de visitante", them: "Disponible con identificadores y una base legal para la implementación", us: "No se ofrece — medición agregada por diseño" },
            { feature: "Trayectoria en sectores regulados", them: "Opciones HIPAA, despliegues en sector público", us: "Alojado en UE · DPA y TPSR · sin certificación sectorial" },
          ]},
          { category: "Customer success", block: "commercial", rows: [
            { feature: "Onboarding", them: "Guiado en contratos enterprise", us: "Liderado por el founder · instalación en 15 min" },
            { feature: "Soporte", them: "Por tiers · SLAs en enterprise", us: "Soporte directo en todos los planes" },
          ]},
          { category: "Paridad de reporting", block: "reporting", rows: [
            { feature: "Informes listos", them: "UI de reporting clásica completa · madura", us: "Listos por defecto · canales, funnels, páginas" },
            { feature: "Reporting sin identificadores", them: "Pérdida documentada de continuidad, fuentes y atribución de canal", us: "Reporting agregado sin perfiles de visitante" },
            { feature: "Análisis custom", them: "Segmentos + informes custom", us: "Segmentos + breakdowns por propiedad · BigQuery para deep dives" },
          ]},
        ],
        faqs: [
          { q: "Piwik PRO también se centra en privacidad. ¿Qué cambia?", a: "Piwik PRO ofrece un espectro: cookies, hash de sesión de 30 minutos o ningún identificador. Sealmetrics usa un solo modelo agregado sin identificadores. Piwik PRO aporta más configuración y alcance; Sealmetrics elimina esa decisión y se centra en reporting de campañas e ingresos." },
          { q: "¿Puede Piwik PRO funcionar sin consentimiento?", a: "Piwik PRO documenta configuraciones anónimas, incluida una sin cookies ni hash. También indica que reduce la precisión, trata cada evento como sesión nueva y elimina los informes de fuente y atribución de canal. Que la implementación pueda operar sin consentimiento depende de su finalidad, campos, ajustes y jurisdicción; revísalo con tu equipo de privacidad." },
          { q: "¿Y las funciones de activación de Piwik PRO?", a: "Ese alcance es una ventaja real de Piwik PRO. Elígelo si quieres analítica, consentimiento, Tag Manager y activación con un proveedor. Sealmetrics es más estrecho: medición agregada y flujos de decisión para marketing." },
          { q: "¿Puedo evaluar ambos productos con seguridad?", a: "Sí. Ejecútalos en paralelo con la configuración de privacidad de Piwik PRO que usarías de verdad. Compara eventos observados, sesiones y atribución disponibles, reporting, trabajo de gobierno y soporte. No deduzcas el resultado de porcentajes globales de captura." },
        ],
        ctaTitle: <>Compara la configuración <em className="italic font-medium" style={{ color: "#E8B84B", fontStyle: "italic" }}>que usarías de verdad.</em></>,
        ctaLede: "Ejecuta Sealmetrics y Piwik PRO en paralelo. Compara eventos, atribución, reporting y gobierno sobre el mismo tráfico.",
      },
    },
    matomo: {
      en: {
        competitor: "Matomo",
        techReportHref: "https://docs.sealmetrics.com/guides/tracker-performance-report#matomo-and-piwik-pro",
        techReportLabel: "Read the full technical report (script weight, measured) →",
        hook: "Matomo is open-source, EU-friendly, and it can run banner-free in France under the CNIL criteria. Read what that configuration costs: UTM and campaign parameters stripped, eCommerce tracking recommended off, visit-level reports disabled — and it does not travel to Germany.",
        eyebrow: "vs Matomo",
        h1: <>Open-source is great. <em>The exemption costs you the UTMs.</em></>,
        lede: "Matomo (Cloud or self-hosted) is the most credible open-source analytics in Europe, and unlike most privacy tools it can drop the banner in France under the CNIL exemption criteria. The configuration that earns it strips campaign parameters, disables visit-level reporting and recommends turning eCommerce tracking off — and Germany's TDDDG §25 does not recognise it. Sealmetrics keeps campaign and revenue data intact in every EU market — from €499/mo, no devops required.",
        tldr: {
          answer: (
            <>
              Matomo is the most credible open-source analytics in
              Europe — Cloud or self-hosted, GDPR-aware, plugin
              ecosystem. Two architectural realities: cookies are on
              by default, and running without a banner means adopting a
              consent-exempt configuration — permitted under{" "}
              <Link href="/gdpr-analytics/france" className="underline underline-offset-2">
                France&rsquo;s CNIL criteria
              </Link>
              , not under Germany&rsquo;s TDDDG §25. That
              configuration is the part worth reading: it{" "}
              <strong>strips UTM and campaign parameters</strong>, cuts
              referrers to the domain, disables visit-level reports and
              APIs, turns off cross-domain tracking, and recommends
              disabling eCommerce tracking altogether. For an eCommerce
              running paid media, that removes the data the analytics
              was bought for — on top of the returning-visitor
              recognition and multi-session attribution that cookieless
              mode already costs. Self-hosting is &ldquo;free on the
              licence&rdquo; but typically costs <strong>€15–40K/year</strong>{" "}
              in operations once you account for servers, security
              patches, plugin maintenance and on-call. Sealmetrics is
              cookieless across the entire product, fully managed,
              EU-hosted in Dublin, with native MCP and BigQuery — from
              €499/mo, no devops required. We wrote up the full legal
              picture in{" "}
              <Link href="/blog/is-matomo-gdpr-compliant" className="underline underline-offset-2">
                Is Matomo GDPR compliant?
              </Link>
            </>
          ),
          bullets: [
            <>Cookies on by default; no banner only under a consent-exempt configuration that strips UTMs and visit-level data.</>,
            <>The exemption is national: CNIL criteria in France, not Germany&rsquo;s TDDDG §25.</>,
            <>Sealmetrics: cookieless across the whole product, campaigns intact everywhere, zero ops.</>,
          ],
        },
        caseStudy: {
          eyebrow: "Replaced a DIY analytics stack",
          title: <>How Dreamplace Hotels traded <em className="italic-accent">DIY ops for clarity</em>.</>,
          quote: "What it gives us is what we've always needed: data as real as possible, as close to reality as possible.",
          quoteAuthor: "Eduardo Martin · Analytics & Campaigns · Dreamplace Hotels",
          body: "Dreamplace moved to Sealmetrics from a DIY analytics setup. Aggregate channel revenue began reconciling with the PMS within the first week. No servers to patch, no plugins to maintain, no cookie banner to defend — just channel performance reconciled to the booking ledger, on day one.",
          href: "/case-studies/dreamplace-hotels",
          linkLabel: "Read the full Dreamplace case study",
        },
        gapStats: [
          { n: "UTMs stripped", label: "Price of the exempt configuration", detail: "Campaign parameters removed, referrers cut to the domain, visit-level reports off." },
          { n: "France only", label: "Where the exemption travels", detail: "CNIL criteria are national. Germany's TDDDG §25 does not recognise them." },
          { n: "Self-host", label: "DevOps overhead", detail: "Servers, backups, security patches, scaling — your team's time." },
          { n: "Add-on", label: "MCP is a plugin", detail: "Matomo MCP shipped in 2026 as an installable plugin — layered on data the exempt configuration has already thinned." },
        ],
        comparison: [
          { category: "Consent & exemption", block: "technical", rows: [
            { feature: "Runs without a consent banner", them: "Yes in France · consent-exempt configuration (CNIL criteria)", us: "Yes · every market · no configuration required" },
            { feature: "Geographic scope", them: "France. Not under Germany's TDDDG §25", us: "All EU markets" },
            { feature: "UTM / campaign parameters in exempt mode", them: "Stripped", us: "Retained · full channel attribution" },
            { feature: "eCommerce tracking in exempt mode", them: "Recommended off · order IDs anonymised if kept", us: "Full revenue measurement" },
            { feature: "Visit-level reports & raw export", them: "Disabled in exempt mode", us: "Aggregate by design · BigQuery export included" },
          ]},
          { category: "Data capture", block: "technical", rows: [
            { feature: "Default mode", them: "Cookies on · no banner only under a consent-exempt configuration (CNIL criteria); banner required in Germany", us: "Cookieless · nothing written to or read from the device" },
            { feature: "Cookieless mode available", them: "Yes — config_id recognises a visitor for ~30 min (24h max) by design", us: "Full functionality, always cookieless" },
            { feature: "ePrivacy Art. 5(3) exposure", them: "config_id derives from device and network characteristics · EDPB 2/2023 covers non-cookie techniques", us: "No storage, no device read · 5(3) not engaged" },
            { feature: "EU traffic captured (typical)", them: "~60% running a consent banner (default setup)", us: "Not reduced by consent" },
            { feature: "Report archiving at scale", them: "No sampling — but cron-driven archiving bottlenecks on self-host", us: "No archiving step · unsampled" },
          ]},
          { category: "Compliance", block: "technical", rows: [
            { feature: "GDPR posture", them: "Compliant by configuration · must be maintained and evidenced", us: "Compliant by architecture · no configuration to audit" },
            { feature: "Data residency (Cloud)", them: "EU options · paid plans", us: "EU-only · Dublin · all plans" },
            { feature: "Schrems II", them: "Clean (Cloud EU)", us: "Clean" },
          ]},
          { category: "Pricing & operations", block: "commercial", rows: [
            { feature: "Entry cost", them: "Cloud from $23 / ~€29 per month (50K hits) · self-hosted 'free' + ops", us: "€499/mo · all-inclusive · no ops" },
            { feature: "Cloud price at eCommerce volume", them: "Quote-based above 10M hits/mo", us: "Published pricing at every tier" },
            { feature: "Total cost of ownership (self-host)", them: "Server, ops, security, plugins, upgrades", us: "Zero infra cost · fully managed" },
            { feature: "Implementation support", them: "Community forum / paid consultancy", us: "Founder-led on all plans" },
          ]},
          { category: "Modern stack", block: "reporting", rows: [
            { feature: "Native MCP / AI agents", them: "Plugin (Cloud + On-Premise, since 2026)", us: "Native · no plugin · all plans" },
            { feature: "What the agent can read", them: "Post-consent subset, or exempt data with UTMs stripped", us: "Events without consent gaps · campaigns intact" },
            { feature: "BigQuery / warehouse export", them: "Data Warehouse Connector · additional cost per tier", us: "Native · all plans · full resolution" },
            { feature: "Real-time latency", them: "Live visitor log is real-time · reports wait on cron archiving", us: "< 2 minutes · default" },
            { feature: "Ask-your-data AI assistant", them: "MCP plugin or premium add-on", us: "LENS AI on all plans (BYOK) · managed Private AI from Scale" },
          ]},
          { category: "Tracker performance (measured)", block: "technical", rows: [
            { feature: "Script weight on the wire (gzip)", them: "~46 KB · matomo.js", us: "1.1 KB · ~42× lighter" },
            { feature: "JavaScript parsed on the device", them: "~153 KB", us: "2.0 KB" },
          ]},
          { category: "Where Matomo is the better choice", block: "commercial", rows: [
            { feature: "Source code", them: "Open source · fully auditable · self-hostable", us: "Closed source · EU-hosted · DPA and TPSR included" },
            { feature: "Data ownership", them: "Your server, your database, direct SQL access", us: "Managed in Dublin · BigQuery export for raw access" },
            { feature: "Product scope", them: "Suite: Tag Manager, heatmaps, session recording, A/B testing", us: "Analytics only — no heatmaps, no session recording by design" },
          ]},
          { category: "Reporting parity", block: "reporting", rows: [
            { feature: "Prebuilt reports", them: "Full classic reporting UI · mature", us: "Decision-ready defaults · channels, funnels, pages" },
            { feature: "Reporting in exempt / cookieless mode", them: "Drops visit-level views, campaign detail and returning-visitor reports", us: "Full reporting · always cookieless" },
            { feature: "Custom analysis", them: "Custom reports + segments · premium features included on Cloud, paid plugins on self-host", us: "Segments + property breakdowns · unsampled" },
          ]},
          { category: "Customer success", block: "commercial", rows: [
            { feature: "Onboarding", them: "Self-serve · docs + forum", us: "Founder-led · 15-minute install" },
            { feature: "Support", them: "Paid support plans (Cloud)", us: "Direct support on every plan" },
          ]},
        ],
        faqs: [
          { q: "Doesn't Matomo have a CNIL exemption? Why would I need Sealmetrics?", a: "It does, and it deserves to be taken seriously — the CNIL republished its audience-measurement criteria in July 2025 with a self-assessment tool, and Matomo publishes a configuration guide for it. Both Cloud and On-Premise can qualify, with cookies still on. Two things decide whether it solves your problem. Scope: the criteria are French. Germany's TDDDG §25 does not recognise them, and most EU markets run no equivalent named-solution list, so a multi-market eCommerce is still showing a banner outside France. Cost: the exempt configuration strips UTM and campaign parameters, cuts referrers to the domain, disables visit-level reports and APIs, turns off cross-domain tracking, and recommends disabling eCommerce tracking. If you run paid media, that removes the attribution you bought analytics for. Sealmetrics needs no exemption because it writes nothing to the visitor's device and reads nothing from it — campaigns, channels and revenue stay intact across the EU." },
          { q: "Isn't Matomo's cookieless mode equivalent to Sealmetrics?", a: "Not really. Without cookies Matomo falls back to config_id, a short-lived environment hash — a window of roughly 30 minutes, 24 hours at most — deliberately built not to recognise returning visitors. Pageviews, events, downloads, outlinks and site search survive intact; returning-visitor counts, visit frequency, multi-session campaign attribution and cohorts degrade. Sealmetrics is cookieless across the entire product with no toggle and no feature loss. The legal basis also differs in kind: Matomo without a banner depends on holding a consent-exempt configuration — permitted under the CNIL criteria in France, not under Germany's TDDDG §25 — while Sealmetrics writes nothing to the visitor's device and reads nothing from it, so ePrivacy Article 5(3) is not engaged in the first place." },
          { q: "Self-hosted Matomo is free. Sealmetrics costs €499/mo. Why pay?", a: "Self-hosting is free on the licence. It is not free in operations: you need a server, security patches, backups, plugin maintenance, upgrade cycles and someone responsible when archiving breaks at 3 AM. For a serious eCommerce, that's typically 0.2–0.5 FTE — €15K–€40K/yr in real cost. Sealmetrics replaces all of that for €6K/yr, with cookieless data and a modern stack on top. If you would rather compare like for like, use Matomo Cloud: $23 / ~€29 a month covers 50,000 hits, and above 10 million hits a month it is quote-based, so at eCommerce volume you are negotiating a price rather than reading one." },
          { q: "How does Matomo compare to Piwik PRO?", a: "Piwik PRO is a commercial fork of Matomo, with enterprise features and EU hosting layered on top. Both share the cookie-based architecture origin, and both offer a consentless configuration that trades data for compliance. Piwik PRO sells Business from €35/mo and quotes Enterprise privately, and is retiring its free Core plan on 31 March 2026; Matomo Cloud publishes its tiers. Sealmetrics differs from both at the architecture level: not a privacy-friendly configuration of cookie tracking, but cookieless capture by design — nothing to configure and nothing to keep configured." },
          { q: "What about Matomo's ecosystem and open-source model?", a: "Both are real, and for some teams they decide the choice: source code you can audit, a database you own with direct SQL access, and a suite that includes Tag Manager, heatmaps, session recording and A/B testing. Sealmetrics does none of those things and is not trying to — it is analytics only, aggregate by design, with no session recording and no individual-level data. Where the two genuinely diverge is the paid-media case: if consent rejection or the exempt configuration is costing you campaign-level attribution on a €10M+ eCommerce, no amount of ecosystem replaces the missing data." },
          { q: "What happens to this comparison if the EU Digital Omnibus passes?", a: "It narrows the gap, and it is worth saying so plainly. The Commission's proposal of 19 November 2025 (COM(2025) 837) would move cookie rules into the GDPR through a new Article 88a and exempt first-party, aggregated audience measurement for the controller's own use from consent. Adopted broadly as drafted — ordinary legislative procedure, realistically 2027–2028, substantive amendments likely — a Matomo in exempt configuration would qualify across the EU rather than only in France. What does not change: that configuration still strips your campaign parameters and visit-level data, it still costs you returning-visitor recognition and multi-session attribution, a first-party endpoint still survives ad blockers that a third-party script does not, and you still run the servers. Our position has never depended on the banner alone." },
          { q: "Can I migrate gradually from Matomo?", a: "Yes. Run both in parallel 30 days. If your Matomo runs a consent banner, compare traffic counts first — the gap is your consent rejection rate, and Sealmetrics typically captures 30–70% more EU traffic. If it runs the consent-exempt configuration, traffic counts will be much closer, so compare campaign and channel attribution instead, because that is where the exempt configuration is blank. Then compare revenue alignment against your backend. Most teams decide within the first 14 days." },
        ],
        ctaTitle: <>Cookieless by design. <em className="italic font-medium" style={{ color: "#E8B84B", fontStyle: "italic" }}>No devops required.</em></>,
        ctaLede: "30 minutes with the founder. We run your site through Sealmetrics and Matomo simultaneously — you see the traffic a Matomo consent banner still loses, what the exempt configuration costs you in campaign attribution, and what your real-data dashboards look like.",
      },
      es: {
        competitor: "Matomo",
        techReportHref: "https://docs.sealmetrics.com/guides/tracker-performance-report#matomo-and-piwik-pro",
        techReportLabel: "Lee el informe técnico completo (peso del script, medido) →",
        hook: "Matomo es open-source, amigable con UE, y puede funcionar sin banner en Francia bajo los criterios de la CNIL. Lee lo que cuesta esa configuración: parámetros UTM y de campaña eliminados, eCommerce recomendado off, informes a nivel de visita deshabilitados. Y no viaja a Alemania.",
        eyebrow: "vs Matomo",
        h1: <>Open-source está bien. <em>La exención te cuesta los UTMs.</em></>,
        lede: "Matomo (Cloud o self-hosted) es la analítica open-source más creíble de Europa y, a diferencia de la mayoría de herramientas privacy, puede quitar el banner en Francia bajo los criterios de exención de la CNIL. La configuración que se la gana elimina los parámetros de campaña, deshabilita el reporting a nivel de visita y recomienda apagar el tracking de eCommerce — y el §25 de la TDDDG alemana no la reconoce. Sealmetrics mantiene campañas e ingresos intactos en todos los mercados UE — desde €499/mes, sin devops.",
        tldr: {
          answer: (
            <>
              Matomo es la analítica open-source más creíble de Europa
              — Cloud o self-hosted, RGPD-aware, ecosistema de plugins.
              Dos realidades arquitectónicas: cookies activadas por
              defecto, y operar sin banner exige adoptar una configuración
              de exención — permitida por los{" "}
              <Link href="/es/consentless-analytics" className="underline underline-offset-2">
                criterios de la CNIL francesa
              </Link>
              , no por el §25 de la TDDDG alemana. Y esa configuración
              es justo lo que conviene leer: <strong>elimina los
              parámetros UTM y de campaña</strong>, reduce el referrer
              al dominio, deshabilita informes y APIs a nivel de visita,
              apaga el tracking cross-domain y recomienda desactivar el
              eCommerce por completo. Para un eCommerce que invierte en
              paid media, eso elimina el dato por el que compró la
              analítica — además del reconocimiento de visitante
              recurrente y la atribución multi-sesión que el modo sin
              cookies ya cuesta. Y self-hosting &laquo;gratis en
              licencia&raquo; que suele costar{" "}
              <strong>15–40K€/año</strong> en operaciones una vez
              cuentas servidores, parches de seguridad, mantenimiento
              de plugins y on-call. Sealmetrics es cookieless en todo
              el producto, totalmente gestionado, alojado en Dublín, con
              MCP nativo y BigQuery — desde €499/mes, cero devops.
            </>
          ),
          bullets: [
            <>Cookies por defecto; sin banner solo bajo una configuración de exención que elimina UTMs y dato a nivel de visita.</>,
            <>La exención es nacional: criterios CNIL en Francia, no el §25 de la TDDDG alemana.</>,
            <>Sealmetrics: sin cookies en todo el producto, campañas intactas en todas partes, cero operaciones.</>,
          ],
        },
        caseStudy: {
          eyebrow: "Reemplazó un stack DIY de analítica",
          title: <>Cómo Dreamplace Hotels cambió <em className="italic-accent">DIY por claridad</em>.</>,
          quote: "Lo que nos aporta es lo que hemos necesitado siempre: el dato lo más real posible y lo más próximo a la realidad.",
          quoteAuthor: "Eduardo Martin · Analytics & Campaigns · Dreamplace Hotels",
          body: "Dreamplace migró a Sealmetrics desde un setup analítico DIY. Los ingresos agregados por canal empezaron a cuadrar con el PMS en la primera semana. Sin servidores que parchear, sin plugins que mantener, sin banner de cookies que defender — solo rendimiento de canal cuadrado con el ledger de reservas, desde el día uno.",
          href: "/es/case-studies/dreamplace-hotels",
          linkLabel: "Leer el case study completo de Dreamplace",
        },
        gapStats: [
          { n: "Sin UTMs", label: "El precio de la configuración exenta", detail: "Parámetros de campaña eliminados, referrer reducido al dominio, informes a nivel de visita off." },
          { n: "Solo Francia", label: "Hasta dónde llega la exención", detail: "Los criterios CNIL son nacionales. El §25 de la TDDDG alemana no los reconoce." },
          { n: "Self-host", label: "Overhead DevOps", detail: "Servidores, backups, parches de seguridad, escalado — tiempo de tu equipo." },
          { n: "Add-on", label: "El MCP es un plugin", detail: "Matomo MCP salió en 2026 como plugin instalable — encima de un dato que la configuración de exención ya ha adelgazado." },
        ],
        comparison: [
          { category: "Consentimiento y exención", block: "technical", rows: [
            { feature: "Funciona sin banner de consentimiento", them: "Sí en Francia · configuración de exención (criterios CNIL)", us: "Sí · todos los mercados · sin configurar nada" },
            { feature: "Alcance geográfico", them: "Francia. No bajo el §25 de la TDDDG alemana", us: "Todos los mercados UE" },
            { feature: "Parámetros UTM / campaña en modo exento", them: "Eliminados", us: "Conservados · atribución de canal completa" },
            { feature: "Tracking de eCommerce en modo exento", them: "Recomendado off · order IDs anonimizados si se mantiene", us: "Medición de ingresos completa" },
            { feature: "Informes a nivel de visita y export crudo", them: "Deshabilitados en modo exento", us: "Agregado por diseño · export BigQuery incluido" },
          ]},
          { category: "Captura de datos", block: "technical", rows: [
            { feature: "Modo por defecto", them: "Cookies on · sin banner solo bajo configuración de exención (criterios CNIL); banner requerido en Alemania", us: "Sin cookies · no escribe ni lee nada del dispositivo" },
            { feature: "Modo cookieless disponible", them: "Sí — config_id reconoce al visitante ~30 min (24h máx) por diseño", us: "Funcionalidad completa, siempre sin cookies" },
            { feature: "Exposición al art. 5(3) de ePrivacy", them: "config_id deriva de características del dispositivo y la red · EDPB 2/2023 cubre técnicas sin cookie", us: "Sin almacenamiento ni lectura · 5(3) no se activa" },
            { feature: "Tráfico UE capturado (típico)", them: "~60% con banner de consentimiento (configuración por defecto)", us: "Sin pérdida por consentimiento" },
            { feature: "Archivado de informes a escala", them: "Sin muestreo — pero el archivado por cron hace cuello de botella en self-host", us: "Sin paso de archivado · sin muestreo" },
          ]},
          { category: "Compliance", block: "technical", rows: [
            { feature: "Postura RGPD", them: "Cumplimiento por configuración · hay que mantenerlo y demostrarlo", us: "Cumplimiento por arquitectura · sin configuración que auditar" },
            { feature: "Residencia (Cloud)", them: "Opciones UE · planes de pago", us: "Solo UE · Dublín · todos los planes" },
            { feature: "Schrems II", them: "Limpio (Cloud UE)", us: "Limpio" },
          ]},
          { category: "Precio y operación", block: "commercial", rows: [
            { feature: "Coste de entrada", them: "Cloud desde $23 / ~29€ al mes (50K hits) · self-hosted 'gratis' + ops", us: "€499/mes · todo incluido · sin ops" },
            { feature: "Precio Cloud a volumen eCommerce", them: "Bajo presupuesto por encima de 10M hits/mes", us: "Precio publicado en todos los tiers" },
            { feature: "TCO (self-host)", them: "Servidor, ops, seguridad, plugins, upgrades", us: "Cero coste de infra · totalmente gestionado" },
            { feature: "Soporte implementación", them: "Foro comunidad / consultoría de pago", us: "Liderado por founder en todos los planes" },
          ]},
          { category: "Stack moderno", block: "reporting", rows: [
            { feature: "MCP / agentes IA nativos", them: "Plugin (Cloud + On-Premise, desde 2026)", us: "Nativo · sin plugin · todos los planes" },
            { feature: "Qué puede leer el agente", them: "Subconjunto post-consentimiento, o dato exento sin UTMs", us: "Eventos sin huecos de consentimiento · campañas intactas" },
            { feature: "Export BigQuery / warehouse", them: "Data Warehouse Connector · coste adicional por tier", us: "Nativo · todos los planes · resolución completa" },
            { feature: "Latencia tiempo real", them: "El log de visitas es en tiempo real · los informes esperan al archivado por cron", us: "< 2 minutos · por defecto" },
            { feature: "Asistente IA sobre tus datos", them: "Plugin MCP o add-on premium", us: "LENS AI en todos los planes (BYOK) · Private AI gestionada desde Scale" },
          ]},
          { category: "Rendimiento del tracker (medido)", block: "technical", rows: [
            { feature: "Peso del script en red (gzip)", them: "~46 KB · matomo.js", us: "1,1 KB · ~42× más ligero" },
            { feature: "JavaScript parseado en el dispositivo", them: "~153 KB", us: "2,0 KB" },
          ]},
          { category: "Dónde Matomo es la mejor opción", block: "commercial", rows: [
            { feature: "Código fuente", them: "Open source · auditable · self-hostable", us: "Código cerrado · alojado en UE · DPA y TPSR incluidos" },
            { feature: "Propiedad del dato", them: "Tu servidor, tu base de datos, acceso SQL directo", us: "Gestionado en Dublín · export BigQuery para el dato crudo" },
            { feature: "Alcance de producto", them: "Suite: Tag Manager, mapas de calor, grabación de sesión, tests A/B", us: "Solo analítica — sin mapas de calor ni grabación de sesión, por diseño" },
          ]},
          { category: "Paridad de reporting", block: "reporting", rows: [
            { feature: "Informes listos", them: "UI de reporting clásica completa · madura", us: "Listos por defecto · canales, funnels, páginas" },
            { feature: "Reporting en modo exento / sin cookies", them: "Pierde vistas a nivel de visita, detalle de campaña e informes de recurrencia", us: "Reporting completo · siempre sin cookies" },
            { feature: "Análisis custom", them: "Informes custom + segmentos · premium incluido en Cloud, plugins de pago en self-host", us: "Segmentos + breakdowns por propiedad · sin muestreo" },
          ]},
          { category: "Customer success", block: "commercial", rows: [
            { feature: "Onboarding", them: "Self-serve · docs + foro", us: "Liderado por el founder · instalación en 15 min" },
            { feature: "Soporte", them: "Planes de soporte de pago (Cloud)", us: "Soporte directo en todos los planes" },
          ]},
        ],
        faqs: [
          { q: "¿Matomo no tiene exención de la CNIL? ¿Para qué necesito Sealmetrics?", a: "La tiene, y merece tomarse en serio: la CNIL republicó sus criterios de medición de audiencia en julio de 2025 con una herramienta de autoevaluación, y Matomo publica su guía de configuración para ella. Cloud y On-Premise pueden calificar, con las cookies aún activas. Dos cosas deciden si eso resuelve tu problema. Alcance: los criterios son franceses. El §25 de la TDDDG alemana no los reconoce, y la mayoría de mercados UE no tiene una lista equivalente de soluciones nominadas, así que un eCommerce multimercado sigue enseñando banner fuera de Francia. Coste: la configuración exenta elimina los parámetros UTM y de campaña, reduce el referrer al dominio, deshabilita informes y APIs a nivel de visita, apaga el cross-domain y recomienda desactivar el tracking de eCommerce. Si inviertes en paid media, eso te quita la atribución por la que compraste la analítica. Sealmetrics no necesita exención porque no escribe nada en el dispositivo del visitante ni lee nada de él — campañas, canales e ingresos se mantienen intactos en toda la UE." },
          { q: "¿No es el modo cookieless de Matomo equivalente a Sealmetrics?", a: "No del todo. Sin cookies, Matomo cae a config_id, un hash de entorno efímero — una ventana de unos 30 minutos, 24 horas como máximo — diseñado deliberadamente para no reconocer visitantes recurrentes. Páginas vistas, eventos, descargas, outlinks y búsqueda interna sobreviven intactos; se degradan los visitantes recurrentes, la frecuencia de visita, la atribución de campaña multi-sesión y las cohortes. Sealmetrics es cookieless en todo el producto, sin toggle y sin pérdida de funcionalidad. La base legal también difiere en naturaleza: Matomo sin banner depende de sostener una configuración de exención — permitida por los criterios de la CNIL en Francia, no por el §25 de la TDDDG alemana — mientras que Sealmetrics no escribe nada en el dispositivo del visitante ni lee nada de él, así que el artículo 5(3) de ePrivacy no llega a activarse." },
          { q: "Matomo self-hosted es gratis. Sealmetrics cuesta €499/mes. ¿Por qué pagar?", a: "Self-hosting es gratis en licencia. No es gratis en operación: necesitas servidor, parches de seguridad, backups, mantenimiento de plugins, ciclos de upgrade y alguien responsable cuando el archivado se rompe a las 3 AM. Para un eCommerce serio, suele ser 0,2–0,5 FTE — 15K€–40K€/año de coste real. Sealmetrics reemplaza todo eso por 6K€/año, con dato cookieless y stack moderno encima. Y si prefieres comparar peras con peras, mira Matomo Cloud: $23 / ~29€ al mes cubren 50.000 hits, y por encima de 10 millones de hits al mes pasa a presupuesto, así que a volumen de eCommerce estás negociando un precio, no leyéndolo." },
          { q: "¿Cómo se compara Matomo con Piwik PRO?", a: "Piwik PRO es un fork comercial de Matomo, con features enterprise y hosting UE encima. Ambos comparten el origen de arquitectura basada en cookies y ambos ofrecen una configuración sin consentimiento que cambia dato por compliance. Piwik PRO vende Business desde 35€/mes y cotiza Enterprise en privado, y retira su plan Core gratuito el 31 de marzo de 2026; Matomo Cloud publica sus tiers. Sealmetrics se diferencia de ambos en arquitectura: no es una configuración privacy-friendly sobre tracking con cookies, sino captura sin cookies por diseño — sin nada que configurar y sin nada que mantener configurado." },
          { q: "¿Y el ecosistema de Matomo y su modelo open-source?", a: "Ambos son reales y para algunos equipos deciden la elección: código que puedes auditar, una base de datos que es tuya con acceso SQL directo, y una suite que incluye Tag Manager, mapas de calor, grabación de sesión y tests A/B. Sealmetrics no hace nada de eso ni pretende hacerlo — es solo analítica, agregada por diseño, sin grabación de sesión y sin dato a nivel individual. Donde los dos divergen de verdad es en el caso de paid media: si el rechazo de consentimiento o la configuración exenta te está costando la atribución a nivel de campaña en un eCommerce de 10M€+, ningún ecosistema sustituye al dato que falta." },
          { q: "¿Qué pasa con esta comparativa si sale adelante el Digital Omnibus europeo?", a: "Estrecha la diferencia, y conviene decirlo sin rodeos. La propuesta de la Comisión de 19 de noviembre de 2025 (COM(2025) 837) trasladaría las reglas de cookies al RGPD mediante un nuevo artículo 88a y eximiría de consentimiento la medición de audiencia agregada, first-party y de uso propio del responsable. Si se adopta en algo parecido a su forma actual — procedimiento legislativo ordinario, realistamente 2027–2028, con enmiendas sustantivas probables — un Matomo en configuración de exención encajaría en toda la UE y no solo en Francia. Lo que no cambia: esa configuración te sigue eliminando los parámetros de campaña y el dato a nivel de visita, te sigue costando el reconocimiento de visitante recurrente y la atribución multi-sesión, un endpoint first-party sigue sobreviviendo a bloqueadores que tumban un script de tercera parte, y los servidores los sigues llevando tú. Nuestra posición nunca ha dependido solo del banner." },
          { q: "¿Puedo migrar gradualmente desde Matomo?", a: "Sí. Corre ambos en paralelo 30 días. Si tu Matomo lleva banner de consentimiento, compara primero los conteos de tráfico — la diferencia es tu tasa de rechazo, y Sealmetrics típicamente captura 30–70% más tráfico UE. Si va en la configuración de exención, los conteos estarán mucho más cerca, así que compara atribución de campaña y canal, porque ahí es donde la configuración exenta está en blanco. Después compara la alineación de ingresos con tu backend. La mayoría de equipos decide en los primeros 14 días." },
        ],
        ctaTitle: <>Cookieless por diseño. <em className="italic font-medium" style={{ color: "#E8B84B", fontStyle: "italic" }}>Sin devops.</em></>,
        ctaLede: "30 min con el founder. Pasamos tu sitio por Sealmetrics y Matomo a la vez — ves el tráfico que un banner de Matomo sigue perdiendo, lo que te cuesta en atribución de campaña la configuración de exención, y cómo se ven tus dashboards con datos reales.",
      },
    },
    "google-analytics": {
      en: {
        competitor: "Google Analytics",
        techReportHref: "https://docs.sealmetrics.com/guides/tracker-performance-report",
        hook: "Google Analytics remains the default, but the default is losing 40–60% of EU traffic. The honest alternative isn't 'another free tool' — it's complete data at enterprise reliability.",
        eyebrow: "Google Analytics alternatives",
        h1: <>Looking for a <em>GA alternative</em> that doesn't commoditize your data?</>,
        lede: "Most alternatives are cheaper or simpler GA clones. Sealmetrics is a different category: complete data, EU-hosted, zero consent scope, enterprise reliability. The serious replacement for teams past the hobbyist tier.",
        tldr: {
          answer: (
            <>
              Google Analytics remains the default — and most
              alternatives are cheaper clones of the same architecture.
              Plausible and Fathom are lighter; Matomo is open-source;
              Piwik PRO is EU-hosted; GA360 is the premium version of
              the original. They share the same trade-off: cookie or
              cookie-light tracking that still loses{" "}
              <strong>40–60% of EU traffic</strong> to consent rejection
              and ad blockers. The serious alternative for an eCommerce
              over €10M revenue is a different category — complete
              capture, EU-hosted, zero consent scope, last-click
              attribution on data without consent gaps.
            </>
          ),
          bullets: [
            <>Plausible, Fathom, Umami: lightweight; fine for blogs and content sites.</>,
            <>Matomo, Piwik PRO: open-source / EU-hosted; cookie-based architecture, same gap.</>,
            <>Sealmetrics: complete EU data capture, enterprise reliability, modern AI-native stack.</>,
          ],
        },
        caseStudy: {
          eyebrow: "Migrated from a Google-Analytics stack",
          title: <>What &ldquo;serious alternative&rdquo; <em className="italic-accent">actually unlocks</em>.</>,
          quote: "The data Sealmetrics delivers is agnostic, unbiased and neutral. There's no black box.",
          quoteAuthor: "Toni Andújar · Digital & Direct Sales Director · Palladium Hotel Group",
          body: "Palladium audited Sealmetrics against their existing GA stack. The result: 40% of inbound traffic with no source/medium attribution in GA, 35% of bookings unassigned to a channel, and a +165% Cost-per-Search improvement on Display once the Sealmetrics measurement model drove DV360 decisions.",
          href: "/case-studies/palladium-hotel-group",
          linkLabel: "Read the full Palladium case study",
        },
        gapStats: [
          { n: "40–60%", label: "EU traffic lost", detail: "GA + consent banner combo." },
          { n: "US-hosted", label: "Schrems II exposure", detail: "Ongoing CNIL/DPA challenges." },
          { n: "Sampling", label: "Above threshold", detail: "Black Friday = estimates, not measurements." },
          { n: "14 mo", label: "Max data retention", detail: "Free GA4 caps at 14 months. 50 months is a GA360 feature." },
        ],
        comparison: [
          { category: "Data completeness", block: "technical", rows: [
            { feature: "Cookie-free capture", them: "Consent Mode v2 (modelled)", us: "Native · no modelling" },
            { feature: "Ad blocker resilience", them: "Blocked (third-party script)", us: "First-party · invisible to blockers" },
            { feature: "Sampling at scale", them: "Yes", us: "Never" },
          ]},
          { category: "Compliance", block: "technical", rows: [
            { feature: "GDPR posture", them: "Consent banner required", us: "GDPR by architecture" },
            { feature: "Schrems II", them: "Exposed", us: "Clean" },
            { feature: "Data residency", them: "US", us: "EU · Dublin" },
          ]},
          { category: "Modern stack", block: "reporting", rows: [
            { feature: "MCP for AI agents", them: "Official server · experimental, read-only", us: "Native · managed · read and act" },
            { feature: "What the agent can read", them: "Post-consent subset, modelled where consent is missing", us: "Events without consent gaps" },
            { feature: "BigQuery export", them: "Yes · daily export cap on the free tier", us: "Full resolution · all plans" },
            { feature: "Report latency", them: "Realtime report is core · standard reports lag 24–48 h", us: "< 2 minutes" },
          ]},
          { category: "Commercial", block: "commercial", rows: [
            { feature: "Price", them: "Free · paid for with data-sharing defaults and lock-in", us: "€499/mo from annual" },
            { feature: "Your data ownership", them: "Google data-sharing settings are on by default and have to be turned off", us: "Yours only · no training for anyone" },
          ]},
          { category: "Tracker performance (measured)", block: "technical", rows: [
            { feature: "Script weight on the wire (gzip)", them: "~146 KB · gtag.js", us: "1.1 KB · ~132× lighter" },
            { feature: "JavaScript parsed on the device", them: "~409 KB", us: "2.0 KB" },
            { feature: "Pageview hit secured", them: "~0.5–0.7 s best case · only after consent", us: "~0.1–0.3 s · sendBeacon from the head" },
          ]},
          { category: "Customer success", block: "commercial", rows: [
            { feature: "Onboarding", them: "Self-serve or agency-led", us: "Founder-led · 15-minute install" },
            { feature: "Human support", them: "Community forums on the free tier", us: "Direct support on every plan" },
          ]},
          { category: "Reporting parity", block: "reporting", rows: [
            { feature: "Standard reports", them: "Reports + Explorations · 24–48 h processing lag", us: "Decision-ready defaults · real-time" },
            { feature: "Custom analysis", them: "Explorations · sampled at scale", us: "Segments + property breakdowns · unsampled" },
            { feature: "Audiences & remarketing", them: "Yes · its real strength", us: "Not a remarketing tool — no personal identifiers by design" },
          ]},
        ],
        faqs: [
          { q: "Why not just use another free analytics tool?", a: "Most free tools are lightweight clones — fewer features, less reliability, still cookie-based. If you're deciding with serious marketing budget, 'free' becomes expensive quickly: misattributed spend, unreliable dashboards, no compliance clarity. Sealmetrics is priced for teams whose data decisions matter." },
          { q: "What about Plausible, Fathom, Umami — aren't those alternatives?", a: "They're great for simple sites, blogs and content publishers, and several now ship MCP servers of their own. What they are not built for is eCommerce at scale: no native revenue attribution, limited integrations, and warehouse export that ranges from limited to absent. Different category, different buyer — and we would rather say so than pretend they are competitors." },
          { q: "Do I need to migrate existing GA history?", a: "No. Sealmetrics runs from day one on new data. Most teams keep GA running alongside for historical reference and Google Ads integration, and use Sealmetrics for present + future decisions." },
          { q: "Can I use Data Studio with Sealmetrics?", a: "Yes. Full BigQuery export means Data Studio, Power BI, Tableau — any BI tool connects natively. No ETL, no sampling limits." },
        ],
        ctaTitle: <>Stop deciding with <em className="italic font-medium" style={{ color: "#E8B84B", fontStyle: "italic" }}>40% of your data.</em></>,
        ctaLede: "30-minute walkthrough. We'll show you what your current GA is missing, live on your own traffic. No slides, no abstract numbers — your real data.",
      },
      es: {
        competitor: "Google Analytics",
        techReportHref: "https://docs.sealmetrics.com/guides/tracker-performance-report",
        hook: "Google Analytics sigue siendo el default, pero el default está perdiendo 40–60% del tráfico UE. La alternativa honesta no es 'otra herramienta gratis' — es dato completo con fiabilidad enterprise.",
        eyebrow: "Alternativas a Google Analytics",
        h1: <>¿Buscando una <em>alternativa a GA</em> que no commoditice tus datos?</>,
        lede: "La mayoría de alternativas son clones más baratos o simples de GA. Sealmetrics es otra categoría: dato completo, alojado en UE, cero scope de consentimiento, fiabilidad enterprise. El reemplazo serio para equipos que pasan el tier hobbyist.",
        tldr: {
          answer: (
            <>
              Google Analytics sigue siendo el default — y la mayoría
              de alternativas son clones más baratos de la misma
              arquitectura. Plausible y Fathom son más ligeros; Matomo
              es open-source; Piwik PRO está alojado en UE; GA360 es la
              versión premium del original. Comparten el mismo
              trade-off: tracking con cookies o cookie-light que sigue
              perdiendo <strong>40–60% del tráfico UE</strong> por
              rechazo de consentimiento y ad-blockers. La alternativa
              seria para un eCommerce con más de 10M€ de ingresos es
              otra categoría — captura completa, alojada en UE, cero
              scope de consentimiento, atribución last-click sobre
              datos sin huecos de consentimiento.
            </>
          ),
          bullets: [
            <>Plausible, Fathom, Umami: ligeros; bien para blogs y sites de contenido.</>,
            <>Matomo, Piwik PRO: open-source / alojados en UE; arquitectura con cookies, mismo gap.</>,
            <>Sealmetrics: captura UE completa, fiabilidad enterprise, stack moderno AI-native.</>,
          ],
        },
        caseStudy: {
          eyebrow: "Migró desde un stack Google-Analytics",
          title: <>Qué desbloquea <em className="italic-accent">una alternativa de verdad</em>.</>,
          quote: "Los datos que entrega Sealmetrics son agnósticos, sin sesgo y neutrales. No hay caja negra.",
          quoteAuthor: "Toni Andújar · Digital & Direct Sales Director · Palladium Hotel Group",
          body: "Palladium auditó Sealmetrics contra su stack GA existente. Resultado: 40% del tráfico entrante sin atribución source/medium en GA, 35% de reservas sin canal asignado y una mejora del +165% en Cost-per-Search en Display una vez el modelo de medición de Sealmetrics dirigió las decisiones de DV360.",
          href: "/es/case-studies/palladium-hotel-group",
          linkLabel: "Leer el case study completo de Palladium",
        },
        gapStats: [
          { n: "40–60%", label: "Tráfico UE perdido", detail: "Combo GA + banner de consentimiento." },
          { n: "US-hosted", label: "Exposición Schrems II", detail: "Challenges CNIL/DPA en curso." },
          { n: "Muestreo", label: "Sobre umbral", detail: "Black Friday = estimaciones, no mediciones." },
          { n: "14 meses", label: "Retención máxima", detail: "GA4 gratuito topa en 14 meses. Los 50 meses son una feature de GA360." },
        ],
        comparison: [
          { category: "Completitud de datos", block: "technical", rows: [
            { feature: "Captura sin cookies", them: "Consent Mode v2 (modelado)", us: "Nativo · sin modelado" },
            { feature: "Resistencia a ad blockers", them: "Bloqueado (script third-party)", us: "First-party · invisible a bloqueadores" },
            { feature: "Muestreo a escala", them: "Sí", us: "Nunca" },
          ]},
          { category: "Compliance", block: "technical", rows: [
            { feature: "Postura RGPD", them: "Banner de consentimiento requerido", us: "RGPD por arquitectura · sin dato personal persistido" },
            { feature: "Schrems II", them: "Expuesto", us: "Limpio" },
            { feature: "Residencia de datos", them: "US", us: "UE · Dublín" },
          ]},
          { category: "Stack moderno", block: "reporting", rows: [
            { feature: "MCP para agentes IA", them: "Servidor oficial · experimental, solo lectura", us: "Nativo · gestionado · lee y actúa" },
            { feature: "Qué puede leer el agente", them: "Subconjunto post-consentimiento, modelado donde falta consentimiento", us: "Eventos sin huecos de consentimiento" },
            { feature: "Export BigQuery", them: "Sí · tope diario de export en el tier gratuito", us: "Resolución completa · todos los planes" },
            { feature: "Latencia de informes", them: "El informe Realtime es core · los estándar tardan 24–48 h", us: "< 2 minutos" },
          ]},
          { category: "Comercial", block: "commercial", rows: [
            { feature: "Precio", them: "Gratis · lo pagas con los ajustes de data-sharing por defecto y el lock-in", us: "€499/mes desde anual" },
            { feature: "Propiedad de datos", them: "Los ajustes de compartición con Google vienen activados y hay que desactivarlos", us: "Solo tuyos · sin training para nadie" },
          ]},
          { category: "Rendimiento del tracker (medido)", block: "technical", rows: [
            { feature: "Peso del script en red (gzip)", them: "~146 KB · gtag.js", us: "1,1 KB · ~132× más ligero" },
            { feature: "JavaScript parseado en el dispositivo", them: "~409 KB", us: "2,0 KB" },
            { feature: "Pageview asegurado", them: "~0,5–0,7 s mejor caso · solo tras consentimiento", us: "~0,1–0,3 s · sendBeacon desde el head" },
          ]},
          { category: "Customer success", block: "commercial", rows: [
            { feature: "Onboarding", them: "Self-serve o vía agencia", us: "Liderado por el founder · instalación en 15 min" },
            { feature: "Soporte humano", them: "Foros de comunidad en el tier gratuito", us: "Soporte directo en todos los planes" },
          ]},
          { category: "Paridad de reporting", block: "reporting", rows: [
            { feature: "Informes estándar", them: "Reports + Explorations · 24–48 h de retraso de procesado", us: "Listos por defecto · tiempo real" },
            { feature: "Análisis custom", them: "Explorations · muestreado a escala", us: "Segmentos + breakdowns por propiedad · sin muestreo" },
            { feature: "Audiencias y remarketing", them: "Sí · su verdadera fortaleza", us: "No es una herramienta de remarketing — sin identificadores personales por diseño" },
          ]},
        ],
        faqs: [
          { q: "¿Por qué no usar otra analítica gratis?", a: "La mayoría de herramientas gratis son clones ligeros — menos features, menos fiabilidad, siguen basadas en cookies. Si decides con presupuesto de marketing serio, 'gratis' sale caro rápido: inversión mal atribuida, dashboards poco fiables, sin claridad de compliance. Sealmetrics está priced para equipos cuyas decisiones de dato importan." },
          { q: "¿Y Plausible, Fathom, Umami — no son alternativas?", a: "Son geniales para sitios simples, blogs y publishers de contenido, y varios ya publican su propio servidor MCP. Para lo que no están pensados es para eCommerce a escala: sin atribución de ingresos nativa, integraciones limitadas y un export a warehouse que va de limitado a inexistente. Categoría distinta, buyer distinto — y preferimos decirlo a fingir que compiten." },
          { q: "¿Tengo que migrar el histórico de GA?", a: "No. Sealmetrics corre desde el día uno con datos nuevos. La mayoría mantiene GA en paralelo para referencia histórica e integración Google Ads, y usa Sealmetrics para decisiones presente + futuro." },
          { q: "¿Puedo usar Data Studio con Sealmetrics?", a: "Sí. Export completo a BigQuery = Data Studio, Power BI, Tableau — cualquier BI conecta nativamente. Sin ETL, sin límites de muestreo." },
        ],
        ctaTitle: <>Deja de decidir con <em className="italic font-medium" style={{ color: "#E8B84B", fontStyle: "italic" }}>el 40% de tus datos.</em></>,
        ctaLede: "Walkthrough de 30 min. Te mostramos lo que tu GA actual está perdiendo, en directo, sobre tu propio tráfico. Sin slides, sin números abstractos — tu dato real.",
      },
    },
  };

  return { ...data[key][locale], locale };
}
