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
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
import { jsPDF } from 'jspdf';
import { toJpeg } from 'html-to-image';
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
  X,
  Mail,
  ShieldCheck,
} from 'lucide-angular';
import { BreadcrumbComponent } from '../../shared/ui/breadcrumb/breadcrumb';
import { SeoService } from '../../shared/core/seo/seo.service';
import { NgxTurnstileModule } from 'ngx-turnstile';

@Component({
  selector: 'app-quote-generator',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LucideAngularModule,
    BreadcrumbComponent,
    NgxTurnstileModule,
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
    if (this.currentStep() < 3) {
      if (this.currentStep() === 1 && !this.isStep1Valid()) return;
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
    if (step < this.currentStep()) {
      this.currentStep.set(step);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (step > this.currentStep() && this.isStep1Valid()) {
      this.currentStep.set(step);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  isStep1Valid(): boolean {
    const controls = ['companyName', 'clientName'];
    let valid = true;
    controls.forEach((c) => {
      if (this.quoteForm.get(c)?.invalid) {
        this.quoteForm.get(c)?.markAsTouched();
        valid = false;
      }
    });
    return valid;
  }

  ngOnInit() {
    this.seoService.setPageMetadata({
      title: 'Darmowy Generator Wycen dla Warsztatów | Scale Sail',
      description:
        'Kalkulator wycen online dla mechaników. Wpisz części i robociznę, a generator natychmiast stworzy profesjonalny PDF gotowy do wysłania klientowi.',
      slug: 'free-quote-generator',
      type: 'website',
    });

    this.seoService.setBreadcrumbs([
      { name: 'Start', path: '/' },
      { name: 'Narzędzia', path: '/free-quote-generator' },
      { name: 'Kreator Wycen', path: '/free-quote-generator' },
    ]);

    this.seoService.setSchema(
      {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'Darmowy Generator Wycen Napraw',
        url: 'https://scale-sail.io/free-quote-generator',
        description:
          'Profesjonalny kreator wycen warsztatowych z eksportem do pliku PDF na e-mail. Pozwala na zliczenie marży, robocizny i wystawienie eleganckiego dokumentu chronograficznego dla klienta warsztatu.',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'All',
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
    X,
    Mail,
    ShieldCheck,
  };

  quoteForm: FormGroup = this.fb.group({
    companyName: ['Dobry Serwis Janusz i Syn', Validators.required],
    clientName: ['', Validators.required],
    clientPhone: [''],
    vehicleMake: [''],
    vehicleModel: [''],
    vehicleVin: [''],
    vehiclePlate: [''],
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

  vat = computed(() => this.subtotal() * 0.23);
  total = computed(() => this.subtotal() + this.vat());

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

  // No longer needed as we use computed signals:
  // getSubtotal(), getVat(), getTotal()

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
    if (this.emailForm.valid && this.turnstileToken()) {
      this.isGenerating.set(true);
      console.log('Przygotowuję PDF dla: ', this.emailForm.value.email);

      // We use requestAnimationFrame to ensure the UI has updated (e.g. loader shown)
      // before starting the heavy PDF generation process.
      await new Promise((r) => requestAnimationFrame(r));

      try {
        await this.generatePDF();
        this.showEmailModal.set(false);
        this.showThankYou.set(true);
      } catch (e: unknown) {
        const err = e as Error;
        alert(`Błąd pliku PDF lub wysyłki: ${err?.message || err}`);
      } finally {
        this.isGenerating.set(false);
      }
    }
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

  async generatePDF() {
    const contentRef = this.pdfContent();
    if (!contentRef) return;
    const data = contentRef.nativeElement;

    // Grabbing wrappers to disable scroll clipping and zoom
    const zoomWrapper = data.parentElement;
    const scrollContainer = zoomWrapper?.parentElement;

    const originalZoom = zoomWrapper ? zoomWrapper.style.zoom : '';
    const originalOverflow = scrollContainer ? scrollContainer.style.overflow : '';
    const originalMaxHeight = scrollContainer ? scrollContainer.style.maxHeight : '';

    try {
      // 1. Un-constrain the DOM so html-to-image can capture the full height without scroll clipping
      if (zoomWrapper) zoomWrapper.style.zoom = '1';
      if (scrollContainer) {
        scrollContainer.style.overflow = 'visible';
        scrollContainer.style.maxHeight = 'none';
      }

      // Wait for browser to reflow the layout using requestAnimationFrame
      await new Promise((r) => requestAnimationFrame(r));

      const imgData = await toJpeg(data, {
        quality: 0.75,
        pixelRatio: 1.5,
        cacheBust: true,
        skipFonts: true,
      });

      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);

      const pdfPageWidth = pdf.internal.pageSize.getWidth(); // A4 width ~ 210mm
      const pdfPageHeight = pdf.internal.pageSize.getHeight(); // A4 height ~ 297mm

      // 2. Scale proportionally to fit entirely on ONE page
      let finalWidth = pdfPageWidth;
      let finalHeight = (imgProps.height * pdfPageWidth) / imgProps.width;

      if (finalHeight > pdfPageHeight) {
        finalHeight = pdfPageHeight;
        finalWidth = (imgProps.width * pdfPageHeight) / imgProps.height;
      }

      const xOffset = (pdfPageWidth - finalWidth) / 2;

      pdf.addImage(imgData, 'JPEG', xOffset, 0, finalWidth, finalHeight);

      // === NOWE: Przygotowanie paczki dla Webhooka zamiast pobierania ===
      const pdfBlob = pdf.output('blob');
      const formData = new FormData();
      // Zmiana nazwy pola na 'data' – tego domyślnie oczekuje n8n w swoich modułach (np. Gmail)
      formData.append('data', pdfBlob, `Wycena_${this.quoteForm.value.clientName || 'Klient'}.pdf`);
      formData.append('email', this.emailForm.value.email);
      formData.append('companyName', this.quoteForm.value.companyName || '');
      formData.append('clientName', this.quoteForm.value.clientName || '');
      formData.append('cf-turnstile-response', this.turnstileToken() || '');

      // Adres Twojego webhooka z n8n/Make/Zapier
      const WEBHOOK_URL = 'https://hook.eu1.make.com/yd904he1om2qyevj8aktgk35rjfr4gx9';

      console.log('Wysyłam zapytanie do webhooka...', formData);

      // Symulacja opóźnienia sieciowego (usunąć w produkcji)
      await new Promise((r) => setTimeout(r, 1000));

      // ODKOMENTUJ poniższy kod, aby fizycznie strzelać do webhooka:

      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        throw new Error('Błąd komunikacji z Webhookiem');
      }
    } catch (e: unknown) {
      const err = e as Error;
      console.error('Failed to generate PDF', err);
      throw err;
    } finally {
      // 3. Restore all original styles
      if (zoomWrapper) zoomWrapper.style.zoom = originalZoom;
      if (scrollContainer) {
        scrollContainer.style.overflow = originalOverflow;
        scrollContainer.style.maxHeight = originalMaxHeight;
      }
    }
  }
}
