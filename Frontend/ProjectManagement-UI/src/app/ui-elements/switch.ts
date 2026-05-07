import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-switch',
  template: `
<div
  class="switch"
  [class.checked]="checked"
  (click)="toggle()"
  [class.disabled]="disabled"
>
  <div class="thumb"></div>
</div>
  `,
  styles: [`
.switch {
  width: 36px;
  height: 20px;
  border-radius: 999px;
  background: #e5e7eb;
  border: 2px solid transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 2px;
  transition: 0.2s;
  box-shadow: 0 1px 3px rgba(0,0,0,0.15);
}

/* checked state (primary like Radix data-state=checked) */
.switch.checked {
  background: #3b82f6;
}

/* disabled */
.switch.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* thumb */
.thumb {
  width: 14px;
  height: 14px;
  background: white;
  border-radius: 50%;
  transition: transform 0.2s ease;
  box-shadow: 0 2px 6px rgba(0,0,0,0.2);
}

/* move thumb when checked */
.switch.checked .thumb {
  transform: translateX(16px);
}
  `]
})
export class SwitchComponent {

  @Input() checked: boolean = false;
  @Input() disabled: boolean = false;

  @Output() checkedChange = new EventEmitter<boolean>();

  toggle() {
    if (this.disabled) return;

    this.checked = !this.checked;
    this.checkedChange.emit(this.checked);
  }
}