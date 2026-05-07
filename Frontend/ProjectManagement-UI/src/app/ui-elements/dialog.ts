import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostListener
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [CommonModule],

  template: `

<!-- Trigger -->
<button
  class="dialog-trigger"
  (click)="openDialog()"
>
  {{ triggerText }}
</button>


<!-- Overlay -->
<div
  *ngIf="isOpen"
  class="dialog-overlay"
  (click)="closeDialog()"
></div>


<!-- Dialog -->
<div
  *ngIf="isOpen"
  class="dialog-container"
>

  <!-- Close -->
  <button
    class="dialog-close"
    (click)="closeDialog()"
  >
    ✕
  </button>


  <!-- Header -->
  <div class="dialog-header">

    <h2 class="dialog-title">
      {{ title }}
    </h2>

    <p class="dialog-description">
      {{ description }}
    </p>

  </div>


  <!-- Content -->
  <div class="dialog-content">

    <ng-content></ng-content>

  </div>


  <!-- Footer -->
  <div class="dialog-footer">

    <button
      class="btn cancel-btn"
      (click)="closeDialog()"
    >
      Cancel
    </button>

    <button
      class="btn action-btn"
      (click)="onAction()"
    >
      {{ actionText }}
    </button>

  </div>

</div>

  `,

  styles: [`

.dialog-trigger{

  padding:10px 18px;

  border:none;

  border-radius:8px;

  background:#2563eb;

  color:#fff;

  cursor:pointer;

  font-size:14px;

  transition:.2s;
}


.dialog-trigger:hover{

  background:#1d4ed8;
}


.dialog-overlay{

  position:fixed;

  inset:0;

  background:rgba(0,0,0,.6);

  z-index:999;

  animation:fadeIn .2s ease;
}


.dialog-container{

  position:fixed;

  top:50%;
  left:50%;

  transform:translate(-50%,-50%);

  width:95%;
  max-width:500px;

  background:#fff;

  border-radius:16px;

  padding:24px;

  box-shadow:
    0 20px 40px rgba(0,0,0,.2);

  z-index:1000;

  animation:zoomIn .2s ease;
}


.dialog-close{

  position:absolute;

  top:14px;
  right:14px;

  border:none;

  background:transparent;

  font-size:18px;

  cursor:pointer;

  color:#64748b;

  transition:.2s;
}


.dialog-close:hover{

  color:#0f172a;
}


.dialog-header{

  margin-bottom:20px;
}


.dialog-title{

  margin:0;

  font-size:22px;

  font-weight:700;

  color:#111827;
}


.dialog-description{

  margin-top:8px;

  color:#64748b;

  font-size:14px;

  line-height:1.5;
}


.dialog-content{

  margin-bottom:24px;
}


.dialog-footer{

  display:flex;

  justify-content:flex-end;

  gap:12px;
}


.btn{

  padding:10px 18px;

  border:none;

  border-radius:8px;

  cursor:pointer;

  font-size:14px;

  transition:.2s;
}


.cancel-btn{

  background:#e2e8f0;

  color:#111827;
}


.cancel-btn:hover{

  background:#cbd5e1;
}


.action-btn{

  background:#2563eb;

  color:#fff;
}


.action-btn:hover{

  background:#1d4ed8;
}


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

    transform:
      translate(-50%,-50%)
      scale(.9);
  }

  to{

    opacity:1;

    transform:
      translate(-50%,-50%)
      scale(1);
  }

}

  `]
})

export class DialogComponent {

  @Input() title = 'Dialog Title';

  @Input() description =
    'Dialog description here';

  @Input() triggerText = 'Open Dialog';

  @Input() actionText = 'Continue';


  @Output() action =
    new EventEmitter<void>();


  isOpen = false;


  openDialog() {

    this.isOpen = true;
  }


  closeDialog() {

    this.isOpen = false;
  }


  onAction() {

    this.action.emit();

    this.closeDialog();
  }


  @HostListener('document:keydown.escape')
  onEscape() {

    this.closeDialog();
  }

}