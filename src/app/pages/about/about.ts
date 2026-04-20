import { Component, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { SeoService } from '../../shared/core/seo/seo.service';
import { BreadcrumbComponent } from '../../shared/ui/breadcrumb/breadcrumb';
import { Button } from '../../shared/ui/button/button';

import { SectionHeader } from '../../shared/ui/section-header/section-header';
import { Card } from '../../shared/ui/card/card';
import { LucideAngularModule, Check, X } from 'lucide-angular';
import { PRINCIPLES, EXPERIENCE, IDEAL_CLIENTS, ANTI_PATTERNS } from './about.data';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    CommonModule,
    BreadcrumbComponent,
    Button,
    SectionHeader,
    Card,
    LucideAngularModule,
    NgOptimizedImage,
  ],
  templateUrl: './about.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class About implements OnInit {
  private seoService = inject(SeoService);

  readonly principles = PRINCIPLES;
  readonly experience = EXPERIENCE;
  readonly idealClients = IDEAL_CLIENTS;
  readonly antiPatterns = ANTI_PATTERNS;
  readonly icons = { Check, X };

  ngOnInit() {
    this.seoService.setPageMetadata({
      title: 'Karol Modelski – Ekspert Automatyzacji Warsztatów',
      description:
        'Dowiedz się, jak cyfryzować warsztat samochodowy i zmniejszyć liczbę telefonów dzięki automatyzacji n8n. Buduję dedykowane systemy zarządzania zleceniami.',
      slug: 'o-mnie',
      type: 'profile',
      keywords: [
        'Karol Modelski',
        'ekspert automatyzacji procesów',
        'wdrożenia n8n warszawa',
        'programista systemów dla firm',
        'automatyzacja małej firmy',
        'konsultacje IT dla usług',
        'systemy dedykowane dla warsztatów',
        'Scale Sail założyciel',
      ],
    });

    this.seoService.setBreadcrumbs([
      { name: 'Start', path: '/' },
      { name: 'O mnie', path: '/o-mnie' },
    ]);

    // Enhanced ProfilePage Schema
    this.seoService.setSchema(
      {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'ProfilePage',
            '@id': 'https://scale-sail.io/o-mnie/#webpage',
            url: 'https://scale-sail.io/o-mnie',
            name: 'O mnie | Karol Modelski — Scale Sail',
            isPartOf: { '@id': 'https://scale-sail.io/#website' },
            mainEntity: { '@id': 'https://scale-sail.io/#person' },
            description:
              'Poznaj twórcę Scale Sail i dowiedz się, jak łączę doświadczenie z największych projektów IT z automatyzacją (n8n, Make, Zapier) i integracjami AI, by pomagać firmom.',
          },
          {
            '@type': 'Person',
            '@id': 'https://scale-sail.io/#person',
            name: 'Karol Modelski',
            url: 'https://scale-sail.io/o-mnie',
            jobTitle: 'Twórca rozwiązań cyfrowych & Założyciel Scale Sail',
            image: {
              '@type': 'ImageObject',
              url: 'https://scale-sail.io/images/karol-modelski.webp',
            },
            sameAs: [
              'https://karol-modelski.medium.com/',
              'https://github.com/CodeWithKarol',
              'https://www.linkedin.com/in/karol-modelski',
            ],
            worksFor: {
              '@type': 'ProfessionalService',
              '@id': 'https://scale-sail.io/#organization',
              name: 'Scale Sail',
              url: 'https://scale-sail.io',
              telephone: '+48000000000',
              priceRange: '$$',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'ul. Mieczysława Karłowicza 1 lok. 40',
                addressLocality: 'Jelenia Góra',
                postalCode: '58-506',
                addressCountry: 'PL',
              },
              logo: {
                '@type': 'ImageObject',
                url: 'https://scale-sail.io/images/scale-sail-logo.webp',
              },
            },
          },
        ],
      },
      'json-ld-schema',
    );
  }
}
