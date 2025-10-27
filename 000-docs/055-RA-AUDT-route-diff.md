# Site vs Repo Route Diff Analysis

**Audit Date:** 2025-10-26
**Website:** https://intentsolutions.io
**Repository Routes:** 33
**Deployed Routes Checked:** 16

---

## Summary

| Metric | Count |
|--------|-------|
| Total repo routes | 33 |
| Routes returning 200 OK | 5 |
| Routes returning 301 (redirects) | 11 |
| Orphaned routes (not checked) | 17 |
| 404 errors | 0 |

---

## HTTP Status Analysis

### ✅ Routes Returning 200 OK (5)

| Route | Status | Notes |
|-------|--------|-------|
| `/` | 200 | Home page - working correctly |
| `/ai-models` | 200 | Service page - working correctly |
| `/applications` | 200 | Service page - working correctly |
| `/infrastructure` | 200 | Service page - working correctly |
| `/security-compliance` | 200 | Service page - working correctly |
| `/support` | 200 | Service page - working correctly |

### 🔄 Routes Returning 301 (Redirects) - **CRITICAL ISSUE** (11)

| Route | Status | Issue |
|-------|--------|-------|
| `/about` | 301 | Redirecting - investigate destination |
| `/acceptable-use` | 301 | Redirecting - investigate destination |
| `/ai-agents` | 301 | Redirecting - should be 200 |
| `/automation` | 301 | Redirecting - should be 200 |
| `/cloud` | 301 | Redirecting - should be 200 |
| `/privacy` | 301 | Redirecting - investigate destination |
| `/private-ai` | 301 | Redirecting - should be 200 |
| `/survey` | 301 | Redirecting - investigate destination |
| `/terms` | 301 | Redirecting - investigate destination |
| `/thank-you` | 301 | Redirecting - investigate destination |

**ROOT CAUSE:** These routes exist in the codebase but are redirecting on the live site. Possible causes:
1. Netlify redirect rules in `netlify.toml`
2. Server-side redirects configured in hosting
3. Build process excluding certain routes
4. Astro middleware redirects

---

## Orphaned Routes (Not in Live Check) (17)

These routes exist in the codebase but were not checked in the live site crawl:

### Survey Flow Routes (15)
- `/survey/1` through `/survey/15`
- `/survey/test-submit`
- `/survey/thank-you`

**STATUS:** Unknown - need to verify if these are accessible or redirecting

### Root Cause
Survey routes were not included in the initial crawl. Need to verify:
1. Are these routes building correctly?
2. Are they accessible without redirects?
3. Is the survey flow functional end-to-end?

---

## Detailed Findings

### Issue #1: Excessive Redirects (Critical)
**Impact:** High
**Affected Routes:** 11 routes (33% of checked routes)
**Evidence:** `/about`, `/ai-agents`, `/automation`, `/cloud`, `/private-ai`, `/acceptable-use`, `/privacy`, `/survey`, `/terms`, `/thank-you` all return 301

**Root Cause Hypothesis:**
1. Check `netlify.toml` for redirect rules
2. Check Astro middleware for programmatic redirects
3. Review build output to ensure all pages are being generated

**Fix Steps:**
1. Inspect `netlify.toml` redirect configuration
2. Review Astro config for redirect middleware
3. Check build logs to confirm all pages are generated
4. Test each route manually to determine redirect destination
5. Remove unnecessary redirects or fix routing

**Owner:** DevOps / Frontend
**Effort:** Medium (M)

---

### Issue #2: Incomplete Route Coverage
**Impact:** Medium
**Affected Routes:** Survey flow (17 routes)
**Evidence:** Survey routes not tested in live site check

**Fix Steps:**
1. Manually test all survey routes (`/survey/1` through `/survey/15`)
2. Verify survey flow functionality end-to-end
3. Check form submission to `/survey/test-submit`
4. Confirm `/survey/thank-you` displays correctly
5. Add survey routes to automated testing

**Owner:** QA / Frontend
**Effort:** Small (S)

---

### Issue #3: No 404 Error Pages Detected
**Impact:** Low
**Evidence:** No routes returned 404, but error handling not tested

**Fix Steps:**
1. Test non-existent routes (e.g., `/does-not-exist`)
2. Verify custom 404 page exists in Astro
3. Ensure 404 page matches brand design
4. Add proper meta tags to 404 page

**Owner:** Frontend
**Effort:** Small (S)

---

## Redirect Chain Analysis

Need to investigate where 301 redirects are pointing:

```bash
# Test redirect destinations
curl -I https://intentsolutions.io/about
curl -I https://intentsolutions.io/ai-agents
curl -I https://intentsolutions.io/privacy
```

**Action Required:** Map complete redirect chain for all 11 redirecting routes

---

## Route Normalization Issues

**Potential Issue:** Trailing slash handling

Routes to test:
- `/about` vs `/about/`
- `/ai-agents` vs `/ai-agents/`

Astro default: Usually strips trailing slashes, but this can be configured.

**Check:** `astro.config.mjs` for `trailingSlash` setting

---

## Recommendations

### Immediate Actions (P0)
1. **Investigate and fix 301 redirects** - 11 routes should return 200
2. **Test all survey routes** - Ensure 15-step flow works end-to-end
3. **Review netlify.toml** - Check for unintended redirect rules

### Short-term Actions (P1)
4. **Add comprehensive route testing** - Automate checks for all 33 routes
5. **Document redirect strategy** - If redirects are intentional, document why
6. **Create sitemap.xml** - Ensure all routes are discoverable

### Long-term Actions (P2)
7. **Implement monitoring** - Alert on unexpected 301/404 responses
8. **Add integration tests** - Test critical user flows (survey, contact)
9. **Review route structure** - Simplify if possible (15-step survey may be excessive)

---

## Evidence Files

- `000-docs/link-status.csv` - HTTP status for all checked routes
- `000-docs/repo-routes.json` - All routes discovered in codebase
- `000-docs/audit-evidence.log` - Complete audit command log

---

**Generated:** 2025-10-26T19:50:00-05:00
**Next Review:** After redirect fixes implemented
