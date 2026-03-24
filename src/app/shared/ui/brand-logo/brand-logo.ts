import { ChangeDetectionStrategy, Component, inject, output, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-brand-logo',
  imports: [RouterLink],
  template: `
    <a routerLink="/" (click)="onScrollToTop()" class="-m-1.5 p-1.5 flex items-center gap-5 group">
      <div class="relative">
        <!-- Logo Image - Increased size -->
        <img
          src="images/scale-sail-logo.webp"
          alt="Scale Sail Logo"
          [attr.loading]="loading()"
          fetchpriority="high"
          width="48"
          height="48"
          class="h-12 w-12 rounded-none bg-white border-2 border-secondary/10 p-1.5 transition-all duration-300 group-hover:border-primary shadow-sm"
        />
        <!-- Industrial Corner accents (Adjusted for larger size) -->
        <div
          class="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-secondary/20 group-hover:border-primary transition-colors"
        ></div>
        <div
          class="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-secondary/20 group-hover:border-primary transition-colors"
        ></div>
      </div>

      <div class="flex flex-col whitespace-nowrap">
        <!-- Brand Name - Increased weight and size -->
        <span
          class="text-xl font-mono font-black leading-none text-secondary uppercase tracking-tight group-hover:text-primary transition-colors"
        >
          Scale Sail
        </span>
        <!-- Subtitle - Improved readability -->
        <span
          class="text-[10px] font-mono text-secondary/40 font-black leading-none tracking-[0.3em] mt-2 group-hover:text-secondary/60 uppercase"
        >
          Systemy dla firm
        </span>
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
