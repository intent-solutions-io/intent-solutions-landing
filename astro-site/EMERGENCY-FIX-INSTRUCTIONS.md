# 🚨 EMERGENCY FIX INSTRUCTIONS
## Survey Email & Thank You Page - October 9, 2025

**Status**: FIXES APPLIED - READY FOR TESTING & DEPLOYMENT

---

## What Was Fixed

### ✅ 1. Netlify Functions Configuration (netlify.toml)
- **Problem**: Functions directory not configured
- **Fix**: Added `functions = "netlify/functions"` to build config
- **Result**: Netlify will now recognize and deploy your email functions

### ✅ 2. Test Page Created (test-submit.astro)
- **Location**: `/survey/test-submit`
- **Purpose**: Quickly test form submission without filling 76 questions
- **Note**: Pre-filled with test data for rapid testing

### ✅ 3. Thank You Page Already Perfect
- **Location**: `/survey/thank-you`
- **Status**: Already exists with excellent HUSTLE branding
- **No changes needed**: Page is professional and complete

---

## CRITICAL: Netlify Dashboard Setup Required

### Step 1: Set Environment Variables

**Go to**: Netlify Dashboard → Site Settings → Environment Variables

Add these variables:

```
RESEND_API_KEY=re_xxxxxxxxxxxxx
RESEND_FROM_EMAIL=thankyou@intentsolutions.io
```

**Where to get RESEND_API_KEY:**
1. Log into https://resend.com
2. Go to API Keys
3. Create new API key or copy existing one
4. Add to Netlify (as shown above)

### Step 2: Configure Netlify Form Notification (WEBHOOK METHOD)

**Go to**: Netlify Dashboard → Site Settings → Forms → Form notifications

Click "Add notification" → Choose "Outgoing webhook"

Configure:
- **Event**: New form submission
- **Form**: hustle-survey
- **Webhook URL**: `https://YOUR-SITE.netlify.app/.netlify/functions/submission-created`
- **Format**: JSON

This tells Netlify to POST form data to your email function automatically.

---

## Local Testing Instructions

### 1. Start Netlify Dev

```bash
cd /home/jeremy/projects/intent-solutions-landing/astro-site

# Start Netlify development server (simulates production)
netlify dev
```

This will start at `http://localhost:8888` (or another port - check terminal output)

### 2. Test the Thank You Page Directly

```bash
# With netlify dev running, open browser to:
http://localhost:8888/survey/thank-you
```

**Verify:**
- ✓ Page loads (not 404)
- ✓ HUSTLE branding displays
- ✓ Personal message from Jeremy shows
- ✓ Links work
- ✓ Styling is correct

### 3. Test Form Submission

```bash
# Open browser to test page:
http://localhost:8888/survey/test-submit
```

**Before submitting:**
1. Open DevTools (F12)
2. Go to Network tab
3. Check "Preserve log"
4. Change email to YOUR real email address

**Submit form and verify:**
- ✓ Network tab shows POST request
- ✓ Browser redirects to /survey/thank-you
- ✓ Thank you page displays correctly
- ✓ No console errors

**Check email (within 2 minutes):**
- ✓ Email arrives in inbox
- ✓ Subject: "Thank You for Your Survey Response - HUSTLE™"
- ✓ Personalized content displays
- ✓ From: HUSTLE <thankyou@intentsolutions.io>

### 4. Troubleshooting Local Test

**If email doesn't arrive:**
```bash
# Check Netlify Dev console output
# Look for error messages from the function
```

**If function doesn't trigger:**
- Ensure RESEND_API_KEY is in `.env` file locally
- Create `.env` file if it doesn't exist:
  ```
  RESEND_API_KEY=re_xxxxxxxxxxxxx
  RESEND_FROM_EMAIL=thankyou@intentsolutions.io
  ```

---

## Deployment Instructions

### Quick Deploy (Recommended)

```bash
cd /home/jeremy/projects/intent-solutions-landing

# Stage all changes
git add .

# Commit with descriptive message
git commit -m "fix: enable Netlify Functions for survey email notifications

- Added functions config to netlify.toml
- Created test-submit page for rapid testing
- Documented emergency fix instructions
- Fixed email notification trigger

CRITICAL: Set RESEND_API_KEY in Netlify dashboard before deploy"

# Push to trigger auto-deploy
git push origin main
```

### Manual Deploy (Alternative)

```bash
cd astro-site
netlify deploy --prod
```

---

## Post-Deployment Verification

### 1. Check Netlify Deploy Status

**Go to**: Netlify Dashboard → Deploys

**Verify:**
- ✓ Deploy succeeded
- ✓ No build errors
- ✓ Functions were deployed (check Functions tab)

### 2. Production Test

**IMPORTANT:** Use a real email you can check!

```bash
# Open in browser:
https://intentsolutions.io/survey/test-submit

# Change email field to your real email
# Submit form

# Verify:
✓ Redirects to https://intentsolutions.io/survey/thank-you
✓ Thank you page displays correctly
✓ Email arrives within 5 minutes
```

### 3. Check Netlify Forms Dashboard

**Go to**: Netlify Dashboard → Forms → hustle-survey

**Verify:**
- ✓ New submission appears
- ✓ Email field captured
- ✓ All form data saved
- ✓ Can export submissions as CSV

### 4. Check Function Logs

**Go to**: Netlify Dashboard → Functions → submission-created → Recent invocations

**Look for:**
- ✓ Function was triggered
- ✓ No error messages
- ✓ "Thank you email sent" log appears

**If errors:**
- Check RESEND_API_KEY is set correctly
- Verify Resend account is active
- Check function logs for specific error messages

---

## Verify Original 3 Submissions

### Check Existing Data

**Go to**: Netlify Dashboard → Forms → hustle-survey

**Questions to answer:**

1. **How many submissions show?**
   - Expected: At least 3 (from October 9)
   - Location: Forms tab shows submission count

2. **Can you view submission data?**
   - Click into each submission
   - Verify all questions were captured
   - Check email addresses are present

3. **Export submissions**
   ```bash
   # In Netlify Forms, click "Export" button
   # Save as: survey-submissions-backup-2025-10-09.csv
   # Store safely in case of any issues
   ```

### If Submissions Are Missing

**DON'T PANIC** - Check these:

1. **Different form name?**
   - Check if submissions are under different form name
   - Look for variations like "survey", "hustle", etc.

2. **Spam folder?**
   - Netlify occasionally flags submissions as spam
   - Check Forms → Spam tab

3. **Different site?**
   - Verify you're looking at correct Netlify site
   - Check site name matches intentsolutions.io

---

## Email the 3 Original Users

**AFTER you verify emails work in production:**

### Option 1: Manual Emails

Send personal email to each of the 3 users:

```
Subject: Your HUSTLE Survey - Thank You & Update

Hi [First Name],

I wanted to personally reach out about the HUSTLE survey you completed on October 9th.

First - THANK YOU for taking the time. Your feedback is incredibly valuable.

Second - I need to apologize. Due to a technical issue with our email system, you didn't receive the thank you email you should have gotten immediately after completing the survey.

The good news:
✓ Your survey responses were saved and are safe
✓ You're still on the list for beta testing + 1 year free access
✓ The issue has been fixed for future submissions

I wanted to make sure you knew we received your responses and truly appreciate your input.

If you indicated interest in beta testing, you'll hear from me personally when we're ready to launch.

Thank you again for your time and feedback!

Jeremy Longshore
Founder, HUSTLE™
jeremy@intentsolutions.io
https://intentsolutions.io
```

### Option 2: Resend Via Function

**Create a script to manually trigger emails:**

```bash
# This would require creating a separate admin function
# to manually trigger emails for specific submissions
# (Recommended if more than 3 users affected)
```

---

## Cleanup After Testing

### Delete Test Page

**CRITICAL:** Remove test page before announcing to public

```bash
rm /home/jeremy/projects/intent-solutions-landing/astro-site/src/pages/survey/test-submit.astro

git add .
git commit -m "cleanup: remove test-submit page"
git push origin main
```

---

## Success Checklist

Mark each as complete:

- [ ] Environment variables set in Netlify dashboard
- [ ] Webhook notification configured in Netlify
- [ ] Local test completed successfully
- [ ] Local test email received
- [ ] Changes committed to git
- [ ] Pushed to main branch (auto-deploy triggered)
- [ ] Deploy succeeded in Netlify
- [ ] Functions deployed successfully
- [ ] Production test completed
- [ ] Production test email received
- [ ] Original 3 submissions verified in dashboard
- [ ] Original 3 users contacted personally
- [ ] Test page deleted from production
- [ ] Monitoring set up for future submissions

---

## Monitoring Going Forward

### Daily Checks (First Week)

**Go to**: Netlify Dashboard → Forms → hustle-survey

**Check:**
- New submissions appear
- Function logs show successful email sends
- No error messages in logs

### Weekly Checks (Ongoing)

- Export submission data weekly
- Review any error logs
- Monitor Resend email delivery rates
- Check spam folder for legitimate submissions

---

## Contact Information

**Issues during testing?**
- Check Netlify function logs first
- Check Resend dashboard for email status
- Review this document for troubleshooting steps

**Still stuck?**
- Email: jeremy@intentsolutions.io
- Review Netlify documentation: https://docs.netlify.com/forms/setup/
- Review Resend documentation: https://resend.com/docs

---

**Last Updated**: October 9, 2025
**Status**: ✅ Fixes applied, ready for deployment
**Priority**: CRITICAL - Deploy within 1 hour
