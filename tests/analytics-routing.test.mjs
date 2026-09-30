import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import ts from "typescript";

const source = readFileSync("src/lib/analytics.ts", "utf8");
const compiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.ESNext,
    target: ts.ScriptTarget.ES2022,
  },
}).outputText;
const analytics = await import(
  `data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}`
);

test("content groups accept exported trailing-slash URLs", () => {
  const cases = [
    ["/", "home"],
    ["/product/", "product"],
    ["/pricing/", "pricing"],
    ["/how-it-works/", "how-it-works"],
    ["/security/", "security"],
    ["/es/product/", "product"],
    ["/es/pricing/", "pricing"],
    ["/es/how-it-works/", "how-it-works"],
    ["/es/security/", "security"],
    ["/case-studies/dreamplace-hotels/", "case-studies"],
  ];

  for (const [pathname, expected] of cases) {
    assert.equal(analytics.getContentGroup(pathname), expected, pathname);
  }
});

test("microconversions accept exported trailing-slash URLs", () => {
  assert.equal(analytics.getMicroConversion("/pricing/"), "pricing_view");
  assert.equal(analytics.getMicroConversion("/es/demo/"), "contact_view");
  assert.equal(analytics.getMicroConversion("/audit/"), "audit_view");
});

test("brand-report thank-you view and its free-account CTA are measured", () => {
  assert.equal(
    analytics.getMicroConversion("/ai-brand-monitoring/thank-you/"),
    "brand_report_thank_you_view",
  );
  assert.equal(
    analytics.getMicroConversion("/es/ai-brand-monitoring/thank-you/"),
    "brand_report_thank_you_view",
  );
  assert.equal(analytics.getMicroConversion("/ai-brand-monitoring/"), undefined);
  assert.equal(analytics.isCtaHref("/free-account/"), true);
  assert.equal(analytics.isCtaHref("/es/cuenta-gratis/"), true);
});
