import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeoService } from '../../shared/core/seo/seo.service';
import { Hero } from './components/hero/hero';
import { ProblemSolution } from './components/problem-solution/problem-solution';
import { ServiceArchitecture } from './components/service-architecture/service-architecture';
import { Process } from './components/process/process';
import { FounderStory } from './components/founder-story/founder-story';
import { ComparisonTable } from './components/comparison-table/comparison-table';
import { ServiceLevelObjectives } from './components/service-level-objectives/service-level-objectives';
import { Contact } from './components/contact/contact';
import { Faq } from './components/faq/faq';
import { FinalCta } from './components/final-cta/final-cta';
import { ImpactMetrics } from './components/impact-metrics/impact-metrics';
import { IdealClientProfile } from './components/ideal-client-profile/ideal-client-profile';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    Hero,
    ProblemSolution,
    ServiceArchitecture,
    Process,
    FounderStory,
    ComparisonTable,
    ServiceLevelObjectives,
    Contact,
    Faq,
    FinalCta,
    ImpactMetrics,
    IdealClientProfile,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home implements OnInit {
  private seoService = inject(SeoService);

  ngOnInit(): void {
    this.seoService.setPageMetadata({
      title: 'Senior Angular Developer',
      description:
        'Senior Angular Developer specialized in modernizing legacy apps and technical debt. Scale your enterprise frontend with audit-ready architecture.',
      slug: '',
      type: 'website',
      keywords: [
        // Short-tail (High Volume)
        'Angular Developer',
        'Frontend Architect',
        'Angular Consultant',
        // Mid-tail (Targeted Services)
        'Angular Migration',
        'Enterprise Angular',
        'Performance Optimization',
        'Code Refactoring',
        'Technical Debt',
        // Long-tail (High Intent/Specific Problems)
        'Legacy Application Modernization',
        'AngularJS to Angular Upgrade',
        'Fix Slow Angular Application',
        'Scalable Frontend Architecture',
        'Zoneless Angular Migration',
      ],
    });

    this.seoService.setSchema({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Scale Sail Agency',
      url: 'https://scale-sail.io',
      logo: 'https://scale-sail.io/images/scale-sail-logo.jpeg',
      description:
        'Senior Angular Developer specialized in modernizing legacy apps, Angular migrations, and fixing technical debt.',
      founder: {
        '@type': 'Person',
        name: 'Karol Modelski',
        jobTitle: 'Senior Frontend Developer & Founder',
      },
      areaServed: 'Worldwide',
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: 'contact@scale-sail.io',
      },
    });
  }
}
