"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FORMS_WORKER_BASE } from "@/lib/forms/submit";

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
  | { kind: "ready"; html: string }
  | { kind: "missing" }
  | { kind: "expired" }
  | { kind: "error" };

// Links inside the report open in a new tab: the frame is sandboxed without
// same-origin, so a link followed inside it would strand the reader there.
function withNewTabLinks(html: string): string {
  const base = '<base target="_blank">';
  return /<head[^>]*>/i.test(html) ? html.replace(/<head[^>]*>/i, (tag) => `${tag}${base}`) : base + html;
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
        setState({ kind: "ready", html: await response.text() });
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
          // No allow-scripts and no allow-same-origin: the report is drawn, not run,
          // and it cannot reach this page or its storage.
          sandbox="allow-popups allow-popups-to-escape-sandbox"
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
