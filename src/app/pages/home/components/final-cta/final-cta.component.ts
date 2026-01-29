import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SectionHeaderComponent } from '../../../../shared/ui/section-header/section-header.component';

@Component({
  selector: 'app-final-cta',
  imports: [SectionHeaderComponent],
  templateUrl: './final-cta.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FinalCtaComponent {}
