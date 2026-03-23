import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { SectionHeader } from '../../../../shared/ui/section-header/section-header';

interface ProcessStep {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  iconPath: string;
  duration: string;
  status: string;
}

@Component({
  selector: 'app-process',
  standalone: true,
  imports: [SectionHeader],
  templateUrl: './process.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Process {
  steps = signal<ProcessStep[]>([
    {
      number: '01',
      title: 'Analiza potrzeb',
      subtitle: 'DIAGNOZA',
      description:
        'Analiza potrzeb (3–5 dni). Sprawdzam, gdzie ucieka Twój czas i projektuję prosty system, który ten problem rozwiąże. Bez zbędnych komplikacji.',
      iconPath: 'M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z',
      duration: '3-5 DNI',
      status: 'OCZEKIWANIE',
    },
    {
      number: '02',
      title: 'Szybkie wdrożenie',
      subtitle: 'REALIZACJA',
      description:
        'Buduję najważniejsze funkcje (np. kolejkę zleceń, aut w serwisie i SMS-y do klientów) oraz konfiguruję automatyzacje w n8n/Make/Zapier i podstawowe funkcje AI. Pracujemy w krótkich, konkretnych etapach, tak żebyś jak najszybciej odczuł różnicę w codziennej pracy. <strong class="font-bold text-secondary/90">Nie blokujemy Ci warsztatu na całe tygodnie.</strong>',
      iconPath:
        'M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z',
      duration: '7-14 DNI',
      status: 'W KOLEJCE',
    },
    {
      number: '03',
      title: 'Wsparcie i rozwój',
      subtitle: 'FINAŁ',
      description:
        'Przekazuję Ci gotową aplikację, szkolę pracowników i pomagam rozwijać ją dalej, gdy firma rośnie.',
      iconPath:
        'M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm-2-10 2 2 4-4',
      duration: 'STAŁA OPIEKA',
      status: 'GOTOWY DO PRACY',
    },
  ]);
}
