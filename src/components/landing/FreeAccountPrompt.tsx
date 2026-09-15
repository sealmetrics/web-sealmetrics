"use client";

import { useState } from "react";
import { micro } from "@/lib/analytics";

/* Copying the prompt is the closest on-page proxy for "went to Claude to open
   the account", so it is the micro-conversion the ad platforms optimise on. */
export function FreeAccountPrompt({ prompt, label, copyLabel, copiedLabel, errorLabel, landing }: {
  prompt: string; label: string; copyLabel: string; copiedLabel: string; errorLabel: string; landing: string;
}) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");
  async function copy() {
    try {
      await navigator.clipboard.writeText(prompt);
      setStatus("copied");
      micro("lp_prompt_copied", { landing });
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
