import { buildRedirectMetadata, RedirectStub } from "@/components/ui/Redirect";

export const metadata = buildRedirectMetadata("/complete-data");

export default function Page() {
  return <RedirectStub to="/complete-data" />;
}
