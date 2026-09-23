export type FirstPartyFormType =
  | "demo"
  | "demo_access"
  | "audit"
  | "careers"
  | "calculator"
  | "growth"
  | "brand_report"
  | "study_download";

const FORMS_ENDPOINT =
  process.env.NEXT_PUBLIC_FORMS_ENDPOINT ??
  "https://sealmetrics-forms.sealmetrics-forms-worker.workers.dev/api/forms";

export async function submitFirstPartyForm(
  type: FirstPartyFormType,
  payload: Record<string, unknown>,
  options: { companyFax?: string; turnstileToken?: string } = {}
) {
  const response = await fetch(FORMS_ENDPOINT, {
    method: "POST",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type,
      payload,
      company_fax: options.companyFax ?? "",
      turnstileToken: options.turnstileToken ?? "",
    }),
  });

  if (!response.ok) {
    throw new Error(`Form delivery failed with status ${response.status}`);
  }

  const result = (await response.json()) as { ok?: boolean };
  if (result.ok !== true) throw new Error("Form delivery was not accepted");
}
