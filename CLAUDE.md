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

# NOTE: No package.json exists at root level
# Dependencies are managed via bun.lockb
# No lint/test scripts configured yet for React app

# Testing (Astro site has comprehensive test suite)
cd astro-site
npm install                    # Install Playwright dependencies (one-time)
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
- **CRITICAL**: Base directory is set to `astro-site` in netlify.toml but React app is at root level - THIS IS INCORRECT and should be fixed
- Output directory: `dist/`
- Security headers: CSP, HSTS, X-Frame-Options configured
- Redirects: HTTP→HTTPS, www→non-www, 404 fallback to /404.html (static site, NOT SPA routing)

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
- **Bun Runtime Required** - Do NOT use npm/yarn/pnpm commands for root project
- **No Package.json at Root** - Dependencies managed via bun.lockb (Bun's binary lockfile)
- **No Build Scripts Configured** - No lint, test, or type-check scripts exist yet for React app
- **Test Suite in Astro Site Only** - Main React app has test structure (`03-Tests/`) but no implemented tests yet
- **Static Site Routing** - React Router handles client-side navigation; Netlify serves 404.html for unknown routes (NOT SPA fallback)

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
1. Create `package.json` in root (currently doesn't exist)
2. Install test dependencies: `bun add -d vitest @testing-library/react @testing-library/jest-dom jsdom @vitejs/plugin-react`
3. Create `vitest.config.ts` with path aliases and jsdom environment
4. Add test scripts to package.json: `"test": "vitest"`, `"test:ui": "vitest --ui"`
5. Write tests in `03-Tests/unit/`, `03-Tests/integration/`, or `03-Tests/e2e/`

**Important**: Currently the React app has NO package.json - Bun manages dependencies via bun.lockb only. You'll need to create package.json if adding test scripts.

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
2. Use shadcn/ui primitives from `@/components/ui/` (import with `@/` alias)
3. Import and compose in `pages/Index.tsx` or other pages
4. Follow existing patterns (Tailwind classes, responsive design)
5. Verify component renders correctly with `bun run dev`

### Modifying UI Components
shadcn/ui components in `02-Src/components/ui/` can be customized:
- Button variants defined in `buttonVariants` cva (`02-Src/components/ui/button.tsx`)
- Utility function `cn()` from `@/lib/utils` for class merging
- Components use Radix UI primitives with Tailwind styling
- All 57 shadcn/ui components are pre-installed and available

### Working with Path Aliases
- `@/` resolves to `./02-Src/` (configured in vite.config.ts)
- Example: `import { Button } from "@/components/ui/button"`
- Static assets served from `04-Assets/` via Vite's publicDir

### Deployment
Auto-deploy on push to `main` branch. For manual deployment:
```bash
bun run build                  # Build locally (output to dist/)
# Upload dist/ to Netlify or use Netlify CLI
# Or: netlify deploy --prod
```

**Note**: Netlify build configuration in `netlify.toml` has `base = "astro-site"` but this appears to be legacy config. Actual React app is at root level.

---

**Last Updated**: 2025-10-11 (Updated with critical Netlify config issue and troubleshooting)
**Status**: ✅ Production at intentsolutions.io
**Primary Contact**: jeremy@intentsolutions.io

## Critical Implementation Notes

### Bun-Specific Behavior
- **No package.json at root**: Bun manages dependencies via binary `bun.lockb` file only
- **Installing packages**: Use `bun add <package>` (NOT npm install)
- **Dev dependencies**: Use `bun add -d <package>` for devDependencies
- **Running scripts**: Scripts are defined in `vite.config.ts` and executed via `bun run <script>`
  - `bun run dev` → Runs Vite dev server on port 8080
  - `bun run build` → Builds production bundle to `dist/`
  - `bun run preview` → Previews production build
- **Direct execution**: Can also run TypeScript files directly: `bun <file>.ts`
- **Lock file**: `bun.lockb` is binary format, not human-readable like package-lock.json
- **Scripts without package.json**: Bun reads scripts from `vite.config.ts` plugins and standard Vite commands

### Project Confusion Warning
This repository has TWO separate projects:
1. **React/Vite SPA** (root level) - This is the PRODUCTION site
2. **Astro site** (`astro-site/` directory) - This is ONLY for Netlify Forms testing

Do not confuse the two. The Astro site has its own package.json and node_modules. The React app at root level does NOT have package.json.

### Netlify Configuration Issue - MUST BE FIXED
The `netlify.toml` file has `base = "astro-site"` which is **INCORRECT**.

**Problem**: Netlify is configured to build from `astro-site/` directory, but the production React app is at root level.

**Current config** (netlify.toml):
```toml
[build]
  base = "astro-site"  # ❌ WRONG - should be "." or removed
  command = "bun install && bun run build"
  publish = "dist"
```

**Correct config should be**:
```toml
[build]
  base = "."  # Or omit entirely (defaults to root)
  command = "bun install && bun run build"
  publish = "dist"
```

**Why this matters**: If deployment fails or builds the wrong site, this is the cause. The Astro site in `astro-site/` is ONLY for Netlify Forms testing, NOT production.

## Troubleshooting

### Deployment Failures
If Netlify deployment fails:
1. Check `netlify.toml` - `base` should be `"."` or omitted (NOT `"astro-site"`)
2. Verify build command: `bun install && bun run build`
3. Check output directory: `dist/`
4. Review Netlify build logs for Bun version compatibility

### Build Errors Locally
```bash
# Clear Bun cache and reinstall
rm -rf node_modules bun.lockb
bun install

# Verify Vite config
cat vite.config.ts  # Check path aliases and publicDir

# Test build
bun run build && bun run preview
```

### "Module not found" Errors
- Verify `@/` alias resolves to `./02-Src/` in vite.config.ts:19
- Check file exists at expected path: `02-Src/components/...`
- Ensure imports use correct path alias: `import { Button } from "@/components/ui/button"`

### Port Already in Use (8080)
```bash
# Find process using port 8080
lsof -i :8080

# Kill process and restart
kill -9 <PID>
bun run dev
```
