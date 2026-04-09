import { Component, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeoService } from '../../shared/core/seo/seo.service';
import { BreadcrumbComponent } from '../../shared/ui/breadcrumb/breadcrumb';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [CommonModule, BreadcrumbComponent],
  template: `
    <div class="min-h-screen bg-neutral text-secondary pb-24 pt-32 sm:pt-40">
      <div class="layout-container">
        <app-breadcrumb />
        <h1 class="heading-1 mb-12">Polityka Prywatności</h1>

        <div
          class="max-w-3xl prose prose-slate prose-headings:text-secondary prose-p:text-secondary/80"
        >
          <p>Ostatnia aktualizacja: 9 kwietnia 2026</p>

          <h2>1. Informacje ogólne</h2>
          <p>
            Niniejsza Polityka Prywatności określa zasady przetwarzania i ochrony danych osobowych
            przekazywanych przez Użytkowników w związku z korzystaniem z serwisu Scale Sail Agency
            (dalej: "Serwis").
          </p>

          <h2>2. Administrator Danych</h2>
          <p>
            Administratorem danych osobowych zawartych w serwisie jest Scale Sail Agency, z siedzibą
            w Warszawie.
          </p>

          <h2>3. Zakres zbieranych danych</h2>
          <p>
            Serwis zbiera informacje dobrowolnie podane przez Użytkownika w formularzach
            kontaktowych (imię, adres e-mail, nazwa firmy) oraz dane zbierane automatycznie (pliki
            cookies) w celach analitycznych.
          </p>

          <h2>4. Cel przetwarzania danych</h2>
          <p>Dane osobowe przetwarzane są w celu:</p>
          <ul>
            <li>Obsługi zapytań przesłanych przez formularz kontaktowy.</li>
            <li>Realizacji usług oferowanych przez Serwis.</li>
            <li>Analizy ruchu na stronie (Google Analytics).</li>
          </ul>

          <h2>5. Prawa Użytkownika</h2>
          <p>
            Każdy Użytkownik ma prawo do wglądu w swoje dane, ich poprawiania, żądania zaprzestania
            przetwarzania danych oraz ich usunięcia.
          </p>

          <h2>6. Bezpieczeństwo</h2>
          <p>
            Dokładamy wszelkich starań, aby dane były przechowywane w sposób bezpieczny i chroniony
            przed dostępem osób niepowołanych. Stosujemy certyfikat SSL oraz nowoczesne standardy
            bezpieczeństwa (Jakość Bankowa).
          </p>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrivacyPolicy implements OnInit {
  private seoService = inject(SeoService);

  ngOnInit() {
    this.seoService.setPageMetadata({
      title: 'Polityka Prywatności | Scale Sail Agency',
      description:
        'Zasady przetwarzania danych osobowych i plików cookies w serwisie Scale Sail Agency.',
      slug: 'privacy-policy',
    });

    this.seoService.setBreadcrumbs([
      { name: 'Start', path: '/' },
      { name: 'Polityka Prywatności', path: '/privacy-policy' },
    ]);
  }
}
