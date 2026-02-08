import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { SectionHeader } from '../../../../shared/ui/section-header/section-header';

interface ProcessStep {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  iconPath: string;
  duration: string;
  status: string;
}

@Component({
  selector: 'app-process',
  standalone: true,
  imports: [SectionHeader],
  templateUrl: './process.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Process {
  steps = signal<ProcessStep[]>([
    {
      number: '01',
      title: 'The Audit',
      subtitle: 'DIAGNOSIS',
      description:
        'We start with the "Scale-Blocker Audit." In 5 days, I analyze your system and deliver a roadmap. If I don\'t find 3 critical blockers, it\'s free. (Fee Credited to Sprint 1)',
      iconPath: 'M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z',
      duration: '5 DAYS',
      status: 'AWAITING_INPUT',
    },
    {
      number: '02',
      title: 'The Sprints',
      subtitle: 'EXECUTION',
      description:
        'We execute the roadmap in "Velocity Sprints." 2-week cycles with locked scope and clear deliverables. No scope creep, no surprises.',
      iconPath:
        'M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z',
      duration: '2-WEEK CYCLES',
      status: 'QUEUED',
    },
    {
      number: '03',
      title: 'Handoff & Support',
      subtitle: 'FINALIZATION',
      description: 'Complete documentation transfer, team training, and maintenance protocols.',
      iconPath:
        'M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z',
      duration: 'ONGOING',
      status: 'SYSTEM_READY',
    },
  ]);
}
