import { Component, inject, input, effect, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs/operators';
import { PortfolioService } from '../../../shared/domain/portfolio/portfolio.service';
import { SeoService } from '../../../shared/core/seo/seo.service';
import { ProjectScreenshots } from '../components/project-screenshots/project-screenshots';
import { Button } from '../../../shared/ui/button/button';

@Component({
  selector: 'app-case-study-page',
  imports: [CommonModule, ProjectScreenshots, Button],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (caseStudy(); as study) {
      <!-- Main wrapper -->
      <div
        class="relative z-[60] min-h-screen bg-secondary font-sans selection:bg-accent/30 selection:text-white"
      >
        <!-- Technical Grid Background -->
        <div
          class="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none z-0"
        ></div>

        <!-- Navbar -->
        <nav
          class="sticky top-0 z-50 w-full border-b border-white/10 bg-secondary/80 backdrop-blur-md"
        >
          <div class="layout-container h-16 flex items-center justify-between">
            <app-button
              variant="ghost"
              href="/"
              class="gap-2 text-white font-mono uppercase tracking-widest text-xs"
            >
              <!-- ArrowLeft -->
              <svg
                class="h-3 w-3 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              <span class="hidden sm:inline">Back to Home</span>
            </app-button>

            <div class="flex items-center gap-3">
              @if (study.repoUrl) {
                <app-button
                  variant="ghost"
                  [href]="study.repoUrl"
                  class="!p-2 text-white hover:text-accent border border-white/10 hover:border-accent"
                  aria-label="View Source"
                >
                  <!-- Github -->
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
                </app-button>
              }
              @if (study.demoUrl) {
                <app-button variant="accent" size="sm" [href]="study.demoUrl">
                  <span>Visit Site</span>
                  <!-- ExternalLink -->
                  <svg
                    class="ml-2 h-3 w-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </app-button>
              }
            </div>
          </div>
        </nav>

        <main class="relative">
          <!-- Hero Section -->
          <section class="relative pt-32 pb-32 overflow-hidden isolate">
            <!-- Decorative elements -->
            <div
              class="absolute top-20 right-10 w-32 h-32 border-r border-t border-white/5 opacity-50"
            ></div>
            <div
              class="absolute bottom-10 left-10 w-32 h-32 border-l border-b border-white/5 opacity-50"
            ></div>

            <div class="layout-container text-center">
              <div
                class="flex justify-center mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700"
              >
                <div
                  class="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 border border-accent/20 text-accent text-xs font-mono tracking-wider uppercase"
                >
                  <span class="relative flex h-2 w-2">
                    <span
                      class="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"
                    ></span>
                    <span class="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                  </span>
                  CASE STUDY: {{ study.id }}
                </div>
              </div>
              <h1
                class="heading-1 text-white text-balance mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100 uppercase tracking-tight"
              >
                {{ study.title }}
              </h1>
              <p
                class="text-balance max-w-2xl mx-auto text-lg leading-relaxed text-white/60 mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200 font-light"
              >
                {{ study.tagline }}
              </p>

              <!-- Tech Stack Strip -->
              <div
                class="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300"
              >
                @for (tech of study.techStack; track tech) {
                  <div
                    class="px-3 py-1.5 bg-white/5 border border-white/10 text-xs text-white/70 font-mono uppercase tracking-wider"
                  >
                    {{ tech }}
                  </div>
                }
              </div>
            </div>
          </section>

          <!-- Main Visual (Overlapping) -->
          <div
            class="relative z-10 -mt-20 layout-container mb-24 animate-in fade-in zoom-in-95 duration-1000 delay-300"
          >
            <div class="relative w-full aspect-[16/9] md:aspect-[21/9] bg-secondary group">
              <!-- Terminal Header -->
              <div
                class="absolute top-0 left-0 right-0 h-8 bg-black/80 backdrop-blur-md z-20 flex items-center px-4 gap-2 border-b border-white/10"
              >
                <div class="w-2 h-2 rounded-full bg-red-500/50"></div>
                <div class="w-2 h-2 rounded-full bg-yellow-500/50"></div>
                <div class="w-2 h-2 rounded-full bg-green-500/50"></div>
                <div
                  class="ml-4 font-mono text-[10px] text-white/40 tracking-wider flex-1 text-center"
                >
                  {{ study.demoUrl || 'localhost:4200' }}
                </div>
              </div>

              <div class="absolute inset-0 border border-white/10 z-10"></div>

              <img
                [src]="study.heroImage"
                [alt]="study.title"
                class="w-full h-full object-cover object-top pt-8"
              />

              <!-- Scanline overlay -->
              <div
                class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNCIgaGVpZ2h0PSI0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0wIDBoNHYxSDB6IiBmaWxsPSIjMDAwIiBmaWxsLW9wYWNpdHk9IjAuMiIvPjwvc3ZnPg==')] opacity-20 pointer-events-none z-10"
              ></div>

              <!-- Glitch/Vignette -->
              <div
                class="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.8)] pointer-events-none z-10"
              ></div>
            </div>
          </div>

          <!-- Content Grid -->
          <div class="layout-container mb-24">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-16">
              <!-- Left: Narrative -->
              <div class="lg:col-span-8 space-y-20">
                <!-- Challenge -->
                <section class="group relative pl-8 border-l border-white/10">
                  <div
                    class="absolute top-0 left-0 -translate-x-1/2 w-2 h-2 bg-primary rounded-full ring-4 ring-secondary"
                  ></div>
                  <div class="flex items-center gap-4 mb-6">
                    <h2 class="text-xl font-bold text-white font-mono uppercase tracking-widest">
                      01 // The Challenge
                    </h2>
                  </div>
                  <div
                    class="prose prose-lg prose-invert max-w-none text-white/80 font-light leading-relaxed"
                  >
                    <p>{{ study.challenge }}</p>
                  </div>
                </section>

                <!-- Solution -->
                <section class="group relative pl-8 border-l border-white/10">
                  <div
                    class="absolute top-0 left-0 -translate-x-1/2 w-2 h-2 bg-accent rounded-full ring-4 ring-secondary"
                  ></div>
                  <div class="flex items-center gap-4 mb-6">
                    <h2 class="text-xl font-bold text-white font-mono uppercase tracking-widest">
                      02 // The Solution
                    </h2>
                  </div>
                  <div
                    class="prose prose-lg prose-invert max-w-none text-white/80 font-light leading-relaxed"
                  >
                    <p>{{ study.solution }}</p>
                  </div>
                </section>
              </div>

              <!-- Right: Key Outcomes (Sticky) -->
              <div class="lg:col-span-4">
                <div class="sticky top-28">
                  <div class="bg-white/5 border border-white/10 p-1 relative overflow-hidden">
                    <!-- Corner Accents -->
                    <div
                      class="absolute top-0 left-0 w-2 h-2 border-l border-t border-accent"
                    ></div>
                    <div
                      class="absolute top-0 right-0 w-2 h-2 border-r border-t border-accent"
                    ></div>
                    <div
                      class="absolute bottom-0 left-0 w-2 h-2 border-l border-b border-accent"
                    ></div>
                    <div
                      class="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-accent"
                    ></div>

                    <div class="p-8 bg-secondary/80 backdrop-blur-sm">
                      <h3
                        class="text-xs font-bold font-mono tracking-widest text-accent mb-6 flex items-center gap-2 uppercase border-b border-white/10 pb-4"
                      >
                        <!-- Trophy -->
                        <span class="w-2 h-2 bg-accent rounded-full"></span>
                        Key Outcomes
                      </h3>
                      <ul class="space-y-6">
                        @for (result of study.results; track result) {
                          <li class="relative pl-6">
                            <div
                              class="absolute left-0 top-2.5 h-1 w-1 bg-green-500 rounded-full"
                            ></div>
                            <span class="text-sm leading-6 text-white/80 font-mono">{{
                              result
                            }}</span>
                          </li>
                        }
                      </ul>

                      <div class="mt-8 pt-8 border-t border-white/10 flex flex-col gap-3">
                        <p
                          class="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-2 font-mono"
                        >
                          Tech Specs
                        </p>
                        <div class="flex flex-wrap gap-2">
                          @for (tech of study.techStack; track tech) {
                            <span
                              class="px-2 py-1 text-[10px] font-mono text-white/60 bg-white/5 border border-white/10 uppercase"
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
          </div>

          <!-- Application Interface (Screenshots) -->
          <section class="relative border-y border-white/5 py-12 bg-black/20">
            <div class="layout-container mb-12">
              <h3
                class="text-xs font-bold font-mono tracking-widest text-white/40 uppercase mb-8 border-l-2 border-accent pl-4"
              >
                Interface Logs
              </h3>
            </div>
            @if (study.screenshots.length) {
              <app-project-screenshots [screenshots]="study.screenshots!" />
            }
          </section>

          <!-- Technical Architecture (Dark Section) -->
          <section class="bg-secondary py-24 relative overflow-hidden isolate">
            <div class="relative layout-container">
              <div class="max-w-3xl border border-white/10 p-8 md:p-12 relative bg-white/[0.02]">
                <!-- Decoration -->
                <div
                  class="absolute -top-3 left-8 px-4 py-1 bg-secondary text-xs font-mono text-accent border border-white/10"
                >
                  SYSTEM_ARCHITECTURE
                </div>

                <div
                  class="prose prose-lg prose-invert text-white/80 max-w-none font-light leading-loose"
                >
                  @if (study.technicalApproach) {
                    {{ study.technicalApproach }}
                  } @else {
                    Built with modern Angular architecture leveraging Signals for granular
                    reactivity. The state management strategy ensures type-safe, predictable data
                    flow while maintaining exceptional runtime performance.
                  }
                </div>

                <!-- Code decoration -->
                <div
                  class="mt-8 pt-6 border-t border-dashed border-white/10 text-[10px] font-mono text-white/30 flex justify-between"
                >
                  <span>STATUS: OPTIMIZED</span>
                  <span>RUNTIME: ANGULAR_19</span>
                </div>
              </div>
            </div>
          </section>

          <!-- Footer/Next Steps -->
          <section
            class="py-24 bg-secondary relative overflow-hidden isolate border-t border-white/10"
          >
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 class="text-3xl font-bold font-mono text-white mb-8 uppercase tracking-tight">
                End of File
              </h2>
              <app-button variant="secondary" size="lg" href="/">
                <!-- ArrowLeft -->
                <svg
                  class="h-4 w-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Return to Index
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
        title: `${study.title} | Angular Case Study`,
        description: study.challenge.substring(0, 160) + '...',
        image: study.heroImage,
        slug: `/work/${study.id}`,
        keywords: [
          ...study.techStack,
          'Angular Case Study',
          'Frontend Architecture',
          'Web Development',
          'Enterprise Application',
          'Performance Optimization',
          'Legacy Migration',
        ],
        type: 'article',
      });

      this.seoService.setBreadcrumbs([
        { name: 'Home', path: '/' },
        { name: 'Architecture', path: '/work' },
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
