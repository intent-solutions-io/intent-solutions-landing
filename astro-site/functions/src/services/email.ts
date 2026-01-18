import { Resend } from "resend";
import { defineSecret } from "firebase-functions/params";

export const resendApiKey = defineSecret("RESEND_API_KEY");
export const resendFromEmail = defineSecret("RESEND_FROM_EMAIL");

function getResend(): Resend {
  return new Resend(resendApiKey.value());
}

function getFromEmail(): string {
  return getFromEmail() || "Jeremy <jeremy@intentsolutions.io>";
}

const OWNER_EMAIL = "jeremy@intentsolutions.io";

const teamSizeLabels: Record<string, string> = {
  solo: "Solo Developer",
  "small-team": "Small Team",
  department: "Department",
  enterprise: "Enterprise",
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
