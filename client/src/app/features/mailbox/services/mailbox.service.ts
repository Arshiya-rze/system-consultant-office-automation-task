import { Injectable } from '@angular/core';
import { Message, MessageDraft } from '../models/mail.model';

const LS_MESSAGES_KEY = 'demo_messages';

@Injectable({
  providedIn: 'root'
})
export class MailboxService {
   seedMockDataIfEmpty(): void {
    const existing = this.getAll();
    if (existing.length > 0) return;

    const now = new Date();
    const inbox: Message[] = [
      {
        id: crypto.randomUUID(),
        box: 'inbox',
        from: 'manager@company.com',
        to: 'me@company.com',
        subject: 'جلسه فردا ساعت ۱۰',
        body: 'سلام. لطفاً فردا ساعت ۱۰ برای جلسه برنامه‌ریزی آماده باشید.',
        createdAt: new Date(now.getTime() - 1 * 86400000).toISOString(),
        attachments: [],
      },
      {
        id: crypto.randomUUID(),
        box: 'inbox',
        from: 'hr@company.com',
        to: 'me@company.com',
        subject: 'فرم اطلاعات پرسنلی',
        body: 'فرم پیوست را تکمیل و ارسال کنید.',
        createdAt: new Date(now.getTime() - 2 * 86400000).toISOString(),
        attachments: [{ name: 'form.pdf', size: 245_120, type: 'application/pdf' }],
      },
    ];

    const outbox: Message[] = [
      {
        id: crypto.randomUUID(),
        box: 'outbox',
        from: 'me@company.com',
        to: 'support@company.com',
        subject: 'درخواست دسترسی',
        body: 'سلام، لطفاً دسترسی سیستم را برای من فعال کنید.',
        createdAt: new Date(now.getTime() - 2 * 3600_000).toISOString(),
        attachments: [],
      },
    ];

    this.setAll([...inbox, ...outbox]);
  }

  getInbox(): Message[] {
    return this.getAll()
      .filter((m) => m.box === 'inbox')
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }

  getOutbox(): Message[] {
    return this.getAll()
      .filter((m) => m.box === 'outbox')
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }

  getMessageById(id: string): Message | undefined {
    return this.getAll().find((m) => m.id === id);
  }

  sendMessage(draft: MessageDraft, fromEmail = 'me@company.com'): Message {
    const msg: Message = {
      id: crypto.randomUUID(),
      box: 'outbox',
      from: fromEmail,
      to: draft.to.trim(),
      subject: draft.subject.trim(),
      body: draft.body ?? '',
      createdAt: new Date().toISOString(),
      attachments: draft.attachments ?? [],
    };

    const all = this.getAll();
    all.push(msg);
    this.setAll(all);

    return msg;
  }

  createReplyDraft(original: Message): MessageDraft {
    return {
      to: original.from,
      subject: this.prefixSubject('Re: ', original.subject),
      body: this.buildQuotedBody(original),
      attachments: [],
    };
  }

  createForwardDraft(original: Message): MessageDraft {
    return {
      to: '',
      subject: this.prefixSubject('Fwd: ', original.subject),
      body: this.buildQuotedBody(original),
      attachments: [],
    };
  }

  private prefixSubject(prefix: string, subject: string): string {
    const s = (subject ?? '').trim();
    if (s.toLowerCase().startsWith(prefix.toLowerCase())) return s;
    return `${prefix}${s}`;
  }

  private buildQuotedBody(original: Message): string {
    const dt = new Date(original.createdAt).toLocaleString();
    return [
      '',
      '-----------------------------',
      `From: ${original.from}`,
      `To: ${original.to}`,
      `Date: ${dt}`,
      `Subject: ${original.subject}`,
      '',
      original.body ?? '',
      '-----------------------------',
      '',
    ].join('\n');
  }

  private getAll(): Message[] {
    const raw = localStorage.getItem(LS_MESSAGES_KEY);
    if (!raw) return [];
    try {
      return JSON.parse(raw) as Message[];
    } catch {
      return [];
    }
  }

  private setAll(messages: Message[]): void {
    localStorage.setItem(LS_MESSAGES_KEY, JSON.stringify(messages));
  }
}