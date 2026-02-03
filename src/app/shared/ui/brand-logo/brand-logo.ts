import { ChangeDetectionStrategy, Component, inject, output, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-brand-logo',
  imports: [RouterLink],
  template: `
    <a routerLink="/" (click)="onScrollToTop()" class="-m-1.5 p-1.5 flex items-center gap-3 group">
      <img
        src="images/scale-sail-logo.webp"
        alt="Scale Sail Logo"
        [attr.loading]="loading()"
        width="32"
        height="32"
        class="h-8 w-8 rounded-lg bg-white p-1 shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-all duration-300 group-hover:scale-105"
      />
      <span
        class="text-sm font-bold leading-6 text-white group-hover:text-primary transition-colors"
      >
        Scale Sail
      </span>
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
