// tests/helpers.js
const axios = require('axios');

/**
 * Fetch all submissions from Netlify API
 */
async function getNetlifySubmissions(siteId, authToken) {
  try {
    const response = await axios.get(
      `https://api.netlify.com/api/v1/sites/${siteId}/submissions`,
      {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching Netlify submissions:', error.message);
    return null;
  }
}

/**
 * Get the most recent submission
 */
async function getLatestSubmission(siteId, authToken) {
  const submissions = await getNetlifySubmissions(siteId, authToken);
  return submissions && submissions.length > 0 ? submissions[0] : null;
}

/**
 * Wait for a submission with specific email to appear in Netlify
 */
async function waitForSubmission(siteId, authToken, email, maxWaitTime = 30000) {
  const startTime = Date.now();
  const checkInterval = 2000; // Check every 2 seconds

  while (Date.now() - startTime < maxWaitTime) {
    const submissions = await getNetlifySubmissions(siteId, authToken);

    if (submissions) {
      const foundSubmission = submissions.find(sub => sub.data.email === email);
      if (foundSubmission) {
        return foundSubmission;
      }
    }

    await new Promise(resolve => setTimeout(resolve, checkInterval));
  }

  return null;
}

/**
 * Generate unique test email
 */
function generateTestEmail(prefix = 'test') {
  const timestamp = Date.now();
  return `${prefix}-${timestamp}@example.com`;
}

/**
 * Log test result with formatting
 */
function logTestResult(testName, status, details = {}) {
  const statusIcon = status === 'PASS' ? '✓' : '❌';
  console.log(`\n========== ${testName} ==========`);
  console.log(`${statusIcon} Status: ${status}`);

  Object.entries(details).forEach(([key, value]) => {
    console.log(`  ${key}: ${value}`);
  });

  console.log(`${'='.repeat(testName.length + 22)}\n`);
}

/**
 * Save test evidence to file
 */
async function saveTestEvidence(filename, data) {
  const fs = require('fs');
  const path = require('path');

  const evidencePath = path.join(__dirname, 'reports', filename);
  fs.writeFileSync(evidencePath, JSON.stringify(data, null, 2));

  return evidencePath;
}

module.exports = {
  getNetlifySubmissions,
  getLatestSubmission,
  waitForSubmission,
  generateTestEmail,
  logTestResult,
  saveTestEvidence
};
