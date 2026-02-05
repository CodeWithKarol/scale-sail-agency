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
      value: '40%',
      suffix: '+',
      label: 'Performance Boost',
      description: 'Average Core Web Vitals improvement after Angular architecture refactoring.',
    },
    {
      value: '3x',
      label: 'Faster Delivery',
      description: 'Feature velocity increase through Nx component standardization.',
    },
    {
      value: '60%',
      suffix: '-',
      label: 'Less Tech Debt',
      description: 'Reduction in legacy dependencies and RxJS complexity.',
    },
    {
      value: '100%',
      label: 'Audit Ready',
      description: 'Codebases delivered with strict typing, testing, and documentation.',
    },
  ]);
}
