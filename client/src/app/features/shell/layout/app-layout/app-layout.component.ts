import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { AuthService } from '../../../../core/services/auth.service';
import { CommonModule } from '@angular/common';

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

  get username(): string {
    return this.auth.getUser()?.username ?? '';
  }

  logout(): void {
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }
}