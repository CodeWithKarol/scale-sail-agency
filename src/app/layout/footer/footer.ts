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
    { name: 'Architecture Audit', path: '/', fragment: 'services' },
    { name: 'Modernization Sprints', path: '/', fragment: 'services' },
    { name: 'Retainer & Advisory', path: '/', fragment: 'services' },
    { name: 'Engineering Strategy', path: '/', fragment: 'process' },
  ]);

  resources = signal([
    { name: 'Case Studies', path: '/work', fragment: undefined },
    { name: 'Engineering Blog', path: '/blog', fragment: undefined },
    { name: 'About Scale Sail', path: '/about', fragment: undefined },
  ]);

  connect = signal([
    { name: 'Schedule Strategy Session', path: '/', fragment: 'contact' },
    {
      name: 'Small Gigs & Fixes',
      path: 'https://www.karol-modelski.scale-sail.io',
      fragment: undefined,
    },
    { name: 'Email Direct', path: '/', fragment: 'contact' },
  ]);

  legal = signal<{ name: string; path: string; fragment?: string }[]>([]);

  private readonly viewportScroller = inject(ViewportScroller);

  scrollToTop(event: Event) {
    event.preventDefault();
    this.viewportScroller.scrollToPosition([0, 0]);
  }
}
