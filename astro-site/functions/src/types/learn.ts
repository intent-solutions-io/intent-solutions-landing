import { Timestamp } from "firebase-admin/firestore";

/**
 * AI analysis result from Vertex AI
 */
export interface LearnAnalysis {
  os: "mac" | "windows" | "linux" | "unknown";
  experienceLevel: "beginner" | "intermediate" | "advanced";
  recommendedTier: 1 | 2 | 3 | 4;
  fit: "good" | "maybe" | "poor";
  reasoning: string;
  emailDraft: string;
  analyzedAt: Timestamp;
}

/**
 * Human approval status and metadata
 */
export interface LearnApproval {
  status: "pending" | "approved" | "rejected" | "needs_edit";
  approvedBy?: string;
  approvedAt?: Timestamp;
  notes?: string;
}

/**
 * Learn with Jeremy intake submission
 */
export interface LearnIntake {
  id?: string;

  // From form
  name: string;
  email: string;
  message: string;
  company?: string;
  phone?: string;

  // Inferred/captured
  source?: string;
  userAgent?: string;
  createdAt: Timestamp;

  // AI Analysis (added by Vertex)
  ai?: LearnAnalysis;

  // Human approval
  approval?: LearnApproval;

  // Status tracking
  status:
    | "pending_ai"
    | "pending_review"
    | "approved"
    | "verification_sent"
    | "verified"
    | "scheduled"
    | "completed"
    | "rejected";

  // Email tracking
  emailsSent: {
    thankYou?: Timestamp;
    verification?: Timestamp;
  };
  verificationSentAt?: Timestamp;
  verifiedAt?: Timestamp;

  // Slack message ID for updating
  slackMessageTs?: string;
  slackChannelId?: string;
}

/**
 * Input for creating a new Learn intake
 */
export type LearnIntakeInput = Omit<
  LearnIntake,
  "id" | "createdAt" | "emailsSent" | "status" | "ai" | "approval"
>;

/**
 * Slack action payload types
 */
export interface SlackActionPayload {
  type: "block_actions";
  user: {
    id: string;
    username: string;
    name: string;
  };
  channel: {
    id: string;
    name: string;
  };
  message: {
    ts: string;
    text: string;
  };
  actions: Array<{
    action_id: string;
    value: string;
    type: string;
  }>;
  response_url: string;
  trigger_id: string;
}
