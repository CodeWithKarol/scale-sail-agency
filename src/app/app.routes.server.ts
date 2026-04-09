import { inject } from '@angular/core';
import { RenderMode, ServerRoute } from '@angular/ssr';
import { BlogService } from './shared/services/blog.service';
import { PortfolioService } from './shared/domain/portfolio/portfolio.service';
import { firstValueFrom } from 'rxjs';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'work/:id',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const portfolioService = inject(PortfolioService);
      const projects = await firstValueFrom(portfolioService.getAllCaseStudies());
      return projects.map((p) => ({ id: p.id }));
    },
  },
  {
    path: 'blog/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const blogService = inject(BlogService);
      // Note: During build, HttpClient needs absolute path or we can use a simpler fetch if needed.
      // But Angular's application builder usually handles local asset requests.
      const posts = await firstValueFrom(blogService.getPosts());
      return posts.map((post) => ({ slug: post.slug }));
    },
  },
  {
    path: 'privacy-policy',
    renderMode: RenderMode.Prerender,
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
