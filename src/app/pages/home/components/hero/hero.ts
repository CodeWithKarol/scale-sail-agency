import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from '../../../../shared/ui/button/button';

@Component({
  selector: 'app-hero',
  imports: [Button, RouterLink],
  templateUrl: './hero.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Hero {}
