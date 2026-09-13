"use client";

import { useState } from "react";

export function CopyActivationPrompt({ prompt, label, copyLabel, copiedLabel, errorLabel }: {
  prompt: string; label: string; copyLabel: string; copiedLabel: string; errorLabel: string;
}) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");
  async function copy() {
    try {
      await navigator.clipboard.writeText(prompt);
      setStatus("copied");
    } catch {
      setStatus("error");
    }
  }
  return <div className="reality-prompt">
    <div className="reality-prompt-top"><span className="reality-mono">{label}</span><span aria-hidden="true">↙</span></div>
    <p>{prompt}</p>
    <div data-md="skip" className="reality-prompt-bottom">
      <button onClick={copy} type="button">{status === "copied" ? copiedLabel : copyLabel}<span aria-hidden="true">{status === "copied" ? "✓" : "↗"}</span></button>
      <span role="status" aria-live="polite">{status === "error" ? errorLabel : status === "copied" ? copiedLabel : ""}</span>
    </div>
  </div>;
}
