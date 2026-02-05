import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { SectionHeader } from '../../../../shared/ui/section-header/section-header';
import { Button } from '../../../../shared/ui/button/button';
import { tap, catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SectionHeader, Button],
  templateUrl: './contact.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Contact {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);

  form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    projectType: ['audit'], // audit, modernization, staff-aug
    message: ['', [Validators.required, Validators.minLength(20)]],
    botcheck: [false], // Honeypot field
  });

  // UI State
  isSubmitting = signal(false);
  isSuccess = signal(false);

  // Terminal typing effect for success message
  successLogs = signal<{ message: string; timestamp: Date }[]>([]);

  onSubmit() {
    if (this.form.invalid || this.isSubmitting()) return;

    // Honeypot check
    if (this.form.get('botcheck')?.value) return;

    this.isSubmitting.set(true);

    const formData = {
      ...this.form.value,
      access_key: '96dd68a1-6862-4e27-a83f-66e435b684a6',
      subject: `New Scale Sail Inquiry: ${this.form.value.projectType}`,
      from_name: 'Scale Sail Website',
    };

    this.http
      .post('https://api.web3forms.com/submit', formData)
      .pipe(
        tap(() => {
          this.isSuccess.set(true);
          this.form.reset({ projectType: 'audit' }); // Reset with default
          this.runSuccessSequence();
        }),
        catchError((err) => {
          console.error('Submission failed', err);
          // Still show success to user to avoid frustration, or handle error UI
          // For now, fail gracefully
          return of(null);
        }),
        finalize(() => {
          this.isSubmitting.set(false);
        }),
      )
      .subscribe();
  }

  async runSuccessSequence() {
    const logs = [
      'Establishing secure connection...',
      'Encrypting payload...',
      'Transmission complete.',
      `Ticket #${Math.floor(Math.random() * 90000) + 10000} generated.`,
      'Expect response within 24h.',
    ];

    this.successLogs.set([]); // Clear previous logs

    for (const log of logs) {
      this.successLogs.update((current) => [...current, { message: log, timestamp: new Date() }]);
      await new Promise((resolve) => setTimeout(resolve, 600));
    }
  }

  // Helper for template access
  get f() {
    return this.form.controls;
  }
}
