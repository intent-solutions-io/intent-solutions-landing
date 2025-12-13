// Netlify Function triggered on form submission
// This runs automatically when a Netlify Form is submitted
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Owner email for notifications
const OWNER_EMAIL = 'jeremy@intentsolutions.io';

export const handler = async (event) => {
  // This function is triggered by Netlify's "submission-created" event

  try {
    // Parse the Netlify form submission event
    const submission = JSON.parse(event.body);

    // Netlify sends form data in submission.payload.data (with fallbacks)
    const formData = submission?.payload?.data ?? submission?.data ?? {};
    const formName = formData?.["form-name"] || "unknown";

    // Extract Netlify request ID for tracing
    const netlifyReqId = event.headers?.["x-nf-request-id"] || "unknown";

    // Comprehensive logging
    console.log(JSON.stringify({
      event: "form_submission_received",
      netlify_request_id: netlifyReqId,
      form_name: formName,
      has_email: !!formData?.email,
      field_count: Object.keys(formData).length,
      timestamp: new Date().toISOString()
    }));

    // Handle partner-inquiry form - notify owner
    if (formName === 'partner-inquiry') {
      return await handlePartnerInquiry(formData, netlifyReqId);
    }

    // Handle HUSTLE survey forms - send thank you to user
    const userEmail = formData?.email || process.env.RESEND_TO_FALLBACK;
    const userName = userEmail ? userEmail.split('@')[0] : 'there';

    if (!userEmail) {
      console.log(JSON.stringify({
        event: "no_recipient",
        netlify_request_id: netlifyReqId,
        message: "No email in submission and no fallback configured"
      }));
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'No email to send to' })
      };
    }

    console.log(JSON.stringify({
      event: "processing_email",
      to: userEmail,
      netlify_request_id: netlifyReqId
    }));

    // Your personalized thank you email content
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
      background: linear-gradient(135deg, #52525b 0%, #27272a 100%);
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
    .footer {
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #e4e4e7;
      font-size: 14px;
      color: #71717a;
      font-style: italic;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1 style="margin: 0;">Thank You!</h1>
  </div>

  <div class="content">
    <p>Hi ${userName},</p>

    <p>Thank you for taking the time to complete our survey. I know how busy life gets when you're juggling work, family, and those never-ending sports schedules - so I genuinely appreciate you spending 10 minutes with us.</p>

    <h2>Let me tell you why I'm building this:</h2>

    <p>I spent 20+ years in the restaurant business, then ran a trucking company for about 5 years before making what seemed like a crazy pivot - diving into AI and technology. People thought I'd lost it. But here's the thing: I've always been drawn to solving real problems for real people.</p>

    <p>Recently, I got accepted into the Google Cloud Startup Program (still feels surreal to say that). But more importantly, I live, eat, and breathe soccer now. And suddenly, all those years of building systems, managing operations, and leveraging technology clicked into place with a new purpose.</p>

    <p><strong>We spend ridiculous amounts of money, time, and energy on our kids' sports.</strong> Tournament fees, travel expenses, private training, equipment - it adds up fast. But here's what drives me crazy: when it comes time for college recruitment, most of us are scrambling through our phones trying to remember stats from games 2 years ago, or hunting down coaches who've long since moved on.</p>

    <p>Our kids' efforts deserve better than that. Every goal, every assist, every improvement should be documented, tracked, and ready to submit when it matters most.</p>

    <p><strong>That's why I'm building HUSTLE™.</strong></p>

    <p>Not as some fancy tech company looking to make millions (though I wouldn't complain 😄). But as a parent-first solution, built by someone who's been in the trenches - whether that's running a kitchen during a Friday night rush, managing a fleet of trucks, or now, trying to remember which tournament had that incredible save my kid made.</p>

    <p>Your survey responses are going to directly shape this app. I'm reading every single one, and I'll be reaching out to beta testers. If you indicated interest in testing, you'll hear from me personally.</p>

    <div class="footer">
      <p>Fair warning: while I'm over here talking about building apps and systems, my wife Mandy is the one who actually keeps our family (and this whole operation) running. She's the real MVP - I just get to play with code and pretend I'm busy. 😊</p>
    </div>

    <p style="margin-top: 30px;">
      <strong>Jeremy Longshore</strong><br>
      Founder, HUSTLE™<br>
      <a href="https://intentsolutions.io">intentsolutions.io</a>
    </p>
  </div>
</body>
</html>
    `;

    const emailText = `
Hi ${userName},

Thank you for taking the time to complete our survey. I know how busy life gets when you're juggling work, family, and those never-ending sports schedules - so I genuinely appreciate you spending 10 minutes with us.

Let me tell you why I'm building this:

I spent 20+ years in the restaurant business, then ran a trucking company for about 5 years before making what seemed like a crazy pivot - diving into AI and technology. People thought I'd lost it. But here's the thing: I've always been drawn to solving real problems for real people.

Recently, I got accepted into the Google Cloud Startup Program (still feels surreal to say that). But more importantly, I live, eat, and breathe soccer now. And suddenly, all those years of building systems, managing operations, and leveraging technology clicked into place with a new purpose.

We spend ridiculous amounts of money, time, and energy on our kids' sports. Tournament fees, travel expenses, private training, equipment - it adds up fast. But here's what drives me crazy: when it comes time for college recruitment, most of us are scrambling through our phones trying to remember stats from games 2 years ago, or hunting down coaches who've long since moved on.

Our kids' efforts deserve better than that. Every goal, every assist, every improvement should be documented, tracked, and ready to submit when it matters most.

That's why I'm building HUSTLE™.

Not as some fancy tech company looking to make millions (though I wouldn't complain 😄). But as a parent-first solution, built by someone who's been in the trenches - whether that's running a kitchen during a Friday night rush, managing a fleet of trucks, or now, trying to remember which tournament had that incredible save my kid made.

Your survey responses are going to directly shape this app. I'm reading every single one, and I'll be reaching out to beta testers. If you indicated interest in testing, you'll hear from me personally.

Fair warning: while I'm over here talking about building apps and systems, my wife Mandy is the one who actually keeps our family (and this whole operation) running. She's the real MVP - I just get to play with code and pretend I'm busy. 😊

Jeremy Longshore
Founder, HUSTLE™
https://intentsolutions.io
    `;

    // Send email via Resend
    const emailResponse = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'HUSTLE <thankyou@intentsolutions.io>',
      to: userEmail,
      subject: 'Thank You for Your Survey Response - HUSTLE™',
      html: emailHtml,
      text: emailText,
      tags: [
        { name: 'campaign', value: 'survey-thank-you' },
        { name: 'type', value: 'transactional' }
      ]
    });

    // Structured logging for monitoring
    console.log(JSON.stringify({
      event: "email_sent",
      to: userEmail,
      messageId: emailResponse.id,
      netlify: { reqId: netlifyReqId },
      timestamp: new Date().toISOString()
    }));

    // Send notification to Slack if configured
    if (process.env.SLACK_WEBHOOK_URL) {
      try {
        await fetch(process.env.SLACK_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text: `✅ Survey submission received → ${userEmail}`,
            blocks: [
              {
                type: "section",
                text: {
                  type: "mrkdwn",
                  text: `*Survey Submission*\n• Email: ${userEmail}\n• Message ID: ${emailResponse.id}\n• Time: ${new Date().toISOString()}`
                }
              }
            ]
          })
        });
      } catch (slackError) {
        console.log(JSON.stringify({
          event: "slack_notification_failed",
          error: slackError.message
        }));
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: 'Thank you email sent',
        emailId: emailResponse.id
      })
    };

  } catch (error) {
    console.error('Error sending thank you email:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Failed to send email',
        message: error.message
      })
    };
  }
};

// Handle partner inquiry form - sends notification to owner
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
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
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
    .message-box {
      background: white;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      padding: 16px;
      margin-top: 8px;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1 style="margin: 0; font-size: 20px;">New Partner Inquiry</h1>
  </div>
  <div class="content">
    <div class="field">
      <div class="label">Company</div>
      <div class="value">${companyName}</div>
    </div>
    <div class="field">
      <div class="label">Contact Name</div>
      <div class="value">${contactName}</div>
    </div>
    <div class="field">
      <div class="label">Email</div>
      <div class="value"><a href="mailto:${email}">${email}</a></div>
    </div>
    <div class="field">
      <div class="label">Interest</div>
      <div class="value">${interestLabels[interest] || interest}</div>
    </div>
    <div class="field">
      <div class="label">Message</div>
      <div class="message-box">${message}</div>
    </div>
    <p style="font-size: 12px; color: #94a3b8; margin-top: 24px;">
      Submitted: ${new Date().toISOString()}
    </p>
  </div>
</body>
</html>
  `;

  const emailText = `
New Partner Inquiry

Company: ${companyName}
Contact: ${contactName}
Email: ${email}
Interest: ${interestLabels[interest] || interest}

Message:
${message}

Submitted: ${new Date().toISOString()}
  `;

  try {
    const emailResponse = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'Intent Solutions <notifications@intentsolutions.io>',
      to: OWNER_EMAIL,
      subject: `Partner Inquiry: ${companyName} - ${contactName}`,
      html: emailHtml,
      text: emailText,
      replyTo: email,
      tags: [
        { name: 'type', value: 'partner-inquiry' }
      ]
    });

    console.log(JSON.stringify({
      event: "partner_inquiry_notification_sent",
      to: OWNER_EMAIL,
      from_email: email,
      company: companyName,
      messageId: emailResponse.id,
      netlify_request_id: netlifyReqId,
      timestamp: new Date().toISOString()
    }));

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: 'Partner inquiry notification sent',
        emailId: emailResponse.id
      })
    };
  } catch (error) {
    console.error('Error sending partner inquiry notification:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Failed to send notification',
        message: error.message
      })
    };
  }
}
