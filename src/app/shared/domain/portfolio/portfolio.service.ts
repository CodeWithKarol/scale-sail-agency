import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

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
  screenshots: string[];
  demoUrl?: string;
  repoUrl?: string;
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'modern-enterprise-admin-dashboard',
    title: 'Koncept panelu zarządzania firmą – wszystko na jednym ekranie',
    tagline:
      'Koncept panelu administracyjnego dla dużej firmy, który w czasie rzeczywistym pokazuje najważniejsze liczby biznesowe. Dokładnie ten sam pomysł wykorzystuję w małych firmach usługowych – tylko zamiast wykresów są auta, zlecenia, terminy i statusy napraw.',
    heroImage: '/images/admin-panel/admin-panel.webp',
    challenge:
      'Systemy dla dużych firm często stają się powolne i trudne w obsłudze przy dużej ilości danych. Klient potrzebował rozwiązania, które pozwoli błyskawicznie zarządzać tysiącami operacji bez błędów i opóźnień.',
    solution:
      'Zbudowałem nowoczesną aplikację, która natychmiast reaguje na zmiany danych. Wykorzystałem technologie, które gwarantują, że interfejs jest zawsze aktualny i czytelny, niezależnie od skali biznesu.',
    technicalApproach:
      'Zastosowałem architekturę opartą na sygnałach (Angular Signals), co pozwala na precyzyjne i bardzo szybkie odświeżanie tylko tych elementów, które tego wymagają. Dzięki temu system jest "lekki" i błyskawiczny.',
    results: [
      'Wydajność: Obsługa ponad 50 000 aktualizacji danych na sekundę bez zacięć',
      'Stabilność: System odporny na błędy dzięki rygorystycznym testom automatycznym',
      'Przejrzystość: Intuicyjny panel, który nie wymaga szkolenia pracowników',
    ],
    techStack: [
      'Panel z kluczowymi liczbami biznesowymi',
      'Najważniejsze liczby biznesowe na jednym ekranie',
      'Dane odświeżane na bieżąco (bez ręcznego odświeżania)',
      'Czytelny podgląd tego, co dzieje się w firmie dziś i w najbliższych dniach',
      'Układ, który łatwo dostosować pod konkretną branżę',
    ],
    screenshots: [
      '/images/admin-panel/admin-panel-1.webp',
      '/images/admin-panel/admin-panel-2.webp',
      '/images/admin-panel/admin-panel-3.webp',
      '/images/admin-panel/admin-panel-4.webp',
      '/images/admin-panel/admin-panel-5.webp',
      '/images/admin-panel/admin-panel-6.webp',
      '/images/admin-panel/admin-panel-7.webp',
      '/images/admin-panel/admin-panel-8.webp',
      '/images/admin-panel/admin-panel-9.webp',
    ],
    demoUrl: 'https://www.admin-panel.scale-sail.io/',
    repoUrl: 'https://github.com/CodeWithKarol/admin-panel',
  },
  {
    id: 'quickcart-ecommerce',
    title: 'Koncept sklepu, który nie pęka przy większym ruchu',
    tagline:
      'Koncept architektury sklepu internetowego, która wytrzymuje duże obciążenie i jest łatwa w rozwoju. To doświadczenie przenoszę do małych systemów – po to, żeby Twoja aplikacja dla warsztatu działała szybko i nie „wieszała się” w najgorszym momencie.',
    heroImage: '/images/quick-cart/quick-cart.webp',
    challenge:
      'W dużych sklepach internetowych błędy w koszyku lub wolne działanie strony to realne straty finansowe. Klient potrzebował platformy, która będzie działać bezbłędnie nawet przy milionach odwiedzin.',
    solution:
      'Zaprojektowałem "QuickCart" – system sprzedaży skupiony na szybkości i niezawodności. Zastosowałem wzorce projektowe z sektora bankowego, aby zapewnić bezpieczeństwo transakcji i płynność działania.',
    technicalApproach:
      'Wykorzystałem architekturę "Smart Shell", która izoluje kluczowe funkcje (jak koszyk czy płatności) od reszty strony. Dzięki temu błąd w jednym miejscu nie powoduje awarii całego systemu.',
    results: [
      'Szybkość: Błyskawiczne ładowanie strony (poniżej 0.8 sekundy)',
      'Mobilność: Idealne działanie na telefonach (wynik 100/100 w testach Google)',
      'Bezpieczeństwo: Solidna ochrona danych klientów i historii zakupów',
    ],
    techStack: [
      'Sklep odporny na duży ruch',
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
