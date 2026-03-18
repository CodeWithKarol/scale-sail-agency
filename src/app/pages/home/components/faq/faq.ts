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
      question: 'Czym Twój system różni się od gotowego oprogramowania dla warsztatu?',
      answer:
        'Gotowe systemy często są przeładowane funkcjami, których nie potrzebujesz, i wymagają opłacania dożywotniego abonamentu. Ja buduję dedykowaną aplikację dla Twojej firmy na własność – płacisz raz za wdrożenie, a system jest prosty, szybki i zawiera dokładnie to, czego używasz w codziennej pracy.',
    },
    {
      question: 'Czy ja i moi pracownicy poradzimy sobie z obsługą?',
      answer:
        'Tak. Projektuję aplikacje tak, aby były prostsze niż wysłanie SMS-a. Nie ma tu zbędnych przycisków ani skomplikowanych tabel. Jeśli potrafisz obsługiwać Facebooka lub bankowość w telefonie, poradzisz sobie bez problemu.',
    },
    {
      question: 'Czy moi klienci muszą coś instalować na telefonie?',
      answer:
        'Nie. Klient dostaje od Ciebie zwykły link w wiadomości SMS. Klika go i od razu widzi status swojego zlecenia w przeglądarce. Zero haseł, zero zakładania kont, zero instalowania czegokolwiek.',
    },
    {
      question: 'Czy to zadziała na moim telefonie/tablecie?',
      answer:
        'Tak, aplikacja działa na każdym urządzeniu z dostępem do internetu – od najnowszego iPhone’a po starsze telefony z Androidem. Możesz z niej korzystać na komputerze w biurze i na telefonie, gdy jesteś pod samochodem lub u klienta.',
    },
    {
      question: 'Ile czasu trwa wdrożenie takiego systemu?',
      answer:
        'Proste systemy (np. dla warsztatu) uruchamiam zazwyczaj w 7-14 dni. Moim celem jest, abyś jak najszybciej odczuł ulgę i przestał marnować czas na telefony.',
    },
    {
      question: 'Ile to kosztuje? Czy są jakieś miesięczne opłaty?',
      answer:
        'Stosuję prosty model: płacisz raz za przygotowanie i wdrożenie systemu (zazwyczaj od 1500 zł netto). Potem ponosisz jedynie minimalne koszty utrzymania serwera i wysyłki SMS-ów (kilkadziesiąt złotych miesięcznie). Jeśli kiedyś będziesz chciał dalej rozwijać system, możemy umówić się na prosty miesięczny abonament za opiekę – ale nie jest on wymagany, żeby system działał.',
    },
    {
      question: 'Mam już swoje dane w Excelu. Czy da się je przenieść?',
      answer:
        'Oczywiście. Pomagam przenieść bazę klientów i historię zleceń z Excela lub kartek do nowej aplikacji, żebyś nie musiał zaczynać od zera.',
    },
  ]);

  ngOnInit() {
    this.seoService.setFaqSchema(this.faqs());
  }
}
