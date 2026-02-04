import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from '../../../../shared/ui/button/button';

@Component({
  selector: 'app-hero',
  imports: [Button, RouterLink],
  templateUrl: './hero.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Hero {
  protected readonly isModernized = signal(true);

  toggleModernization() {
    this.isModernized.update((v) => !v);
  }
}
