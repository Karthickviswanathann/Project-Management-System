import {
  Component,
  Input,
  Output,
  EventEmitter,
  QueryList,
  ViewChildren,
  ElementRef
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  FormsModule
} from '@angular/forms';

@Component({
  selector: 'app-input-otp',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],

  template: `

<div class="otp-container">

  <ng-container
    *ngFor="
      let item of otpArray;
      let i = index
    "
  >

    <!-- OTP Input -->
    <input
      #otpInput
      type="text"
      maxlength="1"
      class="otp-slot"
      [(ngModel)]="otpValues[i]"
      (input)="onInput($event, i)"
      (keydown)="onKeyDown($event, i)"
    />

    <!-- Separator -->
    <span
      *ngIf="
        separator &&
        i < length - 1
      "
      class="otp-separator"
    >
      -
    </span>

  </ng-container>

</div>

  `,

  styles: [`

.otp-container{

  display:flex;

  align-items:center;

  gap:10px;
}


.otp-slot{

  width:48px;

  height:48px;

  border:1px solid #d1d5db;

  border-radius:10px;

  text-align:center;

  font-size:20px;

  font-weight:600;

  outline:none;

  transition:.2s;
}


.otp-slot:focus{

  border-color:#2563eb;

  box-shadow:
    0 0 0 3px rgba(37,99,235,.15);
}


.otp-separator{

  font-size:22px;

  color:#6b7280;
}

  `]
})

export class InputOtpComponent {

  @Input()
  length = 6;

  @Input()
  separator = false;

  @Output()
  otpChange =
    new EventEmitter<string>();


  @ViewChildren('otpInput')
  otpInputs!: QueryList<ElementRef>;


  otpValues: string[] = [];


  ngOnInit(){

    this.otpValues =
      Array(this.length).fill('');
  }


  get otpArray(){

    return Array(this.length);
  }


  onInput(event: any, index: number){

    const value =
      event.target.value;

    if(!/^[0-9a-zA-Z]?$/.test(value)){

      this.otpValues[index] = '';
      return;
    }

    // Move next
    if(value && index < this.length - 1){

      this.focusInput(index + 1);
    }

    this.emitOtp();
  }


  onKeyDown(event: KeyboardEvent, index: number){

    // Backspace previous
    if(
      event.key === 'Backspace' &&
      !this.otpValues[index] &&
      index > 0
    ){

      this.focusInput(index - 1);
    }
  }


  focusInput(index: number){

    const input =
      this.otpInputs.toArray()[index];

    input?.nativeElement.focus();
  }


  emitOtp(){

    this.otpChange.emit(
      this.otpValues.join('')
    );
  }

}