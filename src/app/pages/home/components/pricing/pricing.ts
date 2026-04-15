import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionHeader } from '../../../../shared/ui/section-header/section-header';
import { Button } from '../../../../shared/ui/button/button';

interface PricingFeature {
  name: string;
  included: boolean;
}

interface PricingPackage {
  name: string;
  tagline: string;
  price: string;
  priceSuffix: string;
  description: string;
  features: PricingFeature[];
  isPopular: boolean;
  ctaText: string;
  href: string;
  queryParams?: Record<string, string>;
}

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [CommonModule, SectionHeader, Button],
  templateUrl: './pricing.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Pricing {
  packages = signal<PricingPackage[]>([
    {
      name: 'Fundament',
      tagline: 'PORZĄDEK NA START',
      price: '7k - 9k',
      priceSuffix: 'zł netto',
      description:
        'Koniec z gubieniem kartek. Cyfrowa baza zleceń i powiadomienia SMS, które odciążą Twój telefon.',
      features: [
        { name: 'Pancerny CRM i Kolejka zleceń', included: true },
        { name: 'Automatyczne SMS-y do klienta', included: true },
        { name: 'Jakość Bankowa (Bezpieczeństwo)', included: true },
        { name: 'System na własność (Bez abonamentu)', included: true },
        { name: 'Moduł Kalendarza i Rezerwacji', included: false },
        { name: 'Automatyzacja powtarzalnych prac', included: false },
      ],
      isPopular: false,
      ctaText: 'Budujmy Fundament →',
      href: '/konsultacja',
      queryParams: { package: 'small' },
    },
    {
      name: 'Optymalny',
      tagline: 'BIZNES NA AUTOPILOCIE',
      price: '11k - 16k',
      priceSuffix: 'zł netto',
      description:
        'System, który pracuje za Ciebie. Odzyskasz 15h tygodniowo dzięki automatyzacji nudnych zadań.',
      features: [
        { name: 'Wszystko z pakietu Fundament', included: true },
        { name: 'Moduł Kalendarza i Rezerwacji', included: true },
        { name: 'Automatyzacja powtarzalnych prac', included: true },
        { name: 'Sprawdzenie, jak płynie praca', included: true },
        { name: 'Dedykowany portal dla klientów', included: false },
        { name: 'Automatyczne zamawianie części', included: false },
      ],
      isPopular: true,
      ctaText: 'Wybieram Pakiet Optymalny →',
      href: '/konsultacja',
      queryParams: { package: 'medium' },
    },
    {
      name: 'Dedykowany',
      tagline: 'PEŁNA SKALA & AI',
      price: 'od 17k',
      priceSuffix: 'zł netto',
      description:
        'Dla firm, które chcą dominować. Pełna integracja z dostawcami i asystenci AI wewnątrz Twojej firmy.',
      features: [
        { name: 'Wszystko z pakietu Optymalny', included: true },
        { name: 'Automatyczne zamawianie części', included: true },
        { name: 'Wdrożenie Asystentów AI', included: true },
        { name: 'Dedykowany portal kliencki', included: true },
        { name: 'System, który się nie zawiesza', included: true },
        { name: 'Gwarancja Szybkiej Pomocy', included: true },
      ],
      isPopular: false,
      ctaText: 'Budujmy System Dedykowany →',
      href: '/konsultacja',
      queryParams: { package: 'large' },
    },
  ]);
}
