# Copilot Instructions — Cotiza Tu Plan Hoy

Short, actionable guidance for AI coding agents (what to do, where to look, and how to validate changes).

## Big picture

- React + TypeScript SPA built with Vite. Routes live in `src/pages` and are wired up in `src/App.tsx` using React Router with lazy imports. Add new pages to `src/pages` and import lazily in `App.tsx` (place routes before the catch-all `*` route).
- UI is built on Radix + shadcn-style primitives in `src/components/ui/`. Reuse those components for consistent styling and accessibility.
- State & server data: React Query (`@tanstack/react-query`) for server state; React Hook Form + Zod for forms and validation.
- Serverless code: short API functions live under `api/` (Vercel-style serverless functions). Example: `api/send-email.ts` (uses `resend` and `zod`).

## Key files to inspect

- App & routing: `src/App.tsx` (lazy page loading pattern)
- Design & components: `src/components/ui/` and `src/components/shared/`
- Utilities: `src/lib/utils.ts` (helper `cn()`), `src/lib/analytics.ts` (GA wrapper)
- Contact form & email flow: `src/pages/Contacto.tsx`, `api/send-email.ts`, `RESEND_INTEGRATION.md`
- Project & workflow docs: `README.md`, `CONTRIBUTING.md` (branch rules, commit conventions, Lovable integration)

## Environment & runtime notes

- Run locally: `npm run dev` (Vite). Build: `npm run build`; preview: `npm run preview`.
- Environment variables used in the codebase:
  - `VITE_GTAG_ID` — Google Analytics measurement ID (used by `src/lib/analytics.ts`). Note: analytics is gated to production (`import.meta.env.PROD`) and respects Do Not Track.
  - `RESEND_API_KEY` — used by `api/send-email.ts` (see `RESEND_INTEGRATION.md` for setup). Make this a Vercel environment variable when deploying.
- Serverless functions are Vercel-style. To test them locally, use Vercel CLI (`vercel dev`) or mock the endpoint; Vite dev server does not automatically run Vercel functions.

## Conventions & patterns (do not break)

- Path alias `@/*` maps to `./src/*` (see `tsconfig.json`). Prefer `@/` imports.
- CSS: Tailwind with design tokens; use components under `src/components/ui` for consistent classes and variants. Use `cn()` from `src/lib/utils.ts` to merge classNames safely.
- Forms: prefer React Hook Form + `zodResolver` and keep client & server Zod schemas aligned (frontend schema in `src/pages/Contacto.tsx`, server schema in `api/send-email.ts`).
- Analytics: prefer using `src/lib/analytics.ts` helpers (`loadGtag`, `pageview`, `event`, wrappers like `trackFormSubmit`). `src/components/shared/GoogleAnalytics.tsx` is env-driven — set `VITE_GTAG_ID` in production and rely on `loadGtag` (it respects Do Not Track and avoids double-loading). Avoid adding inline script tags or hardcoded IDs; use `pageview` on route changes instead.

## Concrete examples for common tasks

- Add a page and route:
  1. Create `src/pages/MyPage.tsx`.
  2. Add `const MyPage = lazy(() => import('./pages/MyPage'))` to `App.tsx` and add a `<Route>` above `*`.
- Send email (frontend -> server): POST JSON to `/api/send-email` with { fullName, email, phone, message } — server validates with Zod (see `api/send-email.ts`).
- Enable GA in production: set `VITE_GTAG_ID` in your production env and rely on `src/lib/analytics.ts::loadGtag` + `pageview` calls.

## Branching, commits and release flow

- Branches: `ai-agent` (Lovable, IA commits), `develop` (local dev), `main` (production). See `CONTRIBUTING.md`.
- Commit messages follow Conventional Commits (e.g., `feat:`, `fix:`, `docs:`).
- Lovable/AI workflow: changes by AI go to `ai-agent`, human developers review and PR to `develop`.

## Validation checklist for PRs

- Run `npm run lint` and fix ESLint issues.
- Run `npm run build` (ensures compile and bundling errors surface).
- Verify the page loads and critical flows: Contact form submission (mock or `vercel dev`), analytics triggers in production env, toasts and error boundaries behave.
- Confirm UI reuse: prefer `components/ui` primitives (do not add unstyled raw components unless necessary).

## Gotchas & code smells we found

- Note: `src/components/shared/GoogleAnalytics.tsx` is now env-driven and uses `src/lib/analytics.ts`; set `VITE_GTAG_ID` in production env. Remove any leftover inline scripts or hardcoded IDs if you encounter them.
- Some large page files (e.g., `src/pages/Contacto.tsx`) contain mixed or duplicated implementations — when changing forms, keep one approach (React Hook Form + Zod) and remove legacy code.

---

If any of these sections are unclear or you'd like more examples (e.g., concrete test scenarios, sample PR checklist, or fill in one-liner code snippets), tell me which part to expand and I will iterate.

_Generated from repository scan: README.md, CONTRIBUTING.md, RESEND_INTEGRATION.md, api/send-email.ts, src/lib/analytics.ts, src/App.tsx, src/pages/Contacto.tsx, src/lib/utils.ts._
