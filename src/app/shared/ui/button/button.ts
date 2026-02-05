import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

export type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-button',
  imports: [CommonModule, RouterLink],
  templateUrl: './button.html',
  styles: `
    :host {
      display: contents;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Button {
  variant = input<ButtonVariant>('primary');
  size = input<ButtonSize>('md');
  href = input<string>();
  route = input<string | unknown[]>();
  type = input<'button' | 'submit' | 'reset'>('button');
  disabled = input(false);

  styleClass = input<string>('');

  protected computedClasses = computed(() => {
    const base = 'btn group relative';
    const variantClass = `btn-${this.variant()}`;
    const sizeClass = `btn-${this.size()}`;
    const extra = this.styleClass();

    return `${base} ${variantClass} ${sizeClass} ${extra}`;
  });

  protected isExternalLink = computed(() => {
    const href = this.href();
    return href?.startsWith('http') || href?.startsWith('mailto:');
  });

  protected isAnchorLink = computed(() => {
    const href = this.href();
    return href?.startsWith('#') || href?.startsWith('/#');
  });
}
