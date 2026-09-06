import { defineConfig, devices } from '@playwright/test';

// One config. Runs against `astro preview` on the built dist so the specs test
// the artifact that deploys. CI: `npm run build && npx playwright test`.
export default defineConfig({
  testDir: './tests/e2e',
  timeout: 30_000,
  expect: { timeout: 5_000 },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['list'], ['html', { open: 'never', outputFolder: 'test-results/html' }]] : [['list']],
  use: {
    baseURL: process.env.BASE_URL || 'http://127.0.0.1:4321',
    trace: 'on-first-retry',
  },
  webServer: process.env.BASE_URL
    ? undefined
    : {
        command: 'npx astro preview --host 127.0.0.1 --port 4321',
        url: 'http://127.0.0.1:4321/',
        reuseExistingServer: !process.env.CI,
        timeout: 60_000,
      },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
  ],
});
