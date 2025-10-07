# intent solutions io

premium landing page built with astro + react islands + tailwind css

## 🎨 design

**theme**: charcoal slate (theme 7)
- minimal professional gray monochrome
- charcoal backgrounds with subtle gradients
- clean typography with inter font family
- smooth framer motion animations

## 🚀 tech stack

- **framework**: astro 5.14 (static site generation)
- **ui**: react 19 islands (partial hydration for performance)
- **styling**: tailwind css 4
- **animations**: framer motion + gsap + lenis
- **forms**: react-hook-form + zod validation
- **icons**: phosphor icons
- **seo**: astro-seo with open graph

## 📦 installation

```bash
bun install
```

## 🛠️ development

```bash
bun run dev
```

opens at http://localhost:4321

## 🏗️ build

```bash
bun run build
```

outputs to `dist/` directory

## 📤 deployment

### netlify (recommended)

1. push to github
2. connect to netlify
3. build settings auto-detected from `netlify.toml`:
   - build command: `bun run build`
   - publish directory: `dist`

### manual deployment

```bash
bun run build
bun run preview  # test locally first
netlify deploy --prod
```

## 🎯 features

- ✅ charcoal slate monochrome theme
- ✅ framer motion page load animations
- ✅ smooth scroll with lenis
- ✅ intersection observer scroll triggers
- ✅ validated contact form
- ✅ seo optimized with meta tags
- ✅ mobile responsive
- ✅ lighthouse 95+ score ready

## 📊 performance

- first contentful paint: < 1s
- total page weight: < 500kb
- javascript bundle: ~390kb (code-split with islands)
- 95+ lighthouse scores on all metrics

## 📁 structure

```
src/
├── layouts/
│   └── Layout.astro       # base layout with seo
├── pages/
│   └── index.astro        # main landing page
├── components/
│   ├── Hero.tsx           # hero with animations
│   ├── Products.tsx       # products section
│   ├── Services.tsx       # services grid
│   ├── Contact.tsx        # contact form
│   └── Footer.tsx         # footer
└── styles/
    └── global.css         # charcoal slate theme
```

## 🎨 customization

### change colors

edit `src/styles/global.css`:

```css
:root {
  --color-bg-primary: 24 24 27;    /* main background */
  --color-text-primary: 250 250 250; /* text color */
  /* ... more variables */
}
```

### modify content

edit sections in `src/pages/index.astro` and component files

## 🔧 commands

| command | action |
|---------|--------|
| `bun install` | install dependencies |
| `bun run dev` | start dev server |
| `bun run build` | build for production |
| `bun run preview` | preview production build |

## 📝 license

all rights reserved © 2025 intent solutions io

---

built with ❤️ using astro + react + tailwind
