import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CaseStudy } from '../../../../shared/domain/portfolio/portfolio.service';

@Component({
  selector: 'app-project-card',
  imports: [CommonModule, RouterLink],
  styles: [
    `
      :host {
        display: block;
        width: 100%;
      }
    `,
  ],
  template: `
    <article
      class="group/card relative isolate flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-24"
    >
      <!-- Image Section -->
      <div class="w-full lg:w-1/2 lg:shrink-0 relative" [class.lg:order-last]="reverseLayout()">
        <!-- Technical decoration -->
        <div
          class="absolute -inset-2 border border-white/5 opacity-0 transition-all duration-500 group-hover/card:opacity-100 group-hover/card:scale-105"
        ></div>
        <div
          class="absolute -inset-[1px] bg-gradient-to-r from-accent/0 via-accent/50 to-accent/0 opacity-0 transition-opacity duration-500 group-hover/card:opacity-20 blur-sm"
        ></div>

        <div
          class="group relative aspect-[16/9] w-full overflow-hidden bg-secondary ring-1 ring-white/10 transition-all duration-500"
        >
          <!-- Terminal Header -->
          <div
            class="absolute top-0 left-0 right-0 h-6 bg-black/40 backdrop-blur-md z-10 flex items-center px-3 gap-1.5 border-b border-white/10"
          >
            <div class="w-2 h-2 rounded-full bg-white/20"></div>
            <div class="w-2 h-2 rounded-full bg-white/20"></div>
            <div class="w-2 h-2 rounded-full bg-white/20"></div>
            <div class="ml-auto font-mono text-[10px] text-white/40 tracking-wider">
              PROJECT_ID: {{ project().id }}
            </div>
          </div>

          <img
            [src]="
              project().heroImage ||
              'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80'
            "
            [alt]="project().title + ' preview'"
            width="800"
            height="450"
            class="absolute inset-0 h-full w-full object-cover object-top transition duration-700 group-hover/card:scale-105 group-hover/card:grayscale-[0.5]"
          />

          <!-- Scanline overlay -->
          <div
            class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNCIgaGVpZ2h0PSI0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0wIDBoNHYxSDB6IiBmaWxsPSIjMDAwIiBmaWxsLW9wYWNpdHk9IjAuMiIvPjwvc3ZnPg==')] opacity-20 pointer-events-none"
          ></div>

          <a
            [routerLink]="['/work', project().id]"
            class="absolute inset-0 focus:outline-none z-20"
            tabindex="-1"
          >
            <span class="sr-only">View Case Study</span>
          </a>
        </div>
      </div>

      <!-- Content Section -->
      <div class="w-full lg:w-1/2 flex flex-col justify-center">
        <div class="flex items-center gap-x-4 mb-6">
          <div
            class="flex items-center gap-2 px-2 py-1 bg-accent/10 border border-accent/20 text-accent text-xs font-mono tracking-wider uppercase"
          >
            <span class="relative flex h-2 w-2">
              <span
                class="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"
              ></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            CASE STUDY
          </div>
          <div class="h-px flex-1 bg-white/10"></div>
          @if (project().techStack.length > 0) {
            <span class="text-xs font-mono text-white/40 tracking-tight uppercase">
              // {{ project().techStack[0] }}
            </span>
          }
        </div>

        <div class="group relative max-w-xl">
          <h3 class="heading-2 text-white font-bold tracking-tighter">
            <a
              [routerLink]="['/work', project().id]"
              class="hover:text-accent transition-colors duration-300"
            >
              <span class="absolute inset-0"></span>
              {{ project().title }}
            </a>
          </h3>
          <p
            class="mt-6 text-lg leading-relaxed text-white/60 font-light border-l-2 border-white/10 pl-6"
          >
            {{ project().tagline }}
          </p>
        </div>

        <!-- Tech Stack Tags -->
        <div class="mt-10">
          <div class="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-3">
            Technologies
          </div>
          <ul class="flex flex-wrap gap-2 list-none p-0">
            @for (tech of project().techStack.slice(0, 4); track tech) {
              <li
                class="px-3 py-1.5 bg-white/5 border border-white/10 text-xs text-white/70 font-mono hover:bg-white/10 hover:border-accent/30 hover:text-accent transition-colors cursor-default"
              >
                {{ tech }}
              </li>
            }
            @if (project().techStack.length > 4) {
              <li class="px-3 py-1.5 text-xs text-white/40 font-mono">
                +{{ project().techStack.length - 4 }}
              </li>
            }
          </ul>
        </div>

        <!-- Call to Action -->
        <div class="mt-10 flex items-center gap-x-6">
          <a
            [routerLink]="['/work', project().id]"
            class="group/link inline-flex items-center gap-2 text-sm font-bold text-white hover:text-accent transition-colors uppercase tracking-wide"
          >
            <span class="w-8 h-[1px] bg-current transition-all group-hover/link:w-12"></span>
            Read Case Study
          </a>
        </div>
      </div>
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectCardComponent {
  project = input.required<CaseStudy>();
  reverseLayout = input<boolean>(false);
}
