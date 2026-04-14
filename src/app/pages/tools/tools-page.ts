import { Component, ChangeDetectionStrategy, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../shared/core/seo/seo.service';
import { SectionHeader } from '../../shared/ui/section-header/section-header';
import { BreadcrumbComponent } from '../../shared/ui/breadcrumb/breadcrumb';
import { LucideAngularModule, Calculator, ArrowRight, TrendingDown } from 'lucide-angular';

import { Button } from '../../shared/ui/button/button';

@Component({
  selector: 'app-tools-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    SectionHeader,
    BreadcrumbComponent,
    LucideAngularModule,
    Button,
  ],
  template: `
    <div class="min-h-screen bg-neutral text-secondary pb-24 sm:pb-32 relative bg-grid-workshop">
      <!-- Technical Grid Background -->
      <div class="absolute inset-0 z-0 bg-grid-workshop opacity-40 pointer-events-none"></div>

      <div class="layout-container relative z-10 pt-32 sm:pt-40">
        <!-- Breadcrumbs -->
        <app-breadcrumb />

        <!-- Header -->
        <app-section-header
          [level]="1"
          subtitle="DLA WARSZTATÓW"
          title="Darmowe narzędzia dla właścicieli warsztatów"
          description="Przestań tracić godziny na ręczne wyceny i Excela. Wykorzystaj darmowe kalkulatory stworzone, by automatyzować nużącą papierologię i budować profesjonalny wizerunek w oczach klienta."
          class="max-w-3xl"
        />

        <div class="mt-10 sm:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <!-- Quote Generator Card -->
          <div
            class="group card p-5 sm:p-8 hover:border-primary/30 transition-all duration-500 relative overflow-hidden flex flex-col gap-6"
          >
            <!-- Background Icon Decoration -->
            <div
              class="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity"
            >
              <lucide-icon [img]="icons.Calculator" size="80"></lucide-icon>
            </div>

            <div
              class="w-14 h-14 bg-primary/10 rounded-none flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500"
            >
              <lucide-icon [img]="icons.Calculator" size="28"></lucide-icon>
            </div>

            <div>
              <h3
                class="text-xl sm:text-2xl font-black heading-4 text-secondary mb-3 group-hover:text-primary transition-colors"
              >
                Błyskawiczny Generator Wycen PDF
              </h3>
              <p class="text-secondary/60 text-sm leading-relaxed">
                Zmień 15 minut liczenia w 60 sekund profesjonalnej pracy. Twój klient otrzyma
                elegancki PDF, a Ty będziesz mieć pewność, że marża zawsze się zgadza.
              </p>
            </div>

            <div class="mt-auto">
              <app-button
                variant="primary"
                size="sm"
                route="/tools/free-quote-generator"
                class="w-full sm:w-auto"
              >
                WYSTAW PROFESJONALNĄ WYCENĘ
                <lucide-icon [img]="icons.ArrowRight" size="14" class="ml-2"></lucide-icon>
              </app-button>
            </div>
          </div>

          <!-- Loss Calculator Card -->
          <div
            class="group card p-5 sm:p-8 hover:border-rose-500/30 transition-all duration-500 relative overflow-hidden flex flex-col gap-6"
          >
            <!-- Background Icon Decoration -->
            <div
              class="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity"
            >
              <lucide-icon [img]="icons.TrendingDown" size="80"></lucide-icon>
            </div>

            <div
              class="w-14 h-14 bg-rose-500/10 rounded-none flex items-center justify-center text-rose-500 group-hover:bg-rose-500 group-hover:text-white transition-all duration-500"
            >
              <lucide-icon [img]="icons.TrendingDown" size="28"></lucide-icon>
            </div>

            <div>
              <h3
                class="text-xl sm:text-2xl font-black heading-4 text-secondary mb-3 group-hover:text-primary transition-colors"
              >
                Kalkulator Strat Operacyjnych
              </h3>
              <p class="text-secondary/60 text-sm leading-relaxed">
                Sprawdź, ile realnie kosztuje Cię brak automatyzacji i bałagan w papierach. Dowiedz
                się, ile pieniędzy „przecieka” przez Twój warsztat każdego miesiąca.
              </p>
            </div>

            <div class="mt-auto">
              <app-button
                variant="ghost"
                size="sm"
                route="/tools/loss-calculator"
                class="w-full sm:w-auto !border-rose-500/20 !text-rose-500 hover:!bg-rose-500 hover:!text-white"
              >
                OBLICZ STRATY
                <lucide-icon [img]="icons.ArrowRight" size="14" class="ml-2"></lucide-icon>
              </app-button>
            </div>
          </div>

          <!-- Placeholder for future tools -->
          <div
            class="card p-8 border-dashed border-secondary/10 opacity-50 flex flex-col items-center justify-center text-center gap-4 min-h-[300px]"
          >
            <div class="text-secondary/20">
              <lucide-icon [img]="icons.Calculator" size="48" class="opacity-10"></lucide-icon>
            </div>
            <p class="text-small text-secondary/40">
              Kolejne automatyzacje <br />
              w przygotowaniu...
            </p>
          </div>
        </div>

        <!-- Final CTA for Consultation -->
        <div
          class="mt-20 sm:mt-32 p-6 md:p-12 bg-white border-4 border-secondary shadow-[8px_8px_0px_0px_rgba(10,31,68,1)] sm:shadow-[12px_12px_0px_0px_rgba(10,31,68,1)] text-center relative overflow-hidden"
        >
          <div class="absolute top-0 left-0 w-full h-2 bg-primary"></div>
          <h2 class="text-2xl sm:text-4xl font-black text-secondary mb-6">
            Szukasz rozwiązania skrojonego pod Twój warsztat?
          </h2>
          <p class="text-base sm:text-lg text-secondary/70 mb-10 max-w-2xl mx-auto italic">
            Darmowe narzędzia to tylko wierzchołek góry lodowej. Jeśli chaos w procesach ogranicza
            Twój rozwój – zaprojektujmy system, który przejmie nudne zadania i pozwoli Ci skupić się
            na naprawianiu aut.
          </p>
          <app-button variant="primary" size="lg" route="/consultation" class="w-full sm:w-auto">
            ZABLOKUJ TERMIN KONSULTACJI 📅
          </app-button>
          <div
            class="mt-8 flex flex-col sm:flex-row items-center justify-center gap-2 text-secondary/40 text-sm font-medium"
          >
            <span class="hidden sm:inline">lub</span>
            <a
              routerLink="/work"
              class="text-secondary hover:text-primary underline decoration-primary/30 underline-offset-4 transition-colors p-2"
              >zobacz jak wdrożyłem to u innych (Systemy)</a
            >
          </div>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolsPage {
  private seoService = inject(SeoService);

  readonly icons = { Calculator, ArrowRight, TrendingDown };

  constructor() {
    effect(() => {
      this.seoService.setPageMetadata({
        title: 'Bezpłatne Narzędzia dla Warsztatu bez abonamentu | Scale Sail',
        description:
          'Darmowe kalkulatory marży, generatory kosztorysów PDF i narzędzia analityczne dla nowoczesnego mechanika. Sprawdź jak technologia Scale Sail pomaga w biznesie.',
        slug: '/tools',
      });

      this.seoService.setBreadcrumbs([
        { name: 'Start', path: '/' },
        { name: 'Narzędzia', path: '/tools' },
      ]);

      this.seoService.setSchema(
        {
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Narzędzia dla Serwisu — Kalkulatory i Dokumenty dla Warsztatów',
          description:
            'Kolekcja narzędzi wspierających codzienne operacje w warsztacie samochodowym: od wycen po kalkulacje zysku.',
          url: 'https://scale-sail.io/tools',
          mainEntity: {
            '@type': 'ItemList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Błyskawiczny Generator Wycen PDF',
                url: 'https://scale-sail.io/tools/free-quote-generator',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Kalkulator Strat Operacyjnych',
                url: 'https://scale-sail.io/tools/loss-calculator',
              },
            ],
          },
        },
        'json-ld-schema',
      );
    });
  }
}
