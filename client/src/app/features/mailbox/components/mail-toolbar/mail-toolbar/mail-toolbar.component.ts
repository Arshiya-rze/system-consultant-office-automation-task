import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-mail-toolbar',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './mail-toolbar.component.html',
  styleUrl: './mail-toolbar.component.scss'
})
export class MailToolbarComponent {
  @Input() title: string = '';
  @Input() count: number = 0;

  @Input() search: string = '';
  @Output() searchChange = new EventEmitter<string>();

  constructor(private router: Router) {}

  goCompose() {
    this.router.navigateByUrl('/app/compose');
  }

  onSearch(v: string) {
    this.search = v;
    this.searchChange.emit(v);
  }
}