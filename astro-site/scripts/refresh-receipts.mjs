#!/usr/bin/env node
// refresh-receipts.mjs: the only place a number on intentsolutions.io comes from.
//
// Pulls every figure the homepage shows from its live source and writes
// src/data/receipts.json with a verified_at date per value. Components render
// the JSON and its dates; nothing numeric is typed into a component.
//
// Sources (each is independent; a failure keeps the previous value and marks it stale):
//   marketplace: GitHub API (stars, forks) + tonsofskills.com (skills, plugins) + skills.sh (installs)
//   lab:         labs.intentsolutions.io/results/jrig/ (pass / fail / advisory per predicate, as-of time)
//   feed:        intentsolutions.io/field-notes/rss.xml (three latest titles)
//
// Usage: node scripts/refresh-receipts.mjs [--check]   (--check exits 1 if any value is older than 7 days)

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(here, '../src/data/receipts.json');
const REPO = 'jeremylongshore/tons-of-skills-marketplace';
const UA = { 'user-agent': 'intentsolutions.io receipts refresh (+https://intentsolutions.io)' };
const today = new Date().toISOString().slice(0, 10);
const check = process.argv.includes('--check');

let previous = {};
try { previous = JSON.parse(readFileSync(OUT, 'utf8')); } catch { /* first run */ }

async function text(url, headers = {}) {
  const res = await fetch(url, { headers: { ...UA, ...headers }, redirect: 'follow' });
  if (!res.ok) throw new Error(`${url} -> HTTP ${res.status}`);
  return res.text();
}

function num(s) { return Number(String(s).replace(/,/g, '')); }

function kNum(s) {
  const m = String(s).trim().match(/^([\d.]+)\s*([kKmM])?$/);
  if (!m) return NaN;
  const base = Number(m[1]);
  const mult = { k: 1e3, m: 1e6 }[(m[2] || '').toLowerCase()] || 1;
  return Math.round(base * mult);
}

async function marketplace() {
  const out = { ...(previous.marketplace || {}) };
  const errors = [];
  try {
    const gh = JSON.parse(await text(`https://api.github.com/repos/${REPO}`, {
      accept: 'application/vnd.github+json',
      ...(process.env.GITHUB_TOKEN ? { authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
    }));
    out.stars = gh.stargazers_count;
    out.forks = gh.forks_count;
    out.repo_url = gh.html_url;
    out.stars_verified_at = today;
  } catch (e) { errors.push(`github: ${e.message}`); }
  try {
    const html = await text('https://tonsofskills.com/');
    const skills = html.match(/([\d,]+)\s+marketplace-visible(?:\s+agent)?\s+skills/i);
    const plugins = html.match(/([\d,]+)\s+(?:catalog\s+)?plugins/i);
    if (!skills || !plugins) throw new Error('counts not found on page');
    out.skills = num(skills[1]);
    out.plugins = num(plugins[1]);
    out.catalog_verified_at = today;
  } catch (e) { errors.push(`tonsofskills: ${e.message}`); }
  try {
    const html = await text(`https://skills.sh/${REPO}`);
    const m = html.match(/([\d.,]+\s*[kKmM]?)\s*(?:<!--\s*-->)?\s*total installs/i);
    if (!m) throw new Error('install count not found');
    out.installs = kNum(m[1].replace(/,/g, ''));
    out.installs_display = m[1].trim();
    out.installs_verified_at = today;
    out.installs_url = `https://skills.sh/${REPO}`;
  } catch (e) { errors.push(`skills.sh: ${e.message}`); }
  out.url = 'https://tonsofskills.com';
  return { value: out, errors };
}

async function lab() {
  const out = { ...(previous.lab || {}) };
  const errors = [];
  try {
    const html = await text('https://labs.intentsolutions.io/results/jrig/');
    const asOf = html.match(/<time datetime="([^"]+)"/);
    const rows = [...html.matchAll(/<code>(https?:\/\/[^<]+)<\/code>\s*[^<]*?pass:\s*(\d+)\s*[^\d]*fail:\s*(\d+)(?:\s*[^\d]*advisory:\s*(\d+))?/g)];
    if (!rows.length) throw new Error('no predicate rows found');
    out.predicates = rows.map((r) => ({ uri: r[1], pass: Number(r[2]), fail: Number(r[3]), advisory: r[4] ? Number(r[4]) : 0 }));
    out.as_of = asOf ? asOf[1] : null;
    out.verified_at = today;
    out.url = 'https://labs.intentsolutions.io/results/jrig/';
  } catch (e) { errors.push(`lab: ${e.message}`); }
  return { value: out, errors };
}

async function feed() {
  const out = { ...(previous.feed || {}) };
  const errors = [];
  try {
    const xml = await text('https://intentsolutions.io/field-notes/rss.xml');
    const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].slice(0, 3).map((m) => {
      const block = m[1];
      const t = block.match(/<title>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/);
      const l = block.match(/<link>([\s\S]*?)<\/link>/);
      const d = block.match(/<pubDate>([\s\S]*?)<\/pubDate>/);
      return { title: t ? t[1].trim() : '', url: l ? l[1].trim() : '', date: d ? new Date(d[1]).toISOString().slice(0, 10) : null };
    }).filter((i) => i.title && i.url);
    if (!items.length) throw new Error('no items in feed');
    out.items = items;
    out.fetched_at = today;
    out.url = 'https://intentsolutions.io/field-notes/';
  } catch (e) { errors.push(`feed: ${e.message}`); }
  return { value: out, errors };
}

const [m, l, f] = await Promise.all([marketplace(), lab(), feed()]);
const errors = [...m.errors, ...l.errors, ...f.errors];
const receipts = {
  generated_at: today,
  marketplace: m.value,
  lab: l.value,
  feed: f.value,
  catalog: { url: 'https://demos.intentsolutions.io', note: 'Working demos; no count is published for the catalog.' },
  errors,
};

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, JSON.stringify(receipts, null, 2) + '\n');
console.log(`receipts written to ${OUT}`);
for (const e of errors) console.warn(`warn: ${e} (previous value kept)`);

if (check) {
  const limit = 7 * 24 * 3600 * 1000;
  const dates = [
    receipts.marketplace.stars_verified_at,
    receipts.marketplace.catalog_verified_at,
    receipts.marketplace.installs_verified_at,
    receipts.lab.verified_at,
    receipts.feed.fetched_at,
  ];
  const stale = dates.filter((d) => !d || Date.now() - new Date(d).getTime() > limit);
  if (stale.length) {
    console.error(`receipts check: ${stale.length} value(s) missing or older than 7 days`);
    process.exit(1);
  }
  console.log('receipts check: every value verified within 7 days');
}
