// @ts-check
import { defineConfig } from 'astro/config';
import { readdirSync, readFileSync } from 'node:fs';

import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

const SITE = 'https://intentsolutions.io';
const SITE_HOST = 'intentsolutions.io';

// Field-note posts are intentional cross-posts: each carries an off-domain
// `canonical:` pointing at startaitools.com (the canonical publisher). They
// legitimately render here but must NOT be advertised for indexing — Google
// would (correctly) flag them as "Alternate page with proper canonical tag".
// We read frontmatter at config-load and build the set of /field-notes/<slug>/
// URLs whose canonical host is off-domain, then reject them in the sitemap
// `filter`. Self-canonical (or canonical-less, defaults to on-domain) posts and
// the /field-notes/ index stay in the sitemap.
function offDomainFieldNoteUrls() {
  // URL object keeps path construction cross-platform; readdir/readFile accept it.
  const dir = new URL('./src/content/field-notes/', import.meta.url);
  /** @type {Set<string>} */
  const excluded = new Set();
  let files;
  try {
    files = readdirSync(dir).filter((f) => f.endsWith('.md') || f.endsWith('.mdx'));
  } catch {
    return excluded;
  }
  for (const file of files) {
    const slug = file.replace(/\.mdx?$/, '');
    let raw;
    try {
      raw = readFileSync(new URL(file, dir), 'utf8');
    } catch {
      continue;
    }
    const fm = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!fm) continue;
    const canonMatch = fm[1].match(/^canonical:\s*["']?([^"'\n]+)["']?\s*$/m);
    if (!canonMatch) continue; // no canonical → treated as self-canonical, keep
    let host;
    try {
      host = new URL(canonMatch[1].trim()).host;
    } catch {
      continue;
    }
    if (host !== SITE_HOST) {
      excluded.add(`${SITE}/field-notes/${slug}/`);
    }
  }
  return excluded;
}

const offDomainPosts = offDomainFieldNoteUrls();

// Utility / non-indexable pages that should never appear in the sitemap.
const EXCLUDED_PATHS = new Set([
  `${SITE}/thank-you/`,
  `${SITE}/404/`,
]);

// https://astro.build/config
export default defineConfig({
  site: SITE,
  trailingSlash: 'always',
  build: { format: 'directory' },

  // Kept uncompressed so the deploy gate's HTML line-length guard stays
  // meaningful on iOS Safari (see deploy-vps.yml). No React islands remain,
  // so no long inline runtime bundles are expected.
  compressHTML: false,

  integrations: [
    sitemap({
      filter: (page) =>
        !EXCLUDED_PATHS.has(page) && !offDomainPosts.has(page),
    }),
  ],

  vite: {
    plugins: [tailwindcss()]
  }
});
