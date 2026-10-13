"use client";

import { useState } from "react";

/**
 * A block of text the reader pastes somewhere else (to a DPO, into a privacy
 * policy). The text is ordinary prose on the page, so answer engines and the
 * Markdown twin read it; only the button is marked `data-md="skip"`.
 * Clipboard access can be refused (older desktop apps, some embedded views):
 * on refusal the button simply keeps its label and the text stays selectable.
 */
export function CopyParagraph({ title, text, copyLabel, copiedLabel }: { title: string; text: string; copyLabel: string; copiedLabel: string }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }
  return (
    <article className="sig-wnc-copy">
      <div className="sig-wnc-copy-head">
        <h3>{title}</h3>
        <button type="button" onClick={copy} data-md="skip" aria-label={`${copyLabel}: ${title}`}>{copied ? copiedLabel : copyLabel}</button>
      </div>
      <p>{text}</p>
    </article>
  );
}
