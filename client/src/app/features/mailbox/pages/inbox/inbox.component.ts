import { Component, inject } from '@angular/core';
import { Message } from '../../models/mail.model';
import { MailboxService } from '../../services/mailbox.service';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MailToolbarComponent } from '../../components/mail-toolbar/mail-toolbar/mail-toolbar.component';

@Component({
  selector: 'app-inbox',
  imports: [CommonModule, RouterLink, DatePipe, MailToolbarComponent],
  templateUrl: './inbox.component.html',
  styleUrl: './inbox.component.scss'
})
export class InboxComponent {
  private mailbox = inject(MailboxService);

  search = '';

  get inbox(): Message[] {
    return this.mailbox.getInbox();
  }

  get filteredMessages(): Message[] {
    const q = this.search.trim().toLowerCase();
    const items = this.inbox;

    if (!q) return items;

    return items.filter(m =>
      (m.subject ?? '').toLowerCase().includes(q) ||
      (m.from ?? '').toLowerCase().includes(q) ||
      (m.body ?? '').toLowerCase().includes(q)
    );
  }
}