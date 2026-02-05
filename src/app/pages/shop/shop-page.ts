import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeroSection } from '../../components/shop/hero/hero-section';
import { CatalogSection } from '../../components/shop/catalog/catalog-section';

@Component({
  selector: 'app-shop-page',
  templateUrl: './shop-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [HeroSection, CatalogSection],
})
export class ShopPage {}
