import { Component, inject } from '@angular/core';
import { Message } from '../../models/mail.model';
import { MailboxService } from '../../services/mailbox.service';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-inbox',
  imports: [CommonModule, RouterLink, DatePipe],
  templateUrl: './inbox.component.html',
  styleUrl: './inbox.component.scss'
})
export class InboxComponent {
  private mailbox = inject(MailboxService);

  get inbox(): Message[] {
    return this.mailbox.getInbox();
  }
}