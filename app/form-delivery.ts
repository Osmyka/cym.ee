"use client";

type FormKind = "school" | "badminton" | "merch";

type SubmitOptions = {
  form: HTMLFormElement;
  kind: FormKind;
  productId?: "polo" | "uniform" | "badminton";
  startedAt: number;
  subject: string;
};

type SubmitResult = { ok: true } | { ok: false; mailto: string };

const fallbackLabels: Record<string, string> = {
  product: "Товар",
  fit: "Тип футболки",
  category: "Тип однострою",
  shirtType: "Тип футболки",
  size: "Розмір",
  quantity: "Кількість",
  name: "Імʼя та прізвище",
  email: "Email",
  comment: "Деталі",
  child_name: "Імʼя та прізвище дитини",
  age: "Вік",
  school: "Школа",
  grade: "Клас",
  parent_name: "Імʼя та прізвище одного із батьків",
  contact: "Контакт",
  time_in_estonia: "Як довго мешкаєте в Естонії",
  questions: "Запитання",
};

function formValues(form: HTMLFormElement) {
  const data = new FormData(form);
  const website = String(data.get("website") ?? "");
  data.delete("website");

  const values: Record<string, string> = {};
  for (const [key, value] of data.entries()) {
    if (typeof value === "string") values[key] = value.trim();
  }
  return { values, website };
}

function fallbackMailto(subject: string, values: Record<string, string>) {
  const lines = ["Заявка з сайту cym.ee", ""];
  for (const [key, value] of Object.entries(values)) {
    if (value) lines.push(`${fallbackLabels[key] ?? key}: ${value}`);
  }
  return `mailto:cym@ukraine.ee?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
}

export async function submitWebsiteForm(options: SubmitOptions): Promise<SubmitResult> {
  const { values, website } = formValues(options.form);
  const mailto = fallbackMailto(options.subject, values);
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 10_000);

  try {
    const response = await fetch("/api/order", {
      method: "POST",
      credentials: "same-origin",
      headers: { "Accept": "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({
        kind: options.kind,
        productId: options.productId,
        values,
        website,
        startedAt: options.startedAt,
      }),
      signal: controller.signal,
    });
    const result = await response.json().catch(() => null) as { ok?: boolean } | null;
    if (!response.ok || result?.ok !== true) return { ok: false, mailto };
    return { ok: true };
  } catch {
    return { ok: false, mailto };
  } finally {
    window.clearTimeout(timeout);
  }
}
