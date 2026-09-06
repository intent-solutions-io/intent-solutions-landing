# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Task Tracking (Beads / bd)

Use `bd` for all tasks/issues (no markdown TODO lists). Root-level `AGENTS.md` defines the "landing the plane" session-end workflow: work is not complete until `git push` succeeds (pull --rebase, `bd sync`, push).

```bash
bd ready                                    # Start of session
bd create "Title" -p 1 --description "..."  # Create work
bd update <id> --status in_progress         # Begin task
bd close <id> --reason "Done"               # Complete task
bd sync                                     # End of session
```

After upgrading `bd`: run `bd info --whats-new` and `bd hooks install` if warned.

## Repository Overview

intentsolutions.io: **the front door for AI implementation.** The homepage says one thing, the gateway (intent-os `000-docs/163-PP-gateway-vision/`): practitioners apply and get selected into real work, customers buy proven outcomes, vendors get a partner of record, Intent Solutions holds every relationship. Rebuilt to the council's landing brief (intent-os `165-RA-REVW-gateway-council-review.md` section 6.4) on 2026-09-06; the before-state is `000-docs/080-RA-AUDT-site-design-audit-2026-09-06.md`.

- **Active project**: `astro-site/` (Astro 5, Tailwind 4, no React, no client framework). Static output only.
- **Hosting**: Contabo VPS `intentsolutions` (167.86.106.29) via Caddy `file_server` at `/srv/intentsolutions/dist`. Deploy: push to `main` triggers `.github/workflows/deploy-vps.yml` (Tailscale OIDC + force-command SSH). Redirects for removed routes live in the VPS Caddyfile: `ops/caddy-redirects.md`.
- **Analytics**: Umami at `https://analytics.intentsolutions.io`, site ID `474bce85-f97d-409c-aba5-1e1ff36ee571`. Custom events are `data-umami-event` attributes per `astro-site/brand/analytics-events.md`; no `umami.track` calls in components.
- **Deployed at**: https://intentsolutions.io
- **Proof surfaces the site links to** (never restate their numbers by hand): marketplace https://tonsofskills.com (repo `jeremylongshore/tons-of-skills-marketplace`), Lab https://labs.intentsolutions.io, learn site https://learn.intentsolutions.io, catalog https://demos.intentsolutions.io, field notes `/field-notes/` (cross-posts canonical to startaitools.com).
- **Numbers policy**: every figure on the site renders from `astro-site/src/data/receipts.json`, written by `scripts/refresh-receipts.mjs` from the live sources (GitHub API, tonsofskills.com, skills.sh, the Lab results page, the field-notes RSS) and shown with its `verified_at` date. CI refreshes it before every deploy and fails if any value is older than 7 days. Do not type a star, plugin, skill, install, or cert count into a component or into this file.
- **No booking link.** Doctrine register is request access / request an outcome / request partner-of-record (CPN `000-docs/007` sections 7.1 and 7.2). The contact form is the only inbound path besides the learn site.
- **Legacy**: `99-Archive/` contains the old React/Vite SPA (not in production).

## Commands

All commands run from `astro-site/` (npm; the lockfile is npm's).

```bash
npm install                 # Install dependencies
npm run dev                 # Dev server at localhost:4321
npm run build               # Production build to dist/
npm run preview             # Preview the build
npm run receipts            # Refresh src/data/receipts.json from live sources
npm run receipts:check      # Exit 1 if any receipt value is older than 7 days
npm run audit:indexability  # SEO regression guard (sitemap/canonical/title/404)
npm run check:copy          # Copy gate on dist/ (retired strings, dollar figures, dashes, hand-typed counts, banned pairings)
npm run gate                # build + indexability + copy + receipts:check
npm test                    # Playwright specs against astro preview (chromium + mobile)
npx playwright test --project=chromium tests/e2e/home.spec.ts   # one spec
```

## Architecture

- **Pages**: `src/pages/*.astro`, file-based routing, all static. Nine routes plus `field-notes/[...slug]` (90 posts) and `field-notes/rss.xml`.
- **Homepage**: `src/pages/index.astro` composes eight components in `src/components/home/`: Hero, Gate (the one SVG figure), Doors, Method, Receipts, Standard, Founder, Footer. Section order and wireframes: `design-system/pages/landing.md`.
- **Layout**: `src/layouts/Layout.astro`: SEO (astro-seo), Organization + WebSite JSON-LD (`sameAs` = the proof surfaces), self-hosted font preloads, Umami, skip link, `noindex` prop for utility pages.
- **Nav**: `src/components/SiteNav.astro`: Learn, Labs, Catalog, Field Notes, "Member sign in". No dropdowns.
- **Contact form**: `src/components/Contact.astro`, plain HTML plus a small inline script that posts JSON to `/api/forms/contact` (the VPS forms-api; Caddy `handle /api/forms/*` to 127.0.0.1:8090). The `?door=customer|vendor|member` query preselects the door and maps onto the backend's `interest` enum (`consulting`, `learn`, `other`); the door is also prefixed into the message. Success lands on `/thank-you/`.
- **Styles**: `src/styles/global.css`: Blueprint light tokens (shared with the learn site and the diagram skill), `@font-face` for Newsreader (display) and Inter (body) from `public/fonts/`, utilities (`.section`, `.container-is`, `.btn*`, `.tile`, `.eyebrow`, `.link-arrow`), the light `.prose-field-notes` set, and a global reduced-motion rule.
- **Copy**: `astro-site/brand/copy-home.md` is the homepage copy source; `brand/voice-profile.md` holds the say / never-say lists that `scripts/check-copy.mjs` enforces on the build.
- **Design system**: `astro-site/design-system/MASTER.md` (tokens, type, spacing, components, motion, anti-patterns, pre-delivery checklist) and `pages/landing.md`.

### SEO posture (pinned 2026-05-25, see `000-docs/079-OD-AUDT`)

- `trailingSlash: 'always'` + `build.format: 'directory'`; every URL's canonical form ends with `/`. Internal links must match.
- `@astrojs/sitemap` with a content-aware filter: excludes `/thank-you/`, `/404/`, and every `/field-notes/<slug>/` whose frontmatter `canonical` host is not `intentsolutions.io`.
- `public/robots.txt` references `https://intentsolutions.io/sitemap-index.xml`.
- Branded `src/pages/404.astro` with `noindex`; Caddy `handle_errors` serves it with a real 404 status.
- `scripts/audit-indexability.mjs` runs in CI before deploy.

### Form submission flow (VPS forms-api)

```
Contact.astro  POST /api/forms/contact (JSON)
  -> Caddy reverse_proxy on the VPS to 127.0.0.1:8090
  -> forms-api.service (/srv/forms-api/server.mjs): honeypot, enum guard, 3/hr per-IP cap
  -> Slack webhook (#operation-hired)
  -> JSON response; the page navigates to /thank-you/
```

Slack-only by design. The backend's `interest` enum still reads `consulting | learn | colab | other`; renaming it to the three doors is a forms-api change, tracked as a follow-up.

### Testing

- One Playwright config (`playwright.config.ts`) that starts `astro preview` on the built `dist/` (or uses `BASE_URL` if set).
- `tests/e2e/home.spec.ts`: one H1 with the headline; the three door CTAs present and resolving; nav has the five links and no booking CTA; receipts render the JSON figures with dates inside 7 days; no retired strings, dollar figures, or dashes in the built HTML; every external link carries an analytics event; skip link takes first focus; reduced motion zeroes transitions.
- `tests/e2e/redirects.spec.ts`: every removed route is absent from the build (Caddy answers with a 301), every kept route builds, `healthz` is in the artifact.
- `scripts/check-copy.mjs` and `scripts/refresh-receipts.mjs --check` are the two deterministic gates; both run in CI.

### CI/CD (GitHub Actions)

**Deploy VPS** (`.github/workflows/deploy-vps.yml`): on push to `main` (paths `astro-site/**`), the `test` job runs `npm ci`, `receipts` + `receipts:check`, `build`, `check:copy`, `audit:indexability`, the artifact and line-length check, then Playwright (chromium). The `deploy` job uses the reusable `jeremylongshore/.github` `vps-deploy.yml` and smokes `https://intentsolutions.io/healthz` (`.ok == true`). Rollback is `git revert` of the merge; the previous dist stays under `/srv/intentsolutions` per the deploy script.

**Deploy HF** (`deploy-hf.yml`) mirrors the same build to the Hugging Face static Space `intent-solutions-io/home`. **Release** (`release.yml`) bumps the version from commit messages and writes the changelog.

## Content rules (load-bearing)

Read `astro-site/brand/voice-profile.md` before writing a word. The short version:

- Say: the front door for AI implementation; selective practice; request access, request an outcome, request partner-of-record; model-agnostic by design; credentials optional, standard required; receipts, evidence, the Lab.
- Never: outsource / hire our certified / bench; get certified then get projects; "start your AI journey"; a vendor name as the identity of the room; cert counts; dollar figures; time estimates for partner work; "first", "only", "leading"; "Book a call"; vendor logo strips; any Google Cloud, Vertex, Firebase, or BigQuery reference; "Claude" paired with "proven", "verified", or "partner of record" without the program's written approval.
- No em dashes, no en dashes, anywhere in copy. The build fails on them.
- Numbers come from `receipts.json` only, always with their date, pass and fail together.
- Vendor names appear only inside receipt tiles, never as page identity.

## Reference docs

- `000-docs/080-RA-AUDT-site-design-audit-2026-09-06.md`: the six-lens audit of the site before this rebuild, with before and after scores.
- `000-docs/079-OD-AUDT-search-console-indexing-audit.md`: SEO posture, robots.txt rationale, GSC actions.
- `000-docs/078-OD-SOPS-audit-harness-baseline-2026-05-01.md`: testing harness baseline.
- `ops/caddy-redirects.md`: the VPS redirect block for every removed route.
- intent-os `000-docs/163-PP-gateway-vision/`: the vision, the council review (section 6.4 is the landing brief), the working session.
