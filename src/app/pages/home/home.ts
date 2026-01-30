import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeoService } from '../../shared/core/seo/seo.service';
import { Hero } from './components/hero/hero';
import { ProblemSolution } from './components/problem-solution/problem-solution';
import { ServiceArchitecture } from './components/service-architecture/service-architecture';
import { CaseStudies } from './components/case-studies/case-studies';
import { TemplateShowcase } from './components/template-showcase/template-showcase';
import { Process } from './components/process/process';
import { FounderStory } from './components/founder-story/founder-story';
import { ComparisonTable } from './components/comparison-table/comparison-table';
import { Faq } from './components/faq/faq';
import { FinalCta } from './components/final-cta/final-cta';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    Hero,
    ProblemSolution,
    ServiceArchitecture,
    CaseStudies,
    TemplateShowcase,
    Process,
    FounderStory,
    ComparisonTable,
    Faq,
    FinalCta,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home implements OnInit {
  private seoService = inject(SeoService);

  ngOnInit(): void {
    this.seoService.setPageMetadata({
      title: 'Senior Angular Developer | Legacy Modernization & Performance',
      description:
        'Senior Angular Developer specialized in modernizing legacy apps, Angular migrations, and fixing technical debt. Scale your enterprise frontend with audit-ready architecture and high performance.',
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
  }
}
