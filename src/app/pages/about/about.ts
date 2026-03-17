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
    { category: 'Fundamenty', items: ['Angular', 'TypeScript', 'Automatyzacja'] },
    { category: 'Szybkość', items: ['Aplikacje mobilne', 'Powiadomienia SMS', 'Chmura'] },
    { category: 'Jakość', items: ['Bazy danych', 'Bezpieczeństwo', 'Wydajność'] },
  ];

  experience = [
    {
      role: 'Senior Frontend Developer',
      company: 'GFT Technologies (Citi)',
      period: 'Mar 2025 - Obecnie',
      desc: 'Buduję systemy dla największych banków na świecie. Tutaj nauczyłem się, jak tworzyć oprogramowanie, które nigdy nie zawodzi i obsługuje miliony operacji.',
    },
    {
      role: 'Frontend Developer',
      company: 'Silent Eight',
      period: 'Grudzień 2023 - Luty 2025',
      desc: 'Praca nad systemami AI dla sektora finansowego. Skupiłem się na maksymalnej szybkości działania aplikacji i intuicyjności dla użytkownika.',
    },
    {
      role: 'Software Developer',
      company: 'BNP Paribas',
      period: 'Listopad 2021 - Listopad 2023',
      desc: 'Rozwijałem bankowość internetową, z której korzysta ponad milion osób. Zarządzałem trudnymi migracjami starych systemów na nowe technologie.',
    },
    {
      role: 'Junior Frontend Developer',
      company: 'Amway',
      period: 'Kwiecień 2019 - Październik 2021',
      desc: 'Tworzyłem panele do zarządzania sprzedażą dla tysięcy przedsiębiorców. To tutaj zrozumiałem, jak ważne dla biznesu są przejrzyste dane.',
    },
  ];
}
