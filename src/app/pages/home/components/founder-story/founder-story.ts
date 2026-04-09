import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Button } from '../../../../shared/ui/button/button';
import { LucideAngularModule, ChevronRight, ArrowRight } from 'lucide-angular';

@Component({
  selector: 'app-founder-story',
  standalone: true,
  imports: [Button, LucideAngularModule],
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
      'Wierzę, że technologia w firmie ma ułatwiać życie, a nie je komplikować. Zamiast ciężkich systemów, dostarczam <strong class="font-black text-secondary">intuicyjne aplikacje</strong>, które rozwiązują realne problemy Twojej firmy usługowej.',
      'Swoje doświadczenie zdobywałem projektując systemy dla największych instytucji finansowych, takich jak <strong class="font-black text-secondary">Citi czy BNP Paribas</strong>. Tam nauczyłem się, że system musi być pancerny i niezawodny. Dziś tę samą jakość i inżynierskie podejście oferuję mniejszym firmom.',
      'Moim celem jest wyciągnięcie Cię z ery kartek i Excela do nowoczesnego modelu pracy, gdzie system dba o klienta, a Ty masz święty spokój.',
    ],
    badges: ['Jakość Bankowa', 'Ekspert od Automatyzacji', '6+ lat doświadczenia'],
  });
}
