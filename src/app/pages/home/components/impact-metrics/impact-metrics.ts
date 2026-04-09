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
        'Płacisz raz za wdrożenie. System staje się Twoim aktywem, a nie miesięcznym obciążeniem.',
    },
    {
      value: 'do 14 dni',
      label: 'START „CYFROWEGO SILNIKA”',
      description: 'Tyle zazwyczaj zajmuje nam wdrożenie najważniejszych funkcji dla Twojej firmy.',
    },
    {
      value: 'do 80%',
      label: 'MNIEJ TELEFONÓW OD KLIENTÓW',
      description:
        'Automatyczne SMS-y informują klienta o statusie naprawy, zanim on w ogóle pomyśli o telefonie.',
    },
    {
      value: '100%',
      label: 'TWOJA WŁASNOŚĆ (NIE WYNAJEM)',
      description:
        'System stawiamy na Twoich zasadach – masz do niego i swoich danych dostęp na zawsze.',
    },
  ]);
}
