import { Component, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeoService } from '../../shared/core/seo/seo.service';
import { BreadcrumbComponent } from '../../shared/ui/breadcrumb/breadcrumb';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, BreadcrumbComponent],
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
          class="max-w-5xl mx-auto text-center mb-32 animate-in fade-in slide-in-from-bottom-4 duration-1000"
        >
          <div class="mb-10 flex justify-center">
            <div class="status-badge status-badge-dark ring-4 ring-secondary/5">
              SYLWETKA TWÓRCY
            </div>
          </div>

          <h1 class="heading-1 text-secondary mb-12">
            Buduję systemy, które <br />
            <span class="text-primary italic">zdejmują ciężar</span> z Twoich barków.
          </h1>

          <p
            class="text-xl sm:text-2xl text-secondary/70 leading-relaxed font-medium max-w-3xl mx-auto"
          >
            Nazywam się <span class="text-secondary font-black">Karol Modelski</span>. Od lat
            pomagam firmom wychodzić z ery kartek i Excela, budując systemy, które są
            <span class="text-secondary font-black italic">solidne jak narzędzia warsztatowe</span>.
          </p>
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
                class="font-mono text-[10px] font-black uppercase tracking-[0.4em] text-secondary/40 mb-8 group-hover:text-primary transition-colors"
              >
                ZASADA 0{{ $index + 1 }}
              </h3>

              <h4 class="heading-3 text-secondary mb-6">{{ principle.title }}</h4>

              <p class="text-lg text-secondary/70 leading-relaxed font-medium">
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
                <h2
                  class="font-mono text-[10px] font-black uppercase tracking-[0.3em] text-primary"
                >
                  KRÓTKA HISTORIA
                </h2>
                <div class="h-px flex-1 bg-secondary/10"></div>
              </div>

              <div class="prose prose-slate max-w-none">
                <p class="text-xl text-secondary/80 leading-relaxed font-medium">
                  Przez lata budowałem systemy dla największych instytucji finansowych. Tam
                  nauczyłem się, że w technologii nie liczy się „błysk”, ale
                  <span class="text-secondary font-black">niezawodność i bezpieczeństwo danych</span
                  >.
                </p>
                <p class="text-xl text-secondary/80 leading-relaxed font-medium">
                  Dziś tę samą „bankową” jakość przenoszę do małych i średnich firm. Wiem, że Twoja
                  firma to Twój dorobek życia – dlatego nie bawię się w półśrodki. Jeśli coś buduję,
                  to tak, byś mógł o tym zapomnieć, bo po prostu działa.
                </p>
              </div>

              <div class="pt-10 border-l-8 border-primary/10 pl-12 bg-neutral py-8">
                <p class="text-3xl font-black text-secondary italic tracking-tight leading-snug">
                  „Wreszcie nie muszę szukać wszystkiego po kartkach”
                </p>
                <p
                  class="mt-4 font-mono text-[10px] font-bold text-secondary/40 uppercase tracking-widest"
                >
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
                alt="Karol Modelski"
                class="w-full grayscale contrast-110 hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <!-- Technical Badge -->
            <div
              class="absolute -bottom-6 -right-6 bg-secondary text-white p-6 font-mono text-[10px] font-black uppercase tracking-[0.3em]"
            >
              TWÓRCA SYSTEMU
            </div>
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
      title: 'O mnie | Karol Modelski — Scale Sail',
      description:
        'Pomagam małym firmom usługowym i warsztatom wychodzić z ery kartek i Excela. Wykorzystuję doświadczenie z największych projektów IT, by budować proste i solidne aplikacje.',
      slug: 'about',
      type: 'profile',
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
              'Poznaj twórcę Scale Sail i dowiedz się, jak bankowa jakość systemów pomaga małym firmom.',
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
      desc: 'Praca dla największych banków nauczyła mnie, że system po prostu musi działać. Bez "zawieszek", bez przestojów i bez błędów w danych. Tę samą jakość daję Twojej firmie.',
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
      desc: 'Budowa systemów transakcyjnych dla globalnej bankowości. Standard: Zero tolerancji dla błędów i maksymalna wydajność interfejsu.',
      qualityMark: 'ATEST BANKOWY',
    },
    {
      role: 'Frontend Developer',
      company: 'Silent Eight',
      period: '2023 - 2025',
      desc: 'Rozwój systemów AI dla sektora finansowego. Skupienie na intuicyjności przy bardzo skomplikowanych danych procesowych.',
      qualityMark: 'STANDARD AI',
    },
    {
      role: 'Software Developer',
      company: 'BNP Paribas',
      period: '2021 - 2023',
      desc: 'Migracja systemów bankowości internetowej (1M+ użytkowników). Zarządzanie sprawnym przejściem ze starych rozwiązań na nowoczesne.',
      qualityMark: 'MIGRACJA DANYCH',
    },
    {
      role: 'Junior Frontend Developer',
      company: 'Amway',
      period: '2019 - 2021',
      desc: 'Tworzenie paneli do zarządzania sprzedażą dla tysięcy przedsiębiorców. Pierwsze kroki w budowaniu aplikacji, które realnie ułatwiają biznes.',
      qualityMark: 'POCZĄTEK DROGI',
    },
  ];
}
