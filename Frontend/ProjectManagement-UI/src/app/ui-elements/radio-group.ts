import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-radio-group',
  standalone: true,
  template: `
    <div class="grid gap-2">
      <label
        *ngFor="let option of options"
        class="flex items-center gap-2 cursor-pointer"
      >
        <input
          type="radio"
          [value]="option.value"
          [checked]="value === option.value"
          (change)="onSelect(option.value)"
          class="h-4 w-4 border border-primary accent-primary"
        />

        <span>{{ option.label }}</span>
      </label>
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioGroupComponent),
      multi: true
    }
  ]
})
export class RadioGroupComponent implements ControlValueAccessor {

  @Input() options: { label: string; value: any }[] = [];

  value: any;

  onChange = (_: any) => {};
  onTouched = () => {};

  onSelect(value: any) {
    this.value = value;
    this.onChange(value);
    this.onTouched();
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
}