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
      'Enterprise dashboards often collapse under scale: "spaghetti code," slow real-time rendering, and brittle test suites that block delivery. Many organizations struggle with legacy Angular architectures that rely on heavy SharedModules, slow Change Detection cycles (Zone.js), and outdated state management patterns that make new feature development risky and slow. The goal was to define a production-grade reference architecture that stays fast and maintainable as data volume and feature complexity grow, specifically targeting common bottlenecks like large bundle sizes and slow initial render times.',
    solution:
      'I built a modern Angular application using Signals to keep state changes predictable and UI updates fine-grained. A Tailwind CSS 4 design system supports dense data layouts without UI bloat, and Vitest enables fast, reliable feedback loops so teams can ship with confidence. By shifting to a "Zoneless-ready" architecture and leveraging Standalone Components, we eliminated the need for complex module orchestration, resulting in a leaner, more performant codebase that is easier to onboard new developers onto.',
    technicalApproach:
      'The architecture follows a strictly typed, feature-based modular structure using Angular 21 Standalone Components. We employed a hybrid state management strategy: Angular Signals for synchronous, fine-grained UI state (like filters and toggles) to ensure instant feedback, and RxJS for complex asynchronous data orchestration (WebSockets and API streams).\n\nKey technical decisions included:\n\n1. **Signal-Based Reactivity:** Replaced traditional `async` pipe subscriptions with Signals for local state, reducing the change detection overhead significantly. This prepares the application for a complete Zoneless migration.\n2. **Vite & Vitest Integration:** Migrated the build system to Vite for sub-second HMR (Hot Module Replacement) and Vitest for unit testing. This reduced test suite execution time by over 60% compared to Karma/Jasmine.\n3. **Tree-Shakeable Design System:** Utilized Tailwind CSS 4 and Lucide icons to ensure that only used styles and assets are included in the final bundle, keeping the initial load under 150KB (gzipped).\n4. **Strict Boundary Enforcement:** Implemented strict linting rules and path aliases to prevent circular dependencies and ensure that "smart" container components remain decoupled from "dumb" presentational components.',
    results: [
      'Performance: Achieved 98/100 Lighthouse score & 60fps chart interactions',
      'Efficiency: Instant test execution via Vitest (vs legacy Karma setups)',
      'Quality: Zero-compromise strict typing and automated CI gates',
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
    title: 'QuickCart: High-Performance E-Commerce Architecture',
    tagline: 'Next-Gen Angular E-Commerce Architecture',
    heroImage: '/images/quick-cart/quick-cart.webp',
    challenge:
      'High-scale e-commerce platforms often suffer from "black box" legacy code, bloated UI dependencies, and fragile state sync that causes cart errors. Users on mobile devices frequently experience layout thrashing and slow interactions (high Interaction to Next Paint - INP) due to excessive JavaScript execution on the main thread. The goal was to demonstrate an approach that keeps Core Web Vitals strong and interactions smooth without heavy frameworks or unnecessary state complexity, proving that high performance is possible without sacrificing feature richness.',
    solution:
      'I engineered "QuickCart" using a clean-slate "Smart Shell" architecture. Angular Signals provide stable global state without the overhead of heavy state libraries in this scope, and a custom Tailwind design system eliminates layout thrashing for a consistently smooth user experience. This approach prioritizes the "User-Centric Performance Model," ensuring that every interaction feels instantaneous.',
    technicalApproach:
      'Demonstrating a "Zero-Boilerplate" philosophy, I utilized the "Smart Shell, Dumb Views" pattern with Standalone Components.\n\nKey Architectural Highlights:\n\n1. **Signal-Based Global State:** Implemented a lightweight, custom state manager using Angular Signals. This allows the Cart and User sessions to be synchronized across the application without the boilerplate of Redux or NgRx, reducing the bundle size by ~25KB.\n2. **Optimized Change Detection:** All components use `ChangeDetectionStrategy.OnPush`. By relying on Signals, the application acts reactively, only re-rendering the specific DOM nodes that change. This dramatically reduces Main Thread blocking time.\n3. **CLS (Cumulative Layout Shift) Prevention:** Explicitly sized image containers and skeleton loaders prevent content jumps during data fetching. This ensures a rock-solid visual experience, crucial for maintaining user trust in e-commerce contexts.\n4. **Accessible Mobile Navigation:** Built a custom, fully accessible mobile menu using CSS transforms instead of JavaScript animations where possible. This offloads work to the GPU, ensuring 60fps animations even on low-end Android devices.',
    results: [
      'Performance: FCP dropped from 2.4s to 0.8s (Instant Load)',
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
