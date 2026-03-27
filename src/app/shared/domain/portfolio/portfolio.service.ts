import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface Screenshot {
  url: string;
  description: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  tagline: string;
  heroImage: string;
  challenge: string;
  solution: string;
  technicalApproach: string;
  results: string[];
  techStack: string[];
  screenshots: (string | Screenshot)[];
  demoUrl?: string;
  repoUrl?: string;
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'admin-panel',
    title: 'Jak ogarnąć 50 000 danych bez zacięcia',
    tagline:
      'Lekcje z dużych systemów korporacyjnych przełożone na proste narzędzia dla małych firm usługowych.',
    heroImage: '/images/admin-panel/admin-panel.webp',
    challenge:
      'Systemy dla dużych firm często stają się powolne i trudne w obsłudze przy dużej ilości danych. Klient potrzebował rozwiązania, które pozwoli błyskawicznie zarządzać tysiącami operacji bez błędów i opóźnień.',
    solution:
      'Zbudowałem nowoczesną aplikację, która natychmiast reaguje na zmiany danych. Wykorzystałem technologie, które gwarantują, że interfejs jest zawsze aktualny i czytelny, niezależnie od skali biznesu.',
    technicalApproach:
      'System jest zbudowany tak, żeby odświeżać tylko te elementy ekranu, które faktycznie się zmieniają – dzięki temu działa lekko, szybko i nie „mieli” przy większej ilości danych. Użytkownik widzi zawsze aktualne informacje, bez opóźnień i bez ręcznego odświeżania. To podejście gwarantuje, że panel Twojej firmy będzie działał bezawaryjnie nawet przy bardzo dużej liczbie aktywnych zleceń. (Pod spodem wykorzystuję m.in. Angular Signals, ale dla Ciebie ważne jest po prostu to, że wszystko działa płynnie).',
    results: [
      'Wydajność: Obsługa ponad 50 000 aktualizacji danych na sekundę bez zacięć',
      'Stabilność: System odporny na błędy dzięki rygorystycznym testom automatycznym',
      'Przejrzystość: Intuicyjny panel, który nie wymaga szkolenia pracowników',
    ],
    techStack: [
      'Najważniejsze liczby biznesowe na jednym ekranie',
      'Dane odświeżane na bieżąco (bez ręcznego odświeżania)',
      'Czytelny podgląd tego, co dzieje się w firmie dziś i w najbliższych dniach',
      'Układ, który łatwo dostosować pod konkretną branżę',
    ],
    screenshots: [
      {
        url: '/images/admin-panel/admin-panel-1.webp',
        description:
          'Główny dashboard: Agregacja kluczowych wskaźników biznesowych w czasie rzeczywistym.',
      },
      {
        url: '/images/admin-panel/admin-panel-2.webp',
        description:
          'Zaawansowane filtrowanie: Błyskawiczne wyszukiwanie w zbiorze ponad 50 000 rekordów.',
      },
      {
        url: '/images/admin-panel/admin-panel-3.webp',
        description: 'Widok kalendarza: Intuicyjne zarządzanie harmonogramem i zasobami firmy.',
      },
      {
        url: '/images/admin-panel/admin-panel-4.webp',
        description: 'Szczegóły operacji: Pełna historia i śledzenie zmian dla każdego zlecenia.',
      },
      {
        url: '/images/admin-panel/admin-panel-5.webp',
        description: 'Raporty i analityka: Automatyczne generowanie zestawień finansowych.',
      },
      {
        url: '/images/admin-panel/admin-panel-6.webp',
        description:
          'Tryb ciemny: Zoptymalizowany interfejs zapewniający komfort pracy przy słabym oświetleniu.',
      },
      {
        url: '/images/admin-panel/admin-panel-7.webp',
        description: 'Zarządzanie użytkownikami: Elastyczny system ról i uprawnień dostępu.',
      },
      {
        url: '/images/admin-panel/admin-panel-8.webp',
        description: 'Integracje zewnętrzne: Automatyczny import danych z systemów kurierskich.',
      },
      {
        url: '/images/admin-panel/admin-panel-9.webp',
        description:
          'Weryfikacja danych: System automatycznych alertów przy wykryciu nieścisłości.',
      },
    ],
    demoUrl: 'https://www.admin-panel.scale-sail.io/',
    repoUrl: 'https://github.com/CodeWithKarol/admin-panel',
  },
  {
    id: 'quick-cart',
    title: 'Niezawodność warta milionów odwiedzin',
    tagline:
      'Przenoszę standardy bankowe do Twojego warsztatu, aby system nigdy nie zawiódł Cię w szczycie sezonu.',
    heroImage: '/images/quick-cart/quick-cart.webp',
    challenge:
      'W dużych sklepach internetowych błędy w koszyku lub wolne działanie strony to realne straty finansowe. Klient potrzebował platformy, która będzie działać bezbłędnie nawet przy milionach odwiedzin.',
    solution:
      'Zaprojektowałem "QuickCart" – system sprzedaży skupiony na szybkości i niezawodności. Zastosowałem wzorce projektowe z sektora bankowego, aby zapewnić bezpieczeństwo transakcji i płynność działania.',
    technicalApproach:
      'Architektura systemu pozwala na błyskawiczne procesowanie zamówień bez obciążania urządzenia użytkownika. Nawet przy słabym połączeniu internetowym, koszyk i płatności działają stabilnie. Dokładnie takie podejście stosuję później w systemach dla warsztatów – tak, żeby panel z autami i zleceniami działał szybko i stabilnie nawet w sezonie największej liczby klientów.',
    results: [
      'Szybkość: Błyskawiczne ładowanie strony (poniżej 0.8 sekundy)',
      'Mobilność: Idealne działanie na telefonach (wynik 100/100 w testach Google)',
      'Bezpieczeństwo: Solidna ochrona danych klientów i historii zakupów',
    ],
    techStack: [
      'Szybkie działanie nawet przy dużej liczbie użytkowników',
      'Stabilność – system nie „pęka”, gdy jest więcej zamówień',
      'Czytelny podział na koszyk, zamówienia i płatności',
      'Architektura, którą można później łatwo rozbudować',
    ],
    screenshots: [
      '/images/quick-cart/quick-cart-1.webp',
      '/images/quick-cart/quick-cart-2.webp',
      '/images/quick-cart/quick-cart-3.webp',
      '/images/quick-cart/quick-cart-4.webp',
      '/images/quick-cart/quick-cart-5.webp',
      '/images/quick-cart/quick-cart-6.webp',
      '/images/quick-cart/quick-cart-7.webp',
    ],
    demoUrl: 'https://www.quick-cart.scale-sail.io/',
    repoUrl: 'https://github.com/CodeWithKarol/quick-cart',
  },
];

@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  getCaseStudy(id: string): Observable<CaseStudy | undefined> {
    const study = CASE_STUDIES.find((s) => s.id === id);
    return of(study).pipe(delay(100)); // Simulate minimal network delay
  }

  getAllCaseStudies(): Observable<CaseStudy[]> {
    return of(CASE_STUDIES).pipe(delay(100));
  }
}
