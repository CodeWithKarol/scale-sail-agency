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
        'Płacisz raz za wdrożenie, a system staje się Twoją własnością bez dożywotniego abonamentu. Jest zbudowany na wymiar – zawiera tylko to, czego realnie używasz, bez zbędnych bajerów, które utrudniają pracę.',
    },
    {
      question: 'Czy ja i moi pracownicy poradzimy sobie z obsługą?',
      answer:
        'Tak. Projektuję aplikacje tak, aby były prostsze niż wysłanie SMS-a. Jeśli potrafisz obsługiwać Facebooka lub bankowość w telefonie, poradzisz sobie bez problemu od pierwszego dnia.',
    },
    {
      question: 'Czy moi klienci muszą coś instalować na telefonie?',
      answer:
        'Nie. Klient dostaje od Ciebie link w wiadomości SMS. Klika go i od razu widzi status naprawy w przeglądarce. Zero haseł, zero zakładania kont.',
    },
    {
      question: 'Ile to kosztuje? Czy są jakieś miesięczne opłaty?',
      answer:
        'Płacisz za wdrożenie systemu na własność. Potem ponosisz jedynie minimalne koszty techniczne (serwer/SMS) – zwykle kilkadziesiąt złotych miesięcznie. Koniec z „podatkiem od sukcesu” za każde stanowisko.',
    },
  ]);

  ngOnInit() {
    this.seoService.setFaqSchema(this.faqs());
  }
}
