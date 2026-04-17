import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionHeader } from '../../../../shared/ui/section-header/section-header';
import { Card } from '../../../../shared/ui/card/card';

@Component({
  selector: 'app-price-comparison',
  standalone: true,
  imports: [CommonModule, SectionHeader, Card],
  templateUrl: './price-comparison.html',
})
export class PriceComparison {
  isStandalone = input<boolean>(false);
  comparisonData = [
    {
      label: 'Koszt roczny (średnio)',
      subscription: '2 400 PLN',
      ownership: '0 PLN',
      note: 'Po wdrożeniu nie płacisz za dostęp',
    },
    {
      label: 'Twoje dane',
      subscription: 'U kogoś na serwerze',
      ownership: 'Na Twoim serwerze',
      note: 'Pełna kontrola i prywatność',
    },
    {
      label: 'Dostęp offline/Lokalny',
      subscription: 'Brak (tylko chmura)',
      ownership: 'Możliwy (Twoja sieć)',
      note: 'Pracuj nawet gdy padnie internet',
    },
    {
      label: 'Blokada przy braku wpłaty',
      subscription: 'Natychmiastowa',
      ownership: 'Nigdy',
      note: 'Twoje narzędzie, Twoje zasady',
    },
  ];
}
