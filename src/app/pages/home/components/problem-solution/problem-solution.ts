import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { SectionHeader } from '../../../../shared/ui/section-header/section-header';
import { Card } from '../../../../shared/ui/card/card';

interface Problem {
  title: string;
  description: string;
  icon: string;
  theme: 'primary' | 'secondary' | 'accent';
  label: string;
}

import { Button } from '../../../../shared/ui/button/button';

@Component({
  selector: 'app-problem-solution',
  imports: [SectionHeader, Card, Button],
  templateUrl: './problem-solution.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProblemSolution {
  problems = signal<Problem[]>([
    {
      title: 'Koniec z kartkami zalanymi olejem',
      description:
        'Twój warsztat potrzebuje cyfrowego silnika, a nie kolejnego zeszytu. Buduję proste aplikacje do zleceń: kolejka aut, statusy napraw i automatyczne powiadomienia SMS do klientów.<br><br><span class="italic font-bold text-secondary/90">Efekt: Porządek w papierach i 80% mniej telefonów z pytaniem „kiedy gotowe?”.</span>',
      icon: 'M3 11l2-4h14l2 4M2 11v6a1 1 0 001 1h2m14 0h2a1 1 0 001-1v-6M5 11h14 M7 18a2 2 0 100-4 2 2 0 000 4zm10 0a2 2 0 100-4 2 2 0 000 4z',
      theme: 'accent',
      label: 'DIAGNOZA ZLECEŃ',
    },
    {
      title: 'Rezerwacje, które pracują w nocy',
      description:
        'Klienci zapisują się sami przez Twoją stronę, nawet gdy Ty śpisz. System sam przypomni im o wizycie, żebyś nie stał nad pustym podnośnikiem czekając na spóźnialskich.',
      icon: 'M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z',
      theme: 'primary',
      label: 'KALENDARZ 24/7',
    },
    {
      title: 'Odzyskaj 15 godzin tygodniowo',
      description:
        'Zamiast siedzieć po nocach nad Excelami i rozliczeniami, masz wszystko pod jednym palcem. Automatyczny system zajmie się powtarzalną nudą, a Ty odzyskasz czas dla rodziny.',
      icon: 'M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Zm0-14v6l4 2',
      theme: 'secondary',
      label: 'TWÓJ CZAS WOLNY',
    },
  ]);
}
