import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { NgClass } from '@angular/common';

interface Problem {
  title: string;
  description: string;
  icon: string;
  theme: 'red' | 'orange' | 'indigo';
}

@Component({
  selector: 'app-problem-solution',
  standalone: true,
  imports: [NgClass],
  templateUrl: './problem-solution.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProblemSolutionComponent {
  problems = signal<Problem[]>([
    {
      title: 'Legacy Teams',
      description:
        'Slow, tangled Angular frontends blocking feature velocity. Your roadmap says "innovate"—your codebase says "three-week review cycles."',
      icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
      theme: 'red',
    },
    {
      title: 'SaaS Founders',
      description:
        "You need a technical co-founder's output without giving up equity. Design files exist. User research is done. But engineering execution? Still searching.",
      icon: 'M13 10V3L4 14h7v7l9-11h-7z',
      theme: 'orange',
    },
    {
      title: 'Growth Teams',
      description:
        "Marketing needs landing pages yesterday. Your dev team's sprint is booked for six weeks. Templates you've tried fall apart the moment you add real content.",
      icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z',
      theme: 'indigo',
    },
  ]);
}
