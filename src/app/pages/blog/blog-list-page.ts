import {
  Component,
  ChangeDetectionStrategy,
  computed,
  signal,
  inject,
  OnInit,
  effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, map } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { BlogPost, MediumFeedResponse, MediumPost } from './blog.model';
import { SeoService } from '../../shared/core/seo/seo.service';
import { SectionHeader } from '../../shared/ui/section-header/section-header';
import { Button } from '../../shared/ui/button/button';
import { FeaturedBlogPostComponent } from './components/featured-blog-post/featured-blog-post';
import { BlogPostCardComponent } from './components/blog-post-card/blog-post-card';

type FeedState =
  | { status: 'loading' }
  | { status: 'success'; data: MediumFeedResponse }
  | { status: 'error'; error: unknown };

@Component({
  selector: 'app-blog-list-page',
  imports: [CommonModule, SectionHeader, FeaturedBlogPostComponent, BlogPostCardComponent, Button],
  template: `
    <div class="min-h-screen bg-secondary font-sans text-white pb-24 sm:pb-32 relative isolate">
      <!-- Technical Grid Background -->
      <div
        class="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none -z-10"
      ></div>

      <div class="layout-container pt-24 sm:pt-32">
        <!-- Header -->
        <app-section-header
          subtitle="LOGS / ENGINEERING"
          title="Insights & Engineering"
          description="Practical writing on Angular architecture, Signals/RxJS patterns, performance tuning, and engineering decisions."
        />

        <!-- Content Area -->
        <div class="mt-16 sm:mt-24 space-y-20">
          <!-- Loading State -->
          @if (isLoading()) {
            <div class="flex flex-col justify-center items-center h-64 font-mono">
              <div class="flex items-center gap-2 text-accent mb-4">
                <span class="relative flex h-3 w-3">
                  <span
                    class="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"
                  ></span>
                  <span class="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
                </span>
                <span class="text-sm tracking-widest uppercase">Initializing Data Stream</span>
              </div>

              <!-- Progress Bar -->
              <div class="w-64 h-1 bg-white/10 overflow-hidden">
                <div class="h-full bg-accent animate-[loading_2s_ease-in-out_infinite] w-1/2"></div>
              </div>

              <div class="mt-4 text-[10px] text-white/40 uppercase tracking-widest">
                Fetching resources from remote...
              </div>
            </div>
          }

          <!-- Error State -->
          @else if (error()) {
            <div
              class="mx-auto max-w-lg border border-red-500/50 bg-red-900/5 p-8 relative overflow-hidden group"
            >
              <!-- Error decoration -->
              <div class="absolute top-0 left-0 w-2 h-2 border-l border-t border-red-500"></div>
              <div class="absolute top-0 right-0 w-2 h-2 border-r border-t border-red-500"></div>
              <div class="absolute bottom-0 left-0 w-2 h-2 border-l border-b border-red-500"></div>
              <div class="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-red-500"></div>

              <div class="flex flex-col items-center text-center">
                <div
                  class="text-red-500 font-mono text-xs uppercase tracking-widest mb-4 border border-red-500/30 px-3 py-1"
                >
                  System Error: 503
                </div>

                <h3 class="text-xl font-bold text-white mb-2 font-mono">CONNECTION FAILURE</h3>
                <p class="text-white/60 text-sm mb-8 font-light">
                  Unable to establish uplink with Medium.com feed.
                </p>

                <a
                  href="https://karol-modelski.medium.com/"
                  target="_blank"
                  class="inline-flex items-center gap-2 px-6 py-3 bg-red-500/10 text-red-500 border border-red-500/30 hover:bg-red-500 hover:text-white transition-all duration-300 text-xs font-mono uppercase tracking-wider"
                >
                  <span class="w-1 h-1 bg-current"></span>
                  Direct Uplink
                  <!-- ArrowRight -->
                  <svg
                    class="h-3 w-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </a>
              </div>
            </div>
          }

          <!-- Posts List -->
          @else {
            <!-- Featured Post -->
            @if (featuredPost(); as featured) {
              <app-featured-blog-post [post]="featured" />
            }

            <!-- Post Grid -->
            <ul
              class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 list-none p-0"
            >
              @for (post of visiblePosts(); track post.id) {
                <li>
                  <app-blog-post-card [post]="post" class="h-full" />
                </li>
              }
            </ul>

            <!-- Pagination -->
            @if (hasMorePosts()) {
              <div class="flex justify-center relative mt-24 pt-12">
                <!-- Technical Separator -->
                <div class="absolute top-0 left-0 w-full h-px bg-white/10"></div>
                <div class="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-accent"></div>
                <div class="absolute top-0 left-0 w-2 h-[2px] bg-accent"></div>
                <div class="absolute top-0 right-0 w-2 h-[2px] bg-accent"></div>

                <app-button variant="secondary" size="lg" (click)="loadMore()">
                  Load more articles
                </app-button>
              </div>
            }
          }
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogListPage implements OnInit {
  private readonly seoService = inject(SeoService);
  private readonly http = inject(HttpClient);
  private readonly rssUrl = 'https://karol-modelski.medium.com/feed';
  private readonly apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${this.rssUrl}`;

  // State
  private readonly displayBatchSize = 6;
  protected visibleCount = signal(this.displayBatchSize);

  // Data Fetching
  feedResource = toSignal(
    this.http.get<MediumFeedResponse>(this.apiUrl).pipe(
      map((response): FeedState => ({ status: 'success', data: response })),
      catchError((err): Observable<FeedState> => of({ status: 'error', error: err })),
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
    if (!res.data || res.data.status !== 'ok') return [];

    return res.data.items.map((item: MediumPost) => {
      const imgMatch = item.description.match(/<img[^>]+src="([^">]+)"/);
      const imageUrl = imgMatch ? imgMatch[1] : item.thumbnail;

      return {
        id: item.guid,
        title: item.title,
        excerpt: item.description.replace(/<[^>]*>/g, '').substring(0, 160) + '...',
        date: new Date(item.pubDate).toISOString(),
        slug: item.guid,
        imageUrl: imageUrl,
        category: item.categories?.length ? item.categories[0] : 'Tech',
        url: item.link,
      };
    });
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
            headline: 'Angular Blog - Architecture, Signals & Performance',
            name: 'Angular Blog - Architecture, Signals & Performance',
            description:
              'Practical writing on Angular architecture, Signals/RxJS patterns, performance tuning, and engineering decisions that keep teams shipping.',
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
              url: post.url,
              datePublished: post.date,
              image: post.imageUrl ? [post.imageUrl] : [],
              author: {
                '@type': 'Person',
                name: 'Karol Modelski',
                url: 'https://scale-sail.io',
              },
              mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': post.url,
              },
            })),
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': 'https://scale-sail.io/blog',
            },
            inLanguage: 'en-US',
          },
        ],
      });
    });
  }

  ngOnInit(): void {
    this.seoService.setPageMetadata({
      title: 'Blog | Scale Sail Agency',
      description:
        'Practical writing on Angular architecture, Signals/RxJS patterns, performance tuning, and engineering decisions that keep teams shipping.',
      slug: '/blog',
      type: 'article',
      keywords: [
        'Angular Blog',
        'Frontend Architecture',
        'Angular Signals',
        'RxJS Patterns',
        'Web Performance',
        'Engineering Management',
      ],
    });

    this.seoService.setBreadcrumbs([
      { name: 'Home', path: '/' },
      { name: 'Blog', path: '/blog' },
    ]);
  }
}
