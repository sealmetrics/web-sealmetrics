import Link from "next/link";

type Locale = "en" | "es";

const copy = {
  en: {
    home: "Home",
    parent: "AI brand monitoring",
    breadcrumb: "Sample report",
    eyebrow: "Sample report · fictional brand",
    title: "What AI models say about Acme Coffee",
    intro:
      "This is the full report you receive, made for an invented coffee brand. The layout, the four states, the counts and the method are the real report's; the brand, its competitors and every answer are made up, so no company is on display without having asked. Yours arrives in about five minutes, about your own brand.",
    cta: "Request your report",
    file: "/samples/ai-brand-report-acme",
    frameTitle: "Sample AI brand monitoring report for the fictional brand Acme Coffee",
    open: "Open it full screen",
  },
  es: {
    home: "Inicio",
    parent: "Monitorización de marca en IA",
    breadcrumb: "Informe de muestra",
    eyebrow: "Informe de muestra · marca ficticia",
    title: "Qué dicen las IA de Acme Coffee",
    intro:
      "Éste es el informe completo que recibes, hecho para una marca de café inventada. La estructura, los cuatro estados, los recuentos y el método son los del informe real; la marca, sus competidores y cada respuesta son inventados, para no exponer a ninguna empresa que no lo haya pedido. El tuyo llega en unos cinco minutos, sobre tu propia marca.",
    cta: "Pide tu informe",
    file: "/es/samples/ai-brand-report-acme",
    frameTitle: "Informe de muestra de monitorización de marca en IA para la marca ficticia Acme Coffee",
    open: "Abrirlo a pantalla completa",
  },
} as const;

export function BrandReportSample({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const prefix = locale === "es" ? "/es" : "";

  return (
    <main className="sig-report-viewer">
      <section className="sig-report-viewer-head">
        <nav className="sig-report-viewer-crumbs" aria-label="Breadcrumb">
          <Link href={`${prefix}/`}>{t.home}</Link>
          <span>/</span>
          <Link href={`${prefix}/ai-brand-monitoring/`}>{t.parent}</Link>
          <span>/</span>
          <span>{t.breadcrumb}</span>
        </nav>
        <p className="sig-report-viewer-eyebrow">
          <span>{t.eyebrow}</span>
        </p>
        <h1>{t.title}</h1>
        <p className="sig-report-viewer-intro">{t.intro}</p>
        <div data-md="skip" className="sig-report-viewer-actions">
          <Link href={`${prefix}/ai-brand-monitoring/#request`}>{t.cta}</Link>
          <a className="sig-report-viewer-secondary" href={t.file} target="_blank" rel="noopener">
            {t.open}
          </a>
        </div>
      </section>

      {/* The sample is a static file on this origin, rendered by Enroutia's own generator
          (scripts/brand-report-sample/build.py). Sandboxed without scripts: it is drawn,
          never run. Same-origin keeps the report's side navigation working. */}
      <iframe
        className="sig-report-viewer-frame"
        title={t.frameTitle}
        src={t.file}
        sandbox="allow-same-origin allow-popups allow-popups-to-escape-sandbox"
        loading="lazy"
      />
    </main>
  );
}
