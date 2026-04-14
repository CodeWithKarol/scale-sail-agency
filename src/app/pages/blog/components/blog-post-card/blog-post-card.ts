import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BlogPost } from '../../blog.model';

@Component({
  selector: 'app-blog-post-card',
  imports: [CommonModule, DatePipe, RouterModule],
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
      class="card-workshop group relative flex flex-col items-start bg-white border-2 border-secondary/10 hover:border-primary transition-all duration-500 rounded-none overflow-hidden h-full hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_0px_rgba(0,123,255,0.1)]"
    >
      <!-- Card Image -->
      <div
        class="relative w-full aspect-[16/9] overflow-hidden bg-neutral border-b-2 border-secondary/10 p-1"
      >
        <img
          [src]="
            post().imageUrl ||
            'https://images.unsplash.com/photo-1499750310159-5254f4cc1555?q=80&w=2670&auto=format&fit=crop'
          "
          [alt]="post().title + ' - system warsztatowy bez abonamentu - poradnik'"
          class="absolute inset-1 h-[calc(100%-0.5rem)] w-[calc(100%-0.5rem)] object-cover grayscale transition duration-700 group-hover:grayscale-0 group-hover:scale-105"
        />
        <a
          [routerLink]="['/blog', post().slug]"
          class="absolute inset-0 z-10 focus:outline-none"
          aria-hidden="true"
          tabindex="-1"
          ><span class="sr-only">Czytaj wpis</span></a
        >
      </div>

      <!-- Card Content -->
      <div class="flex flex-col p-5 sm:p-8 h-full w-full">
        <div class="flex items-center gap-x-4 mb-6">
          <div class="status-badge ring-4 ring-secondary/5 text-[8px] px-2">
            {{ post().category }}
          </div>
          <div class="h-px w-6 bg-secondary/10"></div>
          <time [attr.datetime]="post().date" class="text-small text-secondary/60">
            {{ post().date | date: 'yyyy.MM.dd' }}
          </time>
        </div>

        <h3
          class="heading-3 text-secondary group-hover:text-primary transition-colors line-clamp-2 uppercase tracking-tight"
        >
          <a [routerLink]="['/blog', post().slug]">
            <span class="absolute inset-0"></span>
            {{ post().title }}
          </a>
        </h3>

        <p
          class="mt-6 flex-auto line-clamp-3 text-body text-secondary/85 border-l-4 border-secondary/10 pl-3 sm:pl-5 group-hover:border-primary/30 transition-colors text-pretty"
        >
          {{ post().excerpt }}
        </p>

        <div class="mt-6 sm:mt-10 flex items-center pt-6 w-full border-t-2 border-secondary/5">
          <div
            class="group/link inline-flex items-center gap-3 text-small text-secondary/60 group-hover:text-primary transition-colors"
          >
            CZYTAJ ARTYKUŁ
            <span
              class="h-px w-8 bg-secondary/30 transition-all group-hover:w-12 group-hover:bg-primary"
            ></span>
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
