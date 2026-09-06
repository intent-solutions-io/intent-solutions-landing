# Design System Master File

> **LOGIC:** When building a specific page, first check `design-system/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

**Project:** Intent Solutions (intentsolutions.io)
**Generated:** 2026-09-06 by `ui-ux-pro-max search.py --design-system`, then overridden by hand with the Blueprint tokens.
**Category:** Service landing page for an AI implementation firm (the gateway).
**Skin:** Blueprint light. Same tokens as `learn.intentsolutions.io` (`/data/themes/intent_learn/front-door.css`) and the `workflow-diagram-design` skill's style guide, so the marketing site, the learn site, and every diagram in a partner deliverable read as one family.

The generator proposed a sky-blue "social proof" system with testimonial carousels, logo grids, and count-up stat animations. All of that is rejected: doctrine 007 forbids the logo wall and the cert count, the copy standard forbids quantified marketing claims, and the brief says no image, no logo strip, no stat badges in the hero. What survives from the generator is its pre-delivery checklist, reproduced at the bottom.

---

## Global Rules

### Color Palette (Blueprint)

| Role | Hex | CSS variable | Use |
|---|---|---|---|
| paper | `#f3f6f4` | `--paper` | Page background |
| paper-2 | `#eef2ef` | `--paper-2` | Secondary surface (tile backgrounds, code) |
| canvas | `#ffffff` | `--canvas` | Elevated surface (cards that must lift) |
| ink | `#161b1d` | `--ink` | Body text, primary strokes, primary button fill |
| muted | `#4f5b60` | `--ink-dim` | Secondary text |
| soft | `#636e72` | `--ink-faint` | Sublabels, captions (9px+ only) |
| rule | `#d3dbd7` | `--line` | Hairline borders |
| rule-solid | `#b9c3be` | `--line-solid` | Stronger borders, baselines |
| accent | `#ef5a24` | `--signal` | Focal strokes, fills, the one signature element. Never body text. |
| accent-dark | `#c94213` | `--signal-dark` | Accent when it carries text (links in accent, small labels) |
| accent-tint | `rgba(239,90,36,0.08)` | `--signal-tint` | Fill behind accent-stroked boxes |
| link | `#2e5c59` | `--blueprint` | Inline links, external arrows |

**Measured contrast on paper** (from the style guide, recheck with `lint_skin.py --contrast`): ink 15.97:1, muted 6.44:1, soft 4.82:1, link 6.91:1, accent 3.13:1 (graphics only), accent-dark 4.52:1.

**The accent rule:** `accent` draws, `accent-dark` writes. Accent-colored text under 24px regular or 18.66px bold must use `accent-dark`. One or two accent elements per viewport, not per component.

**No dark mode on this site.** The Graphite skin exists for diagrams embedded in dark contexts. The marketing site commits to Blueprint; `color-scheme: light` is declared so form controls match.

### Typography

| Role | Face | Weights | Fallback stack |
|---|---|---|---|
| Display (H1, H2, the one sentence set large) | Newsreader | 400, 500 (opsz axis on) | Georgia, "Times New Roman", serif |
| Body and UI (everything else) | Inter | 400, 500, 600 | system-ui, -apple-system, "Segoe UI", sans-serif |
| Mono (receipt dates, counts) | ui-monospace | 400 | SFMono-Regular, Menlo, Consolas, monospace |

**Why Newsreader for display, replacing Syne.** The page is a document, not a product: paper, receipts, six rules, one contract holder. A text serif with optical sizes sets the headline like a filed record and pairs with Inter the way a broadsheet pairs its masthead with its UI. Syne is a geometric display face built for posters and reads as the cluster-2 "near-black plus one accent" template the anti-slop list names. The learn site uses system-ui for both roles; Newsreader is the one deliberate departure and is the only web font besides Inter this site loads.

**Loading.** Two `<link rel="preload" as="font" crossorigin>` for the two Newsreader weights and one for Inter 400, self-hosted under `/fonts/` as woff2, `font-display: swap`. No Google Fonts stylesheet request at render time (the current render-blocking `fonts.googleapis.com` link is removed).

**Scale (rem, mobile to desktop via clamp):**

| Token | Size | Line height | Tracking |
|---|---|---|---|
| display | clamp(2.5rem, 6vw, 4.25rem) | 1.05 | -0.015em |
| h2 | clamp(1.75rem, 3.2vw, 2.5rem) | 1.15 | -0.01em |
| lede | clamp(1.125rem, 1.6vw, 1.375rem) | 1.5 | 0 |
| body | 1.0625rem (17px) | 1.6 | 0 |
| small | 0.9375rem | 1.5 | 0 |
| label | 0.75rem uppercase | 1.2 | 0.08em |

Body minimum 16px on mobile. Measure 60 to 72 characters (`max-width: 44rem` on prose).

### Spacing and Layout

- Base unit 0.25rem. Section padding `clamp(4rem, 9vw, 7rem)` vertical.
- Page container `max-width: 72rem`, gutters `clamp(1.25rem, 4vw, 2.5rem)`.
- Grid: 12 columns desktop, 1 column below 768px. Three-door and receipt grids collapse 3/4 to 1 with no intermediate 2-up unless it reads better at 768.
- Rules, not boxes: sections separate with a 1px `rule` line and whitespace, the learn site's `.isl-*` convention. Cards get a border only when they are links.
- Radius 4px on buttons and tiles. No pill buttons, no 16px+ radii.
- No shadows except a 1px `rule-solid` bottom edge on the sticky nav after scroll.

### Components

- **Primary button:** ink fill, paper text, 4px radius, 0.75rem 1.25rem padding, 44px minimum height. Hover: accent-dark fill. Focus: 2px accent outline offset 2px.
- **Secondary button:** transparent, 1px ink border, ink text. Hover: paper-2 fill.
- **Text link:** link color, 1px underline, underline offset 3px. Hover: ink.
- **Tile (receipt):** paper-2 fill, 1px rule border, 4px radius, 1.25rem padding, one sentence + mono date line + text link. Tile is the link target.
- **Eyebrow label:** label scale, `soft` color, no rules or decorations either side.
- **Numbered list (the six rules):** ordinal in Newsreader 500 at h2 scale in `muted`, rule text in body. No icons.

### Motion

- One transition token: 160ms ease-out on color, border-color, background. Nothing translates, scales, fades in on scroll, or counts up.
- `@media (prefers-reduced-motion: reduce)` sets transition-duration to 0 globally. Because nothing else animates, coverage is total by construction.
- No framer-motion, gsap, lenis, embla, or React hydration on the homepage.

### The One Signature Element

The three-party figure: Vendors, Intent Solutions, Customers on one row, Members below, five labeled edges. Inline SVG, Blueprint tokens, produced with `workflow-diagram-design` so it passes `lint_skin.py`. It is the only accent-stroked object in the Gate section and the only illustration on the page.

### Anti-patterns (rejected from the generator output and the current site)

Testimonial carousels, client logo grids, count-up stat animations, star ratings, review avatars, cosmic or star-field backgrounds, glassmorphism cards, glow shadows on buttons, gradient "marker highlight" text, chevron dropdown menus, scanline textures, scroll-reveal opacity transitions, "Book a Call" as the universal CTA, dollar figures, time estimates, em and en dashes, the words "first" and "only" as claims.

---

## Pre-Delivery Checklist (from `ui-ux-pro-max`)

- [ ] No emojis as icons (inline SVG only; the page has one illustration and one arrow glyph)
- [ ] `cursor: pointer` on every clickable element
- [ ] Hover states with 160ms transitions
- [ ] Light mode text contrast 4.5:1 minimum (accent-dark for any accent text)
- [ ] Focus states visible for keyboard navigation
- [ ] `prefers-reduced-motion` respected
- [ ] Responsive at 375, 768, 1024, 1440
- [ ] 44px minimum touch targets on the three door CTAs and nav links
- [ ] Body 16px+ on mobile, measure under 75 characters
- [ ] `lang`, viewport meta, skip link, one H1
