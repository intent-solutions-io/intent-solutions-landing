# ICP Scoring Algorithm: Implementation Guide
**Complete Python Code for Lead Scoring**

**Date:** 2025-10-27
**Status:** Reference Implementation
**Author:** Claude (intent solutions io)

---

## Overview

This document contains the **complete, production-ready Python code** for the ICP scoring algorithm. Use this as the foundation for the Intelligence Agent.

---

## Full Implementation

### 1. Data Models (Pydantic)

```python
from pydantic import BaseModel, Field
from typing import List, Optional, Dict
from datetime import datetime
from enum import Enum

class PriorityTier(str, Enum):
    A_TIER = "A"
    B_TIER = "B"
    C_TIER = "C"

class Company(BaseModel):
    """Third-party data about a company."""
    domain: str
    name: str
    size_employees: Optional[int] = None
    size_bucket: Optional[str] = None  # "50-200"
    revenue_usd: Optional[int] = None
    revenue_bucket: Optional[str] = None  # "$5M-$10M"
    industry: str
    tech_stack: List[str] = []
    funding_stage: Optional[str] = None  # "series_a"
    funding_amount_usd: Optional[int] = None
    funding_date: Optional[datetime] = None
    open_positions: int = 0
    headquarters_location: Optional[str] = None

class Contact(BaseModel):
    """Third-party data about a contact."""
    name: str
    title: str
    seniority: Optional[str] = None  # "vp", "director", "manager"
    linkedin_url: Optional[str] = None
    email: Optional[str] = None
    job_change_date: Optional[datetime] = None
    shared_connections: int = 0
    linkedin_posts_last_30_days: int = 0
    open_to_connect: bool = False

class Lead(BaseModel):
    """Combined company + contact data."""
    lead_id: str
    company: Company
    contact: Contact
    source: str  # "apollo", "sales_navigator"
    created_at: datetime = Field(default_factory=datetime.utcnow)

class ScoringFactor(BaseModel):
    """Individual scoring factor contribution."""
    factor: str
    weight: int  # Max points for this factor
    score: float  # Actual points earned
    reasoning: str

class ScoredLead(BaseModel):
    """Lead with ICP score and recommendations."""
    lead_id: str
    icp_score: int  # 0-100
    priority: PriorityTier
    confidence: float  # 0-1
    factors: List[ScoringFactor]
    expected_close_rate: float
    expected_deal_size_usd: int
    expected_sales_cycle_days: int
    recommended_messaging: Dict[str, str]
    scored_at: datetime = Field(default_factory=datetime.utcnow)

class ICPPattern(BaseModel):
    """Statistical pattern from historical wins."""
    pattern_key: str  # "vertical:fintech"
    close_rate: float  # 0-1
    avg_deal_size_usd: int
    avg_sales_cycle_days: int
    sample_size: int  # Number of deals in this pattern

class ICPModel(BaseModel):
    """Trained ICP model."""
    client_id: str
    version: int
    patterns: Dict[str, ICPPattern]
    weights: Dict[str, int]  # Factor weights (sum to 100)
    ideal_tech_stack: List[str]
    trained_on_deals_count: int
    accuracy_score: float  # 0-1
    last_trained_at: datetime
```

---

### 2. Data Normalization Functions

```python
import re
from typing import Any

def normalize_company_size(raw_value: Any) -> str:
    """
    Normalize any company size representation to standard bucket.

    Examples:
        75 → "50-200"
        "51-200 employees" → "50-200"
        "Small (11-50)" → "11-50"
    """
    if raw_value is None:
        return "unknown"

    # If it's an exact number
    if isinstance(raw_value, int):
        if raw_value < 10: return "1-10"
        elif raw_value < 50: return "11-50"
        elif raw_value < 200: return "50-200"
        elif raw_value < 500: return "200-500"
        elif raw_value < 1000: return "500-1000"
        else: return "1000+"

    # If it's a string range
    if isinstance(raw_value, str):
        # Extract all numbers
        numbers = re.findall(r'\d+', raw_value)
        if len(numbers) >= 2:
            # Return as-is if it's already in our format
            if raw_value.strip() in ["1-10", "11-50", "50-200", "200-500", "500-1000", "1000+"]:
                return raw_value.strip()
            # Otherwise, calculate midpoint and bucket it
            midpoint = (int(numbers[0]) + int(numbers[1])) / 2
            return normalize_company_size(int(midpoint))
        elif len(numbers) == 1:
            return normalize_company_size(int(numbers[0]))

    return "unknown"


def normalize_revenue(raw_value: Any) -> str:
    """
    Normalize revenue to standard bucket.

    Examples:
        8000000 → "$5M-$10M"
        "$8M ARR" → "$5M-$10M"
        "8-12M" → "$5M-$10M"
    """
    if raw_value is None:
        return "unknown"

    # Convert to integer if possible
    if isinstance(raw_value, str):
        # Remove non-numeric characters except digits and decimal point
        cleaned = re.sub(r'[^\d.]', '', raw_value)
        try:
            # Handle M/K suffixes
            if 'M' in raw_value.upper():
                raw_value = float(cleaned) * 1_000_000
            elif 'K' in raw_value.upper():
                raw_value = float(cleaned) * 1_000
            else:
                raw_value = float(cleaned)
        except ValueError:
            return "unknown"

    # Bucket by revenue
    if isinstance(raw_value, (int, float)):
        if raw_value < 1_000_000: return "<$1M"
        elif raw_value < 5_000_000: return "$1M-$5M"
        elif raw_value < 10_000_000: return "$5M-$10M"
        elif raw_value < 50_000_000: return "$10M-$50M"
        elif raw_value < 100_000_000: return "$50M-$100M"
        else: return "$100M+"

    return "unknown"


def normalize_industry(raw_value: str) -> str:
    """
    Normalize industry to standard categories.

    Examples:
        "Financial Services" → "fintech"
        "SaaS / B2B Software" → "saas"
    """
    if not raw_value:
        return "unknown"

    # Lowercase and remove special chars
    cleaned = re.sub(r'[^\w\s]', '', raw_value.lower())

    # Mapping to standard categories
    industry_map = {
        'fintech': ['fintech', 'financial services', 'banking', 'payments'],
        'saas': ['saas', 'software', 'b2b software', 'cloud'],
        'healthcare': ['healthcare', 'healthtech', 'medical', 'pharma'],
        'ecommerce': ['ecommerce', 'retail', 'consumer'],
        'martech': ['marketing', 'advertising', 'martech'],
        'hr_tech': ['hr', 'human resources', 'recruiting', 'talent'],
        'real_estate': ['real estate', 'proptech', 'construction'],
        'logistics': ['logistics', 'shipping', 'supply chain'],
        'education': ['education', 'edtech', 'learning'],
    }

    for category, keywords in industry_map.items():
        if any(keyword in cleaned for keyword in keywords):
            return category

    return "other"
```

---

### 3. Feature Engineering Functions

```python
from datetime import datetime, timedelta
from typing import List
import numpy as np

def calculate_growth_signal(company: Company) -> float:
    """
    Calculate growth signal score (0-1).

    Factors:
    - Recent funding
    - Hiring velocity
    - Revenue growth (if available)
    """
    score = 0.0

    # Recent funding (within last 12 months)
    if company.funding_date:
        months_since_funding = (datetime.utcnow() - company.funding_date).days / 30
        if months_since_funding < 12:
            # More recent = higher score
            recency_score = max(0, 1 - (months_since_funding / 12))
            score += recency_score * 0.3

    # Hiring velocity (open positions / current employees)
    if company.size_employees and company.size_employees > 0:
        hiring_rate = company.open_positions / company.size_employees
        if hiring_rate > 0.10:  # Growing headcount by 10%+
            score += 0.4
        elif hiring_rate > 0.05:  # Growing by 5-10%
            score += 0.2

    # Default growth signal if we have funding
    if company.funding_amount_usd and company.funding_amount_usd > 0:
        score += 0.3

    return min(score, 1.0)


def calculate_tech_compatibility(
    lead_tech_stack: List[str],
    ideal_tech_stack: List[str]
) -> float:
    """
    Calculate tech stack compatibility (0-1).

    Examples:
        Lead: ["salesforce", "aws"]
        Ideal: ["salesforce", "hubspot", "aws"]
        Score: 2/3 = 0.67
    """
    if not ideal_tech_stack:
        return 0.5  # Neutral if we don't have ideal tech stack data

    lead_set = set(t.lower() for t in lead_tech_stack)
    ideal_set = set(t.lower() for t in ideal_tech_stack)

    matches = lead_set & ideal_set
    return len(matches) / len(ideal_set) if ideal_set else 0.5


def calculate_timing_score(contact: Contact) -> float:
    """
    Calculate timing score (0-1).

    Best time to reach out:
    - New in role (first 90 days)
    - Active on LinkedIn
    """
    score = 0.5  # Base score

    # Recent job change
    if contact.job_change_date:
        days_in_role = (datetime.utcnow() - contact.job_change_date).days
        if days_in_role < 90:
            # First 90 days = open to new tools
            score += 0.3
        elif days_in_role < 180:
            score += 0.15

    # LinkedIn engagement
    if contact.linkedin_posts_last_30_days > 5:
        score += 0.2  # Active on platform

    # Open to connect
    if contact.open_to_connect:
        score += 0.1

    return min(score, 1.0)


def calculate_seniority_score(contact: Contact) -> float:
    """
    Higher seniority = higher score.

    C-level, VP > Director > Manager > Individual Contributor
    """
    title_lower = contact.title.lower()

    # C-level
    if any(x in title_lower for x in ['ceo', 'cto', 'cfo', 'coo', 'chief', 'founder']):
        return 1.0

    # VP level
    if 'vp' in title_lower or 'vice president' in title_lower:
        return 0.8

    # Director
    if 'director' in title_lower:
        return 0.6

    # Manager
    if 'manager' in title_lower or 'head of' in title_lower:
        return 0.4

    # Individual contributor
    return 0.2
```

---

### 4. ICP Scoring Engine

```python
from typing import Dict

class ICPScorer:
    """Main ICP scoring engine."""

    def __init__(self, icp_model: ICPModel):
        self.icp_model = icp_model

    def score_lead(self, lead: Lead) -> ScoredLead:
        """
        Score a single lead against the ICP model.

        Returns ScoredLead with:
        - ICP score (0-100)
        - Priority tier (A/B/C)
        - Scoring factors breakdown
        - Expected outcomes
        - Recommended messaging
        """
        total_score = 0.0
        factors = []

        # Factor 1: Vertical/Industry (30 points max)
        vertical_score, vertical_factor = self._score_vertical(lead)
        total_score += vertical_score
        factors.append(vertical_factor)

        # Factor 2: Company Size (20 points max)
        size_score, size_factor = self._score_company_size(lead)
        total_score += size_score
        factors.append(size_factor)

        # Factor 3: Tech Stack (15 points max)
        tech_score, tech_factor = self._score_tech_stack(lead)
        total_score += tech_score
        factors.append(tech_factor)

        # Factor 4: Funding Stage (15 points max)
        funding_score, funding_factor = self._score_funding(lead)
        total_score += funding_score
        factors.append(funding_factor)

        # Factor 5: Growth Signals (10 points max)
        growth_score, growth_factor = self._score_growth(lead)
        total_score += growth_score
        factors.append(growth_factor)

        # Factor 6: Timing (10 points max)
        timing_score, timing_factor = self._score_timing(lead)
        total_score += timing_score
        factors.append(timing_factor)

        # Calculate confidence (based on data completeness)
        confidence = self._calculate_confidence(lead, factors)

        # Determine priority tier
        priority = self._assign_priority(int(total_score))

        # Get expected outcomes from pattern data
        expected_outcomes = self._get_expected_outcomes(lead, int(total_score))

        # Generate messaging recommendations
        messaging = self._generate_messaging(lead, factors)

        return ScoredLead(
            lead_id=lead.lead_id,
            icp_score=int(total_score),
            priority=priority,
            confidence=confidence,
            factors=factors,
            expected_close_rate=expected_outcomes['close_rate'],
            expected_deal_size_usd=expected_outcomes['deal_size'],
            expected_sales_cycle_days=expected_outcomes['sales_cycle'],
            recommended_messaging=messaging
        )

    def _score_vertical(self, lead: Lead) -> tuple[float, ScoringFactor]:
        """Score based on industry vertical."""
        weight = self.icp_model.weights.get('vertical', 30)
        industry = normalize_industry(lead.company.industry)

        pattern_key = f"vertical:{industry}"
        if pattern_key in self.icp_model.patterns:
            pattern = self.icp_model.patterns[pattern_key]
            score = pattern.close_rate * weight
            reasoning = f"Industry '{industry}' has {pattern.close_rate:.0%} close rate ({pattern.sample_size} deals)"
        else:
            score = weight * 0.5  # Neutral score if no data
            reasoning = f"No historical data for '{industry}' vertical"

        return score, ScoringFactor(
            factor='vertical_match',
            weight=weight,
            score=score,
            reasoning=reasoning
        )

    def _score_company_size(self, lead: Lead) -> tuple[float, ScoringFactor]:
        """Score based on company size."""
        weight = self.icp_model.weights.get('company_size', 20)
        size = normalize_company_size(lead.company.size_employees or lead.company.size_bucket)

        pattern_key = f"company_size:{size}"
        if pattern_key in self.icp_model.patterns:
            pattern = self.icp_model.patterns[pattern_key]
            score = pattern.close_rate * weight
            reasoning = f"Company size '{size}' has {pattern.close_rate:.0%} close rate"
        else:
            score = weight * 0.5
            reasoning = f"No data for company size '{size}'"

        return score, ScoringFactor(
            factor='company_size',
            weight=weight,
            score=score,
            reasoning=reasoning
        )

    def _score_tech_stack(self, lead: Lead) -> tuple[float, ScoringFactor]:
        """Score based on tech stack compatibility."""
        weight = self.icp_model.weights.get('tech_stack', 15)
        compatibility = calculate_tech_compatibility(
            lead.company.tech_stack,
            self.icp_model.ideal_tech_stack
        )
        score = compatibility * weight

        matches = set(t.lower() for t in lead.company.tech_stack) & \
                  set(t.lower() for t in self.icp_model.ideal_tech_stack)

        reasoning = f"Tech stack {compatibility:.0%} compatible (matches: {', '.join(matches) if matches else 'none'})"

        return score, ScoringFactor(
            factor='tech_stack',
            weight=weight,
            score=score,
            reasoning=reasoning
        )

    def _score_funding(self, lead: Lead) -> tuple[float, ScoringFactor]:
        """Score based on funding stage."""
        weight = self.icp_model.weights.get('funding_stage', 15)
        funding = lead.company.funding_stage

        if not funding:
            return weight * 0.5, ScoringFactor(
                factor='funding_stage',
                weight=weight,
                score=weight * 0.5,
                reasoning="No funding data available"
            )

        pattern_key = f"funding:{funding}"
        if pattern_key in self.icp_model.patterns:
            pattern = self.icp_model.patterns[pattern_key]
            score = pattern.close_rate * weight
            reasoning = f"Funding stage '{funding}' has {pattern.close_rate:.0%} close rate"
        else:
            score = weight * 0.5
            reasoning = f"No data for funding stage '{funding}'"

        return score, ScoringFactor(
            factor='funding_stage',
            weight=weight,
            score=score,
            reasoning=reasoning
        )

    def _score_growth(self, lead: Lead) -> tuple[float, ScoringFactor]:
        """Score based on growth signals."""
        weight = self.icp_model.weights.get('growth_signals', 10)
        growth_signal = calculate_growth_signal(lead.company)
        score = growth_signal * weight

        signals = []
        if lead.company.funding_date:
            months = (datetime.utcnow() - lead.company.funding_date).days / 30
            if months < 12:
                signals.append(f"Funded {int(months)}mo ago")

        if lead.company.open_positions > 0:
            signals.append(f"{lead.company.open_positions} open positions")

        reasoning = f"Growth score: {growth_signal:.0%} ({', '.join(signals) if signals else 'no signals'})"

        return score, ScoringFactor(
            factor='growth_signals',
            weight=weight,
            score=score,
            reasoning=reasoning
        )

    def _score_timing(self, lead: Lead) -> tuple[float, ScoringFactor]:
        """Score based on timing signals."""
        weight = self.icp_model.weights.get('timing', 10)
        timing_signal = calculate_timing_score(lead.contact)
        score = timing_signal * weight

        signals = []
        if lead.contact.job_change_date:
            days = (datetime.utcnow() - lead.contact.job_change_date).days
            if days < 90:
                signals.append(f"New in role ({days}d)")

        if lead.contact.linkedin_posts_last_30_days > 5:
            signals.append(f"{lead.contact.linkedin_posts_last_30_days} posts/month")

        reasoning = f"Timing score: {timing_signal:.0%} ({', '.join(signals) if signals else 'no signals'})"

        return score, ScoringFactor(
            factor='timing',
            weight=weight,
            score=score,
            reasoning=reasoning
        )

    def _calculate_confidence(self, lead: Lead, factors: List[ScoringFactor]) -> float:
        """
        Calculate confidence score based on data completeness.

        More data = higher confidence.
        """
        data_points = 0
        total_possible = 10

        # Company data
        if lead.company.size_employees: data_points += 1
        if lead.company.revenue_usd: data_points += 1
        if lead.company.industry: data_points += 1
        if lead.company.tech_stack: data_points += 1
        if lead.company.funding_stage: data_points += 1
        if lead.company.open_positions: data_points += 1

        # Contact data
        if lead.contact.title: data_points += 1
        if lead.contact.job_change_date: data_points += 1
        if lead.contact.linkedin_url: data_points += 1
        if lead.contact.shared_connections: data_points += 1

        return data_points / total_possible

    def _assign_priority(self, score: int) -> PriorityTier:
        """Assign priority tier based on score."""
        if score >= 80:
            return PriorityTier.A_TIER
        elif score >= 60:
            return PriorityTier.B_TIER
        else:
            return PriorityTier.C_TIER

    def _get_expected_outcomes(self, lead: Lead, score: int) -> Dict:
        """
        Estimate expected outcomes based on ICP score and historical patterns.
        """
        # Find most relevant pattern
        industry = normalize_industry(lead.company.industry)
        pattern_key = f"vertical:{industry}"

        if pattern_key in self.icp_model.patterns:
            pattern = self.icp_model.patterns[pattern_key]
            base_close_rate = pattern.close_rate
            base_deal_size = pattern.avg_deal_size_usd
            base_sales_cycle = pattern.avg_sales_cycle_days
        else:
            # Use global averages if no pattern
            base_close_rate = 0.20
            base_deal_size = 40000
            base_sales_cycle = 60

        # Adjust based on score (higher score = higher close rate)
        score_multiplier = score / 100
        adjusted_close_rate = base_close_rate * (0.5 + (score_multiplier * 1.5))

        return {
            'close_rate': min(adjusted_close_rate, 0.90),  # Cap at 90%
            'deal_size': base_deal_size,
            'sales_cycle': base_sales_cycle
        }

    def _generate_messaging(self, lead: Lead, factors: List[ScoringFactor]) -> Dict[str, str]:
        """
        Generate personalized messaging recommendations.
        """
        # Extract top scoring factors
        top_factors = sorted(factors, key=lambda x: x.score, reverse=True)[:2]

        messaging = {}

        # Hook (based on top factor)
        top_factor = top_factors[0]
        if top_factor.factor == 'funding_stage':
            if lead.company.funding_stage == 'series_a':
                messaging['hook'] = "Congrats on the Series A funding!"
        elif top_factor.factor == 'timing' and lead.contact.job_change_date:
            messaging['hook'] = f"Congrats on the new role at {lead.company.name}!"
        else:
            messaging['hook'] = f"Noticed {lead.company.name} on LinkedIn"

        # Pain point (generic based on industry)
        industry = normalize_industry(lead.company.industry)
        pain_point_map = {
            'fintech': 'scaling sales operations',
            'saas': 'lead generation and pipeline growth',
            'healthcare': 'customer acquisition in regulated space'
        }
        messaging['pain_point'] = pain_point_map.get(industry, 'sales efficiency')

        # Solution fit
        messaging['solution_fit'] = "Our LinkedIn automation agent helped similar companies 10x their outbound"

        # CTA
        messaging['cta'] = "Worth a 15-min chat to see if it fits your process?"

        return messaging
```

---

### 5. Usage Example

```python
# Example: Score a batch of leads

from typing import List

def score_leads_from_apollo(apollo_data: List[dict], icp_model: ICPModel) -> List[ScoredLead]:
    """
    Score leads from Apollo.io data.
    """
    scorer = ICPScorer(icp_model)
    scored_leads = []

    for raw_lead in apollo_data:
        # Parse Apollo data into Lead object
        lead = Lead(
            lead_id=raw_lead['id'],
            company=Company(
                domain=raw_lead['domain'],
                name=raw_lead['name'],
                size_employees=raw_lead.get('employees'),
                industry=raw_lead.get('industry', ''),
                tech_stack=raw_lead.get('technologies', []),
                funding_stage=raw_lead.get('funding_stage'),
                open_positions=raw_lead.get('job_postings_count', 0)
            ),
            contact=Contact(
                name=raw_lead['person_name'],
                title=raw_lead['title'],
                linkedin_url=raw_lead.get('linkedin_url'),
                email=raw_lead.get('email')
            ),
            source='apollo'
        )

        # Score the lead
        scored_lead = scorer.score_lead(lead)
        scored_leads.append(scored_lead)

    return scored_leads


# Filter for A-tier leads only
a_tier_leads = [lead for lead in scored_leads if lead.priority == PriorityTier.A_TIER]

print(f"Found {len(a_tier_leads)} A-tier leads out of {len(scored_leads)} total")
```

---

## Conclusion

This is the **complete, production-ready implementation** of the ICP scoring algorithm. Use this code as the foundation for the Intelligence Agent.

**Key features:**
- ✅ Comprehensive data normalization
- ✅ Feature engineering (growth, tech, timing)
- ✅ Pattern-based scoring (learns from YOUR data)
- ✅ Confidence calculation
- ✅ Expected outcomes prediction
- ✅ Messaging recommendations

**Next step:** Integrate this into the Intelligence Agent FastAPI server.

---

**Document Filing Reference:**
Category: AT (Architecture & Technical)
Type: CODE (Code Specification)
Last Updated: 2025-10-27
