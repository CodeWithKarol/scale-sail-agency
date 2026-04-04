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

    // Fill name for the default part to make it valid
    await page.locator('input[formControlName="name"]').first().fill('Brake Pads');

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
    await page.locator('input[formControlName="name"]').first().fill('Brake Pads');
    await quotePage.firstPartNetPrice.fill('100');
    await quotePage.firstPartMarkup.fill('0'); // Retail: 100

    // Add second part
    await quotePage.addPartRow();
    const secondPart = page.locator('[formArrayName="parts"] > div').nth(1);
    await secondPart.locator('input[formControlName="name"]').fill('Screws');
    await secondPart.locator('input[formControlName="netPrice"]').fill('50');
    await secondPart.locator('input[formControlName="markup"]').fill('0'); // Retail: 50

    // Labor: 1h at 200 PLN
    const laborRow = page.locator('[formArrayName="labor"] > div').first();
    await laborRow.locator('input[formControlName="name"]').fill('Repair');
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

    // Must fill Step 2 to proceed to Step 3
    await quotePage.fillStep2();
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

  test('should show error message and block navigation when both empty', async ({ page }) => {
    await quotePage.fillStep1('Service', 'John Doe', 'Audi', 'A4');
    await expect(page.getByText('Co naprawiamy?')).toBeVisible();

    // Initial state: 1 part, 1 labor
    await expect(page.locator('[formArrayName="parts"] > div')).toHaveCount(1);
    await expect(page.locator('[formArrayName="labor"] > div')).toHaveCount(1);
    await expect(quotePage.nextStepBtn).toBeEnabled();

    // Remove the only part
    await quotePage.removeFirstPart();
    await expect(page.locator('[formArrayName="parts"] > div')).toHaveCount(0);
    await expect(page.getByText('Brak pozycji w tej sekcji').first()).toBeVisible();
    // Still enabled because labor exists
    await expect(quotePage.nextStepBtn).toBeEnabled();

    // Remove the only labor item
    const removeLaborBtn = page.locator('[formArrayName="labor"] button.absolute.-top-3').first();
    await removeLaborBtn.click();
    await expect(page.locator('[formArrayName="labor"] > div')).toHaveCount(0);
    await expect(page.getByText('Brak pozycji w tej sekcji').last()).toBeVisible();

    // BOTH EMPTY -> Button is NOT disabled anymore
    await expect(quotePage.nextStepBtn).toBeEnabled();

    // Click "Dalej" and expect error
    await quotePage.nextStepBtn.click();
    await expect(page.getByText('Dodaj przynajmniej jedną część lub usługę')).toBeVisible();

    // Add a part back
    await page.getByText('Dodaj pierwszą część').click();
    await expect(page.locator('[formArrayName="parts"] > div')).toHaveCount(1);
    
    // Fill required data to make it 'non-empty'
    await page.locator('input[formControlName="name"]').first().fill('Brake Pads');
    await page.locator('input[formControlName="price"]').first().fill('100');

    // Error should disappear
    await expect(page.getByText('Dodaj przynajmniej jedną część lub usługę')).not.toBeVisible();
  });

  test('should block stepper navigation to step 3 when no items are added', async ({ page }) => {
    await quotePage.fillStep1('Service', 'John Doe', 'Audi', 'A4');
    await expect(page.getByText('Co naprawiamy?')).toBeVisible();

    // Remove the only part
    await quotePage.removeFirstPart();
    
    // Remove the only labor item
    const removeLaborBtn = page.locator('[formArrayName="labor"] button.absolute.-top-3').first();
    await removeLaborBtn.click();

    // Verify Next button is NOT disabled
    await expect(quotePage.nextStepBtn).toBeEnabled();

    // Try to click Stepper Step 3 (03)
    await page.getByTestId('stepper-step-3').click();

    // Verify we are STILL in Step 2 (Co naprawiamy?)
    await expect(page.getByText('Co naprawiamy?')).toBeVisible();
    await expect(page.getByText('Dodaj przynajmniej jedną część lub usługę')).toBeVisible();
  });

  test('should highlight fields in red when markup is invalid leading to 0 price', async ({ page }) => {
    await quotePage.fillStep1('Service', 'John Doe', 'Audi', 'A4');
    await expect(page.getByText('Co naprawiamy?')).toBeVisible();

    const partRow = page.locator('[formArrayName="parts"] > div').first();
    await partRow.locator('input[formControlName="name"]').fill('Edge Case Part');
    
    // Set retail price to 0 manually
    await partRow.locator('input[formControlName="price"]').fill('0');
    
    // Click Next
    await quotePage.nextStepBtn.click();
    
    // Price at 0 should be red because of Validators.min(0.01)
    await expect(partRow.locator('input[formControlName="price"]')).toHaveClass(/border-rose-500/);
    
    // Ensure general error also shows
    await expect(page.getByText('Kosztorys jest pusty')).toBeVisible();
  });
});
