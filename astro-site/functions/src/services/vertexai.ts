import { VertexAI } from "@google-cloud/vertexai";
import { logger } from "firebase-functions/v2";
import type { LearnAnalysis } from "../types";

// Initialize Vertex AI with the project ID from environment
// Firebase Functions automatically provides GCLOUD_PROJECT
const PROJECT_ID = process.env.GCLOUD_PROJECT || "intent-landing-page";
const LOCATION = "us-central1";

let vertexAI: VertexAI | null = null;

function getVertexAI(): VertexAI {
  if (!vertexAI) {
    vertexAI = new VertexAI({
      project: PROJECT_ID,
      location: LOCATION,
    });
  }
  return vertexAI;
}

/**
 * Analyze a Learn intake submission using Vertex AI Gemini
 */
export async function analyzeLearnIntake(intake: {
  name: string;
  email: string;
  message: string;
  company?: string;
}): Promise<Omit<LearnAnalysis, "analyzedAt">> {
  const vertex = getVertexAI();

  const model = vertex.getGenerativeModel({
    model: "gemini-2.0-flash-001",
  });

  const prompt = `You are an intake analyst for "Learn with Jeremy" - a white-glove Claude Code CLI training program for executives and non-technical founders.

## Service Tiers
- **Tier 1** ($0): Self-service PDF guides + basic template
- **Tier 2** ($99): 30-min guided setup + custom CLAUDE.md file
- **Tier 3** ($299): Full white-glove (60-min discovery, 30-day support, personalized curriculum)
- **Tier 4** ($999): Team onboarding (up to 5 members)

## Client Fit Criteria
**Good fit:**
- Non-technical founders wanting to learn AI tools
- Executives exploring AI for their business
- Clear goals or projects in mind
- Willing to invest time in learning

**Maybe fit:**
- Technical people (may not need white-glove)
- Vague goals (needs discovery call)
- Price-sensitive signals

**Poor fit:**
- Looking for done-for-you service (not training)
- Expecting instant results
- No clear use case

## Your Task
Analyze this potential client submission and provide:

1. **OS_GUESS**: mac | windows | linux | unknown
   (Guess from context clues - Mac is most common for executives)

2. **EXPERIENCE**: beginner | intermediate | advanced
   - beginner: No coding, new to AI tools
   - intermediate: Some tech comfort, used ChatGPT
   - advanced: Developers, engineers

3. **TIER**: 1 | 2 | 3 | 4
   - Consider their goals, apparent need for support, and business context

4. **FIT**: good | maybe | poor
   - Is this a good client for white-glove Claude Code training?

5. **REASONING**: 1-2 sentences explaining your assessment

6. **EMAIL_DRAFT**: A personalized 3-4 paragraph email to send them after approval. Include:
   - Acknowledge their specific goals/situation
   - Explain the recommended tier and why
   - Clear next step (verification checklist or calendar link)
   - Professional but warm tone

## Client Submission
Name: ${intake.name}
Company: ${intake.company || "Not provided"}
Email: ${intake.email}
Message: ${intake.message}

## Response Format
Respond with ONLY valid JSON (no markdown, no code blocks):
{
  "os": "mac",
  "experienceLevel": "beginner",
  "recommendedTier": 3,
  "fit": "good",
  "reasoning": "Clear goals and non-technical background makes them ideal for white-glove training.",
  "emailDraft": "Hi [Name],\\n\\nThank you for reaching out..."
}`;

  try {
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: 1024,
        responseMimeType: "application/json",
      },
    });

    const response = result.response;
    const text = response.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      logger.error("Empty response from Vertex AI");
      return getDefaultAnalysis();
    }

    // Parse the JSON response
    const analysis = JSON.parse(text);

    // Validate and normalize the response
    return {
      os: validateOs(analysis.os),
      experienceLevel: validateExperience(analysis.experienceLevel),
      recommendedTier: validateTier(analysis.recommendedTier),
      fit: validateFit(analysis.fit),
      reasoning: analysis.reasoning || "Analysis completed",
      emailDraft: analysis.emailDraft || getDefaultEmailDraft(intake.name),
    };
  } catch (error) {
    logger.error("Vertex AI analysis failed", { error });
    return getDefaultAnalysis();
  }
}

function validateOs(os: unknown): LearnAnalysis["os"] {
  const valid = ["mac", "windows", "linux", "unknown"];
  return valid.includes(os as string) ? (os as LearnAnalysis["os"]) : "unknown";
}

function validateExperience(exp: unknown): LearnAnalysis["experienceLevel"] {
  const valid = ["beginner", "intermediate", "advanced"];
  return valid.includes(exp as string)
    ? (exp as LearnAnalysis["experienceLevel"])
    : "beginner";
}

function validateTier(tier: unknown): LearnAnalysis["recommendedTier"] {
  const num = Number(tier);
  return [1, 2, 3, 4].includes(num)
    ? (num as LearnAnalysis["recommendedTier"])
    : 3;
}

function validateFit(fit: unknown): LearnAnalysis["fit"] {
  const valid = ["good", "maybe", "poor"];
  return valid.includes(fit as string) ? (fit as LearnAnalysis["fit"]) : "maybe";
}

function getDefaultAnalysis(): Omit<LearnAnalysis, "analyzedAt"> {
  return {
    os: "unknown",
    experienceLevel: "beginner",
    recommendedTier: 3,
    fit: "maybe",
    reasoning: "AI analysis unavailable - manual review recommended",
    emailDraft: getDefaultEmailDraft("there"),
  };
}

function getDefaultEmailDraft(name: string): string {
  return `Hi ${name},

Thank you for your interest in Learn with Jeremy! I'm excited to help you get started with Claude Code.

Based on your message, I'd recommend our Tier 3 White-Glove package, which includes a 60-minute discovery call, personalized curriculum, and 30 days of support.

Next step: Please complete the pre-session verification checklist I've attached. Once you confirm everything is set up, we'll schedule your first session.

Looking forward to working with you!

Jeremy Longshore
Intent Solutions`;
}

/**
 * Analyze any contact form submission (not just Learn)
 * This provides AI triage for general inquiries
 */
export async function analyzeContactSubmission(data: {
  name: string;
  email: string;
  message: string;
  company?: string;
  interest: string;
  projectType?: string;
  budget?: string;
  timeline?: string;
}): Promise<{
  priority: "high" | "medium" | "low";
  category: string;
  summary: string;
  suggestedResponse: string;
}> {
  const vertex = getVertexAI();

  const model = vertex.getGenerativeModel({
    model: "gemini-2.0-flash-001",
  });

  const prompt = `You are a lead qualification assistant for Intent Solutions, an AI consulting and training business.

## Services
- **Consulting**: Custom AI/ML builds, workflow automation, GCP infrastructure
- **Learn with Jeremy**: Claude Code training for non-technical founders
- **Colab**: Partnership opportunities

## Lead Qualification
Analyze this contact form submission and provide:

1. **PRIORITY**: high | medium | low
   - high: Clear budget, immediate timeline, specific project
   - medium: Good fit but needs discovery
   - low: Exploring, unclear fit, or tire-kicker signals

2. **CATEGORY**: What type of inquiry this is
   Examples: "AI Development Project", "Training Request", "Partnership Inquiry", "General Question"

3. **SUMMARY**: 1-2 sentence summary of what they're looking for

4. **SUGGESTED_RESPONSE**: A brief, personalized response opening (2-3 sentences)

## Submission
Name: ${data.name}
Email: ${data.email}
Company: ${data.company || "Not provided"}
Interest: ${data.interest}
Project Type: ${data.projectType || "Not specified"}
Budget: ${data.budget || "Not specified"}
Timeline: ${data.timeline || "Not specified"}
Message: ${data.message}

## Response Format
Respond with ONLY valid JSON (no markdown, no code blocks):
{
  "priority": "high",
  "category": "AI Development Project",
  "summary": "Looking for custom AI chatbot for customer support",
  "suggestedResponse": "Thanks for reaching out! Your customer support AI project sounds interesting..."
}`;

  try {
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: 512,
        responseMimeType: "application/json",
      },
    });

    const response = result.response;
    const text = response.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      return getDefaultContactAnalysis();
    }

    const analysis = JSON.parse(text);

    return {
      priority: validatePriority(analysis.priority),
      category: analysis.category || "General Inquiry",
      summary: analysis.summary || "Contact form submission",
      suggestedResponse: analysis.suggestedResponse || "",
    };
  } catch (error) {
    logger.error("Contact analysis failed", { error });
    return getDefaultContactAnalysis();
  }
}

function validatePriority(p: unknown): "high" | "medium" | "low" {
  const valid = ["high", "medium", "low"];
  return valid.includes(p as string) ? (p as "high" | "medium" | "low") : "medium";
}

function getDefaultContactAnalysis() {
  return {
    priority: "medium" as const,
    category: "General Inquiry",
    summary: "Contact form submission - manual review needed",
    suggestedResponse: "Thank you for reaching out! I'll review your message and get back to you shortly.",
  };
}

/**
 * Analyze partner/reseller inquiry using Vertex AI Gemini
 */
export async function analyzePartnerInquiry(data: {
  companyName: string;
  contactName: string;
  email: string;
  interest: string;
  message?: string;
}): Promise<{
  priority: "high" | "medium" | "low";
  partnerFit: "strong" | "moderate" | "weak";
  summary: string;
  suggestedNextStep: string;
}> {
  const vertex = getVertexAI();

  const model = vertex.getGenerativeModel({
    model: "gemini-2.0-flash-001",
  });

  const interestLabels: Record<string, string> = {
    exploring: "Just exploring options",
    "distribution-partner": "Becoming a distribution partner",
    "direct-client": "AI solution for their business",
    "learn-more": "Learning more about services",
  };

  const prompt = `You are a partner qualification assistant for Intent Solutions, an AI consulting business with a distribution partner program.

## Partner Program Overview
- Partners resell hosted AI solutions under their brand
- We provision tenants, handle infrastructure
- Partners own client relationships
- Models: Rev-share, wholesale pricing, retainers

## Partner Interest Types
- exploring: Early stage, researching
- distribution-partner: Wants to resell our solutions
- direct-client: Wants AI for their own business (not a partner)
- learn-more: Information gathering

## Ideal Partners
- Agencies wanting AI offerings without building infrastructure
- Vertical specialists (healthcare, finance, legal)
- Consultancies adding AI to their service mix

## Your Task
Analyze this partner inquiry and provide:

1. **PRIORITY**: high | medium | low
   - high: Distribution partner interest, established company
   - medium: Exploring or learn-more with good company fit
   - low: Direct client (not partner), vague, or poor fit

2. **PARTNER_FIT**: strong | moderate | weak
   - strong: Clear partner intent, good company profile
   - moderate: Could go either way, needs discovery
   - weak: Actually wants direct service, or poor fit

3. **SUMMARY**: 1-2 sentence summary of what they're looking for

4. **NEXT_STEP**: Recommended next action (schedule call, send info, etc.)

## Inquiry Details
Company: ${data.companyName}
Contact: ${data.contactName}
Email: ${data.email}
Interest: ${interestLabels[data.interest] || data.interest}
Message: ${data.message || "No message provided"}

## Response Format
Respond with ONLY valid JSON (no markdown, no code blocks):
{
  "priority": "high",
  "partnerFit": "strong",
  "summary": "Agency looking to add AI offerings to their service mix",
  "suggestedNextStep": "Schedule partner discovery call"
}`;

  try {
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: 512,
        responseMimeType: "application/json",
      },
    });

    const response = result.response;
    const text = response.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      return getDefaultPartnerAnalysis();
    }

    const analysis = JSON.parse(text);

    return {
      priority: validatePriority(analysis.priority),
      partnerFit: validatePartnerFit(analysis.partnerFit),
      summary: analysis.summary || "Partner inquiry",
      suggestedNextStep: analysis.suggestedNextStep || "Review and follow up",
    };
  } catch (error) {
    logger.error("Partner analysis failed", { error });
    return getDefaultPartnerAnalysis();
  }
}

function validatePartnerFit(fit: unknown): "strong" | "moderate" | "weak" {
  const valid = ["strong", "moderate", "weak"];
  return valid.includes(fit as string) ? (fit as "strong" | "moderate" | "weak") : "moderate";
}

function getDefaultPartnerAnalysis() {
  return {
    priority: "medium" as const,
    partnerFit: "moderate" as const,
    summary: "Partner inquiry - manual review needed",
    suggestedNextStep: "Review inquiry and schedule call if appropriate",
  };
}
