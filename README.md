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
Без секретів сайт працює повністю, а форми у разі помилки відкривають
підготовлений лист. Для прямого запису форм у Google Sheets створіть `.dev.vars`:

```dotenv
APPS_SCRIPT_URL=https://script.google.com/macros/s/DEPLOYMENT_ID/exec
APPS_SCRIPT_TOKEN=довгий-випадковий-секрет
```

`.dev.vars` не можна комітити до репозиторію.

## Мови

- українська — `/`, `/school`, `/badminton`, `/merch`
- естонська — `/et`, `/et/school`, `/et/badminton`, `/et/merch`
- англійська — `/en`, `/en/school`, `/en/badminton`, `/en/merch`

Увесь текстовий контент зберігається у типізованих словниках `app/i18n.ts`,
`app/i18n/et.ts` та `app/i18n/en.ts`.

## Перевірка

```bash
npm run lint
npm test
```

`npm test` збирає production-версію та перевіряє всі публічні маршрути трьома мовами.

## Структура

- `app/` — сторінки, компоненти та стилі
- `public/assets/` — оптимізовані зображення сайту
- `tests/` — перевірки серверного рендерингу
- `worker/` — Cloudflare Worker entry point
- `integrations/google-apps-script/` — код і інструкція для запису заявок у Google Sheets

## Форми та Google Sheets

Форми школи, бадмінтону й трьох товарів надсилають JSON на `/api/order`.
Cloudflare Worker перевіряє джерело та поля, а потім передає нормалізовані дані
одному Google Apps Script. Якщо запис не вдався, браузер відкриває заповнений
лист на `cym@ukraine.ee`, тому заявка не губиться.

Одноразове налаштування Apps Script і секретів Worker описане у
[`integrations/google-apps-script/README.md`](integrations/google-apps-script/README.md).

## Деплой

Продакшн — Cloudflare Worker `cym-ee` (домен <https://cym.ee>).

Автоматично: кожен push у `main` запускає workflow
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), який робить
`npm ci` → `npm run build` → `wrangler deploy`. Той самий workflow можна
запустити вручну через **Actions → Deploy to Cloudflare Workers → Run workflow**.

Потрібні секрети репозиторію (Settings → Secrets and variables → Actions):

- `CLOUDFLARE_API_TOKEN` — токен із дозволом *Edit Cloudflare Workers*
- `CLOUDFLARE_ACCOUNT_ID` — ID акаунта Cloudflare

Окремо у **Cloudflare Worker → Settings → Variables and Secrets** мають бути
збережені зашифровані `APPS_SCRIPT_URL` та `APPS_SCRIPT_TOKEN`. Вони не є
GitHub Actions secrets і не повинні потрапляти у вихідний код.

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
