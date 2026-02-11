import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Button } from '../../../../shared/ui/button/button';

@Component({
  selector: 'app-founder-story',
  imports: [Button],
  templateUrl: './founder-story.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FounderStory {
  founder = signal({
    name: 'Karol Modelski',
    role: 'Enterprise System Architect',
    image: 'images/karol-modelski.webp',
    headline: 'Restoring Velocity to Scale Engineering Teams',
    bio: [
      'Transforming struggling codebases into growth engines. I bridge the gap between product vision and technical reality for Series B/C companies attempting to Scale.',
      'Currently leading architecture for mission-critical trading platforms: Enforcing 100% test coverage policies while migrating legacy micro-frontends to a coherent Nx monorepo. Balancing enterprise compliance with developer velocity.',
      'Software is built by people. I foster environments where technical excellence meets product vision, ensuring your Angular platform remains a high-velocity asset for years to come.',
    ],
    badges: ['Senior Frontend Dev (6+ yrs)', 'Micro-SaaS Founder', 'Angular Expert'],
  });
}
