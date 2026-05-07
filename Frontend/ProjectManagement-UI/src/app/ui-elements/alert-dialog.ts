import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

@Component({
  selector: 'app-alert-dialog',
  standalone: true,

  template: `

<!-- OVERLAY -->

<div
  class="dialog-overlay"
  *ngIf="open"
  (click)="closeDialog()"
>

  <!-- DIALOG -->

  <div
    class="dialog-content"
    (click)="$event.stopPropagation()"
  >

    <!-- HEADER -->

    <div class="dialog-header">

      <h2 class="dialog-title">

        {{ title }}

      </h2>

      <p class="dialog-description">

        {{ description }}

      </p>

    </div>


    <!-- FOOTER -->

    <div class="dialog-footer">

      <button
        class="cancel-btn"
        (click)="cancel()"
      >
        {{ cancelText }}
      </button>

      <button
        class="action-btn"
        (click)="confirm()"
      >
        {{ actionText }}
      </button>

    </div>

  </div>

</div>

  `,

  styles: [`

*{
  box-sizing:border-box;
}


/* OVERLAY */

.dialog-overlay{

  position:fixed;
  inset:0;

  background:rgba(0,0,0,.75);

  display:flex;
  align-items:center;
  justify-content:center;

  z-index:999;

  animation:fadeIn .2s ease;
}


/* CONTENT */

.dialog-content{

  width:100%;
  max-width:500px;

  background:white;

  border-radius:14px;

  padding:24px;

  box-shadow:0 10px 30px rgba(0,0,0,.2);

  animation:zoomIn .2s ease;
}


/* HEADER */

.dialog-header{
  margin-bottom:24px;
}


.dialog-title{

  font-size:22px;
  font-weight:700;

  margin-bottom:10px;

  color:#0f172a;
}


.dialog-description{

  font-size:15px;
  line-height:1.6;

  color:#64748b;
}


/* FOOTER */

.dialog-footer{

  display:flex;
  justify-content:flex-end;
  gap:12px;
}


/* BUTTONS */

button{

  height:42px;

  padding:0 18px;

  border-radius:8px;

  font-size:14px;
  font-weight:600;

  cursor:pointer;

  transition:.2s;
}


.cancel-btn{

  background:white;

  border:1px solid #cbd5e1;

  color:#0f172a;
}


.cancel-btn:hover{
  background:#f8fafc;
}


.action-btn{

  border:none;

  background:#2563eb;

  color:white;
}


.action-btn:hover{
  opacity:.9;
}


/* ANIMATION */

@keyframes fadeIn{

  from{
    opacity:0;
  }

  to{
    opacity:1;
  }

}


@keyframes zoomIn{

  from{
    opacity:0;
    transform:scale(.95);
  }

  to{
    opacity:1;
    transform:scale(1);
  }

}


/* MOBILE */

@media(max-width:640px){

  .dialog-content{
    width:90%;
  }

  .dialog-footer{
    flex-direction:column-reverse;
  }

  button{
    width:100%;
  }

}

  `]
})
export class AlertDialogComponent {

  @Input() open = false;

  @Input() title = 'Confirm Action';

  @Input() description =
    'Are you sure you want to continue?';

  @Input() actionText = 'Continue';

  @Input() cancelText = 'Cancel';


  @Output() openChange =
    new EventEmitter<boolean>();

  @Output() action =
    new EventEmitter<void>();

  @Output() cancelled =
    new EventEmitter<void>();


  closeDialog(): void {

    this.open = false;

    this.openChange.emit(false);

  }


  confirm(): void {

    this.action.emit();

    this.closeDialog();

  }


  cancel(): void {

    this.cancelled.emit();

    this.closeDialog();

  }

}