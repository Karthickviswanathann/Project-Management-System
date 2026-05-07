import {
  Component,
  Input
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

@Component({
  selector: 'app-hover-card',
  standalone: true,
  imports: [CommonModule],

  template: `

<div
  class="hover-card-container"
  (mouseenter)="show = true"
  (mouseleave)="show = false"
>

  <!-- Trigger -->
  <div class="hover-trigger">

    <ng-content select="[trigger]"></ng-content>

  </div>


  <!-- Hover Card -->
  <div
    *ngIf="show"
    class="hover-card-content"
    [ngClass]="align"
  >

    <ng-content></ng-content>

  </div>

</div>

  `,

  styles: [`

.hover-card-container{

  position:relative;

  display:inline-block;
}


.hover-trigger{

  cursor:pointer;
}


.hover-card-content{

  position:absolute;

  min-width:260px;

  padding:16px;

  border-radius:12px;

  background:white;

  border:1px solid #e5e7eb;

  box-shadow:
    0 10px 25px rgba(0,0,0,.12);

  z-index:1000;

  animation:fadeIn .18s ease;
}


/* Alignments */

.center{

  left:50%;

  transform:translateX(-50%);

  top:calc(100% + 8px);
}


.left{

  right:0;

  top:calc(100% + 8px);
}


.right{

  left:0;

  top:calc(100% + 8px);
}


@keyframes fadeIn{

  from{

    opacity:0;

    transform:
      translateY(-5px);
  }

  to{

    opacity:1;

    transform:
      translateY(0);
  }

}

  `]
})

export class HoverCardComponent {

  @Input()
  align:
    'left' |
    'center' |
    'right'
    = 'center';

  show = false;

}