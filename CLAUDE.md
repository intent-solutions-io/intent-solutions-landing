## Task Tracking (Beads / bd)
- Use `bd` for ALL tasks/issues (no markdown TODO lists).
- Start of session: `bd ready`
- Create work: `bd create "Title" -p 1 --description "Context + acceptance criteria"`
- Update status: `bd update <id> --status in_progress`
- Finish: `bd close <id> --reason "Done"`
- End of session: `bd sync` (flush/import/export + git sync)
- Manual testing safety:
  - Prefer `BEADS_DIR` to isolate a workspace if needed. (`BEADS_DB` exists but is deprecated.)


# CLAUDE.md


### Beads upgrades
- After upgrading `bd`, run: `bd info --whats-new`
- If `bd info` warns about hooks, run: `bd hooks install`
This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

Intent Solutions landing page - Professional website showcasing customizable Intent Agent Models (IAM), private AI infrastructure, automation services, and education resources.

**Active Project**: `/astro-site` (Astro 5.14 + React 19 islands)
**Deployed at**: https://intentsolutions.io
**Deployment**: Netlify (auto-deploy on push to main)

## Commands

All commands run from `astro-site/` directory:

```bash
# Development
bun install          # Install dependencies
bun run dev          # Dev server at http://localhost:4321
bun run build        # Production build
bun run preview      # Preview production build

# Testing (Playwright)
bun run test                  # Run all E2E tests headless
bun run test:ui               # Interactive Playwright UI
bun run test:headed           # Run with visible browser
bun run test:debug            # Step-through debugging
bun run test:report           # View HTML test report
bun run test:chromium         # Chrome only
bun run test:firefox          # Firefox only
bun run test:webkit           # Safari only
bun run test:mobile           # Mobile devices only
bun run test:all              # All browsers + mobile
npx playwright install        # First-time browser setup
```

## Architecture

### Astro + React Islands Pattern
- **Astro pages** (`.astro`) handle routing and static content
- **React components** (`.tsx`) are hydrated client-side for interactivity
- Layout wrapper: `src/layouts/Layout.astro` provides SEO, fonts, meta tags
- Navigation: `src/components/SiteNav.astro` (Astro component)
- Interactive sections: `Hero.tsx`, `Products.tsx`, `Services.tsx`, `Contact.tsx` (React islands with Framer Motion)

### Netlify Functions
- `netlify/functions/survey-webhook.js` - Survey form processing
- `netlify/functions/submission-created.js` - Form submission handler
- Functions directory configured in `netlify.toml`

### Testing Infrastructure
- E2E tests in `tests/e2e/` using Playwright
- Test server runs on port 8080 (see `playwright.config.ts`)
- Multi-browser: Chrome, Firefox, Safari + mobile devices (iPhone 12, Pixel 5, iPad Pro)
- Test artifacts: `test-results/` for reports, screenshots on failure

## Core Positioning

### Intent Agent Models (IAM)
- **IAM** = Intent Agent Models - fully customizable AI agent building blocks
- **IAE** = Intent Agent Engine - the framework powering IAM
- **M1/M2/M3** = Pre-configured IAE packages (starters for common use cases)
- **Key Message**: "We customize any IAM for any workflow"

### PipelinePilot MVP
- **What**: Live production SDR automation platform
- **How**: Built with 4 customized IAM agents
- **Purpose**: Proof of IAM customizability
- **URL**: https://pipelinepilot-prod.web.app
- **4 Agents**: Orchestrator, Data Captain, Content Analyst, Readiness Auditor

### Site Principles
- Model-agnostic (Claude, OpenAI, Gemini, Llama, Mistral, Qwen, fine-tunes, local)
- Transparent pricing (flat fee + usage pass-through)
- Vertex-first security for production (with n8n for orchestration)
- No vendor lock-in messaging

## Routes

| Path | Purpose |
|------|---------|
| `/` | Homepage with hero, products, services, contact |
| `/agents` | IAM packages (M1/M2/M3) + PipelinePilot example |
| `/private-ai` | Model-agnostic private AI infrastructure |
| `/automation` | n8n automation + Vertex comparison |
| `/cloud` | Google Cloud services |
| `/about` | About page |
| `/resellers` | White-label reseller program |
| `/learn` | Education hub |
| `/learn/pricing` | Transparent pricing explanation |
| `/learn/security` | Vertex vs self-hosted comparison |
| `/learn/models` | Model-agnostic delivery (9 model families) |
| `/survey` | HUSTLE survey flow (15 sections, 76 questions) |
| `/survey/1-15` | Individual survey sections |

## Tech Stack

- **Framework**: Astro 5.14 (SSG)
- **UI**: React 19 islands (partial hydration)
- **Styling**: Tailwind CSS 4 (via `@tailwindcss/vite`)
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod validation + Netlify Forms
- **Testing**: Playwright (E2E)
- **Deployment**: Netlify (auto-deploy on push to main)

## Design System

- **Colors**: Zinc palette (900-50)
- **Typography**: Inter font family
- **Key Classes**: `card-slate`, `btn-primary`, `text-h1`, `transition-smooth`
- **Theme**: `src/styles/global.css`

## Content Guidelines

### Messaging Do's
- Emphasize IAM customizability
- Position PipelinePilot as proof of customization
- Show model-agnostic flexibility
- Be transparent about pricing
- Recommend Vertex for production with clear reasoning

### Messaging Don'ts
- Don't imply vendor lock-in
- Don't say "3 agents" as a product cap
- Don't link IAM to specific platforms (LinkedIn, etc.)
- Don't hide pricing or make it opaque
- Don't imply Vertex is the only option
