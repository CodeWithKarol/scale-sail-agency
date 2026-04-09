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
        'Gotowe systemy (SaaS) są jak buty z sieciówki – niby pasują na każdego, ale często uwierają. Wymagają też opłacania dożywotniego abonamentu. Ja buduję dla Ciebie „system na wymiar”. Płacisz raz za wdrożenie, a narzędzie staje się Twoją własnością. Jest proste, pancerne i zawiera dokładnie to, czego używasz w codziennej pracy.',
    },
    {
      question: 'Czy ja i moi pracownicy poradzimy sobie z obsługą?',
      answer:
        'Tak. Projektuję aplikacje tak, aby były prostsze niż wysłanie SMS-a. Nie ma tu zbędnych przycisków ani skomplikowanych tabel. Jeśli potrafisz obsługiwać Facebooka lub bankowość w telefonie, poradzisz sobie bez problemu od pierwszego dnia.',
    },
    {
      question: 'Czy moi klienci muszą coś instalować na telefonie?',
      answer:
        'Nie. Klient dostaje od Ciebie zwykły link w wiadomości SMS. Klika go i od razu widzi status swojego zlecenia w przeglądarce. Zero haseł, zero zakładania kont, zero instalowania aplikacji.',
    },
    {
      question: 'Czy to zadziała na moim telefonie/tablecie?',
      answer:
        'Tak, aplikacja działa na każdym urządzeniu z dostępem do internetu. Możesz z niej korzystać na komputerze w biurze i na telefonie, gdy jesteś pod samochodem lub u klienta. Wszystkie dane synchronizują się natychmiast.',
    },
    {
      question: 'Ile czasu trwa wdrożenie takiego systemu?',
      answer:
        'Start „cyfrowego silnika” Twojej firmy zajmuje zazwyczaj od 7 do 14 dni. Pracujemy etapami, abyś jak najszybciej odczuł różnicę w pracy, nie blokując przy tym codziennych napraw.',
    },
    {
      question: 'Ile to kosztuje? Czy są jakieś miesięczne opłaty?',
      answer:
        'Stosuję prosty model: płacisz raz za przygotowanie i wdrożenie systemu na własność.<br><br>Pracuję w trzech pakietach:<br>– <strong>Fundament</strong> – cyfrowa baza zleceń i SMS‑y: <strong>7 000–9 000 zł netto</strong><br>– <strong>Optymalny</strong> – pełna automatyzacja i kalendarz: <strong>11 000–16 000 zł netto</strong><br>– <strong>Dedykowany</strong> – system zintegrowany z AI i hurtowniami: od <strong>17 000 zł netto wzwyż</strong>.<br><br>Potem ponosisz jedynie minimalne koszty techniczne (serwer/SMS) – zwykle kilkadziesiąt złotych miesięcznie.',
    },
    {
      question: 'Czy po wdrożeniu mogę liczyć na dalszą opiekę i rozwój?',
      answer:
        'Tak. Po wdrożeniu proponuję opcjonalny pakiet <strong>Opieki i Rozwoju</strong> (zwykle 800–1 500 zł netto miesięcznie). W jego ramach dbam o bezpieczeństwo danych, monitoruję system i wprowadzam mikro-usprawnienia na Twoje życzenie. Dzięki temu Twój „silnik” zawsze pracuje na najwyższych obrotach.',
    },
    {
      question: 'Mam już swoje dane w Excelu. Czy da się je przenieść?',
      answer:
        'Oczywiście. Pomagam przenieść bazę klientów i historię napraw z Excela lub papierowych notatek do nowej aplikacji, żebyś nie musiał zaczynać od zera.',
    },
    {
      question: 'Czy system obsłuży kilka stanowisk i różnych pracowników?',
      answer:
        'Oczywiście. Możesz przypisywać zadania do konkretnych stanowisk roboczych i mechaników. Każdy pracownik może mieć podgląd tylko na swoje zlecenia, a Ty widzisz całą kolejkę warsztatu z góry.',
    },
  ]);

  ngOnInit() {
    this.seoService.setFaqSchema(this.faqs());
  }
}
