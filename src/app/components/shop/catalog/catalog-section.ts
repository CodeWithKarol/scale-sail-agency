import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, LayoutTemplate } from 'lucide-angular';
import { SCALE_SAIL_TEMPLATES } from '../../../core/shop/config/scale-sail.config';
import { ScaleSailTemplate } from '../../../core/shop/models/scale-sail.model';
import { ProductCard } from './product-card/product-card';

@Component({
  selector: 'app-catalog-section',
  templateUrl: './catalog-section.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, LucideAngularModule, ProductCard],
})
export class CatalogSection {
  readonly LayoutTemplate = LayoutTemplate;
  products = signal<readonly ScaleSailTemplate[]>(SCALE_SAIL_TEMPLATES);
}
