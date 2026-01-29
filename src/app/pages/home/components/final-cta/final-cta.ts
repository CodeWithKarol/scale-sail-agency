import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SectionHeader } from '../../../../shared/ui/section-header/section-header';
import { Button } from '../../../../shared/ui/button/button';

@Component({
  selector: 'app-final-cta',
  imports: [SectionHeader, Button],
  templateUrl: './final-cta.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FinalCta {}
