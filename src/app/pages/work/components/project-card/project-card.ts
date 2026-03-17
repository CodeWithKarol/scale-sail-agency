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
        <div
          class="group relative aspect-[16/9] w-full overflow-hidden bg-slate-900 border border-slate-800 transition-all duration-500 hover:border-primary/40 shadow-2xl"
        >
          <img
            [src]="
              project().heroImage ||
              'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80'
            "
            [alt]="project().title + ' - podgląd'"
            width="800"
            height="450"
            class="absolute inset-0 h-full w-full object-cover object-top transition duration-700 group-hover/card:scale-105"
          />

          <a
            [routerLink]="['/work', project().id]"
            class="absolute inset-0 focus:outline-none z-20"
            tabindex="-1"
          >
            <span class="sr-only">Zobacz Szczegóły</span>
          </a>
        </div>
      </div>

      <!-- Content Section -->
      <div class="w-full lg:w-1/2 flex flex-col justify-center">
        <div class="flex items-center gap-x-4 mb-8">
          <div
            class="flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 text-primary text-[10px] font-black tracking-widest uppercase rounded-sm"
          >
            REALIZACJA
          </div>
          <div class="h-px flex-1 bg-slate-800"></div>
        </div>

        <div class="group relative max-w-xl">
          <h3 class="heading-2 text-white font-extrabold tracking-tight">
            <a
              [routerLink]="['/work', project().id]"
              class="hover:text-primary transition-colors duration-300"
            >
              <span class="absolute inset-0"></span>
              {{ project().title }}
            </a>
          </h3>
          <p
            class="mt-6 text-lg leading-relaxed text-slate-400 font-light border-l-4 border-primary/20 pl-6"
          >
            {{ project().tagline }}
          </p>
        </div>

        <!-- Tech Stack Tags -->
        <div class="mt-10">
          <div class="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] mb-4">
            Główne cechy projektu
          </div>
          <ul class="flex flex-wrap gap-2 list-none p-0">
            @for (tech of project().techStack.slice(0, 4); track tech) {
              <li
                class="px-3 py-1.5 bg-slate-800 border border-slate-700 text-[10px] text-slate-300 font-bold uppercase tracking-wider hover:bg-slate-700 hover:border-primary transition-colors cursor-default rounded-sm"
              >
                {{ tech }}
              </li>
            }
            @if (project().techStack.length > 4) {
              <li class="px-3 py-1.5 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                +{{ project().techStack.length - 4 }} WIĘCEJ
              </li>
            }
          </ul>
        </div>

        <!-- Call to Action -->
        <div class="mt-12 flex items-center gap-x-6">
          <a
            [routerLink]="['/work', project().id]"
            class="group/link inline-flex items-center gap-3 text-xs font-black text-white hover:text-primary transition-colors uppercase tracking-[0.2em]"
          >
            Czytaj więcej
            <span class="h-px w-12 bg-slate-700 transition-all group-hover/link:w-16 group-hover:bg-primary"></span>
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
