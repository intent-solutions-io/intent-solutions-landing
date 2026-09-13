import { expect, test } from '@playwright/test';

test('homepage exposes the launch baseline on mobile', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /\S+/);
  await expect(page.locator('script[data-website-id]')).toHaveAttribute(
    'data-domains',
    /oma\.intentsolutions\.io/,
  );
  const action = page.getByRole('navigation', { name: 'Quick action' });
  await expect(action).toBeVisible();
  await expect(action.getByRole('link', { name: 'Request an outcome' })).toHaveAttribute(
    'href',
    '/contact/?door=outcome',
  );
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
});

test('404 and legal routes are present', async ({ page }) => {
  const response = await page.goto('/this-route-does-not-exist');
  expect(response?.status()).toBe(404);
  await expect(page.getByRole('heading', { name: /not found/i })).toBeVisible();

  for (const route of ['/privacy/', '/terms/', '/acceptable-use/']) {
    const legalResponse = await page.goto(route);
    expect(legalResponse?.ok()).toBeTruthy();
    await expect(page).toHaveTitle(/\S+/);
  }
});
