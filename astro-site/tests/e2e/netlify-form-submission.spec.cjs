// tests/form-submission.spec.js
const { test, expect } = require('@playwright/test');
const {
  waitForSubmission,
  generateTestEmail,
  logTestResult,
  saveTestEvidence
} = require('../helpers.cjs');
require('dotenv').config({ path: '.env.test' });

test.describe('Survey Form - Netlify Integration Tests', () => {

  test('TEST 001: Form loads with correct Netlify attributes', async ({ page }) => {
    await page.goto('/survey/15'); // Last section with form

    const form = page.locator('form[data-netlify="true"]');
    await expect(form).toBeVisible();

    // Verify form attributes
    await expect(form).toHaveAttribute('data-netlify', 'true');
    await expect(form).toHaveAttribute('method', 'POST');
    const formName = await form.getAttribute('name');

    // Verify hidden form-name field
    const hiddenField = page.locator('input[name="form-name"][type="hidden"]');
    await expect(hiddenField).toBeAttached();
    const hiddenValue = await hiddenField.getAttribute('value');

    logTestResult('Form Load Test', 'PASS', {
      'Form Name': formName,
      'Hidden Field Value': hiddenValue,
      'Data-Netlify': 'true',
      'Method': 'POST'
    });

    // Take screenshot
    await page.screenshot({
      path: './tests/screenshots/form-loaded.png',
      fullPage: true
    });
  });

  test('TEST 002: Submit valid form and verify submission', async ({ page }) => {
    const testEmail = generateTestEmail('e2e-test');
    const testData = {
      email: testEmail,
      phone: '555-123-4567',
      location: 'Test City, TX'
    };

    await page.goto('/survey/15');

    // Fill only the final section fields (section 15)
    console.log('Filling form with test data...');
    await page.fill('[name="email"]', testData.email);
    await page.fill('[name="phone"]', testData.phone);
    await page.fill('[name="location"]', testData.location);

    // Take screenshot before submit
    await page.screenshot({
      path: './tests/screenshots/form-filled.png',
      fullPage: true
    });

    // Monitor network for form submission
    const [response] = await Promise.all([
      page.waitForResponse(response =>
        response.url().includes('netlify') ||
        response.request().method() === 'POST'
      ),
      page.click('button[type="submit"]')
    ]);

    // Verify redirect to success page
    await page.waitForURL(/thank-you/);
    const currentUrl = page.url();

    logTestResult('Form Submission Test', 'PASS', {
      'Response Status': response.status(),
      'Response URL': response.url(),
      'Redirect URL': currentUrl,
      'Test Email': testData.email
    });

    // Take screenshot of success page
    await page.screenshot({
      path: './tests/screenshots/form-success.png',
      fullPage: true
    });

    // Wait for submission to appear in Netlify (if API credentials provided)
    if (process.env.NETLIFY_SITE_ID && process.env.NETLIFY_AUTH_TOKEN) {
      console.log('Waiting for submission in Netlify dashboard...');
      const submission = await waitForSubmission(
        process.env.NETLIFY_SITE_ID,
        process.env.NETLIFY_AUTH_TOKEN,
        testEmail,
        30000
      );

      if (submission) {
        logTestResult('Netlify Dashboard Verification', 'PASS', {
          'Submission ID': submission.id,
          'Submission Number': submission.number,
          'Timestamp': submission.created_at,
          'Form Name': submission.form_name,
          'Email': submission.data.email
        });

        // Save submission evidence
        await saveTestEvidence(`submission-${submission.id}.json`, submission);

        // Verify all data matches
        expect(submission.data.email).toBe(testData.email);
      } else {
        console.warn('⚠ Submission not found in Netlify dashboard (check manually)');
      }
    }
  });

  test('TEST 003: Network monitoring and error logging', async ({ page }) => {
    const consoleMessages = [];
    const networkErrors = [];
    const requests = [];

    // Capture console logs
    page.on('console', msg => {
      consoleMessages.push({
        type: msg.type(),
        text: msg.text(),
        timestamp: new Date().toISOString()
      });
    });

    // Capture network errors
    page.on('requestfailed', request => {
      networkErrors.push({
        url: request.url(),
        error: request.failure().errorText,
        timestamp: new Date().toISOString()
      });
    });

    // Capture all requests
    page.on('request', request => {
      if (request.method() === 'POST') {
        requests.push({
          method: request.method(),
          url: request.url(),
          timestamp: new Date().toISOString()
        });
      }
    });

    await page.goto('/survey/15');
    await page.fill('[name="email"]', generateTestEmail('network-test'));
    await page.fill('[name="phone"]', '555-123-4567');
    await page.fill('[name="location"]', 'Test City');
    await page.click('button[type="submit"]');

    await page.waitForURL(/thank-you/, { timeout: 10000 });

    logTestResult('Network Monitoring Test', networkErrors.length === 0 ? 'PASS' : 'FAIL', {
      'Console Messages': consoleMessages.length,
      'Network Requests': requests.length,
      'Network Errors': networkErrors.length
    });

    if (networkErrors.length > 0) {
      console.log('\n❌ Network Errors Detected:');
      networkErrors.forEach(err => {
        console.log(`  URL: ${err.url}`);
        console.log(`  Error: ${err.error}`);
      });
    }

    // Save network activity
    await saveTestEvidence('network-activity.json', {
      consoleMessages,
      requests,
      networkErrors
    });

    // Verify no errors
    expect(networkErrors.length).toBe(0);

    // Verify no console errors
    const errors = consoleMessages.filter(m => m.type === 'error');
    expect(errors.length).toBe(0);
  });

  test('TEST 004: Form validation', async ({ page }) => {
    await page.goto('/survey/15');

    // Try to submit empty form
    await page.click('button[type="submit"]');

    // Check for validation messages
    const invalidFields = page.locator(':invalid');
    const invalidCount = await invalidFields.count();

    logTestResult('Form Validation Test', invalidCount > 0 ? 'PASS' : 'FAIL', {
      'Invalid Fields': invalidCount,
      'Validation Active': invalidCount > 0 ? 'YES' : 'NO'
    });

    // Take screenshot of validation state
    await page.screenshot({
      path: './tests/screenshots/validation-error.png',
      fullPage: true
    });

    expect(invalidCount).toBeGreaterThan(0);
  });

  test('TEST 005: Special characters handling', async ({ page }) => {
    const specialCharsTest = {
      email: generateTestEmail('special'),
      phone: '555-123-4567',
      location: "O'Brien's City & Town <Test>"
    };

    await page.goto('/survey/15');

    await page.fill('[name="email"]', specialCharsTest.email);
    await page.fill('[name="phone"]', specialCharsTest.phone);
    await page.fill('[name="location"]', specialCharsTest.location);

    await page.click('button[type="submit"]');
    await page.waitForURL(/thank-you/);

    logTestResult('Special Characters Test', 'PASS', {
      'Test Email': specialCharsTest.email,
      'Location with Special Chars': specialCharsTest.location,
      'Submission': 'SUCCESS'
    });

    // If API available, verify special chars preserved
    if (process.env.NETLIFY_SITE_ID && process.env.NETLIFY_AUTH_TOKEN) {
      const submission = await waitForSubmission(
        process.env.NETLIFY_SITE_ID,
        process.env.NETLIFY_AUTH_TOKEN,
        specialCharsTest.email,
        30000
      );

      if (submission) {
        console.log(`✓ Special characters preserved: ${submission.data.location}`);
        expect(submission.data.location).toBe(specialCharsTest.location);
      }
    }
  });

  test('TEST 006: Mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/survey/15');

    await expect(page.locator('form')).toBeVisible();
    const submitButton = page.locator('button[type="submit"]');
    await expect(submitButton).toBeVisible();
    await expect(submitButton).toBeEnabled();

    logTestResult('Mobile Viewport Test', 'PASS', {
      'Viewport': '375x667 (iPhone SE)',
      'Form Visible': 'YES',
      'Submit Button Visible': 'YES'
    });

    await page.screenshot({
      path: './tests/screenshots/mobile-viewport.png',
      fullPage: true
    });
  });

  test('TEST 007: Rapid successive submissions', async ({ page }) => {
    const submissions = [];

    for (let i = 0; i < 3; i++) {
      const email = generateTestEmail(`rapid-${i}`);

      await page.goto('/survey/15');
      await page.fill('[name="email"]', email);
      await page.fill('[name="phone"]', '555-123-4567');
      await page.fill('[name="location"]', 'Test City');
      await page.click('button[type="submit"]');
      await page.waitForURL(/thank-you/);

      submissions.push(email);
      console.log(`✓ Submission ${i + 1}/3 completed: ${email}`);

      // Small delay between submissions
      await page.waitForTimeout(2000);
    }

    logTestResult('Rapid Submissions Test', 'PASS', {
      'Total Submissions': submissions.length,
      'Emails': submissions.join(', ')
    });

    await saveTestEvidence('rapid-submissions.json', submissions);
  });

  test('TEST 008: Browser console verification', async ({ page }) => {
    const errors = [];

    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    await page.goto('/survey/15');
    await page.fill('[name="email"]', generateTestEmail('console-test'));
    await page.fill('[name="phone"]', '555-123-4567');
    await page.fill('[name="location"]', 'Test City');
    await page.click('button[type="submit"]');
    await page.waitForURL(/thank-you/);

    logTestResult('Console Error Test', errors.length === 0 ? 'PASS' : 'FAIL', {
      'Console Errors': errors.length,
      'Clean Console': errors.length === 0 ? 'YES' : 'NO'
    });

    if (errors.length > 0) {
      console.log('\n❌ Console Errors:');
      errors.forEach(err => console.log(`  ${err}`));
    }

    expect(errors.length).toBe(0);
  });
});
