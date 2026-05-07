import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-textarea',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
<textarea
  class="textarea"
  [ngClass]="className"
  [disabled]="disabled"
  [placeholder]="placeholder"
  [(ngModel)]="value"
  (input)="onInput($event)"
></textarea>
  `,
  styles: [`

.textarea {
  display: flex;
  min-height: 60px;
  width: 100%;
  border-radius: 6px;
  border: 1px solid #e5e7eb;
  background: transparent;
  padding: 8px 12px;
  font-size: 14px;
  color: #111827;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
  outline: none;
  transition: 0.2s;
}

/* placeholder */
.textarea::placeholder {
  color: #9ca3af;
}

/* focus (Radix focus-visible:ring equivalent) */
.textarea:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 1px #3b82f6;
}

/* disabled */
.textarea:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
  `]
})
export class TextareaComponent {

  @Input() value: string = '';
  @Input() placeholder: string = '';
  @Input() disabled: boolean = false;
  @Input() className: string = '';

  @Output() valueChange = new EventEmitter<string>();

  onInput(event: Event) {
    const val = (event.target as HTMLTextAreaElement).value;
    this.value = val;
    this.valueChange.emit(val);
  }
}