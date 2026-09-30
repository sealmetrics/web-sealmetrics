import { buildRedirectMetadata, RedirectStub } from "@/components/ui/Redirect";

export const metadata = buildRedirectMetadata("/consentless-analytics");

export default function Page() {
  return <RedirectStub to="/consentless-analytics" />;
}
