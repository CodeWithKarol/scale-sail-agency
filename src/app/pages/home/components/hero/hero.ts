import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Button } from '../../../../shared/ui/button/button';
import { Badge } from '../../../../shared/ui/badge/badge';

@Component({
  selector: 'app-hero',
  imports: [Button, Badge],
  templateUrl: './hero.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Hero {
  protected readonly isModernized = signal(true);

  toggleModernization() {
    this.isModernized.update((v) => !v);
  }
}
