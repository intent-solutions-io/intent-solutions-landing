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
- **GCP Project**: `intent-landing-page`
- **Firebase Hosting**: https://intent-landing-page.web.app
- **Custom Domain**: https://intentsolutions.io (pending DNS configuration)
- **Plugin Marketplace**: https://claudecodeplugins.io (258+ plugins)
- **Booking Link**: https://calendar.app.google/Dj5qDi9oQjDzGkcq8

## Commands

All commands run from `astro-site/` directory:

```bash
# Development
bun install          # Install dependencies
bun run dev          # Dev server at localhost:4321
bun run build        # Production build
bun run preview      # Preview production build

# Firebase Deployment
firebase deploy                    # Deploy all (hosting, functions, firestore)
firebase deploy --only hosting     # Deploy static site only
firebase deploy --only functions   # Deploy Cloud Functions only
firebase emulators:start           # Local dev with emulators

# Testing (Playwright)
bun run test                  # All E2E tests headless
bun run test:ui               # Interactive Playwright UI
bun run test:headed           # Run with visible browser
bun run test:debug            # Step-through debugging
npx playwright test tests/e2e/survey-complete-flow.spec.ts  # Single test
```

## Architecture

### Astro + React Islands Pattern

Pages are static Astro files; interactive sections use React islands with `client:load` (immediate) or `client:visible` (lazy) hydration:

```astro
<!-- src/pages/index.astro -->
<Hero client:load />           <!-- Hydrates immediately (above fold) -->
<ClaudeCodeTiers client:visible />  <!-- Hydrates when scrolled into view -->
```

- **Pages**: `src/pages/*.astro` - Routing and static content
- **Layout**: `src/layouts/Layout.astro` - SEO (astro-seo), fonts, Firebase Analytics
- **React Islands**: `src/components/*.tsx` - Interactive sections with Framer Motion

### Form Submission Flow (Firebase)

1. User submits form → POST to `/api/contact` or `/api/partner`
2. Firebase Hosting rewrites to Cloud Function
3. Function validates with Zod, saves to Firestore `contactSubmissions`
4. Sends emails via Resend API (thank-you + notification)
5. Returns JSON response

### Cloud Functions

Located in `astro-site/functions/src/`:
- `index.ts` - Function exports (submitContact, submitPartnerInquiry, submitSurvey)
- `services/firestore.ts` - Firestore write operations
- `services/email.ts` - Resend email templates
- `types/index.ts` - TypeScript interfaces

### Firestore Schema

Collection: `contactSubmissions`
```typescript
{
  email: string,
  formType: 'contact' | 'partner-inquiry' | 'survey',
  status: 'new' | 'contacted' | 'converted',
  createdAt: Timestamp,
  teamSize?: string,
  businessName?: string,
  contactMethods?: { discord?, whatsapp?, phone?, linkedin?, xHandle? },
  emailsSent?: { thankYou?: Timestamp, leadNotification?: Timestamp }
}
```

### Environment/Secrets

Secrets managed via Firebase:
```bash
firebase functions:secrets:set RESEND_API_KEY
firebase functions:secrets:set RESEND_FROM_EMAIL
```

### Testing Infrastructure

- E2E tests in `astro-site/tests/e2e/` using Playwright
- Test server auto-starts on port 8080 (`bun run dev --port 8080`)
- Projects: Desktop Chrome/Firefox/Safari, iPhone 12/12 Pro, Pixel 5, iPad Pro

## Design System

Theme in `src/styles/global.css` (Charcoal Slate / Theme 7):

| Class | Purpose |
|-------|---------|
| `card-slate` | Semi-transparent cards with backdrop blur |
| `btn-primary` | Zinc-200 background buttons |
| `text-hero` | 3.5rem/2.5rem mobile hero text |
| `text-h1`, `text-h2` | Heading sizes with tight tracking |
| `transition-smooth` | Cubic-bezier transitions |

Colors: Zinc palette (950-50), Inter font family.

## Key Pages

| Route | Purpose |
|-------|---------|
| `/` | Homepage - Claude Code Systems + secondary services |
| `/contact` | Standalone contact page (linkable from external sites) |
| `/agents` | AI Agents (Intent Agent Models) |
| `/private-ai` | Private AI infrastructure |
| `/automation` | n8n automation services |
| `/cloud` | Google Cloud services |
| `/resellers` | Distribution partner program |
| `/learn/*` | Education hub (pricing, security, models) |
| `/survey` | Legacy HUSTLE survey system |

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
