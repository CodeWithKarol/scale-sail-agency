import {
  Component,
  ElementRef,
  viewChild,
  signal,
  computed,
  ChangeDetectionStrategy,
  inject,
  OnInit,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  LucideAngularModule,
  Plus,
  Trash2,
  Download,
  CheckCircle,
  CarFront,
  Loader2,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  ChevronDown,
  X,
  Mail,
  ShieldCheck,
} from 'lucide-angular';
import { BreadcrumbComponent } from '../../../shared/ui/breadcrumb/breadcrumb';
import { Card } from '../../../shared/ui/card/card';
import { Button } from '../../../shared/ui/button/button';
import { SeoService } from '../../../shared/core/seo/seo.service';
import { NgxTurnstileModule } from 'ngx-turnstile';

@Component({
  selector: 'app-quote-generator',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LucideAngularModule,
    BreadcrumbComponent,
    Card,
    Button,
    NgxTurnstileModule,
    RouterLink,
  ],
  templateUrl: './quote-generator.html',
  styleUrl: './quote-generator.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuoteGenerator implements OnInit {
  pdfContent = viewChild<ElementRef>('pdfContent');

  private fb = inject(FormBuilder);
  private seoService = inject(SeoService);

  turnstileToken = signal<string | null>(null);

  showEmailModal = signal(false);
  showThankYou = signal(false);
  isGenerating = signal(false);
  today = new Date();

  // Multi-step logic
  currentStep = signal(1); // 1: Info, 2: Items, 3: Preview

  nextStep() {
    if (this.currentStep() === 1) {
      if (!this.isStep1Valid()) return;
    } else if (this.currentStep() === 2) {
      if (!this.isStep2Valid()) return;
    }

    if (this.currentStep() < 3) {
      this.currentStep.update((s) => s + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  prevStep() {
    if (this.currentStep() > 1) {
      this.currentStep.update((s) => s - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  goToStep(step: number) {
    if (this.showThankYou()) {
      this.showThankYou.set(false);
    }

    // Pozwalaj na powrót zawsze
    if (step < this.currentStep()) {
      this.currentStep.set(step);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Walidacja przy przechodzeniu do przodu
    if (step === 2 && this.isStep1Valid()) {
      this.currentStep.set(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (step === 3 && this.isStep1Valid() && this.isStep2Valid()) {
      this.currentStep.set(3);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  isStep1Valid(): boolean {
    const controls = ['companyName', 'clientName'];
    let valid = true;
    controls.forEach((c) => {
      const ctrl = this.quoteForm.get(c);
      if (ctrl?.invalid) {
        ctrl.markAsTouched();
        valid = false;
      }
    });
    return valid;
  }

  isStep2Valid(): boolean {
    let valid = true;

    // Walidacja części
    this.parts.controls.forEach((group) => {
      if (group.invalid) {
        group.markAllAsTouched();
        valid = false;
      }
    });

    // Walidacja robocizny
    this.labor.controls.forEach((group) => {
      if (group.invalid) {
        group.markAllAsTouched();
        valid = false;
      }
    });

    if (!valid) {
      // Opcjonalnie: można tu dodać jakiś komunikat typu toast lub alert
      console.warn('Proszę uzupełnić wszystkie wymagane pola w kosztorysie.');
    }

    return valid;
  }

  ngOnInit() {
    this.seoService.setPageMetadata({
      title: 'Darmowy Generator Wycen dla Warsztatów (PDF) | Scale Sail',
      description:
        'Twórz profesjonalne wyceny napraw w 60 sekund. Darmowy kalkulator marży i kosztorysu PDF dla mechaników i serwisów. Wyślij gotowy dokument na e-mail klienta.',
      slug: 'tools/free-quote-generator',
      type: 'website',
      keywords: [
        'generator wycen warsztatowych',
        'kalkulator marży części samochodowych',
        'darmowy program do kosztorysów napraw',
        'kosztorys naprawy samochodu pdf',
        'narzędzia dla mechanika online',
        'wycena naprawy blacharskiej program',
        'wzór wyceny warsztatu',
      ],
    });

    this.seoService.setBreadcrumbs([
      { name: 'Start', path: '/' },
      { name: 'Narzędzia', path: '/tools' },
      { name: 'Kreator Wycen', path: '/tools/free-quote-generator' },
    ]);

    this.seoService.setSchema(
      {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'Darmowy Generator Wycen Napraw',
        url: 'https://scale-sail.io/tools/free-quote-generator',
        description:
          'Profesjonalny kreator wycen warsztatowych z eksportem do pliku PDF na e-mail. Pozwala na zliczenie marży, robocizny i wystawienie eleganckiego dokumentu chronograficznego dla klienta warsztatu.',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'All',
        isPartOf: {
          '@type': 'CollectionPage',
          name: 'Darmowe Narzędzia i Kalkulatory dla Warsztatów',
          url: 'https://scale-sail.io/tools',
        },
        creator: {
          '@type': 'Organization',
          name: 'Scale Sail',
          url: 'https://scale-sail.io',
        },
        offers: {
          '@type': 'Offer',
          price: '0.00',
          priceCurrency: 'PLN',
        },
      },
      'json-ld-schema',
    );
  }

  readonly icons = {
    Plus,
    Trash2,
    Download,
    CheckCircle,
    CarFront,
    Loader2,
    ArrowRight,
    ArrowLeft,
    ChevronRight,
    ChevronDown,
    X,
    Mail,
    ShieldCheck,
  };

  quoteForm: FormGroup = this.fb.group({
    companyName: ['', Validators.required],
    clientName: ['', Validators.required],
    clientPhone: [''],
    vehicleMake: [''],
    vehicleModel: [''],
    vehicleVin: [''],
    vehiclePlate: [''],
    vatRate: [23, Validators.required],
    parts: this.fb.array([this.createPart()]),
    labor: this.fb.array([this.createLabor()]),
  });

  emailForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  // Reactive form values as a signal for calculations
  private formValues = toSignal(this.quoteForm.valueChanges, {
    initialValue: this.quoteForm.value,
  });

  // Computed totals for better performance with OnPush
  subtotal = computed(() => {
    const val = this.formValues();
    let sum = 0;
    val.parts?.forEach((part: { qty?: number; price?: number }) => {
      sum += (part.qty || 0) * (part.price || 0);
    });
    val.labor?.forEach((labor: { hours?: number; rate?: number }) => {
      sum += (labor.hours || 0) * (labor.rate || 0);
    });
    return sum;
  });

  vat = computed(() => {
    const rate = this.formValues().vatRate;
    if (isNaN(Number(rate))) return 0;
    return this.subtotal() * (Number(rate) / 100);
  });

  total = computed(() => this.subtotal() + this.vat());

  scrollToPreview() {
    const preview = document.querySelector('.pdf-content-sheet');
    if (preview) {
      preview.scrollIntoView({ behavior: 'smooth' });
    }
  }

  get parts() {
    return this.quoteForm.get('parts') as FormArray;
  }
  get labor() {
    return this.quoteForm.get('labor') as FormArray;
  }

  createPart(): FormGroup {
    const group = this.fb.group({
      name: ['', Validators.required],
      qty: [1, [Validators.required, Validators.min(0.1)]],
      netPrice: [null], // Zakup netto
      markup: [30], // Narzut %
      price: [0, [Validators.required, Validators.min(0)]], // Detal netto szt.
    });

    // Auto-calculate retail price when netPrice or markup changes
    group.valueChanges.subscribe((val) => {
      if (val.netPrice != null && val.markup != null) {
        const calculatedPrice = val.netPrice * (1 + val.markup / 100);
        if (Math.abs(calculatedPrice - (val.price || 0)) > 0.01) {
          group.patchValue({ price: Number(calculatedPrice.toFixed(2)) }, { emitEvent: false });
        }
      }
    });

    // Also allow reverse calculation if they manually type the retail price
    group.get('price')?.valueChanges.subscribe((newPrice) => {
      const net = group.get('netPrice')?.value;
      if (newPrice != null && net != null && net > 0) {
        const calculatedMarkup = ((newPrice - net) / net) * 100;
        const currentMarkup = group.get('markup')?.value || 0;
        if (Math.abs(calculatedMarkup - currentMarkup) > 0.1) {
          group.patchValue({ markup: Math.round(calculatedMarkup) }, { emitEvent: false });
        }
      }
    });

    return group;
  }

  createLabor(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      hours: [1, Validators.required],
      rate: [200, Validators.required],
    });
  }

  addPart() {
    this.parts.push(this.createPart());
  }
  removePart(i: number) {
    this.parts.removeAt(i);
  }

  addLabor() {
    this.labor.push(this.createLabor());
  }
  removeLabor(i: number) {
    this.labor.removeAt(i);
  }

  openDownloadModal() {
    this.turnstileToken.set(null);
    this.showEmailModal.set(true);
  }

  closeEmailModal() {
    this.showEmailModal.set(false);
    this.turnstileToken.set(null);
  }

  onTurnstileResolved(token: string | null) {
    this.turnstileToken.set(token);
  }

  onTurnstileError() {
    console.error('Turnstile verification failed.');
    this.turnstileToken.set(null);
  }

  async submitEmail() {
    if (this.emailForm.invalid) {
      this.emailForm.markAllAsTouched();
      return;
    }

    if (this.turnstileToken()) {
      this.isGenerating.set(true);

      try {
        await this.sendQuoteDataToWebhook();
        this.showEmailModal.set(false);
        this.showThankYou.set(true);
      } catch (e: unknown) {
        const err = e as Error;
        alert(`Wystąpił błąd podczas wysyłania wyceny: ${err?.message || err}`);
      } finally {
        this.isGenerating.set(false);
      }
    }
  }

  editCurrentQuote() {
    this.showThankYou.set(false);
    this.currentStep.set(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  resetFormAndStartOver() {
    this.showThankYou.set(false);
    this.currentStep.set(1);
    this.turnstileToken.set(null);
    this.emailForm.reset();
    this.quoteForm.patchValue({
      clientName: '',
      clientPhone: '',
      vehicleMake: '',
      vehicleModel: '',
      vehicleVin: '',
      vehiclePlate: '',
    });
    this.parts.clear();
    this.labor.clear();
    this.addPart();
    this.addLabor();
  }

  async sendQuoteDataToWebhook() {
    const payload = {
      email: this.emailForm.value.email,
      turnstileToken: this.turnstileToken(),
      quote: {
        ...this.quoteForm.value,
        totals: {
          subtotal: this.subtotal(),
          vat: this.vat(),
          total: this.total(),
        },
      },
    };

    const WEBHOOK_URL = '/api/webhook?type=quote';



    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error('Błąd serwera. Spróbuj ponownie.');
    }
  }
}
