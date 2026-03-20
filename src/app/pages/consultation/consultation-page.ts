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

type QualificationStatus = 'PENDING' | 'SUBMITTING' | 'ACCEPTED' | 'REJECTED';

@Component({
  selector: 'app-consultation-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BreadcrumbComponent, Button],
  template: `
    <div class="min-h-screen bg-neutral text-secondary pb-24 sm:pb-32 relative bg-grid-workshop">
      <div class="absolute inset-0 z-0 bg-grid-workshop opacity-40 pointer-events-none"></div>

      <main class="layout-container relative z-10 pt-32 sm:pt-40">
        <app-breadcrumb />

        <div
          class="max-w-4xl mx-auto mt-12 animate-in fade-in slide-in-from-bottom-4 duration-1000"
        >
          <!-- Header Content -->
          <div class="text-center mb-16">
            <div class="inline-flex items-center gap-4 mb-8">
              <span class="w-12 h-1 bg-primary"></span>
              <span class="text-small text-secondary/60">KWALIFIKACJA PROJEKTU</span>
              <span class="w-12 h-1 bg-primary"></span>
            </div>

            <h1 class="heading-1 text-secondary mb-8">BEZPŁATNA KONSULTACJA</h1>

            <p class="text-body sm:text-lg text-secondary/80 max-w-2xl mx-auto">
              Szanuję Twój czas. Zanim usiądziemy do kalendarza, chcę mieć pewność, że faktycznie
              potrafię rozwiązać Twój problem. Odpowiedz uczciwie na kilka pytań.
            </p>
          </div>

          <!-- Interactive Form Container -->
          <div
            class="relative bg-white border-4 border-secondary p-8 sm:p-12 shadow-[16px_16px_0px_0px_rgba(10,31,68,0.05)]"
          >
            <div class="absolute top-0 left-0 w-full h-2 bg-primary"></div>

            <div
              class="flex items-center justify-between mb-10 pb-4 border-b-2 border-secondary/10"
            >
              <div class="flex items-center gap-3">
                <div class="w-3 h-3 bg-secondary"></div>
                <span class="text-small text-secondary/40">{{
                  status() === 'PENDING' ? 'KROK 1 Z 2' : 'KROK 2 Z 2'
                }}</span>
              </div>
              <div class="text-small font-bold text-secondary">
                {{
                  status() === 'PENDING'
                    ? 'FORMULARZ WSTĘPNY'
                    : status() === 'SUBMITTING'
                      ? 'ANALIZA DANYCH'
                      : status() === 'ACCEPTED'
                        ? 'KALENDARZ ODBLOKOWANY'
                        : 'BRAK DOPASOWANIA'
                }}
              </div>
            </div>

            @if (status() === 'PENDING') {
              <!-- Step 1: The Form -->
              <form [formGroup]="form" (ngSubmit)="onSubmit()" class="flex flex-col gap-8">
                <!-- Honeypot -->
                <input
                  type="checkbox"
                  formControlName="botcheck"
                  class="hidden"
                  style="display: none"
                  tabindex="-1"
                  autocomplete="off"
                />

                <!-- Project Type / Problem -->
                <div>
                  <h3 class="font-black text-lg text-secondary mb-2">
                    1. W CZYM MOGĘ POMÓC NAJSZYBCIEJ?
                  </h3>
                  <p class="text-sm text-secondary/60 mb-4">
                    Wybierz główny punkt bólu Twojej firmy.
                  </p>
                  <div class="relative">
                    <select
                      formControlName="projectType"
                      class="input-field appearance-none cursor-pointer"
                    >
                      <option value="system">
                        Potrzebuję prostego systemu do zarządzania zleceniami
                      </option>
                      <option value="automation">
                        Chcę wdrożyć automatyzacje procesów (n8n/Make)
                      </option>
                      <option value="ai">Interesuje mnie wdrożenie integracji i funkcji AI</option>
                      <option value="sla">Mam inny pomysł / Szukam Opieki SLA</option>
                    </select>
                    <div
                      class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-secondary"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M19 9l-7 7-7-7"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>

                <!-- Budget -->
                <div class="pt-6 border-t-2 border-secondary/5">
                  <h3 class="font-black text-lg text-secondary mb-2">2. RAMY INWESTYCYJNE</h3>
                  <p class="text-sm text-secondary/60 mb-4">
                    Budowa dedykowanego systemu to inwestycja, która zwraca się w odzyskanym czasie.
                    W jakim przedziale się poruszamy na start?
                  </p>

                  <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <label
                      class="relative flex cursor-pointer rounded-none border-2 border-secondary/20 bg-white p-4 focus-within:ring-2 focus-within:ring-primary hover:bg-neutral/30 transition-colors"
                    >
                      <input type="radio" formControlName="budget" value="low" class="sr-only" />
                      <span class="flex flex-col">
                        <span
                          class="block text-sm font-black mb-1"
                          [class.text-primary]="f['budget'].value === 'low'"
                          >Poniżej 7 000 zł</span
                        >
                        <span class="block text-xs text-secondary/60"
                          >Szukam tańszego gotowca SaaS</span
                        >
                      </span>
                      <!-- Active Ring overlay -->
                      <span
                        class="pointer-events-none absolute -inset-px border-2"
                        [class.border-transparent]="f['budget'].value !== 'low'"
                        [class.border-primary]="f['budget'].value === 'low'"
                        aria-hidden="true"
                      ></span>
                    </label>

                    <label
                      class="relative flex cursor-pointer rounded-none border-2 border-secondary/20 bg-white p-4 focus-within:ring-2 focus-within:ring-primary hover:bg-neutral/30 transition-colors"
                    >
                      <input type="radio" formControlName="budget" value="mid" class="sr-only" />
                      <span class="flex flex-col">
                        <span
                          class="block text-sm font-black mb-1"
                          [class.text-primary]="f['budget'].value === 'mid'"
                          >7 000 - 16 000 zł</span
                        >
                        <span class="block text-xs text-secondary/60"
                          >Optymalny system i automatyzacje</span
                        >
                      </span>
                      <span
                        class="pointer-events-none absolute -inset-px border-2"
                        [class.border-transparent]="f['budget'].value !== 'mid'"
                        [class.border-primary]="f['budget'].value === 'mid'"
                        aria-hidden="true"
                      ></span>
                    </label>

                    <label
                      class="relative flex cursor-pointer rounded-none border-2 border-secondary/20 bg-white p-4 focus-within:ring-2 focus-within:ring-primary hover:bg-neutral/30 transition-colors"
                    >
                      <input type="radio" formControlName="budget" value="high" class="sr-only" />
                      <span class="flex flex-col">
                        <span
                          class="block text-sm font-black mb-1"
                          [class.text-primary]="f['budget'].value === 'high'"
                          >Powyżej 16 000 zł</span
                        >
                        <span class="block text-xs text-secondary/60"
                          >Zaawansowana platforma i funkcje AI</span
                        >
                      </span>
                      <span
                        class="pointer-events-none absolute -inset-px border-2"
                        [class.border-transparent]="f['budget'].value !== 'high'"
                        [class.border-primary]="f['budget'].value === 'high'"
                        aria-hidden="true"
                      ></span>
                    </label>
                  </div>
                </div>

                <!-- Message -->
                <div class="pt-6 border-t-2 border-secondary/5">
                  <h3 class="font-black text-lg text-secondary mb-2">
                    3. SZCZEGÓŁY (BEZ LANIA WODY)
                  </h3>
                  <textarea
                    formControlName="message"
                    rows="3"
                    class="input-field resize-none"
                    [class.border-accent]="f['message'].invalid && f['message'].touched"
                    placeholder="Opisz w paru słowach, jak dzisiaj przebiega praca i co Cię w tym najbardziej ukłuło (min. 20 znaków)..."
                  ></textarea>
                  @if (f['message'].invalid && f['message'].touched) {
                    <p class="text-accent text-xs font-bold mt-2 uppercase tracking-wide">
                      @if (f['message'].errors?.['required']) {
                        Oczekiwany jest krótki opis.
                      } @else if (f['message'].errors?.['minlength']) {
                        Rozwiń nieco myśl (min. 20 znaków).
                      }
                    </p>
                  }
                </div>

                <!-- Contact Data -->
                <div
                  class="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-6 border-t-2 border-secondary/5"
                >
                  <div>
                    <label for="name" class="block font-black text-sm text-secondary mb-2"
                      >TWOJE IMIĘ (I NAZWA FIRMY)</label
                    >
                    <input
                      type="text"
                      id="name"
                      formControlName="name"
                      class="input-field"
                      [class.border-accent]="f['name'].invalid && f['name'].touched"
                      placeholder="np. Tomek (Warsztat u Tomka)"
                    />
                    @if (f['name'].invalid && f['name'].touched) {
                      <p class="text-accent text-xs font-bold mt-2 uppercase tracking-wide">
                        To pole jest wymagane.
                      </p>
                    }
                  </div>

                  <div>
                    <label for="email" class="block font-black text-sm text-secondary mb-2"
                      >TWÓJ E-MAIL</label
                    >
                    <input
                      type="email"
                      id="email"
                      formControlName="email"
                      class="input-field"
                      [class.border-accent]="f['email'].invalid && f['email'].touched"
                      placeholder="tomek@warsztat.pl"
                    />
                    @if (f['email'].invalid && f['email'].touched) {
                      <p class="text-accent text-xs font-bold mt-2 uppercase tracking-wide">
                        @if (f['email'].errors?.['required']) {
                          Podaj adres email.
                        } @else if (f['email'].errors?.['email']) {
                          Błędny format email.
                        }
                      </p>
                    }
                  </div>
                </div>

                <!-- Submit Action -->
                <div class="mt-8">
                  <app-button
                    type="submit"
                    variant="primary"
                    size="lg"
                    styleClass="w-full sm:w-auto"
                    [disabled]="form.invalid"
                  >
                    <span class="text-lg">PRZEJDŹ DO KALENDARZA </span
                    ><span class="ml-2 font-serif font-black underline">→</span>
                  </app-button>
                  <p class="mt-4 text-xs text-secondary/40 font-mono uppercase tracking-widest">
                    Zaznaczenie "Poniżej 7 000 zł" (z wyjątkiem Opieki SLA) może zaoferować
                    alternatywną ścieżkę pomocy,<br class="hidden sm:block" />
                    aby oszczędzić Twój czas.
                  </p>
                </div>
              </form>
            } @else if (status() === 'SUBMITTING') {
              <!-- Step 2: Loading State -->
              <div
                class="h-[400px] flex flex-col items-center justify-center text-center animate-pulse"
              >
                <div
                  class="w-16 h-16 border-4 border-secondary border-t-primary rounded-full animate-spin mb-8"
                ></div>
                <h3 class="heading-3 mb-2">Przetwarzanie danych...</h3>
                <p class="text-secondary/60">Sprawdzam dopasowanie formularza.</p>
              </div>
            } @else if (status() === 'ACCEPTED') {
              <!-- Step 3A: Accepted -> Embed Calendar -->
              <div class="animate-in fade-in zoom-in-95 duration-500">
                <div class="bg-primary/5 border-2 border-primary p-6 mb-8 flex items-start gap-4">
                  <div
                    class="w-8 h-8 bg-primary text-white flex-shrink-0 flex items-center justify-center font-bold"
                  >
                    ✓
                  </div>
                  <div>
                    <h4 class="font-black text-secondary mb-1">JESTEŚMY DOPASOWANI</h4>
                    <p class="text-sm text-secondary/80">
                      Twój przypadek wymaga głębszej analizy. Traktuję to poważnie, dlatego
                      specjalnie dla Ciebie
                      <b>wydłużam czas naszej wstępnej darmowej rozmowy do pełnych 30 minut</b>.
                      Wybierz dogodny termin w kalendarzu poniżej. Rozmowa do niczego Cię nie
                      zobowiązuje.
                    </p>
                  </div>
                </div>

                <!-- Cal.com / Embed Placeholder -->
                <div
                  class="w-full min-h-[500px] bg-neutral/30 border-2 border-dashed border-secondary/20 relative"
                  id="my-cal-inline"
                  style="overflow:scroll"
                >
                  <!-- Cal.com will inject its iframe here automatically -->
                </div>
              </div>
            } @else if (status() === 'REJECTED') {
              <!-- Step 3B: Rejected -> Alternative Help -->
              <div
                class="min-h-[400px] flex flex-col justify-center animate-in fade-in slide-in-from-bottom-4 duration-500 text-center items-center"
              >
                <div
                  class="w-20 h-20 bg-neutral border-4 border-secondary/20 flex items-center justify-center mb-8"
                >
                  <svg
                    class="w-10 h-10 text-secondary/60"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    ></path>
                  </svg>
                </div>

                <h3 class="heading-2 mb-6">Mam na to inną radę.</h3>
                <p class="text-lg text-secondary/80 max-w-lg mb-8 leading-relaxed">
                  Zaznaczyłeś najniższy próg budżetowy. Obecnie skupiam się wyłącznie na
                  zaawansowanych systemach dedykowanych zaczynających się od wyższych pułapów.<br /><br />Ale
                  to nie znaczy, że zostawię Cię z niczym.
                </p>

                <div
                  class="bg-secondary p-6 inline-block text-left mb-8 max-w-lg shadow-[8px_8px_0px_0px_rgba(10,31,68,0.1)]"
                >
                  <p class="font-mono text-xs uppercase tracking-widest mb-2 text-white/50">
                    Co dalej?
                  </p>
                  <p class="text-white">
                    Dostałem od Ciebie maila z opisem problemu. Do 48 godzin odpiszę Ci
                    <strong>polecając darmowe lub tanie, gotowe narzędzie abonamentowe</strong>,
                    które powinieneś spróbować wdrożyć we własnym zakresie. Pozdrawiam!
                  </p>
                </div>

                <a
                  href="/"
                  class="text-sm font-black uppercase tracking-widest text-primary hover:underline hover:text-secondary transition-colors"
                  >Wróć na stronę główną</a
                >
              </div>
            }
          </div>
        </div>
      </main>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConsultationPage implements OnInit {
  private seoService = inject(SeoService);
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);
  private cdr = inject(ChangeDetectorRef);
  private document = inject(DOCUMENT);
  private route = inject(ActivatedRoute);

  // Status Machine
  status = signal<QualificationStatus>('PENDING');

  form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    projectType: ['system', Validators.required],
    budget: ['mid', Validators.required],
    message: ['', [Validators.required, Validators.minLength(20)]],
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
      slug: 'consultation',
      type: 'website',
    });

    this.seoService.setBreadcrumbs([
      { name: 'Start', path: '/' },
      { name: 'Kwalifikacja', path: '/consultation' },
    ]);

    this.seoService.setSchema(
      {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        name: 'Kwalifikacja i Rozmowa Wdrożeniowa',
        description:
          'Darmowa kwalifikacja projektu i rezerwacja terminu konsultacji poprzez kalendarz Cal.com.',
        url: 'https://scale-sail.io/consultation',
        mainEntity: {
          '@type': 'Organization',
          name: 'Scale Sail Agency',
          email: 'karol@scale-sail.io',
          contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'sales',
            email: 'karol@scale-sail.io',
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
    if (this.form.invalid || this.status() !== 'PENDING') return;

    // Pozwalamy botom wysłać formularz - Web3Forms przejmie 'botcheck: true' i zrzuci maila w pustkę,
    // odsyłając fałszywe 200 OK. Zmylimy atakującego.

    this.status.set('SUBMITTING');

    const budgetValue = this.form.get('budget')?.value;
    const projectType = this.form.get('projectType')?.value;

    // SLA package is fundamentally cheaper (800-1500) so we explicitly whitelist it.
    const isQualified = budgetValue === 'mid' || budgetValue === 'high' || projectType === 'sla';

    const formData = {
      ...this.form.value,
      access_key: '96dd68a1-6862-4e27-a83f-66e435b684a6',
      subject: `[LEAD-KWALIFIKACJA] Opcja: ${budgetValue} | Projekt: ${this.form.value.projectType}`,
      from_name: 'Scale Sail Kwalifikacja',
    };

    // Send the lead to Web3Forms anyway so the user doesn't lose the message!
    this.http
      .post('https://api.web3forms.com/submit', formData)
      .pipe(
        tap(() => {
          setTimeout(() => {
            if (isQualified) {
              this.status.set('ACCEPTED');
              // Zapewnienie, że Angular zdąży przerysować DOM (Signal re-render) przed odpaleniem zewnętrznego skryptu
              setTimeout(() => this.loadCalEmbed(), 50);
            } else {
              this.status.set('REJECTED');
            }
          }, 1500); // Artificial delay to simulate "analysis" and make it feel more important
        }),
        catchError((err) => {
          console.error('System failed to dispatch email', err);
          // Faux positive. Even on HTTP failure, let the user proceed so they aren't stuck locally.
          this.status.set(isQualified ? 'ACCEPTED' : 'REJECTED');
          if (isQualified) {
            setTimeout(() => this.loadCalEmbed(), 50);
          }
          return of(null);
        }),
      )
      .subscribe();
  }

  private loadCalEmbed(): void {
    // Retry loop until Angular physically paints the element in the DOM
    const container = this.document.getElementById('my-cal-inline');
    if (!container) {
      setTimeout(() => this.loadCalEmbed(), 50);
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const win = window as any;

    if (!win.Cal) {
      // The Cal.com generic embed snippet, wrapped for Angular
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (function (C: any, A: any, L: any) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const p = function (a: any, ar: any) {
          a.q.push(ar);
        };
        const d = C.document;
        C.Cal =
          C.Cal ||
          function () {
            const cal = C.Cal;
            // eslint-disable-next-line prefer-rest-params
            const ar = arguments;
            if (!cal.loaded) {
              cal.ns = {};
              cal.q = cal.q || [];
              const script = d.createElement('script');
              script.src = A;
              d.head.appendChild(script);
              cal.loaded = true;
            }
            if (ar[0] === L) {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const api: any = function (...args: any[]) {
                p(api, args);
              };
              const namespace = ar[1];
              api.q = api.q || [];
              if (typeof namespace === 'string') {
                cal.ns[namespace] = cal.ns[namespace] || api;
              } else {
                p(cal, ar);
              }
              return;
            }
            p(cal, ar);
          };
      })(win, 'https://cal.eu/embed/embed.js', 'init');
    }

    // Initialize Cal with EU domain support
    win.Cal('init', { origin: 'https://cal.eu' });

    // Render the inline element using exactly the container we found via Angular's DOM proxy
    win.Cal('inline', {
      elementOrSelector: container,
      calLink: 'scale-sail/30min',
      layout: 'month_view',
      config: {
        name: this.form.value.name,
        email: this.form.value.email,
        notes: this.form.value.message,
      },
    });

    // Theme it to match Neo-Brutalism (using primary blue)
    win.Cal('ui', {
      cssVarsPerTheme: {
        light: {
          'cal-brand': '#0055FF',
        },
        dark: {
          'cal-brand': '#0055FF',
        },
      },
      hideEventTypeDetails: false,
      layout: 'month_view',
    });
  }
}
