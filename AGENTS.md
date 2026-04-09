# Scale Sail Agency - Agent Instructions

## Quick Start

- **Dev:** `npm run start` (Angular dev server)
- **Vercel Dev:** `npm run vercel:dev` (for local serverless function testing)
- **Test (Unit):** `npm run test` (Vitest watch mode)
- **Test (E2E):** `npm run test:e2e` (Playwright)
- **Verify All:** `npm run build:ci` (Lint -> Test -> Build)

## Tech Stack

- **Frontend:** Angular v21 (uses `@angular/build:application` with SSR/prerender enabled).
- **Styling:** Tailwind CSS v4 (`@tailwindcss/postcss`).
- **Backend:** Vercel Serverless Functions in `/api`.
- **Unit Testing:** Vitest (configured via `ng test`).
- **E2E Testing:** Playwright.

## Architecture & Conventions

- **Pages:** Located in `src/app/pages`.
- **Layout:** Global layout components in `src/app/layout`.
- **Shared UI:** Reusable components in `src/app/shared/ui`.
- **SSR:** The project uses Angular SSR (`src/server.ts`, `src/main.server.ts`).
- **Webhook Proxy:** `/api/webhook.ts` proxies requests to n8n/Make. Requires env vars for URLs and Cloudflare Turnstile secrets.

## Development Quirks

- **ESM:** Project uses `"type": "module"` in `package.json`.
- **Build Output:** Production builds generate both `browser` and `server` bundles in `dist/scale-sail-agency`.
- **Env Vars:**
  - `WEBHOOK_CONSULTATION_URL` / `WEBHOOK_QUOTE_URL`
  - `TURNSTILE_SECRET_CONSULTATION` / `TURNSTILE_SECRET_QUOTE`
- **Tailwind:** Uses the new v4 PostCSS plugin. Styles are in `src/styles.css`.

## Deployment

- Deployed on **Vercel**.
- Pre-rendering is enabled for routes defined in the application.
