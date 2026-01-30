import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Hero } from './components/hero/hero';
import { ProblemSolution } from './components/problem-solution/problem-solution';
import { ServiceArchitecture } from './components/service-architecture/service-architecture';
import { CaseStudies } from './components/case-studies/case-studies';
import { TemplateShowcase } from './components/template-showcase/template-showcase';
import { Process } from './components/process/process';
import { FounderStory } from './components/founder-story/founder-story';
import { ComparisonTable } from './components/comparison-table/comparison-table';
import { Faq } from './components/faq/faq';
import { FinalCta } from './components/final-cta/final-cta';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    Hero,
    ProblemSolution,
    ServiceArchitecture,
    CaseStudies,
    TemplateShowcase,
    Process,
    FounderStory,
    ComparisonTable,
    Faq,
    FinalCta,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {}
