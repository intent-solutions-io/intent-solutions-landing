// Netlify Function triggered on form submission
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const OWNER_EMAIL = 'jeremy@intentsolutions.io';

export const handler = async (event) => {
  try {
    const submission = JSON.parse(event.body);
    const formData = submission?.payload?.data ?? submission?.data ?? {};
    const formName = formData?.["form-name"] || "unknown";
    const netlifyReqId = event.headers?.["x-nf-request-id"] || "unknown";

    console.log(JSON.stringify({
      event: "form_submission_received",
      netlify_request_id: netlifyReqId,
      form_name: formName,
      timestamp: new Date().toISOString()
    }));

    // Handle Claude Code Systems contact form
    if (formName === 'contact') {
      return await handleContactForm(formData, netlifyReqId);
    }

    // Handle partner inquiry form
    if (formName === 'partner-inquiry') {
      return await handlePartnerInquiry(formData, netlifyReqId);
    }

    // Unknown form - just log it
    console.log(JSON.stringify({
      event: "unknown_form",
      form_name: formName,
      netlify_request_id: netlifyReqId
    }));

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Form received but no handler configured' })
    };

  } catch (error) {
    console.error('Error processing form:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to process form', message: error.message })
    };
  }
};

// Handle Claude Code Systems contact form
async function handleContactForm(formData, netlifyReqId) {
  const email = formData.email || '';
  const teamSize = formData.teamSize || 'Not specified';
  const discord = formData.discord || '';
  const whatsapp = formData.whatsapp || '';
  const phone = formData.phone || '';
  const linkedin = formData.linkedin || '';
  const xHandle = formData.xHandle || '';
  const businessName = formData.businessName || '';

  const teamSizeLabels = {
    'solo': 'Solo Developer',
    'small-team': 'Small Team',
    'department': 'Department',
    'enterprise': 'Enterprise'
  };

  // Build contact methods list
  const contactMethods = [];
  if (discord) contactMethods.push(`Discord: ${discord}`);
  if (whatsapp) contactMethods.push(`WhatsApp: ${whatsapp}`);
  if (phone) contactMethods.push(`Phone: ${phone}`);
  if (linkedin) contactMethods.push(`LinkedIn: ${linkedin}`);
  if (xHandle) contactMethods.push(`X/Twitter: ${xHandle}`);

  // 1. Send thank you email to the lead
  if (email) {
    await sendThankYouEmail(email, teamSizeLabels[teamSize] || teamSize);
  }

  // 2. Send notification to Jeremy
  await sendLeadNotification({
    email,
    teamSize: teamSizeLabels[teamSize] || teamSize,
    contactMethods,
    businessName,
    netlifyReqId
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true, message: 'Contact form processed' })
  };
}

// Send thank you email to the person who submitted
async function sendThankYouEmail(email, teamSize) {
  const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background: linear-gradient(135deg, #27272a 0%, #18181b 100%);
      color: white;
      padding: 30px;
      text-align: center;
      border-radius: 8px 8px 0 0;
    }
    .content {
      background: #f4f4f5;
      padding: 30px;
      border-radius: 0 0 8px 8px;
    }
    .highlight {
      background: #27272a;
      color: #fafafa;
      padding: 20px;
      border-radius: 6px;
      margin: 20px 0;
    }
    a {
      color: #3b82f6;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1 style="margin: 0; font-size: 24px;">Thanks for reaching out!</h1>
    <p style="margin: 10px 0 0 0; opacity: 0.9;">Claude Code Systems</p>
  </div>

  <div class="content">
    <p>Hey there,</p>

    <p>I got your message and I'm excited to connect. I'll be in touch within one business day to discuss your ${teamSize} Claude Code setup.</p>

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
</html>
  `;

  const emailText = `
Thanks for reaching out!

Hey there,

I got your message and I'm excited to connect. I'll be in touch within one business day to discuss your ${teamSize} Claude Code setup.

What happens next:
I'll reach out via your preferred contact method to schedule a quick call. We'll talk through your team's needs and I'll recommend the right tier for you.

In the meantime, feel free to explore the 258+ plugins available at https://claudecodeplugins.io

If you have any questions before we connect, just reply to this email.

Jeremy Longshore
Claude Code Specialist
https://intentsolutions.io
  `;

  try {
    const response = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'Jeremy <jeremy@intentsolutions.io>',
      to: email,
      subject: 'Thanks for reaching out - Claude Code Systems',
      html: emailHtml,
      text: emailText,
      tags: [
        { name: 'type', value: 'contact-thank-you' },
        { name: 'campaign', value: 'claude-code-systems' }
      ]
    });

    console.log(JSON.stringify({
      event: "thank_you_email_sent",
      to: email,
      messageId: response.id,
      timestamp: new Date().toISOString()
    }));
  } catch (error) {
    console.error('Failed to send thank you email:', error);
  }
}

// Send lead notification to Jeremy
async function sendLeadNotification({ email, teamSize, contactMethods, businessName, netlifyReqId }) {
  const contactList = contactMethods.length > 0
    ? contactMethods.map(m => `• ${m}`).join('\n')
    : '• None provided';

  const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
      color: white;
      padding: 20px;
      border-radius: 8px 8px 0 0;
    }
    .content {
      background: #f8fafc;
      padding: 24px;
      border-radius: 0 0 8px 8px;
      border: 1px solid #e2e8f0;
      border-top: none;
    }
    .field {
      margin-bottom: 16px;
    }
    .label {
      font-size: 12px;
      text-transform: uppercase;
      color: #64748b;
      margin-bottom: 4px;
    }
    .value {
      font-size: 16px;
      color: #1e293b;
    }
    .contact-box {
      background: white;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      padding: 16px;
      margin-top: 8px;
      white-space: pre-line;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1 style="margin: 0; font-size: 20px;">New Claude Code Lead</h1>
  </div>
  <div class="content">
    <div class="field">
      <div class="label">Team Size</div>
      <div class="value" style="font-weight: 600; font-size: 18px;">${teamSize}</div>
    </div>
    <div class="field">
      <div class="label">Email</div>
      <div class="value"><a href="mailto:${email}">${email}</a></div>
    </div>
    ${businessName ? `
    <div class="field">
      <div class="label">Business</div>
      <div class="value">${businessName}</div>
    </div>
    ` : ''}
    <div class="field">
      <div class="label">Contact Methods</div>
      <div class="contact-box">${contactMethods.join('<br>') || 'None provided'}</div>
    </div>
    <p style="font-size: 12px; color: #94a3b8; margin-top: 24px;">
      Submitted: ${new Date().toISOString()}<br>
      Request ID: ${netlifyReqId}
    </p>
  </div>
</body>
</html>
  `;

  const emailText = `
New Claude Code Lead

Team Size: ${teamSize}
Email: ${email}
${businessName ? `Business: ${businessName}\n` : ''}
Contact Methods:
${contactList}

Submitted: ${new Date().toISOString()}
  `;

  try {
    const response = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'Intent Solutions <notifications@intentsolutions.io>',
      to: OWNER_EMAIL,
      subject: `Claude Code Lead: ${teamSize}${businessName ? ` - ${businessName}` : ''}`,
      html: emailHtml,
      text: emailText,
      replyTo: email,
      tags: [
        { name: 'type', value: 'lead-notification' },
        { name: 'tier', value: teamSize.toLowerCase().replace(/\s+/g, '-') }
      ]
    });

    console.log(JSON.stringify({
      event: "lead_notification_sent",
      to: OWNER_EMAIL,
      lead_email: email,
      team_size: teamSize,
      messageId: response.id,
      timestamp: new Date().toISOString()
    }));
  } catch (error) {
    console.error('Failed to send lead notification:', error);
  }
}

// Handle partner inquiry form
async function handlePartnerInquiry(formData, netlifyReqId) {
  const companyName = formData['company-name'] || 'Not provided';
  const contactName = formData['contact-name'] || 'Not provided';
  const email = formData.email || 'Not provided';
  const interest = formData.interest || 'Not specified';
  const message = formData.message || 'No message';

  const interestLabels = {
    'exploring': 'Just exploring options',
    'distribution-partner': 'Becoming a distribution partner',
    'direct-client': 'AI solution for their business',
    'learn-more': 'Learning more about services'
  };

  const emailHtml = `
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
    <div class="field"><div class="label">Company</div><div class="value">${companyName}</div></div>
    <div class="field"><div class="label">Contact</div><div class="value">${contactName}</div></div>
    <div class="field"><div class="label">Email</div><div class="value"><a href="mailto:${email}">${email}</a></div></div>
    <div class="field"><div class="label">Interest</div><div class="value">${interestLabels[interest] || interest}</div></div>
    <div class="field"><div class="label">Message</div><div class="message-box">${message}</div></div>
    <p style="font-size: 12px; color: #94a3b8; margin-top: 24px;">Submitted: ${new Date().toISOString()}</p>
  </div>
</body>
</html>
  `;

  try {
    const response = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'Intent Solutions <notifications@intentsolutions.io>',
      to: OWNER_EMAIL,
      subject: `Partner Inquiry: ${companyName} - ${contactName}`,
      html: emailHtml,
      text: `Partner Inquiry\n\nCompany: ${companyName}\nContact: ${contactName}\nEmail: ${email}\nInterest: ${interestLabels[interest] || interest}\n\nMessage:\n${message}`,
      replyTo: email,
      tags: [{ name: 'type', value: 'partner-inquiry' }]
    });

    console.log(JSON.stringify({
      event: "partner_inquiry_sent",
      messageId: response.id,
      timestamp: new Date().toISOString()
    }));

    return { statusCode: 200, body: JSON.stringify({ success: true }) };
  } catch (error) {
    console.error('Failed to send partner inquiry:', error);
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
}
