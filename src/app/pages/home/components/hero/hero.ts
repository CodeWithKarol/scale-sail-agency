import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from '../../../../shared/ui/button/button';
import { BackgroundMesh } from '../background-mesh/background-mesh';

@Component({
  selector: 'app-hero',
  imports: [Button, RouterLink, BackgroundMesh],
  templateUrl: './hero.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Hero {}
