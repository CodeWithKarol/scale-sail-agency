import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { SectionHeader } from '../../../../shared/ui/section-header/section-header';
import { Card } from '../../../../shared/ui/card/card';
import { Button } from '../../../../shared/ui/button/button';

interface ServiceTier {
  name: string;
  description: string;
  features: string[];
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
      name: 'Enterprise Angular Modernization',
      description:
        'I transform slow, tangled legacy frontends into clean, modular Angular systems.',
      features: [
        'Angular migrations (Legacy → v21)',
        'Nx Monorepo Architecture',
        'Zoneless Performance Tuning',
        'Refactoring & Technical Debt Removal',
      ],
      ctaText: 'Book Discovery Call',
      ctaLink: '/#contact',
    },
    {
      name: 'Angular SaaS Engineering',
      description: 'End-to-end delivery for scalable SaaS products.',
      features: [
        'Complex Data Visualization',
        'Predictable State (NgRx / Signals)',
        'Server-side & hybrid rendering, Incremental Hydration',
        'Rapid Iteration Support',
      ],
      ctaText: 'Book Discovery Call',
      ctaLink: '/#contact',
      featured: true,
    },
    {
      name: 'Angular Performance Audits',
      description: 'Deep-dive profiling to uncover bottlenecks in load time and runtime speed.',
      features: [
        'Core Web Vitals Optimization',
        'NgRx Store Architecture Review',
        'Change Detection Profiling',
        'Architecture Health Check',
      ],
      ctaText: 'Book Audit',
      ctaLink: '/#contact',
    },
  ]);
}
