import { buildRedirectMetadata, RedirectStub } from "@/components/ui/Redirect";

export const metadata = buildRedirectMetadata("/blog");

export default function Page() {
  return <RedirectStub to="/blog" />;
}
