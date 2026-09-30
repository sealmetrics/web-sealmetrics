import { buildRedirectMetadata, RedirectStub } from "@/components/ui/Redirect";

export const metadata = buildRedirectMetadata("/cookieless-analytics");

export default function Page() {
  return <RedirectStub to="/cookieless-analytics" />;
}
