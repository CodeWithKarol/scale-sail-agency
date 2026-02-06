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
    path: 'about',
    loadComponent: () => import('./pages/about/about').then((m) => m.About),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
