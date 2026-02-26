import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Attachment, MessageDraft } from '../../models/mail.model';
import { MailboxService } from '../../services/mailbox.service';
import { CanComponentDeactivate } from '../../../../core/guards/can-component-deactivate';

@Component({
  selector: 'app-compose',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './compose.component.html',
  styleUrl: './compose.component.scss'
})
export class ComposeComponent implements CanComponentDeactivate{
  private fb = inject(FormBuilder);
  private mailbox = inject(MailboxService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  attachments: Attachment[] = [];
  isSending: boolean = false;

  form = this.fb.group({
    to: ['', [Validators.required]],
    subject: ['', [Validators.required]],
    body: [''],
  });

  constructor() {
    const qp = this.route.snapshot.queryParamMap;

    const replyTo = qp.get('replyTo');
    const forwardTo = qp.get('forwardTo');

    if (replyTo) {
      const msg = this.mailbox.getMessageById(replyTo);
      if (msg) {
        const draft = this.mailbox.createReplyDraft(msg);
        this.applyDraft(draft);
      }
    } else if (forwardTo) {
      const msg = this.mailbox.getMessageById(forwardTo);
      if (msg) {
        const draft = this.mailbox.createForwardDraft(msg);
        this.applyDraft(draft);
      }
    }
  }

  private applyDraft(draft: MessageDraft): void {
    this.form.patchValue({
      to: draft.to ?? '',
      subject: draft.subject ?? '',
      body: draft.body ?? '',
    });

    this.attachments = draft.attachments ?? [];
  }

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
    this.isSending = true;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.isSending = false; 
      return;
    }

    const draft: MessageDraft = {
      to: this.form.value.to ?? '',
      subject: this.form.value.subject ?? '',
      body: this.form.value.body ?? '',
      attachments: this.attachments,
    };

    this.mailbox.sendMessage(draft);
    this.form.markAsPristine();
    this.router.navigateByUrl('/app/outbox');
  }

  canDeactivate(): boolean {
    if (this.isSending) return true;
    return !this.form.dirty;
  }
}