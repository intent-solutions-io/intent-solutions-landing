# Customer-first company site release

Date: 2026-09-12. Tracking: bd_000-projects-dxtq.14 through .17, implementation .5, hardening .6, release .7.

## Scope and decisions

The owner approved customer-first positioning and required an individual site-map breakdown. Vibe Marketing positioning and Direct Response Copy informed the headline, audience priority, proof limits, and saved challenger copy. Impeccable informed responsive hierarchy, readable contrast, keyboard/touch behavior, and preservation of the orange arrow, Syne/Inter, charcoal identity. Doc Filing places the architecture and release record in 000-docs; Beads remains the task authority.

Homepage leads with “Bring us the work you need AI to do.” It explains the work, evidence, operating responsibility, and request process. A dated real Labs failure is an inspectable example, not a promised customer result. The existing local team/About changes are preserved. No new partner entitlement, pricing, newsletter delivery, or conversion uplift is claimed.

The individual route contract covers 30 source templates, plus a documented inventory of current article instances. Projects now directs readers to public evidence instead of stale counts and infrastructure claims. Support follows actual agreements and repository support channels. Sixteen superseded service/learning pages retain their URLs as noindex handoffs. The old survey confirmation stops claiming a submission or email occurred simply because someone opened the URL. Existing legal text is unchanged.

## Verification

Commands from astro-site:

```sh
npm run build
npm run audit:indexability
npm run audit:site-map
python scripts/test-brand-polish.py http://127.0.0.1:4898
```

Build produces 119 pages before the upstream content rebase. Indexability checks 10 sitemap URLs and unique titles. The route audit checks every source template, indexing policy, one H1, and 849 internal links/anchors. Browser coverage includes 320/390/768/1440px, actual headline glyph bounds, responsive routes, network touch targets, menu Escape and anchor dismissal, form validation/failure/retry/success, no-JavaScript fallback, and 200% text reflow. Form requests are intercepted; this does not test production CRM or email delivery.

The initial browser run found an orphaned reduced-motion selector after obsolete styles were removed; it was repaired before release. A test expectation was corrected to match the actual generic form error and email fallback. Source diff whitespace checks pass. The Impeccable scan identified undersized labels, redundant border/shadow treatments, and a long proof note, corrected in the bounded pass. Inter is intentional, not a redesign finding. The pinned nav treatment can produce a conservative pixel-contrast warning over its blurred backdrop; its foreground and background tokens remain explicit. Do not claim a clean detector result or a certified accessibility audit.

## Deployment and rollback

PR CI and main pre-deploy now run the build, indexing, route contract, and intercepted browser tests. Deployment retains the existing VPS workflow. Release verification must check live headline, site-map route, legacy handoff, metadata image, favicon, and healthz. If automated SSH transport fails, inspect the deployment checkout for local changes before using the existing deploy-intentsolutions script. The script fetches main and updates the served build; it must not run over unreviewed tracked server edits.

Rollback is a reviewed Git revert followed by the same checks and deployment. The superseded page content remains in Git history. No production database or legal-policy contents are changed.

The upstream content rebase preserves the new sealed-repo field note and release metadata; it adds one generated article (120 pages total). Text-reflow testing additionally found fixed footer column widths at 200% text size; the footer now switches to its two-column layout at tablet width. The no-JavaScript assertion inspects rendered body text because Playwright intentionally excludes noscript descendants from its text matcher.

## Release evidence

- Merged PR: https://github.com/jeremylongshore/intent-solutions-landing/pull/53 at `24b3ebf2574cf2c9b68cb67a8303c980e76291e4` (2026-09-12 23:12 UTC).
- PR CI: https://github.com/jeremylongshore/intent-solutions-landing/actions/runs/34724690541 passed.
- Main build, browser gate, automated VPS deploy and health smoke: https://github.com/jeremylongshore/intent-solutions-landing/actions/runs/34724784211 all passed. No manual deployment fallback was needed.
- The deployment checkout is clean at `4a1abe91a02b644de10112149a2900c8120a9afb`; differences from the tested merge are only automated CHANGELOG.md and version.txt updates.
- Final local build: 120 generated pages; 10 canonical sitemap URLs; 30 individually mapped route templates and 850 internal links/anchors. Browser regression passed on all four sizes, including reduced motion, form failure/retry/success, no-JS fallback, and 200% text reflow. No real forms were submitted.
- Additional current company/legal route inspection found no browser runtime errors. Conservative core muted-text, orange-text, and button token contrast checks returned 5.81:1, 5.71:1, and 7.10:1 respectively. This is bounded verification, not an accessibility certification.
- Live 390px/1440px checks verified the new headline and visible primary action without horizontal overflow. Live Site map, Projects, Support, cloud handoff and Learn security handoff matched their current purpose. All three legal destinations returned 200. Metadata points to the new PNG. Served PNG and favicon SHA-256 digests match the committed assets. The existing Umami site ID remains present; analytics ingestion itself was not retested.
- Live https://intentsolutions.io/healthz returned `{ "ok": true, "service": "intentsolutions.io" }`.

The landing repository's existing Beads schema mismatch remains tracked in dxtq.9; no automatic migration was attempted. Umbrella tracking synchronized successfully to its Dolt remote. Other estate properties and the separate personal-site deploy-transport follow-up remain outside this release.
