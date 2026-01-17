import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from './components/hero/hero.component';
import { ProblemSolutionComponent } from './components/problem-solution/problem-solution.component';
import { ServiceArchitectureComponent } from './components/service-architecture/service-architecture.component';
import { CaseStudiesComponent } from './components/case-studies/case-studies.component';
import { TemplateShowcaseComponent } from './components/template-showcase/template-showcase.component';
import { ProcessComponent } from './components/process/process.component';
import { FounderStoryComponent } from './components/founder-story/founder-story.component';
import { ComparisonTableComponent } from './components/comparison-table/comparison-table.component';
import { FaqComponent } from './components/faq/faq.component';
import { FinalCtaComponent } from './components/final-cta/final-cta.component';

@Component({
  selector: 'app-home',
  standalone: true,
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
