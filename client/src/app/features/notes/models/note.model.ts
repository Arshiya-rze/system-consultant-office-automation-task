export interface Note {
  id: string;
  title: string;
  body: string;
  createdAt: string; 
}

export interface NoteDraft {
  title: string;
  body?: string;
}