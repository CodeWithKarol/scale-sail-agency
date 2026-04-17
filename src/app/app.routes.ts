import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
  },
  {
    path: 'system-dla-warsztatu',
    loadComponent: () => import('./pages/work/work-page').then((m) => m.WorkPage),
    title: 'System dla warsztatu – Realizacje',
  },
  {
    path: 'system-dla-warsztatu/:id',
    loadComponent: () => import('./pages/work/case-study/case-study').then((m) => m.CaseStudyPage),
  },
  {
    path: 'wiedza-dla-warsztatu',
    loadComponent: () => import('./pages/blog/blog-list-page').then((m) => m.BlogListPage),
    title: 'Wiedza dla warsztatu – Artykuły',
  },
  {
    path: 'wiedza-dla-warsztatu/:slug',
    loadComponent: () => import('./pages/blog/blog-post-page').then((m) => m.BlogPostPage),
  },
  {
    path: 'o-mnie',
    loadComponent: () => import('./pages/about/about').then((m) => m.About),
    title: 'O mnie – Karol Modelski',
  },
  {
    path: 'program-dla-warsztatu-bez-abonamentu',
    loadComponent: () => import('./pages/pricing/pricing-page').then((m) => m.PricingPage),
    title: 'Program dla warsztatu bez abonamentu – Cennik',
  },
  {
    path: 'automatyzacja-warsztatu-narzedzia',
    loadComponent: () => import('./pages/tools/tools-page').then((m) => m.ToolsPage),
    title: 'Automatyzacja warsztatu – Darmowe narzędzia',
  },
  {
    path: 'konsultacja',
    loadComponent: () =>
      import('./pages/consultation/consultation-page').then((m) => m.ConsultationPage),
    title: 'Bezpłatna Konsultacja | Scale Sail Agency',
  },
  {
    path: 'narzedzia/generator-wycen-pdf',
    loadComponent: () =>
      import('./pages/tools/quote-generator/quote-generator').then((m) => m.QuoteGenerator),
    title: 'Darmowy Generator Wycen (PDF) | Scale Sail',
  },
  {
    path: 'narzedzia/kalkulator-strat',
    loadComponent: () =>
      import('./pages/tools/loss-calculator/loss-calculator').then((m) => m.LossCalculator),
    title: 'Kalkulator Strat Warsztatu | Scale Sail',
  },
  {
    path: 'polityka-prywatnosci',
    loadComponent: () =>
      import('./pages/privacy-policy/privacy-policy').then((m) => m.PrivacyPolicy),
    title: 'Polityka Prywatności | Scale Sail Agency',
  },
  // SEO Redirects
  {
    path: 'realizacje',
    redirectTo: 'system-dla-warsztatu',
    pathMatch: 'full',
  },
  {
    path: 'realizacje/:id',
    redirectTo: 'system-dla-warsztatu/:id',
    pathMatch: 'full',
  },
  {
    path: 'cennik',
    redirectTo: 'program-dla-warsztatu-bez-abonamentu',
    pathMatch: 'full',
  },
  {
    path: 'narzedzia',
    redirectTo: 'automatyzacja-warsztatu-narzedzia',
    pathMatch: 'full',
  },
  {
    path: 'blog',
    redirectTo: 'wiedza-dla-warsztatu',
    pathMatch: 'full',
  },
  {
    path: 'blog/:slug',
    redirectTo: 'wiedza-dla-warsztatu/:slug',
    pathMatch: 'full',
  },
  {
    path: 'free-quote-generator',
    redirectTo: 'narzedzia/generator-wycen-pdf',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
