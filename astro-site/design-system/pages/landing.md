# Page: Landing (`/`)

Overrides and specifics for the homepage. Everything not stated here follows `design-system/MASTER.md`.

**Brief source:** intent-os `000-docs/163-PP-gateway-vision/165-RA-REVW-gateway-council-review.md` section 6.4. **Copy source:** `brand/copy-home.md` (this repo). **Copy rules:** `brand/voice-profile.md`.

## Section order (eight sections, one H1)

| # | Section | Component | Accent budget |
|---|---|---|---|
| 0 | Nav | `SiteNav.astro` | none |
| 1 | Hero | `home/Hero.astro` | none (ink buttons) |
| 2 | Gate | `home/Gate.astro` | the SVG figure (accent stroke on the IS node and the Members edge) |
| 3 | Doors | `home/Doors.astro` | none |
| 4 | Method | `home/Method.astro` | none |
| 5 | Receipts | `home/Receipts.astro` | none (mono dates in muted) |
| 6 | Standard | `home/Standard.astro` | one accent-dark pull line |
| 7 | Founder | `home/Founder.astro` | none |
| 8 | Footer | `home/Footer.astro` | none |

## Wireframes (ASCII, desktop 1440 then mobile 375)

### 0. Nav

```
| Intent Solutions        Learn   Labs   Catalog   Field Notes        Member sign in |
|-------------------------------------------------------------------- rule ---------|
```

Mobile: wordmark left, a single "Menu" text button right that reveals the same five links stacked. No hamburger icon, no dropdowns, no "Book a Call".

### 1. Hero

```
|                                                                                   |
|   THE FRONT DOOR FOR AI IMPLEMENTATION.                (Newsreader, display)      |
|                                                                                   |
|   Practitioners and small teams apply, get trained in our method, and get         |
|   selected into real work. Customers buy proven outcomes from us, delivered by    |
|   people we vouch for, measured by a lab we run in public. Vendors get a          |
|   partner of record.                                     (lede, max 44rem)        |
|                                                                                   |
|   [ Request an outcome ]  [ Request access ]  [ Request partner-of-record ]       |
|   (three equal ink buttons, same width, wrap to 1 column at 768)                  |
|                                                                                   |
```

No image. No logo strip. No stat badges. Left-aligned, not centered.

Mobile: same, buttons stacked full width, 44px tall.

### 2. Gate

```
|------------------------------------------------- rule ----------------------------|
|                                                                                   |
|   "Intent Solutions owns the relationship between the people who can sell and     |
|    implement AI and the companies that need it, and proves every piece of work    |
|    before it is called done."                        (Newsreader, h2 scale)       |
|                                                                                   |
|      VENDORS  <-- partner of record -->  INTENT SOLUTIONS  <-- one contract -->  CUSTOMERS
|                                              ^                                    |
|                                     admitted | selected                           |
|                                              v                                    |
|                                           MEMBERS                                 |
|                              individuals . small teams . regional operators       |
|                                                        (inline SVG, 640x300)      |
|                                                                                   |
|   The door is wide: anyone capable can apply. The arena is narrow: we decide      |
|   who touches real work. The paper is ours: one contract holder. Nobody gets      |
|   rented out.                                                (body)               |
|                                                                                   |
```

Mobile: SVG scales to width with `viewBox`; the row of three stacks vertically inside the SVG at a second breakpoint variant (a `<symbol>` swap via a media query on the container, or a simpler stacked SVG served under 640px).

### 3. Doors

```
|------------------------------------------------- rule ----------------------------|
|   Three doors                                                       (eyebrow)     |
|                                                                                   |
|   CUSTOMERS                 MEMBERS                    VENDORS                     |
|   One contract, ours.       Individuals, two-person    A partner of record with   |
|   You buy an outcome        shops, regional            certified, active          |
|   with a known shape...     operators. We judge the    practitioners. Deal        |
|                             receipts, not the résumé.  registration and co-sell   |
|                                                        land on Intent Solutions.  |
|   [Request an outcome]      [Request access]           [Request partner-of-record]|
|   See the catalog ->        Member sign in ->                                     |
|                                                                                   |
```

Three columns separated by 1px rules (not boxes). Mobile: stacked with a rule between.

### 4. Method

```
|------------------------------------------------- rule ----------------------------|
|   The Method                                                       (eyebrow)      |
|   Six rules. Each has a test.                                      (h2)           |
|                                                                                   |
|   1  Write the intent, the accountable party, and the failure boundary before     |
|      the work.        Test: ...                                                   |
|   2  Enforcement travels with the code.        Test: ...                          |
|   3  Prove it before you call it done, and keep proving it.   Test: ...           |
|   4  Every change explains itself to an outsider.   Test: ...                     |
|   5  Memory is governed, cited, append-only, and replicated off the machine       |
|      that wrote it.   Test: ...                                                   |
|   6  People before P&L, on the record.   Test: ...                                |
|                                                                                   |
|   Passes all six, it is Intent Solutions work, whoever did it and whatever        |
|   model they used. The method is software: audit-harness, doc-filing ->           |
|                                                                                   |
```

Two-column rule rows on desktop (ordinal + rule | test), single column on mobile. No icons.

### 5. Receipts

```
|------------------------------------------------- rule ----------------------------|
|   Receipts                                                          (eyebrow)     |
|                                                                                   |
|   +-----------------+ +-----------------+ +-----------------+ +-----------------+ |
|   | Marketplace     | | The Lab         | | Catalog         | | Proof feed      | |
|   | 3,015 skills,   | | N pass, M fail  | | Working demos   | | Title 1         | |
|   | 439 plugins,    | | published       | | you can click   | | Title 2         | |
|   | 2,7xx stars     | | nightly         | | before buying   | | Title 3         | |
|   | verified 2026-  | | verified 2026-  | |                 | | fetched 2026-   | |
|   | tonsofskills -> | | labs ->         | | demos ->        | | field notes ->  | |
|   +-----------------+ +-----------------+ +-----------------+ +-----------------+ |
|                                                                                   |
```

Every number comes from `src/data/receipts.json` with its `verified_at` rendered in mono under it. Pass and fail both shown, never pass only. Mobile: 1 column.

### 6. Standard

```
|------------------------------------------------- rule ----------------------------|
|   Fixed standard, disposable tools.                                 (h2)          |
|                                                                                   |
|   Intent Solutions separates what never changes (a fixed, evidenced standard)     |
|   from what always changes (the model, the vendor, the tool, and the role         |
|   someone plays in delivering the work), and proves the difference on every       |
|   engagement.                                            (Candidate C, lede)      |
|                                                                                   |
|   Model-agnostic by design. Credentials optional, standard required. Selection    |
|   on evidence, never on identity, tool, or pedigree.     (accent-dark pull line)  |
|                                                                                   |
```

### 7. Founder

```
|------------------------------------------------- rule ----------------------------|
|   One paragraph: who holds the paper; the door admits on receipts, and the        |
|   founder is the existence proof (no bio, no photo grid).                         |
|   Jeremy Longshore, Gulf Shores, Alabama.                                         |
```

### 8. Footer

```
|------------------------------------------------- rule ----------------------------|
|   Learn  Marketplace  Labs  Catalog  Field Notes  GitHub  Contact                  |
|   Intent Solutions, Gulf Shores, Alabama.   Privacy  Terms  Acceptable use        |
```

## Analytics attributes

Every CTA and tile carries `data-umami-event` per `brand/analytics-events.md`: `door-customer`, `door-member`, `door-vendor`, `receipt-marketplace`, `receipt-lab`, `receipt-catalog`, `receipt-feed`, and `outbound` with `data-umami-event-href` on any external link.

## Second-pass critique (recorded)

Against the `frontend-design` anti-slop list, first pass had: centered hero (template tell), eyebrow labels with rules either side (carried over from the current site), and a fourth accent use in the receipts tiles. Changed to: left-aligned hero; plain eyebrow labels; receipts tiles carry no accent, dates in muted mono. The signature element stays the SVG figure. Nothing else was added.
