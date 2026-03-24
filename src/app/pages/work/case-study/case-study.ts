import { Component, inject, input, effect, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs/operators';
import { PortfolioService } from '../../../shared/domain/portfolio/portfolio.service';
import { SeoService } from '../../../shared/core/seo/seo.service';
import { ProjectScreenshots } from '../components/project-screenshots/project-screenshots';
import { Button } from '../../../shared/ui/button/button';
import { BreadcrumbComponent } from '../../../shared/ui/breadcrumb/breadcrumb';
import { SectionHeader } from '../../../shared/ui/section-header/section-header';

@Component({
  selector: 'app-case-study-page',
  imports: [CommonModule, ProjectScreenshots, Button, BreadcrumbComponent, SectionHeader],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (caseStudy(); as study) {
      <div class="min-h-screen bg-neutral text-secondary pb-24 sm:pb-32 relative bg-grid-workshop">
        <!-- Technical Grid Background -->
        <div class="absolute inset-0 z-0 bg-grid-workshop opacity-40 pointer-events-none"></div>

        <main class="layout-container relative z-10 pt-32 sm:pt-40">
          <!-- Breadcrumbs -->
          <app-breadcrumb />

          <!-- Header -->
          <app-section-header
            [subtitle]="'REALIZACJA: ' + study.id"
            [title]="study.title"
            [description]="study.tagline"
          >
            <!-- Action Bar -->
            <div
              class="flex flex-wrap justify-center gap-6 mt-12 animate-in fade-in slide-in-from-bottom-4 duration-700"
            >
              @if (study.demoUrl) {
                <app-button variant="accent" size="lg" [href]="study.demoUrl">
                  <span class="flex items-center gap-3">
                    ZOBACZ NA ŻYWO
                    <svg
                      class="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2.5"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </span>
                </app-button>
              }
              @if (study.repoUrl) {
                <app-button variant="secondary" size="lg" [href]="study.repoUrl">
                  <span class="flex items-center gap-3">
                    ZOBACZ KOD
                    <svg
                      class="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path
                        d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
                      ></path>
                    </svg>
                  </span>
                </app-button>
              }
            </div>
          </app-section-header>

          <!-- Main Visual -->
          <div class="relative z-10 mb-40 animate-in fade-in zoom-in-95 duration-1000">
            <div
              class="relative w-full aspect-[16/9] md:aspect-[21/9] bg-white border-4 border-secondary p-2 shadow-[16px_16px_0px_0px_rgba(10,31,68,0.05)] overflow-hidden"
            >
              <img
                [src]="study.heroImage"
                [alt]="study.title"
                fetchpriority="high"
                class="w-full h-full object-cover object-top grayscale-[0.2] hover:grayscale-0 transition-all duration-1000"
              />
              <div class="absolute bottom-10 right-10 px-6 py-3 bg-secondary text-white text-small">
                WIDOK SYSTEMU // {{ study.title }}
              </div>
            </div>
          </div>

          <!-- Content Grid -->
          <div class="mb-40">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              <!-- Left: Narrative -->
              <div class="lg:col-span-7 space-y-32">
                <section>
                  <div class="flex items-center gap-6 mb-12">
                    <h2 class="text-small text-primary">01. WYZWANIE</h2>
                    <div class="h-px flex-1 bg-secondary/10"></div>
                  </div>
                  <p class="text-body sm:text-lg text-secondary/80">
                    {{ study.challenge }}
                  </p>
                </section>

                <section>
                  <div class="flex items-center gap-6 mb-12">
                    <h2 class="text-small text-primary">02. ROZWIĄZANIE</h2>
                    <div class="h-px flex-1 bg-secondary/10"></div>
                  </div>
                  <p class="text-body sm:text-lg text-secondary/80">
                    {{ study.solution }}
                  </p>
                </section>
              </div>

              <!-- Right: Outcomes (Sticky) -->
              <div class="lg:col-span-5 lg:sticky lg:top-32">
                <div
                  class="bg-white border-4 border-secondary p-8 sm:p-10 shadow-[12px_12px_0px_0px_rgba(10,31,68,0.05)]"
                >
                  <h3 class="text-small text-primary mb-12 pb-6 border-b-2 border-secondary/5">
                    KLUCZOWE EFEKTY
                  </h3>
                  <ul class="space-y-10">
                    @for (result of study.results; track result) {
                      <li class="flex gap-6 items-start group">
                        <span
                          class="mt-2.5 w-2 h-2 bg-primary rotate-45 transition-transform group-hover:rotate-90 shrink-0"
                        ></span>
                        <span class="text-body font-bold text-secondary/80">{{ result }}</span>
                      </li>
                    }
                  </ul>
                  <div class="mt-16 pt-12 border-t-2 border-secondary/5">
                    <p class="text-small text-secondary/30 mb-8">SPECYFIKACJA PROJEKTU</p>
                    <div class="flex flex-col gap-3">
                      @for (tech of study.techStack; track tech) {
                        <span
                          class="px-4 py-2 bg-neutral border border-secondary/10 text-small text-secondary/60"
                          >{{ tech }}</span
                        >
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Application Interface -->
          <section
            class="relative -mx-4 sm:-mx-6 lg:-mx-8 border-y-4 border-secondary/10 py-40 bg-white/80"
          >
            <div class="layout-container mb-24">
              <div class="flex items-center gap-8">
                <h2 class="text-small text-primary">INTERFEJS SYSTEMU</h2>
                <div class="h-1 flex-1 bg-primary/10"></div>
              </div>
            </div>
            @if (study.screenshots.length) {
              <app-project-screenshots [screenshots]="study.screenshots" />
            }
          </section>

          <!-- Technical Architecture -->
          <section class="py-40">
            <div
              class="max-w-5xl mx-auto bg-white border-4 border-secondary p-12 md:p-24 shadow-[16px_16px_0px_0px_rgba(10,31,68,0.05)]"
            >
              <h2 class="text-small text-primary mb-12">CO JEST W ŚRODKU?</h2>
              <p class="text-body sm:text-lg text-secondary/80 italic">
                {{
                  study.technicalApproach ||
                    'System zbudowany z użyciem nowoczesnych standardów, zapewniający maksymalną szybkość działania i bezpieczeństwo danych.'
                }}
              </p>
              <div
                class="mt-16 pt-12 border-t-2 border-dashed border-secondary/10 flex flex-col sm:flex-row justify-between items-center gap-10"
              >
                <div class="status-badge ring-4 ring-secondary/5">
                  <span class="w-2 h-2 rounded-none bg-primary animate-pulse"></span>
                  STATUS: W PEŁNI ZOPTYMALIZOWANY
                </div>
                <div
                  class="text-small text-secondary/40 bg-neutral px-5 py-2 border-2 border-secondary/10"
                >
                  ID PROJEKTU: {{ study.id | uppercase }}
                </div>
              </div>
            </div>
          </section>

          <!-- Final Action -->
          <section class="py-40 text-center border-t-4 border-dashed border-secondary/10 relative">
            <h2 class="heading-2 text-secondary mb-6">Podoba Ci się ten rezultat?</h2>
            <p class="text-lg text-secondary/70 mb-12 max-w-xl mx-auto">
              Skoro dotarłeś aż tutaj, prawdopodobnie szukasz podobnej stabilności w swoim biznesie.
              Przejrzeliśmy karty – teraz ruch należy do Ciebie.
            </p>
            <div class="flex flex-col sm:flex-row justify-center items-center gap-6">
              <app-button variant="primary" size="lg" href="/consultation">
                Zbudujmy Coś Podobnego 🚀
              </app-button>
              <app-button variant="secondary" size="lg" href="/work">
                <span class="flex items-center gap-4">
                  <svg
                    class="h-5 w-5 rotate-180"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2.5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                  Wróć do Portfolio
                </span>
              </app-button>
            </div>
          </section>
        </main>
      </div>
    }
  `,
  styles: [
    `
      .custom-scrollbar::-webkit-scrollbar {
        width: 4px;
      }
      .custom-scrollbar::-webkit-scrollbar-track {
        background: transparent;
      }
      .custom-scrollbar::-webkit-scrollbar-thumb {
        background: rgba(10, 31, 68, 0.1);
      }
      .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background: rgba(0, 123, 255, 0.2);
      }
    `,
  ],
})
export class CaseStudyPage {
  private portfolioService = inject(PortfolioService);
  private seoService = inject(SeoService);
  id = input.required<string>();
  caseStudy = toSignal(
    toObservable(this.id).pipe(switchMap((id) => this.portfolioService.getCaseStudy(id))),
  );

  constructor() {
    effect(() => {
      const study = this.caseStudy();
      if (!study) return;

      this.seoService.setPageMetadata({
        title: `${study.title} | Case Study Scale Sail`,
        description: study.challenge.substring(0, 160) + '...',
        image: study.heroImage,
        slug: `/work/${study.id}`,
        type: 'article',
      });

      this.seoService.setBreadcrumbs([
        { name: 'Start', path: '/' },
        { name: 'Realizacje', path: '/work' },
        { name: study.title, path: `/work/${study.id}` },
      ]);

      // Full Case Study Rich Result
      this.seoService.setSchema(
        {
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'Article',
              '@id': `https://scale-sail.io/work/${study.id}/#article`,
              headline: study.title,
              description: study.challenge,
              image: `https://scale-sail.io${study.heroImage}`,
              datePublished: '2024-01-01T08:00:00+00:00', // Standardowa data
              author: {
                '@type': 'Person',
                name: 'Karol Modelski',
                url: 'https://scale-sail.io/about',
              },
              publisher: {
                '@type': 'Organization',
                name: 'Scale Sail',
                logo: {
                  '@type': 'ImageObject',
                  url: 'https://scale-sail.io/images/scale-sail-logo.webp',
                },
              },
              mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': `https://scale-sail.io/work/${study.id}`,
              },
            },
          ],
        },
        'json-ld-article',
      );
    });
  }
}
