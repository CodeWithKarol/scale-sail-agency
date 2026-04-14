import { Component, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeoService } from '../../shared/core/seo/seo.service';
import { BreadcrumbComponent } from '../../shared/ui/breadcrumb/breadcrumb';
import { Button } from '../../shared/ui/button/button';

import { SectionHeader } from '../../shared/ui/section-header/section-header';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, BreadcrumbComponent, Button, SectionHeader],
  template: `
    <div
      class="min-h-screen bg-neutral text-secondary relative pt-40 pb-24 overflow-hidden bg-grid-workshop"
    >
      <!-- Technical Grid Background -->
      <div class="absolute inset-0 z-0 bg-grid-workshop opacity-40 pointer-events-none"></div>

      <div class="layout-container relative z-10">
        <!-- Breadcrumbs -->
        <app-breadcrumb />

        <!-- Hero Intro -->
        <div
          class="max-w-5xl mx-auto mb-32 animate-in fade-in slide-in-from-bottom-4 duration-1000"
        >
          <app-section-header
            [level]="1"
            subtitle="SYLWETKA TWÓRCY"
            title="Buduję systemy, których nie musisz pilnować"
            description="Nazywam się Karol Modelski. Od lat pomagam firmom wychodzić z ery kartek i Excela, budując systemy, które są solidne jak narzędzia warsztatowe."
          >
            <div class="mt-8">
              <span class="heading-3 opacity-80 uppercase tracking-tight block">
                Solidne jak bank, proste jak zeszyt.
              </span>
            </div>
          </app-section-header>
        </div>

        <!-- Craftsman Principles -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-40 relative">
          <!-- Decorative technical line -->
          <div class="hidden lg:block absolute -top-16 left-0 w-full h-1 bg-secondary/5"></div>

          @for (principle of principles; track principle.title) {
            <div class="card-workshop bg-white border-2 border-secondary/10 p-12 relative group">
              <!-- Industrial indicator -->
              <div
                class="absolute top-12 left-0 w-1.5 h-10 bg-primary opacity-20 group-hover:opacity-100 transition-all"
              ></div>

              <h3
                class="text-small text-secondary/40 mb-8 group-hover:text-primary transition-colors"
              >
                ZASADA 0{{ $index + 1 }}
              </h3>

              <h4 class="heading-3 text-secondary mb-6">{{ principle.title }}</h4>

              <p class="text-body text-secondary/70">
                {{ principle.desc }}
              </p>
            </div>
          }
        </div>

        <!-- Personal Touch & Photo -->
        <div class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-20 items-center mb-40">
          <div class="lg:col-span-7">
            <div class="space-y-12">
              <div class="flex items-center gap-6">
                <h2 class="text-small text-primary">KRÓTKA HISTORIA</h2>
                <div class="h-px flex-1 bg-secondary/10"></div>
              </div>

              <div class="prose prose-slate max-w-none">
                <p class="text-body sm:text-lg text-secondary/80 mb-6">
                  Przez lata budowałem systemy dla największych instytucji finansowych. Tam
                  nauczyłem się, że w technologii nie liczy się „błysk”, ale
                  <span class="text-secondary font-black">niezawodność i bezpieczeństwo danych</span
                  >.
                </p>
                <p class="text-body sm:text-lg text-secondary/80 mb-6 font-bold">
                  Tam błąd kosztuje miliony. U Ciebie błąd kosztuje Twój czas i spokój – obie te
                  rzeczy są dla mnie tak samo ważne.
                </p>
                <p class="text-body sm:text-lg text-secondary/80">
                  Dziś tę samą „bankową” jakość przenoszę do warsztatów samochodowych oraz małych i
                  średnich firm. Znam specyfikę serwisów, gdzie liczy się szybka obsługa zlecenia,
                  przypisywanie mechaników i podgląd na kilka stanowisk jednocześnie. Wiem, że Twoja
                  firma to Twój dorobek życia – dlatego nie bawię się w półśrodki. Jeśli coś buduję,
                  to tak, byś mógł o tym zapomnieć, bo po prostu działa.
                </p>
              </div>

              <div class="pt-10 border-l-8 border-primary/10 pl-12 bg-neutral py-8">
                <p class="heading-2 text-secondary italic">
                  „Wreszcie nie muszę szukać wszystkiego po kartkach”
                </p>
                <p class="mt-4 text-small text-secondary/40">
                  — CEL, KTÓRY POMAGAM OSIĄGNĄĆ MOIM KLIENTOM
                </p>
              </div>
            </div>
          </div>

          <!-- Professional Photo (Industrial Frame) -->
          <div class="lg:col-span-5 relative">
            <div
              class="card-workshop border-4 border-secondary p-2 bg-white shadow-[16px_16px_0px_0px_rgba(10,31,68,0.05)]"
            >
              <img
                src="images/karol-modelski.webp"
                alt="Karol Modelski - Scale Sail Agency - Systemy zarządzania zleceniami"
                class="w-full grayscale contrast-110 hover:grayscale-0 transition-all duration-700"
                width="600"
                height="800"
              />
            </div>
          </div>
        </div>

        <!-- Experience Timeline -->
        <div
          class="max-w-6xl mx-auto mb-40 animate-in fade-in slide-in-from-bottom-4 duration-1000"
        >
          <div class="flex items-center gap-6 mb-16">
            <h2 class="text-small text-primary">HISTORIA PRACY & DOŚWIADCZENIE</h2>
            <div class="h-px flex-1 bg-secondary/10"></div>
          </div>

          <div class="relative space-y-12">
            <!-- Continuous Line -->
            <div
              class="absolute top-0 bottom-0 left-[7px] md:left-[11px] w-1 bg-secondary/10"
            ></div>

            @for (job of experience; track job.period) {
              <div class="relative pl-10 md:pl-16 group">
                <!-- Timeline dot at start (left side) -->
                <div
                  class="absolute left-0 md:left-1 top-6 w-4 h-4 bg-white border-4 border-primary group-hover:bg-primary transition-colors"
                ></div>

                <div
                  class="card-workshop bg-white border-2 border-secondary/10 p-8 md:p-10 shadow-none"
                >
                  <div class="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6">
                    <div>
                      <h3
                        class="heading-3 text-secondary group-hover:text-primary transition-colors"
                      >
                        {{ job.role }}
                      </h3>
                      <div class="text-body sm:text-lg text-secondary/70 mt-3 font-bold">
                        {{ job.company }}
                      </div>
                    </div>
                    <div class="shrink-0 flex flex-col items-start md:items-end gap-3">
                      <span class="text-small text-secondary/40">{{ job.period }}</span>
                      <span
                        class="px-4 py-2 bg-neutral border border-secondary/10 text-small text-secondary/60"
                        >{{ job.qualityMark }}</span
                      >
                    </div>
                  </div>

                  <p class="text-body text-secondary/70">
                    {{ job.desc }}
                  </p>
                </div>
              </div>
            }
          </div>
        </div>

        <div
          class="max-w-4xl mx-auto text-center py-20 animate-in fade-in slide-in-from-bottom-4 duration-1000 border-t-2 border-dashed border-secondary/10"
        >
          <h2 class="heading-2 text-secondary mb-6">Poznałeś moją jakość. Zobacz efekty.</h2>
          <p class="text-lg text-secondary/70 mb-12 max-w-2xl mx-auto">
            Wiesz już, jak podchodzę do biznesu. Sprawdź, jak ta ekspercka solidność przekłada się
            na wyniki moich klientów w codziennym zarządzaniu ich firmami.
          </p>
          <div class="flex flex-col sm:flex-row justify-center gap-6">
            <app-button variant="primary" size="lg" route="/work">
              Ostatnie Realizacje →
            </app-button>
            <app-button variant="secondary" size="lg" route="/consultation">
              Umów Darmową Konsultację 📅
            </app-button>
          </div>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class About implements OnInit {
  private seoService = inject(SeoService);

  ngOnInit() {
    this.seoService.setPageMetadata({
      title: 'O mnie | Karol Modelski — Scale Sail Agency',
      description:
        'Poznaj twórcę Scale Sail. Łączę standardy bankowe z automatyzacją n8n. Buduję systemy, które realnie odciążają właścicieli warsztatów.',
      slug: 'about',
      type: 'profile',
      keywords: [
        'Karol Modelski',
        'ekspert automatyzacji procesów',
        'wdrożenia n8n warszawa',
        'programista systemów dla firm',
        'automatyzacja małej firmy',
        'konsultacje IT dla usług',
        'systemy dedykowane dla warsztatów',
        'Scale Sail założyciel',
      ],
    });

    this.seoService.setBreadcrumbs([
      { name: 'Start', path: '/' },
      { name: 'O mnie', path: '/about' },
    ]);

    // Enhanced ProfilePage Schema
    this.seoService.setSchema(
      {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'ProfilePage',
            '@id': 'https://scale-sail.io/about/#webpage',
            url: 'https://scale-sail.io/about',
            name: 'O mnie | Karol Modelski — Scale Sail',
            isPartOf: { '@id': 'https://scale-sail.io/#website' },
            mainEntity: { '@id': 'https://scale-sail.io/#person' },
            description:
              'Poznaj twórcę Scale Sail i dowiedz się, jak łączę doświadczenie z największych projektów IT z automatyzacją (n8n, Make, Zapier) i integracjami AI, by pomagać firmom.',
          },
          {
            '@type': 'Person',
            '@id': 'https://scale-sail.io/#person',
            name: 'Karol Modelski',
            url: 'https://scale-sail.io/about',
            jobTitle: 'Twórca rozwiązań cyfrowych & Założyciel Scale Sail',
            image: {
              '@type': 'ImageObject',
              url: 'https://scale-sail.io/images/karol-modelski.webp',
            },
            sameAs: [
              'https://karol-modelski.medium.com/',
              'https://github.com/CodeWithKarol',
              'https://www.linkedin.com/in/karol-modelski',
            ],
            worksFor: {
              '@type': 'ProfessionalService',
              '@id': 'https://scale-sail.io/#organization',
              name: 'Scale Sail',
              url: 'https://scale-sail.io',
              telephone: '+48000000000',
              priceRange: '$$',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Warszawa',
                addressLocality: 'Warszawa',
                addressRegion: 'Mazowieckie',
                postalCode: '00-001',
                addressCountry: 'PL',
              },
              logo: {
                '@type': 'ImageObject',
                url: 'https://scale-sail.io/images/scale-sail-logo.webp',
              },
            },
          },
        ],
      },
      'json-ld-schema',
    );
  }

  principles = [
    {
      title: 'PROSTOTA PONAD WSZYSTKO',
      desc: 'Nie instaluję zbędnych bajerów. System ma być tak prosty, byś mógł go obsłużyć w pośpiechu, mając ręce pełne roboty. Jeśli coś nie ułatwia Ci życia – usuwamy to.',
    },
    {
      title: 'SOLIDNOŚĆ BANKOWA',
      desc: 'Praca dla największych banków nauczyła mnie, że system po prostu musi działać. Buduję rozwiązania, które przetrwają lata bez Twojej ingerencji i "naprawiania na już".',
    },

    {
      title: 'TECHNOLOGIA DLA BIZNESU',
      desc: 'Kod to tylko fundament. Moim celem nie jest napisanie programu, ale odzyskanie Twojego czasu. Jeśli aplikacja nie zarabia na siebie poprzez Twoją wygodę – nie ma sensu.',
    },
  ];

  experience = [
    {
      role: 'Senior Frontend Developer',
      company: 'GFT Technologies (Citi)',
      period: '2025 - OBECNIE',
      desc: 'Budowa pancernych systemów do obsługi milionów operacji bankowych. Standard: Zero tolerancji dla błędów i maksymalna szybkość działania.',
      qualityMark: 'ATEST BANKOWY',
    },
    {
      role: 'Frontend Developer',
      company: 'Silent Eight',
      period: '2023 - 2025',
      desc: 'Tworzenie systemów AI dla finansów. Uproszczenie skomplikowanych procesów tak, aby były intuicyjne dla każdego użytkownika.',
      qualityMark: 'STANDARD AI',
    },
    {
      role: 'Software Developer',
      company: 'BNP Paribas',
      period: '2021 - 2023',
      desc: 'Zarządzanie bezpieczeństwem danych ponad miliona użytkowników bankowości. Gwarancja stabilności przy ogromnej skali.',
      qualityMark: 'STABILNOŚĆ DANYCH',
    },
    {
      role: 'Junior Frontend Developer',
      company: 'Amway',
      period: '2019 - 2021',
      desc: 'Budowa prostych paneli do zarządzania firmą dla tysięcy przedsiębiorców. Nauka tego, jak technologia może realnie ułatwiać codzienną pracę.',
      qualityMark: 'UŁATWIANIE PRACY',
    },
  ];
}
