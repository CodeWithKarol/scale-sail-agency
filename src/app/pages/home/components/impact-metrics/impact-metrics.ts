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
      value: 'BRAK',
      label: 'OBOWIĄZKOWEGO ABONAMENTU',
      description:
        'Brak obowiązkowych opłat miesięcznych. Płacisz raz za wdrożenie i masz spokój na lata.',
    },
    {
      value: 'do 14 dni',
      label: 'Uruchomienie pierwszej wersji',
      description: 'Tyle zazwyczaj zajmuje nam wdrożenie najważniejszych funkcji dla Twojej firmy.',
    },
    {
      value: 'do 80%',
      label: 'Mniej telefonów',
      description:
        'W warsztatach widzimy zwykle do 80% mniej telefonów „na kiedy moje auto?”, w innych firmach usługowych – mniej chaosu w grafiku i fakturach.',
    },
    {
      value: '100%',
      label: 'Twoja własność',
      description:
        'Nie uzależniasz się od platform. System stawiamy na Twoich zasadach – masz do niego dostęp na zawsze.',
    },
  ]);
}
