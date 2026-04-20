import { ChangeDetectionStrategy, Component, signal, inject, OnInit } from '@angular/core';
import { SectionHeader } from '../../../../shared/ui/section-header/section-header';
import { SeoService } from '../../../../shared/core/seo/seo.service';

interface FAQ {
  question: string;
  answer: string;
}

@Component({
  selector: 'app-faq',
  imports: [SectionHeader],
  templateUrl: './faq.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Faq implements OnInit {
  private seoService = inject(SeoService);

  faqs = signal<FAQ[]>([
    {
      question: 'Czym Twój system różni się od gotowego oprogramowania?',
      answer:
        'Główną różnicą jest brak dożywotniego abonamentu oraz pełna własność kodu i danych. Tradycyjne systemy SaaS to "wynajem" narzędzia, podczas gdy Scale Sail buduje dedykowane aktywo cyfrowe (Digital Asset) skrojone pod Twój konkretny proces biznesowy.',
    },
    {
      question: 'Czy ja i moi pracownicy poradzimy sobie z obsługą?',
      answer:
        'Tak, interfejs jest uproszczony do minimum i nie wymaga szkolenia technicznego. System projektuję w oparciu o zasady UX (User Experience) z bankowości, co oznacza, że obsługa zlecenia jest tak intuicyjna jak wysłanie przelewu w aplikacji mobilnej.',
    },
    {
      question: 'Czy moi klienci muszą coś instalować na telefonie?',
      answer:
        'Nie, klienci korzystają z przeglądarki internetowej bez konieczności pobierania aplikacji. Po otrzymaniu SMS-a z unikalnym tokenem bezpieczeństwa, klient otwiera "Panel Klienta", gdzie widzi status naprawy, dokumentację zdjęciową oraz wycenę w formacie PDF.',
    },
    {
      question: 'Ile to kosztuje? Czy są jakieś miesięczne opłaty?',
      answer:
        'Inwestycja jest jednorazowa i dotyczy wdrożenia systemu, przy braku opłat za każde stanowisko pracy. Stałe koszty techniczne są zredukowane do minimum (serwer i bramka SMS), co zazwyczaj oznacza oszczędność rzędu 80% w porównaniu do modeli subskrypcyjnych.',
    },
  ]);

  ngOnInit() {
    this.seoService.setFaqSchema(this.faqs());
  }
}
