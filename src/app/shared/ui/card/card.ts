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
  // Styles the container with industrial theme
  variant = input<'default' | 'highlight' | 'ghost'>('default');

  // Adds hover effects
  interactive = input(false);

  protected computedClasses = computed(() => {
    const base = 'card-workshop relative transition-all duration-300';

    // Industrial styles
    const defaultStyle = 'bg-white border-2 border-secondary/10';
    const highlightStyle =
      'bg-white border-4 border-secondary shadow-[8px_8px_0px_0px_rgba(10,31,68,0.1)] z-10';
    const ghostStyle = 'bg-transparent border-2 border-transparent shadow-none';

    // Interactive styles (hover)
    const hoverStyle = this.interactive()
      ? 'group hover:border-primary hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,123,255,0.1)]'
      : '';

    let variantStyle = defaultStyle;
    if (this.variant() === 'highlight') variantStyle = highlightStyle;
    if (this.variant() === 'ghost') variantStyle = ghostStyle;

    return `${base} ${variantStyle} ${hoverStyle}`;
  });
}
