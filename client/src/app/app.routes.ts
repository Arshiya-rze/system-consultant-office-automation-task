import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { LoginComponent } from './features/auth/pages/login/login.component';
import { ComposeComponent } from './features/mailbox/pages/compose/compose.component';
import { InboxComponent } from './features/mailbox/pages/inbox/inbox.component';
import { MessageViewComponent } from './features/mailbox/pages/message-view/message-view.component';
import { OutboxComponent } from './features/mailbox/pages/outbox/outbox.component';
import { NotesComponent } from './features/notes/pages/notes/notes.component';
import { AppLayoutComponent } from './features/shell/layout/app-layout/app-layout.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },

    {
        path: 'app',
        component: AppLayoutComponent,
        canActivate: [authGuard],
        children: [
        { path: '', pathMatch: 'full', redirectTo: 'inbox' },
        { path: 'inbox', component: InboxComponent },
        { path: 'outbox', component: OutboxComponent },
        { path: 'compose', component: ComposeComponent },
        { path: 'message-view/:id', component: MessageViewComponent },
        { path: 'notes', component: NotesComponent },
        ],
    },

    { path: '', pathMatch: 'full', redirectTo: 'login' },
    { path: '**', redirectTo: 'login' },
];