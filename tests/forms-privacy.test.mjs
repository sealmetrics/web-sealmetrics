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

test("every first-party form caller requires a Turnstile token", () => {
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
    assert.match(source, /LeadTurnstile/, `${file} does not render Turnstile`);
    assert.match(source, /turnstileToken/, `${file} does not submit a Turnstile token`);
  }
});

test("production forms target the first-party relay", () => {
  const env = readFileSync(path.join(root, ".env.production"), "utf8");
  const endpoint = env.match(/^NEXT_PUBLIC_FORMS_ENDPOINT=(.+)$/m)?.[1] ?? "";
  assert.match(endpoint, /^https:\/\/[^/]+\/api\/forms$/);
  assert.doesNotMatch(endpoint, /n8n/i);
});
