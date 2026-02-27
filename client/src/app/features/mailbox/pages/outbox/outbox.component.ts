import { Component, inject } from '@angular/core';
import { Message } from '../../models/mail.model';
import { MailboxService } from '../../services/mailbox.service';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MailToolbarComponent } from '../../components/mail-toolbar/mail-toolbar/mail-toolbar.component';

@Component({
  selector: 'app-outbox',
  imports: [CommonModule, RouterLink, DatePipe, MailToolbarComponent],
  templateUrl: './outbox.component.html',
  styleUrl: './outbox.component.scss'
})
export class OutboxComponent {
  private mailbox = inject(MailboxService);

  search = '';

  get outbox(): Message[] {
    return this.mailbox.getOutbox();
  }

  get filteredMessages(): Message[] {
    const q = this.search.trim().toLowerCase();
    const items = this.outbox;

    if (!q) return items;

    return items.filter(m =>
      (m.subject ?? '').toLowerCase().includes(q) ||
      (m.to ?? '').toLowerCase().includes(q) ||
      (m.body ?? '').toLowerCase().includes(q)
    );
  }
}