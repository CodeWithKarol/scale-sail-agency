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
      label: 'Abonamentu',
      description: 'Płacisz raz za wdrożenie. Nie musisz co miesiąc płacić "haraczu" za dostęp do własnych danych.',
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
      label: 'Twoja własność',
      description: 'System i baza danych należą do Ciebie. Masz do nich dostęp zawsze, bez żadnych opłat miesięcznych.',
    },
  ]);
}
