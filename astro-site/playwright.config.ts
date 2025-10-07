import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright Configuration for HUSTLE Survey Testing
 *
 * Comprehensive E2E testing for 76-question survey
 * Tests form validation, navigation, data persistence, mobile UX
 */
export default defineConfig({
  testDir: './tests/e2e',

  // Maximum time one test can run for 76-question survey
  timeout: 60 * 1000, // 60 seconds for full survey completion

  expect: {
    timeout: 10000 // 10 seconds for assertions
  },

  // Run tests in files in parallel
  fullyParallel: true,

  // Fail the build on CI if you accidentally left test.only
  forbidOnly: !!process.env.CI,

  // Retry on CI only
  retries: process.env.CI ? 2 : 0,

  // Opt out of parallel tests on CI
  workers: process.env.CI ? 1 : undefined,

  // Reporter to use
  reporter: [
    ['html', { outputFolder: 'test-results/html-report' }],
    ['json', { outputFile: 'test-results/results.json' }],
    ['list']
  ],

  use: {
    // Base URL - dev server
    baseURL: 'http://localhost:8080',

    // Collect trace when retrying the failed test
    trace: 'on-first-retry',

    // Screenshot on failure
    screenshot: 'only-on-failure',

    // Video on failure
    video: 'retain-on-failure',

    // Viewport size for desktop tests
    viewport: { width: 1280, height: 720 },
  },

  // Configure projects for major browsers and mobile devices
  projects: [
    {
      name: 'Desktop Chrome',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Desktop Firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'Desktop Safari',
      use: { ...devices['Desktop Safari'] },
    },
    // Mobile browsers (critical for 80%+ mobile users)
    {
      name: 'iPhone 12',
      use: { ...devices['iPhone 12'] },
    },
    {
      name: 'iPhone 12 Pro',
      use: { ...devices['iPhone 12 Pro'] },
    },
    {
      name: 'Pixel 5',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'iPad Pro',
      use: { ...devices['iPad Pro'] },
    },
  ],

  // Run dev server before starting tests
  webServer: {
    command: 'bun run dev --port 8080',
    url: 'http://localhost:8080',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});
