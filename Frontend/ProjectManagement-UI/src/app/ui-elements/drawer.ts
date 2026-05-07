import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostListener
} from '@angular/core';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-drawer',
  standalone: true,
  imports: [CommonModule],

  template: `

<!-- Trigger Button -->
<button
  class="drawer-trigger"
  (click)="openDrawer()"
>
  {{ triggerText }}
</button>


<!-- Overlay -->
<div
  *ngIf="isOpen"
  class="drawer-overlay"
  (click)="closeDrawer()"
></div>


<!-- Drawer -->
<div
  *ngIf="isOpen"
  class="drawer-content"
>

  <!-- Top Handle -->
  <div class="drawer-handle"></div>


  <!-- Header -->
  <div class="drawer-header">

    <h2 class="drawer-title">
      {{ title }}
    </h2>

    <p class="drawer-description">
      {{ description }}
    </p>

  </div>


  <!-- Body -->
  <div class="drawer-body">

    <ng-content></ng-content>

  </div>


  <!-- Footer -->
  <div class="drawer-footer">

    <button
      class="btn cancel-btn"
      (click)="closeDrawer()"
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

.drawer-trigger{

  padding:10px 18px;

  border:none;

  border-radius:8px;

  background:#2563eb;

  color:white;

  cursor:pointer;

  font-size:14px;

  transition:.2s;
}

.drawer-trigger:hover{

  background:#1d4ed8;
}


.drawer-overlay{

  position:fixed;

  inset:0;

  background:rgba(0,0,0,.6);

  z-index:999;

  animation:fadeIn .2s ease;
}


.drawer-content{

  position:fixed;

  left:0;
  right:0;
  bottom:0;

  z-index:1000;

  background:#fff;

  border-radius:16px 16px 0 0;

  padding:20px;

  min-height:250px;

  max-height:90vh;

  overflow-y:auto;

  box-shadow:
    0 -10px 30px rgba(0,0,0,.15);

  animation:slideUp .25s ease;
}


.drawer-handle{

  width:90px;

  height:6px;

  border-radius:999px;

  background:#cbd5e1;

  margin:0 auto 20px;
}


.drawer-header{

  margin-bottom:20px;

  text-align:center;
}


.drawer-title{

  margin:0;

  font-size:22px;

  font-weight:700;

  color:#111827;
}


.drawer-description{

  margin-top:8px;

  font-size:14px;

  color:#64748b;

  line-height:1.5;
}


.drawer-body{

  padding-bottom:20px;
}


.drawer-footer{

  display:flex;

  flex-direction:column;

  gap:12px;

  margin-top:auto;
}


.btn{

  width:100%;

  padding:12px;

  border:none;

  border-radius:10px;

  font-size:14px;

  cursor:pointer;

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

  color:white;
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


@keyframes slideUp{

  from{

    transform:translateY(100%);
  }

  to{

    transform:translateY(0);
  }
}


@media (min-width:640px){

  .drawer-content{

    max-width:500px;

    margin:auto;
  }

}

  `]
})

export class DrawerComponent {

  @Input() title = 'Drawer Title';

  @Input() description =
    'Drawer description here';

  @Input() triggerText = 'Open Drawer';

  @Input() actionText = 'Continue';


  @Output() action =
    new EventEmitter<void>();


  isOpen = false;


  openDrawer(){

    this.isOpen = true;
  }


  closeDrawer(){

    this.isOpen = false;
  }


  onAction(){

    this.action.emit();

    this.closeDrawer();
  }


  @HostListener('document:keydown.escape')
  onEscape(){

    this.closeDrawer();
  }

}