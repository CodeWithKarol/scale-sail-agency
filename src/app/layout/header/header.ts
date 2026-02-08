import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  effect,
  inject,
  signal,
} from '@angular/core';
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
    {
      name: 'Strategy',
      children: [
        { name: 'Modernization', path: '/', fragment: 'services' },
        { name: 'Process', path: '/', fragment: 'process' },
        { name: 'Case Studies', path: '/work', fragment: undefined },
      ],
    },
    {
      name: 'Resources',
      children: [
        { name: 'Engineering Blog', path: '/blog', fragment: undefined },
        { name: 'FAQ', path: '/', fragment: 'faq' },
      ],
    },
    { name: 'About', path: '/about', fragment: undefined },
    { name: 'Contact', path: '/', fragment: 'contact' },
  ];

  openDropdown = signal<string | null>(null);
  private elementRef = inject(ElementRef);

  toggleDropdown(name: string) {
    this.openDropdown.update((current) => (current === name ? null : name));
  }

  closeDropdown() {
    this.openDropdown.set(null);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.closeDropdown();
    }
  }

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
