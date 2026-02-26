import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Attachment } from '../../models/mail.model';
import { MailboxService } from '../../services/mailbox.service';

@Component({
  selector: 'app-compose',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './compose.component.html',
  styleUrl: './compose.component.scss'
})
export class ComposeComponent {
  private fb = inject(FormBuilder);
  private mailbox = inject(MailboxService);
  private router = inject(Router);

  attachments: Attachment[] = [];

  form = this.fb.group({
    to: ['', [Validators.required]],
    subject: ['', [Validators.required]],
    body: [''],
  });

  onFilesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const selected = Array.from(input.files).map((f) => ({
      name: f.name,
      size: f.size,
      type: f.type || 'unknown',
    }));

    this.attachments = [...this.attachments, ...selected];

    input.value = '';
  }

  removeAttachment(index: number): void {
    this.attachments = this.attachments.filter((_, i) => i !== index);
  }

  send(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const draft = {
      to: this.form.value.to ?? '',
      subject: this.form.value.subject ?? '',
      body: this.form.value.body ?? '',
      attachments: this.attachments,
    };

    this.mailbox.sendMessage(draft);

    this.router.navigateByUrl('/app/outbox');
  }
}