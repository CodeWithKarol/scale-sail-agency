import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BrandLogo } from '../../shared/ui/brand-logo/brand-logo';

@Component({
  selector: 'app-footer',
  imports: [BrandLogo, RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {
  currentYear = new Date().getFullYear();

  services = signal([
    { name: 'Jak pomagam', path: '/', fragment: 'problem-solution' },
    { name: 'Jak pracuję', path: '/', fragment: 'process' },
    { name: 'Częste pytania', path: '/', fragment: 'faq' },
    { name: 'Realizacje', path: '/work', fragment: undefined },
  ]);

  resources = signal([
    { name: 'Blog / Porady', path: '/blog', fragment: undefined },
    { name: 'O mnie', path: '/about', fragment: undefined },
  ]);

  connect = signal([{ name: 'Napisz do mnie', path: '/', fragment: 'contact' }]);

  legal = signal<{ name: string; path: string; fragment?: string }[]>([]);

  private readonly viewportScroller = inject(ViewportScroller);

  scrollToTop(event: Event) {
    event.preventDefault();
    this.viewportScroller.scrollToPosition([0, 0]);
  }
}
