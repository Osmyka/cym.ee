import assert from "node:assert/strict";
import { afterEach, before, test } from "node:test";

let worker;
const originalFetch = globalThis.fetch;
const validEnv = {
  APPS_SCRIPT_URL: "https://script.google.com/macros/s/test-deployment/exec",
  APPS_SCRIPT_TOKEN: "a-secure-test-token-1234567890",
};

before(async () => {
  const builtWorker = await import(`../dist/server/index.js?test=${Date.now()}`);
  worker = builtWorker.default;
});

afterEach(() => {
  globalThis.fetch = originalFetch;
});

function request(payload, origin = "https://cym.ee") {
  return new Request(`${origin}/api/order`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Origin: origin },
    body: JSON.stringify(payload),
  });
}

function schoolPayload(overrides = {}) {
  return {
    kind: "school",
    startedAt: Date.now() - 5_000,
    website: "",
    values: {
      child_name: "Anna Test",
      age: "12",
      school: "Tallinna kool",
      grade: "6",
      parent_name: "Maria Test",
      contact: "+372 5555 5555",
      email: "maria@example.com",
      time_in_estonia: "2 роки",
      questions: "",
    },
    ...overrides,
  };
}

test("school submission is validated and forwarded in sheet column order", async () => {
  let forwarded;
  globalThis.fetch = async (url, init) => {
    forwarded = { url: String(url), init };
    return Response.json({ ok: true });
  };

  const response = await worker.fetch(request(schoolPayload()), validEnv, {});
  assert.equal(response.status, 200);
  assert.equal((await response.json()).ok, true);
  assert.equal(forwarded.url, validEnv.APPS_SCRIPT_URL);
  const body = JSON.parse(forwarded.init.body);
  assert.equal(body.target, "school");
  assert.equal(body.token, validEnv.APPS_SCRIPT_TOKEN);
  assert.deepEqual(body.values, [
    "Anna Test", 12, "Tallinna kool", "6", "Maria Test", "+372 5555 5555",
    "maria@example.com", "2 роки", "",
  ]);
});

test("badminton and all three merch products route to their own sheets", async () => {
  const forwarded = [];
  globalThis.fetch = async (_url, init) => {
    forwarded.push(JSON.parse(init.body));
    return Response.json({ ok: true });
  };

  const common = { startedAt: Date.now() - 5_000, website: "" };
  const submissions = [
    {
      ...common,
      kind: "badminton",
      values: { name: "Ivan Test", age: "30", contact: "+372 5555", email: "ivan@example.com" },
    },
    {
      ...common,
      kind: "merch",
      productId: "polo",
      values: { fit: "women", size: "M (46)", quantity: "2", name: "Olena Test", email: "olena@example.com", comment: "" },
    },
    {
      ...common,
      kind: "merch",
      productId: "uniform",
      values: { category: "men", size: "XL", quantity: "1", name: "Petro Test", email: "petro@example.com", comment: "Tallinn" },
    },
    {
      ...common,
      kind: "merch",
      productId: "badminton",
      values: { shirtType: "teen", size: "164", quantity: "3", name: "Sofia Test", email: "sofia@example.com", comment: "" },
    },
  ];

  for (const payload of submissions) {
    const response = await worker.fetch(request(payload), validEnv, {});
    assert.equal(response.status, 200);
  }

  assert.deepEqual(forwarded.map(({ target, values }) => ({ target, values })), [
    { target: "badminton", values: ["Ivan Test", 30, "+372 5555", "ivan@example.com"] },
    { target: "merch_polo", values: ["Жіноча", "M (46)", 2, "Olena Test", "olena@example.com", ""] },
    { target: "merch_uniform", values: ["Дорослий", "XL", 1, "Petro Test", "petro@example.com", "Tallinn"] },
    { target: "merch_badminton", values: ["Підліткова", "164", 3, "Sofia Test", "sofia@example.com", ""] },
  ]);
});

test("cross-origin and honeypot submissions are rejected without forwarding", async () => {
  let calls = 0;
  globalThis.fetch = async () => {
    calls += 1;
    return Response.json({ ok: true });
  };

  const crossOrigin = request(schoolPayload());
  crossOrigin.headers.set("Origin", "https://spam.example");
  assert.equal((await worker.fetch(crossOrigin, validEnv, {})).status, 403);
  assert.equal((await worker.fetch(request(schoolPayload({ website: "bot" })), validEnv, {})).status, 400);
  assert.equal(calls, 0);
});

test("valid submissions use email fallback path when Worker secrets are missing", async () => {
  let calls = 0;
  globalThis.fetch = async () => {
    calls += 1;
    return Response.json({ ok: true });
  };

  const response = await worker.fetch(request(schoolPayload()), {}, {});
  assert.equal(response.status, 503);
  assert.equal((await response.json()).ok, false);
  assert.equal(calls, 0);
});

test("Apps Script failure is reported as a delivery error", async () => {
  globalThis.fetch = async () => Response.json({ ok: false }, { status: 200 });
  const response = await worker.fetch(request(schoolPayload()), validEnv, {});
  assert.equal(response.status, 502);
  assert.equal((await response.json()).ok, false);
});
