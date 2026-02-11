import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { SectionHeader } from '../../../../shared/ui/section-header/section-header';
import { Card } from '../../../../shared/ui/card/card';
import { Button } from '../../../../shared/ui/button/button';

interface ServiceTier {
  name: string;
  description: string;
  features: string[];
  timeline: string;
  investment: string;
  ctaText: string;
  ctaLink: string;
  featured?: boolean;
}

@Component({
  selector: 'app-service-architecture',
  imports: [SectionHeader, Card, Button],
  templateUrl: './service-architecture.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceArchitecture {
  tiers = signal<ServiceTier[]>([
    {
      name: 'The Signals Spark',
      description:
        'Bring your legacy Angular app into the v19 era. I refactor one core service and component to Signals to provide your team with a production-ready "Golden Path."',
      features: [
        'Core Service Signal Conversion',
        'Component inject() & model() patterns',
        'Boilerplate & Subscription Removal',
        'Migration Masterclass Video',
      ],
      timeline: '2 Days',
      investment: '$1,497',
      ctaText: 'Get Sparked',
      ctaLink: '/#contact',
    },
    {
      name: 'The Performance Surgery',
      description:
        'Move your Angular Lighthouse score from Red to Green. I implement tree-shaking, @defer blocks, and image optimization to guarantee a 90+ score.',
      features: [
        'Guaranteed Green Lighthouse Score',
        'Bundle Size Reduction (min 25%)',
        'LCP & TBT Optimization',
        'Surgical Pull Request & Handover',
      ],
      timeline: '5 Days',
      investment: '$4,997',
      ctaText: 'Start Surgery',
      ctaLink: '/#contact',
      featured: true,
    },
    {
      name: 'SPA Visibility Engine',
      description:
        'Make your SPA visible to search engines. I install the SSR, Schema.org, and Sitemap infrastructure required to rank without a full refactor.',
      features: [
        'Angular Universal/SSR Setup',
        'JSON-LD Schema Injection',
        'Dynamic Sitemap Generation',
        'Crawlability & Indexing Audit',
      ],
      timeline: '3 Days',
      investment: '$3,500',
      ctaText: 'Unlock SEO',
      ctaLink: '/#contact',
    },
    {
      name: 'Architecture Guardian',
      description:
        'Ongoing elite-level oversight for your team. I review your PRs, vet your technical choices, and ensure your architecture never drifts into debt again.',
      features: [
        'Weekly Mission-Critical PR Reviews',
        'Monthly Strategic Roadmap Sync',
        'Priority Slack/Discord Access',
        'Final-Stage Technical Vetting',
      ],
      timeline: 'Monthly',
      investment: '$2,500 / Month',
      ctaText: 'Apply for Guardian',
      ctaLink: '/#contact',
    },
  ]);
}
