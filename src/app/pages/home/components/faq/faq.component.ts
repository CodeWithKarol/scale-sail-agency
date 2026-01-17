import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

interface FAQ {
  question: string;
  answer: string;
}

@Component({
  selector: 'app-faq',
  standalone: true,
  templateUrl: './faq.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FaqComponent {
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
      question: 'Can I start with templates and upgrade to custom work later?',
      answer:
        'Absolutely. Many clients validate their idea with a Scale Sail template, then hire me to build the full SaaS product once they have traction.',
    },
    {
      question: 'What frameworks do you specialize in?',
      answer:
        'Angular is my specialty (AngularJS → modern migrations, Signals, RxJS, Nx monorepos). I also ship React when your stack or roadmap requires it.',
    },
    {
      question: 'Do templates work for non-developers?',
      answer:
        'Yes. Templates are static HTML/CSS/JS with a customization guide. If you can edit text and change colors in a file, you can deploy them. Support form included for issues.',
    },
    {
      question: "What's your availability?",
      answer:
        'Currently booking Q1 2026 projects. Template purchases are instant (download after payment).',
    },
  ]);
}
