import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
  },
  {
    path: 'realizacje',
    loadComponent: () => import('./pages/work/work-page').then((m) => m.WorkPage),
    title: 'Systemy | Scale Sail Agency',
  },
  {
    path: 'realizacje/:id',
    loadComponent: () => import('./pages/work/case-study/case-study').then((m) => m.CaseStudyPage),
  },
  {
    path: 'blog',
    loadComponent: () => import('./pages/blog/blog-list-page').then((m) => m.BlogListPage),
    title: 'Wiedza | Scale Sail Agency',
  },
  {
    path: 'blog/:slug',
    loadComponent: () => import('./pages/blog/blog-post-page').then((m) => m.BlogPostPage),
  },
  {
    path: 'o-mnie',
    loadComponent: () => import('./pages/about/about').then((m) => m.About),
  },
  {
    path: 'cennik',
    loadComponent: () => import('./pages/pricing/pricing-page').then((m) => m.PricingPage),
    title: 'Cennik | Scale Sail Agency',
  },
  {
    path: 'konsultacja',
    loadComponent: () =>
      import('./pages/consultation/consultation-page').then((m) => m.ConsultationPage),
    title: 'Konsultacja | Scale Sail Agency',
  },
  {
    path: 'narzedzia',
    loadComponent: () => import('./pages/tools/tools-page').then((m) => m.ToolsPage),
    title: 'Narzędzia | Scale Sail Agency',
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
