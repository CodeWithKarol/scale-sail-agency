import { Component, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeoService } from '../../shared/core/seo/seo.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class About implements OnInit {
  private seoService = inject(SeoService);

  ngOnInit() {
    this.seoService.setPageMetadata({
      title: 'O mnie | Karol Modelski — Scale Sail',
      description:
        'Pomagam małym firmom usługowym i warsztatom wychodzić z ery kartek i Excela. Wykorzystuję doświadczenie z największych projektów IT, by budować proste i solidne aplikacje.',
      slug: 'about',
      type: 'profile',
    });
  }

  techStack = [
    {
      category: 'Fundamenty',
      items: ['Angular & TypeScript', 'Aplikacje webowe i mobilne', 'Architektura wysokiej wydajności'],
    },
    {
      category: 'Stabilność',
      items: ['Automatyzacja procesów', 'Bezpieczne bazy danych', 'Powiadomienia SMS i Email'],
    },
    {
      category: 'Standardy',
      items: ['Systemy bankowe (Citi, BNP)', 'Zgodność z przepisami (AI Compliance)', 'Bezpieczeństwo danych użytkownika'],
    },
  ];

  principles = [
    {
      title: 'PROSTOTA PONAD WSZYSTKO',
      desc: 'Nie instaluję zbędnych bajerów. System ma być tak prosty, byś mógł go obsłużyć w pośpiechu, mając ręce pełne roboty. Jeśli coś nie ułatwia Ci życia – usuwamy to.',
    },
    {
      title: 'SOLIDNOŚĆ BANKOWA',
      desc: 'Praca dla największych banków nauczyła mnie, że system po prostu musi działać. Bez "zawieszek", bez przestojów i bez błędów w danych. Tę samą jakość daję Twojej firmie.',
    },
    {
      title: 'TECHNOLOGIA DLA BIZNESU',
      desc: 'Kod to tylko narzędzie. Moim celem nie jest napisanie programu, ale odzyskanie Twojego czasu. Jeśli aplikacja nie zarabia na siebie poprzez Twoją wygodę – nie ma sensu.',
    },
  ];

  experience = [
    {
      role: 'Senior Frontend Developer',
      company: 'GFT Technologies (Citi)',
      period: '2025 - OBECNIE',
      desc: 'Budowa systemów transakcyjnych dla globalnej bankowości. Standard: Zero tolerancji dla błędów i maksymalna wydajność interfejsu.',
      qualityMark: 'ATEST BANKOWY',
    },
    {
      role: 'Frontend Developer',
      company: 'Silent Eight',
      period: '2023 - 2025',
      desc: 'Rozwój systemów AI dla sektora finansowego. Skupienie na intuicyjności przy bardzo skomplikowanych danych procesowych.',
      qualityMark: 'STANDARD AI',
    },
    {
      role: 'Software Developer',
      company: 'BNP Paribas',
      period: '2021 - 2023',
      desc: 'Migracja systemów bankowości internetowej (1M+ użytkowników). Zarządzanie sprawnym przejściem ze starych rozwiązań na nowoczesne.',
      qualityMark: 'MIGRACJA DANYCH',
    },
    {
      role: 'Junior Frontend Developer',
      company: 'Amway',
      period: '2019 - 2021',
      desc: 'Tworzenie paneli do zarządzania sprzedażą dla tysięcy przedsiębiorców. Pierwsze kroki w budowaniu narzędzi, które realnie ułatwiają biznes.',
      qualityMark: 'POCZĄTEK DROGI',
    },
  ];
}
