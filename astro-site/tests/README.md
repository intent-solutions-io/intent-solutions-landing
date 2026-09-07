# Survey Testing Suite

Comprehensive testing framework for HUSTLE survey Netlify Forms integration.

---

## 📁 Directory Structure

```
tests/
├── README.md                      # This file
├── TESTING-QUICK-START.md         # Quick start guide
├── PRE-LAUNCH-CHECKLIST.md        # Pre-launch manual checklist
├── form-submission.spec.js        # Main E2E tests (8 tests)
├── netlify-api.spec.js            # Netlify API tests (4 tests)
├── helpers.js                     # Utility functions
├── screenshots/                   # Test screenshots
├── videos/                        # Failed test videos
├── reports/                       # Test reports and exports
└── fixtures/                      # Test data (if needed)
```

---

## 🎯 What This Tests

### ✅ Automated Tests (8 Core Tests)

1. **Form Attributes** - Verifies correct Netlify configuration
2. **Form Submission** - Tests complete submission flow
3. **Network Monitoring** - Catches console/network errors
4. **Form Validation** - Tests required field validation
5. **Special Characters** - Tests data handling edge cases
6. **Mobile Viewport** - Tests responsive design
7. **Rapid Submissions** - Tests rate limiting
8. **Console Errors** - Verifies clean browser console

### ✅ Optional API Tests (4 Tests)

9. **API Connection** - Tests Netlify API access
10. **Fetch Submissions** - Gets all submissions via API
11. **Form Configuration** - Verifies notification settings
12. **CSV Export** - Tests data export functionality

### ✅ Manual Verification (10 Phases)

- Netlify dashboard verification
- Email notification testing
- CSV export testing
- Error logging verification
- Multi-device testing
- Real email testing
- Webhook verification
- Production URL checks
- Final sign-off
- Post-launch monitoring

---

## 🚀 Quick Start

### 1. First Time Setup

```bash
# Install dependencies
npm install

# Install browsers
npx playwright install

# Configure environment
cp .env.test.example .env.test
nano .env.test
```

### 2. Run Tests

```bash
# Run all tests
npm test

# Run with visible browser
npm run test:headed

# Run with interactive UI
npm run test:ui
```

### 3. View Results

```bash
# Open HTML report
npm run test:report

# Check screenshots
ls tests/screenshots/

# Check reports
ls tests/reports/
```

---

## 📊 Test Coverage

| Category | Tests | Status |
|----------|-------|--------|
| Core E2E | 8 | ✅ Complete |
| API Integration | 4 | ✅ Complete |
| Manual Checklist | 10 | ✅ Complete |
| **Total** | **22** | **✅ Complete** |

---

## 📝 Documentation

- **[TESTING-QUICK-START.md](./TESTING-QUICK-START.md)** - How to run tests
- **[PRE-LAUNCH-CHECKLIST.md](./PRE-LAUNCH-CHECKLIST.md)** - Pre-launch manual verification

---

## 🎓 Test Execution Flow

```
1. Run Automated Tests
   ↓
2. All tests PASS?
   ↓ Yes
3. Complete Manual Checklist
   ↓
4. Email notifications working?
   ↓ Yes
5. Record all submission IDs
   ↓
6. Take evidence screenshots
   ↓
7. Sign off on checklist
   ↓
8. LAUNCH! 🚀
```

---

## 🔍 Evidence Collection

**Every test generates evidence:**

```
screenshots/
├── form-loaded.png          # ✓ Form configured correctly
├── form-filled.png          # ✓ Form accepts data
├── form-success.png         # ✓ Success page shown
├── validation-error.png     # ✓ Validation works
├── mobile-viewport.png      # ✓ Mobile responsive
└── clean-console.png        # ✓ No errors

reports/
├── playwright-html/         # ✓ Full HTML test report
├── test-results.json        # ✓ Machine-readable results
├── submission-*.json        # ✓ Individual submissions
├── network-activity.json    # ✓ Network monitoring
└── all-submissions.json     # ✓ Complete export
```

---

## ⚡ Most Used Commands

```bash
# Quick test run
npm test

# Visual debugging
npm run test:ui

# View report
npm run test:report

# Test on mobile
npm run test:mobile

# Debug failing test
npm run test:debug
```

---

## 🚨 Pre-Launch Requirements

**MUST complete before sending survey:**

- [ ] All 8 automated tests PASS
- [ ] Netlify dashboard shows submissions
- [ ] Email notification received
- [ ] CSV export works
- [ ] No console errors
- [ ] Tested on real devices
- [ ] Personal email test successful
- [ ] All submission IDs recorded

**See [PRE-LAUNCH-CHECKLIST.md](./PRE-LAUNCH-CHECKLIST.md) for complete list**

---

## 📞 Troubleshooting

### Tests Fail

1. Run `npm run test:headed` to see what's happening
2. Check `tests/screenshots/` for visual evidence
3. Run `npm run test:debug` to step through
4. Check Netlify dashboard manually

### No Email Received

1. Check Netlify > Forms > Settings > Notifications
2. Verify email address is correct
3. Check spam folder
4. Submit manual test
5. **DO NOT LAUNCH until email works**

### API Tests Skip

- Normal if `NETLIFY_SITE_ID` not configured
- API tests are optional
- Core tests cover all critical functionality

---

## 📈 Success Metrics

**Good Test Run:**
```
✓ 8 tests passed in 24.3s
✓ No console errors
✓ All submissions recorded
✓ Email notifications working
✓ CSV export successful
```

**Ready for Launch:**
- All automated tests PASS
- Manual checklist complete
- Email confirmation received
- Evidence documented
- Sign-off recorded

---

## 🔗 Related Documentation

- [Main README](../README.md)
- [CHANGELOG](../CHANGELOG.md)
- [Release Checklist](../.github/RELEASE_CHECKLIST.md)

---

**Last Updated:** 2025-10-08
**Version:** 1.0.0
**Test Suite Status:** ✅ Production Ready
