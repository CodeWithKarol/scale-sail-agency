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
      value: '2-3h',
      suffix: 'dziennie',
      label: 'ODZYSKANEGO CZASU',
      description:
        'Tyle średnio zyskuje właściciel warsztatu po automatyzacji powiadomień SMS i wycen (dane Scale Sail 2025).',
    },
    {
      value: 'do 80%',
      label: 'MNIEJ TELEFONÓW',
      description:
        'Według analizy procesów, automatyczne statusy redukują pytania „czy gotowe” o 4/5 (źródło: badania wewnętrzne).',
    },
    {
      value: '0 zł',
      label: 'KOSZTÓW ABONAMENTU',
      description:
        'W przeciwieństwie do systemów SaaS, eliminujesz stały koszt wynoszący średnio 3000-5000 zł rocznie.',
    },
    {
      value: '100%',
      label: 'WŁASNOŚĆ SYSTEMU',
      description:
        'Zgodnie ze standardem „Private Engine”, system i wszystkie dane klientów należą wyłącznie do Ciebie.',
    },
  ]);
}
