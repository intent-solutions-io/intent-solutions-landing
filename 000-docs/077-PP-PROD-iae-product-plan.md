# IAE Product Plan: Intent Agent Engine
**Complete Product Strategy & Architecture**

**Date:** 2025-10-27
**Status:** Product Definition
**Author:** Jeremy Longshore (Intent Solutions)

---

## Executive Summary

**IAE (Intent Agent Engine)** is a modular, Google Cloud-native intelligence platform that replaces expensive human teams with multi-level agent architecture. Each model builds on the previous, creating an intelligence workflow that learns from client data and improves over time.

**Core Principle:** Intelligence before automation. Never execute without analysis.

**Revenue Model:** A la carte modules with bundle discounts. Customers pay only for what they need, but incentivized to buy the combo.

**Target Market:** Service businesses with existing paying clients who have messy data and manual workflows costing $200K+/year in salaries.

---

## Product Architecture

### IAE: Model 1 - Intelligence Core
**What it does:**
- Connects to ONE third-party data provider (Apollo, Sales Navigator, or HubSpot)
- Ingests client's closed deals from CRM
- Analyzes patterns using Vertex AI (Anthropic Claude)
- Builds dynamic ICP (Ideal Customer Profile) model
- Scores every lead (0-100 points) against client's unique ICP
- Outputs: A-tier (80-100), B-tier (60-79), C-tier (<60) with reasoning

**What it does NOT do:**
- No outreach execution
- No meeting intelligence
- No support analysis
- Intelligence output only

**Google Cloud Stack:**
- Vertex AI (Anthropic Claude) - ICP analysis
- Cloud Run - containerized intelligence agent
- Firestore - real-time data storage
- BigQuery - historical analytics
- Cloud Functions - data ingestion

**Pricing:**
- Self-serve: $497/mo (Docker containers delivered)
- Managed: $1,497/mo (we host & maintain)
- Custom build: $15-30K setup + $497/mo

**ROI:** Replaces 1-2 data analysts ($80-160K/year salary) for $1,497/mo

---

### Additional Third-Party Connectors
**Specialized agents per data provider:**

Each connector is a separate agent because:
- Different API structures (Apollo ≠ Sales Nav ≠ HubSpot)
- Unique data normalization requirements
- Client only pays for sources they use

**Available Connectors:**
- Apollo.io Agent: +$197/mo
- Sales Navigator Agent: +$197/mo
- HubSpot Agent: +$197/mo
- Clearbit Agent: +$197/mo
- ZoomInfo Agent: +$197/mo

**M1 includes ONE connector.** Additional connectors are add-ons.

**Example:**
- M1 (managed) with Apollo = $1,497/mo
- +Sales Navigator = +$197/mo
- +HubSpot = +$197/mo
- **Total: $1,891/mo** for tri-source intelligence

---

### IAE: Model 2 - Execution Layer
**Requires:** IAE: Model 1

**What it adds:**
- Receives scored leads from M1
- Executes personalized outreach (LinkedIn, email, cold calls)
- Meeting intelligence:
  - Joins client meetings (Google Meet, Zoom)
  - Transcribes conversations
  - Extracts action items
  - Identifies new ICP signals
  - Feeds insights back to M1
- Rate limiting to protect sender reputation
- Multi-channel campaign orchestration
- Response tracking and conversion analytics
- Continuous feedback loop to M1

**Google Cloud Stack:**
- Cloud Run - execution agents (multi-agent)
- Pub/Sub - event-driven orchestration
- Cloud Functions - meeting transcription
- Firestore - state management
- Cloud Speech-to-Text - audio processing

**Pricing:**
- A la carte: $1,997/mo (requires M1)
- Bundle with M1: $2,997/mo (save $497/mo)

**ROI:** Replaces 3-5 SDRs ($225-375K/year salary) for $2,997/mo total

---

### IAE: Model 3 - Support Intelligence
**Requires:** IAE: Model 1 + Model 2

**What it adds:**
- Monitors client support tickets (Zendesk, Intercom, etc.)
- Categorizes by urgency and complexity
- Analyzes customer pain points
- Identifies ICP refinement signals:
  - Which customer types need most support?
  - Which verticals churn fastest?
  - What features drive retention?
- Drafts responses using knowledge base (human approval required)
- Escalates complex issues to human team
- Feeds support intelligence back to M1
- Uses M2 execution layer for follow-ups

**Google Cloud Stack:**
- Cloud Run - support triage agent
- Firestore - ticket database
- Vertex AI - response drafting
- Pub/Sub - escalation triggers

**Pricing:**
- A la carte: $997/mo (requires M1+M2)
- Full stack bundle (M1+M2+M3): $3,997/mo (save $1,491/mo)

**ROI:** Replaces 2 support agents ($120-160K/year salary) for $3,997/mo total

---

## Complete Pricing Matrix

### A La Carte Pricing
| Model | Monthly | Replaces | Savings |
|-------|---------|----------|---------|
| M1 (Intelligence) | $1,497 | 1-2 analysts ($6,667-13,333/mo) | 78-89% |
| M2 (Execution) | $1,997 | 3-5 SDRs ($18,750-31,250/mo) | 89-94% |
| M3 (Support) | $997 | 2 support agents ($10,000-13,333/mo) | 90-93% |
| **Total A La Carte** | **$4,491** | **$35,417-58,000/mo salaries** | **92% savings** |

### Bundle Pricing (The "Combo Meal")
| Bundle | Monthly | A La Carte Price | Savings | ROI vs Salaries |
|--------|---------|------------------|---------|-----------------|
| M1+M2 | $2,997 | $3,494 | Save $497/mo | 88% savings ($22,420/mo) |
| M1+M2+M3 (Full Stack) | $3,997 | $4,491 | Save $1,491/mo | 89% savings ($31,420/mo) |

### Additional Connectors
| Connector | Monthly | Why Needed |
|-----------|---------|------------|
| Apollo.io Agent | +$197 | Firmographic data enrichment |
| Sales Navigator Agent | +$197 | LinkedIn social signals |
| HubSpot Agent | +$197 | CRM sync and historical data |
| Clearbit Agent | +$197 | Company intelligence |
| ZoomInfo Agent | +$197 | Contact data and org charts |

**Example Full Configuration:**
- M1+M2+M3 bundle: $3,997/mo
- +Sales Navigator: +$197/mo
- +HubSpot: +$197/mo
- **Total: $4,391/mo** (tri-source intelligence + full execution + support)

---

## Customer Journey & Upsell Path

### Month 1: Land with M1 ($1,497/mo)
**Value delivered:**
- Client sends Apollo data export
- We analyze their 50+ closed deals
- Build custom ICP model
- Score their entire lead database
- Show them: "These 500 leads are A-tier for YOUR business"

**Outcome:** Client sees immediate value (intelligence insights)

---

### Month 2-3: Upsell Additional Connectors (+$197/mo each)
**Value delivered:**
- Add Sales Navigator data
- Add HubSpot CRM sync
- Tri-source intelligence = more accurate ICP

**Outcome:** M1 now at $1,891/mo (3 connectors)

---

### Month 4: Upsell M2 - Execution (+$1,997 or $2,997 bundle)
**Value delivered:**
- "You've been manually reaching out to A-tier leads. Let M2 automate it."
- Execution layer handles outreach
- Meeting intelligence captures insights
- Feedback improves M1 accuracy

**Outcome:** M1+M2 bundle at $2,997/mo

---

### Month 5-6: Upsell M3 - Support (+$997 or $3,997 full stack)
**Value delivered:**
- "Your support team is overwhelmed. M3 triages and drafts responses."
- Support intelligence identifies churn signals
- Feeds customer pain points to M1 for ICP refinement

**Outcome:** Full stack at $3,997/mo

---

### 12-Month LTV
**Conservative path:**
- Months 1-3: M1 only = $4,491
- Months 4-6: M1+M2 = $8,991
- Months 7-12: M1+M2+M3 = $23,982
- **Total Year 1 Revenue: $37,464 per customer**

**Aggressive path (land full stack immediately):**
- 12 months × $3,997/mo = **$47,964 per customer**

---

## Target Customer Profile

### Ideal Customer:
**Company characteristics:**
- B2B service business (SaaS, agencies, consulting)
- $2-10M annual revenue
- 10-100 employees
- Existing client base (50+ customers)
- Active outbound sales motion
- Messy data across multiple tools

**Pain points:**
- Paying $200-500K/year in sales/support salaries
- Data in Apollo, Sales Nav, HubSpot (not connected)
- Manual lead scoring (gut feel, not data)
- Generic outreach (low response rates)
- Support team overwhelmed with repetitive tickets

**Budget authority:**
- $3-5K/month budget for tools/automation
- Can justify ROI with 1-2 closed deals

**Decision maker:**
- VP Sales, Head of Ops, or Founder/CEO

---

## Sales Strategy

### Positioning
**Not:**
- "AI automation tool"
- "LinkedIn bot"
- "CRM replacement"

**Instead:**
- "Intelligence layer that learns YOUR ideal customer"
- "Replace 3-5 salaries with one subscription"
- "Google Cloud-native, enterprise-grade security"

### Demo Flow
1. **Discovery:** How many closed deals do you have? Which data sources?
2. **Custom analysis:** We analyze 10-20 of their closed deals (free)
3. **ICP insights:** Show them patterns they didn't know existed
4. **Pilot proposal:** M1 for 90 days ($1,497/mo × 3 = $4,491)
5. **Success metrics:** Track ICP accuracy, lead quality, response rates
6. **Upsell:** After 90 days, offer M2 bundle

### Pricing Conversation
**Objection:** "$3,997/mo is expensive"

**Response:**
- "What do your 3 SDRs cost per month?"
- "$18,750/mo in salary alone"
- "IAE is $3,997/mo and never takes vacation"
- "That's 79% cost reduction with 10x better targeting"

---

## Technical Implementation

### Phase 1: M1 Build (Weeks 1-6)
**Week 1-2: Intelligence Core**
- Vertex AI integration (Anthropic Claude)
- ICP model training algorithm
- Lead scoring engine

**Week 3-4: Data Connectors**
- Apollo.io agent
- Sales Navigator agent
- HubSpot agent

**Week 5-6: Testing & Deployment**
- Cloud Run deployment
- Firestore setup
- Customer dashboard (React)

### Phase 2: M2 Build (Weeks 7-12)
**Week 7-8: Execution Agents**
- LinkedIn outreach automation
- Email campaign orchestration
- Rate limiting & queue management

**Week 9-10: Meeting Intelligence**
- Google Meet/Zoom integration
- Transcription pipeline (Cloud Speech-to-Text)
- Action item extraction

**Week 11-12: Feedback Loop**
- Pub/Sub event bus
- M2 → M1 feedback pipeline
- Model retraining automation

### Phase 3: M3 Build (Weeks 13-18)
**Week 13-14: Support Triage**
- Zendesk/Intercom connectors
- Urgency classification
- Response drafting

**Week 15-16: Intelligence Integration**
- Support signals → M1 ICP refinement
- Churn prediction
- Customer health scoring

**Week 17-18: Production Launch**
- Full stack testing
- Customer onboarding automation
- Documentation & training

---

## Success Metrics

### Product Metrics
**M1 (Intelligence):**
- ICP model accuracy: 80%+ precision (A-tier leads convert at 40%+)
- Scoring throughput: 1000 leads/second
- Data source uptime: 99.9%

**M2 (Execution):**
- Message delivery rate: 95%+
- Response rate improvement: 5-10% (vs 0.5% baseline)
- Meeting booking rate: 3-5% of messages sent

**M3 (Support):**
- First response time: <4 minutes (vs 4 hours manual)
- Triage accuracy: 85%+
- Response draft acceptance: 70%+ (approved without edits)

### Business Metrics
**Revenue:**
- Year 1: 10 customers @ $3,997/mo = $479,640 ARR
- Year 2: 30 customers @ $3,997/mo = $1,439,280 ARR
- Year 3: 100 customers @ $3,997/mo = $4,796,400 ARR

**Churn:**
- Target: <5% monthly churn
- Strategy: Continuous model improvement = sticky product

**Expansion Revenue:**
- 40% of M1 customers upgrade to M1+M2 within 6 months
- 30% of M1+M2 customers upgrade to full stack within 12 months

---

## Competitive Advantages

### vs. Generic AI Tools
- Not generic: Learns from YOUR closed deals
- Not one-size-fits-all: Custom ICP per client

### vs. Human Teams
- 24/7 operation, no vacations
- Scales infinitely (1000 leads or 100,000 leads)
- Never forgets patterns
- 89% cost reduction

### vs. Other Automation Tools
- Intelligence before automation (others spam first, think later)
- Multi-level agency (not just one bot)
- Google Cloud enterprise security
- Continuous learning (gets smarter over time)

---

## Risk Mitigation

### Technical Risks
**Risk:** Vertex AI API rate limits or downtime
**Mitigation:** Queue-based processing, exponential backoff, multi-region deployment

**Risk:** Data connector breaks (LinkedIn changes API)
**Mitigation:** Weekly monitoring, automated testing, fallback to manual upload

**Risk:** ICP model accuracy <70%
**Mitigation:** Require minimum 50 closed deals, offer discount if less, 90-day training period

### Business Risks
**Risk:** Customer doesn't see ROI in 90 days
**Mitigation:** Set clear expectations (model needs 90 days), weekly check-ins, pivot strategy based on data

**Risk:** Pricing objections ("too expensive")
**Mitigation:** ROI calculator (salary replacement), pilot program (M1 only for 90 days), payment plans

**Risk:** Execution quality (M2 sends bad messages)
**Mitigation:** Human-in-the-loop approval for first 100 messages, A/B testing, client feedback integration

---

## Go-to-Market Timeline

### Q1 2025: MVP Launch
- Build M1 (Intelligence Core)
- Sign 3 pilot customers ($1,497/mo each = $4,491 MRR)
- 90-day optimization period
- Gather testimonials & case studies

### Q2 2025: M2 Launch
- Build M2 (Execution Layer)
- Upsell pilots to M1+M2 bundle ($2,997/mo each = $8,991 MRR)
- Sign 5 new customers (M1+M2 bundle)
- Revenue: $23,976 MRR ($287,712 ARR)

### Q3 2025: M3 Launch + Scale
- Build M3 (Support Intelligence)
- Upsell to full stack ($3,997/mo)
- Sign 10 new customers
- Revenue: $59,955 MRR ($719,460 ARR)

### Q4 2025: Scale + Productize
- Self-service onboarding automation
- White-label partnerships (agencies reselling IAE)
- Revenue: $100K+ MRR ($1.2M+ ARR)

---

## Next Steps (Right Now)

### Immediate (This Week):
1. Finalize pricing on website
2. Update agents page (M1, M2, M3 with dependencies)
3. Create demo plan (Firebase live demo or video)

### Short-term (Next 30 Days):
1. Build IAE M1 MVP (Intelligence Core)
2. Find 3 pilot customers (B2B SaaS, 50+ closed deals)
3. Run 90-day optimization period

### Medium-term (Next 90 Days):
1. Launch M1 publicly
2. Build M2 (Execution Layer)
3. Upsell pilots to M1+M2
4. Create case studies

### Long-term (6-12 Months):
1. Build M3 (Support Intelligence)
2. Scale to 30+ customers
3. Build self-service onboarding
4. Explore white-label partnerships

---

## Conclusion

**IAE (Intent Agent Engine) is not just another AI tool.**

It's a modular intelligence platform that:
- Learns from each client's unique data
- Replaces expensive human teams
- Gets smarter over time
- Delivers 10x ROI vs manual processes

**Revenue potential:** $1M+ ARR by end of Year 1 with 30 customers.

**Key insight:** Start with intelligence (M1), prove value, then upsell execution (M2) and support (M3). The combo meal pricing incentivizes full stack adoption while allowing clients to start small.

**Competitive moat:** Google Cloud-native, Vertex AI Anthropic, continuous learning from client data = not easily replicable.

---

**Document Filing Reference:**
Category: PP (Product & Planning)
Type: PROD (Product Definition)
Last Updated: 2025-10-27
