# Netlify Monitoring Guide
**Last Updated:** 2025-10-06

Step-by-step instructions for checking your HUSTLE survey deployment on Netlify.

---

## How to Check Netlify Deployment Status

### Step 1: Access Netlify Dashboard
1. Open your web browser
2. Go to: https://app.netlify.com
3. Log in with your credentials
4. You'll see your list of sites

### Step 2: Select Your Site
1. Click on **"intent-solutions-landing"** (or whatever your site is named)
2. This opens your site dashboard

### Step 3: Check Deployment Status
1. Look at the top of the page for the status badge:
   - **Green "Published"** = Site is live and working
   - **Yellow "Building"** = Currently deploying
   - **Red "Failed"** = Build failed (see logs)

2. Under **"Production deploys"** section:
   - See list of recent deployments
   - Most recent is at the top
   - Shows commit message and timestamp

### Step 4: View Build Logs
1. Click on the most recent deployment in the list
2. Click **"Deploy log"** button
3. Scroll through the logs to see:
   - `npm install` or `bun install` output
   - `npm run build` or `bun run build` output
   - Any errors (in red)
   - Success messages (in green)

### Step 5: Check Form Submissions
1. From your site dashboard, click **"Forms"** in the left sidebar
2. Click **"hustle-survey"** form
3. See all survey submissions with:
   - Timestamp
   - All 68 questions answered
   - Email addresses of respondents
4. Click individual submissions to see full responses
5. Download submissions as CSV: Click **"Download CSV"** button

### Step 6: View Site Analytics
1. From site dashboard, click **"Analytics"** in left sidebar
2. See:
   - Page views
   - Unique visitors
   - Top pages (should show /survey/* pages)
   - Traffic sources

### Step 7: Check Custom Domain
1. From site dashboard, click **"Domain management"** in left sidebar
2. Verify **intentsolutions.io** shows:
   - **Primary domain** badge
   - **HTTPS** enabled (green lock icon)
   - DNS configured correctly

### Step 8: Test Live Site
1. Open new browser tab
2. Go to: https://intentsolutions.io/survey
3. Click through a few survey sections
4. Verify everything loads correctly
5. Check mobile view: Open developer tools (F12) and toggle device toolbar

---

## Quick Status Checks

### Is My Latest Push Live?
1. Go to Netlify dashboard → Your site
2. Check "Production deploys"
3. Find your commit message in the list
4. If it says **"Published"** with green badge = it's live
5. Usually takes **2-3 minutes** after pushing to GitHub

### How Do I Know If Build Failed?
1. Red **"Failed"** badge on deployment
2. Email notification from Netlify (if enabled)
3. Click deployment → View logs to see error

### Where Are My Survey Responses?
1. Netlify dashboard → Your site
2. Click **"Forms"** in left sidebar
3. Click **"hustle-survey"**
4. All responses are here with timestamps

---

## Common Issues & Solutions

### Build Taking Too Long
- Normal build time: **1-3 minutes**
- If longer than 5 minutes: Check build logs for errors
- Netlify may be experiencing delays (check https://www.netlifystatus.com/)

### Form Not Showing Submissions
- Wait **30 seconds** after submission (Netlify processes forms)
- Refresh the Forms page
- Check spam detection didn't flag it

### Site Not Updating
- Check GitHub push was successful: `git push origin main`
- Verify deployment triggered: Check "Production deploys" list
- Hard refresh browser: `Ctrl + Shift + R` (Windows/Linux) or `Cmd + Shift + R` (Mac)

### SSL Certificate Issues
- Netlify auto-provisions SSL (takes ~1 minute first time)
- If broken lock icon: Go to Domain management → HTTPS → Renew certificate
- DNS propagation can take up to 24 hours for new domains

---

## Email Notifications Setup

### Enable Build Notifications
1. Netlify dashboard → Your site
2. Click **"Site settings"** at top
3. Click **"Build & deploy"** in left sidebar
4. Scroll to **"Deploy notifications"**
5. Click **"Add notification"**
6. Choose:
   - **"Deploy succeeded"** (optional - gets noisy)
   - **"Deploy failed"** (recommended)
   - **"Form submission"** (recommended for survey)
7. Enter your email: jeremy@intentsolutions.io
8. Click **"Save"**

Now you'll get emails when:
- Builds fail (so you can fix immediately)
- Someone submits the survey (real-time notifications)

---

## Mobile Quick Check

### On Your Phone
1. Open browser: https://intentsolutions.io/survey
2. Tap through survey sections
3. Check:
   - Buttons are easy to tap (44px touch targets)
   - Text is readable (16px minimum)
   - Progress bar shows correctly
   - Forms submit successfully

---

## Deployment Checklist

Before presenting to Google:

- [ ] Site is live at https://intentsolutions.io/survey
- [ ] SSL certificate shows green lock icon
- [ ] All 15 survey sections load without errors
- [ ] Form submission redirects to thank-you page
- [ ] Thank-you page shows contact links
- [ ] Forms dashboard shows test submission
- [ ] Mobile view looks good (test on phone)
- [ ] Desktop view looks good
- [ ] No console errors (F12 → Console tab)

---

## Support & Help

### If Something Breaks
1. **Check build logs first** (90% of issues show here)
2. **Email me:** jeremy@intentsolutions.io with:
   - What you were doing
   - Error message (screenshot if possible)
   - Build log URL
3. **Netlify Support:** https://www.netlify.com/support/

### Useful Netlify Docs
- Forms guide: https://docs.netlify.com/forms/setup/
- Deploy guide: https://docs.netlify.com/configure-builds/get-started/
- Custom domains: https://docs.netlify.com/domains-https/custom-domains/

---

**Pro Tip:** Bookmark your Netlify dashboard for quick access during your Google presentation!

🚀 Your HUSTLE survey is live and ready for the Google startup program.
