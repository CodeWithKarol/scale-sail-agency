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
  imports: [
    CommonModule,
    SectionHeader,
    FeaturedBlogPostComponent,
    BlogPostCardComponent,
    Button,
    BreadcrumbComponent,
  ],
  template: `
    <div class="min-h-screen bg-neutral text-secondary pb-24 sm:pb-32 relative bg-grid-workshop">
      <!-- Technical Grid Background -->
      <div class="absolute inset-0 z-0 bg-grid-workshop opacity-40 pointer-events-none"></div>

      <div class="layout-container relative z-10 pt-32 sm:pt-40">
        <app-breadcrumb />

        <!-- Header -->
        <app-section-header
          [level]="1"
          subtitle="BAZA WIEDZY"
          title="Automatyzacja warsztatu i firmy usługowej — Blog"
          description="Twoja firma powinna być dochodową maszyną, a nie klatką z papierów i telefonów. Piszę o tym, jak za pomocą kodu odzyskać 10-20 godzin tygodniowo i wreszcie skupić się na rzemiośle."
        />

        <!-- Content Area -->
        <div class="mt-16 sm:mt-24 space-y-32">
          <!-- Loading State (Industrial) -->
          @if (isLoading()) {
            <div class="flex flex-col justify-center items-center h-64">
              <div class="status-badge status-badge-dark mb-8 ring-4 ring-secondary/5">
                <span class="relative flex h-2 w-2">
                  <span
                    class="animate-ping absolute inline-flex h-full w-full rounded-none bg-primary opacity-75"
                  ></span>
                  <span class="relative inline-flex rounded-none h-2 w-2 bg-primary"></span>
                </span>
                POBIERANIE...
              </div>

              <!-- Progress Bar (Workshop Style) -->
              <div
                class="w-64 h-2 bg-secondary/10 overflow-hidden rounded-none border-2 border-secondary/10"
              >
                <div
                  class="h-full bg-primary animate-[loading_2s_ease-in-out_infinite] w-1/2"
                ></div>
              </div>

              <div class="mt-8 text-small text-secondary/60">ŁĄCZENIE Z SERWEREM...</div>
            </div>
          }

          <!-- Error State (Industrial) -->
          @else if (error()) {
            <div
              class="mx-auto max-w-2xl bg-white border-4 border-secondary p-12 text-center relative overflow-hidden shadow-[12px_12px_0px_0px_rgba(10,31,68,0.05)]"
            >
              <div class="status-badge bg-accent text-white border-accent mb-10">BŁĄD SYSTEMU</div>

              <h3 class="heading-3 text-secondary mb-6 uppercase">Baza wiedzy niedostępna</h3>
              <p class="text-body sm:text-lg text-secondary/85 mb-12">
                Wystąpił problem z pobraniem artykułów. Sprawdź moje publikacje bezpośrednio na
                platformie Medium.
              </p>

              <app-button
                href="https://karol-modelski.medium.com/"
                target="_blank"
                variant="primary"
                size="lg"
              >
                ODWIEDŹ MEDIUM.COM
              </app-button>
            </div>
          }

          <!-- Posts List -->
          @else {
            <!-- Featured Post -->
            @if (featuredPost(); as featured) {
              <div class="mb-32">
                <app-featured-blog-post [post]="featured" />
              </div>
            }

            <!-- Post Grid -->
            <ul
              class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20 list-none p-0"
            >
              @for (post of visiblePosts(); track post.id) {
                <li>
                  <app-blog-post-card [post]="post" class="h-full" />
                </li>
              }
            </ul>

            <!-- Pagination (Workshop Style) -->
            @if (hasMorePosts()) {
              <div class="flex justify-center relative mt-40 pt-20 border-t-4 border-secondary/10">
                <div class="absolute -top-1 left-1/2 -translate-x-1/2 w-24 h-2 bg-primary"></div>

                <app-button variant="secondary" size="lg" (click)="loadMore()">
                  <span class="text-lg font-bold">ZOBACZ WIĘCEJ NARZĘDZI I CASE STUDIES</span>
                </app-button>
              </div>
            }
          }
        </div>

        <!-- Contextual Internal Linking (SEO & Flow) -->
        <div class="mt-32 py-20 border-t-2 border-dashed border-secondary/10 text-center relative">
          <h2 class="heading-2 text-secondary mb-6">Przestań łatać procesy na taśmę klejącą.</h2>
          <p class="text-lg text-secondary/85 mb-12 max-w-2xl mx-auto">
            Samo czytanie o automatyzacji nie naprawi Twojego kalendarza. Jeśli czujesz, że chaos
            operacyjny zaczyna Cię przerastać, zróbmy analizę Twojego „silnika” i zobaczmy, co
            możemy zautomatyzować w pierwszej kolejności.
          </p>
          <div class="flex justify-center">
            <app-button variant="primary" size="lg" href="/consultation">
              <span class="text-lg font-bold">Umów Weryfikację potrzeb (15 min) 📅</span>
            </app-button>
          </div>
        </div>
      </div>
    </div>
  `,
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
      title: 'Instrukcje automatyzacji dla firm usługowych | Blog Scale Sail',
      description:
        'Twoja firma powinna być dochodową maszyną, a nie klatką z papierów. Dowiedz się, jak za pomocą kodu odzyskać 10-20 godzin tygodniowo.',
      slug: '/blog',
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
      { name: 'Wiedza', path: '/blog' },
    ]);
  }
}
