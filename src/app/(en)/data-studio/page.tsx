import { buildRedirectMetadata, RedirectStub } from "@/components/ui/Redirect";
import { DATA_STUDIO_REPORT_URL } from "@/lib/content/data-studio";

// Short link for emails and docs: sealmetrics.com/data-studio/ → one-click report.
export const metadata = buildRedirectMetadata(DATA_STUDIO_REPORT_URL, {
  label: "Data Studio",
  canonical: "/data-studio/",
});

export default function Page() {
  return <RedirectStub to={DATA_STUDIO_REPORT_URL} label="Data Studio" />;
}
