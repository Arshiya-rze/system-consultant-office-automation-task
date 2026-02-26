import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { AuthService } from '../../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { MailboxService } from '../../../mailbox/services/mailbox.service';

@Component({
  selector: 'app-app-layout',
  imports: [    
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive],
  templateUrl: './app-layout.component.html',
  styleUrl: './app-layout.component.scss'
})
export class AppLayoutComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  private mailbox = inject(MailboxService);

  constructor() {
    this.mailbox.seedMockDataIfEmpty();
  }

  get username(): string {
    return this.auth.getUser()?.username ?? '';
  }

  logout(): void {
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }
}