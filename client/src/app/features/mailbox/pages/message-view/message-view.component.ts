import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Message } from '../../models/mail.model';
import { MailboxService } from '../../services/mailbox.service';

@Component({
  selector: 'app-message-view',
  imports: [CommonModule, RouterLink, DatePipe],
  templateUrl: './message-view.component.html',
  styleUrl: './message-view.component.scss'
})
export class MessageViewComponent {
  private route = inject(ActivatedRoute);
  private mailbox = inject(MailboxService);

  message?: Message;

  constructor() {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.message = this.mailbox.getMessageById(id);
  }
}