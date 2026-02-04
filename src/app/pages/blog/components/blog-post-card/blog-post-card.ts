import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { BlogPost } from '../../blog.model';

@Component({
  selector: 'app-blog-post-card',
  imports: [CommonModule, DatePipe],
  styles: [
    `
      :host {
        display: block;
        height: 100%;
      }
    `,
  ],
  template: `
    <article
      class="relative flex flex-col items-start justify-between group h-full bg-white/5 border border-white/5 hover:border-accent/40 transition-colors duration-300 p-6"
    >
      <!-- Date Badge (Top Right) -->
      <div
        class="absolute top-0 right-0 px-3 py-1 bg-white/5 border-l border-b border-white/10 text-[10px] font-mono text-white/40"
      >
        {{ post().date | date: 'yyyy.MM.dd' }}
      </div>

      <!-- Card Image -->
      <div class="relative w-full mb-6 mt-2">
        <div class="aspect-[16/9] w-full overflow-hidden bg-secondary ring-1 ring-white/10">
          <img
            [src]="
              post().imageUrl ||
              'https://images.unsplash.com/photo-1499750310159-5254f4cc1555?q=80&w=2670&auto=format&fit=crop'
            "
            alt=""
            class="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105 group-hover:grayscale-[0.5]"
          />
          <a
            [href]="post().url"
            target="_blank"
            class="absolute inset-0 focus:outline-none"
            aria-hidden="true"
            tabindex="-1"
            ><span class="sr-only">Read post</span></a
          >
        </div>
      </div>

      <!-- Card Content -->
      <div class="flex flex-col h-full w-full">
        <div class="flex items-center gap-x-4 text-xs font-medium text-white/60 mb-4">
          <span
            class="px-2 py-0.5 text-[10px] uppercase tracking-wider text-accent border border-accent/20 font-mono"
          >
            {{ post().category }}
          </span>
        </div>

        <h3
          class="text-lg font-bold leading-tight text-white group-hover:text-accent transition-colors line-clamp-2"
        >
          <a [href]="post().url" target="_blank">
            <span class="absolute inset-0"></span>
            {{ post().title }}
          </a>
        </h3>

        <p
          class="mt-4 flex-auto line-clamp-3 text-sm leading-relaxed text-white/60 font-light border-l border-white/10 pl-3"
        >
          {{ post().excerpt }}
        </p>

        <div class="mt-6 flex items-center pt-4 w-full">
          <div
            class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/40 group-hover:text-accent transition-colors"
          >
            Read
            <!-- ArrowRight -->
            <svg
              class="h-3 w-3 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </div>
      </div>
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogPostCardComponent {
  post = input.required<BlogPost>();
}
