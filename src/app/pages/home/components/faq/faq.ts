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
      question: 'Do you work with both enterprise and startups?',
      answer:
        "I partner primarily with scale-ups and enterprises where 'slow engineering' has become a blocker to Scale. Whether you're a Series B startup needing to stabilize for growth or an enterprise needing to modernize legacy core systems, I provide the architectural leadership to restore velocity.",
    },
    {
      question: "What's included in a discovery call?",
      answer:
        "The discovery call is a 15-minute qualification chat. The real value starts with the Audit ($997). I'll review your codebase, identify bottlenecks, and give you a roadmap. If you hire me for Sprints, the Audit fee is 100% credited back.",
    },
    {
      question: 'Do you work with existing teams?',
      answer:
        "Yes. I often integrate as a Fractional Tech Lead or Senior Architect to guide internal teams through complex migrations or architecture decisions. I don't just write code; I elevate your team's standards.",
    },
    {
      question: 'What frameworks do you specialize in?',
      answer:
        'I specialize exclusively in Angular (Legacy → v21 migrations, NgRx/Signals, Server-side & hybrid rendering, Incremental Hydration, Nx monorepos). This focus allows me to solve problems generalist frontend developers struggle with.',
    },
    {
      question: 'What is your typical engagement model?',
      answer:
        'We start with the Audit ($997) to define the roadmap. Then, we move to "Velocity Sprints" ($4k / 2-weeks) to execute the work. No hourly billing, no surprises.',
    },
    {
      question: "What's your availability?",
      answer: 'Currently booking Q1 2026 projects. Contact me to secure your slot.',
    },
  ]);

  ngOnInit() {
    this.seoService.setSchema(
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: this.faqs().map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
      'json-ld-faq',
    );
  }
}
