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
    { name: 'Dla Warsztatów', path: '/', fragment: 'workshop-pro' },
    { name: 'Systemy Usługowe', path: '/', fragment: 'service-flow' },
    { name: 'Aplikacje Dedykowane', path: '/', fragment: 'contact' },
    { name: 'Automatyzacja SMS', path: '/', fragment: 'service-architecture' },
  ]);

  resources = signal([
    { name: 'Realizacje', path: '/work', fragment: undefined },
    { name: 'Blog / Porady', path: '/blog', fragment: undefined },
    { name: 'O agencji', path: '/about', fragment: undefined },
  ]);

  connect = signal([
    { name: 'Napisz do mnie', path: '/', fragment: 'contact' },
    {
      name: 'Sklep Gumroad',
      path: 'https://karolmodelski.gumroad.com',
      fragment: undefined,
    },
    { name: 'LinkedIn', path: 'https://linkedin.com', fragment: undefined },
  ]);

  legal = signal<{ name: string; path: string; fragment?: string }[]>([]);

  private readonly viewportScroller = inject(ViewportScroller);

  scrollToTop(event: Event) {
    event.preventDefault();
    this.viewportScroller.scrollToPosition([0, 0]);
  }
}
