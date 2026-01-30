import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { BrandLogo } from '../../shared/ui/brand-logo/brand-logo';

@Component({
  selector: 'app-footer',
  imports: [BrandLogo],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {
  currentYear = new Date().getFullYear();

  services = signal([
    { name: 'SaaS Engineering', link: 'https://www.karol-modelski.scale-sail.io/services' },
    { name: 'Architecture Audits', link: 'https://www.karol-modelski.scale-sail.io/services' },
    { name: 'Scale Sail Templates', link: 'https://www.shop.scale-sail.io/' },
  ]);

  resources = signal([
    { name: 'Portfolio', link: 'https://www.karol-modelski.scale-sail.io' },
    { name: 'Engineering Blog', link: 'https://www.karol-modelski.scale-sail.io/blog' },
    { name: 'About', link: 'https://www.karol-modelski.scale-sail.io/about' },
  ]);

  connect = signal([
    { name: 'Book Discovery Call', link: 'https://www.karol-modelski.scale-sail.io/#contact' },
  ]);

  legal = signal<{ name: string; link: string }[]>([]);

  private readonly viewportScroller = inject(ViewportScroller);

  scrollToTop(event: Event) {
    event.preventDefault();
    this.viewportScroller.scrollToPosition([0, 0]);
  }
}
