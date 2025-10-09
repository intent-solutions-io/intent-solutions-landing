# Test Plan: Survey Thank-You Page Redirect Fix

**Date**: 2025-10-09T19:55:00Z
**Project**: intent-solutions-landing.ai.astro-site
**Taskwarrior Task**: 67
**Commit**: 04af1df

---

## Root Cause Summary

Catch-all redirect `/*` to `/index.html` in `/netlify.toml` was intercepting Netlify Forms success redirects. Forms with `action="/survey/thank-you"` were being caught by the catch-all and redirected to `/index.html`, which showed the generic `/thank-you` page instead.

## Fix Applied

Added explicit redirect rule for `/survey/thank-you` BEFORE the catch-all rule in `/netlify.toml`:

```toml
# Allow Netlify Forms to redirect to survey thank-you page
[[redirects]]
  from = "/survey/thank-you"
  to = "/survey/thank-you"
  status = 200
  force = false

# SPA catch-all (must be AFTER specific redirects)
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## Test Cases

### Positive Test 1: Form Submission Redirects Correctly

**Input:**
1. Navigate to: `https://intentsolutions.io/survey/test-submit`
2. Fill form with test data
3. Submit form

**Expected Output:**
- Browser redirects to: `https://intentsolutions.io/survey/thank-you`
- Page shows FULL HUSTLE branding (dark theme, personal letter from Jeremy)
- NOT the generic light-themed thank-you page
- Page title: "Thank You! - Hustle Survey"

**Acceptance Criteria:**
- ✅ URL is `/survey/thank-you` (not `/thank-you`)
- ✅ Page has dark zinc-900 background
- ✅ Contains personal letter about HUSTLE
- ✅ Contains "What Happens Next" section
- ✅ Has share buttons (text/email)

---

### Positive Test 2: Direct Navigation Works

**Input:**
Navigate directly to: `https://intentsolutions.io/survey/thank-you`

**Expected Output:**
- Page loads without redirecting elsewhere
- Shows full HUSTLE-branded thank-you page

**Acceptance Criteria:**
- ✅ URL stays at `/survey/thank-you`
- ✅ No redirect to `/thank-you` or `/index.html`
- ✅ Full content visible

---

### Negative Test 1: Generic Thank-You Still Accessible

**Input:**
Navigate to: `https://intentsolutions.io/thank-you`

**Expected Output:**
- Shows generic thank-you page (light theme, shorter content)
- Does NOT redirect to `/survey/thank-you`

**Acceptance Criteria:**
- ✅ URL is `/thank-you`
- ✅ Shows generic page (NOT survey-specific page)
- ✅ Both pages can coexist independently

---

### Negative Test 2: SPA Routes Still Work

**Input:**
Navigate to any React app route (e.g., `/about`, `/contact`)

**Expected Output:**
- Routes load correctly via React Router
- Catch-all redirect still functions for SPA routes

**Acceptance Criteria:**
- ✅ SPA routing not broken by new redirect rule
- ✅ 404s still handled by React app

---

## Rollback Plan

If tests fail:

```bash
cd /home/jeremy/projects/intent-solutions-landing
git revert 04af1df
git push origin main
```

This will remove the redirect exception and restore previous behavior.

---

## Test Execution Log

**To be filled after deploy completes:**

- [ ] Deploy completed at: ________________
- [ ] Positive Test 1 executed at: ________________
- [ ] Positive Test 1 result: PASS / FAIL
- [ ] Positive Test 2 executed at: ________________
- [ ] Positive Test 2 result: PASS / FAIL
- [ ] Negative Test 1 executed at: ________________
- [ ] Negative Test 1 result: PASS / FAIL
- [ ] Negative Test 2 executed at: ________________
- [ ] Negative Test 2 result: PASS / FAIL

---

## Evidence Required

- Screenshot or text dump of `/survey/thank-you` page
- Screenshot or text dump of `/thank-you` page (to show they're different)
- Browser dev tools Network tab showing 200 response (not redirect loop)
- Confirmation that form submission works end-to-end

---

**Status**: Awaiting deploy completion
**Next**: Execute tests and collect evidence
