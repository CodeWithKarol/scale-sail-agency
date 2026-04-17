import { Component, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeoService } from '../../shared/core/seo/seo.service';
import { BreadcrumbComponent } from '../../shared/ui/breadcrumb/breadcrumb';
import { SectionHeader } from '../../shared/ui/section-header/section-header';
import { Pricing } from '../home/components/pricing/pricing';
import { PriceComparison } from '../home/components/price-comparison/price-comparison';
import { FinalCta } from '../home/components/final-cta/final-cta';

@Component({
  selector: 'app-pricing-page',
  standalone: true,
  imports: [CommonModule, BreadcrumbComponent, SectionHeader, Pricing, PriceComparison, FinalCta],
  template: `
    <div class="min-h-screen bg-neutral relative pt-40 pb-24 overflow-hidden bg-grid-workshop">
      <div class="layout-container relative z-10">
        <app-breadcrumb />

        <div class="animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <app-section-header
            [level]="1"
            subtitle="JASNE ZASADY, ZERO ABONAMENTU"
            title="Program dla warsztatu na własność – płacisz raz, zarządzasz zawsze"
            description="Wybierz pancerny system zarządzania zleceniami warsztatowymi skrojony pod Twoją skalę. Zyskaj aktywo, które realnie odciąża firmę, zamiast opłacać comiesięczny podatek od sukcesu."
          />
        </div>

        <app-pricing [isStandalone]="true" />

        <div class="py-24 sm:py-32">
          <app-price-comparison [isStandalone]="true" />
        </div>
      </div>
      <app-final-cta />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PricingPage implements OnInit {
  private seoService = inject(SeoService);

  ngOnInit() {
    this.seoService.setPageMetadata({
      title: 'Program dla warsztatu bez abonamentu – Cennik',
      description:
        'Sprawdź ile kosztuje program do warsztatu z jednorazową opłatą. Automatyzacja warsztatu samochodowego i system zarządzania zleceniami na własność.',
      slug: 'cennik',
    });

    this.seoService.setBreadcrumbs([
      { name: 'Start', path: '/' },
      { name: 'Cennik', path: '/cennik' },
    ]);
  }
}
