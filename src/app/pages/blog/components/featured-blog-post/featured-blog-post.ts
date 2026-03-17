import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { BlogPost } from '../../blog.model';

@Component({
  selector: 'app-featured-blog-post',
  imports: [CommonModule, DatePipe],
  template: `
    <article
      class="group relative isolate flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-20 border-b border-slate-800 pb-20 lg:pb-32"
    >
      <!-- Image -->
      <div class="relative w-full lg:w-1/2 lg:shrink-0">
        <div
          class="aspect-[16/9] w-full overflow-hidden bg-slate-900 border border-slate-800 transition-all duration-500 hover:border-primary/40 shadow-2xl"
        >
          <div
            class="absolute top-6 left-6 z-20 px-3 py-1 bg-slate-950 border border-slate-800 text-[9px] font-black text-accent uppercase tracking-[0.3em] rounded-sm shadow-2xl"
          >
            NAJNOWSZY WPIS
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
              class="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />
          </a>
        </div>
      </div>

      <!-- Content -->
      <div class="w-full lg:w-1/2 flex flex-col justify-center">
        <div class="flex items-center gap-x-4 mb-8">
          <div
            class="px-3 py-1 bg-primary/10 border border-primary/20 text-primary text-[10px] font-black tracking-widest uppercase rounded-sm"
          >
            {{ post().category }}
          </div>
          <div class="h-px w-8 bg-slate-800"></div>
          <time
            [attr.datetime]="post().date"
            class="text-[10px] font-bold text-slate-500 uppercase tracking-widest"
          >
            {{ post().date | date: 'yyyy.MM.dd' }}
          </time>
        </div>

        <h2 class="text-3xl font-extrabold tracking-tight text-white sm:text-5xl uppercase leading-tight">
          <a
            [href]="post().url"
            target="_blank"
            rel="noopener noreferrer"
            class="hover:text-primary transition-colors duration-300"
          >
            {{ post().title }}
          </a>
        </h2>

        <p
          class="mt-8 text-lg leading-relaxed text-slate-400 font-light border-l-4 border-primary/20 pl-8"
        >
          {{ post().excerpt }}
        </p>

        <div class="mt-10">
          <a
            [href]="post().url"
            target="_blank"
            rel="noopener noreferrer"
            class="group/btn inline-flex items-center gap-3 text-xs font-black text-white hover:text-primary transition-colors uppercase tracking-[0.2em]"
          >
            Czytaj artykuł
            <span class="h-px w-12 bg-slate-700 transition-all group-hover/btn:w-16 group-hover:bg-primary"></span>
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
