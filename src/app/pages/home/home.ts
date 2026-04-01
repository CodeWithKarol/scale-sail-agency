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
      title: 'Proste aplikacje dla warsztatów samochodowych i małych firm | Scale Sail',
      description:
        'Tworzę aplikacje do zarządzania zleceniami dla warsztatów samochodowych i małych firm usługowych. Wdrażam automatyzacje (Make, n8n) i integracje AI. Uwolnij się od papierologii i Excela.',
      slug: '',
      type: 'website',
      keywords: [
        'program dla warsztatu bez abonamentu',
        'aplikacja dla warsztatu samochodowego',
        'zarządzanie zleceniami warsztatowymi',
        'automatyzacja serwisu samochodowego',
        'system warsztatowy na własność',
        'elektroniczna książka napraw',
        'wdrożenia n8n i Make',
        'automatyczne powiadomienia sms dla warsztatu',
        'cyfryzacja małej firmy usługowej',
        'program do fakturowania napraw',
        'kalkulator marży części',
      ],
    });

    this.seoService.setLocalBusinessSchema({
      name: 'Scale Sail Agency',
      description:
        'Tworzę aplikacje do zarządzania zleceniami dla warsztatów samochodowych i małych firm usługowych. Wdrażam automatyzacje (Make, n8n) i integracje AI. Uwolnij się od papierologii i Excela.',
      url: 'https://scale-sail.io',
      logo: 'https://scale-sail.io/images/scale-sail-logo.webp',
      founder: {
        name: 'Karol Modelski',
        jobTitle: 'Twórca rozwiązań cyfrowych & Założyciel',
      },
      areaServed: 'Poland',
    });
  }
}
