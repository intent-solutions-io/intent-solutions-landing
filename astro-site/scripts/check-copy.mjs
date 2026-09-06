#!/usr/bin/env node
// check-copy.mjs: the copy gate. Run AFTER `astro build` against ./dist.
//
// Fails the build if any built HTML page (field-note posts excluded, they are
// dated cross-posts canonical to startaitools.com) contains a retired string,
// a dollar figure, an em dash, an en dash, or a "Claude" + proven/verified/
// partner-of-record pairing. The list is the brief's remove list plus the
// doctrine 007 never-say list (brand/voice-profile.md).
//
// Node built-ins only. Exits non-zero on any violation.

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join, relative } from 'node:path';

const distDir = fileURLToPath(new URL('../dist/', import.meta.url));

// Retired strings and banned claims, checked case-insensitively against visible text.
const RETIRED = [
  'Intelligent Solutions',
  'Intentional Impact',
  'Google Cloud',
  'Vertex AI',
  'Vertex-first',
  'Firebase',
  'BigQuery',
  'Cloud Run',
  'Book a Discovery Call',
  'Book a Call',
  'Book a Meeting',
  'calendar.app.google',
  'claudecodeplugins.io',
  'whop.com',
  'Cowork Accelerator',
  'ChatGPT-class',
  'Resellers',
  'Colab with',
  'hire our certified',
  'outsource work',
  'Start your AI journey',
  'All AI certs',
  'anyone welcome',
  'only external contributor',
  'largest',
  'best-in-class',
  'trusted by',
];

const PATTERNS = [
  { name: 'dollar figure', re: /\$\s?\d/ },
  { name: 'em dash (U+2014)', re: /—/ },
  { name: 'en dash (U+2013)', re: /–/ },
  { name: 'hand-typed star/plugin/skill count', re: /\b\d{1,3}(,\d{3})?\+\s*(github\s+)?(stars?|plugins?|skills?|downloads?)\b/i },
  { name: 'time estimate', re: /\b\d+\s*(weeks?|months?|quarters?)\b/i },
  { name: 'Claude paired with proven/verified/partner of record', re: /claude[^.]{0,80}\b(proven|verified|partner[- ]of[- ]record)\b|\b(proven|verified|partner[- ]of[- ]record)\b[^.]{0,80}claude/i },
  { name: 'primacy claim', re: /\b(the first|the only|#1|number one)\b/i },
];

function* htmlFiles(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) yield* htmlFiles(full);
    else if (entry.endsWith('.html')) yield full;
  }
}

function visibleText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&mdash;/g, '—')
    .replace(/&ndash;/g, '–')
    .replace(/\s+/g, ' ');
}

const errors = [];
let checked = 0;
for (const file of htmlFiles(distDir)) {
  const rel = relative(distDir, file);
  // field-notes/* renders 90 dated cross-posts (and their descriptions on the index);
  // that is historical content canonical to startaitools.com, audited separately.
  if (rel.startsWith('field-notes/')) continue;
  checked += 1;
  const raw = readFileSync(file, 'utf8');
  const text = visibleText(raw);
  const lower = text.toLowerCase();
  for (const s of RETIRED) {
    if (lower.includes(s.toLowerCase())) errors.push(`${rel}: retired string "${s}"`);
  }
  for (const p of PATTERNS) {
    const m = text.match(p.re);
    if (m) errors.push(`${rel}: ${p.name}: "${m[0].trim().slice(0, 60)}"`);
  }
  // hrefs are not visible text but a booking or retired link must not ship either
  for (const s of ['calendar.app.google', 'claudecodeplugins.io', 'whop.com']) {
    if (raw.toLowerCase().includes(s)) errors.push(`${rel}: retired href "${s}"`);
  }
}

if (errors.length) {
  console.error(`check-copy: ${errors.length} violation(s) across ${checked} pages`);
  for (const e of errors) console.error(`  ${e}`);
  process.exit(1);
}
console.log(`check-copy: ${checked} pages clean (no retired strings, dollar figures, dashes, hand-typed counts, or banned pairings)`);
