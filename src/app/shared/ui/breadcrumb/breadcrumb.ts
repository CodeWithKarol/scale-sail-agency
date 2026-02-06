import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/seo/seo.service';

@Component({
  selector: 'app-breadcrumb',
  imports: [RouterLink],
  template: `
    @if (breadcrumbs().length > 1) {
      <nav
        aria-label="Breadcrumb"
        class="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-8 animate-in fade-in slide-in-from-left-2 duration-500"
      >
        <ol class="flex flex-wrap items-center gap-2">
          @for (item of breadcrumbs(); track item.path; let last = $last) {
            <li class="flex items-center gap-2">
              @if (!last) {
                <a
                  [routerLink]="item.path"
                  class="hover:text-primary transition-colors hover:underline decoration-primary/50 underline-offset-4"
                >
                  {{ item.name }}
                </a>
                <span class="text-white/20" aria-hidden="true">/</span>
              } @else {
                <span class="text-primary/80" aria-current="page">
                  {{ item.name }}
                </span>
              }
            </li>
          }
        </ol>
      </nav>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbComponent {
  private seoService = inject(SeoService);
  breadcrumbs = this.seoService.breadcrumbs;
}
