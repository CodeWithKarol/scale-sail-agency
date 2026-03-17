import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { SectionHeader } from '../../../../shared/ui/section-header/section-header';
import { Card } from '../../../../shared/ui/card/card';

interface Problem {
  title: string;
  description: string;
  icon: string;
  theme: 'red' | 'orange' | 'indigo';
}

@Component({
  selector: 'app-problem-solution',
  imports: [SectionHeader, Card],
  templateUrl: './problem-solution.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProblemSolution {
  problems = signal<Problem[]>([
    {
      title: 'Warsztaty: kolejka aut zamiast kartek',
      description:
        'Tworzę prosty panel dla warsztatu, w którym na jednym ekranie widać wszystkie auta, ich status i historię napraw. Klient zamiast dzwonić pięć razy, dostaje SMS, kiedy auto jest gotowe.',
      icon: 'M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 011 1v2a1 1 0 01-1 1h-1m-4-14l-2 4h5l-1 1',
      theme: 'orange',
    },
    {
      title: 'Rezerwacje i kalendarz online',
      description:
        'Zamieniam telefony na prosty system rezerwacji z przypomnieniami SMS. Klienci sami wybierają termin (np. u fryzjera), a Ty widzisz pełny kalendarz – bez przepisywania wizyt z notesu.',
      icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
      theme: 'indigo',
    },
    {
      title: 'Koniec z bałaganem w danych',
      description:
        'Wszystkie zlecenia, rozliczenia i kontakty do klientów masz w jednej, lekkiej aplikacji. Działa na telefonie i komputerze, więc zawsze wiesz, co jest do zrobienia na jutro.',
      icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
      theme: 'red',
    },
  ]);

  getThemeClass(theme: 'red' | 'orange' | 'indigo') {
    switch (theme) {
      case 'red':
        return 'ring-red-500/50 text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)]';
      case 'orange':
        return 'ring-accent/50 text-accent shadow-[0_0_15px_rgba(255,111,60,0.3)]';
      case 'indigo':
        return 'ring-primary/50 text-primary shadow-[0_0_15px_rgba(0,123,255,0.3)]';
    }
  }
}
