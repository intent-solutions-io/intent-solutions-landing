# FINAL DECISION: What We're Building

**Date:** 2025-10-26
**Decision Maker:** Analysis of all research + market validation
**Status:** ✅ APPROVED - Start building

---

## THE PLAN (No More Options)

### What We're Building
**1 agent only to start: LinkedIn Outbound Agent**

Why just one:
- Fastest to market (6-8 weeks)
- Easiest to sell (clear $17K+/mo ROI)
- Proves the model before building agents 2 & 3
- Validates pricing and support burden

---

## THE STACK (Final Decisions)

### Technology
- **Language:** Python 3.11
- **Framework:** FastAPI
- **Database:** PostgreSQL 15
- **Queue:** Redis + Celery
- **LLM:** OpenAI GPT-4
- **Container:** Docker Compose

### Hosting Strategy
- **Self-hosted tier:** Customer deploys Docker Compose on their VPS
- **Managed tier:** You deploy to Hetzner VPS ($20/mo per customer) using Coolify

### Pricing (Final)
- **Self-hosted:** $197/mo (Docker Compose file + docs + email support)
- **Managed:** $497/mo (you host + monitor + support)
- **Custom:** $5K setup + $297/mo (bespoke integrations)

No bundle - just 1 agent for now.

---

## WEBSITE UPDATES (What Changes)

### 1. Hero Section - Remove Grandiose Claim

**CURRENT (Line 37 in Hero.tsx):**
```tsx
creating industries<br />that don't exist
```

**CHANGE TO:**
```tsx
ai agents that ship<br />to production
```

**Why:** More accurate, less pretentious, matches your actual offering

---

### 2. Add New Page: `/agents`

**New file:** `astro-site/src/pages/agents.astro`

**Structure:**
```
1. Hero: "replace sdrs, not hours"
2. LinkedIn Agent card with features
3. Pricing table (Self-hosted vs Managed)
4. ROI calculator (optional for v1)
5. Technical specs (Docker, integrations)
6. FAQ
7. Contact/demo CTA
```

---

### 3. Update Navigation

**File:** `astro-site/src/components/SiteNav.astro`

**Add link:**
```astro
<a href="/agents">AI Agents</a>
```

Between "Automation" and "Cloud"

---

### 4. Update Home Page Cards

**File:** `astro-site/src/pages/index.astro` (lines 24-53)

**Change AI Agents card from:**
```astro
<a href="/ai-agents" class="card-slate h-full flex flex-col">
  <h3 class="text-lg font-semibold text-zinc-50 mb-3">AI Agents</h3>
  <p class="text-sm text-zinc-400 flex-1">
    Lightweight assistants that reason and execute against your SOPs, dashboards, and pipelines.
  </p>
  <span class="mt-6 text-sm text-zinc-200">See agent playbooks →</span>
</a>
```

**TO:**
```astro
<a href="/agents" class="card-slate h-full flex flex-col">
  <h3 class="text-lg font-semibold text-zinc-50 mb-3">AI Agents</h3>
  <p class="text-sm text-zinc-400 flex-1">
    LinkedIn outbound agent that replaces 3-5 SDRs. Deploy in 2 hours. $197/mo self-hosted, $497/mo managed.
  </p>
  <span class="mt-6 text-sm text-zinc-200">See pricing & ROI →</span>
</a>
```

**Why:** Specific, concrete, shows pricing immediately

---

## WEBSITE COPY (Exact Content to Use)

### /agents Page Content

```markdown
# replace sdrs, not hours

Autonomous LinkedIn outreach agent that finds prospects, enriches data, writes personalized messages, and books qualified meetings. Replaces 3-5 SDRs at $6,250/mo each for $197-497/mo.

---

## LinkedIn Outbound Agent

An AI agent that runs LinkedIn prospecting campaigns autonomously. It searches for leads matching your ICP, enriches contact data, generates personalized messaging, sends connection requests, manages follow-ups, and books meetings directly to your calendar.

**What it does:**
* Searches LinkedIn for prospects matching your ideal customer profile
* Enriches contact data with Apollo.io and Clay.com integrations
* Generates personalized messages using GPT-4 based on prospect data
* Sends connection requests and manages follow-up sequences
* Books qualified meetings directly to your calendar (Calendly/Cal.com)
* Updates HubSpot or Salesforce CRM with all activity

**Integrations:**
* LinkedIn Sales Navigator (prospecting)
* Apollo.io (contact enrichment)
* Clay.com (data enrichment)
* Instantly.ai / Lemlist (email sequences)
* HubSpot / Salesforce (CRM sync)
* Calendly / Cal.com (meeting booking)

**ROI:**
* Replaces 3-5 SDRs earning $75K/year ($18,750/mo total)
* Self-hosted cost: $197/mo → Save $18,553/mo (9,400% annual ROI)
* Managed cost: $497/mo → Save $18,253/mo (3,670% annual ROI)
* Payback period: Less than 1 month

---

## Pricing

### Self-Hosted: $197/mo
* You deploy Docker container on your AWS/GCP infrastructure
* Includes: Docker Compose file, deployment docs, email support
* Deploy time: 2-4 hours with our documentation
* Requirements: Linux server, Docker installed, domain + SSL
* Updates: Pull new Docker images as released
* Support: Email support within 24 hours

### Managed: $497/mo
* We host, monitor, and manage everything on secure cloud infrastructure
* Includes: Dedicated VPS, daily backups, uptime monitoring, priority support
* Deploy time: Instant access after onboarding
* 99.5% uptime SLA
* Priority email support within 4 hours
* No lock-in: Export your data anytime in JSON/CSV format

### Custom: $5,000 setup + $297/mo
* Bespoke integrations with your proprietary systems
* Advanced ML tuning for your specific use case
* Dedicated support and custom SLA
* Enterprise-scale deployment assistance
* For teams running 50+ campaigns simultaneously

---

## Technical Specifications

**Architecture:**
* Containerized Python 3.11 application
* FastAPI backend (async, high-performance)
* PostgreSQL database (contacts, campaigns, metrics)
* Redis queue (job scheduling and rate limiting)
* Celery workers (background task processing)

**Deployment:**
* Docker Compose for self-hosted (single file deployment)
* Kubernetes Helm charts available for enterprise
* Works on any Linux server (DigitalOcean, AWS, GCP, Hetzner)
* Fully isolated per customer (no shared infrastructure)

**Security:**
* Environment variables for all credentials (no hardcoded secrets)
* TLS/SSL encryption for all API communications
* Rate limiting to respect LinkedIn API limits
* Audit logs for all agent actions

**Monitoring:**
* Real-time campaign performance metrics
* Daily activity reports (connections, messages, meetings booked)
* Error alerts and retry logic
* Export data anytime (JSON, CSV, or direct database access)

---

## FAQ

**How long does deployment take?**
Self-hosted: 2-4 hours with our documentation (first time). Managed: Instant access after 30-minute onboarding call.

**Do I need LinkedIn Sales Navigator?**
Yes, Sales Navigator is required for prospecting features. We can work with your existing subscription.

**How many prospects can it handle per day?**
Default: 100 connection requests/day (LinkedIn limit). Configurable based on your account age and activity patterns.

**Can I export my data?**
Yes. No lock-in. Export all contacts, messages, and metrics in JSON or CSV format anytime.

**What if I outgrow self-hosted?**
Upgrade to managed tier anytime. We'll migrate your data and campaigns with zero downtime.

**Do you offer trials or demos?**
Book a 30-minute demo call—we'll show you a live instance and answer your questions. No free trial, but 30-day money-back guarantee.

**How do you handle LinkedIn's rate limits?**
Built-in rate limiting respects LinkedIn's rules (100 connections/day, 200 messages/day). Configurable based on your account history.

**Can it integrate with my custom CRM?**
Yes, via Custom tier. We'll build API integrations with your systems ($5K setup fee includes this work).

---

## Book a Demo

Ready to replace your SDR team with an AI agent?

**Email:** jeremy@intentsolutions.io
**Schedule:** [Your Cal.com link]

Typical onboarding: 1-2 days for self-hosted, instant for managed tier.

---

*No contracts. No lock-in. Export your data anytime.*
```

---

## COMPONENT SPECIFICATIONS

### 1. AgentCard.tsx (Create this)

**File:** `astro-site/src/components/agents/AgentCard.tsx`

```tsx
import { motion } from 'framer-motion';

interface AgentCardProps {
  name: string;
  tagline: string;
  description: string;
  features: string[];
  pricing: {
    selfHosted: string;
    managed: string;
    custom: string;
  };
  roi: {
    saves: string;
    comparison: string;
    payback: string;
  };
  integrations: string[];
}

export default function AgentCard({
  name,
  tagline,
  description,
  features,
  pricing,
  roi,
  integrations
}: AgentCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-zinc-900 border border-zinc-800 rounded-lg p-8"
    >
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-zinc-50 mb-2">{name}</h3>
        <p className="text-zinc-400 text-sm">{tagline}</p>
      </div>

      <p className="text-zinc-300 mb-6">{description}</p>

      <div className="mb-6">
        <h4 className="text-sm font-semibold text-zinc-50 mb-3">What it does:</h4>
        <ul className="space-y-2">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-zinc-400">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-zinc-400 flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <h4 className="text-sm font-semibold text-zinc-50 mb-3">ROI:</h4>
        <div className="bg-zinc-950 border border-zinc-800 rounded p-4 space-y-2 text-sm">
          <p className="text-zinc-300">{roi.saves}</p>
          <p className="text-zinc-400">{roi.comparison}</p>
          <p className="text-zinc-400">{roi.payback}</p>
        </div>
      </div>

      <div className="mb-6">
        <h4 className="text-sm font-semibold text-zinc-50 mb-3">Integrations:</h4>
        <div className="flex flex-wrap gap-2">
          {integrations.map((integration, i) => (
            <span
              key={i}
              className="px-2 py-1 bg-zinc-800 text-zinc-300 text-xs rounded"
            >
              {integration}
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-zinc-400">Self-hosted</span>
          <span className="text-lg font-semibold text-zinc-50">{pricing.selfHosted}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-zinc-400">Managed</span>
          <span className="text-lg font-semibold text-zinc-50">{pricing.managed}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-zinc-400">Custom</span>
          <span className="text-sm text-zinc-400">{pricing.custom}</span>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-zinc-800">
        <a
          href="mailto:jeremy@intentsolutions.io?subject=LinkedIn Agent Demo Request"
          className="block w-full py-3 px-6 bg-zinc-50 hover:bg-zinc-200 text-zinc-900 text-center font-semibold rounded transition-colors"
        >
          Book a Demo
        </a>
      </div>
    </motion.div>
  );
}
```

---

### 2. PricingTable.tsx (Create this)

**File:** `astro-site/src/components/agents/PricingTable.tsx`

```tsx
interface PricingTableProps {
  tiers: {
    name: string;
    price: string;
    features: string[];
    cta: string;
  }[];
}

export default function PricingTable({ tiers }: PricingTableProps) {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {tiers.map((tier, i) => (
        <div
          key={i}
          className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 flex flex-col"
        >
          <h3 className="text-xl font-bold text-zinc-50 mb-2">{tier.name}</h3>
          <div className="mb-6">
            <span className="text-3xl font-bold text-zinc-50">{tier.price}</span>
            <span className="text-zinc-400 text-sm">/month</span>
          </div>

          <ul className="space-y-3 mb-8 flex-1">
            {tier.features.map((feature, j) => (
              <li key={j} className="flex items-start gap-2 text-sm text-zinc-400">
                <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <a
            href={`mailto:jeremy@intentsolutions.io?subject=${tier.cta}`}
            className="block w-full py-3 px-6 bg-zinc-800 hover:bg-zinc-700 text-zinc-50 text-center font-semibold rounded transition-colors"
          >
            Get Started
          </a>
        </div>
      ))}
    </div>
  );
}
```

---

## BUILD TIMELINE

### Week 1-2: Backend MVP
- [ ] FastAPI app structure
- [ ] PostgreSQL schema (contacts, campaigns, messages, metrics)
- [ ] LinkedIn API wrapper (use phantombuster or apify)
- [ ] GPT-4 personalization logic
- [ ] Celery tasks for async processing
- [ ] Basic API endpoints (CRUD campaigns)

### Week 3: Frontend Dashboard
- [ ] React admin panel (Vite + React Router)
- [ ] Campaign creation UI
- [ ] Prospect list view
- [ ] Metrics dashboard (messages sent, meetings booked)
- [ ] Export functionality (CSV/JSON)

### Week 4: Docker & Docs
- [ ] Docker Compose file
- [ ] Environment variable configuration
- [ ] Deployment documentation (20-30 pages)
- [ ] Test deployment on fresh VPS
- [ ] Fix issues, refine docs

### Week 5: Website Update
- [ ] Create `/agents` page (Astro)
- [ ] Build AgentCard and PricingTable components (React)
- [ ] Update Hero.tsx (remove grandiose claim)
- [ ] Update SiteNav (add Agents link)
- [ ] Update home page AI Agents card

### Week 6: Launch
- [ ] Open for first 5 customers
- [ ] Support them through deployment
- [ ] Collect feedback
- [ ] Fix bugs

**Target:** Live by Week 6, first customer by Week 7

---

## SUPPORT PLAN

### Self-Hosted ($197/mo)
- **Email support:** 24-hour response time
- **Scope:** Deployment help, configuration questions, bug reports
- **Not included:** Custom integrations, feature requests, infrastructure troubleshooting

### Managed ($497/mo)
- **Email support:** 4-hour response time during business hours
- **Scope:** Everything (deployment, configuration, bugs, performance)
- **Includes:** Daily backups, uptime monitoring, proactive issue detection

### Time Budget
- Self-hosted: 1-2 hours/month per customer
- Managed: 1 hour/month per customer (less hands-on since you control infra)

---

## REVENUE PROJECTIONS

### Month 1-2 (Launch + First Customers)
- **Customers:** 3-5
- **Mix:** 2 self-hosted, 3 managed
- **MRR:** (2 × $197) + (3 × $497) = $1,885
- **Annual:** $22,620

### Month 3-6 (Growth Phase)
- **Customers:** 15
- **Mix:** 5 self-hosted, 10 managed
- **MRR:** (5 × $197) + (10 × $497) = $5,955
- **Annual:** $71,460

### Month 7-12 (Scaling)
- **Customers:** 30
- **Mix:** 10 self-hosted, 20 managed
- **MRR:** (10 × $197) + (20 × $497) = $11,910
- **Annual:** $142,920

**At 30 customers, you're making $143K/year from ONE agent.**

Then you add Meeting Agent and Support Agent → $300K+ ARR potential.

---

## SUCCESS METRICS

### Week 6 (Launch)
- [ ] Website live with `/agents` page
- [ ] Docker Compose tested and working
- [ ] Docs complete and validated
- [ ] First demo call booked

### Month 1
- [ ] 3-5 paying customers
- [ ] $1,500-2,500 MRR
- [ ] Average 2 hours/week support time
- [ ] No critical bugs

### Month 3
- [ ] 10-15 customers
- [ ] $4,000-6,000 MRR
- [ ] 90%+ customer retention
- [ ] Positive feedback on product quality

### Month 6
- [ ] 20-30 customers
- [ ] $8,000-12,000 MRR
- [ ] Start building Agent #2 (Meeting Agent)
- [ ] Profitable enough to hire contractor if needed

---

## FINAL CHECKLIST

### Before You Start Building
- [ ] Approve this plan (or tell me what to change)
- [ ] Set up accounts: Hetzner, Docker Hub, OpenAI
- [ ] Reserve domain: agents.intentsolutions.io
- [ ] Set up Cal.com booking link
- [ ] Decide on custom tier pricing ($5K or $10K setup?)

### Week 1 Actions
- [ ] Clone starter repo (I can help create this)
- [ ] Set up local dev environment
- [ ] Create PostgreSQL schema
- [ ] Build first API endpoint
- [ ] Test LinkedIn API integration

---

## THE DECISION

**We're building:**
1. LinkedIn Outbound Agent only (for now)
2. Docker Compose deployment
3. Self-hosted ($197/mo) + Managed ($497/mo)
4. Hetzner VPS hosting
5. Target: Launch in 6 weeks

**We're NOT building (yet):**
- Meeting Agent (add later if LinkedIn Agent succeeds)
- Support Agent (add later)
- Kubernetes (use Docker Compose)
- Multi-tenant SaaS (use VPS-per-customer model)

---

**This is the plan. Approve it or tell me what to change. Then we build.**

**Document:** 062-PP-EXEC-final-implementation-decision.md
**Status:** ✅ DECISION MADE - Ready to execute
**Next:** Your approval → Start building Week 1
