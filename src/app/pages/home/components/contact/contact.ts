import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionHeader } from '../../../../shared/ui/section-header/section-header';
import { Button } from '../../../../shared/ui/button/button';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, SectionHeader, Button],
  templateUrl: './contact.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Contact {}
