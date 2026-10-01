"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FORMS_WORKER_BASE } from "@/lib/forms/submit";
import { ReportShare } from "@/components/v4/ReportShare";

type Locale = "en" | "es";

// Same shape the Worker accepts: n8n generates 32 random bytes, base64url.
const TOKEN_RE = /^[A-Za-z0-9_-]{32,64}$/;

const copy = {
  en: {
    home: "Home",
    parent: "AI brand monitoring",
    breadcrumb: "Full report",
    eyebrow: "Full report · private link",
    title: "What AI models say about your brand",
    intro:
      "Every model's answer, verbatim, with the errors worth correcting and what to do about them. This link is private and expires 30 days after the report was sent.",
    loading: "Loading the report…",
    download: "Download the report",
    downloadName: "what-ai-models-say.html",
    missingTitle: "This link is incomplete.",
    missingBody:
      "The address must include everything after the # in the email. Open the link from the email again, or copy it whole.",
    expiredTitle: "This report is no longer available.",
    expiredBody:
      "Full reports stay online for 30 days. The PDF summary attached to the email is still yours; for a fresh report, ask for another one.",
    errorTitle: "The report could not be loaded right now.",
    errorBody: "Try again in a moment. The PDF summary attached to the email has the figures and the recommendations.",
    again: "Ask for a new report",
    frameTitle: "Full AI brand monitoring report",
  },
  es: {
    home: "Inicio",
    parent: "Monitorización de marca en IA",
    breadcrumb: "Informe completo",
    eyebrow: "Informe completo · enlace privado",
    title: "Qué dicen las IA de tu marca",
    intro:
      "La respuesta literal de cada modelo, con los errores que conviene corregir y qué hacer con ellos. Este enlace es privado y caduca 30 días después del envío del informe.",
    loading: "Cargando el informe…",
    download: "Descargar el informe",
    downloadName: "que-dicen-las-ia.html",
    missingTitle: "A este enlace le falta una parte.",
    missingBody:
      "La dirección tiene que incluir todo lo que va detrás del # en el correo. Vuelve a abrir el enlace desde el correo o cópialo entero.",
    expiredTitle: "Este informe ya no está disponible.",
    expiredBody:
      "Los informes completos están en línea 30 días. El resumen en PDF que iba adjunto al correo sigue siendo tuyo; si quieres uno al día, pide otro.",
    errorTitle: "Ahora mismo no hemos podido cargar el informe.",
    errorBody: "Prueba en un momento. El resumen en PDF adjunto al correo tiene las cifras y las recomendaciones.",
    again: "Pedir un informe nuevo",
    frameTitle: "Informe completo de monitorización de marca en IA",
  },
} as const;

type State =
  | { kind: "loading" }
  | { kind: "ready"; html: string; token: string }
  | { kind: "missing" }
  | { kind: "expired" }
  | { kind: "error" };

// Links that leave the report open in a new tab, so a page followed inside the frame
// does not strand the reader there. In-page anchors (the side navigation: #resumen,
// #errores…) stay in the frame. Two things broke them on 30 Sep 2026: a document-wide
// <base target="_blank"> sent them to an empty tab, and a srcdoc document resolves
// "#errores" against the parent's URL, so the frame tried to load this whole page.
// `<base href="about:srcdoc">` makes the fragment point at the report itself.
function withNewTabLinks(html: string): string {
  const doc = new DOMParser().parseFromString(html, "text/html");
  const base = doc.createElement("base");
  base.setAttribute("href", "about:srcdoc");
  doc.head.prepend(base);
  for (const link of Array.from(doc.querySelectorAll("a[href]"))) {
    if ((link.getAttribute("href") ?? "").startsWith("#")) continue;
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener noreferrer");
  }
  return `<!doctype html>${doc.documentElement.outerHTML}`;
}

export function BrandReportViewer({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const prefix = locale === "es" ? "/es" : "";
  const [state, setState] = useState<State>({ kind: "loading" });
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  useEffect(() => {
    // The token lives after the `#`: a fragment is never sent to a server, so it
    // stays out of GitHub Pages' logs and out of any Referer.
    const token = window.location.hash.replace(/^#/, "");
    if (!TOKEN_RE.test(token)) {
      setState({ kind: "missing" });
      return;
    }
    const controller = new AbortController();
    fetch(`${FORMS_WORKER_BASE}/api/report/${token}`, { mode: "cors", signal: controller.signal })
      .then(async (response) => {
        if (response.status === 404) return setState({ kind: "expired" });
        if (!response.ok) return setState({ kind: "error" });
        setState({ kind: "ready", html: await response.text(), token });
      })
      .catch((error: unknown) => {
        if (!(error instanceof DOMException && error.name === "AbortError")) setState({ kind: "error" });
      });
    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (state.kind !== "ready") return;
    const url = URL.createObjectURL(new Blob([state.html], { type: "text/html;charset=utf-8" }));
    setDownloadUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [state]);

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
        {state.kind === "ready" && downloadUrl ? (
          <div data-md="skip" className="sig-report-viewer-actions">
            <a href={downloadUrl} download={t.downloadName}>
              {t.download}
            </a>
            <ReportShare locale={locale} token={state.token} />
          </div>
        ) : null}
      </section>

      {state.kind === "loading" ? (
        <p className="sig-report-viewer-status" role="status">
          {t.loading}
        </p>
      ) : null}

      {state.kind === "ready" ? (
        <iframe
          className="sig-report-viewer-frame"
          title={t.frameTitle}
          // No allow-scripts: the report is drawn, never run, so same-origin gives it no
          // way to reach this page or its storage. Same-origin is what lets the side
          // navigation's anchors scroll the frame; in an opaque origin they do nothing.
          sandbox="allow-same-origin allow-popups allow-popups-to-escape-sandbox"
          referrerPolicy="no-referrer"
          srcDoc={withNewTabLinks(state.html)}
        />
      ) : null}

      {state.kind === "missing" || state.kind === "expired" || state.kind === "error" ? (
        <section className="sig-report-viewer-notice" role="alert">
          <h2>{t[`${state.kind}Title`]}</h2>
          <p>{t[`${state.kind}Body`]}</p>
          {state.kind !== "error" ? (
            <div data-md="skip">
              <Link href={`${prefix}/ai-brand-monitoring/`}>{t.again}</Link>
            </div>
          ) : null}
        </section>
      ) : null}
    </main>
  );
}
