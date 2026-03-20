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
      name: 'Small',
      tagline: 'Prosty Start',
      price: '7k - 9k',
      priceSuffix: 'zł netto',
      description: 'Idealne dla firm potrzebujących po prostu wyjść z ery kartek i Excela.',
      features: [
        { name: 'Kolejka zleceń / Prosty CRM', included: true },
        { name: 'Automatyczne SMS-y do klienta', included: true },
        { name: 'Hosting na własnym serwerze', included: true },
        { name: 'Brak abonamentu za system', included: true },
        { name: 'Moduł Kalendarza i Rezerwacji', included: false },
        { name: 'Automatyzacje n8n/Make', included: false },
      ],
      isPopular: false,
      ctaText: 'Wybieram Small →',
      href: '/consultation',
      queryParams: { package: 'small' },
    },
    {
      name: 'Medium',
      tagline: 'Najczęściej wybierany',
      price: '11k - 16k',
      priceSuffix: 'zł netto',
      description: 'Twój Biznes na autopilocie: 0 zgubionych zleceń, oszczędność 10h w tygodniu.',
      features: [
        { name: 'Wszystko z pakietu Small', included: true },
        { name: 'Moduł Kalendarza i Rezerwacji', included: true },
        { name: 'Generowanie raportów i umów PDF', included: true },
        { name: 'Automatyzacje n8n / Make / Zapier', included: true },
        { name: 'Dedykowany portal dla klientów', included: false },
        { name: 'Wdrożenie sztucznej inteligencji', included: false },
      ],
      isPopular: true,
      ctaText: 'Wybieram Medium →',
      href: '/consultation',
      queryParams: { package: 'medium' },
    },
    {
      name: 'Large',
      tagline: 'Skala & Automatyzacja',
      price: 'od 17k',
      priceSuffix: 'zł netto',
      description: 'Dla rozwijających się firm potrzebujących integracji i asystentów AI.',
      features: [
        { name: 'Wszystko z pakietu Medium', included: true },
        { name: 'Dedykowany portal kliencki', included: true },
        { name: 'Integracje API z hurtowniami / ERP', included: true },
        { name: 'Wdrożenie Asystentów AI', included: true },
        { name: 'Zaawansowana logika analityczna', included: true },
        { name: 'Priorytetowe wsparcie SLA', included: true },
      ],
      isPopular: false,
      ctaText: 'Wybieram Large →',
      href: '/consultation',
      queryParams: { package: 'large' },
    },
  ]);
}
