import { ComponentFixture, TestBed } from '@angular/core/testing';
import { registerLocaleData } from '@angular/common';
import localePl from '@angular/common/locales/pl';

import { QuoteGenerator } from './quote-generator';

registerLocaleData(localePl);

describe('QuoteGenerator', () => {
  let component: QuoteGenerator;
  let fixture: ComponentFixture<QuoteGenerator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuoteGenerator],
    }).compileComponents();

    fixture = TestBed.createComponent(QuoteGenerator);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
