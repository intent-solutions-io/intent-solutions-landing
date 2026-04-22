# Release v2.3.0

**Release Date**: 2026-04-22

## Changes since v2.2.0

- chore: release v2.3.0 [skip ci] (7785620)
- Merge pull request #13 from intent-solutions-io/feat/shared-layout-components (a84d329)
- feat: add shared layout components (PageHero, PageCTA, CTASection) (5203858)

---

# Release v2.2.0

**Release Date**: 2026-04-21

## Changes since v2.1.1

- chore: release v2.2.0 [skip ci] (d2812d1)
- feat: homepage visual redesign — mission-control aesthetic (66c0667)
- fix: replace heredoc with here-string in release.yml to fix YAML syntax error (7b8ffbb)
- feat: complete homepage visual redesign with mission-control aesthetic (6c2b185)
- chore: remove build artifacts, working notes, and stale Netlify files (1e130d0)
- feat: visual upgrades cherry-picked from #4 redesign (#5) (a04dfb0)
- chore: update FUNDING.yml with GitHub Sponsors + Buy Me a Coffee (826b77d)
- chore: add GitHub Sponsors funding button (49dec80)
- fix: regenerate functions package-lock.json for @google-cloud/vertexai (03455da)
- feat: discovery-first refresh — remove survey, strip pricing, update CTAs (#3) (145e3b9)
- fix: add IP-based rate limiting to form endpoints (spam mitigation) (#2) (4358b64)
- feat: rewrite Learn + Colab pages for conversion (16052f7)
- feat: add projects showcase page with 17 active projects (100bf8e)
- chore: remove Netlify config and switch to Firebase Hosting (f58e6b7)
- feat: redesign contact form and add Learn/Colab pages (b3dde6a)
- feat: add Google Meet booking link to contact page and landing page (02069d0)
- fix: filter undefined values from contactMethods for Firestore (ac23c1a)
- fix: improve error logging for debugging (61f348b)
- fix: fix infinite recursion in getFromEmail and add Firebase domain to CORS (8fecec3)
- ci: retry after enabling Cloud Billing API (9c04263)
- ci: add explicit token format and scopes for Secret Manager access (233503a)
- ci: retry after IAM propagation delay (7bac810)
- ci: test secret-level IAM for Functions deployment (bfe84db)
- ci: test IAM propagation for Functions deployment (9c596b7)
- docs: add booking link to CLAUDE.md (1e0be50)
- fix: upgrade firebase-functions to v7 for GitHub Actions deployment (d6fb7d2)
- fix: add gcloud setup for Firebase CLI authentication (12c76d5)
- fix: move firebase-deploy workflow to repo root with correct paths (e72ef85)
- feat: migrate from Netlify to Firebase Hosting + Functions (006d1cb)
- feat: pivot to Claude Code Systems as primary service (ae627d5)
- docs: add Beads upgrade note (whats-new + hooks) (3a21df8)
- chore: add Beads (bd) workflow + ignore beads source clone (07e60d4)
- feat: update resellers page to distribution partner model + fix form routing (331b6e4)
- docs: create CLAUDE.md and update README with refactor details (e5ac5e2)
- feat: emphasize IAM (Intent Agent Models) customizability (a44993e)
- feat: update PipelinePilot to show actual 4-agent MVP configuration (c54d965)
- fix: remove LinkedIn-specific references from PipelinePilot (b005179)
- fix: restore IAE (Intent Agent Engine) branding and correct PipelinePilot positioning (e28da10)
- feat: complete site refactor with model-agnostic positioning and education hub (c0f15e4)
- refactor(agents): remove dependency badges for cleaner card design (0c674bd)
- refactor(intel-engine): remove numbered step indicators for cleaner design (bf4bb9e)
- fix: remove colored tier boxes, use simple bullet list (3ac11a2)
- feat: implement IAE modular pricing with M1/M2/M3 structure (0bce7d7)
- feat: rebrand to IAE (Intent Agent Engine) with Google Cloud stack (1cb49c1)
- feat: update products section with GitHub projects and websites (d982f77)
- feat: add Intel Engine detail page and make agent cards clickable (9d2851d)
- feat(agents): rebrand to Intel Engine: Model 1 with A2A positioning (3eb439e)
- fix: renumber A2A documentation index from 000 to 075 to match sequence (c48b169)
- docs: add comprehensive A2A framework documentation (5 core docs + index) (79d740f)
- feat: add A2A framework test page showcasing intelligence-first agent architecture (63f7579)
- feat: reposition agents for service businesses with existing clients (e84573e)
- fix: change headline to 'solutions delivered' for better flow (63ca720)
- feat: update /agents page headlines to incorporate intent solutions branding (e9e0df9)
- fix: restore original 'explore tailored build paths' header (bb078bf)
- fix: revert to uniform card layout with 'containerized agents shipped' header (6aed5d1)
- feat: make AI Agents the hero offering on home page with full-width featured card (5e6fd1f)
- fix: update home page AI Agents card to link to /agents instead of /ai-agents (2905bf8)
- fix: restore original hero heading - keep 'creating industries that don't exist' (9325d02)
- feat: add AI agents page with containerized offerings (5d01f63)
- Merge redesign/ai-saas: restore navigation with lowercase branding and clickable service cards (165bae5)
- feat: restore working navigation with clickable service cards (62ccdd5)
- fix: restore navigation bar to main landing page (4b57983)
- fix: remove insecure placeholder image and add comprehensive security headers (b99d681)
- fix: remove insecure placeholder image and add comprehensive security headers (2051e8c)
- feat: refresh astro landing content (c705e8b)
- fix: use placeholder OG image for social sharing without manual image creation (95167d6)
- fix: add OG meta tags for HUSTLE Survey social sharing (d2d4869)
- Revert "fix: rename section 6 heading to ccpiweb" (26ed8ce)
- fix: rename section 6 heading to ccpiweb (8f9ed6e)
- fix: critical survey bugs - data persistence and Netlify submission (ec0ebae)
- fix: unify HUSTLE Survey button styling with primary button (a4ec92c)
- fix: replace localhost URLs with production domain in survey sharing (07e5c62)
- fix: replace static AUP with GetTerms embed for consistency (5a20d09)
- feat: add COPPA/GDPR compliant consent notices for youth data (7bb1801)
- fix: reposition home link relative to section, not container (c8ffce2)
- fix: add proper spacing between home link and heading (ed281f5)
- fix: enhance survey home button for mobile accessibility (43a2a8f)
- ui: minimize survey landing page header and relocate home link (49a2035)
- feat: harden survey form with production-grade monitoring and safety (d268765)
- fix: add static form for Netlify detection and fix function payload parsing (8cac23b)
- fix: add redirect exception for survey thank-you page (04af1df)
- fix: remove plugin config causing build error (932eacc)
- fix: enable Netlify Functions for survey email notifications (c0d225e)
- fix: update survey thank-you page redirect (80d9dbd)
- ci: add GitHub Actions automation workflows (e7beb97)
- chore: remove old test results from git tracking (5aec7b3)
- test: run initial Netlify form tests and document status (871aa91)
- docs: add comprehensive testing suite summary (e1cdb56)
- feat: add comprehensive Netlify Forms testing suite (a4f991a)
- chore: enable automatic releases on every push (88a7c6e)
- chore: add global release workflow (7d6f12b)

---

# Changelog

All notable changes to Intent Solutions Landing Page will be documented in this file.

**Full Changelog**: See `01-Docs/021-chg-version-history.md` for complete version history.

## [v2.1.0] - 2025-10-08

### 🎯 Release Summary

This release completes the Web3Forms integration for the HUSTLE survey, replacing the non-functional Netlify Forms implementation with a robust third-party form service combined with personalized email notifications via Resend.

### ✨ Features

- **Web3Forms Integration**: Replace Netlify Forms with Web3Forms for reliable survey submission handling
- **Personalized Email Notifications**: Automated thank you emails sent to survey respondents via Resend API
- **Netlify Function Webhook**: Server-side webhook handler processes submissions and triggers emails
- **Professional Thank You Page**: New root-level `/thank-you` page with polished design and clear next steps
- **SPA Routing**: Proper single-page application routing with `_redirects` file
- **Email Content**: Full personal letter from founder including restaurant/trucking background, Google Cloud Startup Program acceptance, and HUSTLE vision

### 🔧 Technical Improvements

- Configured Web3Forms access key for survey submissions
- Added Netlify Function: `survey-webhook.js` for processing form submissions
- Integrated Resend API for transactional email delivery
- Set up environment variables: `RESEND_API_KEY`, `RESEND_FROM_EMAIL`
- Added spam protection with honeypot field (`botcheck`)
- Implemented proper redirect flow: Form → Web3Forms → Webhook → Email → Thank You Page

### 📚 Documentation

- Added DevOps deployment guide: `01-Docs/047-ref-devops-deployment-guide.md`
- Documented thank you page redirect bug: `01-Docs/048-bug-survey-thank-you-redirect.md`

### 🐛 Bug Fixes

- Fixed survey submission flow (previously returned 404 with Netlify Forms)
- Resolved thank you page redirect issues
- Corrected form detection problems with Astro-generated HTML

### 📊 Metrics

- Survey sections: 15
- Total questions: 76
- Submission storage: Web3Forms dashboard
- Email delivery: Resend API
- Success rate target: >95%

### 🔄 Migration Notes

**Breaking Changes**: None - this is a backend implementation change only

**Action Required**:
- Ensure `RESEND_API_KEY` and `RESEND_FROM_EMAIL` are set in Netlify environment variables ✅ DONE
- Web3Forms dashboard access at: https://web3forms.com/platforms

---

## [Latest] - 2025-10-06

### Directory Structure Compliance
- ✅ Migrated to MASTER DIRECTORY STANDARDS
- ✅ Moved all documentation to `01-Docs/` with proper naming
- ✅ Implemented `NNN-abv-description.ext` naming convention
- ✅ Created `.directory-standards.md` reference file
- ✅ Updated README.md, CLAUDE.md, and CHANGELOG.md to reference standards

### Previous Versions

See `01-Docs/021-chg-version-history.md` for complete version history including:
- Initial project setup
- Netlify deployment configuration
- Component development
- Performance optimizations
- Security implementations

---

**For detailed changelog, see `01-Docs/021-chg-version-history.md`**
