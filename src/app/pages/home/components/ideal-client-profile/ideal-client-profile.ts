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
    'Właściciele warsztatów samochodowych',
    'Małe firmy sprzątające',
    'Salony beauty i fryzjerskie',
    'Osoby zarządzające kilkoma mieszkaniami na wynajem',
  ]);

  protected readonly antiPatterns = signal<string[]>([
    'Sklepy internetowe i proste strony wizytówki.',
    'Osoby szukające najtańszego rozwiązania "na wczoraj".',
    'Projekty, w których nie ma powtarzalnych zleceń ani pracy z klientami.',
    'Duże korporacje ze skomplikowaną strukturą zarządzania.',
  ]);
}
