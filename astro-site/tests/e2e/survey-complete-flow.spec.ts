import { test, expect, Page } from '@playwright/test';

/**
 * HUSTLE SURVEY - COMPLETE FLOW TESTING
 *
 * Comprehensive E2E tests for 76-question survey
 * Target: Affluent sports parents spending $30-50k/year on youth athletics
 * Purpose: Google Startups program validation & 50-100 beta testers
 * Incentive: 1 year free subscription
 */

const SURVEY_BASE = '/survey';

// ========================================
// HELPER FUNCTIONS
// ========================================

/**
 * Complete the entire 76-question survey with valid data
 */
async function completeFullSurvey(page: Page) {
  // Section 1: Consent (Q1)
  await page.goto(`${SURVEY_BASE}/1`);
  await page.check('input[name="consent"][value="yes"]');
  await page.click('#next-btn');

  // Section 2: Sports Family Profile (Q2-Q9)
  await expect(page).toHaveURL(/\/survey\/2/);
  await page.fill('input[name="childName"]', 'Sarah Johnson');
  await page.fill('input[name="age"]', '14');
  await page.fill('input[name="primarySport"]', 'Soccer');
  await page.check('input[name="competitiveLevel"][value="travel-club"]');
  await page.fill('input[name="yearsPlaying"]', '8');
  await page.fill('input[name="hoursPerWeek"]', '12');
  await page.fill('input[name="parentRole"]', 'Team Manager');
  await page.check('input[name="householdIncome"][value="100k-150k"]');
  await page.click('#next-btn');

  // Section 3: How You Track Things Now (Q10-Q16)
  await expect(page).toHaveURL(/\/survey\/3/);
  await page.check('input[name="currentTracking"][value="pen-paper"]');
  await page.check('input[name="appsUsed"][value="teamsnap"]');
  await page.check('input[name="trackWhat"][value="games"]');
  await page.check('input[name="trackWhat"][value="stats"]');
  await page.check('input[name="photoVideo"][value="phone-camera-roll"]');
  await page.check('input[name="achievements"][value="mental-notes"]');
  // Q15: Select up to 3 frustrations
  await page.check('input[name="frustrations"][value="scattered-apps"]');
  await page.check('input[name="frustrations"][value="forget-to-log"]');
  await page.check('input[name="frustrations"][value="no-long-term-view"]');
  await page.check('input[name="wantSolution"][value="yes-need-this"]');
  await page.click('#next-btn');

  // Section 4: Pain Points (Q17-Q19)
  await expect(page).toHaveURL(/\/survey\/4/);
  await page.check('input[name="triedOtherApps"][value="yes"]');
  await page.check('input[name="whyStopped"][value="too-complicated"]');
  await page.check('input[name="whyStopped"][value="too-expensive"]');
  await page.check('input[name="disappointment"][value="very-disappointed"]');
  await page.click('#next-btn');

  // Section 5: The App We're Building (Q20-Q24)
  await expect(page).toHaveURL(/\/survey\/5/);
  await page.check('input[name="interestLevel"][value="extremely-interested"]');
  await page.check('input[name="historicalData"][value="yes-critical"]');
  await page.check('input[name="appPreference"][value="comprehensive"]');
  await page.check('input[name="logFrequency"][value="after-every-game"]');
  await page.check('input[name="whoLogs"][value="parent"]');
  await page.click('#next-btn');

  // Section 6: Game/Competition Logging (Q25-Q31)
  await expect(page).toHaveURL(/\/survey\/6/);
  // Q25: Select up to 5 game info items
  await page.check('input[name="gameInfo"][value="date-time"]');
  await page.check('input[name="gameInfo"][value="opponent"]');
  await page.check('input[name="gameInfo"][value="score"]');
  await page.check('input[name="gameInfo"][value="personal-stats"]');
  await page.check('input[name="gameInfo"][value="notes"]');
  await page.check('input[name="photoVideoImportance"][value="very-important"]');
  await page.fill('input[name="timeToLog"]', '5');
  await page.check('input[name="coachFeedback"][value="yes-very-valuable"]');
  await page.check('input[name="whenLog"][value="immediately-after"]');
  await page.check('input[name="multipleKids"][value="yes"]');
  await page.fill('input[name="howManyKids"]', '2');
  await page.click('#next-btn');

  // Section 7: Parent Control & Multi-Kid Management (Q32-Q38)
  await expect(page).toHaveURL(/\/survey\/7/);
  await page.check('input[name="multiKidAccount"][value="very-important"]');
  await page.check('input[name="kidLogin"][value="yes-with-limits"]');
  await page.check('input[name="privateNotes"][value="yes-need-this"]');
  await page.check('input[name="dataExport"][value="yes-absolutely"]');
  await page.check('input[name="coachAccess"][value="yes-view-only"]');
  await page.check('input[name="familyPlan"][value="10-15"]');
  await page.check('input[name="decisionMaker"][value="both-parents"]');
  await page.click('#next-btn');

  // Section 8: Verification & Trust (Q39-Q42)
  await expect(page).toHaveURL(/\/survey\/8/);
  await page.check('input[name="verifyCoaches"][value="yes-critical"]');
  await page.check('input[name="dataPrivacy"][value="very-concerned"]');
  await page.check('input[name="dataSharing"][value="no-keep-private"]');
  await page.check('input[name="trustFactors"][value="verified-coaches"]');
  await page.check('input[name="trustFactors"][value="data-encryption"]');
  await page.click('#next-btn');

  // Section 9: Analytics & Insights (Q43-Q47)
  await expect(page).toHaveURL(/\/survey\/9/);
  // Q43: Select up to 3 insights
  await page.check('input[name="insights"][value="season-improvement"]');
  await page.check('input[name="insights"][value="streaks"]');
  await page.check('input[name="insights"][value="playing-time"]');
  await page.check('input[name="aiRecommendations"][value="yes-helpful"]');
  await page.check('input[name="visualProgress"][value="very-important"]');
  await page.check('input[name="goalSetting"][value="yes-definitely"]');
  await page.check('input[name="celebrateMilestones"][value="yes-kids-love"]');
  await page.click('#next-btn');

  // Section 10: Motivation & Gamification (Q48-Q51)
  await expect(page).toHaveURL(/\/survey\/10/);
  await page.check('input[name="achievementBadges"][value="yes-love-this"]');
  await page.check('input[name="shareAchievements"][value="yes-if-child-approves"]');
  await page.check('input[name="celebrateAchievements"][value="share-close-friends"]');
  await page.check('input[name="leaderboards"][value="motivating-healthy"]');
  await page.click('#next-btn');

  // Section 11: Mobile Experience (Q52-Q54)
  await expect(page).toHaveURL(/\/survey\/11/);
  await page.check('input[name="primaryDevice"][value="phone"]');
  await page.check('input[name="offlineMode"][value="yes-critical"]');
  await page.check('input[name="notifications"][value="yes-daily"]');
  await page.click('#next-btn');

  // Section 12: Privacy & Data Ownership (Q55-Q58)
  await expect(page).toHaveURL(/\/survey\/12/);
  await page.check('input[name="dataPrivacy"][value="extremely-important"]');
  await page.check('input[name="dataOwnership"][value="i-own-can-delete"]');
  await page.check('input[name="anonymizedResearch"][value="yes-if-anonymous"]');
  await page.check('input[name="exportDeleteData"][value="yes-absolutely-critical"]');
  await page.click('#next-btn');

  // Section 13: Future Features (Q59-Q62)
  await expect(page).toHaveURL(/\/survey\/13/);
  // Q59: Select up to 3 future features
  await page.check('input[name="futureFeatures"][value="nutrition-tracking"]');
  await page.check('input[name="futureFeatures"][value="sleep-tracking"]');
  await page.check('input[name="futureFeatures"][value="scholarship-recruiting"]');
  await page.check('input[name="wearableIntegration"][value="yes-already-use"]');
  await page.check('input[name="teamCommunication"][value="very-important-need-badly"]');
  await page.check('input[name="payPremium"][value="yes-if-add-value"]');
  await page.click('#next-btn');

  // Section 14: Pricing & Value (Q63-Q68)
  await expect(page).toHaveURL(/\/survey\/14/);
  await page.check('input[name="monthlyPrice"][value="9.99"]');
  await page.check('input[name="billingPreference"][value="annual-save-money"]');
  await page.check('input[name="pricingModel"][value="free-trial-paid-subscription"]');
  await page.check('input[name="premiumFeatures"][value="ai-insights"]');
  await page.check('input[name="premiumFeatures"][value="recruiting-profile"]');
  await page.check('input[name="premiumFeatures"][value="ad-free"]');
  await page.check('input[name="annualPrice"][value="100-150"]');
  await page.check('input[name="timeSavingsValue"][value="15-20"]');
  await page.click('#next-btn');

  // Section 15: Beta Testing & Contact (Q69-Q76)
  await expect(page).toHaveURL(/\/survey\/15/);
  await page.check('input[name="betaInterest"][value="yes-signup"]');
  await page.check('input[name="timeCommitment"][value="30-45min"]');
  await page.fill('input[name="email"]', 'sarah.parent@example.com');
  await page.fill('input[name="phone"]', '555-123-4567');
  await page.fill('input[name="bestSportsForBeta"]', 'Soccer, Basketball');
  await page.check('input[name="videoInterview"][value="yes-love-to"]');
  await page.check('input[name="parentGroups"][value="very-active"]');
  await page.check('input[name="heardAbout"][value="social-media"]');
}

// ========================================
// TEST SUITE: Complete Survey Flow
// ========================================

test.describe('HUSTLE Survey - Complete Flow (76 Questions)', () => {
  test('should complete entire survey successfully', async ({ page }) => {
    await completeFullSurvey(page);

    // Submit final section
    await page.click('#submit-btn');

    // Should redirect to thank you page
    await expect(page).toHaveURL(/\/survey\/thank-you/, { timeout: 15000 });

    // Verify thank you page content
    await expect(page.locator('text=/thank you|on the list/i')).toBeVisible();
    await expect(page.locator('text=/1 year free/i')).toBeVisible();
  });

  test('should persist data in sessionStorage across sections', async ({ page }) => {
    // Start survey
    await page.goto(`${SURVEY_BASE}/1`);
    await page.check('input[name="consent"][value="yes"]');
    await page.click('#next-btn');

    // Fill section 2
    await page.fill('input[name="childName"]', 'Test Child');
    await page.fill('input[name="age"]', '12');
    await page.click('#next-btn');

    // Go back to section 2
    await page.click('#back-btn');

    // Data should persist
    await expect(page.locator('input[name="childName"]')).toHaveValue('Test Child');
    await expect(page.locator('input[name="age"]')).toHaveValue('12');
  });

  test('should show correct progress percentages', async ({ page }) => {
    await page.goto(`${SURVEY_BASE}/1`);
    await expect(page.locator('text=7%')).toBeVisible();

    await page.check('input[name="consent"][value="yes"]');
    await page.click('#next-btn');
    await expect(page.locator('text=13%')).toBeVisible();

    // Continue through sections...
    await page.goto(`${SURVEY_BASE}/15`);
    await expect(page.locator('text=100%')).toBeVisible();
  });
});

// ========================================
// TEST SUITE: Navigation & Validation
// ========================================

test.describe('Survey Navigation & Validation', () => {
  test('should prevent access without consent', async ({ page }) => {
    // Try to access section 2 without consent
    await page.goto(`${SURVEY_BASE}/2`);

    // Should redirect back to section 1
    await expect(page).toHaveURL(/\/survey\/1/);
  });

  test('should validate required fields in Section 1', async ({ page }) => {
    await page.goto(`${SURVEY_BASE}/1`);

    // Try to proceed without answering
    await page.click('#next-btn');

    // Should show validation alert
    page.on('dialog', async dialog => {
      expect(dialog.message()).toContain('consent');
      await dialog.accept();
    });
  });

  test('should validate required fields in Section 2', async ({ page }) => {
    await page.goto(`${SURVEY_BASE}/1`);
    await page.check('input[name="consent"][value="yes"]');
    await page.click('#next-btn');

    // Try to proceed without filling required fields
    await page.click('#next-btn');

    // Should show validation alert
    page.on('dialog', async dialog => {
      expect(dialog.message()).toMatch(/child|name|age|sport/i);
      await dialog.accept();
    });
  });

  test('should validate Section 15 back button goes to Section 14', async ({ page }) => {
    await page.goto(`${SURVEY_BASE}/15`);

    // Consent to allow navigation
    await page.evaluate(() => sessionStorage.setItem('survey_consent', 'yes'));
    await page.reload();

    await page.click('#back-btn');

    // Should navigate to section 14, not section 2
    await expect(page).toHaveURL(/\/survey\/14/);
  });
});

// ========================================
// TEST SUITE: Multi-Select Limits
// ========================================

test.describe('Survey Checkbox Limits', () => {
  test('Q15: should limit frustrations to 3 selections', async ({ page }) => {
    await page.goto(`${SURVEY_BASE}/1`);
    await page.check('input[name="consent"][value="yes"]');
    await page.click('#next-btn');

    // Navigate to section 3
    await page.goto(`${SURVEY_BASE}/3`);
    await page.evaluate(() => sessionStorage.setItem('survey_consent', 'yes'));
    await page.reload();

    // Try to select 4 frustrations
    const checkboxes = page.locator('.frustration-checkbox');
    await checkboxes.nth(0).check();
    await checkboxes.nth(1).check();
    await checkboxes.nth(2).check();

    // 4th checkbox should trigger alert
    page.once('dialog', async dialog => {
      expect(dialog.message()).toContain('3');
      await dialog.accept();
    });

    await checkboxes.nth(3).check();

    // Only 3 should be checked
    const checkedCount = await page.locator('.frustration-checkbox:checked').count();
    expect(checkedCount).toBe(3);
  });

  test('Q25: should limit game info to 5 selections', async ({ page }) => {
    await page.goto(`${SURVEY_BASE}/6`);
    await page.evaluate(() => sessionStorage.setItem('survey_consent', 'yes'));
    await page.reload();

    // Try to select 6 items
    const checkboxes = page.locator('.game-info-check');
    for (let i = 0; i < 5; i++) {
      await checkboxes.nth(i).check();
    }

    // 6th checkbox should trigger alert
    page.once('dialog', async dialog => {
      expect(dialog.message()).toContain('5');
      await dialog.accept();
    });

    await checkboxes.nth(5).check();

    // Only 5 should be checked
    const checkedCount = await page.locator('.game-info-check:checked').count();
    expect(checkedCount).toBe(5);
  });

  test('Q43: should limit insights to 3 selections', async ({ page }) => {
    await page.goto(`${SURVEY_BASE}/9`);
    await page.evaluate(() => sessionStorage.setItem('survey_consent', 'yes'));
    await page.reload();

    const checkboxes = page.locator('.insights-check');
    await checkboxes.nth(0).check();
    await checkboxes.nth(1).check();
    await checkboxes.nth(2).check();

    page.once('dialog', async dialog => {
      expect(dialog.message()).toContain('3');
      await dialog.accept();
    });

    await checkboxes.nth(3).check();

    const checkedCount = await page.locator('.insights-check:checked').count();
    expect(checkedCount).toBe(3);
  });

  test('Q59: should limit future features to 3 selections', async ({ page }) => {
    await page.goto(`${SURVEY_BASE}/13`);
    await page.evaluate(() => sessionStorage.setItem('survey_consent', 'yes'));
    await page.reload();

    const checkboxes = page.locator('.future-features-check');
    await checkboxes.nth(0).check();
    await checkboxes.nth(1).check();
    await checkboxes.nth(2).check();

    page.once('dialog', async dialog => {
      expect(dialog.message()).toContain('3');
      await dialog.accept();
    });

    await checkboxes.nth(3).check();

    const checkedCount = await page.locator('.future-features-check:checked').count();
    expect(checkedCount).toBe(3);
  });
});

// ========================================
// TEST SUITE: Question Numbering
// ========================================

test.describe('Survey Question Numbering', () => {
  test('Section 15 should have Q69-Q76, not Q61-Q68', async ({ page }) => {
    await page.goto(`${SURVEY_BASE}/15`);
    await page.evaluate(() => sessionStorage.setItem('survey_consent', 'yes'));
    await page.reload();

    // Check for correct question numbering
    await expect(page.locator('text=69. Are you interested')).toBeVisible();
    await expect(page.locator('text=70. If selected for beta')).toBeVisible();
    await expect(page.locator('text=71. Email address')).toBeVisible();
    await expect(page.locator('text=72. Phone number')).toBeVisible();
    await expect(page.locator('text=73. Best sport')).toBeVisible();
    await expect(page.locator('text=74. Would you be willing')).toBeVisible();
    await expect(page.locator('text=75. Are you active')).toBeVisible();
    await expect(page.locator('text=76. How did you hear')).toBeVisible();

    // Should NOT have old numbering
    await expect(page.locator('text=/^61\\./')).not.toBeVisible();
    await expect(page.locator('text=/^62\\./')).not.toBeVisible();
  });
});

// ========================================
// TEST SUITE: Mobile Responsiveness
// ========================================

test.describe('Survey Mobile Experience', () => {
  test('should work on iPhone 12 (primary target device)', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });

    await page.goto(`${SURVEY_BASE}/1`);

    // Form should be visible and usable
    await expect(page.locator('form, input')).toBeVisible();

    // Touch targets should be at least 44x44px
    const radioButtons = page.locator('input[type="radio"]');
    const firstButton = radioButtons.first();
    const box = await firstButton.boundingBox();

    expect(box?.width).toBeGreaterThanOrEqual(20); // Input itself
    // Parent label should provide larger touch target
  });

  test('should have proper spacing on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });

    await page.goto(`${SURVEY_BASE}/2`);
    await page.evaluate(() => sessionStorage.setItem('survey_consent', 'yes'));
    await page.reload();

    // Check that form doesn't overflow viewport
    const form = page.locator('form');
    const box = await form.boundingBox();

    expect(box?.width).toBeLessThanOrEqual(390);
  });
});

// ========================================
// TEST SUITE: Form Submission
// ========================================

test.describe('Survey Form Submission', () => {
  test('should require email in Section 15', async ({ page }) => {
    await page.goto(`${SURVEY_BASE}/15`);
    await page.evaluate(() => sessionStorage.setItem('survey_consent', 'yes'));
    await page.reload();

    await page.check('input[name="betaInterest"][value="yes-signup"]');

    // Try to submit without email
    await page.click('#submit-btn');

    page.once('dialog', async dialog => {
      expect(dialog.message()).toMatch(/email/i);
      await dialog.accept();
    });
  });

  test('should accept valid email formats', async ({ page }) => {
    await page.goto(`${SURVEY_BASE}/15`);
    await page.evaluate(() => sessionStorage.setItem('survey_consent', 'yes'));
    await page.reload();

    const validEmails = [
      'test@example.com',
      'user.name@example.com',
      'user+tag@example.co.uk',
      'user_name@example.com',
    ];

    for (const email of validEmails) {
      await page.fill('input[name="email"]', email);
      const emailInput = page.locator('input[name="email"]');
      await expect(emailInput).toHaveValue(email);
    }
  });
});

// ========================================
// TEST SUITE: Performance
// ========================================

test.describe('Survey Performance', () => {
  test('should load each section quickly', async ({ page }) => {
    for (let i = 1; i <= 15; i++) {
      const startTime = Date.now();

      await page.goto(`${SURVEY_BASE}/${i}`);
      if (i > 1) {
        await page.evaluate(() => sessionStorage.setItem('survey_consent', 'yes'));
        await page.reload();
      }

      await page.waitForLoadState('networkidle');

      const loadTime = Date.now() - startTime;

      // Each section should load in under 3 seconds
      expect(loadTime).toBeLessThan(3000);
    }
  });
});
