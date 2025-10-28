# IAE Demo Strategy: Visual Proof of Concept
**Date:** 2025-10-27
**Status:** Planning
**Goal:** Create compelling demo of IAE: Model 1 using Google Cloud credits

---

## Demo Options Analysis

### Option 1: Firebase Hosted Live Demo (RECOMMENDED)
**What:** Working IAE prototype on Firebase with real Google Cloud integration

**Why Firebase:**
- Free tier: Firestore, Cloud Functions, Hosting
- You have Google Cloud credits ($300+ free tier)
- Already familiar (DiagnosticPro uses Firebase)
- Fast deployment (<2 hours)
- Real Vertex AI Anthropic integration
- Actually demonstrates the product

**Build Plan:**
```
iae-demo/
├── frontend/                    # React dashboard
│   ├── Demo landing page
│   ├── Lead scoring visualizer
│   └── Real-time agent activity
├── functions/                   # Cloud Functions
│   ├── Intelligence agent (Vertex AI)
│   └── Mock execution agents
└── firestore/                   # Database
    ├── Sample leads (10-20)
    └── Scoring results
```

**Demo Flow:**
1. User visits demo.intentsolutions.io (or Firebase subdomain)
2. Sees 20 sample leads from "fictional company"
3. Clicks "Score Leads" → Intelligence Agent runs (Vertex AI Anthropic)
4. Real-time progress indicator
5. Results populate: A-tier (green), B-tier (yellow), C-tier (gray)
6. Show reasoning: "This lead scores 87 because: Series A fintech, 25 employees, uses Salesforce..."
7. Click "Execute Outreach" on A-tier leads → Mock execution (shows messages being drafted)
8. CTA: "See this with YOUR data" → mailto:jeremy@intentsolutions.io

**Timeline:** 2-3 days
**Cost:** $0 (Firebase free tier + Google Cloud credits)

---

### Option 2: Animated Explainer Video
**What:** Professional animated video showing IAE architecture

**Tools:**
- **Manim** (open source math animation) - You know Python
- **Remotion** (React-based video) - You know React
- **Lottie** (web animations) - Fast, lightweight

**Video Script (60-90 seconds):**
```
[0-10s] Problem: Generic LinkedIn automation = 0.5% response rate
[10-25s] IAE: Model 1 architecture diagram (intelligence → execution)
[25-40s] Intelligence layer: Shows Vertex AI analyzing closed deals
[40-55s] Scoring: 1000 leads → 50 A-tier (visual funnel)
[55-70s] Execution: Personalized messages to A-tier only
[70-85s] Results: 5-10% response rate (10x improvement)
[85-90s] CTA: Book demo at intentsolutions.io
```

**Timeline:** 3-5 days (learning curve for animation tools)
**Cost:** $0 (all open source)

---

### Option 3: Google Veo 3 Generated Demo
**What:** Use Google's new video generation model to create demo clips

**Challenges:**
- Veo 3 still in limited preview (may not have access yet)
- Better for B-roll footage than technical diagrams
- Hard to show UI/UX concepts with AI video

**If You Get Veo 3 Access:**
- Generate B-roll: "Person working on laptop, analytics dashboard, team meeting"
- Overlay with motion graphics showing IAE architecture
- Hybrid approach: Veo 3 footage + animated overlays

**Timeline:** Unknown (depends on Veo 3 access)
**Cost:** Unknown (Veo 3 pricing TBD)

---

## RECOMMENDED: Option 1 (Firebase Live Demo)

**Why This Wins:**
1. **Shows real product** - Not just a video, actual working code
2. **Uses your tech stack** - Vertex AI Anthropic, Cloud Run, Firestore
3. **Fast to build** - 2-3 days with tools you know
4. **Cost: $0** - Firebase free tier + Google Cloud credits
5. **Reusable** - Can become actual IAE MVP after demo
6. **Social proof** - Link on website, share on X/LinkedIn
7. **Sales tool** - Send link to prospects: "Try it yourself"

---

## Firebase Demo: Detailed Build Plan

### Day 1: Backend + Intelligence Agent

**Morning (4 hours):**
- Set up Firebase project (iae-demo-prod)
- Enable Firestore, Cloud Functions, Hosting
- Set up Vertex AI Anthropic API
- Create sample data:
  - 20 fake leads (10 good-fit, 10 bad-fit)
  - Fictional company: "TechFlow Solutions" (B2B SaaS)
  - Their ICP: Series A fintech, 20-50 employees, uses Salesforce

**Afternoon (4 hours):**
- Build Intelligence Agent Cloud Function:
  ```javascript
  // functions/src/intelligenceAgent.ts
  export const scoreLeads = functions.https.onCall(async (data, context) => {
    // 1. Load ICP model from Firestore
    // 2. Call Vertex AI Anthropic to score each lead
    // 3. Return scored leads with reasoning
  });
  ```
- Test with Postman
- Deploy to Cloud Functions

### Day 2: Frontend Dashboard

**Morning (4 hours):**
- Create React app (Vite)
- Design dashboard UI:
  - Lead list (table view)
  - Score button (triggers Cloud Function)
  - Results view (color-coded tiers)
  - Reasoning tooltips

**Afternoon (4 hours):**
- Connect Firebase SDK
- Real-time updates (Firestore listeners)
- Loading states
- Animations (Framer Motion for polish)

### Day 3: Polish + Deploy

**Morning (2 hours):**
- Add mock execution agent:
  - Shows message being drafted
  - Simulates sending (doesn't actually send)
  - Updates Firestore with "sent" status

**Afternoon (2 hours):**
- Deploy to Firebase Hosting
- Test on mobile
- Add analytics (Firebase Analytics)
- Create custom domain: demo.intentsolutions.io

**Evening (1 hour):**
- Record screen capture walkthrough
- Post to X: "Built IAE demo in 3 days with @Google Cloud"
- Update intentsolutions.io with demo link

---

## Demo Landing Page Copy

```
# Try IAE: Model 1
**Live demo with real Vertex AI Anthropic intelligence**

You're TechFlow Solutions, a B2B SaaS company selling to fintech startups.
You have 20 new leads from Apollo.io.

**Traditional approach:**
- Send generic message to all 20 leads
- 0.5% response rate = 0 meetings

**IAE: Model 1 approach:**
- Intelligence Agent scores all 20 leads against YOUR ICP
- Finds 5 A-tier leads (perfect fit)
- Execution Agent sends personalized outreach to A-tier only
- 10% response rate = 0.5 meetings (infinite improvement!)

[Score These Leads] ← Button triggers Intelligence Agent

--- Results View ---

✅ A-Tier Leads (5)
- Stripe (Score: 94) - Series A fintech, 35 employees, uses Salesforce
- Plaid (Score: 89) - Series A fintech, 28 employees, $50M raised
- [3 more...]

⚠️ B-Tier Leads (7)
- [Shows 7 leads with 60-79 scores]

❌ C-Tier Leads (8)
- [Shows 8 leads with <60 scores]

[Execute Outreach on A-Tier] ← Button shows mock messages

--- Execution View ---

Drafting personalized message for Stripe...
✓ Message crafted (23 seconds)
✓ Queued for delivery
✓ Sent via LinkedIn

[See This With YOUR Data] → mailto:jeremy@intentsolutions.io
```

---

## Success Metrics

**Technical:**
- ✅ Demo loads in <3 seconds
- ✅ Scoring completes in <30 seconds (Vertex AI call)
- ✅ Works on mobile
- ✅ Zero crashes

**Business:**
- Track visits: Firebase Analytics
- Track demo completions: How many click "Score Leads"?
- Track conversions: How many email jeremy@intentsolutions.io?
- Goal: 10% of demo users → email conversion

---

## Post-Demo Marketing Plan

### Week 1: Launch
**X/Twitter Thread:**
```
I built IAE (Intent Agent Engine) in 3 days using @Google Cloud.

Intelligence layer: Vertex AI Anthropic
Execution agents: Cloud Functions
Database: Firestore

Try the live demo: demo.intentsolutions.io

Here's how it works 🧵👇
```

**LinkedIn Post:**
```
Most LinkedIn automation spams everyone.

IAE (Intent Agent Engine) uses Vertex AI to score leads BEFORE sending anything.

Result: 10x better response rates.

Live demo (no signup required):
[link]
```

### Week 2: Outreach
- Email to 10 target prospects with demo link
- Post on Indie Hackers
- Share in relevant Slack/Discord communities

### Week 3: Iterate
- Add feature requests from feedback
- Improve based on analytics (where do users drop off?)

---

## Next Steps (Right Now)

1. **Create Firebase project:**
   ```bash
   firebase login
   firebase projects:create iae-demo-prod
   firebase init
   ```

2. **Enable Vertex AI:**
   - Go to Google Cloud Console
   - Enable Vertex AI API
   - Get Anthropic Claude access

3. **Start building:**
   - Day 1 (tomorrow): Backend + Intelligence Agent
   - Day 2: Frontend dashboard
   - Day 3: Polish + deploy

**Total time:** 3 days
**Total cost:** $0 (Firebase free tier + Google Cloud credits)
**Total impact:** Huge (shows real product, not just slides)

---

**Alternative: If You Want Video First**

Use **Remotion** (React-based video):
- Day 1-2: Build animated explainer (60 seconds)
- Day 3: Build Firebase demo
- Launch both together

Video = marketing hook
Demo = conversion tool

---

**Document Filing Reference:**
Category: PM (Project Management)
Type: PLAN (Project Plan)
Last Updated: 2025-10-27
