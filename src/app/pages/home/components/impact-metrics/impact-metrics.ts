import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card } from '../../../../shared/ui/card/card';
import { SectionHeader } from '../../../../shared/ui/section-header/section-header';

interface Metric {
  value: string;
  suffix?: string;
  label: string;
  description: string;
}

@Component({
  selector: 'app-impact-metrics',
  standalone: true,
  imports: [CommonModule, Card, SectionHeader],
  templateUrl: './impact-metrics.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImpactMetrics {
  protected readonly metrics = signal<Metric[]>([
    {
      value: '$997',
      label: 'Risk-Free Audit',
      description: 'Fee is 100% credited towards your first modernization sprint.',
    },
    {
      value: '2-Wk',
      label: 'Sprint Cycles',
      description: 'Predictable delivery cadence with fixed scope and pricing.',
    },
    {
      value: '60%',
      suffix: '-',
      label: 'Reduced Technical Debt',
      description: 'Reduction in legacy dependencies and spaghetti code.',
    },
    {
      value: '100%',
      label: 'Scale-Ready Stability',
      description: 'Codebases delivered with strict typing and zero critical regressions.',
    },
  ]);
}
