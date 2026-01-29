import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule, ViewportScroller } from '@angular/common';
import { BrandLogo } from '../../shared/ui/brand-logo/brand-logo';
import { Button } from '../../shared/ui/button/button';
import { MobileMenu } from './components/mobile-menu/mobile-menu';

@Component({
  selector: 'app-header',
  imports: [CommonModule, BrandLogo, Button, MobileMenu],
  templateUrl: './header.html',
  styleUrl: './header.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  mobileMenuOpen = signal(false);

  navigation = [
    { name: 'Services', href: '#services' },
    { name: 'Process', href: '#process' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Shop', href: '#shop' },
    { name: 'Blog', href: '#blog-link' },
    { name: 'About', href: '#about' },
    { name: 'FAQ', href: '#faq' },
  ];

  toggleMobileMenu() {
    this.mobileMenuOpen.update((open) => !open);
  }

  closeMobileMenu() {
    this.mobileMenuOpen.set(false);
  }

  private readonly viewportScroller = inject(ViewportScroller);

  scrollToTop(event: Event) {
    event.preventDefault();
    this.viewportScroller.scrollToPosition([0, 0]);
  }
}
