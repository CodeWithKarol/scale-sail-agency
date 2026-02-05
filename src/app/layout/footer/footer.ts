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
    { name: 'SaaS Engineering', link: '/#services' },
    { name: 'Architecture Audits', link: '/#services' },
    { name: 'Scale Sail Templates', link: '/shop' },
  ]);

  resources = signal([
    { name: 'Portfolio', link: '/work' },
    { name: 'Engineering Blog', link: '/blog' },
    { name: 'About', link: '/#about' },
  ]);

  connect = signal([{ name: 'Book Discovery Call', link: '/#contact' }]);

  legal = signal<{ name: string; link: string }[]>([]);

  private readonly viewportScroller = inject(ViewportScroller);

  scrollToTop(event: Event) {
    event.preventDefault();
    this.viewportScroller.scrollToPosition([0, 0]);
  }
}
