import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ScaleSailTemplate } from '../../../../core/shop/models/scale-sail.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CurrencyPipe, CommonModule],
})
export class ProductCard {
  product = input.required<ScaleSailTemplate>();

  protected readonly productImage = computed(() => {
    const id = this.product().id;
    const imageMap: Record<string, string> = {
      mintly: '/images/mintly.webp',
      cleanfleet: '/images/clean-fleet.webp',
      'eco-vest': '/images/eco-vest.webp',
      innovatetech: '/images/innovate-tech.webp',
      skillswap: '/images/skill-swap.webp',
      smartcare: '/images/smart-care-home.webp',
      coinquest: '/images/coin-quest.webp',
      budgy: '/images/budgy.webp',
    };
    // Default to first image or a placeholder if not found
    return imageMap[id] || '/images/mintly.webp';
  });
}
