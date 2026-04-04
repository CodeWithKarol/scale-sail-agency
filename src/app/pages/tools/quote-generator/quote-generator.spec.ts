import { ComponentFixture, TestBed } from '@angular/core/testing';
import { registerLocaleData } from '@angular/common';
import { provideRouter } from '@angular/router';
import localePl from '@angular/common/locales/pl';

import { QuoteGenerator } from './quote-generator';

registerLocaleData(localePl);

describe('QuoteGenerator', () => {
  let component: QuoteGenerator;
  let fixture: ComponentFixture<QuoteGenerator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuoteGenerator],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(QuoteGenerator);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.quoteForm.get('parts')?.value.length).toBe(1);
    expect(component.quoteForm.get('labor')?.value.length).toBe(1);
  });

  it('should calculate initial subtotal, vat, and total correctly', () => {
    // Initial values: 1 part (price 0) and 1 labor (1 hr x 0 rate)
    // We patch part price to 100, labor rate to 200.
    const partGroup = component.parts.at(0);
    partGroup.patchValue({ name: 'Test Part', qty: 1, price: 100 });

    const laborGroup = component.labor.at(0);
    laborGroup.patchValue({ rate: 200 });

    fixture.detectChanges();

    // subtotal: 100 (part) + 200 (labor) = 300
    expect(component.subtotal()).toBe(300);
    expect(component.vat()).toBe(300 * 0.23);
    expect(component.total()).toBe(300 * 1.23);
  });

  it('should update totals when adding a part', () => {
    component.labor.at(0).patchValue({ rate: 200 });
    component.addPart();
    const secondPart = component.parts.at(1);
    secondPart.patchValue({ name: 'Extra Part', qty: 2, price: 50 });

    fixture.detectChanges();

    // subtotal: (1*0 initial part) + (2*50 second part) + (1*200 labor) = 300
    expect(component.subtotal()).toBe(300);
  });

  it('should calculate part price based on netPrice and markup', () => {
    component.labor.at(0).patchValue({ rate: 200 });
    const part = component.parts.at(0);
    part.patchValue({ netPrice: 100, markup: 30 });

    // Internal valueChanges logic should update price to 130
    fixture.detectChanges();
    expect(part.get('price')?.value).toBe(130);
    expect(component.subtotal()).toBe(130 + 200);
  });
});
