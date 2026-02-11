import { ChangeDetectionStrategy, Component, inject, output, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-brand-logo',
  imports: [RouterLink],
  template: `
    <a routerLink="/" (click)="onScrollToTop()" class="-m-1.5 p-1.5 flex items-center gap-3 group">
      <div class="relative">
        <img
          src="images/scale-sail-logo.webp"
          alt="Scale Sail Logo"
          [attr.loading]="loading()"
          fetchpriority="high"
          width="32"
          height="32"
          class="h-8 w-8 rounded-sm bg-white border border-white/20 p-0.5 shadow-lg shadow-primary/10 group-hover:shadow-primary/30 group-hover:border-primary/50 transition-all duration-300"
        />
        <!-- Corner accents -->
        <div
          class="absolute -top-0.5 -left-0.5 w-1.5 h-1.5 border-t border-l border-white/30 group-hover:border-primary transition-colors"
        ></div>
        <div
          class="absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 border-b border-r border-white/30 group-hover:border-primary transition-colors"
        ></div>
      </div>

      <div class="flex flex-col">
        <span
          class="text-sm font-mono font-bold leading-none text-white uppercase tracking-wider group-hover:text-primary transition-colors"
        >
          Scale_Sail
        </span>
        <span
          class="text-[9px] font-mono text-white/30 leading-none tracking-[0.2em] mt-1 group-hover:text-white/50"
          >AGENCY_SYSTEMS</span
        >
      </div>
    </a>
  `,
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrandLogo {
  private readonly viewportScroller = inject(ViewportScroller);
  scrollToTop = output<void>();
  loading = input<'eager' | 'lazy'>('eager');

  onScrollToTop() {
    this.viewportScroller.scrollToPosition([0, 0]);
    this.scrollToTop.emit();
  }
}
