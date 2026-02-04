import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { SectionHeader } from '../../../../shared/ui/section-header/section-header';
import { Card } from '../../../../shared/ui/card/card';
import { Button } from '../../../../shared/ui/button/button';
import { UpperCasePipe } from '@angular/common';

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
  imports: [SectionHeader, Card, Button, UpperCasePipe],
  templateUrl: './template-showcase.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplateShowcase {
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
