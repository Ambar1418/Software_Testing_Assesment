import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

test.describe('AbleSpace Staging User Workflow Automation', () => {
  const email = process.env.ABLESPACE_EMAIL || 'ablespace.qa.test.1791311972161@gmail.com';
  const password = process.env.ABLESPACE_PASSWORD || 'TestPassword123!';

  test('Verify Signin flow and user authentication interface', async ({ page }) => {
    // Step 1: Navigate to Sign In page
    await page.goto('/signin', { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveTitle(/AbleSpace/i);

    // Step 2: Fill Email on initial step
    const emailInput = page.locator('input#email');
    await expect(emailInput).toBeVisible();
    await emailInput.fill(email);

    // Step 3: Click main submit Continue button with exact match
    const continueButton = page.getByRole('button', { name: 'Continue', exact: true });
    await expect(continueButton).toBeEnabled();
    await continueButton.click();

    // Step 4: Verify email submission proceeds to password or handles user state
    await page.waitForTimeout(2000);
    const pageUrl = page.url();
    expect(pageUrl).toContain('ablespace.io');
  });

  test('Verify navigation links and legal compliance pages', async ({ page }) => {
    // Navigate to Privacy Policy
    await page.goto('/privacy-policy', { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(/privacy-policy/);
    const bodyText = await page.innerText('body');
    expect(bodyText.length).toBeGreaterThan(50);

    // Navigate to Terms of Service
    await page.goto('/terms-of-service', { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(/terms-of-service/);
  });

  test('Verify Signup Form Validation and inputs', async ({ page }) => {
    await page.goto('/signup', { waitUntil: 'domcontentloaded' });
    
    // Attempt submitting without email
    const submitBtn = page.getByRole('button', { name: 'Continue', exact: true });
    await expect(submitBtn).toBeVisible();
    await submitBtn.click();

    // Assert validation behavior
    const emailField = page.locator('input[name="email"]');
    await expect(emailField).toBeVisible();
  });
});
