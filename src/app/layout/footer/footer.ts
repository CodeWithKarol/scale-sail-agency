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
    { name: 'Enterprise Angular', path: '/', fragment: 'services' },
    { name: 'SaaS Engineering', path: '/', fragment: 'services' },
    { name: 'Performance Audits', path: '/', fragment: 'services' },
    { name: 'Migration Process', path: '/', fragment: 'process' },
  ]);

  resources = signal([
    { name: 'Angular Patterns', path: '/work', fragment: undefined },
    { name: 'Engineering Blog', path: '/blog', fragment: undefined },
    { name: 'About', path: '/about', fragment: undefined },
  ]);

  connect = signal([
    { name: 'Book Discovery Call', path: '/', fragment: 'contact' },
    { name: 'Contact', path: '/', fragment: 'contact' },
  ]);

  legal = signal<{ name: string; path: string; fragment?: string }[]>([]);

  private readonly viewportScroller = inject(ViewportScroller);

  scrollToTop(event: Event) {
    event.preventDefault();
    this.viewportScroller.scrollToPosition([0, 0]);
  }
}
