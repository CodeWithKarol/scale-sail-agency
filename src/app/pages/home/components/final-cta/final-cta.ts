import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Button } from '../../../../shared/ui/button/button';

@Component({
  selector: 'app-final-cta',
  imports: [Button],
  templateUrl: './final-cta.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FinalCta {}
