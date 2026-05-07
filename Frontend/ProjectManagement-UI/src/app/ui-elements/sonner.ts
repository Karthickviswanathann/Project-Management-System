import { Component, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface Toast {
  id: number;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
}

@Injectable({ providedIn: 'root' })



export class ToastService {

  private toastsSubject = new BehaviorSubject<Toast[]>([]);
  toasts$ = this.toastsSubject.asObservable();

  private idCounter = 0;

  show(type: Toast['type'], message: string) {
    const toast: Toast = {
      id: ++this.idCounter,
      type,
      message
    };

    const current = this.toastsSubject.value;
    this.toastsSubject.next([...current, toast]);

    // auto remove after 3s (like Sonner)
    setTimeout(() => this.remove(toast.id), 3000);
  }

  remove(id: number) {
    const updated = this.toastsSubject.value.filter(t => t.id !== id);
    this.toastsSubject.next(updated);
  }

  success(msg: string) { this.show('success', msg); }
  error(msg: string) { this.show('error', msg); }
  info(msg: string) { this.show('info', msg); }
  warning(msg: string) { this.show('warning', msg); }
}

@Component({
  selector: 'app-toaster',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
<div class="toaster">
  <div
    *ngFor="let toast of toasts"
    class="toast"
    [ngClass]="toast.type"
  >
    <span>{{ toast.message }}</span>
  </div>
</div>
  `,
  styles: [`
.toaster {
  position: fixed;
  top: 16px;
  right: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 9999;
}

/* Base toast */
.toast {
  min-width: 220px;
  padding: 10px 14px;
  border-radius: 8px;
  font-size: 14px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.15);
  animation: slideIn 0.25s ease;
  background: white;
  border: 1px solid #ddd;
}

/* Types */
.success { border-left: 4px solid #22c55e; }
.error { border-left: 4px solid #ef4444; }
.info { border-left: 4px solid #3b82f6; }
.warning { border-left: 4px solid #f59e0b; }

@keyframes slideIn {
  from { transform: translateX(100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}
  `]
})
export class ToasterComponent {

  toasts: Toast[] = [];

  constructor(private toastService: ToastService) {
    this.toastService.toasts$.subscribe(data => {
      this.toasts = data;
    });
  }
}