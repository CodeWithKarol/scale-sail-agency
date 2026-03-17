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
import { BreadcrumbComponent } from '../../shared/ui/breadcrumb/breadcrumb';
import { GeometricBackground } from '../../shared/ui/geometric-background/geometric-background';

type FeedState =
  | { status: 'loading' }
  | { status: 'success'; data: MediumFeedResponse }
  | { status: 'error'; error: unknown };

@Component({
  selector: 'app-blog-list-page',
  imports: [
    CommonModule,
    SectionHeader,
    FeaturedBlogPostComponent,
    BlogPostCardComponent,
    Button,
    BreadcrumbComponent,
    GeometricBackground,
  ],
  template: `
    <div class="min-h-screen font-sans text-white pb-24 sm:pb-32 relative isolate">
      <div class="fixed inset-0 -z-10">
        <app-geometric-background variant="default" />
      </div>

      <div class="layout-container pt-24 sm:pt-32">
        <!-- Breadcrumbs -->
        <app-breadcrumb />

        <!-- Header -->
        <app-section-header
          subtitle="BAZA_WIEDZY / PORADY"
          title="Wiedza i Automatyzacja"
          description="Praktyczne wskazówki, jak wykorzystać technologię do rozwoju Twojej firmy. Od prostych sposobów na Excela po budowę dedykowanych systemów."
        />

        <!-- Content Area -->
        <div class="mt-16 sm:mt-24 space-y-20">
          <!-- Loading State -->
          @if (isLoading()) {
            <div class="flex flex-col justify-center items-center h-64">
              <div class="flex items-center gap-3 text-accent mb-6">
                <span class="relative flex h-3 w-3">
                  <span
                    class="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"
                  ></span>
                  <span class="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
                </span>
                <span class="text-xs font-black tracking-[0.3em] uppercase">Pobieranie bazy wiedzy</span>
              </div>

              <!-- Progress Bar -->
              <div class="w-64 h-1 bg-slate-800 overflow-hidden rounded-full">
                <div class="h-full bg-accent animate-[loading_2s_ease-in-out_infinite] w-1/2"></div>
              </div>

              <div class="mt-6 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                Łączenie z serwerem danych...
              </div>
            </div>
          }

          <!-- Error State -->
          @else if (error()) {
            <div
              class="mx-auto max-w-lg border border-slate-800 bg-slate-900/40 p-10 relative overflow-hidden group rounded-sm"
            >
              <!-- Error decoration -->
              <div class="absolute top-0 left-0 w-1 h-8 bg-red-500/50"></div>

              <div class="flex flex-col items-center text-center">
                <div
                  class="text-red-500 text-[10px] font-black uppercase tracking-[0.3em] mb-6 border border-red-500/20 px-4 py-1.5"
                >
                  Błąd Połączenia
                </div>

                <h3 class="text-xl font-bold text-white mb-4 uppercase tracking-tight">Baza artykułów niedostępna</h3>
                <p class="text-slate-400 text-sm mb-10 font-light leading-relaxed">
                  Wystąpił problem z pobraniem artykułów z serwisu Medium.com. Możesz spróbować połączyć się bezpośrednio.
                </p>

                <app-button
                  href="https://karol-modelski.medium.com/"
                  target="_blank"
                  variant="secondary"
                  size="md"
                  styleClass="uppercase tracking-widest text-[10px]"
                >
                  Odwiedź Medium.com
                </app-button>
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
              <div class="flex justify-center relative mt-32 pt-16">
                <!-- Technical Separator -->
                <div class="absolute top-0 left-0 w-full h-px bg-slate-800/50"></div>
                <div class="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-accent"></div>

                <app-button variant="secondary" size="lg" (click)="loadMore()" styleClass="uppercase tracking-widest text-xs font-black">
                  Pokaż więcej artykułów
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
        category: item.categories?.length ? item.categories[0] : 'Porady',
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
            headline: 'Baza Wiedzy Scale Sail - Technologia w służbie firmy',
            name: 'Baza Wiedzy Scale Sail - Technologia w służbie firmy',
            description:
              'Praktyczne artykuły o automatyzacji pracy, budowie systemów dla warsztatów i firm usługowych oraz o tym, jak technologia może ułatwić Ci życie.',
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
            inLanguage: 'pl-PL',
          },
        ],
      });
    });
  }

  ngOnInit(): void {
    this.seoService.setPageMetadata({
      title: 'Baza Wiedzy i Porady | Scale Sail Agency',
      description:
        'Dowiedz się, jak proste aplikacje i automatyzacja mogą oszczędzić Twój czas. Praktyczne wskazówki dla właścicieli warsztatów i firm usługowych.',
      slug: '/blog',
      type: 'article',
      keywords: [
        'Automatyzacja warsztatu',
        'Aplikacja dla firmy usługowej',
        'Zarządzanie zleceniami',
        'Excel w firmie',
        'Porady dla przedsiębiorców',
        'Cyfryzacja biznesu',
      ],
    });

    this.seoService.setBreadcrumbs([
      { name: 'Start', path: '/' },
      { name: 'Blog', path: '/blog' },
    ]);
  }
}

