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
      class="group relative flex flex-col items-start bg-slate-900/40 border border-slate-800 hover:border-primary/40 transition-all duration-500 rounded-sm overflow-hidden h-full"
    >
      <!-- Card Image -->
      <div class="relative w-full aspect-[16/9] overflow-hidden bg-slate-900 border-b border-slate-800">
        <img
          [src]="
            post().imageUrl ||
            'https://images.unsplash.com/photo-1499750310159-5254f4cc1555?q=80&w=2670&auto=format&fit=crop'
          "
          [alt]="post().title"
          class="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
        <a
          [href]="post().url"
          target="_blank"
          rel="noopener noreferrer"
          class="absolute inset-0 z-10 focus:outline-none"
          aria-hidden="true"
          tabindex="-1"
          ><span class="sr-only">Czytaj wpis</span></a
        >
      </div>

      <!-- Card Content -->
      <div class="flex flex-col p-8 h-full w-full">
        <div class="flex items-center gap-x-3 mb-6">
          <span
            class="px-2 py-0.5 text-[9px] font-black uppercase tracking-widest text-primary bg-primary/5 border border-primary/20 rounded-sm"
          >
            {{ post().category }}
          </span>
          <div class="h-px w-4 bg-slate-800"></div>
          <time
            [attr.datetime]="post().date"
            class="text-[9px] font-bold text-slate-500 uppercase tracking-widest"
          >
            {{ post().date | date: 'yyyy.MM.dd' }}
          </time>
        </div>

        <h3
          class="text-xl font-bold leading-tight text-white group-hover:text-primary transition-colors line-clamp-2 uppercase tracking-tight"
        >
          <a [href]="post().url" target="_blank" rel="noopener noreferrer">
            <span class="absolute inset-0"></span>
            {{ post().title }}
          </a>
        </h3>

        <p
          class="mt-4 flex-auto line-clamp-3 text-sm leading-relaxed text-slate-400 font-light border-l-2 border-slate-800 pl-4 group-hover:border-primary/30 transition-colors"
        >
          {{ post().excerpt }}
        </p>

        <div class="mt-8 flex items-center pt-4 w-full border-t border-slate-800/50">
          <div
            class="group/link inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-primary transition-colors"
          >
            Czytaj
            <span class="h-px w-6 bg-slate-800 transition-all group-hover:w-10 group-hover:bg-primary"></span>
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
