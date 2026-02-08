import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { SectionHeader } from '../../../../shared/ui/section-header/section-header';
import { Button } from '../../../../shared/ui/button/button';
import { Card } from '../../../../shared/ui/card/card';
import { RouterLink } from '@angular/router';

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
  imports: [SectionHeader, Button, Card, RouterLink],
  templateUrl: './comparison-table.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComparisonTable {
  tiers = signal<ComparisonTier[]>([
    {
      id: 'audit',
      name: 'Scale-Blocker Audit',
      bestFor: 'Diagnosing root causes & Roadmap',
      timeline: '5 Days',
      investment: '$997 (Credited)',
      ctaText: 'Book Audit',
      ctaLink: '/#contact',
      highlighted: true,
    },
    {
      id: 'sprints',
      name: 'Velocity Sprints',
      bestFor: 'Executing the Roadmap & Fixes',
      timeline: '2-Week Cycles',
      investment: '$4,000 / Sprint',
      ctaText: 'Start Sprint',
      ctaLink: '/#contact',
    },
    {
      id: 'retainer',
      name: 'Fractional Architect',
      bestFor: 'Ongoing Leadership & QA',
      timeline: 'Monthly',
      investment: '$2,000 / Month',
      ctaText: 'Discuss Role',
      ctaLink: '/#contact',
    },
  ]);
}
