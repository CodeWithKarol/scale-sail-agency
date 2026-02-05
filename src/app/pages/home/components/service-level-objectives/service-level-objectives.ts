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
      label: 'Performance Score',
      target: '90+',
      metric: 'Lighthouse / PSI',
      description: 'Guaranteed green metrics for Core Web Vitals on delivered pages.',
      status: 'active',
    },
    {
      id: 'QUAL-02',
      label: 'Test Coverage',
      target: '>80%',
      metric: 'Jest / Vitest',
      description: 'Business logic is fully tested. No "it works on my machine".',
      status: 'active',
    },
    {
      id: 'TYPE-03',
      label: 'Type Safety',
      target: 'STRICT',
      metric: 'TypeScript 5.x',
      description: 'Zero "any" types allowed. Strict null checks enabled by default.',
      status: 'active',
    },
    {
      id: 'A11Y-04',
      label: 'Accessibility',
      target: 'WCAG 2.1',
      metric: 'Level AA',
      description: 'Semantic HTML and keyboard navigation built-in, not added on.',
      status: 'active',
    },
  ]);
}
