import { Component, computed, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  LucideAngularModule,
  TrendingDown,
  Clock,
  CircleDollarSign,
  AlertTriangle,
  ArrowRight,
  ChevronRight,
  ShieldCheck,
  FileText,
  Calendar,
} from 'lucide-angular';
import { BreadcrumbComponent } from '../../../shared/ui/breadcrumb/breadcrumb';
import { Card } from '../../../shared/ui/card/card';
import { Button } from '../../../shared/ui/button/button';
import { SeoService } from '../../../shared/core/seo/seo.service';

@Component({
  selector: 'app-loss-calculator',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LucideAngularModule,
    BreadcrumbComponent,
    Card,
    Button,
  ],
  templateUrl: './loss-calculator.html',
  styleUrl: './loss-calculator.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LossCalculator implements OnInit {
  private fb = inject(FormBuilder);
  private seoService = inject(SeoService);

  readonly icons = {
    TrendingDown,
    Clock,
    CircleDollarSign,
    AlertTriangle,
    ArrowRight,
    ChevronRight,
    ShieldCheck,
    FileText,
    Calendar,
  };

  calcForm: FormGroup = this.fb.group({
    mechanicsCount: [3, [Validators.required, Validators.min(1)]],
    jobsPerMonth: [60, [Validators.required, Validators.min(1)]],
    paperworkPerJob: [20, [Validators.required, Validators.min(0)]],
    callsPerJob: [10, [Validators.required, Validators.min(0)]],
    hourlyRate: [200, [Validators.required, Validators.min(1)]],
  });

  private formValues = toSignal(this.calcForm.valueChanges, {
    initialValue: this.calcForm.value,
  });

  // Calculations
  totalMinutesLostPerMonth = computed(() => {
    const val = this.formValues();
    return (val.jobsPerMonth || 0) * ((val.paperworkPerJob || 0) + (val.callsPerJob || 0));
  });

  totalHoursLostPerMonth = computed(() => {
    return this.totalMinutesLostPerMonth() / 60;
  });

  monthlyLossPLN = computed(() => {
    const val = this.formValues();
    return this.totalHoursLostPerMonth() * (val.hourlyRate || 0);
  });

  yearlyLossPLN = computed(() => {
    return this.monthlyLossPLN() * 12;
  });

  daysLostPerMonth = computed(() => {
    return this.totalHoursLostPerMonth() / 8; // Assuming 8h work day
  });

  potentialRevenueLoss = computed(() => {
    // What if those hours were spent on billable work?
    return this.monthlyLossPLN();
  });

  ngOnInit() {
    this.seoService.setPageMetadata({
      title: 'Koszty braku automatyzacji w warsztacie – Kalkulator | Scale Sail',
      description:
        'Oblicz ile pieniędzy ucieka z Twojego warsztatu przez chaos w papierach i brak automatyzacji SMS. Sprawdź Bilans Strat i zacznij oszczędzać dzięki systemowi na własność.',
      slug: 'tools/loss-calculator',
      type: 'website',
      keywords: [
        'kalkulator strat warsztatu',
        'koszty papierologii w firmie',
        'optymalizacja warsztatu samochodowego',
        'ile kosztuje czas mechanika',
        'automatyzacja serwisu koszty',
      ],
    });

    this.seoService.setBreadcrumbs([
      { name: 'Start', path: '/' },
      { name: 'Narzędzia', path: '/tools' },
      { name: 'Kalkulator Strat', path: '/tools/loss-calculator' },
    ]);

    this.seoService.setSchema(
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Kalkulator Strat Operacyjnych dla Warsztatów',
        operatingSystem: 'All',
        applicationCategory: 'BusinessApplication',
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          ratingCount: '48',
        },
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'PLN',
        },
        description:
          'Darmowe narzędzie analityczne dla właścicieli warsztatów samochodowych do obliczania strat finansowych wynikających z braku automatyzacji.',
      },
      'software-app-schema',
    );
  }
}
