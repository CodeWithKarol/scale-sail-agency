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
        class="inline-flex items-center bg-neutral border-2 border-secondary/10 px-5 py-2.5 mb-16 animate-in fade-in slide-in-from-left-2 duration-500"
      >
        <ol class="flex flex-wrap items-center gap-4">
          @for (item of breadcrumbs(); track item.path; let last = $last; let index = $index) {
            <li class="flex items-center gap-4">
              @if (!last) {
                <a
                  [routerLink]="item.path"
                  class="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-secondary/40 hover:text-primary transition-all flex items-center gap-2 group"
                >
                  <span class="text-secondary/20">0{{ index + 1 }}</span>
                  <span class="border-b border-transparent group-hover:border-primary">{{
                    item.name
                  }}</span>
                </a>
                <span class="text-secondary/10 font-mono text-[10px]" aria-hidden="true">//</span>
              } @else {
                <div
                  class="flex items-center gap-2 font-mono text-[10px] font-black uppercase tracking-[0.2em]"
                >
                  <span class="text-secondary/20">0{{ index + 1 }}</span>
                  <span class="text-secondary" aria-current="page">
                    {{ item.name }}
                  </span>
                </div>
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
