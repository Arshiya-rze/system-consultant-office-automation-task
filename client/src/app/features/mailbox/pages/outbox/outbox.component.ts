import { Component, inject } from '@angular/core';
import { Message } from '../../models/mail.model';
import { MailboxService } from '../../services/mailbox.service';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-outbox',
  imports: [CommonModule, RouterLink, DatePipe],
  templateUrl: './outbox.component.html',
  styleUrl: './outbox.component.scss'
})
export class OutboxComponent {
  private mailbox = inject(MailboxService);

  get outbox(): Message[] {
    return this.mailbox.getOutbox();
  }
}