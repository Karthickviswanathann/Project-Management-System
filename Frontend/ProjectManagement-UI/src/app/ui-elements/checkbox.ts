import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports:[CommonModule],

  template: `

  <label class="checkbox-container">

    <input
      type="checkbox"
      class="checkbox-input"
      [checked]="checked"
      [disabled]="disabled"
      (change)="onChange($event)"
    />

    <span class="checkbox-box">

      <span
        class="check-icon"
        *ngIf="checked">

        ✓

      </span>

    </span>

    <span class="checkbox-label">

      {{label}}

    </span>

  </label>

  `,

  styles:[`

  .checkbox-container{

    display:flex;

    align-items:center;

    gap:10px;

    cursor:pointer;

    user-select:none;

  }


  .checkbox-input{

    display:none;

  }


  .checkbox-box{

    width:18px;

    height:18px;

    border:2px solid #2563eb;

    border-radius:4px;

    display:flex;

    align-items:center;

    justify-content:center;

    transition:.2s;

    background:white;

  }


  .checkbox-input:checked + .checkbox-box{

    background:#2563eb;

    color:white;

  }


  .check-icon{

    font-size:12px;

    font-weight:bold;

    line-height:1;

  }


  .checkbox-label{

    font-size:14px;

    color:#111827;

  }


  .checkbox-input:disabled + .checkbox-box{

    opacity:.5;

    cursor:not-allowed;

  }

  `]
})

export class CheckboxComponent {

  @Input()
  checked = false;

  @Input()
  disabled = false;

  @Input()
  label = 'Checkbox';


  @Output()
  checkedChange =
    new EventEmitter<boolean>();


  onChange(event:any){

    this.checked =
      event.target.checked;

    this.checkedChange.emit(
      this.checked
    );

  }

}