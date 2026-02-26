export type MailboxBox = 'inbox' | 'outbox';

export interface Attachment {
  name: string;
  size: number;
  type: string;
}

export interface Message {
  id: string;
  box: MailboxBox;
  from: string;
  to: string;
  subject: string;
  body: string;
  createdAt: string;
  attachments: Attachment[];
}

export interface MessageDraft {
  to: string;
  subject: string;
  body?: string;
  attachments?: Attachment[];
}