import { test, expect } from '@playwright/test';

test.describe('App Integration Tests', () => {
  test('should load the homepage', async ({ page }) => {
    await page.goto('/');
    
    // Replace with a selector or text that's actually on your homepage
    // For example, checking for the presence of a header or specific text.
    await expect(page).toHaveURL('http://localhost:4200/');
  });

  test('should navigate to about page', async ({ page }) => {
    await page.goto('/about');
    await expect(page).toHaveURL(/.*about/);
  });
});
