# Intent Solutions Landing Page

Professional React/TypeScript landing page for Intent Solutions services.

**Live Site:** https://intentsolutions.io

## Quick Start

```bash
# Install dependencies (Bun required)
bun install

# Development server (http://localhost:8080)
bun run dev

# Production build
bun run build

# Preview production build
bun run preview
```

## Technology Stack

- **Runtime**: Bun
- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite with SWC
- **UI Library**: shadcn/ui (57 components) + Tailwind CSS
- **Deployment**: Netlify (auto-deploy from main branch)
- **Domain**: intentsolutions.io (DNS via Porkbun)

## Documentation

All comprehensive documentation is located in `01-Docs/`:

- **Claude Instructions**: `01-Docs/022-ref-claude-instructions.md` - Complete AI context and development guide
- **Project Overview**: `01-Docs/023-ref-project-overview.md` - Detailed project information
- **Deployment Guide**: `01-Docs/02-NETLIFY-DEPLOYMENT-GUIDE.md`
- **Architecture**: `01-Docs/07-ARCHITECTURE.md`
- **Security**: `01-Docs/10-SECURITY.md`
- **Changelog**: `01-Docs/021-chg-version-history.md`

For a complete list of documentation, see `01-Docs/20-README-docs-index.md`.

## Directory Standards

This project follows the MASTER DIRECTORY STANDARDS.
See `.directory-standards.md` for details.
All documentation is stored in `01-Docs/` using the `NNN-abv-description.ext` format.

## Project Structure

```
intent-solutions-landing/
├── 01-Docs/                    # All documentation (see docs index)
├── 02-Src/                     # React source code
├── 03-Tests/                   # Test suites
├── 04-Assets/                  # Static assets
├── 05-Scripts/                 # Automation scripts
├── 06-Infrastructure/          # Infrastructure as Code
├── 07-Releases/                # Release artifacts
├── 99-Archive/                 # Archived items
├── .directory-standards.md     # Directory organization standards
├── README.md                   # This file
├── CLAUDE.md                   # Claude Code instructions
├── CHANGELOG.md                # Version history
└── LICENSE                     # MIT License
```

## Development

For complete development instructions, architecture details, and deployment procedures, please refer to `01-Docs/022-ref-claude-instructions.md`.

## Deployment

- **Auto-deploy**: Push to `main` branch triggers Netlify build
- **Build command**: `bun install && bun run build`
- **Output directory**: `dist/`
- **Live site**: https://intentsolutions.io

## License

MIT License - See `LICENSE` file for details

---

**For full documentation, see `01-Docs/` directory**
