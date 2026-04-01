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
      'Wierzę, że technologia w firmie ma ułatwiać życie, a nie je komplikować. Zamiast ciężkich systemów, dostarczam **intuicyjne aplikacje**, które rozwiązują realne problemy Twojego warsztatu.',
      'Pomagam wyjść z ery kartek i Excela do nowoczesnego modelu pracy, gdzie wszystko – od zleceń po kontakt z klientem – masz pod ręką w telefonie lub komputerze.',
    ],
    badges: ['Programista (6+ lat)', 'Właściciel agencji', 'Ekspert od automatyzacji'],
  });
}
