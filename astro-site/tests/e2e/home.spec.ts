import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const receiptsPath = fileURLToPath(new URL('../../src/data/receipts.json', import.meta.url));
const receipts = JSON.parse(readFileSync(receiptsPath, 'utf8'));

test.describe('homepage', () => {
  test('leads with the gateway headline and one H1', async ({ page }) => {
    await page.goto('/');
    const h1 = page.locator('h1');
    await expect(h1).toHaveCount(1);
    await expect(h1).toHaveText('The front door for AI implementation.');
  });

  test('three door CTAs are present and resolve', async ({ page, request }) => {
    await page.goto('/');
    const hero = page.locator('section').first();
    const doors = [
      { event: 'door-customer', path: '/contact/?door=customer' },
      { event: 'door-member', path: 'https://learn.intentsolutions.io/request-access' },
      { event: 'door-vendor', path: '/contact/?door=vendor' },
    ];
    for (const d of doors) {
      const link = hero.locator(`a[data-umami-event="${d.event}"]`);
      await expect(link).toHaveCount(1);
      await expect(link).toHaveAttribute('href', d.path);
    }
    // internal doors land on the contact page with the door preselected
    await page.goto('/contact/?door=vendor');
    await expect(page.locator('#door')).toHaveValue('vendor');
    // the member door is external; assert it answers
    const res = await request.get('https://learn.intentsolutions.io/request-access');
    expect(res.status()).toBeLessThan(400);
  });

  test('nav carries the five brief links and no booking CTA', async ({ page }) => {
    await page.goto('/');
    const nav = page.getByRole('navigation', { name: 'Primary' });
    for (const label of ['Learn', 'Labs', 'Catalog', 'Field Notes', 'Member sign in']) {
      await expect(nav.getByRole('link', { name: label })).toBeVisible();
    }
    await expect(page.locator('a[href*="calendar.app.google"]')).toHaveCount(0);
    await expect(page.locator('.nav-panel')).toHaveCount(0);
  });

  test('receipts render the JSON figures with verified dates inside 7 days', async ({ page }) => {
    await page.goto('/');
    const limit = 7 * 24 * 3600 * 1000;
    for (const d of [receipts.marketplace.stars_verified_at, receipts.lab.verified_at, receipts.feed.fetched_at]) {
      expect(Date.now() - new Date(d).getTime()).toBeLessThan(limit);
    }
    const marketplace = page.locator('a[data-umami-event="receipt-marketplace"]');
    await expect(marketplace).toContainText(receipts.marketplace.stars.toLocaleString('en-US'));
    await expect(marketplace).toContainText(`verified ${receipts.marketplace.stars_verified_at}`);
    const lab = page.locator('a[data-umami-event="receipt-lab"]');
    await expect(lab).toContainText('fail');
    await expect(lab).toContainText(String(receipts.lab.predicates[0].fail));
    await expect(page.locator('a[data-umami-event="receipt-feed"]').first()).toContainText(receipts.feed.items[0].title);
  });

  test('built HTML carries no retired strings, dollar figures, or dashes', async ({ page }) => {
    const html = await (await page.goto('/'))!.text();
    const text = html.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<[^>]+>/g, ' ');
    for (const s of ['Intelligent Solutions', 'Google Cloud', 'Vertex', 'Firebase', 'BigQuery', 'Book a', 'Cowork Accelerator', 'ChatGPT-class', 'Resellers']) {
      expect(text, s).not.toContain(s);
    }
    expect(text).not.toMatch(/\$\s?\d/);
    expect(text).not.toMatch(/[–—]/);
  });

  test('every external link on the homepage carries an analytics event', async ({ page }) => {
    await page.goto('/');
    const external = page.locator('main a[href^="http"]:not([href*="intentsolutions.io/"]), footer a[href^="http"]');
    const n = await external.count();
    expect(n).toBeGreaterThan(0);
    for (let i = 0; i < n; i += 1) {
      const ev = await external.nth(i).getAttribute('data-umami-event');
      expect(ev, await external.nth(i).getAttribute('href')).toBeTruthy();
    }
  });

  test('keyboard focus is visible and reduced motion is honored', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    await page.keyboard.press('Tab');
    const skip = page.locator('.skip-link');
    await expect(skip).toBeFocused();
    const duration = await page.locator('.btn-primary').first().evaluate((el) => getComputedStyle(el).transitionDuration);
    expect(duration).toBe('0s');
  });
});
