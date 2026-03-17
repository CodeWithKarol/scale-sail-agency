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
        'Koniec z szukaniem numeru klienta na skrawku papieru zalanym olejem. Masz czytelny podgląd wszystkich aut w serwisie, a system sam wyśle SMS-a, gdy robota będzie skończona.',
      icon: 'M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 011 1v2a1 1 0 01-1 1h-1m-4-14l-2 4h5l-1 1',
      theme: 'orange',
    },
    {
      title: 'Rezerwacje i kalendarz online',
      description:
        'Twój telefon dzwoni rzadziej, bo klienci sami zapisują się przez stronę. Widzisz pełny grafik na telefonie – bez skreśleń w zeszycie i nakładających się terminów.',
      icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
      theme: 'orange',
    },
    {
      title: 'Koniec z pracą po godzinach',
      description:
        'Zamiast siedzieć po nocach nad Excelami i rozliczeniami, masz wszystko pod jednym palcem. Wszystkie zlecenia i kontakty są bezpieczne i poukładane za Ciebie.',
      icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
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
