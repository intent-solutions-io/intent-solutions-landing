# Repository Guidelines

## Project Structure & Module Organization
- `astro-site/` is the working directory for the landing page; run build and test commands from here.
- `astro-site/src` houses implementation code: `components/` (React islands in PascalCase files), `layouts/`, `pages/` (route-aligned `.astro` files), `styles/`, and shared helpers in `utils/`.
- End-to-end assets live in `astro-site/tests/` with Playwright specs (`*.spec.js`), reusable data under `fixtures/`, and evidence in `reports/`, `screenshots/`, and `videos/`.
- Repository reference docs stay in `01-Docs/`; automation and helper scripts belong in `05-Scripts/` for easy discovery.

## Build, Test, and Development Commands
- `bun install` — Install dependencies; rerun after lockfile updates.
- `bun run dev` — Launch Astro locally on `http://localhost:4321`.
- `bun run build` — Generate the production bundle in `astro-site/dist/`.
- `bun run preview` — Serve the built site for smoke-testing before pushes.
- `bun run test` — Execute the Playwright regression suite headless; use `bun run test:headed` or `bun run test:ui` when diagnosing issues.
- `bun run test:report` — Open the latest HTML report from `tests/reports/`.

## Coding Style & Naming Conventions
- Rely on Prettier defaults (2-space indentation, single quotes in TypeScript/JavaScript) and keep Tailwind utility classes grouped from layout → spacing → typography for scanability.
- React islands stay in PascalCase (`Hero.tsx`), Astro routes remain lowercase with optional dashes (`pages/survey.astro`), and shared helpers belong in `src/utils/`.
- Prefer typed props and explicit return types; keep shared state helpers in dedicated utilities.

## Testing Guidelines
- Author Playwright specs in `astro-site/tests` using the `.spec.js` suffix; focus on end-to-end user flows (form submission, survey flows, Netlify interactions).
- Update `tests/fixtures/` when adding data-driven cases and prune transient screenshots once a fix lands to keep CI artifacts light.
- Run `bun run test` before every PR and attach a brief note or screenshot when UI changes could affect regressions; only commit evidence reports when they add long-term value.

## Commit & Pull Request Guidelines
- Follow the conventional commit style seen in history (`fix:`, `feat:`, `docs:`); scopes are optional but encouraged (`fix(forms): ensure confirmation screen`).
- Each PR should outline intent, list verification steps (`bun run build`, `bun run test`), link related issues, and include before/after screenshots for visual adjustments.
- Request review once local checks pass; Netlify consumes the `bun run build` output automatically, so verify the preview link before merging.
