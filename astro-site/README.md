# intent solutions io

**Version**: 2.1.1

Professional landing page showcasing customizable Intent Agent Models (IAM), private AI infrastructure, automation services, and education hub.

**Deployed at**: https://intentsolutions.io
**PipelinePilot MVP**: https://pipelinepilot-prod.web.app

## 🎯 core positioning

### Intent Agent Models (IAM)
- **IAM** = Intent Agent Models - fully customizable AI agent building blocks
- **IAE** = Intent Agent Engine - framework powering IAM
- **M1/M2/M3** = Pre-configured IAE packages (starters)
- **PipelinePilot** = Live MVP with 4 customized IAM agents for SDR automation

### Key Principles
- Model-agnostic (Claude, OpenAI, Gemini, Llama, Mistral, Qwen, fine-tunes, local)
- Transparent pricing (flat fee + usage pass-through)
- Vertex-first security for production agents
- No vendor lock-in messaging

## 🎨 design

**theme**: charcoal slate (theme 7)
- minimal professional gray monochrome
- charcoal backgrounds with subtle gradients
- clean typography with inter font family
- smooth framer motion animations

## 🚀 tech stack

- **framework**: astro 5.14 (static site generation)
- **ui**: react 19 islands (partial hydration for performance)
- **styling**: tailwind css 4
- **animations**: framer motion + gsap + lenis
- **forms**: react-hook-form + zod validation
- **icons**: phosphor icons
- **seo**: astro-seo with open graph

## 📦 installation

```bash
bun install
```

## 🛠️ development

```bash
bun run dev
```

opens at http://localhost:4321

## 🏗️ build

```bash
bun run build
```

outputs to `dist/` directory

## 📤 deployment

### netlify (recommended)

1. push to github
2. connect to netlify
3. build settings auto-detected from `netlify.toml`:
   - build command: `bun run build`
   - publish directory: `dist`

### manual deployment

```bash
bun run build
bun run preview  # test locally first
netlify deploy --prod
```

## 🎯 features

### Core Features
- ✅ charcoal slate monochrome theme
- ✅ framer motion page load animations
- ✅ smooth scroll with lenis
- ✅ intersection observer scroll triggers
- ✅ validated contact form (React Hook Form + Zod)
- ✅ seo optimized with meta tags
- ✅ mobile responsive
- ✅ lighthouse 95+ score ready

### Site Features (2025-01-03 Refactor)
- ✅ Education hub (/learn) with pricing/security/models pages
- ✅ Resellers white-label program page
- ✅ PipelinePilot MVP showcase modal with 4 custom IAM agents
- ✅ Model-agnostic messaging throughout
- ✅ Transparent pricing components
- ✅ Vertex vs n8n security comparison

### Legacy Features
- ✅ HUSTLE survey system (15 sections, 76 questions)
- ✅ Netlify Forms integration with automated emails
- ✅ Event-triggered serverless functions

## 📊 performance

- first contentful paint: < 1s
- total page weight: < 500kb
- javascript bundle: ~390kb (code-split with islands)
- 95+ lighthouse scores on all metrics

## 📁 structure

```
src/
├── layouts/
│   └── Layout.astro            # base layout with seo
├── pages/
│   ├── index.astro             # homepage
│   ├── agents.astro            # IAM packages (M1/M2/M3)
│   ├── private-ai.astro        # model-agnostic private AI
│   ├── automation.astro        # n8n automation + Vertex comparison
│   ├── cloud.astro             # Google Cloud services
│   ├── about.astro             # about page
│   ├── resellers.astro         # white-label program
│   ├── learn/
│   │   ├── index.astro         # education hub
│   │   ├── pricing.astro       # transparent pricing
│   │   ├── security.astro      # Vertex vs self-hosted
│   │   └── models.astro        # model-agnostic delivery
│   └── survey/                 # HUSTLE survey flow
├── components/
│   ├── Hero.tsx                # hero with animations
│   ├── Products.tsx            # products section
│   ├── Services.tsx            # services grid
│   ├── Contact.tsx             # contact form (React Hook Form + Zod)
│   ├── Footer.tsx              # footer with learn/resellers
│   ├── SiteNav.astro           # navigation
│   ├── MvpShowcase.tsx         # PipelinePilot modal (NEW)
│   └── PricingBlocks.tsx       # pricing component (NEW)
└── styles/
    └── global.css              # charcoal slate theme
```

## 🎨 customization

### change colors

edit `src/styles/global.css`:

```css
:root {
  --color-bg-primary: 24 24 27;    /* main background */
  --color-text-primary: 250 250 250; /* text color */
  /* ... more variables */
}
```

### modify content

edit sections in `src/pages/index.astro` and component files

## 🔧 commands

| command | action |
|---------|--------|
| `bun install` | install dependencies |
| `bun run dev` | start dev server |
| `bun run build` | build for production |
| `bun run preview` | preview production build |

## 📝 recent updates

### 2025-01-03 - Complete Site Refactor
**Major positioning updates emphasizing IAM customizability:**

#### New Pages
- `/learn` - Education hub landing
- `/learn/pricing` - Transparent pricing explanation
- `/learn/security` - Vertex vs self-hosted security comparison
- `/learn/models` - Model-agnostic delivery (9 model families)
- `/resellers` - White-label reseller program

#### New Components
- `MvpShowcase.tsx` - Modal showcasing PipelinePilot's 4 custom IAM agents
- `PricingBlocks.tsx` - Reusable transparent pricing component

#### Key Changes
- Emphasized "customizable Intent Agent Models (IAM)" throughout
- Integrated PipelinePilot MVP as proof of IAM customization
- Added model-agnostic messaging (9 model families supported)
- Created transparent pricing engagement ladder
- Added Vertex vs n8n comparison for production agents
- Updated navigation and footer with learn/resellers links

#### Git Commits
- c0f15e4: Initial refactor with education hub and resellers
- e28da10: Restored IAE branding (Intent Agent Engine)
- b005179: Removed LinkedIn-specific references
- c54d965: Updated with actual PipelinePilot 4-agent details
- a44993e: Emphasized IAM customizability

## 📝 license

all rights reserved © 2025 intent solutions io

---

built with ❤️ using astro + react + tailwind
