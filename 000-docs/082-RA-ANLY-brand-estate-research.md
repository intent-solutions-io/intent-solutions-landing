# Intent web estate: brand research

Date: 2026-09-12. Status: research and proposed direction; not an approved redesign.
Tracking: umbrella epic `bd_000-projects-dxtq`, research `.1`, shared identity contract `.11`.

## User decisions

Intent Solutions is the master brand. Tighten the existing presentation and recover recognizable branding across the company properties. JeremyLongshore.com retains its existing personal identity; only Impeccable polish is authorized there. Its polish is PR 44 in jeremylongshore/jeremylongshore.com.

## Evidence and authority

The current master source is `astro-site/src/pages/index.astro`, supported by the September language panel in `081-RA-REVW-site-language-panel-2026-09-06.md`. The 2025 web design document and root CLAUDE.md contain older service, typography, conversion, and infrastructure descriptions. They cannot settle present brand decisions without reconciliation.

Read-only researcher Jason inspected source, history, and the public estate. Live browser inspections were also performed by the primary agent. The local master worktree already contains changes in SiteNav, Layout, index, and about. Live still has the founder/JL section and lacks Demos in its network header; the local revision adds the team/IS block and Demos. Preserve these changes and resolve their release status before implementing a new direction.

## Property roles and visual relationships

| Property | Job | Current expression | Proposed degree of alignment |
|---|---|---|---|
| intentsolutions.io | Company, accountable delivery, requests | Near-black/zinc, orange branching-arrow mark, Syne/Inter | Master identity reference, subject to this audit |
| demos.intentsolutions.io | Open working systems and walkthroughs | Dark/orange, Syne, Intent Demos mark | Closest sibling; consistent navigation and naming |
| learn.intentsolutions.io | Practitioner training and access | Paper/graphite, orange, restrained technical labels | Share attribution and navigation; retain a readable learning surface |
| labs.intentsolutions.io | Publish evaluations and evidence | Light/navy, serif display, orange and blue | Preserve evidence readability; align master attribution and global navigation |
| evals.intentsolutions.io | Versioned result definitions | Light/navy documentation | Same evidence family as Labs; stable definition links |
| oma.intentsolutions.io | Omarchy plugin portfolio | Light/mono, orange, square controls | Preserve catalog affordances; clarify parent company and network links |
| tonsofskills.com | Skills and plugin discovery | Mono marketplace with orange signals | Related product identity; do not force a consultancy layout |
| jeremylongshore.com | Founder and personal work | Geist, portrait, silver/amber, rounded controls | Explicitly preserve its current identity |

`demo.intentsolutions.io` redirects to the plural `demos.intentsolutions.io`; use the canonical plural in shared configuration.

## What should be shared

Proposed common contract: owned master mark assets; consistent attribution and company-home destination; ordered network links with current-property state; semantic orange and neutral token roles; accessible focus/control states; consistent Demos naming; maintained footer/legal destinations. Typography and light/dark surfaces may vary where the use warrants it. Cross-navigation should make a visitor's location and destination clear without demanding that they learn the organizational structure first.

Keep the verbal constants: define done, test the claim, publish evidence and failures, treat providers as components, explain mechanisms, and use company `we` versus founder `I` deliberately. Keep request-based routes on the company site. Do not replace factual copy or add guarantees during visual work.

## Verified brand defects

1. Master `astro-site/public/og-image.svg` advertises the former consultant/service positioning. Layout uses it as the default social image, and the live metadata points to it. Social shares can contradict the page before a visitor arrives.
2. The master favicon is byte-identical to Astro's example; the researcher observed that same asset on Learn and Tons of Skills. Replace it with a legible owned mark and verify the actual served asset.
3. Navigation ordering and inclusion differ across properties. Local master adds Demos, while live omits it; Oma lacks the network treatment and its header brand points to the top of the portfolio instead of the company.
4. The dated design documentation and agent instructions conflict with the present implementation and language decisions. An agent following those instructions could restore the retired service brochure.
5. Legacy global styles remain for stat glass, testimonials, podiums, and former hero scenes. Inventory usage before deletion; their presence alone does not prove runtime cost or a defect on the current page.

## Interpretation requiring design judgment

The master’s cosmic image, glass map, and astronaut ending are less specific to the operating method than its language and evidence links. Retaining or reducing those assets is a design decision, not a verified functional failure. A shared identity does not require every site to use the same background or font. Oma's strong Beacon feature is a product hierarchy decision; preserve the game identity while reviewing how prominently it interrupts plugin discovery.

## Measured browser evidence

Master page document widths matched 320, 390, 768, and 1440px viewports. This rules out page-wide horizontal overflow, not clipped text inside hidden-overflow containers. At 390px the reduced-motion page was 7,506px tall; at 320px it was 8,180px. Network-link hit areas measured about 15.6px high. Reduced motion hid the closing video and it was paused in the observed Chromium session. The contact route fit 390px, exposed labeled name/email/company/phone/request/message controls, and `?door=outcome` selected `consulting`. No real form submission or external notification was triggered.

## Execution order

Research informs independent design critique and technical audit. Their findings inform the shared contract and landing surface brief. Implementation follows worktree reconciliation and acceptance of the concrete direction; then browser/accessibility checks and bounded polish, followed by release verification. Beads owns the actionable tasks and dependencies; this document records evidence and rationale.

Repo-local Beads currently reports schema/fingerprint problems. Program tracking remains in the umbrella database until the existing project database is safely recovered; do not initialize a replacement and lose its history.

## Sources

- [Master](https://intentsolutions.io/), [Learn](https://learn.intentsolutions.io/), [Demos](https://demos.intentsolutions.io/), [Labs](https://labs.intentsolutions.io/), [Evals](https://evals.intentsolutions.io/), [Oma](https://oma.intentsolutions.io/), [Tons of Skills](https://tonsofskills.com/), [Founder](https://jeremylongshore.com/).
- [Ember redesign](https://github.com/jeremylongshore/intent-solutions-landing/commit/b7707c96ede17496f88aeb77823ad27d443a8050), [Blueprint replacement](https://github.com/jeremylongshore/intent-solutions-landing/commit/289c211147d84d2017448df3dcb28fd988f64af9), [revert](https://github.com/jeremylongshore/intent-solutions-landing/commit/4c36fc1d260cf0e15298bc82a1650a316af0c8b0), [gateway rewrite](https://github.com/jeremylongshore/intent-solutions-landing/commit/7367687ed0889170a04721fb295fee9180156828).
