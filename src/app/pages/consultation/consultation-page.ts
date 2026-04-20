import {
  Component,
  ChangeDetectionStrategy,
  inject,
  signal,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { SeoService } from '../../shared/core/seo/seo.service';
import { BreadcrumbComponent } from '../../shared/ui/breadcrumb/breadcrumb';
import { Button } from '../../shared/ui/button/button';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { LucideAngularModule, ArrowRight, Info, LayoutGrid, Mail } from 'lucide-angular';
import { NgxTurnstileModule } from 'ngx-turnstile';
import { CalService } from '../../shared/services/cal.service';

import { SectionHeader } from '../../shared/ui/section-header/section-header';

type QualificationStatus = 'PENDING' | 'SUBMITTING' | 'ACCEPTED' | 'REJECTED';

@Component({
  selector: 'app-consultation-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BreadcrumbComponent,
    Button,
    LucideAngularModule,
    NgxTurnstileModule,
    SectionHeader,
  ],
  templateUrl: './consultation-page.html',

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConsultationPage implements OnInit {
  private seoService = inject(SeoService);
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);
  private cdr = inject(ChangeDetectorRef);
  private document = inject(DOCUMENT);
  private route = inject(ActivatedRoute);
  private calService = inject(CalService);

  readonly icons = { ArrowRight, Info, LayoutGrid, Mail };

  turnstileToken = signal<string | null>(null);

  // Status Machine
  status = signal<QualificationStatus>('PENDING');

  form = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(50)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
    projectType: ['system', Validators.required],
    budget: ['mid', Validators.required],
    message: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(1000)]],
    botcheck: [false],
  });

  get f() {
    return this.form.controls;
  }

  ngOnInit() {
    this.seoService.setPageMetadata({
      title: 'Kwalifikacja & Konsultacja | Scale Sail Agency',
      description:
        'Zarezerwuj darmową konsultację dla Twojej firmy. Krótka kwalifikacja oszczędzi nasz wspólny czas.',
      slug: 'konsultacja',
      type: 'website',
      keywords: [
        'audyt automatyzacji warsztatu',
        'konsultacja wdrożeniowa IT',
        'analiza procesów w firmie usługowej',
        'doradztwo technologiczne dla warsztatów',
        'wdrożenie systemów biznesowych',
        'optymalizacja procesów warsztatowych',
      ],
    });

    this.seoService.setBreadcrumbs([
      { name: 'Start', path: '/' },
      { name: 'Kwalifikacja', path: '/konsultacja' },
    ]);

    this.seoService.setSchema(
      {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        name: 'Kwalifikacja i Rozmowa Wdrożeniowa',
        description:
          'Darmowa kwalifikacja projektu i rezerwacja terminu konsultacji poprzez kalendarz Cal.com.',
        url: 'https://scale-sail.io/konsultacja',
        mainEntity: {
          '@type': 'Organization',
          name: 'Scale Sail Agency',
          email: 'contact@scale-sail.io',
          contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'sales',
            email: 'contact@scale-sail.io',
            availableLanguage: ['Polish', 'English'],
          },
        },
      },
      'json-ld-contact-page',
    );

    // Parse URL query parameters to pre-fill the form
    this.route.queryParams.subscribe((params) => {
      const pkg = params['package'];
      if (pkg === 'small') {
        this.form.patchValue({ budget: 'mid', projectType: 'system' });
      } else if (pkg === 'medium') {
        this.form.patchValue({ budget: 'mid', projectType: 'automation' });
      } else if (pkg === 'large') {
        this.form.patchValue({ budget: 'high', projectType: 'ai' });
      }
    });
  }

  onSubmit() {
    if (this.status() !== 'PENDING') return;

    if (this.form.invalid || !this.turnstileToken()) {
      this.form.markAllAsTouched();
      return;
    }

    this.status.set('SUBMITTING');

    const budgetValue = this.form.get('budget')?.value;
    const projectType = this.form.get('projectType')?.value;

    // Care package is fundamentally cheaper (800-1500) so we explicitly whitelist it.
    const isQualified = budgetValue === 'mid' || budgetValue === 'high' || projectType === 'care';

    const payload = {
      ...this.form.value,
      isQualified,
      status: isQualified ? 'ACCEPTED' : 'REJECTED',
      subject: `[LEAD-WERYFIKACJA] Opcja: ${budgetValue} | Projekt: ${this.form.value.projectType}`,
      source: 'Consultation Form',
      turnstileToken: this.turnstileToken(),
    };

    const WEBHOOK_URL = '/api/webhook?type=consultation';

    // Send the lead to Make.com webhook for automation
    this.http
      .post(WEBHOOK_URL, payload, { responseType: 'text' })
      .pipe(
        tap(() => {
          setTimeout(() => {
            if (isQualified) {
              this.status.set('ACCEPTED');
              // Ensure Angular re-renders the DOM (Signal) before loading external script
              setTimeout(
                () =>
                  this.calService.loadCalEmbed('my-cal-inline', {
                    name: this.form.value.name,
                    email: this.form.value.email,
                    notes: this.form.value.message,
                  }),
                50,
              );
            } else {
              this.status.set('REJECTED');
            }
          }, 1500); // Artificial delay to simulate "analysis"
        }),
        catchError((err) => {
          console.error('Webhook dispatch failed', err);
          // Faux positive to prevent user frustration
          this.status.set(isQualified ? 'ACCEPTED' : 'REJECTED');
          if (isQualified) {
            setTimeout(
              () =>
                this.calService.loadCalEmbed('my-cal-inline', {
                  name: this.form.value.name,
                  email: this.form.value.email,
                  notes: this.form.value.message,
                }),
              50,
            );
          }
          return of(null);
        }),
      )
      .subscribe();
  }

  onTurnstileResolved(token: string | null) {
    this.turnstileToken.set(token);
  }

  onTurnstileError() {
    console.error('Turnstile verification failed.');
    this.turnstileToken.set(null);
  }
}
