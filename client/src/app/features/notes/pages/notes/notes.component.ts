import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Note } from '../../models/note.model';
import { NotesService } from '../../services/notes.service';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-notes',
  imports: [CommonModule, ReactiveFormsModule, DatePipe],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss'
})
export class NotesComponent {

  private notesService = inject(NotesService);
  private fb = inject(FormBuilder);

  selectedNote: Note | null = null;

  form = this.fb.group({
    title: ['', [Validators.required]],
    body: [''],
  });

  constructor() {
    this.notesService.seedMockDataIfEmpty();
  }

  get notes(): Note[] {
    return this.notesService.getNotes();
  }

  select(note: Note): void {
    this.selectedNote = note;
  }

  clearSelection(): void {
    this.selectedNote = null;
  }

  addNote(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const note = this.notesService.create({
      title: this.form.value.title ?? '',
      body: this.form.value.body ?? '',
    });

    this.form.reset();
    this.selectedNote = note;
  }

  deleteNote(note: Note, event?: MouseEvent): void {
    event?.stopPropagation();

    const ok = confirm(`یادداشت "${note.title}" حذف شود؟`);
    if (!ok) return;

    this.notesService.delete(note.id);

    if (this.selectedNote?.id === note.id) {
      this.selectedNote = null;
    }
  }
}