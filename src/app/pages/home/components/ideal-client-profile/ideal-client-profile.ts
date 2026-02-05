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
    'Enterprise teams managing complex Angular monorepos (Nx/Turborepo).',
    'SaaS products with high performance requirements (SSR/SSG/Hydration).',
    'Startups post-Series A needing scalable frontend architecture (NgRx/Signals).',
    'Teams migrating from AngularJS/Legacy Angular to Modern Angular 21+.',
  ]);

  protected readonly antiPatterns = signal<string[]>([
    'Simple brochure websites or Wordpress themes (too simple for my stack).',
    'Projects requiring "quick & dirty" implementations without tests.',
    'Teams looking for the cheapest available developer.',
    'React, Vue, or Svelte projects (I specialize exclusively in Angular).',
  ]);
}
