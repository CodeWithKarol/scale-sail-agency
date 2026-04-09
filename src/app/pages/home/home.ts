import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeoService } from '../../shared/core/seo/seo.service';
import { Hero } from './components/hero/hero';
import { ProblemSolution } from './components/problem-solution/problem-solution';
import { Process } from './components/process/process';
import { FounderStory } from './components/founder-story/founder-story';
import { Contact } from './components/contact/contact';
import { Faq } from './components/faq/faq';
import { Pricing } from './components/pricing/pricing';
import { FinalCta } from './components/final-cta/final-cta';
import { ImpactMetrics } from './components/impact-metrics/impact-metrics';
import { IdealClientProfile } from './components/ideal-client-profile/ideal-client-profile';
import { LogoCloud } from './components/logo-cloud/logo-cloud';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    Hero,
    ProblemSolution,
    Process,
    FounderStory,
    Pricing,
    Contact,
    Faq,
    FinalCta,
    ImpactMetrics,
    IdealClientProfile,
    LogoCloud,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home implements OnInit {
  private seoService = inject(SeoService);

  ngOnInit(): void {
    this.seoService.setPageMetadata({
      title: 'Zarządzanie zleceniami i automatyzacja SMS dla warsztatu',
      description:
        'Tworzę pancerne systemy zarządzania zleceniami i automatyzacje SMS dla warsztatów. Odzyskaj 15h tygodniowo bez abonamentu.',
      slug: '',
      type: 'website',

      keywords: [
        'zarządzanie zleceniami warsztatowymi',
        'automatyzacja sms dla warsztatu',
        'program dla warsztatu bez abonamentu',
        'elektroniczny zeszyt zleceń warsztat',
        'system do zarządzania kolejką aut',
        'aplikacja dla warsztatu samochodowego',
        'automatyzacja serwisu samochodowego',
        'system warsztatowy na własność',
        'wdrożenia n8n i Make',
        'cyfryzacja małej firmy usługowej',
        'program warsztatowy na własny serwer',
      ],
    });

    this.seoService.setLocalBusinessSchema({
      name: 'Scale Sail Agency',
      description:
        'Tworzę pancerne systemy zarządzania zleceniami i automatyzacje SMS dla warsztatów samochodowych. Odzyskaj 15h tygodniowo dzięki technologii na własność, bez abonamentu.',
      url: 'https://scale-sail.io',
      logo: 'https://scale-sail.io/images/scale-sail-logo.webp',
      founder: {
        name: 'Karol Modelski',
        jobTitle: 'Twórca rozwiązań cyfrowych & Założyciel',
      },
      areaServed: 'Poland',
      address: {
        streetAddress: 'Warszawa',
        addressLocality: 'Warszawa',
        postalCode: '00-001',
        addressCountry: 'PL',
      },
    });
  }
}
