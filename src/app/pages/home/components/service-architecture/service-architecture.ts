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
      name: 'The Scale-Blocker Audit',
      description:
        'The entry point. I analyze your codebase and process to identify exactly why velocity has slowed. You get a prioritized Roadmap PDF and an Executive Debrief.',
      features: [
        'Root Cause Analysis',
        'Prioritized Remediation Roadmap',
        'Process Bottleneck Identification',
        '100% Credited towards first Sprint',
      ],
      timeline: '5 Days',
      investment: '$997',
      ctaText: 'Book Audit',
      ctaLink: '/#contact',
    },
    {
      name: 'Velocity Sprints',
      description:
        'Execute the roadmap in predictable 2-week cycles. We fix the blockers, modernize the stack, and ship features without the overhead of full-time hiring.',
      features: [
        'Clean Architecture Implementation',
        'Legacy Migration (Angular v14->19)',
        'Technical Debt Remediation',
        'Feature Delivery Acceleration',
      ],
      timeline: '2-Week Cycles',
      investment: '$4,000 / Sprint',
      ctaText: 'Start Sprint',
      ctaLink: '/#contact',
      featured: true,
    },
    {
      name: 'Fractional Architect',
      description:
        'For teams that need ongoing leadership. I join your slack, review PRs, and guide architecture decisions to ensure you never hit a wall again.',
      features: [
        'Weekly Strategy & Guidance',
        'PR & Design Review Leadership',
        'Engineering Mentorship',
        'Hiring Support & Vetting',
      ],
      timeline: 'Monthly',
      investment: '$2,000 / Month',
      ctaText: 'Discuss Role',
      ctaLink: '/#contact',
    },
  ]);
}
