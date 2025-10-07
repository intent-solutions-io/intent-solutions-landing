# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Quick Reference

**Full Documentation**: See `01-Docs/022-ref-claude-instructions.md` for complete AI context, development guide, architecture details, and deployment procedures.

## Directory Standards

Follow `.directory-standards.md` for structure and file naming.
- Store all docs in `01-Docs/`
- Use `NNN-abv-description.ext` format with approved abbreviations
- Maintain strict chronological order

## Essential Commands

```bash
# Development
bun install                    # Install dependencies
bun run dev                    # Dev server (http://localhost:8080)
bun run build                  # Production build
bun run preview                # Preview production build

# Deployment
# Auto-deploy: Push to main branch triggers Netlify build
# Manual: Via Netlify CLI or dashboard
```

## Technology Stack

- **Runtime**: Bun (fast JavaScript runtime)
- **Framework**: React 18 + TypeScript (strict mode)
- **Build Tool**: Vite with SWC (HMR on port 8080)
- **UI Library**: shadcn/ui (57 components) + Tailwind CSS
- **Deployment**: Netlify (auto-deploy from GitHub main branch)
- **Domain**: intentsolutions.io (DNS via Porkbun)

## Project Structure

```
02-Src/
├── components/          # React components (Navigation, Hero, etc.)
├── pages/              # Page components (Index, NotFound)
├── hooks/              # Custom React hooks
├── lib/                # Utilities (cn, etc.)
└── assets/             # Images and static files
```

## Key Files

- **Full Claude Instructions**: `01-Docs/022-ref-claude-instructions.md`
- **Project Overview**: `01-Docs/023-ref-project-overview.md`
- **Deployment Guide**: `01-Docs/02-NETLIFY-DEPLOYMENT-GUIDE.md`
- **Architecture**: `01-Docs/07-ARCHITECTURE.md`
- **Changelog**: `01-Docs/021-chg-version-history.md`

## Critical Notes

1. **Bun Runtime Required** - This project uses Bun, not npm/yarn/pnpm
2. **Custom Domain** - intentsolutions.io with Netlify SSL/TLS
3. **Path Aliases** - `@/` maps to `./02-Src/`
4. **Auto-Deploy** - Push to main branch triggers Netlify build

## Documentation Index

For a complete list of all documentation files, see `01-Docs/20-README-docs-index.md`.

---

**Last Updated**: October 6, 2025
**Status**: ✅ Production deployment active at intentsolutions.io

**For complete documentation, see `01-Docs/` directory**
