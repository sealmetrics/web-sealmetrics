import type { ReactNode } from "react";

/**
 * "Why can Sealmetrics measure without consent and the others cannot?" — the
 * question customers ask by Slack, answered for the marketer rather than for
 * the DPO (the DPO already has /consentless-analytics and /gdpr-analytics).
 *
 * Every product fact follows the claims approved by the founder on
 * 2026-10-08: nothing is stored on the device; the session identifier is
 * ephemeral, rotates daily with a key that is destroyed, and cannot be
 * rebuilt; the IP is compared on the fly against a public list of automated
 * traffic and discarded; reports are always aggregated; analytics data is
 * processed in the EU (Dublin). What the page deliberately does NOT say:
 * "anonymous", "no fingerprinting", "100% GDPR compliant", "measures 100%"
 * and "no banner needed" without a jurisdiction caveat.
 *
 * Regulatory statements are conditional and link to the authority's own
 * publication or to the site's country analyses. Germany is "our reading, not
 * settled", the same wording as llms.txt.
 */

export const WHY_NO_CONSENT_PUBLISHED = "2026-10-13";
export const WHY_NO_CONSENT_MODIFIED = "2026-10-13";

export type WhyNoConsentContent = {
  route: string;
  breadcrumbs: { label: string; href?: string }[];
  eyebrow: string;
  h1: ReactNode;
  heroBody: string;
  heroPrimary: { label: string; href: string };
  heroSecondary: { label: string; href: string };
  heroMicro: string;
  byline: { byLabel: string; authorName: string; authorHref: string; dateLabel: string; date: string; dateDisplay: string };
  /** The two things a marketer must know before reading on. */
  frame: { title: string; stays: { tag: string; title: string; body: string }; changes: { tag: string; title: string; body: string } };

  answerLabel: string;
  answer: ReactNode;

  browser: {
    tag: string;
    title: ReactNode;
    body: string;
    /** Example domain drawn in the browser bar, in the page's language. */
    domain: string;
    cookie: { label: string; storage: string; cookieLine: string; lines: string[]; remote: string[]; banner: string; accept: string; verdict: string };
    seal: { label: string; storage: string; empty: string; emptyNote: string; remote: string[]; banner: string; verdict: string };
  };

  pipeline: {
    tag: string;
    title: ReactNode;
    body: string;
    steps: { code: string; title: string; lines: string[]; highlight?: string[] }[];
    retentionLabel: string;
    retention: [string, string][];
  };

  rule: {
    tag: string;
    title: ReactNode;
    body: string;
    colA: string;
    colB: string;
    questions: { label: string; question: string; note: string; a: { mark: "no" | "ok" | "mid"; title: string; body: string }; b: { mark: "no" | "ok" | "mid"; title: string; body: string } }[];
    resultLabel: string;
    resultA: { title: string; body: string };
    resultB: { title: string; body: string };
  };

  checklist: { tag: string; title: ReactNode; body: string; headers: [string, string, string]; rows: { condition: string; note?: string; a: string; b: string; aMark: "no" | "ok" | "mid"; bMark: "no" | "ok" | "mid" }[] };

  scope: { tag: string; title: ReactNode; body: string; yes: { title: string; items: ReactNode[] }; no: { title: string; items: ReactNode[] } };

  install: { tag: string; title: ReactNode; body: string; bad: { label: string; code: string; verdict: string }; good: { label: string; code: string; verdict: string } };

  countries: { tag: string; title: ReactNode; body: string; headers: [string, string, string, string]; rows: { country: string; authority: ReactNode; status: string; statusMark: "ok" | "mid"; note: ReactNode }[] };

  legal: {
    tag: string;
    title: ReactNode;
    body: string;
    copyLabel: string;
    copiedLabel: string;
    dpo: { title: string; text: string };
    policy: { title: string; text: string };
    give: ReactNode;
    yours: ReactNode;
  };

  trial: { tag: string; title: ReactNode; body: string; steps: { when: string; title: string; body: ReactNode }[]; proof: { eyebrow: string; value: string; body: string; href: string; readCase: string } };

  faqTag: string;
  faqTitle: ReactNode;
  faq: { question: string; answer: string }[];

  notSaid: { title: string; body: string };

  final: { tag: string; title: ReactNode; body: string; primary: { label: string; href: string }; secondary: { label: string; href: string } };
};

const link = "sig-wnc-inline";
const CNIL_GUIDANCE = "https://www.cnil.fr/fr/cookies-solutions-pour-les-outils-de-mesure-daudience";
const AEPD_GUIDE = "https://www.aepd.es/guias/guia-cookies.pdf";
const DSK_SITE = "https://www.datenschutzkonferenz-online.de/";
const GARANTE_COOKIES = "https://www.garanteprivacy.it/temi/cookie";
const ICO_PECR = "https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guide-to-pecr/cookies-and-similar-technologies/";

export const whyNoConsentEn: WhyNoConsentContent = {
  route: "/why-no-consent",
  breadcrumbs: [{ label: "Home", href: "/" }, { label: "Why no consent" }],
  eyebrow: "The question customers ask",
  h1: <>Why can Sealmetrics measure without consent, <em>and the others cannot?</em></>,
  heroBody:
    "Because the law does not forbid measuring. It forbids storing or reading things on the visitor's device without permission, unless the purpose is counting the audience of the site itself and nothing else. Most tools do not fit inside that exemption. Sealmetrics is built to fit.",
  heroPrimary: { label: "Run it next to GA4 for 30 days", href: "/demo/" },
  heroSecondary: { label: "The package for your legal team", href: "/dpa/" },
  heroMicro: "EU-hosted in Dublin · DPA included · not legal advice · Germany: our reading, not settled",
  byline: { byLabel: "By", authorName: "Rafa Jiménez", authorHref: "/authors/rafa-jimenez/", dateLabel: "Published", date: WHY_NO_CONSENT_PUBLISHED, dateDisplay: "13 October 2026" },
  frame: {
    title: "Before you read on: what changes and what does not",
    stays: { tag: "What does not change", title: "The banner stays if you keep GA4, the Meta pixel or remarketing", body: "Those tools write to the device and need consent. Sealmetrics does not replace them in that, and it does not let you remove the banner on their behalf." },
    changes: { tag: "What changes", title: "You stop losing the visitors who reject the banner", body: "Sealmetrics measures before the visitor answers and when the answer is no. The traffic the banner hides today comes back into your reports." },
  },

  answerLabel: "Quick answer",
  answer: (
    <p>
      Consent for web measurement is required by the ePrivacy rules whenever a
      tool stores or reads information on the visitor&apos;s device, with two
      exemptions: what the site strictly needs to work and, under conditions,
      audience measurement for the site itself. A cookie-based tool such as GA4
      writes a two-year identifier, reuses it across sites and feeds advertising,
      so it falls outside the exemption and needs a banner. Sealmetrics writes
      nothing to the device; it reads only what the browser sends anyway,
      computes a session identifier that rotates every day with a key that is
      destroyed at 04:00, does not store the IP address, and reports only
      aggregate counts for the site itself. That is the configuration the CNIL
      and the AEPD describe as consent-exempt audience measurement, as our own
      self-assessment reads it. The exemption has conditions and each country
      applies it its own way; in Germany it is not settled, and the banner stays
      for any other tool that needs it.
    </p>
  ),

  browser: {
    tag: "1 / 4 · In the browser",
    domain: "your-store.com",
    title: <>What a cookie tool does <em>to the visitor&apos;s device</em></>,
    body: "When the page loads, the GA4 script (or almost any analytics script) writes a cookie with an identifier that follows the visitor for two years, on that site and, through Google's network, on many others. Writing to the device is what the European ePrivacy rules (Art. 5(3)) make conditional on consent. That is why the banner appears.",
    cookie: {
      label: "Cookie-based tool",
      storage: "Device storage",
      cookieLine: "_ga = GA1.2.1735…",
      lines: ["expires in 2 years", "same ID on every visit", "IP and User-Agent kept"],
      remote: ["US servers", "and advertising"],
      banner: "We use cookies. Accept?",
      accept: "Accept",
      verdict: "Writes to the device, reuses the ID across sites and hands it to third parties. Needs a banner, and loses everyone who says no.",
    },
    seal: {
      label: "Sealmetrics",
      storage: "Device storage",
      empty: "empty",
      emptyNote: "no cookie, no localStorage, no ID",
      remote: ["EU only (Dublin)", "your own domain"],
      banner: "no banner needed here for measurement",
      verdict: "Writes nothing to the device. What it reads serves only to count this site's audience. It fits the audience-measurement exemption.",
    },
  },

  pipeline: {
    tag: "2 / 4 · The data that does reach us",
    title: <>What we do with it, <em>step by step</em></>,
    body: "If nothing is stored in the browser, how do we know two pageviews belong to the same visit? With an ephemeral identifier computed on the fly that expires. We do not keep it and neither does the visitor.",
    steps: [
      { code: "A · The request arrives", title: "What the browser already sends", lines: ["Page, source (UTM), time,", "time zone, browser."], highlight: ["The IP is not stored: it is compared", "against a public list of automated traffic and discarded."] },
      { code: "B · Ephemeral ID", title: "A calculation with a daily key", lines: ["Those values plus a secret key", "of the day make the session identifier."], highlight: ["At 04:00 the key is destroyed.", "Not even we can rebuild the ID."] },
      { code: "C · Session", title: "Two hours, then it ends", lines: ["It joins the pages of one visit.", "Come back tomorrow and you are a", "new visit. There are no returning visitors."] },
      { code: "D · Report", title: "Always a count", lines: ["\"142 visits from Google Ads", "to this landing page.\"", "Never \"visitor A came back", "three times.\""] },
    ],
    retentionLabel: "Retention, the same on every plan",
    retention: [["Technical log", "1 day"], ["Hourly aggregates", "90 days"], ["Daily aggregates and conversions", "24 months"]],
  },

  rule: {
    tag: "3 / 4 · The rule",
    title: <>The three questions <em>that decide it</em></>,
    body: "The European rule (ePrivacy, Art. 5(3)) says: storing or reading information on the visitor's equipment needs their consent, unless it is what the site strictly needs to work or, under conditions, audience measurement. Every tool goes through the same three questions. What changes is the answer.",
    colA: "Cookie-based analytics (GA4)",
    colB: "Sealmetrics",
    questions: [
      {
        label: "Question 1",
        question: "Does it touch the visitor's device?",
        note: "Writing a cookie counts. Reading what the browser sends on its own (language, screen, time zone) also counts as access.",
        a: { mark: "no", title: "Yes, it writes", body: "Leaves a cookie with an ID that lasts two years and reads it on every visit." },
        b: { mark: "mid", title: "It only reads, it writes nothing", body: "It uses what the browser already sends. Reading is also access, so the rule applies and we move to question 2." },
      },
      {
        label: "Question 2",
        question: "Is it used only to count this site's audience?",
        note: "This is the condition of the exemption: no profiles, no cross-site matching, no handing the data to third parties.",
        a: { mark: "no", title: "No", body: "The same ID serves Google's advertising network and is matched across sites." },
        b: { mark: "ok", title: "Yes", body: "Counts for this site and nothing else. No profiles, no advertising use." },
      },
      {
        label: "Question 3",
        question: "Does the identifier expire and stay unrecoverable?",
        note: "The exemption requires that a person cannot be followed over time.",
        a: { mark: "no", title: "No", body: "Same ID for two years. It recognises you every time you return." },
        b: { mark: "ok", title: "Yes", body: "It rotates daily and the key it is computed with is destroyed. Tomorrow you are a new visit." },
      },
    ],
    resultLabel: "Result",
    resultA: { title: "Consent is required. Banner.", body: "The Meta pixel and the \"cookieless\" analytics that keep a visitor ID in localStorage land here too." },
    resultB: { title: "Fits the audience-measurement exemption.", body: "No banner needed for measurement, in our self-assessment. How each country applies it is in the table below." },
  },

  checklist: {
    tag: "4 / 4 · The conditions",
    title: <>What a DPO checks, <em>one by one</em></>,
    body: "This is not a product label. It is how the system is built, and every row can be verified in the DPA and in the public documentation.",
    headers: ["Condition", "Cookie-based analytics (GA4)", "Sealmetrics"],
    rows: [
      { condition: "Writes no cookie and no localStorage on the device", a: "No", b: "Yes", aMark: "no", bMark: "ok" },
      { condition: "No persistent visitor identifier", note: "Ours rotates every day and cannot be rebuilt", a: "No · _ga, 2 years", b: "Yes", aMark: "no", bMark: "ok" },
      { condition: "Does not store the IP address", note: "Used on the fly to discard automated traffic, then discarded. Country is derived from the time zone.", a: "No", b: "Yes", aMark: "no", bMark: "ok" },
      { condition: "Only the site's own audience, no cross-site matching", a: "No · Google network", b: "Yes", aMark: "no", bMark: "ok" },
      { condition: "No behavioural profiles, no advertising use", a: "No", b: "Yes", aMark: "no", bMark: "ok" },
      { condition: "Analytics data processed only in the EU", a: "No · US by default", b: "Yes · Dublin", aMark: "no", bMark: "ok" },
      { condition: "Fixed, limited retention", a: "Configurable · 2 or 14 months", b: "Yes · 1 d / 90 d / 24 m", aMark: "mid", bMark: "ok" },
      { condition: "Reports are always aggregated", a: "No · user explorer", b: "Yes", aMark: "no", bMark: "ok" },
      { condition: "First-party: the pixel is served from your own domain", a: "No", b: "Yes · 846 bytes", aMark: "no", bMark: "ok" },
    ],
  },

  scope: {
    tag: "What you get",
    title: <>What you have, <em>and what you do not</em></>,
    body: "Measuring without a persistent identifier has a price, and we would rather tell you ourselves. This is what the product does today, not a promise.",
    yes: {
      title: "Yes, on the visitors the banner hides today",
      items: [
        <><strong>Visits and pageviews</strong> by channel, campaign, source and landing page.</>,
        <><strong>Conversions and sales</strong> with their value, attributed last-click.</>,
        <><strong>ROAS and cost per conversion</strong> for every campaign carrying UTM parameters.</>,
        <><strong>A side-by-side with GA4</strong> from day one.</>,
        <><strong>Traffic you do not see today</strong>: visitors who reject, visitors who never answer, and a good share of those running ad blockers.</>,
      ],
    },
    no: {
      title: "No, because we recognise nobody",
      items: [
        <><strong>Returning visitors.</strong> Whoever comes back tomorrow is a new visit.</>,
        <><strong>User-level data</strong>, cohorts, retention or funnels across days.</>,
        <><strong>Remarketing audiences.</strong> That still needs consent, with any tool.</>,
        <><strong>Cross-device.</strong> Your phone and your laptop are two visits.</>,
        <><strong>Multi-touch attribution</strong> across sessions on different days.</>,
      ],
    },
  },

  install: {
    tag: "The installation mistake",
    title: <>The one mistake <em>that throws it all away</em></>,
    body: "Many teams put the Sealmetrics pixel inside the \"analytics\" category of their consent manager (CMP). It then loads only when the visitor accepts, and you lose exactly what you came to measure. The pixel does not need consent: it goes outside the CMP, in the base template, like the CSS.",
    bad: { label: "Wrong: inside the CMP", code: "<script type=\"text/plain\"\n  data-cookieconsent=\"statistics\"\n  src=\"https://your-domain.com/sm.js\">\n</script>\n// loads only on accept: the rest is lost", verdict: "You measure only those who accept. The same hole as GA4." },
    good: { label: "Right: outside the CMP", code: "<script async\n  src=\"https://your-domain.com/sm.js\">\n</script>\n// in the base template, before the CMP\n// loads every time, writes nothing", verdict: "You measure every visit. It is lawful because it does not touch the device for anything beyond audience measurement." },
  },

  countries: {
    tag: "By country",
    title: <>How each authority <em>applies the exemption</em></>,
    body: "The rule is European, but each authority spells out the exemption. Look at the countries you sell in. Each row links to the authority's own publication or to our analysis of it.",
    headers: ["Country", "Authority and document", "Audience measurement without consent", "Worth knowing"],
    rows: [
      { country: "Spain", authority: <>AEPD · <a className={link} href={AEPD_GUIDE}>Guía sobre el uso de las cookies</a></>, status: "Exemption with conditions", statusMark: "ok", note: <>Inform in the privacy policy and keep the purpose to the site&apos;s own audience. <a className={link} href="/gdpr-analytics/spain/">Our analysis for Spain</a>.</> },
      { country: "France", authority: <>CNIL · <a className={link} href={CNIL_GUIDANCE}>Solutions pour les outils de mesure d&apos;audience</a></>, status: "Exemption with conditions", statusMark: "ok", note: <>The reference document: limited purpose, no cross-site matching, bounded retention. <a className={link} href="/gdpr-analytics/france/">Our analysis for France</a>.</> },
      { country: "Italy", authority: <>Garante · <a className={link} href={GARANTE_COOKIES}>Linee guida cookie</a></>, status: "Own criteria, check them", statusMark: "mid", note: "Criteria close to the CNIL's. Review the deployed configuration against the guidance." },
      { country: "Germany", authority: <>DSK · <a className={link} href={DSK_SITE}>Orientierungshilfe Telemedien</a> · §25 TDDDG</>, status: "Not settled", statusMark: "mid", note: <>The strictest reading of what counts as access. Our reading is that no banner is needed for Sealmetrics, but it is not settled: review with your adviser. <a className={link} href="/gdpr-analytics/germany/">Our analysis for Germany</a>.</> },
      { country: "United Kingdom", authority: <>ICO · <a className={link} href={ICO_PECR}>Guide to PECR, cookies and similar technologies</a></>, status: "PECR, own criteria", statusMark: "mid", note: <>Outside the EU: the basis is PECR, not ePrivacy. <a className={link} href="/blog/uk-pecr-analytics-exemption/">The UK PECR analytics exemption, explained</a>.</> },
    ],
  },

  legal: {
    tag: "For your legal team",
    title: <>Ready to paste <em>to your DPO</em></>,
    body: "You do not have to defend it yourself. Paste this to legal and ask us for the document package.",
    copyLabel: "Copy",
    copiedLabel: "Copied",
    dpo: {
      title: "Summary for the DPO",
      text: "We want to use Sealmetrics to measure the audience of our website. It writes no cookies and nothing else to the visitor's device. It processes the technical data the browser sends in order to compute an ephemeral session identifier that rotates every day with a key that is destroyed, so it cannot be rebuilt or matched across sites. It does not store the IP address. Reports are always aggregated. Analytics data is processed only in the EU (Dublin), with fixed retention: technical log 1 day, hourly aggregates 90 days, daily aggregates and conversions 24 months. It relies on the audience-measurement exemption to Art. 5(3) ePrivacy as applied by the AEPD and the CNIL, with legitimate interest (Art. 6(1)(f) GDPR) as the basis for the session identifier. The vendor provides a DPA, a TPSR review and documentation of EU hosting.",
    },
    policy: {
      title: "Paragraph for your privacy policy",
      text: "Audience measurement. We use Sealmetrics to measure the audience of this website. It installs no cookies and stores nothing on your device. It processes the technical data your browser sends when a page loads in order to compute an ephemeral session identifier that rotates every day and cannot be rebuilt, and it does not store your IP address. The data is processed in the European Union in aggregate form, on the basis of our legitimate interest in knowing the audience of our website. To object to this measurement, see the rights section of this policy.",
    },
    give: <><strong>What we give you:</strong> the <a className={link} href="/dpa/">DPA</a>, the TPSR package (Transfer, Privacy and Security Review) and the documentation of the Dublin hosting.</>,
    yours: <><strong>What stays yours:</strong> informing in the privacy policy. The exemption removes the banner for measurement, not the duty to inform.</>,
  },

  trial: {
    tag: "30 days in parallel",
    title: <>You do not have to believe this page. <em>Measure it.</em></>,
    body: "Install it next to GA4, change nothing, and compare at day 30.",
    steps: [
      { when: "Day 1", title: "Install the pixel", body: "5 to 30 minutes depending on the platform. Outside the CMP. First data within the hour." },
      { when: "Days 1 to 30", title: "Change nothing", body: "GA4 keeps running. Sealmetrics measures beside it, on the same UTM parameters." },
      { when: "Day 30", title: "Compare visits and sales", body: "By channel and campaign. The difference is your hidden traffic, and it is different on every site: that is why it has to be measured." },
      { when: "Before you start", title: "Estimate your loss", body: <>The <a className={link} href="/data-loss-calculator/">data loss calculator</a> gives you a first figure from your traffic and your acceptance rate.</> },
    ],
    proof: { eyebrow: "Measured case · Incapto, Shopify store", value: "GA4 missed 29% of visits", body: "Over 48 days, Sealmetrics recorded 96% of real orders against the store's back office. Your figure will be different: measure it.", href: "/case-studies/incapto/", readCase: "Read the case" },
  },

  faqTag: "FAQ",
  faqTitle: <>What customers <em>actually ask</em></>,
  faq: [
    { question: "Can I remove the cookie banner?", answer: "Only if the only thing your site loads is Sealmetrics and what it strictly needs to work. If you keep GA4, the Meta pixel, remarketing or a third-party chat, the banner is still needed for them. What changes is that your measurement no longer depends on it." },
    { question: "Is this not fingerprinting?", answer: "What makes fingerprinting a problem is that it creates an identifier that persists and lets a person be followed over time and across sites. Our session identifier is computed with a key of the day that is destroyed at 04:00: the next day not even we can rebuild it, and it is never matched across sites. While it lasts it is pseudonymised data, which is why it has its own legal basis (legitimate interest)." },
    { question: "Do I keep using GA4?", answer: "Yes, if you want to. They run side by side without conflict, and that is what we recommend for the first 30 days. Many customers keep GA4 for what they already had built and use Sealmetrics as the source of the real figure for visits and sales." },
    { question: "What about remarketing?", answer: "Sealmetrics does no remarketing and builds no audiences, because that requires recognising the person. If you need it, it still goes through consent with whichever tool you use. What we give you is the full measurement of what those campaigns bring." },
    { question: "What happens in Germany?", answer: "Germany applies the strictest reading of what counts as accessing the device (§25 TDDDG). We will not tell you \"no banner needed\" there without a caveat: our reading is that none is needed for Sealmetrics, but it is not settled. Review it with your adviser with our legal package in hand." },
    { question: "Why do other tools say \"cookieless\" and still need a banner?", answer: "Because \"no cookies\" is not the same as \"no identifier\". Many tools replace the cookie with a visitor ID in localStorage or a hash that never expires. For the rule that is the same as a cookie. What counts is whether you write anything, and whether what you read serves anything beyond counting this site's audience." },
    { question: "What personal data does Sealmetrics process?", answer: "We store nothing on the device and no data that identifies anyone. The session identifier is ephemeral: it rotates every day and, once it rotates, not even we can rebuild it. Reports are always aggregated. We do not store the IP: it is compared on the fly against a public list of automated traffic and discarded." },
  ],

  notSaid: {
    title: "What this page deliberately does not say",
    body: "We do not say \"anonymous\": the session identifier, while it lasts, is pseudonymised data with its own legal basis (legitimate interest). We do not say \"100% GDPR compliant\": we say designed for GDPR from the architecture up, self-assessed and not certified. And we do not say \"no banner needed\" without a caveat: the exemption has conditions and each country applies it its own way. This is not legal advice.",
  },

  final: {
    tag: "Next step",
    title: <>Run it next to GA4 <em>for 30 days.</em></>,
    body: "Book a 30-minute walkthrough with the founder. Bring your DPO: the DPA and the TPSR package are on the call.",
    primary: { label: "Book a demo", href: "/demo/" },
    secondary: { label: "Read the DPA", href: "/dpa/" },
  },
};

export const whyNoConsentEs: WhyNoConsentContent = {
  route: "/es/por-que-sin-consentimiento",
  breadcrumbs: [{ label: "Inicio", href: "/es/" }, { label: "Por qué sin consentimiento" }],
  eyebrow: "Lo que nos preguntan los clientes",
  h1: <>¿Por qué Sealmetrics puede medir sin consentimiento <em>y los demás no?</em></>,
  heroBody:
    "Porque la ley no prohíbe medir. Prohíbe guardar o leer cosas en el dispositivo del visitante sin que lo autorice, salvo que sea para contar la audiencia del propio sitio y nada más. La mayoría de herramientas no caben en esa excepción. Sealmetrics está diseñado para caber.",
  heroPrimary: { label: "Pruébalo 30 días junto a GA4", href: "/es/demo/" },
  heroSecondary: { label: "El paquete para tu equipo legal", href: "/es/dpa/" },
  heroMicro: "Alojado en la UE (Dublín) · DPA incluido · no es asesoramiento legal · Alemania: nuestra lectura, no está asentado",
  byline: { byLabel: "Por", authorName: "Rafa Jiménez", authorHref: "/es/authors/rafa-jimenez/", dateLabel: "Publicado", date: WHY_NO_CONSENT_PUBLISHED, dateDisplay: "13 de octubre de 2026" },
  frame: {
    title: "Antes de seguir: lo que cambia y lo que no",
    stays: { tag: "Lo que no cambia", title: "El banner se queda si sigues usando GA4, el píxel de Meta o remarketing", body: "Esas herramientas escriben en el dispositivo y necesitan consentimiento. Sealmetrics no las sustituye en eso ni te permite quitar el banner por ellas." },
    changes: { tag: "Lo que sí cambia", title: "Dejas de perder a los visitantes que rechazan el banner", body: "Sealmetrics mide antes de que el visitante conteste y también cuando dice que no. El tráfico que hoy esconde el banner vuelve a tus informes." },
  },

  answerLabel: "Respuesta rápida",
  answer: (
    <p>
      El consentimiento para medir una web lo exige la normativa ePrivacy
      siempre que una herramienta guarda o lee información en el dispositivo del
      visitante, con dos excepciones: lo que el sitio necesita estrictamente para
      funcionar y, con condiciones, la medición de audiencia del propio sitio.
      Una herramienta con cookies como GA4 escribe un identificador de dos años,
      lo reutiliza entre sitios y alimenta publicidad, así que queda fuera de la
      excepción y necesita banner. Sealmetrics no escribe nada en el
      dispositivo; lee solo lo que el navegador envía de todos modos, calcula un
      identificador de sesión que rota cada día con una clave que se destruye a
      las 04:00, no guarda la dirección IP y solo entrega recuentos agregados
      del propio sitio. Esa es la configuración que la CNIL y la AEPD describen
      como medición de audiencia exenta de consentimiento, según nuestra propia
      autoevaluación. La excepción tiene condiciones y cada país la aplica a su
      manera; en Alemania no está asentado, y el banner se queda para cualquier
      otra herramienta que lo necesite.
    </p>
  ),

  browser: {
    tag: "1 / 4 · En el navegador",
    domain: "tu-tienda.com",
    title: <>Lo que una herramienta con cookies hace <em>en el dispositivo del visitante</em></>,
    body: "Al cargar la página, el script de GA4 (o de casi cualquier analítica) escribe una cookie con un identificador que sigue al visitante durante dos años, en ese sitio y, a través de la red de Google, en muchos otros. Escribir en el dispositivo es lo que la normativa europea ePrivacy (art. 5.3) condiciona al consentimiento. Por eso aparece el banner.",
    cookie: {
      label: "Herramienta con cookies",
      storage: "Almacenamiento del dispositivo",
      cookieLine: "_ga = GA1.2.1735…",
      lines: ["caduca en 2 años", "mismo ID en cada visita", "IP y User-Agent guardados"],
      remote: ["servidores en EE. UU.", "y publicidad"],
      banner: "Usamos cookies. ¿Aceptas?",
      accept: "Aceptar",
      verdict: "Escribe en el dispositivo, reutiliza el ID entre sitios y lo cede a terceros. Necesita banner, y pierde a todo el que dice que no.",
    },
    seal: {
      label: "Sealmetrics",
      storage: "Almacenamiento del dispositivo",
      empty: "vacío",
      emptyNote: "ni cookie, ni localStorage, ni ID",
      remote: ["solo en la UE (Dublín)", "tu propio dominio"],
      banner: "aquí no hace falta banner para medir",
      verdict: "No escribe nada en el dispositivo. Lo que lee sirve solo para contar la audiencia de este sitio. Cabe en la excepción de medición de audiencia.",
    },
  },

  pipeline: {
    tag: "2 / 4 · El dato que sí nos llega",
    title: <>Qué hacemos con él, <em>paso a paso</em></>,
    body: "Si no guardamos nada en el navegador, ¿cómo sabemos que dos páginas vistas son de la misma visita? Con un identificador efímero que se calcula al vuelo y caduca. No lo guardamos nosotros ni lo guarda el visitante.",
    steps: [
      { code: "A · Llega la petición", title: "Lo que el navegador ya envía", lines: ["Página, origen (UTM), hora,", "zona horaria, navegador."], highlight: ["La IP no se guarda: se compara con", "una lista pública de tráfico automatizado y se desecha."] },
      { code: "B · ID efímero", title: "Un cálculo con una clave diaria", lines: ["Esos datos más una clave secreta", "del día forman el identificador de sesión."], highlight: ["A las 04:00 la clave se destruye.", "Ni nosotros podemos rehacer el ID."] },
      { code: "C · Sesión", title: "Dura 2 horas y se acaba", lines: ["Une las páginas de una misma visita.", "Si vuelves mañana, eres una visita", "nueva. No hay recurrentes."] },
      { code: "D · Informe", title: "Siempre un recuento", lines: ["«142 visitas desde Google Ads", "a esta landing».", "Nunca «la visitante A volvió", "tres veces»."] },
    ],
    retentionLabel: "Retención, igual en todos los planes",
    retention: [["Log técnico", "1 día"], ["Agregados por hora", "90 días"], ["Agregados por día y conversiones", "24 meses"]],
  },

  rule: {
    tag: "3 / 4 · La regla",
    title: <>Las tres preguntas <em>que lo deciden</em></>,
    body: "La norma europea (ePrivacy, art. 5.3) dice: para guardar o leer información en el equipo del visitante hace falta su consentimiento, salvo que sea lo imprescindible para que la web funcione o, con condiciones, para contar la audiencia. Todas las herramientas pasan por las mismas tres preguntas. Lo que cambia es la respuesta.",
    colA: "Analítica con cookies (GA4)",
    colB: "Sealmetrics",
    questions: [
      {
        label: "Pregunta 1",
        question: "¿Toca el dispositivo del visitante?",
        note: "Escribir una cookie cuenta. Leer lo que el navegador envía por sí solo (idioma, pantalla, zona horaria) también cuenta como acceso.",
        a: { mark: "no", title: "Sí: escribe", body: "Deja una cookie con un ID que dura dos años y la lee en cada visita." },
        b: { mark: "mid", title: "Solo lee, no escribe nada", body: "Usa lo que el navegador ya envía. Como leer también es acceso, la regla se aplica y pasamos a la pregunta 2." },
      },
      {
        label: "Pregunta 2",
        question: "¿Lo usa solo para contar la audiencia de este sitio?",
        note: "Es la condición de la excepción: nada de perfiles, nada de cruzar con otros sitios, nada de ceder el dato a terceros.",
        a: { mark: "no", title: "No", body: "El mismo ID sirve a la red publicitaria de Google y se cruza entre sitios." },
        b: { mark: "ok", title: "Sí", body: "Recuentos de este sitio y nada más. Sin perfiles, sin uso publicitario." },
      },
      {
        label: "Pregunta 3",
        question: "¿El identificador caduca y no se puede rehacer?",
        note: "La excepción exige que no se pueda seguir a una persona en el tiempo.",
        a: { mark: "no", title: "No", body: "Mismo ID durante dos años. Te reconoce cada vez que vuelves." },
        b: { mark: "ok", title: "Sí", body: "Rota cada día y la clave con la que se calcula se destruye. Mañana eres una visita nueva." },
      },
    ],
    resultLabel: "Resultado",
    resultA: { title: "Hace falta consentimiento. Banner.", body: "Aquí caen también el píxel de Meta y la analítica «sin cookies» que guarda un ID de visitante en localStorage." },
    resultB: { title: "Cabe en la excepción de medición de audiencia.", body: "Sin banner para medir, según nuestra autoevaluación. Cómo lo aplica cada país, en la tabla de más abajo." },
  },

  checklist: {
    tag: "4 / 4 · Las condiciones",
    title: <>Lo que comprueba un DPO, <em>una a una</em></>,
    body: "No es una etiqueta de producto. Es cómo está construido el sistema, y cada fila se puede verificar en el DPA y en la documentación pública.",
    headers: ["Condición", "Analítica con cookies (GA4)", "Sealmetrics"],
    rows: [
      { condition: "No escribe cookies ni localStorage en el dispositivo", a: "No", b: "Sí", aMark: "no", bMark: "ok" },
      { condition: "Sin identificador persistente de visitante", note: "El nuestro rota cada día y no se puede reconstruir", a: "No · _ga, 2 años", b: "Sí", aMark: "no", bMark: "ok" },
      { condition: "No guarda la dirección IP", note: "Se usa al vuelo para descartar tráfico automatizado y se desecha. El país sale de la zona horaria.", a: "No", b: "Sí", aMark: "no", bMark: "ok" },
      { condition: "Solo la audiencia del propio sitio, sin cruzar con otros", a: "No · red de Google", b: "Sí", aMark: "no", bMark: "ok" },
      { condition: "Sin perfiles de comportamiento ni uso publicitario", a: "No", b: "Sí", aMark: "no", bMark: "ok" },
      { condition: "Datos de analítica procesados solo en la UE", a: "No · EE. UU. por defecto", b: "Sí · Dublín", aMark: "no", bMark: "ok" },
      { condition: "Retención fija y limitada", a: "Configurable · 2 o 14 meses", b: "Sí · 1 d / 90 d / 24 m", aMark: "mid", bMark: "ok" },
      { condition: "Informes siempre agregados", a: "No · explorador por usuario", b: "Sí", aMark: "no", bMark: "ok" },
      { condition: "Primera parte: el píxel se sirve desde tu propio dominio", a: "No", b: "Sí · 846 bytes", aMark: "no", bMark: "ok" },
    ],
  },

  scope: {
    tag: "Lo que obtienes",
    title: <>Lo que tienes, <em>y lo que no</em></>,
    body: "Medir sin identificador persistente tiene un precio, y preferimos decírtelo nosotros. Esto es lo que hace el producto hoy, no una promesa.",
    yes: {
      title: "Sí, sobre los visitantes que hoy esconde el banner",
      items: [
        <><strong>Visitas y páginas vistas</strong> por canal, campaña, fuente y landing.</>,
        <><strong>Conversiones y ventas</strong> con su importe, atribuidas a último clic.</>,
        <><strong>ROAS y coste por conversión</strong> de cada campaña con parámetros UTM.</>,
        <><strong>Comparación con GA4</strong> desde el primer día, en paralelo.</>,
        <><strong>Tráfico que hoy no ves</strong>: quien rechaza, quien no contesta y buena parte de quien usa bloqueador.</>,
      ],
    },
    no: {
      title: "No, porque no reconocemos a nadie",
      items: [
        <><strong>Visitantes recurrentes.</strong> Quien vuelve mañana es una visita nueva.</>,
        <><strong>Datos por usuario</strong>, cohortes, retención o embudos entre días.</>,
        <><strong>Audiencias de remarketing.</strong> Eso sigue necesitando consentimiento, con cualquier herramienta.</>,
        <><strong>Cross-device.</strong> Tu móvil y tu portátil son dos visitas.</>,
        <><strong>Atribución multitoque</strong> entre sesiones de distintos días.</>,
      ],
    },
  },

  install: {
    tag: "El error de instalación",
    title: <>El error que <em>lo tira todo</em></>,
    body: "Muchos equipos meten el píxel de Sealmetrics dentro de la categoría «analítica» de su gestor de consentimiento (CMP). Así solo se carga cuando el visitante acepta, y pierdes exactamente lo que venías a medir. El píxel no necesita consentimiento: va fuera del CMP, en la plantilla base, como el CSS.",
    bad: { label: "Mal: dentro del CMP", code: "<script type=\"text/plain\"\n  data-cookieconsent=\"statistics\"\n  src=\"https://tu-dominio.com/sm.js\">\n</script>\n// solo se carga si aceptan: el resto se pierde", verdict: "Mides solo a quien acepta. El mismo agujero que GA4." },
    good: { label: "Bien: fuera del CMP", code: "<script async\n  src=\"https://tu-dominio.com/sm.js\">\n</script>\n// en la plantilla base, antes del CMP\n// se carga siempre, no escribe nada", verdict: "Mides todas las visitas. Es legal porque no toca el dispositivo con fines ajenos a la medición de audiencia." },
  },

  countries: {
    tag: "Por país",
    title: <>Cómo aplica cada autoridad <em>la excepción</em></>,
    body: "La regla es europea, pero la excepción la concreta cada autoridad. Mira los países donde vendes. Cada fila enlaza a la publicación de la autoridad o a nuestro análisis de ella.",
    headers: ["País", "Autoridad y documento", "Medición de audiencia sin consentimiento", "Qué conviene saber"],
    rows: [
      { country: "España", authority: <>AEPD · <a className={link} href={AEPD_GUIDE}>Guía sobre el uso de las cookies</a></>, status: "Excepción con condiciones", statusMark: "ok", note: <>Informar en la política de privacidad y limitar la finalidad a la audiencia del propio sitio. <a className={link} href="/es/gdpr-analytics/spain/">Nuestro análisis para España</a>.</> },
      { country: "Francia", authority: <>CNIL · <a className={link} href={CNIL_GUIDANCE}>Solutions pour les outils de mesure d&apos;audience</a></>, status: "Excepción con condiciones", statusMark: "ok", note: <>El documento de referencia: finalidad limitada, sin cruce entre sitios, retención acotada. <a className={link} href="/gdpr-analytics/france/">Nuestro análisis para Francia</a> (en inglés).</> },
      { country: "Italia", authority: <>Garante · <a className={link} href={GARANTE_COOKIES}>Linee guida cookie</a></>, status: "Criterios propios: revisar", statusMark: "mid", note: "Criterios parecidos a los de la CNIL. Revisa la configuración desplegada frente a la guía." },
      { country: "Alemania", authority: <>DSK · <a className={link} href={DSK_SITE}>Orientierungshilfe Telemedien</a> · §25 TDDDG</>, status: "No está asentado", statusMark: "mid", note: <>La lectura más estricta de qué cuenta como acceso. Nuestra lectura es que Sealmetrics no necesita banner, pero no está asentado: revísalo con tu asesor. <a className={link} href="/gdpr-analytics/germany/">Nuestro análisis para Alemania</a> (en inglés).</> },
      { country: "Reino Unido", authority: <>ICO · <a className={link} href={ICO_PECR}>Guide to PECR, cookies and similar technologies</a></>, status: "PECR, criterios propios", statusMark: "mid", note: <>Fuera de la UE: la base es PECR, no ePrivacy. <a className={link} href="/blog/uk-pecr-analytics-exemption/">La excepción de analítica de PECR, explicada</a> (en inglés).</> },
    ],
  },

  legal: {
    tag: "Para tu equipo legal",
    title: <>Listo para pegar <em>a tu DPO</em></>,
    body: "Tú no tienes que defenderlo. Pégales esto y pídenos el paquete de documentos.",
    copyLabel: "Copiar",
    copiedLabel: "Copiado",
    dpo: {
      title: "Resumen para el DPO",
      text: "Queremos usar Sealmetrics para medir la audiencia de nuestra web. No escribe cookies ni nada en el dispositivo del visitante. Procesa los datos técnicos que el navegador envía para calcular un identificador de sesión efímero que rota cada día con una clave que se destruye, de modo que no puede reconstruirse ni cruzarse entre sitios. No almacena la dirección IP. Los informes son siempre agregados. Los datos de analítica se procesan solo en la UE (Dublín), con retención fija: log técnico 1 día, agregados por hora 90 días, agregados por día y conversiones 24 meses. Se apoya en la excepción de medición de audiencia del art. 5.3 de ePrivacy tal y como la aplican la AEPD y la CNIL, con base en el interés legítimo (art. 6.1.f RGPD) para el identificador de sesión. El proveedor facilita DPA, revisión TPSR y documentación del alojamiento en la UE.",
    },
    policy: {
      title: "Párrafo para tu política de privacidad",
      text: "Medición de audiencia. Utilizamos Sealmetrics para medir la audiencia de este sitio. No instala cookies ni guarda información en tu dispositivo. Procesa los datos técnicos que tu navegador envía al cargar la página para calcular un identificador de sesión efímero que rota cada día y no puede reconstruirse, y no almacena tu dirección IP. Los datos se tratan en la Unión Europea en forma agregada, sobre la base de nuestro interés legítimo en conocer la audiencia de nuestro sitio. Para oponerte a esta medición, consulta el apartado de derechos de esta política.",
    },
    give: <><strong>Lo que te damos:</strong> el <a className={link} href="/es/dpa/">DPA</a>, el paquete TPSR (Transfer, Privacy and Security Review) y la documentación del alojamiento en Dublín.</>,
    yours: <><strong>Lo que te toca a ti:</strong> informar en la política de privacidad. La excepción quita el banner para medir, no la obligación de informar.</>,
  },

  trial: {
    tag: "30 días en paralelo",
    title: <>No hace falta creerse esta página. <em>Mídelo.</em></>,
    body: "Instálalo junto a GA4, no toques nada y compara a los 30 días.",
    steps: [
      { when: "Día 1", title: "Instala el píxel", body: "De 5 a 30 minutos según la plataforma. Fuera del CMP. Primeros datos en la primera hora." },
      { when: "Días 1 a 30", title: "No toques nada", body: "GA4 sigue igual. Sealmetrics mide a su lado, con los mismos parámetros UTM." },
      { when: "Día 30", title: "Compara visitas y ventas", body: "Por canal y campaña. La diferencia es tu tráfico escondido, y es distinta en cada sitio: por eso hay que medirla." },
      { when: "Antes de empezar", title: "Estima tu pérdida", body: <>La <a className={link} href="/es/data-loss-calculator/">calculadora de pérdida de datos</a> te da una primera cifra con tu tráfico y tu tasa de aceptación.</> },
    ],
    proof: { eyebrow: "Caso medido · Incapto, tienda en Shopify", value: "GA4 no vio el 29% de las visitas", body: "En 48 días, Sealmetrics registró el 96% de los pedidos reales contra el back office de la tienda. Tu cifra será otra: mídela.", href: "/es/case-studies/incapto/", readCase: "Leer el caso" },
  },

  faqTag: "Preguntas",
  faqTitle: <>Lo que de verdad <em>nos preguntan</em></>,
  faq: [
    { question: "¿Puedo quitar el banner de cookies?", answer: "Solo si lo único que carga tu web es Sealmetrics y lo estrictamente necesario para que funcione. Si mantienes GA4, el píxel de Meta, remarketing o un chat de terceros, el banner sigue haciendo falta por ellos. Lo que cambia es que tu medición deja de depender de él." },
    { question: "¿Esto no es fingerprinting?", answer: "Lo que hace problemático al fingerprinting es que crea un identificador que persiste y permite seguir a una persona en el tiempo y entre sitios. Nuestro identificador de sesión se calcula con una clave del día que se destruye a las 04:00: al día siguiente ni nosotros podemos rehacerlo, y nunca se cruza con otros sitios. Mientras dura es un dato seudonimizado, y por eso tiene base legal propia (interés legítimo)." },
    { question: "¿Sigo usando GA4?", answer: "Sí, si quieres. Conviven sin problema y es lo que recomendamos los primeros 30 días. Muchos clientes mantienen GA4 para lo que ya tenían montado y usan Sealmetrics como fuente de la cifra real de visitas y ventas." },
    { question: "¿Y el remarketing?", answer: "Sealmetrics no hace remarketing ni crea audiencias, porque eso exige reconocer a la persona. Si lo necesitas, sigue pasando por consentimiento con la herramienta que uses. Lo que te damos es la medición completa de lo que esas campañas traen." },
    { question: "¿Qué pasa en Alemania?", answer: "Alemania aplica la lectura más estricta de qué es acceder al dispositivo (§25 TDDDG). No te vamos a decir «no necesitas banner» allí sin matiz: nuestra lectura es que Sealmetrics no lo necesita, pero no está asentado. Revísalo con tu asesor con nuestro paquete legal en la mano." },
    { question: "¿Por qué otros dicen «sin cookies» y aun así necesitan banner?", answer: "Porque «sin cookies» no es lo mismo que «sin identificador». Muchas herramientas sustituyen la cookie por un ID de visitante en localStorage o por un hash que no caduca. Para la norma es lo mismo que una cookie. Lo que cuenta es si escribes algo y si lo que lees sirve para algo más que contar la audiencia de este sitio." },
    { question: "¿Qué datos personales trata Sealmetrics?", answer: "No guardamos nada en el dispositivo ni datos que identifiquen a nadie. El identificador de sesión es efímero: rota cada día y, al rotar, ni nosotros podemos reconstruirlo. Los informes son siempre agregados. No almacenamos la IP: se compara al instante con una lista pública de tráfico automatizado y se desecha." },
  ],

  notSaid: {
    title: "Lo que esta página no dice, a propósito",
    body: "No decimos «anónimo»: el identificador de sesión, mientras dura, es un dato seudonimizado con su base legal (interés legítimo). No decimos «100 % conforme con el RGPD»: decimos diseñado para cumplirlo desde la arquitectura, autoevaluado y sin certificar. Y no decimos «no necesitas banner» sin matiz: la excepción tiene condiciones y cada país la aplica a su manera. Esto no es asesoramiento legal.",
  },

  final: {
    tag: "Siguiente paso",
    title: <>Pruébalo junto a GA4 <em>durante 30 días.</em></>,
    body: "Reserva 30 minutos con el founder. Trae a tu DPO: el DPA y el paquete TPSR se entregan en la llamada.",
    primary: { label: "Reservar una demo", href: "/es/demo/" },
    secondary: { label: "Leer el DPA", href: "/es/dpa/" },
  },
};
