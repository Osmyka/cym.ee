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

test("server-renders the СУМ Estonia website", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html lang="uk">/i);
  assert.match(html, /<title>СУМ в Естонії — Разом сильніші<\/title>/i);
  assert.match(html, /Спілка української молоді в Естонії/);
  assert.match(html, /href="\/school"/);
  assert.match(html, /href="\/badminton"/);
  assert.match(html, /href="\/merch"/);
  assert.doesNotMatch(html, /Your site is taking shape|codex-preview/i);
});

test("server-renders all public site routes", async () => {
  const routes = [
    ["/school", /Школа/],
    ["/badminton", /Бадмінтон/],
    ["/merch", /Мерч/],
  ];

  for (const [pathname, expectedText] of routes) {
    const response = await render(pathname);
    assert.equal(response.status, 200, pathname);
    assert.match(await response.text(), expectedText, pathname);
  }
});
