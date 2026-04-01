import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { BlogPost } from '../../blog.model';
import { Button } from '../../../../shared/ui/button/button';
import { LucideAngularModule, ArrowRight } from 'lucide-angular';

@Component({
  selector: 'app-featured-blog-post',
  standalone: true,
  imports: [CommonModule, DatePipe, Button, LucideAngularModule],
  template: `
    <article
      class="group relative isolate flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-20 border-b-4 border-secondary/10 pb-20 lg:pb-32"
    >
      <!-- Image (Industrial Frame) -->
      <div class="relative w-full lg:w-1/2 lg:shrink-0">
        <div
          class="aspect-[16/9] w-full overflow-hidden bg-white border-2 border-secondary/10 p-2 transition-all duration-500 hover:border-primary group-hover:shadow-[12px_12px_0px_0px_rgba(10,31,68,0.05)]"
        >
          <div class="absolute top-6 left-6 z-20">
            <div class="status-badge status-badge-dark ring-4 ring-secondary/5">NAJNOWSZY WPIS</div>
          </div>

          <a
            [href]="post().url"
            target="_blank"
            rel="noopener noreferrer"
            class="block h-full w-full focus:outline-none relative overflow-hidden"
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
              class="absolute inset-0 h-full w-full object-cover transition duration-700 grayscale group-hover:grayscale-0 group-hover:scale-105"
            />
          </a>
        </div>
      </div>

      <!-- Content -->
      <div class="w-full lg:w-1/2 flex flex-col justify-center">
        <div class="flex items-center gap-x-6 mb-8">
          <div class="status-badge ring-4 ring-secondary/5">
            {{ post().category }}
          </div>
          <div class="h-px w-12 bg-secondary/10"></div>
          <time [attr.datetime]="post().date" class="text-small text-secondary/60">
            OPUBLIKOWANO: {{ post().date | date: 'yyyy.MM.dd' }}
          </time>
        </div>

        <h2
          class="heading-2 text-secondary group-hover:text-primary transition-colors duration-300"
        >
          <a [href]="post().url" target="_blank" rel="noopener noreferrer">
            {{ post().title }}
          </a>
        </h2>

        <p
          class="mt-10 text-body sm:text-lg text-secondary/85 border-l-8 border-primary/10 pl-10 italic"
        >
          {{ post().excerpt }}
        </p>

        <div class="mt-12">
          <app-button
            [href]="post().url"
            target="_blank"
            variant="secondary"
            size="lg"
            class="group/btn"
          >
            <span class="flex items-center gap-4">
              CZYTAJ ARTYKUŁ
              <lucide-icon
                [img]="icons.ArrowRight"
                size="20"
                class="transition-transform group-hover/btn:translate-x-2"
              ></lucide-icon>
            </span>
          </app-button>
        </div>
      </div>
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeaturedBlogPostComponent {
  post = input.required<BlogPost>();
  readonly icons = { ArrowRight };
}
