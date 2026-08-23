# cym.ee

Офіційний сайт Спілки української молоді в Естонії.

## Стек

- React 19
- vinext та Vite
- TypeScript
- Cloudflare Workers runtime

## Локальний запуск

Потрібен Node.js `>=22.13.0`.

```bash
npm install
npm run dev
```

Сайт буде доступний за адресою [http://localhost:3000](http://localhost:3000).
Локальні змінні середовища для поточної версії не потрібні.

## Перевірка

```bash
npm run lint
npm test
```

`npm test` збирає production-версію та перевіряє головну сторінку й маршрути
`/school`, `/badminton` і `/merch`.

## Структура

- `app/` — сторінки, компоненти та стилі
- `public/assets/` — оптимізовані зображення сайту
- `tests/` — перевірки серверного рендерингу
- `worker/` — Cloudflare Worker entry point
