# Survey Form Configuration Analysis

**Date**: 2025-10-09T20:30:00Z
**Project**: intent-solutions-landing.ai.astro-site
**Issue**: Form submissions showing generic thank-you page instead of HUSTLE-branded page

---

## Questions & Answers

### 1. Frontend Stack

**Framework**: Astro 5.14.1 (Static Site Generator)
- **Build Tool**: Vite
- **UI Components**: React 19.2.0 (islands architecture)
- **Styling**: Tailwind CSS 4.1.14
- **Deployment**: Netlify (static HTML output)

**Form Pages**:
- Survey pages 1-15: Pure Astro components (`.astro` files)
- No client-side JavaScript for form handling
- Built to static HTML at deployment time

---

### 2. Form Method

**Implementation**: Native HTML form with Netlify Forms attributes

**Source Code** (`survey/15.astro`):
```html
<form
  name="hustle-survey"
  method="POST"
  data-netlify="true"
  data-netlify-honeypot="bot-field"
  action="/survey/thank-you"
  class="space-y-12"
  id="final-form"
>
  <input type="hidden" name="form-name" value="hustle-survey" />
  <p class="hidden">
    <label>Don't fill this out if you're human: <input name="bot-field" /></label>
  </p>
  <!-- Form fields here -->
</form>
```

**Key Points**:
- ✅ Uses native HTML form submission (no JavaScript fetch)
- ✅ Has `data-netlify="true"` attribute
- ✅ Has honeypot spam protection
- ✅ Has hidden `form-name` input
- ✅ Method is POST
- ✅ Action points to `/survey/thank-you`

**Built HTML** (observed via curl):
- `data-netlify` attribute **stripped during build** (this is NORMAL for Netlify)
- Form still recognized by Netlify Forms system
- Action attribute changed from `/survey/thank-you` to `/thank-you` in deployed version

---

### 3. Email Sending

**Method**: Netlify Functions with Resend API

**Setup**:
1. **Netlify Function**: `netlify/functions/submission-created.js`
   - Triggered on form submission events
   - Uses Resend API to send emails
   - Requires `RESEND_API_KEY` environment variable

2. **Email Service**: Resend (https://resend.com)
   - API Key: Set in Netlify environment variables
   - From Address: `thankyou@intentsolutions.io`
   - Sends personalized HTML emails with HUSTLE branding

3. **Trigger Mechanism**:
   - **NOT CONFIGURED YET** - Webhook missing
   - Need to add outgoing webhook in Netlify dashboard
   - Webhook URL: `https://intentsolutions.io/.netlify/functions/submission-created`

**Current Status**:
- ❌ Function exists but not triggered
- ❌ No webhook configured in Netlify dashboard
- ❌ No emails being sent to users

---

### 4. Redirect Setup

**Configuration**: Using `netlify.toml` in project root

**Current Redirects**:
```toml
# HTTP to HTTPS redirects
[[redirects]]
  from = "http://intentsolutions.io/*"
  to = "https://intentsolutions.io/:splat"
  status = 301
  force = true

# www to non-www redirects
[[redirects]]
  from = "https://www.intentsolutions.io/*"
  to = "https://intentsolutions.io/:splat"
  status = 301
  force = true

# Survey thank-you page exception (ADDED IN LATEST FIX)
[[redirects]]
  from = "/survey/thank-you"
  to = "/survey/thank-you"
  status = 200
  force = false

# SPA catch-all redirect (PROBLEMATIC)
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**Issue Identified**:
- Catch-all redirect `/*` → `/index.html` intercepts form success redirects
- Exception rule added but may not be working as expected
- Status 200 is a **rewrite**, not a redirect (keeps URL but serves different content)

**No `_redirects` file** - all redirects in `netlify.toml`

---

### 5. Form Configuration Details

**Form Name**: `hustle-survey`

**Critical Attributes**:
- `name="hustle-survey"` ✅ Present
- `method="POST"` ✅ Present
- `data-netlify="true"` ✅ Present in source (stripped in build - NORMAL)
- `data-netlify-honeypot="bot-field"` ✅ Present
- `action="/survey/thank-you"` ⚠️ Changed to `/thank-you` in deployed build

**Hidden Fields**:
- `form-name` hidden input ✅ Present
- `bot-field` honeypot ✅ Present

**Form Fields** (76 questions total across 15 pages):
- Email, firstName, lastName, phone
- 70+ survey questions about youth sports
- Beta testing interest
- All fields use proper `name` attributes

**Data Being Captured**:
- ❌ **ONLY METADATA** being saved (IP, user agent, referrer, timestamp)
- ❌ **NO FORM FIELD DATA** being saved (email, firstName, etc.)
- This indicates form is not properly recognized by Netlify Forms

---

### 6. Error Behavior

**Current Observed Behavior** (per user report):

1. **Form Submission**:
   - User fills out survey at `/survey/15`
   - Clicks submit button
   - Form processes

2. **Redirect Behavior**:
   - Browser navigates to a thank-you page
   - **Unclear**: URL bar shows `/survey/thank-you` or `/thank-you`?
   - **Unclear**: Actual page content displayed?

3. **Page Display**:
   - User sees "generic thank-you page"
   - Not seeing HUSTLE-branded content
   - Page appears to be the wrong one

4. **Data Capture**:
   - Netlify Forms dashboard shows submission
   - **Only metadata** captured (IP, user agent, referrer)
   - **No actual form data** (email, firstName, answers)

5. **Email Delivery**:
   - ❌ No emails sent to users
   - Function exists but not triggered
   - No webhook configured

**No Error Messages Reported**:
- Form doesn't show error page
- No 404 errors
- No console errors mentioned
- Submission appears to "work" but data incomplete

---

## Critical Issues Identified

### Issue #1: Form Data Not Being Captured
**Symptom**: Only metadata (IP, user agent) saved, no field data
**Likely Cause**: Netlify Forms not recognizing the form properly during build
**Impact**: All survey responses are being lost!

### Issue #2: Wrong Thank-You Page Displayed
**Symptom**: Generic `/thank-you` page shown instead of `/survey/thank-you`
**Likely Cause**: Form action being modified during build OR catch-all redirect
**Impact**: Poor user experience, confusion

### Issue #3: No Email Notifications
**Symptom**: Users receive no confirmation emails
**Likely Cause**: Webhook not configured to trigger email function
**Impact**: Users don't know if submission was received

---

## Next Steps Required

1. **Verify URL after submission**
   - User needs to report exact URL in browser bar after clicking submit
   - Is it `/survey/thank-you` or `/thank-you`?

2. **Check built HTML action attribute**
   - Confirm why action changes from `/survey/thank-you` to `/thank-you` during build
   - May be Astro configuration or Netlify processing

3. **Fix form data capture**
   - Most critical issue - losing all survey responses
   - May need to configure Netlify Forms detection differently
   - Possibly add form to `netlify.toml` explicitly

4. **Configure webhook**
   - Add outgoing webhook in Netlify dashboard
   - Point to: `/.netlify/functions/submission-created`
   - Enable email notifications

---

**Status**: Awaiting user confirmation of exact redirect behavior
