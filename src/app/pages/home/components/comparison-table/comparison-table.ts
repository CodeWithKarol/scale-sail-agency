import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { SectionHeader } from '../../../../shared/ui/section-header/section-header';
import { Button } from '../../../../shared/ui/button/button';
import { Card } from '../../../../shared/ui/card/card';
import { RouterLink } from '@angular/router';

interface ComparisonTier {
  id: string;
  name: string;
  bestFor: string;
  timeline: string;
  result: string;
  ctaText: string;
  ctaLink: string;
  highlighted?: boolean;
}

@Component({
  selector: 'app-comparison-table',
  imports: [SectionHeader, Button, Card, RouterLink],
  templateUrl: './comparison-table.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComparisonTable {
  tiers = signal<ComparisonTier[]>([
    {
      id: 'paper',
      name: 'Kartki i Notatki',
      bestFor: 'Mały bałagan',
      timeline: 'Cały dzień',
      result: 'Zgubione zlecenia, brudne papiery, chaos.',
      ctaText: 'Zmień to',
      ctaLink: '/#contact',
    },
    {
      id: 'app',
      name: 'Twoja Aplikacja',
      bestFor: 'Profesjonalny Warsztat',
      timeline: '1 kliknięcie',
      result: 'Automatyczne SMS-y, porządek, święty spokój.',
      ctaText: 'Chcę taką',
      ctaLink: '/#contact',
      highlighted: true,
    },
    {
      id: 'excel',
      name: 'Zawiły Excel',
      bestFor: 'Analiza po nocach',
      timeline: '3 godziny dziennie',
      result: 'Błędy w danych, brak dostępu z telefonu.',
      ctaText: 'Uprość to',
      ctaLink: '/#contact',
    },
  ]);
}
