// playwright.config.js
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: false,  // Run tests sequentially to avoid rate limits
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,  // Run one test at a time
  reporter: [
    ['html', { outputFolder: 'tests/reports/playwright-html' }],
    ['json', { outputFile: 'tests/reports/test-results.json' }],
    ['junit', { outputFile: 'tests/reports/test-results.xml' }],
    ['list']
  ],

  use: {
    baseURL: process.env.SURVEY_URL || 'https://intentsolutions.io',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    headless: true,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 13'] },
    },
  ],

  // Webserver for local testing
  webServer: process.env.CI ? undefined : {
    command: 'npm run preview',
    url: 'http://localhost:4321',
    reuseExistingServer: !process.env.CI,
  },
});
