import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card } from '../../../../shared/ui/card/card';
import { SectionHeader } from '../../../../shared/ui/section-header/section-header';

import { LucideAngularModule, Check, X } from 'lucide-angular';

@Component({
  selector: 'app-ideal-client-profile',
  standalone: true,
  imports: [CommonModule, Card, SectionHeader, LucideAngularModule],
  templateUrl: './ideal-client-profile.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IdealClientProfile {
  protected readonly icons = {
    Check,
    X,
  };
  protected readonly idealClients = signal<string[]>([
    'Warsztaty samochodowe (2–6 stanowisk)',
    'Firmy usługowe z powtarzalnymi zleceniami',
    'Właściciele szukający odzyskania 10–15h tygodniowo',
    'Firmy zmęczone abonamentami SaaS',
  ]);

  protected readonly antiPatterns = signal<string[]>([
    'Szukający najtańszego gotowca „z pudełka”',
    'Firmy bez powtarzalnych procesów',
    'Duże korporacje (systemy ERP)',
    'Proste wizytówki bez logiki biznesowej',
  ]);
}
