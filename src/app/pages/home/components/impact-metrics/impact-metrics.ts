import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card } from '../../../../shared/ui/card/card';
import { SectionHeader } from '../../../../shared/ui/section-header/section-header';

interface Metric {
  value: string;
  suffix?: string;
  label: string;
  description: string;
}

@Component({
  selector: 'app-impact-metrics',
  standalone: true,
  imports: [CommonModule, Card, SectionHeader],
  templateUrl: './impact-metrics.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImpactMetrics {
  protected readonly metrics = signal<Metric[]>([
    {
      value: '0 zł',
      label: 'Konsultacja',
      description: 'Pierwsza rozmowa (15 min) jest zawsze bezpłatna. Sprawdzimy, czy możemy Ci pomóc.',
    },
    {
      value: 'do 14 dni',
      label: 'Pierwsza wersja',
      description: 'Tyle zazwyczaj zajmuje nam uruchomienie najważniejszych funkcji dla Twojej firmy.',
    },
    {
      value: 'do 80%',
      label: 'Mniej telefonów',
      description: 'O tyle może spaść liczba pytań od klientów "na kiedy?" po wdrożeniu systemu.',
    },
    {
      value: '100%',
      label: 'Wszystko w jednym miejscu',
      description: 'Wszystkie zlecenia i dane klientów bezpiecznie w Twoim telefonie.',
    },
  ]);
}
