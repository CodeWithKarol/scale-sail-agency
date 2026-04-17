import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeoService } from '../../shared/core/seo/seo.service';
import { Hero } from './components/hero/hero';
import { ProblemSolution } from './components/problem-solution/problem-solution';
import { Process } from './components/process/process';
import { FounderStory } from './components/founder-story/founder-story';
import { Contact } from './components/contact/contact';
import { Faq } from './components/faq/faq';
import { FinalCta } from './components/final-cta/final-cta';
import { ImpactMetrics } from './components/impact-metrics/impact-metrics';
import { LogoCloud } from './components/logo-cloud/logo-cloud';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    Hero,
    ProblemSolution,
    Process,
    FounderStory,
    Contact,
    Faq,
    FinalCta,
    ImpactMetrics,
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
      title: 'Program dla warsztatu bez abonamentu',
      description:
        'Automatyzacja warsztatu samochodowego bez miesięcznej subskrypcji. System zleceń, SMS-y do klientów i generator wycen wdrażane pod Twoją firmę.',
      slug: '',
      type: 'website',

      keywords: [
        'program do warsztatu bez abonamentu',
        'system do zleceń dla warsztatu bez subskrypcji',
        'automatyzacja warsztatu samochodowego',
        'program do warsztatu jednorazowa opłata',
        'system zarządzania zleceniami warsztat',
        'automatyczne powiadomienia SMS warsztat',
        'elektroniczny zeszyt zleceń warsztat',
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
        streetAddress: 'ul. Mieczysława Karłowicza 1 lok. 40',
        addressLocality: 'Jelenia Góra',
        postalCode: '58-506',
        addressCountry: 'PL',
      },
    });
  }
}
