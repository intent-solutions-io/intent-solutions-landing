import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

// Removed routes must not resolve as pages in the built artifact. On the VPS,
// Caddy 301s them (ops/caddy-redirects.md); the preview server has no such
// layer, so here the assertion is "no built page exists" (a native 404), which
// is what makes the Caddy redirect the only thing that answers.
const removed = [
  '/cloud/', '/private-ai/', '/automation/', '/agents/', '/ai-agents/', '/ai-models/',
  '/colab/', '/resellers/', '/learn/', '/learn/models/', '/learn/security/',
  '/a2a/', '/applications/', '/infrastructure/', '/intel-engine/',
  '/security-compliance/', '/support/',
];

const kept = ['/', '/about/', '/projects/', '/contact/', '/field-notes/', '/privacy/', '/terms/', '/acceptable-use/', '/thank-you/'];

test.describe('routes', () => {
  for (const path of removed) {
    test(`${path} is gone from the build`, async ({ request }) => {
      const res = await request.get(path, { maxRedirects: 0 });
      expect([301, 302, 308, 404]).toContain(res.status());
    });
  }
  for (const path of kept) {
    test(`${path} builds`, async ({ request }) => {
      const res = await request.get(path);
      expect(res.status()).toBe(200);
    });
  }
  test('healthz is in the artifact', async () => {
    // Caddy serves the extensionless file on the VPS (deploy smoke checks .ok == true);
    // astro preview does not, so assert the artifact itself.
    const body = JSON.parse(readFileSync(fileURLToPath(new URL('../../dist/healthz', import.meta.url)), 'utf8'));
    expect(body).toMatchObject({ ok: true });
  });
});
