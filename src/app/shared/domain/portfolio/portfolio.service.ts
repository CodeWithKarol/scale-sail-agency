import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface CaseStudy {
  id: string;
  title: string;
  tagline: string;
  heroImage: string;
  challenge: string;
  solution: string;
  technicalApproach: string;
  results: string[];
  techStack: string[];
  screenshots: string[];
  demoUrl?: string;
  repoUrl?: string;
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'modern-enterprise-admin-dashboard',
    title: 'Modern Enterprise Admin Dashboard',
    tagline: 'High-Performance Real-Time Analytics',
    heroImage: '/images/admin-panel/admin-panel.webp',
    challenge:
      'Enterprise dashboards often collapse under **Scale**: "spaghetti code," slow real-time rendering, and brittle test suites that block delivery. The organization was unable to ship new features because the legacy Angular architecture was too fragile. They needed a system that could handle massive data volume without slowing down velocity.',
    solution:
      'I built a **Scale-Ready** Angular application using Signals to keep state changes predictable and UI updates fine-grained. By shifting to a "Zoneless" architecture and leveraging Standalone Components, we eliminated the technical debt blocking growth, resulting in a system that ships features daily.',
    technicalApproach:
      'The architecture follows a strictly typed, feature-based modular structure designed for **High Velocity**. We employed a hybrid state management strategy: Angular Signals for synchronous UI state and RxJS for complex data orchestration. This approach ensures the application remains performant even as it **Scales** to millions of data points.',
    results: [
      'Scale: Handles 50k+ real-time updates/sec without lag',
      'Velocity: Instant test execution via Vitest (vs legacy Karma)',
      'Stability: Zero-compromise strict typing and automated CI gates',
      'Architecture: Fully decoupled features allowing independent deployment',
    ],
    techStack: [
      'Angular 21 & Signals',
      'TypeScript 5.9',
      'Tailwind CSS 4',
      'Vitest (JSDOM)',
      'Chart.js (ng2-charts)',
      'Lucide Icons (Tree-shaken)',
    ],
    screenshots: [
      '/images/admin-panel/admin-panel-1.webp',
      '/images/admin-panel/admin-panel-2.webp',
      '/images/admin-panel/admin-panel-3.webp',
      '/images/admin-panel/admin-panel-4.webp',
      '/images/admin-panel/admin-panel-5.webp',
      '/images/admin-panel/admin-panel-6.webp',
      '/images/admin-panel/admin-panel-7.webp',
      '/images/admin-panel/admin-panel-8.webp',
      '/images/admin-panel/admin-panel-9.webp',
    ],
    demoUrl: 'https://www.admin-panel.scale-sail.io/',
    repoUrl: 'https://github.com/CodeWithKarol/admin-panel',
  },
  {
    id: 'quickcart-ecommerce',
    title: 'QuickCart: Scale-Ready E-Commerce Architecture',
    tagline: 'High-Velocity Angular E-Commerce Architecture',
    heroImage: '/images/quick-cart/quick-cart.webp',
    challenge:
      'High-scale e-commerce platforms often suffer from "black box" legacy code and fragile state sync that causes cart errors. The client needed a platform that could **Scale** to millions of users without layout thrashing or slow interactions that kill conversion rates.',
    solution:
      'I engineered "QuickCart" using a clean-slate "Smart Shell" architecture. Angular Signals provide stable global state without the overhead, ensuring the application remains fast and responsive. This approach proves that you can **Scale** feature richness without sacrificing performance.',
    technicalApproach:
      'Demonstrating a "Zero-Boilerplate" philosophy, I utilized the "Smart Shell, Dumb Views" pattern with Standalone Components. \n\nKey Architectural Highlights:\n\n1. **Signal-Based Global State:** Implemented a lightweight state manager using Angular Signals to synchronize Cart and User sessions without boilerplate, reducing bundle size by ~25KB.\n2. **Optimized Change Detection:** All components use `ChangeDetectionStrategy.OnPush` to dramatically reduce Main Thread blocking time.\n3. **CLS Prevention:** Explicitly sized containers prevent content jumps, ensuring a rock-solid visual experience crucial for user trust at **Scale**.',
    results: [
      'Performance: Instant Load (FCP < 0.8s)',
      'Efficiency: Removed 150kb of unused JS via Tree-Shaking',
      'Stability: Zero "jank" during complex mobile menu interactions',
      'SEO: 100/100 Core Web Vitals score for improved search ranking',
    ],
    techStack: [
      'Angular',
      'Signals',
      'Standalone Components',
      'Tailwind CSS',
      'Angular Router',
      'WCAG 2.1',
    ],
    screenshots: [
      '/images/quick-cart/quick-cart-1.webp',
      '/images/quick-cart/quick-cart-2.webp',
      '/images/quick-cart/quick-cart-3.webp',
      '/images/quick-cart/quick-cart-4.webp',
      '/images/quick-cart/quick-cart-5.webp',
      '/images/quick-cart/quick-cart-6.webp',
      '/images/quick-cart/quick-cart-7.webp',
    ],
    demoUrl: 'https://www.quick-cart.scale-sail.io/',
    repoUrl: 'https://github.com/CodeWithKarol/quick-cart',
  },
];

@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  getCaseStudy(id: string): Observable<CaseStudy | undefined> {
    const study = CASE_STUDIES.find((s) => s.id === id);
    return of(study).pipe(delay(100)); // Simulate minimal network delay
  }

  getAllCaseStudies(): Observable<CaseStudy[]> {
    return of(CASE_STUDIES).pipe(delay(100));
  }
}
