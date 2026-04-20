import { Component, inject, input, effect, ChangeDetectionStrategy } from '@angular/core';
import { UpperCasePipe, NgOptimizedImage } from '@angular/common';
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
  standalone: true,
  imports: [
    UpperCasePipe,
    ProjectScreenshots,
    Button,
    BreadcrumbComponent,
    SectionHeader,
    NgOptimizedImage,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './case-study.html',
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
        slug: `system-dla-warsztatu/${study.id}`,
        type: 'article',
      });

      this.seoService.setBreadcrumbs([
        { name: 'Start', path: '/' },
        { name: 'Systemy', path: '/system-dla-warsztatu' },
        { name: study.title, path: `/system-dla-warsztatu/${study.id}` },
      ]);

      // Full Case Study Rich Result
      this.seoService.setSchema(
        {
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'Article',
              '@id': `https://scale-sail.io/system-dla-warsztatu/${study.id}/#article`,
              headline: study.title,
              description: study.challenge,
              image: `https://scale-sail.io${study.heroImage}`,
              datePublished: '2024-01-01T08:00:00+00:00', // Standardowa data
              author: {
                '@type': 'Person',
                name: 'Karol Modelski',
                url: 'https://scale-sail.io/o-mnie',
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
                '@id': `https://scale-sail.io/system-dla-warsztatu/${study.id}`,
              },
            },
          ],
        },
        'json-ld-article',
      );
    });
  }
}
