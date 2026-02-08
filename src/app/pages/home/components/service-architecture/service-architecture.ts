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
      name: 'The Scale-Blocker Audit',
      description:
        'The entry point. I analyze your codebase and process to identify exactly why velocity has slowed. You get a prioritized Roadmap PDF and an Executive Debrief.',
      features: [
        '5-Day Turnaround',
        'Root Cause Analysis (Tech & Process)',
        'Prioritized Remediation Roadmap',
        '100% Credited towards first Sprint',
      ],
      ctaText: 'Book Audit ($997)',
      ctaLink: '/#contact',
    },
    {
      name: 'Velocity Sprints',
      description:
        'Execute the roadmap in predictable 2-week cycles. We fix the blockers, modernize the stack, and ship features without the overhead of full-time hiring.',
      features: [
        'Fixed Price ($4k / Sprint)',
        'Scope Locked at Start',
        'Bi-Weekly Deliverables',
        'No Long-Term Contract',
      ],
      ctaText: 'Start Sprint',
      ctaLink: '/#contact',
      featured: true,
    },
    {
      name: 'Fractional Architect',
      description:
        'For teams that need ongoing leadership. I join your slack, review PRs, and guide architecture decisions to ensure you never hit a wall again.',
      features: [
        'Weekly Strategy Calls',
        'Code Review Leadership',
        'Hiring & Team Mentorship',
        'Retainer Model ($2k / Month)',
      ],
      ctaText: 'Discuss Role',
      ctaLink: '/#contact',
    },
  ]);
}
