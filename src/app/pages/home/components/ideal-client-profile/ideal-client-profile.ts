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
    'Warsztaty samochodowe i serwisy (rowerowe, GSM, AGD).',
    'Firmy usługowe pracujące u klienta (montaż okien, klimatyzacji).',
    'Właściciele, którzy mają dość szukania kartek i gubienia zleceń.',
    'Małe zespoły, które chcą wyglądać profesjonalnie przed klientem.',
  ]);

  protected readonly antiPatterns = signal<string[]>([
    'Sklepy internetowe i proste strony wizytówki.',
    'Osoby szukające najtańszego rozwiązania "na wczoraj".',
    'Projekty, w których nie ma powtarzalnych zleceń ani pracy z klientami.',
    'Duże korporacje ze skomplikowaną strukturą zarządzania.',
  ]);
}
