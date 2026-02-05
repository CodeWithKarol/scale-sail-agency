import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SectionHeader } from '../../../../shared/ui/section-header/section-header';
import { Button } from '../../../../shared/ui/button/button';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, SectionHeader, Button],
  templateUrl: './contact.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Contact {
  // Form State
  name = signal('');
  email = signal('');
  projectType = signal('audit'); // audit, modernization, staff-aug
  message = signal('');

  // UI State
  isSubmitting = signal(false);
  isSuccess = signal(false);

  // Terminal typing effect for success message
  successLogs = signal<string[]>([]);

  async onSubmit() {
    this.isSubmitting.set(true);

    // Simulate network request
    await new Promise((resolve) => setTimeout(resolve, 1500));

    this.isSubmitting.set(false);
    this.isSuccess.set(true);
    this.runSuccessSequence();
  }

  async runSuccessSequence() {
    const logs = [
      'Establishing secure connection...',
      'Encrypting payload...',
      'Transmission complete.',
      'Ticket #49281 generated.',
      'Expect response within 24h.',
    ];

    for (const log of logs) {
      this.successLogs.update((current) => [...current, log]);
      await new Promise((resolve) => setTimeout(resolve, 600));
    }
  }
}
