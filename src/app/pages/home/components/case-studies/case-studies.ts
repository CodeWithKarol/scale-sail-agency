import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { SectionHeaderComponent } from '../../../../shared/ui/section-header/section-header';

interface CaseStudy {
  tag: string;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
}

@Component({
  selector: 'app-case-studies',
  imports: [NgOptimizedImage, SectionHeaderComponent],
  templateUrl: './case-studies.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CaseStudiesComponent {
  caseStudies = signal<CaseStudy[]>([
    {
      tag: 'High-Performance Real-Time Analytics',
      title: 'Modern Enterprise Admin Dashboard',
      description:
        'Real-time analytics collapsing under scale fixed with Angular Signals and Tailwind CSS 4.',
      imageUrl: 'images/admin-panel.webp',
      link: 'https://www.karol-modelski.scale-sail.io/work/modern-enterprise-admin-dashboard',
    },
    {
      tag: 'Next-Gen Angular E-Commerce Architecture',
      title: 'QuickCart E-Commerce',
      description:
        '"Smart Shell" architecture with Signals handling complex cart state without bloat.',
      imageUrl: 'images/quick-cart.webp',
      link: 'https://www.karol-modelski.scale-sail.io/quickcart-ecommerce',
    },
  ]);
}
