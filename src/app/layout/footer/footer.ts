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
    { name: 'System dla warsztatu', path: '/system-dla-warsztatu', fragment: undefined },
    { name: 'Narzędzia dla warsztatu', path: '/narzedzia', fragment: undefined },
    { name: 'Cennik bez abonamentu', path: '/cennik', fragment: undefined },
  ]);

  resources = signal([
    { name: 'Wiedza', path: '/wiedza-dla-warsztatu', fragment: undefined },
    { name: 'Częste Pytania', path: '/', fragment: 'faq' },
    { name: 'O mnie', path: '/o-mnie', fragment: undefined },
    { name: 'Polityka Prywatności', path: '/polityka-prywatnosci', fragment: undefined },
  ]);

  connect = signal([
    { name: 'Darmowa Konsultacja', path: '/konsultacja', fragment: undefined },
    { name: 'Napisz do mnie', path: '/', fragment: 'contact' },
  ]);

  legal = signal<{ name: string; path: string; fragment?: string }[]>([]);

  private readonly viewportScroller = inject(ViewportScroller);

  scrollToTop(event: Event) {
    event.preventDefault();
    this.viewportScroller.scrollToPosition([0, 0]);
  }
}
