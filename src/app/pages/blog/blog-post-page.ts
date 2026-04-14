import { ChangeDetectionStrategy, Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BlogService } from '../../shared/services/blog.service';
import { BlogPost } from './blog.model';
import { SeoService } from '../../shared/core/seo/seo.service';
import { BreadcrumbComponent } from '../../shared/ui/breadcrumb/breadcrumb';
import { Button } from '../../shared/ui/button/button';
import { LucideAngularModule } from 'lucide-angular';
import { MarkdownPipe } from '../../shared/pipes/markdown.pipe';

@Component({
  selector: 'app-blog-post-page',
  imports: [
    CommonModule,
    RouterModule,
    BreadcrumbComponent,
    Button,
    LucideAngularModule,
    MarkdownPipe,
  ],
  template: `
    <article class="min-h-screen bg-neutral text-secondary pb-24 pt-32 sm:pt-40">
      <div class="layout-container">
        <app-breadcrumb />

        @if (post(); as p) {
          <header class="max-w-3xl mx-auto mb-16 text-center">
            <div
              class="inline-block px-3 py-1 bg-primary/10 text-primary font-bold text-xs uppercase tracking-widest mb-6"
            >
              {{ p.category }}
            </div>
            <h1 class="heading-1 mb-8">{{ p.title }}</h1>
            <div class="flex items-center justify-center gap-4 text-secondary/60 text-sm">
              <time [attr.datetime]="p.date">{{ p.date | date: 'longDate' }}</time>
              <span>•</span>
              <span>Karol Modelski</span>
            </div>
          </header>

          @if (p.imageUrl) {
            <div class="max-w-5xl mx-auto mb-16 shadow-2xl">
              <img
                [src]="p.imageUrl"
                [alt]="p.title + ' - oprogramowanie na własność dla firm usługowych'"
                class="w-full h-auto border-4 border-secondary"
                width="1200"
                height="630"
              />
            </div>
          }

          <div
            class="max-w-3xl mx-auto prose prose-lg prose-slate prose-headings:text-secondary prose-p:text-secondary/90 prose-strong:text-secondary prose-a:text-primary"
          >
            <div [innerHTML]="content() | markdown"></div>
          </div>

          <footer class="max-w-3xl mx-auto mt-24 pt-12 border-t-2 border-secondary/10">
            <div class="bg-white border-4 border-secondary p-8 sm:p-12 text-center shadow-xl">
              <h3 class="heading-3 mb-4 uppercase">Podobał Ci się ten artykuł?</h3>
              <p class="text-lg text-secondary/80 mb-8">
                Pomagam firmom budować systemy, które działają same. Sprawdź, jak możemy
                współpracować.
              </p>
              <app-button variant="primary" size="lg" href="/consultation">
                DARMOWA KONSULTACJA 📅
              </app-button>
            </div>
          </footer>
        } @else {
          <div class="flex flex-col items-center justify-center py-40">
            <div class="animate-pulse flex flex-col items-center">
              <div class="h-4 w-32 bg-secondary/10 mb-8"></div>
              <div class="h-12 w-96 bg-secondary/10 mb-12"></div>
              <div class="h-64 w-full max-w-2xl bg-secondary/5"></div>
            </div>
          </div>
        }
      </div>
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogPostPage implements OnInit {
  private route = inject(ActivatedRoute);
  private blogService = inject(BlogService);
  private seoService = inject(SeoService);

  post = signal<BlogPost | null>(null);
  content = signal<string>('');

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.blogService.getPostBySlug(slug).subscribe((p) => {
        if (p) {
          this.post.set(p);
          this.updateSeo(p);
          this.updateBreadcrumbs(p);
          if (p.contentPath) {
            this.blogService.getPostContent(p.contentPath).subscribe((c) => this.content.set(c));
          }
        }
      });
    }
  }

  private updateBreadcrumbs(post: BlogPost) {
    this.seoService.setBreadcrumbs([
      { name: 'Start', path: '/' },
      { name: 'Wiedza', path: '/blog' },
      { name: post.title, path: `/blog/${post.slug}` },
    ]);
  }

  private updateSeo(post: BlogPost) {
    this.seoService.setPageMetadata({
      title: post.title,
      description: post.excerpt,
      slug: `/blog/${post.slug}`,
      type: 'article',
      image: post.imageUrl,
      keywords: [
        'automatyzacja warsztatu',
        'n8n warsztat samochodowy',
        'powiadomienia sms warsztat',
        'system dla warsztatu bez abonamentu',
        post.category,
      ],
    });

    // Add Article Schema for Rich Snippets
    this.seoService.setSchema({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      image: [post.imageUrl],
      datePublished: post.date,
      author: {
        '@type': 'Person',
        name: 'Karol Modelski',
        url: 'https://scale-sail.io',
      },
      publisher: {
        '@type': 'Organization',
        name: 'Scale Sail Agency',
        logo: {
          '@type': 'ImageObject',
          url: 'https://scale-sail.io/images/scale-sail-logo.webp',
        },
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `https://scale-sail.io/blog/${post.slug}`,
      },
    });
  }
}
