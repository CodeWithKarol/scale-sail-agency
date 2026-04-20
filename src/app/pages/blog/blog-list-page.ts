import {
  Component,
  ChangeDetectionStrategy,
  computed,
  signal,
  inject,
  OnInit,
  effect,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, map } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { BlogPost } from './blog.model';
import { BlogService } from '../../shared/services/blog.service';
import { SeoService } from '../../shared/core/seo/seo.service';
import { SectionHeader } from '../../shared/ui/section-header/section-header';
import { Button } from '../../shared/ui/button/button';
import { FeaturedBlogPostComponent } from './components/featured-blog-post/featured-blog-post';
import { BlogPostCardComponent } from './components/blog-post-card/blog-post-card';
import { BreadcrumbComponent } from '../../shared/ui/breadcrumb/breadcrumb';

type FeedState =
  | { status: 'loading' }
  | { status: 'success'; data: { items: BlogPost[] } }
  | { status: 'error'; error: unknown };

@Component({
  selector: 'app-blog-list-page',
  standalone: true,
  imports: [
    SectionHeader,
    FeaturedBlogPostComponent,
    BlogPostCardComponent,
    Button,
    BreadcrumbComponent,
  ],
  templateUrl: './blog-list-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogListPage implements OnInit {
  private readonly seoService = inject(SeoService);
  private readonly blogService = inject(BlogService);

  // State
  private readonly displayBatchSize = 6;
  protected visibleCount = signal(this.displayBatchSize);

  // Data Fetching
  feedResource = toSignal(
    this.blogService.getPosts().pipe(
      map((response): FeedState => ({ status: 'success', data: { items: response } })),
      catchError((err): Observable<FeedState> => {
        console.error('BLOG FETCH ERROR:', err);
        return of({ status: 'error', error: err });
      }),
    ),
    { initialValue: { status: 'loading' } as FeedState },
  );

  // Derived Loading/Error States
  isLoading = computed(() => this.feedResource().status === 'loading');
  error = computed(() => this.feedResource().status === 'error');

  // Computed Posts
  private allPosts = computed<BlogPost[]>(() => {
    const res = this.feedResource();
    if (res.status !== 'success') return [];

    return res.data.items;
  });

  // Derived state
  featuredPost = computed(() => this.allPosts()[0] || null);

  // Posts to show in grid (excluding featured)
  visiblePosts = computed(() => {
    const all = this.allPosts();
    if (all.length <= 1) return []; // Only featured or empty

    // Skip the first one as it is featured
    return all.slice(1, this.visibleCount() + 1);
  });

  hasMorePosts = computed(() => {
    // Total available excluding featured
    const totalRemaining = Math.max(0, this.allPosts().length - 1);
    return this.visiblePosts().length < totalRemaining;
  });

  loadMore() {
    this.visibleCount.update((c) => c + this.displayBatchSize);
  }

  constructor() {
    effect(() => {
      const posts = this.allPosts();
      if (posts.length === 0) return;

      this.seoService.setSchema({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Blog',
            headline: 'Zdejmij nogę z hamulca. Instrukcje automatyzacji dla firm usługowych',
            name: 'Scale Sail - Blog Inżyniera Automatyzacji',
            description:
              'Twoja firma powinna być dochodową maszyną, a nie klatką z papierów. Dowiedz się, jak za pomocą kodu odzyskać 10-20 godzin tygodniowo.',
            author: {
              '@type': 'Person',
              name: 'Karol Modelski',
              url: 'https://scale-sail.io',
            },
            blogPost: posts.map((post) => ({
              '@type': 'BlogPosting',
              headline: post.title,
              name: post.title,
              description: post.excerpt,
              url: `https://scale-sail.io/wiedza-dla-warsztatu/${post.slug}`,
              datePublished: post.date,
              image: post.imageUrl ? [post.imageUrl] : [],
              author: {
                '@type': 'Person',
                name: 'Karol Modelski',
                url: 'https://scale-sail.io',
              },
              mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': `https://scale-sail.io/wiedza-dla-warsztatu/${post.slug}`,
              },
            })),
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': 'https://scale-sail.io/wiedza-dla-warsztatu',
            },
            inLanguage: 'pl-PL',
          },
        ],
      });
    });
  }

  ngOnInit(): void {
    this.seoService.setPageMetadata({
      title: 'Instrukcje automatyzacji dla firm usługowych | Blog Scale Sail',
      description:
        'Twoja firma powinna być dochodową maszyną, a nie klatką z papierów. Dowiedz się, jak za pomocą kodu odzyskać 10-20 godzin tygodniowo.',
      slug: 'wiedza-dla-warsztatu',
      type: 'article',
      keywords: [
        'automatyzacja warsztatu samochodowego',
        'n8n w małej firmie przykłady',
        'jak zautomatyzować firmę usługową',
        'automatyzacja n8n warsztat',
        'oszczędność czasu w warsztacie',
        'systemy zarządzania zleceniami blog',
        'porady automatyzacja procesów',
      ],
    });

    this.seoService.setBreadcrumbs([
      { name: 'Start', path: '/' },
      { name: 'Wiedza', path: '/wiedza-dla-warsztatu' },
    ]);
  }
}
