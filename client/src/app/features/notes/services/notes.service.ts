import { Injectable } from '@angular/core';
import { Note, NoteDraft } from '../models/note.model';

const LS_NOTES_KEY = 'demo_notes';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  seedMockDataIfEmpty(): void {
    const existing = this.getAll();
    if (existing.length > 0) return;

    const now = new Date();
    const notes: Note[] = [
      {
        id: crypto.randomUUID(),
        title: 'یادداشت شماره ۱',
        body: 'این یک یادداشت نمونه برای دمو است.',
        createdAt: new Date(now.getTime() - 1 * 86400000).toISOString(),
      },
      {
        id: crypto.randomUUID(),
        title: 'جلسه با مدیر',
        body: 'نکات جلسه:\n- بررسی وضعیت پروژه\n- برنامه هفته آینده\n- زمان تحویل دمو',
        createdAt: new Date(now.getTime() - 3 * 3600_000).toISOString(),
      },
    ];

    this.setAll(notes);
  }

  getNotes(): Note[] {
    return this.getAll().sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }

  getById(id: string): Note | undefined {
    return this.getAll().find((n) => n.id === id);
  }

  create(draft: NoteDraft): Note {
    const note: Note = {
      id: crypto.randomUUID(),
      title: draft.title.trim(),
      body: (draft.body ?? '').trim(),
      createdAt: new Date().toISOString(),
    };

    const all = this.getAll();
    all.push(note);
    this.setAll(all);

    return note;
  }

  delete(id: string): void {
    const all = this.getAll().filter((n) => n.id !== id);
    this.setAll(all);
  }

  private getAll(): Note[] {
    const raw = localStorage.getItem(LS_NOTES_KEY);
    if (!raw) return [];
    try {
      return JSON.parse(raw) as Note[];
    } catch {
      return [];
    }
  }

  private setAll(notes: Note[]): void {
    localStorage.setItem(LS_NOTES_KEY, JSON.stringify(notes));
  }
}