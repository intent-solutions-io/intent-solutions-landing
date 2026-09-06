# Voice profile: intentsolutions.io public copy

**Version:** 1.0 (2026-09-06)

Derived from doctrine 007 (`claude-partner-network/000-docs/007-PP-PLAN-selective-practice-operating-model.md`, sections 5, 7.1, 7.2), the council landing brief (intent-os `000-docs/163-PP-gateway-vision/165-RA-REVW-gateway-council-review.md`, section 6.4), and the house writing voice (intent-os `persona/voice-system-prompt.md`). Where they conflict, the stricter rule wins; the dash ban wins over everything. Load this before any copy work in this repo.

## Register

Public, 2B: a firm speaking to three audiences (customers, members, vendors) who will check the claims. Blunt over deferential. Declarative. Short sentences carry the weight. Contractions fine. No hype, no hedging, no corporate politeness. The reader should be able to verify every sentence from a link on the page.

## Say (public)

- The front door for AI implementation.
- Selective practice for people who implement AI in production.
- House method, peers, production standards.
- Request access, apply, request an outcome, request partner-of-record.
- Model-agnostic by design; tool-fluent.
- Credentials optional; standard required.
- Proven outcomes, with the evidence linked and dated.
- Partner of record (vendor context only, and see the Claude rule below).
- One contract holder (stated as intent; no terms published).
- Receipts, evidence, the Lab, the catalog, the proof feed.

## Never say (public)

- "Outsource work to our community", "hire our certified architects", "our bench".
- "Get certified, get projects."
- "Start your AI journey", beginner-hero language, "anyone welcome", open-Discord energy.
- "The Claude Partner community" or any vendor name as the identity of the room.
- "All AI certs in one place."
- "First", "only", "leading", "best-in-class", "trusted by", "the #1".
- Any count of certifications or certified people.
- Any dollar figure, price, or rate.
- Any time estimate for partner or member work (weeks, months, quarters).
- Any quantified marketing claim that is not a fact with a source and a date on the page.
- "Book a discovery call", "book a call", "schedule a demo".
- Vendor logos as a strip; product names as page identity (vendor names live inside receipt tiles only).
- "Claude" paired with "proven", "verified", or "partner of record" without the program's written approval.
- AI-slop words: delve, dive into, seamless, leverage (verb), unlock, game-changer, revolutionize, supercharge, comprehensive, at its core, in today's fast-paced, navigate the landscape.

## Punctuation

- No em dashes, no en dashes, anywhere: headings, body, alt text, meta descriptions, JSON-LD, code comments in copy files. Use a period, comma, colon, or parentheses. A build gate (`scripts/check-copy.mjs`) fails the build on U+2013 and U+2014 in `dist/`.
- Serial comma on. Numbers with thousands separators. Dates as YYYY-MM-DD in receipts.

## Numbers

Every number on the page is rendered from `src/data/receipts.json` and carries the `verified_at` date next to it. No number is typed into a component. Pass and fail counts appear together or not at all.

## Structure

Lead with the claim. One idea per sentence. Bullets only for parallel items. No closing offer, no "let's talk", no restating.
