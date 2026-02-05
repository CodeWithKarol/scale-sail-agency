import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
  },
  {
    // Programmatic SEO Route: Industry Pages
    // Matches /industry/fintech, /industry/healthcare, etc.
    path: 'industry/:slug',
    loadComponent: () =>
      import('./pages/programmatic/industry/industry-template').then((m) => m.IndustryTemplate),
  },
  {
    path: 'work',
    loadComponent: () => import('./pages/work/work-page').then((m) => m.WorkPage),
    title: 'Work | Scale Sail Agency',
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
    path: 'shop',
    loadComponent: () => import('./pages/shop/shop-page').then((m) => m.ShopPage),
    title: 'Shop | Scale Sail Agency',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
