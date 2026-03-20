import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  effect,
  inject,
  signal,
} from '@angular/core';
import { CommonModule, DOCUMENT, ViewportScroller } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { BrandLogo } from '../../shared/ui/brand-logo/brand-logo';
import { Button } from '../../shared/ui/button/button';
import { MobileMenu } from './components/mobile-menu/mobile-menu';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink, BrandLogo, Button, MobileMenu],
  templateUrl: './header.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  private readonly document = inject(DOCUMENT);
  private readonly viewportScroller = inject(ViewportScroller);
  private readonly router = inject(Router);

  mobileMenuOpen = signal(false);
  scrolled = signal(false);

  // Flat navigation structure for better UX and speed
  readonly navigation = [
    { name: 'Realizacje', path: '/work' },
    { name: 'Jak pomagam', path: '/', fragment: 'problem-solution' },
    { name: 'Cennik', path: '/', fragment: 'pricing' },
    { name: 'Pytania', path: '/', fragment: 'faq' },
    { name: 'Wiedza', path: '/blog' },
    { name: 'O mnie', path: '/about' },
  ];

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.scrolled.set(window.scrollY > 20);
  }

  toggleMobileMenu() {
    this.mobileMenuOpen.update((v) => !v);
  }

  closeMobileMenu() {
    this.mobileMenuOpen.set(false);
  }

  constructor() {
    // Handle body scroll locking
    effect(() => {
      if (this.mobileMenuOpen()) {
        this.document.body.style.overflow = 'hidden';
      } else {
        this.document.body.style.overflow = '';
      }
    });
  }
}
