import {
  Component,
  ElementRef,
  viewChild,
  signal,
  ChangeDetectionStrategy,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
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
} from 'lucide-angular';

@Component({
  selector: 'app-quote-generator',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule],
  templateUrl: './quote-generator.html',
  styleUrl: './quote-generator.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuoteGenerator {
  pdfContent = viewChild<ElementRef>('pdfContent');
  turnstileElement = viewChild<ElementRef>('turnstileContainer');

  private fb = inject(FormBuilder);
  platformId = inject(PLATFORM_ID);

  turnstileToken = signal<string | null>(null);

  showEmailModal = signal(false);
  showThankYou = signal(false);
  isGenerating = signal(false);
  today = new Date();

  readonly icons = { Plus, Trash2, Download, CheckCircle, CarFront, Loader2, ArrowRight };

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

  get parts() {
    return this.quoteForm.get('parts') as FormArray;
  }
  get labor() {
    return this.quoteForm.get('labor') as FormArray;
  }

  createPart(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      qty: [1, Validators.required],
      price: [0, Validators.required],
    });
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

  getSubtotal(): number {
    let subtotal = 0;
    this.parts.controls.forEach((ctrl) => {
      subtotal += (ctrl.get('qty')?.value || 0) * (ctrl.get('price')?.value || 0);
    });
    this.labor.controls.forEach((ctrl) => {
      subtotal += (ctrl.get('hours')?.value || 0) * (ctrl.get('rate')?.value || 0);
    });
    return subtotal;
  }

  getVat(): number {
    return this.getSubtotal() * 0.23;
  }

  getTotal(): number {
    return this.getSubtotal() + this.getVat();
  }

  openDownloadModal() {
    this.showEmailModal.set(true);
    setTimeout(() => {
      this.initTurnstile();
    }, 50);
  }

  private initTurnstile() {
    if (!isPlatformBrowser(this.platformId)) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;
    if (w.turnstile) {
      this.renderTurnstile();
      return;
    }
    w.onloadTurnstileCallback = () => {
      this.renderTurnstile();
    };
    const script = document.createElement('script');
    script.src =
      'https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onloadTurnstileCallback';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  }

  private renderTurnstile() {
    const el = this.turnstileElement();
    if (el) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const w = window as any;
      w.turnstile.render(el.nativeElement, {
        sitekey: '0x4AAAAAACvYRxriO7b9Ch5J',
        theme: 'light',
        callback: (token: string) => {
          this.turnstileToken.set(token);
        },
        'error-callback': () => {
          console.error('Turnstile verification failed.');
        },
      });
    }
  }

  async submitEmail() {
    if (this.emailForm.valid && this.turnstileToken()) {
      this.isGenerating.set(true);
      console.log('Przygotowuję PDF dla: ', this.emailForm.value.email);

      // Wait a tiny bit for the modal to disappear from DOM before capturing
      setTimeout(async () => {
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
      }, 50);
    }
  }

  resetFormAndStartOver() {
    this.showThankYou.set(false);
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

      // Wait for browser to reflow the layout
      await new Promise((r) => setTimeout(r, 100));

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

      // Symulacja opóźnienia sieciowego (usuń to, gdy podepniesz prawdziwy link)
      await new Promise((r) => setTimeout(r, 1500));

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
