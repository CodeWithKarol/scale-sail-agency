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
      'Enterprise dashboards often collapse under scale: "spaghetti code," slow real-time rendering, and brittle test suites that block delivery. The goal was to define a production-grade reference architecture that stays fast and maintainable as data volume and feature complexity grow.',
    solution:
      'I built a modern Angular application using Signals to keep state changes predictable and UI updates fine-grained. A Tailwind CSS 4 design system supports dense data layouts without UI bloat, and Vitest enables fast, reliable feedback loops so teams can ship with confidence.',
    technicalApproach:
      'The architecture follows a strictly typed, feature-based modular structure using Angular 21 Standalone Components. We employed a hybrid state management strategy: Angular Signals for synchronous, fine-grained UI state (like filters and toggles) to ensure instant feedback, and RxJS for complex asynchronous data orchestration (WebSockets and API streams). This "Zoneless-ready" approach allows for sub-second updates without triggering global change detection cycles. Testing is handled exclusively via Vitest in JSDOM, providing instant feedback loops.',
    results: [
      'Performance: Achieved 98/100 Lighthouse score & 60fps chart interactions',
      'Efficiency: Instant test execution via Vitest (vs legacy Karma setups)',
      'Quality: Zero-compromise strict typing and automated CI gates',
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
    title: 'QuickCart: High-Performance E-Commerce Architecture',
    tagline: 'Next-Gen Angular E-Commerce Architecture',
    heroImage: '/images/quick-cart/quick-cart.webp',
    challenge:
      'High-scale e-commerce platforms often suffer from "black box" legacy code, bloated UI dependencies, and fragile state sync that causes cart errors. The goal was to demonstrate an approach that keeps Core Web Vitals strong and interactions smooth without heavy frameworks or unnecessary state complexity.',
    solution:
      'I engineered "QuickCart" using a clean-slate "Smart Shell" architecture. Angular Signals provide stable global state without the overhead of heavy state libraries in this scope, and a custom Tailwind design system eliminates layout thrashing for a consistently smooth user experience.',
    technicalApproach:
      'Demonstrating a "Zero-Boilerplate" philosophy, I utilized the "Smart Shell, Dumb Views" pattern with Standalone Components. The core innovation is the Signal-based reactivity system that syncs cart state globally without RxJS subscription overhead, combined with explicitly configured OnPush change detection that puts the rendering engine to "sleep" until specific updates occur. I also implemented a custom "Backdrop" mobile menu using purely CSS transitions and ARIA roles for accessibility, ensuring a 60fps experience on low-end devices.',
    results: [
      'Performance: FCP dropped from 2.4s to 0.8s (Instant Load)',
      'Efficiency: Removed 150kb of unused JS via Tree-Shaking',
      'Stability: Zero "jank" during complex mobile menu interactions',
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
