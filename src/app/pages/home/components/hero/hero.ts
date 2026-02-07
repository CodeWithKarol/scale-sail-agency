import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from '../../../../shared/ui/button/button';
import { CanvasBackground } from '../../../../shared/ui/canvas-background/canvas-background';

@Component({
  selector: 'app-hero',
  imports: [Button, RouterLink, CanvasBackground],
  templateUrl: './hero.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Hero {}
