import {
  Component,
  ChangeDetectionStrategy,
  inject,
  computed,
  signal,
  effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { PortfolioService } from '../../shared/domain/portfolio/portfolio.service';
import { SeoService } from '../../shared/core/seo/seo.service';
import { Button } from '../../shared/ui/button/button';
import { SectionHeader } from '../../shared/ui/section-header/section-header';
import { ProjectCardComponent } from './components/project-card/project-card';

import { BreadcrumbComponent } from '../../shared/ui/breadcrumb/breadcrumb';

@Component({
  selector: 'app-work-page',
  imports: [CommonModule, SectionHeader, ProjectCardComponent, Button, BreadcrumbComponent],
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
          subtitle="PORTFOLIO"
          title="Systemy zarządzania zleceniami w praktyce"
          description="Zobacz przykładowe projekty – od paneli administracyjnych po lekkie narzędzia dla warsztatów i usług."
        />

        <div
          class="max-w-4xl border-l-8 border-primary/10 pl-10 py-8 bg-white/5 mb-24 animate-in fade-in slide-in-from-left-4 duration-700 delay-200"
        >
          <p class="text-body sm:text-lg text-secondary/90 italic">
            Część poniższych projektów to przykładowe realizacje stworzone na potrzeby portfolio –
            pokazują poziom złożoności, jakość frontendu i podejście do projektowania paneli, z
            których później korzystają prawdziwi użytkownicy.
          </p>
          <div class="mt-6 text-small text-secondary/75">GWARANCJA JAKOŚCI: WYSOKI STANDARD</div>
        </div>

        <!-- Projects List -->
        <div class="mt-24 sm:mt-32 border-t-4 border-secondary/10">
          @if (hasProjects()) {
            <ul class="list-none p-0 divide-y-4 divide-secondary/5">
              @for (
                project of visibleProjects();
                track project.id;
                let i = $index;
                let last = $last
              ) {
                <li class="py-24 sm:py-32">
                  <app-project-card [project]="project" [reverseLayout]="i % 2 !== 0" />
                </li>
              }
            </ul>

            <!-- Load More -->
            @if (hasMoreProjects()) {
              <div class="mt-32 flex justify-center pt-20 border-t-2 border-secondary/10 relative">
                <div class="absolute -top-0.5 left-1/2 -translate-x-1/2 w-24 h-1 bg-primary"></div>
                <app-button variant="secondary" size="lg" (click)="loadMore()">
                  POKAŻ WIĘCEJ PROJEKTÓW
                </app-button>
              </div>
            }
          } @else {
            <div class="text-center py-32 bg-white border-2 border-dashed border-secondary/10">
              <p class="text-small text-secondary/40">Wkrótce pojawią się nowe opisy.</p>
            </div>
          }
        </div>

        <!-- Contextual Internal Linking (SEO & Flow) -->
        <div class="mt-32 py-20 border-t-2 border-dashed border-secondary/10 text-center relative">
          <h2 class="heading-2 text-secondary mb-6">Widzisz tu logikę, której szukasz?</h2>
          <p class="text-lg text-secondary/90 mb-12 max-w-2xl mx-auto">
            Jeśli chcesz przenieść tę ekspercką stabilność do swojej firmy, porozmawiajmy o tym, co
            możemy zautomatyzować.
          </p>

          <div class="flex justify-center">
            <app-button variant="accent" size="lg" href="/consultation">
              <span class="text-lg font-bold">Umów Weryfikację potrzeb (15 min) 📅</span>
            </app-button>
          </div>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkPage {
  private portfolioService = inject(PortfolioService);
  private seoService = inject(SeoService);

  // Data
  projects = toSignal(this.portfolioService.getAllCaseStudies(), { initialValue: [] });

  // State
  private readonly batchSize = 3;
  protected visibleCount = signal(4);

  // Derived
  hasProjects = computed(() => this.projects().length > 0);

  visibleProjects = computed(() => {
    return this.projects().slice(0, this.visibleCount());
  });

  hasMoreProjects = computed(() => {
    return this.visibleProjects().length < this.projects().length;
  });

  constructor() {
    effect(() => {
      // SEO
      this.seoService.setPageMetadata({
        title: 'Systemy Zleceń — Realizacje i Case Studies | Scale Sail',
        description:
          'Konkretne przykłady wdrożeń systemów zarządzania i automatyzacji. Zobacz, jak cyfrowy warsztat pomaga odzyskać czas.',
        slug: '/work',
        keywords: [
          'case study automatyzacja',
          'wdrożenia systemów dla firm',
          'przykłady aplikacji dla warsztatów',
          'automatyzacja serwisu samochodowego realizacje',
          'portfolio programista systemy biznesowe',
          'efekty cyfryzacji firmy',
        ],
      });

      this.seoService.setBreadcrumbs([
        { name: 'Start', path: '/' },
        { name: 'Systemy', path: '/work' },
      ]);

      const projects = this.projects();
      if (projects.length > 0) {
        this.seoService.setSchema({
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'CollectionPage',
              name: 'Wybrane Realizacje | Scale Sail Agency',
              description:
                'Historie wdrożeń systemów, które usprawniły pracę w firmach usługowych.',
              url: 'https://scale-sail.io/work',
              mainEntity: {
                '@type': 'ItemList',
                itemListElement: projects.map((project, index) => ({
                  '@type': 'ListItem',
                  position: index + 1,
                  item: {
                    '@type': 'Article',
                    url: `https://scale-sail.io/work/${project.id}`,
                    name: project.title,
                    headline: project.title,
                    image: project.heroImage ? [`https://scale-sail.io${project.heroImage}`] : [],
                    description: project.tagline,
                    author: {
                      '@type': 'Organization',
                      name: 'Scale Sail Agency',
                      url: 'https://scale-sail.io',
                    },
                  },
                })),
              },
            },
          ],
        });
      }
    });
  }

  loadMore() {
    this.visibleCount.update((c) => c + this.batchSize);
  }
}
