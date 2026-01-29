import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent {
  protected readonly isModernized = signal(true);

  toggleModernization() {
    this.isModernized.update((v) => !v);
  }
}
