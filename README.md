# Intent Solutions Landing Page

**This repository contains two projects. The active, deployed project is located in the `astro-site` directory.**

---

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/U5S225PTME)

## 🚀 Active Project (Production)

The production website (`intentsolutions.io`) is built using Astro and is located in the `astro-site/` directory.

**To work on the live site, please navigate to that directory:**

```bash
cd astro-site
```

All development, builds, and testing should be performed within the `astro-site` directory. Please see the `astro-site/README.md` for full instructions, and review the root-level [`AGENTS.md`](AGENTS.md) for contributor expectations and workflows.

Current site structure: [individual route map](000-docs/085-AT-ARCH-site-map.md). Current brand: [presentation contract](000-docs/084-AT-DSGN-brand-family-contract.md). The company homepage is customer-first; Projects supplies evidence, Learn is a separate practitioner property, and legacy service URLs are explicit non-indexable handoffs.

Before release, run `npm run build`, `npm run audit:indexability`, and `npm run audit:site-map` in `astro-site`. The deployment workflow also runs the intercepted Playwright browser journey checks. See the [release record](000-docs/086-DC-DEVN-customer-first-release.md) for scope and test boundaries.

## 📦 Archived Legacy Project

A previous, alternative implementation of this project (a React/Vite SPA) was formerly located at the root of this repository. To avoid confusion, it has been archived.

**The legacy project can be found in:**

```
99-Archive/legacy-react-spa/
```

This code is not in production and should only be used for historical reference.
