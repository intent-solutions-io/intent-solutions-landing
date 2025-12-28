# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Task Tracking (Beads / bd)

Use `bd` for all tasks/issues (no markdown TODO lists).

```bash
bd ready                                    # Start of session
bd create "Title" -p 1 --description "..."  # Create work
bd update <id> --status in_progress         # Begin task
bd close <id> --reason "Done"               # Complete task
bd sync                                     # End of session
```

After upgrading `bd`: run `bd info --whats-new` and `bd hooks install` if warned.

## Repository Overview

Intent Solutions landing page - **Claude Code Systems** is the primary service (build + train). Additional services include AI agents, private AI infrastructure, and automation.

- **Active Project**: `astro-site/` (Astro 5.14 + React 19 islands)
- **Deployed at**: https://intentsolutions.io
- **Deployment**: Netlify (auto-deploy on push to main)
- **Plugin Marketplace**: https://claudecodeplugins.io (258+ plugins)

## Commands

All commands run from `astro-site/` directory:

```bash
# Development
bun install          # Install dependencies
bun run dev          # Dev server at localhost:4321
bun run build        # Production build
bun run preview      # Preview production build

# Testing (Playwright)
bun run test                  # All E2E tests headless
bun run test:ui               # Interactive Playwright UI
bun run test:headed           # Run with visible browser
bun run test:debug            # Step-through debugging
bun run test:chromium         # Chrome only
bun run test:firefox          # Firefox only
bun run test:webkit           # Safari only
bun run test:mobile           # Mobile devices only
npx playwright install        # First-time browser setup
```

## Architecture

### Astro + React Islands Pattern

- **Astro pages** (`.astro`) in `src/pages/` handle routing and static content
- **React components** (`.tsx`) in `src/components/` are hydrated client-side for interactivity
- **Layout**: `src/layouts/Layout.astro` provides SEO, fonts, meta tags
- **Navigation**: `src/components/SiteNav.astro` (static Astro component)
- **Interactive sections**: `Hero.tsx`, `Products.tsx`, `Services.tsx`, `Contact.tsx` (React islands with Framer Motion animations)

### Netlify Functions

Located in `astro-site/netlify/functions/`:
- `survey-webhook.js` - Survey form processing
- `submission-created.js` - Form submission handler

### Testing Infrastructure

- E2E tests in `astro-site/tests/e2e/` using Playwright
- Test server runs on port 8080 (configured in `playwright.config.ts`)
- Multi-browser: Chrome, Firefox, Safari + mobile (iPhone 12, Pixel 5, iPad Pro)

## Design System

Theme defined in `src/styles/global.css`:
- **Colors**: Zinc palette (900-50), charcoal slate monochrome
- **Typography**: Inter font family
- **Key Classes**: `card-slate`, `btn-primary`, `text-h1`, `text-hero`, `transition-smooth`

## Core Positioning

### Claude Code Systems (Primary Service)
- **Tagline**: "Build + Train"
- **What**: Custom Claude Code setups for teams of any size
- **Tiers**: Starter → Growth → Scale → Enterprise
- **Backed by**: claudecodeplugins.io (258+ plugins, 239 skills)
- **Model**: Retainer + hourly + project-based

### Secondary Services
- **AI Agents**: Custom Intent Agent Models for workflows
- **Private AI**: ChatGPT-style on your cloud
- **Automation**: n8n workflows
- **Cloud**: Google Cloud architectures

## Content Guidelines

**Do**:
- Lead with Claude Code Systems as the primary service
- Emphasize "build + train" positioning
- Reference 258+ plugins as proof of capability
- Offer flexible contact options (Discord, WhatsApp, LinkedIn, X, phone)
- Show tiered packages clearly

**Don't**:
- Bury Claude Code under other services
- Require rigid form fields (let people choose their contact method)
- Over-emphasize secondary services on homepage
