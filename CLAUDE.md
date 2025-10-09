# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Intent Solutions professional landing page showcasing AI-powered platforms (DiagnosticPro, Bob's Brain) and company capabilities. Production deployment at https://intentsolutions.io.

## Essential Commands

```bash
# Development (Bun required - NOT npm/yarn/pnpm)
bun install                    # Install dependencies
bun run dev                    # Dev server at http://localhost:8080
bun run build                  # Production build
bun run preview                # Preview production build

# Testing (Astro site has comprehensive test suite)
cd astro-site
npm run test                   # Playwright tests
npm run test:ui                # Interactive UI mode
npm run test:headed            # Headed browser mode
npm run test:api               # Netlify API tests
```

## Technology Stack

- **Runtime**: Bun (fast JavaScript runtime)
- **Framework**: React 18 + TypeScript (strict mode)
- **Build Tool**: Vite with SWC + React plugin
- **UI Components**: shadcn/ui (57+ components) built on Radix UI
- **Styling**: Tailwind CSS with custom design tokens
- **Routing**: React Router DOM (BrowserRouter)
- **State Management**: TanStack Query (React Query)
- **Deployment**: Netlify with auto-deploy from GitHub main branch
- **Domain**: intentsolutions.io (DNS via Porkbun, SSL via Netlify)

## Architecture

### Component Structure
Single-page application with modular sections:
- `App.tsx` - Root component with routing, query client, toasters
- `pages/Index.tsx` - Main landing page composition
- `pages/NotFound.tsx` - 404 page
- `components/` - Page sections (Hero, About, Platforms, Market, Founder, Contact, Footer)
- `components/ui/` - shadcn/ui primitives (Button, Card, Dialog, etc.)

### Key Patterns
- **Component Composition**: Sections composed in `Index.tsx` for single-page experience
- **Design System**: Custom button variants (`hero`, `cta`) extend shadcn defaults
- **Path Aliases**: `@/` resolves to `./02-Src/` (configured in vite.config.ts)
- **Public Assets**: `04-Assets/` directory configured as Vite publicDir
- **Type Safety**: TypeScript strict mode with React 18 types

### Deployment Configuration
- Build command: `bun install && bun run build` (netlify.toml)
- Base directory: `astro-site` (legacy config - React app is root)
- Output directory: `dist/`
- Security headers: CSP, HSTS, X-Frame-Options configured
- Redirects: HTTP→HTTPS, www→non-www, SPA fallback to index.html

## Directory Standards

Follow `.directory-standards.md` for structure and file naming.
- **All docs in `01-Docs/`** using `NNN-abv-description.ext` format
- **Source code in `02-Src/`** with feature-based organization
- **Tests in `03-Tests/`** (structure defined, tests not yet implemented)
- **Static assets in `04-Assets/`** served as public directory
- **Claude-generated docs in `claudes-docs/`** organized by type

## Important Notes

### Dual Project Structure
This repository contains TWO separate projects:
1. **React/Vite Landing Page** (root level) - Current production site
2. **Astro Site** (`astro-site/` directory) - Contains Netlify form testing suite

The React site is the primary production application. The Astro site contains comprehensive Netlify Forms testing with Playwright.

### Development Constraints
- **Bun Runtime Required** - Do NOT use npm/yarn/pnpm commands
- **No Package.json at Root** - Dependencies managed via bun.lockb
- **Test Suite in Astro Site** - Main React app has test structure but no implemented tests yet
- **SPA Routing** - Netlify redirects handle client-side routing (see netlify.toml)

### File Creation Rules
Per user's global standards:
- NEVER create files without explicit permission
- PREFER editing existing files over creating new ones
- NO documentation files unless explicitly requested
- Follow directory standards for any authorized file creation

## Testing

### Current State
- React app: Test structure exists in `03-Tests/` (unit, integration, e2e) but no tests implemented
- Astro site: Comprehensive Netlify Forms test suite with Playwright

### To Run Existing Tests
```bash
cd astro-site
npm install                    # Install Playwright dependencies
npm run test                   # Run all tests
npm run test:api               # Run Netlify API-specific tests
```

### To Add Tests to React App
When implementing tests for the React app:
1. Install: `bun add -d vitest @testing-library/react @testing-library/jest-dom jsdom`
2. Create `vitest.config.ts`
3. Write tests in `03-Tests/unit/`, `03-Tests/integration/`, or `03-Tests/e2e/`
4. Add test scripts to package.json (will need to create one)

## Key Files & Documentation

- **Architecture**: `01-Docs/030-des-architecture-documentation.md`
- **Component Reference**: `01-Docs/031-api-component-reference.md`
- **Deployment Guide**: `01-Docs/026-dpl-netlify-deployment-guide.md`
- **Security Practices**: `01-Docs/033-sec-security-practices.md`
- **Troubleshooting**: `01-Docs/032-run-troubleshooting-guide.md`
- **Version History**: `01-Docs/021-chg-version-history.md`
- **Docs Index**: `01-Docs/039-ref-docs-index.md`

## Common Development Tasks

### Adding a New Component
1. Create in `02-Src/components/ComponentName.tsx`
2. Use shadcn/ui primitives from `@/components/ui/`
3. Import and compose in `pages/Index.tsx` or other pages
4. Follow existing patterns (Tailwind classes, responsive design)

### Modifying UI Components
shadcn/ui components in `02-Src/components/ui/` can be customized:
- Button variants defined in `buttonVariants` cva
- Utility function `cn()` from `@/lib/utils` for class merging
- Components use Radix UI primitives with Tailwind styling

### Deployment
Auto-deploy on push to `main` branch. For manual deployment:
```bash
bun run build                  # Build locally
# Upload dist/ to Netlify or use Netlify CLI
```

---

**Last Updated**: 2025-10-09
**Status**: ✅ Production at intentsolutions.io
**Primary Contact**: jeremy@intentsolutions.io
