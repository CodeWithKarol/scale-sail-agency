import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-section-header',
  imports: [],
  templateUrl: './section-header.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionHeader {
  subtitle = input<string>();
  title = input.required<string>();
  description = input<string>();
  alignment = input<'center' | 'left'>('center');
}
