"use client";

import { useState } from "react";

/* One copyable command or URL. Plain text on the page, one click to the
   clipboard, and a fallback message when the browser refuses. */
export function CopyCommand({ text, copyLabel, copiedLabel }: { text: string; copyLabel: string; copiedLabel: string }) {
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
  return <div className="fa-cmd"><code>{text}</code><button type="button" onClick={copy} data-md="skip" aria-label={`${copyLabel}: ${text}`}>{copied ? copiedLabel : copyLabel}</button></div>;
}
