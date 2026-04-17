import { test, expect } from '@playwright/test';

test.describe('App Integration Tests', () => {
  test('should load the homepage', async ({ page }) => {
    await page.goto('/');

    // Replace with a selector or text that's actually on your homepage
    // For example, checking for the presence of a header or specific text.
    await expect(page).toHaveURL('http://localhost:4200/');
  });

  test('should navigate to about page', async ({ page }) => {
    await page.goto('/o-mnie');
    await expect(page).toHaveURL(/.*o-mnie/);
  });

  test('should navigate to realizacje page', async ({ page }) => {
    await page.goto('/realizacje');
    await expect(page).toHaveURL(/.*system-dla-warsztatu/);
  });

  test('should navigate to narzedzia page', async ({ page }) => {
    await page.goto('/narzedzia');
    await expect(page).toHaveURL(/.*automatyzacja-warsztatu-narzedzia/);
  });

  test('should navigate to konsultacja page', async ({ page }) => {
    await page.goto('/konsultacja');
    await expect(page).toHaveURL(/.*konsultacja/);
  });
});
