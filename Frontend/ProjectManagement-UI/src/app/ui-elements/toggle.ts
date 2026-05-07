import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';

type Variant = 'default' | 'outline';
type Size = 'sm' | 'default' | 'lg';

@Component({
  selector: 'app-toggle',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
<button
  class="toggle"
  [ngClass]="computedClass"
  [class.on]="pressed"
  (click)="toggle()"
  [disabled]="disabled"
>
  <ng-content></ng-content>
</button>
  `,
  styles: [`

.toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
  cursor: pointer;
  border: none;
  user-select: none;
}

/* icon styling like [&_svg] */
.toggle svg {
  width: 16px;
  height: 16px;
  pointer-events: none;
}

/* disabled */
.toggle:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* ================= VARIANTS ================= */

/* DEFAULT */
.default {
  background: transparent;
  color: #111827;
}

.default:hover {
  background: #f3f4f6;
  color: #6b7280;
}

/* OUTLINE */
.outline {
  background: transparent;
  border: 1px solid #e5e7eb;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
}

.outline:hover {
  background: #f3f4f6;
  color: #111827;
}

/* ACTIVE STATE (data-state=on equivalent) */
.on {
  background: #e5e7eb;
  color: #111827;
}

/* ================= SIZES ================= */

.sm {
  height: 32px;
  padding: 0 6px;
  min-width: 32px;
}

.default-size {
  height: 36px;
  padding: 0 8px;
  min-width: 36px;
}

.lg {
  height: 40px;
  padding: 0 10px;
  min-width: 40px;
}
  `]
})
export class ToggleComponent {

  @Input() pressed: boolean = false;
  @Input() disabled: boolean = false;

  @Input() variant: Variant = 'default';
  @Input() size: Size = 'default';

  @Output() pressedChange = new EventEmitter<boolean>();

  toggle() {
    if (this.disabled) return;

    this.pressed = !this.pressed;
    this.pressedChange.emit(this.pressed);
  }

  get computedClass() {
    return {
      'default': this.variant === 'default',
      'outline': this.variant === 'outline',

      'sm': this.size === 'sm',
      'default-size': this.size === 'default',
      'lg': this.size === 'lg',
    };
  }
}