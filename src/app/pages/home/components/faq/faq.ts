import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { SectionHeader } from '../../../../shared/ui/section-header/section-header';

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
export class Faq {
  faqs = signal<FAQ[]>([
    {
      question: 'Do you work with both enterprise and startups?',
      answer:
        'Yes. Enterprise clients hire me for modernization, audits, and fractional tech leadership. Startups hire me to build their SaaS product end-to-end or as a technical advisor. Both get the same quality bar—audit-ready code and measurable performance wins.',
    },
    {
      question: "What's included in a discovery call?",
      answer:
        "I'll review your current state (codebase, product requirements, or goals), identify key bottlenecks or risks, and propose a clear scope with timeline and outcomes. No sales pitch—just engineering clarity.",
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
        'I work on a project basis (fixed scope/timeline) or retainer for long-term advisory. Audits are fixed-price packages. All engagements start with a discovery call to assess fit.',
    },
    {
      question: "What's your availability?",
      answer: 'Currently booking Q1 2026 projects. Contact me to secure your slot.',
    },
  ]);
}
