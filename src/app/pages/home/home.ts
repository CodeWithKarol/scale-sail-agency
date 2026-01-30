import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from './components/hero/hero';
import { ProblemSolutionComponent } from './components/problem-solution/problem-solution';
import { ServiceArchitectureComponent } from './components/service-architecture/service-architecture';
import { CaseStudiesComponent } from './components/case-studies/case-studies';
import { TemplateShowcaseComponent } from './components/template-showcase/template-showcase';
import { ProcessComponent } from './components/process/process';
import { FounderStoryComponent } from './components/founder-story/founder-story';
import { ComparisonTableComponent } from './components/comparison-table/comparison-table';
import { FaqComponent } from './components/faq/faq';
import { FinalCtaComponent } from './components/final-cta/final-cta';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    HeroComponent,
    ProblemSolutionComponent,
    ServiceArchitectureComponent,
    CaseStudiesComponent,
    TemplateShowcaseComponent,
    ProcessComponent,
    FounderStoryComponent,
    ComparisonTableComponent,
    FaqComponent,
    FinalCtaComponent,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
