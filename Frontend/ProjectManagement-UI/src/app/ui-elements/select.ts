import {
  Component,
  Input,
  Output,
  EventEmitter,
  forwardRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR
} from '@angular/forms';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="select-container">

      <select
        class="select-trigger"
        [disabled]="disabled"
        [value]="value"
        (change)="onSelect($event)"
      >

        <option
          *ngIf="placeholder"
          value=""
          disabled
          hidden
        >
          {{ placeholder }}
        </option>

        <ng-container *ngFor="let item of options">

          <option
            [value]="item.value"
          >
            {{ item.label }}
          </option>

        </ng-container>

      </select>

      <span class="select-icon">
        ▼
      </span>

    </div>
  `,
  styles: [`
    .select-container{
      position:relative;
      width:100%;
    }

    .select-trigger{
      width:100%;
      height:36px;
      border:1px solid #d1d5db;
      border-radius:6px;
      padding:0 36px 0 12px;
      font-size:14px;
      background:transparent;
      outline:none;
      appearance:none;
      cursor:pointer;
      transition:all .2s ease;
    }

    .select-trigger:focus{
      border-color:#3b82f6;
      box-shadow:0 0 0 1px #3b82f6;
    }

    .select-trigger:disabled{
      opacity:.5;
      cursor:not-allowed;
    }

    .select-icon{
      position:absolute;
      right:12px;
      top:50%;
      transform:translateY(-50%);
      font-size:12px;
      opacity:.6;
      pointer-events:none;
    }
  `],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ]
})
export class SelectComponent
implements ControlValueAccessor {

  @Input() placeholder = 'Select option';

  @Input() options: {
    label: string;
    value: any;
  }[] = [];

  @Output() valueChange =
    new EventEmitter<any>();

  value: any = '';

  disabled = false;

  onChange = (_: any) => {};

  onTouched = () => {};

  onSelect(event: Event) {

    const value =
      (event.target as HTMLSelectElement).value;

    this.value = value;

    this.onChange(value);

    this.onTouched();

    this.valueChange.emit(value);
  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}