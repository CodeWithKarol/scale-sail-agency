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
      name: 'Enterprise Modernization',
      description: 'Transform slow, tangled legacy frontends into clean, modular Angular systems.',
      features: [
        'Angular migrations (Legacy → Modern)',
        'Architecture Audits & Performance',
        'Fractional Tech Lead / Mentorship',
        'Refactoring & Technical Debt Removal',
      ],
      ctaText: 'Book Discovery Call',
      ctaLink: 'https://www.karol-modelski.scale-sail.io/#contact',
    },
    {
      name: 'SaaS Product Engineering',
      description: 'End-to-end delivery for scalable SaaS products.',
      features: [
        'End-to-end Feature Delivery',
        'Predictable State Management',
        'Performance-First Architecture',
        'Rapid Iteration Support',
      ],
      ctaText: 'Book Discovery Call',
      ctaLink: 'https://www.karol-modelski.scale-sail.io/#contact',
      featured: true,
    },
    {
      name: 'Scale Sail Templates',
      description: 'Ship a high-converting landing page today. Built with the same standards.',
      features: [
        'Production-ready HTML/CSS/JS',
        'Commercial use included',
        'No framework required',
        'Deploy in minutes',
      ],
      ctaText: 'Shop Templates',
      ctaLink: 'https://www.shop.scale-sail.io/',
    },
  ]);
}
