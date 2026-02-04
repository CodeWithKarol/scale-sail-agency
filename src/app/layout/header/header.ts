import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { CommonModule, DOCUMENT, ViewportScroller } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BrandLogo } from '../../shared/ui/brand-logo/brand-logo';
import { Button } from '../../shared/ui/button/button';
import { MobileMenu } from './components/mobile-menu/mobile-menu';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink, BrandLogo, Button, MobileMenu],
  templateUrl: './header.html',
  styleUrl: './header.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  mobileMenuOpen = signal(false);

  navigation = [
    { name: 'Services', href: '#services' },
    { name: 'Process', href: '#process' },
    { name: 'Work', href: '/work' },
    { name: 'Shop', href: '#shop' },
    { name: 'Blog', href: '/blog' },
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
  private readonly document = inject(DOCUMENT);

  constructor() {
    effect(() => {
      const isOpen = this.mobileMenuOpen();
      if (isOpen) {
        this.document.body.style.overflow = 'hidden';
      } else {
        this.document.body.style.overflow = '';
      }
    });
  }

  scrollToTop(event: Event) {
    event.preventDefault();
    this.viewportScroller.scrollToPosition([0, 0]);
  }
}
