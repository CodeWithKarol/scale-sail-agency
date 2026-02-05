import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Check, LucideAngularModule, ArrowRight } from 'lucide-angular';

/**
 * Hero Section
 */
@Component({
  selector: 'app-hero-section',
  templateUrl: './hero-section.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgOptimizedImage, LucideAngularModule],
})
export class HeroSection {
  readonly Check = Check;
  readonly ArrowRight = ArrowRight;
}
