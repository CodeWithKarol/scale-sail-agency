import { Page, Locator, expect } from '@playwright/test';

export class QuoteGeneratorPage {
  readonly page: Page;

  // Step 1: Main Info & Vehicle
  readonly companyNameInput: Locator;
  readonly clientNameInput: Locator;
  readonly vehicleMakeInput: Locator;
  readonly vehicleModelInput: Locator;
  readonly vehiclePlateInput: Locator;

  // Step 2: Parts & Labor
  readonly addPartBtn: Locator;
  readonly addLaborBtn: Locator;
  readonly firstPartNetPrice: Locator;
  readonly firstPartMarkup: Locator;
  readonly firstPartPrice: Locator;
  readonly partRows: Locator;
  readonly laborRows: Locator;

  // Navigation
  readonly nextStepBtn: Locator;
  readonly prevStepBtn: Locator;
  readonly sendPdfBtn: Locator;

  // Totals in Preview (Step 3)
  readonly subtotalValue: Locator;
  readonly vatValue: Locator;
  readonly totalBruttoValue: Locator;

  // Email Modal
  readonly emailInput: Locator;
  readonly submitEmailBtn: Locator;
  readonly successMessage: Locator;

  // Success Screen Actions
  readonly startOverBtn: Locator;
  readonly editQuoteBtn: Locator;

  constructor(page: Page) {
    this.page = page;

    // Step 1
    this.companyNameInput = page.getByLabel(/Nazwa Twojego Warsztatu/i);
    this.clientNameInput = page.getByLabel(/Imię i Nazwisko \/ Firma Klienta/i);
    this.vehicleMakeInput = page.getByPlaceholder('np. Toyota');
    this.vehicleModelInput = page.getByPlaceholder('np. Corolla 2.0');
    this.vehiclePlateInput = page.getByPlaceholder('np. WX 12345');

    // Step 2
    this.partRows = page.getByTestId('part-row');
    this.laborRows = page.getByTestId('labor-row');

    this.addPartBtn = page.getByRole('button', { name: /dodaj część/i });
    this.addLaborBtn = page.getByRole('button', { name: /dodaj pozycję/i });

    this.firstPartNetPrice = this.partRows.first().locator('input[formControlName="netPrice"]');
    this.firstPartMarkup = this.partRows.first().locator('input[formControlName="markup"]');
    this.firstPartPrice = this.partRows.first().locator('input[formControlName="price"]');

    // Navigation
    this.nextStepBtn = page.getByRole('button', { name: /dalej/i });
    this.prevStepBtn = page.getByRole('button', { name: /wstecz/i });
    this.sendPdfBtn = page.getByRole('button', { name: /wyślij pdf na swój e-mail/i });

    // Totals in Preview (Step 3)
    this.subtotalValue = page.getByTestId('preview-subtotal');
    this.vatValue = page.getByTestId('preview-vat');
    this.totalBruttoValue = page.getByTestId('preview-total');

    // Email Modal
    this.emailInput = page.locator('input[formControlName="email"]');
    this.submitEmailBtn = page.getByRole('button', { name: /odbierz plik pdf/i });
    this.successMessage = page.locator('text=Wycena poleciała na Twój e-mail!');

    // Success Screen Actions
    this.startOverBtn = page.getByRole('button', { name: /rozpocznij nową wycenę/i });
    this.editQuoteBtn = page.getByRole('button', { name: /wróć by edytować/i });
  }

  async goto() {
    await this.page.goto('/tools/free-quote-generator');
    // Clear state to avoid issues with localStorage persistence between tests
    await this.page.evaluate(() => localStorage.clear());
    await this.page.reload(); // Reload to ensure form is reset
    await expect(this.companyNameInput).toBeVisible();
  }

  async fillStep1(
    company: string,
    client: string,
    make: string,
    model: string,
    plate: string = 'WX 12345',
  ) {
    await this.companyNameInput.fill(company);
    await this.clientNameInput.fill(client);
    await this.vehicleMakeInput.fill(make);
    await this.vehicleModelInput.fill(model);
    await this.vehiclePlateInput.fill(plate);
    await this.nextStepBtn.click();
  }

  async fillStep2() {
    // Fill first part (already exists by default)
    const firstPart = this.partRows.first();
    await firstPart.locator('input[formControlName="name"]').fill('Test Part');
    await firstPart.locator('input[formControlName="netPrice"]').fill('100');

    // Fill first labor (already exists by default)
    const firstLabor = this.laborRows.first();
    await firstLabor.locator('input[formControlName="name"]').fill('Test Labor');
    await firstLabor.locator('input[formControlName="rate"]').fill('200');

    await this.nextStepBtn.click();
  }

  async addPartRow() {
    await this.addPartBtn.click();
  }

  async addLaborRow() {
    await this.addLaborBtn.click();
  }

  async removeFirstPart() {
    const removeBtn = this.partRows.first().getByRole('button', { name: /usuń część/i });
    await removeBtn.click();
  }

  async removeFirstLabor() {
    const removeBtn = this.laborRows.first().getByRole('button', { name: /usuń usługę/i });
    await removeBtn.click();
  }

  async submitQuote(email: string) {
    await this.sendPdfBtn.click();
    await this.emailInput.fill(email);
  }
}
