import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type BadgeVariant = 'solid' | 'soft' | 'outline';
export type BadgeColor = 'primary' | 'secondary' | 'accent' | 'neutral';

@Component({
  selector: 'app-badge',
  standalone: true,
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClasses()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Badge {
  variant = input<BadgeVariant>('soft');
  color = input<BadgeColor>('primary');

  protected computedClasses = computed(() => {
    const base =
      'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold transition-colors whitespace-nowrap';

    const color = this.color();
    const variant = this.variant();

    let colorClasses = '';

    if (variant === 'solid') {
      switch (color) {
        case 'primary':
          colorClasses = 'bg-primary text-white';
          break;
        case 'secondary':
          colorClasses = 'bg-secondary text-white';
          break;
        case 'accent':
          colorClasses = 'bg-accent text-white';
          break;
        case 'neutral':
          colorClasses = 'bg-white text-secondary';
          break;
      }
    } else if (variant === 'soft') {
      switch (color) {
        case 'primary':
          colorClasses = 'bg-primary/10 text-primary ring-1 ring-inset ring-primary/20';
          break;
        case 'secondary':
          colorClasses = 'bg-secondary/50 text-white ring-1 ring-inset ring-white/20'; // Adjusted for visibility on dark
          break;
        case 'accent':
          colorClasses = 'bg-accent/10 text-accent ring-1 ring-inset ring-accent/20';
          break;
        case 'neutral':
          colorClasses = 'bg-white/10 text-white ring-1 ring-inset ring-white/20';
          break;
      }
    } else if (variant === 'outline') {
      colorClasses = 'bg-transparent ring-1 ring-inset';
      switch (color) {
        case 'primary':
          colorClasses += ' text-primary ring-primary/40';
          break;
        case 'secondary':
          colorClasses += ' text-white ring-white/30';
          break;
        case 'accent':
          colorClasses += ' text-accent ring-accent/40';
          break;
        case 'neutral':
          colorClasses += ' text-white/60 ring-white/20';
          break;
      }
    }

    return `${base} ${colorClasses}`;
  });
}
