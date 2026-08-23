import assert from "node:assert/strict";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders each language with matching metadata and language links", async () => {
  const languages = [
    { path: "/", lang: "uk", title: "СУМ в Естонії — Разом сильніші", marker: /Разом/ },
    { path: "/et", lang: "et", title: "Ukraina Noorte Liit Eestis — Koos oleme tugevamad", marker: /Koos oleme/ },
    { path: "/en", lang: "en", title: "Ukrainian Youth Association in Estonia — Stronger together", marker: /Stronger/ },
  ];

  for (const language of languages) {
    const response = await render(language.path);
    assert.equal(response.status, 200, language.path);
    assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

    const html = await response.text();
    assert.match(html, new RegExp(`<html lang="${language.lang}">`, "i"), language.path);
    assert.match(html, new RegExp(`<title>${language.title}</title>`, "i"), language.path);
    assert.match(html, language.marker, language.path);
    assert.match(html, /href="\/et"/);
    assert.match(html, /href="\/en"/);
    assert.doesNotMatch(html, /Your site is taking shape|codex-preview/i);
  }
});

test("server-renders every public route in Ukrainian, Estonian and English", async () => {
  const routes = [
    ["/school", /Школа/], ["/badminton", /Бадмінтон/], ["/merch", /Мерч/],
    ["/et/school", /nädalavahetuskool/i], ["/et/badminton", /Sulgpall/], ["/et/merch", /Meened/],
    ["/en/school", /weekend school/i], ["/en/badminton", /Badminton/], ["/en/merch", /Merch/],
  ];

  for (const [pathname, expectedText] of routes) {
    const response = await render(pathname);
    assert.equal(response.status, 200, pathname);
    assert.match(await response.text(), expectedText, pathname);
  }
});

test("server-renders the localized mobile navigation", async () => {
  const languages = [
    { path: "/", prefix: "", labels: ["Про нас", "Напрямки", "Мерч", "Галерея", "Контакти"] },
    { path: "/et", prefix: "/et", labels: ["Meist", "Tegevused", "Meened", "Galerii", "Kontakt"] },
    { path: "/en", prefix: "/en", labels: ["About us", "Activities", "Merch", "Gallery", "Contacts"] },
  ];

  for (const language of languages) {
    const response = await render(language.path);
    assert.equal(response.status, 200, language.path);

    const html = await response.text();
    assert.match(html, /class="mobile-bottom-nav"/, language.path);
    assert.match(html, /<\/header><nav class="mobile-bottom-nav"/, language.path);
    assert.doesNotMatch(html, /<header class="site-header">[\s\S]*class="mobile-bottom-nav"[\s\S]*<\/header>/, language.path);
    assert.equal((html.match(/class="mobile-nav-icon"/g) ?? []).length, 5, language.path);
    assert.match(html, new RegExp(`href="${language.prefix}/#about"`), language.path);
    assert.match(html, new RegExp(`href="${language.prefix}/#activities"`), language.path);
    assert.match(html, new RegExp(`href="${language.prefix}/merch"`), language.path);
    assert.match(html, new RegExp(`href="${language.prefix}/#gallery"`), language.path);
    assert.match(html, new RegExp(`href="${language.prefix}/#contact"`), language.path);
    for (const label of language.labels) assert.match(html, new RegExp(`>${label}<`), language.path);
  }
});
