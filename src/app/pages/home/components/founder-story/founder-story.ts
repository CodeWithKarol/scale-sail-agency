import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { LucideAngularModule, ChevronRight, ArrowRight } from 'lucide-angular';

@Component({
  selector: 'app-founder-story',
  standalone: true,
  imports: [LucideAngularModule, NgOptimizedImage],
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
    quote:
      'W bankowości awaria systemu to strata milionów. W warsztacie – to utrata zaufania klienta. Przenoszę tę samą obsesję na punkcie niezawodności do mniejszych firm, budując rozwiązania, które po prostu nigdy nie zawiodą.',
    badges: ['Jakość Bankowa', 'Ekspert od Automatyzacji', '6+ lat doświadczenia'],
  });
}
