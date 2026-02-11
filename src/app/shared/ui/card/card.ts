import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClasses()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Card {
  // Styles the container with glassmorphism
  variant = input<'default' | 'highlight' | 'ghost'>('default');

  // Adds hover effects
  interactive = input(false);

  protected computedClasses = computed(() => {
    const base = 'relative block rounded-none transition-all duration-300';

    // Base styles for Dark Glass theme
    const defaultStyle = 'bg-white/5 border border-white/10';
    const highlightStyle =
      'bg-secondary border border-primary shadow-[0_0_30px_rgba(0,123,255,0.15)] z-10';
    const ghostStyle = 'bg-transparent border border-transparent';

    // Interactive styles (hover)
    const hoverStyle = this.interactive() ? 'hover:bg-white/10 hover:border-white/20 group' : '';

    let variantStyle = defaultStyle;
    if (this.variant() === 'highlight') variantStyle = highlightStyle;
    if (this.variant() === 'ghost') variantStyle = ghostStyle;

    return `${base} ${variantStyle} ${hoverStyle}`;
  });
}
