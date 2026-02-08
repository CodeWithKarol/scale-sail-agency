import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionHeader } from '../../../../shared/ui/section-header/section-header';

@Component({
  selector: 'app-service-level-objectives',
  standalone: true,
  imports: [CommonModule, SectionHeader],
  templateUrl: './service-level-objectives.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceLevelObjectives {
  objectives = signal([
    {
      id: 'PERF-01',
      label: 'Performance Speed',
      target: '90+',
      metric: 'Lighthouse / PSI',
      description: 'Guaranteed green Core Web Vitals. Velocity is impossible if the app is slow.',
      status: 'active',
    },
    {
      id: 'QUAL-02',
      label: 'Shipping Velocity',
      target: 'DAILY',
      metric: 'Deploy Frequency',
      description: 'Pipelines optimized for speed. Ship features on Fridays without fear.',
      status: 'active',
    },
    {
      id: 'TYPE-03',
      label: 'Type Safety',
      target: 'STRICT',
      metric: 'TypeScript 5.x',
      description: 'Zero "any" types allowed. Catches bugs at compile time, not in production.',
      status: 'active',
    },
    {
      id: 'A11Y-04',
      label: 'Accessibility',
      target: 'WCAG 2.1',
      metric: 'Level AA',
      description: 'Compliance built-in. Protects your brand and opens markets to all users.',
      status: 'active',
    },
  ]);
}
