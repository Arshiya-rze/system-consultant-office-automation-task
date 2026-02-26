import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { CanComponentDeactivate } from './can-component-deactivate';

@Injectable({ providedIn: 'root' })
export class UnsavedChangesGuard implements CanDeactivate<CanComponentDeactivate> {
  canDeactivate(component: CanComponentDeactivate): boolean {
    if (component.canDeactivate()) return true;
    return confirm('متنت ذخیره نشده. مطمئنی می‌خوای خارج بشی؟');
  }
}