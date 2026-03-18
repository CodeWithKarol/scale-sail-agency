import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionHeader } from '../../../../shared/ui/section-header/section-header';

@Component({
  selector: 'app-service-level-objectives',
  standalone: true,
  imports: [CommonModule, SectionHeader],
  templateUrl: './service-level-objectives.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceLevelObjectives {
  objectives = signal([
    {
      id: 'MOB-01',
      label: 'Dostęp z każdego miejsca',
      target: '100%',
      metric: 'Telefon / Tablet',
      description:
        'Aplikacja działa płynnie na każdym urządzeniu. Sprawdzasz status zlecenia pod autem lub u klienta.',
      status: 'active',
    },
    {
      id: 'SPD-02',
      label: 'Szybkość działania',
      target: '< 1s',
      metric: 'Czas ładowania',
      description: 'Żadnego czekania. Dane Twoich klientów i zleceń pojawiają się natychmiast.',
      status: 'active',
    },
    {
      id: 'SEC-03',
      label: 'Bezpieczeństwo danych',
      target: 'SSL/SZYFR',
      metric: 'Twoja Baza',
      description:
        'Twoja baza klientów jest bezpieczna i dostępna tylko dla Ciebie. Żadnych kartek, które mogą zginąć.',
      status: 'active',
    },
    {
      id: 'USE-04',
      label: 'Prostota obsługi',
      target: '0 min',
      metric: 'Szkolenie',
      description: 'Interfejs tak prosty, że nauka obsługi zajmuje tyle, co wysłanie SMS-a.',
      status: 'active',
    },
  ]);
}
