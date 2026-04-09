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
    { name: 'Wszystkie Narzędzia', path: '/tools', fragment: undefined },
    { name: 'Generator Wycen PDF', path: '/tools/free-quote-generator', fragment: undefined },
    { name: 'Efekty i Realizacje', path: '/work', fragment: undefined },
    { name: 'Jak pomagam (Oferta)', path: '/', fragment: 'problem-solution' },
  ]);

  resources = signal([
    { name: 'Częste Pytania', path: '/', fragment: 'faq' },
    { name: 'Blog / Wiedza', path: '/blog', fragment: undefined },
    { name: 'O mnie', path: '/about', fragment: undefined },
    { name: 'Polityka Prywatności', path: '/privacy-policy', fragment: undefined },
  ]);

  connect = signal([
    { name: 'Darmowa Konsultacja', path: '/consultation', fragment: undefined },
    { name: 'Napisz do mnie', path: '/', fragment: 'contact' },
  ]);

  legal = signal<{ name: string; path: string; fragment?: string }[]>([]);

  private readonly viewportScroller = inject(ViewportScroller);

  scrollToTop(event: Event) {
    event.preventDefault();
    this.viewportScroller.scrollToPosition([0, 0]);
  }
}
