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

@Component({
  selector: 'app-work-page',
  imports: [CommonModule, SectionHeader, ProjectCardComponent, Button],
  template: `
    <div class="min-h-screen bg-secondary font-sans text-white pb-24 sm:pb-32 relative isolate">
      <!-- Technical Grid Background -->
      <div
        class="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none -z-10"
      ></div>

      <div class="layout-container pt-24 sm:pt-32">
        <!-- Header -->
        <app-section-header
          subtitle="INDEX / 01"
          title="Selected Work"
          description="Case studies focused on modernization, performance wins, and scalable architecture."
        />

        <!-- Projects List -->
        <div class="mt-24 sm:mt-32 border-t border-white/10">
          @if (hasProjects()) {
            <ul class="list-none p-0 divide-y divide-white/5">
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
              <div class="mt-32 flex justify-center">
                <app-button variant="secondary" size="lg" (click)="loadMore()">
                  Load more projects
                </app-button>
              </div>
            }
          } @else {
            <div class="text-center py-24">
              <p class="text-white/40">Coming soon.</p>
            </div>
          }
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
        title: 'Work | Scale Sail Agency',
        description:
          'Explore real-world case studies of Angular migrations, performance optimization, and scalable "Smart Shell" architecture for enterprise applications.',
        slug: '/work',
        keywords: [
          'Angular Portfolio',
          'Case Studies',
          'Enterprise Angular',
          'System Architecture',
          'SaaS Development',
          'Frontend Modernization',
        ],
      });

      this.seoService.setBreadcrumbs([
        { name: 'Home', path: '/' },
        { name: 'Work', path: '/work' },
      ]);

      const projects = this.projects();
      if (projects.length > 0) {
        this.seoService.setSchema({
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'CollectionPage',
              name: 'Selected Work | Scale Sail Agency',
              description:
                'Case studies focused on modernization, performance wins, and scalable architecture.',
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
