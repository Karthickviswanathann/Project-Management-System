import { Component, ContentChildren, EventEmitter, Input, Output, QueryList } from '@angular/core';

/* ---------------- Toggle Item ---------------- */
@Component({
  selector: 'app-toggle-item',
  template: `
<button
  class="toggle-item"
  [class.active]="selected"
  (click)="toggle()"
>
  <ng-content></ng-content>
</button>
  `,
  styles: [`

.toggle-item {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 6px 10px;
  font-size: 14px;
  border-radius: 6px;
  border: 1px solid transparent;
  background: #f3f4f6;
  color: #6b7280;
  cursor: pointer;
  transition: 0.2s;
}

.toggle-item:hover {
  background: #e5e7eb;
}

/* active state (Radix data-state=on) */
.toggle-item.active {
  background: white;
  color: #111827;
  border: 1px solid #d1d5db;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}
  `]
})
export class ToggleItemComponent {

  @Input() value: string = '';
  @Input() selected: boolean = false;

  @Output() select = new EventEmitter<string>();

  toggle() {
    this.select.emit(this.value);
  }
}

/* ---------------- Toggle Group ---------------- */
@Component({
  selector: 'app-toggle-group',
  template: `
<div class="toggle-group">
  <ng-content></ng-content>
</div>
  `,
  styles: [`

.toggle-group {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
}
  `]
})
export class ToggleGroupComponent {

  @Input() value: string = '';
  @Output() valueChange = new EventEmitter<string>();

  selectItem(val: string) {
    this.value = val;
    this.valueChange.emit(val);
  }
}