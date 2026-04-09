import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
  },
  {
    path: 'work',
    loadComponent: () => import('./pages/work/work-page').then((m) => m.WorkPage),
    title: 'Architecture | Scale Sail Agency',
  },
  {
    path: 'work/:id',
    loadComponent: () => import('./pages/work/case-study/case-study').then((m) => m.CaseStudyPage),
  },
  {
    path: 'blog',
    loadComponent: () => import('./pages/blog/blog-list-page').then((m) => m.BlogListPage),
    title: 'Blog | Scale Sail Agency',
  },
  {
    path: 'blog/:slug',
    loadComponent: () => import('./pages/blog/blog-post-page').then((m) => m.BlogPostPage),
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about').then((m) => m.About),
  },
  {
    path: 'consultation',
    loadComponent: () =>
      import('./pages/consultation/consultation-page').then((m) => m.ConsultationPage),
    title: 'Konsultacja | Scale Sail Agency',
  },
  {
    path: 'tools',
    loadComponent: () => import('./pages/tools/tools-page').then((m) => m.ToolsPage),
    title: 'Narzędzia | Scale Sail Agency',
  },
  {
    path: 'tools/free-quote-generator',
    loadComponent: () =>
      import('./pages/tools/quote-generator/quote-generator').then((m) => m.QuoteGenerator),
    title: 'Darmowy Generator Wycen (PDF) | Scale Sail',
  },
  {
    path: 'tools/loss-calculator',
    loadComponent: () =>
      import('./pages/tools/loss-calculator/loss-calculator').then((m) => m.LossCalculator),
    title: 'Kalkulator Strat Warsztatu | Scale Sail',
  },
  {
    path: 'privacy-policy',
    loadComponent: () =>
      import('./pages/privacy-policy/privacy-policy').then((m) => m.PrivacyPolicy),
    title: 'Polityka Prywatności | Scale Sail Agency',
  },
  {
    path: 'free-quote-generator',
    redirectTo: 'tools/free-quote-generator',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
