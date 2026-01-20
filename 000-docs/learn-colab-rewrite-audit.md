# Learn & Colab Page Rewrite - Audit Document

## Current Routes/Files/Components

### Learn Page
- `/learn/index.astro` - Main page
- `LearnHero.tsx` - Hero section
- `LearnOfferings.tsx` - Training options grid (5 offerings)
- Resources section (inline in astro) - pricing, security, models cards
- `Contact.tsx` - Contact form

### Colab Page
- `/colab.astro` - Main page
- `ColabHero.tsx` - Hero section
- `ColabTypes.tsx` - "Ways to Work Together" (5 types)
- `ColabIdealFor.tsx` - "Is This You?" + "What I Bring"
- `Contact.tsx` - Contact form

---

## Current Section Ordering

### Learn
1. Hero: "Learn with Jeremy" + "Skip tutorials..." + credibility badges + CTAs
2. Training Options: 1:1 Coaching, Live Workshops, Code Reviews, Plugin Development, GCP/Vertex AI
3. Resources: pricing, security, models cards
4. Contact form

### Colab
1. Hero: "Colab with Jeremy" + "Build together. Ship together."
2. Ways to Work Together: Joint Ventures, White-Label, Revenue Share, Technical Co-Founding, Open Source
3. Is This You? + What I Bring
4. Contact form

---

## CONVERSION ISSUES IDENTIFIED

### Learn Page Issues

| Issue | Problem | Impact |
|-------|---------|--------|
| **Vague headline** | "Learn with Jeremy" doesn't explain what Claude Code is or who it's for | Visitors bounce - unclear value prop |
| **Wrong audience** | Current copy targets developers ("pair programming", "plugin development") | Should target EXECUTIVES/LEADERS per new positioning |
| **No Claude Code definition** | Never explains what Claude Code actually is | Execs won't understand what they're buying |
| **Missing artifacts** | Doesn't say what execs walk away with | No tangible outcome = no urgency |
| **No risk/guardrails section** | Critical for exec buy-in missing entirely | Risk-averse buyers leave |
| **No FAQ** | No objection handling | Questions go unanswered → no conversion |
| **Technical jargon** | "CLAUDE.md configurations", "hooks, agents, MCP integrations" | Not exec-friendly language |
| **Developer-focused offerings** | 1:1 Coaching, Code Reviews, Plugin Development | Wrong audience for exec page |

### Colab Page Issues

| Issue | Problem | Impact |
|-------|---------|--------|
| **Vague headline** | "Build together. Ship together. Win together." is meaningless | No clear differentiation |
| **Wrong positioning** | Focus on joint ventures/revenue share (business partnerships) | Should be implementation execution (PRs, deployments) |
| **No engagement modes** | Missing Sprint/Monthly/Advisory options | No clear "how do we work together" |
| **No concrete deliverables** | What actually gets shipped? | Buyers can't evaluate scope |
| **No process explained** | How does engagement actually work? | Unclear workflow = hesitation |
| **No FAQ** | No objection handling | Same as Learn |
| **Missing human approval policy** | Critical trust element | Security-conscious teams won't engage |
| **"Partnership" framing** | Sounds like equity/revenue share | Should be "implementation partner in your repo" |

### Shared Issues

| Issue | Problem |
|-------|---------|
| **No "Which is right for me?"** | Users can't self-select between pages |
| **Duplicated positioning** | Both feel like vague "work with Jeremy" pages |
| **Missing cross-links** | No "Start here → Learn" or "Ready to ship → Colab" |
| **No tracking hooks** | Can't measure CTA clicks or conversions |

---

## What Must Remain (Component Constraints)

- React component structure with `framer-motion` + `react-intersection-observer`
- `card-slate` design pattern
- `btn-primary` / `btn-secondary` classes
- `Contact` component at bottom
- `SiteNav` and `Footer`
- Mobile-responsive grid layouts

---

## Files to Modify

| File | Changes |
|------|---------|
| `LearnHero.tsx` | Complete rewrite - executive positioning |
| `LearnOfferings.tsx` | Replace with executive packages |
| `/learn/index.astro` | Add new sections (artifacts, FAQ, guardrails) |
| `ColabHero.tsx` | Complete rewrite - implementation positioning |
| `ColabTypes.tsx` | Replace with engagement modes |
| `ColabIdealFor.tsx` | Rewrite for implementation focus |
| `/colab.astro` | Add new sections (process, deliverables, FAQ) |

## New Sections Needed

### Learn Page
- Claude Code definition (1 sentence)
- "Who this is for" (executives/leaders)
- "What you walk away with" (artifacts checklist)
- Session agenda
- Executive packages (2-3)
- Risk & guardrails
- FAQ
- Decision block ("Ready to ship? → Colab")

### Colab Page
- Engagement modes (Sprint, Monthly, Advisory)
- "What we deliver" (concrete list)
- "How we work" (process steps)
- Human approval policy
- FAQ
- Decision block ("New to Claude Code? → Learn")

---

## Existing Proof (Use Only This)

- 258+ Claude Code plugins
- 15+ years ops experience
- Production deployments (generic - no specific clients named)
- GCP/Vertex AI infrastructure experience
- claudecodeplugins.io marketplace

Do NOT invent metrics or client names.
