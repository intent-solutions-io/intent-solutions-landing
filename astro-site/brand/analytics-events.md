# Analytics events (Umami)

**Version:** 1.0 (2026-09-06)

Umami is self-hosted at analytics.intentsolutions.io and auto-tracks page views. Custom events use the `data-umami-event` attribute; the script picks them up on click with no JavaScript in the page. One convention, applied everywhere:

| Element | `data-umami-event` | Extra attributes |
|---|---|---|
| Hero and Doors: Request an outcome | `door-customer` | `data-umami-event-placement="hero"` or `"doors"` |
| Hero and Doors: Request access | `door-member` | placement as above |
| Hero and Doors: Request partner-of-record | `door-vendor` | placement as above |
| Doors secondary: See the catalog | `door-customer-catalog` | |
| Doors secondary / nav: Member sign in | `member-signin` | |
| Receipt tile: marketplace | `receipt-marketplace` | |
| Receipt tile: the Lab | `receipt-lab` | |
| Receipt tile: catalog | `receipt-catalog` | |
| Receipt tile: proof feed (tile and each title) | `receipt-feed` | `data-umami-event-title` on each title link |
| Method link: the method as software | `method-software` | |
| Nav links: Learn, Labs, Catalog, Field Notes | `nav-learn`, `nav-labs`, `nav-catalog`, `nav-field-notes` | |
| Any other link to a host other than intentsolutions.io | `outbound` | `data-umami-event-href="<url>"` |
| Contact form submit | `contact-submit` | `data-umami-event-door` from the `?door=` query |

Rules: event names are lowercase kebab, no more than three segments; every external `<a>` on the homepage carries either a named event or `outbound`; the home spec asserts this at build.
