import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { NgClass } from '@angular/common';

interface ComparisonTier {
  id: string;
  name: string;
  bestFor: string;
  timeline: string;
  investment: string;
  ctaText: string;
  ctaLink: string;
  highlighted?: boolean;
}

@Component({
  selector: 'app-comparison-table',
  standalone: true,
  imports: [NgClass],
  templateUrl: './comparison-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComparisonTableComponent {
  tiers = signal<ComparisonTier[]>([
    {
      id: 'legacy-modernization',
      name: 'Legacy Modernization',
      bestFor: 'Eliminating technical debt & scaling bottlenecks',
      timeline: '4-12 Weeks',
      investment: 'Custom Quote',
      ctaText: 'Book Discovery Call',
      ctaLink: 'https://www.karol-modelski.scale-sail.io/contact',
      highlighted: true,
    },
    {
      id: 'feature-delivery',
      name: 'Feature Delivery',
      bestFor: 'Accelerating roadmaps & complex integrations',
      timeline: '2-6 Weeks',
      investment: 'Custom Quote',
      ctaText: 'Book Discovery Call',
      ctaLink: 'https://www.karol-modelski.scale-sail.io/contact',
    },
    {
      id: 'saas-engineering',
      name: 'SaaS Engineering',
      bestFor: 'Building scalable, audit-ready SaaS',
      timeline: '3-6 Months',
      investment: 'Custom Quote',
      ctaText: 'Book Discovery Call',
      ctaLink: 'https://www.karol-modelski.scale-sail.io/contact',
    },
    {
      id: 'audits-performance',
      name: 'Audits & Performance',
      bestFor: 'Identifying bottlenecks & Core Web Vitals',
      timeline: '1-2 Weeks',
      investment: 'Fixed Price',
      ctaText: 'Book Audit',
      ctaLink: 'https://www.karol-modelski.scale-sail.io/contact',
    },
    {
      id: 'tech-lead-mentor',
      name: 'Tech Lead / Mentor',
      bestFor: 'Elevating team capabilities & best practices',
      timeline: 'Ongoing',
      investment: 'Retainer',
      ctaText: 'Discuss Role',
      ctaLink: 'https://www.karol-modelski.scale-sail.io/contact',
    },
    {
      id: 'ready-to-ship-templates',
      name: 'Ready-to-Ship Templates',
      bestFor: 'Validating ideas with production-grade code',
      timeline: 'Immediate',
      investment: 'Free - $9.99',
      ctaText: 'Shop Templates',
      ctaLink: 'https://www.shop.scale-sail.io/',
    },
  ]);
}
