import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card } from '../../../../shared/ui/card/card';
import { SectionHeader } from '../../../../shared/ui/section-header/section-header';

@Component({
  selector: 'app-ideal-client-profile',
  standalone: true,
  imports: [CommonModule, Card, SectionHeader],
  templateUrl: './ideal-client-profile.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IdealClientProfile {
  protected readonly idealClients = signal<string[]>([
    'Scale-Ups where feature delivery has slowed to a crawl.',
    'CTOs who need a "Fixer" to stabilize a legacy Angular codebase.',
    'Teams ready to adopt the "Stabilizer Protocol" (Audit → Sprint).',
    'Founders who measure success by Velocity and ROI, not hours worked.',
  ]);

  protected readonly antiPatterns = signal<string[]>([
    'Brochure sites or short-term "quick fix" gigs.',
    'Teams looking for a "Yes-Man" to just merge tickets.',
    'Micromanagers who care more about timesheets than output.',
    'Non-Angular stacks (React/Vue) - I am a specialist, not a generalist.',
  ]);
}
