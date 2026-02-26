import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
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
  private router = inject(Router);
  private mailbox = inject(MailboxService);

  message?: Message;

  constructor() {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.message = this.mailbox.getMessageById(id);
  }

  reply(): void {
    if (!this.message) return;
    this.router.navigate(['/app/compose'], { queryParams: { replyTo: this.message.id } });
  }

  forward(): void {
    if (!this.message) return;
    this.router.navigate(['/app/compose'], { queryParams: { forwardTo: this.message.id } });
  }
}