import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  services = signal([
    { name: 'SaaS Engineering', link: 'https://www.karol-modelski.scale-sail.io/services' },
    { name: 'Architecture Audits', link: 'https://www.karol-modelski.scale-sail.io/services' },
    { name: 'Scale Sail Templates', link: 'https://www.shop.scale-sail.io/' },
  ]);

  resources = signal([
    { name: 'Portfolio', link: 'https://www.karol-modelski.scale-sail.io/portfolio' },
    { name: 'Engineering Blog', link: 'https://www.karol-modelski.scale-sail.io/blog' },
    { name: 'About', link: 'https://www.karol-modelski.scale-sail.io/about' },
  ]);

  connect = signal([
    { name: 'Book Discovery Call', link: 'https://www.karol-modelski.scale-sail.io/contact' },
  ]);

  legal = signal<{ name: string; link: string }[]>([]);

  scrollToTop(event: Event) {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
