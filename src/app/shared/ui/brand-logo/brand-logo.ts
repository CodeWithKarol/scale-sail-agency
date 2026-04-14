import { ChangeDetectionStrategy, Component, inject, output, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-brand-logo',
  imports: [RouterLink],
  template: `
    <a routerLink="/" (click)="onScrollToTop()" class="-m-1.5 p-1.5 flex items-center gap-3 group">
      <div class="relative w-12 h-12 flex items-center justify-center shrink-0">
        <!-- Logo Image -->
        <img
          src="images/scale-sail-logo.webp"
          alt="Scale Sail Agency - Pancerne systemy dla warsztatów bez abonamentu"
          [attr.loading]="loading()"
          fetchpriority="high"
          width="40"
          height="40"
          class="h-10 w-10 rounded-none object-contain transition-all duration-300"
        />
        <!-- Industrial Corner accents - Fixed alignment -->
        <div
          class="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-primary/40 group-hover:border-primary transition-colors"
        ></div>
        <div
          class="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-primary/40 group-hover:border-primary transition-colors"
        ></div>
      </div>

      <div class="flex flex-col whitespace-nowrap">
        <!-- Brand Name -->
        <span
          class="text-base sm:text-xl xl:text-2xl font-mono font-black leading-none text-secondary uppercase tracking-tight group-hover:text-primary transition-colors"
        >
          Scale Sail
        </span>
        <!-- Subtitle -->
        <span
          class="hidden sm:block text-[8px] xl:text-[10px] font-mono text-secondary/40 font-black leading-none tracking-[0.2em] xl:tracking-[0.3em] mt-1.5 xl:mt-2 group-hover:text-secondary/60 uppercase"
        >
          Automatyzacja Zleceń
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
