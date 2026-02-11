import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { BlogPost } from '../../blog.model';

@Component({
  selector: 'app-featured-blog-post',
  imports: [CommonModule, DatePipe],
  template: `
    <article
      class="group relative isolate flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-16 border-b border-white/10 pb-16 lg:pb-24"
    >
      <!-- Image -->
      <div class="relative w-full lg:w-1/2 lg:shrink-0">
        <div
          class="aspect-[16/9] w-full overflow-hidden bg-secondary ring-1 ring-white/10 transition-all duration-500 group-hover:ring-accent/50"
        >
          <!-- Tech overlay -->
          <div
            class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNCIgaGVpZ2h0PSI0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0wIDBoNHYxSDB6IiBmaWxsPSIjMDAwIiBmaWxsLW9wYWNpdHk9IjAuMiIvPjwvc3ZnPg==')] opacity-10 pointer-events-none z-10"
          ></div>

          <div
            class="absolute top-4 left-4 z-20 px-2 py-1 bg-black/60 backdrop-blur text-[10px] font-mono text-accent border border-accent/20 uppercase tracking-widest"
          >
            LATEST_ENTRY
          </div>

          <a
            [href]="post().url"
            target="_blank"
            rel="noopener noreferrer"
            class="block h-full w-full focus:outline-none"
            aria-hidden="true"
            tabindex="-1"
          >
            <img
              [src]="
                post().imageUrl ||
                'https://images.unsplash.com/photo-1499750310159-5254f4cc1555?q=80&w=2670&auto=format&fit=crop'
              "
              [alt]="post().title"
              width="800"
              height="450"
              fetchpriority="high"
              class="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105 group-hover:grayscale-[0.5]"
            />
          </a>
        </div>
      </div>

      <!-- Content -->
      <div class="w-full lg:w-1/2 flex flex-col justify-center">
        <div class="flex items-center gap-x-4 text-xs font-medium mb-6">
          <span
            class="relative z-10 px-3 py-1 bg-white/5 border border-white/10 text-white/80 font-mono text-[10px] uppercase tracking-wider"
          >
            {{ post().category }}
          </span>
          <time
            [attr.datetime]="post().date"
            class="text-accent font-mono text-[10px] uppercase tracking-wider"
          >
            // {{ post().date | date: 'yyyy.MM.dd' }}
          </time>
        </div>

        <h2 class="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          <a
            [href]="post().url"
            target="_blank"
            rel="noopener noreferrer"
            class="hover:text-accent transition-colors duration-300"
          >
            {{ post().title }}
          </a>
        </h2>

        <p
          class="mt-6 text-lg leading-relaxed text-white/60 font-light border-l border-white/10 pl-4"
        >
          {{ post().excerpt }}
        </p>

        <div class="mt-8">
          <a
            [href]="post().url"
            target="_blank"
            rel="noopener noreferrer"
            class="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2 group/btn hover:text-accent transition-colors"
          >
            Read article
            <!-- ArrowRight -->
            <svg
              class="h-4 w-4 transition-transform group-hover/btn:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeaturedBlogPostComponent {
  post = input.required<BlogPost>();
}
