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
    path: '**',
    redirectTo: '',
  },
];
