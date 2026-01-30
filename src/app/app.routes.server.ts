import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'industry/:slug',
    renderMode: RenderMode.Server, // Use SSR for potentially unlimited programmatic pages
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender, // Prerender static pages like Home
  },
];
