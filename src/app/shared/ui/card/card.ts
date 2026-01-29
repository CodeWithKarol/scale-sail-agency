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
    const base = 'relative block rounded-3xl transition-all duration-300';

    // Base styles for Dark Glass theme
    const defaultStyle = 'bg-white/5 ring-1 ring-white/10';
    const highlightStyle =
      'bg-secondary ring-2 ring-primary shadow-2xl shadow-primary/20 scale-[1.02] lg:scale-110 z-10';
    const ghostStyle = 'bg-transparent';

    // Interactive styles (hover)
    const hoverStyle = this.interactive() ? 'hover:bg-white/10 hover:ring-white/20 group' : '';

    let variantStyle = defaultStyle;
    if (this.variant() === 'highlight') variantStyle = highlightStyle;
    if (this.variant() === 'ghost') variantStyle = ghostStyle;

    return `${base} ${variantStyle} ${hoverStyle}`;
  });
}
