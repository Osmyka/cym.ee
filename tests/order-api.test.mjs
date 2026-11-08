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
      values: { fit: "women", color: "navy", size: "M (46)", quantity: "2", name: "Olena Test", email: "olena@example.com", comment: "" },
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
    { target: "merch_polo", values: ["Темно-синій", "Жіноча", "M (46)", 2, "Olena Test", "olena@example.com", ""] },
    { target: "merch_uniform", values: ["Дорослий", "XL", 1, "Petro Test", "petro@example.com", "Tallinn"] },
    { target: "merch_badminton", values: ["Підліткова", "164", 3, "Sofia Test", "sofia@example.com", ""] },
  ]);
});

test("svoi club registration accepts a Thursday and rejects other weekdays", async () => {
  const forwarded = [];
  globalThis.fetch = async (_url, init) => {
    forwarded.push(JSON.parse(init.body));
    return Response.json({ ok: true });
  };

  const values = {
    visit_date: "2026-11-05",
    name: "Anna Ivanenko",
    age: "16",
    other_activity: "school",
    contact: "+372 5555 5555",
    telegram: "@anna_tg",
    instagram: "@anna",
    email: "anna@example.com",
    payer_name: "Olena Ivanenko",
    filming: "yes",
    materials: "no",
  };
  const response = await worker.fetch(request({
    kind: "svoi",
    startedAt: Date.now() - 5_000,
    website: "",
    values,
  }), validEnv, {});
  assert.equal(response.status, 200);
  assert.deepEqual(forwarded[0].target, "svoi");
  assert.deepEqual(forwarded[0].values, [
    "2026-11-05", 16, "Anna Ivanenko", "Школа вихідного дня СУМ", "+372 5555 5555",
    "@anna_tg", "@anna", "anna@example.com", "Olena Ivanenko", "Так", "Ні",
  ]);

  const wrongDay = await worker.fetch(request({
    kind: "svoi",
    startedAt: Date.now() - 5_000,
    website: "",
    values: { ...values, visit_date: "2026-11-06" },
  }), validEnv, {});
  assert.equal(wrongDay.status, 400);
});

test("hub registration accepts Wednesday and Friday and rejects other days", async () => {
  const forwarded = [];
  globalThis.fetch = async (_url, init) => {
    forwarded.push(JSON.parse(init.body));
    return Response.json({ ok: true });
  };

  const values = {
    visit_date: "2026-11-04",
    name: "Anna Ivanenko",
    name_uk: "Анна Іваненко",
    age: "8",
    contact: "+372 5555 5555",
    telegram: "@anna",
    email: "anna@example.com",
    payer_name: "Olena Ivanenko",
    filming: "yes",
    materials: "no",
  };
  const wednesday = await worker.fetch(request({
    kind: "hub",
    startedAt: Date.now() - 5_000,
    website: "",
    values,
  }), validEnv, {});
  assert.equal(wednesday.status, 200);
  assert.deepEqual(forwarded[0].target, "hub");
  assert.deepEqual(forwarded[0].values, [
    "2026-11-04", "Anna Ivanenko", "Анна Іваненко", 8, "+372 5555 5555",
    "@anna", "anna@example.com", "Olena Ivanenko", "Так", "Ні",
  ]);

  const friday = await worker.fetch(request({
    kind: "hub",
    startedAt: Date.now() - 5_000,
    website: "",
    values: { ...values, visit_date: "2026-11-06" },
  }), validEnv, {});
  assert.equal(friday.status, 200);

  const monday = await worker.fetch(request({
    kind: "hub",
    startedAt: Date.now() - 5_000,
    website: "",
    values: { ...values, visit_date: "2026-11-02" },
  }), validEnv, {});
  assert.equal(monday.status, 400);
});

function nextDrawingSaturday() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/Tallinn",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    hourCycle: "h23",
    weekday: "short",
  }).formatToParts(new Date());
  const get = (type) => parts.find((part) => part.type === type).value;
  const start = new Date(Date.UTC(Number(get("year")), Number(get("month")) - 1, Number(get("day"))));
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let offset = (6 - weekdays.indexOf(get("weekday")) + 7) % 7;
  if (offset === 0 && Number(get("hour").replace(/\D/g, "")) >= 14) offset = 7;
  start.setUTCDate(start.getUTCDate() + offset);
  return start.toISOString().slice(0, 10);
}

test("drawing registration accepts an upcoming Saturday and writes consent as yes", async () => {
  const forwarded = [];
  globalThis.fetch = async (_url, init) => {
    forwarded.push(JSON.parse(init.body));
    return Response.json({ ok: true });
  };

  const classDate = nextDrawingSaturday();
  const values = {
    class_date: classDate,
    child_name: "Anna Ivanenko",
    age: "8",
    parent_name: "Olena Ivanenko",
    contact: "+372 5555 5555",
    email: "olena@example.com",
    data_consent: "yes",
    filming: "yes",
    materials: "yes",
  };
  const response = await worker.fetch(request({
    kind: "drawing",
    startedAt: Date.now() - 5_000,
    website: "",
    values,
  }), validEnv, {});
  assert.equal(response.status, 200);
  assert.deepEqual(forwarded[0].target, "drawing");
  assert.deepEqual(forwarded[0].values, [
    classDate, "Anna Ivanenko", 8, "Olena Ivanenko", "+372 5555 5555",
    "olena@example.com", "Так", "Так", "Так",
  ]);

  const withoutPhotoConsent = { ...values };
  delete withoutPhotoConsent.filming;
  delete withoutPhotoConsent.materials;
  const optionalConsent = await worker.fetch(request({
    kind: "drawing",
    startedAt: Date.now() - 5_000,
    website: "",
    values: withoutPhotoConsent,
  }), validEnv, {});
  assert.equal(optionalConsent.status, 200);
  assert.equal(forwarded[1].values[7], "Ні");
  assert.equal(forwarded[1].values[8], "Ні");

  const friday = new Date(`${classDate}T00:00:00Z`);
  friday.setUTCDate(friday.getUTCDate() - 1);
  const wrongDay = await worker.fetch(request({
    kind: "drawing",
    startedAt: Date.now() - 5_000,
    website: "",
    values: { ...values, class_date: friday.toISOString().slice(0, 10) },
  }), validEnv, {});
  assert.equal(wrongDay.status, 400);

  const tooOld = await worker.fetch(request({
    kind: "drawing",
    startedAt: Date.now() - 5_000,
    website: "",
    values: { ...values, age: "11" },
  }), validEnv, {});
  assert.equal(tooOld.status, 400);
});

function nextCinemaMonday() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/Tallinn",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    hourCycle: "h23",
    weekday: "short",
  }).formatToParts(new Date());
  const get = (type) => parts.find((part) => part.type === type).value;
  const start = new Date(Date.UTC(Number(get("year")), Number(get("month")) - 1, Number(get("day"))));
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let offset = (1 - days.indexOf(get("weekday")) + 7) % 7;
  if (offset === 0 && Number(get("hour").replace(/\D/g, "")) >= 18) offset = 7;
  start.setUTCDate(start.getUTCDate() + offset);
  return start.toISOString().slice(0, 10);
}

test("cinema registration requires a guardian for minors and keeps filming optional", async () => {
  const forwarded = [];
  globalThis.fetch = async (_url, init) => {
    forwarded.push(JSON.parse(init.body));
    return Response.json({ ok: true });
  };

  const sessionDate = nextCinemaMonday();
  const minor = {
    session_date: sessionDate,
    name: "Anna Ivanenko",
    age: "12",
    representative_name: "Olena Ivanenko",
    contact: "+372 5555 5555",
    email: "",
    data_consent: "yes",
    filming: "yes",
  };
  const response = await worker.fetch(request({
    kind: "cinema",
    startedAt: Date.now() - 5_000,
    website: "",
    values: minor,
  }), validEnv, {});
  assert.equal(response.status, 200);
  assert.deepEqual(forwarded[0].target, "cinema");
  assert.deepEqual(forwarded[0].values, [
    sessionDate, "Anna Ivanenko", 12, "Olena Ivanenko", "+372 5555 5555",
    "", "Так", "Так", "Ні",
  ]);

  const adult = await worker.fetch(request({
    kind: "cinema",
    startedAt: Date.now() - 5_000,
    website: "",
    values: { ...minor, age: "30", representative_name: "Should be ignored", email: "anna@example.com", filming: "no" },
  }), validEnv, {});
  assert.equal(adult.status, 200);
  assert.equal(forwarded[1].values[2], 30);
  assert.equal(forwarded[1].values[3], "");
  assert.equal(forwarded[1].values[5], "anna@example.com");
  assert.equal(forwarded[1].values[7], "Ні");

  const noGuardian = await worker.fetch(request({
    kind: "cinema",
    startedAt: Date.now() - 5_000,
    website: "",
    values: { ...minor, representative_name: "" },
  }), validEnv, {});
  assert.equal(noGuardian.status, 400);

  const tuesday = new Date(`${sessionDate}T00:00:00Z`);
  tuesday.setUTCDate(tuesday.getUTCDate() + 1);
  const wrongDay = await worker.fetch(request({
    kind: "cinema",
    startedAt: Date.now() - 5_000,
    website: "",
    values: { ...minor, session_date: tuesday.toISOString().slice(0, 10) },
  }), validEnv, {});
  assert.equal(wrongDay.status, 400);
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
