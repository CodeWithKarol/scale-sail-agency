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
    headline: 'Buduję systemy, które ułatwiają życie i pracę',
    bio: [
      'Od lat pomagam firmom porządkować ich cyfrowy świat. Wierzę, że technologia nie musi być skomplikowana, aby dawać ogromne efekty. Moim celem jest tworzenie aplikacji, które po prostu działają i rozwiązują realne problemy.',
      'Zamiast skomplikowanych korporacyjnych systemów, dostarczam proste i intuicyjne aplikacje. Rozumiem, że w Twojej pracy liczy się czas i konkretna aplikacja, a nie techniczny żargon.',
      'Pomagam przejść z ery kartek i Excela do nowoczesnego warsztatu lub firmy usługowej, w której wszystko masz pod ręką – w telefonie lub na komputerze.',
    ],
    badges: ['Programista (6+ lat)', 'Właściciel agencji', 'Ekspert od automatyzacji'],
  });
}
