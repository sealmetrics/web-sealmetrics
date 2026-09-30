"use client";

import { useRef, useState, type ReactNode } from "react";

/**
 * One block of the customer privacy template, with a button that copies it.
 *
 * It copies two versions at once: HTML, so the headings, lists and tables survive
 * a paste into a CMS editor, and plain text for fields that take nothing else. The
 * HTML is cleaned of the site's classes first — a customer's policy should not
 * carry our Tailwind names. Nothing is stored anywhere; the state is the button
 * label for two seconds.
 */
export function CopyBlock({
  children,
  label,
  copiedLabel,
  failedLabel,
}: {
  children: ReactNode;
  label: string;
  copiedLabel: string;
  failedLabel: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");

  async function copy() {
    const node = ref.current;
    if (!node) return;
    const clone = node.cloneNode(true) as HTMLElement;
    clone.querySelectorAll("[class]").forEach((element) => element.removeAttribute("class"));
    clone.querySelectorAll("[aria-hidden]").forEach((element) => element.remove());
    const html = clone.innerHTML;
    const text = node.innerText.trim();
    // Three ways, best first: rich HTML, plain text, and the selection-based copy that
    // needs no clipboard permission. Browsers refuse the first two in some embedded
    // views and without HTTPS; the last one leaves the block selected either way, so
    // "copy it by hand" is one keystroke.
    const attempts: Array<() => Promise<boolean>> = [
      async () => {
        if (typeof ClipboardItem === "undefined" || !navigator.clipboard?.write) return false;
        await navigator.clipboard.write([
          new ClipboardItem({
            "text/html": new Blob([html], { type: "text/html" }),
            "text/plain": new Blob([text], { type: "text/plain" }),
          }),
        ]);
        return true;
      },
      async () => {
        if (!navigator.clipboard?.writeText) return false;
        await navigator.clipboard.writeText(text);
        return true;
      },
      async () => {
        const selection = window.getSelection();
        if (!selection) return false;
        const range = document.createRange();
        range.selectNodeContents(node);
        selection.removeAllRanges();
        selection.addRange(range);
        return document.execCommand("copy");
      },
    ];
    let copied = false;
    for (const attempt of attempts) {
      try {
        if (await attempt()) {
          copied = true;
          break;
        }
      } catch {
        // The next method, then.
      }
    }
    setState(copied ? "copied" : "failed");
    window.setTimeout(() => setState("idle"), 2000);
  }

  return (
    <div className="my-4 border border-warm-100 bg-warm-white">
      <div className="flex justify-end border-b border-warm-100 px-3 py-2" data-md="skip">
        <button
          type="button"
          onClick={copy}
          className="border border-ink bg-white px-3 py-1 font-mono text-[0.72rem] font-semibold uppercase tracking-[0.08em] text-ink transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
        >
          <span aria-live="polite">
            {state === "copied" ? copiedLabel : state === "failed" ? failedLabel : label}
          </span>
        </button>
      </div>
      <div ref={ref} className="px-4 py-2 sm:px-5">
        {children}
      </div>
    </div>
  );
}
