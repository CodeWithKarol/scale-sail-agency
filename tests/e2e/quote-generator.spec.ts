import { test, expect } from '@playwright/test';
import { QuoteGeneratorPage } from '../pages/quote-generator.page';

test.describe('Quote Generator (E2E)', () => {
  let quotePage: QuoteGeneratorPage;

  test.beforeEach(async ({ page }) => {
    quotePage = new QuoteGeneratorPage(page);
    await quotePage.goto();
  });

  test('should correctly calculate markup and retail price', async ({ page }) => {
    await quotePage.fillStep1('Service', 'John Doe', 'Audi', 'A4');
    await expect(page.getByText('Co naprawiamy?')).toBeVisible();
    
    // Change net purchase price
    await quotePage.firstPartNetPrice.fill('100');
    // Default markup is 30%, so price should be 130
    await expect(quotePage.firstPartPrice).toHaveValue('130');
    
    // Change markup to 50%
    await quotePage.firstPartMarkup.fill('50');
    await expect(quotePage.firstPartPrice).toHaveValue('150');
    
    // Manually change retail price to 200
    await quotePage.firstPartPrice.fill('200');
    // Markup should be recalculated (100% of 100)
    await expect(quotePage.firstPartMarkup).toHaveValue('100');
  });

  test('should correctly sum multiple items (parts and labor)', async ({ page }) => {
    await quotePage.fillStep1('Service', 'John Doe', 'Audi', 'A4');
    await expect(page.getByText('Co naprawiamy?')).toBeVisible();
    
    // First part: 100 PLN (net)
    await quotePage.firstPartNetPrice.fill('100');
    await quotePage.firstPartMarkup.fill('0'); // Retail: 100
    
    // Add second part
    await quotePage.addPartRow();
    const secondPart = page.locator('[formArrayName="parts"] > div').nth(1);
    await secondPart.locator('input[formControlName="name"]').fill('Screws');
    await secondPart.locator('input[formControlName="netPrice"]').fill('50');
    await secondPart.locator('input[formControlName="markup"]').fill('0'); // Retail: 50
    
    // Labor: 1h at 200 PLN (should be default, but let's make sure)
    const laborRow = page.locator('[formArrayName="labor"] > div').first();
    await laborRow.locator('input[formControlName="hours"]').fill('1');
    await laborRow.locator('input[formControlName="rate"]').fill('200');
    
    // Total net: 100 + 50 + 200 = 350
    await quotePage.nextStepBtn.click();
    await expect(page.getByText('Wszystko gotowe?')).toBeVisible();
    
    // Check summary in step 3
    // Use regex to match "350" regardless of formatting (non-breaking spaces, etc.)
    await expect(quotePage.subtotalValue).toContainText(/350,00/);
    await expect(quotePage.vatValue).toContainText(/80,50/);
    await expect(quotePage.totalBruttoValue).toContainText(/430,50/);
  });

  test('should allow removing items', async ({ page }) => {
    await quotePage.fillStep1('Service', 'John Doe', 'Audi', 'A4');
    await expect(page.getByText('Co naprawiamy?')).toBeVisible();
    
    // Add an extra part (there will be 2)
    await quotePage.addPartRow();
    await expect(page.locator('[formArrayName="parts"] > div')).toHaveCount(2);
    
    // Remove the first one
    await quotePage.removeFirstPart();
    await expect(page.locator('[formArrayName="parts"] > div')).toHaveCount(1);
  });

  test('should correctly navigate back', async ({ page }) => {
    await quotePage.fillStep1('Test Workshop', 'Test Client', 'BMW', 'X5');
    await expect(page.getByText('Co naprawiamy?')).toBeVisible();
    
    await quotePage.nextStepBtn.click();
    await expect(page.getByText('Wszystko gotowe?')).toBeVisible();
    
    // Back to step 2
    await quotePage.prevStepBtn.click();
    await expect(page.getByText('Co naprawiamy?')).toBeVisible();
    
    // Back to step 1
    await quotePage.prevStepBtn.click();
    await expect(page.getByText('Gdzie serwisujemy?')).toBeVisible();
    
    // Check if data was preserved
    await expect(quotePage.companyNameInput).toHaveValue('Test Workshop');
    await expect(quotePage.clientNameInput).toHaveValue('Test Client');
  });
});
