import { Injectable, signal } from '@angular/core';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastState {
  visible: boolean;
  type: ToastType;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private _state = signal<ToastState>({
    visible: false,
    type: 'info',
    message: ''
  });

  state = this._state.asReadonly();
  private timer?: any;

  show(message: string, type: ToastType = 'info', ms = 2200) {
    clearTimeout(this.timer);

    this._state.set({ visible: true, type, message });

    this.timer = setTimeout(() => {
      this._state.set({ ...this._state(), visible: false });
    }, ms);
  }

  success(message: string) { this.show(message, 'success'); }
  error(message: string) { this.show(message, 'error', 3000); }
  info(message: string) { this.show(message, 'info'); }
}