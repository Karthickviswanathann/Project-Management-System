import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],

  template: `

<button
  class="btn"
  [disabled]="disabled"
  [ngClass]="[
    variant,
    size
  ]"
  (click)="clicked.emit($event)"
>

  <ng-content></ng-content>

</button>

  `,

  styles: [`

*{
  box-sizing:border-box;
}


/* BASE BUTTON */

.btn{

  display:inline-flex;
  align-items:center;
  justify-content:center;
  gap:8px;

  border:none;
  outline:none;

  cursor:pointer;

  border-radius:8px;

  font-size:14px;
  font-weight:500;

  transition:.2s;

  white-space:nowrap;
}


/* DISABLED */

.btn:disabled{

  opacity:.5;

  pointer-events:none;
}


/* =========================
   VARIANTS
========================= */


/* DEFAULT */

.btn.default{

  background:#2563eb;

  color:white;

  box-shadow:0 1px 3px rgba(0,0,0,.1);
}

.btn.default:hover{

  background:#1d4ed8;
}


/* DESTRUCTIVE */

.btn.destructive{

  background:#dc2626;

  color:white;
}

.btn.destructive:hover{

  background:#b91c1c;
}


/* OUTLINE */

.btn.outline{

  background:white;

  border:1px solid #cbd5e1;

  color:#0f172a;
}

.btn.outline:hover{

  background:#f8fafc;
}


/* SECONDARY */

.btn.secondary{

  background:#e2e8f0;

  color:#0f172a;
}

.btn.secondary:hover{

  background:#cbd5e1;
}


/* GHOST */

.btn.ghost{

  background:transparent;

  color:#0f172a;
}

.btn.ghost:hover{

  background:#f1f5f9;
}


/* LINK */

.btn.link{

  background:transparent;

  color:#2563eb;

  padding:0;

  border-radius:0;
}

.btn.link:hover{

  text-decoration:underline;
}



/* =========================
   SIZES
========================= */


/* DEFAULT */

.btn.default-size{

  height:40px;

  padding:0 16px;
}


/* SMALL */

.btn.sm{

  height:34px;

  padding:0 12px;

  font-size:12px;
}


/* LARGE */

.btn.lg{

  height:44px;

  padding:0 32px;
}


/* ICON */

.btn.icon{

  width:40px;
  height:40px;

  padding:0;
}

  `]
})
export class ButtonComponent {

  @Input()
  variant:
    | 'default'
    | 'primary'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
    = 'default';


  @Input()
  size:
    | 'default-size'
    | 'sm'
    | 'lg'
    | 'icon'
    = 'default-size';


  @Input()
  disabled = false;


  @Output()
  clicked = new EventEmitter<Event>();

}