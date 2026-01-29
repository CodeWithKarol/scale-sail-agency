import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SectionHeaderComponent } from '../../../../shared/ui/section-header/section-header';

@Component({
  selector: 'app-final-cta',
  imports: [SectionHeaderComponent],
  templateUrl: './final-cta.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FinalCtaComponent {}
