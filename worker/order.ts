type OrderEnv = {
  APPS_SCRIPT_URL?: string;
  APPS_SCRIPT_TOKEN?: string;
};

type JsonRecord = Record<string, unknown>;
type NormalizedSubmission = {
  target: "school" | "badminton" | "merch_polo" | "merch_uniform" | "merch_badminton";
  values: Array<string | number>;
};

const MAX_BODY_LENGTH = 20_000;
const MIN_FORM_TIME_MS = 1_200;
const MAX_FORM_TIME_MS = 2 * 60 * 60 * 1_000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

class ValidationError extends Error {}

function json(data: JsonRecord, status = 200) {
  return Response.json(data, {
    status,
    headers: {
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

function isRecord(value: unknown): value is JsonRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function field(record: JsonRecord, key: string, maxLength: number, required = true) {
  const value = typeof record[key] === "string" ? record[key].trim() : "";
  if (required && !value) throw new ValidationError(`${key} is required`);
  if (value.length > maxLength) throw new ValidationError(`${key} is too long`);
  return value;
}

function email(record: JsonRecord) {
  const value = field(record, "email", 254);
  if (!EMAIL_PATTERN.test(value)) throw new ValidationError("email is invalid");
  return value;
}

function integer(record: JsonRecord, key: string, min: number, max: number) {
  const raw = field(record, key, 8);
  const value = Number(raw);
  if (!Number.isInteger(value) || value < min || value > max) {
    throw new ValidationError(`${key} is invalid`);
  }
  return value;
}

function choice(record: JsonRecord, key: string, choices: readonly string[]) {
  const value = field(record, key, 48);
  if (!choices.includes(value)) throw new ValidationError(`${key} is invalid`);
  return value;
}

function normalizeSchool(values: JsonRecord): NormalizedSubmission {
  return {
    target: "school",
    values: [
      field(values, "child_name", 160),
      integer(values, "age", 5, 20),
      field(values, "school", 180),
      field(values, "grade", 60),
      field(values, "parent_name", 160),
      field(values, "contact", 160),
      email(values),
      field(values, "time_in_estonia", 160),
      field(values, "questions", 2_000, false),
    ],
  };
}

function normalizeBadminton(values: JsonRecord): NormalizedSubmission {
  return {
    target: "badminton",
    values: [
      field(values, "name", 160),
      integer(values, "age", 5, 100),
      field(values, "contact", 160),
      email(values),
    ],
  };
}

const poloSizes = ["XS (42)", "S (44)", "M (46)", "L (48)", "XL (50)", "2XL (52)", "3XL (54–56)", "XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"];
const uniformSizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];
const badmintonSizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL", "128", "134", "140", "146", "152", "158", "164", "170"];

function normalizeMerch(productId: unknown, values: JsonRecord): NormalizedSubmission {
  const quantity = integer(values, "quantity", 1, 50);
  const name = field(values, "name", 160);
  const contactEmail = email(values);
  const comment = field(values, "comment", 2_000, false);

  if (productId === "polo") {
    const type = choice(values, "fit", ["women", "men"]);
    return {
      target: "merch_polo",
      values: [type === "women" ? "Жіноча" : "Чоловіча", choice(values, "size", poloSizes), quantity, name, contactEmail, comment],
    };
  }

  if (productId === "uniform") {
    const category = choice(values, "category", ["women", "men"]);
    return {
      target: "merch_uniform",
      values: [category === "women" ? "Дитячий" : "Дорослий", choice(values, "size", uniformSizes), quantity, name, contactEmail, comment],
    };
  }

  if (productId === "badminton") {
    const type = choice(values, "shirtType", ["men", "women", "teen"]);
    const labels = { men: "Чоловіча", women: "Жіноча", teen: "Підліткова" } as const;
    return {
      target: "merch_badminton",
      values: [labels[type as keyof typeof labels], choice(values, "size", badmintonSizes), quantity, name, contactEmail, comment],
    };
  }

  throw new ValidationError("productId is invalid");
}

function normalize(payload: JsonRecord): NormalizedSubmission {
  if (typeof payload.startedAt !== "number") throw new ValidationError("startedAt is invalid");
  const elapsed = Date.now() - payload.startedAt;
  if (elapsed < MIN_FORM_TIME_MS || elapsed > MAX_FORM_TIME_MS) throw new ValidationError("form timing is invalid");
  if (typeof payload.website === "string" && payload.website.trim()) throw new ValidationError("submission rejected");
  if (!isRecord(payload.values)) throw new ValidationError("values are required");

  if (payload.kind === "school") return normalizeSchool(payload.values);
  if (payload.kind === "badminton") return normalizeBadminton(payload.values);
  if (payload.kind === "merch") return normalizeMerch(payload.productId, payload.values);
  throw new ValidationError("kind is invalid");
}

function appsScriptUrl(value: string | undefined) {
  if (!value) return null;
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" || url.hostname !== "script.google.com" || !url.pathname.startsWith("/macros/s/") || !url.pathname.endsWith("/exec")) return null;
    return url.toString();
  } catch {
    return null;
  }
}

export async function handleOrderRequest(request: Request, env: OrderEnv) {
  if (request.method !== "POST") return json({ ok: false, error: "Method not allowed" }, 405);

  const requestUrl = new URL(request.url);
  if (request.headers.get("Origin") !== requestUrl.origin) {
    return json({ ok: false, error: "Invalid origin" }, 403);
  }

  if (!request.headers.get("Content-Type")?.toLowerCase().startsWith("application/json")) {
    return json({ ok: false, error: "JSON body required" }, 415);
  }

  const contentLength = Number(request.headers.get("Content-Length") ?? 0);
  if (contentLength > MAX_BODY_LENGTH) return json({ ok: false, error: "Request is too large" }, 413);

  let payload: unknown;
  try {
    const rawBody = await request.text();
    if (rawBody.length > MAX_BODY_LENGTH) return json({ ok: false, error: "Request is too large" }, 413);
    payload = JSON.parse(rawBody);
  } catch {
    return json({ ok: false, error: "Invalid JSON" }, 400);
  }

  let submission: NormalizedSubmission;
  try {
    if (!isRecord(payload)) throw new ValidationError("Invalid payload");
    submission = normalize(payload);
  } catch (error) {
    const message = error instanceof ValidationError ? error.message : "Invalid payload";
    return json({ ok: false, error: message }, 400);
  }

  const endpoint = appsScriptUrl(env.APPS_SCRIPT_URL);
  const token = env.APPS_SCRIPT_TOKEN?.trim();
  if (!endpoint || !token || token.length < 24) {
    return json({ ok: false, error: "Form delivery is not configured" }, 503);
  }

  const requestId = crypto.randomUUID();
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8_000);

  try {
    const upstream = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token,
        target: submission.target,
        values: submission.values,
        requestId,
        source: "cym.ee",
      }),
      redirect: "follow",
      signal: controller.signal,
    });
    const result = await upstream.json().catch(() => null) as { ok?: boolean } | null;
    if (!upstream.ok || result?.ok !== true) throw new Error("Apps Script rejected the submission");
    return json({ ok: true, requestId });
  } catch (error) {
    console.error("Order forwarding failed", requestId, error instanceof Error ? error.message : "Unknown error");
    return json({ ok: false, error: "Form delivery failed" }, 502);
  } finally {
    clearTimeout(timeout);
  }
}
