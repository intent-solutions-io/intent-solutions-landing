// tests/netlify-api.spec.js
const { test, expect } = require('@playwright/test');
const axios = require('axios');
const { logTestResult, saveTestEvidence } = require('../helpers.cjs');
require('dotenv').config({ path: '.env.test' });

test.describe('Netlify API Integration Tests', () => {

  test.skip('TEST 009: Verify Netlify API connection', async () => {
    if (!process.env.NETLIFY_SITE_ID || !process.env.NETLIFY_AUTH_TOKEN) {
      console.warn('⚠ Skipping: NETLIFY_SITE_ID and NETLIFY_AUTH_TOKEN required');
      return;
    }

    const response = await axios.get(
      `https://api.netlify.com/api/v1/sites/${process.env.NETLIFY_SITE_ID}`,
      {
        headers: {
          'Authorization': `Bearer ${process.env.NETLIFY_AUTH_TOKEN}`
        }
      }
    );

    logTestResult('Netlify API Connection Test', 'PASS', {
      'API Status': response.status,
      'Site Name': response.data.name,
      'Site URL': response.data.url,
      'Site ID': response.data.id
    });

    await saveTestEvidence('netlify-site-info.json', response.data);

    expect(response.status).toBe(200);
    expect(response.data.id).toBe(process.env.NETLIFY_SITE_ID);
  });

  test.skip('TEST 010: Fetch all form submissions', async () => {
    if (!process.env.NETLIFY_SITE_ID || !process.env.NETLIFY_AUTH_TOKEN) {
      console.warn('⚠ Skipping: NETLIFY_SITE_ID and NETLIFY_AUTH_TOKEN required');
      return;
    }

    const response = await axios.get(
      `https://api.netlify.com/api/v1/sites/${process.env.NETLIFY_SITE_ID}/submissions`,
      {
        headers: {
          'Authorization': `Bearer ${process.env.NETLIFY_AUTH_TOKEN}`
        }
      }
    );

    logTestResult('Fetch Submissions Test', 'PASS', {
      'Total Submissions': response.data.length,
      'API Status': response.status
    });

    // Log first 5 submissions
    console.log('\n📋 Recent Submissions:');
    response.data.slice(0, 5).forEach((submission, idx) => {
      console.log(`\nSubmission ${idx + 1}:`);
      console.log(`  ID: ${submission.id}`);
      console.log(`  Number: ${submission.number}`);
      console.log(`  Created: ${submission.created_at}`);
      console.log(`  Email: ${submission.data.email || 'N/A'}`);
      console.log(`  Form Name: ${submission.form_name}`);
    });

    await saveTestEvidence('all-submissions.json', response.data);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBe(true);
  });

  test.skip('TEST 011: Verify form notification settings', async () => {
    if (!process.env.NETLIFY_SITE_ID || !process.env.NETLIFY_AUTH_TOKEN) {
      console.warn('⚠ Skipping: NETLIFY_SITE_ID and NETLIFY_AUTH_TOKEN required');
      return;
    }

    const response = await axios.get(
      `https://api.netlify.com/api/v1/sites/${process.env.NETLIFY_SITE_ID}/forms`,
      {
        headers: {
          'Authorization': `Bearer ${process.env.NETLIFY_AUTH_TOKEN}`
        }
      }
    );

    console.log('\n📋 Form Configuration:');
    response.data.forEach(form => {
      console.log(`\nForm: ${form.name}`);
      console.log(`  ID: ${form.id}`);
      console.log(`  Submissions: ${form.submission_count}`);
      console.log(`  Fields: ${form.fields.map(f => f.name).join(', ')}`);

      if (form.notification_emails && form.notification_emails.length > 0) {
        console.log(`  ✓ Email Notifications: ${form.notification_emails.join(', ')}`);
      } else {
        console.log(`  ⚠ No email notifications configured`);
      }
    });

    await saveTestEvidence('form-configuration.json', response.data);

    expect(response.status).toBe(200);
  });

  test.skip('TEST 012: Export submissions to CSV', async () => {
    if (!process.env.NETLIFY_SITE_ID || !process.env.NETLIFY_AUTH_TOKEN) {
      console.warn('⚠ Skipping: NETLIFY_SITE_ID and NETLIFY_AUTH_TOKEN required');
      return;
    }

    const response = await axios.get(
      `https://api.netlify.com/api/v1/sites/${process.env.NETLIFY_SITE_ID}/submissions.csv`,
      {
        headers: {
          'Authorization': `Bearer ${process.env.NETLIFY_AUTH_TOKEN}`
        }
      }
    );

    const fs = require('fs');
    const exportPath = './tests/reports/submissions-export.csv';
    fs.writeFileSync(exportPath, response.data);

    logTestResult('CSV Export Test', 'PASS', {
      'Export Status': response.status,
      'File Path': exportPath,
      'File Size': `${response.data.length} bytes`
    });

    expect(response.status).toBe(200);
    expect(response.data.length).toBeGreaterThan(0);
  });
});
