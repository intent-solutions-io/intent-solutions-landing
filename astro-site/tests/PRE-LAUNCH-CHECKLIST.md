# Pre-Launch Testing Checklist
**HUSTLE Survey - Netlify Forms Integration**

---

## 📋 CRITICAL: Complete Before Sending Survey

### Phase 1: Automated Tests

```bash
# Run complete test suite
npm test

# Expected: All tests PASS
```

**Test Results:**

- [ ] ✅ TEST 001: Form loads with correct Netlify attributes
- [ ] ✅ TEST 002: Submit valid form and verify submission
- [ ] ✅ TEST 003: Network monitoring and error logging
- [ ] ✅ TEST 004: Form validation
- [ ] ✅ TEST 005: Special characters handling
- [ ] ✅ TEST 006: Mobile viewport
- [ ] ✅ TEST 007: Rapid successive submissions
- [ ] ✅ TEST 008: Browser console verification

**Record Submission IDs:**
```
Test 002 Submission ID: _______________________
Test 005 Submission ID: _______________________
Test 007 Submission IDs:
  1. _______________________
  2. _______________________
  3. _______________________
```

---

### Phase 2: Manual Netlify Dashboard Verification

**Go to: https://app.netlify.com**

- [ ] Log into Netlify dashboard
- [ ] Navigate to your site
- [ ] Click "Forms" in the sidebar
- [ ] Verify "hustle-survey" form appears

**Record:**
- Form Name: _______________________
- Total Submissions: _______________________
- Form Detection Status: ☐ Active ☐ Inactive

**Screenshot:** Take screenshot of dashboard (save to tests/screenshots/)

---

### Phase 3: Email Notification Verification

**Critical: This must work for you to receive survey responses**

- [ ] Go to Forms > hustle-survey > Settings > Form notifications
- [ ] Verify email notification is configured
- [ ] Record notification email: _______________________
- [ ] Click "Test notification" (if available)
- [ ] OR submit test form with YOUR email
- [ ] Check inbox within 2 minutes

**Email Verification:**
- [ ] Email received: YES / NO
- [ ] Email timestamp: _______________________
- [ ] Email contains all form data: YES / NO
- [ ] Submission ID visible in email: _______________________

**If email NOT received:**
1. Check spam folder
2. Verify email address in Netlify settings
3. Re-save email notification settings
4. Submit another test
5. DO NOT LAUNCH until email works

---

### Phase 4: Submission Data Verification

**In Netlify Dashboard > Forms > hustle-survey:**

- [ ] Click on most recent submission
- [ ] Verify ALL fields captured:
  - [ ] email
  - [ ] phone
  - [ ] location
  - [ ] All other survey fields

**Record Sample Submission:**
```
Submission ID: _______________________
Timestamp: _______________________
Email: _______________________
Phone: _______________________
Location: _______________________
Total Fields: _______________________
```

**Screenshot:** Take screenshot of submission detail (save to tests/screenshots/)

---

### Phase 5: CSV Export Test

**Critical: Ensures you can export all responses**

- [ ] In Forms dashboard, click "Export to CSV"
- [ ] CSV downloads successfully: YES / NO
- [ ] Open CSV file
- [ ] Verify test submissions appear
- [ ] Verify all fields present in CSV
- [ ] Count columns: _______________________

**Record:**
- CSV export timestamp: _______________________
- Total rows: _______________________
- Confirmation: ☐ CSV export works

---

### Phase 6: Error Logging Verification

**Check for any errors:**

- [ ] Open browser DevTools Console
- [ ] Navigate to survey form
- [ ] Submit test form
- [ ] VERIFY: No red errors in console
- [ ] VERIFY: No 404 errors
- [ ] VERIFY: No CORS errors

**Record:**
- Console errors: _______________________
- Network errors: _______________________
- Submission successful: YES / NO

**Screenshot:** Take screenshot of clean console (save to tests/screenshots/)

---

### Phase 7: Multi-Device Testing

**Test on actual devices:**

- [ ] iPhone / iOS Safari
  - Submission ID: _______________________
- [ ] Android / Chrome
  - Submission ID: _______________________
- [ ] Desktop / Chrome
  - Submission ID: _______________________
- [ ] Desktop / Firefox
  - Submission ID: _______________________

**Record any issues:**
```
Device issues:
_____________________________________________
_____________________________________________
_____________________________________________
```

---

### Phase 8: Real Email Test

**Use your ACTUAL email:**

- [ ] Navigate to survey
- [ ] Fill out with real information
- [ ] Submit form
- [ ] Confirm success page appears
- [ ] Check Netlify dashboard
  - Submission ID: _______________________
- [ ] Check YOUR email inbox
  - Email received: YES / NO (within 2 minutes)
  - Email timestamp: _______________________

**If email NOT received:**
❌ **DO NOT LAUNCH - Fix email notification first**

---

### Phase 9: Webhook Verification (If Configured)

**If using submission-created.js function:**

- [ ] Go to Netlify > Functions
- [ ] Verify submission-created function deployed
- [ ] Submit test form
- [ ] Check function logs
  - Function triggered: YES / NO
  - Email sent successfully: YES / NO
  - Any errors: _______________________

**Record:**
- Function execution timestamp: _______________________
- Function execution ID: _______________________

---

### Phase 10: Production URL Verification

**Final URL checks:**

- [ ] Survey URL: https://intentsolutions.io/survey
- [ ] HTTPS working: YES / NO
- [ ] No SSL errors: YES / NO
- [ ] Form loads correctly: YES / NO
- [ ] Custom domain configured: YES / NO

---

## ✅ FINAL PRE-LAUNCH SIGN-OFF

**All tests must PASS before launching:**

- [ ] All automated tests PASS
- [ ] Netlify dashboard shows form submissions
- [ ] Email notifications received successfully
- [ ] CSV export works
- [ ] No console errors
- [ ] Tested on multiple devices
- [ ] Personal email test successful
- [ ] All submission IDs recorded
- [ ] Screenshots captured for documentation

---

## 🚀 LAUNCH AUTHORIZATION

**I confirm that:**
- [x] All tests have been completed
- [x] All critical systems are functioning
- [x] I have received test emails successfully
- [x] I understand how to monitor submissions
- [x] I know how to export data from Netlify

**Authorized by:** _____________________ **Date:** _____________________

**Final Confirmation Number:** _______________________

---

## 📊 POST-LAUNCH MONITORING

**First 24 Hours - Check every 4 hours:**

| Hour | Submissions | Issues | Notes |
|------|-------------|--------|-------|
| 1    | ________    | ______ | _____ |
| 4    | ________    | ______ | _____ |
| 8    | ________    | ______ | _____ |
| 12   | ________    | ______ | _____ |
| 24   | ________    | ______ | _____ |

**Total Response Rate:** _______________________

---

## 🚨 EMERGENCY PROCEDURES

**If submissions stop appearing:**

1. Check Netlify status page: https://www.netlifystatus.com/
2. Check form detection status in dashboard
3. Verify no rate limits exceeded
4. Check function logs for errors
5. Contact Netlify support if needed

**Rollback Command:**
```bash
cd /home/jeremy/projects/intent-solutions-landing/astro-site
netlify rollback
```

---

**Last Updated:** 2025-10-08
**Version:** 1.0.0
**Status:** READY FOR LAUNCH ✅
