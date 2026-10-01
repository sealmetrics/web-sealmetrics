import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import test from "node:test";

const root = process.cwd();
const src = path.join(root, "src");

function sourceFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) return sourceFiles(file);
    return /\.(?:ts|tsx|js|jsx)$/.test(entry.name) ? [file] : [];
  });
}

const files = sourceFiles(src);

test("browser source contains no n8n webhook endpoint", () => {
  const exposed = files.filter((file) => {
    const source = readFileSync(file, "utf8");
    return /https?:\/\/[^\s"']*n8n|\/webhook\//i.test(source);
  });
  assert.deepEqual(exposed, []);
});

// Turnstile was removed from the lead forms on 1 Oct 2026. The relay no longer
// verifies a token, so a widget left behind would only block people for nothing.
test("every public lead flow uses the relay, and none renders a challenge", () => {
  const callers = files.filter((file) => {
    const source = readFileSync(file, "utf8");
    return (
      source.includes("submitFirstPartyForm(") &&
      !source.includes("function submitFirstPartyForm(")
    );
  });
  assert.ok(callers.length >= 8, "expected every public lead flow to use the relay");
  for (const file of callers) {
    const source = readFileSync(file, "utf8");
    assert.doesNotMatch(source, /turnstile/i, `${file} still references Turnstile`);
  }
});

test("production forms target the first-party relay", () => {
  const env = readFileSync(path.join(root, ".env.production"), "utf8");
  const endpoint = env.match(/^NEXT_PUBLIC_FORMS_ENDPOINT=(.+)$/m)?.[1] ?? "";
  assert.match(endpoint, /^https:\/\/[^/]+\/api\/forms$/);
  assert.doesNotMatch(endpoint, /n8n/i);
});
