# A2A Framework: Implementation Roadmap
**6-Week Build Plan**

**Date:** 2025-10-27
**Status:** Project Planning
**Timeline:** 6 weeks from kickoff to pilot
**Author:** Claude (intent solutions io)

---

## Project Overview

**Objective:** Build and deploy the A2A (Agent-to-Agent) framework for ONE pilot customer.

**Deliverables:**
1. Intelligence Agent (containerized)
2. Automation Agent (containerized)
3. A2A communication layer
4. Docker Compose deployment
5. Client onboarding process
6. 90-day optimization period

**Success Criteria:**
- Intelligence Agent scores 1000+ leads in <10 seconds
- Automation Agent sends 100+ personalized messages/day
- A2A communication has <100ms latency
- Client achieves 5-10% response rate (vs 0.5% baseline)

---

## Week 1: Foundation & Data Pipeline

### Goals
- Set up development environment
- Build data ingestion from Apollo.io
- Create database schema
- Implement data normalization

### Tasks

**Day 1-2: Project Setup**
- [ ] Initialize Git repository
- [ ] Set up Python 3.12 virtual environment
- [ ] Install dependencies (FastAPI, SQLAlchemy, Pydantic)
- [ ] Set up PostgreSQL local instance
- [ ] Create project structure:
  ```
  a2a-framework/
  ├── intelligence-agent/
  │   ├── src/
  │   ├── tests/
  │   ├── Dockerfile
  │   └── requirements.txt
  ├── automation-agent/
  │   ├── src/
  │   ├── tests/
  │   ├── Dockerfile
  │   └── requirements.txt
  └── docker-compose.yml
  ```

**Day 3-4: Database Schema**
- [ ] Implement `closed_deals` table
- [ ] Implement `icp_models` table
- [ ] Implement `scored_leads` table
- [ ] Implement `automation_feedback` table
- [ ] Create database migrations (Alembic)
- [ ] Write database models (SQLAlchemy ORM)

**Day 5: Data Ingestion**
- [ ] Implement Apollo.io API connector
- [ ] Implement data normalization functions:
  - `normalize_company_size()`
  - `normalize_revenue()`
  - `normalize_industry()`
- [ ] Write tests for normalization
- [ ] Create sample dataset (100 fake leads for testing)

**Weekend: Buffer for catch-up**

### Deliverables
✅ Working database schema
✅ Apollo API integration
✅ Data normalization pipeline
✅ 100 sample leads ingested

---

## Week 2: Intelligence Agent Core

### Goals
- Implement ICP model training
- Build lead scoring algorithm
- Create FastAPI endpoints
- Test with sample data

### Tasks

**Day 6-7: ICP Model Training**
- [ ] Implement `build_icp_from_closed_deals()`
- [ ] Implement pattern extraction:
  - Vertical patterns
  - Company size patterns
  - Tech stack patterns
  - Funding stage patterns
- [ ] Implement weight calculation
- [ ] Write tests for ICP training

**Day 8-9: Lead Scoring**
- [ ] Implement `ICPScorer` class
- [ ] Implement scoring functions:
  - `_score_vertical()`
  - `_score_company_size()`
  - `_score_tech_stack()`
  - `_score_funding()`
  - `_score_growth()`
  - `_score_timing()`
- [ ] Implement confidence calculation
- [ ] Implement expected outcomes prediction
- [ ] Write comprehensive tests

**Day 10: FastAPI Server**
- [ ] Create FastAPI app
- [ ] Implement endpoints:
  - `POST /api/v1/ingest-data`
  - `POST /api/v1/train-icp`
  - `POST /api/v1/score-leads`
  - `POST /api/v1/feedback`
  - `GET /health`
- [ ] Add request validation (Pydantic)
- [ ] Add error handling
- [ ] Add logging

**Weekend: Integration Testing**
- [ ] Test full pipeline: ingest → train → score
- [ ] Verify accuracy on sample dataset
- [ ] Load testing (1000 leads)

### Deliverables
✅ Trained ICP model
✅ Working lead scorer
✅ FastAPI server running
✅ Can score 1000 leads in <10 seconds

---

## Week 3: Automation Agent Core

### Goals
- Build outreach campaign manager
- Integrate with LinkedIn API
- Create n8n workflows
- Test message sending

### Tasks

**Day 11-12: Database Schema**
- [ ] Implement `campaigns` table
- [ ] Implement `campaign_leads` table
- [ ] Implement `messages` table
- [ ] Create ORM models

**Day 13-14: Campaign Manager**
- [ ] Implement campaign creation
- [ ] Implement lead queueing
- [ ] Implement rate limiting (50 messages/day)
- [ ] Implement message templating
- [ ] Implement personalization engine

**Day 15: LinkedIn Integration**
- [ ] Set up LinkedIn API credentials
- [ ] Implement connection request sender
- [ ] Implement message sender
- [ ] Implement response monitor
- [ ] Add error handling (account limits, blocks)

**Day 16: FastAPI Server**
- [ ] Create FastAPI app
- [ ] Implement endpoints:
  - `POST /api/v1/execute-outreach`
  - `GET /api/v1/campaign-status/{id}`
  - `POST /api/v1/log-response`
  - `GET /health`
- [ ] Add authentication (JWT)

**Day 17: n8n Workflows**
- [ ] Install n8n
- [ ] Create "LinkedIn Outreach" workflow
- [ ] Create "Response Monitor" workflow
- [ ] Test with dummy data

**Weekend: Testing**
- [ ] Send 10 test messages
- [ ] Verify personalization works
- [ ] Test rate limiting

### Deliverables
✅ Working Automation Agent
✅ Can send LinkedIn messages
✅ n8n workflows operational
✅ Rate limiting enforced

---

## Week 4: A2A Communication & Integration

### Goals
- Implement JSON-RPC communication
- Connect Intelligence and Automation agents
- Implement feedback loop
- End-to-end testing

### Tasks

**Day 18-19: A2A Protocol**
- [ ] Implement JSON-RPC client/server
- [ ] Add JWT authentication
- [ ] Implement error handling
- [ ] Write communication tests

**Day 20-21: Integration**
- [ ] Intelligence Agent sends scored leads to Automation Agent
- [ ] Automation Agent receives and queues leads
- [ ] Automation Agent sends feedback to Intelligence Agent
- [ ] Intelligence Agent updates ICP model
- [ ] Test full loop: score → send → respond → learn

**Day 22: Docker Containerization**
- [ ] Write Dockerfile for Intelligence Agent
- [ ] Write Dockerfile for Automation Agent
- [ ] Create docker-compose.yml
- [ ] Add health checks
- [ ] Test containers locally

**Day 23-24: End-to-End Testing**
- [ ] Ingest 1000 real leads from Apollo
- [ ] Train ICP model on client's closed deals
- [ ] Score all 1000 leads
- [ ] Queue top 100 A-tier leads
- [ ] Send 10 test messages
- [ ] Log responses
- [ ] Verify feedback updates model

**Weekend: Bug Fixes & Polish**

### Deliverables
✅ Two containers talking via A2A
✅ Full feedback loop working
✅ Docker Compose deployment ready
✅ End-to-end tested with real data

---

## Week 5: Deployment & Client Onboarding

### Goals
- Deploy to Hetzner VPS
- Set up monitoring
- Onboard first pilot customer
- Train their ICP model

### Tasks

**Day 25: VPS Setup**
- [ ] Provision Hetzner VPS (4 vCPU, 16GB RAM)
- [ ] Install Ubuntu 22.04
- [ ] Install Docker Engine
- [ ] Set up Nginx reverse proxy
- [ ] Configure SSL certificates (Let's Encrypt)
- [ ] Set up firewall rules

**Day 26: Deployment**
- [ ] Deploy Intelligence Agent container
- [ ] Deploy Automation Agent container
- [ ] Deploy PostgreSQL containers
- [ ] Set up environment variables
- [ ] Test health endpoints

**Day 27: Monitoring**
- [ ] Install Prometheus
- [ ] Install Grafana
- [ ] Create dashboards:
  - ICP model accuracy over time
  - Lead scoring throughput
  - Message send rate
  - Response rate
  - Error rates
- [ ] Set up alerts (Slack/email)

**Day 28-29: Client Onboarding**
- [ ] Client kickoff call
- [ ] Collect API keys:
  - Apollo.io
  - LinkedIn credentials
  - HubSpot (for closed deals)
- [ ] Export client's closed deals from CRM
- [ ] Clean and normalize data
- [ ] Load into database

**Day 30: ICP Model Training**
- [ ] Train ICP model on client's 50+ closed deals
- [ ] Review patterns with client:
  - "Your best customers are Series A fintech"
  - "Healthcare deals take 6 months (avoid)"
- [ ] Adjust weights based on client feedback
- [ ] Finalize ICP model version 1.0

**Weekend: Final Testing**
- [ ] Score 5000 real leads from Apollo
- [ ] Present top 500 A-tier leads to client
- [ ] Client reviews and approves
- [ ] Queue first campaign (100 leads)

### Deliverables
✅ Production deployment on VPS
✅ Monitoring dashboards live
✅ Client ICP model trained
✅ First campaign ready to launch

---

## Week 6: Launch & Optimization

### Goals
- Launch first outreach campaign
- Monitor performance daily
- Collect feedback
- Iterate on ICP model

### Tasks

**Day 31: Campaign Launch**
- [ ] Send first 20 messages (test batch)
- [ ] Monitor for errors
- [ ] Check LinkedIn account status
- [ ] Log all responses

**Day 32-35: Daily Monitoring**
Each day:
- [ ] Review overnight responses
- [ ] Log meeting bookings
- [ ] Update ICP model with feedback
- [ ] Send next batch of messages (50/day)
- [ ] Client check-in call (15 min)

**Day 36: Week 1 Retrospective**
- [ ] Calculate metrics:
  - Messages sent: 200
  - Response rate: 8% (target: 5-10%)
  - Meetings booked: 5 (target: 3-5)
- [ ] Review with client
- [ ] Identify improvements:
  - Which messaging worked?
  - Which industries responded best?
  - Any negative feedback?
- [ ] Update ICP model (version 1.1)

**Day 37-42: Continue Optimization**
- [ ] Send 50 messages/day
- [ ] Daily monitoring
- [ ] Weekly retrospectives
- [ ] Continuous model updates

**End of Week 6:**
- [ ] Complete 400+ messages sent
- [ ] 30+ responses received (8% rate)
- [ ] 10-15 meetings booked
- [ ] ICP model accuracy improving (v1.3+)

### Deliverables
✅ 400+ messages sent
✅ 8%+ response rate achieved
✅ 10+ meetings booked
✅ ICP model v1.3 (continuously improving)
✅ Client happy and renewing

---

## 90-Day Optimization Period (Weeks 7-18)

After initial 6-week build and launch, enter 90-day optimization:

**Weekly Cadence:**
- **Monday:** Review last week's metrics
- **Tuesday-Thursday:** Send 50 messages/day (150/week)
- **Friday:** Update ICP model with week's feedback
- **Weekly Retrospective:** 30-min client call

**Monthly Milestones:**

**Month 1 (Weeks 7-10):**
- Send 600 total messages
- Achieve 7-10% response rate
- Book 20+ meetings
- ICP model v2.0 (retrained on 200+ new data points)

**Month 2 (Weeks 11-14):**
- Send 1200 total messages (cumulative)
- Maintain 8-10% response rate
- Book 40+ total meetings
- ICP model v3.0 (accuracy >85%)

**Month 3 (Weeks 15-18):**
- Send 1800 total messages (cumulative)
- Achieve 10%+ response rate
- Book 60+ total meetings
- 5+ closed deals from AI-sourced leads
- ICP model v4.0 (fully optimized)

**End of 90 Days:**
- ✅ 1800+ messages sent
- ✅ 180+ responses (10% rate)
- ✅ 60+ meetings booked
- ✅ 5+ deals closed ($250K+ in pipeline)
- ✅ ROI: 5-10x vs manual outbound
- ✅ Client renews for Year 2

---

## Resource Requirements

### Development Team
- **1 Full-Stack Developer** (Python, FastAPI, React)
  - 40 hours/week
  - Weeks 1-6: Build
  - Weeks 7-18: Optimization & support

### Infrastructure
- **Hetzner VPS:** $30/mo
- **Domain & SSL:** $20/year
- **Monitoring (Grafana Cloud):** $50/mo
- **API costs:**
  - Apollo.io: $99/mo
  - LinkedIn API: $0 (use web scraping as fallback)
  - HubSpot: $0 (client's account)

**Total Infrastructure Cost:** ~$150/mo

### Client Requirements
- **50+ closed deals** in CRM (for ICP training)
- **Apollo.io account** (or similar data provider)
- **LinkedIn account** with Sales Navigator
- **Time commitment:**
  - Week 5: 2 hours (onboarding)
  - Weeks 6-18: 30 min/week (retrospectives)

---

## Risk Mitigation

### Technical Risks

**Risk:** LinkedIn blocks account
**Mitigation:** Start with 20 messages/day, gradually increase. Use residential proxy. Rotate accounts if needed.

**Risk:** ICP model accuracy <70%
**Mitigation:** Need minimum 50 closed deals for training. If client has <50, start with generic model and improve over 90 days.

**Risk:** API rate limits (Apollo, LinkedIn)
**Mitigation:** Implement exponential backoff. Cache frequently accessed data. Use multiple data sources.

**Risk:** Container crashes in production
**Mitigation:** Health checks + auto-restart. Prometheus alerts. Daily monitoring.

### Business Risks

**Risk:** Client doesn't see ROI in 90 days
**Mitigation:** Set clear expectations upfront. Weekly check-ins. Pivot messaging/targeting based on early data.

**Risk:** Client's closed deals are too sparse
**Mitigation:** Pre-qualify clients during sales call. Require minimum 50 deals. Offer discount for early adopters with less data.

**Risk:** Response rate <5% (below target)
**Mitigation:** A/B test messaging. Review rejected leads with client. Expand data sources. Refine ICP model.

---

## Success Metrics Dashboard

Track these KPIs weekly:

### Intelligence Agent
- **ICP Model Accuracy:** Target 80%+ (compare predicted vs actual close rate)
- **Scoring Throughput:** 1000 leads/second
- **A-tier Precision:** 70%+ of A-tier leads respond

### Automation Agent
- **Messages Sent:** 50/day (250/week)
- **Send Success Rate:** 95%+ (no errors)
- **Response Rate:** 8-10%
- **Meeting Booking Rate:** 3-5% of messages

### Business Outcomes
- **Meetings Booked:** 15/month (180/year)
- **Deals Closed:** 1-2/month from AI-sourced leads
- **Pipeline Generated:** $50K+/month
- **Client LTV:** $6K+ ($497/mo × 12 months)
- **ROI:** 10x ($6K revenue vs $600 cost)

---

## Post-Launch: Scaling to Multiple Clients

After successful pilot (Month 4+):

### Productize the Onboarding
- [ ] Create self-service onboarding wizard
- [ ] Automate CRM data export
- [ ] One-click ICP model training
- [ ] Client dashboard for metrics

### Multi-Tenancy
- [ ] Separate PostgreSQL schemas per client
- [ ] Isolated n8n instances per client
- [ ] Client-specific API keys
- [ ] Usage-based billing

### Expand Data Sources
- [ ] Sales Navigator scraper
- [ ] Clearbit enrichment
- [ ] G2/Capterra intent data
- [ ] ZoomInfo integration

### Advanced Features
- [ ] A/B test messaging automatically
- [ ] Multi-channel (email + LinkedIn)
- [ ] Meeting booking integration (Calendly)
- [ ] CRM auto-sync (HubSpot, Salesforce)

---

## Conclusion

**6 weeks from kickoff to first campaign.**
**90 days to fully optimized, ROI-positive system.**

This roadmap is aggressive but achievable for a focused solo developer or small team.

**Key to success:**
1. Start simple (1 client, 1 data source)
2. Ship fast (working MVP in 6 weeks)
3. Iterate based on real data (not assumptions)
4. Measure everything (metrics dashboard from day 1)

**Next step:** Find pilot customer with:
- 50+ closed deals in CRM
- Active outbound sales motion
- $5-10K budget for 6-month pilot
- Willingness to give weekly feedback

---

**Document Filing Reference:**
Category: PM (Project Management)
Type: PLAN (Project Plan)
Last Updated: 2025-10-27
