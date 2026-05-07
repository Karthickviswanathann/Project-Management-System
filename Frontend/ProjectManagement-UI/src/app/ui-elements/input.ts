import {
  Component,
  Input,
  forwardRef
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormsModule
} from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],

  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ],

  template: `

<input

  [type]="type"

  [placeholder]="placeholder"

  [disabled]="disabled"

  [(ngModel)]="value"

  (ngModelChange)="onValueChange($event)"

  (blur)="onTouched()"

  class="app-input"

  [ngClass]="className"
/>

  `,

  styles: [`

.app-input{

  display:flex;

  width:100%;

  height:40px;

  padding:8px 12px;

  border:1px solid #d1d5db;

  border-radius:8px;

  background:transparent;

  font-size:14px;

  color:#111827;

  outline:none;

  transition:all .2s ease;

  box-shadow:0 1px 2px rgba(0,0,0,.05);
}


.app-input::placeholder{

  color:#9ca3af;
}


.app-input:focus{

  border-color:#2563eb;

  box-shadow:
    0 0 0 3px rgba(37,99,235,.15);
}


.app-input:disabled{

  cursor:not-allowed;

  opacity:.5;

  background:#f3f4f6;
}

  `]
})

export class InputComponent
implements ControlValueAccessor {

  @Input()
  type = 'text';

  @Input()
  placeholder = '';

  @Input()
  className = '';

  disabled = false;

  value: any = '';


  onChange: any = () => {};

  onTouched: any = () => {};


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


  onValueChange(value: any){

    this.value = value;

    this.onChange(value);
  }

}