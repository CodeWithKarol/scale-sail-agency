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
    'Warsztaty samochodowe (2–6 stanowisk), które gubią się w papierowych zleceniach',
    'Firmy usługowe z powtarzalnymi zleceniami (montaż okien, klimatyzacja, serwisy)',
    'Właściciele, którzy chcą odzyskać 10–15h tygodniowo spędzanych na telefonach',
    'Firmy zmęczone płaceniem wysokich abonamentów za sztywne systemy SaaS',
    'Osoby szukające pancernego systemu na własność, a nie tylko „ładnej strony”',
  ]);

  protected readonly antiPatterns = signal<string[]>([
    'Osoby szukające najtańszego gotowca „z pudełka” lub darmowych aplikacji',
    'Firmy bez powtarzalnych procesów (każde zlecenie jest zupełnie inne)',
    'Duże korporacje szukające skomplikowanych systemów klasy ERP',
    'Sklepy internetowe i proste wizytówki bez logiki biznesowej',
  ]);
}
