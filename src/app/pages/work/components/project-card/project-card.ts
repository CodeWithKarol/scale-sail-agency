import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CaseStudy } from '../../../../shared/domain/portfolio/portfolio.service';
import { Button } from '../../../../shared/ui/button/button';
import { LucideAngularModule, ArrowRight } from 'lucide-angular';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule, RouterLink, Button, LucideAngularModule],
  template: `
    <article
      class="group/card relative isolate flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-24"
    >
      <!-- Image Section (Industrial Frame) -->
      <div class="w-full lg:w-1/2 lg:shrink-0 relative" [class.lg:order-last]="reverseLayout()">
        <div
          class="group relative aspect-[16/9] w-full overflow-hidden bg-white border-2 border-secondary/10 p-1 sm:p-2 transition-all duration-500 hover:border-primary group-hover:shadow-[12px_12px_0px_0px_rgba(10,31,68,0.05)]"
        >
          <img
            [src]="
              project().heroImage ||
              'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80'
            "
            [alt]="
              project().title +
              ' - system warsztatowy bez abonamentu - panel zarządzania zleceniami'
            "
            width="800"
            height="450"
            class="absolute inset-1 sm:inset-2 h-[calc(100%-0.5rem)] sm:h-[calc(100%-1rem)] w-[calc(100%-0.5rem)] sm:w-[calc(100%-1rem)] object-cover object-top grayscale transition duration-700 group-hover/card:grayscale-0 group-hover/card:scale-105"
          />

          <a
            [routerLink]="['/system-dla-warsztatu', project().id]"
            class="absolute inset-0 focus:outline-none z-20"
            tabindex="-1"
          >
            <span class="sr-only">Zobacz Szczegóły</span>
          </a>
        </div>
      </div>

      <!-- Content Section -->
      <div class="w-full lg:w-1/2 flex flex-col justify-center">
        <div class="flex items-center gap-x-6 mb-10">
          <div class="status-badge ring-4 ring-secondary/5">REALIZACJA</div>
          <div class="h-px flex-1 bg-secondary/10"></div>
        </div>

        <div class="group relative max-w-xl">
          <h3
            class="heading-2 text-secondary group-hover:text-primary transition-colors duration-300"
          >
            <a [routerLink]="['/system-dla-warsztatu', project().id]">
              <span class="absolute inset-0"></span>
              {{ project().title }}
            </a>
          </h3>
          <p
            class="mt-8 text-body sm:text-lg text-secondary/70 border-l-8 border-primary/10 pl-8 italic"
          >
            {{ project().tagline }}
          </p>
        </div>

        <!-- Tech Stack Tags (Industrial Style) -->
        <div class="mt-12">
          <div class="text-small text-secondary/30 mb-6">GŁÓWNE CECHY PROJEKTU</div>
          <ul class="flex flex-col gap-3 list-none p-0">
            @for (tech of project().techStack.slice(0, 4); track tech) {
              <li
                class="px-4 py-2 bg-neutral border border-secondary/10 text-small hover:border-primary hover:text-primary transition-all cursor-default"
              >
                {{ tech }}
              </li>
            }
            @if (project().techStack.length > 4) {
              <li class="px-4 py-2 text-small text-secondary/30">
                +{{ project().techStack.length - 4 }} WIĘCEJ
              </li>
            }
          </ul>
        </div>

        <!-- Call to Action -->
        <div class="mt-16 flex items-center gap-x-6">
          <app-button
            [route]="['/system-dla-warsztatu', project().id]"
            variant="secondary"
            size="lg"
            class="group/link"
          >
            <span class="flex items-center gap-4">
              POKAŻ SZCZEGÓŁY
              <lucide-icon
                [img]="icons.ArrowRight"
                size="20"
                class="transition-transform group-hover/link:translate-x-2"
              ></lucide-icon>
            </span>
          </app-button>
        </div>
      </div>
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectCardComponent {
  project = input.required<CaseStudy>();
  reverseLayout = input<boolean>(false);
  readonly icons = { ArrowRight };
}
