import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

interface Template {
  id: string;
  name: string;
  tagline: string;
  image: string;
  price: string;
  badge?: string;
}

@Component({
  selector: 'app-template-showcase',
  imports: [],
  templateUrl: './template-showcase.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplateShowcaseComponent {
  featuredTemplates = signal<Template[]>([
    {
      id: 'mintly',
      name: 'Mintly',
      tagline: 'Trust-first layout for modern finance products',
      image: 'images/mintly.webp',
      price: 'Free',
      badge: 'Free Download',
    },
    {
      id: 'cleanfleet',
      name: 'CleanFleet Solutions',
      tagline: 'Includes ROI calculator for fleet decision-makers',
      image: 'images/clean-fleet.webp',
      price: '$9.99',
    },
    {
      id: 'innovatetech',
      name: 'InnovateTech',
      tagline: 'Premium motion + strong CTA placement',
      image: 'images/innovate-tech.webp',
      price: '$9.99',
    },
  ]);
}
