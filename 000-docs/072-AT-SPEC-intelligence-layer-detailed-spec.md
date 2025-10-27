# Intelligence Layer: Detailed Specification
**How the Intelligence Agent Actually Works**

**Date:** 2025-10-27
**Status:** Design Specification
**Author:** Claude (intent solutions io)

---

## Overview

The Intelligence Agent is the "brain" of the A2A framework. It doesn't send messages or book meetings—it **learns patterns from your data** and tells the Automation Agent who to contact.

**Core Responsibility:** Turn third-party data into actionable intelligence.

---

## Data Flow Through Intelligence Agent

```
Raw Data In → Feature Extraction → Pattern Learning →
ICP Scoring → Strategic Recommendations Out
```

### Example Journey of a Lead

**Input:** Raw Apollo data
```json
{
  "company_name": "Acme Fintech Corp",
  "company_size": "75 employees",
  "revenue": "$8M ARR",
  "industry": "Financial Services",
  "tech_stack": ["Salesforce", "AWS", "React"],
  "funding": "Series A ($12M raised 6 months ago)",
  "hiring": "5 open sales positions"
}
```

**After Feature Extraction:**
```python
{
  "company_size_bucket": "50-200",  # Normalized
  "revenue_bucket": "$5M-$10M",
  "industry_clean": "fintech",
  "has_salesforce": True,
  "has_aws": True,
  "funding_stage": "series_a",
  "funding_recency_months": 6,
  "hiring_velocity_sales": 5,
  "growth_signal_score": 0.85  # Calculated metric
}
```

**After ICP Scoring:**
```python
{
  "icp_score": 87,
  "priority": "A",
  "confidence": 0.92,
  "contributing_factors": [
    {"factor": "vertical_match", "weight": 30, "score": 30},
    {"factor": "company_size", "weight": 20, "score": 18},
    {"factor": "tech_stack", "weight": 15, "score": 15},
    {"factor": "funding_stage", "weight": 15, "score": 14},
    {"factor": "growth_signals", "weight": 20, "score": 10}
  ]
}
```

**Output:** Strategic recommendations
```json
{
  "lead_id": "acme_fintech_001",
  "icp_score": 87,
  "priority": "A",
  "recommended_action": "immediate_outreach",
  "messaging": {
    "hook": "Congrats on the Series A funding",
    "pain_point": "Scaling from 3 to 8 sales reps quickly",
    "solution_fit": "LinkedIn automation helped [similar fintech] onboard SDRs 3x faster",
    "social_proof": "Mention: TechCrunch Fintech 50 winner [CompanyX] uses our platform"
  },
  "timing": {
    "best_send_time": "Tuesday 10am EST",
    "avoid_send_time": "Friday afternoon"
  },
  "expected_outcomes": {
    "response_probability": 0.42,
    "meeting_booking_probability": 0.18,
    "expected_deal_size": 50000,
    "expected_sales_cycle_days": 45
  }
}
```

---

## Component 1: Data Ingestion Engine

### Purpose
Pull data from multiple third-party sources and normalize it into a consistent format.

### Supported Data Sources

**1. Apollo.io**
```python
class ApolloConnector:
    def fetch_companies(self, filters: dict) -> List[Company]:
        # API call to Apollo
        response = requests.post(
            "https://api.apollo.io/v1/mixed_companies/search",
            headers={"X-Api-Key": APOLLO_API_KEY},
            json={
                "page": 1,
                "per_page": 100,
                "organization_num_employees_ranges": ["50-200"],
                "revenue_range": ["$5M-$10M"]
            }
        )
        return self._parse_apollo_response(response.json())
```

**What we extract:**
- Company name, domain, LinkedIn URL
- Employee count (exact or range)
- Revenue (exact or range)
- Industry/vertical
- Tech stack (from BuiltWith integration)
- Funding stage and amount
- Headquarters location

**2. LinkedIn Sales Navigator**
```python
class SalesNavigatorConnector:
    def fetch_leads(self, search_url: str) -> List[Lead]:
        # Selenium scraping (Sales Nav doesn't have public API)
        driver = webdriver.Chrome()
        driver.get(search_url)
        # Extract: name, title, company, seniority, job change date
        return self._parse_sales_nav_results(driver)
```

**What we extract:**
- Contact name, title, seniority level
- Company (current)
- Job change date (if recent)
- Shared connections (1st, 2nd, 3rd degree)
- Recent activity (posted, commented, job change)

**3. HubSpot CRM**
```python
class HubSpotConnector:
    def fetch_closed_deals(self, lookback_months: int) -> List[Deal]:
        # HubSpot API
        response = requests.get(
            "https://api.hubapi.com/crm/v3/objects/deals",
            headers={"Authorization": f"Bearer {HUBSPOT_API_KEY}"},
            params={
                "properties": "dealstage,amount,closedate,company",
                "associations": "company"
            }
        )
        # Filter for closed-won deals only
        deals = response.json()
        return [d for d in deals if d['dealstage'] == 'closedwon']
```

**What we extract:**
- Deal amount (ACV)
- Close date
- Sales cycle length (from create to close)
- Associated company details
- Win/loss reason (if available)

**4. Clearbit Enrichment**
```python
class ClearbitConnector:
    def enrich_company(self, domain: str) -> dict:
        response = requests.get(
            f"https://company.clearbit.com/v2/companies/find?domain={domain}",
            headers={"Authorization": f"Bearer {CLEARBIT_API_KEY}"}
        )
        return response.json()
```

**What we extract:**
- Tech stack (confirmed)
- Employee growth rate
- Traffic/engagement metrics
- Social media presence
- Recent news/funding announcements

### Data Normalization

**Problem:** Each source has different formats
```python
# Apollo says: "51-200"
# Sales Navigator says: "51-200 employees"
# HubSpot says: 75
```

**Solution:** Normalize to buckets
```python
def normalize_company_size(raw_value: Any) -> str:
    """
    Convert any company size representation to standard bucket.
    """
    if isinstance(raw_value, int):
        # Exact employee count
        if raw_value < 10: return "1-10"
        elif raw_value < 50: return "11-50"
        elif raw_value < 200: return "50-200"
        elif raw_value < 500: return "200-500"
        else: return "500+"

    elif isinstance(raw_value, str):
        # Range like "51-200"
        # Extract numbers, find midpoint, bucket it
        numbers = re.findall(r'\d+', raw_value)
        if numbers:
            midpoint = sum(map(int, numbers)) / len(numbers)
            return normalize_company_size(int(midpoint))

    return "unknown"
```

---

## Component 2: Feature Engineering

### Purpose
Transform raw data into meaningful signals that predict conversion.

### Calculated Features

**1. Growth Signals**
```python
def calculate_growth_signal(company: dict) -> float:
    """
    Combines multiple growth indicators into single score (0-1).
    """
    score = 0.0

    # Recent funding
    if company.get('funding_recency_months', 99) < 12:
        score += 0.3

    # Hiring velocity
    hiring_rate = company.get('open_positions', 0) / company.get('employees', 1)
    if hiring_rate > 0.05:  # Growing headcount by 5%+
        score += 0.3

    # Revenue growth (if available)
    if company.get('yoy_revenue_growth', 0) > 0.2:  # 20%+ YoY growth
        score += 0.4

    return min(score, 1.0)
```

**2. Tech Stack Compatibility**
```python
def calculate_tech_compatibility(lead_tech_stack: List[str],
                                  ideal_tech_stack: List[str]) -> float:
    """
    How well does their tech stack match our ideal customers?
    """
    if not ideal_tech_stack:
        return 0.5  # Neutral if we don't have data

    matches = set(lead_tech_stack) & set(ideal_tech_stack)
    total = set(ideal_tech_stack)

    return len(matches) / len(total)
```

**3. Timing Score**
```python
def calculate_timing_score(contact: dict) -> float:
    """
    Is this the right TIME to reach out?
    """
    score = 0.5  # Base score

    # Recent job change (first 90 days)
    job_change_days = contact.get('days_since_job_change', 999)
    if job_change_days < 90:
        score += 0.3  # New in role, open to new tools

    # Recent funding announcement
    funding_days = contact.get('days_since_funding', 999)
    if funding_days < 180:
        score += 0.2  # Fresh capital, spending mode

    return min(score, 1.0)
```

**4. Engagement Score (from Sales Navigator)**
```python
def calculate_engagement_score(contact: dict) -> float:
    """
    How active is this person on LinkedIn?
    """
    score = 0.0

    # Recent posts (last 30 days)
    recent_posts = contact.get('posts_last_30_days', 0)
    if recent_posts > 5:
        score += 0.3

    # Shared connections
    shared_connections = contact.get('shared_connections', 0)
    if shared_connections >= 10:
        score += 0.3
    elif shared_connections >= 5:
        score += 0.15

    # Open to networking (has "Open to" badge)
    if contact.get('open_to_connect', False):
        score += 0.4

    return min(score, 1.0)
```

---

## Component 3: Pattern Learning (ICP Model)

### How the Model Learns

**Step 1: Analyze Historical Wins**
```python
def build_icp_from_closed_deals(deals: List[Deal]) -> ICPModel:
    """
    Extract patterns from past wins.
    """
    # Group deals by characteristics
    patterns = defaultdict(list)

    for deal in deals:
        # Extract key characteristics
        vertical = deal.company.industry
        size = deal.company.size_bucket
        tech_stack = deal.company.tech_stack
        funding = deal.company.funding_stage

        # Store outcomes
        patterns['vertical'][vertical].append({
            'deal_size': deal.amount,
            'sales_cycle': deal.sales_cycle_days,
            'close_rate': 1.0  # It closed
        })

        # Same for other dimensions
        patterns['company_size'][size].append(...)
        patterns['tech_stack'][tech_stack].append(...)

    # Calculate conversion rates by pattern
    icp_model = {}
    for vertical, deals in patterns['vertical'].items():
        icp_model[vertical] = {
            'close_rate': len(deals) / total_deals,
            'avg_deal_size': np.mean([d['deal_size'] for d in deals]),
            'avg_sales_cycle': np.mean([d['sales_cycle'] for d in deals])
        }

    return ICPModel(patterns=icp_model)
```

**Example Output:**
```python
{
  "vertical": {
    "fintech": {
      "close_rate": 0.42,  # 42% of fintech leads closed
      "avg_deal_size": 50000,
      "avg_sales_cycle": 45
    },
    "healthcare": {
      "close_rate": 0.12,  # Only 12% closed (bad fit)
      "avg_deal_size": 80000,
      "avg_sales_cycle": 180  # Long sales cycle
    }
  },
  "company_size": {
    "50-200": {
      "close_rate": 0.38,
      "avg_deal_size": 45000,
      "avg_sales_cycle": 52
    },
    "500+": {
      "close_rate": 0.15,  # Enterprise is hard
      "avg_deal_size": 150000,
      "avg_sales_cycle": 240
    }
  }
}
```

**Insight:** This client should focus on Series A fintech companies with 50-200 employees. NOT enterprise healthcare.

### Step 2: Calculate ICP Weights

```python
def calculate_icp_weights(patterns: dict) -> dict:
    """
    Determine which factors matter most.
    """
    # Use correlation analysis
    correlations = {}

    # Vertical has highest close rate variance (0.42 vs 0.12)
    correlations['vertical'] = calculate_variance(patterns['vertical']['close_rate'])

    # Company size also varies significantly
    correlations['company_size'] = calculate_variance(patterns['company_size']['close_rate'])

    # Convert correlations to weights (sum to 100)
    total_correlation = sum(correlations.values())
    weights = {
        factor: (corr / total_correlation) * 100
        for factor, corr in correlations.items()
    }

    return weights
```

**Example Output:**
```python
{
  "vertical": 30,  # Vertical is the #1 predictor
  "company_size": 20,
  "tech_stack": 15,
  "funding_stage": 15,
  "growth_signals": 10,
  "timing": 10
}
```

---

## Component 4: Lead Scoring Engine

### Scoring Algorithm

```python
def score_lead(lead: dict, icp_model: ICPModel) -> ScoredLead:
    """
    Calculate ICP score (0-100) for a single lead.
    """
    score = 0
    factors = []

    # Factor 1: Vertical match (30 points max)
    vertical = lead.get('industry_clean')
    if vertical in icp_model.patterns['vertical']:
        vertical_score = icp_model.patterns['vertical'][vertical]['close_rate'] * 30
        score += vertical_score
        factors.append({
            'factor': 'vertical_match',
            'weight': 30,
            'score': vertical_score,
            'reasoning': f"Vertical '{vertical}' has {vertical_score/30:.0%} close rate"
        })

    # Factor 2: Company size (20 points max)
    size = lead.get('company_size_bucket')
    if size in icp_model.patterns['company_size']:
        size_score = icp_model.patterns['company_size'][size]['close_rate'] * 20
        score += size_score
        factors.append({
            'factor': 'company_size',
            'weight': 20,
            'score': size_score
        })

    # Factor 3: Tech stack compatibility (15 points max)
    tech_compat = calculate_tech_compatibility(
        lead.get('tech_stack', []),
        icp_model.ideal_tech_stack
    )
    tech_score = tech_compat * 15
    score += tech_score
    factors.append({'factor': 'tech_stack', 'weight': 15, 'score': tech_score})

    # Factor 4: Funding stage (15 points max)
    funding = lead.get('funding_stage')
    if funding in icp_model.patterns['funding']:
        funding_score = icp_model.patterns['funding'][funding]['close_rate'] * 15
        score += funding_score
        factors.append({'factor': 'funding_stage', 'weight': 15, 'score': funding_score})

    # Factor 5: Growth signals (10 points max)
    growth_score = calculate_growth_signal(lead) * 10
    score += growth_score
    factors.append({'factor': 'growth_signals', 'weight': 10, 'score': growth_score})

    # Factor 6: Timing (10 points max)
    timing_score = calculate_timing_score(lead.get('contact', {})) * 10
    score += timing_score
    factors.append({'factor': 'timing', 'weight': 10, 'score': timing_score})

    # Assign priority tier
    if score >= 80:
        priority = "A"
    elif score >= 60:
        priority = "B"
    else:
        priority = "C"

    return ScoredLead(
        lead_id=lead['id'],
        icp_score=int(score),
        priority=priority,
        factors=factors,
        confidence=calculate_confidence(factors)
    )
```

### Priority Tiers

**A-tier (80-100 points):**
- **Action:** Immediate personalized outreach
- **Expected close rate:** 35-50%
- **Messaging:** Highly customized, reference specific company details
- **Follow-up:** 3-5 touchpoints over 2 weeks

**B-tier (60-79 points):**
- **Action:** Nurture sequence
- **Expected close rate:** 15-25%
- **Messaging:** Semi-personalized, vertical-specific
- **Follow-up:** Drip campaign over 30 days

**C-tier (<60 points):**
- **Action:** Long-term nurture or ignore
- **Expected close rate:** <10%
- **Messaging:** Generic content marketing
- **Follow-up:** Quarterly check-ins

---

## Component 5: Feedback Loop & Model Improvement

### How the Model Gets Smarter

**Feedback Collection:**
```python
def receive_feedback(lead_id: str, outcome: str, notes: str):
    """
    Automation Agent sends results back.
    """
    feedback = {
        'lead_id': lead_id,
        'outcome': outcome,  # responded, meeting_booked, closed_won, no_response
        'notes': notes,
        'timestamp': datetime.utcnow()
    }

    # Store in database
    db.session.add(AutomationFeedback(**feedback))
    db.session.commit()
```

**Model Update:**
```python
def update_icp_model_with_feedback():
    """
    Run daily to incorporate new learnings.
    """
    # Get all feedback from last 7 days
    recent_feedback = db.query(AutomationFeedback).filter(
        AutomationFeedback.timestamp > datetime.utcnow() - timedelta(days=7)
    ).all()

    # Recalculate close rates with new data
    for feedback in recent_feedback:
        lead = db.query(ScoredLead).filter_by(lead_id=feedback.lead_id).first()

        # Update pattern stats
        vertical = lead.vertical
        if feedback.outcome == 'closed_won':
            icp_model.patterns['vertical'][vertical]['wins'] += 1
        else:
            icp_model.patterns['vertical'][vertical]['losses'] += 1

        # Recalculate close rate
        total = (icp_model.patterns['vertical'][vertical]['wins'] +
                 icp_model.patterns['vertical'][vertical]['losses'])
        icp_model.patterns['vertical'][vertical]['close_rate'] = (
            icp_model.patterns['vertical'][vertical]['wins'] / total
        )

    # Save updated model
    db.session.add(ICPModel(
        version=icp_model.version + 1,
        patterns=icp_model.patterns,
        last_updated=datetime.utcnow()
    ))
    db.session.commit()
```

**Example Evolution:**

**Week 1:**
- Fintech close rate: 42% (based on 30 historical deals)
- Score fintech leads highly

**Week 4:**
- Fintech close rate: 38% (5 new losses, 2 new wins)
- Slightly reduce fintech weighting

**Week 8:**
- Discover NEW pattern: "Fintech + recent Series A + using Salesforce" = 55% close rate
- Add this as a compound factor
- Update scoring algorithm to detect this pattern

---

## Component 6: Strategic Recommendations Engine

### Messaging Generation

```python
def generate_messaging(lead: ScoredLead, icp_model: ICPModel) -> dict:
    """
    Create personalized messaging based on patterns that worked.
    """
    # Find similar past wins
    similar_wins = db.query(Deal).filter(
        Deal.vertical == lead.vertical,
        Deal.company_size == lead.company_size_bucket,
        Deal.outcome == 'closed_won'
    ).all()

    # Extract common messaging themes
    themes = extract_messaging_themes(similar_wins)

    return {
        'hook': generate_hook(lead, themes),
        'pain_point': identify_pain_point(lead, themes),
        'solution_fit': craft_solution_fit(lead, themes),
        'social_proof': find_relevant_case_study(lead, similar_wins)
    }
```

**Example Output:**
```python
{
  "hook": "Congrats on the Series A funding, Sarah!",
  "pain_point": "Saw on LinkedIn you're hiring 5 SDRs. Onboarding that many reps quickly is tough.",
  "solution_fit": "We helped [FinTech Company X] go from 3→10 SDRs in 60 days with our LinkedIn automation agent.",
  "social_proof": "Company X (also Series A fintech) now books 40 meetings/month per rep.",
  "cta": "Worth a 15-min chat to see if this fits your process?"
}
```

---

## Performance Optimization

### Caching Strategy

```python
from functools import lru_cache

@lru_cache(maxsize=100)
def get_icp_model(client_id: str) -> ICPModel:
    """
    Cache ICP models (they don't change often).
    """
    return db.query(ICPModel).filter_by(
        client_id=client_id
    ).order_by(ICPModel.version.desc()).first()
```

### Batch Processing

```python
async def score_leads_batch(leads: List[dict]) -> List[ScoredLead]:
    """
    Score 1000 leads in parallel.
    """
    import asyncio

    tasks = [score_lead_async(lead) for lead in leads]
    results = await asyncio.gather(*tasks)

    return results
```

**Performance Target:** Score 1000 leads in <5 seconds

---

## Conclusion

The Intelligence Agent is what makes A2A different from dumb automation. It:

1. ✅ **Learns from YOUR data** (not generic industry benchmarks)
2. ✅ **Extracts meaningful signals** (growth, timing, tech fit)
3. ✅ **Scores every lead** (A/B/C priority tiers)
4. ✅ **Generates custom messaging** (based on what worked before)
5. ✅ **Improves over time** (feedback loop updates the model)

**Result:** 10x better results because you're contacting the RIGHT leads with the RIGHT message at the RIGHT time.

---

**Document Filing Reference:**
Category: AT (Architecture & Technical)
Type: SPEC (Specification)
Last Updated: 2025-10-27
