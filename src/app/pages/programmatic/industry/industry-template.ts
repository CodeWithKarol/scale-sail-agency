import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, switchMap, tap } from 'rxjs/operators';
import { ContentService } from '../../../shared/domain/content/content.service';
import { SeoService } from '../../../shared/core/seo/seo.service';
import { Header } from '../../../layout/header/header';
import { Footer } from '../../../layout/footer/footer';
import { SectionHeader } from '../../../shared/ui/section-header/section-header';
import { Card } from '../../../shared/ui/card/card';
import { Button } from '../../../shared/ui/button/button';

@Component({
  selector: 'app-industry-template',
  standalone: true,
  imports: [CommonModule, SectionHeader, Card, Button],
  template: `
    @if (pageData(); as data) {
      <div class="min-h-screen bg-secondary pt-24 pb-12">
        <!-- Dynamic Hero -->
        <section class="relative overflow-hidden px-6 lg:px-8 py-20 sm:py-32">
          <div class="mx-auto max-w-2xl text-center">
            <h1 class="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              {{ data.heroHeading }}
            </h1>
            <p class="mt-6 text-lg leading-8 text-gray-300">
              {{ data.heroSubheading }}
            </p>
            <div class="mt-10 flex items-center justify-center gap-x-6">
              <app-button variant="primary">Schedule Consultation</app-button>
              <app-button variant="secondary">View {{ data.industry }} Case Studies</app-button>
            </div>
          </div>
        </section>

        <!-- Dynamic Diagnosis Section -->
        <section class="py-20">
          <app-section-header 
            title="Why generic solutions fail in {{ data.industry }}"
            subtitle="The Problem"
            description="We understand the specific bottlenecks holding your platform back."
          />
          
          <div class="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-7xl px-6">
            <dl class="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3 lg:gap-y-16">
              @for (point of data.painPoints; track point) {
                <app-card class="bg-white/5 p-8" [interactive]="true">
                  <dt class="text-base font-semibold leading-7 text-white">
                    🛑 Risk Factor
                  </dt>
                  <dd class="mt-2 text-base leading-7 text-gray-300">{{ point }}</dd>
                </app-card>
              }
            </dl>
          </div>
        </section>

        <!-- Dynamic Solution Section -->
        <section class="py-20 bg-white/5">
          <app-section-header 
            title="The Angular Advantage for {{ data.industry }}"
            subtitle="The Solution"
          />
           <div class="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-7xl px-6">
            <dl class="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3 lg:gap-y-16">
              @for (feature of data.solutionFeatures; track feature) {
                <app-card variant="highlight" class="p-8">
                  <dt class="text-base font-semibold leading-7 text-white">
                    ✅ Enterprise Feature
                  </dt>
                  <dd class="mt-2 text-base leading-7 text-gray-300">{{ feature }}</dd>
                </app-card>
              }
            </dl>
          </div>
        </section>

        <!-- Dynamic FAQ (Schema Rich) -->
        <section class="py-20">
           <app-section-header 
            title="Common Questions"
            subtitle="FAQ"
          />
          <div class="mx-auto mt-8 max-w-3xl divide-y divide-white/10 px-6">
             @for (item of data.faq; track item.question) {
               <div class="py-8">
                 <dt class="text-lg font-semibold leading-7 text-white">{{ item.question }}</dt>
                 <dd class="mt-2 text-base leading-7 text-gray-400">{{ item.answer }}</dd>
               </div>
             }
          </div>
        </section>

      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndustryTemplate {
  private route = inject(ActivatedRoute);
  private contentService = inject(ContentService);
  private seoService = inject(SeoService);

  // Reactive Data Fetching based on Route Params
  // "industry" corresponds to the path param defined in app.routes.ts
  pageData = toSignal(
    this.route.paramMap.pipe(
      map(params => params.get('slug')),
      switchMap(slug => {
        if (!slug) return []; 
        return this.contentService.getIndustryPage(slug).pipe(
          tap(data => {
            if (data) {
              this.updateSeo(data);
            }
          })
        );
      })
    )
  );

  private updateSeo(data: any): void {
    this.seoService.setPageMetadata({
      title: data.title,
      description: data.heroSubheading,
      slug: data.slug,
      type: 'article',
      keywords: ['Angular', data.industry, 'development', 'enterprise']
    });

    this.seoService.setBreadcrumbs([
      { name: 'Home', path: '/' },
      { name: 'Industries', path: '/industry' },
      { name: data.industry, path: data.slug }
    ]);
    
    // Inject FAQ Schema
    this.seoService.setSchema({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: data.faq.map((f: any) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: f.answer
        }
      }))
    });
  }
}
