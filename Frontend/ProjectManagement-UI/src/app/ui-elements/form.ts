import {
  Component,
  Input
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  ReactiveFormsModule,
  FormGroup
} from '@angular/forms';

@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],

  template: `

<div
  class="form-item"
  [formGroup]="form"
>

  <!-- Label -->
  <label
    class="form-label"
    [class.error]="hasError()"
    [for]="controlName"
  >

    {{ label }}

  </label>


  <!-- Input -->
  <input
    *ngIf="type !== 'textarea'"
    class="form-control"
    [class.error]="hasError()"
    [id]="controlName"
    [type]="type"
    [formControlName]="controlName"
    [placeholder]="placeholder"
  />


  <!-- Textarea -->
  <textarea
    *ngIf="type === 'textarea'"
    class="form-control textarea"
    [class.error]="hasError()"
    [id]="controlName"
    [formControlName]="controlName"
    [placeholder]="placeholder"
  ></textarea>


  <!-- Description -->
  <p
    *ngIf="description"
    class="form-description"
  >

    {{ description }}

  </p>


  <!-- Error Message -->
  <p
    *ngIf="hasError()"
    class="form-message"
  >

    {{ getErrorMessage() }}

  </p>

</div>

  `,

  styles: [`

.form-item{

  display:flex;

  flex-direction:column;

  gap:8px;

  margin-bottom:18px;
}


.form-label{

  font-size:14px;

  font-weight:600;

  color:#111827;
}


.form-label.error{

  color:#dc2626;
}


.form-control{

  width:100%;

  padding:12px 14px;

  border:1px solid #d1d5db;

  border-radius:10px;

  outline:none;

  font-size:14px;

  transition:.2s;
}


.form-control:focus{

  border-color:#2563eb;

  box-shadow:
    0 0 0 3px rgba(37,99,235,.15);
}


.form-control.error{

  border-color:#dc2626;
}


.textarea{

  min-height:120px;

  resize:vertical;
}


.form-description{

  font-size:12px;

  color:#6b7280;
}


.form-message{

  font-size:12px;

  font-weight:500;

  color:#dc2626;
}

  `]
})

export class FormFieldComponent {

  @Input({ required:true })
  form!: FormGroup;

  @Input({ required:true })
  controlName!: string;

  @Input()
  label = '';

  @Input()
  placeholder = '';

  @Input()
  description = '';

  @Input()
  type = 'text';


  hasError(): boolean {

    const control =
      this.form.get(this.controlName);

    return !!(
      control &&
      control.invalid &&
      (control.touched || control.dirty)
    );
  }


  getErrorMessage(): string {

    const control =
      this.form.get(this.controlName);

    if(!control?.errors) return '';

    if(control.errors['required']){

      return `${this.label} is required`;
    }

    if(control.errors['email']){

      return `Invalid email address`;
    }

    if(control.errors['minlength']){

      return `Minimum length is ${control.errors['minlength'].requiredLength}`;
    }

    return 'Invalid field';
  }

}