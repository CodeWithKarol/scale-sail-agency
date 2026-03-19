import { ScaleSailTemplate } from '../models/scale-sail.model';

export const SCALE_SAIL_TEMPLATES: readonly ScaleSailTemplate[] = [
  {
    id: 'workshop-pro',
    name: 'Warsztat Pro — System Zleceń',
    bestFor: ['warsztaty samochodowe', 'serwisy rowerowe', 'detailing'],
    description:
      'Kompletny system do zarządzania zleceniami. Automatyczne SMS-y do klientów o gotowości odbioru, historia napraw i cyfrowa książka serwisowa.',
    chips: ['SMS-y o statusie', 'Historia klienta', 'Działa na telefonie', 'Prosty w obsłudze'],
    buyUrl: 'https://karolmodelski.gumroad.com/l/elqnvn?layout=profile',
    price: { amountMinor: 0, currency: 'PLN', label: 'Sprawdź demo' },
  },
  {
    id: 'service-flow',
    name: 'ServiceFlow — Dla Firm Usługowych',
    bestFor: ['firmy sprzątające', 'montaż klimatyzacji', 'usługi u klienta'],
    description:
      'Zarządzaj kalendarzem i ekipą w terenie. Klient dostaje link do śledzenia statusu, a Ty masz wszystkie zdjęcia i protokoły w jednej aplikacji.',
    chips: ['Kalendarz online', 'Protokoły foto', 'Śledzenie statusu', 'Baza klientów'],
    buyUrl: 'https://karolmodelski.gumroad.com/l/rqxkhj?layout=profile',
    price: { amountMinor: 1499, currency: 'PLN' },
  },
  {
    id: 'repair-hub',
    name: 'RepairHub — Serwis Elektroniki',
    bestFor: ['serwisy GSM', 'naprawa AGD', 'serwis laptopów'],
    description:
      'Szybkie przyjmowanie sprzętu na serwis. Drukowanie etykiet, automatyczne wyceny i powiadomienia o zakończeniu naprawy.',
    chips: ['Druk etykiet', 'Automatyczne wyceny', 'Statusy online', 'Magazyn części'],
    buyUrl: 'https://karolmodelski.gumroad.com/l/lqyffs?layout=profile',
    price: { amountMinor: 999, currency: 'PLN' },
  },
] as const;
