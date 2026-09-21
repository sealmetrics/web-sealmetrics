import { buildRedirectMetadata, RedirectStub } from "@/components/ui/Redirect";

// The post moved to /blog/why-ga4-misses-traffic/ when the universal GA4 loss
// figure was retired (founder decision 2026-09-21). This path stays alive for
// already-indexed URLs and inbound links; the shared stub carries the noindex,
// the canonical to the new URL and the real meta refresh.
export const metadata = buildRedirectMetadata("/blog/why-ga4-misses-traffic/");

export default function Page() {
  return <RedirectStub to="/blog/why-ga4-misses-traffic/" />;
}
