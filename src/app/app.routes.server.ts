import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'work/:id',
    renderMode: RenderMode.Server,
  },
  {
    path: 'blog',
    renderMode: RenderMode.Server, // Fetch RSS feed on request
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender, // Prerender static pages like Home
  },
];
