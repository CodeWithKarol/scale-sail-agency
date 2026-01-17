import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

interface CaseStudy {
  tag: string;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
}

@Component({
  selector: 'app-case-studies',
  standalone: true,
  imports: [],
  templateUrl: './case-studies.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CaseStudiesComponent {
  caseStudies = signal<CaseStudy[]>([
    {
      tag: 'High-Performance Real-Time Analytics',
      title: 'Modern Enterprise Admin Dashboard',
      description:
        'Real-time analytics collapsing under scale fixed with Angular Signals and Tailwind CSS 4.',
      imageUrl: 'images/www.admin-panel.scale-sail.io_dashboard.webp',
      link: 'https://www.karol-modelski.scale-sail.io/portfolio',
    },
    {
      tag: 'Next-Gen Angular E-Commerce Architecture',
      title: 'QuickCart E-Commerce',
      description:
        '"Smart Shell" architecture with Signals handling complex cart state without bloat.',
      imageUrl: 'images/www.quick-cart.scale-sail.io_.webp',
      link: 'https://www.karol-modelski.scale-sail.io/portfolio',
    },
  ]);
}
