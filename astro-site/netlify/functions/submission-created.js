// Netlify Function triggered on form submission
// This runs automatically when a Netlify Form is submitted
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const handler = async (event) => {
  // This function is triggered by Netlify's "submission-created" event

  try {
    // Parse the Netlify form submission event
    const submission = JSON.parse(event.body);
    const formData = submission.data;

    // Extract email from submission
    const userEmail = formData.email;
    const userName = userEmail ? userEmail.split('@')[0] : 'there';

    if (!userEmail) {
      console.log('No email provided in submission');
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'No email to send to' })
      };
    }

    console.log(`Processing submission for: ${userEmail}`);

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

    console.log('Thank you email sent:', emailResponse);

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
