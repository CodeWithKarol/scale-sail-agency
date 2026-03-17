import { Component, inject, input, effect, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs/operators';
import { PortfolioService } from '../../../shared/domain/portfolio/portfolio.service';
import { SeoService } from '../../../shared/core/seo/seo.service';
import { ProjectScreenshots } from '../components/project-screenshots/project-screenshots';
import { Button } from '../../../shared/ui/button/button';
import { BreadcrumbComponent } from '../../../shared/ui/breadcrumb/breadcrumb';
import { GeometricBackground } from '../../../shared/ui/geometric-background/geometric-background';

@Component({
  selector: 'app-case-study-page',
  imports: [CommonModule, ProjectScreenshots, Button, BreadcrumbComponent, GeometricBackground],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (caseStudy(); as study) {
      <!-- Main wrapper -->
      <div class="relative min-h-screen bg-slate-950 text-slate-200 selection:bg-accent/30 selection:text-white">
        <div class="fixed inset-0 -z-10">
          <app-geometric-background variant="subtle" />
        </div>

        <main class="relative pt-32 pb-24">
          <!-- Hero Section -->
          <section class="relative py-20 lg:py-32 overflow-hidden isolate z-10">
            <div class="layout-container relative">
              <!-- Breadcrumbs -->
              <div class="flex justify-start mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
                <app-breadcrumb />
              </div>

              <div class="text-center max-w-4xl mx-auto">
                <div
                  class="flex justify-center mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700"
                >
                  <div
                    class="inline-flex items-center gap-3 px-4 py-1.5 bg-accent/10 border border-accent/20 text-accent text-[10px] font-black tracking-[0.4em] uppercase rounded-sm shadow-[0_0_20px_rgba(255,111,60,0.1)]"
                  >
                    <span class="w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_8px_#ff6f3c]"></span>
                    REALIZACJA: {{ study.id }}
                  </div>
                </div>
                
                <h1
                  class="text-4xl sm:text-7xl font-extrabold tracking-tighter text-white mb-10 leading-[1.05] animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100 uppercase"
                >
                  {{ study.title }}
                </h1>
                
                <p
                  class="text-xl sm:text-2xl text-slate-400 leading-relaxed font-light max-w-3xl mx-auto mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200"
                >
                  {{ study.tagline }}
                </p>

                <!-- Action Bar (Repo / Demo) -->
                <div
                  class="flex flex-wrap justify-center gap-6 mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300"
                >
                  @if (study.demoUrl) {
                    <app-button variant="accent" size="lg" [href]="study.demoUrl" styleClass="uppercase tracking-widest text-xs font-black min-w-[200px]">
                      <span>Zobacz na żywo</span>
                      <svg
                        class="ml-3 h-4 w-4"
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
                    </app-button>
                  }
                  @if (study.repoUrl) {
                    <app-button
                      variant="secondary"
                      size="lg"
                      [href]="study.repoUrl"
                      aria-label="Zobacz kod"
                      styleClass="uppercase tracking-widest text-xs font-black min-w-[200px]"
                    >
                      <span>Zobacz kod</span>
                      <svg
                        class="ml-3 h-5 w-5"
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
                    </app-button>
                  }
                </div>
              </div>
            </div>
          </section>

          <!-- Main Visual -->
          <div
            class="relative z-10 layout-container mb-32 animate-in fade-in zoom-in-95 duration-1000 delay-300"
          >
            <div class="relative w-full aspect-[16/9] md:aspect-[21/9] bg-slate-900 border border-slate-800 p-2 shadow-2xl overflow-hidden rounded-sm">
              <img
                [src]="study.heroImage"
                [alt]="study.title"
                fetchpriority="high"
                width="1280"
                height="720"
                class="w-full h-full object-cover object-top rounded-sm filter contrast-110 grayscale-[0.2] hover:grayscale-0 transition-all duration-1000"
              />
              
              <!-- Subtle technical detail -->
              <div class="absolute bottom-6 right-6 px-4 py-2 bg-slate-950/80 backdrop-blur-md border border-slate-800 text-[9px] font-mono text-slate-500 uppercase tracking-widest">
                VER. 2026.03 // PROJECT_LOG
              </div>
            </div>
          </div>

          <!-- Content Grid -->
          <div class="layout-container mb-32">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
              <!-- Left: Narrative -->
              <div class="lg:col-span-8 space-y-24">
                <!-- Challenge -->
                <section class="group">
                  <h2 class="text-[10px] font-black uppercase tracking-[0.3em] text-accent flex items-center gap-4 mb-10">
                    01 // WYZWANIE <span class="h-px flex-1 bg-accent/20"></span>
                  </h2>
                  <div class="prose prose-invert prose-slate max-w-none">
                    <p class="text-xl text-slate-300 leading-relaxed font-light">
                      {{ study.challenge }}
                    </p>
                  </div>
                </section>

                <!-- Solution -->
                <section class="group">
                  <h2 class="text-[10px] font-black uppercase tracking-[0.3em] text-accent flex items-center gap-4 mb-10">
                    02 // ROZWIĄZANIE <span class="h-px flex-1 bg-accent/20"></span>
                  </h2>
                  <div class="prose prose-invert prose-slate max-w-none">
                    <p class="text-xl text-slate-300 leading-relaxed font-light">
                      {{ study.solution }}
                    </p>
                  </div>
                </section>
              </div>

              <!-- Right: Key Outcomes (Sticky) -->
              <div class="lg:col-span-4">
                <div class="sticky top-32 space-y-12 animate-in fade-in slide-in-from-right-4 duration-700 delay-500">
                  <div class="bg-slate-900/40 border border-slate-800 p-10 rounded-sm relative overflow-hidden group hover:border-accent/30 transition-all duration-500">
                    <h3
                      class="text-[10px] font-black uppercase tracking-[0.3em] text-accent mb-10 pb-6 border-b border-white/5"
                    >
                      GŁÓWNE EFEKTY
                    </h3>
                    
                    <ul class="space-y-8">
                      @for (result of study.results; track result) {
                        <li class="flex gap-4 items-start group/item">
                          <span class="mt-2 w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_8px_#ff6f3c] transition-transform group-hover/item:scale-125"></span>
                          <span class="text-base text-slate-300 leading-relaxed font-light group-hover/item:text-white transition-colors">
                            {{ result }}
                          </span>
                        </li>
                      }
                    </ul>

                    <div class="mt-12 pt-10 border-t border-white/5">
                      <p class="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] mb-8">
                        SPECYFIKACJA
                      </p>
                      <div class="flex flex-wrap gap-2">
                        @for (tech of study.techStack; track tech) {
                          <span
                            class="px-3 py-1.5 bg-slate-950 border border-slate-800 text-[10px] text-slate-400 font-bold uppercase tracking-wider rounded-sm hover:border-primary/40 hover:text-primary transition-colors cursor-default"
                          >
                            {{ tech }}
                          </span>
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Application Interface -->
          <section class="relative border-y border-slate-800 py-32 bg-slate-900/20">
            <div class="layout-container mb-16">
              <h2 class="text-[10px] font-black uppercase tracking-[0.3em] text-accent flex items-center gap-4">
                WIDOK APLIKACJI <span class="h-px flex-1 bg-accent/20"></span>
              </h2>
            </div>
            @if (study.screenshots.length) {
              <app-project-screenshots [screenshots]="study.screenshots!" />
            }
          </section>

          <!-- Technical Architecture -->
          <section class="py-32 relative overflow-hidden border-b border-slate-800">
            <div class="layout-container">
              <div class="max-w-4xl mx-auto bg-slate-900/40 border border-slate-800 p-10 md:p-16 rounded-sm relative group hover:border-primary/30 transition-all duration-500">
                <div class="absolute top-0 right-0 w-48 h-48 bg-primary/5 blur-3xl -z-10 rounded-full"></div>
                
                <h2 class="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-10">
                  ARCHITEKTURA SYSTEMU
                </h2>

                <div class="text-xl text-slate-300 leading-relaxed font-light">
                  @if (study.technicalApproach) {
                    {{ study.technicalApproach }}
                  } @else {
                    System zbudowany z użyciem nowoczesnych standardów, zapewniający
                    maksymalną szybkość działania i bezpieczeństwo danych. 
                    Reaktywny interfejs gwarantuje płynność nawet przy dużej ilości danych.
                  }
                </div>

                <!-- Footer info -->
                <div class="mt-12 pt-8 border-t border-dashed border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-6">
                  <div class="flex flex-col gap-1 text-center sm:text-left">
                    <span class="text-[9px] font-black text-emerald-500 uppercase tracking-widest">STATUS: OPTYMALNY</span>
                    <span class="text-[9px] font-bold text-slate-600 uppercase tracking-widest">Technologie: Angular, TypeScript, Tailwind CSS, testy automatyczne</span>
                  </div>
                  <div class="text-[9px] font-bold text-slate-600 uppercase tracking-widest bg-slate-950 px-3 py-1 border border-slate-800">
                    WERSJA: 2026.03.V1
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Final Action -->
          <section class="py-32 text-center bg-slate-950 relative">
            <div class="layout-container">
              <h2 class="text-3xl sm:text-5xl font-extrabold text-white mb-12 uppercase tracking-tighter">
                KONIEC PREZENTACJI
              </h2>
              <app-button variant="secondary" size="lg" href="/work" styleClass="uppercase tracking-widest text-xs font-black min-w-[240px]">
                <svg
                  class="mr-3 h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2.5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Powrót do listy
              </app-button>
            </div>
          </section>
        </main>
      </div>
    }
  `,
})
export class CaseStudyPage {
  private portfolioService = inject(PortfolioService);
  private seoService = inject(SeoService);

  // Input from router parameter (requires withComponentInputBinding)
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
        keywords: [
          ...study.techStack,
          'Case Study',
          'Automatyzacja Firmy',
          'System dla warsztatu',
          'Aplikacja dedykowana',
          'Optymalizacja procesów',
        ],
        type: 'article',
      });

      this.seoService.setBreadcrumbs([
        { name: 'Start', path: '/' },
        { name: 'Realizacje', path: '/work' },
        { name: study.title, path: `/work/${study.id}` },
      ]);

      this.seoService.setSchema({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Article',
            headline: study.title,
            name: study.title,
            image: study.heroImage ? [`https://scale-sail.io${study.heroImage}`] : [],
            author: {
              '@type': 'Person',
              name: 'Karol Modelski',
              url: 'https://scale-sail.io',
            },
            keywords: study.techStack.join(', '),
            description: study.challenge,
            isPartOf: {
              '@id': 'https://scale-sail.io/#website',
            },
            datePublished: new Date('2024-01-01T08:00:00+00:00').toISOString(),
            dateModified: new Date('2026-01-20T08:00:00+00:00').toISOString(),
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `https://scale-sail.io/work/${study.id}`,
            },
          },
        ],
      });
    });
  }
}
