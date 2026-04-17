import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { LucideAngularModule, ChevronRight, ArrowRight } from 'lucide-angular';

@Component({
  selector: 'app-founder-story',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './founder-story.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FounderStory {
  readonly icons = {
    ChevronRight,
    ArrowRight,
  };

  founder = signal({
    name: 'Karol Modelski',
    role: 'Twórca systemów i aplikacji',
    image: '/images/karol-modelski.webp',
    headline: 'Przenoszę standardy bankowe do Twojej firmy',
    bio: [
      'Nazywam się Karol Modelski i od lat pomagam firmom usługowym wychodzić z ery kartek i Excela. Łączę standardy bankowe (Citi, BNP Paribas) z maksymalną prostotą obsługi. Buduję systemy na własność, które realnie odzyskują Twój czas i dają święty spokój.',
    ],
    badges: ['Jakość Bankowa', 'Ekspert od Automatyzacji', '6+ lat doświadczenia'],
  });
}
