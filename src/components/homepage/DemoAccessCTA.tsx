"use client";

import { useEffect, useRef, useState } from "react";
import { type QuizAnswers } from "@/lib/content/diagnostic";
import { pushEvent } from "@/lib/analytics";
import { buildSignupPayload } from "@/lib/signup/payload";
import { submitFirstPartyForm } from "@/lib/forms/submit";
import { LeadTurnstile } from "@/components/forms/LeadTurnstile";

interface DemoAccessCTAProps {
  answers: QuizAnswers;
}

export function DemoAccessCTA({ answers }: DemoAccessCTAProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [gdprConsent, setGdprConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileResetKey, setTurnstileResetKey] = useState(0);
  const microFired = useRef(false);

  useEffect(() => {
    if (status !== "success" || microFired.current) return;
    microFired.current = true;
    pushEvent({ event: "lead_diagnostic_demo_access", email });
  }, [status, email]);

  const canSubmit =
    name.trim() && email.trim() && company.trim() && gdprConsent && turnstileToken && status !== "submitting";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;

    setStatus("submitting");

    const signup = buildSignupPayload({
      email: email.trim(),
      name: name.trim(),
      company: company.trim(),
      source: "signup",
      extraMetadata: {
        form: "diagnostic_demo_access",
        quiz_answers_json: JSON.stringify(answers),
      },
    });

    try {
      await submitFirstPartyForm(
        "growth",
        {
          name: name.trim(),
          email: email.trim(),
          company: company.trim(),
          source: "diagnostic_demo_access",
          quiz_answers: answers,
          signup,
        },
        { turnstileToken: turnstileToken ?? "" }
      );
      setStatus("success");
    } catch {
      setStatus("error");
      setTurnstileToken(null);
      setTurnstileResetKey((key) => key + 1);
    }
  }

  return (
    <section className="py-20 bg-warm-900 section-dark">
      <div className="max-w-[560px] mx-auto px-5 sm:px-8">
        <h2 className="text-[1.5rem] sm:text-[1.75rem] font-normal text-dark-text text-center leading-snug mb-3">
          Your data. Your dashboard. See it live.
        </h2>
        <p className="text-[0.95rem] text-dark-text-secondary text-center mb-10">
          Access our interactive demo account — enter your details and we will
          send you credentials within minutes.
        </p>

        {status === "success" ? (
          <div className="text-center p-8 border border-green-muted/30 rounded-[4px]">
            <p className="text-[1.1rem] text-green-muted font-medium mb-2">
              Check your inbox
            </p>
            <p className="text-[0.9rem] text-dark-text-secondary">
              We have sent your demo credentials to{" "}
              <span className="text-dark-text">{email}</span>. They should
              arrive within a few minutes.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="demo-name"
                className="block text-[0.8rem] text-dark-text-secondary mb-1.5"
              >
                Your name
              </label>
              <input
                id="demo-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-[4px] text-[0.95rem] text-dark-text placeholder:text-dark-text-tertiary focus:outline-none focus:border-green-muted/50 transition-colors"
                placeholder="Jane Doe"
              />
            </div>

            <div>
              <label
                htmlFor="demo-email"
                className="block text-[0.8rem] text-dark-text-secondary mb-1.5"
              >
                Work email
              </label>
              <input
                id="demo-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-[4px] text-[0.95rem] text-dark-text placeholder:text-dark-text-tertiary focus:outline-none focus:border-green-muted/50 transition-colors"
                placeholder="jane@company.com"
              />
            </div>

            <div>
              <label
                htmlFor="demo-company"
                className="block text-[0.8rem] text-dark-text-secondary mb-1.5"
              >
                Company name
              </label>
              <input
                id="demo-company"
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-[4px] text-[0.95rem] text-dark-text placeholder:text-dark-text-tertiary focus:outline-none focus:border-green-muted/50 transition-colors"
                placeholder="Acme Corp"
              />
            </div>

            <label className="flex items-start gap-3 cursor-pointer pt-2">
              <input
                type="checkbox"
                checked={gdprConsent}
                onChange={(e) => setGdprConsent(e.target.checked)}
                className="mt-0.5 accent-green-muted w-4 h-4 cursor-pointer"
              />
              <span className="text-[0.8rem] text-dark-text-tertiary leading-relaxed">
                I agree to receive demo access credentials and occasional
                product updates. You can unsubscribe at any time.{" "}
                <a
                  href="/privacy/"
                  className="text-dark-text-secondary underline"
                >
                  Privacy policy
                </a>
              </span>
            </label>

            <LeadTurnstile onToken={setTurnstileToken} resetKey={turnstileResetKey} />

            {status === "error" && (
              <p className="text-[0.85rem] text-red-alert">
                Something went wrong. Please try again.
              </p>
            )}

            <button
              type="submit"
              disabled={!canSubmit}
              className="w-full mt-2 px-7 py-3.5 text-[0.95rem] font-medium text-warm-900 bg-green-muted rounded-[4px] transition-colors hover:bg-green-muted/90 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              {status === "submitting"
                ? "Sending..."
                : "Access interactive demo"}
            </button>

            <p className="text-[0.75rem] text-dark-text-tertiary text-center pt-1">
              Demo account expires after 7 days.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
