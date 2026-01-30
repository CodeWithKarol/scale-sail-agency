import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { SectionHeader } from '../../../../shared/ui/section-header/section-header';
import { Card } from '../../../../shared/ui/card/card';
import { Button } from '../../../../shared/ui/button/button';
import { Badge } from '../../../../shared/ui/badge/badge';

interface CaseStudy {
  tag: string;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
}

@Component({
  selector: 'app-case-studies',
  imports: [NgOptimizedImage, SectionHeader, Card, Button, Badge],
  templateUrl: './case-studies.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CaseStudies {
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
