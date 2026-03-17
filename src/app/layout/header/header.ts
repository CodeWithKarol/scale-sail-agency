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
      name: 'Oferta',
      children: [
        { name: 'Jak działamy', path: '/', fragment: 'process' },
        { name: 'Realizacje', path: '/work', fragment: undefined },
        { name: 'Częste pytania', path: '/', fragment: 'faq' },
      ],
    },
    {
      name: 'Wiedza',
      children: [
        { name: 'Blog / Porady', path: '/blog', fragment: undefined },
      ],
    },
    { name: 'O mnie', path: '/about', fragment: undefined },
    { name: 'Kontakt', path: '/', fragment: 'contact' },
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
