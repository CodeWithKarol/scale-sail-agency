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
import { IdealClientProfile } from './components/ideal-client-profile/ideal-client-profile';

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
    IdealClientProfile,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home implements OnInit {
  private seoService = inject(SeoService);

  ngOnInit(): void {
    this.seoService.setPageMetadata({
      title: 'Proste aplikacje dla warsztatów i firm usługowych | Scale Sail',
      description:
        'Pomagam małym firmom wyjść z ery kartek i Excela. Tworzę proste systemy do zarządzania zleceniami i automatyzacji kontaktu z klientem.',
      slug: '',
      type: 'website',
      keywords: [
        'aplikacja dla warsztatu',
        'program dla warsztatu samochodowego',
        'zarządzanie zleceniami',
        'automatyzacja firmy usługowej',
        'system dla serwisu',
        'cyfryzacja małej firmy',
        'powiadomienia sms dla klientów',
      ],
    });

    this.seoService.setLocalBusinessSchema({
      name: 'Scale Sail Agency',
      description:
        'Pomagam małym firmom usługowym i warsztatom w cyfrowej transformacji i automatyzacji pracy.',
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
