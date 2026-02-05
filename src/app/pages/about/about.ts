import { Component, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeoService } from '../../shared/core/seo/seo.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class About implements OnInit {
  private seoService = inject(SeoService);

  ngOnInit() {
    this.seoService.setPageMetadata({
      title: 'About Karol Modelski | Senior Angular Consultant',
      description:
        'Senior Angular Consultant & Founder of Scale Sail. Specializing in Angular 21 modernization, NgRx architecture, and high-performance engineering.',
      slug: 'about',
      type: 'profile',
    });
  }

  techStack = [
    { category: 'Core', items: ['Angular 21', 'TypeScript', 'RxJS', 'Nx'] },
    { category: 'State', items: ['NgRx', 'Signals', 'Store', 'Component Store'] },
    { category: 'Performance', items: ['SSR / SSG', 'Incremental Hydration', 'Zoneless'] },
    { category: 'Testing', items: ['Jest', 'Cypress', 'Vitest'] },
  ];

  experience = [
    {
      role: 'Senior Frontend Developer',
      company: 'GFT Technologies (Citi)',
      period: 'Mar 2025 - Present',
      desc: 'Leading architecture for mission-critical trading platforms. Enforcing 100% test coverage policies while migrating legacy micro-frontends to a coherent Nx monorepo. Balancing enterprise compliance with developer velocity.',
    },
    {
      role: 'Frontend Developer',
      company: 'Silent Eight',
      period: 'Dec 2023 - Feb 2025',
      desc: 'AI Compliance SaaS. Led the frontend modernization initiative (Angular 14 → 19) and introduced "Zoneless" architecture for 50% performance gains. Worked directly with Product Owners to accelerate feature delivery.',
    },
    {
      role: 'Software Developer',
      company: 'BNP Paribas',
      period: 'Nov 2021 - Nov 2023',
      desc: 'GOonline Platform. Delivered features for 1M+ active users. Managed the complex migration of core banking modules from AngularJS, ensuring zero downtime during high-traffic windows.',
    },
    {
      role: 'Junior Frontend Developer',
      company: 'Amway',
      period: 'Apr 2019 - Oct 2021',
      desc: 'Global E-commerce. Built high-traffic dashboards for business owners. Optimized data visualization components handling millions of records.',
    },
  ];
}
