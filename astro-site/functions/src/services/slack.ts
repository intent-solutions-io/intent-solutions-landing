import { defineSecret } from "firebase-functions/params";
import { logger } from "firebase-functions/v2";
import * as crypto from "crypto";
import type { LearnIntake, LearnAnalysis, SlackActionPayload } from "../types";

// Define secrets for Slack integration
export const slackWebhookUrl = defineSecret("SLACK_WEBHOOK_URL");
export const slackSigningSecret = defineSecret("SLACK_SIGNING_SECRET");
export const slackBotToken = defineSecret("SLACK_BOT_TOKEN");

// Tier labels for display
const tierLabels: Record<number, string> = {
  1: "Tier 1 - Self-Service ($0)",
  2: "Tier 2 - Guided Setup ($99)",
  3: "Tier 3 - White-Glove ($299)",
  4: "Tier 4 - Team Onboarding ($999)",
};

// Fit emoji mapping
const fitEmoji: Record<string, string> = {
  good: "✅",
  maybe: "🤔",
  poor: "❌",
};

// OS emoji mapping
const osEmoji: Record<string, string> = {
  mac: "🍎",
  windows: "🪟",
  linux: "🐧",
  unknown: "❓",
};

/**
 * Send a Learn intake notification to Slack with interactive buttons
 */
export async function sendLearnIntakeNotification(
  intake: LearnIntake,
  analysis: Omit<LearnAnalysis, "analyzedAt">,
  intakeId: string
): Promise<{ ts: string; channelId: string } | null> {
  const webhookUrl = slackWebhookUrl.value();

  if (!webhookUrl) {
    logger.error("SLACK_WEBHOOK_URL not configured");
    return null;
  }

  const blocks = buildIntakeNotificationBlocks(intake, analysis, intakeId);

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        blocks,
        text: `New Learn with Jeremy Intake: ${intake.name}`,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      logger.error("Slack webhook failed", { status: response.status, error: errorText });
      return null;
    }

    // Note: Incoming webhooks don't return message ts
    // For message updates, we'd need to use chat.postMessage with bot token
    logger.info("Slack notification sent", { intakeId });
    return { ts: "", channelId: "" };
  } catch (error) {
    logger.error("Failed to send Slack notification", { error });
    return null;
  }
}

/**
 * Send notification using Bot Token (allows message updates)
 */
export async function sendLearnIntakeNotificationWithBot(
  intake: LearnIntake,
  analysis: Omit<LearnAnalysis, "analyzedAt">,
  intakeId: string,
  channelId: string
): Promise<{ ts: string; channelId: string } | null> {
  const botToken = slackBotToken.value();

  if (!botToken) {
    logger.warn("SLACK_BOT_TOKEN not configured, falling back to webhook");
    return sendLearnIntakeNotification(intake, analysis, intakeId);
  }

  const blocks = buildIntakeNotificationBlocks(intake, analysis, intakeId);

  try {
    const response = await fetch("https://slack.com/api/chat.postMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${botToken}`,
      },
      body: JSON.stringify({
        channel: channelId,
        blocks,
        text: `New Learn with Jeremy Intake: ${intake.name}`,
      }),
    });

    const result = await response.json();

    if (!result.ok) {
      logger.error("Slack API error", { error: result.error });
      return null;
    }

    return {
      ts: result.ts,
      channelId: result.channel,
    };
  } catch (error) {
    logger.error("Failed to send Slack message", { error });
    return null;
  }
}

/**
 * Build Block Kit blocks for intake notification
 */
function buildIntakeNotificationBlocks(
  intake: LearnIntake,
  analysis: Omit<LearnAnalysis, "analyzedAt">,
  intakeId: string
): object[] {
  return [
    {
      type: "header",
      text: {
        type: "plain_text",
        text: "🎓 New Learn with Jeremy Intake",
        emoji: true,
      },
    },
    {
      type: "section",
      fields: [
        {
          type: "mrkdwn",
          text: `*Name:*\n${intake.name}`,
        },
        {
          type: "mrkdwn",
          text: `*Email:*\n<mailto:${intake.email}|${intake.email}>`,
        },
      ],
    },
    ...(intake.company
      ? [
          {
            type: "section",
            fields: [
              {
                type: "mrkdwn",
                text: `*Company:*\n${intake.company}`,
              },
              {
                type: "mrkdwn",
                text: `*Phone:*\n${intake.phone || "Not provided"}`,
              },
            ],
          },
        ]
      : []),
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*Goal:*\n${truncate(intake.message, 500)}`,
      },
    },
    {
      type: "divider",
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*🤖 AI Analysis:*\n• ${osEmoji[analysis.os]} OS: ${capitalize(analysis.os)}\n• 📊 Experience: ${capitalize(analysis.experienceLevel)}\n• 💰 Tier: ${tierLabels[analysis.recommendedTier]}\n• ${fitEmoji[analysis.fit]} Fit: ${capitalize(analysis.fit)}\n\n_${analysis.reasoning}_`,
      },
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*📧 Draft Email:*\n\`\`\`${truncate(analysis.emailDraft, 300)}\`\`\``,
      },
    },
    {
      type: "divider",
    },
    {
      type: "actions",
      elements: [
        {
          type: "button",
          text: {
            type: "plain_text",
            text: "✅ Approve & Send",
            emoji: true,
          },
          action_id: "learn_approve",
          value: intakeId,
          style: "primary",
        },
        {
          type: "button",
          text: {
            type: "plain_text",
            text: "✏️ Edit First",
            emoji: true,
          },
          action_id: "learn_edit",
          value: intakeId,
        },
        {
          type: "button",
          text: {
            type: "plain_text",
            text: "❌ Reject",
            emoji: true,
          },
          action_id: "learn_reject",
          value: intakeId,
          style: "danger",
        },
      ],
    },
    {
      type: "context",
      elements: [
        {
          type: "mrkdwn",
          text: `Intake ID: \`${intakeId}\` • <https://console.firebase.google.com/project/intent-landing-page/firestore/data/~2FlearnIntakes~2F${intakeId}|View in Firestore>`,
        },
      ],
    },
  ];
}

/**
 * Update a Slack message after action is taken
 */
export async function updateSlackMessage(
  channelId: string,
  messageTs: string,
  action: "approved" | "rejected" | "edit",
  username: string,
  intakeId: string
): Promise<boolean> {
  const botToken = slackBotToken.value();

  if (!botToken || !messageTs) {
    logger.warn("Cannot update Slack message - no bot token or message ts");
    return false;
  }

  const statusEmoji = {
    approved: "✅",
    rejected: "❌",
    edit: "✏️",
  };

  const statusText = {
    approved: "Approved - Verification email sent",
    rejected: "Rejected",
    edit: "Flagged for manual edit",
  };

  try {
    const response = await fetch("https://slack.com/api/chat.update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${botToken}`,
      },
      body: JSON.stringify({
        channel: channelId,
        ts: messageTs,
        blocks: [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: `${statusEmoji[action]} *${statusText[action]}*\n\nProcessed by @${username}\nIntake ID: \`${intakeId}\``,
            },
          },
        ],
        text: `Learn intake ${action}`,
      }),
    });

    const result = await response.json();
    return result.ok === true;
  } catch (error) {
    logger.error("Failed to update Slack message", { error });
    return false;
  }
}

/**
 * Verify Slack request signature
 */
export function verifySlackSignature(
  signature: string,
  timestamp: string,
  body: string
): boolean {
  const signingSecret = slackSigningSecret.value();

  if (!signingSecret) {
    logger.error("SLACK_SIGNING_SECRET not configured");
    return false;
  }

  // Check timestamp is within 5 minutes
  const now = Math.floor(Date.now() / 1000);
  if (Math.abs(now - parseInt(timestamp)) > 300) {
    logger.warn("Slack request timestamp too old");
    return false;
  }

  // Compute expected signature
  const sigBaseString = `v0:${timestamp}:${body}`;
  const hmac = crypto.createHmac("sha256", signingSecret);
  hmac.update(sigBaseString);
  const expectedSignature = `v0=${hmac.digest("hex")}`;

  // Compare signatures (timing-safe)
  try {
    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    );
  } catch {
    return false;
  }
}

/**
 * Parse Slack action payload from request body
 */
export function parseSlackPayload(body: string): SlackActionPayload | null {
  try {
    // Slack sends payload as URL-encoded form data
    const params = new URLSearchParams(body);
    const payloadStr = params.get("payload");

    if (!payloadStr) {
      logger.error("No payload in Slack request");
      return null;
    }

    return JSON.parse(payloadStr) as SlackActionPayload;
  } catch (error) {
    logger.error("Failed to parse Slack payload", { error });
    return null;
  }
}

/**
 * Send a notification for general contact form submissions
 */
export async function sendContactNotificationToSlack(data: {
  name: string;
  email: string;
  company?: string;
  interest: string;
  message: string;
  priority: "high" | "medium" | "low";
  category: string;
  summary: string;
  docId: string;
}): Promise<boolean> {
  const webhookUrl = slackWebhookUrl.value();

  if (!webhookUrl) {
    logger.error("SLACK_WEBHOOK_URL not configured");
    return false;
  }

  const priorityEmoji = {
    high: "🔴",
    medium: "🟡",
    low: "⚪",
  };

  const blocks = [
    {
      type: "header",
      text: {
        type: "plain_text",
        text: `${priorityEmoji[data.priority]} New Contact: ${data.category}`,
        emoji: true,
      },
    },
    {
      type: "section",
      fields: [
        { type: "mrkdwn", text: `*Name:*\n${data.name}` },
        { type: "mrkdwn", text: `*Email:*\n<mailto:${data.email}|${data.email}>` },
      ],
    },
    ...(data.company
      ? [
          {
            type: "section",
            fields: [
              { type: "mrkdwn", text: `*Company:*\n${data.company}` },
              { type: "mrkdwn", text: `*Interest:*\n${data.interest}` },
            ],
          },
        ]
      : []),
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*AI Summary:*\n${data.summary}`,
      },
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*Message:*\n${truncate(data.message, 500)}`,
      },
    },
    {
      type: "context",
      elements: [
        {
          type: "mrkdwn",
          text: `Priority: ${data.priority.toUpperCase()} • ID: \`${data.docId}\``,
        },
      ],
    },
  ];

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ blocks, text: `New contact from ${data.name}` }),
    });

    return response.ok;
  } catch (error) {
    logger.error("Failed to send Slack contact notification", { error });
    return false;
  }
}

/**
 * Send a notification for partner/reseller inquiries
 */
export async function sendPartnerNotificationToSlack(data: {
  companyName: string;
  contactName: string;
  email: string;
  interest: string;
  message?: string;
  priority: "high" | "medium" | "low";
  partnerFit: "strong" | "moderate" | "weak";
  summary: string;
  docId: string;
}): Promise<boolean> {
  const webhookUrl = slackWebhookUrl.value();

  if (!webhookUrl) {
    logger.error("SLACK_WEBHOOK_URL not configured");
    return false;
  }

  const priorityEmoji = {
    high: "🔴",
    medium: "🟡",
    low: "⚪",
  };

  const fitEmoji = {
    strong: "✅",
    moderate: "🤔",
    weak: "❌",
  };

  const interestLabels: Record<string, string> = {
    exploring: "Exploring options",
    "distribution-partner": "Distribution partner",
    "direct-client": "Direct client",
    "learn-more": "Learning more",
  };

  const blocks = [
    {
      type: "header",
      text: {
        type: "plain_text",
        text: `${priorityEmoji[data.priority]} Partner Inquiry: ${data.companyName}`,
        emoji: true,
      },
    },
    {
      type: "section",
      fields: [
        { type: "mrkdwn", text: `*Company:*\n${data.companyName}` },
        { type: "mrkdwn", text: `*Contact:*\n${data.contactName}` },
      ],
    },
    {
      type: "section",
      fields: [
        { type: "mrkdwn", text: `*Email:*\n<mailto:${data.email}|${data.email}>` },
        { type: "mrkdwn", text: `*Interest:*\n${interestLabels[data.interest] || data.interest}` },
      ],
    },
    {
      type: "divider",
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*🤖 AI Analysis:*\n• ${fitEmoji[data.partnerFit]} Partner Fit: ${capitalize(data.partnerFit)}\n• Priority: ${data.priority.toUpperCase()}\n\n_${data.summary}_`,
      },
    },
    ...(data.message
      ? [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: `*Message:*\n${truncate(data.message, 500)}`,
            },
          },
        ]
      : []),
    {
      type: "context",
      elements: [
        {
          type: "mrkdwn",
          text: `ID: \`${data.docId}\` • <https://console.firebase.google.com/project/intent-landing-page/firestore/data/~2FcontactSubmissions~2F${data.docId}|View in Firestore>`,
        },
      ],
    },
  ];

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ blocks, text: `Partner inquiry from ${data.companyName}` }),
    });

    return response.ok;
  } catch (error) {
    logger.error("Failed to send Slack partner notification", { error });
    return false;
  }
}

// Utility functions
function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - 3) + "...";
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
