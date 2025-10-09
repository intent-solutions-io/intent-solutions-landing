# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [2.1.1] - 2025-10-08

### Features
- Complete HUSTLE survey system with Netlify Forms integration
- Event-triggered email automation via `submission-created.js` function
- Personalized thank you emails using Resend API
- Enhanced navigation with home buttons across survey flow
- Expanded products showcase from 3 to 6 projects

### Documentation
- Capitalized HUSTLE branding across all 15 survey pages
- Added personal founder message to thank you page
- Updated jeremy_longshore link under main tagline
- Added 4 new sports leagues (Perfect Game, USSSA, USA Volleyball, ASA/USA Softball)

### Infrastructure
- Migrated from Web3Forms to Netlify Forms
- Deployed two serverless functions: `submission-created.js`, `survey-webhook.js`
- Configured Resend API integration for transactional emails
- Set up honeypot spam protection

### Code Quality
- Removed emoji usage for professional presentation
- Improved thank you page UX with email check instructions
- Enhanced form submission flow with better redirects

**Metrics**: 5 commits, 15 files modified, production deployment successful

---

## [2.1.0] - 2025-10-07

### Features
- Added baseball, volleyball, and softball leagues to survey page
- Home button on survey landing page

### UI/UX
- Gray monochrome theme for thank you page home button

---

## [2.0.0] - 2025-10-06

### Breaking Changes
- Complete redesign of survey system
- New 15-section survey structure (76 questions)

### Features
- Multi-section survey with progress tracking
- SessionStorage-based progress persistence
- Form validation and error handling

---

**Repository**: intent-solutions-landing
**Last Updated**: 2025-10-08
