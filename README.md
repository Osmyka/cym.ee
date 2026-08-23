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

## Деплой

Продакшн — Cloudflare Worker `cym-ee` (домен <https://cym.ee>).

Автоматично: кожен push у `main` запускає workflow
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), який робить
`npm ci` → `npm run build` → `wrangler deploy`. Той самий workflow можна
запустити вручну через **Actions → Deploy to Cloudflare Workers → Run workflow**.

Потрібні секрети репозиторію (Settings → Secrets and variables → Actions):

- `CLOUDFLARE_API_TOKEN` — токен із дозволом *Edit Cloudflare Workers*
- `CLOUDFLARE_ACCOUNT_ID` — ID акаунта Cloudflare

Ручний деплой з локальної машини:

```bash
npm run deploy
```

Перевірка збірки без публікації:

```bash
npm run deploy:check
```

Конфіг воркера не лежить у репозиторії окремим файлом — його генерує збірка
(`vite.config.ts` → `localBindingConfig`) у `dist/server/wrangler.json`.
Кастомний домен `cym.ee` налаштований у дашборді Cloudflare і деплоєм не змінюється.
