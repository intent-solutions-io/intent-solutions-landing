import { Resend } from "resend";
import { defineSecret } from "firebase-functions/params";

export const resendApiKey = defineSecret("RESEND_API_KEY");
export const resendFromEmail = defineSecret("RESEND_FROM_EMAIL");

function getResend(): Resend {
  return new Resend(resendApiKey.value());
}

function getFromEmail(): string {
  return resendFromEmail.value() || "Jeremy <jeremy@intentsolutions.io>";
}

const OWNER_EMAIL = "jeremy@intentsolutions.io";

const teamSizeLabels: Record<string, string> = {
  solo: "Solo Developer",
  "small-team": "Small Team",
  department: "Department",
  enterprise: "Enterprise",
};

const interestLabels: Record<string, string> = {
  consulting: "Consulting / Custom Build",
  learn: "Learn with Jeremy",
  colab: "Colab with Jeremy",
  other: "Other",
};

const projectTypeLabels: Record<string, string> = {
  "ai-ml": "AI / Machine Learning",
  "workflow-automation": "Workflow Automation",
  gcp: "GCP / Cloud Infrastructure",
  strategy: "AI Strategy Consulting",
};

const budgetLabels: Record<string, string> = {
  "under-5k": "Under $5K",
  "5k-15k": "$5K - $15K",
  "15k-50k": "$15K - $50K",
  "50k-plus": "$50K+",
  discuss: "Let's Discuss",
};

const timelineLabels: Record<string, string> = {
  immediate: "Immediate (this week)",
  "this-month": "This Month",
  "this-quarter": "This Quarter",
  exploring: "Just Exploring",
};

export async function sendContactThankYou(email: string, teamSize: string): Promise<string | null> {
  const resend = getResend();
  const teamLabel = teamSizeLabels[teamSize] || teamSize;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #27272a 0%, #18181b 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
    .content { background: #f4f4f5; padding: 30px; border-radius: 0 0 8px 8px; }
    .highlight { background: #27272a; color: #fafafa; padding: 20px; border-radius: 6px; margin: 20px 0; }
    a { color: #3b82f6; }
  </style>
</head>
<body>
  <div class="header">
    <h1 style="margin: 0; font-size: 24px;">Thanks for reaching out!</h1>
    <p style="margin: 10px 0 0 0; opacity: 0.9;">Claude Code Systems</p>
  </div>
  <div class="content">
    <p>Hey there,</p>
    <p>I got your message and I'm excited to connect. I'll be in touch within one business day to discuss your ${teamLabel} Claude Code setup.</p>
    <div class="highlight">
      <p style="margin: 0 0 10px 0; font-weight: 600;">What happens next:</p>
      <p style="margin: 0;">I'll reach out via your preferred contact method to schedule a quick call. We'll talk through your team's needs and I'll recommend the right tier for you.</p>
    </div>
    <p>In the meantime, feel free to explore the <a href="https://claudecodeplugins.io">258+ plugins</a> available in the marketplace. All of them are open-source and ready to use.</p>
    <p>If you have any questions before we connect, just reply to this email.</p>
    <p style="margin-top: 30px;">
      <strong>Jeremy Longshore</strong><br>
      Claude Code Specialist<br>
      <a href="https://intentsolutions.io">intentsolutions.io</a>
    </p>
  </div>
</body>
</html>`;

  const text = `Thanks for reaching out!

Hey there,

I got your message and I'm excited to connect. I'll be in touch within one business day to discuss your ${teamLabel} Claude Code setup.

What happens next:
I'll reach out via your preferred contact method to schedule a quick call. We'll talk through your team's needs and I'll recommend the right tier for you.

In the meantime, feel free to explore the 258+ plugins available at https://claudecodeplugins.io

If you have any questions before we connect, just reply to this email.

Jeremy Longshore
Claude Code Specialist
https://intentsolutions.io`;

  try {
    const response = await resend.emails.send({
      from: getFromEmail(),
      to: email,
      subject: "Thanks for reaching out - Claude Code Systems",
      html,
      text,
      tags: [
        { name: "type", value: "contact-thank-you" },
        { name: "campaign", value: "claude-code-systems" },
      ],
    });
    return response.data?.id ?? null;
  } catch (error) {
    console.error("Failed to send thank you email:", error);
    return null;
  }
}

export async function sendLeadNotification(data: {
  email: string;
  teamSize: string;
  contactMethods: Record<string, string | undefined>;
  businessName?: string;
  docId: string;
}): Promise<string | null> {
  const resend = getResend();
  const teamLabel = teamSizeLabels[data.teamSize] || data.teamSize;

  const contactList = Object.entries(data.contactMethods)
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}: ${v}`)
    .join("<br>");

  const html = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
    .content { background: #f8fafc; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #e2e8f0; border-top: none; }
    .field { margin-bottom: 16px; }
    .label { font-size: 12px; text-transform: uppercase; color: #64748b; margin-bottom: 4px; }
    .value { font-size: 16px; color: #1e293b; }
    .contact-box { background: white; border: 1px solid #e2e8f0; border-radius: 6px; padding: 16px; margin-top: 8px; }
  </style>
</head>
<body>
  <div class="header">
    <h1 style="margin: 0; font-size: 20px;">New Claude Code Lead</h1>
  </div>
  <div class="content">
    <div class="field"><div class="label">Team Size</div><div class="value" style="font-weight: 600; font-size: 18px;">${teamLabel}</div></div>
    <div class="field"><div class="label">Email</div><div class="value"><a href="mailto:${data.email}">${data.email}</a></div></div>
    ${data.businessName ? `<div class="field"><div class="label">Business</div><div class="value">${data.businessName}</div></div>` : ""}
    <div class="field"><div class="label">Contact Methods</div><div class="contact-box">${contactList || "None provided"}</div></div>
    <p style="font-size: 12px; color: #94a3b8; margin-top: 24px;">
      Firestore ID: ${data.docId}<br>
      Submitted: ${new Date().toISOString()}
    </p>
  </div>
</body>
</html>`;

  const contactText = Object.entries(data.contactMethods)
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");

  const text = `New Claude Code Lead

Team Size: ${teamLabel}
Email: ${data.email}
${data.businessName ? `Business: ${data.businessName}\n` : ""}
Contact Methods:
${contactText || "None provided"}

Firestore ID: ${data.docId}
Submitted: ${new Date().toISOString()}`;

  try {
    const response = await resend.emails.send({
      from: getFromEmail(),
      to: OWNER_EMAIL,
      subject: `Claude Code Lead: ${teamLabel}${data.businessName ? ` - ${data.businessName}` : ""}`,
      html,
      text,
      replyTo: data.email,
      tags: [
        { name: "type", value: "lead-notification" },
        { name: "tier", value: data.teamSize },
      ],
    });
    return response.data?.id ?? null;
  } catch (error) {
    console.error("Failed to send lead notification:", error);
    return null;
  }
}

export async function sendPartnerNotification(data: {
  companyName: string;
  contactName: string;
  email: string;
  interest: string;
  message?: string;
  docId: string;
}): Promise<string | null> {
  const resend = getResend();

  const interestLabels: Record<string, string> = {
    exploring: "Just exploring options",
    "distribution-partner": "Becoming a distribution partner",
    "direct-client": "AI solution for their business",
    "learn-more": "Learning more about services",
  };

  const html = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
    .content { background: #f8fafc; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #e2e8f0; border-top: none; }
    .field { margin-bottom: 16px; }
    .label { font-size: 12px; text-transform: uppercase; color: #64748b; margin-bottom: 4px; }
    .value { font-size: 16px; color: #1e293b; }
    .message-box { background: white; border: 1px solid #e2e8f0; border-radius: 6px; padding: 16px; margin-top: 8px; }
  </style>
</head>
<body>
  <div class="header">
    <h1 style="margin: 0; font-size: 20px;">New Partner Inquiry</h1>
  </div>
  <div class="content">
    <div class="field"><div class="label">Company</div><div class="value">${data.companyName}</div></div>
    <div class="field"><div class="label">Contact</div><div class="value">${data.contactName}</div></div>
    <div class="field"><div class="label">Email</div><div class="value"><a href="mailto:${data.email}">${data.email}</a></div></div>
    <div class="field"><div class="label">Interest</div><div class="value">${interestLabels[data.interest] || data.interest}</div></div>
    ${data.message ? `<div class="field"><div class="label">Message</div><div class="message-box">${data.message}</div></div>` : ""}
    <p style="font-size: 12px; color: #94a3b8; margin-top: 24px;">
      Firestore ID: ${data.docId}<br>
      Submitted: ${new Date().toISOString()}
    </p>
  </div>
</body>
</html>`;

  const text = `New Partner Inquiry

Company: ${data.companyName}
Contact: ${data.contactName}
Email: ${data.email}
Interest: ${interestLabels[data.interest] || data.interest}
${data.message ? `\nMessage:\n${data.message}` : ""}

Firestore ID: ${data.docId}
Submitted: ${new Date().toISOString()}`;

  try {
    const response = await resend.emails.send({
      from: getFromEmail(),
      to: OWNER_EMAIL,
      subject: `Partner Inquiry: ${data.companyName} - ${data.contactName}`,
      html,
      text,
      replyTo: data.email,
      tags: [{ name: "type", value: "partner-inquiry" }],
    });
    return response.data?.id ?? null;
  } catch (error) {
    console.error("Failed to send partner notification:", error);
    return null;
  }
}

// ============================================
// ENHANCED CONTACT FORM EMAILS
// ============================================

export async function sendEnhancedContactThankYou(
  email: string,
  name: string,
  interest: string
): Promise<string | null> {
  const resend = getResend();
  const interestLabel = interestLabels[interest] || interest;

  const interestMessages: Record<string, string> = {
    consulting: "I'll review your project details and reach out to discuss next steps for your custom build.",
    learn: "I'm excited to help you level up your AI skills. I'll reach out to schedule your first session.",
    colab: "Partnership inquiries are my favorite. Let's find a way to build and win together.",
    other: "I'll be in touch soon to learn more about what you're looking for.",
  };

  const nextStepMessage = interestMessages[interest] || interestMessages.other;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #27272a 0%, #18181b 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
    .content { background: #f4f4f5; padding: 30px; border-radius: 0 0 8px 8px; }
    .highlight { background: #27272a; color: #fafafa; padding: 20px; border-radius: 6px; margin: 20px 0; }
    a { color: #3b82f6; }
    .cta { display: inline-block; background: #27272a; color: #fafafa; padding: 12px 24px; border-radius: 6px; text-decoration: none; margin-top: 16px; }
  </style>
</head>
<body>
  <div class="header">
    <h1 style="margin: 0; font-size: 24px;">Thanks for reaching out, ${name}!</h1>
    <p style="margin: 10px 0 0 0; opacity: 0.9;">Intent Solutions</p>
  </div>
  <div class="content">
    <p>Hey ${name},</p>
    <p>I got your message about <strong>${interestLabel}</strong> and I'm excited to connect.</p>
    <div class="highlight">
      <p style="margin: 0 0 10px 0; font-weight: 600;">What happens next:</p>
      <p style="margin: 0;">${nextStepMessage}</p>
    </div>
    <p>I respond within 24 hours, usually much faster.</p>
    <p>In the meantime, feel free to explore the <a href="https://claudecodeplugins.io">227+ plugins</a> I've built. All of them are open-source and ready to use.</p>
    <p>Want to skip the wait? <a href="https://calendar.app.google/Wqbt8EJuEh5xvvV58" class="cta" style="color: #fafafa;">Book a call now</a></p>
    <p style="margin-top: 30px;">
      <strong>Jeremy Longshore</strong><br>
      AI Systems Builder<br>
      <a href="https://intentsolutions.io">intentsolutions.io</a>
    </p>
  </div>
</body>
</html>`;

  const text = `Thanks for reaching out, ${name}!

Hey ${name},

I got your message about ${interestLabel} and I'm excited to connect.

What happens next:
${nextStepMessage}

I respond within 24 hours, usually much faster.

In the meantime, feel free to explore the 227+ plugins I've built at https://claudecodeplugins.io

Want to skip the wait? Book a call: https://calendar.app.google/Wqbt8EJuEh5xvvV58

Jeremy Longshore
AI Systems Builder
https://intentsolutions.io`;

  try {
    const response = await resend.emails.send({
      from: getFromEmail(),
      to: email,
      subject: `Thanks for reaching out, ${name} - Intent Solutions`,
      html,
      text,
      tags: [
        { name: "type", value: "enhanced-contact-thank-you" },
        { name: "interest", value: interest },
      ],
    });
    return response.data?.id ?? null;
  } catch (error) {
    console.error("Failed to send enhanced thank you email:", error);
    return null;
  }
}

export async function sendEnhancedLeadNotification(data: {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  interest: string;
  projectType?: string;
  budget?: string;
  timeline?: string;
  message: string;
  docId: string;
}): Promise<string | null> {
  const resend = getResend();

  const interestLabel = interestLabels[data.interest] || data.interest;
  const projectLabel = data.projectType ? projectTypeLabels[data.projectType] || data.projectType : null;
  const budgetLabel = data.budget ? budgetLabels[data.budget] || data.budget : null;
  const timelineLabel = data.timeline ? timelineLabels[data.timeline] || data.timeline : null;

  // Determine header color based on interest
  const headerColors: Record<string, string> = {
    consulting: "#22c55e, #16a34a", // green
    learn: "#3b82f6, #1d4ed8", // blue
    colab: "#8b5cf6, #6d28d9", // purple
    other: "#71717a, #52525b", // gray
  };
  const gradientColors = headerColors[data.interest] || headerColors.other;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, ${gradientColors}); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
    .content { background: #f8fafc; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #e2e8f0; border-top: none; }
    .field { margin-bottom: 16px; }
    .label { font-size: 12px; text-transform: uppercase; color: #64748b; margin-bottom: 4px; }
    .value { font-size: 16px; color: #1e293b; }
    .highlight { font-weight: 600; font-size: 18px; }
    .message-box { background: white; border: 1px solid #e2e8f0; border-radius: 6px; padding: 16px; margin-top: 8px; white-space: pre-wrap; }
    .budget-timeline { display: flex; gap: 24px; }
    .budget-timeline > div { flex: 1; }
  </style>
</head>
<body>
  <div class="header">
    <h1 style="margin: 0; font-size: 20px;">New Lead: ${interestLabel}</h1>
  </div>
  <div class="content">
    <div class="field">
      <div class="label">Name</div>
      <div class="value highlight">${data.name}</div>
    </div>
    <div class="field">
      <div class="label">Email</div>
      <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
    </div>
    ${data.company ? `<div class="field"><div class="label">Company</div><div class="value">${data.company}</div></div>` : ""}
    ${data.phone ? `<div class="field"><div class="label">Phone</div><div class="value"><a href="tel:${data.phone}">${data.phone}</a></div></div>` : ""}
    <div class="field">
      <div class="label">Interest</div>
      <div class="value highlight">${interestLabel}</div>
    </div>
    ${projectLabel ? `<div class="field"><div class="label">Project Type</div><div class="value">${projectLabel}</div></div>` : ""}
    <div class="budget-timeline">
      ${budgetLabel ? `<div class="field"><div class="label">Budget</div><div class="value highlight">${budgetLabel}</div></div>` : ""}
      ${timelineLabel ? `<div class="field"><div class="label">Timeline</div><div class="value">${timelineLabel}</div></div>` : ""}
    </div>
    <div class="field">
      <div class="label">Message</div>
      <div class="message-box">${data.message}</div>
    </div>
    <p style="font-size: 12px; color: #94a3b8; margin-top: 24px;">
      Firestore ID: ${data.docId}<br>
      Submitted: ${new Date().toISOString()}
    </p>
  </div>
</body>
</html>`;

  const text = `New Lead: ${interestLabel}

Name: ${data.name}
Email: ${data.email}
${data.company ? `Company: ${data.company}\n` : ""}${data.phone ? `Phone: ${data.phone}\n` : ""}
Interest: ${interestLabel}
${projectLabel ? `Project Type: ${projectLabel}\n` : ""}${budgetLabel ? `Budget: ${budgetLabel}\n` : ""}${timelineLabel ? `Timeline: ${timelineLabel}\n` : ""}
Message:
${data.message}

Firestore ID: ${data.docId}
Submitted: ${new Date().toISOString()}`;

  try {
    const response = await resend.emails.send({
      from: getFromEmail(),
      to: OWNER_EMAIL,
      subject: `${interestLabel}: ${data.name}${data.company ? ` (${data.company})` : ""}${budgetLabel ? ` - ${budgetLabel}` : ""}`,
      html,
      text,
      replyTo: data.email,
      tags: [
        { name: "type", value: "enhanced-lead-notification" },
        { name: "interest", value: data.interest },
        ...(data.budget ? [{ name: "budget", value: data.budget }] : []),
      ],
    });
    return response.data?.id ?? null;
  } catch (error) {
    console.error("Failed to send enhanced lead notification:", error);
    return null;
  }
}
